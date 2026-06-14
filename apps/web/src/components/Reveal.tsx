'use client';
import { useEffect, useRef, useState, type ReactNode } from 'react';

type Direction = 'up' | 'left' | 'right';

const DIR_CLASS: Record<Direction, string> = {
  up: '',
  left: 'reveal-left',
  right: 'reveal-right',
};

/**
 * 스크롤로 뷰포트에 들어오면 fade-in/slide로 등장하는 래퍼.
 * IntersectionObserver 기반(추가 라이브러리 없음). prefers-reduced-motion은 CSS에서 존중.
 */
export function Reveal({
  children,
  direction = 'up',
  delayMs = 0,
  className = '',
  as = 'div',
}: {
  children: ReactNode;
  direction?: Direction;
  delayMs?: number;
  className?: string;
  as?: 'div' | 'li' | 'section';
}) {
  const Tag = as as ElementType;
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // IntersectionObserver 미지원 환경에서는 즉시 노출(점진적 향상)
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -10% 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      className={`reveal ${DIR_CLASS[direction]} ${visible ? 'is-visible' : ''} ${className}`.trim()}
      style={delayMs ? { transitionDelay: `${delayMs}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
