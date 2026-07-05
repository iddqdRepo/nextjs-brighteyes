import React, { useEffect, useRef } from "react";

//OpenStreetMap via Leaflet: no API key, no billing account, free forever.
const CENTER = [54.4205, -7.5482];
const MARKER = [54.42058128181346, -7.548278487004571];

const containerStyle = {
  width: "100%",
  height: "500px",
};

function Map() {
  const containerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    //Leaflet touches `window` at import time, so it can only load in the browser.
    import("leaflet").then(({ default: L }) => {
      if (cancelled || mapRef.current || !containerRef.current) {
        return;
      }

      const map = L.map(containerRef.current, {
        center: CENTER,
        zoom: 11,
        scrollWheelZoom: false,
      });
      mapRef.current = map;

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      //Bundlers break Leaflet's default icon URL detection, so the marker
      //images are served from /public/leaflet instead.
      const icon = L.icon({
        iconUrl: "/leaflet/marker-icon.png",
        iconRetinaUrl: "/leaflet/marker-icon-2x.png",
        shadowUrl: "/leaflet/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });
      L.marker(MARKER, { icon }).addTo(map);
    });

    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return <div ref={containerRef} style={containerStyle} />;
}

export default Map;
