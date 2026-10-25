/** Two-tone bulb mark inspired by the BYTELAMP reference. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M29 4C18 5 10 13 10 24c0 8 4 13 8 18 2 3 2 5 2 8 0 2 2 3 4 3h3v-6c0-6-3-10-6-15-2-3-3-6-3-10 0-7 4-12 11-14Z"
        fill="currentColor"
      />
      <path
        d="M29 8c-7 2-11 7-11 14 0 4 1 7 3 10 3 5 6 9 6 15-1-6-4-11-8-16-3-4-4-7-4-10 0-7 5-12 14-14Z"
        fill="var(--violet, #c8ff2e)"
      />
      <path
        d="M34 4c11 1 20 9 20 20 0 8-4 13-8 18-2 3-2 5-2 8 0 2-2 3-4 3H25c4-1 7-3 9-6h5c0-6 3-10 6-15 2-3 3-6 3-10 0-7-5-12-11-14-2-1-3-2-3-4Z"
        fill="var(--violet, #c8ff2e)"
      />
      <path
        d="M34 8c9 3 14 8 14 16 0 5-2 9-5 13-3 4-4 7-4 10 0-6 2-11 5-16 2-3 3-6 3-9 0-6-4-10-10-12-2-1-3-1-3-2Z"
        fill="var(--violet, #c8ff2e)"
        fillOpacity="0.65"
      />
      <rect x="27" y="20" width="10" height="10" rx="1.5" fill="currentColor" />
      <rect x="21" y="55" width="22" height="5" rx="2.5" fill="currentColor" />
      <path d="M25.5 61h13c0 2-2.5 3-6.5 3s-6.5-1-6.5-3Z" fill="currentColor" />
    </svg>
  );
}
