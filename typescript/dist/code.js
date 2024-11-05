"use strict";
var _a;
// Initialisation de la carte et des services Google Maps
let map;
let directionsService;
let directionsRenderer;
let selectedRoute = '';
let selectedDistance = '';
function initMap() {
    const mapContainer = document.getElementById('carte-container');
    map = new google.maps.Map(mapContainer, {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8
    });
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);
    // Listener pour choisir un trajet
    map.addListener('click', (e) => {
        const destination = e.latLng;
        const origin = { lat: -34.397, lng: 150.644 }; // Point d'origine, ajuster selon besoin
        calculateAndDisplayRoute(origin, destination);
    });
}
function calculateAndDisplayRoute(origin, destination) {
    if (destination) {
        directionsService.route({
            origin: origin,
            destination: destination,
            travelMode: google.maps.TravelMode.DRIVING,
        }, (response, status) => {
            var _a;
            if (status === google.maps.DirectionsStatus.OK && response) {
                directionsRenderer.setDirections(response);
                const route = response.routes[0].legs[0];
                selectedRoute = `${route.start_address} to ${route.end_address}`;
                selectedDistance = ((_a = route.distance) === null || _a === void 0 ? void 0 : _a.text) || '';
            }
            else {
                console.error('Directions request failed due to ' + status);
            }
        });
    }
}
(_a = document.getElementById('carte-button')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
    const carteContainer = document.getElementById('carte-container');
    carteContainer.style.display = 'block';
    initMap();
});
const cargoForm = document.getElementById('cargaisonForm');
cargoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const type = document.getElementById('type_cargaison').value;
    const weight = parseFloat(document.getElementById('poids').value);
    const nbreProduits = parseFloat(document.getElementById('nbre-produits').value);
    const errorMessage = document.getElementById('error-message');
    // Validation des champs
    if (!type || isNaN(weight) || isNaN(nbreProduits)) {
        errorMessage.style.display = 'block';
        return;
    }
    else {
        errorMessage.style.display = 'none';
    }
    const cargo = {
        number: generateRandomCargoNumber(),
        type: type,
        weight: weight,
        route: selectedRoute,
        distance: selectedDistance
    };
    addCargoToTable(cargo);
});
function generateRandomCargoNumber() {
    return Math.floor(1000 + Math.random() * 9000);
}
function addCargoToTable(cargo) {
    const tableBody = document.getElementById('cargo-table-body');
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
