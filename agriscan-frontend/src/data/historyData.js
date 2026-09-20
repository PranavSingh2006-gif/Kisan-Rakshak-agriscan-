export const initialTrackingHistory = [
  {
    cropId: 'potato-field-4-sector-b',
    cropName: 'Potato (Russet Burbank)',
    plotLocation: 'Field #4 - Sector B (Row 12-24)',
    firstScanDate: 'Sept 12, 2026',
    status: 'ADAPTIVE_TACTICS_REQUIRED',
    scans: [
      {
        scanNumber: 1,
        date: 'Sept 12, 2026',
        daysAgo: '7 days ago',
        stage: 'Initial Diagnosis',
        lesionCoverage: '38% leaf surface',
        severityScore: 84,
        diagnosis: 'Early Blight (Alternaria solani)',
        image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80',
        prescribedTactic: 'Copper Octanoate foliar application (7-day cycle) + manual defoliation of lowest 15cm leaves.',
        outcomeReport: 'Initial baseline created. Farmer executed contact spray on Sept 13.'
      },
      {
        scanNumber: 2,
        date: 'Sept 19, 2026 (Today)',
        daysAgo: 'Today',
        stage: 'Follow-up Evaluation',
        lesionCoverage: '44% leaf surface (Expansion +6%)',
        severityScore: 89,
        diagnosis: 'Early Blight - Pathogen Resistance / Weather Spread',
        image: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb22509?auto=format&fit=crop&w=600&q=80',
        prescribedTactic: 'NEW ADAPTIVE TACTICS REQUIRED',
        outcomeReport: 'Evaluation Alert: Contact copper spray was washed off by intermittent dew and failed to halt fungal sporulation under 84% humidity conditions.',
        adaptiveTactics: [
          {
            title: 'Shift from Contact to Systemic Fungicide',
            detail: 'Rotate to Difenoconazole or Azoxystrobin (Quadris). Systemic compounds absorb into plant tissue within 2 hours, making them rainfast and eradicating internal mycelia.',
            priority: 'Immediate (Next safe spray window)'
          },
          {
            title: 'Convert Irrigation to Sub-Canopy Drip',
            detail: 'Deactivate any sprinkler heads near Sector B. Leaf wetness duration must remain under 4 hours to starve spore development.',
            priority: 'Within 24 hours'
          },
          {
            title: 'Aggressive Sanitation Pruning',
            detail: 'Strip lower foliage up to 25 cm from ridge soil level. Safely incinerate all clippings to prevent local spore cycle.',
            priority: 'Completed today'
          },
          {
            title: 'Biological Soil Inoculation',
            detail: 'Drench root bed with Bacillus subtilis strain QST 713 to outcompete soil-borne Alternaria conidia.',
            priority: 'Next irrigation cycle'
          }
        ],
        recoveryComparison: {
          previousSeverity: 84,
          currentSeverity: 89,
          deltaPercent: +6,
          trend: 'WORSENED',
          message: 'Previous solution insufficient against high humidity weather. Escalated strategy activated.'
        }
      }
    ]
  }
];

