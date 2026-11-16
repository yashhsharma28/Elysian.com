import React, { useState } from 'react';
import { X, Sparkles, Send, Bot, User, ShoppingBag, ArrowRight } from 'lucide-react';
import { PerfumeProduct } from '../types';

interface AiSommelierModalProps {
  isOpen: boolean;
  onClose: () => void;
  allProducts: PerfumeProduct[];
  onAddToCart: (product: PerfumeProduct, selectedSize: string, price: number) => void;
  onSelectProduct: (product: PerfumeProduct) => void;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  recommendations?: PerfumeProduct[];
}

export const AiSommelierModal: React.FC<AiSommelierModalProps> = ({
  isOpen,
  onClose,
  allProducts,
  onAddToCart,
  onSelectProduct
}) => {
  if (!isOpen) return null;

  const [inputPrompt, setInputPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      role: 'assistant',
      content: `Greetings. I am ELYSIAN's Master AI Scent Sommelier.
Tell me about your personal style, an upcoming occasion, or fragrance notes you adore (such as Oud, Sandalwood, Rose, or Bergamot), and I shall curate your ideal signature Extrait de Parfum under ₹1000.`,
      recommendations: [allProducts[0], allProducts[1]]
    }
  ]);

  const quickPrompts = [
    'Long-lasting woody fragrance for a winter wedding under ₹900',
    'I love creamy sandalwood and cardamom for daily office wear',
    'Best romantic perfume for a candlelight dinner date',
    'Looking for a unisex luxury gift set under ₹999'
  ];

  const handleSend = async (promptToSend?: string) => {
    const text = promptToSend || inputPrompt;
    if (!text.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt('');
    setLoading(true);

    try {
      const response = await fetch('/api/ai-sommelier', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: text,
          chatHistory: messages.map((m) => ({ role: m.role, content: m.content }))
        })
      });

      const data = await response.json();

      let matchedProds: PerfumeProduct[] = [];
      if (data.recommendationIds && Array.isArray(data.recommendationIds)) {
        matchedProds = allProducts.filter((p) =>
          data.recommendationIds.some((id: string) => p.id.includes(id) || id.includes(p.id))
        );
      }

      if (matchedProds.length === 0) {
        // Fallback default recommendation
        matchedProds = [allProducts[0], allProducts[1]];
      }

      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.reply || 'Allow me to introduce you to Santal Blanc (₹749) or Oud Imperiale (₹899).',
        recommendations: matchedProds
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: 'assistant',
          content: 'I recommend exploring our signature **Santal Blanc (₹749)** or **Oud Imperiale Extrait (₹899)** — both crafted for 16-hour projection.',
          recommendations: [allProducts[0], allProducts[1]]
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#F8F6F2] border border-[#E8E2D7] rounded-3xl max-w-3xl w-full h-[85vh] flex flex-col shadow-2xl overflow-hidden relative">
        
        {/* Header */}
        <div className="bg-[#1F1F1F] text-white p-5 flex items-center justify-between border-b border-[#C8A24A]/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#C8A24A]/20 border border-[#C8A24A] flex items-center justify-center text-[#C8A24A]">
              <Sparkles size={20} />
            </div>
            <div>
              <h3 className="font-cormorant text-2xl font-bold tracking-wide text-white">
                ELYSIAN AI Scent Sommelier
              </h3>
              <p className="text-[10px] font-montserrat uppercase tracking-widest text-[#C8A24A]">
                Personalized Olfactory Consultation • Gemini AI Powered
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-2xl ${
                msg.role === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                  msg.role === 'user'
                    ? 'bg-[#C8A24A] text-[#1F1F1F]'
                    : 'bg-[#1F1F1F] text-[#C8A24A] border border-[#C8A24A]'
                }`}
              >
                {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
              </div>

              <div className="space-y-3">
                <div
                  className={`p-4 rounded-2xl text-xs font-inter leading-relaxed shadow-sm ${
                    msg.role === 'user'
                      ? 'bg-[#1F1F1F] text-white rounded-tr-none'
                      : 'bg-white text-[#1F1F1F] border border-[#E8E2D7] rounded-tl-none'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.content}</p>
                </div>

                {/* Embedded Recommendations Cards */}
                {msg.recommendations && msg.recommendations.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {msg.recommendations.map((rec) => (
                      <div
                        key={rec.id}
                        onClick={() => {
                          onClose();
                          onSelectProduct(rec);
                        }}
                        className="bg-white border border-[#E8E2D7] hover:border-[#C8A24A] rounded-xl p-3 flex gap-3 items-center cursor-pointer shadow-sm group transition-all"
                      >
                        <img
                          src={rec.image}
                          alt={rec.name}
                          className="w-14 h-14 rounded-lg object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-1 min-w-0">
                          <span className="text-[9px] font-montserrat uppercase text-[#C8A24A] font-bold block">
                            {rec.gender} • {rec.collection}
                          </span>
                          <h4 className="font-cormorant font-bold text-sm text-[#1F1F1F] group-hover:text-[#C8A24A] truncate">
                            {rec.name}
                          </h4>
                          <span className="text-xs font-bold text-[#1F1F1F]">₹{rec.defaultPrice}</span>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onAddToCart(rec, rec.volumeOptions[1]?.size || '50ml', rec.defaultPrice);
                          }}
                          className="p-2 bg-[#C8A24A] hover:bg-[#1F1F1F] text-[#1F1F1F] hover:text-[#C8A24A] rounded-lg transition-colors"
                          title="Add to Bag"
                        >
                          <ShoppingBag size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-3 text-xs font-montserrat text-[#C8A24A] animate-pulse">
              <Sparkles size={16} className="animate-spin" />
              <span>Consulting the ELYSIAN Master Olfactory Registry...</span>
            </div>
          )}
        </div>

        {/* Quick Prompts Bar */}
        <div className="px-6 py-2 bg-[#F4F1EA] border-t border-[#E8E2D7] flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[10px] font-montserrat uppercase text-gray-500 font-bold whitespace-nowrap">
            Try Asking:
          </span>
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              className="px-3 py-1 bg-white hover:bg-[#1F1F1F] hover:text-[#C8A24A] border border-[#E8E2D7] hover:border-[#C8A24A] rounded-full text-[11px] font-inter text-[#1F1F1F] whitespace-nowrap transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-white border-t border-[#E8E2D7] flex items-center gap-3">
          <input
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Describe your outfit, mood, or favorite notes (e.g. Vanilla & Rose)..."
            className="flex-1 bg-[#F4F1EA] border border-[#E8E2D7] rounded-full px-5 py-3 text-xs font-inter text-[#1F1F1F] focus:outline-none focus:border-[#C8A24A]"
          />
          <button
            onClick={() => handleSend()}
            disabled={loading || !inputPrompt.trim()}
            className="p-3 bg-[#C8A24A] hover:bg-[#1F1F1F] text-[#1F1F1F] hover:text-[#C8A24A] rounded-full transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            <Send size={16} />
          </button>
        </div>

      </div>
    </div>
  );
};
