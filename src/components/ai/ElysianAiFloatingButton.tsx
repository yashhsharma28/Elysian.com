import React, { useState, useEffect } from 'react';
import { Sparkles, MessageSquare, Bot } from 'lucide-react';

interface ElysianAiFloatingButtonProps {
  onClick: () => void;
  isOpen: boolean;
  unreadCount?: number;
}

export const ElysianAiFloatingButton: React.FC<ElysianAiFloatingButtonProps> = ({
  onClick,
  isOpen,
  unreadCount = 0
}) => {
  const [pulse, setPulse] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setPulse((prev) => !prev);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  if (isOpen) return null; // Hide floating button when chat is open

  return (
    <div className="fixed bottom-5 left-5 sm:bottom-8 sm:left-8 z-40 flex flex-col items-start group">
      {/* Floating Hover Tooltip */}
      <div className="mb-2.5 px-3.5 py-1.5 bg-[#1F1F1F] text-[#F8F6F2] border border-[#C8A24A]/40 rounded-full text-[11px] font-montserrat uppercase tracking-wider font-semibold shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 flex items-center gap-2 pointer-events-none">
        <span className="w-1.5 h-1.5 rounded-full bg-[#C8A24A] animate-ping"></span>
        <span>ELYSIAN AI — Fragrance Expert</span>
      </div>

      {/* Main Luxury Sparkle Button */}
      <button
        onClick={onClick}
        className="relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#1F1F1F] text-[#C8A24A] border-2 border-[#C8A24A] shadow-[0_10px_30px_rgba(200,162,74,0.35)] hover:shadow-[0_15px_40px_rgba(200,162,74,0.55)] transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer overflow-hidden group/btn"
        aria-label="Open ELYSIAN AI Fragrance Assistant"
      >
        {/* Shimmer Light Reflection Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C8A24A]/20 to-transparent -translate-x-full group-hover/btn:animate-shimmer" />

        {/* Outer Glow Halo */}
        <div className={`absolute -inset-1 rounded-full bg-[#C8A24A]/20 blur-md transition-opacity duration-1000 ${pulse ? 'opacity-80' : 'opacity-20'}`} />

        <div className="relative z-10 flex flex-col items-center justify-center">
          <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-[#C8A24A] animate-spin-slow group-hover/btn:rotate-12 transition-transform" />
          <span className="text-[8px] font-montserrat uppercase tracking-widest font-extrabold text-[#F8F6F2] -mt-0.5">
            AI
          </span>
        </div>

        {/* Live Notification Badge */}
        <div className="absolute top-1 right-1 bg-[#C8A24A] text-[#1F1F1F] text-[9px] font-montserrat font-bold w-4 h-4 rounded-full flex items-center justify-center border border-[#1F1F1F] shadow-sm animate-bounce">
          ✦
        </div>
      </button>
    </div>
  );
};
