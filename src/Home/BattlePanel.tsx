import { Link } from 'react-router';
import { getHomeSprite } from '../helpers/constants';
import { fx } from '../lib/sakuga';
import { usePanelScene } from './usePanelScene';

const DASH_MS = 200;
const CLASH_MS = 340;
const SKID_MS = 520;

function clashScene(panel: HTMLElement) {
    const fighters = [...panel.querySelectorAll('img')];
    const [left, right] = fighters.map((img) => fx.at(img));
    const middle = { x: (left.x + right.x) / 2, y: left.y };
    const reach = (right.x - left.x) / 2 - left.w * 0.34;
    fighters.forEach((img) => img.style.setProperty('--reach', `${reach}px`));

    fx.later(DASH_MS, () => {
        fx.lines(left.x, left.y, { n: 9, dir: Math.PI, len: 90, spread: left.h * 0.7, life: 0.3 });
        fx.lines(right.x, right.y, { n: 9, dir: 0, len: 90, spread: right.h * 0.7, life: 0.3 });
    });

    fx.later(CLASH_MS, () => {
        fx.burst(middle.x, middle.y, { r: 105, spikes: 17, life: 0.36 });
        fx.slash(middle.x, middle.y, { len: 260, ang: -0.7, thick: 22, life: 0.45 });
        fx.slash(middle.x, middle.y, { len: 260, ang: -2.4, thick: 22, life: 0.45 });
        fx.shards(middle.x, middle.y, { n: 14, speed: 320, size: 8, life: 0.9, arc: 6.28, grav: 320 });
        fx.kira(middle.x, middle.y - 30, { r: 26, life: 0.5 });
    });

    fx.later(SKID_MS, () => {
        [{ at: left, side: -1 }, { at: right, side: 1 }].forEach(({ at, side }) => {
            const feet = at.y + at.h * 0.4;
            for (let step = 0; step < 4; step++) {
                fx.later(step * 60, () => fx.puff(at.x - side * (reach * 0.6 - step * reach * 0.22), feet, { size: 9 + step * 3, n: 4, vx: side * 40, vy: -14, life: 0.7 }));
            }
        });
        fx.sfx('zuza', middle.x, middle.y - left.h * 0.1, { size: 150, rot: -0.1 });
    });
}

export function BattlePanel() {
    const { panel, playing, play } = usePanelScene(1500, clashScene);
    const lunge = playing ? 'animate-[lunge_1s]' : '';

    return (
        <Link ref={panel} to="/battle-sim" data-press="hit" onPointerEnter={play} onFocus={play} className={`slant cut-battle h-80 md:h-96 ${playing ? 'animate-[quake_0.4s_0.34s]' : ''}`}>
            <div className="sheet bg-crimson">
                <div className="absolute inset-0 bg-shadow [clip-path:polygon(62%_0,100%_0,100%_100%,38%_100%)]" />
                <div className="focus-lines absolute inset-0 [--at:50%_62%] [--clear:4rem] [--line:#ffffff55]" />
                <img src={getHomeSprite(257)} alt="" className={`absolute left-[3%] md:left-[10%] bottom-2 w-36 md:w-48 -scale-x-100 ${lunge}`} />
                <img src={getHomeSprite(448)} alt="" className={`absolute right-[3%] bottom-2 w-36 md:w-48 ${lunge}`} />
                <div className="absolute left-5 top-12 md:left-20 md:top-14">
                    <h2 className="lettering text-5xl md:text-6xl">Battle</h2>
                    <p className="mt-3 inline-block bg-white border-3 border-shadow px-3 py-1 font-bold">
                        Draft a team. Fight turn by turn.
                    </p>
                </div>
            </div>
        </Link>
    );
}
