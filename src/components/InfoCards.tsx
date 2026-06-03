'use client';

import type { VesselReport } from '@/types/report';

interface Props {
  latest: VesselReport;
}

function formatCoord(value: number, posDir: string, negDir: string) {
  const dir = value >= 0 ? posDir : negDir;
  return `${Math.abs(value).toFixed(4)} ${dir}`;
}

export default function InfoCards({ latest }: Props) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      <Card title="Last Update" icon="🕒">
        <p className="text-sm text-sky-300 font-mono">{latest.Date}</p>
      </Card>

      <Card title="Latest Position" icon="📍">
        <p className="text-sm text-sky-300 font-mono leading-relaxed">
          {formatCoord(latest.LatDecimal, 'N', 'S')}
          <br />
          {formatCoord(latest.LonDecimal, 'E', 'W')}
        </p>
      </Card>

      <Card title="Destination" icon="⚓">
        <p className="text-sm text-sky-300 font-semibold">{latest.Destination || '—'}</p>
      </Card>

      <Card title="ETA" icon="📅">
        <p className="text-sm text-sky-300 font-mono">{latest.ETA || '—'}</p>
      </Card>
    </div>
  );
}

function Card({
  title,
  icon,
  children,
}: {
  title: string;
  icon: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-slate-700 bg-slate-800/80 p-4 shadow-lg backdrop-blur-sm">
      <div className="mb-2 flex items-center gap-2">
        <span className="text-base">{icon}</span>
        <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
          {title}
        </span>
      </div>
      {children}
    </div>
  );
}
