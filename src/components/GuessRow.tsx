import Peg from './Peg';
import FeedbackPegs from './FeedbackPegs';
import type { Guess, ColorName } from '../lib/gameLogic';

interface GuessRowProps {
  guess?: Guess;
  currentGuess?: (ColorName | null)[];
  selectedSlot?: number;
  onSlotClick?: (index: number) => void;
  rowIndex: number;
  isActive: boolean;
  codeLength: number;
}

export default function GuessRow({
  guess,
  currentGuess,
  selectedSlot,
  onSlotClick,
  rowIndex,
  isActive,
  codeLength,
}: GuessRowProps) {
  return (
    <div
      className={`
        flex items-center gap-2 sm:gap-3 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg transition-all duration-300
        ${isActive ? 'bg-white/10 ring-1 ring-white/20 shadow-lg' : 'bg-white/5'}
      `}
    >
      <span className="text-xs font-mono text-gray-500 w-5 text-right">
        {rowIndex + 1}
      </span>

      <div className="flex gap-2 sm:gap-3">
        {Array.from({ length: codeLength }).map((_, i) => {
          if (guess) {
            return (
              <Peg
                key={i}
                color={guess.colors[i]}
                animated
              />
            );
          }
          if (currentGuess) {
            return (
              <Peg
                key={i}
                color={currentGuess[i]}
                selected={isActive && selectedSlot === i}
                onClick={onSlotClick ? () => onSlotClick(i) : undefined}
              />
            );
          }
          return <Peg key={i} color={null} />;
        })}
      </div>

      <div className="ml-auto">
        {guess ? (
          <FeedbackPegs feedback={guess.feedback} codeLength={codeLength} />
        ) : (
          <div className="w-8 h-8" />
        )}
      </div>
    </div>
  );
}
