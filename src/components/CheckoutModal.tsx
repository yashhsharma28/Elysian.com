import React, { useState, useEffect } from 'react';
import { X, Check, ShieldCheck, Truck, CreditCard, QrCode, Building2, PackageCheck, Sparkles, Copy, ChevronRight, Loader2, AlertCircle } from 'lucide-react';
import { CartItem, OrderDetails, OrderStatus, PaymentMethod } from '../types';
import { getStoredOrders, saveOrdersToStorage } from '../data/mockOrders';
import { createOrderApi } from '../lib/ordersApi';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  discountAmount: number;
  onClearCart: () => void;
  onOpenOrders?: (orderId?: string) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  discountAmount,
  onClearCart,
  onOpenOrders
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1); // 1: Address, 2: Payment, 3: Confirmation
  
  // Address State
  const [formData, setFormData] = useState({
    name: 'Yash Sharma',
    email: 'yash.sharma@elysian.in',
    phone: '9876543210',
    address: 'Flat 402, Royal Residency, Indiranagar 100ft Road',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560038'
  });

  // Payment Method
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'GPay' | 'PhonePe' | 'Paytm' | 'Card' | 'NetBanking' | 'COD'>('UPI');
  const [upiId, setUpiId] = useState('yash@okaxis');
  
  // Submission & Error State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Final Order State
  const [completedOrder, setCompletedOrder] = useState<OrderDetails | null>(null);

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setSubmitError(null);
      setCompletedOrder(null);
      setIsSubmitting(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal >= 499 ? 0 : 49;
  const total = Math.max(0, subtotal - discountAmount + shipping);

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (submitError) setSubmitError(null);
  };

  const handleProceedToPayment = () => {
    if (
      !formData.name.trim() ||
      !formData.phone.trim() ||
      !formData.email.trim() ||
      !formData.address.trim() ||
      !formData.city.trim() ||
      !formData.state.trim() ||
      !formData.pincode.trim()
    ) {
      setSubmitError('Please fill in all required shipping and contact fields.');
      return;
    }
    setSubmitError(null);
    setStep(2);
  };

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      setSubmitError('Your shopping bag is empty.');
      return;
    }

    const requiresUpi = paymentMethod === 'UPI' || paymentMethod === 'GPay' || paymentMethod === 'PhonePe';
    if (requiresUpi && !upiId.trim()) {
      setSubmitError('Please enter your UPI ID to proceed.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    const orderNum = `ELY-${Math.floor(100000 + Math.random() * 900000)}`;
    const formattedPaymentMethod: PaymentMethod =
      paymentMethod === 'GPay'
        ? 'Google Pay'
        : paymentMethod === 'Card'
        ? 'Visa'
        : paymentMethod === 'NetBanking'
        ? 'Net Banking'
        : paymentMethod === 'COD'
        ? 'Cash on Delivery'
        : (paymentMethod as PaymentMethod);

    const newOrder: OrderDetails = {
      orderId: orderNum,
      orderDate: new Date().toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' }),
      customerName: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      address: formData.address.trim(),
      city: formData.city.trim(),
      state: formData.state.trim(),
      pincode: formData.pincode.trim(),
      billingAddress: `${formData.address.trim()}, ${formData.city.trim()}, ${formData.state.trim()} - ${formData.pincode.trim()}`,
      paymentMethod: formattedPaymentMethod,
      paymentStatus: paymentMethod === 'COD' ? 'Pending' : 'Paid',
      items: [...cartItems],
      subtotal,
      discount: discountAmount,
      shipping,
      gstAmount: Math.round(total * 0.18),
      total,
      status: 'Confirmed',
      courierPartner: 'Delhivery Express Air',
      trackingNumber: `DEL-${Math.floor(10000000 + Math.random() * 90000000)}`,
      estimatedDelivery: '3 - 5 Business Days',
      deliveryInstructions: 'Handle with care. Luxury Fragrance Extrait.',
      canCancel: true,
      canReturn: false,
      trackingTimeline: [
        {
          step: 'Order Placed',
          label: 'Order Confirmed & Payment Received',
          timestamp: 'Just now',
          completed: true,
          current: false
        },
        {
          step: 'Confirmed',
          label: 'Assigned to Atelier Master Perfumer Vault',
          timestamp: 'Just now',
          completed: true,
          current: true
        },
        {
          step: 'Packed',
          label: 'Sealed in Velvet Gift Packaging',
          timestamp: 'Pending',
          completed: false,
          current: false
        },
        {
          step: 'Shipped',
          label: 'Air Courier Handover',
          timestamp: 'Pending',
          completed: false,
          current: false
        },
        {
          step: 'Out For Delivery',
          label: 'Local Delivery Agent Assigned',
          timestamp: 'Pending',
          completed: false,
          current: false
        },
        {
          step: 'Delivered',
          label: 'Signature Delivered',
          timestamp: 'Pending',
          completed: false,
          current: false
        }
      ]
    };

    try {
      await createOrderApi(newOrder, requiresUpi ? upiId.trim() : undefined);

      // Sync local orders cache as well
      const currentOrders = getStoredOrders();
      saveOrdersToStorage([newOrder, ...currentOrders]);

      setCompletedOrder(newOrder);
      onClearCart();
      setStep(3);
    } catch (err: any) {
      setSubmitError(err?.message || 'Unable to save order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
      <div className="bg-white border border-[#E8E2D7] rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative">
        
        {/* Header */}
        <div className="bg-[#1F1F1F] text-white p-6 flex items-center justify-between border-b border-[#C8A24A]/30">
          <div>
            <span className="text-[10px] font-montserrat uppercase tracking-[0.25em] text-[#C8A24A]">
              ELYSIAN Express Checkout
            </span>
            <h3 className="font-cormorant text-2xl font-bold">
              {step === 1 && '1. Shipping & Address Details'}
              {step === 2 && '2. Select Indian Payment Method'}
              {step === 3 && 'Order Confirmed!'}
            </h3>
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        {/* Steps Progress Indicator */}
        {step < 3 && (
          <div className="bg-[#F4F1EA] px-8 py-3 border-b border-[#E8E2D7] flex items-center justify-between text-xs font-montserrat uppercase tracking-wider font-semibold">
            <span className={step === 1 ? 'text-[#C8A24A]' : 'text-gray-400'}>
              1. Address
            </span>
            <span className="text-gray-300">→</span>
            <span className={step === 2 ? 'text-[#C8A24A]' : 'text-gray-400'}>
              2. Payment (UPI / Cards / COD)
            </span>
            <span className="text-gray-300">→</span>
            <span className="text-gray-400">3. Confirmation</span>
          </div>
        )}

        {/* Step 1: Shipping Address Form */}
        {step === 1 && (
          <div className="p-6 md:p-8 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-montserrat uppercase font-bold text-[#1F1F1F] block mb-1">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full bg-[#F4F1EA] border border-[#E8E2D7] rounded-lg px-3 py-2.5 text-xs font-inter text-[#1F1F1F] focus:outline-none focus:border-[#C8A24A]"
                />
              </div>

              <div>
                <label className="text-xs font-montserrat uppercase font-bold text-[#1F1F1F] block mb-1">Mobile Number (For Delivery SMS)</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full bg-[#F4F1EA] border border-[#E8E2D7] rounded-lg px-3 py-2.5 text-xs font-inter text-[#1F1F1F] focus:outline-none focus:border-[#C8A24A]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-montserrat uppercase font-bold text-[#1F1F1F] block mb-1">Email Address (Order Invoice)</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full bg-[#F4F1EA] border border-[#E8E2D7] rounded-lg px-3 py-2.5 text-xs font-inter text-[#1F1F1F] focus:outline-none focus:border-[#C8A24A]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-montserrat uppercase font-bold text-[#1F1F1F] block mb-1">Street Address / House No.</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="w-full bg-[#F4F1EA] border border-[#E8E2D7] rounded-lg px-3 py-2.5 text-xs font-inter text-[#1F1F1F] focus:outline-none focus:border-[#C8A24A]"
                />
              </div>

              <div>
                <label className="text-xs font-montserrat uppercase font-bold text-[#1F1F1F] block mb-1">City</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className="w-full bg-[#F4F1EA] border border-[#E8E2D7] rounded-lg px-3 py-2.5 text-xs font-inter text-[#1F1F1F] focus:outline-none focus:border-[#C8A24A]"
                />
              </div>

              <div>
                <label className="text-xs font-montserrat uppercase font-bold text-[#1F1F1F] block mb-1">State</label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  className="w-full bg-[#F4F1EA] border border-[#E8E2D7] rounded-lg px-3 py-2.5 text-xs font-inter text-[#1F1F1F] focus:outline-none focus:border-[#C8A24A]"
                />
              </div>

              <div>
                <label className="text-xs font-montserrat uppercase font-bold text-[#1F1F1F] block mb-1">PIN Code</label>
                <input
                  type="text"
                  value={formData.pincode}
                  onChange={(e) => handleInputChange('pincode', e.target.value)}
                  className="w-full bg-[#F4F1EA] border border-[#E8E2D7] rounded-lg px-3 py-2.5 text-xs font-inter text-[#1F1F1F] focus:outline-none focus:border-[#C8A24A]"
                />
              </div>
            </div>

            {submitError && (
              <div className="flex items-center gap-2 bg-rose-50 border border-rose-200 text-rose-800 px-4 py-3 rounded-xl text-xs font-inter">
                <AlertCircle size={16} className="shrink-0" />
                <span>{submitError}</span>
              </div>
            )}

            <div className="pt-4 border-t border-[#E8E2D7] flex items-center justify-between">
              <span className="text-xs font-inter font-semibold text-[#1F1F1F]">
                Total Payable: <strong className="font-cormorant text-xl">₹{total}</strong>
              </span>
              <button
                onClick={handleProceedToPayment}
                className="bg-[#C8A24A] hover:bg-[#1F1F1F] text-[#1F1F1F] hover:text-[#C8A24A] px-8 py-3 rounded-full font-montserrat text-xs uppercase font-bold tracking-wider transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-md"
              >
                Proceed to Payment →
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Payment Options */}
        {step === 2 && (
          <div className="p-6 md:p-8 space-y-6">
            <label className="text-xs font-montserrat uppercase font-bold text-[#1F1F1F] block">
              Choose Payment Method:
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { id: 'UPI', label: 'Instant UPI', icon: QrCode },
                { id: 'GPay', label: 'Google Pay', icon: QrCode },
                { id: 'PhonePe', label: 'PhonePe', icon: QrCode },
                { id: 'Card', label: 'Cards (Visa/RuPay)', icon: CreditCard },
                { id: 'NetBanking', label: 'Net Banking', icon: Building2 },
                { id: 'COD', label: 'Cash on Delivery', icon: Truck }
              ].map((m) => {
                const IconComponent = m.icon;
                return (
                  <button
                    key={m.id}
                    onClick={() => setPaymentMethod(m.id as any)}
                    className={`p-4 rounded-xl border text-center transition-all flex flex-col items-center gap-2 ${
                      paymentMethod === m.id
                        ? 'bg-[#1F1F1F] text-[#C8A24A] border-[#1F1F1F] shadow-md'
                        : 'bg-[#F4F1EA] text-[#1F1F1F] border-[#E8E2D7] hover:border-[#C8A24A]'
                    }`}
                  >
                    <IconComponent size={20} />
                    <span className="text-xs font-montserrat font-bold">{m.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Method Specific details */}
            {(paymentMethod === 'UPI' || paymentMethod === 'GPay' || paymentMethod === 'PhonePe') && (
              <div className="bg-[#F4F1EA] border border-[#E8E2D7] p-4 rounded-xl space-y-2">
                <label className="text-xs font-montserrat font-bold text-[#1F1F1F] block">
                  Enter VPA / UPI ID:
                </label>
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="e.g. mobile@upi"
                  className="w-full bg-white border border-[#E8E2D7] rounded-lg px-3 py-2 text-xs font-inter focus:outline-none focus:border-[#C8A24A]"
                />
                <span className="text-[11px] font-inter text-gray-500 block">
                  You will receive a payment request directly in your UPI app.
                </span>
              </div>
            )}

            {paymentMethod === 'COD' && (
              <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-xl text-xs font-inter">
                ✓ Cash on Delivery available for your pincode ({formData.pincode}). Pay ₹{total} to courier partner upon delivery.
              </div>
            )}

            {/* Summary */}
            <div className="bg-[#F4F1EA] p-4 rounded-xl space-y-1 text-xs font-inter text-[#666666]">
              <div className="flex justify-between">
                <span>Items Subtotal:</span>
                <span>₹{subtotal}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Voucher Discount:</span>
                  <span>-₹{discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
              </div>
              <div className="flex justify-between font-cormorant font-bold text-lg text-[#1F1F1F] pt-2 border-t border-[#E8E2D7]">
                <span>Total Amount:</span>
                <span>₹{total}</span>
              </div>
            </div>

            {submitError && (
              <div className="flex items-center gap-2 bg-rose-50 border border-rose-200 text-rose-800 px-4 py-3 rounded-xl text-xs font-inter">
                <AlertCircle size={16} className="shrink-0" />
                <span>{submitError}</span>
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-[#E8E2D7]">
              <button
                onClick={() => {
                  setSubmitError(null);
                  setStep(1);
                }}
                disabled={isSubmitting}
                className="text-xs font-montserrat uppercase font-semibold text-gray-500 hover:text-[#1F1F1F] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer disabled:opacity-50"
              >
                ← Back to Address
              </button>

              <button
                onClick={handlePlaceOrder}
                disabled={isSubmitting}
                className="bg-[#C8A24A] hover:bg-[#1F1F1F] text-[#1F1F1F] hover:text-[#C8A24A] px-8 py-3.5 rounded-full font-montserrat text-xs uppercase font-bold tracking-wider shadow-md transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer disabled:opacity-60 inline-flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Saving Order...</span>
                  </>
                ) : (
                  <span>Place Order (₹{total})</span>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Order Confirmation */}
        {step === 3 && completedOrder && (
          <div className="p-8 space-y-6 text-center">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-300">
              <PackageCheck size={32} />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-montserrat uppercase tracking-[0.2em] text-[#C8A24A] font-bold">
                Thank You For Your Order
              </span>
              <h2 className="font-cormorant text-4xl font-bold text-[#1F1F1F]">
                Order {completedOrder.orderId} Confirmed
              </h2>
              <p className="text-xs font-inter text-[#666666]">
                A confirmation SMS and invoice email have been sent to <strong>{completedOrder.email}</strong>.
              </p>
            </div>

            {/* Order Details Card */}
            <div className="bg-[#F4F1EA] border border-[#E8E2D7] rounded-2xl p-6 text-left space-y-4 max-w-lg mx-auto">
              <div className="flex justify-between items-center text-xs border-b border-[#E8E2D7] pb-3">
                <span className="font-montserrat uppercase font-bold text-gray-500">Estimated Delivery:</span>
                <span className="font-cormorant font-bold text-base text-[#1F1F1F]">{completedOrder.estimatedDelivery}</span>
              </div>

              <div className="space-y-2 text-xs font-inter">
                <span className="font-montserrat uppercase text-[10px] text-gray-500 font-bold block">Items Ordered:</span>
                {completedOrder.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between">
                    <span>{item.quantity}x {item.product.name} ({item.selectedSize})</span>
                    <span className="font-semibold">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-[#E8E2D7] flex justify-between items-center text-xs font-montserrat font-bold text-[#1F1F1F]">
                <span>Total Paid ({completedOrder.paymentMethod}):</span>
                <span className="font-cormorant text-xl">₹{completedOrder.total}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              {onOpenOrders && (
                <button
                  onClick={() => {
                    const id = completedOrder.orderId;
                    onClose();
                    onOpenOrders(id);
                  }}
                  className="bg-[#C8A24A] text-[#1F1F1F] hover:bg-[#1F1F1F] hover:text-[#C8A24A] px-7 py-3 rounded-full font-montserrat text-xs uppercase tracking-wider font-bold transition-all cursor-pointer flex items-center gap-2 shadow-md"
                >
                  <Truck size={16} />
                  <span>Track Live Order #{completedOrder.orderId}</span>
                </button>
              )}

              <button
                onClick={onClose}
                className="bg-[#1F1F1F] text-[#C8A24A] px-7 py-3 rounded-full font-montserrat text-xs uppercase tracking-wider font-bold hover:bg-[#C8A24A] hover:text-[#1F1F1F] transition-all cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
