import { fx } from '../lib/sakuga';
import { typeEffect } from '../lib/typeEffects';
import type { BattleMove } from '../helpers/types';

const LUNGE_MS = 900;
const LUNGE_HIT_MS = 320;
const CAST_MS = 700;
const CAST_HIT_MS = 560;
const CAST_STEPS = 4;
const VANISH_MS = 300;

function lunge(attacker: HTMLElement, target: HTMLElement) {
    const from = fx.at(attacker), to = fx.at(target);
    const x = Math.abs(to.x - from.x) * 0.7, y = (to.y - from.y) * 0.7;
    attacker.animate([
        { transform: 'none' },
        { transform: `translateX(${x * 0.16}px) scale(1.1, 0.9)`, offset: 0.2, easing: 'ease-in' },
        { transform: `translate(${-x}px, ${y}px) scale(1.14, 0.94)`, offset: LUNGE_HIT_MS / LUNGE_MS },
        { transform: `translate(${-x}px, ${y}px) scale(0.9, 1.08)`, offset: 0.48 },
        { transform: 'none' },
    ], LUNGE_MS);
    fx.later(LUNGE_HIT_MS * 0.6, () => fx.lines(from.x, from.y, { n: 12, dir: Math.atan2(from.y - to.y, from.x - to.x), len: 130, spread: from.h * 0.6, life: 0.3 }));
    return LUNGE_HIT_MS;
}

function cast(attacker: HTMLElement, target: HTMLElement, type: string) {
    const from = fx.at(attacker), to = fx.at(target);
    attacker.animate([
        { transform: 'none' },
        { transform: 'scale(1.16, 0.8)', offset: 0.3 },
        { transform: 'translateY(-8%) scale(0.9, 1.14)', offset: 0.5 },
        { transform: 'none' },
    ], CAST_MS);
    fx.ring(from.x, from.y + from.h * 0.36, { rx: from.w * 0.5, ry: from.w * 0.1, life: 0.4 });
    for (let step = 1; step <= CAST_STEPS; step++) {
        const along = step / (CAST_STEPS + 1);
        fx.later(200 + step * 70, () => typeEffect(type, from.x + (to.x - from.x) * along, from.y + (to.y - from.y) * along, to.w * (0.2 + along * 0.2)));
    }
    return CAST_HIT_MS;
}

export function playAttack(attacker: HTMLElement, target: HTMLElement, move: BattleMove) {
    if (fx.calm) return 0;
    return move.category === 'Physical' ? lunge(attacker, target) : cast(attacker, target, move.type);
}

export function playImpact(stage: HTMLElement, target: HTMLElement, move: BattleMove, away: number) {
    if (fx.calm) return;
    const { x, y, w, h } = fx.at(target);
    const force = 0.7 + Math.min(move.power, 150) / 200;

    stage.animate([{ filter: 'grayscale(1) contrast(4)' }, { filter: 'grayscale(1) contrast(4)' }], 110);
    stage.animate([
        { transform: 'none' },
        { transform: `translate(${-9 * force}px, ${6 * force}px)` },
        { transform: `translate(${8 * force}px, ${-6 * force}px)` },
        { transform: `translate(${-4 * force}px, ${3 * force}px)` },
        { transform: 'none' },
    ], 400);
    target.animate([
        { transform: 'none' },
        { transform: 'translateX(14%) rotate(9deg) scale(0.88, 1.08)', offset: 0.2 },
        { transform: 'translateX(9%) rotate(4deg) scale(1.06, 0.94)', offset: 0.55 },
        { transform: 'none' },
    ], 550);
    typeEffect(move.type, x, y, w * force);
    fx.sfx('don', x + away * w * 0.34, y - h * 0.3, { size: w * 0.5 * force, rot: -0.12, life: 0.55 });
}

export function playFaint(target: HTMLElement) {
    const { x, y, w } = fx.at(target);
    fx.later(VANISH_MS, () => {
        for (const side of [-1, 0, 1]) fx.puff(x + side * w * 0.24, y + w * 0.24, { size: w * 0.08, n: 5, vx: side * 50, vy: -26, life: 0.8 });
    });
}

export function playEntrance(target: HTMLElement) {
    const { x, y, w } = fx.at(target);
    fx.burst(x, y, { r: w * 0.5, spikes: 17, life: 0.36 });
    for (const side of [-1, 1]) fx.puff(x + side * w * 0.3, y + w * 0.36, { size: w * 0.06, n: 5, vx: side * 50, vy: -8, life: 0.7 });
}
