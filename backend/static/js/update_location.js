document.addEventListener("DOMContentLoaded", function () {
    const map = L.map("map").setView([50.4501, 30.5234], 13); // Київ, як дефолт

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    let marker;

    function onMapClick(e) {
        const { lat, lng } = e.latlng;
        if (marker) {
            marker.setLatLng(e.latlng);
        } else {
            marker = L.marker(e.latlng).addTo(map);
        }
        document.getElementById("id_location").value = `${lat},${lng}`;
    }

    map.on("click", onMapClick);
});
