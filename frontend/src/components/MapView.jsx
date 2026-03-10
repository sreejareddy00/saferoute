import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap, CircleMarker } from "react-leaflet";
import { useState, useEffect } from "react";
import L from "leaflet";
import "leaflet-routing-machine";

// 🔹 Handle map clicks
function ClickHandler({ setStart, setEnd, start, end }) {
  useMapEvents({
    click(e) {
      const coords = [e.latlng.lat, e.latlng.lng];

      if (!start) setStart(coords);
      else if (!end) setEnd(coords);
      else {
        setStart(coords);
        setEnd(null);
      }
    },
  });
  return null;
}

// 🔹 Auto center on user
function Recenter({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) map.setView(position, 14);
  }, [position]);
  return null;
}

// 🔹 ROAD ROUTING COMPONENT
function Routing({ start, end }) {
  const map = useMap();

  useEffect(() => {
    if (!start || !end) return;

    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(start[0], start[1]),
        L.latLng(end[0], end[1]),
      ],
      routeWhileDragging: false,
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      
      show: false,              // hides itinerary
      itinerary: { show: false } // extra safety
    }).addTo(map);

    return () => map.removeControl(routingControl);
  }, [start, end]);

  return null;
}

function MapView({ start, end, setStart, setEnd }) {
  const [userPos, setUserPos] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => setUserPos([pos.coords.latitude, pos.coords.longitude]),
      (err) => console.log("Location error:", err.message)
    );
  }, []);

  return (
    <MapContainer
      center={userPos || [14.4426, 79.9865]}
      zoom={14}
      style={{ height: "500px" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <ClickHandler start={start} end={end} setStart={setStart} setEnd={setEnd} />
      <Routing start={start} end={end} />

      {userPos && (
        <>
          <CircleMarker center={userPos} radius={5} pathOptions={{ color: "#2563eb", fillColor: "#3b82f6", fillOpacity: 0.9 }} />
          <CircleMarker center={userPos} radius={16} pathOptions={{ color: "#3b82f6", fillColor: "#3b82f6", fillOpacity: 0.2 }} />
        </>
      )}

      {start && <Marker position={start}><Popup>Start</Popup></Marker>}
      {end && <Marker position={end}><Popup>Destination</Popup></Marker>}

      <Recenter position={userPos} />
    </MapContainer>
  );
}

export default MapView;
