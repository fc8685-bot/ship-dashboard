'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import InfoCards from '@/components/InfoCards';
import { fetchSheetData } from '@/lib/fetchSheet';
import type { VesselReport } from '@/types/report';

const ShipMap = dynamic(() => import('@/components/ShipMap'), {
  ssr: false,
  loading: () => (
    <div
      style={{ height: '70vh' }}
      className="flex items-center justify-center rounded-xl bg-slate-800 text-slate-400 text-sm animate-pulse"
    >
      Loading map…
    </div>
  ),
});

/** Returns the most recent non-empty string value for a given field, newest-first. */
function getLatestNonEmptyValue(
  reports: VesselReport[],
  field: keyof VesselReport,
): string {
  const sorted = [...reports].sort(
    (a, b) => new Date(b.Date).getTime() - new Date(a.Date).getTime(),
  );
  for (const r of sorted) {
    const val = String(r[field] ?? '').trim();
    if (val) return val;
  }
  return '';
}

export default function Home() {
  const [reports, setReports] = useState<VesselReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchSheetData()
      .then((data) => {
        if (data.length === 0) setError(true);
        else setReports(data);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  // Most recent record by Date (for Last Update & Latest Position)
  const latest = reports.at(-1);

  // Resolved display values: fall back to the nearest non-empty entry
  const displayLatest = latest
    ? {
        ...latest,
        Destination: getLatestNonEmptyValue(reports, 'Destination'),
        ETA: getLatestNonEmptyValue(reports, 'ETA'),
      }
    : undefined;

  // Map shows only the last 10 days of position data
  const mapReports = (() => {
    if (!latest) return [];
    const now = new Date(latest.Date);
    const tenDaysAgo = new Date(now.getTime() - 10 * 24 * 60 * 60 * 1000);
    return reports.filter((r) => {
      const d = new Date(r.Date);
      return d >= tenDaysAgo && d <= now && r.LatDecimal && r.LonDecimal;
    });
  })();

  return (
    <main className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-slate-700/60 bg-slate-900/90 backdrop-blur-sm sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🚢</span>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white leading-none">
                MV Pacific Trader
              </h1>
              <p className="text-xs text-sky-400 font-medium tracking-widest uppercase mt-0.5">
                Vessel Tracking Dashboard
              </p>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-900/50 border border-emerald-700 px-3 py-1 text-xs text-emerald-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              LIVE
            </span>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-6 space-y-6">
        {/* State: Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="w-10 h-10 rounded-full border-4 border-sky-500 border-t-transparent animate-spin" />
            <p className="text-slate-400 text-sm">Fetching vessel data…</p>
          </div>
        )}

        {/* State: Error */}
        {!loading && error && (
          <div className="flex flex-col items-center justify-center py-20 space-y-3">
            <span className="text-4xl">⚠️</span>
            <p className="text-red-400 text-lg font-semibold">Unable to load vessel data</p>
            <p className="text-slate-500 text-sm">
              Check that SHEET_CSV_URL is configured in the Netlify environment.
            </p>
          </div>
        )}

        {/* State: Loaded */}
        {!loading && !error && displayLatest && (
          <>
            {/* Info cards */}
            <InfoCards latest={displayLatest} />

            {/* Map section */}
            <section className="rounded-xl border border-slate-700 overflow-hidden shadow-2xl">
              <div className="bg-slate-800/80 px-4 py-2 border-b border-slate-700 flex items-center gap-2">
                <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
                  Voyage Track
                </span>
                <span className="ml-auto text-xs text-slate-500">
                  {reports.length} position report{reports.length !== 1 ? 's' : ''}
                </span>
              </div>
              <ShipMap mapReports={mapReports} latest={displayLatest} />
            </section>

            {/* Legend */}
            <div className="flex flex-wrap gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-sky-400 shadow-[0_0_6px_2px_rgba(56,189,248,0.6)]" />
                Current Position
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-500 border border-slate-400" />
                Historical Position
              </span>
              <span className="flex items-center gap-2">
                <span className="inline-block w-6 h-0.5 bg-sky-400 opacity-70" />
                Voyage Track
              </span>
            </div>
          </>
        )}
      </div>

      {/* Footer */}
      <footer className="mt-12 border-t border-slate-800 py-6 text-center text-xs text-slate-600">
        MV Pacific Trader — Vessel Tracking Dashboard &nbsp;·&nbsp; Map data © OpenStreetMap contributors
      </footer>
    </main>
  );
}
