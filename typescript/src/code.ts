

 // Initialisation de la carte et des services Google Maps
let map: google.maps.Map;
let directionsService: google.maps.DirectionsService;
let directionsRenderer: google.maps.DirectionsRenderer;
let selectedRoute: string = '';
let selectedDistance: string = '';

function initMap(): void {
  const mapContainer = document.getElementById('carte-container') as HTMLElement;
  map = new google.maps.Map(mapContainer, {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8
  });
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();
  directionsRenderer.setMap(map);

  // Listener pour choisir un trajet
  map.addListener('click', (e: google.maps.MapMouseEvent) => {
    const destination = e.latLng;
    const origin = { lat: -34.397, lng: 150.644 }; // Point d'origine, ajuster selon besoin
    calculateAndDisplayRoute(origin, destination);
  });
}

function calculateAndDisplayRoute(origin: google.maps.LatLngLiteral, destination: google.maps.LatLng | null): void {
  if (destination) {
    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (response, status) => {
        if (status === google.maps.DirectionsStatus.OK && response) {
          directionsRenderer.setDirections(response);
          const route = response.routes[0].legs[0];
          selectedRoute = `${route.start_address} to ${route.end_address}`;
          selectedDistance = route.distance?.text || '';
        } else {
          console.error('Directions request failed due to ' + status);
        }
      }
    );
  }
}

document.getElementById('carte-button')?.addEventListener('click', () => {
  const carteContainer = document.getElementById('carte-container') as HTMLElement;
  carteContainer.style.display = 'block';
  initMap();
});

// Gérer l'ajout de cargaisons
interface Cargo {
  number: number;
  type: string;
  weight: number;
  route: string;
  distance: string;
}

const cargoForm = document.getElementById('cargaisonForm') as HTMLFormElement;
cargoForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const type = (document.getElementById('type_cargaison') as HTMLSelectElement).value;
  const weight = parseFloat((document.getElementById('poids') as HTMLInputElement).value);
  const nbreProduits = parseFloat((document.getElementById('nbre-produits') as HTMLInputElement).value);

  const errorMessage = document.getElementById('error-message') as HTMLElement;

  // Validation des champs
  if (!type || isNaN(weight) || isNaN(nbreProduits)) {
    errorMessage.style.display = 'block';
    return;
  } else {
    errorMessage.style.display = 'none';
  }

  const cargo: Cargo = {
    number: generateRandomCargoNumber(),
    type: type,
    weight: weight,
    route: selectedRoute,
    distance: selectedDistance
  };

  addCargoToTable(cargo);
});

function generateRandomCargoNumber(): number {
  return Math.floor(1000 + Math.random() * 9000);
}

function addCargoToTable(cargo: Cargo): void {
  const tableBody = document.getElementById('cargo-table-body') as HTMLTableSectionElement;
  const row = document.createElement('tr');
  row.innerHTML = `
    <td class="border px-4 py-2">${cargo.number}</td>
    <td class="border px-4 py-2">${cargo.type}</td>
    <td class="border px-4 py-2">${cargo.weight}</td>
    <td class="border px-4 py-2">${cargo.route}</td>
    <td class="border px-4 py-2">${cargo.distance}</td>
  `;
  tableBody.appendChild(row);
}

  