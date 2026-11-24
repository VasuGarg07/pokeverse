import type { CSSProperties } from 'react';
import { Link } from 'react-router';
import { TYPE_COLORS, getHomeSprite } from '../helpers/constants';
import { formatPokemonId, formatString } from '../helpers/utilities';
import type { Pokemon } from '../helpers/types';
import { hopDust } from '../lib/hop';
import { TypeChip } from '../lib/ui';

interface PokemonCardProps {
    pokemon: Pokemon;
    isSplash: boolean;
    delay: number;
}

export default function PokemonCard({ pokemon, isSplash, delay }: PokemonCardProps) {
    const style = { '--type': TYPE_COLORS[pokemon.types[0]], animationDelay: `${delay}s` } as CSSProperties;

    return (
        <Link
            to={`/pokedex/${pokemon.id}`}
            data-press="browse"
            onPointerEnter={hopDust}
            className={`group relative flex flex-col border-3 border-shadow bg-white hover:z-1 animate-[panel-in_0.3s_ease-out_backwards] ${isSplash ? 'col-span-2 row-span-2' : ''}`}
            style={style}
        >
            <div className={`relative grow bg-(--type) ${isSplash ? 'min-h-72' : 'aspect-square'}`}>
                <div className={isSplash
                    ? 'focus-lines absolute inset-0 [--at:50%_55%] [--clear:3rem] [--line:#ffffff99]'
                    : 'tone absolute inset-x-0 bottom-0 h-1/2 text-[color-mix(in_srgb,var(--type),#17151F_28%)]'}
                />
                <span className={`absolute left-2 top-1 font-display text-shadow ${isSplash ? 'text-3xl' : 'text-base'}`}>{formatPokemonId(pokemon.id)}</span>
                <img
                    src={getHomeSprite(pokemon.id)}
                    alt=""
                    loading="lazy"
                    className="absolute inset-x-0 -bottom-[3%] w-full h-[112%] object-contain origin-bottom [--hop:20%] group-hover:animate-[jump_0.6s_ease-in-out] group-focus-visible:animate-[jump_0.6s_ease-in-out]"
                />
            </div>
            <div className={`relative border-t-3 border-shadow bg-white ${isSplash ? 'p-3' : 'p-2'}`}>
                <h2 className={`font-display leading-tight truncate ${isSplash ? 'text-2xl md:text-3xl' : 'text-sm md:text-base'}`}>{formatString(pokemon.name)}</h2>
                <div className="mt-1.5 flex flex-wrap gap-1">
                    {pokemon.types.map((type) => <TypeChip key={type} type={type} />)}
                </div>
            </div>
        </Link>
    );
}
