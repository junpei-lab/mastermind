import { Trophy, XCircle, RotateCcw } from 'lucide-react';
import Peg from './Peg';
import type { ColorName } from '../lib/gameLogic';
import type { GameStatus } from '../hooks/useGame';

interface GameOverModalProps {
  gameStatus: GameStatus;
  attempts: number;
  timeSeconds: number;
  secretCode: ColorName[];
  onReset: () => void;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function GameOverModal({
  gameStatus,
  attempts,
  timeSeconds,
  secretCode,
  onReset,
}: GameOverModalProps) {
  if (gameStatus === 'playing') return null;

  const won = gameStatus === 'won';
  const timeout = gameStatus === 'timeout';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 sm:p-8 max-w-sm w-full mx-4 shadow-2xl animate-scale-in">
        <div className="flex flex-col items-center text-center gap-4">
          {won ? (
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <Trophy className="w-8 h-8 text-emerald-400" />
            </div>
          ) : (
            <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center">
              <XCircle className="w-8 h-8 text-red-400" />
            </div>
          )}

          <h2 className="text-2xl font-bold text-white">
            {won ? 'おめでとうございます!' : '残念...'}
          </h2>

          <p className="text-gray-400">
            {won
              ? `${attempts}回の試行で解読しました!`
              : timeout
              ? '時間切れです。'
              : 'コードを解読できませんでした。'}
          </p>

          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-gray-500 uppercase tracking-wider font-medium">答え</span>
            <div className="flex items-center gap-2">
              {secretCode.map((color, i) => (
                <Peg key={i} color={color} animated />
              ))}
            </div>
          </div>

          <div className="flex gap-6 text-sm text-gray-300">
            <div className="text-center">
              <div className="text-lg font-bold text-white">{attempts}</div>
              <div className="text-gray-500">試行回数</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-white">{formatTime(timeSeconds)}</div>
              <div className="text-gray-500">タイム</div>
            </div>
          </div>

          <button
            onClick={onReset}
            className="mt-2 flex items-center gap-2 px-6 py-3 bg-teal-600 hover:bg-teal-500 text-white font-medium rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            もう一度プレイ
          </button>
        </div>
      </div>
    </div>
  );
}
