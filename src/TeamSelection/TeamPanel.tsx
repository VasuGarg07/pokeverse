import type { CSSProperties } from 'react';
import { PokeBall } from '../lib/ui';

interface TeamPanelProps {
    label: string;
    size: number;
    color: string;
    isSelected: boolean;
    onPick: () => void;
}

export function TeamPanel({ label, size, color, isSelected, onPick }: TeamPanelProps) {
    const columns = Math.ceil(Math.sqrt(size));

    return (
        <button
            type="button"
            data-press="choose"
            aria-pressed={isSelected}
            onClick={onPick}
            className="pick-panel slant group h-38 md:h-44 cursor-pointer max-sm:odd:[--l:0px] max-sm:even:[--r:0px] sm:nth-[3n+1]:[--l:0px] sm:nth-[3n]:[--r:0px]"
            style={{ '--pick': color } as CSSProperties}
        >
            <span className="sheet flex flex-col items-center justify-between bg-white pt-2 pb-3">
                <span className="pick-fill" />
                {isSelected && <span className="focus-lines absolute inset-0 [--at:50%_60%] [--clear:2rem] [--line:#ffffffaa]" />}
                <span className={`relative pl-[var(--l,16px)] leading-tight text-lg md:text-xl ${isSelected ? 'lettering' : 'font-display text-shadow'}`}>{label}</span>
                <span className="relative grow w-24 md:w-28 flex flex-wrap content-center justify-center">
                    {Array.from({ length: size }, (_, index) => (
                        <PokeBall
                            key={index}
                            className="p-[2%] group-hover:animate-[ball-wobble_0.6s_ease-in-out] group-focus-visible:animate-[ball-wobble_0.6s_ease-in-out]"
                            width={`min(${100 / columns}%, 4.5rem)`}
                        />
                    ))}
                </span>
            </span>
        </button>
    );
}
