let map, routeLayer, ws;

function initMap() {
  map = L.map('map').setView([20.5937, 78.9629], 5); // India center

  // OSM Tiles
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
  }).addTo(map);

  // Route Layer
  routeLayer = L.layerGroup().addTo(map);

  document.getElementById('routeBtn').onclick = computeRoutes;

  // WebSocket connection to backend
  ws = new WebSocket('ws://traffic-modeling-backend.onrender.com');
  ws.onmessage = (msg) => {
    const data = JSON.parse(msg.data);
    if (data.eventType === 'obstacle') {
      L.marker([data.data.lat, data.data.lng], {
        icon: L.icon({
          iconUrl: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
          iconSize: [32, 32],
        })
      }).addTo(map).bindPopup(`${data.data.type} reported`);
    }
  };
}

async function computeRoutes() {
  const originInput = document.getElementById('origin').value.trim();
  const destInput = document.getElementById('destination').value.trim();

  if (!originInput || !destInput) {
    alert('Enter both origin and destination');
    return;
  }

  try {
    // Geocode both locations
    const origin = await geocode(originInput);
    const destination = await geocode(destInput);

    if (!origin || !destination) {
      alert("Could not find coordinates for given locations.");
      return;
    }

    // Clear previous routes
    routeLayer.clearLayers();

    // Request route from OSRM
    const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${origin.lon},${origin.lat};${destination.lon},${destination.lat}?overview=full&geometries=geojson`;

    const res = await fetch(osrmUrl);
    const data = await res.json();

    if (data.routes && data.routes.length > 0) {
      const route = data.routes[0];
      const coords = route.geometry.coordinates.map(c => [c[1], c[0]]);
      
      // Draw route polyline
      const line = L.polyline(coords, { color: 'blue' }).addTo(routeLayer);
      map.fitBounds(line.getBounds());

      // Send route info to backend predictor
      const distanceKm = route.distance / 1000;
      const durationMin = route.duration / 60;

      const predRes = await fetch('https://traffic-modeling-backend.onrender.com/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ route: { distanceKm, durationMin } })
      });
      const pred = await predRes.json();

      alert(`Predicted Risk: ${pred.riskLevel} (Score: ${pred.score})`);
    } else {
      alert("No route found!");
    }
  } catch (err) {
    console.error("Error computing route:", err);
  }
}

// Geocode place name to lat/lng using Nominatim
async function geocode(query) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`;
  const res = await fetch(url, { headers: { 'User-Agent': 'TrafficModelerDemo/1.0' } });
  const results = await res.json();
  if (results.length > 0) {
    return { lat: results[0].lat, lon: results[0].lon };
  }
  return null;
}

// Initialize map after DOM load
window.onload = initMap;
