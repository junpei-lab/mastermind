import { useState } from 'react';
import { Check, Delete } from 'lucide-react';
import Header from './components/Header';
import SecretCode from './components/SecretCode';
import GameBoard from './components/GameBoard';
import ColorPicker from './components/ColorPicker';
import GameOverModal from './components/GameOverModal';
import Scoreboard from './components/Scoreboard';
import HowToPlay from './components/HowToPlay';
import { GameSettings } from './components/GameSettings';
import { useGame } from './hooks/useGame';
import { useGameSettings } from './hooks/useGameSettings';

function App() {
  const { settings, settingsVersion, applySettings } = useGameSettings();
  const game = useGame({ settings, settingsVersion });
  const [showScoreboard, setShowScoreboard] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const canSubmit =
    game.gameStatus === 'playing' && game.currentGuess.every((c) => c !== null);

  return (
    <div className="h-dvh bg-gray-950 text-white flex flex-col overflow-hidden">
      <div className="max-w-lg mx-auto w-full px-4 pt-4 sm:pt-6 flex flex-col gap-3 shrink-0">
        <Header
          attemptsRemaining={game.attemptsRemaining}
          elapsedTime={game.elapsedTime}
          timeRemaining={game.timeRemaining}
          gameStatus={game.gameStatus}
          onReset={game.resetGame}
          onOpenSettings={() => setShowSettings(true)}
        />

        <div className="flex items-center justify-between">
          <HowToPlay />
          <button
            onClick={() => setShowScoreboard((v) => !v)}
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            {showScoreboard ? 'ゲームに戻る' : 'ランキング'}
          </button>
        </div>

        {!showScoreboard && (
          <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5">
            <SecretCode
              secretCode={game.secretCode}
              gameStatus={game.gameStatus}
            />
          </div>
        )}
      </div>

      <div className="max-w-lg mx-auto w-full px-4 py-3 flex-1 min-h-0 overflow-y-auto">
        {showScoreboard ? (
          <Scoreboard />
        ) : (
          <GameBoard
            guesses={game.guesses}
            currentGuess={game.currentGuess}
            selectedSlot={game.selectedSlot}
            gameStatus={game.gameStatus}
            onSlotClick={(i) => game.setSelectedSlot(i)}
            codeLength={settings.codeLength}
            maxAttempts={settings.maxAttempts}
          />
        )}
      </div>

      {!showScoreboard && (
        <div className="max-w-lg mx-auto w-full px-4 pb-4 sm:pb-6 pt-3 shrink-0 border-t border-white/5 bg-gray-950">
          <div className="flex flex-col gap-3">
            <ColorPicker
              onSelect={game.selectColor}
              disabled={game.gameStatus !== 'playing'}
            />

            <div className="flex gap-3 justify-center">
              <button
                onClick={() => game.clearSlot(game.selectedSlot)}
                disabled={game.gameStatus !== 'playing'}
                className="flex items-center gap-1.5 px-4 py-2 bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white rounded-xl text-sm font-medium transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
              >
                <Delete className="w-4 h-4" />
                クリア
              </button>
              <button
                onClick={game.submitGuess}
                disabled={!canSubmit}
                className="flex items-center gap-1.5 px-6 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-xl text-sm font-medium transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
              >
                <Check className="w-4 h-4" />
                確定
              </button>
            </div>
          </div>
        </div>
      )}

      <GameOverModal
        gameStatus={game.gameStatus}
        attempts={game.guesses.length}
        timeSeconds={game.elapsedTime}
        secretCode={game.secretCode}
        guesses={game.guesses}
        onReset={game.resetGame}
      />

      <GameSettings
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        settings={settings}
        onApply={applySettings}
      />
    </div>
  );
}

export default App;
