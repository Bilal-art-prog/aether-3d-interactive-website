type Props = {
  className?: string;
};

export function Mark({ className = "h-8 w-8" }: Props) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" aria-hidden="true">
      <circle cx="24" cy="24" r="22.2" stroke="currentColor" strokeWidth="0.9" />
      <path
        d="M14.5 32.5L24 14.5L33.5 32.5"
        stroke="currentColor"
        strokeWidth="1.05"
        strokeLinejoin="round"
      />
      <path d="M18.2 32.5H29.8" stroke="currentColor" strokeWidth="1.05" />
      <circle cx="24" cy="24" r="1.35" fill="currentColor" />
    </svg>
  );
}
