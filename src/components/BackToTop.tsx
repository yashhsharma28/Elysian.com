import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUp } from 'lucide-react';

export const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      
      if (scrollTop > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      if (scrollHeight > 0) {
        const progress = Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100));
        setScrollProgress(progress);
      } else {
        setScrollProgress(0);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Trigger initial check
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 500);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Dimensions for SVG progress circle
  // Desktop 60x60, Mobile 52x52
  // We can use responsive SVG or outer wrapper sizing
  const strokeWidth = 2.5;
  const radius = 26; // radius for 60px viewBox (30 - margin/stroke)
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="back-to-top"
          initial={{ opacity: 0, scale: 0.5, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 30 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-5 right-5 sm:bottom-8 sm:right-8 z-50 flex items-center justify-center select-none"
        >
          {/* Subtle Ambient Pulse Aura */}
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.25, 0.45, 0.25],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 rounded-full bg-[#C8A24A] blur-md pointer-events-none"
          />

          {/* Floating Motion Container */}
          <motion.div
            animate={{
              y: isHovered ? 0 : [0, -5, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative flex items-center justify-center"
          >
            {/* Circular Progress Ring */}
            <svg
              className="w-[58px] h-[58px] sm:w-[66px] sm:h-[66px] -rotate-90 pointer-events-none drop-shadow-sm"
              viewBox="0 0 60 60"
            >
              {/* Background Track Circle */}
              <circle
                cx="30"
                cy="30"
                r={radius}
                className="stroke-[#E8E2D7]/60 fill-none"
                strokeWidth={strokeWidth}
              />
              {/* Dynamic Progress Fill Circle */}
              <circle
                cx="30"
                cy="30"
                r={radius}
                className="stroke-[#C8A24A] fill-none transition-all duration-150 ease-out"
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </svg>

            {/* Main Interactive Button */}
            <motion.button
              type="button"
              onClick={scrollToTop}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              aria-label="Back to top of ELYSIAN"
              title="Scroll to top of ELYSIAN"
              className={`
                absolute w-[50px] h-[50px] sm:w-[58px] sm:h-[58px] rounded-full
                flex items-center justify-center cursor-pointer
                transition-all duration-300 shadow-xl
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A24A] focus-visible:ring-offset-2
                ${isHovered
                  ? 'bg-[#1F1F1F] text-[#C8A24A] shadow-[0_12px_35px_rgba(31,31,31,0.4)] border border-[#C8A24A]/40'
                  : 'bg-[#C8A24A] text-[#1F1F1F] shadow-[0_8px_25px_rgba(200,162,74,0.4)] border border-white/40'
                }
              `}
            >
              {/* Upward Arrow Icon with Micro-Animation on Hover */}
              <motion.div
                animate={isHovered ? { y: [-2, 2, -2] } : { y: 0 }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowUp className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
              </motion.div>

              {/* Click Ripple Effect overlay */}
              {isClicked && (
                <motion.span
                  initial={{ scale: 0, opacity: 0.8 }}
                  animate={{ scale: 2, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="absolute inset-0 rounded-full bg-white/40 pointer-events-none"
                />
              )}
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
