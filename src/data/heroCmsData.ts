import { HeroCmsConfig } from '../types/heroCms';

export const DEFAULT_HERO_CMS_CONFIG: HeroCmsConfig = {
  announcementBar: {
    enabled: true,
    text: 'Extrait De Parfum • Small Artisanal Batches • All Under ₹1000',
    icon: 'Sparkles',
    backgroundColor: '#F4F1EA',
    textColor: '#C8A24A',
    borderRadius: '9999px',
    link: '#section-shop',
  },

  mainHeading: {
    text: 'Crafted for the',
    highlightedText: 'Extraordinary.',
    textColor: '#1F1F1F',
    highlightColor: '#C8A24A',
    fontFamily: 'Cormorant Garamond',
    fontSizeDesktop: '4.25rem',
    fontSizeMobile: '2.5rem',
    fontWeight: '300',
    letterSpacing: '-0.02em',
    lineHeight: '1.08',
    alignment: 'left',
    animation: 'slide-left',
  },

  subHeading: {
    text: 'Haute parfumerie distilled in small artisanal batches. Unrivaled 30% oil concentration for 16-hour projection — bringing world-class luxury to the discerning Indian connoisseur.',
    textColor: '#666666',
    fontFamily: 'Inter',
    fontSize: '1.125rem',
    maxWidth: '36rem',
    lineHeight: '1.625',
    animation: 'slide-left',
  },

  priceInfo: {
    enabled: true,
    startingPrice: '299',
    maxPrice: '999',
    currencySymbol: '₹',
    priceBadgeText: 'Max ₹999',
    badgeBackgroundColor: '#EFE8DC',
    badgeTextColor: '#C8A24A',
  },

  trustBadges: [
    {
      id: 'tb-1',
      icon: 'ShieldCheck',
      title: '100% Authentic Extrait',
      description: 'Handcrafted in Atelier Vault',
      color: '#C8A24A',
      displayOrder: 1,
      enabled: true,
    },
    {
      id: 'tb-2',
      icon: 'Sparkles',
      title: '30% Oil Concentration',
      description: 'Haute Parfumerie Quality',
      color: '#C8A24A',
      displayOrder: 2,
      enabled: true,
    },
    {
      id: 'tb-3',
      icon: 'Clock',
      title: '16+ Hours Projection',
      description: 'Tested in All Indian Climates',
      color: '#C8A24A',
      displayOrder: 3,
      enabled: true,
    },
  ],

  buttons: {
    primary: {
      enabled: true,
      text: 'Shop Fragrances',
      link: '#section-shop',
      style: 'solid',
      backgroundColor: '#C8A24A',
      textColor: '#1F1F1F',
      hoverBackgroundColor: '#1F1F1F',
      hoverTextColor: '#C8A24A',
      borderRadius: '9999px',
      iconName: 'ArrowRight',
      openInNewTab: false,
      animation: 'scale',
    },
    secondary: {
      enabled: true,
      text: 'Explore Collections',
      link: '#section-shop',
      style: 'outline',
      backgroundColor: '#FFFFFF',
      textColor: '#1F1F1F',
      hoverBackgroundColor: '#1F1F1F',
      hoverTextColor: '#C8A24A',
      borderRadius: '9999px',
      iconName: 'Sparkles',
      openInNewTab: false,
      animation: 'scale',
    },
    thirdLink: {
      enabled: true,
      text: 'Find Signature Scent',
      url: 'ai_sommelier',
      underline: true,
      iconName: 'Sparkles',
    },
  },

  statistics: [
    {
      id: 'stat-1',
      number: '30%',
      suffix: '',
      title: 'Perfume Oil Extrait',
      color: '#1F1F1F',
      displayOrder: 1,
      enabled: true,
    },
    {
      id: 'stat-2',
      number: '16+ Hrs',
      suffix: '',
      title: 'Unrivaled Longevity',
      color: '#1F1F1F',
      displayOrder: 2,
      enabled: true,
    },
    {
      id: 'stat-3',
      number: '100K+',
      suffix: '',
      title: 'Indian Connoisseurs',
      color: '#1F1F1F',
      displayOrder: 3,
      enabled: true,
    },
  ],

  productCard: {
    enabled: true,
    imageUrl: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1200&auto=format&fit=crop',
    altText: 'ELYSIAN Aura De Soir Luxury Extrait De Parfum',
    productName: 'Aura De Soir',
    collectionName: 'Royal Reserve Collection',
    category: 'Extrait De Parfum',
    price: '899',
    oldPrice: '1299',
    discountBadge: '30% OFF',
    description: 'A magnetic, warm amber night fragrance laced with Bulgarian Damask rose, Royal Assam oud, and smoked Madagascar vanilla.',
    buttonText: 'Buy Now',
    buttonLink: '#section-shop',
    badgeEnabled: true,
    badgeText: '✨ Royal Assam Oud & Rose',
  },

  background: {
    type: 'solid',
    backgroundColor: '#F8F6F2',
    gradientStart: '#F8F6F2',
    gradientEnd: '#EFE8DC',
    imageUrl: '',
    overlayOpacity: 0.1,
    blurAmount: 0,
  },

  seo: {
    title: 'ELYSIAN Luxury Perfumes | Crafted for the Extraordinary',
    description: 'Discover ELYSIAN - India’s premier haute parfumerie offering 30% Extrait de Parfum concentration under ₹1000 with 16+ hours longevity.',
    altText: 'ELYSIAN Haute Parfumerie Luxury Perfume Bottle',
  },

  publishedAt: new Date().toISOString(),
  lastEditedAt: new Date().toISOString(),
  version: 1,
};

const LOCAL_STORAGE_KEY = 'elysian_hero_cms_config';

export function getStoredHeroCmsConfig(): HeroCmsConfig {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (data) {
      return { ...DEFAULT_HERO_CMS_CONFIG, ...JSON.parse(data) };
    }
  } catch (e) {
    console.error('Failed to parse hero CMS config from localStorage', e);
  }
  return DEFAULT_HERO_CMS_CONFIG;
}

export function saveHeroCmsConfig(config: HeroCmsConfig): void {
  try {
    const updated = {
      ...config,
      lastEditedAt: new Date().toISOString(),
      publishedAt: new Date().toISOString(),
    };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
    // Dispatch custom window event so Hero component updates instantly
    window.dispatchEvent(new CustomEvent('elysian_cms_updated', { detail: updated }));
  } catch (e) {
    console.error('Failed to save hero CMS config to localStorage', e);
  }
}
