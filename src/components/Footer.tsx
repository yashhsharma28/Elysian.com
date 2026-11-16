import React, { useState } from 'react';
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Clock,
  Phone,
  Mail,
  MapPin,
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
  ArrowUp,
  Check,
  Lock,
  Globe,
  Award,
  ChevronDown,
  ShoppingBag,
  Heart,
  User,
  PackageCheck,
  CircleCheck,
  MessageCircle,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AnimatedSection } from './AnimatedSection';

// Custom X (formerly Twitter) Icon
const XTwitterIcon = ({ size = 16, className = "" }: { size?: number; className?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// Custom Pinterest Icon
const PinterestIcon = ({ size = 16, className = "" }: { size?: number; className?: string }) => (
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
    aria-hidden="true"
  >
    <path d="M8 12a4 4 0 1 0 8 0 4 4 0 0 0-8 0" />
    <path d="M10.7 13.9c-.4 1.8-1 3.4-1.7 4.9.8.1 1.6.2 2.5.2 4.4 0 8-3.6 8-8s-3.6-8-8-8-8 3.6-8 8c0 1.9.7 3.7 1.8 5.1.2-.8.5-2 .8-3.1" />
  </svg>
);

// Custom WhatsApp Icon
const WhatsAppIcon = ({ size = 16, className = "" }: { size?: number; className?: string }) => (
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
    aria-hidden="true"
  >
    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
    <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
  </svg>
);

interface FooterProps {
  onOpenFaq?: () => void;
  onOpenAiSommelier?: () => void;
  onOpenAdmin?: () => void;
  onOpenCart?: () => void;
  onOpenWishlist?: () => void;
  onOpenOrders?: (orderId?: string) => void;
  onOpenShop?: () => void;
  onNavigateHome?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenFaq,
  onOpenAiSommelier,
  onOpenAdmin,
  onOpenCart,
  onOpenWishlist,
  onOpenOrders,
  onOpenShop,
  onNavigateHome
}) => {
  // Newsletter State
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribedEmails, setSubscribedEmails] = useState<string[]>([]);
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'submitting' | 'success' | 'duplicate'>('idle');

  // Currency & Language Selectors State
  const [selectedCurrency, setSelectedCurrency] = useState('INR (₹)');
  const [selectedLanguage, setSelectedLanguage] = useState('English (IN)');

  // Policy Modal Trigger State
  const [activePolicyModal, setActivePolicyModal] = useState<string | null>(null);

  // Smooth scroll helper
  const scrollToSection = (id: string) => {
    if (id === 'home' && onNavigateHome) {
      onNavigateHome();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (id === 'section-shop' && onOpenShop) {
      onOpenShop();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Newsletter Submission
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = newsletterEmail.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@')) return;

    if (subscribedEmails.includes(cleanEmail)) {
      setNewsletterStatus('duplicate');
      return;
    }

    setNewsletterStatus('submitting');
    setTimeout(() => {
      setSubscribedEmails((prev) => [...prev, cleanEmail]);
      setNewsletterStatus('success');
      setNewsletterEmail('');
    }, 800);
  };

  return (
    <footer
      aria-label="Site Footer"
      className="bg-[#F8F6F2] text-[#1F1F1F] pt-20 pb-12 border-t border-[#E8E2D7] relative overflow-hidden font-inter rounded-t-[32px] sm:rounded-t-[40px] shadow-inner"
    >
      {/* Decorative Gold Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-b from-[#C8A24A]/10 to-transparent blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        
        {/* ========================================================= */}
        {/* TRUST BADGES STRIP                                        */}
        {/* ========================================================= */}
        <AnimatedSection className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 border-b border-[#E8E2D7] pb-12">
          {[
            {
              icon: <Lock size={20} className="text-[#C8A24A]" />,
              title: "100% Secure Payments",
              sub: "256-Bit SSL Encrypted"
            },
            {
              icon: <Truck size={20} className="text-[#C8A24A]" />,
              title: "Free Express Shipping",
              sub: "On orders above ₹499"
            },
            {
              icon: <RotateCcw size={20} className="text-[#C8A24A]" />,
              title: "Easy 14-Day Returns",
              sub: "Hassle-free guarantee"
            },
            {
              icon: <PackageCheck size={20} className="text-[#C8A24A]" />,
              title: "Fast Air Delivery",
              sub: "3-5 business days pan-India"
            },
            {
              icon: <Sparkles size={20} className="text-[#C8A24A]" />,
              title: "30% Extrait Concentration",
              sub: "Haute Parfumerie quality"
            },
            {
              icon: <ShieldCheck size={20} className="text-[#C8A24A]" />,
              title: "100% Authentic & IFRA",
              sub: "Direct from Atelier vault"
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white/90 backdrop-blur-md border border-[#E8E2D7] rounded-2xl p-4 flex flex-col items-center text-center space-y-1.5 shadow-2xs hover:shadow-md hover:border-[#C8A24A]/50 transition-all hover:-translate-y-0.5"
            >
              <div className="p-2.5 rounded-full bg-[#F8F6F2] border border-[#E8E2D7]">
                {item.icon}
              </div>
              <h4 className="font-montserrat text-xs font-bold text-[#1F1F1F] leading-snug">
                {item.title}
              </h4>
              <span className="text-[10px] text-[#777777] font-inter">
                {item.sub}
              </span>
            </div>
          ))}
        </AnimatedSection>

        {/* ========================================================= */}
        {/* NEWSLETTER BANNER (JOIN THE ELYSIAN CLUB)                  */}
        {/* ========================================================= */}
        <AnimatedSection className="bg-gradient-to-r from-[#1F1F1F] via-[#2A2A2A] to-[#141414] text-white rounded-[24px] p-8 lg:p-12 shadow-xl border border-[#C8A24A]/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#C8A24A]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-6 space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C8A24A]/20 border border-[#C8A24A]/40 text-[#C8A24A] text-[10px] font-montserrat uppercase tracking-widest font-bold">
                <Sparkles size={12} /> Exclusive Private Reserve
              </div>
              <h3 className="font-cormorant text-3xl sm:text-4xl font-light text-[#F8F6F2]">
                Join the ELYSIAN Club
              </h3>
              <p className="text-xs font-inter text-gray-300 font-light leading-relaxed max-w-md">
                Subscribe to receive private vault drop invitations, secret VIP discount codes, and 10% off your very first Extrait de Parfum order.
              </p>
            </div>

            <div className="lg:col-span-6">
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      required
                      placeholder="Enter your email address"
                      aria-label="Enter your email address for newsletter subscription"
                      value={newsletterEmail}
                      onChange={(e) => {
                        setNewsletterEmail(e.target.value);
                        if (newsletterStatus !== 'idle') setNewsletterStatus('idle');
                      }}
                      className="w-full bg-white/10 text-white placeholder-gray-400 text-xs font-inter pl-11 pr-4 py-3.5 rounded-full border border-white/20 focus:outline-none focus:border-[#C8A24A] focus:bg-white/15 transition-all"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={newsletterStatus === 'submitting'}
                    className="bg-[#C8A24A] hover:bg-white text-[#1F1F1F] font-montserrat text-xs uppercase tracking-widest font-bold px-8 py-3.5 rounded-full transition-all shadow-md hover:scale-105 active:scale-95 cursor-pointer shrink-0"
                  >
                    {newsletterStatus === 'submitting' ? 'Joining...' : 'Subscribe'}
                  </button>
                </div>

                <AnimatePresence>
                  {newsletterStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2 text-xs text-emerald-400 font-montserrat font-semibold pt-1"
                    >
                      <CircleCheck size={14} />
                      <span>Welcome to the ELYSIAN Club! Check your inbox for your 10% discount code.</span>
                    </motion.div>
                  )}
                  {newsletterStatus === 'duplicate' && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2 text-xs text-amber-300 font-montserrat font-semibold pt-1"
                    >
                      <Award size={14} />
                      <span>You are already a valued member of the ELYSIAN Club!</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </div>
        </AnimatedSection>

        {/* ========================================================= */}
        {/* MAIN NAVIGATION & BUSINESS DETAILS GRID                   */}
        {/* ========================================================= */}
        <AnimatedSection className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pt-4">
          
          {/* Column 1: Brand Info & Contact */}
          <div className="lg:col-span-2 space-y-5">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-cormorant text-3xl font-bold tracking-[0.2em] text-[#1F1F1F] uppercase">
                  ELYSIAN
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#C8A24A]" />
              </div>
              <p className="text-xs font-montserrat uppercase tracking-[0.25em] text-[#C8A24A] font-bold">
                Crafted for the Extraordinary
              </p>
            </div>

            <p className="text-xs font-inter text-[#555555] leading-relaxed max-w-sm font-light">
              ELYSIAN creates premium fragrances designed to express confidence, elegance, and individuality. Discover your signature scent with our luxury perfume collection.
            </p>

            {/* Contact Details */}
            <div className="pt-2 text-xs font-inter text-[#333333] space-y-2.5 bg-white p-4 rounded-2xl border border-[#E8E2D7]">
              <div className="font-montserrat text-[11px] font-bold uppercase tracking-wider text-[#C8A24A]">
                ELYSIAN Fragrances
              </div>
              <p className="flex items-start gap-2.5">
                <MapPin size={15} className="text-[#C8A24A] shrink-0 mt-0.5" />
                <span>123 Luxury Avenue, Mumbai, Maharashtra, India – 400001</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail size={15} className="text-[#C8A24A] shrink-0" />
                <a href="mailto:support@elysian.com" className="hover:text-[#C8A24A] transition-colors font-medium">
                  support@elysian.com
                </a>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone size={15} className="text-[#C8A24A] shrink-0" />
                <a href="tel:+919876543210" className="hover:text-[#C8A24A] transition-colors font-medium">
                  +91 98765 43210
                </a>
              </p>
              <p className="flex items-center gap-2.5">
                <Clock size={15} className="text-[#C8A24A] shrink-0" />
                <span>Monday – Saturday: 9:00 AM – 7:00 PM</span>
              </p>
            </div>

            {/* Social Media Icons */}
            <div className="space-y-2">
              <span className="text-[11px] font-montserrat uppercase tracking-wider font-bold text-[#1F1F1F] block">
                Connect With Us
              </span>
              <div className="flex flex-wrap items-center gap-2.5">
                {[
                  { name: 'Instagram', icon: <Instagram size={15} />, href: 'https://instagram.com' },
                  { name: 'Facebook', icon: <Facebook size={15} />, href: 'https://facebook.com' },
                  { name: 'Pinterest', icon: <PinterestIcon size={15} />, href: 'https://pinterest.com' },
                  { name: 'YouTube', icon: <Youtube size={15} />, href: 'https://youtube.com' },
                  { name: 'LinkedIn', icon: <Linkedin size={15} />, href: 'https://linkedin.com' },
                  { name: 'X (Twitter)', icon: <XTwitterIcon size={15} />, href: 'https://x.com' },
                  { name: 'WhatsApp', icon: <WhatsAppIcon size={15} />, href: 'https://whatsapp.com' }
                ].map((s) => (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.name}
                    className="w-9 h-9 rounded-full bg-white hover:bg-[#1F1F1F] text-[#1F1F1F] hover:text-[#C8A24A] border border-[#E8E2D7] hover:border-[#C8A24A] flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer shadow-2xs"
                    title={s.name}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-montserrat text-xs uppercase tracking-widest font-bold text-[#1F1F1F] border-b border-[#C8A24A] pb-1 inline-block">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs font-inter text-[#555555]">
              <li>
                <button onClick={() => scrollToSection('home')} className="hover:text-[#C8A24A] transition-colors cursor-pointer">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('section-shop')} className="hover:text-[#C8A24A] transition-colors cursor-pointer">
                  Shop All Fragrances
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('section-shop')} className="hover:text-[#C8A24A] transition-colors cursor-pointer">
                  Men's Collection
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('section-shop')} className="hover:text-[#C8A24A] transition-colors cursor-pointer">
                  Women's Collection
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('section-shop')} className="hover:text-[#C8A24A] transition-colors cursor-pointer">
                  Unisex Collection
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('section-bestsellers')} className="hover:text-[#C8A24A] transition-colors cursor-pointer">
                  Best Sellers
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('section-shop')} className="hover:text-[#C8A24A] transition-colors cursor-pointer">
                  New Arrivals
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('section-gift-sets')} className="hover:text-[#C8A24A] transition-colors cursor-pointer">
                  Gift Sets & Discovery
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('section-story')} className="hover:text-[#C8A24A] transition-colors cursor-pointer">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('section-reviews')} className="hover:text-[#C8A24A] transition-colors cursor-pointer">
                  Customer Reviews
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('section-ingredients')} className="hover:text-[#C8A24A] transition-colors cursor-pointer">
                  Contact Us
                </button>
              </li>
              <li>
                <button onClick={onOpenFaq} className="hover:text-[#C8A24A] text-left cursor-pointer transition-colors">
                  FAQ
                </button>
              </li>
              {onOpenAdmin && (
                <li>
                  <button onClick={onOpenAdmin} className="text-[#C8A24A] font-bold hover:underline text-left cursor-pointer">
                    Admin Dashboard
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Column 3: Customer Service */}
          <div className="space-y-3">
            <h4 className="font-montserrat text-xs uppercase tracking-widest font-bold text-[#1F1F1F] border-b border-[#C8A24A] pb-1 inline-block">
              Customer Service
            </h4>
            <ul className="space-y-2 text-xs font-inter text-[#555555]">
              <li>
                <button onClick={() => onOpenOrders?.()} className="hover:text-[#C8A24A] transition-colors cursor-pointer flex items-center gap-1.5">
                  <User size={13} className="text-[#C8A24A]" />
                  <span>My Account</span>
                </button>
              </li>
              <li>
                <button onClick={() => onOpenOrders?.()} className="hover:text-[#C8A24A] transition-colors cursor-pointer flex items-center gap-1.5">
                  <Truck size={13} className="text-[#C8A24A]" />
                  <span>Track Order</span>
                </button>
              </li>
              <li>
                <button onClick={onOpenWishlist} className="hover:text-[#C8A24A] transition-colors cursor-pointer flex items-center gap-1.5">
                  <Heart size={13} className="text-[#C8A24A]" />
                  <span>Wishlist</span>
                </button>
              </li>
              <li>
                <button onClick={onOpenCart} className="hover:text-[#C8A24A] transition-colors cursor-pointer flex items-center gap-1.5">
                  <ShoppingBag size={13} className="text-[#C8A24A]" />
                  <span>Shopping Cart</span>
                </button>
              </li>
              <li>
                <button onClick={onOpenCart} className="hover:text-[#C8A24A] transition-colors cursor-pointer">
                  Checkout
                </button>
              </li>
              <li>
                <button onClick={() => setActivePolicyModal('shipping')} className="hover:text-[#C8A24A] text-left cursor-pointer transition-colors">
                  Shipping Policy
                </button>
              </li>
              <li>
                <button onClick={() => setActivePolicyModal('returns')} className="hover:text-[#C8A24A] text-left cursor-pointer transition-colors">
                  Return & Refund Policy
                </button>
              </li>
              <li>
                <button onClick={() => setActivePolicyModal('privacy')} className="hover:text-[#C8A24A] text-left cursor-pointer transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => setActivePolicyModal('terms')} className="hover:text-[#C8A24A] text-left cursor-pointer transition-colors">
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button onClick={() => setActivePolicyModal('cookie')} className="hover:text-[#C8A24A] text-left cursor-pointer transition-colors">
                  Cookie Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Product Categories */}
          <div className="space-y-3">
            <h4 className="font-montserrat text-xs uppercase tracking-widest font-bold text-[#1F1F1F] border-b border-[#C8A24A] pb-1 inline-block">
              Product Categories
            </h4>
            <ul className="space-y-2 text-xs font-inter text-[#555555]">
              <li>
                <button onClick={() => scrollToSection('section-shop')} className="hover:text-[#C8A24A] transition-colors cursor-pointer">
                  Men's Perfumes
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('section-shop')} className="hover:text-[#C8A24A] transition-colors cursor-pointer">
                  Women's Perfumes
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('section-shop')} className="hover:text-[#C8A24A] transition-colors cursor-pointer">
                  Unisex Perfumes
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('section-shop')} className="hover:text-[#C8A24A] transition-colors cursor-pointer">
                  Luxury Gift Boxes
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('section-shop')} className="hover:text-[#C8A24A] transition-colors cursor-pointer">
                  Travel Size Perfumes
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('section-shop')} className="hover:text-[#C8A24A] transition-colors cursor-pointer">
                  Discovery Sets
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('section-shop')} className="hover:text-[#C8A24A] transition-colors cursor-pointer">
                  Body Mists
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('section-shop')} className="hover:text-[#C8A24A] transition-colors cursor-pointer">
                  Attars & Concentrates
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('section-shop')} className="hover:text-[#C8A24A] transition-colors cursor-pointer">
                  New Arrivals
                </button>
              </li>
              <li>
                <button onClick={() => scrollToSection('section-shop')} className="hover:text-[#C8A24A] transition-colors cursor-pointer">
                  Limited Edition
                </button>
              </li>
            </ul>
          </div>

        </AnimatedSection>

        {/* ========================================================= */}
        {/* PAYMENT METHODS & REGIONAL CONTROLS STRIP                */}
        {/* ========================================================= */}
        <AnimatedSection className="pt-8 border-t border-[#E8E2D7] flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Payment Methods Badges */}
          <div className="space-y-2 text-center lg:text-left">
            <span className="text-[11px] font-montserrat uppercase tracking-wider text-[#1F1F1F] font-bold block">
              100% Secure Payment Gateways Accepted
            </span>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
              {[
                'UPI',
                'Google Pay',
                'PhonePe',
                'Paytm',
                'Visa',
                'Mastercard',
                'RuPay',
                'Net Banking',
                'Cash on Delivery'
              ].map((channel) => (
                <span
                  key={channel}
                  className="bg-white text-[#1F1F1F] px-3 py-1.5 rounded-lg border border-[#E8E2D7] text-[11px] font-montserrat font-bold shadow-2xs hover:border-[#C8A24A] transition-colors"
                >
                  {channel}
                </span>
              ))}
            </div>
          </div>

          {/* Regional Currency & Language Selectors */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Globe size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#C8A24A]" />
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                aria-label="Select Language"
                className="bg-white text-xs font-montserrat font-semibold pl-8 pr-7 py-2 rounded-full border border-[#E8E2D7] focus:outline-none focus:border-[#C8A24A] text-[#1F1F1F] cursor-pointer shadow-2xs"
              >
                <option value="English (IN)">English (IN)</option>
                <option value="Hindi (IN)">हिंदी (IN)</option>
                <option value="French (FR)">Français (FR)</option>
              </select>
            </div>

            <div className="relative">
              <select
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value)}
                aria-label="Select Currency"
                className="bg-white text-xs font-montserrat font-semibold px-4 py-2 rounded-full border border-[#E8E2D7] focus:outline-none focus:border-[#C8A24A] text-[#1F1F1F] cursor-pointer shadow-2xs"
              >
                <option value="INR (₹)">INR (₹)</option>
                <option value="USD ($)">USD ($)</option>
                <option value="EUR (€)">EUR (€)</option>
                <option value="AED (د.إ)">AED (د.إ)</option>
              </select>
            </div>
          </div>
        </AnimatedSection>

        {/* ========================================================= */}
        {/* FOOTER BOTTOM BAR WITH BACK TO TOP                        */}
        {/* ========================================================= */}
        <div className="pt-6 border-t border-[#E8E2D7] flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-inter text-[#666666]">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
            <span>© 2026 ELYSIAN. All Rights Reserved.</span>
            <span className="hidden md:inline text-gray-300">•</span>
            <span>Designed with ❤️ for fragrance lovers.</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] font-montserrat font-semibold">
            <button
              onClick={() => setActivePolicyModal('privacy')}
              className="hover:text-[#C8A24A] transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              onClick={() => setActivePolicyModal('terms')}
              className="hover:text-[#C8A24A] transition-colors cursor-pointer"
            >
              Terms & Conditions
            </button>
            <span>•</span>
            <button
              onClick={() => setActivePolicyModal('returns')}
              className="hover:text-[#C8A24A] transition-colors cursor-pointer"
            >
              Refund Policy
            </button>
            <span>•</span>
            <button
              onClick={() => scrollToSection('home')}
              className="hover:text-[#C8A24A] transition-colors cursor-pointer"
            >
              Sitemap
            </button>

            {/* Back to Top Button */}
            <button
              onClick={scrollToTop}
              className="ml-2 bg-[#1F1F1F] hover:bg-[#C8A24A] text-[#C8A24A] hover:text-[#1F1F1F] p-2.5 rounded-full transition-all hover:scale-110 active:scale-95 cursor-pointer shadow-md flex items-center justify-center"
              title="Back to top"
              aria-label="Back to top of page"
            >
              <ArrowUp size={14} />
            </button>
          </div>
        </div>

      </div>

      {/* ========================================================= */}
      {/* POLICY MODALS POPUP                                       */}
      {/* ========================================================= */}
      <AnimatePresence>
        {activePolicyModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/75 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-[28px] border border-[#E8E2D7] shadow-2xl max-w-2xl w-full p-6 sm:p-8 relative space-y-4 max-h-[80vh] overflow-y-auto"
            >
              <button
                onClick={() => setActivePolicyModal(null)}
                className="absolute top-6 right-6 text-gray-400 hover:text-[#1F1F1F] p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>

              <div className="space-y-1">
                <span className="text-xs font-montserrat uppercase font-bold text-[#C8A24A]">
                  ELYSIAN Legal & Compliance
                </span>
                <h3 className="font-cormorant text-2xl font-bold text-[#1F1F1F] capitalize">
                  {activePolicyModal.replace('-', ' ')} Policy
                </h3>
              </div>

              <div className="text-xs font-inter text-[#444444] space-y-3 leading-relaxed pt-2">
                <p>
                  At ELYSIAN Fragrances India Pvt Ltd (123 Luxury Avenue, Mumbai), we maintain the highest standards of haute parfumerie integrity, customer data encryption, and consumer satisfaction.
                </p>
                <h4 className="font-bold text-[#1F1F1F] font-montserrat">1. 100% Authentic Extrait Promise</h4>
                <p>
                  Every fragrance bottle shipped from our Atelier vault is sealed with tamper-evident velvet packaging and backed by official IFRA chemical safety certifications.
                </p>
                <h4 className="font-bold text-[#1F1F1F] font-montserrat">2. Shipping & Delivery Timeline</h4>
                <p>
                  Orders are dispatched within 24 hours via Delhivery Express Air courier. Delivery across major Indian metro cities takes 2 to 4 business days.
                </p>
                <h4 className="font-bold text-[#1F1F1F] font-montserrat">3. 14-Day Returns & Replacements</h4>
                <p>
                  If your package arrives damaged or if you wish to exchange an unopened fragrance box, contact <a href="mailto:support@elysian.com" className="text-[#C8A24A] font-bold">support@elysian.com</a> within 14 days of delivery.
                </p>
              </div>

              <div className="pt-4 border-t border-[#E8E2D7] flex justify-end">
                <button
                  onClick={() => setActivePolicyModal(null)}
                  className="bg-[#1F1F1F] text-[#C8A24A] px-6 py-2.5 rounded-full text-xs font-montserrat uppercase font-bold cursor-pointer"
                >
                  Close & Continue
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </footer>
  );
};
