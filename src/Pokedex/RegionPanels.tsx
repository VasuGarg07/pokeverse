import { useEffect, useRef, type CSSProperties } from 'react';
import { getHomeSprite, REGION_COLORS, REGIONS } from '../helpers/constants';
import type { Region } from '../helpers/types';
import { hopDust } from '../lib/hop';

interface RegionPanelsProps {
    selected: Region;
    onSelect: (region: Region) => void;
}

export function RegionPanels({ selected, onSelect }: RegionPanelsProps) {
    const list = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const active = list.current!.querySelector<HTMLElement>('[aria-pressed="true"]')!;
        list.current!.scrollTo({ left: active.offsetLeft - 24, behavior: 'smooth' });
    }, [selected]);

    return (
        <div ref={list} role="group" aria-label="Region" className="relative flex h-36 md:h-40 overflow-x-auto [scrollbar-width:none]">
            {REGIONS.map((region) => {
                const isSelected = region.name === selected.name;
                return (
                    <button
                        key={region.name}
                        type="button"
                        data-press="choose"
                        aria-pressed={isSelected}
                        onClick={() => onSelect(region)}
                        onPointerEnter={hopDust}
                        className={`region-panel slant group shrink-0 xl:shrink xl:basis-0 cursor-pointer ${isSelected ? 'w-60 sm:w-72 xl:w-auto xl:grow-[3.4]' : 'w-30 xl:w-auto xl:grow hover:xl:grow-[1.35]'}`}
                        style={{ '--region': REGION_COLORS[region.name] } as CSSProperties}
                    >
                        <span className="sheet block bg-(--region)">
                            {isSelected
                                ? <span className="focus-lines absolute inset-0 [--at:70%_55%] [--clear:2rem] [--line:#ffffffaa]" />
                                : <span className="tone absolute inset-x-0 bottom-0 h-1/2 text-[color-mix(in_srgb,var(--region),#17151F_22%)]" />}
                            <img
                                src={getHomeSprite(region.endId)}
                                alt=""
                                className={`absolute bottom-1 object-contain origin-bottom [--hop:16%] group-hover:animate-[jump_0.6s_ease-in-out] ${isSelected ? 'right-5 w-32 h-32 md:w-36 md:h-36' : 'inset-x-0 mx-auto w-24 h-24'}`}
                            />
                            <span className={isSelected
                                ? 'lettering absolute left-7 top-5 text-4xl md:text-5xl -rotate-3 leading-none'
                                : 'absolute inset-x-0 top-2 pl-3 text-center font-display text-sm text-shadow'}
                            >
                                {region.name}
                            </span>
                            {isSelected && (
                                <span className="absolute left-7 bottom-4 bg-white border-3 border-shadow px-2 text-sm font-bold">
                                    {region.endId - region.startId + 1} Pokémon
                                </span>
                            )}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}
