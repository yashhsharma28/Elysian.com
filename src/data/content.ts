import { Article, Review } from '../types';

export const BRAND_TIMELINE = [
  {
    year: '1984',
    title: 'The Artisanal Atelier',
    description: 'Founded in Old Delhi as a private perfume house serving royal families with custom attars and hand-distilled botanical extraits.'
  },
  {
    year: '2012',
    title: 'Grasse Heritage Fusion',
    description: 'Collaborated with master nose perfumers from Grasse, France to bridge centuries-old Indian raw extraits with modern French haute parfumerie.'
  },
  {
    year: '2024',
    title: 'Democratizing Luxury',
    description: 'Launched the ELYSIAN contemporary collection — engineering luxury Extrait de Parfum at accessible Indian prices (all under ₹1000).'
  },
  {
    year: 'Present',
    title: 'Crafted for the Extraordinary',
    description: 'Serving over 100,000 discerning perfume connoisseurs across India with eco-conscious refillable bottles and cruelty-free formulas.'
  }
];

export const BRAND_VALUES = [
  {
    icon: 'Sparkles',
    title: 'High Concentration Extrait',
    description: 'Formulated at 25–30% fragrance oil concentration for 12+ hours of lingering presence.'
  },
  {
    icon: 'Feather',
    title: 'Ethical Sourcing',
    description: '100% Cruelty-free, IFRA certified ingredients, sustainably harvested woods and flowers.'
  },
  {
    icon: 'ShieldCheck',
    title: 'Indian Luxury Pricing',
    description: 'Direct-to-connoisseur craftsmanship eliminating 80% traditional retail markups.'
  },
  {
    icon: 'Truck',
    title: 'Express Pan-India Delivery',
    description: 'Complimentary insured shipping on all orders above ₹499 with 3–7 day delivery.'
  }
];

export const CUSTOMER_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Vikramaditya S.',
    location: 'Mumbai, Maharashtra',
    rating: 5,
    date: '3 days ago',
    perfumeName: 'Oud Imperiale Extrait',
    title: 'Smells exactly like a ₹25,000 luxury niche perfume!',
    comment: 'I own bottles from Creed and Tom Ford. Oud Imperiale easily rivals them. Lasted 15 hours on my blazer during a wedding. The rose and smoked oud projection is unreal for ₹899!',
    scentProjection: 'Huge (6+ ft sillage)',
    verifiedPurchase: true
  },
  {
    id: 'rev-2',
    author: 'Ananya R.',
    location: 'Bengaluru, Karnataka',
    rating: 5,
    date: '1 week ago',
    perfumeName: 'Santal Blanc',
    title: 'My absolute daily signature scent now',
    comment: 'Santal Blanc is so buttery, creamy, and sophisticated. Everyone at my tech office asked what I was wearing! So happy I got it for ₹749.',
    scentProjection: 'Moderate & Alluring',
    verifiedPurchase: true
  },
  {
    id: 'rev-3',
    author: 'Devansh K.',
    location: 'Delhi NCR',
    rating: 5,
    date: '2 weeks ago',
    perfumeName: 'Baccarat Royale 540',
    title: 'The saffron and amberwood aura is magical',
    comment: 'Gets compliments every single time. It has that airy golden metallic sweetness that hangs in the room. Delivery took 3 days to Delhi.',
    scentProjection: 'Hypnotic',
    verifiedPurchase: true
  },
  {
    id: 'rev-4',
    author: 'Meera Nair',
    location: 'Kochi, Kerala',
    rating: 5,
    date: '3 weeks ago',
    perfumeName: 'Elysian Grand Coffret Gift Box',
    title: 'The most impressive gift packaging ever',
    comment: 'Gifted this to my husband for our anniversary. The ivory box and gold ribbon look like ₹5,000 luxury packaging. Unbelievable value for ₹999.',
    scentProjection: 'Immense',
    verifiedPurchase: true
  }
];

export const JOURNAL_ARTICLES: Article[] = [
  {
    id: 'art-1',
    title: 'The Architecture of Olfactory Layering',
    category: 'Scent Craft',
    date: 'July 15, 2026',
    readTime: '4 min read',
    excerpt: 'How to combine Santal Blanc and Velvet Rose to create a bespoke signature aura that lasts past midnight.',
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=800&auto=format&fit=crop',
    author: 'Master Perfumer Pierre & Kabir'
  },
  {
    id: 'art-2',
    title: 'Understanding Extrait de Parfum vs Eau de Parfum',
    category: 'Guide',
    date: 'June 28, 2026',
    readTime: '5 min read',
    excerpt: 'Why concentration matters: How 30% pure fragrance oil creates longer sillage without harsh alcohol sharp tones.',
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=800&auto=format&fit=crop',
    author: 'ELYSIAN Olfactory Team'
  },
  {
    id: 'art-3',
    title: 'Assam Oud: The Liquid Gold of Ancient India',
    category: 'Heritage',
    date: 'June 10, 2026',
    readTime: '6 min read',
    excerpt: 'A deep dive into the sustainable resin harvesting of Assam Aquilaria trees and its timeless place in global luxury.',
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=800&auto=format&fit=crop',
    author: 'Dr. S. Mukherjee, Botanical Historian'
  }
];

export const FAQS = [
  {
    q: 'Are ELYSIAN perfumes long-lasting on Indian skin and weather?',
    a: 'Yes! All ELYSIAN fragrances are formulated at Extrait de Parfum or High Intense strength (25–30% perfume oil concentration), specifically engineered to withstand warm Indian climates for 12 to 18 hours.'
  },
  {
    q: 'Are all product prices guaranteed to be under ₹1000?',
    a: 'Absolutely. We believe true luxury should be accessible. Our entire catalog — from 30ml bottles (₹299-₹449) to 100ml Extraits (₹699-₹999) and Luxury Gift Coffrets — is strictly priced below ₹999.'
  },
  {
    q: 'What shipping options and delivery times do you offer across India?',
    a: 'We offer Free Shipping on all orders above ₹499. Standard shipping across India takes 3–7 business days via priority air courier (BlueDart, Delhivery, Expressbees). Tracked with live SMS updates.'
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We support all major Indian payment channels: UPI (Google Pay, PhonePe, Paytm, BHIM), Credit/Debit Cards (Visa, MasterCard, RuPay), Net Banking across 50+ banks, and Cash on Delivery (COD).'
  },
  {
    q: 'Can I try samples before buying a full 100ml bottle?',
    a: 'Yes! We recommend our Mini Discovery Set (₹199), which includes five 2ml spray vials of our top bestsellers and comes with a ₹200 voucher redeemable on your next full bottle.'
  }
];
