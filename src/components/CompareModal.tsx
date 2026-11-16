import React from 'react';
import { X, ShoppingBag, Trash2, Scale } from 'lucide-react';
import { PerfumeProduct } from '../types';

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  compareList: PerfumeProduct[];
  onRemoveFromCompare: (product: PerfumeProduct) => void;
  onAddToCart: (product: PerfumeProduct, selectedSize: string, price: number) => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  isOpen,
  onClose,
  compareList,
  onRemoveFromCompare,
  onAddToCart
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
      <div className="bg-white border border-[#E8E2D7] rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
        
        {/* Header */}
        <div className="bg-[#1F1F1F] text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Scale size={20} className="text-[#C8A24A]" />
            <h3 className="font-cormorant text-2xl font-bold">
              Compare Fragrance Architectures
            </h3>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          {compareList.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <Scale size={36} className="mx-auto text-gray-300" />
              <h4 className="font-cormorant text-2xl font-bold text-[#1F1F1F]">No Fragrances Selected For Comparison</h4>
              <p className="text-xs font-inter text-gray-500">
                Click the scale icon on any product card to compare longevity, sillage, notes, and pricing.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {compareList.map((p) => (
                <div key={p.id} className="bg-[#F8F6F2] border border-[#E8E2D7] rounded-2xl p-5 space-y-4 relative">
                  <button
                    onClick={() => onRemoveFromCompare(p)}
                    className="absolute top-3 right-3 p-1.5 bg-white text-gray-400 hover:text-red-500 rounded-full border border-[#E8E2D7]"
                  >
                    <X size={14} />
                  </button>

                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full aspect-[4/5] object-cover rounded-xl border border-[#E8E2D7]"
                    referrerPolicy="no-referrer"
                  />

                  <div>
                    <span className="text-[9px] font-montserrat uppercase font-bold text-[#C8A24A]">{p.gender} • {p.collection}</span>
                    <h4 className="font-cormorant font-bold text-xl text-[#1F1F1F]">{p.name}</h4>
                    <span className="font-cormorant font-bold text-2xl text-[#1F1F1F] block mt-1">₹{p.defaultPrice}</span>
                  </div>

                  <div className="space-y-2 text-xs font-inter text-[#666666] pt-2 border-t border-[#E8E2D7]">
                    <div>
                      <strong className="block text-[#1F1F1F] font-montserrat uppercase text-[10px]">Bottle Architecture:</strong>
                      {p.bottleShape || 'Luxury Glass Flacon'} ({p.bottleColor || 'Custom'})
                    </div>
                    <div>
                      <strong className="block text-[#1F1F1F] font-montserrat uppercase text-[10px]">Packaging Box:</strong>
                      {p.packagingBox || 'Custom Coffret'}
                    </div>
                    <div>
                      <strong className="block text-[#1F1F1F] font-montserrat uppercase text-[10px]">Mood & Target Audience:</strong>
                      {p.mood || 'Luxury'} • {p.targetAudience || 'Connoisseurs'}
                    </div>
                    <div>
                      <strong className="block text-[#1F1F1F] font-montserrat uppercase text-[10px]">Longevity & Sillage:</strong>
                      {p.longevity} • {p.sillage}
                    </div>
                    <div>
                      <strong className="block text-[#1F1F1F] font-montserrat uppercase text-[10px]">Top Notes:</strong>
                      {p.topNotes.join(', ')}
                    </div>
                    <div>
                      <strong className="block text-[#1F1F1F] font-montserrat uppercase text-[10px]">Base Notes:</strong>
                      {p.baseNotes.join(', ')}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onAddToCart(p, p.volumeOptions[0]?.size || '50ml', p.defaultPrice);
                      onClose();
                    }}
                    className="w-full bg-[#C8A24A] text-[#1F1F1F] font-montserrat text-xs uppercase font-bold py-3 rounded-full flex items-center justify-center gap-2"
                  >
                    <ShoppingBag size={14} />
                    <span>Add to Bag (₹{p.defaultPrice})</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
