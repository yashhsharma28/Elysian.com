import React, { useState } from 'react';
import { X, Search, Sparkles } from 'lucide-react';
import { PerfumeProduct } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: PerfumeProduct[];
  onSelectProduct: (product: PerfumeProduct) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct
}) => {
  if (!isOpen) return null;

  const [query, setQuery] = useState('');

  const searchResults = query.trim() === ''
    ? []
    : products.filter((p) => {
        const q = query.toLowerCase();
        const matchName = p.name.toLowerCase().includes(q);
        const matchNotes = [...p.topNotes, ...p.heartNotes, ...p.baseNotes].some((n) =>
          n.toLowerCase().includes(q)
        );
        return matchName || matchNotes;
      });

  const popularSearches = ['Oud Imperiale', 'Santal Blanc', 'Rose', 'Saffron', 'Travel Kit', 'Gift Box'];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
      <div className="bg-white border border-[#E8E2D7] rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-6 relative">
        
        {/* Search Bar */}
        <div className="relative">
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C8A24A]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            placeholder="Search by fragrance name, note (e.g. Oud, Rose, Amber) or collection..."
            className="w-full bg-[#F4F1EA] border border-[#E8E2D7] rounded-full pl-12 pr-12 py-3.5 text-sm font-inter text-[#1F1F1F] focus:outline-none focus:border-[#C8A24A]"
          />
          <button onClick={onClose} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1F1F1F]">
            <X size={20} />
          </button>
        </div>

        {/* Popular Tags */}
        {query.trim() === '' && (
          <div className="space-y-2">
            <span className="text-[10px] font-montserrat uppercase tracking-wider text-gray-400 font-bold block">
              Popular Searches:
            </span>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="px-3 py-1 bg-[#F4F1EA] hover:bg-[#EFE8DC] text-[#1F1F1F] rounded-full text-xs font-inter transition-colors border border-[#E8E2D7]"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results List */}
        {searchResults.length > 0 && (
          <div className="max-h-80 overflow-y-auto space-y-3 pt-2 border-t border-[#E8E2D7]">
            {searchResults.map((p) => (
              <div
                key={p.id}
                onClick={() => {
                  onSelectProduct(p);
                  onClose();
                }}
                className="bg-[#F8F6F2] hover:bg-[#F4F1EA] border border-[#E8E2D7] rounded-xl p-3 flex gap-3 items-center cursor-pointer transition-colors"
              >
                <img src={p.image} alt={p.name} className="w-12 h-12 object-cover rounded-lg" referrerPolicy="no-referrer" />
                <div className="flex-1 min-w-0">
                  <span className="text-[9px] font-montserrat uppercase text-[#C8A24A] font-bold block">
                    {p.gender} • {p.collection}
                  </span>
                  <h4 className="font-cormorant font-bold text-base text-[#1F1F1F] truncate">{p.name}</h4>
                  <span className="text-xs font-inter text-gray-500">{p.topNotes.join(', ')}</span>
                </div>
                <span className="font-cormorant font-bold text-base text-[#1F1F1F]">₹{p.defaultPrice}</span>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
