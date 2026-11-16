import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Mail,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
  Loader2,
  Users,
  Check,
  AlertCircle
} from 'lucide-react';
import { AnimatedSection } from './AnimatedSection';

// Simple custom Pinterest SVG icon since Lucide standard may not include Pinterest
const PinterestIcon = ({ size = 20, className = "" }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M8 12a4 4 0 1 0 8 0 4 4 0 0 0-8 0" />
    <path d="M10.7 13.9c-.4 1.8-1 3.4-1.7 4.9.8.1 1.6.2 2.5.2 4.4 0 8-3.6 8-8s-3.6-8-8-8-8 3.6-8 8c0 1.9.7 3.7 1.8 5.1.2-.8.5-2 .8-3.1" />
  </svg>
);

interface NewsletterSectionProps {
  onContinueShopping?: () => void;
}

export const NewsletterSection: React.FC<NewsletterSectionProps> = ({ onContinueShopping }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscribedEmails, setSubscribedEmails] = useState<string[]>(['vip@elysian.in', 'test@elysian.com']);

  // Email regex validator
  const validateEmail = (input: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(input).toLowerCase());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedEmail = email.trim();

    // Field Empty
    if (!trimmedEmail) {
      setError('Email address is required.');
      return;
    }

    // Invalid Email
    if (!validateEmail(trimmedEmail)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Already Subscribed
    if (subscribedEmails.includes(trimmedEmail.toLowerCase())) {
      setError('This email is already subscribed.');
      return;
    }

    // Simulate luxury API call submitting state
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSubscribed(true);
      setSubscribedEmails((prev) => [...prev, trimmedEmail.toLowerCase()]);
      setEmail('');
    }, 1200);
  };

  return (
    <section id="section-newsletter" className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F8F6F2] relative overflow-hidden">
      
      {/* Background Soft Glow & Floral Texture Overlay */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C8A24A]/10 rounded-full blur-[120px]"></div>
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#D8B36A]/10 rounded-full blur-[90px]"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <AnimatedSection className="bg-white border border-[#E8E2D7] rounded-[24px] p-8 sm:p-14 lg:p-16 shadow-xl text-center space-y-8 relative overflow-hidden gold-glow-hover">
          
          {/* Subtle Decorative Floral Background Texture */}
          <div className="absolute inset-0 bg-[radial-gradient(#C8A24A_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.04] pointer-events-none"></div>

          {/* Top Tagline Badge */}
          <div className="inline-flex items-center gap-2 bg-[#1F1F1F] text-[#C8A24A] px-4 py-1.5 rounded-full text-[11px] sm:text-xs font-montserrat uppercase tracking-[0.25em] font-bold border border-[#C8A24A]/40 shadow-sm">
            <Sparkles size={14} className="text-[#C8A24A]" />
            <span>Crafted for the Extraordinary</span>
          </div>

          <AnimatePresence mode="wait">
            {!isSubscribed ? (
              /* SUBSCRIPTION FORM VIEW */
              <motion.div
                key="subscription-form"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="space-y-6 max-w-2xl mx-auto"
              >
                {/* Heading & Subheading */}
                <div className="space-y-3">
                  <h2 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl font-light text-[#1F1F1F] leading-tight">
                    Join the <span className="italic font-normal text-[#C8A24A]">ELYSIAN Club</span>
                  </h2>

                  <p className="font-inter text-sm sm:text-base text-[#666666] font-light leading-relaxed">
                    Subscribe to receive exclusive offers, new fragrance launches, limited editions, perfume tips, and special member-only discounts.
                  </p>
                </div>

                {/* Form Field */}
                <form onSubmit={handleSubmit} className="pt-2 space-y-3 text-left">
                  <div className="relative flex flex-col sm:flex-row items-center gap-3">
                    
                    {/* Input Container */}
                    <div className="relative w-full">
                      <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-[#C8A24A]" size={20} />
                      <input
                        type="text"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (error) setError(null);
                        }}
                        placeholder="Enter your email address"
                        className={`w-full bg-[#F8F6F2] border rounded-full pl-14 pr-6 py-4 text-sm font-inter text-[#1F1F1F] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#C8A24A]/40 transition-all duration-300 shadow-inner ${
                          error ? 'border-red-500 focus:border-red-500' : 'border-[#E8E2D7] focus:border-[#C8A24A]'
                        }`}
                      />
                    </div>

                    {/* Subscribe Button */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full sm:w-auto bg-[#C8A24A] hover:bg-[#1F1F1F] text-[#1F1F1F] hover:text-[#C8A24A] border border-[#C8A24A] px-8 py-4 rounded-full font-montserrat text-xs uppercase tracking-widest font-bold transition-all duration-300 shadow-md hover:shadow-xl flex items-center justify-center gap-2 shrink-0 cursor-pointer disabled:opacity-75 hover:scale-105 active:scale-95"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 size={16} className="animate-spin text-current" />
                          <span>Subscribing...</span>
                        </>
                      ) : (
                        <>
                          <span>Subscribe</span>
                          <ArrowRight size={16} />
                        </>
                      )}
                    </button>
                  </div>

                  {/* Animated Error Alert */}
                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        className="flex items-center gap-2 text-xs font-montserrat font-semibold text-red-600 pl-4 pt-1"
                      >
                        <AlertCircle size={14} />
                        <span>{error}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>

                {/* Newsletter Social Counter & Privacy Note */}
                <div className="pt-4 border-t border-[#F4F1EA] space-y-4">
                  
                  <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-montserrat text-[#666666]">
                    <div className="flex -space-x-2">
                      <img className="w-6 h-6 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="Connoisseur Member" />
                      <img className="w-6 h-6 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" alt="Connoisseur Member" />
                      <img className="w-6 h-6 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80" alt="Connoisseur Member" />
                    </div>
                    <span className="font-semibold text-[#1F1F1F]">Over 28,500+</span>
                    <span>perfume lovers joined this month.</span>
                  </div>

                  <p className="text-[11px] font-inter text-gray-400 font-light flex items-center justify-center gap-1.5">
                    <ShieldCheck size={13} className="text-[#C8A24A]" />
                    <span>We respect your privacy. No spam, unsubscribe anytime.</span>
                  </p>

                  {/* Social Media Icons */}
                  <div className="pt-2 flex items-center justify-center gap-4 text-gray-400">
                    <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-2.5 bg-[#F8F6F2] hover:bg-[#1F1F1F] text-[#1F1F1F] hover:text-[#C8A24A] rounded-full border border-[#E8E2D7] transition-all hover:scale-110 active:scale-95 cursor-pointer" aria-label="Instagram">
                      <Instagram size={16} />
                    </a>
                    <a href="https://facebook.com" target="_blank" rel="noreferrer" className="p-2.5 bg-[#F8F6F2] hover:bg-[#1F1F1F] text-[#1F1F1F] hover:text-[#C8A24A] rounded-full border border-[#E8E2D7] transition-all hover:scale-110 active:scale-95 cursor-pointer" aria-label="Facebook">
                      <Facebook size={16} />
                    </a>
                    <a href="https://pinterest.com" target="_blank" rel="noreferrer" className="p-2.5 bg-[#F8F6F2] hover:bg-[#1F1F1F] text-[#1F1F1F] hover:text-[#C8A24A] rounded-full border border-[#E8E2D7] transition-all hover:scale-110 active:scale-95 cursor-pointer" aria-label="Pinterest">
                      <PinterestIcon size={16} />
                    </a>
                    <a href="https://youtube.com" target="_blank" rel="noreferrer" className="p-2.5 bg-[#F8F6F2] hover:bg-[#1F1F1F] text-[#1F1F1F] hover:text-[#C8A24A] rounded-full border border-[#E8E2D7] transition-all hover:scale-110 active:scale-95 cursor-pointer" aria-label="YouTube">
                      <Youtube size={16} />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="p-2.5 bg-[#F8F6F2] hover:bg-[#1F1F1F] text-[#1F1F1F] hover:text-[#C8A24A] rounded-full border border-[#E8E2D7] transition-all hover:scale-110 active:scale-95 cursor-pointer" aria-label="LinkedIn">
                      <Linkedin size={16} />
                    </a>
                  </div>

                </div>
              </motion.div>
            ) : (
              /* SUCCESS MESSAGE VIEW */
              <motion.div
                key="subscription-success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6 max-w-lg mx-auto py-4"
              >
                <div className="w-16 h-16 bg-[#1F1F1F] text-[#C8A24A] border border-[#C8A24A] rounded-full flex items-center justify-center mx-auto shadow-xl">
                  <CheckCircle2 size={32} />
                </div>

                <div className="space-y-3">
                  <h3 className="font-cormorant text-4xl font-light text-[#1F1F1F]">
                    Thank You!
                  </h3>

                  <p className="font-inter text-sm text-[#444444] font-light leading-relaxed">
                    You have successfully subscribed to the ELYSIAN Newsletter. You'll now receive exclusive offers, early access to new collections, fragrance tips, and luxury updates directly in your inbox.
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      setIsSubscribed(false);
                      if (onContinueShopping) onContinueShopping();
                    }}
                    className="bg-[#1F1F1F] hover:bg-[#C8A24A] text-[#C8A24A] hover:text-[#1F1F1F] px-8 py-3.5 rounded-full font-montserrat text-xs uppercase tracking-widest font-bold transition-all duration-300 shadow-md hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    Continue Shopping
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </AnimatedSection>
      </div>
    </section>
  );
};
