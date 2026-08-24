const LETTERS = ['A', 'B', 'C', 'D'];

export default function OptionButton({
  index,
  text,
  isSelected,
  onSelect,
  disabled = false,
}) {
  const letter = LETTERS[index] || String(index + 1);

  return (
    <button
      type="button"
      role="radio"
      aria-checked={isSelected}
      onClick={() => !disabled && onSelect(index)}
      disabled={disabled}
      className={`group relative flex w-full items-start gap-3.5 rounded-option border p-4 text-left transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 ${
        isSelected
          ? 'border-navy/80 bg-navy/[0.04] ring-1 ring-navy/30 shadow-sm'
          : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50/60'
      } ${disabled ? 'cursor-not-allowed opacity-75' : 'cursor-pointer'}`}
      aria-label={`Option ${letter}: ${text}`}
    >
      {/* Letter Badge */}
      <span
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-[11px] font-semibold transition-all duration-200 ${
          isSelected
            ? 'border-navy bg-navy text-white shadow-sm'
            : 'border-gray-300 bg-white text-gray-400 group-hover:border-gray-400 group-hover:text-gray-600'
        }`}
      >
        {letter}
      </span>

      {/* Option Text */}
      <span
        className={`pt-0.5 text-[13.5px] leading-snug transition-colors ${
          isSelected ? 'font-medium text-navy' : 'text-navy/85 group-hover:text-navy'
        }`}
      >
        {text}
      </span>
    </button>
  );
}
