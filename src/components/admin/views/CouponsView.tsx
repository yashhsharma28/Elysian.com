import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Ticket, Plus, Search, Check, X, Trash2, Tag, Calendar, Percent } from 'lucide-react';

interface Coupon {
  id: string;
  code: string;
  type: 'Percentage' | 'Flat' | 'Free Shipping';
  discountValue: string;
  minOrder: number;
  usageCount: number;
  maxUsage: number;
  expiryDate: string;
  status: 'Active' | 'Expired';
}

const INITIAL_COUPONS: Coupon[] = [
  { id: '1', code: 'ELYSIAN50', type: 'Percentage', discountValue: '50% OFF', minOrder: 499, usageCount: 842, maxUsage: 2000, expiryDate: '2026-08-31', status: 'Active' },
  { id: '2', code: 'EXTRAIT100', type: 'Flat', discountValue: '₹100 OFF', minOrder: 999, usageCount: 412, maxUsage: 1000, expiryDate: '2026-09-15', status: 'Active' },
  { id: '3', code: 'FREESHIP', type: 'Free Shipping', discountValue: 'Free Express Delivery', minOrder: 0, usageCount: 1540, maxUsage: 5000, expiryDate: '2026-12-31', status: 'Active' }
];

export const CouponsView: React.FC = () => {
  const [coupons, setCoupons] = useState<Coupon[]>(INITIAL_COUPONS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCode, setNewCode] = useState('');
  const [discountVal, setDiscountVal] = useState('20% OFF');

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode) return;

    const coupon: Coupon = {
      id: String(Date.now()),
      code: newCode.toUpperCase(),
      type: 'Percentage',
      discountValue: discountVal,
      minOrder: 499,
      usageCount: 0,
      maxUsage: 1000,
      expiryDate: '2026-12-31',
      status: 'Active'
    };

    setCoupons((prev) => [coupon, ...prev]);
    setNewCode('');
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="bg-white border border-[#E8E2D7] p-6 rounded-[24px] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-cormorant text-3xl font-light text-[#1F1F1F]">
            Promotions & <span className="italic text-[#C8A24A]">Coupon Engine</span>
          </h1>
          <p className="font-inter text-xs text-gray-500 font-light pt-1">
            Create flat discount vouchers, percentage promotional codes, and free shipping triggers.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#C8A24A] text-[#1F1F1F] hover:bg-[#1F1F1F] hover:text-[#C8A24A] px-5 py-2.5 rounded-full text-xs font-montserrat uppercase font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer"
        >
          <Plus size={16} />
          <span>Create Coupon Code</span>
        </button>
      </div>

      {/* Coupons List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {coupons.map((c) => (
          <div key={c.id} className="bg-white border border-[#E8E2D7] p-6 rounded-2xl shadow-sm space-y-4 hover:border-[#C8A24A] transition-all">
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm font-extrabold text-[#1F1F1F] bg-[#F8F6F2] border border-[#E8E2D7] px-3 py-1 rounded-lg">
                {c.code}
              </span>
              <span className="text-[10px] font-montserrat uppercase font-bold px-2.5 py-0.5 rounded-full bg-green-100 text-green-700">
                {c.status}
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="font-cormorant text-2xl font-bold text-[#C8A24A]">{c.discountValue}</h3>
              <p className="text-xs text-gray-500">Min Order: ₹{c.minOrder} • Expiry: {c.expiryDate}</p>
            </div>

            <div className="pt-2 border-t border-[#F4F1EA] flex justify-between items-center text-xs text-gray-400 font-montserrat">
              <span>Used {c.usageCount} / {c.maxUsage} times</span>
              <button
                onClick={() => setCoupons((prev) => prev.filter((item) => item.id !== c.id))}
                className="text-red-500 hover:underline cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Coupon Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-[#E8E2D7] rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl relative"
            >
              <div className="flex items-center justify-between border-b border-[#F4F1EA] pb-3">
                <h3 className="font-cormorant text-2xl font-bold text-[#1F1F1F]">New Coupon Voucher</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-black">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleCreateCoupon} className="space-y-3 text-xs font-inter">
                <div>
                  <label className="font-montserrat uppercase font-bold text-gray-500 block mb-1">Coupon Code</label>
                  <input
                    type="text"
                    required
                    value={newCode}
                    onChange={(e) => setNewCode(e.target.value)}
                    placeholder="e.g. LUXURY20"
                    className="w-full bg-[#F8F6F2] border border-[#E8E2D7] rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#C8A24A]"
                  />
                </div>

                <div>
                  <label className="font-montserrat uppercase font-bold text-gray-500 block mb-1">Discount Offer</label>
                  <input
                    type="text"
                    required
                    value={discountVal}
                    onChange={(e) => setDiscountVal(e.target.value)}
                    placeholder="e.g. 20% OFF or ₹150 OFF"
                    className="w-full bg-[#F8F6F2] border border-[#E8E2D7] rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#C8A24A]"
                  />
                </div>

                <div className="pt-3 border-t border-[#F4F1EA] flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-full border border-[#E8E2D7] font-montserrat uppercase text-xs font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#C8A24A] text-[#1F1F1F] font-montserrat uppercase text-xs font-bold px-5 py-2 rounded-full hover:bg-[#1F1F1F] hover:text-[#C8A24A]"
                  >
                    Save Coupon
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
