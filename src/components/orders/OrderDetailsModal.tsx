import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Printer,
  Truck,
  RotateCcw,
  XCircle,
  ShoppingBag,
  Star,
  MessageSquare,
  MapPin,
  CreditCard,
  CheckCircle2,
  Edit2,
  Save,
  Clock,
  ShieldCheck,
  PackageCheck,
  FileText,
  HelpCircle
} from 'lucide-react';
import { OrderDetails, OrderStatus } from '../../types';
import { OrderTrackingTimeline } from './OrderTrackingTimeline';

interface OrderDetailsModalProps {
  order: OrderDetails;
  isOpen: boolean;
  onClose: () => void;
  onCancelOrder: (orderId: string) => void;
  onRequestReturn: (order: OrderDetails) => void;
  onPrintInvoice: (order: OrderDetails) => void;
  onReorder: (order: OrderDetails) => void;
  onWriteReview: (productName: string) => void;
  onUpdateInstructions: (orderId: string, instructions: string) => void;
}

export const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
  order,
  isOpen,
  onClose,
  onCancelOrder,
  onRequestReturn,
  onPrintInvoice,
  onReorder,
  onWriteReview,
  onUpdateInstructions
}) => {
  const [activeTab, setActiveTab] = useState<'details' | 'tracking' | 'refund'>('details');
  const [isEditingInstructions, setIsEditingInstructions] = useState(false);
  const [instructionsText, setInstructionsText] = useState(order.deliveryInstructions || '');

  if (!isOpen) return null;

  const getStatusBadgeColor = (status: OrderStatus) => {
    switch (status) {
      case 'Delivered':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Out For Delivery':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'Shipped':
      case 'Packed':
      case 'Confirmed':
      case 'Order Placed':
        return 'bg-blue-100 text-blue-900 border-blue-300';
      case 'Cancelled':
        return 'bg-rose-100 text-rose-800 border-rose-300';
      case 'Returned':
      case 'Refunded':
        return 'bg-purple-100 text-purple-900 border-purple-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const handleSaveInstructions = () => {
    onUpdateInstructions(order.orderId, instructionsText);
    setIsEditingInstructions(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="bg-white border border-[#E8E2D7] rounded-[24px] max-w-4xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative my-8 text-[#1F1F1F] max-h-[92vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#F4F1EA] pb-5">
          <div>
            <div className="flex items-center gap-3">
              <span className="font-montserrat font-bold text-lg text-[#1F1F1F]">
                Order {order.orderId}
              </span>
              <span
                className={`text-[10px] font-montserrat uppercase font-bold px-3 py-1 rounded-full border ${getStatusBadgeColor(
                  order.status
                )}`}
              >
                {order.status}
              </span>
            </div>
            <p className="text-xs text-gray-500 font-inter pt-1">Placed on {order.orderDate}</p>
          </div>

          {/* Tab Navigation & Close */}
          <div className="flex items-center gap-3">
            <div className="bg-[#F8F6F2] p-1 rounded-full border border-[#E8E2D7] flex items-center gap-1">
              <button
                onClick={() => setActiveTab('details')}
                className={`px-4 py-1.5 rounded-full text-xs font-montserrat uppercase font-bold transition-all cursor-pointer ${
                  activeTab === 'details'
                    ? 'bg-[#171717] text-[#C8A24A]'
                    : 'text-gray-600 hover:text-black'
                }`}
              >
                Details
              </button>
              <button
                onClick={() => setActiveTab('tracking')}
                className={`px-4 py-1.5 rounded-full text-xs font-montserrat uppercase font-bold transition-all cursor-pointer ${
                  activeTab === 'tracking'
                    ? 'bg-[#171717] text-[#C8A24A]'
                    : 'text-gray-600 hover:text-black'
                }`}
              >
                Tracking
              </button>
              {order.returnRequest && (
                <button
                  onClick={() => setActiveTab('refund')}
                  className={`px-4 py-1.5 rounded-full text-xs font-montserrat uppercase font-bold transition-all cursor-pointer ${
                    activeTab === 'refund'
                      ? 'bg-[#171717] text-[#C8A24A]'
                      : 'text-gray-600 hover:text-black'
                  }`}
                >
                  Return/Refund
                </button>
              )}
            </div>

            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-black rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Tab 1: Order Details */}
        {activeTab === 'details' && (
          <div className="space-y-6">
            {/* Quick Action Top Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-[#F8F6F2] p-4 rounded-2xl border border-[#E8E2D7]">
              <div className="flex items-center gap-2 text-xs font-montserrat font-bold text-[#1F1F1F]">
                <Truck size={16} className="text-[#C8A24A]" />
                <span>{order.courierPartner}</span>
                <span className="font-mono text-gray-500">({order.trackingNumber})</span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => onPrintInvoice(order)}
                  className="bg-white border border-[#E8E2D7] text-[#1F1F1F] hover:bg-[#171717] hover:text-[#C8A24A] text-xs font-montserrat font-bold px-3.5 py-1.5 rounded-full transition-all cursor-pointer inline-flex items-center gap-1.5"
                >
                  <Printer size={14} />
                  <span>Invoice PDF</span>
                </button>

                <button
                  onClick={() => onReorder(order)}
                  className="bg-[#171717] text-[#C8A24A] hover:bg-[#C8A24A] hover:text-[#171717] text-xs font-montserrat font-bold px-3.5 py-1.5 rounded-full transition-all cursor-pointer inline-flex items-center gap-1.5"
                >
                  <ShoppingBag size={14} />
                  <span>Buy Again</span>
                </button>

                {order.canCancel && (
                  <button
                    onClick={() => onCancelOrder(order.orderId)}
                    className="bg-rose-50 border border-rose-200 text-rose-700 hover:bg-rose-600 hover:text-white text-xs font-montserrat font-bold px-3.5 py-1.5 rounded-full transition-all cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <XCircle size={14} />
                    <span>Cancel Order</span>
                  </button>
                )}

                {order.canReturn && !order.returnRequest && (
                  <button
                    onClick={() => onRequestReturn(order)}
                    className="bg-purple-50 border border-purple-200 text-purple-700 hover:bg-purple-600 hover:text-white text-xs font-montserrat font-bold px-3.5 py-1.5 rounded-full transition-all cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <RotateCcw size={14} />
                    <span>Return / Exchange</span>
                  </button>
                )}
              </div>
            </div>

            {/* Address & Payment Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Shipping Address */}
              <div className="bg-[#F8F6F2] p-4 rounded-2xl border border-[#E8E2D7] space-y-2">
                <div className="flex items-center gap-2 text-xs font-montserrat uppercase font-bold text-[#C8A24A]">
                  <MapPin size={16} />
                  <span>Shipping Address</span>
                </div>
                <p className="font-bold text-xs text-[#1F1F1F]">{order.customerName}</p>
                <p className="text-xs text-gray-600">{order.address}</p>
                <p className="text-xs text-gray-600">
                  {order.city}, {order.state} - {order.pincode}
                </p>
                <p className="text-xs text-gray-500 font-mono">Contact: {order.phone}</p>
              </div>

              {/* Payment Details */}
              <div className="bg-[#F8F6F2] p-4 rounded-2xl border border-[#E8E2D7] space-y-2">
                <div className="flex items-center gap-2 text-xs font-montserrat uppercase font-bold text-[#C8A24A]">
                  <CreditCard size={16} />
                  <span>Payment & Status</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-500">Method:</span>
                  <span className="font-bold">{order.paymentMethod}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-500">Payment Status:</span>
                  <span
                    className={`font-bold px-2 py-0.5 rounded-full text-[10px] ${
                      order.paymentStatus === 'Paid'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {order.paymentStatus}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs border-t border-[#E8E2D7] pt-2">
                  <span className="text-gray-500">Grand Total:</span>
                  <span className="font-bold text-[#C8A24A] text-sm">₹{order.total}</span>
                </div>
              </div>
            </div>

            {/* Delivery Instructions Editor */}
            <div className="bg-white border border-[#E8E2D7] p-4 rounded-2xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-montserrat uppercase font-bold text-[#1F1F1F]">
                  Delivery Instructions
                </span>
                {!isEditingInstructions ? (
                  <button
                    onClick={() => setIsEditingInstructions(true)}
                    className="text-[10px] text-[#C8A24A] font-montserrat uppercase font-bold hover:underline inline-flex items-center gap-1 cursor-pointer"
                  >
                    <Edit2 size={12} />
                    <span>Edit</span>
                  </button>
                ) : (
                  <button
                    onClick={handleSaveInstructions}
                    className="text-[10px] bg-[#C8A24A] text-[#1F1F1F] font-montserrat uppercase font-bold px-2.5 py-1 rounded-full cursor-pointer inline-flex items-center gap-1"
                  >
                    <Save size={12} />
                    <span>Save</span>
                  </button>
                )}
              </div>
              {isEditingInstructions ? (
                <input
                  type="text"
                  value={instructionsText}
                  onChange={(e) => setInstructionsText(e.target.value)}
                  placeholder="E.g., Call upon arrival, leave with security gate..."
                  className="w-full bg-[#F8F6F2] border border-[#E8E2D7] rounded-xl px-3 py-2 text-xs font-inter focus:outline-none focus:border-[#C8A24A]"
                />
              ) : (
                <p className="text-xs text-gray-600 font-inter italic">
                  "{order.deliveryInstructions || 'No specific instructions provided.'}"
                </p>
              )}
            </div>

            {/* Items Purchased List */}
            <div className="space-y-3">
              <h4 className="text-xs font-montserrat uppercase font-bold text-[#1F1F1F]">
                Fragrance Items ({order.items.length})
              </h4>
              <div className="divide-y divide-[#F4F1EA] border border-[#E8E2D7] rounded-2xl overflow-hidden bg-white">
                {order.items.map((item, idx) => (
                  <div key={idx} className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-xl border border-[#E8E2D7]"
                      />
                      <div>
                        <h5 className="font-montserrat font-bold text-sm text-[#1F1F1F]">
                          {item.product.name}
                        </h5>
                        <p className="text-xs text-gray-500 font-inter">{item.product.subTitle}</p>
                        <span className="text-[10px] font-mono text-gray-400">
                          {item.selectedSize} × {item.quantity}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="font-montserrat font-bold text-sm text-[#C8A24A]">
                          ₹{item.price * item.quantity}
                        </span>
                      </div>

                      {order.status === 'Delivered' && (
                        <button
                          onClick={() => onWriteReview(item.product.name)}
                          className="bg-[#F8F6F2] hover:bg-[#171717] hover:text-[#C8A24A] border border-[#E8E2D7] text-xs font-montserrat uppercase font-bold px-3 py-1.5 rounded-full transition-all cursor-pointer inline-flex items-center gap-1"
                        >
                          <Star size={12} className="fill-[#C8A24A] text-[#C8A24A]" />
                          <span>Review</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="bg-[#F8F6F2] p-4 rounded-2xl border border-[#E8E2D7] space-y-2 text-xs font-inter max-w-sm ml-auto">
              <div className="flex justify-between text-gray-600">
                <span>Items Subtotal</span>
                <span>₹{order.subtotal}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Privilege Coupon ({order.couponCode || 'PROMO'})</span>
                  <span>-₹{order.discount}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-600">
                <span>Integrated GST (18%)</span>
                <span>₹{order.gstAmount}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Express Delivery</span>
                <span className="text-emerald-600 font-bold">FREE</span>
              </div>
              <div className="flex justify-between font-montserrat font-bold text-base text-[#1F1F1F] border-t border-[#E8E2D7] pt-2">
                <span>Grand Total</span>
                <span className="text-[#C8A24A]">₹{order.total}</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Live Tracking Timeline */}
        {activeTab === 'tracking' && (
          <OrderTrackingTimeline
            timeline={order.trackingTimeline}
            currentStatus={order.status}
            courierPartner={order.courierPartner}
            trackingNumber={order.trackingNumber}
            estimatedDelivery={order.estimatedDelivery}
          />
        )}

        {/* Tab 3: Return & Refund Timeline */}
        {activeTab === 'refund' && order.returnRequest && (
          <div className="space-y-6">
            <div className="bg-purple-50 border border-purple-200 p-5 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-montserrat font-bold text-xs uppercase text-purple-900">
                  Return Request #{order.returnRequest.id}
                </span>
                <span className="text-[10px] font-bold bg-purple-200 text-purple-900 px-3 py-1 rounded-full">
                  Status: {order.returnRequest.status}
                </span>
              </div>
              <p className="text-xs text-purple-800 font-inter">
                <strong>Reason:</strong> {order.returnRequest.reason}
              </p>
              <p className="text-xs text-purple-700 font-inter">
                <strong>Resolution:</strong> {order.returnRequest.requestType} (Refund Amount: ₹{order.returnRequest.refundAmount})
              </p>
            </div>

            {/* Refund Timeline Steps */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 py-4">
              {[
                { name: 'Requested', label: 'Return Filed', done: true },
                { name: 'Approved', label: 'Inspection Approved', done: order.returnRequest.status !== 'Requested' },
                { name: 'Picked Up', label: 'Courier Pickup', done: ['Picked Up', 'Refund Processed', 'Completed'].includes(order.returnRequest.status) },
                { name: 'Refund Processed', label: 'Bank Credit Sent', done: ['Refund Processed', 'Completed'].includes(order.returnRequest.status) },
                { name: 'Completed', label: 'Refund Completed', done: order.returnRequest.status === 'Completed' }
              ].map((step, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-2xl border text-center space-y-1 ${
                    step.done ? 'bg-[#171717] text-[#C8A24A] border-[#171717]' : 'bg-[#F8F6F2] text-gray-400 border-[#E8E2D7]'
                  }`}
                >
                  <span className="text-[10px] font-montserrat uppercase font-bold block">{step.name}</span>
                  <span className="text-[9px] font-inter block">{step.label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </motion.div>
    </div>
  );
};
