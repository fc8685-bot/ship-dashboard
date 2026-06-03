import type { VesselReport } from '@/types/report';

export async function fetchSheetData(): Promise<VesselReport[]> {
  const res = await fetch('/.netlify/functions/reports');
  if (!res.ok) return [];
  return res.json() as Promise<VesselReport[]>;
}
