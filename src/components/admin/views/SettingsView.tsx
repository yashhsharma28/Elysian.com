import React, { useState } from 'react';
import { Settings, Save, CheckCircle2, Shield, CreditCard, Truck, Globe, Image as ImageIcon } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const [brandName, setBrandName] = useState('ELYSIAN');
  const [tagline, setTagline] = useState('Crafted for the Extraordinary');
  const [freeShippingMin, setFreeShippingMin] = useState(499);
  const [taxRate, setTaxRate] = useState(18);
  const [codEnabled, setCodEnabled] = useState(true);
  const [upiEnabled, setUpiEnabled] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="bg-white border border-[#E8E2D7] p-6 rounded-[24px] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-cormorant text-3xl font-light text-[#1F1F1F]">
            Website & Atelier <span className="italic text-[#C8A24A]">Settings</span>
          </h1>
          <p className="font-inter text-xs text-gray-500 font-light pt-1">
            Configure store metadata, payment gateway channels, shipping thresholds, and tax rules.
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Brand Metadata */}
        <div className="bg-white border border-[#E8E2D7] p-6 rounded-3xl shadow-sm space-y-4">
          <h3 className="font-montserrat text-sm uppercase font-bold text-[#1F1F1F] border-b border-[#F4F1EA] pb-3 flex items-center gap-2">
            <Globe size={16} className="text-[#C8A24A]" />
            <span>Store Identity & Tagline</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-inter">
            <div>
              <label className="font-montserrat uppercase font-bold text-gray-500 block mb-1">Brand Name</label>
              <input
                type="text"
                value={brandName}
                onChange={(e) => setBrandName(e.target.value)}
                className="w-full bg-[#F8F6F2] border border-[#E8E2D7] rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#C8A24A]"
              />
            </div>

            <div>
              <label className="font-montserrat uppercase font-bold text-gray-500 block mb-1">Tagline</label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                className="w-full bg-[#F8F6F2] border border-[#E8E2D7] rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#C8A24A]"
              />
            </div>
          </div>
        </div>

        {/* Shipping & Payment Settings */}
        <div className="bg-white border border-[#E8E2D7] p-6 rounded-3xl shadow-sm space-y-4">
          <h3 className="font-montserrat text-sm uppercase font-bold text-[#1F1F1F] border-b border-[#F4F1EA] pb-3 flex items-center gap-2">
            <Truck size={16} className="text-[#C8A24A]" />
            <span>Shipping & Payment Configurations</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-inter">
            <div>
              <label className="font-montserrat uppercase font-bold text-gray-500 block mb-1">
                Free Shipping Threshold (₹)
              </label>
              <input
                type="number"
                value={freeShippingMin}
                onChange={(e) => setFreeShippingMin(Number(e.target.value))}
                className="w-full bg-[#F8F6F2] border border-[#E8E2D7] rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#C8A24A]"
              />
            </div>

            <div>
              <label className="font-montserrat uppercase font-bold text-gray-500 block mb-1">
                GST Tax Rate (%)
              </label>
              <input
                type="number"
                value={taxRate}
                onChange={(e) => setTaxRate(Number(e.target.value))}
                className="w-full bg-[#F8F6F2] border border-[#E8E2D7] rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#C8A24A]"
              />
            </div>
          </div>

          <div className="pt-2 flex flex-wrap gap-6 text-xs font-montserrat font-bold">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={upiEnabled}
                onChange={(e) => setUpiEnabled(e.target.checked)}
                className="w-4 h-4 accent-[#C8A24A]"
              />
              <span>UPI / PhonePe / GPay Instant Payments</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={codEnabled}
                onChange={(e) => setCodEnabled(e.target.checked)}
                className="w-4 h-4 accent-[#C8A24A]"
              />
              <span>Cash on Delivery (COD) Pan-India</span>
            </label>
          </div>
        </div>

        {isSaved && (
          <div className="p-4 bg-green-100 border border-green-300 text-green-800 rounded-2xl flex items-center gap-2 font-montserrat font-bold text-xs">
            <CheckCircle2 size={18} />
            <span>Settings successfully saved and published!</span>
          </div>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-[#C8A24A] text-[#1F1F1F] font-montserrat uppercase text-xs font-bold px-8 py-3.5 rounded-full hover:bg-[#1F1F1F] hover:text-[#C8A24A] transition-all cursor-pointer flex items-center gap-2 shadow-md"
          >
            <Save size={16} />
            <span>Save All Configurations</span>
          </button>
        </div>

      </form>

    </div>
  );
};
