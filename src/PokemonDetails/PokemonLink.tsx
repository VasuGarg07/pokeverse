import { Link } from 'react-router';
import { getOfficialSprite } from '../helpers/constants';
import { formatString } from '../helpers/utilities';
import { hopDust } from '../lib/hop';

interface PokemonLinkProps {
    id: number;
    name: string;
    isCurrent: boolean;
    className?: string;
}

export function PokemonLink({ id, name, isCurrent, className = '' }: PokemonLinkProps) {
    return (
        <Link
            to={`/pokedex/${id}`}
            data-press="browse"
            aria-current={isCurrent ? 'page' : undefined}
            onPointerEnter={hopDust}
            className={`group panel flex flex-col ${className}`}
        >
            <img
                src={getOfficialSprite(id)}
                alt=""
                loading="lazy"
                className="w-full aspect-square object-contain p-2 origin-bottom [--hop:16%] group-hover:animate-[jump_0.6s_ease-in-out] group-focus-visible:animate-[jump_0.6s_ease-in-out]"
            />
            <span className={`grow grid place-items-center border-t-3 border-shadow px-1 py-1.5 text-center font-display text-xs md:text-sm leading-tight [overflow-wrap:anywhere] ${isCurrent ? 'bg-crimson text-white' : ''}`}>
                {formatString(name)}
            </span>
        </Link>
    );
}
