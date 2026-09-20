export const currentFarmWeather = {
  location: 'Greenfield Valley Agricultural Zone #04',
  coordinates: '36.7783° N, 119.4179° W',
  elevation: '185 m',
  temperature: 26,
  feelsLike: 28,
  humidity: 84, // %
  dewPoint: 22.5, // °C
  windSpeed: 14, // km/h
  windDirection: 'ENE (65°)',
  uvIndex: 6,
  leafWetnessHours: 9.4, // hours of continuous moisture on leaves
  rainForecast48h: 'Rain expected in ~6-8 hours (12mm precipitation)',
  hourlyForecast: [
    { time: '06:00', temp: 19, humidity: 92, rainProb: 20, icon: 'cloud-fog' },
    { time: '09:00', temp: 23, humidity: 86, rainProb: 35, icon: 'cloud-sun' },
    { time: '12:00', temp: 27, humidity: 79, rainProb: 45, icon: 'sun' },
    { time: '15:00', temp: 28, humidity: 76, rainProb: 60, icon: 'cloud-rain' },
    { time: '18:00', temp: 25, humidity: 88, rainProb: 80, icon: 'cloud-lightning' },
    { time: '21:00', temp: 22, humidity: 94, rainProb: 75, icon: 'cloud-rain' }
  ],
  diseaseRiskIndices: [
    {
      disease: 'Early & Late Blight (Fungal)',
      riskLevel: 'HIGH',
      riskScore: 88,
      riskColor: 'text-red-600 bg-red-50 border-red-200',
      vector: 'Warm temps (22-28°C) + sustained humidity >80% for >8 hours triggers exponential spore germination.'
    },
    {
      disease: 'Bacterial Leaf Spot',
      riskLevel: 'MODERATE',
      riskScore: 56,
      riskColor: 'text-amber-600 bg-amber-50 border-amber-200',
      vector: 'Splash dispersal elevated; impending rain and moderate wind (14 km/h) facilitate mechanical entry through stomata.'
    },
    {
      disease: 'Powdery Mildew',
      riskLevel: 'LOW',
      riskScore: 24,
      riskColor: 'text-emerald-600 bg-emerald-50 border-emerald-200',
      vector: 'Inhibited by frequent leaf wetness and free water on plant canopy.'
    }
  ],
  sprayAdvisor: {
    status: 'DELAY_SPRAY',
    statusTitle: 'Unfavorable Spray Window',
    statusColor: 'bg-amber-500 text-white',
    reason: 'Incoming rain within 6-8 hours will wash off contact fungicides before rainfast absorption (minimum 4h drying window required).',
    nextSafeWindow: 'Tomorrow at 06:30 AM - 11:30 AM (Dry foliage, wind < 7 km/h, clear skies).'
  }
};

