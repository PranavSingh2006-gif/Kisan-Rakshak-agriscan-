import React from 'react';
import { 
  CloudSun, 
  Droplets, 
  Wind, 
  Thermometer, 
  CloudRain, 
  AlertTriangle, 
  ShieldCheck, 
  Clock, 
  Compass, 
  Sun,
  ShieldAlert,
  Info
} from 'lucide-react';
import { currentFarmWeather } from '../data/weatherData';

export default function WeatherPredictor() {
  const w = currentFarmWeather;

  return (
    <section id="weather" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold uppercase tracking-wider mb-3">
          <CloudSun className="w-3.5 h-3.5 text-amber-700" />
          <span>Local Agro-Weather Pattern Sync</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#11291c] font-display tracking-tight">
          Microclimate Weather & Pathogen Risk Prediction
        </h2>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">
          Kisan Rakshak correlates live farm humidity, dew point, leaf wetness, and wind vectors to calculate upcoming spore germination windows and evaluate whether previously sprayed treatments were washed away.
        </p>
      </div>

      {/* Main Weather & Risk Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Live Weather Metrics & Spray Window */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Main Weather Card */}
          <div className="bg-white rounded-3xl p-6 border border-green-100 shadow-xl relative overflow-hidden">
            
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div>
                <h3 className="font-extrabold text-gray-900 text-base font-display">
                  {w.location}
                </h3>
                <p className="text-xs text-gray-500 font-mono mt-0.5">
                  Geo: {w.coordinates} • Elev: {w.elevation}
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-green-50 text-[#257038] border border-green-200">
                Live Sensor Sync
              </span>
            </div>

            {/* Current temperature & condition */}
            <div className="py-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-500 shadow-inner">
                  <CloudSun className="w-9 h-9" />
                </div>
                <div>
                  <div className="text-4xl font-black text-gray-900 tracking-tight font-display">
                    {w.temperature}°C
                  </div>
                  <p className="text-xs text-gray-500 font-medium">
                    Feels like {w.feelsLike}°C • Humid & Overcast
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="inline-block px-3 py-1 rounded-xl bg-red-100 text-red-800 text-xs font-extrabold border border-red-300 animate-pulse">
                  High Fungal Risk
                </span>
                <p className="text-[10px] text-gray-500 mt-1 font-mono">Index: 88/100</p>
              </div>
            </div>

            {/* Key Agro-Meteorological Metrics */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              
              <div className="p-3 bg-[#f3f9f4] rounded-2xl border border-green-100">
                <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
                  <Droplets className="w-4 h-4 text-[#257038]" />
                  <span>Humidity</span>
                </div>
                <p className="text-xl font-extrabold text-[#11291c] mt-1">
                  {w.humidity}%
                </p>
                <p className="text-[10px] text-red-600 font-medium">Critical spore threshold (&gt;80%)</p>
              </div>

              <div className="p-3 bg-[#fbfdfa] rounded-2xl border border-gray-200">
                <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span>Leaf Wetness</span>
                </div>
                <p className="text-xl font-extrabold text-gray-900 mt-1">
                  {w.leafWetnessHours} hrs
                </p>
                <p className="text-[10px] text-gray-500">Continuous moisture</p>
              </div>

              <div className="p-3 bg-[#fbfdfa] rounded-2xl border border-gray-200">
                <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
                  <Wind className="w-4 h-4 text-teal-600" />
                  <span>Wind Vector</span>
                </div>
                <p className="text-xl font-extrabold text-gray-900 mt-1">
                  {w.windSpeed} <span className="text-xs font-normal">km/h</span>
                </p>
                <p className="text-[10px] text-gray-500">{w.windDirection}</p>
              </div>

              <div className="p-3 bg-[#fbfdfa] rounded-2xl border border-gray-200">
                <div className="flex items-center gap-2 text-xs font-bold text-gray-700">
                  <CloudRain className="w-4 h-4 text-indigo-600" />
                  <span>Precipitation</span>
                </div>
                <p className="text-xl font-extrabold text-gray-900 mt-1">
                  75% <span className="text-xs font-normal">in ~7h</span>
                </p>
                <p className="text-[10px] text-gray-500">12mm rain volume</p>
              </div>

            </div>

          </div>

          {/* Spray Window Advisory Card */}
          <div className="bg-white rounded-3xl p-6 border border-amber-200 shadow-lg">
            <div className="flex items-center gap-2.5 mb-3">
              <ShieldAlert className="w-5 h-5 text-amber-600" />
              <h4 className="font-extrabold text-gray-900 text-sm font-display uppercase tracking-wider">
                Spray Window Advisory
              </h4>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 mb-3">
              <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-extrabold ${w.sprayAdvisor.statusColor} mb-2`}>
                {w.sprayAdvisor.statusTitle}
              </span>
              <p className="text-xs text-amber-900 font-medium leading-relaxed">
                {w.sprayAdvisor.reason}
              </p>
            </div>

            <div className="flex items-start gap-2 text-xs text-emerald-800 bg-green-50 p-3 rounded-xl border border-green-200">
              <ShieldCheck className="w-4 h-4 text-[#257038] shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Next Recommended Window:</p>
                <p className="text-gray-600 mt-0.5">{w.sprayAdvisor.nextSafeWindow}</p>
              </div>
            </div>
          </div>

        </div>


        {/* Right Column: Pathogen Risk Model & Correlation Explanation */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-green-100 shadow-xl space-y-6">
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-extrabold text-gray-900 font-display">
                  Weather-Driven Pathogen Risk Forecast
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Calculated based on 48h leaf temperature and relative humidity logs
                </p>
              </div>

              <span className="text-xs font-mono font-bold text-gray-500">
                Next Model Run: 15 min
              </span>
            </div>

            {/* Disease Risk Progress Cards */}
            <div className="space-y-4">
              {w.diseaseRiskIndices.map((item, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-gray-50/80 border border-gray-200/80 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase border ${item.riskColor}`}>
                        {item.riskLevel} RISK
                      </span>
                      <h4 className="font-bold text-sm text-gray-900">
                        {item.disease}
                      </h4>
                    </div>

                    <span className="font-mono font-bold text-sm text-gray-800">
                      {item.riskScore}/100
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        item.riskScore > 75 
                          ? 'bg-red-500' 
                          : item.riskScore > 40 
                          ? 'bg-amber-500' 
                          : 'bg-emerald-500'
                      }`}
                      style={{ width: `${item.riskScore}%` }}
                    />
                  </div>

                  <p className="text-xs text-gray-600 leading-relaxed pt-1">
                    <span className="font-semibold text-gray-800">Biophysical Cause:</span> {item.vector}
                  </p>
                </div>
              ))}
            </div>

            {/* Weather & Scan Outcome Correlation explanation */}
            <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
              <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs">
                <Info className="w-4 h-4 text-[#257038]" />
                <span>How Kisan Rakshak Uses Weather to Predict & Validate Scan Results:</span>
              </div>
              <p className="text-xs text-gray-700 leading-relaxed">
                When a farmer uploads an image for diagnosis, the system checks whether conditions in the last 72 hours favored fungal incubation. If high humidity (&gt;80%) was present, Kisan Rakshak raises the confidence score for Alternaria solani (Early Blight) and flags that contact surface fungicides might wash away, directly driving the <strong>Progressive Tracker</strong> to advise systemic alternatives.
              </p>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

