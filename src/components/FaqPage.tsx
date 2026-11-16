import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  ChevronDown,
  Truck,
  RotateCw,
  CreditCard,
  PackageCheck,
  HelpCircle,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  Mail,
  Phone,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  UserCheck,
  Tag,
  Gift,
  Headphones,
  Sparkle,
  ArrowUp,
  Droplet,
  Lock
} from 'lucide-react';
import { AnimatedSection } from './AnimatedSection';

export interface FaqItem {
  id: string;
  category: 'orders' | 'shipping' | 'returns' | 'payments' | 'products' | 'account' | 'offers' | 'giftcards' | 'contact';
  categoryLabel: string;
  question: string;
  answer: string;
  highlights?: string[];
}

export const FAQ_DATA: FaqItem[] = [
  // ORDERS
  {
    id: 'ord-1',
    category: 'orders',
    categoryLabel: 'Orders',
    question: 'How do I place an order?',
    answer: 'Placing an order on ELYSIAN is simple and seamless. Browse our Extrait De Parfum catalog, select your desired fragrance size (50ml or Discovery Set), click "Add to Cart", and proceed to checkout. You can check out as a guest or create an account for fast reordering and exclusive rewards.',
    highlights: ['Guest Checkout Supported', 'Instant Order Confirmation via WhatsApp', '100% Secure Process']
  },
  {
    id: 'ord-2',
    category: 'orders',
    categoryLabel: 'Orders',
    question: 'Can I cancel my order?',
    answer: 'Yes! You can cancel your order free of charge within 2 hours of placing it, before our Delhi atelier labels and packages your parcel. To cancel, visit your WhatsApp order notification message or email concierge@elysian.in with your Order ID.',
    highlights: ['2-Hour Free Cancellation Window', 'Instant Full Refund for Prepaid Orders']
  },
  {
    id: 'ord-3',
    category: 'orders',
    categoryLabel: 'Orders',
    question: 'How can I track my order?',
    answer: 'Once your order is dispatched, you will automatically receive a real-time tracking link on WhatsApp and SMS via our premium courier partners (BlueDart / Delhivery / Bluedart Express). You can click the link to see live GPS tracking of your shipment.',
    highlights: ['Live GPS Tracking', 'WhatsApp & SMS Automated Dispatch Alerts']
  },
  {
    id: 'ord-4',
    category: 'orders',
    categoryLabel: 'Orders',
    question: 'Can I modify my order after placing it?',
    answer: 'Order modifications (such as changing the fragrance variant, bottle size, or adding gift messaging) can be made within 2 hours of order confirmation by contacting our VIP Concierge team directly via Live Chat or WhatsApp.',
    highlights: ['Flexible Variant & Note Modification', 'Dedicated Concierge Assistance']
  },
  {
    id: 'ord-5',
    category: 'orders',
    categoryLabel: 'Orders',
    question: 'What if I entered the wrong address?',
    answer: 'If you notice an error in your delivery address, please reach out to our team immediately via WhatsApp or Email before dispatch. Once the parcel is in transit, we can re-route your delivery with our courier partner with a 24-hour delay window.',
    highlights: ['Free Address Re-routing', 'Instant Delivery Address Updates']
  },

  // SHIPPING
  {
    id: 'ship-1',
    category: 'shipping',
    categoryLabel: 'Shipping',
    question: 'Do you offer free shipping?',
    answer: 'Yes! Free express shipping is available on all orders above ₹499 across India. For orders below ₹499, a nominal flat express shipping fee of ₹40 is applied at checkout.',
    highlights: ['Complimentary Free Shipping on ₹499+', 'Flat ₹40 for smaller orders', 'No hidden packaging fees']
  },
  {
    id: 'ship-2',
    category: 'shipping',
    categoryLabel: 'Shipping',
    question: 'How long does delivery take?',
    answer: 'Delivery typically takes 3–7 business days across India. Orders in Metro cities (Delhi NCR, Mumbai, Bengaluru, Hyderabad, Kolkata, Chennai) arrive in 2–3 business days, while non-metro and tier-2/3 regions take 3–5 business days.',
    highlights: ['3–7 Business Days Nationwide', 'Same-Day Atelier Dispatch before 2 PM']
  },
  {
    id: 'ship-3',
    category: 'shipping',
    categoryLabel: 'Shipping',
    question: 'Which courier partners do you use?',
    answer: 'We partner exclusively with India’s leading express air freight couriers including BlueDart, Delhivery, XpressBees, and DTDC to ensure tamper-evident, temperature-controlled delivery of your perfumes.',
    highlights: ['Air Freight Express Cargo', 'Shock-Absorbing Rigid Velvet Packaging']
  },
  {
    id: 'ship-4',
    category: 'shipping',
    categoryLabel: 'Shipping',
    question: 'Do you deliver to all states in India?',
    answer: 'Yes! ELYSIAN delivers to over 19,000+ pincodes across all 28 states and Union Territories in India, including remote island and mountain territories.',
    highlights: ['19,000+ Pin Codes Covered', 'Pan-India Reach']
  },

  // RETURNS & REFUNDS
  {
    id: 'ret-1',
    category: 'returns',
    categoryLabel: 'Returns & Refunds',
    question: 'What is your return policy?',
    answer: 'We offer a 14-day risk-free return and exchange policy. Every full-sized 50ml bottle includes a complimentary 2ml sample vial in the box. We encourage you to test the 2ml sample first before unsealing the main bottle. Sealed bottles are 100% eligible for a full return or exchange!',
    highlights: ['14-Day Hassle-Free Returns', 'Free 2ml Sample Vial Included', 'Free Reverse Pickup']
  },
  {
    id: 'ret-2',
    category: 'returns',
    categoryLabel: 'Returns & Refunds',
    question: 'Can I return a used perfume?',
    answer: 'For hygiene and safety compliance under cosmetics guidelines, we cannot accept returns on main 50ml bottles that have been unsealed or sprayed. This is why every order includes a complimentary 2ml sample vial so you can test the scent risk-free before opening the main box seal.',
    highlights: ['Risk-Free Testing with 2ml Sample', 'Unopened Main Bottles Fully Refundable']
  },
  {
    id: 'ret-3',
    category: 'returns',
    categoryLabel: 'Returns & Refunds',
    question: 'How do I request a return?',
    answer: 'To request a return, simply email concierge@elysian.in or message us on WhatsApp with your Order ID and photo of the sealed package. We will dispatch a courier agent to pick up the parcel directly from your doorstep within 24-48 hours.',
    highlights: ['Doorstep Reverse Pickup', 'No Paper Printing Required']
  },
  {
    id: 'ret-4',
    category: 'returns',
    categoryLabel: 'Returns & Refunds',
    question: 'How long does the refund take?',
    answer: 'Once our quality team receives the returned item, your refund is processed within 24 hours. Refunds to UPI, Credit/Debit cards, or Net Banking reflect in 1-2 business days. For COD orders, we transfer refunds directly via UPI or NEFT to your bank account.',
    highlights: ['24-Hour Return Inspection', 'Direct Bank/UPI Transfer for COD']
  },
  {
    id: 'ret-5',
    category: 'returns',
    categoryLabel: 'Returns & Refunds',
    question: 'What products cannot be returned?',
    answer: 'Discovery Sample Vials, Custom Engraved Perfume Bottles, and Final Sale Clearance items cannot be returned due to custom formulation and personal hygiene safety.',
    highlights: ['Clear Policy Transparency', 'Engraved items are final sale']
  },

  // PAYMENTS
  {
    id: 'pay-1',
    category: 'payments',
    categoryLabel: 'Payments',
    question: 'Which payment methods are accepted?',
    answer: 'We accept all popular payment modes in India: UPI (Google Pay, PhonePe, Paytm, CRED, BHIM), Credit/Debit Cards (Visa, Mastercard, RuPay, Amex), Net Banking across 50+ banks, Buy Now Pay Later (Simpl, LazyPay), and Cash on Delivery (COD).',
    highlights: ['UPI (GPay, PhonePe, Paytm)', 'Cards (Visa, MC, RuPay)', 'Cash on Delivery']
  },
  {
    id: 'pay-2',
    category: 'payments',
    categoryLabel: 'Payments',
    question: 'Is Cash on Delivery available?',
    answer: 'Yes! Cash on Delivery is available across 19,000+ pin codes in India. There are no hidden fees or extra charges for selecting COD.',
    highlights: ['Zero Extra COD Surcharges', 'Inspect Outer Box Seal Before Payment']
  },
  {
    id: 'pay-3',
    category: 'payments',
    categoryLabel: 'Payments',
    question: 'Is online payment secure?',
    answer: '100% bank-grade security. All online transactions on ELYSIAN are processed using 256-Bit SSL Encryption via PCI-DSS Level 1 compliant gateways (Razorpay & Cashfree). We never store or log your private banking credentials.',
    highlights: ['256-Bit SSL Encrypted', 'PCI-DSS Level 1 Compliant']
  },

  // PRODUCTS
  {
    id: 'prod-1',
    category: 'products',
    categoryLabel: 'Products',
    question: 'Are your perfumes long-lasting?',
    answer: 'Extremely! All ELYSIAN creations are formulated at 30% Extrait De Parfum concentration (the highest tier in French perfumery). They contain genuine Grasse botanical essential oils providing 12–16+ hours of projection and longevity on skin and fabric.',
    highlights: ['30% Oil Concentration (Extrait)', '12-16+ Hours Sillage & Longevity']
  },
  {
    id: 'prod-2',
    category: 'products',
    categoryLabel: 'Products',
    question: 'Are your perfumes suitable for sensitive skin?',
    answer: 'Yes. ELYSIAN formulations are IFRA-certified, 100% vegan, cruelty-free, and formulated without harmful phthalates, parabens, or synthetic dye irritants.',
    highlights: ['Dermatologically Tested', '100% Vegan & Cruelty-Free', 'IFRA Certified Safe']
  },
  {
    id: 'prod-3',
    category: 'products',
    categoryLabel: 'Products',
    question: 'What is the difference between Eau de Parfum and Eau de Toilette?',
    answer: 'The primary difference lies in fragrance oil concentration: Eau de Toilette (EDT) contains 5-10% oil (lasts 2-4 hrs), Eau de Parfum (EDP) contains 15-20% oil (lasts 6-8 hrs), while ELYSIAN Extrait De Parfum contains 30% oil concentration (lasts 12-16+ hrs) for deep, velvety richness.',
    highlights: ['30% Extrait De Parfum = Maximum Longevity', 'Velvety Rich Projection']
  },
  {
    id: 'prod-4',
    category: 'products',
    categoryLabel: 'Products',
    question: 'Which perfume is best for daily wear?',
    answer: 'For everyday office, casual, and morning wear, we recommend "Verdant Aura" (crisp citrus-vetiver) or "Aura de Soir" (clean white floral amber). For evening galas and date nights, "Midnight Amber" and "Noir Absolute" provide unforgettable projection.',
    highlights: ['Verdant Aura for Fresh Daily Wear', 'Midnight Amber for Evening Elegance']
  },
  {
    id: 'prod-5',
    category: 'products',
    categoryLabel: 'Products',
    question: 'How should I store my perfume?',
    answer: 'To preserve the delicate top and heart notes of your Extrait De Parfum, store your bottle in a cool, dark place away from direct sunlight, humidity (like bathrooms), and extreme heat fluctuations.',
    highlights: ['Store Away From Direct Sunlight', 'Keep in Luxury Box for Long Life']
  },

  // ACCOUNT
  {
    id: 'acc-1',
    category: 'account',
    categoryLabel: 'Account',
    question: 'How do I create an account?',
    answer: 'You can create an account in 30 seconds by clicking the User icon in the top right header navigation. Simply enter your email address and preferred password to unlock members-only rewards and early access sales.',
    highlights: ['Instant Signup', 'Unlock VIP Scent Rewards']
  },
  {
    id: 'acc-2',
    category: 'account',
    categoryLabel: 'Account',
    question: 'How do I reset my password?',
    answer: 'On the login drawer screen, click "Forgot Password?". Enter your registered email address, and we will send you a secure 1-click password reset link immediately.',
    highlights: ['1-Click Secure Password Reset', 'Automated Email Alert']
  },
  {
    id: 'acc-3',
    category: 'account',
    categoryLabel: 'Account',
    question: 'Can I order without creating an account?',
    answer: 'Yes! Guest checkout is fully enabled. You do not need to register an account to place an order, though having an account lets you view past order receipts and save delivery addresses.',
    highlights: ['100% Guest Checkout Friendly', 'No Mandatory Registration']
  },

  // OFFERS
  {
    id: 'off-1',
    category: 'offers',
    categoryLabel: 'Offers',
    question: 'How can I use a coupon code?',
    answer: 'You can enter your promotional coupon code (e.g., ELYSIAN10 for 10% off or WELCOME100 for ₹100 flat discount) in the "Promo Code" input field inside your Cart Drawer or Checkout screen before selecting your payment option.',
    highlights: ['Easy Cart Coupon Input', 'Instant Deduction Preview']
  },
  {
    id: 'off-2',
    category: 'offers',
    categoryLabel: 'Offers',
    question: 'Can I combine multiple offers?',
    answer: 'Only one promotional coupon code can be applied per order. However, coupon codes CAN be combined with site-wide Auto-Discount promotions and Free Express Shipping offers!',
    highlights: ['Stackable with Free Shipping', 'Best Price Guarantee']
  },

  // GIFT CARDS
  {
    id: 'gift-1',
    category: 'giftcards',
    categoryLabel: 'Gift Cards',
    question: 'How do gift cards work?',
    answer: 'ELYSIAN Digital Gift Cards are sent instantly via email to you or your chosen recipient. They contain a unique 16-digit voucher code that can be redeemed across any perfume, discovery set, or accessory on our store.',
    highlights: ['Instant Digital Delivery', 'Personalized Gift Message Option']
  },
  {
    id: 'gift-2',
    category: 'giftcards',
    categoryLabel: 'Gift Cards',
    question: 'Do gift cards expire?',
    answer: 'No! ELYSIAN Digital Gift Cards have zero expiration date and zero inactivity fees. They can be redeemed whenever the recipient is ready to discover their signature scent.',
    highlights: ['Never Expires', 'No Inactivity Fees']
  },

  // CONTACT SUPPORT
  {
    id: 'con-1',
    category: 'contact',
    categoryLabel: 'Contact Support',
    question: 'How can I contact customer support?',
    answer: 'You can reach our VIP Concierge via WhatsApp live chat (+91 800-ELYSIAN), email us directly at concierge@elysian.in, or speak with our AI Scent Sommelier 24/7 on the website.',
    highlights: ['WhatsApp Live Chat Support', 'Direct Email Assistance: concierge@elysian.in']
  },
  {
    id: 'con-2',
    category: 'contact',
    categoryLabel: 'Contact Support',
    question: 'What are your support hours?',
    answer: 'Our human concierge team is available Monday through Sunday from 9:00 AM to 9:00 PM IST. Inquiries submitted outside these hours are answered within 4 business hours.',
    highlights: ['7 Days a Week Support', '9:00 AM – 9:00 PM IST']
  }
];

interface FaqPageProps {
  onBackToHome: () => void;
  onOpenAiSommelier?: () => void;
}

export const FaqPage: React.FC<FaqPageProps> = ({ onBackToHome, onOpenAiSommelier }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedId, setExpandedId] = useState<string | null>('ord-1');
  const [helpfulFeedback, setHelpfulFeedback] = useState<Record<string, 'yes' | 'no'>>({});
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);

  // Monitor scroll for Back To Top Button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filtered FAQs based on category and search query
  const filteredFaqs = useMemo(() => {
    return FAQ_DATA.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const qLower = item.question.toLowerCase();
      const aLower = item.answer.toLowerCase();
      const sLower = searchQuery.toLowerCase();
      const matchesSearch = !searchQuery || qLower.includes(sLower) || aLower.includes(sLower);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const toggleAccordion = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handleFeedback = (id: string, value: 'yes' | 'no') => {
    setHelpfulFeedback((prev) => ({ ...prev, [id]: value }));
  };

  const categories = [
    { id: 'all', label: 'All', icon: HelpCircle, count: FAQ_DATA.length },
    { id: 'orders', label: 'Orders', icon: PackageCheck, count: FAQ_DATA.filter(f => f.category === 'orders').length },
    { id: 'shipping', label: 'Shipping', icon: Truck, count: FAQ_DATA.filter(f => f.category === 'shipping').length },
    { id: 'returns', label: 'Returns & Refunds', icon: RotateCw, count: FAQ_DATA.filter(f => f.category === 'returns').length },
    { id: 'payments', label: 'Payments', icon: CreditCard, count: FAQ_DATA.filter(f => f.category === 'payments').length },
    { id: 'products', label: 'Products', icon: Droplet, count: FAQ_DATA.filter(f => f.category === 'products').length },
    { id: 'account', label: 'Account', icon: UserCheck, count: FAQ_DATA.filter(f => f.category === 'account').length },
    { id: 'offers', label: 'Offers', icon: Tag, count: FAQ_DATA.filter(f => f.category === 'offers').length },
    { id: 'giftcards', label: 'Gift Cards', icon: Gift, count: FAQ_DATA.filter(f => f.category === 'giftcards').length },
    { id: 'contact', label: 'Contact Support', icon: Headphones, count: FAQ_DATA.filter(f => f.category === 'contact').length },
  ];

  return (
    <div className="min-h-screen bg-[#F8F6F2] text-[#1F1F1F] font-inter pb-20 relative">

      {/* Floating Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 bg-[#1F1F1F] text-[#C8A24A] border border-[#C8A24A] p-3.5 rounded-full shadow-2xl hover:bg-[#C8A24A] hover:text-[#1F1F1F] transition-all cursor-pointer hover:scale-110 active:scale-95"
            aria-label="Back to Top"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>
      
      {/* Editorial Hero Header Banner with Perfume Background */}
      <div className="relative bg-[#171717] text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden mb-12 shadow-md">
        
        {/* Luxury Blurred Background Image Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-25 scale-105 filter blur-sm transition-all duration-1000"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=1600&auto=format&fit=crop')`
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#171717]/80 via-[#171717]/90 to-[#F8F6F2]"></div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6">
          
          {/* Top Brand Tagline Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 border border-[#C8A24A]/50 bg-[#C8A24A]/10 text-[#C8A24A] px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-montserrat uppercase tracking-[0.3em] font-semibold backdrop-blur-md"
          >
            <Sparkles size={14} className="text-[#C8A24A]" />
            <span>Crafted for the Extraordinary</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-cormorant text-4xl sm:text-6xl lg:text-7xl font-light text-white tracking-wide leading-tight"
          >
            Frequently Asked <span className="italic font-normal text-[#C8A24A]">Questions</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-inter text-sm sm:text-base text-gray-300 font-light max-w-2xl mx-auto leading-relaxed"
          >
            Everything you need to know about orders, shipping, payments, returns, and our fragrances.
          </motion.p>

          {/* Premium Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative max-w-xl mx-auto pt-4"
          >
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#C8A24A]" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search your question..."
              className="w-full bg-white/95 backdrop-blur-md border border-[#E8E2D7] focus:border-[#C8A24A] focus:ring-2 focus:ring-[#C8A24A]/30 rounded-full pl-14 pr-12 py-4 text-sm font-inter text-[#1F1F1F] placeholder-gray-400 shadow-2xl focus:outline-none transition-all duration-300"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-xs font-montserrat uppercase tracking-wider text-gray-400 hover:text-[#1F1F1F] cursor-pointer"
              >
                Clear
              </button>
            )}
          </motion.div>

          {/* Back Button */}
          <div className="pt-2">
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-2 text-xs font-montserrat uppercase tracking-[0.2em] font-semibold text-gray-300 hover:text-[#C8A24A] transition-all cursor-pointer hover:scale-105 active:scale-95"
            >
              <ArrowLeft size={16} />
              <span>Back to Main Collection</span>
            </button>
          </div>

        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Sticky & Scrollable Category Tabs Bar */}
        <AnimatedSection className="sticky top-20 z-30 bg-[#F8F6F2]/90 backdrop-blur-md py-4 mb-10 border-b border-[#E8E2D7]">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 pt-1 px-1">
            {categories.map((cat) => {
              const IconComp = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    setExpandedId(null);
                  }}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-montserrat uppercase tracking-wider font-bold transition-all duration-300 shrink-0 cursor-pointer hover:scale-105 active:scale-95 ${
                    isActive
                      ? 'bg-[#1F1F1F] text-[#C8A24A] border border-[#C8A24A] shadow-md'
                      : 'bg-white text-[#1F1F1F] hover:bg-[#F4F1EA] border border-[#E8E2D7]'
                  }`}
                >
                  <IconComp size={15} className={isActive ? 'text-[#C8A24A]' : 'text-gray-500'} />
                  <span>{cat.label}</span>
                  <span
                    className={`ml-1 text-[10px] px-2 py-0.5 rounded-full ${
                      isActive ? 'bg-[#C8A24A] text-[#1F1F1F]' : 'bg-[#E8E2D7] text-[#666666]'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </AnimatedSection>

        {/* Accordion Questions List */}
        <div className="space-y-4 mb-20 max-w-4xl mx-auto">
          <AnimatePresence mode="popLayout">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq) => {
                const isExpanded = expandedId === faq.id;
                const feedback = helpfulFeedback[faq.id];

                return (
                  <motion.div
                    key={faq.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className={`bg-white border rounded-2xl transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md ${
                      isExpanded ? 'border-[#C8A24A] ring-1 ring-[#C8A24A]/40' : 'border-[#E8E2D7]'
                    }`}
                  >
                    {/* Accordion Header / Question */}
                    <button
                      onClick={() => toggleAccordion(faq.id)}
                      className="w-full text-left p-6 sm:p-7 flex items-start justify-between gap-4 cursor-pointer group"
                      aria-expanded={isExpanded}
                    >
                      <div className="space-y-2 pr-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-montserrat uppercase tracking-widest font-bold text-[#C8A24A] bg-[#C8A24A]/10 px-2.5 py-0.5 rounded-full">
                            {faq.categoryLabel}
                          </span>
                        </div>
                        <h3 className="font-cormorant text-xl sm:text-2xl font-semibold text-[#1F1F1F] group-hover:text-[#C8A24A] transition-colors leading-snug">
                          {faq.question}
                        </h3>
                      </div>

                      {/* Gold Chevron Icon */}
                      <div
                        className={`p-2.5 rounded-full border transition-transform duration-300 shrink-0 ${
                          isExpanded
                            ? 'bg-[#1F1F1F] text-[#C8A24A] border-[#1F1F1F] rotate-180 shadow-md'
                            : 'bg-[#F8F6F2] text-[#1F1F1F] border-[#E8E2D7] group-hover:border-[#C8A24A]'
                        }`}
                      >
                        <ChevronDown size={20} />
                      </div>
                    </button>

                    {/* Accordion Body / Answer */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <div className="px-6 pb-7 sm:px-7 sm:pb-7 pt-0 border-t border-[#F4F1EA] text-sm text-[#444444] leading-relaxed space-y-5">
                            
                            <p className="pt-5 font-inter text-sm sm:text-base font-light text-[#333333] leading-relaxed">
                              {faq.answer}
                            </p>

                            {/* Key Highlights Badges */}
                            {faq.highlights && faq.highlights.length > 0 && (
                              <div className="flex flex-wrap items-center gap-2 pt-1">
                                {faq.highlights.map((item, idx) => (
                                  <span
                                    key={idx}
                                    className="inline-flex items-center gap-1.5 text-xs font-montserrat font-semibold text-[#1F1F1F] bg-[#F8F6F2] border border-[#E8E2D7] px-3 py-1.5 rounded-full"
                                  >
                                    <CheckCircle2 size={14} className="text-[#C8A24A]" />
                                    <span>{item}</span>
                                  </span>
                                ))}
                              </div>
                            )}

                            {/* Was this answer helpful? */}
                            <div className="pt-4 border-t border-[#F4F1EA] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-montserrat text-[#666666]">
                              <span>Was this answer helpful?</span>

                              <div className="flex items-center gap-3">
                                {feedback ? (
                                  <span className="text-[#C8A24A] font-bold flex items-center gap-1.5 bg-[#C8A24A]/10 px-3 py-1 rounded-full">
                                    <CheckCircle2 size={13} />
                                    <span>Thank you for your feedback!</span>
                                  </span>
                                ) : (
                                  <>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleFeedback(faq.id, 'yes');
                                      }}
                                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#E8E2D7] hover:border-[#C8A24A] hover:bg-[#C8A24A]/10 transition-all cursor-pointer hover:scale-105 active:scale-95"
                                    >
                                      <ThumbsUp size={13} />
                                      <span>Yes</span>
                                    </button>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleFeedback(faq.id, 'no');
                                      }}
                                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#E8E2D7] hover:border-[#1F1F1F] hover:bg-gray-100 transition-all cursor-pointer hover:scale-105 active:scale-95"
                                    >
                                      <ThumbsDown size={13} />
                                      <span>No</span>
                                    </button>
                                  </>
                                )}
                              </div>
                            </div>

                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white border border-[#E8E2D7] rounded-3xl p-12 text-center space-y-4 shadow-sm"
              >
                <HelpCircle size={44} className="mx-auto text-[#C8A24A]" />
                <h3 className="font-cormorant text-2xl font-semibold text-[#1F1F1F]">
                  No questions found matching "{searchQuery}"
                </h3>
                <p className="font-inter text-xs text-gray-500 max-w-md mx-auto">
                  Try searching for terms like "shipping", "refund", "COD", "EDP", or "delivery", or speak with our live concierge.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('all');
                  }}
                  className="bg-[#1F1F1F] text-[#C8A24A] px-6 py-2.5 rounded-full text-xs font-montserrat uppercase tracking-wider font-bold hover:bg-[#C8A24A] hover:text-[#1F1F1F] transition-all cursor-pointer"
                >
                  Reset Search & Category Filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Call to Action Section */}
        <AnimatedSection className="bg-[#171717] text-[#F8F6F2] rounded-3xl p-8 sm:p-14 border border-[#C8A24A]/40 shadow-2xl relative overflow-hidden mb-12">
          <div className="absolute right-0 top-0 w-96 h-96 bg-[#C8A24A]/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
            <div className="space-y-3 max-w-xl">
              <div className="inline-flex items-center gap-2 text-[#C8A24A] text-xs font-montserrat uppercase tracking-widest font-bold bg-[#C8A24A]/10 px-3.5 py-1 rounded-full border border-[#C8A24A]/30">
                <ShieldCheck size={16} />
                <span>Concierge Assistance Available</span>
              </div>
              <h2 className="font-cormorant text-3xl sm:text-5xl font-light text-white leading-tight">
                Still Have <span className="italic font-normal text-[#C8A24A]">Questions?</span>
              </h2>
              <p className="font-inter text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
                We're here to help. Our master fragrance concierges and AI Sommelier are available to assist you with order updates, bespoke fragrance recommendations, or custom gifting.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3.5 w-full lg:w-auto">
              <a
                href="mailto:concierge@elysian.in"
                className="bg-[#C8A24A] hover:bg-white text-[#1F1F1F] px-6 py-3.5 rounded-full font-montserrat text-xs uppercase tracking-widest font-bold transition-all flex items-center justify-center gap-2 shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Mail size={16} />
                <span>Contact Support</span>
              </a>

              {onOpenAiSommelier && (
                <button
                  onClick={onOpenAiSommelier}
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3.5 rounded-full font-montserrat text-xs uppercase tracking-widest font-semibold transition-all flex items-center justify-center gap-2 hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <Sparkles size={16} className="text-[#C8A24A]" />
                  <span>Live Chat AI</span>
                </button>
              )}

              <a
                href="mailto:concierge@elysian.in"
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3.5 rounded-full font-montserrat text-xs uppercase tracking-widest font-semibold transition-all flex items-center justify-center gap-2 hover:scale-105 active:scale-95 cursor-pointer"
              >
                <Mail size={16} className="text-[#C8A24A]" />
                <span>Email Us</span>
              </a>
            </div>
          </div>
        </AnimatedSection>

      </div>
    </div>
  );
};
