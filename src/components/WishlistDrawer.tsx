import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { PerfumeProduct } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: PerfumeProduct[];
  onRemoveFromWishlist: (product: PerfumeProduct) => void;
  onAddToCart: (product: PerfumeProduct, selectedSize: string, price: number) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlist,
  onRemoveFromWishlist,
  onAddToCart
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#F8F6F2] border-l border-[#E8E2D7] shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 bg-white border-b border-[#E8E2D7] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart size={20} className="text-[#C8A24A]" fill="currentColor" />
              <h3 className="font-cormorant text-2xl font-bold text-[#1F1F1F]">
                Your Saved Favorites
              </h3>
              <span className="text-xs font-montserrat font-bold bg-[#F4F1EA] px-2.5 py-0.5 rounded-full text-[#1F1F1F]">
                {wishlist.length}
              </span>
            </div>
            <button onClick={onClose} className="p-2 text-gray-400 hover:text-[#1F1F1F]">
              <X size={20} />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {wishlist.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <Heart size={48} className="mx-auto text-gray-300" />
                <h4 className="font-cormorant text-2xl font-bold text-[#1F1F1F]">Your Wishlist is Empty</h4>
                <p className="text-xs font-inter text-gray-500">
                  Save your favorite Extrait de Parfum creations to review later.
                </p>
              </div>
            ) : (
              wishlist.map((p) => (
                <div
                  key={p.id}
                  className="bg-white border border-[#E8E2D7] rounded-xl p-4 flex gap-4 items-center shadow-sm"
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-16 h-20 object-cover rounded-lg border border-[#E8E2D7]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0 space-y-1">
                    <span className="text-[9px] font-montserrat uppercase text-[#C8A24A] font-bold block">
                      {p.gender} • {p.collection}
                    </span>
                    <h4 className="font-cormorant font-bold text-base text-[#1F1F1F] truncate">
                      {p.name}
                    </h4>
                    <span className="font-cormorant font-bold text-sm text-[#1F1F1F] block">
                      ₹{p.defaultPrice}
                    </span>

                    <div className="flex items-center gap-3 pt-1">
                      <button
                        onClick={() => {
                          onAddToCart(p, p.volumeOptions[0]?.size || '50ml', p.defaultPrice);
                          onRemoveFromWishlist(p);
                        }}
                        className="bg-[#C8A24A] text-[#1F1F1F] font-montserrat text-[10px] uppercase font-bold px-3 py-1 rounded flex items-center gap-1"
                      >
                        <ShoppingBag size={12} /> Move to Bag
                      </button>

                      <button
                        onClick={() => onRemoveFromWishlist(p)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
