import { Brain, RotateCcw, Clock, Target, Settings } from 'lucide-react';
import type { GameStatus } from '../hooks/useGame';

interface HeaderProps {
  attemptsRemaining: number;
  elapsedTime: number;
  timeRemaining: number | null;
  gameStatus: GameStatus;
  onReset: () => void;
  onOpenSettings: () => void;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function Header({
  attemptsRemaining,
  elapsedTime,
  timeRemaining,
  gameStatus,
  onReset,
  onOpenSettings,
}: HeaderProps) {
  const isTimeWarning = timeRemaining !== null && timeRemaining <= 30;
  const isTimeCritical = timeRemaining !== null && timeRemaining <= 10;

  return (
    <header className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center shadow-lg">
          <Brain className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Mastermind
          </h1>
          <p className="text-xs text-gray-400">コードを解読せよ</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5 text-sm text-gray-300">
          <Target className="w-4 h-4 text-teal-400" />
          <span>残り <span className="font-bold text-white">{attemptsRemaining}</span> 回</span>
        </div>

        <div className="flex items-center gap-1.5 text-sm text-gray-300">
          <Clock className={`w-4 h-4 ${isTimeCritical ? 'text-red-400' : isTimeWarning ? 'text-amber-400' : 'text-teal-400'}`} />
          {timeRemaining !== null ? (
            <span className={`font-mono font-bold ${isTimeCritical ? 'text-red-400' : isTimeWarning ? 'text-amber-400' : 'text-white'}`}>
              {formatTime(timeRemaining)}
            </span>
          ) : (
            <span className="font-mono font-bold text-white">{formatTime(elapsedTime)}</span>
          )}
        </div>

        <button
          onClick={onOpenSettings}
          className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-all duration-200 hover:scale-105 active:scale-95"
          title="設定"
        >
          <Settings className="w-4 h-4" />
        </button>

        {gameStatus === 'playing' && (
          <button
            onClick={onReset}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-all duration-200 hover:scale-105 active:scale-95"
            title="リセット"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        )}
      </div>
    </header>
  );
}
