import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Bell,
  X,
  Check,
  Package,
  Truck,
  CheckCircle2,
  Mail,
  Smartphone,
  Info,
  SlidersHorizontal
} from 'lucide-react';
import { OrderNotification } from '../../types';

interface OrderNotificationsDrawerProps {
  notifications: OrderNotification[];
  isOpen: boolean;
  onClose: () => void;
  onMarkAsRead: (id: string) => void;
  onClearAll: () => void;
}

export const OrderNotificationsDrawer: React.FC<OrderNotificationsDrawerProps> = ({
  notifications,
  isOpen,
  onClose,
  onMarkAsRead,
  onClearAll
}) => {
  const [channels, setChannels] = useState({
    email: true,
    sms: true,
    push: true,
    inApp: true
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="bg-white border-l border-[#E8E2D7] w-full max-w-md h-full p-6 space-y-6 shadow-2xl flex flex-col justify-between text-[#1F1F1F]"
      >
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-[#F4F1EA] pb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-[#C8A24A]/10 text-[#C8A24A] rounded-xl">
                <Bell size={20} />
              </div>
              <h3 className="font-cormorant text-2xl font-bold text-[#1F1F1F]">
                Order Alerts & Logs
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-black rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Toggle Channels Bar */}
          <div className="bg-[#F8F6F2] p-3.5 rounded-2xl border border-[#E8E2D7] space-y-2">
            <span className="text-[10px] font-montserrat uppercase font-bold text-gray-500 block">
              Alert Delivery Channels
            </span>
            <div className="grid grid-cols-4 gap-1 text-[10px] font-montserrat font-bold">
              <button
                onClick={() => setChannels((p) => ({ ...p, inApp: !p.inApp }))}
                className={`py-1.5 px-2 rounded-xl cursor-pointer border text-center transition-all ${
                  channels.inApp
                    ? 'bg-[#171717] text-[#C8A24A] border-[#171717]'
                    : 'bg-white text-gray-400 border-[#E8E2D7]'
                }`}
              >
                In-App
              </button>
              <button
                onClick={() => setChannels((p) => ({ ...p, email: !p.email }))}
                className={`py-1.5 px-2 rounded-xl cursor-pointer border text-center transition-all ${
                  channels.email
                    ? 'bg-[#171717] text-[#C8A24A] border-[#171717]'
                    : 'bg-white text-gray-400 border-[#E8E2D7]'
                }`}
              >
                Email
              </button>
              <button
                onClick={() => setChannels((p) => ({ ...p, sms: !p.sms }))}
                className={`py-1.5 px-2 rounded-xl cursor-pointer border text-center transition-all ${
                  channels.sms
                    ? 'bg-[#171717] text-[#C8A24A] border-[#171717]'
                    : 'bg-white text-gray-400 border-[#E8E2D7]'
                }`}
              >
                SMS
              </button>
              <button
                onClick={() => setChannels((p) => ({ ...p, push: !p.push }))}
                className={`py-1.5 px-2 rounded-xl cursor-pointer border text-center transition-all ${
                  channels.push
                    ? 'bg-[#171717] text-[#C8A24A] border-[#171717]'
                    : 'bg-white text-gray-400 border-[#E8E2D7]'
                }`}
              >
                Push
              </button>
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1 py-2">
          {notifications.length === 0 ? (
            <div className="text-center py-12 space-y-2 text-gray-400">
              <Bell size={32} className="mx-auto opacity-40" />
              <p className="text-xs font-inter">No new order notifications.</p>
            </div>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                onClick={() => onMarkAsRead(n.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer relative ${
                  !n.read
                    ? 'bg-[#C8A24A]/5 border-[#C8A24A] shadow-sm'
                    : 'bg-[#F8F6F2] border-[#E8E2D7] opacity-80'
                }`}
              >
                {!n.read && (
                  <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-[#C8A24A] animate-pulse"></span>
                )}
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-white rounded-xl border border-[#E8E2D7] text-[#C8A24A]">
                    <Package size={16} />
                  </div>
                  <div className="space-y-1 pr-4">
                    <h5 className="font-montserrat font-bold text-xs text-[#1F1F1F]">
                      {n.title}
                    </h5>
                    <p className="text-xs text-gray-600 font-inter leading-relaxed">
                      {n.message}
                    </p>
                    <div className="flex items-center gap-2 pt-1">
                      <span className="text-[10px] font-mono text-[#C8A24A] font-semibold">
                        {n.orderId}
                      </span>
                      <span className="text-[10px] text-gray-400">• {n.timestamp}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Actions */}
        <div className="border-t border-[#F4F1EA] pt-4 flex items-center justify-between">
          <button
            onClick={onClearAll}
            className="text-xs text-gray-500 hover:text-black font-montserrat uppercase font-bold cursor-pointer"
          >
            Clear All Alerts
          </button>
          <button
            onClick={onClose}
            className="bg-[#171717] text-[#C8A24A] font-montserrat uppercase text-xs font-bold px-5 py-2.5 rounded-full hover:bg-[#C8A24A] hover:text-[#171717] transition-all cursor-pointer"
          >
            Done
          </button>
        </div>
      </motion.div>
    </div>
  );
};
