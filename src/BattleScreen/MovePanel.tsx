import type { CSSProperties } from 'react';
import { TYPE_COLORS } from '../helpers/constants';
import type { BattleMove } from '../helpers/types';
import { formatString } from '../helpers/utilities';
import { TypeChip } from '../lib/ui';
import { ControlPanel } from './ControlPanel';

interface MovePanelProps {
    moves: BattleMove[];
    side: number;
    onSelect: (index: number) => void;
    onBack: () => void;
}

export default function MovePanel({ moves, side, onSelect, onBack }: MovePanelProps) {
    return (
        <ControlPanel title="Choose a move" side={side} onBack={onBack}>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-1.5">
                {moves.map((move, index) => (
                    <button
                        key={index}
                        type="button"
                        onClick={() => onSelect(index)}
                        className="pick-panel slant group h-30 lg:h-auto cursor-pointer max-lg:odd:[--l:0px] max-lg:even:[--r:0px] lg:first:[--l:0px] lg:last:[--r:0px]"
                        style={{ '--pick': TYPE_COLORS[move.type] } as CSSProperties}
                    >
                        <span className="sheet bg-white flex flex-col items-center pb-3 pl-[calc(var(--l,16px)*0.7+6px)] pr-[calc(var(--r,16px)*0.7+6px)]">
                            <span className="pick-fill" />
                            <span className="relative grow grid place-items-center font-display text-sm md:text-base leading-tight text-shadow">{formatString(move.name)}</span>
                            <span className="relative flex flex-wrap justify-center gap-1">
                                <TypeChip type={move.type} />
                                <span className="bg-white border-2 border-shadow px-1.5 text-xs font-bold text-shadow">Power {move.power}</span>
                            </span>
                        </span>
                    </button>
                ))}
            </div>
        </ControlPanel>
    );
}
