import React, { useState } from 'react';
import { 
  CloudSun, Sun, CloudRain, Wind, Droplets, Thermometer, 
  AlertCircle, CheckCircle2, TrendingUp, Calendar, Compass, ShieldAlert
} from 'lucide-react';

const WEEKLY_WEATHER_DATA = [
  {
    day: 'Mon',
    fullName: 'Monday',
    type: 'past',
    avgTemp: 26,
    maxTemp: 29,
    minTemp: 21,
    condition: 'Partly Cloudy',
    humidity: 62,
    rainfallChance: 10,
    windSpeed: '9 km/h',
    windDir: 'ENE',
    riskLevel: 'Low',
    riskColor: 'text-emerald-700 bg-emerald-100',
    advisory: 'Optimal conditions. Fungal spore germination suppressed.'
  },
  {
    day: 'Tue',
    fullName: 'Tuesday',
    type: 'past',
    avgTemp: 27,
    maxTemp: 31,
    minTemp: 22,
    condition: 'Sunny & Warm',
    humidity: 58,
    rainfallChance: 5,
    windSpeed: '12 km/h',
    windDir: 'NE',
    riskLevel: 'Low',
    riskColor: 'text-emerald-700 bg-emerald-100',
    advisory: 'Dry foliage surface. Minimal pathogen activity recorded.'
  },
  {
    day: 'Wed',
    fullName: 'Wednesday',
    type: 'past',
    avgTemp: 29,
    maxTemp: 33,
    minTemp: 24,
    condition: 'Humid & Overcast',
    humidity: 76,
    rainfallChance: 40,
    windSpeed: '14 km/h',
    windDir: 'E',
    riskLevel: 'Moderate',
    riskColor: 'text-amber-700 bg-amber-100',
    advisory: 'Dew formation observed. Elevated risk for Alternaria spore release.'
  },
  {
    day: 'Thu',
    fullName: 'Thursday',
    type: 'current',
    avgTemp: 30,
    maxTemp: 34,
    minTemp: 25,
    condition: 'Scattered Showers & Humid',
    humidity: 82,
    rainfallChance: 65,
    windSpeed: '18 km/h',
    windDir: 'ESE',
    riskLevel: 'High Risk',
    riskColor: 'text-red-700 bg-red-100',
    advisory: 'CRITICAL: High humidity (82%) + warm 30°C promotes rapid Late Blight and Rust spread. Postpone foliar spraying until foliage dries.'
  },
  {
    day: 'Fri',
    fullName: 'Friday',
    type: 'future',
    avgTemp: 28,
    maxTemp: 31,
    minTemp: 23,
    condition: 'Morning Mist / Passing Clouds',
    humidity: 78,
    rainfallChance: 35,
    windSpeed: '11 km/h',
    windDir: 'SE',
    riskLevel: 'Moderate',
    riskColor: 'text-amber-700 bg-amber-100',
    advisory: 'Safe spraying window available between 06:30 AM – 10:30 AM.'
  },
  {
    day: 'Sat',
    fullName: 'Saturday',
    type: 'future',
    avgTemp: 27,
    maxTemp: 30,
    minTemp: 22,
    condition: 'Clear Sky & Breezy',
    humidity: 64,
    rainfallChance: 15,
    windSpeed: '13 km/h',
    windDir: 'E',
    riskLevel: 'Low',
    riskColor: 'text-emerald-700 bg-emerald-100',
    advisory: 'Excellent window for copper fungicide preventive application.'
  },
  {
    day: 'Sun',
    fullName: 'Sunday',
    type: 'future',
    avgTemp: 28,
    maxTemp: 32,
    minTemp: 22,
    condition: 'Sunny & Mild',
    humidity: 60,
    rainfallChance: 10,
    windSpeed: '10 km/h',
    windDir: 'ENE',
    riskLevel: 'Low',
    riskColor: 'text-emerald-700 bg-emerald-100',
    advisory: 'Stable weather. Ideal for crop irrigation and fertilizer top-dressing.'
  }
];

export default function WeatherForecastFeatureCard() {
  const [selectedDayIdx, setSelectedDayIdx] = useState(3); // Default to current day (Thu)
  const currentDay = WEEKLY_WEATHER_DATA[selectedDayIdx];

  // SVG Chart Dimensions
  const chartWidth = 700;
  const chartHeight = 160;
  const paddingX = 45;
  const paddingY = 25;
  
  // Calculate SVG polyline points for the 7 days avgTemp
  const minT = 23;
  const maxT = 33;
  const stepX = (chartWidth - paddingX * 2) / (WEEKLY_WEATHER_DATA.length - 1);

  const points = WEEKLY_WEATHER_DATA.map((item, i) => {
    const x = paddingX + i * stepX;
    // Map temperature to Y coordinate (invert because SVG 0 is at top)
    const normalizedY = (item.avgTemp - minT) / (maxT - minT);
    const y = chartHeight - paddingY - normalizedY * (chartHeight - paddingY * 2);
    return { x, y, ...item };
  });

  const polylineStr = points.map(p => `${p.x},${p.y}`).join(' ');
  // Area under curve
  const areaStr = `${points[0].x},${chartHeight} ` + polylineStr + ` ${points[points.length-1].x},${chartHeight}`;

  return (
    <section id="weather" className="bg-white rounded-3xl p-6 sm:p-10 border border-green-200/90 shadow-xl shadow-green-950/5 transition-all">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold uppercase tracking-wider mb-2">
            <CloudSun className="w-3.5 h-3.5 text-amber-600" />
            <span>Feature 02 • Agro-Meteorological Intelligence</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#11291c] font-display">
            Weekly Weather Forecast & Disease Risk Graph
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Weekly cycle (Mon–Sun) mapping 3 days past reported avg temperature, current active weather, and 3 days future forecast.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-amber-50/80 px-3.5 py-2 rounded-xl border border-amber-200 text-xs font-semibold text-amber-900">
          <Calendar className="w-4 h-4 text-amber-700" />
          <span>7-Day Cycle: Mon, Tue, Wed, Thu, Fri, Sat, Sun</span>
        </div>
      </div>

      {/* Top Banner: Current Day Live Metrics Spotlight */}
      <div className="mt-8 rounded-2xl bg-gradient-to-r from-emerald-900 via-[#184623] to-[#257038] text-white p-6 sm:p-8 shadow-lg">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-emerald-200 text-xs font-bold uppercase tracking-wide">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>{currentDay.type === 'current' ? "Today's Live Weather (Thursday)" : `${currentDay.fullName} (${currentDay.type.toUpperCase()})`}</span>
            </div>
            <div className="flex items-baseline gap-4">
              <span className="text-5xl sm:text-6xl font-black font-display tracking-tight">
                {currentDay.avgTemp}°C
              </span>
              <div>
                <span className="text-lg font-bold text-emerald-100 block">
                  {currentDay.condition}
                </span>
                <span className="text-xs text-emerald-200">
                  High: {currentDay.maxTemp}°C • Low: {currentDay.minTemp}°C
                </span>
              </div>
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full md:w-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/15">
              <div className="flex items-center gap-1.5 text-xs text-emerald-200 mb-1">
                <Droplets className="w-3.5 h-3.5 text-sky-300" />
                <span>Humidity</span>
              </div>
              <p className="text-lg font-bold text-white">{currentDay.humidity}%</p>
              <span className="text-[10px] text-emerald-200/80">Spore incubation factor</span>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/15">
              <div className="flex items-center gap-1.5 text-xs text-emerald-200 mb-1">
                <CloudRain className="w-3.5 h-3.5 text-blue-300" />
                <span>Rain Chance</span>
              </div>
              <p className="text-lg font-bold text-white">{currentDay.rainfallChance}%</p>
              <span className="text-[10px] text-emerald-200/80">Foliage wash-off</span>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/15 col-span-2 sm:col-span-1">
              <div className="flex items-center gap-1.5 text-xs text-emerald-200 mb-1">
                <Wind className="w-3.5 h-3.5 text-teal-300" />
                <span>Wind Vector</span>
              </div>
              <p className="text-lg font-bold text-white">{currentDay.windSpeed} {currentDay.windDir}</p>
              <span className="text-[10px] text-emerald-200/80">Drift dispersion speed</span>
            </div>
          </div>

        </div>

        {/* Pathological Disease Warning Banner */}
        <div className="mt-5 pt-4 border-t border-white/20 flex items-start gap-3 text-xs sm:text-sm text-emerald-50">
          <ShieldAlert className="w-5 h-5 text-amber-300 shrink-0 mt-0.5" />
          <p>
            <strong className="text-amber-300 font-bold uppercase tracking-wide">Agronomist Advisory: </strong>
            {currentDay.advisory}
          </p>
        </div>
      </div>

      {/* GRAPH SECTION: Simple Temperature Trend Graph across Mon, Tue, Wed, Thu, Fri, Sat, Sun */}
      <div className="mt-8 bg-gray-50/80 rounded-2xl p-5 sm:p-6 border border-gray-200">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="text-base font-bold text-gray-800 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#257038]" />
              <span>7-Day Temperature Trend & Pathogen Correlation</span>
            </h3>
            <p className="text-xs text-gray-500">
              Interactive chart: click any day to inspect historical records or forecast predictions
            </p>
          </div>

          <div className="flex items-center gap-3 text-[11px] font-semibold">
            <span className="flex items-center gap-1 text-gray-500">
              <span className="w-2.5 h-2.5 rounded-full bg-gray-400" /> 3 Days Past
            </span>
            <span className="flex items-center gap-1 text-[#257038]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#257038]" /> Current Day
            </span>
            <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> 3 Days Future
            </span>
          </div>
        </div>

        {/* SVG Responsive Line Graph */}
        <div className="w-full overflow-x-auto">
          <div className="min-w-[620px] py-2">
            <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="w-full h-44 overflow-visible">
              <defs>
                <linearGradient id="weatherTempGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#257038" stopOpacity="0.28" />
                  <stop offset="100%" stopColor="#257038" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1={paddingX} y1={paddingY} x2={chartWidth - paddingX} y2={paddingY} stroke="#e5e7eb" strokeDasharray="3 3" />
              <line x1={paddingX} y1={chartHeight / 2} x2={chartWidth - paddingX} y2={chartHeight / 2} stroke="#e5e7eb" strokeDasharray="3 3" />
              <line x1={paddingX} y1={chartHeight - paddingY} x2={chartWidth - paddingX} y2={chartHeight - paddingY} stroke="#e5e7eb" />

              {/* Shaded Area */}
              <polygon points={areaStr} fill="url(#weatherTempGrad)" />

              {/* Connecting Temperature Line */}
              <polyline
                fill="none"
                stroke="#257038"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={polylineStr}
              />

              {/* Vertical guideline for current day */}
              <line
                x1={points[3].x}
                y1={paddingY}
                x2={points[3].x}
                y2={chartHeight}
                stroke="#257038"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                opacity="0.6"
              />

              {/* Interactive Data Points */}
              {points.map((pt, idx) => {
                const isSelected = selectedDayIdx === idx;
                const isToday = pt.type === 'current';
                
                return (
                  <g 
                    key={idx} 
                    onClick={() => setSelectedDayIdx(idx)} 
                    className="cursor-pointer group"
                  >
                    {/* Pulsing ring for today */}
                    {isToday && (
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r="14"
                        fill="none"
                        stroke="#257038"
                        strokeWidth="1.5"
                        className="animate-ping opacity-50"
                      />
                    )}

                    {/* Node Dot */}
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={isSelected ? "7" : isToday ? "6" : "5"}
                      fill={isToday ? "#257038" : isSelected ? "#184623" : "#ffffff"}
                      stroke="#257038"
                      strokeWidth={isSelected ? "3.5" : "2.5"}
                      className="transition-all group-hover:scale-125"
                    />

                    {/* Temperature Label above point */}
                    <text
                      x={pt.x}
                      y={pt.y - 12}
                      textAnchor="middle"
                      fill={isToday ? "#163821" : "#374151"}
                      fontSize={isToday ? "12" : "11"}
                      fontWeight="bold"
                    >
                      {pt.avgTemp}°C
                    </text>

                    {/* Day label below line */}
                    <text
                      x={pt.x}
                      y={chartHeight - 4}
                      textAnchor="middle"
                      fill={isToday ? "#257038" : "#6b7280"}
                      fontSize="11"
                      fontWeight={isToday ? "bold" : "600"}
                    >
                      {pt.day}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

      </div>

      {/* 7-Day Card Series (Mon, Tue, Wed, Thu, Fri, Sat, Sun) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 mt-6">
        {WEEKLY_WEATHER_DATA.map((item, idx) => {
          const isSelected = selectedDayIdx === idx;
          const isToday = item.type === 'current';

          return (
            <button
              key={idx}
              onClick={() => setSelectedDayIdx(idx)}
              className={`p-3.5 rounded-2xl text-left transition-all border flex flex-col justify-between ${
                isSelected 
                  ? 'bg-green-50 border-[#257038] shadow-md -translate-y-1' 
                  : isToday
                    ? 'bg-emerald-50/70 border-emerald-300 hover:border-[#257038]'
                    : 'bg-white border-gray-200 hover:border-green-300 hover:bg-gray-50/60'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-gray-800">
                    {item.day}
                  </span>
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md ${
                    item.type === 'current' 
                      ? 'bg-[#257038] text-white' 
                      : item.type === 'past' 
                        ? 'bg-gray-200 text-gray-700' 
                        : 'bg-sky-100 text-sky-800'
                  }`}>
                    {item.type === 'current' ? 'TODAY' : item.type === 'past' ? 'PAST' : 'FCST'}
                  </span>
                </div>

                <div className="flex items-baseline gap-1 my-1">
                  <span className="text-lg font-extrabold text-gray-900">
                    {item.avgTemp}°
                  </span>
                  <span className="text-[10px] text-gray-500">
                    /{item.minTemp}°
                  </span>
                </div>

                <p className="text-[10px] text-gray-500 line-clamp-1">
                  {item.condition}
                </p>
              </div>

              <div className="mt-2 pt-2 border-t border-gray-100 flex items-center justify-between text-[10px]">
                <span className="text-gray-500">{item.humidity}% RH</span>
                <span className={`font-bold px-1.5 py-0.5 rounded ${item.riskColor}`}>
                  {item.riskLevel.split(' ')[0]}
                </span>
              </div>
            </button>
          );
        })}
      </div>

    </section>
  );
}

