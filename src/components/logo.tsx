/** Bulb mark: left half in currentColor, right half in the accent lime. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M30 10.1A16 16 0 0 0 20.7 37.3Q24 40.6 24 44V46H30"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M34 10.1A16 16 0 0 1 43.3 37.3Q40 40.6 40 44V46H34"
        stroke="#c8ff2e"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="27.5" y="21.5" width="9" height="9" rx="2" fill="currentColor" />
      <rect x="22" y="50" width="20" height="4.5" rx="2.25" fill="currentColor" />
      <rect x="26" y="57" width="12" height="4" rx="2" fill="#c8ff2e" />
    </svg>
  );
}
