import React, { useState } from 'react';
import { Mail, Download, Send, Sparkles, CheckCircle2, Search, Users } from 'lucide-react';

const INITIAL_SUBSCRIBERS = [
  { id: '1', email: 'aarav.sharma@example.com', date: '2026-07-28', status: 'Active VIP' },
  { id: '2', email: 'ananya.v@example.com', date: '2026-07-28', status: 'Active VIP' },
  { id: '3', email: 'rohan.m@example.com', date: '2026-07-27', status: 'Active VIP' },
  { id: '4', email: 'priya.iyer@example.com', date: '2026-07-26', status: 'Active VIP' },
  { id: '5', email: 'connoisseur@elysian.in', date: '2026-07-25', status: 'Active VIP' }
];

export const NewsletterView: React.FC = () => {
  const [subscribers, setSubscribers] = useState(INITIAL_SUBSCRIBERS);
  const [subject, setSubject] = useState('Exclusive Access: ELYSIAN Autumn Extrait Collection');
  const [campaignBody, setCampaignBody] = useState('Dear ELYSIAN Club Connoisseur,\n\nWe invite you to experience our newest small-batch 30% Extrait De Parfum formulation before public release...');
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    setSentSuccess(true);
    setTimeout(() => setSentSuccess(false), 4000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Header */}
      <div className="bg-white border border-[#E8E2D7] p-6 rounded-[24px] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-cormorant text-3xl font-light text-[#1F1F1F]">
            Newsletter Club & <span className="italic text-[#C8A24A]">Broadcast Engine</span>
          </h1>
          <p className="font-inter text-xs text-gray-500 font-light pt-1">
            Manage over 28,500+ subscribed perfume connoisseurs and broadcast luxury launch emails.
          </p>
        </div>

        <button
          onClick={() => {
            const dataStr = "data:text/csv;charset=utf-8," + encodeURIComponent(subscribers.map((s) => s.email).join('\n'));
            const downloadAnchor = document.createElement('a');
            downloadAnchor.setAttribute("href", dataStr);
            downloadAnchor.setAttribute("download", "elysian_subscribers.csv");
            document.body.appendChild(downloadAnchor);
            downloadAnchor.click();
            downloadAnchor.remove();
          }}
          className="bg-[#1F1F1F] text-[#C8A24A] hover:bg-[#C8A24A] hover:text-[#1F1F1F] px-4 py-2.5 rounded-full text-xs font-montserrat uppercase font-bold transition-all flex items-center gap-2 cursor-pointer"
        >
          <Download size={15} />
          <span>Export Subscribers CSV</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Email Composer */}
        <div className="lg:col-span-7 bg-white border border-[#E8E2D7] p-6 rounded-3xl shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b border-[#F4F1EA] pb-3">
            <Sparkles size={18} className="text-[#C8A24A]" />
            <h3 className="font-montserrat text-sm uppercase tracking-wider font-bold text-[#1F1F1F]">
              Broadcast Campaign Composer
            </h3>
          </div>

          <form onSubmit={handleSendBroadcast} className="space-y-4 text-xs font-inter">
            <div>
              <label className="font-montserrat uppercase font-bold text-gray-500 block mb-1">
                Email Subject Line
              </label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-[#F8F6F2] border border-[#E8E2D7] rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#C8A24A]"
              />
            </div>

            <div>
              <label className="font-montserrat uppercase font-bold text-gray-500 block mb-1">
                Campaign Body Content
              </label>
              <textarea
                rows={8}
                required
                value={campaignBody}
                onChange={(e) => setCampaignBody(e.target.value)}
                className="w-full bg-[#F8F6F2] border border-[#E8E2D7] rounded-xl p-3.5 focus:outline-none focus:border-[#C8A24A]"
              />
            </div>

            {sentSuccess && (
              <div className="p-3 bg-green-100 border border-green-300 text-green-800 rounded-xl flex items-center gap-2 font-montserrat font-bold text-xs">
                <CheckCircle2 size={16} />
                <span>Campaign queued! Broadcast sent to 28,540 subscribers.</span>
              </div>
            )}

            <button
              type="submit"
              className="bg-[#C8A24A] text-[#1F1F1F] font-montserrat uppercase text-xs font-bold px-6 py-3 rounded-full hover:bg-[#1F1F1F] hover:text-[#C8A24A] transition-all cursor-pointer flex items-center gap-2"
            >
              <Send size={16} />
              <span>Broadcast to 28,540 Members</span>
            </button>
          </form>
        </div>

        {/* Right Column: Subscribers List */}
        <div className="lg:col-span-5 bg-white border border-[#E8E2D7] p-6 rounded-3xl shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-[#F4F1EA] pb-3">
            <h3 className="font-montserrat text-sm uppercase tracking-wider font-bold text-[#1F1F1F]">
              Recent Subscribers
            </h3>
            <span className="text-xs font-bold text-[#C8A24A]">28,540 Total</span>
          </div>

          <div className="space-y-2 max-h-96 overflow-y-auto pr-1">
            {subscribers.map((s) => (
              <div key={s.id} className="p-3 bg-[#F8F6F2] rounded-xl border border-[#E8E2D7] flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-[#1F1F1F]">{s.email}</p>
                  <p className="text-[10px] text-gray-400">Joined {s.date}</p>
                </div>
                <span className="text-[9px] font-montserrat uppercase font-bold bg-[#C8A24A]/20 text-[#1F1F1F] px-2 py-0.5 rounded-full">
                  {s.status}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
