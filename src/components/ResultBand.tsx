export type Band = 'green' | 'yellow' | 'red';

const BAND_CONFIG = {
  green: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    text: 'text-green-800',
    icon: '🟢',
    label: '양호',
  },
  yellow: {
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    text: 'text-yellow-800',
    icon: '🟡',
    label: '주의',
  },
  red: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    text: 'text-red-800',
    icon: '🔴',
    label: '위험',
  },
};

interface Props {
  band: Band;
  title: string;
  description: string;
}

export default function ResultBand({ band, title, description }: Props) {
  const cfg = BAND_CONFIG[band];
  return (
    <div className={`${cfg.bg} ${cfg.border} border rounded-2xl p-5`}>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xl">{cfg.icon}</span>
        <span className={`font-semibold ${cfg.text}`}>{cfg.label}: {title}</span>
      </div>
      <p className={`text-sm leading-relaxed ${cfg.text} opacity-80`}>{description}</p>
    </div>
  );
}
