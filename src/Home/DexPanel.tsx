import { Link } from 'react-router';
import { getHomeSprite, REGIONS } from '../helpers/constants';
import { fx } from '../lib/sakuga';
import { usePanelScene } from './usePanelScene';

const POKEMON = [1, 25, 143];
const TOTAL_POKEMON = REGIONS[REGIONS.length - 1].endId;
const GAP_MS = 130;
const APEX_MS = 250;
const LANDING_MS = 420;

function jumpScene(panel: HTMLElement) {
    const [bulbasaur, pikachu, snorlax] = [...panel.querySelectorAll('img')].map((img) => {
        const { x, y, w, h } = fx.at(img);
        return { x, w, middle: y, feet: y + h * 0.42, apex: y - h * 0.45 };
    });

    const dust = (at: typeof snorlax, size: number) => {
        for (const side of [-1, 1]) fx.puff(at.x + side * at.w * 0.32, at.feet, { size, n: 4, vx: side * size * 5, vy: -8, life: 0.6 });
    };

    fx.later(LANDING_MS, () => {
        dust(bulbasaur, 9);
        fx.shards(bulbasaur.x, bulbasaur.feet, { n: 5, speed: 130, size: 5 });
    });

    fx.later(GAP_MS + APEX_MS, () => {
        for (const side of [-1, 1]) {
            fx.kira(pikachu.x + side * pikachu.w * 0.36, pikachu.apex + 6, { r: 20, life: 0.5, col: '#F8D030' });
            fx.ticks(pikachu.x + side * pikachu.w * 0.42, pikachu.apex + 10, { n: 3, r: 10, len: 22, dir: side > 0 ? -0.5 : -2.6, fan: 0.5 });
        }
    });
    fx.later(GAP_MS + LANDING_MS, () => dust(pikachu, 8));

    fx.later(GAP_MS * 2 + LANDING_MS, () => {
        dust(snorlax, 18);
        fx.ring(snorlax.x, snorlax.feet, { rx: 110, ry: 22, life: 0.5, w: 7 });
        fx.shards(snorlax.x, snorlax.feet, { n: 10, speed: 260, size: 8, life: 0.9 });
        fx.sfx('don', snorlax.x, snorlax.middle - snorlax.w * 0.62, { size: 120, rot: -0.1 });
    });
}

export function DexPanel() {
    const { panel, playing, play } = usePanelScene(1400, jumpScene);

    return (
        <Link ref={panel} to="/pokedex" data-press="hit" onPointerEnter={play} onFocus={play} className={`slant cut-dex h-80 md:h-96 ${playing ? 'animate-[quake_0.4s_0.68s]' : ''}`}>
            <div className="sheet bg-azure">
                <div className="tone absolute inset-x-0 bottom-0 h-3/5 text-cobalt" />
                <div className="absolute z-1 right-2 md:right-16 bottom-9 md:bottom-3 flex items-end">
                    {POKEMON.map((id, index) => (
                        <img
                            key={id}
                            src={getHomeSprite(id)}
                            alt=""
                            className={`w-28 md:w-40 -ml-8 origin-bottom ${playing ? 'animate-[jump_0.6s_ease-in-out_backwards]' : ''}`}
                            style={{ animationDelay: `${index * GAP_MS}ms` }}
                        />
                    ))}
                </div>
                <div className="absolute inset-x-5 top-12 md:right-auto md:left-8 md:top-24">
                    <h2 className="lettering text-5xl md:text-6xl">Pokédex</h2>
                    <p className="mt-3 inline-block bg-white border-3 border-shadow px-3 py-1 font-bold">
                        {TOTAL_POKEMON.toLocaleString('en')} Pokémon. Full stats &amp; evolutions.
                    </p>
                </div>
            </div>
        </Link>
    );
}
