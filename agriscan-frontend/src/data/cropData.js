export const cropDatabase = [
  {
    id: 'potato-early-blight',
    crop: 'Potato',
    scientificName: 'Solanum tuberosum',
    disease: 'Early Blight',
    pathogen: 'Alternaria solani (Fungal)',
    confidence: 84,
    status: 'Action Required',
    severity: 'Moderate',
    tagColor: 'bg-amber-100 text-amber-800 border-amber-300',
    description: 'Concentric brown-black lesions with characteristic target-board rings on older foliage. Weather-driven pathogen spreads rapidly under warm temperatures (24-29°C) and alternating wet/dry conditions.',
    symptoms: [
      'Circular brown spots with distinct concentric rings (target pattern)',
      'Chlorotic yellow halos surrounding expanding necrotic lesions',
      'Premature defoliation starting from the lower canopy upwards'
    ],
    precautions: [
      'Avoid overhead sprinkler irrigation; use root-zone drip lines to keep canopy dry',
      'Maintain at least 30 cm spacing between plants for adequate ventilation',
      'Disinfect all harvesting shears and pruning blades with 10% bleach solution',
      'Never compost infected foliage; bag and incinerate off-site'
    ],
    treatments: {
      organic: [
        'Apply Copper Octanoate (soap-shield fungicide) every 7-10 days',
        'Foliar spray of cold-pressed organic Neem Oil (0.5% concentration)',
        'Inoculate soil with Bacillus subtilis bio-fungicide to suppress root spore splash'
      ],
      chemical: [
        'Chlorothalonil (Bravo Weather Stik) at first sign of lesion appearance',
        'Systemic Azoxystrobin (Quadris) or Difenoconazole for severe outbreaks'
      ]
    },
    recoveryEstimateDays: 14,
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'tomato-late-blight',
    crop: 'Tomato',
    scientificName: 'Solanum lycopersicum',
    disease: 'Late Blight',
    pathogen: 'Phytophthora infestans (Oomycete)',
    confidence: 96,
    status: 'Critical Alert',
    severity: 'Severe',
    tagColor: 'bg-red-100 text-red-800 border-red-300',
    description: 'Devastating water-soaked lesions that turn dark brown with white sporulation on leaf undersides. Can destroy an entire greenhouse or hectare plot within 5 to 7 days if uncontrolled.',
    symptoms: [
      'Large, irregular water-soaked dark lesions spreading rapidly',
      'Delicate white fuzzy fungal mold on the underside of infected leaves in high humidity',
      'Stems develop brown greasy lesions leading to total plant collapse'
    ],
    precautions: [
      'Enforce immediate quarantine barrier around infected rows',
      'Ventilate greenhouses immediately to drop relative humidity below 75%',
      'Stake vines securely to keep foliage at least 15 cm above wet soil',
      'Plant certified resistant cultivars (e.g. Defiant Ph-R, Mountain Merit)'
    ],
    treatments: {
      organic: [
        'Immediate Bordeaux mixture application (copper sulfate + slaked lime)',
        'Copper hydroxide foliar dust before forecasted rain periods',
        'Prune and discard all infected vines in sealed airtight disposal bags'
      ],
      chemical: [
        'Cymoxanil + Famoxadone (Curzate) penetrant curative spray',
        'Mancozeb or Metalaxyl-M preventative protective barrier'
      ]
    },
    recoveryEstimateDays: 21,
    image: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb22509?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'corn-rust',
    crop: 'Corn (Maize)',
    scientificName: 'Zea mays',
    disease: 'Common Leaf Rust',
    pathogen: 'Puccinia sorghi (Fungal)',
    confidence: 91,
    status: 'Warning',
    severity: 'Mild to Moderate',
    tagColor: 'bg-orange-100 text-orange-800 border-orange-300',
    description: 'Golden-brown to cinnamon powdery pustules appearing on both upper and lower leaf surfaces. Spores are easily carried for miles by regional wind vectors.',
    symptoms: [
      'Oval to elongate cinnamon-brown pustules erupting through leaf epidermis',
      'Powdery reddish-orange spores that easily smudge onto hands or tools',
      'Extensive chlorosis and premature leaf drying on heavily infested upper leaves'
    ],
    precautions: [
      'Consult regional spore drift surveillance map before seasonal planting',
      'Plant corn early in the season to mature past high-humidity rust flights',
      'Avoid excessive nitrogen fertilization which produces soft, susceptible leaf tissue'
    ],
    treatments: {
      organic: [
        'Wettable micronized sulfur spray applied at first notice of pustules',
        'Trichoderma harzianum bio-agent application on canopy'
      ],
      chemical: [
        'Pyraclostrobin (Headline AMP) or Azoxystrobin + Propiconazole',
        'Triazole fungicides applied before tassel emergence (VT stage)'
      ]
    },
    recoveryEstimateDays: 10,
    image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'apple-scab',
    crop: 'Apple',
    scientificName: 'Malus domestica',
    disease: 'Apple Scab',
    pathogen: 'Venturia inaequalis (Fungal)',
    confidence: 89,
    status: 'Action Required',
    severity: 'Moderate',
    tagColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    description: 'Olive-green to velvety dark brown lesions on young leaves and fruit skins. Overwinters on fallen dead leaves and infects new spring growth during rain cycles.',
    symptoms: [
      'Velvety olive-green spots with feathery margins on leaf surfaces',
      'Leaf curling, distortion, and premature summer leaf drop',
      'Corky, cracked scabrous spots developing on growing fruit'
    ],
    precautions: [
      'Rake, shred, and compost fallen autumn leaves where ascospore sacs overwinter',
      'Annual canopy pruning to maximize internal sunlight and wind drying',
      'Apply agricultural lime in late autumn to accelerate leaf decomposition'
    ],
    treatments: {
      organic: [
        'Liquid lime sulfur sprayed during dormant to green-tip bud stage',
        'Potassium bicarbonate foliar spray for mild summer infection'
      ],
      chemical: [
        'Captan or Dithianon protectant sprays before rain events',
        'Myclobutanil or Difenoconazole curative fungicides'
      ]
    },
    recoveryEstimateDays: 18,
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80'
  }
];

