import React, { useState } from 'react';
import { 
  MapPin, 
  Wind, 
  AlertTriangle, 
  ShieldCheck, 
  Info, 
  Navigation, 
  Eye, 
  Layers, 
  Radio,
  Flame,
  CheckCircle2,
  Crosshair
} from 'lucide-react';
import { regionalOutbreakData } from '../data/outbreakData';

export default function SurveillanceMap() {
  const data = regionalOutbreakData;
  const [selectedFarm, setSelectedFarm] = useState(data.farms[1]); // default to the active outbreak farm
  const [filterMode, setFilterMode] = useState('ALL'); // ALL, OUTBREAKS, SAFE

  const filteredFarms = data.farms.filter(f => {
    if (filterMode === 'OUTBREAKS') return f.status === 'CONTAGIOUS_OUTBREAK' || f.status === 'WARNING';
    if (filterMode === 'SAFE') return f.status === 'HEALTHY_BUFFER' || f.isUser;
    return true;
  });

  return (
    <section id="surveillance" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-100 text-red-900 text-xs font-bold uppercase tracking-wider mb-3">
          <Radio className="w-3.5 h-3.5 text-red-700 animate-pulse" />
          <span>GIS Regional Contagion Tracking</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#11291c] font-display tracking-tight">
          Local Outbreak Surveillance & Spore Vector Map
        </h2>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">
          Community bio-security radar tracking contagious crop diseases within a 25 km radius. Early alert vectors protect your harvest before airborne spores drift across farm boundaries.
        </p>
      </div>

      {/* Main Map Container */}
      <div className="bg-white rounded-3xl border border-green-100 shadow-xl overflow-hidden">
        
        {/* Map Header & Filter Toolbar */}
        <div className="p-4 sm:p-6 bg-[#fbfdfa] border-b border-gray-100 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            <span className="text-xs sm:text-sm font-bold text-gray-900">
              {data.regionName} (Live Satellite & Drone Telemetry)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400 hidden sm:inline mr-1">
              Filter:
            </span>
            <button
              onClick={() => setFilterMode('ALL')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                filterMode === 'ALL'
                  ? 'bg-gray-900 text-white shadow-xs'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All Plots ({data.farms.length})
            </button>
            <button
              onClick={() => setFilterMode('OUTBREAKS')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                filterMode === 'OUTBREAKS'
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'bg-red-50 text-red-700 hover:bg-red-100'
              }`}
            >
              Active Outbreaks
            </button>
            <button
              onClick={() => setFilterMode('SAFE')}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                filterMode === 'SAFE'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
              }`}
            >
              Buffer Zones
            </button>
          </div>
        </div>

        {/* Interactive Map Canvas + Details Dossier */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          
          {/* Left / Center: Interactive SVG Agricultural Map Canvas */}
          <div className="lg:col-span-8 relative min-h-[460px] sm:min-h-[520px] bg-[#e7efe8] overflow-hidden border-b lg:border-b-0 lg:border-r border-gray-200 flex items-center justify-center p-4">
            
            {/* Field Grid Pattern overlay */}
            <div 
              className="absolute inset-0 opacity-25 pointer-events-none"
              style={{
                backgroundImage: 'linear-gradient(#257038 1px, transparent 1px), linear-gradient(90deg, #257038 1px, transparent 1px)',
                backgroundSize: '48px 48px'
              }}
            />

            {/* Geographical terrain background shapes */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              {/* River / Valley Waterway */}
              <path 
                d="M -20,180 Q 200,240 400,200 T 800,260 T 1200,220" 
                fill="none" 
                stroke="#b9d6c4" 
                strokeWidth="24" 
                strokeLinecap="round" 
                opacity="0.8" 
              />
              
              {/* Regional Contagion Risk Zones */}
              {/* High Risk Zone around Oakridge */}
              <circle cx="72%" cy="38%" r="90" fill="rgba(239, 68, 68, 0.16)" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="4 3" />
              <circle cx="72%" cy="38%" r="45" fill="rgba(239, 68, 68, 0.25)" />
              
              {/* Warning Zone around Sunny Slope */}
              <circle cx="65%" cy="18%" r="65" fill="rgba(245, 158, 11, 0.14)" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3 3" />

              {/* User farm buffer perimeter */}
              <circle cx="48%" cy="45%" r="70" fill="rgba(37, 112, 56, 0.12)" stroke="#257038" strokeWidth="1.5" />
            </svg>

            {/* Wind Vector Direction Indicator (Spore Drift) */}
            <div className="absolute top-4 left-4 z-20 bg-white/95 backdrop-blur-md p-3 rounded-2xl border border-gray-200 shadow-md flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-700">
                <Wind className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                  Airborne Spore Vector:
                </p>
                <div className="flex items-center gap-1.5 text-xs font-extrabold text-gray-900">
                  <span>{data.windVector.directionName} at {data.windVector.speedKmH} km/h</span>
                  <Navigation className="w-3.5 h-3.5 text-teal-600 transform rotate-[65deg]" />
                </div>
              </div>
            </div>

            {/* Interactive Farm Plot Pins */}
            {filteredFarms.map((farm) => {
              const isSelected = selectedFarm?.id === farm.id;
              return (
                <div
                  key={farm.id}
                  onClick={() => setSelectedFarm(farm)}
                  style={{ top: `${farm.yPercent}%`, left: `${farm.xPercent}%` }}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 z-30 cursor-pointer group transition-all"
                >
                  {/* Outer pulse for active outbreak */}
                  {farm.status === 'CONTAGIOUS_OUTBREAK' && (
                    <span className="animate-ping absolute inline-flex h-10 w-10 -top-2 -left-2 rounded-full bg-red-400 opacity-60 pointer-events-none" />
                  )}

                  {/* Marker Pin */}
                  <div className={`relative flex items-center justify-center w-8 h-8 rounded-full shadow-lg border-2 border-white transition-transform ${
                    farm.isUser 
                      ? 'bg-[#257038] text-white scale-110 ring-4 ring-green-600/30' 
                      : farm.status === 'CONTAGIOUS_OUTBREAK'
                      ? 'bg-red-600 text-white scale-110'
                      : farm.status === 'WARNING'
                      ? 'bg-amber-500 text-white'
                      : 'bg-emerald-600 text-white'
                  } ${isSelected ? 'ring-4 ring-black/40 scale-125' : 'group-hover:scale-115'}`}>
                    
                    {farm.isUser ? (
                      <Crosshair className="w-4 h-4" />
                    ) : farm.status === 'CONTAGIOUS_OUTBREAK' ? (
                      <Flame className="w-4 h-4" />
                    ) : (
                      <MapPin className="w-4 h-4" />
                    )}
                  </div>

                  {/* Pin label badge */}
                  <div className={`mt-1.5 px-2 py-0.5 rounded-md text-[10px] font-bold whitespace-nowrap shadow-sm text-center ${
                    isSelected ? 'bg-gray-900 text-white' : 'bg-white/95 text-gray-800'
                  }`}>
                    {farm.isUser ? '📍 Your Plot #4' : farm.name.split(' ')[0]}
                  </div>
                </div>
              );
            })}

            {/* Map Legend */}
            <div className="absolute bottom-4 left-4 z-20 bg-white/95 backdrop-blur-md p-2.5 rounded-xl border border-gray-200 shadow-md flex items-center gap-3 text-[11px] font-medium text-gray-700">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-600" />
                <span>Active Outbreak</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span>Warning</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#257038]" />
                <span>Your Farm</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span>Safe Buffer</span>
              </div>
            </div>

          </div>


          {/* Right Column: Detailed Selected Farm Dossier */}
          <div className="lg:col-span-4 p-6 bg-white flex flex-col justify-between space-y-6">
            
            {selectedFarm ? (
              <div className="space-y-5">
                
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    Plot Surveillance Dossier:
                  </span>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${selectedFarm.statusColor}`}>
                    {selectedFarm.status.replace('_', ' ')}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-extrabold text-gray-900 font-display">
                    {selectedFarm.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {selectedFarm.isUser 
                      ? 'Coordinates: Plot #4 (Home Base)' 
                      : `Distance: ${selectedFarm.distanceKm} km ${selectedFarm.direction} of your plot`}
                  </p>
                </div>

                {/* Disease Details */}
                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-500">Active Disease:</span>
                    <span className="text-xs font-extrabold text-red-700">
                      {selectedFarm.activeDisease}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-500">Target Crop:</span>
                    <span className="text-xs font-medium text-gray-800">{selectedFarm.crop}</span>
                  </div>

                  {selectedFarm.affectedAcres !== undefined && (
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-500">Affected Area:</span>
                      <span className="text-xs font-mono font-bold text-gray-800">
                        {selectedFarm.affectedAcres} Acres Quarantined
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-500">Telemetry Sync:</span>
                    <span className="text-xs text-gray-600">{selectedFarm.lastScan}</span>
                  </div>
                </div>

                {/* Containment Advice */}
                <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200">
                  <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
                    <span>Bio-Security & Containment Action:</span>
                  </h4>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    {selectedFarm.advice}
                  </p>
                </div>

              </div>
            ) : (
              <div className="text-center py-16 text-gray-400 text-xs">
                Select any plot pin on the map to inspect telemetry data
              </div>
            )}

            {/* Regional Alert Banner */}
            <div className="p-4 rounded-2xl bg-red-50 border border-red-200">
              <p className="text-[11px] text-red-900 font-bold leading-relaxed">
                {data.surveillanceNotice}
              </p>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

