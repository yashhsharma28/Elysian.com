import React, { useState, useMemo } from 'react';
import { Filter, SlidersHorizontal, Search, Sparkles } from 'lucide-react';
import { CollectionCategory, Gender, PerfumeProduct } from '../types';
import { ProductCard } from './ProductCard';
import { AnimatedSection, AnimatedStaggerContainer, AnimatedStaggerItem } from './AnimatedSection';

interface ProductGridProps {
  products: PerfumeProduct[];
  wishlist: PerfumeProduct[];
  compareList: PerfumeProduct[];
  onQuickView: (product: PerfumeProduct) => void;
  onToggleWishlist: (product: PerfumeProduct) => void;
  onToggleCompare: (product: PerfumeProduct) => void;
  onAddToCart: (product: PerfumeProduct, selectedSize: string, price: number) => void;
  onSelectProduct: (product: PerfumeProduct) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  wishlist,
  compareList,
  onQuickView,
  onToggleWishlist,
  onToggleCompare,
  onAddToCart,
  onSelectProduct,
  selectedCategory,
  setSelectedCategory
}) => {
  const [selectedGender, setSelectedGender] = useState<Gender | 'All'>('All');
  const [selectedNote, setSelectedNote] = useState<string>('All');
  const [selectedMood, setSelectedMood] = useState<string>('All');
  const [maxPriceFilter, setMaxPriceFilter] = useState<number>(999);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');

  const categories = ['All', 'Signature', 'Best Sellers', 'Gift Sets', 'Travel Kits'];
  const genders = ['All', 'Unisex', 'Men', 'Women'];
  const notesList = ['All', 'Oud', 'Sandalwood', 'Rose', 'Saffron', 'Amber', 'Vanilla', 'Bergamot'];
  const moodList = ['All', 'Power', 'Luxury', 'Romance', 'Mystery', 'Adventure', 'Freshness', 'Elegance', 'Royalty', 'Confidence', 'Freedom', 'Calm', 'Boldness', 'Energy', 'Success'];

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (selectedCategory !== 'All' && p.collection !== selectedCategory) {
          return false;
        }
        // Gender filter
        if (selectedGender !== 'All' && p.gender !== selectedGender) {
          return false;
        }
        // Mood filter
        if (selectedMood !== 'All' && p.mood && p.mood.toLowerCase() !== selectedMood.toLowerCase()) {
          return false;
        }
        // Price filter
        if (p.defaultPrice > maxPriceFilter) {
          return false;
        }
        // Note filter
        if (selectedNote !== 'All') {
          const allNotes = [...p.topNotes, ...p.heartNotes, ...p.baseNotes].join(' ').toLowerCase();
          if (!allNotes.includes(selectedNote.toLowerCase())) {
            return false;
          }
        }
        // Search query
        if (searchQuery.trim() !== '') {
          const query = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(query);
          const matchDesc = p.description.toLowerCase().includes(query);
          const matchNotes = [...p.topNotes, ...p.heartNotes, ...p.baseNotes].some((n) =>
            n.toLowerCase().includes(query)
          );
          const matchBottle = p.bottleShape?.toLowerCase().includes(query) || p.packagingBox?.toLowerCase().includes(query);
          const matchAudience = p.targetAudience?.toLowerCase().includes(query) || p.mood?.toLowerCase().includes(query);
          if (!matchName && !matchDesc && !matchNotes && !matchBottle && !matchAudience) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.defaultPrice - b.defaultPrice;
        if (sortBy === 'price-high') return b.defaultPrice - a.defaultPrice;
        if (sortBy === 'rating') return b.rating - a.rating;
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [products, selectedCategory, selectedGender, selectedNote, maxPriceFilter, searchQuery, sortBy]);

  return (
    <section id="section-shop" className="py-16 bg-[#F8F6F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <AnimatedSection className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <span className="text-xs font-montserrat uppercase tracking-[0.3em] text-[#C8A24A]">
            The ELYSIAN Perfumerie
          </span>
          <h2 className="font-cormorant text-4xl sm:text-5xl font-light text-[#1F1F1F]">
            Haute Olfactory Collections
          </h2>
          <p className="font-inter text-sm text-[#666666] font-light">
            Every creation is an Extrait de Parfum crafted with 30% pure botanical oil concentration. Certified under ₹1000.
          </p>
        </AnimatedSection>

        {/* Filter Controls & Search Header */}
        <AnimatedSection delay={0.1} className="bg-white border border-[#E8E2D7] rounded-2xl p-4 sm:p-6 mb-10 shadow-sm space-y-5">
          
          {/* Top Categories Navigation Pills */}
          <div className="flex items-center justify-between flex-wrap gap-3 border-b border-[#E8E2D7] pb-4">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-montserrat uppercase tracking-wider font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? 'bg-[#1F1F1F] text-[#C8A24A] shadow-sm'
                      : 'bg-[#F4F1EA] text-[#1F1F1F] hover:bg-[#EFE8DC]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-montserrat uppercase text-gray-500 hidden sm:inline">Sort:</span>
              <select
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}
                className="bg-[#F4F1EA] border border-[#E8E2D7] text-xs font-montserrat font-semibold text-[#1F1F1F] px-3 py-2 rounded-lg focus:outline-none focus:border-[#C8A24A]"
              >
                <option value="featured">Featured Masterpieces</option>
                <option value="price-low">Price: Low to High (From ₹199)</option>
                <option value="price-high">Price: High to Low (Up to ₹999)</option>
                <option value="rating">Highest Connoisseur Rating</option>
              </select>
            </div>
          </div>

          {/* Secondary Filters Bar */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center">
            
            {/* Search Input */}
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search notes, bottles, mood..."
                className="w-full bg-[#F4F1EA] border border-[#E8E2D7] rounded-lg pl-9 pr-3 py-2 text-xs font-inter text-[#1F1F1F] focus:outline-none focus:border-[#C8A24A]"
              />
            </div>

            {/* Gender Filter */}
            <div className="flex items-center gap-1 overflow-x-auto">
              <span className="text-[10px] font-montserrat uppercase text-gray-500">Gender:</span>
              {genders.map((g) => (
                <button
                  key={g}
                  onClick={() => setSelectedGender(g as any)}
                  className={`px-2 py-1 text-[10px] font-montserrat font-semibold rounded ${
                    selectedGender === g
                      ? 'bg-[#C8A24A] text-[#1F1F1F]'
                      : 'bg-[#F4F1EA] text-gray-600 hover:bg-[#EFE8DC]'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>

            {/* Key Notes Filter */}
            <div className="flex items-center gap-1">
              <span className="text-[10px] font-montserrat uppercase text-gray-500">Note:</span>
              <select
                value={selectedNote}
                onChange={(e) => setSelectedNote(e.target.value)}
                className="w-full bg-[#F4F1EA] border border-[#E8E2D7] text-xs font-inter text-[#1F1F1F] px-2 py-1.5 rounded focus:outline-none"
              >
                {notesList.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>

            {/* Mood Filter */}
            <div className="flex items-center gap-1">
              <span className="text-[10px] font-montserrat uppercase text-gray-500">Mood:</span>
              <select
                value={selectedMood}
                onChange={(e) => setSelectedMood(e.target.value)}
                className="w-full bg-[#F4F1EA] border border-[#E8E2D7] text-xs font-inter text-[#1F1F1F] px-2 py-1.5 rounded focus:outline-none"
              >
                {moodList.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>

            {/* Max Price Range Slider */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-montserrat uppercase text-gray-500 whitespace-nowrap">
                Max: <strong className="text-[#1F1F1F]">₹{maxPriceFilter}</strong>
              </span>
              <input
                type="range"
                min={199}
                max={999}
                step={50}
                value={maxPriceFilter}
                onChange={(e) => setMaxPriceFilter(Number(e.target.value))}
                className="w-full accent-[#C8A24A]"
              />
            </div>

          </div>

        </AnimatedSection>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <AnimatedSection className="text-center py-16 bg-white border border-[#E8E2D7] rounded-2xl p-8 max-w-md mx-auto space-y-4">
            <Sparkles size={32} className="mx-auto text-[#C8A24A]" />
            <h3 className="font-cormorant text-2xl font-bold text-[#1F1F1F]">No Fragrances Found</h3>
            <p className="text-xs font-inter text-gray-500">
              Try broadening your filters or search term to discover our luxury Extrait de Parfum creations.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSelectedGender('All');
                setSelectedNote('All');
                setMaxPriceFilter(999);
                setSearchQuery('');
              }}
              className="bg-[#C8A24A] text-[#1F1F1F] text-xs font-montserrat uppercase font-bold px-6 py-2.5 rounded-full"
            >
              Reset All Filters
            </button>
          </AnimatedSection>
        ) : (
          <AnimatedStaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <AnimatedStaggerItem key={product.id}>
                <ProductCard
                  product={product}
                  isInWishlist={wishlist.some((item) => item.id === product.id)}
                  isInCompare={compareList.some((item) => item.id === product.id)}
                  onQuickView={onQuickView}
                  onToggleWishlist={onToggleWishlist}
                  onToggleCompare={onToggleCompare}
                  onAddToCart={onAddToCart}
                  onSelectProduct={onSelectProduct}
                />
              </AnimatedStaggerItem>
            ))}
          </AnimatedStaggerContainer>
        )}

      </div>
    </section>
  );
};
