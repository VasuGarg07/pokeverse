import { useState, type CSSProperties } from 'react';
import { Link } from 'react-router';
import { BattlePanel } from './Home/BattlePanel';
import { DexPanel } from './Home/DexPanel';
import { RegionShelf } from './Home/RegionShelf';
import { getOfficialSprite, TYPE_COLORS } from './helpers/constants';
import { formatPokemonId } from './helpers/utilities';
import { fx } from './lib/sakuga';

const FEATURED = [
    { id: 6, name: 'Charizard', type: 'fire' },
    { id: 94, name: 'Gengar', type: 'ghost' },
    { id: 130, name: 'Gyarados', type: 'water' },
    { id: 149, name: 'Dragonite', type: 'dragon' },
    { id: 248, name: 'Tyranitar', type: 'rock' },
    { id: 254, name: 'Sceptile', type: 'grass' },
    { id: 384, name: 'Rayquaza', type: 'dragon' },
    { id: 405, name: 'Luxray', type: 'electric' },
    { id: 448, name: 'Lucario', type: 'fighting' },
    { id: 658, name: 'Greninja', type: 'water' },
    { id: 700, name: 'Sylveon', type: 'fairy' },
    { id: 887, name: 'Dragapult', type: 'ghost' },
];

const pickFeatured = (notId?: number) => {
    const others = FEATURED.filter((pokemon) => pokemon.id !== notId);
    return others[Math.floor(Math.random() * others.length)];
};

function Hero() {
    const [pokemon, setPokemon] = useState(pickFeatured);

    const throwBall = () => {
        const next = pickFeatured(pokemon.id);
        const art = new Image();
        art.onload = () => {
            setPokemon(next);
            const { x, y, w } = fx.at(document.getElementById('featured')!);
            fx.burst(x, y, { r: w * 0.55, spikes: 19, life: 0.4 });
            for (const side of [-1, 1]) fx.puff(x + side * w * 0.3, y + w * 0.3, { size: 20, n: 6, vx: side * 60, life: 0.9 });
            fx.sfx('pon', x + w * 0.3, y - w * 0.36, { size: 130, ...fx.hollow() });
        };
        art.src = getOfficialSprite(next.id);
    };

    return (
        <section className="slant cut-hero h-[34rem] md:h-[min(38rem,68vh)] md:min-h-[27rem]">
            <div className="sheet bg-white">
                <div
                    className="focus-lines absolute inset-0 [--at:50%_62%] [--clear:9rem] md:[--at:70%_50%] md:[--clear:12rem]"
                    style={{ '--line': TYPE_COLORS[pokemon.type] } as CSSProperties}
                />

                <Link
                    id="featured"
                    to={`/pokedex/${pokemon.id}`}
                    data-press="browse"
                    className="absolute left-1/2 top-[62%] md:left-[70%] md:top-1/2 -translate-1/2 w-72 md:w-[min(27rem,58vh)] aspect-square"
                >
                    <img
                        key={pokemon.id}
                        src={getOfficialSprite(pokemon.id)}
                        alt={pokemon.name}
                        className="w-full h-full object-contain animate-[pop-out_0.45s_ease-out]"
                    />
                </Link>

                <div className="absolute inset-y-0 left-5 md:left-12 pt-7 pb-5 md:pt-10 md:pb-6 flex flex-col justify-between items-start gap-4 pointer-events-none">
                    <div>
                        <h1 className="lettering -rotate-4 leading-[0.95] text-[clamp(3.6rem,min(11.5vw,15vh),9.5rem)]">
                            <span className="text-crimson">Poké</span>
                            <span className="block md:ml-[0.6em]">verse</span>
                        </h1>
                        <p className="relative mt-4 inline-block max-w-72 md:max-w-none bg-white border-3 border-shadow px-3 py-1 font-bold md:text-lg">
                            Explore &amp; battle in the Pokémon universe
                        </p>
                    </div>
                    <button
                        type="button"
                        data-press="browse"
                        onClick={throwBall}
                        aria-label="Throw the Poké Ball to call another Pokémon"
                        className="pointer-events-auto relative shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-full border-5 border-shadow overflow-hidden cursor-pointer bg-white hover:rotate-12"
                    >
                        <span className="absolute inset-x-0 top-0 h-1/2 bg-crimson" />
                        <span className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1.5 bg-shadow" />
                        <span className="absolute left-1/2 top-1/2 -translate-1/2 w-8 h-8 rounded-full bg-white border-5 border-shadow" />
                    </button>
                </div>

                <span className="absolute right-4 top-5 md:right-8 md:top-8 font-display text-2xl md:text-4xl [writing-mode:vertical-rl]" lang="ja" aria-hidden="true">
                    ポケバース
                </span>

                <p className="absolute right-4 bottom-12 md:right-8 md:bottom-24 bg-shadow text-white px-3 py-1.5 font-bold pointer-events-none">
                    {formatPokemonId(pokemon.id)} {pokemon.name}
                </p>
            </div>
        </section>
    );
}

export default function Pokeverse() {
    return (
        <div className="flex-1 flex flex-col w-full max-w-7xl mx-auto px-3 md:px-6 pt-4 md:pt-6">
            <div className="spread">
                <Hero />
                <DexPanel />
                <BattlePanel />
            </div>
            <RegionShelf />
        </div>
    );
}
