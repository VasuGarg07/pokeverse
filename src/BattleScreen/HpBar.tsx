import type { BattlePokemon } from '../helpers/types';

export function HpBar({ pokemon, className = '', isMirrored = false }: { pokemon: BattlePokemon; className?: string; isMirrored?: boolean }) {
    const percent = (pokemon.currentHP / pokemon.calculatedStats.hp) * 100;
    const color = percent > 50 ? '#3FAE4A' : percent > 20 ? '#F2B01E' : '#D00000';

    return (
        <span className={`flex w-full bg-white border-shadow ${isMirrored ? 'justify-end' : ''} ${className}`}>
            <span className="h-full transition-[width] duration-700 ease-out" style={{ width: `${percent}%`, background: color }} />
        </span>
    );
}
