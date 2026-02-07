export const COLORS = [
  { name: 'red', bg: 'bg-red-500', border: 'border-red-600', ring: 'ring-red-300' },
  { name: 'blue', bg: 'bg-blue-500', border: 'border-blue-600', ring: 'ring-blue-300' },
  { name: 'green', bg: 'bg-emerald-500', border: 'border-emerald-600', ring: 'ring-emerald-300' },
  { name: 'yellow', bg: 'bg-amber-400', border: 'border-amber-500', ring: 'ring-amber-200' },
  { name: 'orange', bg: 'bg-orange-500', border: 'border-orange-600', ring: 'ring-orange-300' },
  { name: 'cyan', bg: 'bg-cyan-500', border: 'border-cyan-600', ring: 'ring-cyan-300' },
] as const;

export const CODE_LENGTH = 4;
export const MAX_ATTEMPTS = 10;

export type ColorName = (typeof COLORS)[number]['name'];

export interface Guess {
  colors: ColorName[];
  feedback: Feedback;
}

export interface Feedback {
  black: number;
  white: number;
}

export function generateSecretCode(
  codeLength: number = CODE_LENGTH,
  allowDuplicateColors: boolean = true
): ColorName[] {
  if (allowDuplicateColors) {
    const code: ColorName[] = [];
    for (let i = 0; i < codeLength; i++) {
      const randomIndex = Math.floor(Math.random() * COLORS.length);
      code.push(COLORS[randomIndex].name);
    }
    return code;
  }

  const shuffledColors = [...COLORS].map((c) => c.name);
  for (let i = shuffledColors.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledColors[i], shuffledColors[j]] = [shuffledColors[j], shuffledColors[i]];
  }
  return shuffledColors.slice(0, codeLength);
}

export function evaluateGuess(guess: ColorName[], secret: ColorName[]): Feedback {
  let black = 0;
  let white = 0;

  const codeLength = secret.length;
  const secretRemaining: (ColorName | null)[] = [...secret];
  const guessRemaining: (ColorName | null)[] = [...guess];

  for (let i = 0; i < codeLength; i++) {
    if (guess[i] === secret[i]) {
      black++;
      secretRemaining[i] = null;
      guessRemaining[i] = null;
    }
  }

  for (let i = 0; i < codeLength; i++) {
    if (guessRemaining[i] === null) continue;
    const matchIndex = secretRemaining.findIndex(
      (s) => s !== null && s === guessRemaining[i]
    );
    if (matchIndex !== -1) {
      white++;
      secretRemaining[matchIndex] = null;
    }
  }

  return { black, white };
}

export function getColorConfig(name: ColorName) {
  return COLORS.find((c) => c.name === name)!;
}
