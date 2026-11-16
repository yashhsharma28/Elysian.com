import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  Clock,
  Heart,
  Star,
  Zap,
  CheckCircle,
  Truck,
  RotateCcw,
  ShoppingBag
} from 'lucide-react';
import { PerfumeProduct } from '../types';
import { PERFUMES_CATALOG } from '../data/perfumes';
import { motion } from 'motion/react';
import { HeroCmsConfig } from '../types/heroCms';
import { getStoredHeroCmsConfig } from '../data/heroCmsData';

interface HeroProps {
  heroPerfume?: PerfumeProduct;
  onShopNow?: () => void;
  onExploreCollection?: () => void;
  onExploreClick?: () => void;
  onOpenAiSommelier?: () => void;
  overrideConfig?: HeroCmsConfig; // For CMS Admin Live Preview!
}

// Icon mapping helper
const renderDynamicIcon = (iconName: string, className = "w-4 h-4") => {
  switch (iconName) {
    case 'Sparkles': return <Sparkles className={className} />;
    case 'ShieldCheck': return <ShieldCheck className={className} />;
    case 'Award': return <Award className={className} />;
    case 'Clock': return <Clock className={className} />;
    case 'Heart': return <Heart className={className} />;
    case 'Star': return <Star className={className} />;
    case 'Zap': return <Zap className={className} />;
    case 'CheckCircle': return <CheckCircle className={className} />;
    case 'Truck': return <Truck className={className} />;
    case 'RotateCcw': return <RotateCcw className={className} />;
    case 'ShoppingBag': return <ShoppingBag className={className} />;
    case 'ArrowRight': return <ArrowRight className={className} />;
    default: return <Sparkles className={className} />;
  }
};

export const Hero: React.FC<HeroProps> = ({
  heroPerfume = PERFUMES_CATALOG[0],
  onShopNow,
  onExploreCollection,
  onExploreClick,
  onOpenAiSommelier,
  overrideConfig
}) => {
  const [config, setConfig] = useState<HeroCmsConfig>(overrideConfig || getStoredHeroCmsConfig());

  useEffect(() => {
    if (overrideConfig) {
      setConfig(overrideConfig);
      return;
    }

    const handleCmsUpdate = (e: CustomEvent) => {
      if (e.detail) {
        setConfig(e.detail);
      }
    };

    window.addEventListener('elysian_cms_updated' as any, handleCmsUpdate);
    return () => {
      window.removeEventListener('elysian_cms_updated' as any, handleCmsUpdate);
    };
  }, [overrideConfig]);

  const handlePrimaryShop = onShopNow || onExploreClick || (() => {
    const shopSec = document.getElementById('section-shop');
    if (shopSec) {
      shopSec.scrollIntoView({ behavior: 'smooth' });
    } else if (config.buttons.primary.link) {
      window.location.href = config.buttons.primary.link;
    }
  });

  const handleSecondaryExplore = onExploreCollection || onExploreClick || (() => {
    const shopSec = document.getElementById('section-shop');
    if (shopSec) {
      shopSec.scrollIntoView({ behavior: 'smooth' });
    } else if (config.buttons.secondary.link) {
      window.location.href = config.buttons.secondary.link;
    }
  });

  const handleThirdLink = () => {
    if (config.buttons.thirdLink.url === 'ai_sommelier' && onOpenAiSommelier) {
      onOpenAiSommelier();
    } else {
      const shopSec = document.getElementById('section-shop');
      if (shopSec) shopSec.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Background styling
  const bgStyle: React.CSSProperties = {};
  if (config.background.type === 'solid') {
    bgStyle.backgroundColor = config.background.backgroundColor || '#F8F6F2';
  } else if (config.background.type === 'gradient') {
    bgStyle.background = `linear-gradient(135deg, ${config.background.gradientStart || '#F8F6F2'}, ${config.background.gradientEnd || '#EFE8DC'})`;
  } else if (config.background.type === 'image' && config.background.imageUrl) {
    bgStyle.backgroundImage = `url(${config.background.imageUrl})`;
    bgStyle.backgroundSize = 'cover';
    bgStyle.backgroundPosition = 'center';
  }

  return (
    <section
      style={bgStyle}
      className="relative min-h-[90vh] flex items-center overflow-hidden border-b border-[#E8E2D7] transition-all duration-300"
    >
      {/* Background Overlay if image or blur enabled */}
      {config.background.type === 'image' && (
        <div
          className="absolute inset-0 bg-black pointer-events-none"
          style={{
            opacity: config.background.overlayOpacity ?? 0.2,
            backdropFilter: config.background.blurAmount ? `blur(${config.background.blurAmount}px)` : 'none'
          }}
        />
      )}

      {/* Subtle Background Glow & Radial Accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#EFE8DC] rounded-full blur-3xl opacity-70 pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#D8B36A]/10 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Typography & Copy */}
          <div
            className={`lg:col-span-7 space-y-6 ${
              config.mainHeading.alignment === 'center'
                ? 'text-center'
                : config.mainHeading.alignment === 'right'
                ? 'text-right'
                : 'text-center lg:text-left'
            }`}
          >
            
            {/* Announcement Bar / Heritage Badge */}
            {config.announcementBar.enabled && (
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  backgroundColor: config.announcementBar.backgroundColor || '#F4F1EA',
                  color: config.announcementBar.textColor || '#C8A24A',
                  borderRadius: config.announcementBar.borderRadius || '9999px'
                }}
                className="inline-flex items-center gap-2 border border-[#E8E2D7] px-4 py-1.5 text-xs font-montserrat uppercase tracking-[0.25em] font-semibold cursor-pointer shadow-xs hover:scale-105 transition-transform"
                onClick={() => {
                  if (config.announcementBar.link) {
                    const el = document.getElementById(config.announcementBar.link.replace('#', ''));
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                {renderDynamicIcon(config.announcementBar.icon, "w-3.5 h-3.5 text-[#C8A24A]")}
                <span>{config.announcementBar.text}</span>
              </motion.div>
            )}

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, x: -80 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{
                color: config.mainHeading.textColor || '#1F1F1F',
                fontFamily: config.mainHeading.fontFamily || 'Cormorant Garamond',
                letterSpacing: config.mainHeading.letterSpacing || '-0.02em',
                lineHeight: config.mainHeading.lineHeight || '1.08',
              }}
              className="font-cormorant text-4xl sm:text-6xl md:text-7xl font-light leading-[1.08] tracking-tight"
            >
              {config.mainHeading.text} <br />
              <span
                style={{ color: config.mainHeading.highlightColor || '#C8A24A' }}
                className="font-italic font-normal italic"
              >
                {config.mainHeading.highlightedText}
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{
                color: config.subHeading.textColor || '#666666',
                fontFamily: config.subHeading.fontFamily || 'Inter',
                maxWidth: config.subHeading.maxWidth || '36rem'
              }}
              className="text-base sm:text-lg mx-auto lg:mx-0 font-light leading-relaxed"
            >
              {config.subHeading.text}
            </motion.p>

            {/* Price Highlight & Feature Pills */}
            {(config.priceInfo.enabled || config.trustBadges.some(b => b.enabled)) && (
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4"
              >
                {config.priceInfo.enabled && (
                  <div className="bg-white border border-[#E8E2D7] px-4 py-2.5 rounded-lg shadow-sm flex items-center gap-3">
                    <span className="text-xs font-montserrat uppercase text-[#666666] tracking-wider">Prices From</span>
                    <span className="font-cormorant text-2xl font-bold text-[#1F1F1F]">
                      {config.priceInfo.currencySymbol}{config.priceInfo.startingPrice}
                    </span>
                    <span
                      style={{
                        backgroundColor: config.priceInfo.badgeBackgroundColor || '#EFE8DC',
                        color: config.priceInfo.badgeTextColor || '#C8A24A'
                      }}
                      className="text-xs font-montserrat px-2 py-0.5 rounded font-semibold"
                    >
                      {config.priceInfo.priceBadgeText}
                    </span>
                  </div>
                )}

                {config.trustBadges.filter(b => b.enabled).map((badge) => (
                  <div
                    key={badge.id}
                    className="bg-white border border-[#E8E2D7] px-4 py-2.5 rounded-lg shadow-sm flex items-center gap-2 text-xs font-inter text-[#1F1F1F]"
                  >
                    {renderDynamicIcon(badge.icon, "w-4 h-4 text-[#C8A24A]")}
                    <span>{badge.title}</span>
                  </div>
                ))}
              </motion.div>
            )}

            {/* CTA Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 45 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              {config.buttons.primary.enabled && (
                <button
                  onClick={handlePrimaryShop}
                  style={{
                    backgroundColor: config.buttons.primary.backgroundColor || '#C8A24A',
                    color: config.buttons.primary.textColor || '#1F1F1F',
                    borderRadius: config.buttons.primary.borderRadius || '9999px',
                  }}
                  className="w-full sm:w-auto hover:bg-[#1F1F1F] hover:text-[#C8A24A] px-8 py-4 font-montserrat text-xs uppercase tracking-[0.2em] font-bold transition-all duration-300 shadow-md hover:shadow-xl border border-[#C8A24A] hover:scale-105 active:scale-95 flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>{config.buttons.primary.text}</span>
                  {renderDynamicIcon(config.buttons.primary.iconName, "w-4 h-4 group-hover:translate-x-1 transition-transform")}
                </button>
              )}

              {config.buttons.secondary.enabled && (
                <button
                  onClick={handleSecondaryExplore}
                  style={{
                    backgroundColor: config.buttons.secondary.backgroundColor || '#FFFFFF',
                    color: config.buttons.secondary.textColor || '#1F1F1F',
                    borderRadius: config.buttons.secondary.borderRadius || '9999px',
                  }}
                  className="w-full sm:w-auto hover:bg-[#1F1F1F] hover:text-[#C8A24A] px-8 py-4 font-montserrat text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 border border-[#E8E2D7] hover:border-[#1F1F1F] shadow-sm hover:scale-105 active:scale-95 text-center cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>{config.buttons.secondary.text}</span>
                </button>
              )}

              {config.buttons.thirdLink.enabled && (
                <button
                  onClick={handleThirdLink}
                  className="w-full sm:w-auto text-[#1F1F1F] hover:text-[#C8A24A] text-xs font-montserrat uppercase tracking-wider font-semibold underline underline-offset-4 py-2 flex items-center justify-center gap-1.5 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
                >
                  {renderDynamicIcon(config.buttons.thirdLink.iconName, "w-3.5 h-3.5 text-[#C8A24A]")}
                  <span>{config.buttons.thirdLink.text}</span>
                </button>
              )}
            </motion.div>

            {/* Statistics Bar */}
            {config.statistics.some(s => s.enabled) && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="pt-8 border-t border-[#E8E2D7]/80 grid grid-cols-3 gap-4 text-center lg:text-left"
              >
                {config.statistics.filter(s => s.enabled).map((stat) => (
                  <div key={stat.id}>
                    <span
                      style={{ color: stat.color || '#1F1F1F' }}
                      className="block font-cormorant text-2xl sm:text-3xl font-bold"
                    >
                      {stat.number}{stat.suffix}
                    </span>
                    <span className="text-[10px] font-montserrat uppercase text-[#666666] tracking-wider">
                      {stat.title}
                    </span>
                  </div>
                ))}
              </motion.div>
            )}

          </div>

          {/* Right Column: High-End Perfume Bottle Showcase Card */}
          {config.productCard.enabled && (
            <div className="lg:col-span-5 relative flex justify-center">
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full max-w-md aspect-[4/5] rounded-2xl overflow-hidden border border-[#C8A24A]/30 shadow-2xl bg-[#1A1816] group transition-all duration-500 hover:border-[#C8A24A]/60 hover:shadow-[0_20px_50px_rgba(200,162,74,0.2)]"
              >
                <motion.img
                  initial={{ opacity: 0, scale: 0.82 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  src={config.productCard.imageUrl || heroPerfume.image}
                  alt={config.productCard.altText || heroPerfume.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-all duration-700 brightness-[1.02] contrast-[1.04]"
                />

                {/* Badge Chip */}
                {config.productCard.badgeEnabled && config.productCard.badgeText && (
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#E8E2D7] text-[11px] font-montserrat uppercase text-[#1F1F1F] tracking-wider shadow-sm animate-float-slow">
                    {config.productCard.badgeText}
                  </div>
                )}

                {/* Floating Mini Overlay */}
                <div className="absolute bottom-20 right-4 bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-[#E8E2D7] text-left shadow-md">
                  <span className="block text-[9px] font-montserrat uppercase text-[#666666] tracking-widest">
                    {config.productCard.category || 'Extrait De Parfum'}
                  </span>
                  <span className="font-cormorant text-lg font-bold text-[#1F1F1F]">
                    {config.productCard.productName || heroPerfume.name}
                  </span>
                  <span className="block text-xs font-semibold text-[#C8A24A]">
                    ₹{config.productCard.price}{' '}
                    {config.productCard.oldPrice && (
                      <span className="line-through text-gray-400 font-normal text-[11px]">
                        ₹{config.productCard.oldPrice}
                      </span>
                    )}
                  </span>
                </div>

                {/* Bottom Card Overlay Summary */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-6 text-white flex items-end justify-between">
                  <div>
                    <span className="text-[10px] font-montserrat tracking-[0.2em] uppercase text-[#D8B36A]">
                      {config.productCard.collectionName || 'Signature Collection'}
                    </span>
                    <h3 className="font-cormorant text-xl font-medium tracking-wide">
                      {config.productCard.description || heroPerfume.tagline}
                    </h3>
                  </div>
                  <button
                    onClick={handlePrimaryShop}
                    className="bg-[#C8A24A] text-[#1F1F1F] text-xs font-montserrat uppercase tracking-wider font-bold px-3 py-1.5 rounded-full hover:bg-white transition-colors cursor-pointer shrink-0 ml-2"
                  >
                    {config.productCard.buttonText || 'Buy Now'}
                  </button>
                </div>
              </motion.div>

            </div>
          )}

        </div>
      </div>
    </section>
  );
};
