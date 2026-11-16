import React from 'react';
import { motion } from 'motion/react';
import {
  Check,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  XCircle,
  RotateCcw,
  Sparkles,
  MapPin,
  ShieldCheck,
  Building2,
  Navigation
} from 'lucide-react';
import { OrderTrackingStep, OrderStatus } from '../../types';

interface OrderTrackingTimelineProps {
  timeline: OrderTrackingStep[];
  currentStatus: OrderStatus;
  courierPartner: string;
  trackingNumber: string;
  estimatedDelivery: string;
}

export const OrderTrackingTimeline: React.FC<OrderTrackingTimelineProps> = ({
  timeline,
  currentStatus,
  courierPartner,
  trackingNumber,
  estimatedDelivery
}) => {
  // Map icons for steps
  const getStepIcon = (stepName: OrderStatus) => {
    switch (stepName) {
      case 'Order Placed':
        return Clock;
      case 'Confirmed':
        return ShieldCheck;
      case 'Packed':
        return Package;
      case 'Shipped':
        return Truck;
      case 'Out For Delivery':
        return Navigation;
      case 'Delivered':
        return CheckCircle2;
      case 'Cancelled':
        return XCircle;
      case 'Returned':
      case 'Refunded':
        return RotateCcw;
      default:
        return Package;
    }
  };

  const isTerminalCancelled = currentStatus === 'Cancelled';
  const isTerminalReturned = currentStatus === 'Returned' || currentStatus === 'Refunded';

  if (isTerminalCancelled) {
    return (
      <div className="bg-[#FFF5F5] border border-rose-200 rounded-2xl p-5 text-center space-y-2">
        <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto">
          <XCircle size={24} />
        </div>
        <h4 className="font-montserrat font-bold text-rose-800 text-sm">Order Cancelled</h4>
        <p className="text-xs text-rose-600 font-inter">
          This order was cancelled. Any pre-paid amount has been initiated for 100% refund to original payment mode.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Shipment Live Info Banner */}
      <div className="bg-[#171717] text-white p-5 rounded-2xl border border-[#C8A24A]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-[10px] font-montserrat uppercase tracking-[0.2em] text-[#C8A24A] font-bold">
              {courierPartner}
            </span>
          </div>
          <p className="font-cormorant text-xl font-bold text-white">
            Tracking #: <span className="font-mono text-[#C8A24A]">{trackingNumber}</span>
          </p>
        </div>

        <div className="sm:text-right bg-[#222222] px-4 py-2.5 rounded-xl border border-[#333]">
          <span className="text-[10px] font-montserrat uppercase text-gray-400 block font-bold">
            Est. Delivery Date
          </span>
          <span className="text-xs font-montserrat font-bold text-[#C8A24A]">
            {estimatedDelivery}
          </span>
        </div>
      </div>

      {/* Progress Timeline Stepper */}
      <div className="relative py-4">
        {/* Horizontal Connector Line for Desktop */}
        <div className="hidden md:block absolute top-10 left-[8%] right-[8%] h-1 bg-[#E8E2D7] rounded-full z-0 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#C8A24A] via-[#E2C785] to-[#1F1F1F]"
            initial={{ width: '0%' }}
            animate={{
              width: `${
                (timeline.filter((s) => s.completed).length / Math.max(1, timeline.length - 1)) * 100
              }%`
            }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          />
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 relative z-10">
          {timeline.map((step, idx) => {
            const Icon = getStepIcon(step.step);

            return (
              <div
                key={idx}
                className={`flex md:flex-col items-center md:items-center gap-4 md:gap-2 text-left md:text-center ${
                  step.completed || step.current ? 'opacity-100' : 'opacity-40'
                }`}
              >
                {/* Node Circle */}
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shrink-0 ${
                    step.current
                      ? 'bg-[#1F1F1F] text-[#C8A24A] border-2 border-[#C8A24A] shadow-[0_0_15px_rgba(200,162,74,0.5)] scale-110'
                      : step.completed
                      ? 'bg-[#C8A24A] text-[#1F1F1F]'
                      : 'bg-[#F4F1EA] text-gray-400 border border-[#E8E2D7]'
                  }`}
                >
                  <Icon size={18} />
                </div>

                {/* Text Content */}
                <div className="min-w-0">
                  <h5 className="font-montserrat uppercase font-bold text-[11px] text-[#1F1F1F] tracking-wide">
                    {step.step}
                  </h5>
                  <p className="text-[10px] text-gray-500 font-inter line-clamp-2 mt-0.5">
                    {step.label}
                  </p>
                  {step.timestamp && (
                    <span className="text-[9px] font-mono font-semibold text-[#C8A24A] block mt-1">
                      {step.timestamp}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
