import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Users,
  Search,
  Star,
  ShoppingBag,
  Award,
  Mail,
  Phone,
  MapPin,
  X,
  Sparkles,
  Gift,
  CheckCircle2
} from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  ordersCount: number;
  totalSpent: number;
  vipTier: 'Gold' | 'Platinum' | 'Diamond';
  rewardPoints: number;
  favoriteScent: string;
  joinedDate: string;
}

const SAMPLE_CUSTOMERS: Customer[] = [
  {
    id: 'CUST-101',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@example.com',
    phone: '+91 98765 43210',
    city: 'Noida, UP',
    ordersCount: 8,
    totalSpent: 7992,
    vipTier: 'Diamond',
    rewardPoints: 1250,
    favoriteScent: 'Midnight Amber',
    joinedDate: 'Jan 2025'
  },
  {
    id: 'CUST-102',
    name: 'Ananya Verma',
    email: 'ananya.v@example.com',
    phone: '+91 98111 22334',
    city: 'Mumbai, MH',
    ordersCount: 5,
    totalSpent: 4495,
    vipTier: 'Platinum',
    rewardPoints: 680,
    favoriteScent: 'Aura De Soir',
    joinedDate: 'Mar 2025'
  },
  {
    id: 'CUST-103',
    name: 'Rohan Mehta',
    email: 'rohan.m@example.com',
    phone: '+91 97222 33445',
    city: 'Bengaluru, KA',
    ordersCount: 3,
    totalSpent: 2697,
    vipTier: 'Gold',
    rewardPoints: 320,
    favoriteScent: 'Verdant Aura',
    joinedDate: 'May 2025'
  },
  {
    id: 'CUST-104',
    name: 'Priya Iyer',
    email: 'priya.iyer@example.com',
    phone: '+91 96333 44556',
    city: 'Chennai, TN',
    ordersCount: 12,
    totalSpent: 11988,
    vipTier: 'Diamond',
    rewardPoints: 2400,
    favoriteScent: 'Noir Absolute',
    joinedDate: 'Nov 2024'
  }
];

export const CustomersView: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>(SAMPLE_CUSTOMERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="bg-white border border-[#E8E2D7] p-6 rounded-[24px] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-cormorant text-3xl font-light text-[#1F1F1F]">
            Customer CRM & <span className="italic text-[#C8A24A]">VIP Connoisseurs</span>
          </h1>
          <p className="font-inter text-xs text-gray-500 font-light pt-1">
            Manage customer profiles, lifetime value, reward points, and order histories.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Customer Name or Email..."
              className="w-full bg-[#F8F6F2] border border-[#E8E2D7] rounded-full pl-9 pr-4 py-2 text-xs font-inter focus:outline-none focus:border-[#C8A24A]"
            />
          </div>
        </div>
      </div>

      {/* Customer List Table */}
      <div className="bg-white border border-[#E8E2D7] rounded-3xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-inter">
            <thead className="bg-[#171717] text-[#C8A24A] font-montserrat uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3.5 px-6">Customer Profile</th>
                <th className="py-3.5 px-4">Location</th>
                <th className="py-3.5 px-4">VIP Tier & Points</th>
                <th className="py-3.5 px-4">Total Orders</th>
                <th className="py-3.5 px-4">Lifetime Spend</th>
                <th className="py-3.5 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F4F1EA]">
              {filteredCustomers.map((c) => (
                <tr key={c.id} className="hover:bg-[#F8F6F2] transition-colors">
                  
                  {/* Name */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-[#1F1F1F] text-[#C8A24A] font-bold flex items-center justify-center text-xs">
                        {c.name.split(' ').map((n) => n[0]).join('')}
                      </div>
                      <div>
                        <h4 className="font-montserrat text-xs font-bold text-[#1F1F1F]">{c.name}</h4>
                        <p className="text-[11px] text-gray-500">{c.email}</p>
                      </div>
                    </div>
                  </td>

                  {/* Location */}
                  <td className="py-4 px-4 font-medium text-gray-600">
                    {c.city}
                  </td>

                  {/* VIP Tier */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1.5">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-montserrat font-bold bg-[#C8A24A]/20 text-[#1F1F1F] border border-[#C8A24A]/40">
                        {c.vipTier} VIP
                      </span>
                      <span className="text-[10px] text-gray-500">({c.rewardPoints} pts)</span>
                    </div>
                  </td>

                  {/* Orders Count */}
                  <td className="py-4 px-4 font-bold text-[#1F1F1F]">
                    {c.ordersCount} Orders
                  </td>

                  {/* Lifetime Spend */}
                  <td className="py-4 px-4 font-bold text-[#C8A24A]">
                    ₹{c.totalSpent.toLocaleString()}
                  </td>

                  {/* Action */}
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => setSelectedCustomer(c)}
                      className="bg-[#1F1F1F] text-[#C8A24A] hover:bg-[#C8A24A] hover:text-[#1F1F1F] px-3.5 py-1.5 rounded-full text-[10px] font-montserrat uppercase font-bold transition-all cursor-pointer"
                    >
                      View Profile
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Profile Drawer / Modal */}
      <AnimatePresence>
        {selectedCustomer && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-[#E8E2D7] rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative"
            >
              <div className="flex items-center justify-between border-b border-[#F4F1EA] pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#1F1F1F] text-[#C8A24A] font-bold flex items-center justify-center text-sm">
                    {selectedCustomer.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="font-montserrat font-bold text-[#1F1F1F] text-base">{selectedCustomer.name}</h3>
                    <p className="text-xs text-gray-500">Member since {selectedCustomer.joinedDate}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCustomer(null)}
                  className="p-1.5 text-gray-400 hover:text-black rounded-full cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="space-y-4 text-xs font-inter">
                <div className="grid grid-cols-2 gap-3 bg-[#F8F6F2] p-4 rounded-2xl">
                  <div>
                    <span className="text-[10px] font-montserrat uppercase font-bold text-gray-400 block">Total Spend</span>
                    <span className="font-cormorant text-2xl font-bold text-[#C8A24A]">₹{selectedCustomer.totalSpent}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-montserrat uppercase font-bold text-gray-400 block">Reward Points</span>
                    <span className="font-cormorant text-2xl font-bold text-[#1F1F1F]">{selectedCustomer.rewardPoints} Pts</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="flex items-center gap-2 text-gray-600">
                    <Mail size={14} className="text-[#C8A24A]" />
                    <span>{selectedCustomer.email}</span>
                  </p>
                  <p className="flex items-center gap-2 text-gray-600">
                    <Phone size={14} className="text-[#C8A24A]" />
                    <span>{selectedCustomer.phone}</span>
                  </p>
                  <p className="flex items-center gap-2 text-gray-600">
                    <MapPin size={14} className="text-[#C8A24A]" />
                    <span>{selectedCustomer.city}</span>
                  </p>
                  <p className="flex items-center gap-2 text-gray-600">
                    <Sparkles size={14} className="text-[#C8A24A]" />
                    <span>Favorite Scent: <strong>{selectedCustomer.favoriteScent}</strong></span>
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#F4F1EA] flex justify-end">
                <button
                  onClick={() => setSelectedCustomer(null)}
                  className="bg-[#1F1F1F] text-[#C8A24A] font-montserrat uppercase text-xs font-bold px-6 py-2.5 rounded-full cursor-pointer"
                >
                  Close
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
