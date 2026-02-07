import { Trophy, Clock, Hash, Loader2 } from 'lucide-react';
import { useScores } from '../hooks/useScores';

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function Scoreboard() {
  const { scores, loading } = useScores();

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6">
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="w-5 h-5 text-amber-400" />
        <h2 className="text-lg font-bold text-white">ランキング</h2>
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="w-6 h-6 text-gray-400 animate-spin" />
        </div>
      ) : scores.length === 0 ? (
        <p className="text-gray-500 text-sm text-center py-4">
          まだスコアがありません。最初のクリアを目指しましょう!
        </p>
      ) : (
        <div className="space-y-2">
          <div className="grid grid-cols-3 text-xs text-gray-500 px-3 pb-1 border-b border-white/5">
            <div className="flex items-center gap-1">
              <Hash className="w-3 h-3" />
              順位
            </div>
            <div className="flex items-center gap-1 justify-center">
              <Trophy className="w-3 h-3" />
              試行回数
            </div>
            <div className="flex items-center gap-1 justify-end">
              <Clock className="w-3 h-3" />
              タイム
            </div>
          </div>
          {scores.map((score, i) => (
            <div
              key={score.id}
              className={`
                grid grid-cols-3 px-3 py-2 rounded-lg text-sm transition-colors
                ${i === 0 ? 'bg-amber-500/10 text-amber-300' : ''}
                ${i === 1 ? 'bg-gray-400/10 text-gray-300' : ''}
                ${i === 2 ? 'bg-orange-500/10 text-orange-300' : ''}
                ${i > 2 ? 'text-gray-400' : ''}
              `}
            >
              <div className="font-bold">
                {i === 0 && '1st'}
                {i === 1 && '2nd'}
                {i === 2 && '3rd'}
                {i > 2 && `${i + 1}th`}
              </div>
              <div className="text-center">{score.attempts_used}回</div>
              <div className="text-right">{formatTime(score.time_seconds)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
