import React from 'react';
import { Info, Wallet } from 'lucide-react';

export default function InfoPanel({ selectedTile, onCollect, canCollect }) {
  return (
    <div className="rounded-2xl bg-white/10 backdrop-blur p-4 text-white shadow-lg min-h-[120px]">
      <div className="flex items-center gap-2 mb-3">
        <Info size={18} className="opacity-80" />
        <span className="text-sm font-semibold tracking-wide">Details</span>
      </div>

      {!selectedTile && (
        <p className="text-sm text-white/80">Select a tile to see info.</p>
      )}

      {selectedTile && (
        <div className="space-y-2">
          <div className="text-sm opacity-80">Tile: ({selectedTile.x}, {selectedTile.y})</div>
          {selectedTile.building ? (
            <div className="space-y-2">
              <div className="text-base font-semibold">{selectedTile.building.label}</div>
              <button
                onClick={onCollect}
                disabled={!canCollect}
                className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition border ${
                  canCollect
                    ? 'bg-emerald-500/20 hover:bg-emerald-500/30 border-emerald-400/40'
                    : 'bg-white/5 border-white/10 opacity-60 cursor-not-allowed'
                }`}
              >
                <Wallet size={16} /> Collect
              </button>
            </div>
          ) : (
            <div className="text-sm text-white/80">Empty tile</div>
          )}
        </div>
      )}
    </div>
  );
}
