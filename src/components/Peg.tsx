import { getColorConfig, type ColorName } from '../lib/gameLogic';

interface PegProps {
  color: ColorName | null;
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  selected?: boolean;
  animated?: boolean;
}

const sizeClasses = {
  sm: 'w-5 h-5',
  md: 'w-9 h-9 sm:w-10 sm:h-10',
  lg: 'w-10 h-10 sm:w-12 sm:h-12',
};

export default function Peg({ color, size = 'md', onClick, selected, animated }: PegProps) {
  const config = color ? getColorConfig(color) : null;

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        ${sizeClasses[size]}
        rounded-full border-2 transition-all duration-200
        ${config ? `${config.bg} ${config.border} shadow-inner` : 'bg-gray-800/50 border-gray-600'}
        ${selected ? 'ring-2 ring-offset-2 ring-offset-gray-900 ring-white scale-110' : ''}
        ${onClick ? 'cursor-pointer hover:scale-110 active:scale-95' : 'cursor-default'}
        ${animated ? 'animate-bounce-in' : ''}
      `}
      disabled={!onClick}
    />
  );
}
