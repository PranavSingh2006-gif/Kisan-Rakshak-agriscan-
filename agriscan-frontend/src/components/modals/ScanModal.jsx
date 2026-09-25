import React, { useState, useRef, useEffect } from 'react';
import {
  X, Upload, CheckCircle2, AlertTriangle, ShieldCheck, Leaf, RefreshCw,
  Sparkles, ChevronDown, Check, ShieldAlert, Info, CloudSun, Calendar, MapPin, Plus,
  Camera, Video, VideoOff, Circle, FlipHorizontal, SwitchCamera
} from 'lucide-react';
import { cropDatabase } from '../../data/cropData';
import { getAllPlotHistories, getPlotHistory, appendScanToHistory, evaluateFollowUpOutcome } from '../../data/progressiveScanHistory';
import { useLanguage } from '../../context/LanguageContext';

const CROP_OPTIONS = [
  { id: 'tomato', name: 'Tomato', icon: '🍅' },
  { id: 'potato', name: 'Potato', icon: '🥔' },
  { id: 'corn', name: 'Corn (Maize)', icon: '🌽' },
  { id: 'apple', name: 'Apple', icon: '🍏' },
  { id: 'wheat', name: 'Wheat', icon: '🌾' },
  { id: 'grape', name: 'Grape', icon: '🍇' },
  { id: 'bell-pepper', name: 'Bell Pepper', icon: '🫑' },
  { id: 'onion', name: 'Onion', icon: '🧅' },
  { id: 'soybean', name: 'Soybean', icon: '🌿' },
  { id: 'strawberry', name: 'Strawberry', icon: '🍓' },
];

const STAGE_OPTIONS = [
  { id: 'seedling', name: 'Seedling', icon: '🌱' },
  { id: 'vegetative', name: 'Vegetative', icon: '🌿' },
  { id: 'flowering', name: 'Flowering', icon: '🌸' },
  { id: 'fruiting', name: 'Fruiting', icon: '🍅' },
  { id: 'mature', name: 'Mature / Harvest', icon: '🌾' },
  { id: 'post-harvest', name: 'Post-Harvest', icon: '🍂' },
];

function ScanFormFields({
  selectedCrop, selectedStage,
  scanDate, setScanDate,
  linkedPlotId, handleSelectPlot, previousScan,
  isAutoDetecting
}) {
  const { t } = useLanguage();
  return (
    <div className="space-y-3">
      {/* Field Location: Link to Monitored Plot */}
      <div className="p-3 rounded-2xl bg-emerald-50/50 border border-emerald-100/90 space-y-1.5">
        <div className="flex items-center justify-between">
          <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
            <RefreshCw className="w-3.5 h-3.5 text-[#257038]" />
            <span>{t('sm_fieldLocation') || t('Field Location / Monitored Plot')}</span>
          </label>
          {previousScan && (
            <span className="text-[10px] text-emerald-800 bg-emerald-100 border border-emerald-200 px-2 py-0.5 rounded-full font-bold">
              Follow-up Scan #{previousScan.scanNumber + 1}
            </span>
          )}
        </div>
        <select
          value={linkedPlotId || ''}
          onChange={(e) => handleSelectPlot && handleSelectPlot(e.target.value)}
          className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 bg-white font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#257038]"
        >
          <option value="">Unmapped / Standalone New Scan</option>
          <option value="wheat-field-a">Field A (Wheat • 2.4 acres) • Monitored Plot</option>
          <option value="soybean-field-b">Field B (Soybean • 3.1 acres) • Monitored Plot</option>
          <option value="tomato-field-c">Field C (Tomato • 1.2 acres) • Monitored Plot</option>
          <option value="maize-field-d">Field D (Maize • 2.0 acres) • Monitored Plot</option>
        </select>
        {linkedPlotId ? (
          <div className="p-2 rounded-xl bg-white border border-emerald-200 text-xs text-emerald-950 space-y-0.5">
            <p className="font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#257038]" />
              <span>Field: {
                linkedPlotId === 'wheat-field-a' ? 'Field A - 2.4 acres (Wheat)' :
                linkedPlotId === 'soybean-field-b' ? 'Field B - 3.1 acres (Soybean)' :
                linkedPlotId === 'tomato-field-c' ? 'Field C - 1.2 acres (Tomato)' :
                linkedPlotId === 'maize-field-d' ? 'Field D - 2.0 acres (Maize)' : linkedPlotId
              } (same as linked monitored plot)</span>
            </p>
            {previousScan && (
              <p className="text-[11px] text-gray-600 pl-5">
                Previous Diagnosis ({previousScan.date}): {previousScan.diagnosis}
              </p>
            )}
          </div>
        ) : (
          <p className="text-[11px] text-gray-500 italic">
            Field location will only be asked if you choose to save this scan to your farm dashboard.
          </p>
        )}
      </div>

      {/* Observation Date - ONLY manual input kept */}
      <div>
        <label className="text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-[#257038]" />
          <span>Observation Date</span>
        </label>
        <input
          type="date"
          value={scanDate}
          onChange={(e) => setScanDate(e.target.value)}
          className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-[#257038] focus:border-transparent cursor-pointer"
        />
      </div>

      {/* AI Auto-Scan badge */}
      {isAutoDetecting ? (
        <div className="p-3 rounded-2xl bg-emerald-50/90 border border-emerald-300 flex items-center gap-2.5 text-xs text-emerald-950 animate-pulse">
          <div className="w-6 h-6 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
            <Sparkles className="w-3.5 h-3.5 animate-spin" />
          </div>
          <div>
            <p className="font-bold text-[#154624]">AI Scanning Crop Type and Growth Stage...</p>
            <p className="text-[10px] text-emerald-700">Gemini Vision analyzing leaf morphology</p>
          </div>
        </div>
      ) : selectedCrop ? (
        <div className="p-3 rounded-2xl bg-gradient-to-r from-emerald-50 via-green-50/80 to-emerald-50 border border-emerald-300 text-xs text-emerald-950">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="w-5 h-5 rounded-full bg-[#206332] text-white flex items-center justify-center text-[10px] font-black">V</span>
            <span className="font-extrabold text-[#194b29] uppercase tracking-wider text-[11px]">Auto-Scanned:</span>
            <span className="font-bold text-gray-900 bg-white px-2 py-0.5 rounded-lg border border-emerald-200">
              {selectedCrop.icon} {selectedCrop.name}
            </span>
            {selectedStage && (
              <>
                <span className="text-gray-400">-</span>
                <span className="font-bold text-gray-900 bg-white px-2 py-0.5 rounded-lg border border-emerald-200">
                  {selectedStage.icon} {selectedStage.name}
                </span>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="p-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-600 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#257038] shrink-0" />
          <span>Crop type and growth stage will be auto-detected by Gemini AI once a photo is attached.</span>
        </div>
      )}
    </div>
  );
}

export default function ScanModal({ isOpen, onClose, initialPlot }) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('upload');
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [selectedStage, setSelectedStage] = useState(null);
  const [scanDate, setScanDate] = useState(() => new Date().toISOString().split('T')[0]);
  // Auto-detect state
  const [isAutoDetecting, setIsAutoDetecting] = useState(false);
  const [autoDetectResult, setAutoDetectResult] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState('');
  const [capturedFrame, setCapturedFrame] = useState(null);
  // Detect mobile device to pick the right default camera
  const isMobileDevice = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const [facingMode, setFacingMode] = useState(isMobileDevice ? 'environment' : 'user');
  const [isMirrored, setIsMirrored] = useState(!isMobileDevice); // mirror front-cam (laptop), don't mirror rear (phone)
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState('');
  const [diagnosisResult, setDiagnosisResult] = useState(null);
  const [modelUsed, setModelUsed] = useState('Gemini AI');
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
    
  // Progressive Follow-Up & History State
  const [linkedPlotId, setLinkedPlotId] = useState(
    initialPlot ? (initialPlot.plotId || initialPlot.id) : ''
  );
  const [treatmentOutcomeWorked, setTreatmentOutcomeWorked] = useState(null);
  const [savedToHistory, setSavedToHistory] = useState(false);
  const [isAddingToDashboard, setIsAddingToDashboard] = useState(false);
  const [newPlotFieldName, setNewPlotFieldName] = useState('');
  const [newPlotAcres, setNewPlotAcres] = useState('2.0');
  const [savedNewFieldSuccess, setSavedNewFieldSuccess] = useState(false);

  useEffect(() => {
    if (initialPlot) {
      const pid = initialPlot.plotId || initialPlot.id;
      setLinkedPlotId(pid || '');
      if (initialPlot.cropName) {
        const found = CROP_OPTIONS.find(c => c.name.toLowerCase().includes(initialPlot.cropName.toLowerCase()));
        if (found) setSelectedCrop(found);
      }
      if (initialPlot.plotLocation) {
        // Field location auto-derived from linked plot
      }
    }
  }, [initialPlot]);

  const plotHistory = linkedPlotId ? getPlotHistory(linkedPlotId) : null;
  const previousScan = plotHistory && plotHistory.scans && plotHistory.scans.length > 0
    ? plotHistory.scans[plotHistory.scans.length - 1]
    : null;

  const handleSelectPlot = (pid) => {
    setLinkedPlotId(pid);
    setTreatmentOutcomeWorked(null);
    setSavedToHistory(false);
    if (!pid) return;

    const hist = getPlotHistory(pid);
    if (hist) {
      const foundCrop = CROP_OPTIONS.find(c => c.name.toLowerCase().includes(hist.cropName.toLowerCase()));
      if (foundCrop) setSelectedCrop(foundCrop);
      const foundStage = STAGE_OPTIONS.find(s => s.name.toLowerCase().includes(hist.currentStage.toLowerCase()));
      if (foundStage) setSelectedStage(foundStage);
    }
  };

  const handleSaveFollowUpScan = () => {
    if (!linkedPlotId || !diagnosisResult) return;
    const hist = getPlotHistory(linkedPlotId);
    const lastScan = hist && hist.scans ? hist.scans[hist.scans.length - 1] : null;
    const scanNum = lastScan ? lastScan.scanNumber + 1 : 1;
    const worked = treatmentOutcomeWorked !== null ? treatmentOutcomeWorked : true;
    const evalData = lastScan ? evaluateFollowUpOutcome(lastScan, worked) : null;

    const newScanEntry = {
      id: `scan-${linkedPlotId}-${Date.now()}`,
      scanNumber: scanNum,
      date: `Today, ${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })} (Follow-up #${scanNum})`,
      daysAgo: 'Today',
      stage: selectedStage ? selectedStage.name : (hist ? hist.currentStage : 'Active Stage'),
      lesionCoverage: worked ? '4% residual controlled foliar scarring' : '36% necrotic resistance spread',
      severityScore: worked ? 18 : 78,
      diagnosis: diagnosisResult.diseaseName,
      image: uploadedImage || capturedFrame || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80',
      prescribedTactic: evalData ? evalData.actionDirective : (diagnosisResult.immediateAction || 'Standard maintenance'),
      outcomeStatus: worked ? 'PREVIOUS_TREATMENT_WORKED' : 'PREVIOUS_TREATMENT_FAILED',
      outcomeReport: evalData ? evalData.explanation : 'Follow-up diagnosis recorded in diary.',
      recoveryDelta: lastScan ? {
        previousSeverity: lastScan.severityScore,
        currentSeverity: worked ? 18 : 78,
        reductionPercent: worked ? 70 : -12,
        trend: worked ? 'IMPROVED' : 'WORSENED',
        message: worked ? 'Previous treatment worked!' : 'Previous treatment resisted.'
      } : null,
      adaptiveTactics: evalData ? evalData.tactics : []
    };

    appendScanToHistory(linkedPlotId, newScanEntry);
    setSavedToHistory(true);
  };

  function stopCamera() {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    if (videoRef.current) videoRef.current.srcObject = null;
    setCameraActive(false);
  }


  useEffect(() => {
    if (!isOpen || activeTab !== 'camera') stopCamera();
  }, [isOpen, activeTab]);

  useEffect(() => { return () => stopCamera(); }, []);


  const startCamera = async () => {
    setCameraError(''); setCapturedFrame(null);
    // On mobile prefer rear (environment) camera; on laptop/desktop use any available camera (user/front)
    const videoConstraints = isMobileDevice
      ? { facingMode: { ideal: facingMode }, width: { ideal: 1920 }, height: { ideal: 1080 } }
      : { width: { ideal: 1280 }, height: { ideal: 720 } }; // no facingMode on laptop — avoids NotFoundError
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: false });
      streamRef.current = s;
      if (videoRef.current) { videoRef.current.srcObject = s; videoRef.current.play(); }
      setCameraActive(true);
    } catch (err) {
      if (err.name === 'NotAllowedError') setCameraError('Camera permission denied. Please allow camera access in your browser settings.');
      else if (err.name === 'NotFoundError') setCameraError('No camera found on this device.');
      else if (err.name === 'OverconstrainedError') {
        // Fallback: try without facingMode constraint
        try {
          const s = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
          streamRef.current = s;
          if (videoRef.current) { videoRef.current.srcObject = s; videoRef.current.play(); }
          setCameraActive(true);
        } catch (e2) { setCameraError('Camera error: ' + e2.message); setCameraActive(false); }
      }
      else setCameraError('Camera error: ' + err.message);
      if (!cameraActive) setCameraActive(false);
    }
  };

  const captureSnapshot = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const v = videoRef.current, c = canvasRef.current;
    c.width = v.videoWidth || 640; c.height = v.videoHeight || 480;
    const ctx = c.getContext('2d');
    if (isMirrored) { ctx.translate(c.width, 0); ctx.scale(-1, 1); }
    ctx.drawImage(v, 0, 0, c.width, c.height);
    const snap = c.toDataURL('image/jpeg', 0.92);
    setCapturedFrame(snap);
    stopCamera();
    autoDetectCropAndStage(snap);
  };

  const retakePhoto = () => { setCapturedFrame(null); startCamera(); };

  const flipCamera = async () => {
    if (!isMobileDevice) return; // Laptop/desktop typically has only one camera
    stopCamera();
    const next = facingMode === 'environment' ? 'user' : 'environment';
    setFacingMode(next); setIsMirrored(next === 'user'); setCameraError(''); setCapturedFrame(null);
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: next }, width: { ideal: 1920 }, height: { ideal: 1080 } }, audio: false });
      streamRef.current = s;
      if (videoRef.current) { videoRef.current.srcObject = s; videoRef.current.play(); }
      setCameraActive(true);
    } catch (err) { setCameraError('Could not switch camera: ' + err.message); }
  };

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (f) {
      const r = new FileReader();
      r.onloadend = () => {
        setUploadedImage(r.result);
        autoDetectCropAndStage(r.result);
      };
      r.readAsDataURL(f);
    }
  };
  const handleDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = (e) => { e.preventDefault(); setIsDragging(false); };
  const handleDrop = (e) => {
    e.preventDefault(); setIsDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) { const r = new FileReader(); r.onloadend = () => { setUploadedImage(r.result); autoDetectCropAndStage(r.result); }; r.readAsDataURL(f); }
  };


  const autoDetectCropAndStage = async (dataUrl) => {
    if (!dataUrl) return;
    setIsAutoDetecting(true);
    try {
      const res = await fetch('/api/detect-crop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageBase64: dataUrl })
      });
      const json = await res.json();
      if (json.success && json.data) {
        const d = json.data;
        setAutoDetectResult(d);
        setSelectedCrop({ id: d.cropId, name: d.cropName, icon: d.cropIcon || 'x' });
        setSelectedStage({ id: d.growthStageId, name: d.growthStageName, icon: d.growthStageIcon || 'x' });
      }
    } catch (err) {
      console.warn('Auto-detect crop error:', err);
    } finally {
      setIsAutoDetecting(false);
    }
  };
  const handleAnalyze = async (imgOverride) => {
    const img = imgOverride || (activeTab === 'camera' ? capturedFrame : uploadedImage);
    setIsAnalyzing(true);
    setAnalysisStep('Uploading foliar imagery to Gemini AI engine...');
    try {
      setTimeout(() => setAnalysisStep('Inspecting lesion patterns and fungal morphology...'), 700);
      setTimeout(() => setAnalysisStep('Formulating precautions and remedies...'), 1500);
      const payload = {
        crop: selectedCrop ? selectedCrop.name : 'Crop',
        growthStage: selectedStage ? selectedStage.name : 'Vegetative Stage',
        fieldName: linkedPlotId ? (
          linkedPlotId === 'wheat-field-a' ? 'Field A (Wheat)' :
          linkedPlotId === 'soybean-field-b' ? 'Field B (Soybean)' :
          linkedPlotId === 'tomato-field-c' ? 'Field C (Tomato)' :
          linkedPlotId === 'maize-field-d' ? 'Field D (Maize)' : linkedPlotId
        ) : 'Farm Field',
        symptoms: '',
        weatherInfo: 'Temperature 26C, Humidity 84%, Rain expected in 7h',
        imageBase64: img && img.startsWith('data:') ? img : null,
      };
      const res = await fetch('/api/diagnose', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const json = await res.json();
      if (json.success && json.data) { setDiagnosisResult(json.data); setModelUsed(json.modelUsed || 'Gemini AI'); }
      else throw new Error(json.error || 'Failed');
    } catch (err) {
      const key = selectedCrop ? selectedCrop.id : 'tomato';
      const fb = cropDatabase.find(c => c.id.includes(key)) || cropDatabase[0];
      setDiagnosisResult({
        diseaseName: fb.disease, pathogen: fb.pathogen, confidence: fb.confidence, severity: fb.severity,
        simpleExplanation: fb.description, immediateAction: 'Prune diseased leaves and stop overhead watering.',
        precautionsAndPrevention: fb.precautions, organicRemedies: fb.treatments.organic,
        chemicalTreatments: fb.treatments.chemical, weatherRiskAnalysis: 'High humidity accelerates spore spread.',
      });
      setModelUsed('Kisan Rakshak Offline Engine');
    } finally { setIsAnalyzing(false); }
  };

  const handleSaveNewPlotToDashboard = () => {
    if (!diagnosisResult) return;
    const fieldLabel = newPlotFieldName.trim() || 'New Crop Field';
    const acresLabel = newPlotAcres.trim() || '2.0';
    const plotLocationFull = fieldLabel + ' - ' + acresLabel + ' acres';
    const newPlotId = 'plot-' + Date.now();
    const resolvedCropName = selectedCrop ? selectedCrop.name : (diagnosisResult.cropName || 'Crop');
    const newScanEntry = {
      id: 'scan-' + newPlotId + '-1',
      scanNumber: 1,
      date: 'Today, ' + new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }) + ' (Initial Scan)',
      daysAgo: 'Today',
      stage: selectedStage ? selectedStage.name : 'Vegetative Stage',
      lesionCoverage: '15% foliar lesion area',
      severityScore: 45,
      diagnosis: diagnosisResult.diseaseName,
      cropName: resolvedCropName,
      field: plotLocationFull,
      image: uploadedImage || capturedFrame || '',
      prescribedTactic: diagnosisResult.immediateAction || 'Standard initial treatment',
      outcomeStatus: 'BASELINE_RECORDED',
      outcomeReport: 'Initial baseline scan registered on Farm Dashboard.'
    };
    appendScanToHistory(newPlotId, newScanEntry);
    setSavedNewFieldSuccess(true);
    setIsAddingToDashboard(false);
  };

  const handleReset = () => {
    setDiagnosisResult(null);
    setUploadedImage(null);
    setCapturedFrame(null);
    setSelectedCrop(null);
    setSelectedStage(null);
    setAutoDetectResult(null);
    setIsAutoDetecting(false);
    setCameraActive(false);
    setSavedToHistory(false);
    setTreatmentOutcomeWorked(null);
  };

  const formProps = {
    selectedCrop, selectedStage,
    scanDate, setScanDate,
    linkedPlotId, handleSelectPlot, previousScan,
    isAutoDetecting
  };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      <div className="relative bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-gray-100 my-4">

        <div className="flex items-start justify-between px-6 pt-6 pb-2">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{t('ai_diagnoseCrop')}</span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold">
                <Sparkles className="w-3 h-3 text-[#257038]" /> Powered by Gemini
              </span>
            </div>
            <h2 className="text-2xl font-extrabold text-[#1a4d2e]">{t('Crop Disease Scanner')}</h2>
            <p className="text-xs text-gray-500 mt-0.5">{t('Upload a photo or use the live camera — both use Gemini AI.')}</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 cursor-pointer mt-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {!diagnosisResult && !isAnalyzing && (
          <div className="px-6 pt-3 pb-0">
            <div className="flex gap-2 p-1 bg-gray-100/80 rounded-2xl">
              <button type="button"
                onClick={() => { setActiveTab('upload'); stopCamera(); setCapturedFrame(null); }}
                className={"flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-sm font-bold transition-all cursor-pointer " + (activeTab === 'upload' ? "bg-white text-[#206332] shadow-sm border border-green-100" : "text-gray-500 hover:text-gray-700")}
              >
                <Upload className="w-4 h-4" /> {t('Upload Image')}
              </button>
              <button type="button" onClick={() => setActiveTab('camera')}
                className={"flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-sm font-bold transition-all cursor-pointer " + (activeTab === 'camera' ? "bg-white text-[#206332] shadow-sm border border-green-100" : "text-gray-500 hover:text-gray-700")}
              >
                <Camera className="w-4 h-4" /> {t('Live Camera Scanner')}
              </button>
            </div>
          </div>
        )}

        <div className="p-6 pt-4">

          {!diagnosisResult && !isAnalyzing && activeTab === 'upload' && (
            <div className="space-y-4">
              <div
                onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}
                onClick={() => fileInputRef.current && fileInputRef.current.click()}
                className={"relative w-full rounded-2xl border-2 border-dashed transition-all cursor-pointer flex flex-col items-center justify-center p-5 text-center " + (isDragging ? "border-[#257038] bg-green-50/80" : uploadedImage ? "border-green-300 bg-gray-50" : "border-gray-300 hover:border-[#257038] bg-gray-50/50")}
              >
                <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
                {uploadedImage ? (
                  <div className="flex flex-col items-center">
                    <div className="w-40 h-40 rounded-xl overflow-hidden shadow-md border-2 border-white">
                      <img src={uploadedImage} alt="Crop" className="w-full h-full object-cover" />
                    </div>
                    <p className="text-xs text-emerald-800 font-bold mt-2">{t('Image Attached')}</p>
                    <p className="text-[11px] text-gray-500">{t('Click or drop to replace')}</p>
                  </div>
                ) : (
                  <div className="space-y-2 py-3">
                    <div className="w-12 h-12 rounded-2xl bg-white shadow border border-gray-200 flex items-center justify-center mx-auto text-[#257038]"><Upload className="w-6 h-6" /></div>
                    <p className="text-sm font-bold text-gray-800">{t('Drag & Drop or Click to Upload')}</p>
                    <p className="text-xs text-gray-500">{t('High-resolution leaf or fruit photo (PNG, JPG)')}</p>
                  </div>
                )}
              </div>
              <ScanFormFields {...formProps} />
              <div className="pt-1">
                <button type="button" onClick={() => handleAnalyze()}
                  className="w-full py-3.5 px-6 rounded-xl bg-[#206332] hover:bg-[#184e27] text-white font-extrabold text-sm tracking-wide shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" /> {t('Analyze with Gemini AI')}
                </button>
              </div>
            </div>
          )}

          {!diagnosisResult && !isAnalyzing && activeTab === 'camera' && (
            <div className="space-y-4">
              <div className="relative w-full rounded-2xl overflow-hidden bg-gray-900 border border-gray-200" style={{minHeight:'240px'}}>
                <canvas ref={canvasRef} className="hidden" />
                {cameraActive && !capturedFrame && (
                  <>
                    <video ref={videoRef} autoPlay playsInline muted className="w-full object-cover rounded-2xl"
                      style={{transform: isMirrored ? 'scaleX(-1)' : 'none', maxHeight:'280px'}} />
                    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                      <div className="relative w-44 h-44">
                        <div className="absolute top-0 left-0 w-8 h-8 border-emerald-400 rounded-tl-lg" style={{borderTop:'3px solid',borderLeft:'3px solid'}} />
                        <div className="absolute top-0 right-0 w-8 h-8 border-emerald-400 rounded-tr-lg" style={{borderTop:'3px solid',borderRight:'3px solid'}} />
                        <div className="absolute bottom-0 left-0 w-8 h-8 border-emerald-400 rounded-bl-lg" style={{borderBottom:'3px solid',borderLeft:'3px solid'}} />
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-emerald-400 rounded-br-lg" style={{borderBottom:'3px solid',borderRight:'3px solid'}} />
                        <div className="absolute left-0 right-0 h-0.5 bg-emerald-400/60 animate-bounce" style={{top:'50%'}} />
                      </div>
                    </div>
                    <div className="absolute bottom-3 inset-x-0 flex items-center justify-center gap-4">
                      {isMobileDevice && (
                        <button type="button" onClick={flipCamera} title="Switch Camera" className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 flex items-center justify-center cursor-pointer border border-white/30">
                          <SwitchCamera className="w-5 h-5 text-white" />
                        </button>
                      )}
                      <button type="button" onClick={captureSnapshot} className="w-16 h-16 rounded-full bg-white border-4 border-emerald-400 flex items-center justify-center shadow-xl cursor-pointer hover:scale-105 active:scale-95 transition-transform">
                        <div className="w-11 h-11 rounded-full bg-[#206332] flex items-center justify-center"><Circle className="w-5 h-5 text-white fill-white" /></div>
                      </button>
                      <button type="button" onClick={() => setIsMirrored(m => !m)} className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 flex items-center justify-center cursor-pointer border border-white/30">
                        <FlipHorizontal className={"w-5 h-5 " + (isMirrored ? "text-emerald-300" : "text-white")} />
                      </button>
                    </div>
                    <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-sm">
                      <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      <span className="text-xs text-white font-bold">LIVE</span>
                    </div>
                  </>
                )}
                {capturedFrame && (
                  <div className="relative flex flex-col items-center">
                    <img src={capturedFrame} alt="Captured" className="w-full rounded-2xl object-cover" style={{maxHeight:'280px'}} />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-emerald-600/90 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-white" /><span className="text-xs text-white font-bold">Captured</span>
                    </div>
                    <button type="button" onClick={retakePhoto} className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/90 text-xs font-bold text-gray-800 hover:bg-white cursor-pointer shadow-md">
                      <RefreshCw className="w-3.5 h-3.5" /> Retake
                    </button>
                  </div>
                )}
                {!cameraActive && !capturedFrame && !cameraError && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gray-900 rounded-2xl p-6">
                    <div className="w-16 h-16 rounded-2xl bg-gray-800 border border-gray-700 flex items-center justify-center"><Camera className="w-8 h-8 text-gray-400" /></div>
                    <div className="text-center">
                      <p className="text-sm font-bold text-gray-200">Real-Time Crop Scanner</p>
                      <p className="text-xs text-gray-500 mt-1">Point camera at a leaf or fruit for live AI detection.</p>
                    </div>
                    <button type="button" onClick={startCamera} className="px-6 py-2.5 rounded-xl bg-[#206332] hover:bg-[#184e27] text-white font-bold text-sm flex items-center gap-2 cursor-pointer">
                      <Video className="w-4 h-4" /> Start Camera
                    </button>
                  </div>
                )}
                {cameraError && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gray-900 rounded-2xl p-6">
                    <VideoOff className="w-10 h-10 text-red-500" />
                    <p className="text-sm font-bold text-red-400 text-center">{cameraError}</p>
                    <button type="button" onClick={startCamera} className="px-5 py-2 rounded-xl bg-gray-700 hover:bg-gray-600 text-white text-sm font-bold flex items-center gap-2 cursor-pointer">
                      <RefreshCw className="w-4 h-4" /> Try Again
                    </button>
                  </div>
                )}
              </div>
              {!capturedFrame && (
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 text-xs">
                    <Info className="w-3.5 h-3.5 text-gray-400" />
                    {cameraActive
                      ? <span className="text-emerald-700 font-medium">Camera live — position crop and tap capture</span>
                      : <span className="text-gray-500">Camera permission required for live scanning.</span>}
                  </div>
                  {cameraActive && (
                    <button type="button" onClick={stopCamera} className="px-3.5 py-1.5 rounded-lg border border-red-300 text-red-600 hover:bg-red-50 text-xs font-bold flex items-center gap-1.5 cursor-pointer">
                      <VideoOff className="w-3.5 h-3.5" /> Stop
                    </button>
                  )}
                </div>
              )}
              <ScanFormFields {...formProps} />
              {capturedFrame && (
                <div className="pt-1">
                  <button type="button" onClick={() => handleAnalyze(capturedFrame)}
                    className="w-full py-3.5 px-6 rounded-xl bg-[#206332] hover:bg-[#184e27] text-white font-extrabold text-sm tracking-wide shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" /> Analyze Captured Crop with Gemini AI
                  </button>
                </div>
              )}
            </div>
          )}

          {isAnalyzing && (
            <div className="py-14 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center animate-bounce"><Sparkles className="w-8 h-8 text-[#257038]" /></div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Gemini Plant Pathology Engine Active</h3>
                <p className="text-xs text-gray-500 font-mono mt-1">{analysisStep}</p>
              </div>
              <div className="w-56 h-2 bg-gray-200 rounded-full overflow-hidden"><div className="w-3/4 h-full bg-[#257038] rounded-full animate-pulse" /></div>
            </div>
          )}

          {diagnosisResult && !isAnalyzing && (
            <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
              <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-white to-green-50 border border-green-200">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-800 border border-emerald-300">{diagnosisResult.confidence}% Confidence</span>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">{diagnosisResult.severity || 'Moderate'} Severity</span>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1">
                        {activeTab === 'camera' ? <Camera className="w-2.5 h-2.5" /> : <Upload className="w-2.5 h-2.5" />}
                        {activeTab === 'camera' ? 'Camera Scan' : 'Upload Scan'}
                      </span>
                    </div>
                    <h3 className="text-xl font-extrabold text-gray-900">{diagnosisResult.diseaseName}</h3>
                    <p className="text-xs text-gray-600 mt-0.5">Crop: <span className="font-semibold">{selectedCrop ? (selectedCrop.icon + ' ' + selectedCrop.name) : (diagnosisResult.cropName || 'Agricultural Crop')}</span></p>
                    {diagnosisResult.pathogen && <p className="text-xs text-emerald-800 font-mono mt-0.5">Pathogen: {diagnosisResult.pathogen}</p>}
                  </div>
                  <span className="text-[10px] font-bold text-gray-400 bg-white px-2 py-1 rounded-lg border border-gray-200 shrink-0">{modelUsed}</span>
                </div>
              </div>
              {diagnosisResult.simpleExplanation && (
                <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#1a5028] uppercase tracking-wider mb-1"><Leaf className="w-3.5 h-3.5" /> {t('sm_whatHappening') || 'What is Happening:'}</div>
                  <p className="text-xs text-gray-800 leading-relaxed">{diagnosisResult.simpleExplanation}</p>
                </div>
              )}
              {diagnosisResult.immediateAction && (
                <div className="p-3.5 rounded-xl bg-red-50/80 border border-red-200 flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[11px] font-bold text-red-900 uppercase tracking-wider">{t('sm_immediateAction') || 'Immediate Action:'}</p>
                    <p className="text-xs text-red-800 mt-0.5">{diagnosisResult.immediateAction}</p>
                  </div>
                </div>
              )}
              {diagnosisResult.precautionsAndPrevention && (
                <div className="p-4 rounded-2xl bg-[#fbfdfa] border border-gray-200 space-y-2">
                  <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-[#257038]" /> {t('sm_precautions') || 'Precautions:'}</h4>
                  <ul className="space-y-1.5 text-xs text-gray-700">
                    {diagnosisResult.precautionsAndPrevention.map((item, i) => (
                      <li key={i} className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#257038] shrink-0 mt-0.5" /><span>{item}</span></li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {diagnosisResult.organicRemedies && (
                  <div className="p-3.5 rounded-xl bg-[#edf7ef] border border-green-200">
                    <h5 className="text-[11px] font-bold text-green-900 uppercase mb-1.5 flex items-center gap-1.5"><Leaf className="w-3.5 h-3.5" /> {t('sm_organic') || 'Organic:'}</h5>
                    <ul className="space-y-1 text-xs text-gray-700">
                      {diagnosisResult.organicRemedies.map((r, i) => <li key={i} className="flex items-start gap-1.5"><span className="text-[#257038] font-bold">•</span><span>{r}</span></li>)}
                    </ul>
                  </div>
                )}
                {diagnosisResult.chemicalTreatments && (
                  <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200">
                    <h5 className="text-[11px] font-bold text-gray-900 uppercase mb-1.5 flex items-center gap-1.5"><ShieldAlert className="w-3.5 h-3.5 text-[#257038]" /> {t('sm_chemical') || 'Chemical:'}</h5>
                    <ul className="space-y-1 text-xs text-gray-700">
                      {diagnosisResult.chemicalTreatments.map((c, i) => <li key={i} className="flex items-start gap-1.5"><span className="text-[#257038] font-bold">•</span><span>{c}</span></li>)}
                    </ul>
                  </div>
                )}
              </div>
              {diagnosisResult.weatherRiskAnalysis && (
                <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                  <CloudSun className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div><span className="font-bold">{t('sm_weatherRisk') || 'Weather Risk:'} </span>{diagnosisResult.weatherRiskAnalysis}</div>
                </div>
              )}
              {/* Progressive Memory & Follow-up Efficacy Check */}
              {previousScan && (
                <div className="p-4 rounded-2xl bg-[#f7faf8] border border-emerald-200 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-950 flex items-center gap-1.5">
                      <RefreshCw className="w-3.5 h-3.5 text-[#257038]" />
                      <span>Progressive Evaluation vs Scan #{previousScan.scanNumber}</span>
                    </span>
                    <span className="text-[10px] font-bold text-gray-500 bg-white px-2 py-0.5 rounded border border-gray-200">
                      Baseline: {previousScan.date}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white border border-gray-200 text-xs space-y-1">
                    <p className="text-gray-500 text-[10px] font-bold uppercase">Previous Recommended Measures:</p>
                    <p className="text-gray-800 font-semibold">{previousScan.prescribedTactic}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-800 font-bold mb-2">
                      Did the previous measure work on this plot?
                    </p>
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setTreatmentOutcomeWorked(true)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                          treatmentOutcomeWorked === true
                            ? 'bg-emerald-700 text-white shadow-xs'
                            : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Yes, Treatment Worked ✓</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setTreatmentOutcomeWorked(false)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                          treatmentOutcomeWorked === false
                            ? 'bg-red-700 text-white shadow-xs'
                            : 'bg-red-100 text-red-800 hover:bg-red-200'
                        }`}
                      >
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>No, Disease Resisted / Spread ⚠️</span>
                      </button>
                    </div>
                  </div>

                  {treatmentOutcomeWorked !== null && (
                    <div className={`p-3 rounded-xl border text-xs leading-relaxed ${
                      treatmentOutcomeWorked 
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-950' 
                        : 'bg-amber-50 border-amber-300 text-amber-950'
                    }`}>
                      <p className="font-bold flex items-center gap-1.5">
                        {treatmentOutcomeWorked ? <Check className="w-4 h-4 text-emerald-700" /> : <AlertTriangle className="w-4 h-4 text-amber-700" />}
                        {treatmentOutcomeWorked
                          ? 'Treatment Effective • Lesions Controlled'
                          : 'Resistance Detected • New Adaptive Tactic Deployed'}
                      </p>
                      <p className="mt-1 text-gray-700">
                        {treatmentOutcomeWorked
                          ? 'Spore sporulation halted. Switch to low-dose bio-controls (Trichoderma) to prevent fungal re-entry while avoiding chemical buildup.'
                          : 'Do not repeat the previous chemical spray! Pathogen has developed resistance. Rotating chemical class to systemic Difenoconazole + sub-canopy drip fertigation.'}
                      </p>
                    </div>
                  )}

                  <button
                    type="button"
                    disabled={savedToHistory}
                    onClick={handleSaveFollowUpScan}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#206332] hover:bg-[#184e27] text-white text-xs font-bold flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-60"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{savedToHistory ? '✓ Saved to Plot Health Diary!' : 'Save Follow-Up Scan to Health Diary'}</span>
                  </button>
                </div>
              )}


              {/* Unmapped Scan: Ask for field ONLY when farmer chooses to add to dashboard */}
              {!linkedPlotId && (
                <div className="space-y-3">
                  {!savedNewFieldSuccess && !isAddingToDashboard && (
                    <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-white to-green-50 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                      <div>
                        <p className="text-xs font-bold text-gray-900 flex items-center gap-1.5">
                          <span>+</span>
                          <span>{t('sm_addToDashboard') || 'Add to Farm Dashboard'}</span>
                        </p>
                        <p className="text-[11px] text-gray-600 mt-0.5">
                          {t('Save this diagnosed crop as a new monitored field to track recovery over time.')}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => { setIsAddingToDashboard(true); }}
                        className="px-4 py-2 rounded-xl bg-[#206332] hover:bg-[#184e27] text-white text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center justify-center gap-1.5 shrink-0"
                      >
                        <span>{t('sm_addAsNew') || 'Add as New Crop Field'}</span>
                      </button>
                    </div>
                  )}
                  {!savedNewFieldSuccess && isAddingToDashboard && (
                    <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-300 space-y-3 shadow-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-extrabold text-[#1a4d2e] uppercase tracking-wider">{t('sm_assignLocation')}</span>
                        <button type="button" onClick={() => setIsAddingToDashboard(false)} className="text-gray-400 hover:text-gray-600 text-xs font-bold cursor-pointer">{t('Cancel')}</button>
                      </div>
                      <p className="text-[11px] text-gray-600">{t('Enter a name and size for this new crop field:')}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                        <div className="sm:col-span-2">
                          <label className="block text-[11px] font-bold text-gray-700 mb-1">{t('sm_fieldName')}</label>
                          <select
                            value={newPlotFieldName}
                            onChange={(e) => setNewPlotFieldName(e.target.value)}
                            className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 bg-white font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#257038] cursor-pointer"
                          >
                            <option value="" disabled>{t('sm_selectField')}</option>
                            <option value="Field A (North Plot)">Field A (North Plot)</option>
                            <option value="Field B (East Acre)">Field B (East Acre)</option>
                            <option value="Field C (South Ridge)">Field C (South Ridge)</option>
                            {newPlotFieldName === 'Field C (South Ridge)' && (
                              <option value="Field D (Canal Side)">Field D (Canal Side)</option>
                            )}
                          </select>
                        </div>
                        <div>
                          <label className="block text-[11px] font-bold text-gray-700 mb-1">{t('sm_areaAcres')}</label>
                          <input
                            type="text"
                            value={newPlotAcres}
                            onChange={(e) => setNewPlotAcres(e.target.value)}
                            placeholder="2.0"
                            className="w-full px-3 py-2 text-xs rounded-xl border border-gray-300 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-[#257038]"
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handleSaveNewPlotToDashboard}
                        className="w-full py-2.5 px-4 rounded-xl bg-[#206332] hover:bg-[#184e27] text-white text-xs font-bold cursor-pointer flex items-center justify-center gap-2"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>{t('sm_saveToDashboard')}</span>
                      </button>
                    </div>
                  )}
                  {savedNewFieldSuccess && (
                    <div className="p-3.5 rounded-xl bg-emerald-100/90 border border-emerald-300 text-xs text-emerald-950 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                        <span><strong>{newPlotFieldName} ({newPlotAcres} acres)</strong> added to your Farm Dashboard!</span>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-800 bg-white px-2 py-0.5 rounded-md border border-emerald-200">Monitored Active</span>
                    </div>
                  )}
                </div>
              )}
              <div className="pt-2 flex items-center gap-3 border-t border-gray-100">
                <button type="button" onClick={handleReset} className="flex-1 py-2.5 px-4 rounded-xl border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold text-xs cursor-pointer">{t('sm_diagnoseAnother')}</button>
                <button type="button" onClick={onClose} className="flex-1 py-2.5 px-4 rounded-xl bg-[#206332] hover:bg-[#184e27] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm cursor-pointer">
                  {t('sm_done')} <CheckCircle2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
