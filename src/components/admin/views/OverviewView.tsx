import React from 'react';
import { motion } from 'motion/react';
import {
  TrendingUp,
  ShoppingBag,
  DollarSign,
  Users,
  Boxes,
  Mail,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  PackageCheck,
  RotateCcw,
  AlertTriangle,
  ChevronRight,
  Eye,
  Plus
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface OverviewViewProps {
  onNavigate: (view: string) => void;
}

// Simulated Financial & Sales Data
const revenueData = [
  { day: 'Mon', revenue: 18400, orders: 19 },
  { day: 'Tue', revenue: 24200, orders: 25 },
  { day: 'Wed', revenue: 31000, orders: 32 },
  { day: 'Thu', revenue: 28900, orders: 28 },
  { day: 'Fri', revenue: 42500, orders: 44 },
  { day: 'Sat', revenue: 58100, orders: 61 },
  { day: 'Sun', revenue: 64200, orders: 68 }
];

const categorySalesData = [
  { name: 'Oud & Amber', value: 42, color: '#C8A24A' },
  { name: 'Floral Extraits', value: 28, color: '#1F1F1F' },
  { name: 'Citrus & Vetiver', value: 18, color: '#888888' },
  { name: 'Gourmand Vanilla', value: 12, color: '#D8B36A' }
];

const topProducts = [
  { name: 'Midnight Amber Extrait (50ml)', sales: '342 units', revenue: '₹3,41,658', stock: '28 in stock', status: 'In Stock' },
  { name: 'Aura De Soir Extrait (50ml)', sales: '289 units', revenue: '₹2,59,911', stock: '4 in stock', status: 'Low Stock' },
  { name: 'Verdant Aura Extrait (50ml)', sales: '215 units', revenue: '₹1,93,285', stock: '42 in stock', status: 'In Stock' },
  { name: 'Elysian Discovery Set (5x2ml)', sales: '512 units', revenue: '₹2,55,488', stock: '85 in stock', status: 'In Stock' }
];

const recentOrders = [
  { id: 'ELY-9821', customer: 'Aarav Sharma', items: 'Midnight Amber (50ml)', total: '₹999', payment: 'UPI', status: 'Completed', time: '10 mins ago' },
  { id: 'ELY-9820', customer: 'Ananya Verma', items: 'Discovery Set', total: '₹499', payment: 'Card', status: 'Processing', time: '24 mins ago' },
  { id: 'ELY-9819', customer: 'Rohan Mehta', items: 'Aura De Soir + Verdant', total: '₹1,798', payment: 'COD', status: 'Shipped', time: '1 hour ago' },
  { id: 'ELY-9818', customer: 'Priya Iyer', items: 'Noir Absolute (50ml)', total: '₹899', payment: 'UPI', status: 'Completed', time: '2 hours ago' },
  { id: 'ELY-9817', customer: 'Vikram Sengupta', items: 'Midnight Amber (50ml)', total: '₹999', payment: 'Card', status: 'Pending', time: '3 hours ago' }
];

export const OverviewView: React.FC<OverviewViewProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">

      {/* Top Banner & Quick Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white border border-[#E8E2D7] p-6 sm:p-8 rounded-[24px] shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-montserrat uppercase tracking-[0.25em] text-[#C8A24A] font-bold">
              Real-Time Atelier Overview
            </span>
            <span className="w-2 h-2 rounded-full bg-green-500 animate-ping"></span>
          </div>
          <h1 className="font-cormorant text-3xl sm:text-4xl font-light text-[#1F1F1F]">
            Welcome Back, <span className="italic font-normal text-[#C8A24A]">Master Atelier</span>
          </h1>
          <p className="font-inter text-xs sm:text-sm text-gray-500 font-light">
            Here is your live daily performance, order status, and inventory metrics.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => onNavigate('products')}
            className="bg-[#C8A24A] hover:bg-[#1F1F1F] text-[#1F1F1F] hover:text-[#C8A24A] border border-[#C8A24A] px-5 py-2.5 rounded-full text-xs font-montserrat uppercase tracking-wider font-bold transition-all shadow-sm flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95"
          >
            <Plus size={16} />
            <span>Add New Fragrance</span>
          </button>

          <button
            onClick={() => onNavigate('orders')}
            className="bg-[#1F1F1F] hover:bg-[#C8A24A] text-white hover:text-[#1F1F1F] border border-[#1F1F1F] px-5 py-2.5 rounded-full text-xs font-montserrat uppercase tracking-wider font-bold transition-all shadow-sm flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95"
          >
            <ShoppingBag size={16} />
            <span>Manage Orders</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* KPI 1: Today's Revenue */}
        <div className="bg-white border border-[#E8E2D7] p-6 rounded-2xl shadow-sm hover:border-[#C8A24A] transition-all space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-montserrat uppercase tracking-wider font-bold text-gray-500">
              Today's Revenue
            </span>
            <div className="p-2.5 bg-[#C8A24A]/10 text-[#C8A24A] rounded-xl">
              <DollarSign size={18} />
            </div>
          </div>

          <div className="space-y-1">
            <h3 className="font-cormorant text-3xl font-bold text-[#1F1F1F]">₹2,67,300</h3>
            <div className="flex items-center gap-1.5 text-xs font-montserrat font-bold text-green-600">
              <ArrowUpRight size={14} />
              <span>+18.4% vs yesterday</span>
            </div>
          </div>
        </div>

        {/* KPI 2: Today's Orders */}
        <div className="bg-white border border-[#E8E2D7] p-6 rounded-2xl shadow-sm hover:border-[#C8A24A] transition-all space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-montserrat uppercase tracking-wider font-bold text-gray-500">
              Today's Orders
            </span>
            <div className="p-2.5 bg-[#1F1F1F] text-[#C8A24A] rounded-xl">
              <ShoppingBag size={18} />
            </div>
          </div>

          <div className="space-y-1">
            <h3 className="font-cormorant text-3xl font-bold text-[#1F1F1F]">267 Orders</h3>
            <div className="flex items-center gap-1.5 text-xs font-montserrat font-bold text-green-600">
              <ArrowUpRight size={14} />
              <span>+12.1% growth</span>
            </div>
          </div>
        </div>

        {/* KPI 3: Conversion Rate */}
        <div className="bg-white border border-[#E8E2D7] p-6 rounded-2xl shadow-sm hover:border-[#C8A24A] transition-all space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-montserrat uppercase tracking-wider font-bold text-gray-500">
              Conversion Rate
            </span>
            <div className="p-2.5 bg-[#C8A24A]/10 text-[#C8A24A] rounded-xl">
              <TrendingUp size={18} />
            </div>
          </div>

          <div className="space-y-1">
            <h3 className="font-cormorant text-3xl font-bold text-[#1F1F1F]">4.82%</h3>
            <div className="flex items-center gap-1.5 text-xs font-montserrat font-bold text-green-600">
              <ArrowUpRight size={14} />
              <span>+0.6% vs avg</span>
            </div>
          </div>
        </div>

        {/* KPI 4: Newsletter Club */}
        <div className="bg-white border border-[#E8E2D7] p-6 rounded-2xl shadow-sm hover:border-[#C8A24A] transition-all space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-montserrat uppercase tracking-wider font-bold text-gray-500">
              Newsletter Club
            </span>
            <div className="p-2.5 bg-[#1F1F1F] text-[#C8A24A] rounded-xl">
              <Mail size={18} />
            </div>
          </div>

          <div className="space-y-1">
            <h3 className="font-cormorant text-3xl font-bold text-[#1F1F1F]">28,540</h3>
            <div className="flex items-center gap-1.5 text-xs font-montserrat font-bold text-[#C8A24A]">
              <Sparkles size={14} />
              <span>+128 today</span>
            </div>
          </div>
        </div>

      </div>

      {/* Revenue & Sales Graph Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Revenue Area Chart */}
        <div className="lg:col-span-2 bg-white border border-[#E8E2D7] p-6 rounded-3xl shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-[#F4F1EA] pb-4">
            <div>
              <h3 className="font-montserrat text-sm uppercase tracking-wider font-bold text-[#1F1F1F]">
                Weekly Revenue Trend (₹)
              </h3>
              <p className="text-xs text-gray-500 font-light">Gross revenue over the past 7 days</p>
            </div>
            <span className="text-xs font-montserrat uppercase font-bold text-[#C8A24A] bg-[#C8A24A]/10 px-3 py-1 rounded-full">
              Live Feed
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C8A24A" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#C8A24A" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F4F1EA" />
                <XAxis dataKey="day" stroke="#888888" fontSize={12} tickLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} />
                <Tooltip
                  formatter={(value: any) => [`₹${value.toLocaleString()}`, 'Revenue']}
                  contentStyle={{ backgroundColor: '#1F1F1F', borderColor: '#C8A24A', color: '#FFF', borderRadius: '12px' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#C8A24A" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Sales Breakdown Pie Chart */}
        <div className="bg-white border border-[#E8E2D7] p-6 rounded-3xl shadow-sm space-y-6 flex flex-col justify-between">
          <div className="border-b border-[#F4F1EA] pb-4">
            <h3 className="font-montserrat text-sm uppercase tracking-wider font-bold text-[#1F1F1F]">
              Sales by Fragrance Family
            </h3>
            <p className="text-xs text-gray-500 font-light">Percentage distribution this month</p>
          </div>

          <div className="h-48 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categorySalesData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categorySalesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 pt-2 border-t border-[#F4F1EA]">
            {categorySalesData.map((cat, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs font-montserrat">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }}></span>
                  <span className="text-[#1F1F1F] font-semibold">{cat.name}</span>
                </div>
                <span className="font-bold text-gray-600">{cat.value}%</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Recent Orders & Top Selling Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* Recent Orders Table */}
        <div className="bg-white border border-[#E8E2D7] p-6 rounded-3xl shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-[#F4F1EA] pb-4">
            <div>
              <h3 className="font-montserrat text-sm uppercase tracking-wider font-bold text-[#1F1F1F]">
                Recent Customer Orders
              </h3>
              <p className="text-xs text-gray-500 font-light">Live order stream</p>
            </div>
            <button
              onClick={() => onNavigate('orders')}
              className="text-xs font-montserrat uppercase font-bold text-[#C8A24A] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>View All</span>
              <ChevronRight size={14} />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-inter">
              <thead>
                <tr className="border-b border-[#E8E2D7] text-gray-400 font-montserrat uppercase text-[10px] tracking-wider">
                  <th className="py-2.5">Order ID</th>
                  <th className="py-2.5">Customer</th>
                  <th className="py-2.5">Total</th>
                  <th className="py-2.5">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F4F1EA]">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-[#F8F6F2] transition-colors">
                    <td className="py-3 font-bold text-[#1F1F1F]">{order.id}</td>
                    <td className="py-3 text-gray-600">{order.customer}</td>
                    <td className="py-3 font-semibold text-[#1F1F1F]">{order.total}</td>
                    <td className="py-3">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[10px] font-montserrat uppercase font-bold ${
                          order.status === 'Completed'
                            ? 'bg-green-100 text-green-700'
                            : order.status === 'Processing'
                            ? 'bg-blue-100 text-blue-700'
                            : order.status === 'Shipped'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Selling Products */}
        <div className="bg-white border border-[#E8E2D7] p-6 rounded-3xl shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-[#F4F1EA] pb-4">
            <div>
              <h3 className="font-montserrat text-sm uppercase tracking-wider font-bold text-[#1F1F1F]">
                Top Selling Extraits
              </h3>
              <p className="text-xs text-gray-500 font-light">Best sellers this month</p>
            </div>
            <button
              onClick={() => onNavigate('products')}
              className="text-xs font-montserrat uppercase font-bold text-[#C8A24A] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Manage Catalog</span>
              <ChevronRight size={14} />
            </button>
          </div>

          <div className="space-y-3">
            {topProducts.map((prod, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-[#F8F6F2] rounded-2xl border border-[#E8E2D7]">
                <div className="space-y-0.5">
                  <h4 className="font-montserrat text-xs font-bold text-[#1F1F1F]">{prod.name}</h4>
                  <p className="text-[11px] text-gray-500">{prod.sales} sold • {prod.revenue}</p>
                </div>

                <span
                  className={`text-[10px] font-montserrat uppercase font-bold px-2.5 py-1 rounded-full ${
                    prod.status === 'Low Stock'
                      ? 'bg-red-100 text-red-600 border border-red-200'
                      : 'bg-green-100 text-green-700'
                  }`}
                >
                  {prod.stock}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
