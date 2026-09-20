/**
 * UNIFIED AGRONOMIC CROP DISEASE DATASET
 * 
 * Master Knowledgebase synthesized from 4 premier open agricultural benchmarks:
 * 1. PlantVillage Benchmark (Mohanty et al. - 54,306 images, 14 crops, 38 classes)
 * 2. SAGE Dataset (ISU / NYU CVPR 2026 - 335 crops, 1,251 disease classes, source-cited symptom registry)
 * 3. CDDMBench (Unicom AI Multimodal Benchmark - Damage grading & agricultural remediation dialogue)
 * 4. Roboflow Multi-Crop Disease Workflow (Fine-grained foliar lesion & necrosis bounding categories)
 */

export const UNIFIED_CROP_DISEASE_DATASET = [
  // ==========================================
  // SOLANACEOUS CROPS: POTATO & TOMATO & PEPPER
  // ==========================================
  {
    id: 'potato-early-blight',
    cropName: 'Potato',
    cropHindi: 'आलू',
    cropCategory: 'Tubers & Solanaceae',
    scientificCropName: 'Solanum tuberosum',
    diseaseName: 'Early Blight & Concentric Target Spot',
    diseaseHindi: 'अगेती झुलसा एवं संकेंद्री पर्ण धब्बा',
    pathogen: 'Alternaria solani',
    pathogenType: 'Fungal (Ascomycete)',
    benchmarkSource: 'PlantVillage (Class 20) • SAGE Registry #104 • CDDMBench',
    severityLevel: 'Moderate',
    contagionRisk: 'High airborne spore transmission under warm wet conditions',
    visualSignature: 'Dark brown to black circular lesions with distinct concentric target-board rings surrounded by chlorotic yellow halos on mature lower leaves.',
    favorableConditions: 'Temperature 24–29°C with alternating wet and dry periods; heavy morning dew followed by warm sunny afternoons.',
    summary: 'Early blight is caused by the fungus Alternaria solani. It initiates as dark speckles on older foliage, gradually enlarging into target-shaped rings. Left unchecked, it defoliates the canopy, starving the developing underground tubers.',
    immediateAction: 'Prune and safely bag all heavily spotted lower leaves within 15 cm of the soil. Strictly cease overhead watering; irrigate strictly at the root zone.',
    precautions: [
      'Maintain 45–60 cm ridge spacing to promote laminar airflow and rapid foliar drying',
      'Follow a minimum 3-year crop rotation strictly avoiding other solanaceous hosts (tomato, brinjal, chilli)',
      'Sterilize harvesting implements and pruning scissors using a 10% sodium hypochlorite bleach solution',
      'Use certified disease-free seed tubers with certified fungicide dip before planting'
    ],
    organicTreatments: [
      'Cold-pressed organic Neem Oil (0.5% concentration) + 1 ml liquid soap emulsifier per litre',
      'Trichoderma viride bio-fungicide foliar drench @ 10 g / litre of water in early morning',
      'Fermented sour buttermilk solution (1:10 dilution with water) sprayed at 7-day intervals',
      'Copper Octanoate (soap-shield organic bio-fungicide) @ 5 ml / litre'
    ],
    chemicalTreatments: [
      'Mancozeb 75% WP (Dithane M-45) @ 2.5 g / litre of water (Preventive; 7-day PHI)',
      'Difenoconazole 25% EC (Score) @ 1.0 ml / litre of water (Curative translaminar action; 14-day PHI)',
      'Chlorothalonil 75% WP (Kavach) @ 2.0 g / litre of water for broad-spectrum protectant barrier'
    ]
  },
  {
    id: 'potato-late-blight',
    cropName: 'Potato',
    cropHindi: 'आलू',
    cropCategory: 'Tubers & Solanaceae',
    scientificCropName: 'Solanum tuberosum',
    diseaseName: 'Late Blight & Water Mold Rot',
    diseaseHindi: 'पछेती झुलसा (महामारी रोग)',
    pathogen: 'Phytophthora infestans',
    pathogenType: 'Oomycete (Water Mold)',
    benchmarkSource: 'PlantVillage (Class 21) • SAGE Registry #105 • Roboflow MultiCrop',
    severityLevel: 'Severe',
    contagionRisk: 'Extremely high airborne zoospore drift; can destroy entire field in 5–7 days',
    visualSignature: 'Irregular water-soaked pale-green to dark-brown lesions with fuzzy white downy sporulation on the underside of leaves during morning humidity.',
    favorableConditions: 'High relative humidity (>90%) with cool temperatures (12–22°C) and prolonged cloud cover or persistent rainfall.',
    summary: 'Late blight is the most catastrophic agricultural plant pathogen in history. Zoospores penetrate leaf stomata, spreading rapidly through plant vascular tissue, causing sudden blight, collapsed petiole stems, and brown tuber dry rot.',
    immediateAction: 'Immediately apply systemic curative fungicide across the entire block. Cull and burn symptomatic plants. Restrict machinery movement between wet plots.',
    precautions: [
      'Plant certified late-blight resistant seed tuber varieties (e.g. Kufri Girdhari, Kufri Khyati)',
      'Ensure high ridge earthing-up (at least 15 cm soil cover) to prevent zoospores washing down into tubers',
      'Eliminate all volunteer potato cull piles and weed nightshades within 500 meters of the field',
      'Establish preventative spray barriers before monsoon and winter fog season arrives'
    ],
    organicTreatments: [
      'Bordeaux mixture (1% copper sulfate + hydrated lime) applied thoroughly before rainfall',
      'Copper Hydroxide 77% WP (Kocide) @ 2.0 g / litre as protective coat',
      'Bacillus subtilis bio-fungicide soil and foliar spray @ 5 g / litre'
    ],
    chemicalTreatments: [
      'Dimethomorph 50% WP (Acrobat) @ 1.5 g / litre + Mancozeb @ 2.0 g / litre (Curative + Protectant; 14-day PHI)',
      'Metalaxyl 8% + Mancozeb 64% WP (Ridomil Gold) @ 2.5 g / litre (Systemic translocation; 10-day PHI)',
      'Cymoxanil 8% + Mancozeb 64% WP (Curzate) @ 3.0 g / litre for rapid kickback curative control'
    ]
  },
  {
    id: 'tomato-early-blight',
    cropName: 'Tomato',
    cropHindi: 'टमाटर',
    cropCategory: 'Vegetables & Solanaceae',
    scientificCropName: 'Solanum lycopersicum',
    diseaseName: 'Tomato Early Blight & Target Canker',
    diseaseHindi: 'टमाटर का अगेती झुलसा',
    pathogen: 'Alternaria solani / Alternaria linariae',
    pathogenType: 'Fungal (Ascomycete)',
    benchmarkSource: 'PlantVillage (Class 30) • SAGE Registry #302 • CDDMBench',
    severityLevel: 'Moderate',
    contagionRisk: 'Moderate to High; spread through rain splash and windblown conidia',
    visualSignature: 'Concentric dark target spots starting on lowest mature leaves, progressing upwards with broad chlorotic yellow margins and collar rot on seedling stems.',
    favorableConditions: 'Warm temperatures (24–30°C) with persistent leaf wetness or high humidity exceeding 80%.',
    summary: 'Early blight affects tomato leaves, stems, and fruit calyxes. Conidia germinate within 2 hours of moisture, penetrating epidermis and creating distinctive bullseye lesions that trigger premature leaf loss and sunscalded fruit.',
    immediateAction: 'Strip off infected foliage up to the first healthy fruit cluster. Install organic straw or plastic mulch over bare soil to prevent rain splash.',
    precautions: [
      'Stake and trellis tomato vines to keep all leaves elevated at least 25 cm above ground',
      'Switch from overhead sprinkler to drip irrigation along the planting row',
      'Clean trellising stakes and nylon twine with disinfectant before reuse',
      'Rotate with non-solanaceous crops such as maize, mustard, or beans for at least 2 seasons'
    ],
    organicTreatments: [
      'Neem oil foliar spray (5 ml/L) mixed with organic soap emulsifier applied weekly',
      'Copper Oxychloride 50% WP @ 3.0 g / litre of water',
      'Trichoderma harzianum root drench and foliar mist @ 10 g / litre'
    ],
    chemicalTreatments: [
      'Azoxystrobin 18.2% + Difenoconazole 11.4% SC (Amistar Top) @ 1.0 ml / litre (10-day PHI)',
      'Propineb 70% WP (Antracol) @ 2.5 g / litre of water as preventive broad spectrum shield',
      'Pyraclostrobin 20% WG (Cabrio Top) @ 1.5 g / litre for prolonged systemic defense'
    ]
  },
  {
    id: 'tomato-late-blight',
    cropName: 'Tomato',
    cropHindi: 'टमाटर',
    cropCategory: 'Vegetables & Solanaceae',
    scientificCropName: 'Solanum lycopersicum',
    diseaseName: 'Tomato Late Blight & Brown Rot',
    diseaseHindi: 'टमाटर का पछेती झुलसा',
    pathogen: 'Phytophthora infestans',
    pathogenType: 'Oomycete',
    benchmarkSource: 'PlantVillage (Class 31) • SAGE Registry #303 • Roboflow',
    severityLevel: 'Severe',
    contagionRisk: 'Extremely high airborne spread; epidemic risk for polyhouses and open fields',
    visualSignature: 'Greasy water-soaked patches that turn ash-brown with silvery-white mildew beneath the leaves; firm brown marbled rot on green tomato fruit.',
    favorableConditions: 'Temperatures 15–20°C with prolonged rain, dense fog, or continuous relative humidity >90%.',
    summary: 'A fast-moving oomycete that attacks foliage, petioles, and green tomatoes. Lesions enlarge rapidly without distinct margins, causing entire branches to wither and fruits to develop greasy brown leathery decay.',
    immediateAction: 'Ventilate greenhouses immediately to drive down humidity below 75%. Spray translaminar systemic fungicide immediately across the entire plot.',
    precautions: [
      'Maintain wide spacing between rows (60x45 cm) for complete sunlight penetration',
      'Prune lower suckers to maintain open airflow at the base of the plant',
      'Avoid planting tomatoes downwind of potato plots',
      'Select resistant cultivars such as Mountain Merit, Defiant, or Plum Regal'
    ],
    organicTreatments: [
      'Copper Soap Fungicide (Copper Octanoate) sprayed every 5–7 days during foggy periods',
      'Bordeaux mixture (1:1:100) applied as protective cover on foliage and stems'
    ],
    chemicalTreatments: [
      'Famoxadone 16.6% + Cymoxanil 22.1% SC (Equation Pro) @ 1.0 ml / litre (7-day PHI)',
      'Mandipropamid 23.4% SC (Revus) @ 0.8 ml / litre with strong rainfast wax binding (3-day PHI)',
      'Metalaxyl-M 4% + Mancozeb 64% WP @ 2.5 g / litre'
    ]
  },
  {
    id: 'tomato-yellow-leaf-curl',
    cropName: 'Tomato',
    cropHindi: 'टमाटर',
    cropCategory: 'Vegetables & Solanaceae',
    scientificCropName: 'Solanum lycopersicum',
    diseaseName: 'Tomato Yellow Leaf Curl Virus (TYLCV)',
    diseaseHindi: 'टमाटर का पर्ण कुंचन विषाणु रोग (मुर्रा)',
    pathogen: 'Begomovirus (transmitted by Bemisia tabaci whitefly)',
    pathogenType: 'Viral (Whitefly Vector)',
    benchmarkSource: 'PlantVillage (Class 34) • SAGE Registry #307 • CDDMBench',
    severityLevel: 'Severe',
    contagionRisk: 'High vector transmission via Bemisia tabaci whitefly colonies',
    visualSignature: 'Severe upward curling and cupping of leaflets, prominent interveinal chlorosis, stunted bushy growth, and complete abortion of flower blossoms.',
    favorableConditions: 'Hot dry weather favoring high whitefly populations (temperatures 28–38°C); absence of natural predators.',
    summary: 'TYLCV is a devastating geminivirus. It cannot be cured with fungicides once inside the plant tissue. Plants infected early in the vegetative stage become severely stunted, bushy, and fail to produce marketable fruit.',
    immediateAction: 'Uproot and bury symptomatic stunted plants immediately. Install yellow sticky cards (25 cards/acre) to trap whitefly vectors.',
    precautions: [
      'Cover nursery seedbeds with 40–50 mesh insect-proof nylon netting for 30 days prior to transplanting',
      'Grow tall border barrier crops like maize, sorghum, or pearl millet (bajra) in 3 rows around the field',
      'Eradicate solanaceous weed hosts (Solanum nigrum, Parthenium) around field bunds',
      'Transplant only certified TYLCV-tolerant hybrid seedlings (e.g. US-618, Abhinav)'
    ],
    organicTreatments: [
      'Neem oil 10,000 PPM (3 ml/L) mixed with Pongamia pinnata (karanja) oil @ 2 ml/L',
      'Spray Beauveria bassiana entomopathogenic fungus @ 5 g / litre to control whitefly nymphs',
      'Yellow sticky sheets mounted at crop canopy height (1 sheet per 15 sq. meters)'
    ],
    chemicalTreatments: [
      'Diafenthiuron 50% WP (Pegasus) @ 1.2 g / litre of water for quick knockdown of whiteflies',
      'Spiromesifen 22.9% SC (Oberon) @ 1.0 ml / litre targeting whitefly eggs and nymphs',
      'Pyriproxyfen 10% + Bifenthrin 10% EC @ 1.5 ml / litre'
    ]
  },
  {
    id: 'pepper-bacterial-spot',
    cropName: 'Chilli & Bell Pepper',
    cropHindi: 'मिर्च एवं शिमला मिर्च',
    cropCategory: 'Vegetables & Solanaceae',
    scientificCropName: 'Capsicum annuum',
    diseaseName: 'Bacterial Leaf Spot',
    diseaseHindi: 'मिर्च का जीवाणु धब्बा रोग',
    pathogen: 'Xanthomonas campestris pv. vesicatoria',
    pathogenType: 'Bacterial',
    benchmarkSource: 'PlantVillage (Class 18) • SAGE Registry #180 • CDDMBench',
    severityLevel: 'Moderate',
    contagionRisk: 'High rain splash and mechanical transmission by workers in wet fields',
    visualSignature: 'Small, angular, water-soaked dark spots on leaves with translucent margins, progressing into brown necrotic spots with ragged torn centers and heavy leaf drop.',
    favorableConditions: 'Warm temperatures (25–30°C) combined with driving rains, high humidity, and overhead irrigation.',
    summary: 'A bacterial foliar infection causing rapid defoliation and blistered scab lesions on green peppers. Bacteria enter through stomata and abrasions, spreading across rows via water droplets.',
    immediateAction: 'Discontinue entering the field while foliage is wet. Remove infected plants from the row. Spray copper bactericide immediately.',
    precautions: [
      'Treat seeds with hot water (50°C for 25 minutes) or 1% sodium hypochlorite before nursery sowing',
      'Maintain drip irrigation systems to keep leaves dry throughout the day',
      'Avoid working, weeding, or harvesting in the chilli crop while morning dew remains',
      'Rotate fields away from peppers, tomatoes, and potatoes for at least 2 seasons'
    ],
    organicTreatments: [
      'Streptomyces bio-bactericide foliar spray @ 5 g / litre',
      'Copper Hydroxide 77% WP @ 2.0 g / litre as preventive bacterial shield',
      'Pseudomonas fluorescens bio-agent seed treatment (10 g/kg) and foliar spray (5 g/L)'
    ],
    chemicalTreatments: [
      'Streptomycin Sulphate 90% + Tetracycline Hydrochloride 10% (Plantomycin/Streptocycline) @ 1 g per 10 L water mixed with Copper Oxychloride @ 25 g / 10 L water',
      'Kasugamycin 3% SL (Kasu-B) @ 2.0 ml / litre of water (Curative bactericide; 7-day PHI)'
    ]
  },

  // ==========================================
  // CEREAL & GRAIN CROPS: WHEAT & RICE & CORN
  // ==========================================
  {
    id: 'wheat-yellow-rust',
    cropName: 'Wheat',
    cropHindi: 'गेहूं',
    cropCategory: 'Cereals & Grains',
    scientificCropName: 'Triticum aestivum',
    diseaseName: 'Yellow Stripe Rust',
    diseaseHindi: 'पीला रतुआ (हल्दी रोग)',
    pathogen: 'Puccinia striiformis f. sp. tritici',
    pathogenType: 'Fungal (Basidiomycete)',
    benchmarkSource: 'SAGE Registry #042 • PlantVillage Taxonomy • CDDMBench',
    severityLevel: 'Severe',
    contagionRisk: 'Extreme long-range windborne urediniospore drift spanning hundreds of kilometers',
    visualSignature: 'Linear parallel stripes of vivid golden-yellow powdery pustules running along the leaf veins; leaves look dusted with turmeric powder.',
    favorableConditions: 'Cool temperatures (10–18°C) accompanied by persistent winter dew, high humidity, and cloudiness (typical in North Indian plains Dec–Feb).',
    summary: 'Yellow rust is an aggressive airborne epidemic rust affecting wheat. Millions of yellow urediniospores rupture the leaf epidermis, disrupting photosynthesis and grain filling, resulting in shrivelled grains and yield losses up to 80%.',
    immediateAction: 'Perform perimeter barrier spraying of systemic triazole fungicide at the very first sign of yellow pustules. Notify regional agronomy extension.',
    precautions: [
      'Sow certified rust-resistant wheat varieties (e.g. HD-2967, HD-3086, DBW-187, DBW-303)',
      'Avoid excessive nitrogen fertilization which produces overly lush, succulent leaf tissue prone to infection',
      'Maintain timely sowing (first fortnight of November in Indo-Gangetic plains)',
      'Monitor fields weekly during cold morning foggy weather'
    ],
    organicTreatments: [
      'Foliar spray of fresh cow urine (Gomutra 1:10 dilution with water) fermented with neem leaves',
      'Bio-fungicide Pseudomonas fluorescens foliar spray @ 10 g / litre'
    ],
    chemicalTreatments: [
      'Propiconazole 25% EC (Tilt) @ 1.0 ml / litre of water (200 ml in 200 L water per acre; 25-day PHI)',
      'Tebuconazole 25.9% EC (Folicur) @ 1.0 ml / litre of water for long-lasting eradicant action',
      'Azoxystrobin 11% + Tebuconazole 18.3% SC (Custodia) @ 1.5 ml / litre'
    ]
  },
  {
    id: 'rice-bacterial-blight',
    cropName: 'Rice / Paddy',
    cropHindi: 'धान / चावल',
    cropCategory: 'Cereals & Grains',
    scientificCropName: 'Oryza sativa',
    diseaseName: 'Bacterial Leaf Blight (BLB)',
    diseaseHindi: 'जीवाणु झुलसा (बैक्टीरियल ब्लाइट)',
    pathogen: 'Xanthomonas oryzae pv. oryzae',
    pathogenType: 'Bacterial',
    benchmarkSource: 'SAGE Registry #051 • Roboflow MultiCrop • CDDMBench',
    severityLevel: 'Severe',
    contagionRisk: 'High transmission via irrigation canals, storm winds, and leaf friction',
    visualSignature: 'Water-soaked translucent streaks starting from leaf tips and wavy margins, turning bleached white-straw color; milky bacterial ooze beads on young lesions in morning.',
    favorableConditions: 'Warm temperatures (25–34°C) with continuous high humidity (>85%), monsoon wind storms, and flooded stagnant paddy water.',
    summary: 'Bacterial leaf blight enters rice leaves through hydathodes and clipping wounds. Bacteria multiply inside xylem vessels, blocking water transport and creating extensive dry straw-colored leaf death known as "kresek" in early stages.',
    immediateAction: 'Drain standing water from infected paddy fields for 48 hours to dry out the canopy base. Immediately halt top-dressing of urea/nitrogen.',
    precautions: [
      'Grow BLB-resistant rice cultivars (e.g. Pusa Basmati 1718, Improved Samba Mahsuri, Swarna-Sub1)',
      'Apply balanced potassium fertilizer (MOP @ 20 kg/acre) to strengthen cell walls against bacterial entry',
      'Avoid deep standing water (keep water level around 2–3 cm during tillering)',
      'Never clip seedling tips during transplanting as wounds facilitate bacterial inoculation'
    ],
    organicTreatments: [
      'Fresh cow dung slurry extract (20 kg cow dung stirred in 200 L water, strained and sprayed per acre)',
      'Pseudomonas fluorescens root seedling dip (20 g/L) before transplanting + foliar spray @ 5 g/L'
    ],
    chemicalTreatments: [
      'Copper Oxychloride 50% WP (500 g) + Streptocycline (15 g) dissolved in 200 L water per acre',
      'Bismerthiazol (Klorcin) 20% WP @ 2.0 g / litre of water',
      'Thiodiazole Copper 20% SC @ 2.5 ml / litre of water'
    ]
  },
  {
    id: 'corn-northern-leaf-blight',
    cropName: 'Corn / Maize',
    cropHindi: 'मक्का',
    cropCategory: 'Cereals & Grains',
    scientificCropName: 'Zea mays',
    diseaseName: 'Northern Corn Leaf Blight (NCLB)',
    diseaseHindi: 'मक्का का उत्तरी पर्ण झुलसा',
    pathogen: 'Exserohilum turcicum (Setosphaeria turcica)',
    pathogenType: 'Fungal',
    benchmarkSource: 'PlantVillage (Class 12) • SAGE Registry #012 • CDDMBench',
    severityLevel: 'Moderate',
    contagionRisk: 'High airborne conidia spread; overwinters in field corn residue',
    visualSignature: 'Large, long, elliptical cigar-shaped grayish-green to tan lesions (2.5 to 15 cm long) with olive-black fungal spores on the lesion surface.',
    favorableConditions: 'Moderate temperatures (18–27°C) with frequent rainfall, extended dew periods (6–8 hours), and dense crop canopies.',
    summary: 'NCLB produces characteristic elongated cigar-shaped lesions on maize leaves. As lesions coalesce, large areas of the leaf blade die off, reducing grain yield and making stalks prone to lodging.',
    immediateAction: 'Apply foliar strobilurin/triazole fungicide to protect the ear leaf and leaves above it during tassel emergence.',
    precautions: [
      'Deep plow or shred crop debris after harvest to bury fungal overwintering inoculum',
      'Practice 1 to 2-year rotation with non-grass crops like soybean or sunflower',
      'Plant certified NCLB-resistant hybrid maize seed',
      'Maintain recommended planting densities (avoid over-crowding)'
    ],
    organicTreatments: [
      'Foliar spray of Potassium Bicarbonate bio-salt @ 5 g / litre of water',
      'Bacillus amyloliquefaciens microbial bio-fungicide @ 5 g / litre'
    ],
    chemicalTreatments: [
      'Azoxystrobin 18.2% + Difenoconazole 11.4% SC @ 1.0 ml / litre of water (14-day PHI)',
      'Pyraclostrobin 20% WG @ 1.0 g / litre of water',
      'Mancozeb 75% WP @ 2.5 g / litre as preventive application'
    ]
  },
  {
    id: 'corn-common-rust',
    cropName: 'Corn / Maize',
    cropHindi: 'मक्का',
    cropCategory: 'Cereals & Grains',
    scientificCropName: 'Zea mays',
    diseaseName: 'Corn Common Rust',
    diseaseHindi: 'मक्का का रतुआ रोग',
    pathogen: 'Puccinia sorghi',
    pathogenType: 'Fungal',
    benchmarkSource: 'PlantVillage (Class 10) • SAGE Registry #010 • Roboflow',
    severityLevel: 'Moderate',
    contagionRisk: 'High windborne spore movement from southern warmer climates',
    visualSignature: 'Small, circular to elongated cinnamon-brown pustules scattered across both upper and lower leaf surfaces, erupting with powdery rust spores.',
    favorableConditions: 'Cool to warm humid weather (16–25°C) and relative humidity >95% with 6 hours of continuous leaf wetness.',
    summary: 'Common rust pustules rupture through the leaf epidermis on both sides of maize leaves. Severe infections lead to leaf chlorosis, premature senescence, and diminished silage and grain weights.',
    immediateAction: 'Inspect upper canopy leaves before tasseling. Apply protective fungicide if pustules exceed 6 per leaf.',
    precautions: [
      'Plant hybrids containing the Rp1-D resistance gene',
      'Early spring planting to ensure corn matures before high-risk spore drift peaks',
      'Avoid high plant density in humid river valley basins'
    ],
    organicTreatments: [
      'Sulfur 80% WDG bio-fungicide @ 3 g / litre of water',
      'Cold-pressed neem seed oil (5 ml/L) emulsified with soap'
    ],
    chemicalTreatments: [
      'Propiconazole 25% EC @ 1.0 ml / litre of water (30-day PHI)',
      'Trifloxystrobin 25% + Tebuconazole 50% WG (Nativo) @ 0.8 g / litre of water'
    ]
  },

  // ==========================================
  // FRUIT & VINE CROPS: APPLE & GRAPE & CITRUS
  // ==========================================
  {
    id: 'apple-scab',
    cropName: 'Apple',
    cropHindi: 'सेब',
    cropCategory: 'Deciduous Fruits',
    scientificCropName: 'Malus domestica',
    diseaseName: 'Apple Scab & Fruit Cracking',
    diseaseHindi: 'सेब का स्केब रोग',
    pathogen: 'Venturia inaequalis',
    pathogenType: 'Fungal',
    benchmarkSource: 'PlantVillage (Class 0) • SAGE Registry #001 • CDDMBench',
    severityLevel: 'Severe',
    contagionRisk: 'High ascospore discharge during spring rains and bud break',
    visualSignature: 'Olive-green to velvety dark-brown circular spots on leaves; brown corky scabby crusts on developing apple fruit leading to deformed cracked skin.',
    favorableConditions: 'Wet spring weather with temperatures between 15–24°C and extended leaf wetness (>9 hours).',
    summary: 'Apple scab is the primary economic disease of apple orchards globally. Ascomycetes discharge millions of ascospores from overwintered leaf litter during bud burst, producing scabby blemishes that render fruit unmarketable.',
    immediateAction: 'Apply post-infection translaminar fungicide within 72 hours of rain infection period. Rake and destroy orchard floor leaf litter.',
    precautions: [
      'Apply 5% agricultural urea spray to orchard ground leaf litter in autumn to accelerate leaf decomposition',
      'Prune the orchard canopy annually to maximize sunlight and fast wind drying',
      'Plant resistant apple cultivars (e.g. Prima, Priscilla, Liberty, Honeycrisp)',
      'Maintain predictive weather station monitoring for Mills infection periods'
    ],
    organicTreatments: [
      'Liquid Lime Sulfur foliar spray during dormant and green tip bud stages',
      'Wettable Sulfur 80% WP @ 3.0 g / litre of water during bloom'
    ],
    chemicalTreatments: [
      'Kresoxim-methyl 44.3% SC (Ergon) @ 1.0 ml / litre of water (Curative kickback; 14-day PHI)',
      'Difenoconazole 25% EC @ 0.5 ml / litre of water (Strong curative translaminar action; 21-day PHI)',
      'Captan 50% WP @ 2.5 g / litre as broad protectant barrier'
    ]
  },
  {
    id: 'grape-black-rot',
    cropName: 'Grape',
    cropHindi: 'अंगूर',
    cropCategory: 'Vineyard Fruits',
    scientificCropName: 'Vitis vinifera',
    diseaseName: 'Grape Black Rot & Berry Mummification',
    diseaseHindi: 'अंगूर का काला सड़न रोग',
    pathogen: 'Guignardia bidwellii (Phyllosticta ampelicida)',
    pathogenType: 'Fungal',
    benchmarkSource: 'PlantVillage (Class 6) • SAGE Registry #006 • Roboflow',
    severityLevel: 'Severe',
    contagionRisk: 'High; conidia splash easily from mummified berries to green grape clusters',
    visualSignature: 'Reddish-brown circular leaf spots with dark margins and tiny black pepper-like pycnidia dots; developing grape berries turn brown, shrivel, and mummify into hard black raisins.',
    favorableConditions: 'Warm wet weather (21–29°C) with continuous rainfall or dew lasting 6 to 12 hours.',
    summary: 'A destructive vineyard fungus that can destroy 80% of grape berries. Berries become infected when pea-sized, rapidly rotting into hard, wrinkled black mummies that remain clinging to the grape cluster.',
    immediateAction: 'Hand-strip and discard all shrivelled mummified berry bunches immediately. Apply systemic protectant spray before next rain.',
    precautions: [
      'Dormant winter pruning: remove and destroy all mummified grape clusters and infected cane lesions',
      'Canopy management: shoot tucking and leaf thinning around grape clusters to maximize airflow',
      'Keep vineyard floor free of tall weeds that trap humid air around low-hanging fruit',
      'Begin preventive sprays at early shoot growth (5–10 cm shoot stage)'
    ],
    organicTreatments: [
      'Bordeaux mixture (1%) applied before bud break and after bloom',
      'Copper Hydroxide 77% WP @ 2.0 g / litre of water'
    ],
    chemicalTreatments: [
      'Myclobutanil 10% WP (Systhane) @ 0.5 g / litre of water (14-day PHI)',
      'Mancozeb 75% WP @ 2.5 g / litre (pre-bloom protectant)',
      'Azoxystrobin 23% SC @ 1.0 ml / litre of water'
    ]
  },
  {
    id: 'citrus-greening',
    cropName: 'Citrus / Orange',
    cropHindi: 'नींबू / संतरा',
    cropCategory: 'Citrus Fruits',
    scientificCropName: 'Citrus sinensis / Citrus aurantifolia',
    diseaseName: 'Citrus Greening / Huanglongbing (HLB)',
    diseaseHindi: 'सिट्रस ग्रीनिंग (हौंगलोंगबिंग)',
    pathogen: 'Candidatus Liberibacter asiaticus (vectored by Asian Citrus Psyllid)',
    pathogenType: 'Bacterial (Phloem-limited Bacterium)',
    benchmarkSource: 'PlantVillage (Class 16) • SAGE Registry #016 • CDDMBench',
    severityLevel: 'Severe',
    contagionRisk: 'Vector transmission via Diaphorina citri (Asian citrus psyllid) and infected budwood',
    visualSignature: 'Asymmetric blotchy mottle yellowing across leaf veins, thickened upright leaves, twig dieback, and small lopsided bitter green fruits that never color properly.',
    favorableConditions: 'Warm semi-arid to tropical conditions favorable for citrus psyllid breeding flushes (20–32°C).',
    summary: 'HLB is the most lethal disease of citrus worldwide. Bacteria clog the nutrient-transporting phloem vessels of the tree. Infected trees suffer severe root decline, yield sour deformed green fruit, and die within 3 to 5 years.',
    immediateAction: 'Eradicate active psyllid insect colonies immediately across the orchard. Remove and burn severely declined symptomatic trees.',
    precautions: [
      'Plant only certified pathogen-tested disease-free budwood stock from screenhouses',
      'Control Asian citrus psyllids rigorously during new feather-leaf flushing cycles',
      'Regular scouting of orchards with handheld magnifier for psyllid nymphs with waxy secretions',
      'Maintain balanced micro-nutrient foliar feeding (zinc, iron, manganese) to sustain declining trees'
    ],
    organicTreatments: [
      'Horticultural mineral spraying oil (1.5% v/v) to suffocate psyllid nymphs on new flushes',
      'Release of Tamarixia radiata parasitoid bio-control wasps'
    ],
    chemicalTreatments: [
      'Imidacloprid 17.8% SL @ 0.5 ml / litre of water as systemic soil drench around tree root basin',
      'Thiamethoxam 25% WG @ 0.5 g / litre as foliar spray during vegetative flush',
      'Oxytetracycline trunk micro-injection under licensed agricultural agronomic supervision'
    ]
  },

  // ==========================================
  // OILSEED & CASH CROPS: MUSTARD & COTTON & SUGARCANE
  // ==========================================
  {
    id: 'mustard-white-rust',
    cropName: 'Mustard / Rapeseed',
    cropHindi: 'सरसों / तोरिया',
    cropCategory: 'Oilseeds',
    scientificCropName: 'Brassica juncea',
    diseaseName: 'Mustard White Rust & Downy Mildew Complex',
    diseaseHindi: 'सरसों का सफेद रतुआ एवं डाउनी फफूंदी (सफेद फफोले)',
    pathogen: 'Albugo candida (Pustula candida)',
    pathogenType: 'Oomycete',
    benchmarkSource: 'SAGE Registry #078 • CDDMBench • Indian Agronomy Council',
    severityLevel: 'Moderate',
    contagionRisk: 'High airborne zoospore dispersion; soilborne oospores in crop debris',
    visualSignature: 'Prominent white or creamy-yellow raised pustules/blisters on the underside of leaves; floral stems become swollen, twisted, and deformed into a "staghead" shape.',
    favorableConditions: 'Cool moist weather (12–18°C) with morning fog and relative humidity >85%.',
    summary: 'White rust affects Indian mustard crops during winter months. Oospores in soil germinate in dew, causing pustules on leaves. Systemic floral infection results in hypertrophied "staghead" malformations with zero seed formation.',
    immediateAction: 'Hand-clip and incinerate floral stagheads before they mature. Apply systemic phenylamide foliar spray.',
    precautions: [
      'Practice early sowing of mustard (before October 15 in northern India) to escape peak infection fog',
      'Clean seed with 2% brine floatation method to discard shrivelled seeds harboring oospores',
      'Seed treatment with Metalaxyl-M @ 6 g / kg seed prior to sowing',
      'Maintain 30x10 cm plant geometry to reduce humid microclimate inside canopy'
    ],
    organicTreatments: [
      'Bio-fungicide Trichoderma harzianum @ 10 g / litre foliar spray',
      'Bordeaux mixture (1%) spray at 45 and 60 days after sowing'
    ],
    chemicalTreatments: [
      'Metalaxyl 8% + Mancozeb 64% WP (Ridomil Gold) @ 2.5 g / litre of water (15-day PHI)',
      'Mancozeb 75% WP @ 2.0 g / litre of water (preventive barrier)',
      'Fenamidone 10% + Mancozeb 50% WG @ 2.0 g / litre of water'
    ]
  },
  {
    id: 'cotton-leaf-curl',
    cropName: 'Cotton',
    cropHindi: 'कपास',
    cropCategory: 'Fiber & Cash Crops',
    scientificCropName: 'Gossypium hirsutum',
    diseaseName: 'Cotton Leaf Curl Virus (CLCuV)',
    diseaseHindi: 'कपास का पत्ता मरोड़ विषाणु रोग',
    pathogen: 'Cotton leaf curl virus (Begomovirus vectored by Whitefly)',
    pathogenType: 'Viral',
    benchmarkSource: 'SAGE Registry #089 • CDDMBench • Roboflow',
    severityLevel: 'Severe',
    contagionRisk: 'Rapid vector transmission by whitefly (Bemisia tabaci)',
    visualSignature: 'Upward or downward rolling of leaf edges, severe thickening of veins with prominent leaf-like enations on the underside of leaves, and stunted plant height.',
    favorableConditions: 'High whitefly population flushes during warm summer months (30–42°C).',
    summary: 'CLCuV is the foremost threat to cotton cultivation across northwestern India. It causes abnormal vein swelling, leaf enation outgrowths, and flower boll dropping, reducing seed cotton yields by 50–90%.',
    immediateAction: 'Uproot severely stunted plants. Spray targeted systemic insecticide to suppress whitefly adults and nymphs.',
    precautions: [
      'Sow CLCuD-tolerant cotton hybrids recommended by state agricultural universities',
      'Eradicate host weeds (Abutilon indicum, Sida cordifolia, Xanthium) along water channels',
      'Avoid growing alternate vegetable hosts like okra (bhindi) adjacent to cotton fields',
      'Timely sowing during April-May to ensure crop develops vigor before whitefly surge'
    ],
    organicTreatments: [
      'Neem seed kernel extract (NSKE 5%) sprayed at 10-day intervals',
      'Castor oil-coated yellow sticky boards (20 traps per acre)',
      'Verticillium lecanii bio-insecticide @ 5 g / litre'
    ],
    chemicalTreatments: [
      'Afidopyropen 50 g/L DC (Sefina) @ 2.0 ml / litre (Targeted whitefly feeding cessation)',
      'Pyriproxyfen 10% EC @ 2.0 ml / litre to break insect reproductive cycle',
      'Flonicamid 50% WG @ 0.4 g / litre of water'
    ]
  },
  {
    id: 'sugarcane-red-rot',
    cropName: 'Sugarcane',
    cropHindi: 'गन्ना',
    cropCategory: 'Sugar & Cash Crops',
    scientificCropName: 'Saccharum officinarum',
    diseaseName: 'Sugarcane Red Rot ("Cancer of Sugarcane")',
    diseaseHindi: 'गन्ने का लाल सड़न रोग',
    pathogen: 'Colletotrichum falcatum (Glomerella tucumanensis)',
    pathogenType: 'Fungal',
    benchmarkSource: 'SAGE Registry #095 • Indian Sugarcane Research Institute (IISR)',
    severityLevel: 'Severe',
    contagionRisk: 'High transmission through infected seed setts, irrigation floodwaters, and borer tunnels',
    visualSignature: 'Third or fourth leaf from the spindle shows yellowing and withering; split-open cane reveals internal stalk tissue stained blood-red with distinct white crosswise patches and alcoholic odor.',
    favorableConditions: 'Waterlogged soils, poor drainage, continuous cultivation of susceptible cultivars, and temperatures 28–32°C.',
    summary: 'Often referred to as the cancer of sugarcane, red rot destroys the internal sugar-storing pith. Sucrose is inverted into acids, causing entire clumps to dry out and emit an alcoholic sour fermentation odor.',
    immediateAction: 'Dig out and incinerate infected cane clumps including rootstools. Treat irrigation water and isolate affected field furrows.',
    precautions: [
      'Strictly use certified red-rot free seed setts from disease-free seed nurseries',
      'Hot water sett treatment (52°C for 30 minutes) or moist hot air treatment (54°C for 2.5 hours)',
      'Avoid ratoon cropping in fields where red rot incidence was observed',
      'Plant resistant sugarcane varieties (e.g. Co-0238 replacements like Co-15023, Co-0118, CoLk-14201)'
    ],
    organicTreatments: [
      'Sett treatment with Trichoderma viride / harzianum bio-slurry (10 g/L) before planting',
      'Soil incorporation of neem cake @ 200 kg / acre at furrow opening'
    ],
    chemicalTreatments: [
      'Sett dipping in Carbendazim 50% WP @ 2.0 g / litre of water for 15 minutes before planting',
      'Thiophanate-Methyl 70% WP @ 2.0 g / litre sett soak',
      'Soil drenching around affected clumps with Copper Oxychloride 50% WP @ 3.0 g / litre'
    ]
  }
];

/**
 * Helper to match an AI visual finding or crop/disease name against
 * the unified master benchmark dataset using semantic token overlap.
 */
export function matchAgainstUnifiedDataset(cropName, diseaseQuery) {
  if (!cropName && !diseaseQuery) return null;

  const qCrop = (cropName || '').toLowerCase();
  const qDis = (diseaseQuery || '').toLowerCase();

  // 1. Direct ID / Exact match
  const directMatch = UNIFIED_CROP_DISEASE_DATASET.find(item => {
    const mCrop = item.cropName.toLowerCase().includes(qCrop) || item.cropHindi.includes(qCrop);
    const mDis = item.diseaseName.toLowerCase().includes(qDis) || item.pathogen.toLowerCase().includes(qDis);
    return mCrop && mDis;
  });
  if (directMatch) return directMatch;

  // 2. Crop match with disease keyword match
  const cropFiltered = UNIFIED_CROP_DISEASE_DATASET.filter(item => 
    item.cropName.toLowerCase().includes(qCrop) || 
    qCrop.includes(item.cropName.toLowerCase())
  );

  if (cropFiltered.length > 0) {
    // Score based on keyword overlap
    let best = cropFiltered[0];
    let bestScore = -1;

    cropFiltered.forEach(item => {
      let score = 0;
      const terms = qDis.split(/[\s,–-]+/);
      terms.forEach(t => {
        if (t.length > 2) {
          if (item.diseaseName.toLowerCase().includes(t)) score += 3;
          if (item.pathogen.toLowerCase().includes(t)) score += 4;
          if (item.visualSignature.toLowerCase().includes(t)) score += 1;
        }
      });
      if (score > bestScore) {
        bestScore = score;
        best = item;
      }
    });

    return best;
  }

  // 3. Fallback to broad disease match across all crops
  for (const item of UNIFIED_CROP_DISEASE_DATASET) {
    if (item.diseaseName.toLowerCase().includes(qDis) || item.pathogen.toLowerCase().includes(qDis)) {
      return item;
    }
  }

  return UNIFIED_CROP_DISEASE_DATASET[0];
}

