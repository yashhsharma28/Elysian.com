import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Filter,
  Eye,
  Printer,
  Truck,
  CheckCircle2,
  Clock,
  XCircle,
  RotateCw,
  X,
  FileText,
  MapPin,
  Send,
  AlertCircle,
  ShoppingBag,
  IndianRupee,
  TrendingUp,
  PackageCheck,
  RotateCcw
} from 'lucide-react';
import { OrderDetails, OrderStatus, ReturnRequest } from '../../../types';
import { getStoredOrders, saveOrdersToStorage } from '../../../data/mockOrders';
import { approveReturnApi, fetchOrdersApi, updateOrderApi } from '../../../lib/ordersApi';
import { InvoiceTemplate } from '../../orders/InvoiceTemplate';

export const OrdersView: React.FC = () => {
  const [orders, setOrders] = useState<OrderDetails[]>(getStoredOrders());
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedOrderForInvoice, setSelectedOrderForInvoice] = useState<OrderDetails | null>(null);
  const [selectedOrderForEdit, setSelectedOrderForEdit] = useState<OrderDetails | null>(null);

  useEffect(() => {
    saveOrdersToStorage(orders);
  }, [orders]);

  useEffect(() => {
    let active = true;
    fetchOrdersApi()
      .then((res) => {
        if (!active || !res.configured || !Array.isArray(res.orders) || res.orders.length === 0) return;
        setOrders((prev) => {
          const dbIds = new Set(res.orders.map((o) => o.orderId));
          return [...res.orders, ...prev.filter((o) => !dbIds.has(o.orderId))];
        });
      })
      .catch((err) => {
        console.error('Failed to sync admin orders from Supabase:', err);
      });
    return () => {
      active = false;
    };
  }, []);

  // Calculations for Order Analytics
  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => ['Order Placed', 'Confirmed', 'Packed'].includes(o.status)).length;
  const inTransitOrders = orders.filter((o) => ['Shipped', 'Out For Delivery'].includes(o.status)).length;
  const deliveredOrders = orders.filter((o) => o.status === 'Delivered').length;
  const cancelledOrders = orders.filter((o) => o.status === 'Cancelled').length;
  const returnedOrders = orders.filter((o) => ['Returned', 'Refunded'].includes(o.status)).length;
  const totalRevenue = orders.reduce((sum, o) => (o.status !== 'Cancelled' ? sum + o.total : sum), 0);
  const avgOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.items.some((i) => i.product.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus =
      statusFilter === 'All' ||
      o.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  const handleUpdateStatus = (orderId: string, newStatus: OrderStatus) => {
    const existing = orders.find((o) => o.orderId === orderId);
    const isDelivered = newStatus === 'Delivered';
    const isCancelled = newStatus === 'Cancelled';
    const isRefunded = newStatus === 'Refunded';
    const nextCanCancel = ['Order Placed', 'Confirmed', 'Packed'].includes(newStatus);
    const nextCanReturn = isDelivered && !existing?.returnRequest;
    const nextPaymentStatus =
      isRefunded || isCancelled ? 'Refunded' : existing?.paymentStatus;

    setOrders((prev) =>
      prev.map((o) => {
        if (o.orderId === orderId) {
          return {
            ...o,
            status: newStatus,
            canCancel: nextCanCancel,
            canReturn: nextCanReturn,
            paymentStatus: (nextPaymentStatus || o.paymentStatus) as any
          };
        }
        return o;
      })
    );

    updateOrderApi(orderId, {
      status: newStatus,
      canCancel: nextCanCancel,
      canReturn: nextCanReturn,
      paymentStatus: nextPaymentStatus
    }).catch((err) => console.error('Failed to update order status in Supabase:', err));
  };

  const handleUpdateCourier = (orderId: string, courier: string, tracking: string) => {
    setOrders((prev) =>
      prev.map((o) => (o.orderId === orderId ? { ...o, courierPartner: courier, trackingNumber: tracking } : o))
    );
    updateOrderApi(orderId, { courierPartner: courier, trackingNumber: tracking }).catch((err) =>
      console.error('Failed to update courier in Supabase:', err)
    );
  };

  const handleApproveReturn = (orderId: string) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.orderId === orderId && o.returnRequest) {
          return {
            ...o,
            status: 'Refunded' as OrderStatus,
            paymentStatus: 'Refunded' as any,
            returnRequest: {
              ...o.returnRequest,
              status: 'Completed',
              updatedAt: new Date().toISOString().split('T')[0]
            }
          };
        }
        return o;
      })
    );

    approveReturnApi(orderId).catch((err) =>
      console.error('Failed to approve return in Supabase:', err)
    );
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto text-[#1F1F1F]">
      
      {/* Header */}
      <div className="bg-white border border-[#E8E2D7] p-6 rounded-[24px] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-cormorant text-3xl font-light text-[#1F1F1F]">
            Order Fulfillment & <span className="italic text-[#C8A24A]">Pan-India Logistics</span>
          </h1>
          <p className="font-inter text-xs text-gray-500 font-light pt-1">
            Real-time control tower for ELYSIAN air freight orders, status dispatch, returns & tax invoices.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-montserrat uppercase font-bold text-[#C8A24A] bg-[#C8A24A]/10 px-3.5 py-1.5 rounded-full border border-[#C8A24A]/30">
            Pan-India Express Air Freight
          </span>
        </div>
      </div>

      {/* Order Analytics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-[#E8E2D7] p-5 rounded-2xl shadow-sm space-y-1">
          <span className="text-[10px] font-montserrat uppercase font-bold text-gray-400 block">Total Revenue</span>
          <div className="flex items-center justify-between">
            <span className="font-cormorant text-2xl font-bold text-[#C8A24A]">₹{totalRevenue}</span>
            <TrendingUp size={18} className="text-emerald-600" />
          </div>
          <span className="text-[10px] text-gray-500 font-inter">Avg Order Value: ₹{avgOrderValue}</span>
        </div>

        <div className="bg-white border border-[#E8E2D7] p-5 rounded-2xl shadow-sm space-y-1">
          <span className="text-[10px] font-montserrat uppercase font-bold text-gray-400 block">Pending & Packing</span>
          <div className="flex items-center justify-between">
            <span className="font-cormorant text-2xl font-bold text-blue-800">{pendingOrders}</span>
            <Clock size={18} className="text-blue-600" />
          </div>
          <span className="text-[10px] text-gray-500 font-inter">Needs Vault Dispatch</span>
        </div>

        <div className="bg-white border border-[#E8E2D7] p-5 rounded-2xl shadow-sm space-y-1">
          <span className="text-[10px] font-montserrat uppercase font-bold text-gray-400 block">In-Transit / Air Courier</span>
          <div className="flex items-center justify-between">
            <span className="font-cormorant text-2xl font-bold text-amber-700">{inTransitOrders}</span>
            <Truck size={18} className="text-amber-600" />
          </div>
          <span className="text-[10px] text-gray-500 font-inter">Delhivery / BlueDart Live</span>
        </div>

        <div className="bg-white border border-[#E8E2D7] p-5 rounded-2xl shadow-sm space-y-1">
          <span className="text-[10px] font-montserrat uppercase font-bold text-gray-400 block">Delivered Parfums</span>
          <div className="flex items-center justify-between">
            <span className="font-cormorant text-2xl font-bold text-emerald-700">{deliveredOrders}</span>
            <PackageCheck size={18} className="text-emerald-600" />
          </div>
          <span className="text-[10px] text-gray-500 font-inter">100% Signed & Confirmed</span>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="bg-white border border-[#E8E2D7] p-4 sm:p-5 rounded-2xl shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {['All', 'Order Placed', 'Confirmed', 'Packed', 'Shipped', 'Out For Delivery', 'Delivered', 'Cancelled', 'Returned'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3.5 py-2 rounded-full text-xs font-montserrat uppercase font-bold transition-all shrink-0 cursor-pointer ${
                  statusFilter === st
                    ? 'bg-[#1F1F1F] text-[#C8A24A]'
                    : 'bg-[#F8F6F2] text-[#1F1F1F] hover:bg-[#E8E2D7]'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Order ID, Name, Tracking..."
              className="w-full bg-[#F8F6F2] border border-[#E8E2D7] rounded-full pl-9 pr-4 py-2 text-xs font-inter focus:outline-none focus:border-[#C8A24A]"
            />
          </div>
        </div>
      </div>

      {/* Orders Management Table */}
      <div className="bg-white border border-[#E8E2D7] rounded-3xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-inter">
            <thead className="bg-[#171717] text-[#C8A24A] font-montserrat uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3.5 px-6">Order ID & Date</th>
                <th className="py-3.5 px-4">Customer Details</th>
                <th className="py-3.5 px-4">Perfumes & Grand Total</th>
                <th className="py-3.5 px-4">Air Courier Partner & AWB</th>
                <th className="py-3.5 px-4">Logistics Status</th>
                <th className="py-3.5 px-6 text-right">Actions & Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F4F1EA]">
              {filteredOrders.map((o) => (
                <tr key={o.orderId} className="hover:bg-[#F8F6F2] transition-colors">
                  
                  {/* ID */}
                  <td className="py-4 px-6">
                    <div className="font-montserrat font-bold text-[#1F1F1F]">{o.orderId}</div>
                    <div className="text-[10px] text-gray-400">{o.orderDate}</div>
                    {o.returnRequest && (
                      <span className="text-[9px] font-bold bg-purple-100 text-purple-900 px-2 py-0.5 rounded-full inline-block mt-1">
                        Return Requested
                      </span>
                    )}
                  </td>

                  {/* Customer */}
                  <td className="py-4 px-4">
                    <div className="font-bold text-[#1F1F1F]">{o.customerName}</div>
                    <div className="text-[10px] text-gray-500">{o.city}, {o.state}</div>
                    <div className="text-[10px] text-[#C8A24A] font-mono">{o.phone}</div>
                  </td>

                  {/* Items */}
                  <td className="py-4 px-4">
                    <div className="font-semibold text-[#1F1F1F]">
                      {o.items.map((i) => i.product.name).join(', ')}
                    </div>
                    <div className="text-[10px] font-bold text-[#C8A24A]">
                      ₹{o.total} ({o.paymentMethod} - {o.paymentStatus})
                    </div>
                  </td>

                  {/* Courier Partner & AWB */}
                  <td className="py-4 px-4">
                    <div className="font-bold text-[#1F1F1F]">{o.courierPartner}</div>
                    <div className="text-[10px] font-mono text-gray-500">{o.trackingNumber}</div>
                  </td>

                  {/* Status Dropdown */}
                  <td className="py-4 px-4">
                    <select
                      value={o.status}
                      onChange={(e) => handleUpdateStatus(o.orderId, e.target.value as any)}
                      className="bg-[#F8F6F2] border border-[#E8E2D7] rounded-full px-2.5 py-1 text-[10px] font-montserrat uppercase font-bold text-[#1F1F1F] cursor-pointer focus:outline-none focus:border-[#C8A24A]"
                    >
                      <option value="Order Placed">Order Placed</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Packed">Packed</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Out For Delivery">Out For Delivery</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                      <option value="Returned">Returned</option>
                      <option value="Refunded">Refunded</option>
                    </select>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-6 text-right space-x-2">
                    {o.returnRequest && o.returnRequest.status !== 'Completed' && (
                      <button
                        onClick={() => handleApproveReturn(o.orderId)}
                        className="bg-emerald-700 text-white hover:bg-emerald-800 p-2 rounded-lg transition-all cursor-pointer inline-flex items-center gap-1 text-[10px] font-montserrat uppercase font-bold"
                        title="Approve Return & Process Refund"
                      >
                        <CheckCircle2 size={14} />
                        <span className="hidden sm:inline">Approve Refund</span>
                      </button>
                    )}

                    <button
                      onClick={() => setSelectedOrderForInvoice(o)}
                      className="bg-[#1F1F1F] text-[#C8A24A] hover:bg-[#C8A24A] hover:text-[#1F1F1F] p-2 rounded-lg transition-all cursor-pointer inline-flex items-center gap-1 text-[10px] font-montserrat uppercase font-bold"
                      title="Print Tax Invoice"
                    >
                      <Printer size={14} />
                      <span className="hidden sm:inline">Invoice</span>
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Printable Invoice Modal */}
      <AnimatePresence>
        {selectedOrderForInvoice && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md overflow-y-auto">
            <div className="max-w-3xl w-full my-8">
              <InvoiceTemplate
                order={selectedOrderForInvoice}
                onClose={() => setSelectedOrderForInvoice(null)}
              />
            </div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
