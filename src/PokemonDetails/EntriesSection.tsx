import type { Pokemon } from '../helpers/types';

export default function EntriesSection({ pokemon }: { pokemon: Pokemon }) {
    if (pokemon.flavorTexts.length === 0) return <p className="panel p-6 text-center font-bold">No Pokédex entries are recorded for this form.</p>;

    return (
        <ul className="space-y-7 pb-4">
            {pokemon.flavorTexts.map((entry, index) => (
                <li key={entry} className={`speech max-w-[92%] md:max-w-[70%] px-6 py-4 md:text-lg font-bold leading-relaxed ${index % 2 ? 'speech-right ml-auto' : ''}`}>
                    {entry}
                </li>
            ))}
        </ul>
    );
}
