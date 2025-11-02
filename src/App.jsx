import React, { useEffect, useMemo, useState } from 'react';
import Header from './components/Header';
import ChallengeList from './components/ChallengeList';
import FlagSubmit from './components/FlagSubmit';
import Leaderboard from './components/Leaderboard';

const initialChallenges = [
  {
    id: 'web-ghostly-headers',
    title: 'Ghostly Headers',
    category: 'Web',
    points: 100,
    description: 'A mischievous ghost hid a flag in the request headers. Can you conjure it?',
    flag: 'CTF{boo_headers}',
  },
  {
    id: 'crypto-pumpkin-cipher',
    title: 'Pumpkin Patch Cipher',
    category: 'Crypto',
    points: 200,
    description: 'A substitution cipher carved into a pumpkin. Crack it to reveal the treat.',
    flag: 'CTF{pumpkin_spice}',
  },
  {
    id: 'forensics-midnight-whisper',
    title: 'Midnight Whisper',
    category: 'Forensics',
    points: 250,
    description: 'An eerie audio clip whispers the flag. Clean the noise and listen closely.',
    flag: 'CTF{spectral_voice}',
  },
  {
    id: 'misc-witchs-brew',
    title: "Witch's Brew",
    category: 'Misc',
    points: 150,
    description: 'A potion of base encodings and tricks. Combine the right ingredients.',
    flag: 'CTF{double_double}',
  },
];

export default function App() {
  const [teamName, setTeamName] = useState('');
  const [solvedIds, setSolvedIds] = useState(() => new Set());
  const [score, setScore] = useState(0);
  const [lastResult, setLastResult] = useState(null);
  const [leaderboard, setLeaderboard] = useState(() => {
    try {
      const raw = localStorage.getItem('ctf_leaderboard');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const challenges = useMemo(() => initialChallenges, []);

  useEffect(() => {
    try {
      localStorage.setItem('ctf_leaderboard', JSON.stringify(leaderboard));
    } catch {}
  }, [leaderboard]);

  function addToLeaderboard(name, newScore) {
    if (!name) return;
    setLeaderboard((prev) => {
      const others = prev.filter((e) => e.team !== name);
      return [...others, { team: name, score: newScore }];
    });
  }

  function handleSubmitFlag(flagInput) {
    const normalized = flagInput.trim();
    const match = challenges.find((c) => c.flag === normalized);

    if (!teamName.trim()) {
      setLastResult({ ok: false, message: 'Please enter a team name before submitting.' });
      return;
    }

    if (!match) {
      setLastResult({ ok: false, message: 'Nope! That flag is not quite right. Keep investigating.' });
      return;
    }

    if (solvedIds.has(match.id)) {
      setLastResult({ ok: false, message: 'Already solved! Try another challenge.' });
      return;
    }

    // Mark as solved and update score
    const newSolved = new Set(solvedIds);
    newSolved.add(match.id);
    setSolvedIds(newSolved);
    const newScore = score + match.points;
    setScore(newScore);
    addToLeaderboard(teamName.trim(), newScore);
    setLastResult({ ok: true, message: `Correct! +${match.points} pts for ${match.title}.` });
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black text-white">
      <Header />

      <main>
        <ChallengeList challenges={challenges} solvedIds={solvedIds} />
        <FlagSubmit
          onSubmit={handleSubmitFlag}
          teamName={teamName}
          setTeamName={setTeamName}
          lastResult={lastResult}
        />
        <Leaderboard leaderboard={leaderboard} />
      </main>

      <footer className="mx-auto max-w-6xl px-6 py-10 text-sm text-zinc-500">
        <p>
          Built for spooky fun. Do not expose real flags in production apps — use a backend verifier instead.
        </p>
      </footer>
    </div>
  );
}
