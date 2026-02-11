import Peg from './Peg';
import { CODE_LENGTH, type ColorName } from '../lib/gameLogic';
import type { GameStatus } from '../hooks/useGame';

interface SecretCodeProps {
  secretCode: ColorName[];
  gameStatus: GameStatus;
}

export default function SecretCode({ secretCode, gameStatus }: SecretCodeProps) {
  const revealed = import.meta.env.DEV || gameStatus !== 'playing';

  return (
    <div className="flex items-center gap-2 justify-center">
      {Array.from({ length: CODE_LENGTH }).map((_, i) => (
        <div key={i} className="relative">
          {revealed ? (
            <Peg color={secretCode[i]} animated />
          ) : (
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-700 border-2 border-gray-600 flex items-center justify-center">
              <span className="text-gray-400 text-base font-bold">?</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
