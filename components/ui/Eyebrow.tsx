type Props = {
  children: React.ReactNode;
  className?: string;
};

/** Small accent label with a leading glowing dot. */
export default function Eyebrow({ children, className = "" }: Props) {
  return (
    <span
      className={`inline-flex items-center gap-2.5 text-xs font-medium uppercase tracking-[0.25em] text-text-secondary ${className}`}
    >
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
      </span>
      {children}
    </span>
  );
}
