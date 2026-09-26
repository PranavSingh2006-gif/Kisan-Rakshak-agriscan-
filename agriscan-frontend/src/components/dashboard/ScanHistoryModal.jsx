import React, { useState } from 'react';
import {
  X,
  Calendar,
  Layers,
  Leaf,
  CheckCircle2,
  AlertTriangle,
  Camera,
  TrendingDown,
  TrendingUp,
  FileText
} from 'lucide-react';

export default function ScanHistoryModal({ plotHistory, isOpen, onClose, onOpenFollowUpScan }) {
  const [localScans, setLocalScans] = React.useState(null);

  if (!isOpen || !plotHistory) return null;

  const rawScans = plotHistory.scans || [];
  const scans = localScans ?? rawScans;

  const handleRemoveScan = (indexToRemove) => {
    const updated = scans
      .filter((_, i) => i !== indexToRemove)
      .map((scan, i) => ({ ...scan, scanNumber: i + 1 }));
    setLocalScans(updated);
  };

  const handleClose = () => {
    setLocalScans(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-gray-100 overflow-hidden my-4 max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#fbfdfa] shrink-0">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-emerald-50 border border-emerald-200 text-[#257038] flex items-center justify-center font-bold text-lg shadow-2xs shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[11px] font-extrabold text-[#257038] uppercase tracking-wider">
                  Crop Scan History
                </span>
                <span className="px-2 py-0.2 rounded-full bg-green-100 text-green-800 text-[10px] font-extrabold">
                  {scans.length} {scans.length === 1 ? 'Record' : 'Records'}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#11291c] leading-tight">
                {plotHistory.cropName} — {plotHistory.plotLocation}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                handleClose();
                if (onOpenFollowUpScan) onOpenFollowUpScan(plotHistory);
              }}
              className="px-3.5 py-2 rounded-xl bg-[#206332] hover:bg-[#184e27] text-white text-xs font-bold shadow-xs flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Perform New Scan</span>
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Record Cards List */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1 bg-[#fcfdfa]">
          {scans.length === 0 ? (
            <div className="py-12 text-center">
              <Leaf className="w-10 h-10 text-gray-300 mx-auto mb-2" />
              <p className="text-sm font-bold text-gray-600">No scan records yet for this plot.</p>
              <p className="text-xs text-gray-400 mt-1">Perform a scan to establish the initial crop health record.</p>
            </div>
          ) : (
            scans.map((scan, index) => {
              const isLatest = index === scans.length - 1 && scans.length > 1;
              const isBaseline = scan.scanNumber === 1;

              return (
                <div
                  key={scan.id || scan.scanNumber}
                  className="relative bg-white rounded-2xl border border-gray-200 shadow-2xs hover:shadow-xs transition-shadow overflow-hidden"
                >
                  {/* Delete X button */}
                  <button
                    type="button"
                    onClick={() => handleRemoveScan(index)}
                    title="Remove this scan record"
                    className="absolute top-2.5 right-2.5 z-10 w-6 h-6 rounded-full bg-red-50 hover:bg-red-100 border border-red-200 hover:border-red-400 flex items-center justify-center text-red-400 hover:text-red-600 transition-all cursor-pointer shadow-xs"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>

                  {/* Record Card Header Bar */}
                  <div className="px-4 sm:px-5 py-3 bg-[#f8faf7] border-b border-gray-100 flex flex-wrap items-center justify-between gap-2 pr-10">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md text-xs font-black bg-[#257038] text-white">
                        Scan #{scan.scanNumber}
                      </span>
                      {isBaseline && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                          Initial Baseline Record
                        </span>
                      )}
                      {isLatest && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                          Latest Record
                        </span>
                      )}
                      <span className="text-xs text-gray-500 flex items-center gap-1 font-medium ml-1">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                        {scan.date}
                      </span>
                      {scan.stage && (
                        <span className="text-xs text-gray-500 flex items-center gap-1 font-medium">
                          • <Leaf className="w-3 h-3 text-emerald-600" />
                          {scan.stage}
                        </span>
                      )}
                    </div>

                    {/* Severity Index Pill */}
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-extrabold flex items-center gap-1 ${
                        scan.severityScore <= 25
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                          : scan.severityScore <= 60
                          ? 'bg-amber-100 text-amber-800 border border-amber-200'
                          : 'bg-red-100 text-red-800 border border-red-200'
                      }`}>
                        <span>Severity: {scan.severityScore}/100</span>
                        <span className="text-[10px] font-medium opacity-80">
                          ({scan.severityScore <= 25 ? 'Healthy' : scan.severityScore <= 60 ? 'Moderate' : 'High Alert'})
                        </span>
                      </span>
                    </div>
                  </div>

                  {/* Record Card Body */}
                  <div className="p-4 sm:p-5 space-y-4">
                    {/* Diagnosis & Foliar Image */}
                    <div className="flex flex-col sm:flex-row gap-4 items-start">
                      {scan.image && (
                        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden border border-gray-200 shadow-2xs shrink-0 bg-gray-100">
                          <img
                            src={scan.image}
                            alt={scan.diagnosis}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base sm:text-lg font-extrabold text-gray-900 leading-tight">
                          {scan.diagnosis}
                        </h3>
                        {scan.lesionCoverage && (
                          <p className="text-xs text-gray-500 font-mono mt-1">
                            Foliar Lesion Coverage: <span className="font-semibold text-gray-700">{scan.lesionCoverage}</span>
                          </p>
                        )}

                        {/* Prescribed Measures Box */}
                        <div className="mt-2.5 p-3 rounded-xl bg-gray-50 border border-gray-200/80">
                          <div className="flex items-center gap-1.5 text-[10px] font-extrabold text-gray-500 uppercase tracking-wider mb-1">
                            <FileText className="w-3 h-3 text-[#257038]" />
                            <span>Prescribed Preventive Measures</span>
                          </div>
                          <p className="text-xs text-gray-800 font-medium leading-relaxed">
                            {scan.prescribedTactic}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Efficacy Evaluation (If follow-up scan) */}
                    {scan.outcomeStatus && scan.outcomeStatus !== 'BASELINE_RECORDED' && (
                      <div className={`p-3.5 rounded-xl border ${
                        scan.outcomeStatus === 'PREVIOUS_TREATMENT_WORKED'
                          ? 'bg-emerald-50/80 border-emerald-200'
                          : 'bg-red-50/80 border-red-200'
                      }`}>
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-2">
                            {scan.outcomeStatus === 'PREVIOUS_TREATMENT_WORKED' ? (
                              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            ) : (
                              <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                            )}
                            <div>
                              <span className={`text-xs font-black uppercase tracking-wider ${
                                scan.outcomeStatus === 'PREVIOUS_TREATMENT_WORKED' ? 'text-emerald-800' : 'text-red-800'
                              }`}>
                                {scan.outcomeStatus === 'PREVIOUS_TREATMENT_WORKED'
                                  ? 'Previous Treatment Worked ✓'
                                  : 'Previous Treatment Resisted / Ineffective ⚠️'}
                              </span>
                              <p className="text-xs text-gray-700 mt-0.5 leading-relaxed">
                                {scan.outcomeReport}
                              </p>
                            </div>
                          </div>

                          {scan.recoveryDelta && (
                            <div className={`px-2 py-0.5 rounded-lg text-xs font-bold flex items-center gap-1 shrink-0 ${
                              scan.recoveryDelta.trend === 'IMPROVED'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {scan.recoveryDelta.trend === 'IMPROVED' ? (
                                <TrendingDown className="w-3.5 h-3.5 text-emerald-700" />
                              ) : (
                                <TrendingUp className="w-3.5 h-3.5 text-red-700" />
                              )}
                              <span>
                                {scan.recoveryDelta.previousSeverity} → {scan.recoveryDelta.currentSeverity}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Adaptive Next Steps (if present) */}
                    {scan.adaptiveTactics && scan.adaptiveTactics.length > 0 && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                        {scan.adaptiveTactics.map((tactic, tIdx) => (
                          <div
                            key={tIdx}
                            className="p-2.5 rounded-xl bg-[#f9fbf8] border border-green-200/70 text-xs space-y-0.5"
                          >
                            <div className="flex items-center justify-between font-bold text-gray-900">
                              <span>{tactic.title}</span>
                              <span className="text-[10px] font-extrabold text-[#257038] uppercase">
                                {tactic.priority}
                              </span>
                            </div>
                            <p className="text-gray-600 text-[11px] leading-snug">
                              {tactic.detail}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-gray-100 bg-[#fbfdfa] flex items-center justify-end shrink-0">
          <button
            type="button"
            onClick={handleClose}
            className="px-6 py-2 rounded-xl bg-[#206332] hover:bg-[#184e27] text-white font-bold text-xs shadow-xs cursor-pointer transition-all"
          >
            Close History
          </button>
        </div>

      </div>
    </div>
  );
}
