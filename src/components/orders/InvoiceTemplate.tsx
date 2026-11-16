import React from 'react';
import { OrderDetails } from '../../types';
import { Printer, Download, CheckCircle2, Shield } from 'lucide-react';

interface InvoiceTemplateProps {
  order: OrderDetails;
  onClose?: () => void;
}

export const InvoiceTemplate: React.FC<InvoiceTemplateProps> = ({ order, onClose }) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white p-6 sm:p-10 rounded-3xl border border-[#E8E2D7] shadow-xl max-w-3xl mx-auto space-y-8 text-[#1F1F1F]">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#E8E2D7] pb-6">
        <div>
          <h1 className="font-cormorant text-3xl font-light tracking-wider uppercase text-[#1F1F1F]">
            ELYSIAN
          </h1>
          <p className="font-montserrat text-[10px] tracking-[0.2em] uppercase text-[#C8A24A] font-bold">
            Haute Parfumerie Atelier • Tax Invoice
          </p>
        </div>

        <div className="text-left sm:text-right space-y-1">
          <span className="inline-block bg-[#171717] text-[#C8A24A] text-[10px] font-montserrat uppercase font-bold px-3 py-1 rounded-full">
            INVOICE NO: {order.orderId}-INV
          </span>
          <p className="text-xs font-inter text-gray-500">Date: {order.orderDate}</p>
          <p className="text-[10px] font-mono text-gray-400">GSTIN: 07AAACE1209K1ZX</p>
        </div>
      </div>

      {/* Seller & Customer Addresses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-[#F8F6F2] p-5 rounded-2xl border border-[#E8E2D7]">
        <div className="space-y-1">
          <h4 className="font-montserrat font-bold text-[10px] uppercase text-[#C8A24A] tracking-wider">
            Seller & Dispatch Atelier
          </h4>
          <p className="font-bold text-xs">ELYSIAN Parfums India Pvt. Ltd.</p>
          <p className="text-xs text-gray-600">Plot No. 42, Perfumers Vault, Sector 107</p>
          <p className="text-xs text-gray-600">Noida, Uttar Pradesh – 201301</p>
          <p className="text-xs text-gray-600">Care: concierge@elysianparfums.com | +91 1800-ELYSIAN</p>
        </div>

        <div className="space-y-1">
          <h4 className="font-montserrat font-bold text-[10px] uppercase text-[#C8A24A] tracking-wider">
            Billed & Shipped To
          </h4>
          <p className="font-bold text-xs">{order.customerName}</p>
          <p className="text-xs text-gray-600">{order.address}</p>
          <p className="text-xs text-gray-600">{order.city}, {order.state} - {order.pincode}</p>
          <p className="text-xs text-gray-600">Phone: {order.phone} | Email: {order.email}</p>
        </div>
      </div>

      {/* Order & Payment Meta Details */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-inter border-y border-[#E8E2D7] py-4">
        <div>
          <span className="text-gray-400 text-[10px] font-montserrat uppercase block font-semibold">Payment Mode</span>
          <span className="font-bold text-[#1F1F1F]">{order.paymentMethod}</span>
        </div>
        <div>
          <span className="text-gray-400 text-[10px] font-montserrat uppercase block font-semibold">Payment Status</span>
          <span className={`font-bold text-xs ${order.paymentStatus === 'Paid' ? 'text-emerald-700' : 'text-amber-700'}`}>
            {order.paymentStatus}
          </span>
        </div>
        <div>
          <span className="text-gray-400 text-[10px] font-montserrat uppercase block font-semibold">Air Courier Partner</span>
          <span className="font-bold text-[#1F1F1F]">{order.courierPartner}</span>
        </div>
        <div>
          <span className="text-gray-400 text-[10px] font-montserrat uppercase block font-semibold">Tracking AWB #</span>
          <span className="font-bold font-mono text-[#C8A24A]">{order.trackingNumber}</span>
        </div>
      </div>

      {/* Itemized Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-inter border-collapse">
          <thead>
            <tr className="bg-[#171717] text-[#C8A24A] font-montserrat uppercase text-[10px] tracking-wider">
              <th className="py-3 px-4 rounded-l-xl">Fragrance Item</th>
              <th className="py-3 px-4">Size</th>
              <th className="py-3 px-4 text-center">Qty</th>
              <th className="py-3 px-4 text-right">Unit Price</th>
              <th className="py-3 px-4 text-right rounded-r-xl">Amount (₹)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F4F1EA]">
            {order.items.map((item, idx) => (
              <tr key={idx} className="hover:bg-[#F8F6F2]">
                <td className="py-3.5 px-4 font-bold text-[#1F1F1F]">
                  {item.product.name}
                  <span className="block text-[10px] font-normal text-gray-500">{item.product.subTitle}</span>
                </td>
                <td className="py-3.5 px-4 font-mono text-gray-600">{item.selectedSize}</td>
                <td className="py-3.5 px-4 text-center font-bold">{item.quantity}</td>
                <td className="py-3.5 px-4 text-right text-gray-600">₹{item.price}</td>
                <td className="py-3.5 px-4 text-right font-bold text-[#1F1F1F]">₹{item.price * item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tax Computation Summary */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 pt-2">
        <div className="space-y-2 max-w-sm">
          <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 px-3 py-2 rounded-xl text-xs font-medium border border-emerald-200">
            <CheckCircle2 size={16} />
            <span>Inclusive of 18% Integrated GST & Air Express Insurance</span>
          </div>
          <p className="text-[10px] text-gray-400 font-inter">
            This invoice is computer generated and valid without physical signature under IT Act 2000.
          </p>
        </div>

        <div className="w-full sm:w-64 space-y-2 text-xs font-inter border-t sm:border-t-0 border-[#E8E2D7] pt-4 sm:pt-0">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span className="font-mono font-bold">₹{order.subtotal}</span>
          </div>
          {order.discount > 0 && (
            <div className="flex justify-between text-emerald-600 font-semibold">
              <span>Privilege Discount ({order.couponCode || 'PROMO'})</span>
              <span className="font-mono">-₹{order.discount}</span>
            </div>
          )}
          <div className="flex justify-between text-gray-600">
            <span>Integrated GST (18%)</span>
            <span className="font-mono">₹{order.gstAmount}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Express Delivery</span>
            <span className="text-emerald-600 font-bold uppercase text-[10px]">FREE</span>
          </div>
          <div className="flex justify-between font-montserrat font-bold text-base text-[#1F1F1F] border-t border-[#E8E2D7] pt-2">
            <span>Grand Total</span>
            <span className="text-[#C8A24A]">₹{order.total}</span>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center justify-end gap-3 border-t border-[#E8E2D7] pt-6 print:hidden">
        {onClose && (
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-full border border-gray-300 text-xs font-montserrat uppercase font-bold text-gray-600 hover:bg-gray-100 cursor-pointer"
          >
            Close
          </button>
        )}
        <button
          onClick={handlePrint}
          className="bg-[#C8A24A] text-[#1F1F1F] font-montserrat uppercase text-xs font-bold px-6 py-2.5 rounded-full hover:bg-[#1F1F1F] hover:text-[#C8A24A] transition-all cursor-pointer flex items-center gap-2 shadow-md"
        >
          <Printer size={16} />
          <span>Print / Save Tax Invoice</span>
        </button>
      </div>

    </div>
  );
};
