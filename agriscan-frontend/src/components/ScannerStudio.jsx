import React, { useState } from 'react';
import { 
  Camera, 
  Upload, 
  Sparkles, 
  AlertTriangle, 
  ShieldCheck, 
  CheckCircle2, 
  RefreshCw, 
  Leaf, 
  Check, 
  Clock, 
  Printer, 
  ArrowRight,
  BookmarkPlus,
  ShieldAlert
} from 'lucide-react';
import { cropDatabase } from '../data/cropData';

export default function ScannerStudio({ onSaveToTracker }) {
  const [selectedCrop, setSelectedCrop] = useState(cropDatabase[0]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState('');
  const [scanComplete, setScanComplete] = useState(true);
  const [customImage, setCustomImage] = useState(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleStartScan = (crop) => {
    setSelectedCrop(crop);
    setIsScanning(true);
    setScanComplete(false);
    setSavedSuccess(false);
    setScanStep('Detecting leaf geometry & foliar boundaries...');

    setTimeout(() => {
      setScanStep('Analyzing lesion spectral signature & necrosis pattern...');
    }, 850);

    setTimeout(() => {
      setScanStep('Correlating with microclimate weather & 50,000+ certified pathogen records...');
    }, 1700);

    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
    }, 2500);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomImage(url);
      handleStartScan({
        ...cropDatabase[0],
        crop: 'Custom Uploaded Leaf',
        image: url
      });
    }
  };

  const handleSave = () => {
    if (onSaveToTracker) {
      onSaveToTracker(selectedCrop);
    }
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3500);
  };

  return (
    <section id="scanner" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-[#206332] text-xs font-bold uppercase tracking-wider mb-3">
          <Camera className="w-3.5 h-3.5" />
          <span>Interactive AI Diagnosis Studio</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#11291c] font-display tracking-tight">
          Scan & Diagnose Crop Infections Instantly
        </h2>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">
          Upload an image of an infected leaf or test our pre-loaded diseased field samples to generate a verified agronomic report with organic and chemical remedies.
        </p>
      </div>

      {/* Main Studio Container */}
      <div className="bg-white rounded-[28px] border border-green-100 shadow-xl overflow-hidden">
        
        {/* Sample selection ribbon */}
        <div className="p-4 sm:p-6 bg-[#fbfdfa] border-b border-gray-100 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Select Field Sample or Upload:
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {cropDatabase.map((crop) => (
              <button
                key={crop.id}
                onClick={() => handleStartScan(crop)}
                disabled={isScanning}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                  selectedCrop.id === crop.id
                    ? 'bg-[#257038] text-white border-[#257038] shadow-xs'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-green-300'
                }`}
              >
                {crop.crop}: {crop.disease}
              </button>
            ))}

            {/* Custom file upload */}
            <label className="px-4 py-1.5 rounded-full bg-white border border-gray-300 hover:border-green-600 text-gray-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs">
              <Upload className="w-3.5 h-3.5 text-[#257038]" />
              <span>Upload Custom Photo</span>
              <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
            </label>
          </div>
        </div>

        {/* Studio Content Grid */}
        <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Phone Viewfinder Simulator */}
          <div className="lg:col-span-5 flex flex-col items-center">
            
            <div className="relative w-full max-w-[320px] aspect-[4/5] bg-gray-950 rounded-[28px] p-2.5 shadow-2xl border-4 border-gray-800 flex flex-col justify-between overflow-hidden">
              
              {/* Speaker notch */}
              <div className="w-16 h-2 bg-gray-800 rounded-full mx-auto mb-1 z-20" />

              {/* Viewfinder Display */}
              <div className="relative flex-1 rounded-[20px] overflow-hidden bg-black flex items-center justify-center">
                <img
                  src={customImage || selectedCrop.image}
                  alt={selectedCrop.crop}
                  className="absolute inset-0 w-full h-full object-cover opacity-90"
                />

                {/* Reticle Focus */}
                <div className="absolute inset-5 border border-white/35 rounded-2xl pointer-events-none flex flex-col justify-between p-3">
                  <div className="flex justify-between">
                    <div className="w-5 h-5 border-t-2 border-l-2 border-emerald-400" />
                    <div className="w-5 h-5 border-t-2 border-r-2 border-emerald-400" />
                  </div>
                  <div className="text-center">
                    <span className="text-[10px] text-emerald-300 font-mono font-bold bg-black/70 px-2 py-0.5 rounded-md backdrop-blur-sm">
                      DIAGNOSIS ACTIVE
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <div className="w-5 h-5 border-b-2 border-l-2 border-emerald-400" />
                    <div className="w-5 h-5 border-b-2 border-r-2 border-emerald-400" />
                  </div>
                </div>

                {/* Laser animation */}
                {isScanning && (
                  <div className="absolute inset-x-4 h-[3px] bg-emerald-400 shadow-[0_0_12px_#34d399] animate-scan pointer-events-none z-10" />
                )}

                {/* Bottom viewfinder HUD */}
                <div className="absolute bottom-2 inset-x-2 z-10">
                  {isScanning ? (
                    <div className="bg-black/85 backdrop-blur-md rounded-xl p-2 text-center text-emerald-300 border border-emerald-500/40">
                      <p className="text-[11px] font-bold">ANALYZING PATHOGEN</p>
                      <p className="text-[9px] text-gray-300 font-mono">{scanStep}</p>
                    </div>
                  ) : (
                    <div className="bg-black/80 backdrop-blur-md rounded-xl p-2 text-center text-white border border-white/20 flex items-center justify-between px-3">
                      <div className="text-left">
                        <p className="text-[11px] font-bold text-emerald-400 leading-tight">
                          {selectedCrop.disease}
                        </p>
                        <p className="text-[9px] text-gray-400">{selectedCrop.pathogen.split('(')[0]}</p>
                      </div>
                      <span className="text-[10px] font-mono bg-emerald-500 text-white font-bold px-1.5 py-0.5 rounded">
                        {selectedCrop.confidence}%
                      </span>
                    </div>
                  )}
                </div>

              </div>

              {/* Bottom trigger bar */}
              <div className="py-2 flex items-center justify-center gap-3">
                <button
                  onClick={() => handleStartScan(selectedCrop)}
                  disabled={isScanning}
                  className="px-4 py-1.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer disabled:opacity-50"
                >
                  <RefreshCw className={`w-3 h-3 ${isScanning ? 'animate-spin' : ''}`} />
                  <span>{isScanning ? 'Scanning...' : 'Re-Analyze'}</span>
                </button>
              </div>

            </div>

            <p className="text-xs text-gray-400 mt-3 text-center">
              Field Scan ID: AG-{selectedCrop.id.toUpperCase().slice(0, 8)} • Geo: Sector B
            </p>

          </div>


          {/* Right Column: Complete Diagnosis & Actionable Report */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Header Badge */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-50 via-white to-green-50 border border-green-200">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase border mb-1.5 ${selectedCrop.tagColor}`}>
                    {selectedCrop.status} • {selectedCrop.severity} Severity
                  </span>
                  <h3 className="text-2xl font-extrabold text-gray-900 font-display">
                    {selectedCrop.disease}
                  </h3>
                  <p className="text-xs text-gray-600 mt-0.5">
                    Target Crop: <span className="font-bold text-gray-900">{selectedCrop.crop}</span> ({selectedCrop.scientificName})
                  </p>
                  <p className="text-xs text-emerald-800 font-mono mt-0.5">
                    Pathogen: {selectedCrop.pathogen}
                  </p>
                </div>

                <div className="text-right">
                  <div className="inline-flex items-center justify-center px-3.5 py-1.5 rounded-xl bg-[#257038] text-white font-extrabold text-base shadow-sm">
                    {selectedCrop.confidence}%
                  </div>
                  <p className="text-[10px] text-gray-500 mt-1 font-medium">Diagnostic Match</p>
                </div>
              </div>

              <p className="text-xs text-gray-700 mt-3 pt-3 border-t border-green-200/60 leading-relaxed">
                {selectedCrop.description}
              </p>
            </div>

            {/* Identified Symptoms */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-2 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Identified Symptoms & Visual Markers</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {selectedCrop.symptoms.map((sym, idx) => (
                  <div key={idx} className="p-2.5 bg-gray-50 rounded-xl border border-gray-200/80 text-xs text-gray-700 leading-snug">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block mr-1.5" />
                    {sym}
                  </div>
                ))}
              </div>
            </div>

            {/* Prevention & Precaution Measures */}
            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-2 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-amber-700" />
                <span>Precaution & Prevention Measures to Take</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-gray-700">
                {selectedCrop.precautions.map((precaution, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <span>{precaution}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Organic & Chemical Treatments */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Organic Remedies */}
              <div className="p-4 rounded-2xl bg-[#edf7ef] border border-green-200">
                <h5 className="text-xs font-bold text-green-900 flex items-center gap-1.5 mb-2.5">
                  <Leaf className="w-4 h-4 text-[#257038]" />
                  <span>Organic Remedies & Bio-Controls</span>
                </h5>
                <ul className="space-y-2 text-xs text-gray-700">
                  {selectedCrop.treatments.organic.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#257038] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Chemical Treatment */}
              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200">
                <h5 className="text-xs font-bold text-gray-900 flex items-center gap-1.5 mb-2.5">
                  <ShieldCheck className="w-4 h-4 text-[#257038]" />
                  <span>Chemical / Commercial Prescriptions</span>
                </h5>
                <ul className="space-y-2 text-xs text-gray-700">
                  {selectedCrop.treatments.chemical.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#257038] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Action Buttons: Save to Progressive Tracker */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-gray-100">
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <Clock className="w-3.5 h-3.5" />
                <span>Estimated recovery cycle: {selectedCrop.recoveryEstimateDays} days</span>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="#progressive-tracking"
                  onClick={handleSave}
                  className="px-5 py-2.5 rounded-xl bg-[#257038] hover:bg-[#1d5c2e] text-white text-xs font-bold flex items-center gap-2 shadow-sm transition-all active:scale-95 cursor-pointer"
                >
                  <BookmarkPlus className="w-4 h-4" />
                  <span>{savedSuccess ? 'Saved to Progressive Tracker!' : 'Log Scan in Progressive Tracker'}</span>
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

