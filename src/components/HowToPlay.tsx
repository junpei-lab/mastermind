import { HelpCircle, X } from 'lucide-react';
import { useState } from 'react';

export default function HowToPlay() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors"
      >
        <HelpCircle className="w-4 h-4" />
        遊び方
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl animate-scale-in">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-white">遊び方</h2>
              <button
                onClick={() => setOpen(false)}
                className="p-1 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-sm text-gray-300">
              <p>
                コンピュータが4つの色からなる秘密のコードを作成します。
                10回の試行以内にコードを解読してください。
              </p>

              <div className="space-y-2">
                <h3 className="font-semibold text-white">フィードバックの見方</h3>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-gray-900 border border-gray-600 flex-shrink-0" />
                  <span>色と位置が正しい</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded-full bg-white border border-gray-300 flex-shrink-0" />
                  <span>色は正しいが位置が違う</span>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-white">操作方法</h3>
                <ol className="list-decimal list-inside space-y-1 text-gray-400">
                  <li>スロットをタップして選択</li>
                  <li>下の色パレットから色を選択</li>
                  <li>4つ全て埋めたら「確定」ボタンを押す</li>
                  <li>フィードバックを参考に次の推測をする</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
