import { fx, type SpringLike } from './sakuga';

const AFTER_PAGE_CHANGE_MS = 60;
const UP = -Math.PI / 2;

const reactions: Record<string, (x: number, y: number) => void> = {
    browse(x, y) {
        fx.puff(x, y - 6, { size: 7, n: 3, life: 0.4 });
        fx.ticks(x, y - 10, { dir: UP, n: 3, r: 10, len: 12, fan: 0.5 });
    },
    choose(x, y) {
        fx.ring(x, y, { rx: 34, ry: 12, life: 0.4 });
        fx.ticks(x, y - 14, { dir: UP, n: 5, r: 18, len: 14, fan: 0.45 });
        fx.sfx('kachi', x + 34, y - 46, { size: 72, life: 0.6, ...fx.hollow() });
    },
    hit(x, y) {
        fx.burst(x, y, { r: 110, spikes: 17, life: 0.45 });
        fx.shards(x, y, { n: 11, speed: 280, size: 9, life: 0.9, arc: 6.28, grav: 300 });
        for (const [dx, dy] of [[-1, -0.4], [1, -0.7], [-0.8, 0.8], [1, 0.8]]) {
            fx.puff(x + dx * 70, y + dy * 40, { size: 14, n: 5, vx: dx * 50, vy: dy * 30, life: 0.9 });
        }
        fx.sfx('don', x + 20, y - 80, { size: 170, rot: -0.12 });
    },
};

const pressable = (event: Event) => (event.target as Element).closest<HTMLElement>('[data-press]:not(:disabled)');

const springs = new Map<HTMLElement, SpringLike>();

function squash(el: HTMLElement, to: number) {
    if (!springs.has(el)) springs.set(el, new fx.Spring(1, 520, 15));
    springs.get(el)!.to = to;
}

const release = () => springs.forEach((spring) => { spring.to = 1; });

class PressStage extends fx.Base {
    setup() {
        document.addEventListener('pointerdown', (event) => {
            const el = pressable(event);
            if (el && !fx.calm) squash(el, 0.88);
        });
        document.addEventListener('pointerup', release);
        document.addEventListener('pointercancel', release);
        document.addEventListener('click', (event) => {
            const el = pressable(event);
            if (!el || fx.calm) return;
            const box = el.getBoundingClientRect();
            const byKeyboard = event.detail === 0;
            const x = byKeyboard ? box.x + box.width / 2 : event.clientX;
            const y = byKeyboard ? box.y + box.height / 2 : event.clientY;
            fx.later(AFTER_PAGE_CHANGE_MS, () => reactions[el.dataset.press!](x + scrollX, y + scrollY));
            squash(el, 1);
            springs.get(el)!.v += 4;
        }, true);
    }

    frame(dt: number) {
        springs.forEach((spring, el) => {
            const y = spring.step(dt);
            const still = spring.to === 1 && Math.abs(y - 1) < 0.001 && Math.abs(spring.v) < 0.01;
            el.style.transform = still ? '' : `scale(${1 + (1 - y) * 0.4}, ${y})`;
            if (still) springs.delete(el);
        });
    }
}

fx.define('pv-press', PressStage);
document.body.append(Object.assign(document.createElement('pv-press'), { hidden: true }));
