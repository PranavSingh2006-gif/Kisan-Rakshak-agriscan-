import React, { useState, useEffect, useRef } from 'react';
import { 
  MapPin, AlertTriangle, Wind, ShieldAlert, Users, Radio, 
  Send, Compass, Layers, CheckCircle, Search, Eye, Filter,
  Maximize2, ZoomIn, Globe, Navigation
} from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const UP_DISTRICT_HOTSPOTS = [
  {
    id: 'kanpur-lucknow',
    district: 'Kanpur Nagar & Lucknow',
    region: 'Central UP Potato Belt',
    lat: 26.8467,
    lng: 80.9462,
    disease: 'Potato Late Blight (पछेती झुलसा)',
    pathogen: 'Phytophthora infestans',
    severity: 'Severe Outbreak',
    severityLevel: 3,
    statusColor: 'bg-red-500 text-white',
    radiusMeters: 45000,
    circleColor: '#ef4444',
    affectedHectares: '3,850 ha',
    farmsReported: 1420,
    windVector: 'East-Southeast @ 18 km/h',
    windAngle: 110, // degrees
    quarantineLevel: 'High Quarantine Alert',
    containmentAdvisory: 'Prohibit transport of uncertified seed tubers out of Kanpur/Farrukhabad belt. Apply systemic Dimethomorph 50% WP immediately.',
    nearbyVulnerable: ['Unnao', 'Barabanki', 'Hardoi', 'Rae Bareli']
  },
  {
    id: 'meerut-bareilly',
    district: 'Meerut & Bareilly',
    region: 'Western UP Wheat Belt',
    lat: 28.9845,
    lng: 77.7064,
    disease: 'Wheat Yellow Stripe Rust (पीला रतुआ)',
    pathogen: 'Puccinia striiformis',
    severity: 'Severe Outbreak',
    severityLevel: 3,
    statusColor: 'bg-red-500 text-white',
    radiusMeters: 55000,
    circleColor: '#ef4444',
    affectedHectares: '2,920 ha',
    farmsReported: 980,
    windVector: 'Eastward @ 15 km/h',
    windAngle: 90,
    quarantineLevel: 'High Airborne Spore Drift',
    containmentAdvisory: 'Airborne urediniospores travelling eastward across the Rohilkhand plains. Mandatory preventive Propiconazole 25% EC barrier spraying.',
    nearbyVulnerable: ['Moradabad', 'Rampur', 'Budaun', 'Pilibhit']
  },
  {
    id: 'varanasi-mirzapur',
    district: 'Varanasi & Mirzapur',
    region: 'Eastern UP Vegetable Belt',
    lat: 25.3176,
    lng: 82.9739,
    disease: 'Tomato Yellow Leaf Curl (पर्ण कुंचन)',
    pathogen: 'Begomovirus / Whitefly Vector',
    severity: 'Moderate Risk',
    severityLevel: 2,
    statusColor: 'bg-amber-500 text-white',
    radiusMeters: 38000,
    circleColor: '#f59e0b',
    affectedHectares: '1,340 ha',
    farmsReported: 520,
    windVector: 'South-Southeast @ 9 km/h',
    windAngle: 150,
    quarantineLevel: 'Active Vector Surveillance',
    containmentAdvisory: 'Install yellow sticky traps (15 traps/acre) and spray Imidacloprid 17.8% SL to suppress Bemisia tabaci vector population.',
    nearbyVulnerable: ['Chandauli', 'Ghazipur', 'Jaunpur', 'Bhadohi']
  },
  {
    id: 'gorakhpur-basti',
    district: 'Gorakhpur & Basti',
    region: 'Terai Sub-Himalayan Paddy Zone',
    lat: 26.7606,
    lng: 83.3732,
    disease: 'Bacterial Leaf Blight of Rice (जीवाणु झुलसा)',
    pathogen: 'Xanthomonas oryzae pv. oryzae',
    severity: 'Moderate Risk',
    severityLevel: 2,
    statusColor: 'bg-amber-500 text-white',
    radiusMeters: 42000,
    circleColor: '#f59e0b',
    affectedHectares: '1,680 ha',
    farmsReported: 640,
    windVector: 'North-East @ 11 km/h',
    windAngle: 45,
    quarantineLevel: 'Waterway Contagion Watch',
    containmentAdvisory: 'Avoid nitrogen top-dressing during active rain. Drain stagnant standing water between infected paddy bunds.',
    nearbyVulnerable: ['Deoria', 'Kushinagar', 'Maharajganj', 'Siddharthnagar']
  },
  {
    id: 'agra-mathura',
    district: 'Agra & Mathura',
    region: 'Braj Mustard & Oilseed Zone',
    lat: 27.1767,
    lng: 78.0081,
    disease: 'Mustard White Rust & Downy Mildew',
    pathogen: 'Albugo candida',
    severity: 'Monitored / Low',
    severityLevel: 1,
    statusColor: 'bg-emerald-600 text-white',
    radiusMeters: 30000,
    circleColor: '#10b981',
    affectedHectares: '420 ha',
    farmsReported: 130,
    windVector: 'North-East @ 8 km/h',
    windAngle: 50,
    quarantineLevel: 'Controlled / Low Threat',
    containmentAdvisory: 'Isolated white staghead deformities detected. Routine Mancozeb foliar spray at 15-day interval recommended.',
    nearbyVulnerable: ['Firozabad', 'Aligarh', 'Hathras']
  }
];

import { UP_PRECISE_BOUNDARY } from './upBoundaryData';
import INDIA_STATES_GEOJSON from './india_states.json';

const BRIGHT_RADAR_TILE = {
  url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
  attribution: '&copy; OpenStreetMap contributors'
};

export default function GeospatialUPMapFeatureCard() {
  const [selectedHotspot, setSelectedHotspot] = useState(UP_DISTRICT_HOTSPOTS[0]);
  const [alertSent, setAlertSent] = useState(false);
  const [filterSeverity, setFilterSeverity] = useState('ALL');
  const [mapZoomMode, setMapZoomMode] = useState('UP'); // Focus UP region by default

  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const tileLayerRef = useRef(null);
  const layerGroupRef = useRef(null);

  const filteredHotspots = UP_DISTRICT_HOTSPOTS.filter(h => {
    if (filterSeverity === 'ALL') return true;
    if (filterSeverity === 'SEVERE') return h.severityLevel === 3;
    if (filterSeverity === 'MODERATE') return h.severityLevel === 2;
    return true;
  });

  // Camera Zoom Handlers (hoisted for use in effects and UI)
  const handleZoomToIndia = () => {
    setMapZoomMode('INDIA');
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([22.80, 82.00], 5, { animate: true });
    }
  };

  const handleZoomToUP = () => {
    setMapZoomMode('UP');
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([26.85, 80.95], 6, { animate: true });
    }
  };

  // Initialize actual Leaflet Map in Bright Radar View
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Guard against React 18 double-mount
    if (mapContainerRef.current._leaflet_id) {
      mapContainerRef.current._leaflet_id = null;
    }

    if (!mapInstanceRef.current) {
      // Create map centered on Uttar Pradesh by default
      const map = L.map(mapContainerRef.current, {
        center: [26.85, 80.95],
        zoom: 6,
        minZoom: 4,
        maxZoom: 16,
        scrollWheelZoom: true,
        dragging: true,
        touchZoom: true,
        doubleClickZoom: true,
        boxZoom: true,
        keyboard: true
      });

      // Explicitly ensure mouse scroll zoom and dragging are enabled
      map.scrollWheelZoom.enable();
      map.dragging.enable();

      // Add Bright Raster Tile Layer (Zero API keys, clean bright tiles)
      const tileLayer = L.tileLayer(BRIGHT_RADAR_TILE.url, {
        attribution: BRIGHT_RADAR_TILE.attribution,
        maxZoom: 18
      }).addTo(map);

      tileLayerRef.current = tileLayer;
      layerGroupRef.current = L.layerGroup().addTo(map);
      mapInstanceRef.current = map;

      // Invalidate size once DOM layout is settled
      const timer = setTimeout(() => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.invalidateSize();
        }
      }, 200);

      return () => {
        clearTimeout(timer);
        if (mapInstanceRef.current) {
          mapInstanceRef.current.remove();
          mapInstanceRef.current = null;
        }
        if (mapContainerRef.current) {
          mapContainerRef.current._leaflet_id = null;
        }
      };
    }
  }, []);

  // Update markers, circles, and state boundary when filter, selection, or theme changes
  useEffect(() => {
    if (!mapInstanceRef.current || !layerGroupRef.current) return;

    const layerGroup = layerGroupRef.current;
    layerGroup.clearLayers();

    // 1. Render All 36 Indian States from embedded GeoJSON with UP highlighted
    if (INDIA_STATES_GEOJSON && INDIA_STATES_GEOJSON.features) {
      try {
        L.geoJSON(INDIA_STATES_GEOJSON, {
          style: (feature) => {
            const isUP = feature.properties?.name === 'Uttar Pradesh';
            if (isUP) {
              return {
                color: '#15803d',     // Rich Emerald Green border for UP
                weight: 3.8,          // Prominently highlighted stroke
                opacity: 1,
                fillColor: '#22c55e', // Soft green highlighted fill
                fillOpacity: 0.22,
                dashArray: 'none'
              };
            }
            return {
              color: '#475569', // Clear state boundary line
              weight: 1.4,
              opacity: 0.75,
              fillColor: '#64748b',
              fillOpacity: 0.04,
              dashArray: '3, 2'
            };
          },
          onEachFeature: (feature, layer) => {
            const stateName = feature.properties?.name || 'State';
            const isUP = stateName === 'Uttar Pradesh';

            if (!isUP) {
              layer.bindTooltip(
                `<div class="font-bold text-xs">🇮🇳 ${stateName}</div><div class="text-[10px] text-gray-500">Indian State • Click to inspect</div>`,
                {
                  sticky: true,
                  className: 'state-hover-tooltip'
                }
              );
            }

            layer.on({
              mouseover: (e) => {
                if (!isUP) {
                  e.target.setStyle({
                    weight: 2.4,
                    color: '#16a34a', // Emerald green highlight on hover
                    fillOpacity: 0.16,
                    fillColor: '#86efac'
                  });
                }
              },
              mouseout: (e) => {
                if (!isUP) {
                  e.target.setStyle({
                    color: '#475569',
                    weight: 1.4,
                    fillOpacity: 0.04,
                    fillColor: '#64748b'
                  });
                }
              },
              click: () => {
                if (isUP) {
                  handleZoomToUP();
                }
              }
            });
          }
        }).addTo(layerGroup);
      } catch (err) {
        console.error('Error rendering states GeoJSON:', err);
      }

      // Dedicated prominent badge for Uttar Pradesh at its geographic center
      const upBadge = L.marker([26.85, 80.95], {
        icon: L.divIcon({
          html: `
            <div class="state-up-highlight-badge flex items-center gap-1.5 whitespace-nowrap cursor-pointer shadow-lg">
              <span>🌾 UTTAR PRADESH</span>
              <span class="text-[9px] bg-white text-green-800 px-1.5 py-0.5 rounded-full font-bold">Surveillance Zone</span>
            </div>
          `,
          className: 'up-badge-container',
          iconSize: [180, 30],
          iconAnchor: [90, 15]
        })
      });
      upBadge.on('click', () => handleZoomToUP());
      upBadge.addTo(layerGroup);

      // Centered visible labels for all major Indian states across the country
      const MAJOR_STATE_LABELS = [
        { name: 'Rajasthan', lat: 26.20, lng: 73.80 },
        { name: 'Madhya Pradesh', lat: 23.40, lng: 77.80 },
        { name: 'Maharashtra', lat: 19.40, lng: 75.80 },
        { name: 'Gujarat', lat: 22.40, lng: 71.20 },
        { name: 'Bihar', lat: 25.80, lng: 85.60 },
        { name: 'Punjab', lat: 30.90, lng: 75.40 },
        { name: 'Haryana', lat: 29.10, lng: 76.20 },
        { name: 'West Bengal', lat: 23.40, lng: 88.00 },
        { name: 'Odisha', lat: 20.40, lng: 84.50 },
        { name: 'Karnataka', lat: 14.80, lng: 76.00 },
        { name: 'Tamil Nadu', lat: 10.90, lng: 78.40 },
        { name: 'Andhra Pradesh', lat: 15.60, lng: 79.80 },
        { name: 'Telangana', lat: 17.80, lng: 79.10 },
        { name: 'Kerala', lat: 10.40, lng: 76.30 },
        { name: 'Assam', lat: 26.20, lng: 92.60 },
        { name: 'Chhattisgarh', lat: 21.20, lng: 81.80 },
        { name: 'Jharkhand', lat: 23.60, lng: 85.60 },
        { name: 'Himachal', lat: 31.80, lng: 77.20 },
        { name: 'Uttarakhand', lat: 30.10, lng: 79.10 },
        { name: 'J&K', lat: 33.60, lng: 75.80 }
      ];

      MAJOR_STATE_LABELS.forEach(st => {
        const marker = L.marker([st.lat, st.lng], {
          icon: L.divIcon({
            html: `<div class="state-name-label">${st.name}</div>`,
            className: 'state-label-container',
            iconSize: [80, 20],
            iconAnchor: [40, 10]
          }),
          interactive: false
        });
        marker.addTo(layerGroup);
      });

    } else {
      // Fallback: highlight UP Precise Boundary
      const upPolygon = L.polygon(UP_PRECISE_BOUNDARY, {
        color: '#15803d',
        weight: 3.8,
        opacity: 1,
        fillColor: '#16a34a',
        fillOpacity: 0.22
      }).addTo(layerGroup);

      upPolygon.bindTooltip('🌾 <b>Uttar Pradesh (UP)</b><br/><span style="color:#15803d; font-weight:bold;">Primary Surveillance Zone</span>', {
        permanent: true,
        direction: 'center',
        className: 'state-up-highlight-badge'
      });
    }

    // 2. Draw Hotspot Outbreak Nodes and Contagion Radius Circles
    filteredHotspots.forEach((hotspot) => {
      const isSelected = selectedHotspot.id === hotspot.id;
      const isSevere = hotspot.severityLevel === 3;

      // Actual geographic contagion radius circle on Earth
      const circle = L.circle([hotspot.lat, hotspot.lng], {
        radius: hotspot.radiusMeters,
        color: hotspot.circleColor,
        weight: isSelected ? 2.5 : 1.5,
        opacity: 0.85,
        fillColor: hotspot.circleColor,
        fillOpacity: isSelected ? 0.25 : 0.14
      }).addTo(layerGroup);

      // Custom animated HTML marker pin
      const markerHtml = `
        <div class="relative flex items-center justify-center cursor-pointer group">
          <div class="absolute -inset-2 rounded-full ${isSevere ? 'bg-red-500/40' : 'bg-amber-500/30'} animate-ping opacity-75"></div>
          <div class="w-8 h-8 rounded-full border-2 ${isSelected ? 'border-white bg-white/20 scale-110 shadow-lg' : 'border-black/50 bg-black/40'} flex items-center justify-center transition-transform">
            <div class="w-4 h-4 rounded-full ${isSevere ? 'bg-red-500 shadow-red-500/80' : hotspot.severityLevel === 2 ? 'bg-amber-400' : 'bg-emerald-400'} shadow-md"></div>
          </div>
          <div class="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/85 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow border border-white/20 pointer-events-none">
            ${hotspot.district.split(' ')[0]}
          </div>
        </div>
      `;

      const customIcon = L.divIcon({
        html: markerHtml,
        className: 'custom-leaflet-hotspot-pin',
        iconSize: [32, 32],
        iconAnchor: [16, 16]
      });

      const marker = L.marker([hotspot.lat, hotspot.lng], { icon: customIcon }).addTo(layerGroup);

      marker.on('click', () => {
        setSelectedHotspot(hotspot);
        if (mapInstanceRef.current) {
          mapInstanceRef.current.panTo([hotspot.lat, hotspot.lng], { animate: true });
        }
      });
    });

  }, [filteredHotspots, selectedHotspot]);



  const handleBroadcastAlert = () => {
    setAlertSent(true);
    setTimeout(() => setAlertSent(false), 5000);
  };

  return (
    <section id="surveillance" className="bg-white rounded-3xl p-6 sm:p-10 border border-green-200/90 shadow-xl shadow-green-950/5 transition-all">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-800 text-xs font-bold uppercase tracking-wider mb-2">
            <Radio className="w-3.5 h-3.5 text-red-600 animate-pulse" />
            <span>Feature 03 • Geographic Epidemic Surveillance</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#11291c] font-display">
            Geospatial Surveillance Hotspot Map (India / UP Region)
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Actual interactive map of India with live district contagion radius radar, spore drift trajectories, and farmer alerts in Uttar Pradesh.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-green-50 px-3.5 py-2 rounded-xl border border-green-200 text-xs font-semibold text-green-900">
          <Globe className="w-4 h-4 text-[#257038]" />
          <span>Real Geographic Coordinates & GIS Tiles</span>
        </div>
      </div>

      {/* Main Content Grid: Map on Left (7 cols), District Telemetry on Right (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8 items-start">
        
        {/* Left Column: Actual Geographic Map of India / UP (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-4 sm:p-5 text-gray-800 shadow-lg relative overflow-hidden border border-green-200/90">
          
          {/* Map Top Bar Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3 z-10 relative">
            
            {/* Zoom Toggles: Entire India vs UP Region */}
            <div className="flex items-center gap-1.5 bg-gray-100 p-1 rounded-xl border border-gray-200 text-xs">
              <button
                onClick={handleZoomToIndia}
                className={`px-3 py-1 rounded-lg font-bold text-[11px] flex items-center gap-1.5 transition-all ${
                  mapZoomMode === 'INDIA' ? 'bg-[#257038] text-white shadow-xs' : 'text-gray-600 hover:text-green-800'
                }`}
              >
                <Globe className="w-3.5 h-3.5 text-emerald-600" />
                <span>All India Map</span>
              </button>
              <button
                onClick={handleZoomToUP}
                className={`px-3 py-1 rounded-lg font-bold text-[11px] flex items-center gap-1.5 transition-all ${
                  mapZoomMode === 'UP' ? 'bg-[#257038] text-white shadow-xs' : 'text-gray-600 hover:text-green-800'
                }`}
              >
                <Navigation className="w-3.5 h-3.5 text-emerald-600" />
                <span>Focus UP Region (Highlighted)</span>
              </button>
            </div>

            {/* Radar Badge & Severity Filter */}
            <div className="flex items-center gap-2">
              {/* Radar Mode Indicator */}
              <div className="flex items-center gap-1.5 bg-emerald-50 px-3 py-1 rounded-xl border border-emerald-200 text-[11px] font-bold text-emerald-800">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Bright Radar View</span>
              </div>

              {/* Severity Filter */}
              <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl border border-gray-200 text-[11px]">
                <button
                  onClick={() => setFilterSeverity('ALL')}
                  className={`px-2 py-0.5 rounded-md font-bold transition-all ${
                    filterSeverity === 'ALL' ? 'bg-[#257038] text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilterSeverity('SEVERE')}
                  className={`px-2 py-0.5 rounded-md font-bold transition-all ${
                    filterSeverity === 'SEVERE' ? 'bg-red-600 text-white' : 'text-red-500 hover:text-red-700'
                  }`}
                >
                  Severe
                </button>
              </div>
            </div>

          </div>

          {/* Actual Leaflet Map Canvas Container */}
          <div className="relative w-full aspect-[16/11] sm:aspect-[16/10] rounded-xl overflow-hidden border border-green-200 shadow-inner">
            <div 
              ref={mapContainerRef} 
              className="w-full h-full z-0 cursor-grab active:cursor-grabbing" 
              style={{ minHeight: '360px' }}
            />

            {/* Overlay Guide Card */}
            <div className="absolute top-3 right-3 z-10 bg-white/95 backdrop-blur-md border border-emerald-200 px-3 py-1.5 rounded-xl text-[10px] text-emerald-800 font-mono flex items-center gap-2 pointer-events-none shadow-md">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>LIVE GIS SURVEILLANCE • INDIA</span>
            </div>

            {/* Interactive Control Helper Badge */}
            <div className="absolute bottom-3 left-3 z-10 bg-white/95 backdrop-blur-md border border-gray-200 px-3 py-1.5 rounded-lg text-[10px] text-gray-700 font-medium flex items-center gap-2 pointer-events-none shadow-md">
              <span>🖱️ Drag to pan</span>
              <span className="text-gray-300">•</span>
              <span>🔄 Scroll wheel to zoom</span>
            </div>
          </div>

          {/* Map Footer Information */}
          <div className="mt-3 pt-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-600">
            <div className="flex items-center gap-4 text-[11px]">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                <span>Severe Outbreak</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span>Moderate Contagion</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span>Under Surveillance</span>
              </span>
            </div>

            <div className="text-[11px] text-emerald-700 font-mono font-semibold">
              Click any state or district pin to inspect
            </div>
          </div>

        </div>

        {/* Right Column: Selected Hotspot Telemetry & Action (5 cols) */}
        <div className="lg:col-span-5 bg-gray-50/80 rounded-2xl p-6 border border-gray-200 flex flex-col justify-between h-full space-y-5">
          
          <div>
            {/* Header: District Name & Status Badge */}
            <div className="flex items-start justify-between gap-3 pb-3 border-b border-gray-200">
              <div>
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block">
                  {selectedHotspot.region}
                </span>
                <h3 className="text-xl font-extrabold text-gray-900">
                  {selectedHotspot.district}
                </h3>
              </div>

              <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide ${selectedHotspot.statusColor}`}>
                {selectedHotspot.severity}
              </span>
            </div>

            {/* Pathogen & Quarantine Details */}
            <div className="mt-4 space-y-3">
              <div className="p-3 bg-white rounded-xl border border-gray-200 shadow-xs">
                <span className="text-[10px] font-bold text-gray-500 uppercase block">
                  Active Contagious Disease
                </span>
                <p className="text-base font-extrabold text-red-700 leading-tight">
                  {selectedHotspot.disease}
                </p>
                <p className="text-xs text-gray-600 font-serif italic mt-0.5">
                  Causal Organism: {selectedHotspot.pathogen}
                </p>
              </div>

              {/* 2x2 Telemetry Grid */}
              <div className="grid grid-cols-2 gap-2.5 text-xs">
                <div className="p-2.5 bg-white rounded-xl border border-gray-200">
                  <span className="text-gray-500 font-medium block">Area at Risk</span>
                  <span className="text-sm font-extrabold text-gray-900">{selectedHotspot.affectedHectares}</span>
                </div>

                <div className="p-2.5 bg-white rounded-xl border border-gray-200">
                  <span className="text-gray-500 font-medium block">Farms Reporting</span>
                  <span className="text-sm font-extrabold text-gray-900">{selectedHotspot.farmsReported} plots</span>
                </div>

                <div className="p-2.5 bg-white rounded-xl border border-gray-200">
                  <span className="text-gray-500 font-medium block">Contagion Radius</span>
                  <span className="text-xs font-bold text-red-700">{selectedHotspot.radiusMeters / 1000} km buffer</span>
                </div>

                <div className="p-2.5 bg-white rounded-xl border border-gray-200">
                  <span className="text-gray-500 font-medium block">Wind Spore Vector</span>
                  <span className="text-xs font-bold text-teal-800">{selectedHotspot.windVector}</span>
                </div>
              </div>

              {/* Containment Protocol */}
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-950">
                <h4 className="font-bold flex items-center gap-1.5 text-amber-900 mb-1">
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-700" />
                  <span>State Agronomy Containment Order:</span>
                </h4>
                <p className="leading-relaxed">
                  {selectedHotspot.containmentAdvisory}
                </p>
              </div>

              {/* Downwind At-Risk Districts */}
              <div className="text-xs text-gray-600">
                <span className="font-bold text-gray-800">Neighboring Downwind Zones on Alert: </span>
                {selectedHotspot.nearbyVulnerable.join(', ')}
              </div>
            </div>
          </div>

          {/* One-Click Farmer Alert Broadcast Demo Button */}
          <div className="pt-4 border-t border-gray-200">
            {alertSent ? (
              <div className="p-3.5 bg-emerald-100 border border-emerald-300 rounded-xl text-emerald-900 text-xs font-bold flex items-center gap-2 animate-fadeIn">
                <CheckCircle className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Emergency Broadcast Dispatched to {selectedHotspot.farmsReported} registered farmers in {selectedHotspot.district}!</span>
              </div>
            ) : (
              <button
                onClick={handleBroadcastAlert}
                className="w-full py-3 px-4 rounded-xl bg-[#257038] hover:bg-[#1e5c2e] text-white font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-98 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Broadcast Rapid WhatsApp / SMS Alert to {selectedHotspot.farmsReported} Farmers</span>
              </button>
            )}
          </div>

        </div>

      </div>

    </section>
  );
}
