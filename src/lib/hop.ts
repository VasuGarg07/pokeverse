import type { PointerEvent } from 'react';
import { fx } from './sakuga';

const LANDING_MS = 420;

export function hopDust(event: PointerEvent<HTMLElement>) {
    if (event.pointerType !== 'mouse') return;
    const art = event.currentTarget.querySelector('img')!;
    fx.later(LANDING_MS, () => {
        const { x, y, w } = fx.at(art, 0.5, 0.9);
        for (const side of [-1, 1]) fx.puff(x + side * w * 0.28, y, { size: 6, n: 3, vx: side * 30, vy: -5, life: 0.45 });
    });
}
