import React from 'react';
import { BarChart3, TrendingUp, DollarSign, Users, MapPin, Globe } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const citySales = [
  { city: 'Mumbai', orders: 480, revenue: 479520 },
  { city: 'Delhi NCR', orders: 420, revenue: 419580 },
  { city: 'Bengaluru', orders: 390, revenue: 389610 },
  { city: 'Hyderabad', orders: 240, revenue: 239760 },
  { city: 'Chennai', orders: 210, revenue: 209790 },
  { city: 'Kolkata', orders: 180, revenue: 179820 }
];

export const AnalyticsView: React.FC = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="bg-white border border-[#E8E2D7] p-6 rounded-[24px] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-cormorant text-3xl font-light text-[#1F1F1F]">
            Revenue & Sales <span className="italic text-[#C8A24A]">Intelligence</span>
          </h1>
          <p className="font-inter text-xs text-gray-500 font-light pt-1">
            Regional performance breakdown, order metrics, and customer acquisition channels across India.
          </p>
        </div>
      </div>

      {/* City Breakdown Bar Chart */}
      <div className="bg-white border border-[#E8E2D7] p-6 rounded-3xl shadow-sm space-y-6">
        <div className="border-b border-[#F4F1EA] pb-4">
          <h3 className="font-montserrat text-sm uppercase tracking-wider font-bold text-[#1F1F1F]">
            Top Sales Metro Cities (Revenue ₹)
          </h3>
          <p className="text-xs text-gray-500 font-light">Gross sales volume by geographical region</p>
        </div>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={citySales} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F4F1EA" />
              <XAxis dataKey="city" stroke="#888888" fontSize={12} tickLine={false} />
              <YAxis stroke="#888888" fontSize={12} tickLine={false} />
              <Tooltip
                formatter={(value: any) => [`₹${value.toLocaleString()}`, 'Revenue']}
                contentStyle={{ backgroundColor: '#1F1F1F', borderColor: '#C8A24A', color: '#FFF', borderRadius: '12px' }}
              />
              <Bar dataKey="revenue" fill="#C8A24A" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};
