import type { Feedback } from '../lib/gameLogic';

interface FeedbackPegsProps {
  feedback: Feedback;
  codeLength: number;
}

export default function FeedbackPegs({ feedback, codeLength }: FeedbackPegsProps) {
  const pegs: ('black' | 'white' | 'empty')[] = [];
  for (let i = 0; i < feedback.black; i++) pegs.push('black');
  for (let i = 0; i < feedback.white; i++) pegs.push('white');
  while (pegs.length < codeLength) pegs.push('empty');

  return (
    <div className="grid grid-cols-2 gap-1">
      {pegs.map((type, i) => (
        <div
          key={i}
          className={`
            w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full border transition-all duration-300
            ${type === 'black' ? 'bg-gray-900 border-gray-700 shadow-md' : ''}
            ${type === 'white' ? 'bg-white border-gray-300 shadow-md' : ''}
            ${type === 'empty' ? 'bg-gray-700/30 border-gray-700/50' : ''}
          `}
          style={{ animationDelay: `${i * 100}ms` }}
        />
      ))}
    </div>
  );
}
