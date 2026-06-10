import { ImageResponse } from 'next/og';

// next/og 내장 — 추가 의존성 없이 OG 이미지를 동적 생성한다.
export const runtime = 'edge';
export const alt = '2분 상속 리스크 자가진단';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: 'linear-gradient(135deg, #6c47ff 0%, #5736d6 100%)',
          color: 'white',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 30, opacity: 0.85, marginBottom: 24 }}>상속 리스크 자가진단</div>
        <div style={{ fontSize: 72, fontWeight: 800, lineHeight: 1.15 }}>
          지금 내 상속 위험,
          <br />
          2분이면 확인합니다
        </div>
        <div style={{ fontSize: 32, opacity: 0.9, marginTop: 32 }}>
          빚 · 3개월 기한 · 재산 파악 · 행정 처리 · 5문항
        </div>
      </div>
    ),
    size
  );
}
