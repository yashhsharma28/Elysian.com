import React, { useState, useMemo } from 'react';
import {
  Star,
  ShieldCheck,
  Quote,
  ThumbsUp,
  Heart,
  Share2,
  Flag,
  Camera,
  Search,
  Filter,
  SlidersHorizontal,
  X,
  ChevronRight,
  ChevronLeft,
  Upload,
  Check,
  Sparkles,
  Award,
  Crown,
  Lock,
  MessageSquare,
  Maximize2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { INITIAL_REVIEWS } from '../data/mockReviews';
import { PERFUMES_CATALOG } from '../data/perfumes';
import { Review } from '../types';
import { AnimatedSection, AnimatedStaggerContainer, AnimatedStaggerItem } from './AnimatedSection';

export const TestimonialsSection: React.FC = () => {
  // Main Reviews State
  const [reviewsList, setReviewsList] = useState<Review[]>(INITIAL_REVIEWS);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'helpful' | 'rating'>('newest');

  // Expanded text tracking
  const [expandedReviews, setExpandedReviews] = useState<Record<string, boolean>>({});

  // Likes & Helpful tracking state
  const [likedReviews, setLikedReviews] = useState<Record<string, boolean>>({});
  const [helpfulReviews, setHelpfulReviews] = useState<Record<string, boolean>>({});

  // Lightbox Modal State
  const [lightboxImage, setLightboxImage] = useState<{ url: string; author: string; perfume: string } | null>(null);

  // Write a Review Modal State
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [newRating, setNewRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [newTitle, setNewTitle] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newCity, setNewCity] = useState('Mumbai');
  const [newState, setNewState] = useState('Maharashtra');
  const [newPerfumeId, setNewPerfumeId] = useState(PERFUMES_CATALOG[0]?.id || 'men-1');
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [aiAnalyzing, setAiAnalyzing] = useState(false);

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Toggle Read More
  const toggleExpand = (id: string) => {
    setExpandedReviews((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Toggle Like
  const handleToggleLike = (id: string) => {
    const isLiked = likedReviews[id];
    setLikedReviews((prev) => ({ ...prev, [id]: !isLiked }));
    setReviewsList((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, likesCount: (r.likesCount || 0) + (isLiked ? -1 : 1) } : r
      )
    );
    showToast(isLiked ? 'Unliked review' : 'Liked this customer review!');
  };

  // Toggle Helpful
  const handleToggleHelpful = (id: string) => {
    const isHelpful = helpfulReviews[id];
    setHelpfulReviews((prev) => ({ ...prev, [id]: !isHelpful }));
    setReviewsList((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, helpfulCount: (r.helpfulCount || 0) + (isHelpful ? -1 : 1) } : r
      )
    );
    showToast(isHelpful ? 'Removed helpful feedback' : 'Marked review as helpful!');
  };

  // Share Review
  const handleShareReview = (review: Review) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`Check out this review for ${review.perfumeName}: "${review.title}" - ELYSIAN Perfumes`);
      showToast('Review link copied to clipboard!');
    } else {
      showToast('Sharing link ready for ELYSIAN Perfumes!');
    }
  };

  // Report Review
  const handleReportReview = () => {
    showToast('Thank you. Reported to ELYSIAN Quality Moderation Team.');
  };

  // Filtered & Sorted Reviews
  const filteredReviews = useMemo(() => {
    return reviewsList
      .filter((rev) => {
        // Filter tabs
        if (activeFilter === '5stars' && rev.rating !== 5) return false;
        if (activeFilter === '4stars' && rev.rating !== 4) return false;
        if (activeFilter === '3stars' && rev.rating !== 3) return false;
        if (activeFilter === 'photos' && (!rev.reviewImages || rev.reviewImages.length === 0)) return false;
        if (activeFilter === 'verified' && !rev.verifiedPurchase) return false;

        // Search Query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchAuthor = rev.author.toLowerCase().includes(q);
          const matchCity = (rev.city || rev.location).toLowerCase().includes(q);
          const matchTitle = rev.title.toLowerCase().includes(q);
          const matchComment = rev.comment.toLowerCase().includes(q);
          const matchPerfume = rev.perfumeName.toLowerCase().includes(q);
          return matchAuthor || matchCity || matchTitle || matchComment || matchPerfume;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'newest') return (b.timestamp || 0) - (a.timestamp || 0);
        if (sortBy === 'oldest') return (a.timestamp || 0) - (b.timestamp || 0);
        if (sortBy === 'helpful') return (b.helpfulCount || 0) - (a.helpfulCount || 0);
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0;
      });
  }, [reviewsList, activeFilter, searchQuery, sortBy]);

  // Top Review of the Month
  const topReview = useMemo(() => {
    return reviewsList.find((r) => r.isTopReviewOfMonth) || reviewsList[0];
  }, [reviewsList]);

  // Customer Photo Gallery Strip items
  const allCustomerPhotos = useMemo(() => {
    const photos: { url: string; author: string; perfume: string }[] = [];
    reviewsList.forEach((r) => {
      if (r.reviewImages && r.reviewImages.length > 0) {
        r.reviewImages.forEach((img) => {
          photos.push({ url: img, author: r.author, perfume: r.perfumeName });
        });
      }
    });
    return photos;
  }, [reviewsList]);

  // Handle Review Submission
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newComment.trim() || !newAuthor.trim()) {
      showToast('Please fill out all required fields.');
      return;
    }

    setIsSubmitting(true);
    setAiAnalyzing(true);

    setTimeout(() => {
      setAiAnalyzing(false);
      const selectedPerfume = PERFUMES_CATALOG.find((p) => p.id === newPerfumeId) || PERFUMES_CATALOG[0];

      const createdReview: Review = {
        id: `rev-user-${Date.now()}`,
        author: newAuthor,
        avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(newAuthor)}`,
        city: newCity,
        state: newState,
        location: `${newCity}, ${newState}`,
        rating: newRating,
        date: 'Just now',
        timestamp: Date.now(),
        perfumeId: selectedPerfume.id,
        perfumeName: selectedPerfume.name,
        title: newTitle,
        comment: newComment,
        scentProjection: 'Extrait Projection',
        verifiedPurchase: true,
        helpfulCount: 1,
        likesCount: 1,
        hasPhotos: Boolean(newPhotoUrl.trim()),
        reviewImages: newPhotoUrl.trim()
          ? [newPhotoUrl.trim()]
          : ['https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=800&auto=format&fit=crop'],
        aiVerifiedAuthentic: true
      };

      setReviewsList([createdReview, ...reviewsList]);
      setIsSubmitting(false);
      setIsWriteModalOpen(false);

      // Reset form
      setNewTitle('');
      setNewComment('');
      setNewAuthor('');
      setNewPhotoUrl('');
      setNewRating(5);

      showToast('Thank you! Your verified review is published.');
    }, 1200);
  };

  return (
    <section id="section-reviews" className="py-24 bg-[#F8F6F2] border-y border-[#E8E2D7] relative overflow-hidden">
      {/* Toast Notification Popup */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-8 right-8 z-[90] bg-[#1F1F1F] text-white border border-[#C8A24A]/40 px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3"
          >
            <Sparkles size={18} className="text-[#C8A24A] animate-pulse" />
            <span className="text-xs font-montserrat font-semibold tracking-wide">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* ========================================================= */}
        {/* SECTION HEADER                                            */}
        {/* ========================================================= */}
        <AnimatedSection className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#E8E2D7] shadow-xs">
            <Sparkles size={14} className="text-[#C8A24A]" />
            <span className="text-xs font-montserrat uppercase tracking-[0.25em] text-[#C8A24A] font-bold">
              Crafted for the Extraordinary
            </span>
          </div>

          <h2 className="font-cormorant text-4xl sm:text-5xl md:text-6xl font-light text-[#1F1F1F] tracking-tight">
            Loved by Thousands of Customers
          </h2>

          <p className="font-inter text-base text-[#666666] font-light leading-relaxed max-w-2xl mx-auto">
            Discover why fragrance lovers across India choose ELYSIAN for their signature scent — engineered at 30% Extrait concentration for 12+ hours of lingering presence.
          </p>

          <div className="pt-2 flex justify-center">
            <button
              onClick={() => setIsWriteModalOpen(true)}
              className="bg-[#1F1F1F] text-[#C8A24A] hover:bg-[#C8A24A] hover:text-[#1F1F1F] px-8 py-3.5 rounded-full font-montserrat text-xs uppercase tracking-widest font-bold transition-all shadow-md hover:shadow-xl hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2.5"
            >
              <MessageSquare size={16} />
              <span>Write a Customer Review</span>
            </button>
          </div>
        </AnimatedSection>

        {/* ========================================================= */}
        {/* REVIEW SUMMARY & STATS DASHBOARD                          */}
        {/* ========================================================= */}
        <AnimatedSection className="bg-white/90 backdrop-blur-md border border-[#E8E2D7] rounded-[24px] p-8 lg:p-10 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#C8A24A] to-transparent" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Overall Rating & Badge */}
            <div className="lg:col-span-4 text-center lg:text-left space-y-4 border-b lg:border-b-0 lg:border-r border-[#E8E2D7] pb-8 lg:pb-0 lg:pr-8">
              <div className="inline-flex items-center gap-1 bg-[#F8F6F2] px-3.5 py-1 rounded-full text-xs font-montserrat text-[#C8A24A] font-bold uppercase tracking-wider">
                <Award size={14} /> 100% Authentic Extrait
              </div>

              <div className="flex items-baseline justify-center lg:justify-start gap-3">
                <span className="font-cormorant text-6xl font-bold text-[#1F1F1F]">4.9</span>
                <span className="text-xl text-[#888888] font-inter font-light">/ 5.0</span>
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-1 text-[#C8A24A]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={22} fill="currentColor" />
                ))}
              </div>

              <div>
                <span className="font-cormorant font-bold text-xl text-[#1F1F1F] block">
                  2,500+ Happy Customers
                </span>
                <span className="text-xs text-[#777777] font-inter">
                  Based on verified deliveries across 180+ Indian cities
                </span>
              </div>
            </div>

            {/* Rating Distribution Breakdown */}
            <div className="lg:col-span-5 space-y-2.5 border-b lg:border-b-0 lg:border-r border-[#E8E2D7] pb-8 lg:pb-0 lg:pr-8">
              <h4 className="text-xs font-montserrat uppercase tracking-wider text-[#1F1F1F] font-bold mb-3">
                Rating Distribution
              </h4>

              {[
                { stars: 5, pct: 88, label: '88%' },
                { stars: 4, pct: 9, label: '9%' },
                { stars: 3, pct: 2, label: '2%' },
                { stars: 2, pct: 0.5, label: '<1%' },
                { stars: 1, pct: 0.5, label: '<1%' },
              ].map((item) => (
                <div key={item.stars} className="flex items-center gap-3 text-xs font-inter">
                  <div className="w-12 flex items-center gap-1 font-semibold text-[#1F1F1F]">
                    <span>{item.stars}</span>
                    <Star size={12} className="text-[#C8A24A]" fill="currentColor" />
                  </div>

                  <div className="flex-1 h-2 bg-[#F4F1EA] rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-[#C8A24A] to-[#E2C778] rounded-full"
                    />
                  </div>

                  <span className="w-10 text-right text-[#777777] font-mono">{item.label}</span>
                </div>
              ))}
            </div>

            {/* Satisfaction Trust Badges */}
            <div className="lg:col-span-3 space-y-4 text-center lg:text-left">
              <h4 className="text-xs font-montserrat uppercase tracking-wider text-[#1F1F1F] font-bold">
                The ELYSIAN Promise
              </h4>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs text-[#1F1F1F]">
                  <div className="w-7 h-7 rounded-full bg-[#F4F1EA] flex items-center justify-center text-[#C8A24A] shrink-0">
                    <ShieldCheck size={16} />
                  </div>
                  <span>12+ Hours Scent Longevity Guarantee</span>
                </div>

                <div className="flex items-center gap-3 text-xs text-[#1F1F1F]">
                  <div className="w-7 h-7 rounded-full bg-[#F4F1EA] flex items-center justify-center text-[#C8A24A] shrink-0">
                    <Sparkles size={16} />
                  </div>
                  <span>IFRA Certified French & Indian Extraits</span>
                </div>

                <div className="flex items-center gap-3 text-xs text-[#1F1F1F]">
                  <div className="w-7 h-7 rounded-full bg-[#F4F1EA] flex items-center justify-center text-[#C8A24A] shrink-0">
                    <Lock size={16} />
                  </div>
                  <span>AI Spam-Filtered & Verified Buyers</span>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* ========================================================= */}
        {/* TOP REVIEW OF THE MONTH SPOTLIGHT                          */}
        {/* ========================================================= */}
        {topReview && (
          <AnimatedSection className="bg-gradient-to-br from-[#1F1F1F] via-[#2A2A2A] to-[#141414] text-white rounded-[24px] p-8 lg:p-12 shadow-2xl relative overflow-hidden border border-[#C8A24A]/30">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#C8A24A]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-5">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C8A24A]/20 border border-[#C8A24A]/50 text-[#C8A24A] text-xs font-montserrat uppercase tracking-wider font-bold">
                  <Crown size={14} /> Top Review of the Month
                </div>

                <div className="flex items-center gap-1 text-[#C8A24A]">
                  {[...Array(topReview.rating)].map((_, i) => (
                    <Star key={i} size={18} fill="currentColor" />
                  ))}
                  <span className="ml-2 text-xs text-gray-400 font-montserrat">
                    {topReview.scentProjection}
                  </span>
                </div>

                <h3 className="font-cormorant text-2xl sm:text-3xl font-light italic text-[#F4F1EA]">
                  "{topReview.title}"
                </h3>

                <p className="text-sm font-inter text-gray-300 font-light leading-relaxed">
                  {topReview.comment}
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-6 text-xs font-inter border-t border-white/10">
                  <div className="flex items-center gap-3">
                    <img
                      src={topReview.avatar}
                      alt={topReview.author}
                      className="w-10 h-10 rounded-full object-cover border border-[#C8A24A]"
                    />
                    <div>
                      <span className="font-cormorant text-base font-bold text-white block">
                        {topReview.author}
                      </span>
                      <span className="text-[10px] text-gray-400 uppercase tracking-wider font-montserrat">
                        {topReview.location}
                      </span>
                    </div>
                  </div>

                  <div className="h-8 w-px bg-white/10 hidden sm:block" />

                  <div>
                    <span className="text-[10px] text-gray-400 uppercase font-montserrat block">
                      Purchased Product
                    </span>
                    <span className="text-xs text-[#C8A24A] font-bold font-montserrat">
                      {topReview.perfumeName}
                    </span>
                  </div>

                  <div className="ml-auto flex items-center gap-3 pt-2 sm:pt-0">
                    <button
                      onClick={() => handleToggleHelpful(topReview.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-montserrat transition-all cursor-pointer ${
                        helpfulReviews[topReview.id]
                          ? 'bg-[#C8A24A] text-[#1F1F1F] font-bold'
                          : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                    >
                      <ThumbsUp size={13} />
                      <span>Helpful ({topReview.helpfulCount})</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Photo preview of Top Review */}
              {topReview.reviewImages && topReview.reviewImages.length > 0 && (
                <div className="lg:col-span-4 flex justify-center">
                  <div
                    onClick={() =>
                      setLightboxImage({
                        url: topReview.reviewImages![0],
                        author: topReview.author,
                        perfume: topReview.perfumeName
                      })
                    }
                    className="relative rounded-2xl overflow-hidden border border-[#C8A24A]/40 shadow-xl group cursor-pointer max-w-xs"
                  >
                    <img
                      src={topReview.reviewImages[0]}
                      alt="Customer perfume bottle"
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-montserrat uppercase font-bold gap-2">
                      <Maximize2 size={16} /> View Image
                    </div>
                  </div>
                </div>
              )}
            </div>
          </AnimatedSection>
        )}

        {/* ========================================================= */}
        {/* CUSTOMER PHOTO GALLERY REEL                               */}
        {/* ========================================================= */}
        {allCustomerPhotos.length > 0 && (
          <AnimatedSection className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Camera size={18} className="text-[#C8A24A]" />
                <h3 className="font-cormorant text-2xl font-bold text-[#1F1F1F]">
                  Real Customer Fragrance Gallery
                </h3>
              </div>
              <span className="text-xs text-[#888888] font-inter">
                {allCustomerPhotos.length} Buyer Uploads
              </span>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-3 pt-1 scrollbar-none snap-x">
              {allCustomerPhotos.map((photo, idx) => (
                <div
                  key={idx}
                  onClick={() => setLightboxImage(photo)}
                  className="shrink-0 w-36 h-36 rounded-2xl overflow-hidden border border-[#E8E2D7] relative group cursor-pointer shadow-sm snap-start"
                >
                  <img
                    src={photo.url}
                    alt={`Customer uploaded bottle by ${photo.author}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-2 flex flex-col justify-end text-[10px] text-white font-montserrat">
                    <span className="font-bold truncate">{photo.perfume}</span>
                    <span className="text-gray-300 text-[9px] truncate">by {photo.author}</span>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        )}

        {/* ========================================================= */}
        {/* REVIEW FILTERS, SEARCH & SORT BAR                         */}
        {/* ========================================================= */}
        <AnimatedSection className="space-y-6">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-[#E8E2D7]">
            {/* Filter Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { id: 'all', label: 'All Reviews' },
                { id: '5stars', label: '5 Stars ★' },
                { id: '4stars', label: '4 Stars ★' },
                { id: '3stars', label: '3 Stars ★' },
                { id: 'photos', label: 'With Photos 📷' },
                { id: 'verified', label: 'Verified Buyers ✓' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  className={`px-4 py-2 rounded-full text-xs font-montserrat font-bold transition-all cursor-pointer ${
                    activeFilter === tab.id
                      ? 'bg-[#1F1F1F] text-[#C8A24A] shadow-md'
                      : 'bg-[#F4F1EA] text-[#666666] hover:bg-[#E8E2D7] hover:text-[#1F1F1F]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Search and Sort controls */}
            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="relative flex-1 md:w-56">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search reviews..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#F8F6F2] text-xs font-inter pl-8 pr-7 py-2 rounded-full border border-[#E8E2D7] focus:outline-none focus:border-[#C8A24A]"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X size={12} />
                  </button>
                )}
              </div>

              {/* Sort Selector */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#F8F6F2] text-xs font-montserrat font-semibold px-3 py-2 rounded-full border border-[#E8E2D7] focus:outline-none focus:border-[#C8A24A] text-[#1F1F1F] cursor-pointer"
              >
                <option value="newest">Sort: Newest</option>
                <option value="oldest">Sort: Oldest</option>
                <option value="helpful">Sort: Most Helpful</option>
                <option value="rating">Sort: Highest Rated</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-[#777777] font-inter px-2">
            <span>
              Showing <strong className="text-[#1F1F1F] font-bold">{filteredReviews.length}</strong> verified customer reviews
            </span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-[#C8A24A] hover:underline cursor-pointer"
              >
                Clear search filter
              </button>
            )}
          </div>
        </AnimatedSection>

        {/* ========================================================= */}
        {/* CUSTOMER REVIEWS GRID                                     */}
        {/* ========================================================= */}
        <AnimatedStaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredReviews.length === 0 ? (
            <div className="col-span-full bg-white border border-[#E8E2D7] rounded-[24px] p-12 text-center space-y-4">
              <MessageSquare size={36} className="mx-auto text-gray-300" />
              <h3 className="font-cormorant text-2xl text-[#1F1F1F]">No reviews match your filter</h3>
              <p className="text-xs text-gray-500 font-inter">
                Try resetting your search query or selecting "All Reviews".
              </p>
              <button
                onClick={() => {
                  setActiveFilter('all');
                  setSearchQuery('');
                }}
                className="bg-[#1F1F1F] text-[#C8A24A] px-6 py-2.5 rounded-full text-xs font-montserrat uppercase font-bold cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            filteredReviews.map((rev) => {
              const isExpanded = expandedReviews[rev.id];
              const isLongText = rev.comment.length > 180;
              const displayText = isLongText && !isExpanded ? rev.comment.slice(0, 180) + '...' : rev.comment;

              return (
                <AnimatedStaggerItem key={rev.id}>
                  <div className="bg-white/95 backdrop-blur-md border border-[#E8E2D7] hover:border-[#C8A24A]/60 rounded-[24px] p-6 md:p-7 space-y-4 shadow-sm hover:shadow-xl transition-all duration-300 relative flex flex-col justify-between h-full group">
                    <Quote size={28} className="text-[#C8A24A]/15 absolute top-6 right-6 pointer-events-none" />

                    <div className="space-y-3">
                      {/* Customer Header Info */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img
                            src={rev.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop'}
                            alt={rev.author}
                            className="w-11 h-11 rounded-full object-cover border border-[#E8E2D7] group-hover:border-[#C8A24A] transition-colors"
                          />
                          <div>
                            <span className="font-cormorant font-bold text-lg text-[#1F1F1F] block leading-snug">
                              {rev.author}
                            </span>
                            <span className="text-[11px] text-[#888888] font-inter block">
                              {rev.city || rev.location}
                            </span>
                          </div>
                        </div>

                        {rev.verifiedPurchase && (
                          <div className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-full text-[10px] font-montserrat font-bold">
                            <ShieldCheck size={13} />
                            <span>Verified Buyer</span>
                          </div>
                        )}
                      </div>

                      {/* Star Rating & Purchase Metadata */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                        <div className="flex items-center gap-1 text-[#C8A24A]">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} size={15} fill="currentColor" />
                          ))}
                          <span className="text-xs text-gray-400 font-inter ml-1.5">{rev.date}</span>
                        </div>

                        <span className="text-[10px] font-montserrat uppercase tracking-wider font-bold text-[#C8A24A] bg-[#F8F6F2] px-2.5 py-0.5 rounded-full border border-[#E8E2D7]">
                          {rev.perfumeName}
                        </span>
                      </div>

                      {/* Review Title & Body */}
                      <div className="space-y-1.5 pt-1">
                        <h4 className="font-cormorant text-xl font-bold text-[#1F1F1F]">
                          "{rev.title}"
                        </h4>
                        <p className="text-xs font-inter text-[#555555] leading-relaxed">
                          {displayText}
                          {isLongText && (
                            <button
                              onClick={() => toggleExpand(rev.id)}
                              className="text-[#C8A24A] font-semibold ml-1 cursor-pointer hover:underline"
                            >
                              {isExpanded ? 'Show less' : 'Read more'}
                            </button>
                          )}
                        </p>
                      </div>

                      {/* Attached Customer Photos */}
                      {rev.reviewImages && rev.reviewImages.length > 0 && (
                        <div className="flex items-center gap-2 pt-1">
                          {rev.reviewImages.map((imgUrl, imgIdx) => (
                            <div
                              key={imgIdx}
                              onClick={() =>
                                setLightboxImage({
                                  url: imgUrl,
                                  author: rev.author,
                                  perfume: rev.perfumeName
                                })
                              }
                              className="w-16 h-16 rounded-xl overflow-hidden border border-[#E8E2D7] cursor-pointer group/img relative shrink-0 shadow-2xs"
                            >
                              <img
                                src={imgUrl}
                                alt={`Customer upload by ${rev.author}`}
                                className="w-full h-full object-cover group-hover/img:scale-110 transition-transform"
                              />
                              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center text-white">
                                <Maximize2 size={12} />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Bottom Action Bar */}
                    <div className="pt-4 mt-2 border-t border-[#E8E2D7] flex items-center justify-between text-xs font-inter">
                      <div className="flex items-center gap-2">
                        {/* Helpful Button */}
                        <button
                          onClick={() => handleToggleHelpful(rev.id)}
                          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-montserrat font-bold transition-all cursor-pointer ${
                            helpfulReviews[rev.id]
                              ? 'bg-[#1F1F1F] text-[#C8A24A]'
                              : 'bg-[#F4F1EA] text-[#666666] hover:bg-[#E8E2D7] hover:text-[#1F1F1F]'
                          }`}
                        >
                          <ThumbsUp size={12} />
                          <span>Helpful ({rev.helpfulCount || 0})</span>
                        </button>

                        {/* Like Button */}
                        <button
                          onClick={() => handleToggleLike(rev.id)}
                          className={`p-1.5 rounded-full transition-all cursor-pointer ${
                            likedReviews[rev.id]
                              ? 'bg-rose-50 text-rose-600'
                              : 'text-gray-400 hover:text-rose-500 hover:bg-rose-50'
                          }`}
                          title="Like review"
                        >
                          <Heart size={14} fill={likedReviews[rev.id] ? 'currentColor' : 'none'} />
                        </button>
                      </div>

                      <div className="flex items-center gap-1.5 text-gray-400">
                        {/* Share Button */}
                        <button
                          onClick={() => handleShareReview(rev)}
                          className="p-1.5 hover:text-[#1F1F1F] transition-colors cursor-pointer"
                          title="Share review"
                        >
                          <Share2 size={13} />
                        </button>

                        {/* Report Button */}
                        <button
                          onClick={handleReportReview}
                          className="p-1.5 hover:text-red-500 transition-colors cursor-pointer"
                          title="Report review"
                        >
                          <Flag size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                </AnimatedStaggerItem>
              );
            })
          )}
        </AnimatedStaggerContainer>
      </div>

      {/* ========================================================= */}
      {/* LIGHTBOX MEDIA MODAL                                      */}
      {/* ========================================================= */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full bg-[#1F1F1F] border border-[#C8A24A]/40 rounded-3xl overflow-hidden shadow-2xl p-4 sm:p-6 text-white space-y-4"
            >
              <button
                onClick={() => setLightboxImage(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white bg-black/50 p-2 rounded-full transition-colors cursor-pointer z-10"
              >
                <X size={20} />
              </button>

              <div className="rounded-2xl overflow-hidden max-h-[70vh] bg-black flex items-center justify-center">
                <img
                  src={lightboxImage.url}
                  alt={lightboxImage.perfume}
                  className="max-h-[70vh] w-auto object-contain"
                />
              </div>

              <div className="flex items-center justify-between text-xs font-montserrat">
                <div>
                  <span className="text-[#C8A24A] font-bold block">{lightboxImage.perfume}</span>
                  <span className="text-gray-400">Photo uploaded by {lightboxImage.author}</span>
                </div>
                <div className="inline-flex items-center gap-1 bg-[#C8A24A]/20 text-[#C8A24A] px-3 py-1 rounded-full text-[10px] font-bold uppercase">
                  <ShieldCheck size={12} /> Verified ELYSIAN Buyer
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================= */}
      {/* WRITE A REVIEW MODAL                                      */}
      {/* ========================================================= */}
      <AnimatePresence>
        {isWriteModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/75 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-[28px] border border-[#E8E2D7] shadow-2xl max-w-xl w-full p-6 sm:p-8 relative space-y-6 my-8"
            >
              {/* Modal Close Button */}
              <button
                onClick={() => setIsWriteModalOpen(false)}
                className="absolute top-6 right-6 text-gray-400 hover:text-[#1F1F1F] p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>

              {/* Header */}
              <div className="space-y-1">
                <span className="text-xs font-montserrat uppercase tracking-widest text-[#C8A24A] font-bold">
                  Connoisseur Feedback
                </span>
                <h3 className="font-cormorant text-3xl font-bold text-[#1F1F1F]">
                  Write a Verified Review
                </h3>
                <p className="text-xs text-[#666666] font-inter">
                  Share your olfactory experience with perfume lovers across India.
                </p>
              </div>

              <form onSubmit={handleSubmitReview} className="space-y-5">
                {/* Product Selection */}
                <div className="space-y-1.5">
                  <label className="text-xs font-montserrat uppercase font-bold text-[#1F1F1F] block">
                    Product Purchased *
                  </label>
                  <select
                    value={newPerfumeId}
                    onChange={(e) => setNewPerfumeId(e.target.value)}
                    className="w-full bg-[#F8F6F2] text-xs font-inter p-3 rounded-xl border border-[#E8E2D7] focus:outline-none focus:border-[#C8A24A] text-[#1F1F1F] cursor-pointer"
                  >
                    {PERFUMES_CATALOG.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} ({p.subTitle}) - ₹{p.defaultPrice}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Interactive Star Rating */}
                <div className="space-y-1.5">
                  <label className="text-xs font-montserrat uppercase font-bold text-[#1F1F1F] block">
                    Star Rating *
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 cursor-pointer transition-transform hover:scale-125"
                      >
                        <Star
                          size={28}
                          className={
                            star <= (hoverRating || newRating)
                              ? 'text-[#C8A24A] fill-[#C8A24A]'
                              : 'text-gray-300'
                          }
                        />
                      </button>
                    ))}
                    <span className="text-xs font-montserrat font-semibold text-[#1F1F1F] ml-2">
                      {hoverRating === 5 || (!hoverRating && newRating === 5) ? '★★★★★ Extraordinary / Niche Quality' : ''}
                      {hoverRating === 4 || (!hoverRating && newRating === 4) ? '★★★★ Very Good' : ''}
                      {hoverRating === 3 || (!hoverRating && newRating === 3) ? '★★★ Average' : ''}
                      {hoverRating === 2 || (!hoverRating && newRating === 2) ? '★★ Below Expectations' : ''}
                      {hoverRating === 1 || (!hoverRating && newRating === 1) ? '★ Poor' : ''}
                    </span>
                  </div>
                </div>

                {/* Review Headline */}
                <div className="space-y-1.5">
                  <label className="text-xs font-montserrat uppercase font-bold text-[#1F1F1F] block">
                    Review Headline *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Lasts 15 hours! Smells like ₹25k niche perfume."
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full bg-[#F8F6F2] text-xs font-inter p-3 rounded-xl border border-[#E8E2D7] focus:outline-none focus:border-[#C8A24A]"
                  />
                </div>

                {/* Detailed Comment */}
                <div className="space-y-1.5">
                  <label className="text-xs font-montserrat uppercase font-bold text-[#1F1F1F] block">
                    Detailed Olfactory Experience *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe the scent notes, longevity on skin/clothes, compliments received, and packaging quality..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="w-full bg-[#F8F6F2] text-xs font-inter p-3 rounded-xl border border-[#E8E2D7] focus:outline-none focus:border-[#C8A24A]"
                  />
                </div>

                {/* Author Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-montserrat uppercase font-bold text-[#1F1F1F] block">
                      Your Name / Nickname *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Vikramaditya S."
                      value={newAuthor}
                      onChange={(e) => setNewAuthor(e.target.value)}
                      className="w-full bg-[#F8F6F2] text-xs font-inter p-3 rounded-xl border border-[#E8E2D7] focus:outline-none focus:border-[#C8A24A]"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-montserrat uppercase font-bold text-[#1F1F1F] block">
                      City & State *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Mumbai, Maharashtra"
                      value={`${newCity}, ${newState}`}
                      onChange={(e) => {
                        const parts = e.target.value.split(',');
                        setNewCity(parts[0] || 'Mumbai');
                        setNewState(parts[1]?.trim() || 'Maharashtra');
                      }}
                      className="w-full bg-[#F8F6F2] text-xs font-inter p-3 rounded-xl border border-[#E8E2D7] focus:outline-none focus:border-[#C8A24A]"
                    />
                  </div>
                </div>

                {/* Photo Upload (URL or Preset) */}
                <div className="space-y-1.5">
                  <label className="text-xs font-montserrat uppercase font-bold text-[#1F1F1F] block">
                    Add Bottle / Unboxing Photo (Optional)
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      placeholder="https://images.unsplash.com/photo-..."
                      value={newPhotoUrl}
                      onChange={(e) => setNewPhotoUrl(e.target.value)}
                      className="flex-1 bg-[#F8F6F2] text-xs font-inter p-3 rounded-xl border border-[#E8E2D7] focus:outline-none focus:border-[#C8A24A]"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setNewPhotoUrl(
                          'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=800&auto=format&fit=crop'
                        )
                      }
                      className="bg-[#F4F1EA] hover:bg-[#E8E2D7] text-[#1F1F1F] px-3.5 py-2 rounded-xl text-xs font-montserrat font-bold cursor-pointer transition-colors"
                    >
                      Sample Photo
                    </button>
                  </div>
                </div>

                {/* AI Verification Badge Indicator */}
                <div className="bg-[#F8F6F2] border border-[#E8E2D7] p-3 rounded-xl flex items-center justify-between text-xs font-montserrat text-[#666666]">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={16} className="text-emerald-600" />
                    <span>AI Authenticity Guard active</span>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-[#C8A24A]">100% Spam Free</span>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#1F1F1F] hover:bg-[#C8A24A] text-[#C8A24A] hover:text-[#1F1F1F] py-4 rounded-xl font-montserrat text-xs uppercase tracking-widest font-bold transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Sparkles size={16} className="animate-spin" />
                      <span>Publishing Verified Review...</span>
                    </>
                  ) : (
                    <>
                      <Check size={16} />
                      <span>Submit Verified Customer Review</span>
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
