import React, { useEffect, useState } from 'react';

const ClashStats = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/clash/%23200VUR9YR')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching Clash stats:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="animate-pulse text-slate-500 font-mono text-xs text-center py-10">Syncing Strategic Data...</div>;
  if (!data) return null;

  const heroes = data.heroes?.filter((h: any) =>
    ["Barbarian King", "Archer Queen", "Grand Warden", "Royal Champion"].includes(h.name)
  );

  const featuredAchievement = data.achievements[(data.achievements.length) - 1];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center">
            <span className="text-xl">🛡️</span>
            <span className="absolute -top-1 -right-2 bg-blue-500 text-[9px] font-bold px-1 rounded-sm text-white border border-blue-400">
              {data.expLevel}
            </span>
          </div>
          <span className="text-xs font-mono text-slate-400 uppercase tracking-widest">LVL {data.expLevel}</span>
        </div>
        
        <div className="flex flex-col items-end">
          <span className="text-[10px] font-mono text-teal-400 font-bold uppercase tracking-tighter">
            {data.clan?.name || 'Independent'}
          </span>
          <span className="text-[9px] text-slate-500 uppercase tracking-widest">
            TH {data.townHallLevel} • CLAN LVL {data.clan?.clanLevel || 0}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-slate-800/30 p-3 rounded-xl border border-slate-700/50">
          <p className="text-[9px] uppercase tracking-[0.2em] text-slate-500 mb-1">Trophies</p>
          <p className="text-xl font-bold text-amber-400 tabular-nums">
            {data.trophies > 0 ? data.trophies : data.bestTrophies}
          </p>
        </div>
        <div className="bg-slate-800/30 p-3 rounded-xl border border-slate-700/50">
          <p className="text-[9px] uppercase tracking-[0.2em] text-slate-500 mb-1">War Stars</p>
          <p className="text-xl font-bold text-slate-100 tabular-nums">{data.warStars}</p>
        </div>
      </div>
      <div className="bg-slate-900/40 p-3 rounded-xl border border-slate-800/50">
        <div className="flex items-center gap-2 mb-3">
          <p className="text-[9px] uppercase tracking-widest text-slate-500">Hero Progress</p>
          <div className="h-[1px] flex-grow bg-slate-800"></div>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
          {heroes.map((hero: any) => (
            <div key={hero.name} className="flex justify-between items-center bg-slate-800/20 px-2 py-1 rounded">
              <span className="text-[10px] text-slate-400">
                {hero.name}
              </span>
              <span className="text-[10px] font-mono font-bold text-teal-400">
                LVL {hero.level}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-3 rounded-xl border border-teal-500/20">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs">🏆</span>
          <p className="text-[9px] uppercase tracking-widest text-teal-500 font-bold">Latest Milestone</p>
        </div>
        <p className="text-xs text-slate-200 font-medium mb-1">{featuredAchievement?.name}</p>
        <p className="text-[10px] text-slate-500 leading-tight italic">
          {featuredAchievement?.info}
        </p>
      </div>

      <div className="text-center pt-1">
         <p className="text-[8px] uppercase tracking-[0.3em] text-slate-600">
           Network ID: {data.tag}
         </p>
      </div>
    </div>
  );
};

export default ClashStats;