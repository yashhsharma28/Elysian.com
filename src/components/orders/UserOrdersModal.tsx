import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Search,
  Filter,
  Package,
  Truck,
  RotateCcw,
  CheckCircle2,
  Clock,
  Printer,
  ShoppingBag,
  Bell,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  XCircle,
  FileText
} from 'lucide-react';
import { OrderDetails, OrderStatus, ReturnRequest, OrderNotification } from '../../types';
import { getStoredOrders, saveOrdersToStorage } from '../../data/mockOrders';
import { fetchOrdersApi, submitReturnRequestApi, updateOrderApi } from '../../lib/ordersApi';
import { OrderDetailsModal } from './OrderDetailsModal';
import { ReturnRequestModal } from './ReturnRequestModal';
import { OrderNotificationsDrawer } from './OrderNotificationsDrawer';
import { InvoiceTemplate } from './InvoiceTemplate';
import { WriteReviewModal } from './WriteReviewModal';

interface UserOrdersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart?: (product: any, size: string) => void;
  initialOrderIdToOpen?: string;
}

export const UserOrdersModal: React.FC<UserOrdersModalProps> = ({
  isOpen,
  onClose,
  onAddToCart,
  initialOrderIdToOpen
}) => {
  const [orders, setOrders] = useState<OrderDetails[]>(getStoredOrders());
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'amount-high' | 'amount-low'>('newest');

  // Selected modals state
  const [selectedOrderDetails, setSelectedOrderDetails] = useState<OrderDetails | null>(null);
  const [returnOrderModal, setReturnOrderModal] = useState<OrderDetails | null>(null);
  const [invoicePrintOrder, setInvoicePrintOrder] = useState<OrderDetails | null>(null);
  const [reviewProductName, setReviewProductName] = useState<string | null>(null);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Mock notifications
  const [notifications, setNotifications] = useState<OrderNotification[]>([
    {
      id: 'notif-1',
      orderId: 'ELY-98234',
      title: 'Order Out For Delivery',
      message: 'Courier Agent Ramesh K. is out for delivery in Bandra. ETA today by 6:00 PM.',
      timestamp: '10 mins ago',
      read: false,
      type: 'info'
    },
    {
      id: 'notif-2',
      orderId: 'ELY-98233',
      title: 'Delivered & Sealed',
      message: 'Order ELY-98233 was safely delivered to shipping address.',
      timestamp: 'Yesterday',
      read: true,
      type: 'success'
    }
  ]);

  useEffect(() => {
    saveOrdersToStorage(orders);
  }, [orders]);

  useEffect(() => {
    if (!isOpen) return;
    let active = true;
    fetchOrdersApi()
      .then((res) => {
        if (!active || !res.configured || !Array.isArray(res.orders) || res.orders.length === 0) return;
        setOrders((prev) => {
          const dbIds = new Set(res.orders.map((o) => o.orderId));
          const merged = [...res.orders, ...prev.filter((o) => !dbIds.has(o.orderId))];
          return merged;
        });
      })
      .catch((err) => {
        console.error('Failed to sync orders from Supabase:', err);
      });
    return () => {
      active = false;
    };
  }, [isOpen]);

  useEffect(() => {
    if (initialOrderIdToOpen && isOpen) {
      const match = orders.find((o) => o.orderId.toLowerCase() === initialOrderIdToOpen.toLowerCase());
      if (match) {
        setSelectedOrderDetails(match);
      }
    }
  }, [initialOrderIdToOpen, isOpen, orders]);

  if (!isOpen) return null;

  // Filter and Sort orders
  const filteredOrders = orders
    .filter((order) => {
      const matchesSearch =
        order.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.items.some((i) => i.product.name.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesStatus =
        statusFilter === 'All' ||
        order.status.toLowerCase() === statusFilter.toLowerCase() ||
        (statusFilter === 'Active' && ['Order Placed', 'Confirmed', 'Packed', 'Shipped', 'Out For Delivery'].includes(order.status));

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime();
      if (sortBy === 'oldest') return new Date(a.orderDate).getTime() - new Date(b.orderDate).getTime();
      if (sortBy === 'amount-high') return b.total - a.total;
      if (sortBy === 'amount-low') return a.total - b.total;
      return 0;
    });

  // Handlers
  const handleCancelOrder = (orderId: string) => {
    if (window.confirm(`Are you sure you want to cancel order #${orderId}? 100% refund will be initiated.`)) {
      const existingOrder = orders.find((o) => o.orderId === orderId);
      const updatedTimeline = existingOrder
        ? [
            ...existingOrder.trackingTimeline,
            {
              step: 'Cancelled' as OrderStatus,
              label: 'Order Cancelled by Customer',
              timestamp: 'Just now',
              completed: true,
              current: true
            }
          ]
        : [];

      setOrders((prev) =>
        prev.map((o) => {
          if (o.orderId === orderId) {
            return {
              ...o,
              status: 'Cancelled' as OrderStatus,
              canCancel: false,
              paymentStatus: 'Refunded' as any,
              trackingTimeline: updatedTimeline
            };
          }
          return o;
        })
      );

      updateOrderApi(orderId, {
        status: 'Cancelled',
        canCancel: false,
        paymentStatus: 'Refunded',
        trackingTimeline: updatedTimeline
      }).catch((err) => console.error('Failed to persist order cancellation:', err));

      // Add alert
      setNotifications((prev) => [
        {
          id: `notif-${Date.now()}`,
          orderId,
          title: 'Order Cancelled',
          message: `Order #${orderId} was cancelled. Refund process initiated.`,
          timestamp: 'Just now',
          read: false,
          type: 'alert'
        },
        ...prev
      ]);

      setSelectedOrderDetails(null);
    }
  };

  const handleReturnSubmit = (returnReq: ReturnRequest) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.orderId === returnReq.orderId) {
          return {
            ...o,
            returnRequest: returnReq,
            status: 'Returned' as OrderStatus,
            canReturn: false
          };
        }
        return o;
      })
    );

    submitReturnRequestApi(returnReq.orderId, returnReq).catch((err) =>
      console.error('Failed to persist return request:', err)
    );

    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        orderId: returnReq.orderId,
        title: 'Return Request Received',
        message: `Your return request for ${returnReq.productName} has been logged. Pickup will be assigned within 24h.`,
        timestamp: 'Just now',
        read: false,
        type: 'info'
      },
      ...prev
    ]);
  };

  const handleReorder = (order: OrderDetails) => {
    if (onAddToCart) {
      order.items.forEach((item) => {
        onAddToCart(item.product, item.selectedSize);
      });
      alert(`Added items from #${order.orderId} back to your shopping bag!`);
    }
  };

  const handleUpdateInstructions = (orderId: string, instructions: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.orderId === orderId ? { ...o, deliveryInstructions: instructions } : o))
    );
    updateOrderApi(orderId, { deliveryInstructions: instructions }).catch((err) =>
      console.error('Failed to persist delivery instructions:', err)
    );
  };

  const unreadNotifCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        className="bg-[#F8F6F2] border border-[#E8E2D7] rounded-[28px] max-w-5xl w-full h-[90vh] flex flex-col shadow-2xl relative overflow-hidden text-[#1F1F1F]"
      >
        {/* Top Header */}
        <div className="bg-[#171717] text-white p-6 sm:px-8 sm:py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#C8A24A]/20">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-montserrat uppercase tracking-[0.2em] text-[#C8A24A] font-bold">
                ELYSIAN Haute Parfumerie
              </span>
            </div>
            <h2 className="font-cormorant text-3xl sm:text-4xl font-light text-white">
              My Orders & <span className="italic text-[#C8A24A]">Shipment Portal</span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {/* Notification Bell */}
            <button
              onClick={() => setIsNotificationsOpen(true)}
              className="relative bg-[#222222] hover:bg-[#333] border border-[#C8A24A]/30 p-2.5 rounded-full text-[#C8A24A] transition-all cursor-pointer"
            >
              <Bell size={18} />
              {unreadNotifCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C8A24A] text-[#1F1F1F] font-mono text-[9px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {unreadNotifCount}
                </span>
              )}
            </button>

            {/* Close Modal Button */}
            <button
              onClick={onClose}
              className="bg-[#222222] hover:bg-[#333] p-2.5 rounded-full text-gray-300 hover:text-white transition-all cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Quick Stats Summary Bar */}
        <div className="bg-white border-b border-[#E8E2D7] px-6 py-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center divide-x divide-[#F4F1EA]">
          <div>
            <span className="text-[10px] font-montserrat uppercase font-bold text-gray-400 block">Total Orders</span>
            <span className="font-cormorant text-2xl font-bold text-[#1F1F1F]">{orders.length}</span>
          </div>
          <div>
            <span className="text-[10px] font-montserrat uppercase font-bold text-gray-400 block">Active In-Transit</span>
            <span className="font-cormorant text-2xl font-bold text-[#C8A24A]">
              {orders.filter((o) => ['Out For Delivery', 'Shipped', 'Confirmed', 'Packed'].includes(o.status)).length}
            </span>
          </div>
          <div>
            <span className="text-[10px] font-montserrat uppercase font-bold text-gray-400 block">Delivered Parfums</span>
            <span className="font-cormorant text-2xl font-bold text-emerald-700">
              {orders.filter((o) => o.status === 'Delivered').length}
            </span>
          </div>
          <div>
            <span className="text-[10px] font-montserrat uppercase font-bold text-gray-400 block">Returns / Refunds</span>
            <span className="font-cormorant text-2xl font-bold text-purple-700">
              {orders.filter((o) => ['Returned', 'Refunded'].includes(o.status)).length}
            </span>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-[#F8F6F2] p-4 sm:px-8 border-b border-[#E8E2D7] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          
          {/* Status Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
            {['All', 'Active', 'Delivered', 'Cancelled', 'Returned'].map((tab) => (
              <button
                key={tab}
                onClick={() => setStatusFilter(tab)}
                className={`px-4 py-2 rounded-full text-xs font-montserrat uppercase font-bold transition-all cursor-pointer whitespace-nowrap ${
                  statusFilter === tab
                    ? 'bg-[#171717] text-[#C8A24A] shadow-sm'
                    : 'bg-white text-[#1F1F1F] border border-[#E8E2D7] hover:bg-[#E8E2D7]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search & Sort */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Order ID, Perfume, Tracking..."
                className="w-full bg-white border border-[#E8E2D7] rounded-full pl-9 pr-4 py-2 text-xs font-inter focus:outline-none focus:border-[#C8A24A]"
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-[#E8E2D7] rounded-full px-3 py-2 text-xs font-montserrat font-bold text-[#1F1F1F] focus:outline-none focus:border-[#C8A24A] cursor-pointer"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="amount-high">Price: High to Low</option>
              <option value="amount-low">Price: Low to High</option>
            </select>
          </div>

        </div>

        {/* Orders List Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-4">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-16 space-y-3 bg-white rounded-3xl border border-[#E8E2D7]">
              <Package size={48} className="mx-auto text-gray-300" />
              <h3 className="font-cormorant text-2xl font-bold text-[#1F1F1F]">No Orders Found</h3>
              <p className="text-xs text-gray-500 font-inter">
                No orders match your search filter "{searchQuery}".
              </p>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <motion.div
                key={order.orderId}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-[#E8E2D7] rounded-[20px] p-5 sm:p-6 shadow-sm hover:shadow-md transition-all space-y-4"
              >
                {/* Order Top Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#F4F1EA] pb-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-montserrat font-bold text-base text-[#1F1F1F]">
                      {order.orderId}
                    </span>
                    <span
                      className={`text-[10px] font-montserrat uppercase font-bold px-3 py-1 rounded-full border ${
                        order.status === 'Delivered'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : order.status === 'Out For Delivery'
                          ? 'bg-amber-50 text-amber-900 border-amber-200'
                          : order.status === 'Cancelled'
                          ? 'bg-rose-50 text-rose-800 border-rose-200'
                          : 'bg-blue-50 text-blue-900 border-blue-200'
                      }`}
                    >
                      {order.status}
                    </span>
                    <span className="text-xs text-gray-400 font-inter">• Placed on {order.orderDate}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 font-inter">Total:</span>
                    <span className="font-montserrat font-bold text-base text-[#C8A24A]">
                      ₹{order.total}
                    </span>
                  </div>
                </div>

                {/* Items & Air Tracking Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                  
                  {/* Items Column */}
                  <div className="md:col-span-2 space-y-3">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-14 h-14 object-cover rounded-xl border border-[#E8E2D7] bg-[#F8F6F2]"
                        />
                        <div className="min-w-0">
                          <h4 className="font-montserrat font-bold text-xs text-[#1F1F1F] truncate">
                            {item.product.name}
                          </h4>
                          <p className="text-[11px] text-gray-500 font-inter truncate">
                            {item.selectedSize} × {item.quantity}
                          </p>
                          <span className="text-[10px] font-bold text-[#C8A24A]">₹{item.price}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Shipment Status Brief */}
                  <div className="bg-[#F8F6F2] p-4 rounded-2xl border border-[#E8E2D7] space-y-1.5 text-xs font-inter">
                    <div className="flex items-center justify-between text-[10px] font-montserrat uppercase font-bold text-[#C8A24A]">
                      <span>{order.courierPartner}</span>
                      <span className="font-mono">{order.trackingNumber}</span>
                    </div>
                    <p className="font-bold text-[#1F1F1F] text-xs">
                      {order.estimatedDelivery}
                    </p>
                    <p className="text-[10px] text-gray-500 truncate">
                      Deliver to: {order.customerName}, {order.city}
                    </p>
                  </div>

                </div>

                {/* Action Buttons Row */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#F4F1EA] pt-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedOrderDetails(order)}
                      className="bg-[#171717] text-[#C8A24A] hover:bg-[#C8A24A] hover:text-[#171717] text-xs font-montserrat uppercase font-bold px-4 py-2 rounded-full transition-all cursor-pointer inline-flex items-center gap-1.5 shadow-sm"
                    >
                      <span>Track & View Details</span>
                      <ChevronRight size={14} />
                    </button>

                    <button
                      onClick={() => setInvoicePrintOrder(order)}
                      className="bg-white border border-[#E8E2D7] text-[#1F1F1F] hover:bg-gray-100 text-xs font-montserrat uppercase font-bold px-3.5 py-2 rounded-full transition-all cursor-pointer inline-flex items-center gap-1"
                    >
                      <Printer size={14} />
                      <span className="hidden sm:inline">Invoice</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleReorder(order)}
                      className="bg-[#F8F6F2] border border-[#E8E2D7] text-[#1F1F1F] hover:bg-[#171717] hover:text-[#C8A24A] text-xs font-montserrat uppercase font-bold px-3.5 py-2 rounded-full transition-all cursor-pointer inline-flex items-center gap-1"
                    >
                      <ShoppingBag size={14} />
                      <span>Reorder</span>
                    </button>

                    {order.canReturn && !order.returnRequest && (
                      <button
                        onClick={() => setReturnOrderModal(order)}
                        className="bg-purple-50 border border-purple-200 text-purple-800 hover:bg-purple-600 hover:text-white text-xs font-montserrat uppercase font-bold px-3.5 py-2 rounded-full transition-all cursor-pointer inline-flex items-center gap-1"
                      >
                        <RotateCcw size={14} />
                        <span>Return / Exchange</span>
                      </button>
                    )}
                  </div>
                </div>

              </motion.div>
            ))
          )}
        </div>

        {/* Nested Modals */}
        <AnimatePresence>
          {selectedOrderDetails && (
            <OrderDetailsModal
              order={selectedOrderDetails}
              isOpen={!!selectedOrderDetails}
              onClose={() => setSelectedOrderDetails(null)}
              onCancelOrder={handleCancelOrder}
              onRequestReturn={(ord) => {
                setSelectedOrderDetails(null);
                setReturnOrderModal(ord);
              }}
              onPrintInvoice={(ord) => {
                setSelectedOrderDetails(null);
                setInvoicePrintOrder(ord);
              }}
              onReorder={handleReorder}
              onWriteReview={(pName) => setReviewProductName(pName)}
              onUpdateInstructions={handleUpdateInstructions}
            />
          )}

          {returnOrderModal && (
            <ReturnRequestModal
              order={returnOrderModal}
              isOpen={!!returnOrderModal}
              onClose={() => setReturnOrderModal(null)}
              onSubmitReturn={handleReturnSubmit}
            />
          )}

          {invoicePrintOrder && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md overflow-y-auto">
              <div className="max-w-3xl w-full my-8">
                <InvoiceTemplate
                  order={invoicePrintOrder}
                  onClose={() => setInvoicePrintOrder(null)}
                />
              </div>
            </div>
          )}

          {reviewProductName && (
            <WriteReviewModal
              productName={reviewProductName}
              isOpen={!!reviewProductName}
              onClose={() => setReviewProductName(null)}
              onSubmitReview={(pName, rating, comment) => {
                alert(`Thank you! Your 5-star review for "${pName}" has been recorded.`);
              }}
            />
          )}

          {isNotificationsOpen && (
            <OrderNotificationsDrawer
              notifications={notifications}
              isOpen={isNotificationsOpen}
              onClose={() => setIsNotificationsOpen(false)}
              onMarkAsRead={(id) =>
                setNotifications((prev) =>
                  prev.map((n) => (n.id === id ? { ...n, read: true } : n))
                )
              }
              onClearAll={() => setNotifications([])}
            />
          )}
        </AnimatePresence>

      </motion.div>
    </div>
  );
};
