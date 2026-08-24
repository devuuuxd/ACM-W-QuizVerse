export default function BackgroundDecoration() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* Upper-right geometric arcs */}
      <svg
        className="absolute -right-16 -top-16 h-72 w-72 text-navy/[0.04] sm:h-80 sm:w-80"
        viewBox="0 0 200 200"
        fill="none"
      >
        <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="0.5" />
        <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="0.4" />
        <circle cx="100" cy="100" r="50" stroke="currentColor" strokeWidth="0.3" />
      </svg>

      {/* Lower-left geometric arcs */}
      <svg
        className="absolute -bottom-12 -left-12 h-56 w-56 text-navy/[0.03] sm:h-64 sm:w-64"
        viewBox="0 0 200 200"
        fill="none"
      >
        <circle cx="100" cy="100" r="90" stroke="currentColor" strokeWidth="0.5" />
        <circle cx="100" cy="100" r="65" stroke="currentColor" strokeWidth="0.3" />
      </svg>

      {/* Ultra-subtle grid pattern */}
      <div className="bg-grid-pattern absolute inset-0 opacity-40" />
    </div>
  );
}
