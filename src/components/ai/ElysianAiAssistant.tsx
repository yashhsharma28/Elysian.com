import React, { useState, useEffect, useRef } from 'react';
import {
  X,
  Sparkles,
  Send,
  Bot,
  User,
  ShoppingBag,
  Mic,
  MicOff,
  Image as ImageIcon,
  Copy,
  Check,
  Volume2,
  VolumeX,
  RotateCcw,
  ThumbsUp,
  ThumbsDown,
  Maximize2,
  Minimize2,
  Trash2,
  History,
  Star,
  Package,
  Search,
  HelpCircle,
  Compass,
  ArrowRight,
  ShieldCheck,
  Truck,
  Heart,
  Eye,
  SlidersHorizontal
} from 'lucide-react';
import { PerfumeProduct, AiChatMessage, AiChatSession, PerfumeQuizState } from '../../types';

interface ElysianAiAssistantProps {
  isOpen: boolean;
  onClose: () => void;
  allProducts: PerfumeProduct[];
  onAddToCart: (product: PerfumeProduct, selectedSize: string, price: number) => void;
  onSelectProduct: (product: PerfumeProduct) => void;
  onToggleWishlist?: (product: PerfumeProduct) => void;
  onOpenOrders?: (orderId?: string) => void;
  wishlist?: PerfumeProduct[];
}

export const ElysianAiAssistant: React.FC<ElysianAiAssistantProps> = ({
  isOpen,
  onClose,
  allProducts,
  onAddToCart,
  onSelectProduct,
  onToggleWishlist,
  onOpenOrders,
  wishlist = []
}) => {
  if (!isOpen) return null;

  // View States
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isQuizMode, setIsQuizMode] = useState(false);
  const [isTtsEnabled, setIsTtsEnabled] = useState(false);
  const [isListening, setIsListening] = useState(false);

  // Input & Upload States
  const [inputPrompt, setInputPrompt] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [feedbackToast, setFeedbackToast] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Chat Sessions History
  const [chatHistory, setChatHistory] = useState<AiChatSession[]>(() => {
    const saved = localStorage.getItem('elysian_ai_sessions');
    return saved ? JSON.parse(saved) : [];
  });

  // Current Active Messages
  const [messages, setMessages] = useState<AiChatMessage[]>([
    {
      id: 'welcome-msg',
      role: 'assistant',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      content: `Welcome to ELYSIAN AI.

I'm your personal fragrance expert.

I can help you discover the perfect perfume, compare fragrances, recommend gifts, track orders, answer questions, and provide personalized shopping advice.`,
      recommendations: [allProducts[0], allProducts[1]]
    }
  ]);

  // Quiz State
  const [quizStep, setQuizStep] = useState(1);
  const [quizState, setQuizState] = useState<PerfumeQuizState>({
    notePreference: 'Oud',
    budget: '₹700–₹999',
    gender: 'Unisex',
    occasion: 'Special Evening'
  });

  const chatEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Save sessions to localStorage
  useEffect(() => {
    if (messages.length > 1) {
      const currentSession: AiChatSession = {
        id: 'session-current',
        title: messages[1]?.content?.slice(0, 30) || 'Fragrance Consultation',
        updatedAt: new Date().toLocaleDateString(),
        messages
      };
      const updated = [currentSession, ...chatHistory.filter((s) => s.id !== 'session-current')];
      setChatHistory(updated.slice(0, 10));
      localStorage.setItem('elysian_ai_sessions', JSON.stringify(updated.slice(0, 10)));
    }
  }, [messages]);

  // Suggested Prompts
  const suggestedPrompts = [
    'Recommend perfumes based on my personality',
    'Best perfumes for Men under ₹999',
    'Compare Oud Imperiale vs Santal Blanc',
    'Track my order ELY-98234',
    'Recommend a luxury gift set for her',
    'Explain Extrait de Parfum concentration'
  ];

  // Speech Recognition Handler
  const handleToggleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      showToast('Voice input is not supported in this browser.');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        showToast('Listening... Speak your perfume request.');
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputPrompt(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
        showToast('Could not capture audio. Please try again.');
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (e) {
      setIsListening(false);
      showToast('Voice speech recognition error.');
    }
  };

  // Text To Speech Handler
  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    if (isTtsEnabled) {
      setIsTtsEnabled(false);
      return;
    }
    const clean = text.replace(/[*#]/g, '');
    const utterance = new SpeechSynthesisUtterance(clean);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    utterance.onend = () => setIsTtsEnabled(false);
    setIsTtsEnabled(true);
    window.speechSynthesis.speak(utterance);
  };

  // Toast feedback trigger
  const showToast = (msg: string) => {
    setFeedbackToast(msg);
    setTimeout(() => setFeedbackToast(null), 3000);
  };

  // Copy Response Handler
  const handleCopyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    showToast('Copied to clipboard');
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Like / Dislike reaction
  const handleReaction = (msgId: string, type: 'like' | 'dislike') => {
    setMessages((prev) =>
      prev.map((m) =>
        m.id === msgId
          ? {
              ...m,
              liked: type === 'like' ? !m.liked : false,
              disliked: type === 'dislike' ? !m.disliked : false
            }
          : m
      )
    );
    showToast(type === 'like' ? 'Thank you for your feedback! ✦' : 'Feedback recorded. We will refine AI advice.');
  };

  // Image Upload Handler
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const setImageImagePreview = (src: string) => {
    setImagePreview(src);
  };

  // Send Message Handler
  const handleSendMessage = async (customPrompt?: string) => {
    const textToSend = customPrompt || inputPrompt;
    if ((!textToSend.trim() && !imagePreview) || loading) return;

    const userMsg: AiChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: textToSend || 'Analyzing uploaded image for fragrance recommendations...',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      imagePreview: imagePreview || undefined
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt('');
    const currentImage = imagePreview;
    setImagePreview(null);
    setImageFile(null);
    setLoading(true);

    try {
      let data: any;
      if (currentImage) {
        // Multimodal Vision Request
        const res = await fetch('/api/elysian-ai/vision', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            imageBase64: currentImage,
            prompt: textToSend
          })
        });
        data = await res.json();
      } else {
        // Standard Text Chat Request
        const res = await fetch('/api/elysian-ai/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            prompt: textToSend,
            chatHistory: messages.map((m) => ({ role: m.role, content: m.content }))
          })
        });
        data = await res.json();
      }

      let matchedProds: PerfumeProduct[] = [];
      if (data.recommendationIds && Array.isArray(data.recommendationIds)) {
        matchedProds = allProducts.filter((p) =>
          data.recommendationIds.some((id: string) => p.id.includes(id) || id.includes(p.id))
        );
      }

      if (matchedProds.length === 0 && !data.orderInfo) {
        matchedProds = [allProducts[0], allProducts[1]];
      }

      const assistantMsg: AiChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        content: data.reply || 'Allow me to introduce you to Santal Blanc (₹749) or Oud Imperiale Extrait (₹899).',
        recommendations: matchedProds.length > 0 ? matchedProds : undefined,
        orderInfo: data.orderInfo
      };

      setMessages((prev) => [...prev, assistantMsg]);

      if (isTtsEnabled) {
        speakText(assistantMsg.content);
      }
    } catch (err) {
      console.error('AI Error:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: 'assistant',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          content: 'I recommend exploring our signature **Santal Blanc (₹749)** or **Oud Imperiale Extrait (₹899)** — both crafted for 14-16 hours of projection.',
          recommendations: [allProducts[0], allProducts[1]]
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Complete Fragrance Quiz Handler
  const handleQuizSubmit = () => {
    setIsQuizMode(false);
    const quizPrompt = `Find me perfumes matching my quiz profile: Notes: ${quizState.notePreference}, Budget: ${quizState.budget}, Gender: ${quizState.gender}, Occasion: ${quizState.occasion}`;
    handleSendMessage(quizPrompt);
  };

  // Clear Chat
  const handleClearChat = () => {
    setMessages([
      {
        id: 'welcome-msg',
        role: 'assistant',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        content: `Welcome to ELYSIAN AI.\n\nI'm your personal fragrance expert.\n\nI can help you discover the perfect perfume, compare fragrances, recommend gifts, track orders, answer questions, and provide personalized shopping advice.`,
        recommendations: [allProducts[0], allProducts[1]]
      }
    ]);
    showToast('Chat history cleared.');
  };

  return (
    <div
      className={`fixed z-50 transition-all duration-500 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-md ${
        isFullScreen ? 'inset-0' : 'inset-0 sm:inset-auto sm:bottom-6 sm:right-6 sm:w-[500px] sm:h-[680px]'
      }`}
    >
      <div
        className={`bg-[#F8F6F2] border border-[#E8E2D7] rounded-[24px] w-full h-full flex flex-col shadow-2xl overflow-hidden relative ${
          isFullScreen ? 'max-w-6xl max-h-[92vh]' : 'max-w-full'
        }`}
      >
        {/* Toast Notification Banner */}
        {feedbackToast && (
          <div className="absolute top-16 left-1/2 -translate-x-1/2 z-50 bg-[#1F1F1F] text-[#C8A24A] text-xs font-montserrat uppercase tracking-wider font-bold px-4 py-2 rounded-full shadow-lg border border-[#C8A24A]/40 animate-fadeIn flex items-center gap-2">
            <Sparkles size={14} />
            <span>{feedbackToast}</span>
          </div>
        )}

        {/* AI Assistant Header */}
        <div className="bg-[#171717] text-white px-5 py-4 flex items-center justify-between border-b border-[#C8A24A]/30 shrink-0">
          <div className="flex items-center gap-3">
            {/* Luxury Avatar Monogram */}
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-[#222] border border-[#C8A24A] flex items-center justify-center text-[#C8A24A] shadow-inner">
                <Sparkles size={20} className="animate-spin-slow" />
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-[#171717] rounded-full"></span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-cormorant text-xl font-bold tracking-wide text-white">
                  ELYSIAN AI
                </h3>
                <span className="text-[10px] font-montserrat uppercase tracking-widest text-[#C8A24A] bg-[#C8A24A]/10 px-2 py-0.5 rounded-full border border-[#C8A24A]/30 font-bold">
                  Fragrance Expert
                </span>
              </div>
              <p className="text-[10px] font-montserrat uppercase tracking-wider text-gray-400">
                Crafted for the Extraordinary • Online
              </p>
            </div>
          </div>

          {/* Header Controls */}
          <div className="flex items-center gap-1.5">
            {/* Quiz Trigger */}
            <button
              onClick={() => setIsQuizMode(!isQuizMode)}
              className={`p-2 rounded-full transition-colors cursor-pointer text-xs font-montserrat uppercase font-bold flex items-center gap-1 border ${
                isQuizMode
                  ? 'bg-[#C8A24A] text-[#1F1F1F] border-[#C8A24A]'
                  : 'bg-[#222] text-[#C8A24A] border-[#C8A24A]/40 hover:bg-[#333]'
              }`}
              title="Take Fragrance Quiz"
            >
              <SlidersHorizontal size={14} />
              <span className="hidden sm:inline">Quiz</span>
            </button>

            {/* TTS Voice Toggle */}
            <button
              onClick={() => setIsTtsEnabled(!isTtsEnabled)}
              className={`p-2 rounded-full transition-colors cursor-pointer ${
                isTtsEnabled ? 'text-[#C8A24A] bg-[#C8A24A]/20' : 'text-gray-400 hover:text-white'
              }`}
              title={isTtsEnabled ? 'Disable Voice Read-Aloud' : 'Enable Voice Read-Aloud'}
            >
              {isTtsEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
            </button>

            {/* History Toggle */}
            <button
              onClick={() => setIsHistoryOpen(!isHistoryOpen)}
              className="p-2 text-gray-400 hover:text-white rounded-full transition-colors cursor-pointer"
              title="Chat History"
            >
              <History size={18} />
            </button>

            {/* Full Screen Toggle */}
            <button
              onClick={() => setIsFullScreen(!isFullScreen)}
              className="p-2 text-gray-400 hover:text-white rounded-full transition-colors hidden sm:block cursor-pointer"
              title={isFullScreen ? 'Minimize Window' : 'Full Screen Mode'}
            >
              {isFullScreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
            </button>

            {/* Clear Chat */}
            <button
              onClick={handleClearChat}
              className="p-2 text-gray-400 hover:text-rose-400 rounded-full transition-colors cursor-pointer"
              title="Clear Chat"
            >
              <Trash2 size={18} />
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white rounded-full transition-colors cursor-pointer"
              title="Close Assistant"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Main Body Layout (Split in Fullscreen) */}
        <div className="flex-1 flex overflow-hidden relative">
          
          {/* History Drawer Overlay */}
          {isHistoryOpen && (
            <div className="absolute inset-y-0 left-0 z-30 w-72 bg-[#171717] border-r border-[#333] text-white p-4 flex flex-col shadow-2xl animate-slideRight">
              <div className="flex items-center justify-between pb-3 border-b border-[#2A2A2A]">
                <span className="text-xs font-montserrat uppercase font-bold text-[#C8A24A] flex items-center gap-1.5">
                  <History size={14} />
                  <span>Saved Sessions</span>
                </span>
                <button
                  onClick={() => setIsHistoryOpen(false)}
                  className="p-1 text-gray-400 hover:text-white cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-3 space-y-2 no-scrollbar">
                {chatHistory.length === 0 ? (
                  <p className="text-xs text-gray-500 italic p-3">No recent sessions.</p>
                ) : (
                  chatHistory.map((session) => (
                    <div
                      key={session.id}
                      onClick={() => {
                        setMessages(session.messages);
                        setIsHistoryOpen(false);
                        showToast('Loaded saved session.');
                      }}
                      className="p-3 bg-[#222] hover:bg-[#2A2A2A] rounded-xl border border-[#333] cursor-pointer transition-all text-xs font-inter group"
                    >
                      <h4 className="font-semibold text-white truncate group-hover:text-[#C8A24A]">
                        {session.title}
                      </h4>
                      <p className="text-[10px] text-gray-400 pt-1">{session.updatedAt}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Main Chat Feed */}
          <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#F8F6F2]">
            
            {/* Interactive Perfume Quiz Card */}
            {isQuizMode && (
              <div className="p-4 bg-white border-b border-[#E8E2D7] animate-fadeIn shrink-0 shadow-sm">
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#F4F1EA]">
                  <div className="flex items-center gap-2">
                    <Sparkles size={16} className="text-[#C8A24A]" />
                    <span className="text-xs font-montserrat uppercase font-bold text-[#1F1F1F]">
                      Personalized Perfume Quiz
                    </span>
                  </div>
                  <span className="text-[10px] font-montserrat text-gray-500">Step {quizStep} of 4</span>
                </div>

                {quizStep === 1 && (
                  <div className="space-y-2">
                    <p className="text-xs font-inter text-[#1F1F1F]">1. What scent note family do you prefer?</p>
                    <div className="flex flex-wrap gap-2">
                      {['Oud', 'Sandalwood', 'Floral Rose', 'Citrus Bergamot', 'Vanilla', 'Spicy Saffron'].map((note) => (
                        <button
                          key={note}
                          onClick={() => {
                            setQuizState({ ...quizState, notePreference: note });
                            setQuizStep(2);
                          }}
                          className={`px-3 py-1.5 rounded-full text-xs font-inter transition-all cursor-pointer ${
                            quizState.notePreference === note
                              ? 'bg-[#1F1F1F] text-[#C8A24A]'
                              : 'bg-[#F4F1EA] text-[#1F1F1F] hover:bg-[#E8E2D7]'
                          }`}
                        >
                          {note}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {quizStep === 2 && (
                  <div className="space-y-2">
                    <p className="text-xs font-inter text-[#1F1F1F]">2. What is your budget?</p>
                    <div className="flex flex-wrap gap-2">
                      {['₹199–₹349 (Samplers)', '₹350–₹699', '₹700–₹999 (Full 100ml Extrait)'].map((b) => (
                        <button
                          key={b}
                          onClick={() => {
                            setQuizState({ ...quizState, budget: b });
                            setQuizStep(3);
                          }}
                          className="px-3 py-1.5 rounded-full text-xs font-inter bg-[#F4F1EA] text-[#1F1F1F] hover:bg-[#1F1F1F] hover:text-[#C8A24A] transition-all cursor-pointer"
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {quizStep === 3 && (
                  <div className="space-y-2">
                    <p className="text-xs font-inter text-[#1F1F1F]">3. Who is this fragrance for?</p>
                    <div className="flex gap-2">
                      {['Men', 'Women', 'Unisex'].map((g) => (
                        <button
                          key={g}
                          onClick={() => {
                            setQuizState({ ...quizState, gender: g as any });
                            setQuizStep(4);
                          }}
                          className="px-4 py-1.5 rounded-full text-xs font-inter bg-[#F4F1EA] text-[#1F1F1F] hover:bg-[#1F1F1F] hover:text-[#C8A24A] transition-all cursor-pointer"
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {quizStep === 4 && (
                  <div className="space-y-3">
                    <p className="text-xs font-inter text-[#1F1F1F]">4. What is the primary occasion?</p>
                    <div className="flex flex-wrap gap-2">
                      {['Office & Daily', 'Weddings & Parties', 'Date Night', 'Luxury Gift'].map((occ) => (
                        <button
                          key={occ}
                          onClick={() => {
                            setQuizState({ ...quizState, occasion: occ });
                          }}
                          className={`px-3 py-1.5 rounded-full text-xs font-inter transition-all cursor-pointer ${
                            quizState.occasion === occ
                              ? 'bg-[#1F1F1F] text-[#C8A24A]'
                              : 'bg-[#F4F1EA] text-[#1F1F1F] hover:bg-[#E8E2D7]'
                          }`}
                        >
                          {occ}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={handleQuizSubmit}
                      className="mt-2 w-full py-2 bg-[#C8A24A] text-[#1F1F1F] text-xs font-montserrat uppercase font-bold rounded-full hover:bg-[#1F1F1F] hover:text-[#C8A24A] transition-all cursor-pointer shadow-sm"
                    >
                      Show My Match Recommendations →
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Chat Messages Scrolling Window */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 max-w-3xl ${
                    msg.role === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
                  }`}
                >
                  {/* User / Bot Icon */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 shadow-sm ${
                      msg.role === 'user'
                        ? 'bg-[#C8A24A] text-[#1F1F1F]'
                        : 'bg-[#171717] text-[#C8A24A] border border-[#C8A24A]'
                    }`}
                  >
                    {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                  </div>

                  <div className="space-y-3 max-w-xl">
                    {/* Image Preview in User Message */}
                    {msg.imagePreview && (
                      <div className="rounded-xl overflow-hidden border border-[#E8E2D7] max-w-xs shadow-sm">
                        <img src={msg.imagePreview} alt="User upload" className="w-full h-auto object-cover" />
                      </div>
                    )}

                    {/* Text Bubble */}
                    <div
                      className={`p-4 rounded-2xl text-xs font-inter leading-relaxed shadow-sm relative group ${
                        msg.role === 'user'
                          ? 'bg-[#171717] text-white rounded-tr-none'
                          : 'bg-white text-[#1F1F1F] border border-[#E8E2D7] rounded-tl-none'
                      }`}
                    >
                      <p className="whitespace-pre-line">{msg.content}</p>

                      {/* Timestamp & Message Toolbar */}
                      <div className="flex items-center justify-between pt-2 border-t border-gray-100/20 text-[10px] text-gray-400 mt-2">
                        <span>{msg.timestamp}</span>

                        {msg.role === 'assistant' && (
                          <div className="flex items-center gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => handleCopyMessage(msg.id, msg.content)}
                              className="hover:text-[#C8A24A] cursor-pointer"
                              title="Copy response"
                            >
                              {copiedId === msg.id ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                            </button>
                            <button
                              onClick={() => speakText(msg.content)}
                              className="hover:text-[#C8A24A] cursor-pointer"
                              title="Read aloud"
                            >
                              <Volume2 size={12} />
                            </button>
                            <button
                              onClick={() => handleReaction(msg.id, 'like')}
                              className={`cursor-pointer ${msg.liked ? 'text-amber-500' : 'hover:text-[#C8A24A]'}`}
                              title="Helpful"
                            >
                              <ThumbsUp size={12} />
                            </button>
                            <button
                              onClick={() => handleReaction(msg.id, 'dislike')}
                              className={`cursor-pointer ${msg.disliked ? 'text-rose-400' : 'hover:text-rose-400'}`}
                              title="Not helpful"
                            >
                              <ThumbsDown size={12} />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Order Information Tracking Card */}
                    {msg.orderInfo && (
                      <div className="bg-white border-2 border-[#C8A24A]/50 rounded-2xl p-4 shadow-md space-y-3 animate-fadeIn">
                        <div className="flex items-center justify-between border-b border-[#F4F1EA] pb-2">
                          <div className="flex items-center gap-2">
                            <Package size={16} className="text-[#C8A24A]" />
                            <span className="font-montserrat uppercase font-bold text-xs text-[#1F1F1F]">
                              Order #{msg.orderInfo.orderId}
                            </span>
                          </div>
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-montserrat font-bold bg-[#C8A24A]/20 text-[#1F1F1F]">
                            {msg.orderInfo.status}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2 text-[11px] font-inter text-gray-600">
                          <div>
                            <span className="text-[10px] font-montserrat uppercase text-gray-400 block">Carrier</span>
                            <span className="font-semibold text-[#1F1F1F]">{msg.orderInfo.carrier}</span>
                          </div>
                          <div>
                            <span className="text-[10px] font-montserrat uppercase text-gray-400 block">Est. Delivery</span>
                            <span className="font-semibold text-[#1F1F1F]">{msg.orderInfo.estimatedDelivery}</span>
                          </div>
                          <div className="col-span-2">
                            <span className="text-[10px] font-montserrat uppercase text-gray-400 block">Tracking #</span>
                            <span className="font-mono text-[#1F1F1F] bg-[#F4F1EA] px-2 py-0.5 rounded text-[10px]">
                              {msg.orderInfo.trackingCode}
                            </span>
                          </div>
                        </div>

                        <div className="pt-2 flex gap-2">
                          {onOpenOrders && (
                            <button
                              onClick={() => {
                                const id = msg.orderInfo?.orderId;
                                onClose();
                                onOpenOrders(id);
                              }}
                              className="flex-1 py-1.5 bg-[#171717] text-[#C8A24A] hover:bg-[#C8A24A] hover:text-[#171717] text-[10px] font-montserrat uppercase font-bold rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1"
                            >
                              <Truck size={12} />
                              <span>Live Order Portal</span>
                            </button>
                          )}
                          <button
                            onClick={() => showToast('14-day returns policy active for this shipment.')}
                            className="flex-1 py-1.5 bg-[#F4F1EA] hover:bg-[#171717] hover:text-[#C8A24A] text-[#1F1F1F] text-[10px] font-montserrat uppercase font-bold rounded-lg transition-all cursor-pointer"
                          >
                            Return Policy
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Product Recommendation Cards Carousel / Grid */}
                    {msg.recommendations && msg.recommendations.length > 0 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        {msg.recommendations.map((rec) => (
                          <div
                            key={rec.id}
                            onClick={() => {
                              onClose();
                              onSelectProduct(rec);
                            }}
                            className="bg-white border border-[#E8E2D7] hover:border-[#C8A24A] rounded-2xl p-3 flex gap-3 items-center cursor-pointer shadow-sm group transition-all duration-300 hover:scale-[1.02]"
                          >
                            <img
                              src={rec.image}
                              alt={rec.name}
                              className="w-16 h-16 rounded-xl object-cover shrink-0"
                              referrerPolicy="no-referrer"
                            />
                            <div className="flex-1 min-w-0">
                              <span className="text-[9px] font-montserrat uppercase text-[#C8A24A] font-bold block">
                                {rec.gender} • {rec.collection}
                              </span>
                              <h4 className="font-cormorant font-bold text-sm text-[#1F1F1F] group-hover:text-[#C8A24A] truncate">
                                {rec.name}
                              </h4>
                              <p className="text-[10px] text-gray-500 truncate">{rec.subTitle}</p>
                              <div className="flex items-center gap-2 pt-1">
                                <span className="text-xs font-bold text-[#1F1F1F]">₹{rec.defaultPrice}</span>
                                <span className="text-[10px] text-amber-600 font-bold">★ {rec.rating}</span>
                              </div>
                            </div>

                            <div className="flex flex-col gap-1">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onAddToCart(rec, rec.volumeOptions[1]?.size || '50ml', rec.defaultPrice);
                                  showToast(`Added ${rec.name} to Bag!`);
                                }}
                                className="p-2 bg-[#C8A24A] hover:bg-[#1F1F1F] text-[#1F1F1F] hover:text-[#C8A24A] rounded-lg transition-colors cursor-pointer"
                                title="Add to Bag"
                              >
                                <ShoppingBag size={14} />
                              </button>
                              {onToggleWishlist && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onToggleWishlist(rec);
                                    showToast('Updated Wishlist!');
                                  }}
                                  className={`p-2 rounded-lg transition-colors cursor-pointer ${
                                    wishlist.some((p) => p.id === rec.id)
                                      ? 'bg-rose-50 text-rose-500'
                                      : 'bg-gray-100 text-gray-600 hover:text-rose-500'
                                  }`}
                                  title="Wishlist"
                                >
                                  <Heart size={14} />
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {loading && (
                <div className="flex items-center gap-3 text-xs font-montserrat text-[#C8A24A] animate-pulse p-2 bg-white/60 rounded-full max-w-xs border border-[#E8E2D7]">
                  <Sparkles size={16} className="animate-spin" />
                  <span>ELYSIAN AI is generating advice...</span>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Quick Prompts Chips Bar */}
            <div className="px-4 py-2 bg-[#F4F1EA] border-t border-[#E8E2D7] flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
              <span className="text-[10px] font-montserrat uppercase text-gray-500 font-bold whitespace-nowrap">
                Suggested:
              </span>
              {suggestedPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(prompt)}
                  className="px-3 py-1 bg-white hover:bg-[#171717] hover:text-[#C8A24A] border border-[#E8E2D7] hover:border-[#C8A24A] rounded-full text-[11px] font-inter text-[#1F1F1F] whitespace-nowrap transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-2xs"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Image Preview Thumbnail prior to send */}
            {imagePreview && (
              <div className="px-4 py-2 bg-[#171717] text-white flex items-center justify-between border-t border-[#333]">
                <div className="flex items-center gap-2">
                  <img src={imagePreview} alt="Upload thumbnail" className="w-8 h-8 rounded object-cover" />
                  <span className="text-xs font-montserrat text-gray-300">Photo attached for Gemini Vision</span>
                </div>
                <button onClick={() => setImagePreview(null)} className="text-gray-400 hover:text-white cursor-pointer">
                  <X size={14} />
                </button>
              </div>
            )}

            {/* Input Controls Bar */}
            <div className="p-3 sm:p-4 bg-white border-t border-[#E8E2D7] flex items-center gap-2 shrink-0">
              {/* File Upload Input */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageSelect}
                accept="image/*"
                className="hidden"
              />

              <button
                onClick={() => fileInputRef.current?.click()}
                className="p-2.5 text-gray-500 hover:text-[#C8A24A] hover:bg-[#F4F1EA] rounded-full transition-colors cursor-pointer"
                title="Upload Scent / Bottle Image for Vision Analysis"
              >
                <ImageIcon size={18} />
              </button>

              {/* Voice Speech Recognition Input */}
              <button
                onClick={handleToggleVoiceInput}
                className={`p-2.5 rounded-full transition-colors cursor-pointer ${
                  isListening
                    ? 'bg-rose-500 text-white animate-pulse'
                    : 'text-gray-500 hover:text-[#C8A24A] hover:bg-[#F4F1EA]'
                }`}
                title={isListening ? 'Stop Listening' : 'Voice Input'}
              >
                {isListening ? <MicOff size={18} /> : <Mic size={18} />}
              </button>

              {/* Text Input */}
              <input
                type="text"
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={
                  isListening ? 'Listening...' : 'Ask about perfumes, order ELY-98234, notes, gifts...'
                }
                className="flex-1 bg-[#F4F1EA] border border-[#E8E2D7] rounded-full px-4 py-2.5 text-xs font-inter text-[#1F1F1F] focus:outline-none focus:border-[#C8A24A]"
              />

              {/* Send Button */}
              <button
                onClick={() => handleSendMessage()}
                disabled={loading || (!inputPrompt.trim() && !imagePreview)}
                className="p-2.5 bg-[#C8A24A] hover:bg-[#171717] text-[#1F1F1F] hover:text-[#C8A24A] rounded-full transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-40 cursor-pointer shadow-sm"
              >
                <Send size={16} />
              </button>
            </div>

          </div>

          {/* Side Editorial Info Panel in FullScreen Mode */}
          {isFullScreen && (
            <div className="w-80 bg-[#171717] border-l border-[#333] text-white p-6 hidden lg:flex flex-col justify-between">
              <div className="space-y-6">
                <div className="border-b border-[#2A2A2A] pb-4">
                  <span className="text-[10px] font-montserrat uppercase tracking-[0.2em] text-[#C8A24A] font-bold">
                    Atelier Intelligence
                  </span>
                  <h4 className="font-cormorant text-2xl font-light text-white pt-1">
                    ELYSIAN AI Assistant
                  </h4>
                  <p className="text-xs text-gray-400 font-inter pt-2 leading-relaxed">
                    Powered by Gemini 3.6 Flash. Trained on ELYSIAN's Extrait de Parfum formulations, olfactory pyramids, and Pan-India shipping policies.
                  </p>
                </div>

                <div className="space-y-3">
                  <span className="text-[10px] font-montserrat uppercase tracking-wider text-gray-400 block font-bold">
                    Quick Capabilities
                  </span>
                  {[
                    'Personalized Scent Profiling',
                    'Order Status Simulator (ELY-98234)',
                    'Gemini Multimodal Image Analysis',
                    'Notes & Longevity Explanations',
                    'Gift Set Recommendations'
                  ].map((cap, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-inter text-gray-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C8A24A]"></span>
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-[#222] border border-[#C8A24A]/30 rounded-2xl text-center space-y-2">
                <ShieldCheck size={24} className="text-[#C8A24A] mx-auto" />
                <h5 className="font-cormorant font-bold text-sm text-white">100% Authentic Guarantee</h5>
                <p className="text-[10px] text-gray-400">All ELYSIAN creations crafted with French botanical oils & wild Assam Oud.</p>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
