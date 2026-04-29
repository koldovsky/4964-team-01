export function initMap() {
  // Map coordinates Lantitude, Longtitude
  const headenHeavenPoint = [48.678579864206, -121.70108123062124];

  // Custom Map marker as SVG icon
  const customIcon = L.icon({
    iconUrl: "../img/icons/map-pin.svg",
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });

  // Take HTML map container from DOM
  const mapContainer = document.querySelector(".contacts-map__map");

  // Create map using coordinates from headenHeavenPoint in the predefined HTML container
  const map = L.map(mapContainer).setView(headenHeavenPoint, 14);

  // Apply dark style to the map
  L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png").addTo(map);

  // Title and address below in Leaflet HTML formatting
  const headenHeavenAddress = `<b>Hidden Heaven Glamping</b><br> NF-1118, Concrete, WA 98237, USA`;

  // Set marker on the map with Headen Heaven address
  L.marker(headenHeavenPoint, { icon: customIcon }).addTo(map).bindPopup(headenHeavenAddress).openPopup();
}
