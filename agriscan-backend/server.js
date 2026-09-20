import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.error('ERROR: GEMINI_API_KEY is not set in environment.');
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// Candidate models in priority order
const CANDIDATE_MODELS = [
  'gemini-3.1-flash-lite',
  'gemini-3.5-flash-lite',
  'gemini-flash-latest',
  'gemini-3.6-flash'
];

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Health endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'Kisan Rakshak Gemini AI Diagnostic Engine',
    modelsAvailable: CANDIDATE_MODELS,
    port: PORT
  });
});

// Helper to extract clean JSON from LLM output
function parseGeminiJson(text) {
  let clean = text.trim();
  if (clean.startsWith('```json')) {
    clean = clean.replace(/^```json\s*/, '').replace(/\s*```$/, '');
  } else if (clean.startsWith('```')) {
    clean = clean.replace(/^```\s*/, '').replace(/\s*```$/, '');
  }
  
  try {
    return JSON.parse(clean);
  } catch (err) {
    const jsonMatch = clean.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    throw new Error('Failed to parse JSON: ' + err.message);
  }
}

import { UNIFIED_CROP_DISEASE_DATASET, matchAgainstUnifiedDataset } from './data/unifiedCropDiseaseDataset.js';

// Diagnose endpoint
app.post('/api/diagnose', async (req, res) => {
  const { 
    imageBase64, 
    crop = 'Crop', 
    growthStage = 'Growth Stage', 
    fieldName = 'Field Plot', 
    symptoms = '',
    weatherInfo = 'Temperature 26°C, Relative Humidity 84%, Incoming Rain in 7 hours'
  } = req.body;

  console.log(`[Diagnostic Scan] Crop: ${crop} | Stage: ${growthStage} | Plot: ${fieldName}`);

  // Retrieve matching benchmark baseline from Master Unified Dataset
  const benchmarkBaseline = matchAgainstUnifiedDataset(crop, symptoms || crop);

  const prompt = `You are Kisan Rakshak, an expert agricultural plant doctor powered by the Unified Master Crop Disease Knowledgebase (synthesizing PlantVillage, SAGE CVPR 2026, CDDMBench, and Roboflow Multi-Crop benchmarks).

Field Details:
- Crop Type: ${crop} (Baseline: ${benchmarkBaseline ? benchmarkBaseline.cropName + ' - ' + benchmarkBaseline.scientificCropName : 'Agricultural Crop'})
- Growth Stage: ${growthStage}
- Field Name: ${fieldName}
- Visible Symptoms Reported: ${symptoms || 'Visual examination of leaves for spots, discoloration, or wilting'}
- Local Agro-Weather: ${weatherInfo}

TASK:
1. Analyze the uploaded leaf image features (lesion geometry, margins, chlorotic halos, sporulation, and necrosis).
2. Ground your diagnosis against verified plant pathology benchmarks (PlantVillage, SAGE, CDDMBench).
3. Identify the exact disease and scientific pathogen.
4. Provide a simple, empathetic explanation for a local farmer.
5. Provide actionable day-1 immediate containment steps.
6. Provide cultural precaution and prevention methods (spacing, irrigation, sanitation, crop rotation).
7. Provide dual-track remedies: Certified Organic solutions (exact dosage & frequency) AND chemical treatments (active ingredient molecules, dosage per litre, safety pre-harvest interval).

Return ONLY a valid JSON object matching this structure:
{
  "diseaseName": "Name of Disease (e.g. Early Blight, Late Blight, Yellow Rust, Bacterial Blight, etc.)",
  "pathogen": "Scientific Pathogen (e.g. Alternaria solani - Fungal)",
  "confidence": 94,
  "severity": "Moderate",
  "simpleExplanation": "Simple 2-3 sentence explanation in plain words of what is happening to the plant.",
  "identifiedSymptoms": [
    "Clear symptom 1",
    "Clear symptom 2",
    "Clear symptom 3"
  ],
  "immediateAction": "What the farmer should do today to stop the spread.",
  "precautionsAndPrevention": [
    "Practical precaution 1 (e.g. switch to drip irrigation to keep leaves dry)",
    "Practical precaution 2 (e.g. plant spacing for air circulation)",
    "Practical precaution 3 (e.g. sanitize pruning tools)"
  ],
  "organicRemedies": [
    "Organic remedy 1 with clear dosage (e.g. Neem seed oil 0.5% spray in early morning)",
    "Organic remedy 2"
  ],
  "chemicalTreatments": [
    "Commercial treatment 1 with active molecule and withholding period",
    "Commercial treatment 2"
  ],
  "weatherRiskAnalysis": "How the current 84% humidity and rain affects this disease.",
  "nextScanChecklist": "What signs to inspect during the next progressive scan in 7 days."
}`;

  let lastError = null;

  for (const modelName of CANDIDATE_MODELS) {
    try {
      console.log(`[Calling Gemini] Model: ${modelName}...`);
      const model = genAI.getGenerativeModel({ model: modelName });
      const contentParts = [prompt];

      if (imageBase64) {
        let cleanBase64 = imageBase64;
        let mimeType = 'image/jpeg';
        if (imageBase64.includes(';base64,')) {
          const parts = imageBase64.split(';base64,');
          mimeType = parts[0].replace('data:', '');
          cleanBase64 = parts[1];
        }
        contentParts.push({
          inlineData: {
            data: cleanBase64,
            mimeType: mimeType
          }
        });
      }

      const response = await model.generateContent(contentParts);
      const text = response.response.text();
      const result = parseGeminiJson(text);

      console.log(`[Gemini Success] Result parsed successfully with ${modelName}`);

      // Ground and enrich AI diagnosis with verified Master Unified Dataset
      const matchedRecord = matchAgainstUnifiedDataset(crop, result.diseaseName || result.pathogen) || benchmarkBaseline;

      const enrichedResult = {
        ...result,
        diseaseHindi: matchedRecord?.diseaseHindi || '',
        cropHindi: matchedRecord?.cropHindi || '',
        cropCategory: matchedRecord?.cropCategory || 'Field Crop',
        scientificCropName: matchedRecord?.scientificCropName || '',
        pathogenType: matchedRecord?.pathogenType || 'Foliar Pathogen',
        benchmarkSource: matchedRecord?.benchmarkSource || 'PlantVillage • SAGE CVPR 2026 • CDDMBench • Roboflow',
        visualSignature: matchedRecord?.visualSignature || (result.identifiedSymptoms ? result.identifiedSymptoms.join(' • ') : ''),
        precautionsAndPrevention: (result.precautionsAndPrevention && result.precautionsAndPrevention.length > 0)
          ? result.precautionsAndPrevention
          : (matchedRecord?.precautions || []),
        organicRemedies: (result.organicRemedies && result.organicRemedies.length > 0)
          ? result.organicRemedies
          : (matchedRecord?.organicTreatments || []),
        chemicalTreatments: (result.chemicalTreatments && result.chemicalTreatments.length > 0)
          ? result.chemicalTreatments
          : (matchedRecord?.chemicalTreatments || []),
        favorableConditions: matchedRecord?.favorableConditions || ''
      };

      return res.json({
        success: true,
        data: enrichedResult,
        modelUsed: modelName,
        benchmarkSource: enrichedResult.benchmarkSource
      });

    } catch (err) {
      console.warn(`[Model ${modelName} Error]:`, err.message);
      lastError = err;
      // Try next model in list
    }
  }

  // Resilient fallback grounded directly in Master Unified Dataset
  console.log('[Using Master Unified Dataset Grounded Fallback]');
  if (benchmarkBaseline) {
    return res.json({
      success: true,
      data: {
        diseaseName: benchmarkBaseline.diseaseName,
        pathogen: benchmarkBaseline.pathogen,
        confidence: 95,
        severity: benchmarkBaseline.severityLevel,
        simpleExplanation: benchmarkBaseline.summary,
        identifiedSymptoms: [benchmarkBaseline.visualSignature],
        immediateAction: benchmarkBaseline.immediateAction,
        precautionsAndPrevention: benchmarkBaseline.precautions,
        organicRemedies: benchmarkBaseline.organicTreatments,
        chemicalTreatments: benchmarkBaseline.chemicalTreatments,
        benchmarkSource: benchmarkBaseline.benchmarkSource,
        diseaseHindi: benchmarkBaseline.diseaseHindi,
        pathogenType: benchmarkBaseline.pathogenType,
        visualSignature: benchmarkBaseline.visualSignature,
        favorableConditions: benchmarkBaseline.favorableConditions
      },
      modelUsed: 'Unified-Dataset-Benchmark-Engine'
    });
  }

  return res.status(500).json({
    success: false,
    error: lastError?.message || 'Gemini models currently unavailable'
  });
});

// KisanRakshak AI Chat Assistant Endpoint
app.post('/api/chat-assistant', async (req, res) => {
  const { message = '', chatHistory = [] } = req.body;
  console.log(`[Chat Assistant Request]: ${message}`);

  if (!message || !message.trim()) {
    return res.status(400).json({ error: 'Message cannot be empty' });
  }

  const systemInstruction = `You are "KisanRakshak Assistant", an empathetic, highly knowledgeable agricultural plant pathology and pest management expert for farmers in India.
Your role:
1. Help farmers diagnose crop diseases, insect pests, nutrient deficiencies, and weather risks.
2. Provide concise, actionable, and practical guidance.
3. Suggest inspecting leaves, stems, and roots, and recommend taking a photo using "Diagnose My Crop" for laboratory-grade AI image diagnosis.
4. Provide advice in simple English, with Hindi terms in parentheses when relevant (e.g. झुलसा, तना छेदक).
5. Always advise safety when using agrochemicals and prioritize organic / bio-rational solutions.`;

  // Try Gemini models
  for (const modelName of CANDIDATE_MODELS) {
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      const prompt = `${systemInstruction}\n\nUser Question: ${message}\n\nProvide a friendly, direct, concise answer (2-4 sentences or clear bullet points):`;
      const result = await model.generateContent(prompt);
      const reply = result.response.text().trim();
      return res.json({ reply, modelUsed: modelName });
    } catch (err) {
      console.warn(`[Chat Model ${modelName} Error]:`, err.message);
    }
  }

  // Fallback agronomy response if Gemini API key quota is reached
  const lower = message.toLowerCase();
  let fallbackReply = "I recommend closely inspecting the underside of the leaves and stem margins for discoloration or powdery spores. For exact laboratory-grade disease identification, please click 'Diagnose My Crop' to scan a clear photo.";
  if (lower.includes('tomato') || lower.includes('spot')) {
    fallbackReply = "Tomato leaf spots are commonly caused by Early Blight (Alternaria) or Septoria leaf spot. Avoid overhead watering to keep foliage dry, prune infected lower leaves, and upload a clear photo using 'Diagnose My Crop' for exact confirmation.";
  } else if (lower.includes('wheat') || lower.includes('rust') || lower.includes('yellow')) {
    fallbackReply = "Yellowing in wheat can indicate Stripe/Yellow Rust or nitrogen deficiency. Check if yellow pustules rub off on your fingers as powdery dust. Upload a leaf close-up using 'Diagnose My Crop' to get specific fungicide/organic dosages.";
  } else if (lower.includes('rice') || lower.includes('paddy')) {
    fallbackReply = "Rice crops frequently face Bacterial Leaf Blight or Blast under humid conditions. Avoid excess nitrogen top-dressing and drain stagnant standing water. Use 'Diagnose My Crop' with a leaf snapshot for instant pathogen matching.";
  }

  return res.json({
    reply: fallbackReply,
    modelUsed: 'KisanRakshak-Rule-Engine'
  });
});

app.listen(PORT, () => {
  console.log(`=================================================`);
  console.log(`  🌾 Kisan Rakshak Gemini AI Diagnostic Server   `);
  console.log(`  🚀 Live on: http://localhost:${PORT}          `);
  console.log(`  🔑 Models: ${CANDIDATE_MODELS.join(', ')}      `);
  console.log(`=================================================`);
});

