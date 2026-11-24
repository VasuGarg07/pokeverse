import type { BattlePokemon } from '../helpers/types';
import { formatString } from '../helpers/utilities';
import { PokeBall } from '../lib/ui';
import { HpBar } from './HpBar';

interface FighterHudProps {
    trainer: string;
    pokemon: BattlePokemon;
    team: BattlePokemon[];
    side: number;
}

const SIDES = [
    { panel: 'hud-left', sheet: 'bg-crimson pl-3 pr-6 md:pl-6 md:pr-18', row: '' },
    { panel: 'hud-right', sheet: 'bg-cobalt pl-7 pr-3 md:pl-18 md:pr-6 text-right', row: 'flex-row-reverse' },
];

export function FighterHud({ trainer, pokemon, team, side }: FighterHudProps) {
    const { panel, sheet, row } = SIDES[side];
    const standing = team.filter(({ currentHP }) => currentHP > 0).length;

    return (
        <section aria-label={trainer} className={`slant slant-flow ${panel}`}>
            <div className={`sheet h-full flex flex-col gap-1 py-2 md:pt-1.5 md:pb-2 text-white ${sheet}`}>
                <div className={`grow flex flex-wrap items-baseline justify-between gap-x-4 ${row}`}>
                    <h2 className="lettering text-sm xs:text-lg sm:text-2xl lg:text-3xl leading-tight wrap-anywhere">{formatString(pokemon.name)}</h2>
                    <p className="text-sm md:text-base font-bold wrap-anywhere">{trainer}</p>
                </div>
                <HpBar key={pokemon.id} pokemon={pokemon} isMirrored={side === 1} className="h-5 border-3" />
                <div className={`flex flex-wrap justify-between gap-x-3 text-sm md:text-base font-bold ${row}`}>
                    <span>{pokemon.currentHP} / {pokemon.calculatedStats.hp}</span>
                    <span>Level {pokemon.level}</span>
                    <span role="img" aria-label={`${standing} of ${team.length} Pokémon left`} className={`max-lg:basis-full flex flex-wrap items-center gap-1 ${row}`}>
                        {team.map(({ currentHP }, index) => currentHP > 0
                            ? <PokeBall key={index} className="w-3.5 sm:w-4" />
                            : <span key={index} className="w-3.5 sm:w-4 aspect-square rounded-full border-2 border-dashed border-white/70" />)}
                    </span>
                </div>
            </div>
        </section>
    );
}
