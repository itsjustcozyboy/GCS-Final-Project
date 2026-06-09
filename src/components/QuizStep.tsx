'use client';

interface Option {
  label: string;
  value: string;
}

interface Props {
  question: string;
  options: Option[];
  current: number;
  total: number;
  onAnswer: (value: string) => void;
}

export default function QuizStep({ question, options, current, total, onAnswer }: Props) {
  return (
    <div className="space-y-5">
      <div>
        <div className="flex justify-between text-xs text-gray-400 mb-2">
          <span>질문 {current} / {total}</span>
          <span>{Math.round((current / total) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-1.5">
          <div
            className="bg-gray-700 h-1.5 rounded-full transition-all"
            style={{ width: `${(current / total) * 100}%` }}
          />
        </div>
      </div>
      <h3 className="text-base font-medium text-gray-800 leading-relaxed">{question}</h3>
      <div className="space-y-2">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onAnswer(opt.value)}
            className="w-full text-left border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-colors"
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
