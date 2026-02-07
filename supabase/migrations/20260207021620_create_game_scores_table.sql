/*
  # ゲームスコアテーブルの作成

  1. 新規テーブル
    - `game_scores`
      - `id` (uuid, 主キー)
      - `player_name` (text, プレイヤー名)
      - `attempts_used` (integer, 使用した試行回数)
      - `won` (boolean, 勝敗)
      - `time_seconds` (integer, プレイ時間（秒）)
      - `created_at` (timestamptz, 作成日時)

  2. セキュリティ
    - `game_scores` テーブルにRLSを有効化
    - 匿名ユーザーがスコアを閲覧できるポリシーを追加
    - 匿名ユーザーがスコアを登録できるポリシーを追加
*/

CREATE TABLE IF NOT EXISTS game_scores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  player_name text NOT NULL DEFAULT '',
  attempts_used integer NOT NULL DEFAULT 0,
  won boolean NOT NULL DEFAULT false,
  time_seconds integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE game_scores ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view scores"
  ON game_scores
  FOR SELECT
  TO anon
  USING (won = true);

CREATE POLICY "Anyone can insert scores"
  ON game_scores
  FOR INSERT
  TO anon
  WITH CHECK (true);
