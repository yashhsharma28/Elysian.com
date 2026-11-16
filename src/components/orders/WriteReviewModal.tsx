import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Star, Sparkles, CheckCircle2 } from 'lucide-react';

interface WriteReviewModalProps {
  productName: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmitReview: (productName: string, rating: number, comment: string) => void;
}

export const WriteReviewModal: React.FC<WriteReviewModalProps> = ({
  productName,
  isOpen,
  onClose,
  onSubmitReview
}) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onSubmitReview(productName, rating, comment);
      setSubmitted(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white border border-[#E8E2D7] rounded-[24px] max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-8 text-[#1F1F1F]"
      >
        <div className="flex items-center justify-between border-b border-[#F4F1EA] pb-4">
          <div>
            <h3 className="font-cormorant text-2xl font-bold text-[#1F1F1F]">
              Review Fragrance
            </h3>
            <p className="text-xs text-gray-500 font-inter">{productName}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-black rounded-full cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {submitted ? (
          <div className="text-center py-8 space-y-3">
            <CheckCircle2 size={40} className="text-[#C8A24A] mx-auto" />
            <h4 className="font-cormorant text-xl font-bold text-[#1F1F1F]">
              Thank You for Your Review
            </h4>
            <p className="text-xs text-gray-600 font-inter">
              Your feedback has been submitted to the ELYSIAN Atelier database.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Rating Stars */}
            <div className="space-y-2">
              <label className="text-xs font-montserrat uppercase font-bold text-gray-700 block">
                Overall Fragrance Rating
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 cursor-pointer transition-transform hover:scale-125"
                  >
                    <Star
                      size={24}
                      className={
                        star <= rating
                          ? 'fill-[#C8A24A] text-[#C8A24A]'
                          : 'text-gray-300'
                      }
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Comment */}
            <div className="space-y-2">
              <label className="text-xs font-montserrat uppercase font-bold text-gray-700 block">
                Your Fragrance Notes & Sillage Experience
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="How does the scent evolve on your skin? Longevity, compliments, or occasion..."
                className="w-full bg-[#F8F6F2] border border-[#E8E2D7] rounded-2xl p-3 text-xs font-inter focus:outline-none focus:border-[#C8A24A] h-28"
                required
              />
            </div>

            <div className="flex justify-end gap-3 pt-2 border-t border-[#F4F1EA]">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-full border border-gray-300 text-xs font-montserrat uppercase font-bold text-gray-600 hover:bg-gray-100 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-[#171717] text-[#C8A24A] font-montserrat uppercase text-xs font-bold px-6 py-2.5 rounded-full hover:bg-[#C8A24A] hover:text-[#171717] transition-all cursor-pointer shadow-md"
              >
                Publish Review
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
};
