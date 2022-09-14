import React, { useState, useCallback, useEffect, useMemo } from "react";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

// let DefaultIcon = L.icon({
//   iconUrl: icon,
//   shadowUrl: iconShadow,
// });

// L.Marker.prototype.options.icon = DefaultIcon;

const center = [51.505, -0.09];
const zoom = 13;

function DisplayPosition({ map, currentPosition, pos }) {
  const [position, setPosition] = useState(() => map.getCenter());

  const onClick = useCallback(() => {
    map.setView(center, zoom);
  }, [map]);

  const onMove = useCallback(() => {
    setPosition(map.getCenter());
    currentPosition(map.getCenter());
    pos(map.getCenter());
  }, [map]);

  useEffect(() => {
    map.on("move", onMove);
    return () => {
      map.off("move", onMove);
    };
  }, [map, onMove]);

  return (
    <p>
      latitude: {position.lat.toFixed(4)}, longitude: {position.lng.toFixed(4)}{" "}
      <button onClick={onClick}>reset</button>
    </p>
  );
}

function ExternalStateExample({ absolutePosition }) {
  const [map, setMap] = useState(null);
  const [pos, setPos] = useState({ lat: 51.505, lng: -0.09 });

  console.log(pos);

  const displayMap = () => (
    <MapContainer
      className="w-[100%] h-[10em]"
      center={center}
      zoom={zoom}
      scrollWheelZoom={false}
      ref={setMap}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* <Marker position={[pos.lat, pos.lng]}></Marker> */}
    </MapContainer>
  );

  return (
    <div>
      {map ? (
        <>
          <DisplayPosition
            map={map}
            currentPosition={absolutePosition}
            pos={setPos}
          />
        </>
      ) : null}
      <div>
        <img
          src="/map-marker-icon.jpg"
          width={50}
          height={50}
          className="absolute top-[47%] left-[50%] translate-x-[-50%] z-[1000] translate-y-[-50%]"
        />
      </div>
      {displayMap()}
    </div>
  );
}

export default ExternalStateExample;
