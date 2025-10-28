import React from 'react';
import { Coins, Droplet, Gem, User } from 'lucide-react';

function ResourceBadge({ icon: Icon, label, value, className = '' }) {
  return (
    <div className={`flex items-center gap-2 rounded-full bg-white/10 backdrop-blur px-3 py-1 text-white shadow ${className}`}>
      <Icon size={18} className="opacity-90" />
      <span className="text-sm font-medium opacity-90">{label}</span>
      <span className="text-sm font-bold">{value}</span>
    </div>
  );
}

export default function HeaderHUD({ playerName, resources }) {
  return (
    <header className="w-full fixed top-0 left-0 z-20">
      <div className="mx-auto max-w-6xl px-4 pt-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-white/90">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 backdrop-blur">
              <User size={18} />
            </div>
            <div className="leading-tight">
              <div className="text-xs uppercase tracking-wide text-white/70">Chief</div>
              <div className="text-sm font-semibold">{playerName}</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <ResourceBadge icon={Coins} label="Gold" value={resources.gold} className="bg-yellow-500/20" />
            <ResourceBadge icon={Droplet} label="Elixir" value={resources.elixir} className="bg-fuchsia-500/20" />
            <ResourceBadge icon={Gem} label="Gems" value={resources.gems} className="bg-emerald-500/20" />
          </div>
        </div>
      </div>
    </header>
  );
}
