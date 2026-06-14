'use client';
import { createContext, useCallback, useContext, useRef, useState, type ReactNode } from 'react';

export type ToastType = 'success' | 'error' | 'info';
type Toast = { id: number; message: string; type: ToastType };

type ToastContextValue = {
  show: (message: string, type?: ToastType) => void;
  success: (message: string) => void;
  error: (message: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

const ICON: Record<ToastType, string> = { success: '✓', error: '!', info: 'ℹ' };
const BG: Record<ToastType, string> = {
  success: '#2F5C3E',
  error: '#B91C1C',
  info: '#374151',
};

/**
 * 앱 전역 토스트. 시각(색·아이콘) + 텍스트로 결과를 전달하고
 * aria-live 영역으로 스크린리더에도 알린다(접근성).
 */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const idRef = useRef(0);

  const remove = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const show = useCallback(
    (message: string, type: ToastType = 'info') => {
      const id = ++idRef.current;
      setToasts((prev) => [...prev, { id, message, type }]);
      setTimeout(() => remove(id), 2800);
    },
    [remove],
  );

  const success = useCallback((m: string) => show(m, 'success'), [show]);
  const error = useCallback((m: string) => show(m, 'error'), [show]);

  return (
    <ToastContext.Provider value={{ show, success, error }}>
      {children as never}
      <div
        className="pointer-events-none fixed inset-x-0 bottom-4 z-[100] flex flex-col items-center gap-2 px-4"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            className="pointer-events-auto flex max-w-sm items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium text-white shadow-lg"
            style={{ backgroundColor: BG[t.type] }}
          >
            <span aria-hidden className="text-xs font-bold">{ICON[t.type]}</span>
            <span className="break-keep">{t.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    // Provider 밖에서도 앱이 죽지 않도록 no-op 폴백
    return { show: () => {}, success: () => {}, error: () => {} };
  }
  return ctx;
}
