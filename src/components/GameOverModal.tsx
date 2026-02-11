import { Trophy, XCircle, RotateCcw } from 'lucide-react';
import Peg from './Peg';
import FeedbackPegs from './FeedbackPegs';
import type { ColorName, Guess } from '../lib/gameLogic';
import type { GameStatus } from '../hooks/useGame';

interface GameOverModalProps {
  gameStatus: GameStatus;
  attempts: number;
  timeSeconds: number;
  secretCode: ColorName[];
  guesses: Guess[];
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
  guesses,
  onReset,
}: GameOverModalProps) {
  if (gameStatus === 'playing') return null;

  const won = gameStatus === 'won';
  const timeout = gameStatus === 'timeout';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 sm:p-8 max-w-md w-full mx-4 shadow-2xl animate-scale-in max-h-[90vh] overflow-y-auto">
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

          {guesses.length > 0 && (
            <div className="w-full text-left border border-white/10 rounded-xl bg-black/20 p-3">
              <div className="text-xs text-gray-400 mb-2 font-medium">試行履歴</div>
              <div className="flex flex-col gap-2 max-h-52 overflow-y-auto pr-1">
                {guesses.map((guess, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 rounded-lg bg-white/5 px-2 py-1.5"
                  >
                    <span className="w-6 text-xs font-mono text-gray-400 text-right">
                      {i + 1}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {guess.colors.map((color, colorIndex) => (
                        <Peg key={colorIndex} color={color} size="sm" />
                      ))}
                    </div>
                    <div className="ml-auto">
                      <FeedbackPegs feedback={guess.feedback} codeLength={secretCode.length} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

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
