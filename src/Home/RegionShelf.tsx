import type { CSSProperties, PointerEvent } from 'react';
import { Link } from 'react-router';
import { getHomeSprite, REGION_COLORS, REGIONS } from '../helpers/constants';
import { fx } from '../lib/sakuga';
import { setSelectedRegion } from '../store/pokedexSlice';
import { useAppDispatch } from '../store/useRedux';

function pullOut(event: PointerEvent<HTMLElement>) {
    const { x, y, w } = fx.at(event.currentTarget, 0.5, 1);
    for (const side of [-1, 1]) fx.puff(x + side * w * 0.4, y, { size: 7, n: 3, vx: side * 24, vy: -6, life: 0.5 });
}

export function RegionShelf() {
    const dispatch = useAppDispatch();

    return (
        <nav aria-label="Pokédex by region" className="mt-auto overflow-x-auto [scrollbar-width:none]">
            <ul className="flex items-end w-max md:w-full pt-20 pl-[3px]">
                {REGIONS.map((region) => (
                    <li key={region.name} className="w-26 shrink-0 md:w-auto md:flex-1">
                        <Link
                            to="/pokedex"
                            data-press="choose"
                            aria-label={`${region.name}, volume ${region.generation}`}
                            onClick={() => dispatch(setSelectedRegion(region))}
                            onPointerEnter={pullOut}
                            className="book h-82"
                            style={{ '--cover': REGION_COLORS[region.name] } as CSSProperties}
                        >
                            <span className="book-pages" />
                            <span className="book-spine">
                                <span className="grid place-items-center w-full h-11 bg-shadow text-white font-display text-lg">{region.generation}</span>
                                <span className="book-band" />
                                <span className="grow grid place-items-center font-display text-3xl [writing-mode:vertical-rl] text-shadow">{region.name}</span>
                                <span className="book-band" />
                                <span className="book-art">
                                    <img src={getHomeSprite(region.endId)} alt="" loading="lazy" />
                                </span>
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
