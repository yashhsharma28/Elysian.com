import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  FolderTree,
  Sparkles,
  Users,
  Star,
  Boxes,
  Ticket,
  Gift,
  Mail,
  Bot,
  BarChart3,
  TrendingUp,
  CreditCard,
  Truck,
  RotateCcw,
  MessageSquare,
  Bell,
  Settings,
  Image as ImageIcon,
  BookOpen,
  FileText,
  HelpCircle,
  UserCheck,
  ShieldAlert,
  History,
  Database,
  Plug,
  LogOut,
  Search,
  Menu,
  X,
  ChevronRight,
  ExternalLink,
  Lock,
  Plus,
  CheckCircle2,
  Clock,
  DollarSign
} from 'lucide-react';

import { OverviewView } from './views/OverviewView';
import { ProductsView } from './views/ProductsView';
import { OrdersView } from './views/OrdersView';
import { CustomersView } from './views/CustomersView';
import { CouponsView } from './views/CouponsView';
import { NewsletterView } from './views/NewsletterView';
import { AiAssistantView } from './views/AiAssistantView';
import { SettingsView } from './views/SettingsView';
import { AnalyticsView } from './views/AnalyticsView';
import { SupportTicketsView } from './views/SupportTicketsView';
import { TeamView } from './views/TeamView';

import { HeroCmsManager } from './HeroCmsManager';

export type AdminViewType =
  | 'dashboard'
  | 'orders'
  | 'products'
  | 'categories'
  | 'collections'
  | 'customers'
  | 'reviews'
  | 'inventory'
  | 'coupons'
  | 'giftcards'
  | 'newsletter'
  | 'ai_assistant'
  | 'analytics'
  | 'sales_reports'
  | 'revenue'
  | 'shipping'
  | 'payments'
  | 'returns'
  | 'tickets'
  | 'notifications'
  | 'settings'
  | 'media'
  | 'blog'
  | 'faqs'
  | 'team'
  | 'roles'
  | 'audit_logs'
  | 'backup'
  | 'integrations'
  | 'hero_cms';

interface AdminDashboardProps {
  onBackToStore: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToStore }) => {
  const [currentView, setCurrentView] = useState<AdminViewType>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [adminRole, setAdminRole] = useState<'Master Owner' | 'Store Manager' | 'Inventory Specialist'>('Master Owner');

  // Simulated System Notifications
  const [notifications, setNotifications] = useState([
    { id: '1', title: 'Low Stock Alert', msg: 'Aura De Soir (50ml) is down to 4 units', time: '5m ago', type: 'warning', read: false },
    { id: '2', title: 'New High-Value Order', msg: 'Order #ELY-9821 received (₹2,490 via UPI)', time: '12m ago', type: 'success', read: false },
    { id: '3', title: 'Refund Request', msg: 'Customer requested return for Order #ELY-9780', time: '1h ago', type: 'error', read: false },
    { id: '4', title: 'Newsletter Club', msg: '128 new subscribers joined in the last 24h', time: '3h ago', type: 'info', read: true },
  ]);

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const menuGroups = [
    {
      group: 'Core Management',
      items: [
        { id: 'dashboard' as AdminViewType, label: 'Dashboard', icon: LayoutDashboard, badge: null },
        { id: 'orders' as AdminViewType, label: 'Orders', icon: ShoppingBag, badge: '8 New' },
        { id: 'products' as AdminViewType, label: 'Products & Extraits', icon: Package, badge: '12' },
        { id: 'inventory' as AdminViewType, label: 'Inventory & Stock', icon: Boxes, badge: '3 Low' },
        { id: 'customers' as AdminViewType, label: 'Customers', icon: Users, badge: null },
      ]
    },
    {
      group: 'Website Management',
      items: [
        { id: 'hero_cms' as AdminViewType, label: 'Hero Section', icon: Sparkles, badge: 'CMS' },
        { id: 'hero_cms' as AdminViewType, label: 'Announcement Bar', icon: Bell, badge: null },
        { id: 'products' as AdminViewType, label: 'Featured Collections', icon: FolderTree, badge: null },
        { id: 'products' as AdminViewType, label: 'Best Sellers', icon: Star, badge: null },
        { id: 'coupons' as AdminViewType, label: 'Offer Banner', icon: Ticket, badge: null },
        { id: 'tickets' as AdminViewType, label: 'Testimonials', icon: MessageSquare, badge: null },
        { id: 'newsletter' as AdminViewType, label: 'Newsletter', icon: Mail, badge: null },
        { id: 'settings' as AdminViewType, label: 'Footer', icon: Settings, badge: null },
      ]
    },
    {
      group: 'Marketing & Sales',
      items: [
        { id: 'coupons' as AdminViewType, label: 'Coupons & Offers', icon: Ticket, badge: 'Active' },
        { id: 'newsletter' as AdminViewType, label: 'Newsletter Club', icon: Mail, badge: '28.5k' },
        { id: 'ai_assistant' as AdminViewType, label: 'AI Copy & Sommelier', icon: Bot, badge: 'GenAI' },
        { id: 'analytics' as AdminViewType, label: 'Analytics & Revenue', icon: BarChart3, badge: null },
      ]
    },
    {
      group: 'Support & Content',
      items: [
        { id: 'tickets' as AdminViewType, label: 'Support & FAQs', icon: MessageSquare, badge: '2 Open' },
        { id: 'settings' as AdminViewType, label: 'Website Settings', icon: Settings, badge: null },
        { id: 'team' as AdminViewType, label: 'Team & Security', icon: UserCheck, badge: null },
      ]
    }
  ];

  const renderActiveView = () => {
    switch (currentView) {
      case 'dashboard':
        return <OverviewView onNavigate={(view) => setCurrentView(view as AdminViewType)} />;
      case 'hero_cms':
        return <HeroCmsManager />;
      case 'products':
      case 'inventory':
      case 'categories':
      case 'collections':
        return <ProductsView />;
      case 'orders':
      case 'returns':
      case 'shipping':
      case 'payments':
        return <OrdersView />;
      case 'customers':
        return <CustomersView />;
      case 'coupons':
      case 'giftcards':
        return <CouponsView />;
      case 'newsletter':
        return <NewsletterView />;
      case 'ai_assistant':
        return <AiAssistantView />;
      case 'settings':
      case 'media':
        return <SettingsView />;
      case 'analytics':
      case 'sales_reports':
      case 'revenue':
        return <AnalyticsView />;
      case 'tickets':
      case 'faqs':
      case 'reviews':
        return <SupportTicketsView />;
      case 'team':
      case 'roles':
      case 'audit_logs':
      case 'backup':
      case 'integrations':
        return <TeamView />;
      default:
        return <OverviewView onNavigate={(view) => setCurrentView(view as AdminViewType)} />;
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="min-h-screen bg-[#F8F6F2] text-[#1F1F1F] font-inter flex flex-col lg:flex-row antialiased">

      {/* MOBILE SIDEBAR OVERLAY */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* SIDEBAR NAVIGATION */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-72 bg-[#171717] text-[#F8F6F2] border-r border-[#333333] z-50 flex flex-col justify-between transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Top Header Logo */}
        <div className="p-6 border-b border-[#2A2A2A] flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-cormorant text-2xl font-bold tracking-[0.2em] text-white uppercase">
                ELYSIAN
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8A24A]"></span>
            </div>
            <span className="text-[9px] font-montserrat uppercase tracking-[0.25em] text-[#C8A24A] font-semibold pt-0.5">
              HAUTE PARFUMERIE ADMIN
            </span>
          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1.5 text-gray-400 hover:text-white rounded-md cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Navigation Items */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 no-scrollbar">
          {menuGroups.map((group, idx) => (
            <div key={idx} className="space-y-2">
              <h4 className="px-3 text-[10px] font-montserrat uppercase tracking-[0.2em] font-bold text-[#888888]">
                {group.group}
              </h4>

              <div className="space-y-1">
                {group.items.map((item) => {
                  const IconComp = item.icon;
                  const isActive = currentView === item.id;
                  return (
                    <button
                      key={`${group.group}-${item.label}`}
                      onClick={() => {
                        setCurrentView(item.id);
                        setSidebarOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-montserrat uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#C8A24A] text-[#1F1F1F] shadow-md font-bold'
                          : 'text-gray-300 hover:bg-[#262626] hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <IconComp size={16} className={isActive ? 'text-[#1F1F1F]' : 'text-[#C8A24A]'} />
                        <span>{item.label}</span>
                      </div>

                      {item.badge && (
                        <span
                          className={`text-[9px] px-2 py-0.5 rounded-full font-extrabold ${
                            isActive
                              ? 'bg-[#1F1F1F] text-[#C8A24A]'
                              : 'bg-[#C8A24A]/20 text-[#C8A24A] border border-[#C8A24A]/40'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar Footer - Admin Profile & Switch back to Store */}
        <div className="p-4 border-t border-[#2A2A2A] bg-[#121212] space-y-3">
          
          <div className="flex items-center justify-between bg-[#1A1A1A] p-2.5 rounded-xl border border-[#333333]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#C8A24A] text-[#1F1F1F] font-bold flex items-center justify-center text-xs">
                EA
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-white leading-tight">Elysian Admin</span>
                <span className="text-[10px] text-[#C8A24A] font-semibold">{adminRole}</span>
              </div>
            </div>

            <Lock size={14} className="text-[#C8A24A]" />
          </div>

          <button
            onClick={onBackToStore}
            className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20 py-2.5 rounded-xl text-xs font-montserrat uppercase tracking-wider font-bold transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
          >
            <ExternalLink size={14} className="text-[#C8A24A]" />
            <span>Return to Live Store</span>
          </button>
        </div>

      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0">

        {/* TOPBAR */}
        <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-[#E8E2D7] px-4 sm:px-8 py-4 flex items-center justify-between gap-4 shadow-sm">
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-[#1F1F1F] hover:bg-[#F8F6F2] rounded-lg cursor-pointer"
              aria-label="Open Sidebar"
            >
              <Menu size={22} />
            </button>

            <div className="hidden sm:flex items-center gap-2 text-xs font-montserrat uppercase tracking-wider text-gray-400">
              <span>Admin</span>
              <ChevronRight size={14} />
              <span className="text-[#1F1F1F] font-bold capitalize">{currentView.replace('_', ' ')}</span>
            </div>
          </div>

          {/* Search & Top Action Icons */}
          <div className="flex items-center gap-3">

            {/* Quick Search Field */}
            <div className="relative hidden md:block w-64">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search orders, SKU, customers..."
                className="w-full bg-[#F8F6F2] border border-[#E8E2D7] rounded-full pl-9 pr-4 py-2 text-xs font-inter focus:outline-none focus:border-[#C8A24A] transition-all"
              />
            </div>

            {/* Role Switcher Pill */}
            <select
              value={adminRole}
              onChange={(e) => setAdminRole(e.target.value as any)}
              className="hidden sm:block bg-[#F8F6F2] border border-[#E8E2D7] text-xs font-montserrat font-bold text-[#1F1F1F] rounded-full px-3 py-2 cursor-pointer focus:outline-none"
            >
              <option value="Master Owner">Master Owner</option>
              <option value="Store Manager">Store Manager</option>
              <option value="Inventory Specialist">Inventory Specialist</option>
            </select>

            {/* Notification Bell Dropdown */}
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-2.5 bg-[#F8F6F2] hover:bg-[#E8E2D7] text-[#1F1F1F] rounded-full relative transition-all cursor-pointer"
                aria-label="Notifications"
              >
                <Bell size={18} />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 bg-[#C8A24A] text-[#1F1F1F] text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-extrabold border-2 border-white">
                    {unreadCount}
                  </span>
                )}
              </button>

              <AnimatePresence>
                {notificationsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-3 w-80 sm:w-96 bg-white border border-[#E8E2D7] rounded-2xl shadow-2xl p-4 z-50 space-y-3"
                  >
                    <div className="flex items-center justify-between border-b border-[#F4F1EA] pb-3">
                      <div className="flex items-center gap-2">
                        <Bell size={16} className="text-[#C8A24A]" />
                        <h4 className="font-montserrat text-xs uppercase tracking-wider font-bold text-[#1F1F1F]">
                          System Alerts
                        </h4>
                      </div>
                      <button
                        onClick={markAllNotificationsRead}
                        className="text-[10px] font-montserrat uppercase font-bold text-[#C8A24A] hover:underline cursor-pointer"
                      >
                        Mark all read
                      </button>
                    </div>

                    <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                      {notifications.map((n) => (
                        <div
                          key={n.id}
                          className={`p-3 rounded-xl border text-xs font-inter space-y-1 transition-all ${
                            n.read ? 'bg-[#F8F6F2]/60 border-[#E8E2D7]' : 'bg-white border-[#C8A24A]/60 shadow-sm'
                          }`}
                        >
                          <div className="flex items-center justify-between font-montserrat font-bold">
                            <span className="text-[#1F1F1F]">{n.title}</span>
                            <span className="text-[10px] text-gray-400 font-normal">{n.time}</span>
                          </div>
                          <p className="text-[#555555] font-light">{n.msg}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Back to Live Store Button */}
            <button
              onClick={onBackToStore}
              className="bg-[#1F1F1F] text-[#C8A24A] hover:bg-[#C8A24A] hover:text-[#1F1F1F] border border-[#C8A24A] px-4 py-2 rounded-full text-xs font-montserrat uppercase tracking-wider font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
            >
              <span>View Store</span>
              <ExternalLink size={14} />
            </button>

          </div>

        </header>

        {/* VIEW CONTAINER */}
        <main className="flex-1 p-4 sm:p-8 overflow-x-hidden">
          {renderActiveView()}
        </main>

      </div>

    </div>
  );
};
