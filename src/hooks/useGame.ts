import { useState, useCallback, useRef, useEffect } from 'react';
import {
  generateSecretCode,
  evaluateGuess,
  type ColorName,
  type Guess,
} from '../lib/gameLogic';
import { addScore } from './useScores';
import { GameSettings } from './useGameSettings';

export type GameStatus = 'playing' | 'won' | 'lost' | 'timeout';

interface UseGameProps {
  settings: GameSettings;
  settingsVersion: number;
}

export function useGame({ settings, settingsVersion }: UseGameProps) {
  const [secretCode, setSecretCode] = useState<ColorName[]>(() =>
    generateSecretCode(settings.codeLength, settings.allowDuplicateColors)
  );
  const [guesses, setGuesses] = useState<Guess[]>([]);
  const [currentGuess, setCurrentGuess] = useState<(ColorName | null)[]>(
    Array(settings.codeLength).fill(null)
  );
  const [selectedSlot, setSelectedSlot] = useState(0);
  const [gameStatus, setGameStatus] = useState<GameStatus>('playing');
  const [elapsedTime, setElapsedTime] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  const guessesCountRef = useRef(0);

  useEffect(() => {
    guessesCountRef.current = guesses.length;
  }, [guesses.length]);

  useEffect(() => {
    if (gameStatus !== 'playing') return;

    startTimeRef.current = Date.now();
    timerRef.current = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
      setElapsedTime(elapsed);

      if (settings.hasTimeLimit && elapsed >= settings.timeLimitSeconds) {
        setGameStatus('timeout');
        if (timerRef.current) {
          clearInterval(timerRef.current);
          timerRef.current = null;
        }
        addScore({
          attempts_used: guessesCountRef.current,
          won: false,
          time_seconds: elapsed,
        });
      }
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [secretCode, settings.hasTimeLimit, settings.timeLimitSeconds, gameStatus]);

  const versionRef = useRef(settingsVersion);
  useEffect(() => {
    if (versionRef.current !== settingsVersion) {
      versionRef.current = settingsVersion;
      setSecretCode(generateSecretCode(settings.codeLength, settings.allowDuplicateColors));
      setGuesses([]);
      setCurrentGuess(Array(settings.codeLength).fill(null));
      setSelectedSlot(0);
      setGameStatus('playing');
      setElapsedTime(0);
    }
  }, [settingsVersion, settings.codeLength, settings.allowDuplicateColors]);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const selectColor = useCallback(
    (color: ColorName) => {
      if (gameStatus !== 'playing') return;
      setCurrentGuess((prev) => {
        const next = [...prev];
        next[selectedSlot] = color;
        return next;
      });
      setSelectedSlot((prev) => Math.min(prev + 1, settings.codeLength - 1));
    },
    [gameStatus, selectedSlot, settings.codeLength]
  );

  const clearSlot = useCallback(
    (index: number) => {
      if (gameStatus !== 'playing') return;
      setCurrentGuess((prev) => {
        const next = [...prev];
        next[index] = null;
        return next;
      });
      setSelectedSlot(index);
    },
    [gameStatus]
  );

  const submitGuess = useCallback(() => {
    if (gameStatus !== 'playing') return;
    if (currentGuess.some((c) => c === null)) return;

    const guess = currentGuess as ColorName[];
    const feedback = evaluateGuess(guess, secretCode);
    const newGuess: Guess = { colors: guess, feedback };

    const newGuesses = [...guesses, newGuess];
    setGuesses(newGuesses);
    setCurrentGuess(Array(settings.codeLength).fill(null));
    setSelectedSlot(0);

    if (feedback.black === settings.codeLength) {
      setGameStatus('won');
      stopTimer();
      const finalTime = Math.floor((Date.now() - startTimeRef.current) / 1000);
      setElapsedTime(finalTime);
      addScore({ attempts_used: newGuesses.length, won: true, time_seconds: finalTime });
    } else if (newGuesses.length >= settings.maxAttempts) {
      setGameStatus('lost');
      stopTimer();
      const finalTime = Math.floor((Date.now() - startTimeRef.current) / 1000);
      setElapsedTime(finalTime);
      addScore({ attempts_used: newGuesses.length, won: false, time_seconds: finalTime });
    }
  }, [gameStatus, currentGuess, secretCode, guesses, stopTimer, settings.codeLength, settings.maxAttempts]);

  const resetGame = useCallback(() => {
    setSecretCode(generateSecretCode(settings.codeLength, settings.allowDuplicateColors));
    setGuesses([]);
    setCurrentGuess(Array(settings.codeLength).fill(null));
    setSelectedSlot(0);
    setGameStatus('playing');
    setElapsedTime(0);
  }, [settings.codeLength, settings.allowDuplicateColors]);

  return {
    secretCode,
    guesses,
    currentGuess,
    selectedSlot,
    gameStatus,
    elapsedTime,
    selectColor,
    clearSlot,
    setSelectedSlot,
    submitGuess,
    resetGame,
    attemptsRemaining: settings.maxAttempts - guesses.length,
    timeRemaining: settings.hasTimeLimit
      ? Math.max(0, settings.timeLimitSeconds - elapsedTime)
      : null,
  };
}
