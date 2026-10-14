type Props = {
  children: React.ReactNode;
  className?: string;
  /** "sm" keeps long labels on one line on phones. */
  size?: "sm" | "md";
};

/** Small accent label with a leading glowing dot. */
export default function Eyebrow({ children, className = "", size = "md" }: Props) {
  const type =
    size === "sm"
      ? "whitespace-nowrap text-[10px] tracking-[0.18em] sm:text-xs sm:tracking-[0.25em]"
      : "text-xs tracking-[0.25em]";
  return (
    <span
      className={`inline-flex items-center gap-2.5 font-medium uppercase text-text-secondary ${type} ${className}`}
    >
      <span className="relative flex h-1.5 w-1.5 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
      </span>
      {children}
    </span>
  );
}
