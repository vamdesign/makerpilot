type Props = { className?: string };

/** Three lines + small arrow — sort menu trigger. */
export default function SortMenuIcon({ className }: Props) {
  return (
    <svg
      className={className}
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path d="M3 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M3 11h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M3 16h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path
        d="M16.5 8.5v5M16.5 13.5l1.5-1.5M16.5 13.5L15 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
