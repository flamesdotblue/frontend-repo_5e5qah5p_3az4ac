import React, { useMemo, useState } from 'react';
import HeaderHUD from './components/HeaderHUD.jsx';
import BuildMenu, { BUILDINGS } from './components/BuildMenu.jsx';
import GameMap from './components/GameMap.jsx';
import InfoPanel from './components/InfoPanel.jsx';

const initialResources = { gold: 300, elixir: 300, gems: 25 };

const buildingLabels = {
  townhall: 'Town Hall',
  gold_mine: 'Gold Mine',
  elixir_pump: 'Elixir Pump',
  cannon: 'Cannon',
};

export default function App() {
  const [playerName] = useState('New Chief');
  const [resources, setResources] = useState(initialResources);
  const [selectedBuilding, setSelectedBuilding] = useState(null);
  const [placed, setPlaced] = useState([]); // {id, x, y, type, label}
  const [selectedTile, setSelectedTile] = useState(null);

  const costs = useMemo(() => {
    const dict = {};
    BUILDINGS.forEach((b) => (dict[b.id] = b.cost));
    return dict;
  }, []);

  const canAfford = (cost) =>
    resources.gold >= (cost.gold || 0) && resources.elixir >= (cost.elixir || 0);

  function handleSelectBuilding(id) {
    const cost = costs[id];
    if (!canAfford(cost)) return; // gate
    setSelectedBuilding(id === selectedBuilding ? null : id);
  }

  function spend(cost) {
    setResources((r) => ({
      ...r,
      gold: r.gold - (cost.gold || 0),
      elixir: r.elixir - (cost.elixir || 0),
    }));
  }

  function placeBuildingAt({ x, y }) {
    if (!selectedBuilding) return;
    const cost = costs[selectedBuilding];
    if (!canAfford(cost)) return;

    const id = crypto.randomUUID();
    const newB = { id, x, y, type: selectedBuilding, label: buildingLabels[selectedBuilding] };
    setPlaced((prev) => [...prev, newB]);
    spend(cost);
    setSelectedTile({ x, y, building: newB });
  }

  function selectTile(tile) {
    setSelectedTile(tile);
  }

  function collectFromSelected() {
    if (!selectedTile?.building) return;
    const type = selectedTile.building.type;
    // very simple passive income idea
    const reward = type === 'gold_mine' ? { gold: 25, elixir: 0 } : type === 'elixir_pump' ? { gold: 0, elixir: 25 } : { gold: 5, elixir: 5 };
    setResources((r) => ({ ...r, gold: r.gold + reward.gold, elixir: r.elixir + reward.elixir }));
  }

  const canCollect = Boolean(selectedTile?.building);

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-900 via-emerald-950 to-black">
      <HeaderHUD playerName={playerName} resources={resources} />

      <main className="mx-auto max-w-6xl px-4 pt-24 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <section className="lg:col-span-8 rounded-2xl overflow-hidden ring-1 ring-white/10 bg-emerald-900/20">
            <div className="p-3 border-b border-white/10 flex items-center justify-between text-white/80">
              <div className="text-sm font-semibold">Village</div>
              <div className="text-xs">Place buildings by selecting from Build menu</div>
            </div>
            <div className="p-3">
              <GameMap
                placed={placed}
                selectedBuilding={selectedBuilding}
                onPlace={placeBuildingAt}
                onSelectTile={selectTile}
              />
            </div>
          </section>

          <aside className="lg:col-span-4 space-y-4">
            <BuildMenu selected={selectedBuilding} onSelect={handleSelectBuilding} canAfford={canAfford} />
            <InfoPanel selectedTile={selectedTile} onCollect={collectFromSelected} canCollect={canCollect} />
          </aside>
        </div>

        <footer className="mt-6 text-center text-xs text-white/50">
          This is an original base-building prototype inspired by village builders, not affiliated with any brand.
        </footer>
      </main>
    </div>
  );
}
