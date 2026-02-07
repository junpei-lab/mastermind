import { useState, useCallback } from 'react';

const SETTINGS_KEY = 'mastermind_settings';

export interface GameSettings {
  maxAttempts: number;
  hasTimeLimit: boolean;
  timeLimitSeconds: number;
  codeLength: number;
  allowDuplicateColors: boolean;
}

export const DEFAULT_SETTINGS: GameSettings = {
  maxAttempts: 10,
  hasTimeLimit: false,
  timeLimitSeconds: 300,
  codeLength: 4,
  allowDuplicateColors: true,
};

function loadSettings(): GameSettings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

function saveSettings(settings: GameSettings) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
}

export function useGameSettings() {
  const [settings, setSettings] = useState<GameSettings>(loadSettings);
  const [settingsVersion, setSettingsVersion] = useState(0);

  const applySettings = useCallback((newSettings: GameSettings) => {
    setSettings(newSettings);
    saveSettings(newSettings);
    setSettingsVersion((v) => v + 1);
  }, []);

  return { settings, settingsVersion, applySettings };
}
