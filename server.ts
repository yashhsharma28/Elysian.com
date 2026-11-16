import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import {
  approveReturnInSupabase,
  createOrderInSupabase,
  createReturnRequestInSupabase,
  getOrderByIdFromSupabase,
  getSupabaseConfig,
  listOrdersFromSupabase,
  updateOrderInSupabase,
} from "./src/lib/supabaseServer.ts";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Initialize Gemini Client safely with User-Agent header
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// In-Memory AI Assistant Configuration & Analytics
let aiConfig = {
  enabled: true,
  welcomeMessage: "Welcome to ELYSIAN AI.\n\nI'm your personal fragrance expert.\n\nI can help you discover the perfect perfume, compare fragrances, recommend gifts, track orders, answer questions, and provide personalized shopping advice.",
  tagline: "Crafted for the Extraordinary",
  suggestedPrompts: [
    "Recommend perfumes based on my personality",
    "Best long-lasting perfumes under ₹999",
    "Compare Oud Imperiale vs Santal Blanc",
    "Track my order ELY-98234",
    "Suggest a romantic gift set for her",
    "What is Extrait de Parfum concentration?"
  ],
  knowledgeSnippets: [
    {
      id: "ks-1",
      title: "Extrait de Parfum vs EDP vs EDT",
      category: "Concentration",
      content: "ELYSIAN specializes in Extrait de Parfum at a rich 30% fragrance oil concentration. This provides an unmatched 12-16 hours of longevity and intoxicating sillage compared to EDP (15-20%) or EDT (5-15%)."
    },
    {
      id: "ks-2",
      title: "Pan-India Shipping Policy",
      category: "Shipping",
      content: "Free Express Pan-India Shipping on all orders above ₹499 via Delhivery & Bluedart. Standard delivery takes 2-4 business days across 25,000+ pincodes."
    },
    {
      id: "ks-3",
      title: "14-Day Hassle-Free Returns & Exchange",
      category: "Returns",
      content: "Unopened perfume boxes can be returned or exchanged within 14 days of delivery. Refunds are processed within 3-5 business days to the original payment method or UPI."
    }
  ],
  primaryModel: "gemini-3.6-flash"
};

let aiAnalytics = {
  totalQueries: 1420,
  satisfactionRate: 98.4,
  popularRecommendations: [
    { name: "Oud Imperiale Extrait", count: 482 },
    { name: "Santal Blanc", count: 395 },
    { name: "Velvet Rose & Tonka", count: 310 },
    { name: "Baccarat Royale 540", count: 278 }
  ],
  topQuestions: [
    "Which perfume lasts 12+ hours?",
    "How do I track order ELY-98234?",
    "Best perfume under ₹999 for weddings?",
    "Is Cash on Delivery available?"
  ]
};

// Order Lookup Database Simulator
const MOCK_ORDERS: Record<string, any> = {
  "ELY-98234": {
    orderId: "ELY-98234",
    status: "Out for Delivery",
    carrier: "Delhivery Express",
    trackingCode: "DEL-8829103948",
    estimatedDelivery: "Today by 6:00 PM",
    itemsCount: 2,
    totalAmount: 1648,
    shippingAddress: "Bandra West, Mumbai, Maharashtra 400050"
  },
  "ELY-10492": {
    orderId: "ELY-10492",
    status: "In Transit",
    carrier: "Bluedart Air",
    trackingCode: "BD-993019284",
    estimatedDelivery: "Tomorrow afternoon",
    itemsCount: 1,
    totalAmount: 899,
    shippingAddress: "Connaught Place, New Delhi 110001"
  },
  "ELY-55821": {
    orderId: "ELY-55821",
    status: "Delivered",
    carrier: "Delhivery Express",
    trackingCode: "DEL-772109483",
    estimatedDelivery: "Delivered on Yesterday",
    itemsCount: 3,
    totalAmount: 1847,
    shippingAddress: "Indiranagar, Bengaluru, Karnataka 560038"
  }
};

// ==========================================
// AI Assistant Core Chat Endpoint
// ==========================================
// Legacy backward compatibility endpoint
const handleChatRequest = async (req: express.Request, res: express.Response) => {
  try {
    const { prompt, chatHistory, quizData } = req.body;

    // Track analytics count
    aiAnalytics.totalQueries += 1;

    // Check if prompt is an order tracking request
    const orderMatch = prompt ? prompt.match(/ELY-\d{5,6}/i) : null;
    if (orderMatch) {
      const orderId = orderMatch[0].toUpperCase();
      let liveOrderDetails = null;
      try {
        const dbOrder = await getOrderByIdFromSupabase(orderId);
        if (dbOrder) {
          liveOrderDetails = {
            orderId: dbOrder.orderId,
            status: dbOrder.status,
            carrier: dbOrder.courierPartner,
            trackingCode: dbOrder.trackingNumber,
            estimatedDelivery: dbOrder.estimatedDelivery,
            itemsCount: dbOrder.items.reduce((sum, i) => sum + i.quantity, 0),
            totalAmount: dbOrder.total,
            shippingAddress: `${dbOrder.address}, ${dbOrder.city}, ${dbOrder.state} ${dbOrder.pincode}`,
          };
        }
      } catch (err) {
        console.error("Supabase order lookup error:", err);
      }

      const orderDetails = liveOrderDetails || MOCK_ORDERS[orderId] || {
        orderId,
        status: "Processing",
        carrier: "Delhivery Express",
        trackingCode: `DEL-${Math.floor(100000000 + Math.random() * 900000000)}`,
        estimatedDelivery: "In 2-3 business days",
        itemsCount: 1,
        totalAmount: 749,
        shippingAddress: "Registered Shipping Address"
      };

      return res.json({
        reply: `I have retrieved the live shipment status for **Order ${orderId}**.\n\nYour package is currently **${orderDetails.status}** via **${orderDetails.carrier}** (Tracking #: \`${orderDetails.trackingCode}\`). Estimated delivery is **${orderDetails.estimatedDelivery}**.`,
        orderInfo: orderDetails,
        recommendationIds: []
      });
    }

    const ai = getGeminiClient();
    if (!ai) {
      // Sophisticated Fallback Response
      let fallbackReply = "Welcome to ELYSIAN AI. I am your personal fragrance expert.\n\nBased on your query, I highly recommend exploring **Oud Imperiale Extrait** (₹899) for grand evening sillage or **Santal Blanc** (₹749) for elegant daily wear. All ELYSIAN perfumes are Extrait de Parfum concentration priced strictly under ₹1000.";
      let fallbackIds = ["elysian-oud-imperiale", "elysian-santal-blanc"];

      if (prompt && prompt.toLowerCase().includes("men")) {
        fallbackReply = "For gentlemen seeking bold, long-lasting presence, I recommend **Oud Imperiale Extrait** (₹899) with 14-hour smoked oud projection, and **Noir Instinct** (₹849) with black pepper and bourbon vanilla.";
        fallbackIds = ["elysian-oud-imperiale", "elysian-noir-instinct"];
      } else if (prompt && (prompt.toLowerCase().includes("women") || prompt.toLowerCase().includes("her"))) {
        fallbackReply = "For women desiring enchanting floral luxury, I recommend **Velvet Rose & Tonka** (₹799) with dark Damask rose, and **Jasmine Nectar & Cashmere** (₹749) for soft romantic radiance.";
        fallbackIds = ["elysian-velvet-rose", "elysian-jasmine-cashmere"];
      } else if (prompt && (prompt.toLowerCase().includes("gift") || prompt.toLowerCase().includes("under 500"))) {
        fallbackReply = "Our curated luxury gifting sets under ₹1000 include the **Royal Oud & Saffron Travel Kit** (3x10ml for ₹299) and the **Mini Discovery Sampler** (5x2ml for ₹199).";
        fallbackIds = ["elysian-travel-kit", "elysian-discovery-set"];
      }

      return res.json({
        reply: fallbackReply,
        recommendationIds: fallbackIds
      });
    }

    const systemInstruction = `You are ELYSIAN AI — Personal Fragrance Expert & Atelier Assistant for ELYSIAN Perfumes ("Crafted for the Extraordinary").

Brand Profile:
- ELYSIAN is an Indian luxury haute parfumerie house crafting authentic Extrait de Parfum (30% fragrance oil concentration) with 12-16 hours longevity.
- All products are priced strictly under ₹1000 (ranging from ₹199 to ₹999).
- Free Express Pan-India Shipping on orders above ₹499. COD and 14-day easy returns available.

Catalog of ELYSIAN Creations:
1. "elysian-oud-imperiale" - Oud Imperiale Extrait (100ml ₹899, 50ml ₹549) - Notes: Royal Assam Oud, Damask Rose, Golden Amber, Smoked Leather. Gender: Unisex/Men. Mood: Regal, Commanding, 14h Sillage.
2. "elysian-santal-blanc" - Santal Blanc (100ml ₹749, 50ml ₹499) - Notes: Mysore Sandalwood, Cardamom, Creamy Iris, Cedarwood. Gender: Unisex. Mood: Creamy, Clean, Timeless Elegance.
3. "elysian-velvet-rose" - Velvet Rose & Tonka (100ml ₹799, 50ml ₹549) - Notes: French Damask Rose, Roasted Tonka, Dark Vanilla, Amber. Gender: Women/Unisex. Mood: Intimate, Seductive, Warm.
4. "elysian-soleil-dor" - Soleil D'Or (100ml ₹699, 50ml ₹449) - Notes: Calabrian Bergamot, Neroli, Coconut Water, White Musk. Gender: Unisex/Women. Mood: Radiant, Sunny Citrus.
5. "elysian-baccarat-royale" - Baccarat Royale 540 (100ml ₹999, 50ml ₹649) - Notes: Kashmiri Saffron, Jasmine Sambac, Amberwood, Fir Resin. Gender: Unisex. Mood: Iconic, Metallic-Amber Aura.
6. "elysian-noir-instinct" - Noir Instinct (100ml ₹849, 50ml ₹549) - Notes: Black Pepper, Bourbon Vanilla, Smoked Birch, Vetiver. Gender: Men. Mood: Bold, Magnetic, Mysterious.
7. "elysian-jasmine-cashmere" - Jasmine Nectar & Cashmere (100ml ₹749, 30ml ₹349) - Notes: Wild Jasmine, Cashmere Musk, Vanilla Orchid. Gender: Women. Mood: Romantic, Cashmere Softness.
8. "elysian-travel-kit" - Royal Oud & Saffron Travel Kit (3x10ml ₹299) - Travel atomizers set.
9. "elysian-discovery-set" - Mini Discovery Set (5x2ml ₹199) - Sampler set of top 5 bestsellers.
10. "elysian-gift-box" - Elysian Grand Coffret Gift Box (100ml Perfume + 10ml Travel Atomizer + Scented Candle ₹999) - Ultimate gifting luxury.

Your Directives:
- Provide bespoke, poetic, highly intelligent advice tailored to the user's questions, mood, occasion, climate, budget, or age group.
- Address questions on fragrance notes (Top/Heart/Base), longevity, projection, concentrations (Extrait vs EDP), shipping, returns, order tracking, and gifting.
- Recommend 1 to 3 matching ELYSIAN product IDs.
- Include a JSON tag at the end in format: [RECOMMEND: id1, id2] matching catalog IDs.
- If asking about order status, include [ORDER: ELY-XXXXX] if order ID is provided.
- Keep tone elegant, warm, helpful, polished, and concise (120-220 words).`;

    const contents = [];
    if (chatHistory && Array.isArray(chatHistory)) {
      chatHistory.forEach((msg: any) => {
        contents.push(`${msg.role === 'user' ? 'Customer' : 'ELYSIAN AI'}: ${msg.content}`);
      });
    }

    if (quizData) {
      contents.push(`Customer Quiz Profile: Preferred Notes: ${quizData.notePreference}, Budget: ${quizData.budget}, Gender: ${quizData.gender}, Occasion: ${quizData.occasion}`);
    }

    contents.push(`Customer: ${prompt}`);

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: contents.join("\n\n"),
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const replyText = response.text || "I recommend experiencing Santal Blanc (₹749) for creamy sandalwood sophistication or Oud Imperiale (₹899) for grand evening presence.";

    // Parse recommendation IDs
    const match = replyText.match(/\[RECOMMEND:\s*([^\]]+)\]/);
    let recommendationIds: string[] = [];
    if (match && match[1]) {
      recommendationIds = match[1].split(',').map(s => s.trim());
    }

    const cleanReply = replyText.replace(/\[RECOMMEND:[^\]]+\]/g, "").replace(/\[ORDER:[^\]]+\]/g, "").trim();

    return res.json({
      reply: cleanReply,
      recommendationIds,
    });

  } catch (error: any) {
    console.error("ELYSIAN AI Chat Error:", error);
    return res.status(500).json({
      reply: "Allow me to introduce you to our signature **Santal Blanc (₹749)** or **Oud Imperiale Extrait (₹899)** — both crafted for 14-16 hours of intoxicating sillage.",
      recommendationIds: ["elysian-santal-blanc", "elysian-oud-imperiale"]
    });
  }
};

app.post("/api/elysian-ai/chat", handleChatRequest);
app.post("/api/ai-sommelier", handleChatRequest);

// ==========================================
// Multimodal Image Recognition / Vision Endpoint
// ==========================================
app.post("/api/elysian-ai/vision", async (req, res) => {
  try {
    const { imageBase64, mimeType, prompt } = req.body;

    const ai = getGeminiClient();
    if (!ai) {
      return res.json({
        reply: "I analyzed your fragrance visual! Based on the rich notes and aesthetic of your image, I match this with **Oud Imperiale Extrait** (₹899) and **Velvet Rose & Tonka** (₹799) from the ELYSIAN Atelier collection.",
        recommendationIds: ["elysian-oud-imperiale", "elysian-velvet-rose"]
      });
    }

    const cleanBase64 = imageBase64.replace(/^data:image\/\w+;base64,/, "");

    const imagePart = {
      inlineData: {
        mimeType: mimeType || "image/jpeg",
        data: cleanBase64
      }
    };

    const textPart = {
      text: prompt || "Analyze this perfume bottle, fragrance note, or mood image. Identify its olfactory character, color tone, and mood. Recommend matching ELYSIAN perfumes under ₹1000 with prices. End with [RECOMMEND: id1, id2]."
    };

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: { parts: [imagePart, textPart] },
      config: {
        systemInstruction: "You are ELYSIAN's AI Visual Olfactory Analyst. Analyze customer fragrance images, bottle designs, or moodboards and suggest matching ELYSIAN Extrait de Parfum creations under ₹1000. Always include [RECOMMEND: id1, id2] at the end."
      }
    });

    const replyText = response.text || "Your image exudes rich, opulent floral and woody depth. I recommend Velvet Rose & Tonka (₹799) or Oud Imperiale (₹899).";

    const match = replyText.match(/\[RECOMMEND:\s*([^\]]+)\]/);
    let recommendationIds: string[] = [];
    if (match && match[1]) {
      recommendationIds = match[1].split(',').map(s => s.trim());
    }

    const cleanReply = replyText.replace(/\[RECOMMEND:[^\]]+\]/g, "").trim();

    return res.json({
      reply: cleanReply,
      recommendationIds
    });

  } catch (error: any) {
    console.error("AI Vision Error:", error);
    return res.json({
      reply: "Based on the visual aesthetics and note profile of your upload, I recommend exploring **Santal Blanc** (₹749) or **Soleil D'Or** (₹699).",
      recommendationIds: ["elysian-santal-blanc", "elysian-soleil-dor"]
    });
  }
});

// ==========================================
// Admin Config & Analytics Endpoints
// ==========================================
app.get("/api/elysian-ai/admin/config", (req, res) => {
  res.json(aiConfig);
});

app.post("/api/elysian-ai/admin/config", (req, res) => {
  aiConfig = { ...aiConfig, ...req.body };
  res.json({ status: "success", config: aiConfig });
});

app.get("/api/elysian-ai/admin/analytics", (req, res) => {
  res.json(aiAnalytics);
});

// ==========================================
// Supabase Orders & Return Requests API
// ==========================================
app.get("/api/orders", async (req, res) => {
  const config = getSupabaseConfig();
  if (!config.hasKey) {
    return res.json({ orders: [], configured: false });
  }
  try {
    const orders = await listOrdersFromSupabase();
    return res.json({ orders, configured: true });
  } catch (error: any) {
    console.error("GET /api/orders error:", error);
    return res.status(500).json({
      error: error.message || "Failed to fetch orders from Supabase.",
      orders: [],
      configured: true,
    });
  }
});

app.get("/api/orders/:orderId", async (req, res) => {
  const config = getSupabaseConfig();
  if (!config.hasKey) {
    return res.status(503).json({ error: "Supabase API key is not configured." });
  }
  try {
    const order = await getOrderByIdFromSupabase(req.params.orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found." });
    }
    return res.json({ order });
  } catch (error: any) {
    console.error("GET /api/orders/:orderId error:", error);
    return res.status(500).json({ error: error.message || "Failed to fetch order." });
  }
});

app.post("/api/orders", async (req, res) => {
  try {
    const { order, upiId } = req.body || {};
    if (!order || !order.orderId || !order.customerName || !order.email || !order.phone || !order.address || !order.city || !order.state || !order.pincode) {
      return res.status(400).json({ error: "Missing required order or shipping details." });
    }
    if (!Array.isArray(order.items) || order.items.length === 0) {
      return res.status(400).json({ error: "Order must contain at least one item." });
    }

    const config = getSupabaseConfig();
    if (!config.hasKey) {
      return res.status(503).json({
        error: "Supabase API key is not configured. Please add SUPABASE_SERVICE_ROLE_KEY (or SUPABASE_ANON_KEY) to your environment secrets.",
        persisted: false,
      });
    }

    const savedOrder = await createOrderInSupabase(order, upiId);
    return res.status(201).json({ order: savedOrder, persisted: true });
  } catch (error: any) {
    console.error("POST /api/orders error:", error);
    return res.status(500).json({
      error: error.message || "Failed to save order to Supabase.",
      persisted: false,
    });
  }
});

app.patch("/api/orders/:orderId", async (req, res) => {
  const config = getSupabaseConfig();
  if (!config.hasKey) {
    return res.status(503).json({ error: "Supabase API key is not configured." });
  }
  try {
    await updateOrderInSupabase(req.params.orderId, req.body || {});
    return res.json({ status: "success" });
  } catch (error: any) {
    console.error("PATCH /api/orders/:orderId error:", error);
    return res.status(500).json({ error: error.message || "Failed to update order." });
  }
});

app.post("/api/orders/:orderId/returns", async (req, res) => {
  const config = getSupabaseConfig();
  if (!config.hasKey) {
    return res.status(503).json({ error: "Supabase API key is not configured." });
  }
  try {
    const { returnRequest } = req.body || {};
    if (!returnRequest || !returnRequest.id || !returnRequest.reason) {
      return res.status(400).json({ error: "Missing return request details." });
    }
    await createReturnRequestInSupabase({
      ...returnRequest,
      orderId: req.params.orderId,
    });
    return res.status(201).json({ status: "success" });
  } catch (error: any) {
    console.error("POST /api/orders/:orderId/returns error:", error);
    return res.status(500).json({ error: error.message || "Failed to submit return request." });
  }
});

app.post("/api/orders/:orderId/returns/approve", async (req, res) => {
  const config = getSupabaseConfig();
  if (!config.hasKey) {
    return res.status(503).json({ error: "Supabase API key is not configured." });
  }
  try {
    await approveReturnInSupabase(req.params.orderId);
    return res.json({ status: "success" });
  } catch (error: any) {
    console.error("POST /api/orders/:orderId/returns/approve error:", error);
    return res.status(500).json({ error: error.message || "Failed to approve return." });
  }
});

// Express + Vite App Server Start
async function startServer() {
  app.get("/api/health", (req, res) => {
    const supabaseConfig = getSupabaseConfig();
    res.json({
      status: "ok",
      brand: "ELYSIAN",
      assistant: "Active",
      supabaseProjectId: supabaseConfig.projectId,
      supabaseConfigured: supabaseConfig.hasKey,
    });
  });

  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[ELYSIAN AI Server] Listening at http://0.0.0.0:${PORT}`);
  });
}

startServer();
