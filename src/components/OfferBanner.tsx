import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Clock, Gift, Truck, Flame, X, ArrowRight, ShieldCheck } from 'lucide-react';
import { AnimatedSection } from './AnimatedSection';

interface OfferBannerProps {
  onShopNow?: () => void;
  onExploreCollection?: () => void;
}

export const OfferBanner: React.FC<OfferBannerProps> = ({ onShopNow, onExploreCollection }) => {
  const [isDismissed, setIsDismissed] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
    days: 2,
    hours: 14,
    minutes: 32,
    seconds: 45
  });
  const [isExpired, setIsExpired] = useState<boolean>(false);

  // Initialize dismissed state from localStorage
  useEffect(() => {
    try {
      const dismissed = localStorage.getItem('elysian_offer_banner_dismissed_v1');
      if (dismissed === 'true') {
        setIsDismissed(true);
      }
    } catch {
      // LocalStorage fallback
    }
  }, []);

  // Countdown Timer Logic
  useEffect(() => {
    // Target time: 2 days, 14 hours from initial mount or persistent timestamp
    const STORAGE_KEY = 'elysian_promo_target_time';
    let targetTime: number;

    const storedTarget = localStorage.getItem(STORAGE_KEY);
    if (storedTarget) {
      targetTime = parseInt(storedTarget, 10);
    } else {
      // Set target to 2 days, 14 hours, 32 mins, 45 secs from now
      targetTime = Date.now() + (2 * 24 * 60 * 60 + 14 * 3600 + 32 * 60 + 45) * 1000;
      localStorage.setItem(STORAGE_KEY, targetTime.toString());
    }

    const interval = setInterval(() => {
      const now = Date.now();
      const difference = targetTime - now;

      if (difference <= 0) {
        clearInterval(interval);
        setIsExpired(true);
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    try {
      localStorage.setItem('elysian_offer_banner_dismissed_v1', 'true');
    } catch {
      // LocalStorage fallback
    }
  };

  const handleShopClick = () => {
    if (onShopNow) {
      onShopNow();
    } else {
      const shopSec = document.getElementById('section-shop');
      shopSec?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreClick = () => {
    if (onExploreCollection) {
      onExploreCollection();
    } else {
      const shopSec = document.getElementById('section-shop');
      shopSec?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (isDismissed) return null;

  return (
    <AnimatePresence>
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto my-8 relative"
        aria-label="Promotional Offer Banner"
      >
        <div className="bg-gradient-to-br from-[#1A1A1A] via-[#222222] to-[#121212] text-[#F8F6F2] rounded-[24px] p-6 sm:p-10 lg:p-12 border border-[#C8A24A]/40 shadow-2xl relative overflow-hidden">
          
          {/* Subtle Parallax Background Glow & Perfume Particles */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C8A24A]/15 rounded-full blur-[100px] pointer-events-none -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#D8B36A]/10 rounded-full blur-[90px] pointer-events-none -ml-20 -mb-20"></div>

          {/* Dismiss (X) Close Button */}
          <button
            onClick={handleDismiss}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white border border-white/20 transition-all cursor-pointer z-30 hover:scale-110 active:scale-95"
            aria-label="Dismiss Offer Banner"
            title="Dismiss Offer"
          >
            <X size={18} />
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            
            {/* Left Column: Perfume Bottle Image Showcase with Save 50% Badge */}
            <div className="lg:col-span-5 relative group order-2 lg:order-1">
              
              {/* Bottle Container with Smooth Aspect Ratio & Glassmorphic Backdrop */}
              <div className="relative rounded-2xl overflow-hidden border border-[#C8A24A]/30 bg-white/5 backdrop-blur-md p-4 text-center">
                <img
                  src="https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=800&auto=format&fit=crop"
                  alt="ELYSIAN Extrait De Parfum Luxury Offer Bottle"
                  className="w-full h-64 sm:h-80 object-cover rounded-xl shadow-2xl transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Shimmering SAVE 50% Badge */}
                <div className="absolute top-8 left-8 bg-[#C8A24A] text-[#1F1F1F] font-montserrat font-extrabold text-xs uppercase tracking-widest px-4 py-2 rounded-full shadow-2xl border border-white/40 flex items-center gap-1.5 animate-pulse">
                  <Flame size={14} className="text-[#1F1F1F]" />
                  <span>SAVE 50%</span>
                </div>

                {/* Limited Stock Badge */}
                <div className="absolute bottom-8 right-8 bg-[#1F1F1F]/90 backdrop-blur-md text-[#C8A24A] border border-[#C8A24A]/50 font-montserrat text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-full shadow-lg">
                  Limited Stock Available
                </div>
              </div>

            </div>

            {/* Right Column: Offer Details & Countdown Timer */}
            <div className="lg:col-span-7 space-y-6 text-left order-1 lg:order-2 pr-0 sm:pr-6">
              
              {/* Top Badges */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 bg-[#C8A24A]/20 text-[#C8A24A] border border-[#C8A24A]/40 px-3.5 py-1 rounded-full text-xs font-montserrat uppercase tracking-[0.2em] font-bold">
                  <Sparkles size={13} />
                  <span>✨ Limited Time Offer</span>
                </span>

                <span className="inline-flex items-center gap-1.5 bg-white/10 text-gray-300 border border-white/15 px-3.5 py-1 rounded-full text-xs font-montserrat uppercase tracking-wider font-semibold">
                  <ShieldCheck size={13} className="text-[#C8A24A]" />
                  <span>100% Authentic Extrait</span>
                </span>
              </div>

              {/* Main Heading & Subheading */}
              <div className="space-y-2">
                <h2 className="font-cormorant text-3xl sm:text-5xl lg:text-5xl font-light text-white leading-tight">
                  Flat <span className="italic font-normal text-[#C8A24A]">50% OFF</span> on Selected Perfumes
                </h2>
                
                <p className="font-inter text-xs sm:text-sm text-gray-300 font-light leading-relaxed max-w-xl">
                  Discover small-batch, 30% concentration French Extrait de Parfum at exclusive prices. Offer valid for a limited time only.
                </p>
              </div>

              {/* Countdown Timer Block */}
              {!isExpired ? (
                <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-5 backdrop-blur-md space-y-2">
                  <div className="flex items-center gap-2 text-xs font-montserrat uppercase tracking-widest font-bold text-[#C8A24A]">
                    <Clock size={15} />
                    <span>Offer Ends In</span>
                  </div>

                  <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-xs pt-1">
                    <div className="bg-[#121212] border border-[#C8A24A]/30 rounded-xl p-2 sm:p-3 text-center">
                      <span className="font-cormorant text-2xl sm:text-3xl font-bold text-white block">
                        {String(timeLeft.days).padStart(2, '0')}
                      </span>
                      <span className="text-[10px] font-montserrat uppercase tracking-wider text-gray-400 block pt-0.5">
                        Days
                      </span>
                    </div>

                    <div className="bg-[#121212] border border-[#C8A24A]/30 rounded-xl p-2 sm:p-3 text-center">
                      <span className="font-cormorant text-2xl sm:text-3xl font-bold text-white block">
                        {String(timeLeft.hours).padStart(2, '0')}
                      </span>
                      <span className="text-[10px] font-montserrat uppercase tracking-wider text-gray-400 block pt-0.5">
                        Hours
                      </span>
                    </div>

                    <div className="bg-[#121212] border border-[#C8A24A]/30 rounded-xl p-2 sm:p-3 text-center">
                      <span className="font-cormorant text-2xl sm:text-3xl font-bold text-white block">
                        {String(timeLeft.minutes).padStart(2, '0')}
                      </span>
                      <span className="text-[10px] font-montserrat uppercase tracking-wider text-gray-400 block pt-0.5">
                        Mins
                      </span>
                    </div>

                    <div className="bg-[#121212] border border-[#C8A24A]/30 rounded-xl p-2 sm:p-3 text-center">
                      <span className="font-cormorant text-2xl sm:text-3xl font-bold text-white block">
                        {String(timeLeft.seconds).padStart(2, '0')}
                      </span>
                      <span className="text-[10px] font-montserrat uppercase tracking-wider text-gray-400 block pt-0.5">
                        Secs
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-red-950/40 border border-red-500/40 rounded-xl p-4 text-xs font-montserrat uppercase tracking-wider font-bold text-red-300">
                  This promotion has ended. Check back soon for our next release!
                </div>
              )}

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={handleShopClick}
                  className="bg-[#C8A24A] hover:bg-white text-[#1F1F1F] px-8 py-3.5 rounded-full font-montserrat text-xs uppercase tracking-widest font-extrabold transition-all duration-300 shadow-xl flex items-center justify-center gap-2 hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <span>Shop Now</span>
                  <ArrowRight size={16} />
                </button>

                <button
                  onClick={handleExploreClick}
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3.5 rounded-full font-montserrat text-xs uppercase tracking-widest font-bold transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                >
                  Explore Collection
                </button>
              </div>

              {/* Guarantees & Perks */}
              <div className="pt-3 border-t border-white/10 flex flex-wrap items-center gap-4 text-xs font-inter text-gray-300">
                <div className="flex items-center gap-1.5">
                  <Truck size={14} className="text-[#C8A24A]" />
                  <span>Free Express Shipping Above ₹499</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <Gift size={14} className="text-[#C8A24A]" />
                  <span>Free Gift on Orders Above ₹999</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </motion.section>
    </AnimatePresence>
  );
};
