import type { CSSProperties, MouseEvent } from 'react';
import { getOfficialSprite, TYPE_COLORS } from '../helpers/constants';
import type { Pokemon } from '../helpers/types';
import { formatPokemonId, formatString } from '../helpers/utilities';
import { fx } from '../lib/sakuga';
import { typeEffect } from '../lib/typeEffects';
import { TypeChip } from '../lib/ui';

const LEAP = [
    { transform: 'none' },
    { transform: 'scale(1.12, 0.84)', offset: 0.22 },
    { transform: 'translateY(-14%) scale(0.94, 1.08)', offset: 0.5 },
    { transform: 'scale(1.1, 0.88)', offset: 0.78 },
    { transform: 'none' },
];
const LEAP_MS = 560;
const LANDING_MS = 430;

export default function HeroSection({ pokemon }: { pokemon: Pokemon }) {
    const type = pokemon.types[0];
    const words = formatString(pokemon.name).split(' ');
    const style = {
        '--line': TYPE_COLORS[type],
        '--longest': Math.max(...words.map((word) => word.length), 5),
        '--lines': words.length,
    } as CSSProperties;

    const useMove = (event: MouseEvent<HTMLElement>) => {
        if (fx.calm) return;
        const { x, y, w } = fx.at(event.currentTarget);
        event.currentTarget.querySelector('img')!.animate(LEAP, LEAP_MS);
        fx.later(LANDING_MS, () => typeEffect(type, x, y, w * 0.85));
    };

    return (
        <section className="slant slant-flow cut-hero [--tilt:22px] md:[--tilt:56px]" style={style}>
            <div className="sheet bg-white">
                <div className="focus-lines absolute inset-0 [--at:50%_68%] [--clear:7rem] md:[--at:72%_50%] md:[--clear:11rem]" />
                <div className="relative grid md:grid-cols-[1.1fr_1fr] items-center gap-2 px-4 md:px-12 pt-6 md:pt-8 pb-8 md:pb-14">
                    <div>
                        <p className="inline-block bg-shadow text-white font-display text-xl md:text-2xl px-3 py-1">{formatPokemonId(pokemon.id)}</p>
                        <h1 className="lettering hero-name mt-4 -rotate-3 origin-left">
                            {words.map((word, index) => <span key={index} className="block">{word}</span>)}
                        </h1>
                        <div className="mt-6 flex flex-wrap items-center gap-2 text-lg [&>span]:text-base">
                            {pokemon.types.map((name) => <TypeChip key={name} type={name} />)}
                            {pokemon.genre && <p className="bg-white border-2 border-shadow px-2 text-base font-bold">{pokemon.genre}</p>}
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={useMove}
                        aria-label={`Play ${formatString(pokemon.name)}'s ${type} effect`}
                        className="justify-self-center w-full max-w-72 md:max-w-96 aspect-square cursor-pointer"
                    >
                        <img
                            key={pokemon.id}
                            src={getOfficialSprite(pokemon.id)}
                            alt=""
                            className="w-full h-full object-contain origin-bottom animate-[pop-out_0.45s_ease-out]"
                        />
                    </button>
                </div>
            </div>
        </section>
    );
}
