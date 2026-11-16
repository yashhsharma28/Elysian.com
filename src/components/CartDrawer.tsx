import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Tag, Check, Truck } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onProceedToCheckout: (appliedDiscount: number, couponCode: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout
}) => {
  if (!isOpen) return null;

  const [couponInput, setCouponInput] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [couponError, setCouponError] = useState('');

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const freeShippingThreshold = 499;
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const shippingFee = subtotal >= freeShippingThreshold || cartItems.length === 0 ? 0 : 49;
  const finalTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const handleApplyCoupon = () => {
    setCouponError('');
    const code = couponInput.trim().toUpperCase();
    if (code === 'ELYSIAN10' || code === 'EXTRAORDINARY' || code === 'LUXURY100') {
      const discount = 100;
      setDiscountAmount(discount);
      setCouponApplied(true);
    } else {
      setCouponError('Invalid coupon. Try "ELYSIAN10" for ₹100 OFF!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#F8F6F2] border-l border-[#E8E2D7] shadow-2xl flex flex-col justify-between">
          
          {/* Cart Header */}
          <div className="p-6 bg-white border-b border-[#E8E2D7] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag size={20} className="text-[#C8A24A]" />
              <h3 className="font-cormorant text-2xl font-bold text-[#1F1F1F]">
                Your Fragrance Bag
              </h3>
              <span className="text-xs font-montserrat font-bold bg-[#F4F1EA] px-2.5 py-0.5 rounded-full text-[#1F1F1F]">
                {cartItems.reduce((acc, i) => acc + i.quantity, 0)}
              </span>
            </div>
            <button onClick={onClose} className="p-2 text-gray-400 hover:text-[#1F1F1F]">
              <X size={20} />
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="bg-[#F4F1EA] px-6 py-3 border-b border-[#E8E2D7] space-y-1.5">
            <div className="flex justify-between items-center text-xs font-montserrat font-semibold text-[#1F1F1F]">
              <span className="flex items-center gap-1">
                <Truck size={14} className="text-[#C8A24A]" />
                {subtotal >= freeShippingThreshold
                  ? 'Unlocked Free Express Shipping Across India!'
                  : `Add ₹${amountNeededForFreeShipping} more for FREE Delivery`}
              </span>
            </div>
            <div className="w-full h-1.5 bg-[#E8E2D7] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#C8A24A] transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <ShoppingBag size={48} className="mx-auto text-gray-300" />
                <h4 className="font-cormorant text-2xl font-bold text-[#1F1F1F]">Your Bag is Empty</h4>
                <p className="text-xs font-inter text-gray-500">
                  Discover our Extrait de Parfum creations under ₹1000 and select your signature aura.
                </p>
                <button
                  onClick={onClose}
                  className="bg-[#C8A24A] text-[#1F1F1F] text-xs font-montserrat uppercase font-bold px-6 py-3 rounded-full"
                >
                  Explore Fragrances
                </button>
              </div>
            ) : (
              cartItems.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-[#E8E2D7] rounded-xl p-4 flex gap-4 items-center shadow-sm"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-20 object-cover rounded-lg border border-[#E8E2D7]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0 space-y-1">
                    <span className="text-[9px] font-montserrat uppercase text-[#C8A24A] font-bold block">
                      {item.selectedSize} Flacon
                    </span>
                    <h4 className="font-cormorant font-bold text-base text-[#1F1F1F] truncate">
                      {item.product.name}
                    </h4>
                    <span className="font-cormorant font-bold text-sm text-[#1F1F1F] block">
                      ₹{item.price * item.quantity}
                    </span>

                    {/* Qty controls */}
                    <div className="flex items-center gap-3 pt-1">
                      <div className="flex items-center border border-[#E8E2D7] rounded bg-[#F4F1EA]">
                        <button
                          onClick={() => onUpdateQuantity(idx, item.quantity - 1)}
                          className="px-2 text-xs font-bold text-[#1F1F1F]"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-montserrat font-bold text-[#1F1F1F]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                          className="px-2 text-xs font-bold text-[#1F1F1F]"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(idx)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer */}
          {cartItems.length > 0 && (
            <div className="p-6 bg-white border-t border-[#E8E2D7] space-y-4">
              
              {/* Coupon Input */}
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Tag size={14} className="text-[#C8A24A]" />
                  <span className="text-xs font-montserrat uppercase font-bold text-[#1F1F1F]">
                    Voucher Code:
                  </span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Try ELYSIAN10"
                    className="flex-1 bg-[#F4F1EA] border border-[#E8E2D7] rounded-lg px-3 py-2 text-xs font-inter uppercase focus:outline-none focus:border-[#C8A24A]"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    className="bg-[#1F1F1F] hover:bg-[#C8A24A] text-[#C8A24A] hover:text-[#1F1F1F] text-xs font-montserrat uppercase font-bold px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {couponApplied && (
                  <span className="text-[11px] font-inter text-emerald-600 block">
                    ✓ Code Applied! ₹100 discount deducted.
                  </span>
                )}
                {couponError && (
                  <span className="text-[11px] font-inter text-red-500 block">
                    {couponError}
                  </span>
                )}
              </div>

              {/* Subtotal & Totals */}
              <div className="space-y-1.5 text-xs font-inter text-[#666666] pt-2 border-t border-[#E8E2D7]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#1F1F1F]">₹{subtotal}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>VIP Voucher Discount</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Insured Express Shipping</span>
                  <span className="font-semibold text-[#1F1F1F]">
                    {shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-cormorant font-bold text-[#1F1F1F] pt-2 border-t border-[#E8E2D7]">
                  <span>Total Amount (Incl. Taxes)</span>
                  <span className="text-xl text-[#1F1F1F]">₹{finalTotal}</span>
                </div>
              </div>

              {/* Checkout Action */}
              <button
                onClick={() => {
                  onProceedToCheckout(discountAmount, couponInput);
                  onClose();
                }}
                className="w-full bg-[#C8A24A] hover:bg-[#1F1F1F] text-[#1F1F1F] hover:text-[#C8A24A] py-4 rounded-full font-montserrat text-xs uppercase tracking-[0.2em] font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={16} />
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
