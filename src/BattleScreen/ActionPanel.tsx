import { Swords } from 'lucide-react';
import type { CSSProperties } from 'react';
import { Button, PokeBall } from '../lib/ui';
import { ControlPanel } from './ControlPanel';

interface ActionPanelProps {
    playerName: string;
    side: number;
    onFight: () => void;
    onSwitch: () => void;
    onForfeit: () => void;
}

const ICON = 'relative w-12 h-12 [--hop:24%] group-hover:animate-[jump_0.5s_ease-in-out] group-focus-visible:animate-[jump_0.5s_ease-in-out]';

export default function ActionPanel({ playerName, side, onFight, onSwitch, onForfeit }: ActionPanelProps) {
    const actions = [
        { label: 'Fight', color: '#F2C14B', onClick: onFight, icon: <Swords className={ICON} strokeWidth={2.5} /> },
        { label: 'Switch', color: '#B9B4BC', onClick: onSwitch, icon: <PokeBall className={ICON} /> },
    ];

    return (
        <ControlPanel title={`${playerName}, what will you do?`} side={side}>
            <div className="grid grid-cols-2 lg:grid-cols-[1fr_1fr_9rem] gap-y-3">
                {actions.map(({ label, color, onClick, icon }) => (
                    <button
                        key={label}
                        type="button"
                        data-press="browse"
                        onClick={onClick}
                        className="pick-panel slant group h-32 lg:h-auto cursor-pointer first:[--l:0px] max-lg:nth-2:[--r:0px]"
                        style={{ '--pick': color } as CSSProperties}
                    >
                        <span className="sheet bg-white flex flex-col items-center justify-end gap-2 pb-2.5">
                            <span className="pick-fill" />
                            {icon}
                            <span className="relative font-display text-xl md:text-2xl leading-none text-shadow">{label}</span>
                        </span>
                    </button>
                ))}
                <Button tone="paper" className="max-lg:col-span-2 lg:ml-1" onClick={onForfeit}>Forfeit</Button>
            </div>
        </ControlPanel>
    );
}
