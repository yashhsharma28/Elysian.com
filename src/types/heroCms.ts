export interface HeroTrustBadge {
  id: string;
  icon: string;
  title: string;
  description: string;
  color: string;
  displayOrder: number;
  enabled: boolean;
}

export interface HeroStatCard {
  id: string;
  number: string;
  suffix: string;
  title: string;
  color: string;
  displayOrder: number;
  enabled: boolean;
}

export interface HeroButtonConfig {
  enabled: boolean;
  text: string;
  link: string;
  style: 'solid' | 'outline' | 'ghost' | 'glass';
  backgroundColor: string;
  textColor: string;
  hoverBackgroundColor: string;
  hoverTextColor: string;
  borderRadius: string;
  iconName: string;
  openInNewTab: boolean;
  animation: 'none' | 'bounce' | 'pulse' | 'scale';
}

export interface HeroCmsConfig {
  // Announcement Bar
  announcementBar: {
    enabled: boolean;
    text: string;
    icon: string;
    backgroundColor: string;
    textColor: string;
    borderRadius: string;
    link: string;
  };

  // Main Heading
  mainHeading: {
    text: string;
    highlightedText: string;
    textColor: string;
    highlightColor: string;
    fontFamily: string;
    fontSizeDesktop: string;
    fontSizeMobile: string;
    fontWeight: string;
    letterSpacing: string;
    lineHeight: string;
    alignment: 'left' | 'center' | 'right';
    animation: 'slide-left' | 'fade-in' | 'zoom-in' | 'reveal';
  };

  // Sub Heading
  subHeading: {
    text: string;
    textColor: string;
    fontFamily: string;
    fontSize: string;
    maxWidth: string;
    lineHeight: string;
    animation: 'slide-left' | 'fade-in' | 'none';
  };

  // Price Information
  priceInfo: {
    enabled: boolean;
    startingPrice: string;
    maxPrice: string;
    currencySymbol: string;
    priceBadgeText: string;
    badgeBackgroundColor: string;
    badgeTextColor: string;
  };

  // Trust Badges
  trustBadges: HeroTrustBadge[];

  // Buttons
  buttons: {
    primary: HeroButtonConfig;
    secondary: HeroButtonConfig;
    thirdLink: {
      enabled: boolean;
      text: string;
      url: string;
      underline: boolean;
      iconName: string;
    };
  };

  // Statistics Section
  statistics: HeroStatCard[];

  // Product Showcase Card
  productCard: {
    enabled: boolean;
    imageUrl: string;
    altText: string;
    productName: string;
    collectionName: string;
    category: string;
    price: string;
    oldPrice: string;
    discountBadge: string;
    description: string;
    buttonText: string;
    buttonLink: string;
    badgeEnabled: boolean;
    badgeText: string;
  };

  // Background Settings
  background: {
    type: 'solid' | 'gradient' | 'image';
    backgroundColor: string;
    gradientStart: string;
    gradientEnd: string;
    imageUrl: string;
    overlayOpacity: number;
    blurAmount: number;
  };

  // SEO
  seo: {
    title: string;
    description: string;
    altText: string;
  };

  // Status Metadata
  publishedAt: string;
  lastEditedAt: string;
  version: number;
}
