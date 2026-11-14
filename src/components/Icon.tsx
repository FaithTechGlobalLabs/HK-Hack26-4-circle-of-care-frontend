"use client";

// Inline line icons, one per category plus a few UI glyphs (from care/templates/care/_icon.html).
const PATHS: Record<string, React.ReactNode> = {
  housing: (
    <>
      <path d="M3 11l9-7 9 7" />
      <path d="M5 9.5V20h14V9.5" />
      <path d="M10 20v-6h4v6" />
    </>
  ),
  food: (
    <>
      <path d="M3 12h18a9 9 0 0 1-18 0z" />
      <path d="M8.5 8.5c0-1.8 1.8-1.8 1.8-4M13 8.5c0-1.8 1.8-1.8 1.8-4" />
    </>
  ),
  medical: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="4" />
      <path d="M12 8.5v7M8.5 12h7" />
    </>
  ),
  social: (
    <>
      <circle cx="9" cy="8" r="3" />
      <circle cx="17" cy="9" r="2.4" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <path d="M15.5 14.4c2.9.1 5.5 2 5.5 5.6" />
    </>
  ),
  spiritual: (
    <>
      <path d="M12 3c2 2.4 2 4.4 0 6-2-1.6-2-3.6 0-6z" />
      <rect x="9" y="11" width="6" height="10" rx="1.2" />
      <path d="M6 21h12" />
    </>
  ),
  heart: (
    <path d="M12 20s-7.5-4.6-7.5-10.2A4.1 4.1 0 0 1 12 7.3a4.1 4.1 0 0 1 7.5 2.5C19.5 15.4 12 20 12 20z" />
  ),
  hand: (
    <path d="M7 11V6a1.5 1.5 0 0 1 3 0v4M10 10V4.5a1.5 1.5 0 0 1 3 0V10M13 10V5.5a1.5 1.5 0 0 1 3 0V12M16 9.5a1.5 1.5 0 0 1 3 0V14a7 7 0 0 1-7 7h-.5a6 6 0 0 1-4.6-2.2L4 15.4a1.6 1.6 0 0 1 2.4-2.1L7 14" />
  ),
  chat: <path d="M4 5h16v11H9l-5 4z" />,
  back: <path d="M15 5l-7 7 7 7" />,
};

export default function Icon({ name, size = 24 }: { name: string; size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ flex: "none" }}
    >
      {PATHS[name] ?? <circle cx="12" cy="12" r="8" />}
    </svg>
  );
}
