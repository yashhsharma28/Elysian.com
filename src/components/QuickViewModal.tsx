import React, { useState } from 'react';
import { X, Star, ShoppingBag, Heart, ShieldCheck, Truck, RotateCw, Check } from 'lucide-react';
import { PerfumeProduct } from '../types';
import { AnimatedImage } from './AnimatedSection';

interface QuickViewModalProps {
  product: PerfumeProduct | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: PerfumeProduct, selectedSize: string, price: number, quantity: number) => void;
  onToggleWishlist: (product: PerfumeProduct) => void;
  isInWishlist: boolean;
  onSelectFullDetails: (product: PerfumeProduct) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isInWishlist,
  onSelectFullDetails
}) => {
  if (!isOpen || !product) return null;

  const [selectedImage, setSelectedImage] = useState<string>(product.image);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState<number>(
    product.volumeOptions.length > 1 ? 1 : 0
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [is360Active, setIs360Active] = useState<boolean>(false);
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [added, setAdded] = useState(false);

  const activeOption = product.volumeOptions[selectedSizeIndex] || product.volumeOptions[0];

  const handleAddToCart = () => {
    onAddToCart(product, activeOption.size, activeOption.price, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1200);
  };

  const toggle360 = () => {
    setIs360Active(!is360Active);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fadeIn">
      <div className="bg-white border border-[#E8E2D7] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-[#F4F1EA] hover:bg-[#1F1F1F] text-[#1F1F1F] hover:text-[#C8A24A] rounded-full transition-colors"
        >
          <X size={20} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-8">
          
          {/* Left Column: Image & 360 Spin Viewer */}
          <div className="space-y-4">
            <div className="relative aspect-[4/5] bg-[#F8F6F2] rounded-xl overflow-hidden border border-[#E8E2D7] group">
              <AnimatedImage
                key={selectedImage}
                src={selectedImage}
                alt={product.name}
                referrerPolicy="no-referrer"
                initialScale={0.84}
                style={{
                  transform: is360Active ? `rotateY(${rotationAngle}deg)` : undefined,
                  transition: is360Active ? 'transform 0.1s linear' : undefined
                }}
                className="w-full h-full object-cover object-center"
              />

              {/* 360 Spin Controls Overlay */}
              {is360Active && (
                <div className="absolute inset-x-0 bottom-4 px-4 flex items-center justify-between bg-black/40 backdrop-blur-md py-2 rounded-lg text-white text-xs">
                  <span>360° Interactive Rotation</span>
                  <input
                    type="range"
                    min={-180}
                    max={180}
                    value={rotationAngle}
                    onChange={(e) => setRotationAngle(Number(e.target.value))}
                    className="accent-[#C8A24A]"
                  />
                </div>
              )}

              {/* 360 Toggle Button */}
              <button
                onClick={toggle360}
                className={`absolute top-3 left-3 p-2 rounded-full backdrop-blur-md text-xs font-montserrat uppercase tracking-wider font-semibold flex items-center gap-1 border ${
                  is360Active
                    ? 'bg-[#C8A24A] text-[#1F1F1F] border-[#C8A24A]'
                    : 'bg-white/90 text-[#1F1F1F] border-[#E8E2D7]'
                }`}
              >
                <RotateCw size={14} className={is360Active ? 'animate-spin' : ''} />
                <span>360° View</span>
              </button>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2 overflow-x-auto">
              {product.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedImage(img);
                    setIs360Active(false);
                  }}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === img && !is360Active
                      ? 'border-[#C8A24A] ring-1 ring-[#C8A24A]'
                      : 'border-[#E8E2D7]'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Details & Volume Options */}
          <div className="space-y-5 flex flex-col justify-between">
            <div>
              {/* Badge & Category */}
              <div className="flex items-center justify-between text-xs">
                <span className="text-[10px] font-montserrat uppercase tracking-widest text-[#C8A24A] font-bold">
                  {product.collection} • {product.gender}
                </span>
                <div className="flex items-center gap-1 text-[#C8A24A]">
                  <Star size={14} fill="currentColor" />
                  <span className="font-montserrat font-bold text-[#1F1F1F] text-xs">
                    {product.rating}
                  </span>
                  <span className="text-gray-400 text-xs">({product.reviewsCount} reviews)</span>
                </div>
              </div>

              {/* Title */}
              <h2 className="font-cormorant text-3xl font-bold text-[#1F1F1F] mt-1">
                {product.name}
              </h2>
              <p className="text-xs font-montserrat uppercase tracking-widest text-gray-500 mt-0.5">
                {product.subTitle}
              </p>

              {/* Price */}
              <div className="mt-3 flex items-baseline gap-3">
                <span className="font-cormorant text-3xl font-bold text-[#1F1F1F]">
                  ₹{activeOption.price}
                </span>
                {activeOption.originalPrice && (
                  <span className="text-sm font-inter text-gray-400 line-through">
                    ₹{activeOption.originalPrice}
                  </span>
                )}
                <span className="bg-[#F4F1EA] text-[#C8A24A] text-[10px] font-montserrat uppercase tracking-wider font-bold px-2.5 py-0.5 rounded border border-[#E8E2D7]">
                  Extrait De Parfum
                </span>
              </div>

              {/* Description */}
              <p className="text-xs font-inter text-[#666666] leading-relaxed mt-3">
                {product.description}
              </p>

              {/* Top Notes Chips */}
              <div className="mt-4">
                <span className="text-[10px] font-montserrat uppercase text-gray-500 block mb-1">Key Accords:</span>
                <div className="flex flex-wrap gap-1.5">
                  {product.topNotes.map((note, i) => (
                    <span key={i} className="text-[11px] font-inter bg-[#F4F1EA] text-[#1F1F1F] px-2.5 py-1 rounded border border-[#E8E2D7]">
                      {note}
                    </span>
                  ))}
                </div>
              </div>

              {/* Unique Bottle & Box Specs */}
              <div className="mt-4 bg-[#F4F1EA] border border-[#E8E2D7] rounded-xl p-3 grid grid-cols-3 gap-2 text-center text-xs">
                <div>
                  <span className="text-[9px] font-montserrat uppercase text-gray-500 block">Flacon Shape</span>
                  <strong className="text-[#1F1F1F] font-inter text-[11px] font-semibold block truncate">{product.bottleShape || 'Custom Glass'}</strong>
                </div>
                <div>
                  <span className="text-[9px] font-montserrat uppercase text-gray-500 block">Packaging</span>
                  <strong className="text-[#1F1F1F] font-inter text-[11px] font-semibold block truncate">{product.packagingBox || 'Magnetic Box'}</strong>
                </div>
                <div>
                  <span className="text-[9px] font-montserrat uppercase text-gray-500 block">Mood & Vibe</span>
                  <strong className="text-[#C8A24A] font-inter text-[11px] font-semibold block truncate">{product.mood || 'Luxury'}</strong>
                </div>
              </div>

              {/* Volume Options Selection */}
              <div className="mt-5 space-y-2">
                <label className="text-xs font-montserrat uppercase tracking-wider font-bold text-[#1F1F1F] block">
                  Select Bottle Flacon:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {product.volumeOptions.map((opt, idx) => (
                    <button
                      key={opt.size}
                      onClick={() => setSelectedSizeIndex(idx)}
                      className={`p-2.5 rounded-lg border text-center transition-all ${
                        selectedSizeIndex === idx
                          ? 'bg-[#1F1F1F] text-[#C8A24A] border-[#1F1F1F] shadow-sm'
                          : 'bg-white text-[#1F1F1F] border-[#E8E2D7] hover:border-[#C8A24A]'
                      }`}
                    >
                      <span className="block text-xs font-montserrat font-bold">{opt.size}</span>
                      <span className="block text-[11px] font-inter text-gray-400">₹{opt.price}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Counter */}
              <div className="mt-5 flex items-center gap-4">
                <span className="text-xs font-montserrat uppercase font-bold text-[#1F1F1F]">
                  Quantity:
                </span>
                <div className="flex items-center border border-[#E8E2D7] rounded-lg bg-[#F4F1EA]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 text-sm font-bold text-[#1F1F1F] hover:text-[#C8A24A]"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 text-xs font-montserrat font-bold text-[#1F1F1F]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1 text-sm font-bold text-[#1F1F1F] hover:text-[#C8A24A]"
                  >
                    +
                  </button>
                </div>
              </div>

            </div>

            {/* Bottom Actions */}
            <div className="space-y-3 pt-4 border-t border-[#E8E2D7]">
              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-3.5 rounded-full font-montserrat text-xs uppercase tracking-[0.15em] font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:scale-105 active:scale-95 cursor-pointer ${
                    added
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#C8A24A] hover:bg-[#1F1F1F] text-[#1F1F1F] hover:text-[#C8A24A]'
                  }`}
                >
                  {added ? <Check size={16} /> : <ShoppingBag size={16} />}
                  <span>{added ? 'Added to Bag' : `Add to Bag • ₹${activeOption.price * quantity}`}</span>
                </button>

                <button
                  onClick={() => onToggleWishlist(product)}
                  className={`p-3.5 rounded-full border transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer ${
                    isInWishlist
                      ? 'bg-[#C8A24A] text-[#1F1F1F] border-[#C8A24A]'
                      : 'bg-white text-[#1F1F1F] hover:text-[#C8A24A] border-[#E8E2D7]'
                  }`}
                >
                  <Heart size={18} fill={isInWishlist ? 'currentColor' : 'none'} />
                </button>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onSelectFullDetails(product);
                }}
                className="w-full text-center text-xs font-montserrat uppercase tracking-wider text-[#666666] hover:text-[#C8A24A] underline py-1 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
              >
                View Full Olfactory Architecture & Reviews →
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
