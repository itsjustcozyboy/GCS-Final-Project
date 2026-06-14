'use client';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { copyText } from '@/lib/clipboard';
import { useToast } from './Toast';

/**
 * 복사 버튼 — 성공 시 토스트 + 라벨 "복사됨 ✓"로 일시 변경,
 * 실패 시 직접 복사 안내 토스트. 접근성: aria-live는 Toast가 담당.
 */
export function CopyButton({
  value,
  className = '',
  style,
  label,
}: {
  value: string;
  className?: string;
  style?: React.CSSProperties;
  label?: string;
}) {
  const { t } = useTranslation('common');
  const toast = useToast();
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    const ok = await copyText(value);
    if (ok) {
      setCopied(true);
      toast.success(t('feedback.copied'));
      setTimeout(() => setCopied(false), 2000);
    } else {
      toast.error(t('feedback.copyFailed'));
    }
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={className}
      style={style}
      aria-label={copied ? t('feedback.copiedLabel') : (label ?? t('actions.copy'))}
    >
      {copied ? t('feedback.copiedLabel') : (label ?? t('actions.copy'))}
    </button>
  );
}
