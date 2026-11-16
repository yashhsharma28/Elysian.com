import React, { useState } from 'react';
import { ArrowLeft, Star, ShoppingBag, Heart, ShieldCheck, Clock, Sparkles, Check, Share2, ThumbsUp } from 'lucide-react';
import { PerfumeProduct } from '../types';
import { FragrancePyramid } from './FragrancePyramid';
import { ProductCard } from './ProductCard';
import { CUSTOMER_REVIEWS } from '../data/content';
import { AnimatedSection, AnimatedStaggerContainer, AnimatedStaggerItem, AnimatedImage } from './AnimatedSection';

interface ProductDetailViewProps {
  product: PerfumeProduct;
  allProducts: PerfumeProduct[];
  onBack: () => void;
  onAddToCart: (product: PerfumeProduct, selectedSize: string, price: number, quantity: number) => void;
  onToggleWishlist: (product: PerfumeProduct) => void;
  onToggleCompare: (product: PerfumeProduct) => void;
  isInWishlist: boolean;
  isInCompare: boolean;
  onSelectProduct: (product: PerfumeProduct) => void;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({
  product,
  allProducts,
  onBack,
  onAddToCart,
  onToggleWishlist,
  onToggleCompare,
  isInWishlist,
  isInCompare,
  onSelectProduct
}) => {
  const [selectedImage, setSelectedImage] = useState<string>(product.image);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState<number>(
    product.volumeOptions.length > 1 ? 1 : 0
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'pyramid' | 'ingredients' | 'howTo' | 'reviews'>('pyramid');
  const [added, setAdded] = useState(false);

  const activeOption = product.volumeOptions[selectedSizeIndex] || product.volumeOptions[0];

  const handleAddToCart = () => {
    onAddToCart(product, activeOption.size, activeOption.price, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="bg-[#F8F6F2] py-10 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Back Navigation Bar */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-montserrat uppercase tracking-widest text-[#1F1F1F] hover:text-[#C8A24A] font-semibold transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back to Collections</span>
        </button>

        {/* Main Product Hero Grid */}
        <AnimatedSection className="bg-white border border-[#E8E2D7] rounded-3xl p-6 md:p-10 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Gallery Left (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="aspect-[4/5] bg-[#F8F6F2] rounded-2xl overflow-hidden border border-[#E8E2D7] relative group">
              <AnimatedImage
                key={selectedImage}
                src={selectedImage}
                alt={product.name}
                referrerPolicy="no-referrer"
                initialScale={0.84}
                className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
              />
              <span className="absolute top-4 left-4 bg-[#1F1F1F] text-[#C8A24A] text-[10px] font-montserrat uppercase tracking-widest font-bold px-3 py-1 rounded-sm border border-[#C8A24A]/40">
                {product.badge || 'Extrait De Parfum'}
              </span>
            </div>

            {/* Thumbnail Row */}
            <div className="flex gap-3 overflow-x-auto py-1">
              {product.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === img
                      ? 'border-[#C8A24A] ring-2 ring-[#C8A24A]/30'
                      : 'border-[#E8E2D7] hover:border-[#C8A24A]'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Specs Right (7 cols) */}
          <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">
            <div>
              {/* Category Header */}
              <div className="flex items-center justify-between">
                <span className="text-xs font-montserrat uppercase tracking-[0.25em] text-[#C8A24A] font-bold">
                  {product.collection} • {product.gender}
                </span>
                <div className="flex items-center gap-1.5 text-[#C8A24A]">
                  <Star size={16} fill="currentColor" />
                  <span className="font-montserrat font-bold text-[#1F1F1F] text-sm">
                    {product.rating}
                  </span>
                  <span className="text-gray-400 text-xs">({product.reviewsCount} verified reviews)</span>
                </div>
              </div>

              {/* Title */}
              <h1 className="font-cormorant text-4xl sm:text-5xl font-bold text-[#1F1F1F] mt-2">
                {product.name}
              </h1>
              <p className="font-montserrat text-xs uppercase tracking-widest text-[#666666] mt-1">
                {product.subTitle}
              </p>

              {/* Pricing */}
              <div className="mt-4 flex items-baseline gap-4">
                <span className="font-cormorant text-4xl font-bold text-[#1F1F1F]">
                  ₹{activeOption.price}
                </span>
                {activeOption.originalPrice && (
                  <span className="text-lg font-inter text-gray-400 line-through">
                    ₹{activeOption.originalPrice}
                  </span>
                )}
                <span className="bg-emerald-50 text-emerald-700 text-xs font-montserrat uppercase tracking-wider font-bold px-3 py-1 rounded-full border border-emerald-200">
                  Save ₹{(activeOption.originalPrice || activeOption.price) - activeOption.price}
                </span>
              </div>

              {/* Story Excerpt */}
              <p className="text-sm font-inter text-[#666666] leading-relaxed mt-4">
                {product.story}
              </p>

              {/* Flacon Volume Options */}
              <div className="mt-6 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-montserrat uppercase tracking-wider font-bold text-[#1F1F1F]">
                    Choose Bottle Size:
                  </label>
                  <span className="text-[11px] font-inter text-gray-500">All Prices Guaranteed Below ₹1000</span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {product.volumeOptions.map((opt, idx) => (
                    <button
                      key={opt.size}
                      onClick={() => setSelectedSizeIndex(idx)}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        selectedSizeIndex === idx
                          ? 'bg-[#1F1F1F] text-[#C8A24A] border-[#1F1F1F] shadow-md'
                          : 'bg-[#F4F1EA] text-[#1F1F1F] border-[#E8E2D7] hover:border-[#C8A24A]'
                      }`}
                    >
                      <span className="block text-xs font-montserrat font-bold">{opt.size}</span>
                      <span className="block text-xs font-inter font-semibold mt-0.5">₹{opt.price}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Longevity & Sillage Spec Box */}
              <div className="mt-6 grid grid-cols-2 gap-4 bg-[#F4F1EA] border border-[#E8E2D7] rounded-xl p-4">
                <div>
                  <span className="text-[10px] font-montserrat uppercase text-gray-500 block">Longevity On Skin</span>
                  <span className="font-cormorant text-lg font-bold text-[#1F1F1F]">{product.longevity}</span>
                </div>
                <div>
                  <span className="text-[10px] font-montserrat uppercase text-gray-500 block">Sillage Aura</span>
                  <span className="font-cormorant text-lg font-bold text-[#1F1F1F]">{product.sillage}</span>
                </div>
              </div>

              {/* Bespoke Luxury Architecture Specs */}
              <div className="mt-6 bg-[#1F1F1F] text-white rounded-2xl p-5 space-y-3 border border-[#C8A24A]/30">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="text-xs font-montserrat uppercase tracking-widest text-[#C8A24A] font-bold">
                    Unique Flacon & Box Architecture
                  </span>
                  <span className="text-[10px] font-montserrat text-gray-400 uppercase font-semibold">Bespoke Design</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="text-[9px] font-montserrat text-gray-400 uppercase block">Bottle Shape</span>
                    <strong className="text-white font-inter text-[11px] block">{product.bottleShape || 'Custom Luxury Flacon'}</strong>
                  </div>
                  <div>
                    <span className="text-[9px] font-montserrat text-gray-400 uppercase block">Bottle Finish</span>
                    <strong className="text-white font-inter text-[11px] block">{product.bottleColor || 'Imperial Glass'}</strong>
                  </div>
                  <div>
                    <span className="text-[9px] font-montserrat text-gray-400 uppercase block">Cap Stopper</span>
                    <strong className="text-white font-inter text-[11px] block">{product.bottleCap || 'Gold Monogram Crown'}</strong>
                  </div>
                  <div>
                    <span className="text-[9px] font-montserrat text-gray-400 uppercase block">Coffret Packaging</span>
                    <strong className="text-white font-inter text-[11px] block">{product.packagingBox || 'Magnetic Velvet Box'}</strong>
                  </div>
                  <div>
                    <span className="text-[9px] font-montserrat text-gray-400 uppercase block">Labeling</span>
                    <strong className="text-white font-inter text-[11px] block">{product.labelDesign || '24K Embossed Plaque'}</strong>
                  </div>
                  <div>
                    <span className="text-[9px] font-montserrat text-gray-400 uppercase block">Target Audience</span>
                    <strong className="text-white font-inter text-[11px] block">{product.targetAudience || 'Connoisseurs & VIP'}</strong>
                  </div>
                  <div>
                    <span className="text-[9px] font-montserrat text-gray-400 uppercase block">Essence Mood</span>
                    <strong className="text-[#C8A24A] font-inter text-[11px] block">{product.mood || 'Power & Royalty'}</strong>
                  </div>
                  <div>
                    <span className="text-[9px] font-montserrat text-gray-400 uppercase block">Occasion & Season</span>
                    <strong className="text-white font-inter text-[11px] block">{product.occasion || 'Evening Gala'} ({product.season || 'Winter'})</strong>
                  </div>
                  <div>
                    <span className="text-[9px] font-montserrat text-gray-400 uppercase block">Time of Day</span>
                    <strong className="text-white font-inter text-[11px] block">{product.timeOfDay || 'Midnight'}</strong>
                  </div>
                </div>

                {product.marketingAngle && (
                  <p className="text-[11px] font-inter italic text-[#C8A24A]/90 pt-2 border-t border-white/10">
                    "{product.marketingAngle}"
                  </p>
                )}
              </div>

            </div>

            {/* Actions Bar */}
            <div className="pt-6 border-t border-[#E8E2D7] space-y-4">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                {/* Quantity */}
                <div className="flex items-center border border-[#E8E2D7] rounded-full bg-[#F4F1EA] px-3 py-1.5">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-base font-bold text-[#1F1F1F] px-2"
                  >
                    -
                  </button>
                  <span className="font-montserrat text-xs font-bold px-3">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-base font-bold text-[#1F1F1F] px-2"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 w-full py-4 rounded-full font-montserrat text-xs uppercase tracking-[0.2em] font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:scale-105 active:scale-95 cursor-pointer ${
                    added
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#C8A24A] hover:bg-[#1F1F1F] text-[#1F1F1F] hover:text-[#C8A24A]'
                  }`}
                >
                  {added ? <Check size={18} /> : <ShoppingBag size={18} />}
                  <span>{added ? 'Added to Bag' : `Add to Bag • ₹${activeOption.price * quantity}`}</span>
                </button>

                {/* Wishlist Button */}
                <button
                  onClick={() => onToggleWishlist(product)}
                  className={`p-4 rounded-full border transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer ${
                    isInWishlist
                      ? 'bg-[#C8A24A] text-[#1F1F1F] border-[#C8A24A]'
                      : 'bg-white text-[#1F1F1F] hover:text-[#C8A24A] border-[#E8E2D7]'
                  }`}
                >
                  <Heart size={18} fill={isInWishlist ? 'currentColor' : 'none'} />
                </button>
              </div>

              {/* Guarantees */}
              <div className="flex items-center justify-between text-[11px] font-inter text-gray-500 pt-2">
                <span className="flex items-center gap-1">
                  <ShieldCheck size={14} className="text-[#C8A24A]" />
                  100% Authentic Extrait
                </span>
                <span>•</span>
                <span>Free Shipping Above ₹499</span>
                <span>•</span>
                <span>3-7 Days Delivery Across India</span>
              </div>
            </div>

          </div>

        </AnimatedSection>

        {/* Tabbed In-Depth Information */}
        <AnimatedSection className="bg-white border border-[#E8E2D7] rounded-3xl p-6 md:p-10 shadow-sm space-y-8">
          <div className="flex items-center gap-6 border-b border-[#E8E2D7] overflow-x-auto no-scrollbar pb-2">
            {[
              { id: 'pyramid', label: 'Olfactory Pyramid' },
              { id: 'ingredients', label: 'Artisanal Ingredients' },
              { id: 'howTo', label: 'How to Apply & Layer' },
              { id: 'reviews', label: `Reviews (${product.reviewsCount})` }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`text-xs font-montserrat uppercase tracking-[0.18em] font-bold py-2 border-b-2 transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-[#C8A24A] text-[#C8A24A]'
                    : 'border-transparent text-gray-500 hover:text-[#1F1F1F]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'pyramid' && <FragrancePyramid product={product} />}

          {activeTab === 'ingredients' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#F4F1EA] border border-[#E8E2D7] p-5 rounded-2xl space-y-2">
                <span className="text-[10px] font-montserrat uppercase text-[#C8A24A] font-bold">Top Accord</span>
                <h4 className="font-cormorant text-xl font-bold text-[#1F1F1F]">{product.topNotes[0]}</h4>
                <p className="text-xs font-inter text-gray-600">Sourced directly for crisp, sparkling volatile initial aura.</p>
              </div>
              <div className="bg-[#F4F1EA] border border-[#E8E2D7] p-5 rounded-2xl space-y-2">
                <span className="text-[10px] font-montserrat uppercase text-[#C8A24A] font-bold">Heart Accord</span>
                <h4 className="font-cormorant text-xl font-bold text-[#1F1F1F]">{product.heartNotes[0]}</h4>
                <p className="text-xs font-inter text-gray-600">Pure botanical oil distillation providing deep signature heart notes.</p>
              </div>
              <div className="bg-[#F4F1EA] border border-[#E8E2D7] p-5 rounded-2xl space-y-2">
                <span className="text-[10px] font-montserrat uppercase text-[#C8A24A] font-bold">Base Accord</span>
                <h4 className="font-cormorant text-xl font-bold text-[#1F1F1F]">{product.baseNotes[0]}</h4>
                <p className="text-xs font-inter text-gray-600">Heavy resinous fixative ensuring 14+ hour lingering projection on pulse points.</p>
              </div>
            </div>
          )}

          {activeTab === 'howTo' && (
            <div className="space-y-4 text-xs font-inter text-[#666666] leading-relaxed max-w-3xl">
              <h3 className="font-cormorant text-2xl font-bold text-[#1F1F1F]">
                Extrait Application Masterclass
              </h3>
              <p>
                Because ELYSIAN is formulated at 30% pure fragrance oil, a light mist is all that is required for a full day of enthralling sillage.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Pulse Points:</strong> Spray twice onto warm pulse points — behind ears, wrists, and collarbones.</li>
                <li><strong>Clothing Projection:</strong> Mist gently from 6 inches away onto cotton or wool jackets for 24-hour retention.</li>
                <li><strong>Do Not Rub:</strong> Never rub wrists together after applying — this breaks the volatile top-note molecules prematurely.</li>
              </ul>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6">
              {CUSTOMER_REVIEWS.map((rev) => (
                <div key={rev.id} className="bg-[#F4F1EA] border border-[#E8E2D7] rounded-xl p-5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-cormorant font-bold text-base text-[#1F1F1F]">{rev.author}</span>
                    <span className="text-[10px] font-montserrat text-gray-400">{rev.date}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[#C8A24A]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} fill="currentColor" />
                    ))}
                    <span className="text-xs font-bold text-[#1F1F1F] ml-2">{rev.title}</span>
                  </div>
                  <p className="text-xs font-inter text-[#666666]">{rev.comment}</p>
                </div>
              ))}
            </div>
          )}
        </AnimatedSection>

        {/* Related Products Slider / Grid */}
        <div className="space-y-6">
          <AnimatedSection className="text-center space-y-2">
            <span className="text-xs font-montserrat uppercase tracking-[0.3em] text-[#C8A24A]">
              Complete Your Wardrobe
            </span>
            <h3 className="font-cormorant text-3xl font-light text-[#1F1F1F]">
              Complementary Creations
            </h3>
          </AnimatedSection>

          <AnimatedStaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <AnimatedStaggerItem key={p.id}>
                <ProductCard
                  product={p}
                  isInWishlist={isInWishlist}
                  isInCompare={isInCompare}
                  onQuickView={() => {}}
                  onToggleWishlist={onToggleWishlist}
                  onToggleCompare={onToggleCompare}
                  onAddToCart={(prod, sz, prc) => onAddToCart(prod, sz, prc, 1)}
                  onSelectProduct={onSelectProduct}
                />
              </AnimatedStaggerItem>
            ))}
          </AnimatedStaggerContainer>
        </div>

      </div>
    </div>
  );
};
