import React, { useState } from 'react';
import { Flag, Send, User } from 'lucide-react';

export default function FlagSubmit({ onSubmit, teamName, setTeamName, lastResult }) {
  const [flagInput, setFlagInput] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (!flagInput.trim()) return;
    onSubmit(flagInput.trim());
    setFlagInput('');
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-10">
      <h2 className="text-2xl md:text-3xl font-bold text-white">Submit Flag</h2>
      <p className="mt-1 text-sm text-zinc-400">Enter your team name once, then submit flags as you solve challenges.</p>
      <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-3">
        <label className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/60 px-3 py-2 focus-within:ring-2 focus-within:ring-orange-500/40">
          <User className="h-4 w-4 text-zinc-400" />
          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            placeholder="Team name"
            required
            className="w-full bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none"
          />
        </label>
        <label className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900/60 px-3 py-2 focus-within:ring-2 focus-within:ring-orange-500/40 md:col-span-2">
          <Flag className="h-4 w-4 text-zinc-400" />
          <input
            type="text"
            value={flagInput}
            onChange={(e) => setFlagInput(e.target.value)}
            placeholder="CTF{your_flag_here}"
            className="w-full bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none"
          />
        </label>
        <div className="md:col-span-3">
          <button type="submit" className="inline-flex items-center gap-2 rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white shadow ring-1 ring-orange-500/50 transition hover:bg-orange-500">
            <Send className="h-4 w-4" />
            Submit Flag
          </button>
        </div>
      </form>

      {lastResult && (
        <div className={`mt-4 rounded-lg border px-4 py-3 text-sm ${lastResult.ok ? 'border-green-800 bg-green-900/40 text-green-200' : 'border-red-800 bg-red-900/40 text-red-200'}`}>
          {lastResult.message}
        </div>
      )}
    </section>
  );
}
