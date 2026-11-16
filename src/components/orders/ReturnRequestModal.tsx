import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  RotateCcw,
  Upload,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowRight,
  ShieldCheck,
  PackageCheck
} from 'lucide-react';
import { OrderDetails, ReturnRequest } from '../../types';

interface ReturnRequestModalProps {
  order: OrderDetails;
  isOpen: boolean;
  onClose: () => void;
  onSubmitReturn: (returnRequest: ReturnRequest) => void;
}

export const ReturnRequestModal: React.FC<ReturnRequestModalProps> = ({
  order,
  isOpen,
  onClose,
  onSubmitReturn
}) => {
  const [selectedProductId, setSelectedProductId] = useState<string>(
    order.items[0]?.product.id || ''
  );
  const [requestType, setRequestType] = useState<'Return & Refund' | 'Exchange Fragrance'>(
    'Return & Refund'
  );
  const [reason, setReason] = useState<
    'Fragrance Notes Not as Expected' | 'Damaged Package' | 'Leaking Bottle' | 'Wrong Scent / Size' | 'Delayed Delivery' | 'Other'
  >('Fragrance Notes Not as Expected');
  const [comments, setComments] = useState('');
  const [exchangeProduct, setExchangeProduct] = useState('Midnight Amber Extrait (100ml)');
  const [simulatedImage, setSimulatedImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const targetItem = order.items.find((i) => i.product.id === selectedProductId) || order.items[0];

  const handleSimulatePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setSimulatedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const newReturnRequest: ReturnRequest = {
        id: `RET-${Math.floor(1000 + Math.random() * 9000)}`,
        orderId: order.orderId,
        productId: targetItem.product.id,
        productName: targetItem.product.name,
        productImage: targetItem.product.image,
        reason,
        comments,
        requestType,
        exchangeTargetProduct: requestType === 'Exchange Fragrance' ? exchangeProduct : undefined,
        status: 'Requested',
        images: simulatedImage ? [simulatedImage] : [targetItem.product.image],
        refundAmount: targetItem.price * targetItem.quantity,
        requestedAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      };

      onSubmitReturn(newReturnRequest);
      setIsSubmitting(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="bg-white border border-[#E8E2D7] rounded-[24px] max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-8 text-[#1F1F1F] max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#F4F1EA] pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#C8A24A]/10 text-[#C8A24A] rounded-2xl">
              <RotateCcw size={22} />
            </div>
            <div>
              <h3 className="font-cormorant text-2xl font-bold text-[#1F1F1F]">
                Elysian Return & Exchange
              </h3>
              <p className="text-xs text-gray-500 font-inter">
                Complimentary 100% Satisfaction Guarantee for Order #{order.orderId}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-black rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Select Product Item */}
          <div className="space-y-2">
            <label className="text-xs font-montserrat uppercase font-bold text-gray-700 block">
              1. Select Fragrance to Return / Exchange
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {order.items.map((item) => (
                <div
                  key={item.product.id}
                  onClick={() => setSelectedProductId(item.product.id)}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center gap-3 ${
                    selectedProductId === item.product.id
                      ? 'border-[#C8A24A] bg-[#C8A24A]/5 ring-1 ring-[#C8A24A]'
                      : 'border-[#E8E2D7] bg-[#F8F6F2] hover:bg-white'
                  }`}
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-12 h-12 object-cover rounded-xl"
                  />
                  <div className="min-w-0">
                    <p className="font-montserrat font-bold text-xs truncate text-[#1F1F1F]">
                      {item.product.name}
                    </p>
                    <p className="text-[10px] text-gray-500">{item.selectedSize} (Qty: {item.quantity})</p>
                    <p className="text-[10px] font-bold text-[#C8A24A]">₹{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Choose Request Type */}
          <div className="space-y-2">
            <label className="text-xs font-montserrat uppercase font-bold text-gray-700 block">
              2. Preferred Resolution
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRequestType('Return & Refund')}
                className={`p-3 rounded-2xl text-xs font-montserrat font-bold cursor-pointer transition-all border ${
                  requestType === 'Return & Refund'
                    ? 'bg-[#171717] text-[#C8A24A] border-[#171717]'
                    : 'bg-[#F8F6F2] text-[#1F1F1F] border-[#E8E2D7] hover:bg-[#E8E2D7]'
                }`}
              >
                Return for 100% Refund
              </button>
              <button
                type="button"
                onClick={() => setRequestType('Exchange Fragrance')}
                className={`p-3 rounded-2xl text-xs font-montserrat font-bold cursor-pointer transition-all border ${
                  requestType === 'Exchange Fragrance'
                    ? 'bg-[#171717] text-[#C8A24A] border-[#171717]'
                    : 'bg-[#F8F6F2] text-[#1F1F1F] border-[#E8E2D7] hover:bg-[#E8E2D7]'
                }`}
              >
                Exchange Fragrance Scent
              </button>
            </div>
          </div>

          {requestType === 'Exchange Fragrance' && (
            <div className="space-y-2 bg-[#F8F6F2] p-4 rounded-2xl border border-[#E8E2D7]">
              <label className="text-xs font-montserrat uppercase font-bold text-[#C8A24A] block">
                Select Replacement Scent
              </label>
              <select
                value={exchangeProduct}
                onChange={(e) => setExchangeProduct(e.target.value)}
                className="w-full bg-white border border-[#E8E2D7] rounded-xl p-2.5 text-xs font-inter focus:outline-none focus:border-[#C8A24A]"
              >
                <option value="Midnight Amber Extrait (100ml)">Midnight Amber Extrait (100ml)</option>
                <option value="Santal Blanc Extrait (50ml)">Santal Blanc Extrait (50ml)</option>
                <option value="Velvet Rose & Tonka (100ml)">Velvet Rose & Tonka (100ml)</option>
                <option value="Oud Imperiale Extrait (100ml)">Oud Imperiale Extrait (100ml)</option>
              </select>
            </div>
          )}

          {/* Return Reason Dropdown */}
          <div className="space-y-2">
            <label className="text-xs font-montserrat uppercase font-bold text-gray-700 block">
              3. Reason for Return / Exchange
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value as any)}
              className="w-full bg-[#F8F6F2] border border-[#E8E2D7] rounded-2xl p-3 text-xs font-inter focus:outline-none focus:border-[#C8A24A]"
            >
              <option value="Fragrance Notes Not as Expected">Fragrance Notes Not as Expected</option>
              <option value="Damaged Package">Damaged Outer Gold Box / Bottle</option>
              <option value="Leaking Bottle">Leaking Atomizer / Bottle Defect</option>
              <option value="Wrong Scent / Size">Wrong Scent or Volume Delivered</option>
              <option value="Delayed Delivery">Delayed Courier Delivery</option>
              <option value="Other">Other Reason</option>
            </select>
          </div>

          {/* Photo Upload Simulation */}
          <div className="space-y-2">
            <label className="text-xs font-montserrat uppercase font-bold text-gray-700 block">
              4. Upload Photo Proof (Optional / Recommended)
            </label>
            <div className="border-2 border-dashed border-[#E8E2D7] hover:border-[#C8A24A] bg-[#F8F6F2] p-4 rounded-2xl text-center space-y-2 cursor-pointer transition-colors relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleSimulatePhotoUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              {simulatedImage ? (
                <div className="flex items-center justify-center gap-3">
                  <img src={simulatedImage} alt="Uploaded Proof" className="w-16 h-16 object-cover rounded-xl border border-[#C8A24A]" />
                  <span className="text-xs font-semibold text-emerald-700">Photo Attached ✓</span>
                </div>
              ) : (
                <>
                  <Upload size={24} className="mx-auto text-gray-400" />
                  <p className="text-xs font-inter text-gray-600">
                    Click or drag & drop bottle image to speed up approval
                  </p>
                  <span className="text-[10px] text-gray-400">JPG, PNG up to 10MB</span>
                </>
              )}
            </div>
          </div>

          {/* Comments */}
          <div className="space-y-2">
            <label className="text-xs font-montserrat uppercase font-bold text-gray-700 block">
              5. Additional Comments
            </label>
            <textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Provide any additional details for our concierge master perfumer team..."
              className="w-full bg-[#F8F6F2] border border-[#E8E2D7] rounded-2xl p-3 text-xs font-inter focus:outline-none focus:border-[#C8A24A] h-20"
            />
          </div>

          {/* Footer Submit Button */}
          <div className="pt-2 border-t border-[#F4F1EA] flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-full border border-gray-300 text-xs font-montserrat uppercase font-bold text-gray-600 hover:bg-gray-100 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#171717] text-[#C8A24A] hover:bg-[#C8A24A] hover:text-[#171717] text-xs font-montserrat uppercase font-bold px-7 py-3 rounded-full transition-all cursor-pointer flex items-center gap-2 shadow-lg disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Submitting Request...</span>
              ) : (
                <>
                  <span>Submit {requestType} Request</span>
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
