import React, { useState, useEffect } from 'react';
import { Search, Heart, ShoppingBag, Sparkles, Scale, Menu, X, Check, Shield, Truck } from 'lucide-react';
import { CartItem, PerfumeProduct } from '../types';

interface NavbarProps {
  cartItems?: CartItem[];
  wishlist?: PerfumeProduct[];
  compareList?: PerfumeProduct[];
  cartCount?: number;
  wishlistCount?: number;
  compareCount?: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenCompare: () => void;
  onOpenSearch: () => void;
  onOpenAiSommelier: () => void;
  onOpenOrders?: () => void;
  onOpenFaq?: () => void;
  onOpenAdmin?: () => void;
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartItems = [],
  wishlist = [],
  compareList = [],
  cartCount,
  wishlistCount,
  compareCount,
  onOpenCart,
  onOpenWishlist,
  onOpenCompare,
  onOpenSearch,
  onOpenAiSommelier,
  onOpenOrders,
  onOpenFaq,
  onOpenAdmin,
  activeTab = 'home',
  setActiveTab
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState(activeTab);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const effectiveCartCount = cartCount !== undefined ? cartCount : cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const effectiveWishlistCount = wishlistCount !== undefined ? wishlistCount : wishlist.length;
  const effectiveCompareCount = compareCount !== undefined ? compareCount : compareList.length;
  const totalCartPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Shop All' },
    { id: 'collections', label: 'Collections' },
    { id: 'ingredients', label: 'Notes & Craft' },
    { id: 'story', label: 'Our Story' },
    { id: 'faq', label: 'FAQ' },
    { id: 'journal', label: 'Scent Journal' }
  ];

  const handleNavClick = (id: string) => {
    setCurrentTab(id);
    if (setActiveTab) setActiveTab(id);
    setMobileMenuOpen(false);
    if (id === 'faq' && onOpenFaq) {
      onOpenFaq();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(`section-${id}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Announcement Bar */}
      <div className="bg-[#1F1F1F] text-[#EFE8DC] py-2 px-4 text-xs font-montserrat tracking-widest text-center uppercase flex items-center justify-center gap-2">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#C8A24A] animate-pulse"></span>
        <span>Complimentary Express Shipping Across India on Orders Above ₹499</span>
        <span className="hidden md:inline text-[#C8A24A]">|</span>
        <span className="hidden md:inline text-gray-300">Authentic Artisanal Extrait De Parfum (All Under ₹1000)</span>
      </div>

      {/* Main Glass Navbar */}
      <nav
        className={`w-full transition-all duration-300 border-b border-[#E8E2D7] ${
          isScrolled
            ? 'glass-panel py-3 shadow-sm'
            : 'bg-[#F8F6F2] py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#1F1F1F] hover:text-[#C8A24A] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Brand Logo & Tagline */}
          <div
            onClick={() => handleNavClick('home')}
            className="cursor-pointer flex flex-col items-center lg:items-start group"
          >
            <div className="flex items-center gap-2">
              <span className="font-cormorant text-2xl sm:text-3xl font-bold tracking-[0.2em] text-[#1F1F1F] group-hover:text-[#C8A24A] transition-colors uppercase">
                ELYSIAN
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8A24A]"></span>
            </div>
            <span className="text-[9px] font-montserrat tracking-[0.3em] text-[#666666] uppercase -mt-0.5">
              Crafted for the Extraordinary
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-xs font-montserrat uppercase tracking-[0.18em] transition-all relative py-1 cursor-pointer ${
                  currentTab === link.id
                    ? 'text-[#C8A24A] font-semibold'
                    : 'text-[#1F1F1F] hover:text-[#C8A24A]'
                }`}
              >
                {link.label}
                {currentTab === link.id && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#C8A24A] rounded-full"></span>
                )}
              </button>
            ))}
          </div>

          {/* Action Icons & AI Button */}
          <div className="flex items-center gap-3 sm:gap-4">
            
            {/* Admin Portal Button */}
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="hidden xl:flex items-center gap-1.5 bg-[#F8F6F2] hover:bg-[#1F1F1F] text-[#1F1F1F] hover:text-[#C8A24A] px-3 py-1.5 rounded-full text-[11px] font-montserrat uppercase tracking-wider font-bold transition-all border border-[#E8E2D7] shadow-sm hover:scale-105 active:scale-95 cursor-pointer"
                title="Open ELYSIAN Admin Dashboard"
              >
                <Shield size={13} className="text-[#C8A24A]" />
                <span>Admin</span>
              </button>
            )}

            {/* My Orders / Track Order Button */}
            {onOpenOrders && (
              <button
                onClick={onOpenOrders}
                className="hidden md:flex items-center gap-1.5 bg-white hover:bg-[#1F1F1F] text-[#1F1F1F] hover:text-[#C8A24A] px-3 py-1.5 rounded-full text-xs font-montserrat uppercase tracking-wider font-bold transition-all border border-[#E8E2D7] shadow-sm hover:scale-105 active:scale-95 cursor-pointer"
                title="My Orders & Live Order Tracking"
              >
                <Truck size={14} className="text-[#C8A24A]" />
                <span>My Orders</span>
              </button>
            )}

            {/* AI Sommelier Button */}
            <button
              onClick={onOpenAiSommelier}
              className="hidden sm:flex items-center gap-1.5 bg-[#1F1F1F] text-[#C8A24A] hover:bg-[#C8A24A] hover:text-[#1F1F1F] px-3.5 py-1.5 rounded-full text-xs font-montserrat uppercase tracking-wider font-semibold transition-all duration-300 border border-[#C8A24A] shadow-sm hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Sparkles size={14} className="animate-spin-slow" />
              <span>AI Sommelier</span>
            </button>

            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-[#1F1F1F] hover:text-[#C8A24A] transition-all duration-300 hover:scale-105 active:scale-95 relative cursor-pointer"
              title="Search Fragrances"
            >
              <Search size={20} />
            </button>

            {/* Compare Counter */}
            {effectiveCompareCount > 0 && (
              <button
                onClick={onOpenCompare}
                className="p-2 text-[#1F1F1F] hover:text-[#C8A24A] transition-all duration-300 hover:scale-105 active:scale-95 relative hidden sm:block cursor-pointer"
                title="Compare Fragrances"
              >
                <Scale size={20} />
                <span className="absolute -top-1 -right-1 bg-[#1F1F1F] text-[#C8A24A] text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {effectiveCompareCount}
                </span>
              </button>
            )}

            {/* Wishlist Icon */}
            <button
              onClick={onOpenWishlist}
              className="p-2 text-[#1F1F1F] hover:text-[#C8A24A] transition-all duration-300 hover:scale-105 active:scale-95 relative cursor-pointer"
              title="Wishlist"
            >
              <Heart size={20} />
              {effectiveWishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C8A24A] text-[#1F1F1F] text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {effectiveWishlistCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="flex items-center gap-2 bg-[#C8A24A] hover:bg-[#1F1F1F] text-[#1F1F1F] hover:text-[#C8A24A] px-3.5 py-2 rounded-full transition-all duration-300 border border-[#C8A24A] shadow-sm hover:scale-105 active:scale-95 group cursor-pointer"
            >
              <div className="relative">
                <ShoppingBag size={18} />
                {effectiveCartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#1F1F1F] text-[#C8A24A] group-hover:bg-[#C8A24A] group-hover:text-[#1F1F1F] text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {effectiveCartCount}
                  </span>
                )}
              </div>
              <span className="text-xs font-montserrat font-bold tracking-wider hidden md:inline">
                {totalCartPrice > 0 ? `₹${totalCartPrice}` : 'Bag'}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#F8F6F2] border-t border-[#E8E2D7] px-6 py-6 mt-3 space-y-4 shadow-lg animate-fadeIn">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`block w-full text-left text-sm font-montserrat uppercase tracking-widest py-2 border-b border-[#E8E2D7]/50 ${
                  activeTab === link.id ? 'text-[#C8A24A] font-bold' : 'text-[#1F1F1F]'
                }`}
              >
                {link.label}
              </button>
            ))}

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAiSommelier();
              }}
              className="w-full mt-2 flex items-center justify-center gap-2 bg-[#1F1F1F] text-[#C8A24A] py-3 rounded-md text-xs font-montserrat uppercase font-semibold tracking-wider border border-[#C8A24A]"
            >
              <Sparkles size={16} />
              <span>Ask AI Scent Sommelier</span>
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};
