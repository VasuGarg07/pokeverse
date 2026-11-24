import { useState } from 'react';
import type { Pokemon } from '../helpers/types';
import { formatString } from '../helpers/utilities';

export default function MovesGrid({ pokemon }: { pokemon: Pokemon }) {
    const [searchTerm, setSearchTerm] = useState('');

    if (pokemon.moves.length === 0) return <p className="panel p-6 text-center font-bold">No moves are recorded for this form.</p>;

    const matches = pokemon.moves
        .map((move) => formatString(move.name))
        .filter((name) => name.toLowerCase().includes(searchTerm.trim().toLowerCase()));

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <sakuga-input
                    class="grow basis-56"
                    type="search"
                    label="Search moves"
                    placeholder="Search moves"
                    onInput={(event) => setSearchTerm((event.currentTarget as HTMLElement & { value: string }).value)}
                />
                <p role="status" className="font-display">{matches.length} {matches.length === 1 ? 'move' : 'moves'}</p>
            </div>

            {matches.length > 0 ? (
                <ul className="ink-grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
                    {matches.map((name) => <li key={name} className="px-3 py-2.5 text-sm md:text-base font-bold">{name}</li>)}
                </ul>
            ) : (
                <p className="panel p-6 text-center font-bold">No moves match “{searchTerm}”.</p>
            )}
        </div>
    );
}
