import React from 'react';
import { Lock, Flag } from 'lucide-react';

export default function ChallengeList({ challenges, solvedIds, onSelect }) {
  return (
    <section className="mx-auto max-w-6xl px-6 py-10">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl md:text-3xl font-bold text-white">Challenges</h2>
        <p className="text-sm text-zinc-400">Solve and submit flags to earn points.</p>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {challenges.map((c) => (
          <button
            key={c.id}
            onClick={() => onSelect?.(c)}
            className={`group text-left rounded-xl border border-zinc-800 bg-zinc-900/60 p-5 transition hover:border-zinc-700 hover:bg-zinc-900/80 focus:outline-none focus:ring-2 focus:ring-orange-500/50`}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center rounded-md bg-orange-500/10 px-2 py-0.5 text-xs font-medium text-orange-300 ring-1 ring-orange-500/30">{c.category}</span>
                  <span className="text-xs text-zinc-400">{c.points} pts</span>
                </div>
                <h3 className="mt-2 text-lg font-semibold text-white group-hover:text-orange-200">{c.title}</h3>
              </div>
              <div className="shrink-0">
                {solvedIds.has(c.id) ? (
                  <Flag className="h-5 w-5 text-green-400" />
                ) : (
                  <Lock className="h-5 w-5 text-zinc-500 group-hover:text-zinc-300" />
                )}
              </div>
            </div>
            <p className="mt-2 line-clamp-3 text-sm text-zinc-400">{c.description}</p>
          </button>
        ))}
      </div>
    </section>
  );
}
