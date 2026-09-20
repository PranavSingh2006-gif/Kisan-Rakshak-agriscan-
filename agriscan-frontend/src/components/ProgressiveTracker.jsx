import React, { useState } from 'react';
import { 
  Activity, 
  Clock, 
  Calendar, 
  ArrowRight, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  RefreshCw, 
  SlidersHorizontal,
  FileText,
  ChevronDown,
  Layers,
  ShieldCheck,
  TrendingDown,
  TrendingUp,
  PlusCircle
} from 'lucide-react';
import { initialTrackingHistory } from '../data/historyData';

export default function ProgressiveTracker() {
  const [history, setHistory] = useState(initialTrackingHistory);
  const [activeScanIndex, setActiveScanIndex] = useState(1); // default to latest Scan #2
  const [hasSimulatedScan3, setHasSimulatedScan3] = useState(false);

  const currentCrop = history[0];
  const scans = currentCrop.scans;

  const handleSimulateScan3 = () => {
    if (hasSimulatedScan3) return;

    const newScan3 = {
      scanNumber: 3,
      date: 'Sept 26, 2026 (Simulated Next Week)',
      daysAgo: 'Future Projection',
      stage: 'Adaptive Outcome Verification',
      lesionCoverage: '14% leaf surface (Reduction -30%)',
      severityScore: 32,
      diagnosis: 'Pathogen Arrested • 78% Foliar Recovery',
      image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80',
      prescribedTactic: 'MAINTENANCE PROTOCOL ACTIVATED',
      outcomeReport: 'Success! Switching to systemic Difenoconazole and converting to drip irrigation effectively killed mycelial hyphae despite continuous high humidity.',
      adaptiveTactics: [
        {
          title: 'Reduce to Maintenance Bio-Fungicide',
          detail: 'Cease heavy chemical spray. Apply Bacillus subtilis every 14 days for preventive biological armor.',
          priority: 'Weekly schedule'
        },
        {
          title: 'Monitor Regrowth Vigor',
          detail: 'Apply balanced foliar potassium & calcium to thicken cell walls of emerging foliage.',
          priority: 'Next fertigation cycle'
        }
      ],
      recoveryComparison: {
        previousSeverity: 89,
        currentSeverity: 32,
        deltaPercent: -57,
        trend: 'IMPROVED',
        message: 'Adaptive tactics successfully halted the outbreak! 78% of infected plot saved from defoliation.'
      }
    };

    const updatedCrop = {
      ...currentCrop,
      status: 'RECOVERING_UNDER_CONTROL',
      scans: [...scans, newScan3]
    };

    setHistory([updatedCrop]);
    setActiveScanIndex(2); // select scan #3
    setHasSimulatedScan3(true);
  };

  return (
    <section id="progressive-tracking" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-[#1a552b] text-xs font-bold uppercase tracking-wider mb-3">
          <Activity className="w-3.5 h-3.5" />
          <span>Progressive Multi-Scan Tracking</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#11291c] font-display tracking-tight">
          Adaptive Crop Memory & Treatment Evolution
        </h2>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">
          Kisan Rakshak stores every scan in the crop's chronological health diary. During each follow-up scan, it evaluates the outcome of previously applied treatments and automatically invents new tactics if the disease resisted or conditions worsened.
        </p>
      </div>

      {/* Plot Metadata Card */}
      <div className="bg-white rounded-3xl border border-green-100 shadow-xl overflow-hidden mb-8">
        
        <div className="p-6 bg-[#f7faf8] border-b border-gray-100 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#257038] text-white flex items-center justify-center font-bold text-lg shadow-sm">
              #4
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-gray-900 text-lg sm:text-xl font-display">
                  {currentCrop.cropName}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">
                  {currentCrop.status === 'ADAPTIVE_TACTICS_REQUIRED' ? 'Adaptive Tactics Needed' : 'Under Control • Recovering'}
                </span>
              </div>
              <p className="text-xs text-gray-500 font-medium mt-0.5">
                Location: {currentCrop.plotLocation} • Monitored since {currentCrop.firstScanDate}
              </p>
            </div>
          </div>

          {/* Simulate Next Scan CTA */}
          <div className="flex items-center gap-3">
            {!hasSimulatedScan3 ? (
              <button
                onClick={handleSimulateScan3}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#257038] to-[#1e5c2e] hover:from-[#1e5c2e] hover:to-[#164623] text-white text-xs font-bold flex items-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Simulate Scan #3 (Post-Adaptive Recovery)</span>
              </button>
            ) : (
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Scan #3 Successfully Logged & Verified</span>
              </span>
            )}
          </div>
        </div>

        {/* Chronological Scan Timeline Strip */}
        <div className="p-6 border-b border-gray-100 bg-white">
          <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-4">
            Progressive Scan Timeline:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {scans.map((scan, idx) => (
              <div
                key={scan.scanNumber}
                onClick={() => setActiveScanIndex(idx)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  activeScanIndex === idx
                    ? 'border-[#257038] bg-[#f2f9f4] shadow-md ring-2 ring-green-600/20'
                    : 'border-gray-200 hover:bg-gray-50 bg-white'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#257038] text-white">
                    Scan #{scan.scanNumber}
                  </span>
                  <span className="text-xs text-gray-500 font-medium">
                    {scan.date}
                  </span>
                </div>

                <h4 className="font-bold text-gray-900 text-sm mt-1">
                  {scan.stage}
                </h4>
                
                <p className="text-xs text-gray-600 mt-1 truncate">
                  {scan.diagnosis}
                </p>

                <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                  <span className="text-gray-500">Lesion Cover:</span>
                  <span className="font-bold text-gray-800">{scan.lesionCoverage.split('(')[0]}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Evaluation of Selected Scan */}
        {scans[activeScanIndex] && (
          <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left: Scan comparison card */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-gray-200 shadow-md">
                <img
                  src={scans[activeScanIndex].image}
                  alt={`Scan #${scans[activeScanIndex].scanNumber}`}
                  className="w-full h-full object-cover"
                />
                
                <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md px-3 py-1 rounded-lg text-white text-xs font-mono">
                  Scan #{scans[activeScanIndex].scanNumber} • {scans[activeScanIndex].date}
                </div>

                <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg text-gray-900 text-xs font-bold shadow-sm">
                  Severity: {scans[activeScanIndex].severityScore}/100
                </div>
              </div>

              {/* Recovery comparison delta if scan > 1 */}
              {scans[activeScanIndex].recoveryComparison && (
                <div className={`p-4 rounded-2xl border ${
                  scans[activeScanIndex].recoveryComparison.trend === 'IMPROVED'
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                    : 'bg-amber-50 border-amber-200 text-amber-900'
                }`}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                      {scans[activeScanIndex].recoveryComparison.trend === 'IMPROVED' ? (
                        <>
                          <TrendingDown className="w-4 h-4 text-emerald-600" />
                          <span>Recovery Verified (-57% Lesion Drop)</span>
                        </>
                      ) : (
                        <>
                          <TrendingUp className="w-4 h-4 text-amber-600" />
                          <span>Treatment Insufficient (+6% Lesion Expansion)</span>
                        </>
                      )}
                    </span>
                  </div>

                  <p className="text-xs leading-relaxed">
                    {scans[activeScanIndex].recoveryComparison.message}
                  </p>
                </div>
              )}
            </div>

            {/* Right: Outcome Evaluation & Adaptive Tactics */}
            <div className="lg:col-span-7 space-y-5">
              
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Outcome Evaluation of Previous Solution:
                </span>
                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200/80 mt-1.5">
                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed font-medium">
                    {scans[activeScanIndex].outcomeReport}
                  </p>
                </div>
              </div>

              {/* Adaptive Tactics Recommended */}
              {scans[activeScanIndex].adaptiveTactics ? (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-extrabold text-gray-900 flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[#257038]" />
                      <span>Kisan Rakshak Adaptive Tactics Engine</span>
                    </h4>
                    <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                      Weather-Calibrated
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {scans[activeScanIndex].adaptiveTactics.map((tactic, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl bg-white border border-green-200/80 shadow-xs hover:border-green-400 transition-all">
                        <div className="flex items-center justify-between">
                          <h5 className="font-bold text-xs text-gray-900">
                            {idx + 1}. {tactic.title}
                          </h5>
                          <span className="text-[10px] font-semibold text-[#257038] bg-green-50 px-2 py-0.5 rounded border border-green-200">
                            {tactic.priority}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                          {tactic.detail}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-green-50 border border-green-200 text-xs text-green-900">
                  <p className="font-bold">Initial Baseline Scan Registered</p>
                  <p className="mt-1 text-gray-600">Prescribed: {scans[activeScanIndex].prescribedTactic}</p>
                </div>
              )}

            </div>

          </div>
        )}

      </div>

    </section>
  );
}

