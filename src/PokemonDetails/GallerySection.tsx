import { useState } from 'react';
import { getOfficialSprite, getOfficialSpriteShiny, getHomeSprite, getHomeSpriteShiny } from '../helpers/constants';
import type { Pokemon } from '../helpers/types';

export default function GallerySection({ pokemon }: { pokemon: Pokemon }) {
    const pictures = [
        { label: 'Official', url: getOfficialSprite(pokemon.id) },
        { label: 'Official shiny', url: getOfficialSpriteShiny(pokemon.id) },
        { label: 'Home', url: getHomeSprite(pokemon.id) },
        { label: 'Home shiny', url: getHomeSpriteShiny(pokemon.id) },
    ];
    const [selected, setSelected] = useState(pictures[0]);

    return (
        <div className="grid md:grid-cols-[1.4fr_1fr] gap-4">
            <div className="panel relative aspect-square overflow-hidden">
                <div className="focus-lines absolute inset-0 [--at:50%_50%] [--clear:6rem]" />
                <img key={selected.url} src={selected.url} alt={selected.label} className="relative w-full h-full object-contain p-6 animate-[pop-out_0.4s_ease-out]" />
            </div>
            <div className="grid grid-cols-2 gap-4">
                {pictures.map((picture) => {
                    const isSelected = picture.url === selected.url;
                    return (
                        <button
                            key={picture.url}
                            type="button"
                            data-press="browse"
                            aria-pressed={isSelected}
                            onClick={() => setSelected(picture)}
                            className="group panel flex flex-col cursor-pointer"
                        >
                            <img src={picture.url} alt="" className="grow w-full min-h-0 aspect-square object-contain p-2 origin-bottom [--hop:14%] group-hover:animate-[jump_0.6s_ease-in-out]" />
                            <span className={`w-full border-t-3 border-shadow py-1 font-display text-xs md:text-sm ${isSelected ? 'bg-crimson text-white' : ''}`}>{picture.label}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
