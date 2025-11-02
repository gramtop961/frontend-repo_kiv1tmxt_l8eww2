import React, { useEffect, useMemo, useState } from 'react';
import { Ghost, Skull, Trophy } from 'lucide-react';

function useCountdown(targetDate) {
  const target = useMemo(() => new Date(targetDate).getTime(), [targetDate]);
  const [timeLeft, setTimeLeft] = useState(target - Date.now());

  useEffect(() => {
    const tick = () => setTimeLeft(target - Date.now());
    const id = setInterval(tick, 1000);
    tick();
    return () => clearInterval(id);
  }, [target]);

  const clamped = Math.max(0, timeLeft);
  const seconds = Math.floor((clamped / 1000) % 60);
  const minutes = Math.floor((clamped / (1000 * 60)) % 60);
  const hours = Math.floor((clamped / (1000 * 60 * 60)) % 24);
  const days = Math.floor(clamped / (1000 * 60 * 60 * 24));

  return { days, hours, minutes, seconds };
}

export default function Header() {
  // Countdown to next Halloween (Oct 31). If passed for this year, use next year.
  const now = new Date();
  const isAfterHalloween = now.getMonth() > 9 || (now.getMonth() === 9 && now.getDate() > 31);
  const year = isAfterHalloween ? now.getFullYear() + 1 : now.getFullYear();
  const { days, hours, minutes, seconds } = useCountdown(`${year}-10-31T23:59:59`);

  return (
    <header className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-500/20 via-purple-700/20 to-black" />
      <div className="relative mx-auto max-w-6xl px-6 py-14">
        <div className="flex items-center gap-3 text-orange-400">
          <Ghost className="h-6 w-6" />
          <span className="uppercase tracking-widest text-sm font-semibold">Halloween CTF</span>
        </div>
        <h1 className="mt-4 text-4xl md:text-6xl font-extrabold text-white drop-shadow-[0_2px_8px_rgba(255,165,0,0.3)]">
          Spooktacular CTF Challenge
        </h1>
        <p className="mt-4 max-w-2xl text-base md:text-lg text-zinc-300">
          Sharpen your skills across crypto, web, forensics and more. Solve challenges, submit flags, and climb the leaderboard before the witching hour.
        </p>

        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <CountdownCard label="Days" value={days} />
          <CountdownCard label="Hours" value={hours} />
          <CountdownCard label="Minutes" value={minutes} />
          <CountdownCard label="Seconds" value={seconds} />
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-zinc-300">
          <div className="inline-flex items-center gap-2 rounded-full bg-zinc-800/60 px-3 py-1 ring-1 ring-zinc-700">
            <Skull className="h-4 w-4 text-purple-300" />
            <span>Beginner to Advanced</span>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-zinc-800/60 px-3 py-1 ring-1 ring-zinc-700">
            <Trophy className="h-4 w-4 text-yellow-300" />
            <span>Score points. Top the board.</span>
          </div>
        </div>
      </div>
    </header>
  );
}

function CountdownCard({ label, value }) {
  const display = String(value).padStart(2, '0');
  return (
    <div className="rounded-xl bg-zinc-900/60 p-4 text-center ring-1 ring-zinc-700/60 backdrop-blur">
      <div className="text-3xl md:text-4xl font-bold text-white tabular-nums">{display}</div>
      <div className="mt-1 text-xs uppercase tracking-wider text-zinc-400">{label}</div>
    </div>
  );
}
