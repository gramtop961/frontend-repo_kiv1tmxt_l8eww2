import React from 'react';
import { Trophy, Medal } from 'lucide-react';

export default function Leaderboard({ leaderboard }) {
  const sorted = [...leaderboard].sort((a, b) => b.score - a.score).slice(0, 10);
  return (
    <section className="mx-auto max-w-6xl px-6 py-10">
      <div className="flex items-center gap-2">
        <Trophy className="h-6 w-6 text-yellow-300" />
        <h2 className="text-2xl md:text-3xl font-bold text-white">Leaderboard</h2>
      </div>
      {sorted.length === 0 ? (
        <p className="mt-3 text-sm text-zinc-400">No entries yet. Be the first to score!</p>
      ) : (
        <ol className="mt-4 divide-y divide-zinc-800 rounded-xl border border-zinc-800 bg-zinc-900/60">
          {sorted.map((entry, idx) => (
            <li key={entry.team} className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="w-8 text-center text-sm font-semibold text-zinc-400">#{idx + 1}</span>
                <span className="text-white font-medium">{entry.team}</span>
              </div>
              <div className="flex items-center gap-2">
                {idx < 3 && <Medal className={`h-4 w-4 ${idx === 0 ? 'text-yellow-300' : idx === 1 ? 'text-gray-300' : 'text-amber-700'}`} />}
                <span className="tabular-nums text-orange-300">{entry.score} pts</span>
              </div>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
