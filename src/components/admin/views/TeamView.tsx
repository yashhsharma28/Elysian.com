import React from 'react';
import { UserCheck, Shield, Lock, History, Database, Key } from 'lucide-react';

const TEAM = [
  { name: 'Master Perfumer EA', role: 'Master Owner', email: 'owner@elysian.in', status: '2FA Active' },
  { name: 'Aura Atelier Lead', role: 'Store Manager', email: 'manager@elysian.in', status: '2FA Active' },
  { name: 'Delhi Logistics Hub', role: 'Inventory Specialist', email: 'logistics@elysian.in', status: '2FA Active' }
];

const AUDIT_LOGS = [
  { time: '10:14 AM Today', user: 'Master Owner', action: 'Updated Midnight Amber stock quantity (+50)' },
  { time: '09:22 AM Today', user: 'Store Manager', action: 'Approved refund for Order #ELY-9780' },
  { time: 'Yesterday', user: 'Master Owner', action: 'Published ELYSIAN50 discount coupon' }
];

export const TeamView: React.FC = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="bg-white border border-[#E8E2D7] p-6 rounded-[24px] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-cormorant text-3xl font-light text-[#1F1F1F]">
            Team Roles & <span className="italic text-[#C8A24A]">Security Governance</span>
          </h1>
          <p className="font-inter text-xs text-gray-500 font-light pt-1">
            Role-based access control, 2FA status, and real-time security audit trails.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Team Members */}
        <div className="bg-white border border-[#E8E2D7] p-6 rounded-3xl shadow-sm space-y-4">
          <h3 className="font-montserrat text-xs uppercase font-bold text-[#1F1F1F] border-b border-[#F4F1EA] pb-3 flex items-center gap-2">
            <UserCheck size={16} className="text-[#C8A24A]" />
            <span>Authorized Team Members</span>
          </h3>

          <div className="space-y-3">
            {TEAM.map((m, idx) => (
              <div key={idx} className="p-3 bg-[#F8F6F2] rounded-2xl border border-[#E8E2D7] flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-montserrat font-bold text-[#1F1F1F]">{m.name}</h4>
                  <p className="text-[10px] text-gray-500">{m.email} • <strong className="text-[#C8A24A]">{m.role}</strong></p>
                </div>
                <span className="text-[9px] font-montserrat uppercase font-bold bg-green-100 text-green-700 px-2.5 py-1 rounded-full">
                  {m.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Audit Logs */}
        <div className="bg-white border border-[#E8E2D7] p-6 rounded-3xl shadow-sm space-y-4">
          <h3 className="font-montserrat text-xs uppercase font-bold text-[#1F1F1F] border-b border-[#F4F1EA] pb-3 flex items-center gap-2">
            <History size={16} className="text-[#C8A24A]" />
            <span>Security Activity Audit Log</span>
          </h3>

          <div className="space-y-3">
            {AUDIT_LOGS.map((a, idx) => (
              <div key={idx} className="p-3 bg-[#F8F6F2] rounded-2xl border border-[#E8E2D7] text-xs font-inter space-y-1">
                <div className="flex items-center justify-between font-montserrat font-bold text-[10px]">
                  <span className="text-[#C8A24A]">{a.user}</span>
                  <span className="text-gray-400">{a.time}</span>
                </div>
                <p className="text-gray-700 font-medium">{a.action}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
