import type { Pokemon } from '../helpers/types';
import { formatString } from '../helpers/utilities';

export default function InfoSection({ pokemon }: { pokemon: Pokemon }) {
    const facts = [
        { label: 'Height', value: pokemon.height },
        { label: 'Weight', value: pokemon.weight },
        { label: 'Base experience', value: pokemon.baseExp ?? 'Unknown' },
        { label: 'Base happiness', value: pokemon.baseHappiness ?? 'Unknown' },
        { label: 'Capture rate', value: pokemon.captureRate },
        { label: 'Habitat', value: formatString(pokemon.habitat || 'unknown') },
    ];

    return (
        <dl className="ink-grid grid-cols-2 md:grid-cols-3">
            {facts.map(({ label, value }) => (
                <div key={label} className="p-4">
                    <dt className="text-sm font-bold text-smoke">{label}</dt>
                    <dd className="mt-1 font-display text-lg md:text-2xl">{value}</dd>
                </div>
            ))}
            <div className="col-span-2 p-4">
                <dt className="text-sm font-bold text-smoke">Abilities</dt>
                <dd className="mt-2 flex flex-wrap gap-2">
                    {pokemon.abilities.map(({ name, isHidden }) => (
                        <span key={name + isHidden} className={`border-2 border-shadow px-2 py-0.5 font-bold ${isHidden ? 'tone text-[#17151F33]' : ''}`}>
                            <span className="text-shadow">{formatString(name)}{isHidden && ' (hidden)'}</span>
                        </span>
                    ))}
                </dd>
            </div>
            <div className="p-4 max-md:col-span-2">
                <dt className="text-sm font-bold text-smoke">Generation</dt>
                <dd className="mt-1 font-display text-lg md:text-2xl">{pokemon.generation}</dd>
            </div>
        </dl>
    );
}
