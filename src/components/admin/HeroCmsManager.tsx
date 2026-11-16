import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Monitor,
  Tablet,
  Smartphone,
  Save,
  RotateCcw,
  CheckCircle2,
  Sparkles,
  Layers,
  Palette,
  Type,
  Image as ImageIcon,
  DollarSign,
  ShieldCheck,
  BarChart3,
  Link,
  Plus,
  Trash2,
  Eye,
  Globe,
  Upload,
  ArrowRight,
  Check,
  Undo2,
  Redo2,
  History,
  FileText
} from 'lucide-react';
import { HeroCmsConfig, HeroTrustBadge, HeroStatCard } from '../../types/heroCms';
import { DEFAULT_HERO_CMS_CONFIG, getStoredHeroCmsConfig, saveHeroCmsConfig } from '../../data/heroCmsData';
import { Hero } from '../Hero';

// Sample High-Res Perfume Image Presets for Media Library
const PERFUME_MEDIA_PRESETS = [
  {
    url: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1200&auto=format&fit=crop',
    title: 'Dark Amber Obsidian Bottle',
    category: 'Royal Reserve'
  },
  {
    url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1200&auto=format&fit=crop',
    title: 'Crystal Flacon Glass Fluting',
    category: 'Haute Elixir'
  },
  {
    url: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?q=80&w=1200&auto=format&fit=crop',
    title: 'Gold Cap Oud Extract',
    category: 'Oriental Oud'
  },
  {
    url: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1200&auto=format&fit=crop',
    title: 'Floral Velvet Nectar',
    category: 'Rose Collection'
  }
];

export const HeroCmsManager: React.FC = () => {
  const [draftConfig, setDraftConfig] = useState<HeroCmsConfig>(getStoredHeroCmsConfig());
  const [devicePreview, setDevicePreview] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [activeTab, setActiveTab] = useState<'typography' | 'announcement' | 'pricing' | 'badges' | 'buttons' | 'stats' | 'product' | 'background' | 'seo'>('typography');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'published'>('idle');
  const [showMediaLibrary, setShowMediaLibrary] = useState(false);
  const [historyStack, setHistoryStack] = useState<HeroCmsConfig[]>([]);

  // Push current config to history stack before making edits
  const updateDraft = (updater: (prev: HeroCmsConfig) => HeroCmsConfig) => {
    setHistoryStack((prev) => [...prev, draftConfig]);
    setDraftConfig((prev) => updater(prev));
    setSaveStatus('idle');
  };

  const handleUndo = () => {
    if (historyStack.length === 0) return;
    const previous = historyStack[historyStack.length - 1];
    setHistoryStack((prev) => prev.slice(0, -1));
    setDraftConfig(previous);
  };

  const handlePublish = () => {
    setSaveStatus('saving');
    setTimeout(() => {
      saveHeroCmsConfig(draftConfig);
      setSaveStatus('published');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }, 600);
  };

  const handleReset = () => {
    if (window.confirm('Reset Hero Section to factory default settings?')) {
      updateDraft(() => DEFAULT_HERO_CMS_CONFIG);
    }
  };

  return (
    <div className="space-y-6 font-inter">
      
      {/* CMS HEADER BAR */}
      <div className="bg-white p-6 rounded-2xl border border-[#E8E2D7] shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-[#C8A24A]/20 text-[#C8A24A] text-[10px] font-montserrat uppercase font-bold tracking-widest border border-[#C8A24A]/40">
              Shopify / Webflow Grade CMS
            </span>
            <span className="text-xs text-gray-400 font-inter">v{draftConfig.version}.0</span>
          </div>
          <h2 className="font-cormorant text-3xl font-bold text-[#1F1F1F] pt-1">
            Hero Section Theme Manager
          </h2>
          <p className="text-xs text-[#666666] font-light">
            Real-time live editor. Every heading, price, badge, background, and product showcase updates dynamically.
          </p>
        </div>

        {/* Action Controls & Preview Devices */}
        <div className="flex flex-wrap items-center gap-3">
          
          {/* Device Switcher */}
          <div className="bg-[#F8F6F2] p-1 rounded-xl border border-[#E8E2D7] flex items-center gap-1">
            <button
              onClick={() => setDevicePreview('desktop')}
              className={`p-2 rounded-lg text-xs font-montserrat font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                devicePreview === 'desktop' ? 'bg-[#1F1F1F] text-[#C8A24A] shadow-sm' : 'text-gray-500 hover:text-[#1F1F1F]'
              }`}
              title="Desktop View (100%)"
            >
              <Monitor size={15} />
              <span className="hidden sm:inline">Desktop</span>
            </button>
            <button
              onClick={() => setDevicePreview('tablet')}
              className={`p-2 rounded-lg text-xs font-montserrat font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                devicePreview === 'tablet' ? 'bg-[#1F1F1F] text-[#C8A24A] shadow-sm' : 'text-gray-500 hover:text-[#1F1F1F]'
              }`}
              title="Tablet View (768px)"
            >
              <Tablet size={15} />
              <span className="hidden sm:inline">Tablet</span>
            </button>
            <button
              onClick={() => setDevicePreview('mobile')}
              className={`p-2 rounded-lg text-xs font-montserrat font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                devicePreview === 'mobile' ? 'bg-[#1F1F1F] text-[#C8A24A] shadow-sm' : 'text-gray-500 hover:text-[#1F1F1F]'
              }`}
              title="Mobile View (375px)"
            >
              <Smartphone size={15} />
              <span className="hidden sm:inline">Mobile</span>
            </button>
          </div>

          {/* Undo */}
          <button
            onClick={handleUndo}
            disabled={historyStack.length === 0}
            className="p-2.5 bg-[#F8F6F2] hover:bg-[#E8E2D7] disabled:opacity-40 text-[#1F1F1F] rounded-xl border border-[#E8E2D7] transition-all cursor-pointer"
            title="Undo Last Edit"
          >
            <Undo2 size={16} />
          </button>

          {/* Reset Defaults */}
          <button
            onClick={handleReset}
            className="px-3 py-2.5 bg-white hover:bg-red-50 text-red-600 border border-red-200 rounded-xl text-xs font-montserrat uppercase font-bold transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw size={14} />
            <span className="hidden sm:inline">Reset</span>
          </button>

          {/* Publish Live */}
          <button
            onClick={handlePublish}
            disabled={saveStatus === 'saving'}
            className="px-6 py-2.5 bg-[#C8A24A] hover:bg-[#1F1F1F] text-[#1F1F1F] hover:text-[#C8A24A] border border-[#C8A24A] rounded-xl text-xs font-montserrat uppercase font-bold tracking-wider shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer shrink-0"
          >
            {saveStatus === 'saving' ? (
              <span>Saving...</span>
            ) : saveStatus === 'published' ? (
              <>
                <CheckCircle2 size={16} className="text-emerald-500" />
                <span>Published Live!</span>
              </>
            ) : (
              <>
                <Save size={16} />
                <span>Publish Hero CMS</span>
              </>
            )}
          </button>

        </div>
      </div>

      {/* TWO-COLUMN LAYOUT: EDITING CONTROLS ON LEFT, LIVE PREVIEW ON RIGHT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT PANEL: CMS CATEGORY TABS & INPUT FORM */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-[#E8E2D7] shadow-sm overflow-hidden flex flex-col">
          
          {/* Module Navigation Tabs */}
          <div className="bg-[#F8F6F2] p-2 border-b border-[#E8E2D7] flex items-center gap-1 overflow-x-auto no-scrollbar">
            {[
              { id: 'typography', label: 'Headline & Copy', icon: Type },
              { id: 'announcement', label: 'Announcement', icon: Sparkles },
              { id: 'pricing', label: 'Pricing & Badge', icon: DollarSign },
              { id: 'badges', label: 'Trust Badges', icon: ShieldCheck },
              { id: 'buttons', label: 'CTA Buttons', icon: Link },
              { id: 'stats', label: 'Statistics', icon: BarChart3 },
              { id: 'product', label: 'Product Card', icon: ImageIcon },
              { id: 'background', label: 'Background', icon: Palette },
              { id: 'seo', label: 'SEO & Alt', icon: Globe },
            ].map((tab) => {
              const IconComp = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3 py-2 rounded-xl text-[11px] font-montserrat uppercase font-bold tracking-wider flex items-center gap-1.5 transition-all shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-[#1F1F1F] text-[#C8A24A] shadow-sm'
                      : 'text-gray-600 hover:bg-[#E8E2D7] hover:text-[#1F1F1F]'
                  }`}
                >
                  <IconComp size={13} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* TAB FORM CONTENT */}
          <div className="p-6 space-y-6 max-h-[750px] overflow-y-auto no-scrollbar">
            
            {/* 1. TYPOGRAPHY & MAIN HEADLINE */}
            {activeTab === 'typography' && (
              <div className="space-y-4">
                <h3 className="font-montserrat text-xs uppercase font-bold text-[#1F1F1F] border-b pb-2">
                  Headline & Editorial Copy
                </h3>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#333333] font-montserrat">Main Text</label>
                  <input
                    type="text"
                    value={draftConfig.mainHeading.text}
                    onChange={(e) => updateDraft((prev) => ({
                      ...prev,
                      mainHeading: { ...prev.mainHeading, text: e.target.value }
                    }))}
                    className="w-full bg-[#F8F6F2] border border-[#E8E2D7] rounded-xl px-3 py-2 text-xs font-inter focus:outline-none focus:border-[#C8A24A]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#C8A24A] font-montserrat">Highlighted Word (Italics)</label>
                  <input
                    type="text"
                    value={draftConfig.mainHeading.highlightedText}
                    onChange={(e) => updateDraft((prev) => ({
                      ...prev,
                      mainHeading: { ...prev.mainHeading, highlightedText: e.target.value }
                    }))}
                    className="w-full bg-[#F8F6F2] border border-[#C8A24A]/60 rounded-xl px-3 py-2 text-xs font-inter focus:outline-none focus:border-[#C8A24A]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-[#333333]">Font Family</label>
                    <select
                      value={draftConfig.mainHeading.fontFamily}
                      onChange={(e) => updateDraft((prev) => ({
                        ...prev,
                        mainHeading: { ...prev.mainHeading, fontFamily: e.target.value }
                      }))}
                      className="w-full bg-[#F8F6F2] border border-[#E8E2D7] rounded-xl px-2 py-2 text-xs font-inter"
                    >
                      <option value="Cormorant Garamond">Cormorant Garamond</option>
                      <option value="Playfair Display">Playfair Display</option>
                      <option value="Cinzel">Cinzel</option>
                      <option value="Montserrat">Montserrat</option>
                      <option value="Inter">Inter</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-[#333333]">Alignment</label>
                    <select
                      value={draftConfig.mainHeading.alignment}
                      onChange={(e) => updateDraft((prev) => ({
                        ...prev,
                        mainHeading: { ...prev.mainHeading, alignment: e.target.value as any }
                      }))}
                      className="w-full bg-[#F8F6F2] border border-[#E8E2D7] rounded-xl px-2 py-2 text-xs font-inter"
                    >
                      <option value="left">Left Align</option>
                      <option value="center">Center Align</option>
                      <option value="right">Right Align</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-[#333333]">Heading Color</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={draftConfig.mainHeading.textColor}
                        onChange={(e) => updateDraft((prev) => ({
                          ...prev,
                          mainHeading: { ...prev.mainHeading, textColor: e.target.value }
                        }))}
                        className="w-8 h-8 rounded-lg cursor-pointer border-0"
                      />
                      <span className="text-xs font-mono">{draftConfig.mainHeading.textColor}</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-[#C8A24A]">Highlight Color</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={draftConfig.mainHeading.highlightColor}
                        onChange={(e) => updateDraft((prev) => ({
                          ...prev,
                          mainHeading: { ...prev.mainHeading, highlightColor: e.target.value }
                        }))}
                        className="w-8 h-8 rounded-lg cursor-pointer border-0"
                      />
                      <span className="text-xs font-mono">{draftConfig.mainHeading.highlightColor}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-1 pt-2">
                  <label className="text-xs font-bold text-[#333333] font-montserrat">Subheading Paragraph</label>
                  <textarea
                    rows={3}
                    value={draftConfig.subHeading.text}
                    onChange={(e) => updateDraft((prev) => ({
                      ...prev,
                      subHeading: { ...prev.subHeading, text: e.target.value }
                    }))}
                    className="w-full bg-[#F8F6F2] border border-[#E8E2D7] rounded-xl p-3 text-xs font-inter focus:outline-none focus:border-[#C8A24A]"
                  />
                </div>
              </div>
            )}

            {/* 2. ANNOUNCEMENT BAR */}
            {activeTab === 'announcement' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-2">
                  <h3 className="font-montserrat text-xs uppercase font-bold text-[#1F1F1F]">
                    Announcement Bar Settings
                  </h3>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={draftConfig.announcementBar.enabled}
                      onChange={(e) => updateDraft((prev) => ({
                        ...prev,
                        announcementBar: { ...prev.announcementBar, enabled: e.target.checked }
                      }))}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#C8A24A]"></div>
                  </label>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#333333]">Announcement Text</label>
                  <input
                    type="text"
                    value={draftConfig.announcementBar.text}
                    onChange={(e) => updateDraft((prev) => ({
                      ...prev,
                      announcementBar: { ...prev.announcementBar, text: e.target.value }
                    }))}
                    className="w-full bg-[#F8F6F2] border border-[#E8E2D7] rounded-xl px-3 py-2 text-xs font-inter"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-[#333333]">Background Color</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={draftConfig.announcementBar.backgroundColor}
                        onChange={(e) => updateDraft((prev) => ({
                          ...prev,
                          announcementBar: { ...prev.announcementBar, backgroundColor: e.target.value }
                        }))}
                        className="w-8 h-8 rounded-lg cursor-pointer border-0"
                      />
                      <span className="text-xs font-mono">{draftConfig.announcementBar.backgroundColor}</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-[#333333]">Text Color</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={draftConfig.announcementBar.textColor}
                        onChange={(e) => updateDraft((prev) => ({
                          ...prev,
                          announcementBar: { ...prev.announcementBar, textColor: e.target.value }
                        }))}
                        className="w-8 h-8 rounded-lg cursor-pointer border-0"
                      />
                      <span className="text-xs font-mono">{draftConfig.announcementBar.textColor}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 3. PRICING & BADGES */}
            {activeTab === 'pricing' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-2">
                  <h3 className="font-montserrat text-xs uppercase font-bold text-[#1F1F1F]">
                    Price Highlight Card
                  </h3>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={draftConfig.priceInfo.enabled}
                      onChange={(e) => updateDraft((prev) => ({
                        ...prev,
                        priceInfo: { ...prev.priceInfo, enabled: e.target.checked }
                      }))}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-[#C8A24A] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
                  </label>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-[#333333]">Currency</label>
                    <input
                      type="text"
                      value={draftConfig.priceInfo.currencySymbol}
                      onChange={(e) => updateDraft((prev) => ({
                        ...prev,
                        priceInfo: { ...prev.priceInfo, currencySymbol: e.target.value }
                      }))}
                      className="w-full bg-[#F8F6F2] border border-[#E8E2D7] rounded-xl px-3 py-2 text-xs font-inter"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-[#333333]">Start Price</label>
                    <input
                      type="text"
                      value={draftConfig.priceInfo.startingPrice}
                      onChange={(e) => updateDraft((prev) => ({
                        ...prev,
                        priceInfo: { ...prev.priceInfo, startingPrice: e.target.value }
                      }))}
                      className="w-full bg-[#F8F6F2] border border-[#E8E2D7] rounded-xl px-3 py-2 text-xs font-inter"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-[#333333]">Max Badge Text</label>
                    <input
                      type="text"
                      value={draftConfig.priceInfo.priceBadgeText}
                      onChange={(e) => updateDraft((prev) => ({
                        ...prev,
                        priceInfo: { ...prev.priceInfo, priceBadgeText: e.target.value }
                      }))}
                      className="w-full bg-[#F8F6F2] border border-[#E8E2D7] rounded-xl px-3 py-2 text-xs font-inter"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 4. TRUST BADGES */}
            {activeTab === 'badges' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-2">
                  <h3 className="font-montserrat text-xs uppercase font-bold text-[#1F1F1F]">
                    Trust Badges ({draftConfig.trustBadges.length})
                  </h3>
                  <button
                    onClick={() => updateDraft((prev) => ({
                      ...prev,
                      trustBadges: [
                        ...prev.trustBadges,
                        {
                          id: `tb-${Date.now()}`,
                          icon: 'ShieldCheck',
                          title: 'New Trust Badge',
                          description: 'Sub description',
                          color: '#C8A24A',
                          displayOrder: prev.trustBadges.length + 1,
                          enabled: true,
                        }
                      ]
                    }))}
                    className="px-2.5 py-1 bg-[#1F1F1F] text-[#C8A24A] rounded-lg text-[10px] font-montserrat uppercase font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Plus size={12} /> Add Badge
                  </button>
                </div>

                <div className="space-y-3">
                  {draftConfig.trustBadges.map((badge, idx) => (
                    <div key={badge.id} className="p-3 bg-[#F8F6F2] border border-[#E8E2D7] rounded-xl space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase text-[#C8A24A]">Badge #{idx + 1}</span>
                        <div className="flex items-center gap-2">
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={badge.enabled}
                              onChange={(e) => updateDraft((prev) => ({
                                ...prev,
                                trustBadges: prev.trustBadges.map((b) =>
                                  b.id === badge.id ? { ...b, enabled: e.target.checked } : b
                                )
                              }))}
                              className="sr-only peer"
                            />
                            <div className="w-7 h-4 bg-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-[#C8A24A] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3"></div>
                          </label>

                          <button
                            onClick={() => updateDraft((prev) => ({
                              ...prev,
                              trustBadges: prev.trustBadges.filter((b) => b.id !== badge.id)
                            }))}
                            className="text-red-500 hover:text-red-700 p-1 cursor-pointer"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>

                      <input
                        type="text"
                        value={badge.title}
                        onChange={(e) => updateDraft((prev) => ({
                          ...prev,
                          trustBadges: prev.trustBadges.map((b) =>
                            b.id === badge.id ? { ...b, title: e.target.value } : b
                          )
                        }))}
                        className="w-full bg-white border border-[#E8E2D7] rounded-lg px-2.5 py-1.5 text-xs font-inter"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. CTA BUTTONS */}
            {activeTab === 'buttons' && (
              <div className="space-y-4">
                <h3 className="font-montserrat text-xs uppercase font-bold text-[#1F1F1F] border-b pb-2">
                  Call-To-Action Buttons
                </h3>

                {/* Primary Button */}
                <div className="p-3 bg-[#F8F6F2] border border-[#E8E2D7] rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#1F1F1F]">Primary Button</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={draftConfig.buttons.primary.enabled}
                        onChange={(e) => updateDraft((prev) => ({
                          ...prev,
                          buttons: {
                            ...prev.buttons,
                            primary: { ...prev.buttons.primary, enabled: e.target.checked }
                          }
                        }))}
                        className="sr-only peer"
                      />
                      <div className="w-7 h-4 bg-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-[#C8A24A] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3"></div>
                    </label>
                  </div>

                  <input
                    type="text"
                    value={draftConfig.buttons.primary.text}
                    onChange={(e) => updateDraft((prev) => ({
                      ...prev,
                      buttons: {
                        ...prev.buttons,
                        primary: { ...prev.buttons.primary, text: e.target.value }
                      }
                    }))}
                    className="w-full bg-white border border-[#E8E2D7] rounded-lg px-2.5 py-1.5 text-xs font-inter"
                    placeholder="Button Label"
                  />
                </div>

                {/* Secondary Button */}
                <div className="p-3 bg-[#F8F6F2] border border-[#E8E2D7] rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#1F1F1F]">Secondary Button</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={draftConfig.buttons.secondary.enabled}
                        onChange={(e) => updateDraft((prev) => ({
                          ...prev,
                          buttons: {
                            ...prev.buttons,
                            secondary: { ...prev.buttons.secondary, enabled: e.target.checked }
                          }
                        }))}
                        className="sr-only peer"
                      />
                      <div className="w-7 h-4 bg-gray-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-[#C8A24A] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3 after:w-3"></div>
                    </label>
                  </div>

                  <input
                    type="text"
                    value={draftConfig.buttons.secondary.text}
                    onChange={(e) => updateDraft((prev) => ({
                      ...prev,
                      buttons: {
                        ...prev.buttons,
                        secondary: { ...prev.buttons.secondary, text: e.target.value }
                      }
                    }))}
                    className="w-full bg-white border border-[#E8E2D7] rounded-lg px-2.5 py-1.5 text-xs font-inter"
                    placeholder="Button Label"
                  />
                </div>
              </div>
            )}

            {/* 6. STATISTICS SECTION */}
            {activeTab === 'stats' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-2">
                  <h3 className="font-montserrat text-xs uppercase font-bold text-[#1F1F1F]">
                    Hero Statistics Bar ({draftConfig.statistics.length})
                  </h3>
                </div>

                <div className="space-y-3">
                  {draftConfig.statistics.map((stat, idx) => (
                    <div key={stat.id} className="p-3 bg-[#F8F6F2] border border-[#E8E2D7] rounded-xl space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase text-[#C8A24A]">Stat #{idx + 1}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <input
                          type="text"
                          value={stat.number}
                          onChange={(e) => updateDraft((prev) => ({
                            ...prev,
                            statistics: prev.statistics.map((s) =>
                              s.id === stat.id ? { ...s, number: e.target.value } : s
                            )
                          }))}
                          className="bg-white border border-[#E8E2D7] rounded-lg px-2.5 py-1.5 text-xs font-bold font-cormorant"
                          placeholder="Value (e.g. 30%)"
                        />
                        <input
                          type="text"
                          value={stat.title}
                          onChange={(e) => updateDraft((prev) => ({
                            ...prev,
                            statistics: prev.statistics.map((s) =>
                              s.id === stat.id ? { ...s, title: e.target.value } : s
                            )
                          }))}
                          className="bg-white border border-[#E8E2D7] rounded-lg px-2.5 py-1.5 text-xs font-inter"
                          placeholder="Label (e.g. Perfume Oil)"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 7. PRODUCT SHOWCASE CARD */}
            {activeTab === 'product' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-2">
                  <h3 className="font-montserrat text-xs uppercase font-bold text-[#1F1F1F]">
                    Featured Perfume Card
                  </h3>
                  <button
                    onClick={() => setShowMediaLibrary(true)}
                    className="px-2.5 py-1 bg-[#C8A24A] text-[#1F1F1F] rounded-lg text-[10px] font-montserrat uppercase font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <ImageIcon size={12} /> Media Library
                  </button>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#333333]">Product Name</label>
                  <input
                    type="text"
                    value={draftConfig.productCard.productName}
                    onChange={(e) => updateDraft((prev) => ({
                      ...prev,
                      productCard: { ...prev.productCard, productName: e.target.value }
                    }))}
                    className="w-full bg-[#F8F6F2] border border-[#E8E2D7] rounded-xl px-3 py-2 text-xs font-inter font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#333333]">Image URL</label>
                  <input
                    type="text"
                    value={draftConfig.productCard.imageUrl}
                    onChange={(e) => updateDraft((prev) => ({
                      ...prev,
                      productCard: { ...prev.productCard, imageUrl: e.target.value }
                    }))}
                    className="w-full bg-[#F8F6F2] border border-[#E8E2D7] rounded-xl px-3 py-2 text-xs font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-[#333333]">Price (₹)</label>
                    <input
                      type="text"
                      value={draftConfig.productCard.price}
                      onChange={(e) => updateDraft((prev) => ({
                        ...prev,
                        productCard: { ...prev.productCard, price: e.target.value }
                      }))}
                      className="w-full bg-[#F8F6F2] border border-[#E8E2D7] rounded-xl px-3 py-2 text-xs font-inter"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-[#333333]">Old Price (₹)</label>
                    <input
                      type="text"
                      value={draftConfig.productCard.oldPrice}
                      onChange={(e) => updateDraft((prev) => ({
                        ...prev,
                        productCard: { ...prev.productCard, oldPrice: e.target.value }
                      }))}
                      className="w-full bg-[#F8F6F2] border border-[#E8E2D7] rounded-xl px-3 py-2 text-xs font-inter"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#333333]">Badge Chip Text</label>
                  <input
                    type="text"
                    value={draftConfig.productCard.badgeText}
                    onChange={(e) => updateDraft((prev) => ({
                      ...prev,
                      productCard: { ...prev.productCard, badgeText: e.target.value }
                    }))}
                    className="w-full bg-[#F8F6F2] border border-[#E8E2D7] rounded-xl px-3 py-2 text-xs font-inter"
                  />
                </div>
              </div>
            )}

            {/* 8. BACKGROUND SETTINGS */}
            {activeTab === 'background' && (
              <div className="space-y-4">
                <h3 className="font-montserrat text-xs uppercase font-bold text-[#1F1F1F] border-b pb-2">
                  Hero Background Theme
                </h3>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#333333]">Background Mode</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['solid', 'gradient', 'image'].map((type) => (
                      <button
                        key={type}
                        onClick={() => updateDraft((prev) => ({
                          ...prev,
                          background: { ...prev.background, type: type as any }
                        }))}
                        className={`p-2 rounded-xl text-xs font-montserrat uppercase font-bold border transition-all cursor-pointer ${
                          draftConfig.background.type === type
                            ? 'bg-[#1F1F1F] text-[#C8A24A] border-[#1F1F1F]'
                            : 'bg-[#F8F6F2] text-gray-600 border-[#E8E2D7]'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {draftConfig.background.type === 'solid' && (
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-[#333333]">Background Color</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={draftConfig.background.backgroundColor}
                        onChange={(e) => updateDraft((prev) => ({
                          ...prev,
                          background: { ...prev.background, backgroundColor: e.target.value }
                        }))}
                        className="w-8 h-8 rounded-lg cursor-pointer border-0"
                      />
                      <span className="text-xs font-mono">{draftConfig.background.backgroundColor}</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 9. SEO & ALT TEXT */}
            {activeTab === 'seo' && (
              <div className="space-y-4">
                <h3 className="font-montserrat text-xs uppercase font-bold text-[#1F1F1F] border-b pb-2">
                  SEO & Image Accessibility
                </h3>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#333333]">SEO Page Title</label>
                  <input
                    type="text"
                    value={draftConfig.seo.title}
                    onChange={(e) => updateDraft((prev) => ({
                      ...prev,
                      seo: { ...prev.seo, title: e.target.value }
                    }))}
                    className="w-full bg-[#F8F6F2] border border-[#E8E2D7] rounded-xl px-3 py-2 text-xs font-inter"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#333333]">Meta Description</label>
                  <textarea
                    rows={3}
                    value={draftConfig.seo.description}
                    onChange={(e) => updateDraft((prev) => ({
                      ...prev,
                      seo: { ...prev.seo, description: e.target.value }
                    }))}
                    className="w-full bg-[#F8F6F2] border border-[#E8E2D7] rounded-xl p-3 text-xs font-inter"
                  />
                </div>
              </div>
            )}

          </div>
        </div>

        {/* RIGHT PANEL: REAL-TIME DEVICE LIVE PREVIEW */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2 text-xs font-montserrat uppercase tracking-wider font-bold text-[#1F1F1F]">
              <Eye size={16} className="text-[#C8A24A]" />
              <span>Real-time Live Preview</span>
            </div>
            <span className="text-[10px] font-montserrat uppercase tracking-widest text-[#C8A24A] bg-[#C8A24A]/10 px-2.5 py-1 rounded-full font-bold border border-[#C8A24A]/30">
              Live Interactive View
            </span>
          </div>

          {/* Device Frame Wrapper */}
          <div className="bg-[#171717] p-3 sm:p-6 rounded-2xl border border-[#333333] shadow-2xl flex justify-center min-h-[600px] items-start overflow-x-auto">
            <div
              className={`bg-[#F8F6F2] transition-all duration-300 rounded-xl overflow-hidden border border-[#E8E2D7] shadow-lg ${
                devicePreview === 'desktop'
                  ? 'w-full'
                  : devicePreview === 'tablet'
                  ? 'w-[768px] max-w-full'
                  : 'w-[375px] max-w-full'
              }`}
            >
              {/* Device Frame Status Bar */}
              <div className="bg-[#1F1F1F] text-[#888888] px-3 py-1.5 text-[10px] font-mono flex items-center justify-between border-b border-[#333333]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500"></span>
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span className="ml-2 font-montserrat text-[9px] uppercase tracking-wider text-gray-300">
                    ELYSIAN Storefront — {devicePreview.toUpperCase()}
                  </span>
                </div>
                <span>https://elysian.com/hero</span>
              </div>

              {/* Render Live Hero Component passing draftConfig */}
              <div className="pointer-events-auto">
                <Hero overrideConfig={draftConfig} />
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* MEDIA LIBRARY MODAL */}
      <AnimatePresence>
        {showMediaLibrary && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white rounded-2xl border border-[#E8E2D7] shadow-2xl max-w-2xl w-full p-6 space-y-4"
            >
              <div className="flex items-center justify-between border-b pb-3">
                <div>
                  <h3 className="font-cormorant text-2xl font-bold text-[#1F1F1F]">
                    Haute Parfumerie Media Vault
                  </h3>
                  <p className="text-xs text-gray-500 font-inter">
                    Select a high-resolution studio photo for the hero product showcase.
                  </p>
                </div>
                <button
                  onClick={() => setShowMediaLibrary(false)}
                  className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-xs font-montserrat uppercase font-bold rounded-lg cursor-pointer"
                >
                  Close
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {PERFUME_MEDIA_PRESETS.map((preset, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      updateDraft((prev) => ({
                        ...prev,
                        productCard: { ...prev.productCard, imageUrl: preset.url }
                      }));
                      setShowMediaLibrary(false);
                    }}
                    className="border border-[#E8E2D7] rounded-xl overflow-hidden group cursor-pointer hover:border-[#C8A24A] transition-all relative"
                  >
                    <img
                      src={preset.url}
                      alt={preset.title}
                      className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="p-2 bg-white flex items-center justify-between">
                      <span className="text-xs font-bold text-[#1F1F1F] font-inter truncate">{preset.title}</span>
                      <span className="text-[10px] text-[#C8A24A] font-montserrat uppercase font-bold">{preset.category}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
