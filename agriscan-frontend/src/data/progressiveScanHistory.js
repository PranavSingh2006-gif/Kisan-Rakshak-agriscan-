// Unified Progressive Scan History & Adaptive Memory Store
// Stores chronological health diary for each crop plot.

export const DEFAULT_PLOT_HISTORIES = {
  'wheat-field-a': {
    plotId: 'wheat-field-a',
    cropName: 'Wheat',
    plotLocation: 'Field A • 2.4 acres',
    currentStage: 'Tillering',
    healthStatus: 'Healthy',
    scans: [
      {
        id: 'scan-w1',
        scanNumber: 1,
        date: '02 Dec 2024',
        daysAgo: '18 days ago',
        stage: 'Crown Root Initiation (CRI)',
        lesionCoverage: '18% foliar speckling',
        severityScore: 65,
        diagnosis: 'Yellow / Stripe Rust (Puccinia striiformis) - Early Inception',
        image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=600&q=80',
        prescribedTactic: 'Foliar spray of Propiconazole 25% EC (Tilt) @ 1 ml/L + stop evening overhead furrow flooding.',
        outcomeStatus: 'BASELINE_RECORDED',
        outcomeReport: 'Initial baseline created. Spores detected on 4 out of 20 random flag leaves.'
      },
      {
        id: 'scan-w2',
        scanNumber: 2,
        date: '16 Dec 2024 (Latest)',
        daysAgo: '4 days ago',
        stage: 'Tillering Stage',
        lesionCoverage: '4% residual scarring (Reduction -14%)',
        severityScore: 18,
        diagnosis: 'Yellow Rust Arrested • 88% Healthy Foliar Recovery',
        image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80',
        prescribedTactic: 'MAINTENANCE PROTOCOL: Reduce chemical fungicides. Apply balanced nitrogen-phosphorus top-dressing and maintain dry canopy.',
        outcomeStatus: 'PREVIOUS_TREATMENT_WORKED',
        outcomeReport: 'Success! Propiconazole 25% EC successfully arrested fungal urediniospores. Pustules desiccated without further lateral spreading.',
        recoveryDelta: {
          previousSeverity: 65,
          currentSeverity: 18,
          reductionPercent: 72,
          trend: 'IMPROVED',
          message: 'Previous preventive measures worked effectively. Crop successfully transitioned to healthy tillering.'
        },
        adaptiveTactics: [
          {
            title: 'Transition to Bio-Protective Armor',
            detail: 'Cease systemic fungicide spray to avoid chemical buildup. Apply Pseudomonas fluorescens (5g/L) for biological leaf surface protection.',
            priority: 'Next week'
          },
          {
            title: 'Tillering Nutrient Fortification',
            detail: 'Apply 19:19:19 water-soluble NPK foliar spray to boost photosynthetic green canopy.',
            priority: 'Immediate'
          }
        ]
      }
    ]
  },

  'soybean-field-b': {
    plotId: 'soybean-field-b',
    cropName: 'Soybean',
    plotLocation: 'Field B • 3.1 acres',
    currentStage: 'Flowering',
    healthStatus: 'Monitor',
    scans: [
      {
        id: 'scan-s1',
        scanNumber: 1,
        date: '20 Nov 2024',
        daysAgo: '30 days ago',
        stage: 'Vegetative V4',
        lesionCoverage: '22% leaf surface',
        severityScore: 58,
        diagnosis: 'Cercospora Leaf Spot (Frogeye)',
        image: 'https://images.unsplash.com/photo-1599818451897-402a7b69bb3b?auto=format&fit=crop&w=600&q=80',
        prescribedTactic: 'Apply Chlorothalonil 75% WP contact spray (2g/L) + prune lower infected leaves.',
        outcomeStatus: 'BASELINE_RECORDED',
        outcomeReport: 'Baseline recorded. High humidity (>85%) noted during evening canopy closure.'
      },
      {
        id: 'scan-s2',
        scanNumber: 2,
        date: '12 Dec 2024 (Latest)',
        daysAgo: '8 days ago',
        stage: 'Flowering R1',
        lesionCoverage: '28% leaf surface (Expansion +6%)',
        severityScore: 68,
        diagnosis: 'Cercospora Persistence + Early Pod Borer Nymphs',
        image: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb22509?auto=format&fit=crop&w=600&q=80',
        prescribedTactic: 'ADAPTIVE TACTIC: Previous contact spray washed off. Escalating to systemic Azoxystrobin + Difenoconazole + Neem Oil 10,000 ppm.',
        outcomeStatus: 'PREVIOUS_TREATMENT_FAILED',
        outcomeReport: 'Warning: Contact Chlorothalonil was partially washed off by unexpected morning dew and failed to stop deep tissue mycelium.',
        recoveryDelta: {
          previousSeverity: 58,
          currentSeverity: 68,
          reductionPercent: -17,
          trend: 'WORSENED',
          message: 'Previous contact method failed against high canopy moisture. Escalated systemic tactics generated.'
        },
        adaptiveTactics: [
          {
            title: 'Escalate to Systemic Strobilurin-Triazole Combo',
            detail: 'Rotate away from contact spray. Apply Azoxystrobin 18.2% + Difenoconazole 11.4% SC. Absorbs within 2 hours, rainfast, eradicates internal fungus.',
            priority: 'Immediate (Next 48h)'
          },
          {
            title: 'Neem-Based Bio-Repellent for Borer',
            detail: 'Add cold-pressed 10,000 ppm Azadirachtin to prevent pod borer moths from ovipositing in flowers.',
            priority: 'Combine in tank mix'
          },
          {
            title: 'Improve Inter-Row Aeration',
            detail: 'Trim excess side foliage to allow air circulation and decrease canopy micro-humidity below 75%.',
            priority: 'Within 3 days'
          }
        ]
      }
    ]
  },

  'tomato-field-c': {
    plotId: 'tomato-field-c',
    cropName: 'Tomato',
    plotLocation: 'Field C • 1.2 acres',
    currentStage: 'Fruiting',
    healthStatus: 'Healthy',
    scans: [
      {
        id: 'scan-t1',
        scanNumber: 1,
        date: '10 Nov 2024',
        daysAgo: '40 days ago',
        stage: 'Early Flowering',
        lesionCoverage: '24% lowest leaves',
        severityScore: 70,
        diagnosis: 'Early Blight (Alternaria solani)',
        image: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb22509?auto=format&fit=crop&w=600&q=80',
        prescribedTactic: 'Copper Hydroxide spray + strip lower 20cm leaves to avoid soil splash.',
        outcomeStatus: 'BASELINE_RECORDED',
        outcomeReport: 'Initial diagnosis. Farmer sanitized lower canopy and mulched drip beds.'
      },
      {
        id: 'scan-t2',
        scanNumber: 2,
        date: '14 Dec 2024 (Latest)',
        daysAgo: '6 days ago',
        stage: 'Fruit Bulking Stage',
        lesionCoverage: '6% controlled foliage (Reduction -18%)',
        severityScore: 22,
        diagnosis: 'Early Blight Arrested • Excellent Foliar & Fruit Health',
        image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80',
        prescribedTactic: 'MAINTENANCE PROTOCOL: Apply biological Trichoderma harzianum soil drench; continue regular calcium fertigation.',
        outcomeStatus: 'PREVIOUS_TREATMENT_WORKED',
        outcomeReport: 'Success! Copper Hydroxide combined with bottom sanitation stopped spore progression up the plant trellis.',
        recoveryDelta: {
          previousSeverity: 70,
          currentSeverity: 22,
          reductionPercent: 68,
          trend: 'IMPROVED',
          message: 'Previous preventive sanitation and copper spray worked! No lesions observed on new fruit clusters.'
        },
        adaptiveTactics: [
          {
            title: 'Blossom End Rot Prevention',
            detail: 'Maintain steady drip watering (15 min pulses) and foliar chelated calcium (2g/L) to support rapid fruit expansion.',
            priority: 'Routine fertigation'
          },
          {
            title: 'Biological Shield Drench',
            detail: 'Drench root zone with Trichoderma viride bio-fungicide to suppress soil-borne Fusarium and Alternaria.',
            priority: 'Every 14 days'
          }
        ]
      }
    ]
  },

  'maize-field-d': {
    plotId: 'maize-field-d',
    cropName: 'Maize',
    plotLocation: 'Field D • 2.0 acres',
    currentStage: 'Vegetative',
    healthStatus: 'Attention',
    scans: [
      {
        id: 'scan-m1',
        scanNumber: 1,
        date: '18 Dec 2024 (Initial Baseline)',
        daysAgo: '2 days ago',
        stage: 'Vegetative V6 (6-Leaf)',
        lesionCoverage: '35% central whorl defoliation + acute moisture stress',
        severityScore: 82,
        diagnosis: 'Fall Armyworm (Spodoptera frugiperda) + Soil Moisture Deficit (31%)',
        image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=600&q=80',
        prescribedTactic: 'Urgent: Run 45-min drip cycle + apply Emamectin Benzoate 5% SG (0.4g/L) targeted into whorls.',
        outcomeStatus: 'BASELINE_RECORDED',
        outcomeReport: 'Severe windowpane foliar feeding observed in 30% of plants. Soil moisture at critical 31% threshold.'
      }
    ]
  }
};

const STORAGE_KEY = 'kisan_rakshak_progressive_histories';

// Fetch all plot histories
export function getAllPlotHistories() {
  if (typeof window === 'undefined') return DEFAULT_PLOT_HISTORIES;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PLOT_HISTORIES));
      return DEFAULT_PLOT_HISTORIES;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Error reading scan history:', e);
    return DEFAULT_PLOT_HISTORIES;
  }
}

// Fetch single plot history
export function getPlotHistory(plotId) {
  const all = getAllPlotHistories();
  return all[plotId] || null;
}

// Save a newly performed scan to a plot's history
export function appendScanToHistory(plotId, newScan) {
  const all = getAllPlotHistories();
  const plot = all[plotId] || {
    plotId,
    cropName: newScan.cropName || 'Crop',
    plotLocation: newScan.field || 'Field Plot',
    currentStage: newScan.stage || 'Vegetative',
    healthStatus: newScan.healthStatus || 'Monitor',
    scans: []
  };

  plot.scans.push(newScan);
  plot.currentStage = newScan.stage || plot.currentStage;
  plot.healthStatus = newScan.healthStatus || plot.healthStatus;

  all[plotId] = plot;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  } catch (e) {
    console.error('Failed to save to localStorage:', e);
  }
  return plot;
}

// Evaluates whether previous preventive measures worked or failed
export function evaluateFollowUpOutcome(previousScan, currentStatusWorked) {
  if (!previousScan) return null;

  if (currentStatusWorked) {
    // PREVIOUS MEASURES WORKED
    return {
      status: 'WORKED',
      badge: 'Treatment Effective • Outbreak Halted',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      explanation: `Previous treatment with "${previousScan.prescribedTactic}" successfully suppressed the pathogen. Foliar lesion coverage has receded, and active sporulation has stopped.`,
      actionDirective: 'MAINTENANCE PROTOCOL ACTIVATED',
      deltaSeverity: -45,
      tactics: [
        {
          title: 'Step Down to Preventive Bio-Armor',
          detail: 'No aggressive chemical sprays required today. Switch to Trichoderma or Bacillus subtilis weekly protective drench.',
          priority: 'Weekly Maintenance'
        },
        {
          title: 'Nutrient Recovery Boost',
          detail: 'Apply 0:52:34 potassium dihydrogen phosphate (2g/L) to assist damaged leaf tissues in photosynthesis regeneration.',
          priority: 'Next irrigation'
        }
      ]
    };
  } else {
    // PREVIOUS MEASURES FAILED / RESISTED
    return {
      status: 'FAILED',
      badge: 'Resistance Detected • Adaptive Tactics Required',
      badgeColor: 'bg-red-100 text-red-800 border-red-300',
      explanation: `Evaluation Alert: Previous measure ("${previousScan.prescribedTactic}") failed to contain the disease. Pathogen has either developed resistance or contact spray was diluted by weather/dew.`,
      actionDirective: 'ADAPTIVE RESISTANCE PROTOCOL ACTIVATED',
      deltaSeverity: +14,
      tactics: [
        {
          title: 'Rotate Chemical Group (FRAC Code Switch)',
          detail: 'Do NOT repeat the previous chemical class. Rotate to a systemic multi-site fungicide (e.g., Azoxystrobin + Difenoconazole or Pyraclostrobin). Systemic uptake occurs within 2 hours, making it rainfast.',
          priority: 'Immediate (Next 24h Window)'
        },
        {
          title: 'Canopy Defoliation & Debris Burn',
          detail: 'Immediately prune and incinerate lower 25cm leaves showing active sporulation. Do not compost infected leaves.',
          priority: 'Today'
        },
        {
          title: 'Microclimate Humidity Reduction',
          detail: 'Shift to sub-canopy drip irrigation only. Eliminate any overhead sprinkler or splash irrigation to starve fungal spore germination.',
          priority: 'Next irrigation cycle'
        }
      ]
    };
  }
}

