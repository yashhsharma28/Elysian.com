export type Gender = 'Men' | 'Women' | 'Unisex';

export type CollectionCategory = 'Signature' | 'Best Sellers' | 'Limited Edition' | 'Gift Sets' | 'Travel Kits';

export type OlfactoryNote = 'Amber' | 'Vanilla' | 'Sandalwood' | 'Oud' | 'Rose' | 'Musk' | 'Jasmine' | 'Vetiver' | 'Bergamot' | 'Saffron' | 'Spicy' | 'Citrus';

export interface VolumePrice {
  size: string; // '30ml' | '50ml' | '100ml' | 'Gift Box' | 'Travel Set'
  price: number; // strictly <= 999
  originalPrice?: number;
}

export interface PerfumeProduct {
  id: string;
  name: string;
  subTitle: string;
  tagline: string;
  gender: Gender;
  collection: CollectionCategory;
  defaultPrice: number; // strictly <= 999
  originalPrice: number;
  volumeOptions: VolumePrice[];
  rating: number;
  reviewsCount: number;
  badge?: 'Best Seller' | 'New' | 'Extrait de Parfum' | 'Limited Edition' | 'Award Winner';
  image: string;
  gallery: string[];
  topNotes: string[];
  heartNotes: string[];
  baseNotes: string[];
  accords: { name: string; percentage: number; color: string }[];
  description: string;
  story: string;
  longevity: string; // e.g., '12 - 16 Hours'
  sillage: string; // e.g., 'Strong & Enthralling'
  intensity: 'Moderate' | 'Intense' | 'Extrait Strength';
  bestFor: string; // e.g., 'Evening Galas, Winter Nights, Special Dates'
  isFeatured?: boolean;
  isNewArrival?: boolean;
  sku?: string;
  fragranceFamily?: string;
  concentration?: string;
  bottleSize?: string;
  stockStatus?: 'In Stock' | 'Low Stock' | 'Pre-Order';
  ingredients?: string[];
  usageInstructions?: string;
  packagingImage?: string;
  // Unique Luxury Specs
  bottleShape?: string;
  bottleColor?: string;
  bottleCap?: string;
  packagingBox?: string;
  labelDesign?: string;
  targetAudience?: string;
  mood?: string;
  occasion?: string;
  season?: string;
  timeOfDay?: string;
  marketingAngle?: string;
}

export interface CartItem {
  product: PerfumeProduct;
  selectedSize: string;
  price: number;
  quantity: number;
}

export interface Review {
  id: string;
  author: string;
  avatar?: string;
  city?: string;
  state?: string;
  location: string;
  rating: number;
  date: string;
  timestamp?: number;
  perfumeId?: string;
  perfumeName: string;
  title: string;
  comment: string;
  scentProjection?: string;
  verifiedPurchase: boolean;
  helpfulCount?: number;
  likesCount?: number;
  hasPhotos?: boolean;
  reviewImages?: string[];
  videoUrl?: string;
  isTopReviewOfMonth?: boolean;
  isFeatured?: boolean;
  aiVerifiedAuthentic?: boolean;
}

export interface Article {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  image: string;
  author: string;
}

export interface FilterState {
  searchQuery: string;
  gender: Gender | 'All';
  collection: CollectionCategory | 'All';
  notes: string[];
  maxPrice: number;
  sortBy: 'featured' | 'newest' | 'price-low' | 'price-high' | 'rating';
}

export type OrderStatus = 'Order Placed' | 'Confirmed' | 'Packed' | 'Shipped' | 'Out For Delivery' | 'Delivered' | 'Cancelled' | 'Returned' | 'Refunded';

export type PaymentStatus = 'Pending' | 'Paid' | 'Failed' | 'Refunded' | 'Partially Refunded';

export type PaymentMethod = 'UPI' | 'Google Pay' | 'PhonePe' | 'Paytm' | 'Visa' | 'MasterCard' | 'RuPay' | 'Net Banking' | 'Cash on Delivery';

export interface OrderTrackingStep {
  step: OrderStatus;
  label: string;
  location?: string;
  timestamp?: string;
  completed: boolean;
  current: boolean;
}

export interface ReturnRequest {
  id: string;
  orderId: string;
  productId: string;
  productName: string;
  productImage: string;
  reason: 'Fragrance Notes Not as Expected' | 'Damaged Package' | 'Leaking Bottle' | 'Wrong Scent / Size' | 'Delayed Delivery' | 'Other';
  comments: string;
  requestType: 'Return & Refund' | 'Exchange Fragrance';
  exchangeTargetProduct?: string;
  status: 'Requested' | 'Approved' | 'Picked Up' | 'Refund Processed' | 'Completed' | 'Rejected';
  images?: string[];
  refundAmount: number;
  requestedAt: string;
  updatedAt: string;
}

export interface OrderNotification {
  id: string;
  orderId: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'info' | 'success' | 'warning' | 'alert';
  channel?: 'In-App' | 'Email' | 'SMS' | 'Push';
}

export interface OrderDetails {
  orderId: string;
  orderDate: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  billingAddress?: string;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  items: CartItem[];
  subtotal: number;
  discount: number;
  couponCode?: string;
  shipping: number;
  gstAmount: number;
  total: number;
  status: OrderStatus;
  courierPartner: string;
  trackingNumber: string;
  estimatedDelivery: string;
  deliveryInstructions?: string;
  trackingTimeline: OrderTrackingStep[];
  returnRequest?: ReturnRequest;
  canCancel: boolean;
  canReturn: boolean;
}

// ==========================================
// ELYSIAN AI Assistant Types
// ==========================================

export interface AiChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  recommendations?: PerfumeProduct[];
  orderInfo?: {
    orderId: string;
    status: 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
    carrier: string;
    trackingCode: string;
    estimatedDelivery: string;
    itemsCount: number;
    totalAmount: number;
    shippingAddress: string;
  };
  quizCard?: boolean;
  imagePreview?: string;
  liked?: boolean;
  disliked?: boolean;
}

export interface AiChatSession {
  id: string;
  title: string;
  updatedAt: string;
  messages: AiChatMessage[];
  isFavorite?: boolean;
}

export interface ElysianAiConfig {
  enabled: boolean;
  welcomeMessage: string;
  tagline: string;
  suggestedPrompts: string[];
  knowledgeSnippets: { id: string; title: string; category: string; content: string }[];
  primaryModel: string;
}

export interface PerfumeQuizState {
  notePreference: string;
  budget: string;
  gender: Gender | 'All';
  occasion: string;
}

