import type { CSSProperties, ReactNode } from 'react';
import { getHomeSprite } from '../helpers/constants';
import { hopDust } from '../lib/hop';

interface PickPanelProps {
    name: string;
    note: string;
    color: string;
    pokemonId: number;
    isSelected: boolean;
    onPick: () => void;
    className: string;
    nameClassName: string;
    children?: ReactNode;
}

export function PickPanel({ name, note, color, pokemonId, isSelected, onPick, className, nameClassName, children }: PickPanelProps) {
    return (
        <button
            type="button"
            data-press="choose"
            aria-pressed={isSelected}
            onClick={onPick}
            onPointerEnter={hopDust}
            className={`pick-panel slant group cursor-pointer ${className}`}
            style={{ '--pick': color } as CSSProperties}
        >
            <span className="sheet flex flex-col items-center bg-white pt-2 pb-2">
                <span className="pick-fill" />
                {isSelected && <span className="focus-lines absolute inset-0 [--at:50%_60%] [--clear:2rem] [--line:#ffffffaa]" />}
                <span className={`relative pl-[var(--l,16px)] leading-tight ${isSelected ? 'lettering' : 'font-display text-shadow'} ${nameClassName}`}>{name}</span>
                <img
                    src={getHomeSprite(pokemonId)}
                    alt=""
                    className="relative grow min-h-0 w-full object-contain origin-bottom [--hop:16%] group-hover:animate-[jump_0.6s_ease-in-out] group-focus-visible:animate-[jump_0.6s_ease-in-out]"
                />
                <span className="relative mr-[var(--r,16px)] bg-white border-2 border-shadow px-1.5 text-xs md:text-sm font-bold text-shadow">{note}</span>
                {children}
            </span>
        </button>
    );
}
