'use client';

interface Props {
  open: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
}

export default function HonestRevealModal({ open, onClose, title, message }: Props) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-xl">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">
          {title ?? '베타 준비 중입니다'}
        </h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          {message ?? '지금은 수요를 확인하는 단계입니다. 현재 과금되지 않으며, 베타 오픈 시 가장 먼저 안내해드립니다.'}
        </p>
        <div className="bg-blue-50 rounded-lg p-3 mb-4">
          <p className="text-blue-700 text-xs font-medium">✓ 지금은 과금되지 않습니다</p>
          <p className="text-blue-700 text-xs">✓ 베타 오픈 시 우선 안내드립니다</p>
        </div>
        <button
          onClick={onClose}
          className="w-full bg-gray-800 text-white rounded-xl py-3 font-medium text-sm"
        >
          확인했습니다
        </button>
      </div>
    </div>
  );
}
