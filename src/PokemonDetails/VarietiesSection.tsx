import type { Pokemon } from '../helpers/types';
import { PokemonLink } from './PokemonLink';

export default function VarietiesSection({ pokemon }: { pokemon: Pokemon }) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {pokemon.varieties.map(({ id, name }) => <PokemonLink key={id} id={id} name={name} isCurrent={id === pokemon.id} />)}
        </div>
    );
}
