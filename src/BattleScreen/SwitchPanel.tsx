import { getOfficialSprite } from '../helpers/constants';
import type { BattlePokemon } from '../helpers/types';
import { formatString } from '../helpers/utilities';
import { hopDust } from '../lib/hop';
import { ControlPanel } from './ControlPanel';
import { HpBar } from './HpBar';

interface SwitchPanelProps {
    team: BattlePokemon[];
    side: number;
    activeIndex: number;
    onSwitch: (index: number) => void;
    onBack: () => void;
}

export default function SwitchPanel({ team, side, activeIndex, onSwitch, onBack }: SwitchPanelProps) {
    return (
        <ControlPanel title="Choose a Pokémon" side={side} onBack={onBack}>
            <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-5 lg:grid-cols-8 gap-2">
                {team.map((pokemon, index) => {
                    const isFainted = pokemon.currentHP <= 0;
                    const isActive = index === activeIndex;
                    return (
                        <button
                            key={index}
                            type="button"
                            data-press="browse"
                            disabled={isActive || isFainted}
                            onClick={() => onSwitch(index)}
                            onPointerEnter={isActive || isFainted ? undefined : hopDust}
                            className="group panel flex flex-col enabled:cursor-pointer disabled:bg-[#E4DFDA]"
                        >
                            <img
                                src={getOfficialSprite(pokemon.id)}
                                alt=""
                                className={`w-full h-20 lg:h-14 object-contain p-1 origin-bottom [--hop:16%] group-enabled:group-hover:animate-[jump_0.6s_ease-in-out] group-enabled:group-focus-visible:animate-[jump_0.6s_ease-in-out] ${isFainted ? 'grayscale' : ''}`}
                            />
                            <span className="grow grid place-items-center px-1 font-display text-xs leading-tight wrap-anywhere">{formatString(pokemon.name)}</span>
                            <span className="w-full p-1.5 lg:pt-1 lg:pb-0.5 text-xs font-bold">
                                <HpBar pokemon={pokemon} className="h-3 border-2 mb-1" />
                                {isFainted ? 'Fainted' : isActive ? 'In battle' : `${pokemon.currentHP} / ${pokemon.calculatedStats.hp}`}
                            </span>
                        </button>
                    );
                })}
            </div>
        </ControlPanel>
    );
}
