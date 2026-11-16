import { OrderDetails, CartItem, OrderStatus, ReturnRequest, OrderNotification } from '../types';
import { PERFUMES_CATALOG } from './perfumes';

export const INITIAL_ORDERS: OrderDetails[] = [
  {
    orderId: 'ELY-98234',
    orderDate: '2026-07-28 10:30 AM',
    customerName: 'Aarav Sharma',
    email: 'aarav.sharma@example.com',
    phone: '+91 98765 43210',
    address: '42 Lotus Boulevard, Sector 107',
    city: 'Noida',
    state: 'Uttar Pradesh',
    pincode: '201301',
    billingAddress: '42 Lotus Boulevard, Sector 107, Noida, UP - 201301',
    paymentMethod: 'UPI',
    paymentStatus: 'Paid',
    items: [
      {
        product: PERFUMES_CATALOG[0] || {
          id: 'elysian-oud-imperiale',
          name: 'Oud Imperiale Extrait',
          subTitle: 'Royal Assam Oud & Damask Rose',
          tagline: 'Regal Sillage',
          gender: 'Unisex',
          collection: 'Signature',
          defaultPrice: 899,
          originalPrice: 1799,
          volumeOptions: [{ size: '100ml', price: 899 }],
          rating: 4.9,
          reviewsCount: 342,
          image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop',
          gallery: [],
          topNotes: ['Calabrian Bergamot', 'Cardamom'],
          heartNotes: ['French Damask Rose', 'Jasmine'],
          baseNotes: ['Assam Oud', 'Amberwood'],
          accords: [],
          description: 'Opulent extrait.',
          story: 'Regal story.',
          longevity: '14 Hours',
          sillage: 'Heavy',
          intensity: 'Extrait Strength',
          bestFor: 'Evening Galas'
        },
        selectedSize: '100ml Extrait',
        price: 899,
        quantity: 1
      },
      {
        product: PERFUMES_CATALOG[1] || {
          id: 'elysian-santal-blanc',
          name: 'Santal Blanc',
          subTitle: 'Mysore Sandalwood & Creamy Iris',
          tagline: 'Timeless Elegance',
          gender: 'Unisex',
          collection: 'Best Sellers',
          defaultPrice: 749,
          originalPrice: 1499,
          volumeOptions: [{ size: '100ml', price: 749 }],
          rating: 4.8,
          reviewsCount: 210,
          image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=800&auto=format&fit=crop',
          gallery: [],
          topNotes: ['Cardamom', 'Violet'],
          heartNotes: ['Iris', 'Papyrus'],
          baseNotes: ['Sandalwood', 'Cedar'],
          accords: [],
          description: 'Creamy sandalwood.',
          story: 'Story.',
          longevity: '12 Hours',
          sillage: 'Moderate',
          intensity: 'Extrait Strength',
          bestFor: 'Daily Luxury'
        },
        selectedSize: '50ml Extrait',
        price: 499,
        quantity: 1
      }
    ],
    subtotal: 1398,
    discount: 100,
    couponCode: 'EXTRAIT100',
    shipping: 0,
    gstAmount: 233,
    total: 1298,
    status: 'Out For Delivery',
    courierPartner: 'Delhivery Express Air',
    trackingNumber: 'DEL-8829103948',
    estimatedDelivery: 'Today by 6:00 PM',
    deliveryInstructions: 'Please call before delivery. Gate passcode #4021.',
    canCancel: false,
    canReturn: false,
    trackingTimeline: [
      {
        step: 'Order Placed',
        label: 'Order Confirmed & Paid via UPI',
        location: 'ELYSIAN Online Atelier',
        timestamp: 'July 28, 08:30 AM',
        completed: true,
        current: false
      },
      {
        step: 'Confirmed',
        label: 'Quality Inspected & Batch Verified',
        location: 'Master Perfumer Vault, Noida',
        timestamp: 'July 28, 09:15 AM',
        completed: true,
        current: false
      },
      {
        step: 'Packed',
        label: 'Sealed in Velvet Velvet Box with Gold Seal',
        location: 'Fulfilment Center #1',
        timestamp: 'July 28, 10:45 AM',
        completed: true,
        current: false
      },
      {
        step: 'Shipped',
        label: 'Handed over to Air Freight Courier',
        location: 'Delhivery Air Hub, IGI Airport',
        timestamp: 'July 28, 01:20 PM',
        completed: true,
        current: false
      },
      {
        step: 'Out For Delivery',
        label: 'In Transit with Delivery Agent (Ramesh K.)',
        location: 'Bandra West Local Delivery Hub',
        timestamp: 'July 28, 03:45 PM',
        completed: true,
        current: true
      },
      {
        step: 'Delivered',
        label: 'Package Signed & Delivered',
        location: 'Shipping Address',
        timestamp: 'Pending',
        completed: false,
        current: false
      }
    ]
  },
  {
    orderId: 'ELY-98233',
    orderDate: '2026-07-27 03:15 PM',
    customerName: 'Aarav Sharma',
    email: 'aarav.sharma@example.com',
    phone: '+91 98765 43210',
    address: '42 Lotus Boulevard, Sector 107',
    city: 'Noida',
    state: 'Uttar Pradesh',
    pincode: '201301',
    billingAddress: '42 Lotus Boulevard, Sector 107, Noida, UP - 201301',
    paymentMethod: 'Google Pay',
    paymentStatus: 'Paid',
    items: [
      {
        product: PERFUMES_CATALOG[2] || {
          id: 'elysian-velvet-rose',
          name: 'Velvet Rose & Tonka',
          subTitle: 'French Damask Rose & Roasted Tonka',
          tagline: 'Seductive Radiance',
          gender: 'Women',
          collection: 'Signature',
          defaultPrice: 799,
          originalPrice: 1599,
          volumeOptions: [{ size: '100ml', price: 799 }],
          rating: 4.9,
          reviewsCount: 188,
          image: 'https://images.unsplash.com/photo-1583445013765-46c20c4a6772?q=80&w=800&auto=format&fit=crop',
          gallery: [],
          topNotes: ['Clove', 'Bergamot'],
          heartNotes: ['Damask Rose'],
          baseNotes: ['Tonka Bean', 'Amber'],
          accords: [],
          description: 'Seductive rose.',
          story: 'Story.',
          longevity: '14 Hours',
          sillage: 'Heavy',
          intensity: 'Extrait Strength',
          bestFor: 'Dates'
        },
        selectedSize: '100ml Extrait',
        price: 799,
        quantity: 1
      }
    ],
    subtotal: 799,
    discount: 50,
    shipping: 0,
    gstAmount: 135,
    total: 749,
    status: 'Delivered',
    courierPartner: 'BlueDart Air Express',
    trackingNumber: 'BD-993019284',
    estimatedDelivery: 'Delivered on July 28',
    canCancel: false,
    canReturn: true,
    trackingTimeline: [
      { step: 'Order Placed', label: 'Order Confirmed', timestamp: 'July 27, 03:15 PM', completed: true, current: false },
      { step: 'Confirmed', label: 'Batch Verified', timestamp: 'July 27, 04:00 PM', completed: true, current: false },
      { step: 'Packed', label: 'Gold Ribbon Sealed', timestamp: 'July 27, 05:30 PM', completed: true, current: false },
      { step: 'Shipped', label: 'BlueDart Air Hub', timestamp: 'July 27, 08:00 PM', completed: true, current: false },
      { step: 'Out For Delivery', label: 'Out for Delivery', timestamp: 'July 28, 09:00 AM', completed: true, current: false },
      { step: 'Delivered', label: 'Delivered to Customer', timestamp: 'July 28, 01:15 PM', completed: true, current: true }
    ]
  },
  {
    orderId: 'ELY-98232',
    orderDate: '2026-07-28 02:00 PM',
    customerName: 'Aarav Sharma',
    email: 'aarav.sharma@example.com',
    phone: '+91 98765 43210',
    address: '42 Lotus Boulevard, Sector 107',
    city: 'Noida',
    state: 'Uttar Pradesh',
    pincode: '201301',
    paymentMethod: 'Cash on Delivery',
    paymentStatus: 'Pending',
    items: [
      {
        product: PERFUMES_CATALOG[3] || {
          id: 'elysian-soleil-dor',
          name: 'Soleil D\'Or',
          subTitle: 'Calabrian Bergamot & Coconut Water',
          tagline: 'Radiant Citrus Aura',
          gender: 'Unisex',
          collection: 'Best Sellers',
          defaultPrice: 699,
          originalPrice: 1399,
          volumeOptions: [{ size: '100ml', price: 699 }],
          rating: 4.7,
          reviewsCount: 145,
          image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=800&auto=format&fit=crop',
          gallery: [],
          topNotes: ['Bergamot', 'Neroli'],
          heartNotes: ['Coconut Water', 'Jasmine'],
          baseNotes: ['Musk', 'Amber'],
          accords: [],
          description: 'Sunny citrus.',
          story: 'Story.',
          longevity: '12 Hours',
          sillage: 'Moderate',
          intensity: 'Extrait Strength',
          bestFor: 'Daytime'
        },
        selectedSize: '100ml Extrait',
        price: 699,
        quantity: 1
      }
    ],
    subtotal: 699,
    discount: 0,
    shipping: 0,
    gstAmount: 125,
    total: 699,
    status: 'Confirmed',
    courierPartner: 'Delhivery Express',
    trackingNumber: 'DEL-99120485',
    estimatedDelivery: 'Tomorrow, July 29',
    canCancel: true,
    canReturn: false,
    trackingTimeline: [
      { step: 'Order Placed', label: 'COD Order Received', timestamp: 'July 28, 02:00 PM', completed: true, current: false },
      { step: 'Confirmed', label: 'Order Confirmed via OTP', timestamp: 'July 28, 02:05 PM', completed: true, current: true },
      { step: 'Packed', label: 'Awaiting Packing', timestamp: 'Pending', completed: false, current: false },
      { step: 'Shipped', label: 'Courier Dispatch', timestamp: 'Pending', completed: false, current: false },
      { step: 'Out For Delivery', label: 'Local Courier Delivery', timestamp: 'Pending', completed: false, current: false },
      { step: 'Delivered', label: 'Delivery & COD Payment', timestamp: 'Pending', completed: false, current: false }
    ]
  },
  {
    orderId: 'ELY-98231',
    orderDate: '2026-07-20 11:00 AM',
    customerName: 'Aarav Sharma',
    email: 'aarav.sharma@example.com',
    phone: '+91 98765 43210',
    address: '42 Lotus Boulevard, Sector 107',
    city: 'Noida',
    state: 'Uttar Pradesh',
    pincode: '201301',
    paymentMethod: 'UPI',
    paymentStatus: 'Refunded',
    items: [
      {
        product: PERFUMES_CATALOG[4] || {
          id: 'elysian-discovery-set',
          name: 'Mini Discovery Sampler Set',
          subTitle: '5x2ml Extrait Sampler Vials',
          tagline: 'Sample All 5 Bestsellers',
          gender: 'Unisex',
          collection: 'Gift Sets',
          defaultPrice: 199,
          originalPrice: 399,
          volumeOptions: [{ size: '5x2ml Vials', price: 199 }],
          rating: 4.9,
          reviewsCount: 520,
          image: 'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?q=80&w=800&auto=format&fit=crop',
          gallery: [],
          topNotes: ['Oud', 'Sandalwood', 'Rose'],
          heartNotes: ['Bergamot', 'Vanilla'],
          baseNotes: ['Amber'],
          accords: [],
          description: 'Sampler set.',
          story: 'Story.',
          longevity: '14 Hours',
          sillage: 'Strong',
          intensity: 'Extrait Strength',
          bestFor: 'Gifting'
        },
        selectedSize: '5x2ml Sampler',
        price: 199,
        quantity: 2
      }
    ],
    subtotal: 398,
    discount: 0,
    shipping: 50,
    gstAmount: 80,
    total: 448,
    status: 'Returned',
    courierPartner: 'DTDC Air Courier',
    trackingNumber: 'DT-33829104',
    estimatedDelivery: 'Returned on July 23',
    canCancel: false,
    canReturn: false,
    returnRequest: {
      id: 'RET-8819',
      orderId: 'ELY-98231',
      productId: 'elysian-discovery-set',
      productName: 'Mini Discovery Sampler Set',
      productImage: 'https://images.unsplash.com/photo-1616949755610-8c9bbc08f138?q=80&w=800&auto=format&fit=crop',
      reason: 'Wrong Scent / Size',
      comments: 'Wanted full 100ml bottle instead of sampler vials.',
      requestType: 'Return & Refund',
      status: 'Completed',
      refundAmount: 448,
      requestedAt: '2026-07-22',
      updatedAt: '2026-07-24'
    },
    trackingTimeline: [
      { step: 'Order Placed', label: 'Order Confirmed', timestamp: 'July 20, 11:00 AM', completed: true, current: false },
      { step: 'Delivered', label: 'Delivered on July 21', timestamp: 'July 21, 02:00 PM', completed: true, current: false },
      { step: 'Returned', label: 'Return Picked Up & Inspected', timestamp: 'July 23, 11:30 AM', completed: true, current: false },
      { step: 'Refunded', label: 'Full Refund ₹448 Credited via UPI', timestamp: 'July 24, 01:00 PM', completed: true, current: true }
    ]
  }
];

export const getStoredOrders = (): OrderDetails[] => {
  const saved = localStorage.getItem('elysian_user_orders');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error('Error parsing stored orders:', e);
    }
  }
  return INITIAL_ORDERS;
};

export const saveOrdersToStorage = (orders: OrderDetails[]) => {
  localStorage.setItem('elysian_user_orders', JSON.stringify(orders));
};
