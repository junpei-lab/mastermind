import { COLORS, type ColorName } from '../lib/gameLogic';

interface ColorPickerProps {
  onSelect: (color: ColorName) => void;
  disabled: boolean;
}

export default function ColorPicker({ onSelect, disabled }: ColorPickerProps) {
  return (
    <div className="flex gap-2.5 sm:gap-3 justify-center flex-wrap">
      {COLORS.map((color) => (
        <button
          key={color.name}
          type="button"
          onClick={() => onSelect(color.name)}
          disabled={disabled}
          className={`
            w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 transition-all duration-200
            ${color.bg} ${color.border}
            ${disabled
              ? 'opacity-40 cursor-not-allowed'
              : 'hover:scale-125 active:scale-95 cursor-pointer shadow-lg hover:shadow-xl'
            }
          `}
        />
      ))}
    </div>
  );
}
