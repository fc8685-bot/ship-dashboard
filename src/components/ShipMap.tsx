'use client';

import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { VesselReport } from '@/types/report';

// Fix Leaflet default icon paths broken by webpack
const fixLeafletIcons = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  });
};

const latestIcon = new L.DivIcon({
  className: '',
  html: `<div style="
    width:18px;height:18px;
    background:#38bdf8;
    border:3px solid #0ea5e9;
    border-radius:50%;
    box-shadow:0 0 12px 4px rgba(56,189,248,0.7);
  "></div>`,
  iconSize: [18, 18],
  iconAnchor: [9, 9],
});

const trackIcon = new L.DivIcon({
  className: '',
  html: `<div style="
    width:10px;height:10px;
    background:#64748b;
    border:2px solid #94a3b8;
    border-radius:50%;
  "></div>`,
  iconSize: [10, 10],
  iconAnchor: [5, 5],
});

function RecenterMap({ lat, lon }: { lat: number; lon: number }) {
  const map = useMap();
  const didSet = useRef(false);
  useEffect(() => {
    if (!didSet.current) {
      map.setView([lat, lon], 5);
      didSet.current = true;
    }
  }, [lat, lon, map]);
  return null;
}

interface Props {
  /** All filtered map reports (last 10 days). Used for Polyline + historical Markers. */
  mapReports: VesselReport[];
  latest: VesselReport;
}

export default function ShipMap({ mapReports, latest }: Props) {
  useEffect(() => {
    fixLeafletIcons();
  }, []);

  const positions: [number, number][] = mapReports.map((r) => [r.LatDecimal, r.LonDecimal]);

  // Exclude the latest-position entry from historical markers to avoid duplicate
  const historicalReports = mapReports.filter(
    (r) => !(r.LatDecimal === latest.LatDecimal && r.LonDecimal === latest.LonDecimal && r.Date === latest.Date),
  );

  return (
    <MapContainer
      center={[latest.LatDecimal, latest.LonDecimal]}
      zoom={5}
      style={{ height: '70vh', width: '100%' }}
      className="rounded-xl"
    >
      <RecenterMap lat={latest.LatDecimal} lon={latest.LonDecimal} />

      {/* Dark maritime tile layer */}
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      />

      {/* 10-day track polyline */}
      {positions.length > 1 && (
        <Polyline positions={positions} color="#38bdf8" weight={2} opacity={0.7} />
      )}

      {/* Historical track markers (last 10 days, excluding latest) */}
      {historicalReports.map((r, i) => (
        <Marker key={i} position={[r.LatDecimal, r.LonDecimal]} icon={trackIcon}>
          <Popup>
            <div className="text-slate-800 text-sm space-y-1 min-w-[160px]">
              <p className="font-semibold text-slate-900">MV Pacific Trader</p>
              <p>
                <span className="font-medium">Date:</span> {r.Date}
              </p>
              <p>
                <span className="font-medium">Destination:</span> {r.Destination || '—'}
              </p>
              <p>
                <span className="font-medium">ETA:</span> {r.ETA || '—'}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}

      {/* Latest position marker (glowing) */}
      <Marker position={[latest.LatDecimal, latest.LonDecimal]} icon={latestIcon}>
        <Popup>
          <div className="text-slate-800 text-sm space-y-1 min-w-[160px]">
            <p className="font-semibold text-base text-sky-700">MV Pacific Trader</p>
            <p>
              <span className="font-medium">Destination:</span> {latest.Destination || '—'}
            </p>
            <p>
              <span className="font-medium">ETA:</span> {latest.ETA || '—'}
            </p>
            <p>
              <span className="font-medium">Last Update:</span> {latest.Date}
            </p>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
}
