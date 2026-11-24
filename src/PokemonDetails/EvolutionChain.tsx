import type { EvolutionDetails, Pokemon } from '../helpers/types';
import { PokemonLink } from './PokemonLink';

function Arrow() {
    return (
        <svg viewBox="0 0 48 40" className="shrink-0 w-9 md:w-12 max-md:rotate-90" aria-hidden="true">
            <path d="M3 13h20V3l22 17-22 17V27H3Z" fill="#FFFFFF" stroke="#17151F" strokeWidth="4" strokeLinejoin="round" />
        </svg>
    );
}

function Stage({ evolution, currentId }: { evolution: EvolutionDetails; currentId: number }) {
    return (
        <div className="flex flex-col md:flex-row items-center gap-3 md:gap-5">
            <PokemonLink id={evolution.id} name={evolution.name} isCurrent={evolution.id === currentId} className="w-30 md:w-40" />
            {evolution.evolvesTo.length > 0 && (
                <>
                    <Arrow />
                    <div className={`flex flex-wrap justify-center gap-3 md:gap-5 ${evolution.evolvesTo.length > 3 ? '' : 'md:flex-col'}`}>
                        {evolution.evolvesTo.map((next) => <Stage key={next.id} evolution={next} currentId={currentId} />)}
                    </div>
                </>
            )}
        </div>
    );
}

export default function EvolutionChain({ pokemon }: { pokemon: Pokemon }) {
    if (!pokemon.evolutionChain?.id) return <p className="panel p-6 text-center font-bold">No evolutions are recorded for this form.</p>;

    return (
        <div className="flex justify-center py-2">
            <Stage evolution={pokemon.evolutionChain} currentId={pokemon.id} />
        </div>
    );
}
