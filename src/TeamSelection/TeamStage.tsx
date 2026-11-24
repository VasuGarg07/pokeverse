import { useState, type AnimationEvent } from 'react';
import { getOfficialSprite } from '../helpers/constants';
import { formatString } from '../helpers/utilities';
import { fx } from '../lib/sakuga';
import { PokeBall } from '../lib/ui';

const GAP_SECONDS = 0.09;

interface StagePokemon {
    id: number;
    name?: string;
    isReady: boolean;
}

function burstOut(event: AnimationEvent<HTMLElement>) {
    const { x, y, w } = fx.at(event.currentTarget.parentElement!);
    fx.burst(x, y, { r: w * 0.42, spikes: 15, life: 0.35 });
    for (const side of [-1, 1]) fx.puff(x + side * w * 0.3, y + w * 0.35, { size: w * 0.08, n: 4, vx: side * 30, vy: -8, life: 0.6 });
}

function StageTile({ pokemon, delay }: { pokemon: StagePokemon; delay: number }) {
    const [isLoaded, setIsLoaded] = useState(false);
    const isOut = isLoaded && pokemon.isReady;

    return (
        <div className="relative aspect-square">
            {!isOut && <PokeBall className="absolute inset-[26%] w-[48%] h-[48%] animate-[ball-wobble_1.2s_ease-in-out_infinite]" />}
            <img
                src={getOfficialSprite(pokemon.id)}
                alt={pokemon.name ? formatString(pokemon.name) : `Pokémon ${pokemon.id}`}
                onLoad={() => setIsLoaded(true)}
                onAnimationStart={burstOut}
                className={`w-full h-full object-contain ${isOut ? 'animate-[pop-out_0.45s_ease-out_backwards]' : 'invisible'}`}
                style={{ animationDelay: `${delay}s` }}
            />
        </div>
    );
}

export function TeamStage({ side, team }: { side: number; team: StagePokemon[] }) {
    const columns = Math.ceil(Math.sqrt(team.length));

    return (
        <div className={`slant slant-flow grow [--cut:polygon(0_0,100%_0,100%_100%,0_100%)] ${side === 0 ? 'text-crimson' : 'text-cobalt'}`}>
            <div className="sheet h-full min-h-72 bg-white flex flex-wrap items-center content-center justify-center p-3">
                <div className="focus-lines absolute inset-0 [--at:50%_50%] [--clear:8rem] [--line:color-mix(in_srgb,currentColor_38%,white)]" />
                {team.map((pokemon, index) => (
                    <div key={pokemon.id + '-' + index} style={{ width: `min(${100 / columns}%, 16rem)` }}>
                        <StageTile pokemon={pokemon} delay={index * GAP_SECONDS} />
                    </div>
                ))}
            </div>
        </div>
    );
}
