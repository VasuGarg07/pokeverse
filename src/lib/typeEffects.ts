import { fx } from './sakuga';

type Hit = (x: number, y: number, size: number) => void;

const UP = -Math.PI / 2;
const SIDES = [-1, 1];

const blaze: Hit = (x, y, size) => {
    fx.burst(x, y, { r: size * 0.5, spikes: 19, life: 0.4 });
    fx.shards(x, y, { n: 12, speed: size * 1.1, size: 8, life: 0.8, arc: 2.4, grav: -160 });
    for (const side of SIDES) fx.puff(x + side * size * 0.28, y + size * 0.1, { size: 14, n: 5, vx: side * 24, vy: -70, life: 0.9 });
};

const splash: Hit = (x, y, size) => {
    for (const step of [0, 1, 2]) fx.later(step * 80, () => fx.splash(x + (step - 1) * size * 0.28, y + size * 0.3, { w: size * 0.34, h: size * 0.3, life: 0.7 }));
    fx.ring(x, y + size * 0.34, { rx: size * 0.5, ry: size * 0.1, life: 0.6 });
};

const cut: Hit = (x, y, size) => {
    fx.slash(x, y, { len: size * 1.1, ang: -0.6, thick: 18, life: 0.4 });
    fx.later(110, () => fx.slash(x, y, { len: size * 1.1, ang: -2.5, thick: 18, life: 0.4 }));
    fx.later(160, () => fx.shards(x, y, { n: 9, speed: size * 0.8, size: 6, life: 0.8, arc: 6.28 }));
};

const spark: Hit = (x, y, size) => {
    for (let step = 0; step < 5; step++) {
        const angle = UP + (step - 2) * 0.7;
        fx.later(step * 45, () => {
            const px = x + Math.cos(angle) * size * 0.42, py = y + Math.sin(angle) * size * 0.36;
            fx.kira(px, py, { r: 22, life: 0.5, col: '#F8D030' });
            fx.ticks(px, py, { n: 3, r: 14, len: 22, dir: angle, fan: 0.5 });
        });
    }
};

const freeze: Hit = (x, y, size) => {
    fx.shards(x, y, { n: 18, speed: size, size: 11, life: 1, arc: 6.28, grav: 240 });
    for (const side of SIDES) fx.kira(x + side * size * 0.3, y - size * 0.2, { r: 20, life: 0.6, col: '#98D8D8' });
};

const smoke: Hit = (x, y, size) => {
    for (const side of [-1, 0, 1]) fx.puff(x + side * size * 0.3, y + size * 0.15, { size: 20, n: 6, vx: side * 30, vy: -34, life: 1.1 });
    fx.donut(x, y - size * 0.1, { r: size * 0.16, vx: 10, vy: -60, life: 1.1 });
};

const wave: Hit = (x, y, size) => {
    for (const step of [0, 1, 2]) fx.later(step * 110, () => fx.ring(x, y, { rx: size * (0.25 + step * 0.14), ry: size * (0.22 + step * 0.12), life: 0.5, w: 6 }));
    for (const side of SIDES) fx.kira(x + side * size * 0.34, y - size * 0.24, { r: 18, life: 0.7, col: '#EE99AC' });
};

const quake: Hit = (x, y, size) => {
    const ground = y + size * 0.36;
    fx.ring(x, ground, { rx: size * 0.55, ry: size * 0.1, life: 0.5, w: 7 });
    fx.shards(x, ground, { n: 14, speed: size * 0.9, size: 9, life: 0.9 });
    for (const side of SIDES) fx.puff(x + side * size * 0.36, ground, { size: 16, n: 5, vx: side * 60, vy: -10, life: 0.8 });
};

const gust: Hit = (x, y, size) => {
    fx.lines(x - size * 0.3, y, { n: 12, dir: 0, len: size * 0.6, spread: size * 0.7, life: 0.35 });
    fx.later(90, () => fx.slash(x, y, { len: size, ang: 0, thick: 14, life: 0.45 }));
};

const strike: Hit = (x, y, size) => {
    fx.burst(x, y, { r: size * 0.48, spikes: 15, life: 0.36 });
    fx.shards(x, y, { n: 8, speed: size * 0.8, size: 7, life: 0.8, arc: 6.28 });
};

const HITS: Record<string, Hit> = {
    normal: strike, fighting: strike, fire: blaze, water: splash, grass: cut, bug: cut,
    electric: spark, ice: freeze, poison: smoke, ghost: smoke, dark: smoke,
    psychic: wave, fairy: wave, dragon: blaze, ground: quake, rock: quake, steel: quake, flying: gust,
};

export const typeEffect = (type: string, x: number, y: number, size: number) => HITS[type](x, y, size);
