import React from 'react';
import { Hammer, Castle, Coins, Droplet, Shield } from 'lucide-react';

const BUILDINGS = [
  { id: 'townhall', name: 'Town Hall', cost: { gold: 0, elixir: 0 }, icon: Castle },
  { id: 'gold_mine', name: 'Gold Mine', cost: { gold: 150, elixir: 0 }, icon: Coins },
  { id: 'elixir_pump', name: 'Elixir Pump', cost: { gold: 0, elixir: 150 }, icon: Droplet },
  { id: 'cannon', name: 'Cannon', cost: { gold: 100, elixir: 50 }, icon: Shield },
];

export default function BuildMenu({ selected, onSelect, canAfford }) {
  return (
    <div className="rounded-2xl bg-white/10 backdrop-blur p-3 text-white shadow-lg">
      <div className="flex items-center gap-2 mb-2">
        <Hammer size={18} className="opacity-80" />
        <span className="text-sm font-semibold tracking-wide">Build</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {BUILDINGS.map((b) => {
          const Icon = b.icon;
          const affordable = canAfford(b.cost);
          const isActive = selected === b.id;
          return (
            <button
              key={b.id}
              onClick={() => onSelect(b.id)}
              className={`group rounded-xl border border-white/10 px-3 py-2 text-left transition ${
                isActive ? 'bg-white/20 ring-1 ring-white/40' : 'bg-white/5 hover:bg-white/10'
              } ${affordable ? '' : 'opacity-60 cursor-not-allowed'}`}
            >
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10">
                  <Icon size={18} />
                </div>
                <div className="leading-tight">
                  <div className="text-sm font-medium">{b.name}</div>
                  <div className="text-[11px] opacity-80">G {b.cost.gold} • E {b.cost.elixir}</div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export { BUILDINGS };
