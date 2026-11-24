type Effect<Options> = (x: number, y: number, options?: Options) => void;

export interface SpringLike {
    x: number;
    v: number;
    to: number;
    d: number;
    step(dt: number): number;
}

interface SakugaFX {
    readonly calm: boolean;
    P: Record<string, string | string[]>;
    Spring: new (x: number, stiffness: number, damping: number) => SpringLike;
    Base: new () => HTMLElement;
    define(tag: string, element: CustomElementConstructor): void;
    later(ms: number, run: () => void): void;
    at(el: Element, fx?: number, fy?: number): { x: number; y: number; w: number; h: number };
    hollow(): { col: string; edge: string };
    puff: Effect<{ n?: number; size?: number; vx?: number; vy?: number; life?: number }>;
    burst: Effect<{ r?: number; spikes?: number; life?: number }>;
    shards: Effect<{ n?: number; speed?: number; size?: number; life?: number; arc?: number; grav?: number }>;
    ring: Effect<{ rx?: number; ry?: number; life?: number; w?: number }>;
    splash: Effect<{ w?: number; h?: number; life?: number }>;
    donut: Effect<{ r?: number; vx?: number; vy?: number; life?: number }>;
    slash: Effect<{ len?: number; ang?: number; life?: number; thick?: number; col?: string }>;
    lines: Effect<{ n?: number; dir?: number; len?: number; spread?: number; life?: number }>;
    kira: Effect<{ r?: number; life?: number; col?: string }>;
    ticks: Effect<{ n?: number; r?: number; len?: number; dir?: number; life?: number; fan?: number }>;
    sfx(word: 'don' | 'gogo' | 'kachi' | 'pon' | 'shu' | 'zuza', x: number, y: number, options?: { size?: number; rot?: number; life?: number; col?: string; edge?: string }): void;
}

export const fx = (window as unknown as { SakugaFX: SakugaFX }).SakugaFX;

Object.assign(fx.P, { fill: '#ffffff', shade: '#d8d2cd', line: '#17151f', accent: '#d00000', ink: '#17151f', sfx: ['#17151f', '#ffffff'] });
