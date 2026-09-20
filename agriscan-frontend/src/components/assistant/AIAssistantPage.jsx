import React, { useState, useRef, useEffect } from 'react';
import { Camera, Send, Sparkles, User, Bot, Loader2, CheckCircle2 } from 'lucide-react';
import Footer from '../Footer';

export default function AIAssistantPage({ onOpenScan, onNavigate }) {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Share your crop, growth stage, affected plant part and a clear photo. I can help you decide what to inspect next.'
    },
    {
      sender: 'user',
      text: 'My tomato leaves have spots.'
    },
    {
      sender: 'bot',
      text: 'Upload a clear photo using Diagnose My Crop for AI-assisted analysis.'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const chatBottomRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSendMessage = async (textToSend) => {
    const query = textToSend || inputValue;
    if (!query.trim() || loading) return;

    const userMsg = { sender: 'user', text: query.trim() };
    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/chat-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query.trim() })
      });

      if (res.ok) {
        const data = await res.json();
        setMessages(prev => [...prev, { sender: 'bot', text: data.reply }]);
      } else {
        setMessages(prev => [
          ...prev,
          {
            sender: 'bot',
            text: 'I recommend inspecting the underside of the leaf for discoloration or spore dust. Use "Diagnose My Crop" to scan a leaf photo for automated diagnosis.'
          }
        ]);
      }
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: 'Inspect leaf spots carefully for concentric rings or yellow halos. You can take a clear snapshot with "Diagnose My Crop" for laboratory-grade diagnosis.'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickPills = [
    { label: 'AI crop scan', prompt: 'How does AI crop scan detect leaf pathogens?' },
    { label: 'Weather context', prompt: 'How does rain and humidity affect fungal outbreaks?' },
    { label: 'Stage-specific advice', prompt: 'What diseases are common during the flowering stage?' },
    { label: 'Multilingual support', prompt: 'Can you explain common potato blights in Hindi?' }
  ];

  return (
    <div className="min-h-full flex flex-col font-sans selection:bg-green-100 selection:text-green-900 bg-[#fcfdfa] text-gray-900">
      
      {/* Seamless botanical doodle wallpaper */}
      <div 
        className="fixed inset-0 opacity-80 pointer-events-none z-0"
        style={{
          backgroundImage: 'url(/assets/doodle_bg_clean.png)',
          backgroundRepeat: 'repeat',
          backgroundPosition: 'top left',
          backgroundSize: '240px auto'
        }}
      />

      <div className="relative z-10 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 flex-1 flex flex-col justify-between">
        
        {/* Top Header matching reference image exactly */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-[11px] font-extrabold tracking-widest text-emerald-800 uppercase font-mono">
                HUMAN + DIGITAL SUPPORT
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#11291c] tracking-tight font-display mt-0.5">
                Ask a Pest Control Expert
              </h1>
              <p className="text-sm sm:text-base text-gray-700 mt-1 max-w-2xl leading-relaxed font-medium">
                Describe the symptom or upload a crop photo. The platform combines guided triage with expert support.
              </p>
            </div>

            {/* Top Right Action Button */}
            <button
              onClick={onOpenScan}
              className="self-start sm:self-center flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#257038] hover:bg-[#1e5c2e] text-white font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer shrink-0"
            >
              <Camera className="w-4 h-4" />
              <span>Diagnose My Crop</span>
            </button>
          </div>

          {/* Main Card Container matching reference image card format */}
          <div className="bg-[#f0f4f0] rounded-3xl p-6 sm:p-8 border border-green-200/90 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Farmer Dashboard */}
              <div className="lg:col-span-4 space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-3xl shadow-sm border border-green-200/70">
                  🧑‍🌾
                </div>

                <div>
                  <h2 className="text-xl font-extrabold text-gray-900">
                    Farmer Dashboard
                  </h2>
                  <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                    Talk to an agriculture expert about a crop or pest problem.
                  </p>
                </div>

                {/* 4 Interactive Context Pills */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {quickPills.map((pill) => (
                    <button
                      key={pill.label}
                      onClick={() => handleSendMessage(pill.prompt)}
                      className="px-3 py-1.5 rounded-full bg-white hover:bg-emerald-50 border border-green-200 text-xs font-semibold text-gray-700 hover:text-[#257038] transition-all shadow-2xs cursor-pointer"
                    >
                      {pill.label}
                    </button>
                  ))}
                </div>

                <div className="p-4 rounded-2xl bg-white border border-green-100 text-xs space-y-2">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>24/7 Agro-Triage Active</span>
                  </div>
                  <p className="text-gray-500 text-[11px] leading-relaxed">
                    Grounded with Uttar Pradesh disease epidemiology, ICAR guidelines, and verified plant pathology benchmarks.
                  </p>
                </div>
              </div>

              {/* Right Column: Chat Assistant Card */}
              <div className="lg:col-span-8 bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col h-[520px] overflow-hidden">
                
                {/* Chat Top Bar */}
                <div className="px-5 py-3.5 border-b border-gray-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-gray-900">
                      KisanRakshak Assistant
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Online</span>
                  </div>
                </div>

                {/* Chat Messages Log */}
                <div className="flex-1 p-5 overflow-y-auto space-y-4">
                  {messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] sm:max-w-[75%] px-4 py-3 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                          msg.sender === 'user'
                            ? 'bg-[#257038] text-white rounded-br-xs shadow-xs'
                            : 'bg-[#e7f0e7] text-gray-800 rounded-bl-xs border border-green-100'
                        }`}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}

                  {loading && (
                    <div className="flex justify-start">
                      <div className="bg-[#e7f0e7] px-4 py-3 rounded-2xl rounded-bl-xs border border-green-100 flex items-center gap-2 text-xs text-gray-600">
                        <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
                        <span>KisanRakshak is analyzing...</span>
                      </div>
                    </div>
                  )}

                  <div ref={chatBottomRef} />
                </div>

                {/* Bottom Input Field */}
                <div className="p-3 bg-gray-50/70 border-t border-gray-100">
                  <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-xl px-3 py-1.5 shadow-2xs focus-within:ring-2 focus-within:ring-emerald-500 focus-within:border-emerald-500 transition-all">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Type your question..."
                      className="flex-1 text-xs sm:text-sm bg-transparent border-none focus:outline-none text-gray-800 placeholder-gray-400"
                    />
                    <button
                      onClick={() => handleSendMessage()}
                      disabled={loading || !inputValue.trim()}
                      className="px-4 py-1.5 rounded-lg bg-[#257038] hover:bg-[#1e5c2e] disabled:opacity-40 disabled:hover:bg-[#257038] text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send</span>
                    </button>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-6 border-t border-gray-200">
          <Footer onOpenScan={onOpenScan} />
        </div>

      </div>

    </div>
  );
}
