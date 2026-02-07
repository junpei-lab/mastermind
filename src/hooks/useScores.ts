import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'mastermind_scores';

export interface GameScore {
  id: string;
  attempts_used: number;
  won: boolean;
  time_seconds: number;
  created_at: string;
}

function loadScores(): GameScore[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as GameScore[];
  } catch {
    return [];
  }
}

function saveScores(scores: GameScore[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
}

export function addScore(score: Omit<GameScore, 'id' | 'created_at'>) {
  const scores = loadScores();
  scores.push({
    ...score,
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
  });
  saveScores(scores);
}

export function useScores() {
  const [scores, setScores] = useState<GameScore[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchScores = useCallback(() => {
    setLoading(true);
    const all = loadScores()
      .filter((s) => s.won)
      .sort((a, b) => a.attempts_used - b.attempts_used || a.time_seconds - b.time_seconds)
      .slice(0, 10);
    setScores(all);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchScores();
  }, [fetchScores]);

  return { scores, loading, refetch: fetchScores };
}
