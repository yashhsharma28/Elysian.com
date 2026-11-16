import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductGrid } from './components/ProductGrid';
import { ProductDetailView } from './components/ProductDetailView';
import { QuickViewModal } from './components/QuickViewModal';
import { FragrancePyramid } from './components/FragrancePyramid';
import { IngredientsSection } from './components/IngredientsSection';
import { BrandStorySection } from './components/BrandStorySection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { JournalSection } from './components/JournalSection';
import { ElysianAiAssistant } from './components/ai/ElysianAiAssistant';
import { ElysianAiFloatingButton } from './components/ai/ElysianAiFloatingButton';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CompareModal } from './components/CompareModal';
import { SearchModal } from './components/SearchModal';
import { CheckoutModal } from './components/CheckoutModal';
import { FaqPage } from './components/FaqPage';
import { OfferBanner } from './components/OfferBanner';
import { NewsletterSection } from './components/NewsletterSection';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { UserOrdersModal } from './components/orders/UserOrdersModal';
import { Footer } from './components/Footer';
import { BackToTop } from './components/BackToTop';
import { PERFUMES_CATALOG } from './data/perfumes';
import { CartItem, PerfumeProduct } from './types';

export function App() {
  // Navigation & View State
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProduct, setSelectedProduct] = useState<PerfumeProduct | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<PerfumeProduct | null>(null);
  const [isFaqView, setIsFaqView] = useState<boolean>(false);
  const [isAdminView, setIsAdminView] = useState<boolean>(false);

  // E-commerce Functional States
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<PerfumeProduct[]>([]);
  const [compareList, setCompareList] = useState<PerfumeProduct[]>([]);
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);

  // Overlay Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAiSommelierOpen, setIsAiSommelierOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [targetOrderId, setTargetOrderId] = useState<string | undefined>(undefined);

  const handleOpenOrders = (orderId?: string) => {
    setTargetOrderId(orderId);
    setIsOrdersOpen(true);
  };

  // Cart Handlers
  const handleAddToCart = (
    product: PerfumeProduct,
    selectedSize: string,
    price: number,
    quantity: number = 1
  ) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === selectedSize
      );

      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      }

      return [...prev, { product, selectedSize, price, quantity }];
    });
  };

  const handleUpdateCartQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(index);
      return;
    }
    setCartItems((prev) => {
      const updated = [...prev];
      updated[index].quantity = newQty;
      return updated;
    });
  };

  const handleRemoveCartItem = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  // Wishlist Handlers
  const handleToggleWishlist = (product: PerfumeProduct) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      }
      return [...prev, product];
    });
  };

  // Compare Handlers
  const handleToggleCompare = (product: PerfumeProduct) => {
    setCompareList((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      }
      if (prev.length >= 3) {
        alert('You can compare up to 3 fragrances simultaneously.');
        return prev;
      }
      return [...prev, product];
    });
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#F8F6F2] font-inter text-[#1F1F1F] selection:bg-[#C8A24A] selection:text-[#1F1F1F]">
      
      {isAdminView ? (
        /* Full Premium Admin Dashboard View */
        <div className="min-h-screen bg-[#F8F6F2]">
          {/* Top Banner to Exit Admin back to Store */}
          <div className="bg-[#171717] text-[#F8F6F2] py-2.5 px-6 text-xs font-montserrat tracking-wider flex items-center justify-between border-b border-[#C8A24A]/30">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C8A24A] animate-pulse"></span>
              <span className="font-bold text-[#C8A24A]">ELYSIAN ATELIER ADMIN PORTAL</span>
            </div>
            <button
              onClick={() => setIsAdminView(false)}
              className="bg-[#C8A24A] text-[#1F1F1F] hover:bg-[#F8F6F2] px-4 py-1.5 rounded-full font-bold text-[11px] uppercase tracking-wider transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
            >
              ← Return to Boutique Website
            </button>
          </div>

          <AdminDashboard />
        </div>
      ) : (
        <>
          {/* Top Fixed Sticky Navbar */}
          <Navbar
            cartCount={totalCartCount}
            wishlistCount={wishlist.length}
            compareCount={compareList.length}
            onOpenCart={() => setIsCartOpen(true)}
            onOpenWishlist={() => setIsWishlistOpen(true)}
            onOpenCompare={() => setIsCompareOpen(true)}
            onOpenSearch={() => setIsSearchOpen(true)}
            onOpenAiSommelier={() => setIsAiSommelierOpen(true)}
            onOpenOrders={() => handleOpenOrders()}
            onOpenFaq={() => {
              setIsFaqView(true);
              setSelectedProduct(null);
            }}
            onOpenAdmin={() => {
              setIsAdminView(true);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            activeTab={isFaqView ? 'faq' : 'home'}
            setActiveTab={(tab) => {
              if (tab !== 'faq') setIsFaqView(false);
            }}
          />

          {/* Main View Router with Smooth Elegant Page Transitions */}
          <main className="pt-20 overflow-hidden">
            <AnimatePresence mode="wait">
              {isFaqView ? (
                /* Dedicated FAQ Page View */
                <motion.div
                  key="faq-page"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <FaqPage
                    onBackToHome={() => {
                      setIsFaqView(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    onOpenAiSommelier={() => setIsAiSommelierOpen(true)}
                  />
                </motion.div>
              ) : selectedProduct ? (
                /* Full Product Detail View */
                <motion.div
                  key={`detail-${selectedProduct.id}`}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <ProductDetailView
                    product={selectedProduct}
                    allProducts={PERFUMES_CATALOG}
                    onBack={() => setSelectedProduct(null)}
                    onAddToCart={handleAddToCart}
                    onToggleWishlist={handleToggleWishlist}
                    onToggleCompare={handleToggleCompare}
                    isInWishlist={wishlist.some((p) => p.id === selectedProduct.id)}
                    isInCompare={compareList.some((p) => p.id === selectedProduct.id)}
                    onSelectProduct={(p) => {
                      setSelectedProduct(p);
                      setIsFaqView(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                  />
                </motion.div>
              ) : (
                /* Full E-Commerce Homepage Layout */
                <motion.div
                  key="homepage"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Editorial Hero Banner */}
                  <Hero
                    onExploreClick={() => {
                      const shopSec = document.getElementById('section-shop');
                      shopSec?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    onOpenAiSommelier={() => setIsAiSommelierOpen(true)}
                  />

                  {/* Promotional Offer Banner */}
                  <OfferBanner
                    onShopNow={() => {
                      const shopSec = document.getElementById('section-shop');
                      shopSec?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    onExploreCollection={() => {
                      const shopSec = document.getElementById('section-shop');
                      shopSec?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  />

                  {/* Catalog Grid with Filters */}
                  <ProductGrid
                    products={PERFUMES_CATALOG}
                    wishlist={wishlist}
                    compareList={compareList}
                    onQuickView={(p) => setQuickViewProduct(p)}
                    onToggleWishlist={handleToggleWishlist}
                    onToggleCompare={handleToggleCompare}
                    onAddToCart={(p, sz, prc) => handleAddToCart(p, sz, prc, 1)}
                    onSelectProduct={(p) => {
                      setSelectedProduct(p);
                      setIsFaqView(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                  />

                  {/* Raw Botanical Ingredients Section */}
                  <IngredientsSection />

                  {/* Brand Heritage & Story */}
                  <BrandStorySection />

                  {/* Verified Buyer Reviews & Testimonials */}
                  <TestimonialsSection />

                  {/* Editorial Scent Journal */}
                  <JournalSection />
                </motion.div>
              )}
            </AnimatePresence>
          </main>

          {/* Luxury ELYSIAN Club Newsletter Section */}
          <NewsletterSection onContinueShopping={() => {
            setIsFaqView(false);
            setSelectedProduct(null);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }} />

          {/* Global Footer */}
          <Footer
            onOpenFaq={() => {
              setIsFaqView(true);
              setSelectedProduct(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenAdmin={() => {
              setIsAdminView(true);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenCart={() => setIsCartOpen(true)}
            onOpenWishlist={() => setIsWishlistOpen(true)}
            onOpenOrders={(id) => handleOpenOrders(id)}
            onOpenShop={() => {
              setIsFaqView(false);
              setSelectedProduct(null);
              const el = document.getElementById('section-shop');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            onNavigateHome={() => {
              setIsFaqView(false);
              setSelectedProduct(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenAiSommelier={() => setIsAiSommelierOpen(true)}
          />
        </>
      )}

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        isInWishlist={!!quickViewProduct && wishlist.some((p) => p.id === quickViewProduct.id)}
        onSelectFullDetails={(p) => {
          setSelectedProduct(p);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* AI Assistant Floating Button & Modal */}
      {!isAdminView && (
        <ElysianAiFloatingButton
          onClick={() => setIsAiSommelierOpen(true)}
          isOpen={isAiSommelierOpen}
        />
      )}

      <ElysianAiAssistant
        isOpen={isAiSommelierOpen}
        onClose={() => setIsAiSommelierOpen(false)}
        allProducts={PERFUMES_CATALOG}
        onAddToCart={(p, sz, prc) => handleAddToCart(p, sz, prc, 1)}
        onSelectProduct={(p) => {
          setSelectedProduct(p);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onToggleWishlist={handleToggleWishlist}
        onOpenOrders={(id) => handleOpenOrders(id)}
        wishlist={wishlist}
      />

      {/* Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={(discount) => {
          setAppliedDiscount(discount);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveFromWishlist={handleToggleWishlist}
        onAddToCart={(p, sz, prc) => handleAddToCart(p, sz, prc, 1)}
      />

      {/* Side-by-Side Comparison Modal */}
      <CompareModal
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        compareList={compareList}
        onRemoveFromCompare={handleToggleCompare}
        onAddToCart={(p, sz, prc) => handleAddToCart(p, sz, prc, 1)}
      />

      {/* Search Overlay Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={PERFUMES_CATALOG}
        onSelectProduct={(p) => {
          setSelectedProduct(p);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Checkout Flow Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        discountAmount={appliedDiscount}
        onClearCart={() => setCartItems([])}
        onOpenOrders={(id) => handleOpenOrders(id)}
      />

      {/* User Orders & Order Tracking Dashboard Modal */}
      <UserOrdersModal
        isOpen={isOrdersOpen}
        onClose={() => {
          setIsOrdersOpen(false);
          setTargetOrderId(undefined);
        }}
        initialOrderId={targetOrderId}
      />

      {/* Floating Back To Top Button with Circular Reading Progress */}
      <BackToTop />

    </div>
  );
}

export default App;
