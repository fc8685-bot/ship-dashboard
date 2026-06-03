import Papa from 'papaparse';
import type { VesselReport } from '../../src/types/report';

export const handler = async () => {
  const url = process.env.SHEET_CSV_URL;
  if (!url) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'SHEET_CSV_URL is not configured' }),
    };
  }

  let csvText: string;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      return {
        statusCode: 502,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: `Upstream fetch failed: ${res.status}` }),
      };
    }
    csvText = await res.text();
  } catch (err) {
    return {
      statusCode: 502,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Failed to fetch sheet data', detail: String(err) }),
    };
  }

  const result = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true,
  });

  const rows = result.data as Record<string, string>[];
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

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=300',
    },
    body: JSON.stringify(reports),
  };
};
