import React, { useState } from 'react';
import { MessageSquare, Check, Clock, AlertCircle, Send, HelpCircle } from 'lucide-react';

const SAMPLE_TICKETS = [
  { id: 'TCK-401', customer: 'Deepak Rao', subject: 'Track Delhivery Air Courier status', status: 'Open', date: '2h ago', msg: 'Has order #ELY-9819 shipped from Old Delhi atelier?' },
  { id: 'TCK-402', customer: 'Meera Nair', subject: 'Fragrance layering advice for Aura De Soir', status: 'Open', date: '4h ago', msg: 'Can I layer Midnight Amber with Verdant Aura?' },
  { id: 'TCK-403', customer: 'Sunil Kapoor', subject: 'Corporate gifting bulk discount', status: 'Resolved', date: '1d ago', msg: 'Interested in ordering 50 units for Diwali gifting.' }
];

export const SupportTicketsView: React.FC = () => {
  const [tickets, setTickets] = useState(SAMPLE_TICKETS);
  const [replyText, setReplyText] = useState('');
  const [activeTicketId, setActiveTicketId] = useState<string>('TCK-401');

  const activeTicket = tickets.find((t) => t.id === activeTicketId) || tickets[0];

  const handleSendReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText) return;

    setTickets((prev) =>
      prev.map((t) => (t.id === activeTicketId ? { ...t, status: 'Resolved' } : t))
    );
    setReplyText('');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="bg-white border border-[#E8E2D7] p-6 rounded-[24px] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-cormorant text-3xl font-light text-[#1F1F1F]">
            Atelier Concierge <span className="italic text-[#C8A24A]">Support & FAQs</span>
          </h1>
          <p className="font-inter text-xs text-gray-500 font-light pt-1">
            Respond to customer inquiries, shipping tracking questions, and custom perfume consultations.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Tickets List */}
        <div className="lg:col-span-5 bg-white border border-[#E8E2D7] p-6 rounded-3xl shadow-sm space-y-3">
          <h3 className="font-montserrat text-xs uppercase font-bold text-gray-500 border-b border-[#F4F1EA] pb-3">
            Open Support Tickets
          </h3>

          <div className="space-y-2">
            {tickets.map((t) => (
              <div
                key={t.id}
                onClick={() => setActiveTicketId(t.id)}
                className={`p-4 rounded-2xl border text-xs cursor-pointer transition-all ${
                  activeTicketId === t.id
                    ? 'bg-[#1F1F1F] text-white border-[#C8A24A]'
                    : 'bg-[#F8F6F2] text-[#1F1F1F] border-[#E8E2D7] hover:border-[#C8A24A]'
                }`}
              >
                <div className="flex items-center justify-between font-montserrat font-bold mb-1">
                  <span>{t.id} • {t.customer}</span>
                  <span className={`text-[9px] uppercase px-2 py-0.5 rounded-full ${t.status === 'Open' ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'}`}>
                    {t.status}
                  </span>
                </div>
                <p className="font-semibold text-xs truncate">{t.subject}</p>
                <p className="text-[10px] text-gray-400 pt-1">{t.date}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Ticket Reply Box */}
        <div className="lg:col-span-7 bg-white border border-[#E8E2D7] p-6 rounded-3xl shadow-sm space-y-4">
          <div className="border-b border-[#F4F1EA] pb-3">
            <span className="text-[10px] font-montserrat uppercase font-bold text-[#C8A24A]">Active Ticket Details</span>
            <h3 className="font-montserrat font-bold text-sm text-[#1F1F1F]">{activeTicket.subject}</h3>
            <p className="text-xs text-gray-500">From {activeTicket.customer} ({activeTicket.id})</p>
          </div>

          <div className="p-4 bg-[#F8F6F2] rounded-2xl border border-[#E8E2D7] text-xs font-inter text-[#1F1F1F]">
            "{activeTicket.msg}"
          </div>

          <form onSubmit={handleSendReply} className="space-y-3">
            <label className="font-montserrat uppercase font-bold text-[10px] text-gray-500 block">
              Atelier Concierge Response
            </label>
            <textarea
              rows={4}
              required
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Type official reply to send to customer inbox..."
              className="w-full bg-[#F8F6F2] border border-[#E8E2D7] rounded-xl p-3.5 text-xs focus:outline-none focus:border-[#C8A24A]"
            />

            <button
              type="submit"
              className="bg-[#C8A24A] text-[#1F1F1F] font-montserrat uppercase text-xs font-bold px-6 py-2.5 rounded-full hover:bg-[#1F1F1F] hover:text-[#C8A24A] transition-all cursor-pointer flex items-center gap-2"
            >
              <Send size={15} />
              <span>Send Reply & Mark Resolved</span>
            </button>
          </form>
        </div>

      </div>

    </div>
  );
};
