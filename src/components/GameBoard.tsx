import { useRef, useEffect } from 'react';
import GuessRow from './GuessRow';
import type { Guess, ColorName } from '../lib/gameLogic';
import type { GameStatus } from '../hooks/useGame';

interface GameBoardProps {
  guesses: Guess[];
  currentGuess: (ColorName | null)[];
  selectedSlot: number;
  gameStatus: GameStatus;
  onSlotClick: (index: number) => void;
  codeLength: number;
  maxAttempts: number;
}

export default function GameBoard({
  guesses,
  currentGuess,
  selectedSlot,
  gameStatus,
  onSlotClick,
  codeLength,
  maxAttempts,
}: GameBoardProps) {
  const activeRow = guesses.length;
  const activeRowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    activeRowRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [activeRow]);

  return (
    <div className="flex flex-col gap-1">
      {Array.from({ length: maxAttempts }).map((_, rowIndex) => {
        const isActiveRow = rowIndex === activeRow && gameStatus === 'playing';

        return (
          <div key={rowIndex} ref={isActiveRow ? activeRowRef : undefined}>
            {rowIndex < guesses.length ? (
              <GuessRow
                guess={guesses[rowIndex]}
                rowIndex={rowIndex}
                isActive={false}
                codeLength={codeLength}
              />
            ) : isActiveRow ? (
              <GuessRow
                currentGuess={currentGuess}
                selectedSlot={selectedSlot}
                onSlotClick={onSlotClick}
                rowIndex={rowIndex}
                isActive
                codeLength={codeLength}
              />
            ) : (
              <GuessRow
                rowIndex={rowIndex}
                isActive={false}
                codeLength={codeLength}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
