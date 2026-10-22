import { ImageResponse } from 'next/og';

export const alt = 'UNIVELLE® — Creative, Technology & Growth';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        background: '#101011',
        color: '#f4f0ea',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 72,
      }}
    >
      <div style={{ fontSize: 44, fontWeight: 700 }}>UNIVELLE®</div>
      <div
        style={{
          fontSize: 120,
          fontWeight: 700,
          lineHeight: 1,
          display: 'flex',
        }}
      >
        WE MAKE WHAT&apos;S&nbsp;<span style={{ color: '#b6a4ff' }}>NEXT</span>
      </div>
      <div style={{ fontSize: 28, color: '#bbb7ba' }}>
        Creative × Technology × Growth
      </div>
    </div>,
    size,
  );
}
