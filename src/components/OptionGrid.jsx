import OptionButton from './OptionButton';

export default function OptionGrid({
  options,
  selectedAnswer,
  onSelect,
  disabled = false,
}) {
  return (
    <div
      className="grid grid-cols-1 gap-3 sm:grid-cols-2"
      role="radiogroup"
      aria-label="Quiz Answer Options"
    >
      {options.map((optionText, index) => (
        <OptionButton
          key={index}
          index={index}
          text={optionText}
          isSelected={selectedAnswer === index}
          onSelect={onSelect}
          disabled={disabled}
        />
      ))}
    </div>
  );
}
