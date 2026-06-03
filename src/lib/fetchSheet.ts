import Papa from 'papaparse';
import type { VesselReport } from '@/types/report';

export async function fetchSheetData(): Promise<VesselReport[]> {
  const url = process.env.NEXT_PUBLIC_SHEET_CSV_URL;
  if (!url) return [];

  return new Promise((resolve, reject) => {
    Papa.parse(url, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const rows = results.data as Record<string, string>[];
        const reports: VesselReport[] = rows
          .filter((row) => row.Date && row.LatDecimal && row.LonDecimal)
          .map((row) => ({
            Date: row.Date?.trim() ?? '',
            ReportType: row.ReportType?.trim() ?? '',
            Destination: row.Destination?.trim() ?? '',
            ETA: row.ETA?.trim() ?? '',
            Latitude: row.Latitude?.trim() ?? '',
            Longitude: row.Longitude?.trim() ?? '',
            LatDecimal: parseFloat(row.LatDecimal),
            LonDecimal: parseFloat(row.LonDecimal),
          }))
          .filter((r) => !isNaN(r.LatDecimal) && !isNaN(r.LonDecimal))
          .sort((a, b) => new Date(a.Date).getTime() - new Date(b.Date).getTime());
        resolve(reports);
      },
      error: (err) => reject(err),
    });
  });
}
