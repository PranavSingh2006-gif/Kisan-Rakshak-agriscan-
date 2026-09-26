import React, { useState } from 'react';
import {
  Camera,
  Plus,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Droplets,
  Sprout,
  Calendar,
  ArrowRight,
  X,
  ChevronRight,
  Sparkles,
  Check,
  Layers,
  Activity,
  Info,
  CloudRain,
  Gauge,
  TrendingUp
} from 'lucide-react';
import Footer from '../Footer';
import ScanHistoryModal from './ScanHistoryModal';
import { getAllPlotHistories, getPlotHistory } from '../../data/progressiveScanHistory';

// Initial crop data directly matching the user's reference image
const INITIAL_CROPS = [
  {
    id: 'wheat-field-a',
    name: 'Wheat',
    icon: '🌾',
    field: 'Field A • 2.4 acres',
    status: 'Healthy',
    statusType: 'healthy',
    stage: 'Stage: Tillering',
    progress: 88,
    variety: 'HD-2967 (High Yield)',
    soilMoisture: 68,
    sowingDate: '15 Nov 2024',
    nextAction: 'Crown root irrigation & micronutrient spray',
    tasks: [
      { id: 'w1', title: 'Inspect for yellow rust along leaf margins', done: true, priority: 'high' },
      { id: 'w2', title: 'Top-dress first urea dose (45 kg/acre)', done: true, priority: 'high' },
      { id: 'w3', title: 'Weed removal for Phalaris minor', done: false, priority: 'medium' },
      { id: 'w4', title: 'Schedule secondary tillering irrigation', done: false, priority: 'low' },
    ]
  },
  {
    id: 'soybean-field-b',
    name: 'Soybean',
    icon: '🌱',
    field: 'Field B • 3.1 acres',
    status: 'Monitor',
    statusType: 'monitor',
    stage: 'Stage: Flowering',
    progress: 72,
    variety: 'JS-335 (Early Maturity)',
    soilMoisture: 42,
    sowingDate: '28 Jun 2024',
    nextAction: 'Monitor pod borer & leaf spots; light irrigation',
    tasks: [
      { id: 's1', title: 'Foliar pheromone trap scouting for pod borer', done: true, priority: 'high' },
      { id: 's2', title: 'Check lower leaf canopy for Cercospora spots', done: false, priority: 'high' },
      { id: 's3', title: 'Apply solubor boron spray (1g/L water)', done: false, priority: 'medium' },
      { id: 's4', title: 'Soil moisture replenishment before pod set', done: false, priority: 'medium' },
    ]
  },
  {
    id: 'tomato-field-c',
    name: 'Tomato',
    icon: '🍅',
    field: 'Field C • 1.2 acres',
    status: 'Healthy',
    statusType: 'healthy',
    stage: 'Stage: Fruiting',
    progress: 84,
    variety: 'Abhinav Hybrid F1',
    soilMoisture: 74,
    sowingDate: '10 Aug 2024',
    nextAction: 'Calcium nitrate fertigation & trellis check',
    tasks: [
      { id: 't1', title: 'Trellis wire tightening and side shoots pruning', done: true, priority: 'medium' },
      { id: 't2', title: 'Scout for early blight circular target lesions', done: true, priority: 'high' },
      { id: 't3', title: 'Drip apply 0:0:50 potassium sulphate', done: false, priority: 'high' },
      { id: 't4', title: 'Harvest first wave of ripe table tomatoes', done: false, priority: 'low' },
    ]
  },
  {
    id: 'maize-field-d',
    name: 'Maize',
    icon: '🌽',
    field: 'Field D • 2.0 acres',
    status: 'Attention',
    statusType: 'attention',
    stage: 'Stage: Vegetative',
    progress: 59,
    variety: 'DKC-9108 Pro',
    soilMoisture: 31,
    sowingDate: '02 Jul 2024',
    nextAction: 'Urgent drip cycle + Fall Armyworm pheromone check',
    tasks: [
      { id: 'm1', title: 'Urgent: Run 45-min drip cycle (moisture critically low at 31%)', done: false, priority: 'high' },
      { id: 'm2', title: 'Scout central whorls for Fall Armyworm frass', done: false, priority: 'high' },
      { id: 'm3', title: 'Apply emamectin benzoate 5% SG if larvae detected', done: false, priority: 'high' },
      { id: 'm4', title: 'Inter-row cultivation for soil aeration', done: true, priority: 'medium' },
    ]
  }
];

// Initial irrigation plan
const INITIAL_IRRIGATION_SCHEDULE = [
  {
    fieldId: 'Field D (Maize)',
    plot: 'Field D • 2.0 acres',
    status: 'Critically Dry',
    soilMoisture: 31,
    targetMoisture: 65,
    recommendedAction: 'Immediate 45-min Drip Run',
    waterVolume: '4,800 Litres',
    method: 'Drip Fertigation',
    timing: 'Today, 04:30 PM (Evening)',
    weatherAlert: 'High wind speed expected tomorrow; irrigate this evening'
  },
  {
    fieldId: 'Field B (Soybean)',
    plot: 'Field B • 3.1 acres',
    status: 'Drying Out',
    soilMoisture: 42,
    targetMoisture: 60,
    recommendedAction: 'Light Sprinkler Cycle (30 mins)',
    waterVolume: '6,200 Litres',
    method: 'Micro-Sprinkler',
    timing: 'Tomorrow, 06:00 AM',
    weatherAlert: 'Optimal cool morning evaporation window'
  },
  {
    fieldId: 'Field A (Wheat)',
    plot: 'Field A • 2.4 acres',
    status: 'Optimal',
    soilMoisture: 68,
    targetMoisture: 70,
    recommendedAction: 'No Immediate Watering Needed',
    waterVolume: '0 Litres',
    method: 'Flood Furrow',
    timing: 'Next check in 4 days',
    weatherAlert: 'Light rain possible in 72 hrs; hold off'
  },
  {
    fieldId: 'Field C (Tomato)',
    plot: 'Field C • 1.2 acres',
    status: 'Moist',
    soilMoisture: 74,
    targetMoisture: 75,
    recommendedAction: 'Pulse Drip (15 mins with Calcium)',
    waterVolume: '1,400 Litres',
    method: 'Precision Drip',
    timing: 'Thursday, 07:00 AM',
    weatherAlert: 'Maintain steady moisture to prevent blossom end rot'
  }
];

export default function FarmersDashboardPage({ onOpenScan, onNavigate }) {
  const [crops, setCrops] = useState(INITIAL_CROPS);
  const [irrigationSchedule, setIrrigationSchedule] = useState(INITIAL_IRRIGATION_SCHEDULE);
  const [activeTaskCrop, setActiveTaskCrop] = useState(null);
  const [isAddCropModalOpen, setIsAddCropModalOpen] = useState(false);
  const [isRefreshingWater, setIsRefreshingWater] = useState(false);
  const [waterRefreshNotice, setWaterRefreshNotice] = useState(false);

  // Scan History & Progressive Diary state
  const [selectedHistoryPlot, setSelectedHistoryPlot] = useState(null);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [historiesVersion, setHistoriesVersion] = useState(0);

  // New crop form state
  const [newCropName, setNewCropName] = useState('Tomato');
  const [newCropIcon, setNewCropIcon] = useState('🍅');
  const [newCropField, setNewCropField] = useState('Field E');
  const [newCropAcres, setNewCropAcres] = useState('1.5');
  const [newCropStage, setNewCropStage] = useState('Vegetative');

  const getPlotScansCount = (cropId) => {
    const hist = getPlotHistory(cropId);
    return hist && hist.scans ? hist.scans.length : 1;
  };

  const handleOpenPlotHistory = (crop) => {
    const hist = getPlotHistory(crop.id) || {
      plotId: crop.id,
      cropName: crop.name,
      plotLocation: crop.field,
      currentStage: crop.stage.replace('Stage: ', ''),
      healthStatus: crop.status,
      scans: [
        {
          id: `scan-${crop.id}-base`,
          scanNumber: 1,
          date: crop.sowingDate || 'Initial Baseline',
          daysAgo: 'Recorded',
          stage: crop.stage,
          lesionCoverage: 'Baseline inspection',
          severityScore: crop.statusType === 'healthy' ? 15 : crop.statusType === 'monitor' ? 55 : 82,
          diagnosis: `${crop.name} Health Baseline Check`,
          image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80',
          prescribedTactic: crop.nextAction || 'Standard agronomic monitoring & nutrient management.',
          outcomeStatus: 'BASELINE_RECORDED',
          outcomeReport: 'Baseline established.'
        }
      ]
    };
    setSelectedHistoryPlot(hist);
    setIsHistoryModalOpen(true);
  };

  // Dismiss crop card
  const handleDismissCrop = (cropId, e) => {
    e.stopPropagation();
    setCrops(prev => prev.filter(c => c.id !== cropId));
  };

  // Toggle task completion
  const handleToggleTask = (cropId, taskId) => {
    setCrops(prev => prev.map(crop => {
      if (crop.id !== cropId) return crop;
      const updatedTasks = crop.tasks.map(t => t.id === taskId ? { ...t, done: !t.done } : t);
      return { ...crop, tasks: updatedTasks };
    }));

    if (activeTaskCrop && activeTaskCrop.id === cropId) {
      setActiveTaskCrop(prev => ({
        ...prev,
        tasks: prev.tasks.map(t => t.id === taskId ? { ...t, done: !t.done } : t)
      }));
    }
  };

  // Refresh water management telemetry
  const handleRefreshWater = () => {
    setIsRefreshingWater(true);
    setTimeout(() => {
      setIsRefreshingWater(false);
      setWaterRefreshNotice(true);
      setTimeout(() => setWaterRefreshNotice(false), 3000);
    }, 800);
  };

  // Add new crop
  const handleAddCropSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      id: `crop-${Date.now()}`,
      name: newCropName,
      icon: newCropIcon,
      field: `${newCropField} • ${newCropAcres} acres`,
      status: 'Healthy',
      statusType: 'healthy',
      stage: `Stage: ${newCropStage}`,
      progress: 35,
      variety: 'Commercial Certified',
      soilMoisture: 65,
      sowingDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      nextAction: 'Baseline soil hydration & seedling monitoring',
      tasks: [
        { id: 'n1', title: 'Confirm plant spacing and soil mulch coverage', done: true, priority: 'medium' },
        { id: 'n2', title: 'Schedule initial seedling root-booster application', done: false, priority: 'high' },
        { id: 'n3', title: 'Take inaugural Kisan Rakshak health baseline scan', done: false, priority: 'high' }
      ]
    };
    setCrops(prev => [...prev, newEntry]);
    setIsAddCropModalOpen(false);
    setNewCropField('Field E');
    setNewCropAcres('1.5');
  };

  // Status badge styling helper
  const getBadgeStyle = (statusType) => {
    switch (statusType) {
      case 'healthy':
        return 'bg-[#e8f5e9] text-[#2e7d32] border border-green-200';
      case 'monitor':
        return 'bg-[#fff8e1] text-[#b78103] border border-amber-200';
      case 'attention':
        return 'bg-[#ffebee] text-[#c62828] border border-red-200';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  // Calculate high level stats
  const totalAcreage = crops.reduce((acc, c) => {
    const match = c.field.match(/([\d.]+)\s*acres/);
    return acc + (match ? parseFloat(match[1]) : 0);
  }, 0).toFixed(1);

  const healthyCount = crops.filter(c => c.statusType === 'healthy').length;

  return (
    <div className="min-h-screen bg-[#fcfdfa] text-gray-900 flex flex-col font-sans">
      
      {/* Top Breadcrumb & Actions Bar */}
      <div className="border-b border-gray-100 bg-white/70 backdrop-blur-sm sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-500">
            <span 
              onClick={() => onNavigate && onNavigate('/')} 
              className="hover:text-[#257038] cursor-pointer"
            >
              Home
            </span>
            <span>/</span>
            <span className="text-[#257038] font-bold">Farmers Dashboard</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAddCropModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-gray-300 hover:border-[#257038] hover:text-[#257038] bg-white text-xs font-bold text-gray-700 shadow-2xs transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Plot</span>
            </button>

            <button
              onClick={onOpenScan}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#206332] hover:bg-[#184e27] text-white text-xs font-bold shadow-xs hover:shadow-md transition-all cursor-pointer"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Scan Crop</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Dashboard Workspace */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 flex-1 w-full">
        
        {/* KPI Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-4 border border-green-100/80 shadow-xs flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 text-[#257038] flex items-center justify-center shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Total Monitored Area</p>
              <p className="text-xl font-extrabold text-[#11291c]">{totalAcreage} <span className="text-xs font-semibold text-gray-500">Acres</span></p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-green-100/80 shadow-xs flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-green-50 text-green-700 flex items-center justify-center shrink-0">
              <Sprout className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Active Crop Plots</p>
              <p className="text-xl font-extrabold text-[#11291c]">{crops.length} <span className="text-xs font-semibold text-gray-500">Plots</span></p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-green-100/80 shadow-xs flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center shrink-0">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Farm Health Index</p>
              <p className="text-xl font-extrabold text-[#257038]">{healthyCount} / {crops.length} <span className="text-xs font-semibold text-gray-500">Healthy</span></p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-green-100/80 shadow-xs flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <Droplets className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Smart Water Saved</p>
              <p className="text-xl font-extrabold text-blue-900">14,200 <span className="text-xs font-semibold text-gray-500">Litres</span></p>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════════════
            SECTION 1: FIELD MONITORING / MY CROPS (EXACT MATCH TO REFERENCE)
            ══════════════════════════════════════════════════════════════════════ */}
        <section className="space-y-4">
          
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#257038] uppercase tracking-wider block mb-1">
                FIELD MONITORING
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#11291c] tracking-tight">
                My Crops
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                Track crop stage, health, irrigation and upcoming actions.
              </p>
            </div>

            {/* Scan Crop Button matching reference screenshot */}
            <div className="flex items-center gap-2">
              <button
                onClick={onOpenScan}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#206332] hover:bg-[#184e27] text-white font-bold text-sm shadow-xs transition-all active:scale-95 cursor-pointer"
              >
                <Camera className="w-4 h-4" />
                <span>Scan Crop</span>
              </button>
            </div>
          </div>

          {/* Crops Grid matching reference screenshot */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            {crops.map((crop) => (
              <div
                key={crop.id}
                className="bg-white rounded-2xl p-5 border border-gray-200/90 shadow-2xs hover:shadow-md transition-shadow relative flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar: Icon + Status Badge + Close 'X' */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-[#f7f9f6] flex items-center justify-center text-2xl shadow-2xs">
                      {crop.icon}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold capitalize ${getBadgeStyle(crop.statusType)}`}>
                        {crop.status}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => handleDismissCrop(crop.id, e)}
                        className="w-6 h-6 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                        title="Remove from dashboard"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Crop Name & Field Details */}
                  <h3 className="text-lg font-bold text-gray-900 leading-tight">
                    {crop.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5 font-medium">
                    {crop.field}
                  </p>

                  {/* Progress Bar matching reference image */}
                  <div className="mt-4 mb-2">
                    <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-[#529e59] h-2 rounded-full transition-all duration-500"
                        style={{ width: `${crop.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Stage & Progress Percentage */}
                  <div className="flex items-center justify-between text-xs text-gray-600 font-medium">
                    <span className="text-gray-500 font-normal">{crop.stage}</span>
                    <span className="font-bold text-gray-800">{crop.progress}%</span>
                  </div>
                </div>

                {/* Footer Action: View Field Tasks & Scan History */}
                <div className="pt-3 mt-3 border-t border-gray-100 flex items-center justify-between gap-1">
                  <button
                    type="button"
                    onClick={() => setActiveTaskCrop(crop)}
                    className="text-xs font-bold text-[#206332] hover:text-[#184e27] inline-flex items-center gap-1 group cursor-pointer"
                  >
                    <span>View field tasks</span>
                    <span className="transition-transform group-hover:translate-x-0.5">→</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleOpenPlotHistory(crop)}
                    className="text-[11px] font-bold text-gray-500 hover:text-[#206332] inline-flex items-center gap-1 bg-gray-50 hover:bg-emerald-50 px-2 py-1 rounded-lg border border-gray-200 hover:border-emerald-200 transition-colors cursor-pointer"
                    title="View Previous Scans & Health Diary"
                  >
                    <span>History ({getPlotScansCount(crop.id)})</span>
                    <span>📖</span>
                  </button>
                </div>
              </div>
            ))}

            {/* Add Plot Placeholder Card */}
            <div
              onClick={() => setIsAddCropModalOpen(true)}
              className="rounded-2xl border-2 border-dashed border-gray-200 hover:border-[#257038] hover:bg-green-50/20 p-5 flex flex-col items-center justify-center text-center cursor-pointer transition-all min-h-[190px]"
            >
              <div className="w-10 h-10 rounded-full bg-emerald-50 text-[#257038] flex items-center justify-center mb-2">
                <Plus className="w-5 h-5" />
              </div>
              <p className="text-sm font-bold text-gray-800">Add New Crop Plot</p>
              <p className="text-xs text-gray-400 mt-0.5">Monitor a new field or variety</p>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════════
            SECTION 2: WATER MANAGEMENT / SMART IRRIGATION PLANNER (IN REFERENCE)
            ══════════════════════════════════════════════════════════════════════ */}
        <section className="space-y-4 pt-4">
          
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#257038] uppercase tracking-wider block mb-1">
                WATER MANAGEMENT
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#11291c] tracking-tight">
                Smart Irrigation Planner
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
                Automated soil moisture monitoring, evapotranspiration rates, and weather-synchronized watering schedules.
              </p>
            </div>

            {/* Refresh Button matching reference */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleRefreshWater}
                disabled={isRefreshingWater}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-gray-300 hover:border-gray-400 bg-white text-xs font-bold text-gray-700 shadow-2xs hover:bg-gray-50 transition-all cursor-pointer disabled:opacity-60"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isRefreshingWater ? 'animate-spin text-[#257038]' : ''}`} />
                <span>{isRefreshingWater ? 'Syncing...' : 'Refresh'}</span>
              </button>
            </div>
          </div>

          {waterRefreshNotice && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Telemetry refreshed: Soil moisture sensors updated across all 4 plots.</span>
            </div>
          )}

          {/* Irrigation Dashboard Table / Card Grid */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#f9faf8] text-gray-500 font-bold uppercase tracking-wider border-b border-gray-200">
                  <tr>
                    <th className="py-3.5 px-4">Plot & Crop</th>
                    <th className="py-3.5 px-4">Moisture Level</th>
                    <th className="py-3.5 px-4">Recommended Run</th>
                    <th className="py-3.5 px-4">Water Volume</th>
                    <th className="py-3.5 px-4">Delivery Method</th>
                    <th className="py-3.5 px-4">Scheduled Time</th>
                    <th className="py-3.5 px-4 text-right">Weather Sync</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                  {irrigationSchedule.map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/70 transition-colors">
                      
                      {/* Plot & Crop */}
                      <td className="py-4 px-4 font-bold text-gray-900">
                        {item.fieldId}
                        <span className="block text-[11px] font-normal text-gray-500">{item.plot}</span>
                      </td>

                      {/* Moisture Level Gauge */}
                      <td className="py-4 px-4">
                        <div className="space-y-1">
                          <div className="flex items-center justify-between text-[11px]">
                            <span className={`font-bold ${
                              item.soilMoisture < 35 ? 'text-red-600' : item.soilMoisture < 50 ? 'text-amber-600' : 'text-emerald-700'
                            }`}>
                              {item.status}
                            </span>
                            <span className="font-bold text-gray-900">{item.soilMoisture}%</span>
                          </div>
                          <div className="w-24 bg-gray-100 rounded-full h-1.5 overflow-hidden">
                            <div
                              className={`h-1.5 rounded-full ${
                                item.soilMoisture < 35 ? 'bg-red-500' : item.soilMoisture < 50 ? 'bg-amber-500' : 'bg-emerald-600'
                              }`}
                              style={{ width: `${item.soilMoisture}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      {/* Recommended Run */}
                      <td className="py-4 px-4">
                        <span className="font-semibold text-gray-800">{item.recommendedAction}</span>
                      </td>

                      {/* Water Volume */}
                      <td className="py-4 px-4 font-mono font-bold text-blue-700">
                        {item.waterVolume}
                      </td>

                      {/* Delivery Method */}
                      <td className="py-4 px-4">
                        <span className="inline-flex items-center gap-1 text-gray-700">
                          <Droplets className="w-3 h-3 text-blue-500" />
                          {item.method}
                        </span>
                      </td>

                      {/* Scheduled Time */}
                      <td className="py-4 px-4 font-semibold text-gray-800">
                        <span className="inline-flex items-center gap-1">
                          <Clock className="w-3 h-3 text-gray-400" />
                          {item.timing}
                        </span>
                      </td>

                      {/* Weather Sync Alert */}
                      <td className="py-4 px-4 text-right">
                        <span className="text-[11px] text-gray-500 max-w-xs block ml-auto">
                          {item.weatherAlert}
                        </span>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Smart Irrigation Footer Tips */}
            <div className="p-4 bg-emerald-50/50 border-t border-emerald-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-600">
              <div className="flex items-center gap-2 text-[#1a4d2e] font-semibold">
                <CloudRain className="w-4 h-4 text-[#257038]" />
                <span>Live Agro-Meteorological Sensor: Evapotranspiration is 3.8 mm/day. System holds watering 3 hours before expected rainfall.</span>
              </div>
              <button
                type="button"
                onClick={onOpenScan}
                className="text-[#206332] font-bold hover:underline shrink-0 cursor-pointer"
              >
                Scan crop for moisture stress →
              </button>
            </div>
          </div>
        </section>

      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          FIELD TASKS DRAWER / MODAL
          ══════════════════════════════════════════════════════════════════════ */}
      {activeTaskCrop && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-gray-100 overflow-hidden">
            
            {/* Modal Header */}
            <div className="p-6 pb-4 border-b border-gray-100 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#f7f9f6] flex items-center justify-center text-3xl shadow-2xs">
                  {activeTaskCrop.icon}
                </div>
                <div>
                  <h3 className="text-xl font-extrabold text-gray-900">{activeTaskCrop.name} Tasks</h3>
                  <p className="text-xs text-gray-500">{activeTaskCrop.field} · {activeTaskCrop.stage}</p>
                </div>
              </div>
              <button
                onClick={() => setActiveTaskCrop(null)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Checklist */}
            <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Next Agronomic Priority</p>
                <div className="p-3 rounded-xl bg-green-50 border border-green-200 text-xs text-green-900 font-medium flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-[#257038] shrink-0 mt-0.5" />
                  <span>{activeTaskCrop.nextAction}</span>
                </div>
              </div>

              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Stage Checklist</p>
                <div className="space-y-2">
                  {activeTaskCrop.tasks.map(task => (
                    <div
                      key={task.id}
                      onClick={() => handleToggleTask(activeTaskCrop.id, task.id)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                        task.done
                          ? 'bg-gray-50 border-gray-200 text-gray-400 line-through'
                          : 'bg-white border-gray-200 hover:border-[#257038] text-gray-800 shadow-2xs'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 border ${
                        task.done ? 'bg-[#206332] border-[#206332] text-white' : 'border-gray-300 bg-white'
                      }`}>
                        {task.done && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <div className="flex-1 text-xs font-semibold">
                        {task.title}
                        <span className={`ml-2 px-1.5 py-0.2 rounded text-[10px] uppercase font-extrabold ${
                          task.priority === 'high' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'
                        }`}>
                          {task.priority}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Drawer Footer */}
            <div className="p-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  setActiveTaskCrop(null);
                  onOpenScan();
                }}
                className="px-4 py-2 rounded-xl bg-[#206332] hover:bg-[#184e27] text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Diagnose {activeTaskCrop.name} Now</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTaskCrop(null)}
                className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 font-bold text-xs hover:bg-gray-100 cursor-pointer"
              >
                Done
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════════════
          ADD NEW CROP MODAL
          ══════════════════════════════════════════════════════════════════════ */}
      {isAddCropModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-extrabold text-gray-900">Add Crop Plot</h3>
                <p className="text-xs text-gray-500">Register a new acreage parcel to your dashboard</p>
              </div>
              <button
                onClick={() => setIsAddCropModalOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddCropSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Crop Type</label>
                <select
                  value={newCropName}
                  onChange={(e) => {
                    setNewCropName(e.target.value);
                    const map = { Tomato: '🍅', Potato: '🥔', Wheat: '🌾', Corn: '🌽', Soybean: '🌱', Cotton: '🌿', Rice: '🌾' };
                    setNewCropIcon(map[e.target.value] || '🌱');
                  }}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#257038]"
                >
                  <option value="Tomato">Tomato 🍅</option>
                  <option value="Potato">Potato 🥔</option>
                  <option value="Wheat">Wheat 🌾</option>
                  <option value="Corn">Corn (Maize) 🌽</option>
                  <option value="Soybean">Soybean 🌱</option>
                  <option value="Cotton">Cotton 🌿</option>
                  <option value="Rice">Rice (Paddy) 🌾</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Field / Parcel Name</label>
                  <input
                    type="text"
                    required
                    value={newCropField}
                    onChange={(e) => setNewCropField(e.target.value)}
                    placeholder="e.g. Field E"
                    className="w-full px-3 py-2 text-sm rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#257038]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Acreage</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={newCropAcres}
                    onChange={(e) => setNewCropAcres(e.target.value)}
                    placeholder="e.g. 2.5"
                    className="w-full px-3 py-2 text-sm rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#257038]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Current Growth Stage</label>
                <select
                  value={newCropStage}
                  onChange={(e) => setNewCropStage(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#257038]"
                >
                  <option value="Seedling">Seedling</option>
                  <option value="Vegetative">Vegetative</option>
                  <option value="Flowering">Flowering</option>
                  <option value="Fruiting">Fruiting</option>
                  <option value="Tillering">Tillering</option>
                  <option value="Mature / Harvest">Mature / Harvest</option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddCropModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#206332] hover:bg-[#184e27] text-white font-bold text-xs shadow-xs cursor-pointer"
                >
                  Save Plot to Dashboard
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Progressive Scan History & Health Diary Modal */}
      <ScanHistoryModal
        plotHistory={selectedHistoryPlot}
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
        onOpenFollowUpScan={(plot) => {
          setIsHistoryModalOpen(false);
          if (onOpenScan) onOpenScan(plot);
        }}
        onHistoryUpdated={() => setHistoriesVersion(v => v + 1)}
      />

      {/* Clean Footer */}
      <Footer onOpenScan={onOpenScan} />

    </div>
  );
}

