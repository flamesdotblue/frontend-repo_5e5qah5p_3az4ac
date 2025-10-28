import React from 'react';

const GRID_SIZE = 10;

function cellKey(x, y) {
  return `${x}-${y}`;
}

const tileBg = 'bg-emerald-900/30 hover:bg-emerald-800/40';

export default function GameMap({ placed, selectedBuilding, onPlace, onSelectTile }) {
  const grid = Array.from({ length: GRID_SIZE }, (_, y) =>
    Array.from({ length: GRID_SIZE }, (_, x) => ({ x, y }))
  );

  const occupied = new Map(placed.map((b) => [cellKey(b.x, b.y), b]));

  return (
    <div className="relative">
      <div className="grid" style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))` }}>
        {grid.flat().map(({ x, y }) => {
          const key = cellKey(x, y);
          const building = occupied.get(key);
          return (
            <button
              key={key}
              onClick={() => {
                if (!building && selectedBuilding) {
                  onPlace({ x, y });
                }
                onSelectTile({ x, y, building: building || null });
              }}
              className={`aspect-square ${tileBg} border border-emerald-700/40 relative transition`}
            >
              {/* grid coordinate */}
              <span className="absolute left-1 top-1 text-[10px] text-white/50">{x},{y}</span>
              {/* building indicator */}
              {building && (
                <div className="absolute inset-1 rounded-md bg-white/20 ring-1 ring-white/30 flex items-center justify-center">
                  <span className="text-[11px] font-semibold text-white drop-shadow-sm">
                    {building.label}
                  </span>
                </div>
              )}
              {/* placement hint */}
              {!building && selectedBuilding && (
                <div className="absolute inset-1 rounded-md border-2 border-white/30 border-dashed" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
