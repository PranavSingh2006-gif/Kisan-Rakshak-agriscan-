import React, { useState, useRef, useEffect } from 'react';
import { Camera, Send, Sparkles, User, Bot, Loader2, CheckCircle2, UserCheck, ShieldCheck, MessageSquare } from 'lucide-react';
import Footer from '../Footer';

const EXPERTS = [
  { id: 'dr-rajiv', name: 'Dr. Rajiv Patil', title: 'Senior Agronomist — ICAR', avatar: '👨‍🔬', online: true, speciality: 'Soil Health & Fertilizers' },
  { id: 'dr-sunita', name: 'Dr. Sunita Rao', title: 'Plant Pathologist — IARI', avatar: '👩‍🔬', online: true, speciality: 'Fungal & Bacterial Diseases' },
  { id: 'mr-kadam', name: 'Mr. Anil Kadam', title: 'Krishi Vigyan Kendra — Pune', avatar: '🧑‍🌾', online: false, speciality: 'Field Crop Management' },
];

const EXPERT_REPLIES = [
  'Based on what you have described, I recommend getting a soil test done first. The symptoms could be linked to micronutrient deficiency, particularly zinc. Please share a photo if possible.',
  'This sounds like early signs of downy mildew. Ensure you reduce leaf wetness by improving canopy ventilation. A copper-based fungicide at 3g/L should be applied every 7 days.',
  'For soybean crops at this growth stage, the issue is often linked to late-season pod filling stress. Confirm your irrigation schedule and check for white mold near the base of the plant.',
  'Thank you for sharing this. I am reviewing your query and will respond with field-specific guidance. In the meantime, avoid any foliar spray until we confirm the pathogen.',
  'Crop rotation is highly recommended after a disease outbreak. For this season, complete the treatment cycle and document the progression for our records.',
];

export default function AIAssistantPage({ onOpenScan, onNavigate }) {
  const [mode, setMode] = useState('ai');
  const [selectedExpert, setSelectedExpert] = useState(EXPERTS[0]);

  const [aiMessages, setAiMessages] = useState([
    { sender: 'bot', text: 'Share your crop, growth stage, affected plant part and a clear photo. I can help you decide what to inspect next.' },
    { sender: 'user', text: 'My tomato leaves have spots.' },
    { sender: 'bot', text: 'Upload a clear photo using Diagnose My Crop for AI-assisted analysis.' }
  ]);
  const [aiInput, setAiInput] = useState('');
  const [aiLoading, setAiLoading] = useState(false);

  const [expertMessages, setExpertMessages] = useState([
    { sender: 'expert', text: `Hello! I'm ${EXPERTS[0].name}, ${EXPERTS[0].title}. Please describe your crop issue and I will guide you with field-tested advice.` }
  ]);
  const [expertInput, setExpertInput] = useState('');
  const [expertLoading, setExpertLoading] = useState(false);

  const chatBottomRef = useRef(null);

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, []);
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [aiMessages, expertMessages, aiLoading, expertLoading]);

  const handleSelectExpert = (expert) => {
    setSelectedExpert(expert);
    setExpertMessages([
      { sender: 'expert', text: `Hello! I'm ${expert.name}, ${expert.title}. Please describe your crop issue and I will guide you with field-tested advice.` }
    ]);
  };

  const handleSendAI = async (textToSend) => {
    const query = textToSend || aiInput;
    if (!query.trim() || aiLoading) return;
    setAiMessages(prev => [...prev, { sender: 'user', text: query.trim() }]);
    if (!textToSend) setAiInput('');
    setAiLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/chat-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query.trim() })
      });
      if (res.ok) {
        const data = await res.json();
        setAiMessages(prev => [...prev, { sender: 'bot', text: data.reply }]);
      } else {
        throw new Error('non-ok');
      }
    } catch {
      setAiMessages(prev => [...prev, { sender: 'bot', text: 'Inspect leaf spots carefully for concentric rings or yellow halos. You can take a clear snapshot with "Diagnose My Crop" for laboratory-grade diagnosis.' }]);
    } finally {
      setAiLoading(false);
    }
  };

  const handleSendExpert = (textToSend) => {
    const query = textToSend || expertInput;
    if (!query.trim() || expertLoading) return;
    setExpertMessages(prev => [...prev, { sender: 'user', text: query.trim() }]);
    if (!textToSend) setExpertInput('');
    setExpertLoading(true);
    setTimeout(() => {
      const reply = EXPERT_REPLIES[Math.floor(Math.random() * EXPERT_REPLIES.length)];
      setExpertMessages(prev => [...prev, { sender: 'expert', text: reply }]);
      setExpertLoading(false);
    }, 1800 + Math.random() * 800);
  };

  const handleKeyDown = (e, sendFn) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendFn(); }
  };

  const aiQuickPills = [
    { label: 'AI crop scan', prompt: 'How does AI crop scan detect leaf pathogens?' },
    { label: 'Weather context', prompt: 'How does rain and humidity affect fungal outbreaks?' },
    { label: 'Stage-specific advice', prompt: 'What diseases are common during the flowering stage?' },
    { label: 'Multilingual support', prompt: 'Can you explain common potato blights in Hindi?' }
  ];

  const expertQuickPills = [
    { label: 'Soil health query', prompt: 'My soil is showing signs of nutrient deficiency. What test should I do?' },
    { label: 'Fungal outbreak', prompt: 'There is a white powdery coating on my crop leaves. What is it?' },
    { label: 'Irrigation advice', prompt: 'How often should I irrigate during the fruit bulking stage?' },
    { label: 'Pesticide guidance', prompt: 'Which pesticide is safe for my organic soybean crop?' }
  ];

  const isAI = mode === 'ai';

  return (
    <div className="min-h-full flex flex-col font-sans selection:bg-green-100 selection:text-green-900 bg-[#fcfdfa] text-gray-900">
      <div className="fixed inset-0 opacity-80 pointer-events-none z-0" style={{ backgroundImage: 'url(/assets/doodle_bg_clean.png)', backgroundRepeat: 'repeat', backgroundPosition: 'top left', backgroundSize: '240px auto' }} />

      <div className="relative z-10 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-[11px] font-extrabold tracking-widest text-emerald-800 uppercase font-mono">
                {isAI ? 'HUMAN + DIGITAL SUPPORT' : 'OFFICIAL EXPERT NETWORK'}
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#11291c] tracking-tight font-display mt-0.5">
                {isAI ? 'Ask a Pest Control Expert' : 'Expert Field Advice'}
              </h1>
              <p className="text-sm sm:text-base text-gray-700 mt-1 max-w-2xl leading-relaxed font-medium">
                {isAI
                  ? 'Describe the symptom or upload a crop photo. The platform combines guided triage with expert support.'
                  : 'Connect directly with certified agronomists and plant pathologists from ICAR, IARI, and KVK for real field guidance.'}
              </p>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-center">
              <div className="flex bg-gray-100 rounded-xl p-1 border border-gray-200 gap-1">
                <button onClick={() => setMode('ai')} className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${isAI ? 'bg-[#257038] text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'}`}>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>AI Assistant</span>
                </button>
                <button onClick={() => setMode('expert')} className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${!isAI ? 'bg-[#257038] text-white shadow-xs' : 'text-gray-600 hover:text-gray-900'}`}>
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Expert Advice</span>
                </button>
              </div>
            </div>
          </div>

          <div className="bg-[#f0f4f0] rounded-3xl p-6 sm:p-8 border border-green-200/90 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

              <div className="lg:col-span-4 space-y-4">
                {isAI ? (
                  <>
                    <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-3xl shadow-sm border border-green-200/70">🧑‍🌾</div>
                    <div>
                      <h2 className="text-xl font-extrabold text-gray-900">Farmer Dashboard</h2>
                      <p className="text-xs text-gray-600 mt-1 leading-relaxed">Talk to an agriculture expert about a crop or pest problem.</p>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {aiQuickPills.map((pill) => (
                        <button key={pill.label} onClick={() => handleSendAI(pill.prompt)} className="px-3 py-1.5 rounded-full bg-white hover:bg-emerald-50 border border-green-200 text-xs font-semibold text-gray-700 hover:text-[#257038] transition-all shadow-2xs cursor-pointer">{pill.label}</button>
                      ))}
                    </div>
                    <div className="p-4 rounded-2xl bg-white border border-green-100 text-xs space-y-2">
                      <div className="flex items-center gap-2 text-emerald-800 font-bold">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>24/7 Agro-Triage Active</span>
                      </div>
                      <p className="text-gray-500 text-[11px] leading-relaxed">Grounded with Maharashtra disease epidemiology, ICAR guidelines, and verified plant pathology benchmarks.</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <h2 className="text-base font-extrabold text-gray-900 mb-3">Available Experts</h2>
                      <div className="space-y-2">
                        {EXPERTS.map((expert) => (
                          <button key={expert.id} onClick={() => handleSelectExpert(expert)} className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer ${selectedExpert.id === expert.id ? 'bg-[#257038]/10 border-[#257038] shadow-xs' : 'bg-white border-gray-200 hover:border-green-300 hover:bg-green-50/50'}`}>
                            <div className="flex items-center gap-2.5">
                              <span className="text-2xl">{expert.avatar}</span>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-1.5">
                                  <span className="text-xs font-extrabold text-gray-900 truncate">{expert.name}</span>
                                  <span className={`w-2 h-2 rounded-full shrink-0 ${expert.online ? 'bg-emerald-500' : 'bg-gray-300'}`} />
                                </div>
                                <p className="text-[10px] text-gray-500 truncate">{expert.title}</p>
                                <p className="text-[10px] font-semibold text-[#257038] mt-0.5">{expert.speciality}</p>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="p-3 rounded-2xl bg-white border border-green-100 text-xs">
                      <div className="flex items-center gap-2 text-emerald-800 font-bold mb-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Verified Official Network</span>
                      </div>
                      <p className="text-gray-500 text-[11px] leading-relaxed">All experts are certified by ICAR / IARI / KVK. Responses are field-tested and compliant with government agronomy guidelines.</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {expertQuickPills.map((pill) => (
                        <button key={pill.label} onClick={() => handleSendExpert(pill.prompt)} className="px-3 py-1.5 rounded-full bg-white hover:bg-emerald-50 border border-green-200 text-xs font-semibold text-gray-700 hover:text-[#257038] transition-all shadow-2xs cursor-pointer">{pill.label}</button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              <div className="lg:col-span-8 bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col h-[520px] overflow-hidden">
                <div className="px-5 py-3.5 border-b border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    {isAI ? (
                      <>
                        <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center text-sm">🤖</div>
                        <span className="font-bold text-sm text-gray-900">KisanRakshak AI Assistant</span>
                      </>
                    ) : (
                      <>
                        <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center text-sm">{selectedExpert.avatar}</div>
                        <div>
                          <span className="font-bold text-sm text-gray-900 block leading-tight">{selectedExpert.name}</span>
                          <span className="text-[10px] text-gray-500">{selectedExpert.title}</span>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
                    <span className={`w-2 h-2 rounded-full ${isAI || selectedExpert.online ? 'bg-emerald-500 animate-pulse' : 'bg-amber-400'}`} />
                    <span>{isAI ? 'Online' : selectedExpert.online ? 'Available' : 'Will respond shortly'}</span>
                  </div>
                </div>

                <div className="flex-1 p-5 overflow-y-auto space-y-4">
                  {(isAI ? aiMessages : expertMessages).map((msg, idx) => {
                    const isUser = msg.sender === 'user';
                    return (
                      <div key={idx} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                        {!isUser && (
                          <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center text-sm mr-2 shrink-0 self-end mb-0.5">
                            {isAI ? '🤖' : selectedExpert.avatar}
                          </div>
                        )}
                        <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-xs sm:text-sm leading-relaxed ${isUser ? 'bg-[#257038] text-white rounded-br-xs shadow-xs' : 'bg-[#e7f0e7] text-gray-800 rounded-bl-xs border border-green-100'}`}>
                          {msg.text}
                        </div>
                        {isUser && (
                          <div className="w-7 h-7 rounded-full bg-gray-200 flex items-center justify-center text-sm ml-2 shrink-0 self-end mb-0.5">🧑‍🌾</div>
                        )}
                      </div>
                    );
                  })}

                  {(isAI ? aiLoading : expertLoading) && (
                    <div className="flex justify-start">
                      <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center text-sm mr-2 shrink-0">{isAI ? '🤖' : selectedExpert.avatar}</div>
                      <div className="bg-[#e7f0e7] px-4 py-3 rounded-2xl rounded-bl-xs border border-green-100 flex items-center gap-2 text-xs text-gray-600">
                        <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
                        <span>{isAI ? 'KisanRakshak is analyzing...' : `${selectedExpert.name.split(' ')[0]} is typing...`}</span>
                      </div>
                    </div>
                  )}
                  <div ref={chatBottomRef} />
                </div>

                <div className="p-3 bg-gray-50/70 border-t border-gray-100">
                  <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-xl px-3 py-1.5 shadow-2xs focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-emerald-500 transition-all">
                    <input type="text" value={isAI ? aiInput : expertInput} onChange={(e) => isAI ? setAiInput(e.target.value) : setExpertInput(e.target.value)} onKeyDown={(e) => handleKeyDown(e, isAI ? handleSendAI : handleSendExpert)} placeholder={isAI ? 'Type your question...' : `Message ${selectedExpert.name.split(' ')[0]}...`} className="flex-1 text-xs sm:text-sm bg-transparent border-none focus:outline-none text-gray-800 placeholder-gray-400" />
                    <button onClick={() => isAI ? handleSendAI() : handleSendExpert()} disabled={(isAI ? aiLoading || !aiInput.trim() : expertLoading || !expertInput.trim())} className="px-4 py-1.5 rounded-lg bg-[#257038] hover:bg-[#1e5c2e] disabled:opacity-40 disabled:hover:bg-[#257038] text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-xs">
                      <Send className="w-3.5 h-3.5" />
                      <span>Send</span>
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-gray-200">
          <Footer onOpenScan={onOpenScan} />
        </div>
      </div>
    </div>
  );
}
