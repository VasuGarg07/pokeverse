import { getHomeSprite } from '../helpers/constants';
import { hopDust } from '../lib/hop';
import { TextInput } from '../lib/ui';

interface TrainerPanelProps {
    player: 1 | 2;
    name: string;
    error?: string;
    onChange: (name: string) => void;
}

const SIDES = {
    1: {
        pokemonId: 257,
        panel: 'versus-left',
        sheet: 'bg-crimson pl-4 pr-4 md:pl-8 md:pr-24 pt-4 pb-11 md:pb-8',
        lines: '[--at:75%_45%] md:[--at:62%_40%]',
        label: '',
        fighter: 'right-0 -scale-x-100',
    },
    2: {
        pokemonId: 448,
        panel: 'versus-right',
        sheet: 'bg-cobalt pl-4 pr-4 md:pl-24 md:pr-8 pt-9 pb-5 md:pt-4 md:pb-8',
        lines: '[--at:25%_50%] md:[--at:38%_40%]',
        label: 'text-right',
        fighter: 'left-0',
    },
};

export function TrainerPanel({ player, name, error, onChange }: TrainerPanelProps) {
    const { pokemonId, panel, sheet, lines, label, fighter } = SIDES[player];

    return (
        <div onPointerEnter={hopDust} className={`slant slant-flow group ${panel}`}>
            <div className={`sheet h-full ${sheet}`}>
                <div className={`focus-lines absolute inset-0 [--clear:4rem] [--line:#ffffff55] ${lines}`} />
                <div className="relative">
                    <img
                        src={getHomeSprite(pokemonId)}
                        alt=""
                        className={`absolute top-0 h-36 md:h-56 origin-bottom [--hop:10%] group-hover:animate-[jump_0.6s_ease-in-out] ${fighter}`}
                    />
                    <TextInput
                        label={`Player ${player}`}
                        labelClassName={`lettering relative flex flex-col justify-end h-34 md:h-53 text-2xl xs:text-3xl md:text-2xl lg:text-5xl leading-none pb-1 ${label}`}
                        value={name}
                        onChange={(event) => onChange(event.target.value)}
                        placeholder="Trainer name"
                        autoComplete="off"
                        error={error}
                    />
                </div>
            </div>
        </div>
    );
}
