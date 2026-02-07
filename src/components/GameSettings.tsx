import { useState, useEffect } from 'react';
import { X, Settings, RotateCcw } from 'lucide-react';
import {
  DEFAULT_SETTINGS,
  GameSettings as GameSettingsType,
} from '../hooks/useGameSettings';

interface GameSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  settings: GameSettingsType;
  onApply: (newSettings: GameSettingsType) => void;
}

export function GameSettings({
  isOpen,
  onClose,
  settings,
  onApply,
}: GameSettingsProps) {
  const [draft, setDraft] = useState<GameSettingsType>(settings);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setDraft(settings);
      setHasChanges(false);
    }
  }, [isOpen, settings]);

  const updateDraft = (updates: Partial<GameSettingsType>) => {
    setDraft((prev) => ({ ...prev, ...updates }));
    setHasChanges(true);
  };

  const handleApply = () => {
    onApply(draft);
    onClose();
  };

  const handleReset = () => {
    setDraft({ ...DEFAULT_SETTINGS });
    setHasChanges(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Settings className="w-6 h-6 text-teal-400" />
            <h2 className="text-2xl font-bold text-white">ゲーム設定</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              試行回数
            </label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="1"
                max="20"
                value={draft.maxAttempts}
                onChange={(e) =>
                  updateDraft({ maxAttempts: parseInt(e.target.value) })
                }
                className="flex-1 accent-teal-500"
              />
              <span className="text-lg font-bold text-white w-8 text-right">
                {draft.maxAttempts}
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              コードの数
            </label>
            <div className="flex gap-2">
              {[3, 4, 5, 6].map((n) => (
                <button
                  key={n}
                  onClick={() => updateDraft({ codeLength: n })}
                  className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all duration-200 ${
                    draft.codeLength === n
                      ? 'bg-teal-600 text-white shadow-lg'
                      : 'bg-white/10 text-gray-400 hover:bg-white/20 hover:text-white'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-1">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={draft.hasTimeLimit}
                  onChange={(e) =>
                    updateDraft({ hasTimeLimit: e.target.checked })
                  }
                  className="sr-only peer"
                />
                <div className="w-10 h-6 bg-white/10 rounded-full peer-checked:bg-teal-600 transition-colors" />
                <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform peer-checked:translate-x-4" />
              </div>
              <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                制限時間を設定
              </span>
            </label>
          </div>

          <div className="pt-1">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={draft.allowDuplicateColors}
                  onChange={(e) =>
                    updateDraft({ allowDuplicateColors: e.target.checked })
                  }
                  className="sr-only peer"
                />
                <div className="w-10 h-6 bg-white/10 rounded-full peer-checked:bg-teal-600 transition-colors" />
                <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transition-transform peer-checked:translate-x-4" />
              </div>
              <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">
                答えで同じ色の重複を許可する
              </span>
            </label>
          </div>

          {draft.hasTimeLimit && (
            <div className="pl-2 border-l-2 border-teal-600/30 ml-1">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                制限時間
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="30"
                  max="600"
                  step="30"
                  value={draft.timeLimitSeconds}
                  onChange={(e) =>
                    updateDraft({
                      timeLimitSeconds: parseInt(e.target.value),
                    })
                  }
                  className="flex-1 accent-teal-500"
                />
                <span className="text-lg font-bold text-white w-16 text-right">
                  {Math.floor(draft.timeLimitSeconds / 60)}:{(draft.timeLimitSeconds % 60).toString().padStart(2, '0')}
                </span>
              </div>
            </div>
          )}
        </div>

        {hasChanges && (
          <p className="mt-4 text-xs text-amber-400">
            設定を適用するとゲームがリセットされます
          </p>
        )}

        <div className="mt-6 flex gap-3">
          <button
            onClick={handleReset}
            className="flex items-center justify-center gap-1.5 px-4 py-3 bg-white/10 text-gray-300 rounded-xl font-semibold hover:bg-white/20 hover:text-white transition-colors"
            title="デフォルトに戻す"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 bg-white/10 text-gray-300 rounded-xl font-semibold hover:bg-white/20 hover:text-white transition-colors"
          >
            キャンセル
          </button>
          <button
            onClick={handleApply}
            className="flex-1 px-4 py-3 bg-teal-600 text-white rounded-xl font-semibold hover:bg-teal-500 transition-colors"
          >
            適用して開始
          </button>
        </div>
      </div>
    </div>
  );
}
