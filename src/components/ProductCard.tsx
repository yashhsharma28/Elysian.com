import React, { useState } from 'react';
import { Eye, Heart, ShoppingBag, Star, Sparkles, Scale, Check } from 'lucide-react';
import { PerfumeProduct } from '../types';
import { AnimatedImage } from './AnimatedSection';

interface ProductCardProps {
  product: PerfumeProduct;
  isInWishlist: boolean;
  isInCompare: boolean;
  onQuickView: (product: PerfumeProduct) => void;
  onToggleWishlist: (product: PerfumeProduct) => void;
  onToggleCompare: (product: PerfumeProduct) => void;
  onAddToCart: (product: PerfumeProduct, selectedSize: string, price: number) => void;
  onSelectProduct: (product: PerfumeProduct) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isInWishlist,
  isInCompare,
  onQuickView,
  onToggleWishlist,
  onToggleCompare,
  onAddToCart,
  onSelectProduct
}) => {
  const [selectedSizeIndex, setSelectedSizeIndex] = useState<number>(
    product.volumeOptions.length > 1 ? 1 : 0 // Default to middle size e.g. 50ml or 100ml
  );
  const [isHovered, setIsHovered] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const activeOption = product.volumeOptions[selectedSizeIndex] || product.volumeOptions[0];

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, activeOption.size, activeOption.price);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelectProduct(product)}
      className="bg-white border border-[#E8E2D7] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between group cursor-pointer relative"
    >
      {/* Top Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
        {product.badge && (
          <span className="bg-[#1F1F1F] text-[#C8A24A] text-[10px] font-montserrat uppercase tracking-widest font-bold px-2.5 py-1 rounded-sm border border-[#C8A24A]/40 shadow-sm">
            {product.badge}
          </span>
        )}
        <span className="bg-[#F4F1EA] text-[#1F1F1F] text-[9px] font-montserrat uppercase tracking-wider font-semibold px-2 py-0.5 rounded text-gray-700">
          {product.gender}
        </span>
      </div>

      {/* Action Buttons (Wishlist & Compare) */}
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`p-2 rounded-full backdrop-blur-md border transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer ${
            isInWishlist
              ? 'bg-[#C8A24A] text-[#1F1F1F] border-[#C8A24A]'
              : 'bg-white/90 text-[#1F1F1F] hover:text-[#C8A24A] border-[#E8E2D7]'
          }`}
          title={isInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart size={16} fill={isInWishlist ? 'currentColor' : 'none'} />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleCompare(product);
          }}
          className={`p-2 rounded-full backdrop-blur-md border transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer ${
            isInCompare
              ? 'bg-[#1F1F1F] text-[#C8A24A] border-[#1F1F1F]'
              : 'bg-white/90 text-[#1F1F1F] hover:text-[#C8A24A] border-[#E8E2D7]'
          }`}
          title="Compare Fragrances"
        >
          <Scale size={16} />
        </button>
      </div>

      {/* Image Container */}
      <div className="relative aspect-[4/5] bg-[#F8F6F2] overflow-hidden">
        <AnimatedImage
          src={isHovered && product.gallery[1] ? product.gallery[1] : product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          initialScale={0.84}
          className="w-full h-full object-cover object-center transform group-hover:scale-108 transition-transform duration-700 ease-out"
        />

        {/* Quick View Floating Overlay */}
        <div className="absolute inset-x-0 bottom-3 px-4 transition-opacity duration-300 opacity-0 group-hover:opacity-100 flex justify-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="w-full bg-[#1F1F1F]/90 hover:bg-[#C8A24A] text-[#C8A24A] hover:text-[#1F1F1F] py-2 rounded-lg text-xs font-montserrat uppercase tracking-wider font-semibold backdrop-blur-md border border-[#C8A24A]/30 flex items-center justify-center gap-1.5 shadow-md transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Eye size={14} />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Card Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        
        {/* Rating & Collection */}
        <div className="flex items-center justify-between text-xs">
          <span className="text-[10px] font-montserrat uppercase tracking-widest text-[#666666]">
            {product.collection}
          </span>
          <div className="flex items-center gap-1 text-[#C8A24A]">
            <Star size={13} fill="currentColor" />
            <span className="font-montserrat font-bold text-[#1F1F1F] text-xs">
              {product.rating}
            </span>
            <span className="text-gray-400 text-[11px]">({product.reviewsCount})</span>
          </div>
        </div>

        {/* Title & Notes */}
        <div>
          <h3 className="font-cormorant text-xl font-bold text-[#1F1F1F] group-hover:text-[#C8A24A] transition-colors leading-tight">
            {product.name}
          </h3>
          <p className="text-xs font-inter text-[#666666] line-clamp-1 mt-0.5">
            {product.tagline}
          </p>
        </div>

        {/* Key Notes Accord Chips */}
        <div className="flex flex-wrap gap-1 pt-1">
          {product.topNotes.slice(0, 2).map((note, idx) => (
            <span
              key={idx}
              className="text-[10px] font-inter bg-[#F4F1EA] text-[#1F1F1F] px-2 py-0.5 rounded border border-[#E8E2D7]"
            >
              {note}
            </span>
          ))}
        </div>

        {/* Volume Size Options Switcher */}
        {product.volumeOptions.length > 0 && (
          <div className="pt-2 flex items-center gap-1.5">
            <span className="text-[10px] font-montserrat uppercase text-gray-500 mr-1">Size:</span>
            {product.volumeOptions.map((opt, idx) => (
              <button
                key={opt.size}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedSizeIndex(idx);
                }}
                className={`px-2 py-0.5 text-[11px] font-montserrat font-semibold rounded transition-all border ${
                  selectedSizeIndex === idx
                    ? 'bg-[#1F1F1F] text-[#C8A24A] border-[#1F1F1F]'
                    : 'bg-white text-gray-600 border-[#E8E2D7] hover:border-[#C8A24A]'
                }`}
              >
                {opt.size}
              </button>
            ))}
          </div>
        )}

        {/* Pricing & Add to Cart Footer */}
        <div className="pt-3 border-t border-[#E8E2D7] flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-cormorant text-2xl font-bold text-[#1F1F1F]">
                ₹{activeOption.price}
              </span>
              {activeOption.originalPrice && (
                <span className="text-xs font-inter text-gray-400 line-through">
                  ₹{activeOption.originalPrice}
                </span>
              )}
            </div>
            <span className="block text-[9px] font-montserrat text-[#C8A24A] uppercase tracking-wider font-semibold">
              Free Express Delivery
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            className={`px-3.5 py-2 rounded-lg font-montserrat text-xs uppercase tracking-wider font-semibold transition-all duration-300 flex items-center gap-1.5 shadow-sm hover:scale-105 active:scale-95 cursor-pointer ${
              addedAnimation
                ? 'bg-emerald-600 text-white'
                : 'bg-[#C8A24A] hover:bg-[#1F1F1F] text-[#1F1F1F] hover:text-[#C8A24A]'
            }`}
          >
            {addedAnimation ? (
              <>
                <Check size={14} />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag size={14} />
                <span>Add</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
