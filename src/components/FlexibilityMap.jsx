import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet marker icons in Vite
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});


// --------------------------------------------------
// DEMO FLEXIBILITY NETWORK
// Locations are simulated for demonstration
// --------------------------------------------------

const cdu = {
  id: "CDU-001",
  name: "Pugal Solar Plant",
  type: "CDU",
  position: [28.0229, 73.3119],
  capacity: "250 MW",
};

const flcs = [
  {
    id: "FLC-001",
    owner: "Ramesh",
    position: [28.0152, 73.3278],
    flexibility: 7.5,
    status: "ACTIVE",
  },
  {
    id: "FLC-002",
    owner: "Suresh",
    position: [28.0418, 73.3395],
    flexibility: 10,
    status: "AVAILABLE",
  },
  {
    id: "FLC-003",
    owner: "Mohan",
    position: [28.0084, 73.2962],
    flexibility: 5,
    status: "AVAILABLE",
  },
  {
    id: "FLC-004",
    owner: "Rajesh",
    position: [28.0491, 73.3071],
    flexibility: 15,
    status: "ACTIVE",
  },
  {
    id: "FLC-005",
    owner: "Amit",
    position: [27.9948, 73.3224],
    flexibility: 7.5,
    status: "AVAILABLE",
  },
  {
    id: "FLC-006",
    owner: "Vijay",
    position: [28.0327, 73.3531],
    flexibility: 12.5,
    status: "ACTIVE",
  },
];


// --------------------------------------------------
// Custom marker
// --------------------------------------------------

function createIcon(type, status) {
  let background = "#f59e0b";

  if (type === "CDU") {
    background = "#ea580c";
  }

  if (status === "ACTIVE") {
    background = "#16a34a";
  }

  return L.divIcon({
    className: "",
    html: `
      <div
        style="
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: ${background};
          border: 3px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.25);
        "
      ></div>
    `,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  });
}


// --------------------------------------------------
// Component
// --------------------------------------------------

export default function FlexibilityMap() {
  return (
    <div className="w-full">

      {/* Header */}
      <div className="mb-4 flex items-end justify-between">

        <div>
          <p className="text-xs font-bold tracking-[0.18em] text-orange-600 uppercase">
            Grid Flexibility
          </p>

          <h2 className="mt-1 text-2xl font-extrabold text-gray-900">
            Flexibility Network
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Live view of connected CDU and flexible loads
          </p>
        </div>

        <div className="rounded-full bg-yellow-50 px-3 py-1.5 text-xs font-bold text-yellow-700">
          DEMO NETWORK
        </div>

      </div>


      {/* Map */}
      <div
        className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm"
        style={{ height: "500px" }}
      >

        <MapContainer
          center={[28.025, 73.325]}
          zoom={13}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%" }}
        >

          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />


          {/* CDU */}
          <Marker
            position={cdu.position}
            icon={createIcon("CDU", "ONLINE")}
          >
            <Popup>
              <div style={{ minWidth: "180px" }}>

                <strong
                  style={{
                    fontSize: "16px",
                    color: "#ea580c",
                  }}
                >
                  CDU-001
                </strong>

                <div style={{ marginTop: "6px" }}>
                  <strong>{cdu.name}</strong>
                </div>

                <div style={{ marginTop: "6px" }}>
                  Capacity: {cdu.capacity}
                </div>

                <div
                  style={{
                    marginTop: "6px",
                    color: "#16a34a",
                    fontWeight: 700,
                  }}
                >
                  ● ONLINE
                </div>

              </div>
            </Popup>
          </Marker>


          {/* FLC → CDU network lines */}
          {flcs.map((flc) => (
            <Polyline
              key={`line-${flc.id}`}
              positions={[
                cdu.position,
                flc.position,
              ]}
              pathOptions={{
                color:
                  flc.status === "ACTIVE"
                    ? "#16a34a"
                    : "#f59e0b",
                weight:
                  flc.status === "ACTIVE"
                    ? 4
                    : 2,
                opacity:
                  flc.status === "ACTIVE"
                    ? 0.75
                    : 0.35,
                dashArray:
                  flc.status === "ACTIVE"
                    ? undefined
                    : "6 8",
              }}
            />
          ))}


          {/* FLC markers */}
          {flcs.map((flc) => (
            <Marker
              key={flc.id}
              position={flc.position}
              icon={createIcon("FLC", flc.status)}
            >
              <Popup>

                <div style={{ minWidth: "170px" }}>

                  <strong
                    style={{
                      fontSize: "16px",
                      color:
                        flc.status === "ACTIVE"
                          ? "#16a34a"
                          : "#d97706",
                    }}
                  >
                    {flc.id}
                  </strong>

                  <div style={{ marginTop: "6px" }}>
                    Owner: {flc.owner}
                  </div>

                  <div style={{ marginTop: "4px" }}>
                    Flexibility:{" "}
                    <strong>
                      {flc.flexibility} kW
                    </strong>
                  </div>

                  <div
                    style={{
                      marginTop: "6px",
                      fontWeight: 700,
                      color:
                        flc.status === "ACTIVE"
                          ? "#16a34a"
                          : "#d97706",
                    }}
                  >
                    ● {flc.status}
                  </div>

                </div>

              </Popup>
            </Marker>
          ))}

        </MapContainer>

      </div>


      {/* Legend */}
      <div className="mt-4 flex flex-wrap gap-5 text-xs font-semibold text-gray-600">

        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-orange-600" />
          CDU / Solar Plant
        </div>

        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-green-600" />
          Active FLC
        </div>

        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-yellow-500" />
          Available FLC
        </div>

      </div>

    </div>
  );
}