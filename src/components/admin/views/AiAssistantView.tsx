import React, { useState, useEffect } from 'react';
import {
  Bot,
  Sparkles,
  Send,
  Copy,
  Check,
  FileText,
  Share2,
  HelpCircle,
  Power,
  Edit3,
  Plus,
  Trash2,
  Download,
  BarChart3,
  BookOpen,
  History,
  TrendingUp,
  Award,
  Settings,
  MessageSquare,
  ShieldCheck
} from 'lucide-react';

export const AiAssistantView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'manager' | 'copywriter' | 'analytics' | 'history' | 'training'>('manager');

  // AI Assistant Config States
  const [isEnabled, setIsEnabled] = useState(true);
  const [welcomeMessage, setWelcomeMessage] = useState(
    `Welcome to ELYSIAN AI.\n\nI'm your personal fragrance expert.\n\nI can help you discover the perfect perfume, compare fragrances, recommend gifts, track orders, answer questions, and provide personalized shopping advice.`
  );
  const [suggestedPrompts, setSuggestedPrompts] = useState<string[]>([
    'Recommend perfumes based on my personality',
    'Best long-lasting perfumes for Men under ₹999',
    'Compare Oud Imperiale vs Santal Blanc',
    'Track my order ELY-98234',
    'Recommend a luxury gift set for her',
    'Explain Extrait de Parfum concentration'
  ]);
  const [newPrompt, setNewPrompt] = useState('');

  // Knowledge Base Training Snippets
  const [knowledgeSnippets, setKnowledgeSnippets] = useState([
    {
      id: 'ks-1',
      title: '30% Extrait Concentration',
      category: 'Formulation',
      content: 'All ELYSIAN creations are Extrait de Parfum formulated at a 30% fragrance oil concentration, granting a sillage of 12-16 hours.'
    },
    {
      id: 'ks-2',
      title: 'Free Pan-India Shipping',
      category: 'Shipping',
      content: 'Complimentary express air shipping across India on orders above ₹499 via Delhivery & Bluedart (2-4 days).'
    },
    {
      id: 'ks-3',
      title: '14-Day Easy Exchange',
      category: 'Returns',
      content: 'Unopened perfume boxes eligible for 14-day return or exchange. Refunds processed within 3 business days.'
    }
  ]);
  const [newKsTitle, setNewKsTitle] = useState('');
  const [newKsCategory, setNewKsCategory] = useState('Catalog');
  const [newKsContent, setNewKsContent] = useState('');

  // Copywriter Tool State
  const [copyPrompt, setCopyPrompt] = useState('');
  const [copyTask, setCopyTask] = useState<'description' | 'seo' | 'social' | 'support'>('description');
  const [isGeneratingCopy, setIsGeneratingCopy] = useState(false);
  const [copyOutput, setCopyOutput] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Simulated Chat Logs for Admin Audit
  const chatLogs = [
    { id: 'log-101', user: 'Customer (Mumbai)', date: 'Today, 10:42 AM', query: 'Compare Oud Imperiale and Santal Blanc for a winter wedding', recommendation: 'Oud Imperiale Extrait (₹899)', score: 5 },
    { id: 'log-102', user: 'Customer (Delhi)', date: 'Today, 09:15 AM', query: 'Track my order ELY-98234', recommendation: 'Status: Out for Delivery', score: 5 },
    { id: 'log-103', user: 'Customer (Bengaluru)', date: 'Yesterday, 11:20 PM', query: 'What is Extrait de Parfum oil concentration?', recommendation: '30% Fragrance Oils (14h+ Longevity)', score: 5 },
    { id: 'log-104', user: 'Customer (Pune)', date: 'Yesterday, 06:40 PM', query: 'Unisex luxury gift set under ₹999', recommendation: 'Elysian Grand Coffret Gift Box (₹999)', score: 4 }
  ];

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleAddPrompt = () => {
    if (!newPrompt.trim()) return;
    setSuggestedPrompts([...suggestedPrompts, newPrompt.trim()]);
    setNewPrompt('');
    showToast('Suggested prompt added!');
  };

  const handleDeletePrompt = (index: number) => {
    setSuggestedPrompts(suggestedPrompts.filter((_, i) => i !== index));
    showToast('Prompt removed.');
  };

  const handleAddKnowledgeSnippet = () => {
    if (!newKsTitle.trim() || !newKsContent.trim()) return;
    const item = {
      id: `ks-${Date.now()}`,
      title: newKsTitle,
      category: newKsCategory,
      content: newKsContent
    };
    setKnowledgeSnippets([...knowledgeSnippets, item]);
    setNewKsTitle('');
    setNewKsContent('');
    showToast('Knowledge base article saved for AI training!');
  };

  const handleGenerateCopy = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGeneratingCopy(true);
    setCopyOutput(null);

    setTimeout(() => {
      setIsGeneratingCopy(false);
      if (copyTask === 'description') {
        setCopyOutput(
          `Elegantly formulated at an opulent 30% Extrait De Parfum concentration, this hypnotic scent opens with luminous Calabrian Bergamot and Sun-Drenched Grapefruit. As time lingers, a heart of Damask Rose and Night-Blooming Jasmine unveils itself over wild Assam Oud and Golden Amber.\n\nHandcrafted in small batch quantities for the discerning connoisseur who demands 16+ hours of projection.`
        );
      } else if (copyTask === 'seo') {
        setCopyOutput(
          `Meta Title: Buy Oud Imperiale Extrait De Parfum | ELYSIAN Luxury Fragrances India\nMeta Description: Shop Oud Imperiale 100ml (30% Extrait Concentration). Handcrafted with French botanical oils & wild Assam Oud. Free Express Pan-India Shipping above ₹499.`
        );
      } else if (copyTask === 'social') {
        setCopyOutput(
          `✨ Unveil the extraordinary. Oud Imperiale Extrait de Parfum wraps you in 14+ hours of rich Assam Oud and Damask Rose.\n\n🛒 Flat 50% OFF at elysian.in (All Perfumes Under ₹1000)\n#ElysianFragrances #HauteParfumerie #LuxuryPerfume`
        );
      } else {
        setCopyOutput(
          `Thank you for contacting ELYSIAN Atelier. All our Extrait De Parfum creations are formulated at a rich 30% fragrance oil concentration, granting a lasting sillage of 12-16 hours on skin and fabrics. Should you need personalized scent recommendations, our AI Assistant is at your service.`
        );
      }
    }, 800);
  };

  const handleExportConversations = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(chatLogs, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `elysian_ai_conversations_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Exported conversation logs!');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Toast Alert */}
      {toastMsg && (
        <div className="fixed top-20 right-8 z-50 bg-[#1F1F1F] text-[#C8A24A] border border-[#C8A24A]/40 text-xs font-montserrat uppercase font-bold px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2 animate-fadeIn">
          <Sparkles size={14} />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-[#171717] text-[#F8F6F2] p-6 sm:p-8 rounded-[24px] shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-[#C8A24A]/30">
        <div>
          <div className="flex items-center gap-2 text-xs font-montserrat uppercase tracking-[0.2em] text-[#C8A24A] font-bold">
            <Sparkles size={16} />
            <span>GenAI Assistant Atelier Console</span>
          </div>
          <h1 className="font-cormorant text-3xl font-light text-white pt-1">
            ELYSIAN AI <span className="italic text-[#C8A24A]">Manager & Copywriter</span>
          </h1>
          <p className="font-inter text-xs text-gray-400 font-light pt-1">
            Manage live AI Assistant settings, prompt suggestions, knowledge training, analytics, and luxury copywriting.
          </p>
        </div>

        {/* Global AI Master Toggle */}
        <div className="p-3 bg-[#222222] border border-[#C8A24A]/40 rounded-2xl flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Bot size={22} className="text-[#C8A24A]" />
            <div className="flex flex-col">
              <span className="text-xs font-montserrat font-bold text-white">AI Assistant Status</span>
              <span className={`text-[10px] font-bold ${isEnabled ? 'text-emerald-400' : 'text-rose-400'}`}>
                {isEnabled ? '● Active on Boutique' : '○ Disabled'}
              </span>
            </div>
          </div>

          <button
            onClick={() => {
              setIsEnabled(!isEnabled);
              showToast(isEnabled ? 'AI Assistant disabled on website' : 'AI Assistant enabled on website');
            }}
            className={`p-2.5 rounded-full font-bold transition-all cursor-pointer ${
              isEnabled ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
            }`}
            title="Toggle AI Assistant"
          >
            <Power size={18} />
          </button>
        </div>
      </div>

      {/* Tab Router Navigation */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#E8E2D7] pb-3">
        {[
          { id: 'manager', label: 'AI Settings & Prompts', icon: Settings },
          { id: 'training', label: 'Knowledge Base Training', icon: BookOpen },
          { id: 'copywriter', label: 'AI Copywriter', icon: Edit3 },
          { id: 'analytics', label: 'AI Performance Analytics', icon: BarChart3 },
          { id: 'history', label: 'Chat Logs & Export', icon: History }
        ].map((tab) => {
          const IconComp = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-full text-xs font-montserrat uppercase font-bold flex items-center gap-2 transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#1F1F1F] text-[#C8A24A] shadow-md'
                  : 'bg-white text-[#1F1F1F] hover:bg-[#E8E2D7] border border-[#E8E2D7]'
              }`}
            >
              <IconComp size={14} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: AI SETTINGS & SUGGESTED PROMPTS */}
      {activeTab === 'manager' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Welcome Message Editor */}
          <div className="lg:col-span-6 bg-white border border-[#E8E2D7] p-6 rounded-3xl shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-[#F4F1EA] pb-3">
              <Bot size={18} className="text-[#C8A24A]" />
              <h3 className="font-montserrat text-xs uppercase font-bold text-[#1F1F1F]">
                Welcome Message Configuration
              </h3>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-montserrat uppercase text-gray-500 font-bold block">
                Initial Assistant Greeting
              </label>
              <textarea
                rows={5}
                value={welcomeMessage}
                onChange={(e) => setWelcomeMessage(e.target.value)}
                className="w-full bg-[#F8F6F2] border border-[#E8E2D7] rounded-2xl p-3.5 text-xs font-inter focus:outline-none focus:border-[#C8A24A]"
              />
            </div>

            <button
              onClick={() => showToast('Welcome message saved successfully!')}
              className="bg-[#C8A24A] text-[#1F1F1F] text-xs font-montserrat uppercase font-bold px-6 py-2.5 rounded-full hover:bg-[#1F1F1F] hover:text-[#C8A24A] transition-all cursor-pointer shadow-sm"
            >
              Save Welcome Message
            </button>
          </div>

          {/* Suggested Prompt Chips Manager */}
          <div className="lg:col-span-6 bg-white border border-[#E8E2D7] p-6 rounded-3xl shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#F4F1EA] pb-3">
              <div className="flex items-center gap-2">
                <Sparkles size={18} className="text-[#C8A24A]" />
                <h3 className="font-montserrat text-xs uppercase font-bold text-[#1F1F1F]">
                  Suggested Prompt Chips
                </h3>
              </div>
              <span className="text-[10px] text-gray-400">{suggestedPrompts.length} Prompts Active</span>
            </div>

            {/* Add New Prompt Input */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newPrompt}
                onChange={(e) => setNewPrompt(e.target.value)}
                placeholder="e.g. Best summer fragrance under ₹600..."
                className="flex-1 bg-[#F8F6F2] border border-[#E8E2D7] rounded-full px-4 py-2 text-xs font-inter focus:outline-none focus:border-[#C8A24A]"
              />
              <button
                onClick={handleAddPrompt}
                className="p-2 bg-[#1F1F1F] text-[#C8A24A] hover:bg-[#C8A24A] hover:text-[#1F1F1F] rounded-full transition-colors cursor-pointer"
                title="Add Prompt"
              >
                <Plus size={16} />
              </button>
            </div>

            {/* Prompt List */}
            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {suggestedPrompts.map((prompt, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 bg-[#F8F6F2] border border-[#E8E2D7] rounded-xl text-xs font-inter text-[#1F1F1F]"
                >
                  <span className="truncate pr-2">{prompt}</span>
                  <button
                    onClick={() => handleDeletePrompt(idx)}
                    className="text-gray-400 hover:text-rose-500 cursor-pointer"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: KNOWLEDGE BASE TRAINING */}
      {activeTab === 'training' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 bg-white border border-[#E8E2D7] p-6 rounded-3xl shadow-sm space-y-4">
            <div className="flex items-center gap-2 border-b border-[#F4F1EA] pb-3">
              <BookOpen size={18} className="text-[#C8A24A]" />
              <h3 className="font-montserrat text-xs uppercase font-bold text-[#1F1F1F]">
                Train Assistant with Custom Data
              </h3>
            </div>

            <div className="space-y-3 text-xs font-inter">
              <div>
                <label className="font-montserrat uppercase font-bold text-gray-500 block mb-1">
                  Topic Title
                </label>
                <input
                  type="text"
                  value={newKsTitle}
                  onChange={(e) => setNewKsTitle(e.target.value)}
                  placeholder="e.g. Custom Bottle Engraving Service..."
                  className="w-full bg-[#F8F6F2] border border-[#E8E2D7] rounded-xl p-3 focus:outline-none focus:border-[#C8A24A]"
                />
              </div>

              <div>
                <label className="font-montserrat uppercase font-bold text-gray-500 block mb-1">
                  Category
                </label>
                <select
                  value={newKsCategory}
                  onChange={(e) => setNewKsCategory(e.target.value)}
                  className="w-full bg-[#F8F6F2] border border-[#E8E2D7] rounded-xl p-3 focus:outline-none focus:border-[#C8A24A]"
                >
                  <option value="Formulation">Formulation & Concentration</option>
                  <option value="Shipping">Shipping & Delivery</option>
                  <option value="Returns">Returns & Refunds</option>
                  <option value="Catalog">Products & Gifting</option>
                </select>
              </div>

              <div>
                <label className="font-montserrat uppercase font-bold text-gray-500 block mb-1">
                  Knowledge Context Snippet
                </label>
                <textarea
                  rows={4}
                  value={newKsContent}
                  onChange={(e) => setNewKsContent(e.target.value)}
                  placeholder="Detail the exact business logic or policy for the AI to reference..."
                  className="w-full bg-[#F8F6F2] border border-[#E8E2D7] rounded-xl p-3 focus:outline-none focus:border-[#C8A24A]"
                />
              </div>

              <button
                onClick={handleAddKnowledgeSnippet}
                className="w-full py-3 bg-[#C8A24A] text-[#1F1F1F] font-montserrat uppercase font-bold text-xs rounded-full hover:bg-[#1F1F1F] hover:text-[#C8A24A] transition-all cursor-pointer shadow-sm"
              >
                Add Snippet to Gemini System Instruction
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white border border-[#E8E2D7] p-6 rounded-3xl shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#F4F1EA] pb-3">
              <h3 className="font-montserrat text-xs uppercase font-bold text-[#1F1F1F]">
                Active Knowledge Base Articles ({knowledgeSnippets.length})
              </h3>
              <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                Synchronized with Gemini
              </span>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
              {knowledgeSnippets.map((ks) => (
                <div key={ks.id} className="p-4 bg-[#F8F6F2] border border-[#E8E2D7] rounded-2xl space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-montserrat font-bold text-xs text-[#1F1F1F]">{ks.title}</h4>
                    <span className="text-[9px] font-montserrat font-bold uppercase tracking-wider bg-[#C8A24A]/20 text-[#1F1F1F] px-2 py-0.5 rounded-full">
                      {ks.category}
                    </span>
                  </div>
                  <p className="text-xs font-inter text-gray-600 leading-relaxed">{ks.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: COPYWRITER TOOL */}
      {activeTab === 'copywriter' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-6 bg-white border border-[#E8E2D7] p-6 rounded-3xl shadow-sm space-y-5">
            <div className="flex flex-wrap items-center gap-2 border-b border-[#F4F1EA] pb-3">
              {[
                { id: 'description', label: 'Perfume Copy', icon: FileText },
                { id: 'seo', label: 'SEO Metadata', icon: Sparkles },
                { id: 'social', label: 'Social Ad Copy', icon: Share2 },
                { id: 'support', label: 'Auto-Reply', icon: HelpCircle }
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setCopyTask(t.id as any)}
                  className={`px-3 py-1.5 rounded-full text-xs font-montserrat uppercase font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    copyTask === t.id ? 'bg-[#1F1F1F] text-[#C8A24A]' : 'bg-[#F8F6F2] text-[#1F1F1F] hover:bg-[#E8E2D7]'
                  }`}
                >
                  <t.icon size={13} />
                  <span>{t.label}</span>
                </button>
              ))}
            </div>

            <form onSubmit={handleGenerateCopy} className="space-y-4 text-xs font-inter">
              <div>
                <label className="font-montserrat uppercase font-bold text-gray-500 block mb-1">
                  Fragrance Notes & Key Highlights
                </label>
                <textarea
                  rows={4}
                  required
                  value={copyPrompt}
                  onChange={(e) => setCopyPrompt(e.target.value)}
                  placeholder="e.g. Wild Assam Oud, Damask Rose, Golden Amber, 30% Extrait Concentration..."
                  className="w-full bg-[#F8F6F2] border border-[#E8E2D7] rounded-2xl p-3.5 focus:outline-none focus:border-[#C8A24A]"
                />
              </div>

              <button
                type="submit"
                disabled={isGeneratingCopy}
                className="bg-[#C8A24A] text-[#1F1F1F] font-montserrat uppercase text-xs font-bold px-6 py-3 rounded-full hover:bg-[#1F1F1F] hover:text-[#C8A24A] transition-all cursor-pointer flex items-center justify-center gap-2 w-full shadow-md"
              >
                {isGeneratingCopy ? (
                  <span>Generating Luxury Copy...</span>
                ) : (
                  <>
                    <Sparkles size={16} />
                    <span>Generate Copy with Gemini</span>
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="lg:col-span-6 bg-[#171717] text-white border border-[#333333] p-6 rounded-3xl shadow-xl flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between border-b border-[#2A2A2A] pb-3">
              <span className="text-xs font-montserrat uppercase tracking-wider font-bold text-[#C8A24A]">
                AI Generated Output
              </span>
              {copyOutput && (
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(copyOutput);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className="flex items-center gap-1.5 text-xs font-montserrat font-bold text-gray-300 hover:text-[#C8A24A] cursor-pointer"
                >
                  {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  <span>{copied ? 'Copied!' : 'Copy Result'}</span>
                </button>
              )}
            </div>

            <div className="flex-1 font-inter text-xs text-gray-300 leading-relaxed font-light whitespace-pre-wrap p-4 bg-[#121212] rounded-2xl border border-[#222222]">
              {copyOutput ? (
                copyOutput
              ) : (
                <span className="text-gray-500 italic">
                  Enter your notes or prompt details on the left and click Generate to produce luxury marketing copy...
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: PERFORMANCE ANALYTICS */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white border border-[#E8E2D7] p-5 rounded-2xl shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#C8A24A]/20 border border-[#C8A24A] flex items-center justify-center text-[#C8A24A]">
                <MessageSquare size={22} />
              </div>
              <div>
                <span className="text-[10px] font-montserrat uppercase tracking-wider text-gray-400 block font-bold">Total AI Queries</span>
                <span className="text-2xl font-cormorant font-bold text-[#1F1F1F]">1,420</span>
              </div>
            </div>

            <div className="bg-white border border-[#E8E2D7] p-5 rounded-2xl shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500 flex items-center justify-center text-emerald-600">
                <Award size={22} />
              </div>
              <div>
                <span className="text-[10px] font-montserrat uppercase tracking-wider text-gray-400 block font-bold">User Satisfaction</span>
                <span className="text-2xl font-cormorant font-bold text-[#1F1F1F]">98.4%</span>
              </div>
            </div>

            <div className="bg-white border border-[#E8E2D7] p-5 rounded-2xl shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500 flex items-center justify-center text-blue-600">
                <TrendingUp size={22} />
              </div>
              <div>
                <span className="text-[10px] font-montserrat uppercase tracking-wider text-gray-400 block font-bold">Top Recommended</span>
                <span className="text-xl font-cormorant font-bold text-[#1F1F1F]">Oud Imperiale Extrait</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: CHAT LOGS & EXPORT */}
      {activeTab === 'history' && (
        <div className="bg-white border border-[#E8E2D7] p-6 rounded-3xl shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-[#F4F1EA] pb-3">
            <div className="flex items-center gap-2">
              <History size={18} className="text-[#C8A24A]" />
              <h3 className="font-montserrat text-xs uppercase font-bold text-[#1F1F1F]">
                Customer Consultation Logs
              </h3>
            </div>
            <button
              onClick={handleExportConversations}
              className="bg-[#1F1F1F] text-[#C8A24A] hover:bg-[#C8A24A] hover:text-[#1F1F1F] text-xs font-montserrat uppercase font-bold px-4 py-2 rounded-full transition-all cursor-pointer flex items-center gap-2 shadow-sm"
            >
              <Download size={14} />
              <span>Export Logs JSON</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs font-inter">
              <thead>
                <tr className="border-b border-[#E8E2D7] text-gray-400 font-montserrat uppercase text-[10px] tracking-wider">
                  <th className="py-3 px-2">Log ID</th>
                  <th className="py-3 px-2">Customer Session</th>
                  <th className="py-3 px-2">Query Prompt</th>
                  <th className="py-3 px-2">AI Recommendation</th>
                  <th className="py-3 px-2">Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F4F1EA]">
                {chatLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-[#F8F6F2]">
                    <td className="py-3 px-2 font-mono font-bold text-[#1F1F1F]">{log.id}</td>
                    <td className="py-3 px-2">
                      <div className="font-semibold text-[#1F1F1F]">{log.user}</div>
                      <div className="text-[10px] text-gray-400">{log.date}</div>
                    </td>
                    <td className="py-3 px-2 text-gray-600 max-w-xs truncate">{log.query}</td>
                    <td className="py-3 px-2 text-[#C8A24A] font-semibold">{log.recommendation}</td>
                    <td className="py-3 px-2 text-amber-500 font-bold">★ {log.score}.0</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
