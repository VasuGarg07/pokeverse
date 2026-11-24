import { useEffect, useRef, useState } from 'react';
import { getOfficialSprite } from '../helpers/constants';
import type { BattlePokemon } from '../helpers/types';
import { formatString } from '../helpers/utilities';
import { PokeBall } from '../lib/ui';
import { playEntrance, playFaint } from './attackScene';

interface FighterProps {
    pokemon: BattlePokemon;
    side: number;
    isLeaving: boolean;
    isWinner: boolean;
}

const SIDES = [
    'left-[1%] sm:left-[6%] lg:left-[14%] bottom-[4%] w-[49%] sm:w-[40%] lg:w-auto lg:h-[86%] lg:max-h-112',
    'right-[1%] sm:right-[6%] lg:right-[14%] bottom-[24%] w-[44%] sm:w-[34%] lg:w-auto lg:h-[70%] lg:max-h-92',
];

export function Fighter({ pokemon, side, isLeaving, isWinner }: FighterProps) {
    const frame = useRef<HTMLDivElement>(null);
    const lastHP = useRef(pokemon.currentHP);
    const [isLoaded, setIsLoaded] = useState(false);
    const [damage, setDamage] = useState(0);

    useEffect(() => {
        if (pokemon.currentHP < lastHP.current) setDamage(lastHP.current - pokemon.currentHP);
        lastHP.current = pokemon.currentHP;
    }, [pokemon.currentHP]);

    const isDown = pokemon.currentHP <= 0;
    const motion = isDown ? 'animate-[ko_0.5s_ease-in_0.75s_forwards]'
        : isLeaving ? 'animate-[ko_0.35s_ease-in_forwards]'
        : isWinner ? 'animate-[jump_0.6s_ease-in-out_3] [--hop:16%]'
        : 'animate-[pop-out_0.45s_ease-out]';

    return (
        <div ref={frame} data-side={side} className={`absolute aspect-square ${SIDES[side]}`}>
            <span className={`absolute inset-x-[18%] bottom-[4%] h-[9%] rounded-[50%] bg-shadow/35 transition-[scale] duration-300 ${isDown ? 'scale-0 delay-900' : isLeaving ? 'scale-0' : ''}`} />
            {!isLoaded && <PokeBall className="absolute inset-[35%] w-[30%] h-[30%] animate-[ball-wobble_1.2s_ease-in-out_infinite]" />}
            <img
                src={getOfficialSprite(pokemon.id)}
                alt={formatString(pokemon.name)}
                onLoad={() => setIsLoaded(true)}
                onAnimationStart={({ animationName }) => {
                    if (animationName === 'ko') playFaint(frame.current!);
                    if (animationName === 'pop-out') playEntrance(frame.current!);
                }}
                className={`relative w-full h-full object-contain origin-bottom ${side === 0 ? '-scale-x-100' : ''} ${isLoaded ? motion : 'invisible'}`}
            />
            {damage > 0 && (
                <span
                    onAnimationEnd={() => setDamage(0)}
                    className="absolute inset-x-0 top-[8%] text-center lettering text-5xl md:text-7xl text-crimson! animate-[damage_1.1s_ease-out_0.5s_both]"
                    aria-hidden="true"
                >
                    {damage}
                </span>
            )}
        </div>
    );
}
