'use client';

interface Props {
  price: string;
  label: string;
  features: string[];
  onSelect: () => void;
  highlighted?: boolean;
}

export default function PriceCard({ price, label, features, onSelect, highlighted }: Props) {
  return (
    <div className={`border rounded-2xl p-5 ${highlighted ? 'border-gray-700 bg-gray-50' : 'border-gray-200'}`}>
      {highlighted && (
        <span className="text-xs font-semibold text-gray-600 bg-gray-200 px-2 py-0.5 rounded-full mb-3 inline-block">
          인기
        </span>
      )}
      <div className="text-2xl font-bold text-gray-800 mb-1">{price}</div>
      <div className="text-sm text-gray-500 mb-4">{label}</div>
      <ul className="space-y-1.5 mb-5">
        {features.map((f, i) => (
          <li key={i} className="text-sm text-gray-600 flex gap-2">
            <span className="text-gray-400">✓</span> {f}
          </li>
        ))}
      </ul>
      <button
        onClick={onSelect}
        className={`w-full rounded-xl py-3 text-sm font-medium ${
          highlighted ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        사전예약하기
      </button>
    </div>
  );
}
