'use client';

import { forwardRef } from 'react';

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
  onBack?: () => void;
}

const QuizStep = forwardRef<HTMLHeadingElement, Props>(function QuizStep(
  { question, options, current, total, onAnswer, onBack },
  ref
) {
  return (
    <div className="space-y-5">
      <div>
        <div className="flex justify-between items-center text-xs text-gray-400 mb-2">
          {onBack ? (
            <button
              type="button"
              onClick={onBack}
              className="-ml-1 px-1 py-0.5 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="이전 단계로"
            >
              ← 이전
            </button>
          ) : (
            <span />
          )}
          <span>
            질문 {current} / {total} · {Math.round((current / total) * 100)}%
          </span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-1.5">
          <div
            className="bg-gray-700 h-1.5 rounded-full transition-all"
            style={{ width: `${(current / total) * 100}%` }}
          />
        </div>
      </div>
      <h3 ref={ref} tabIndex={-1} className="text-base font-medium text-gray-800 leading-relaxed outline-none">
        {question}
      </h3>
      <div className="space-y-2">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onAnswer(opt.value)}
            className="w-full text-left border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-gray-700 hover:border-gray-400 hover:bg-gray-50 transition-colors"
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
});

export default QuizStep;
