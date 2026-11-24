import { useEffect, useState, type MouseEvent } from 'react';
import { fx } from '../sakuga';
import { PokeBall } from './PokeBall';

const SHOW_AFTER_PX = 500;

export function BackToTop() {
    const [visible, setVisible] = useState(false);
    const [launching, setLaunching] = useState(false);

    useEffect(() => {
        const onScroll = () => setVisible(scrollY > SHOW_AFTER_PX);
        addEventListener('scroll', onScroll);
        return () => removeEventListener('scroll', onScroll);
    }, []);

    const launch = (event: MouseEvent<HTMLElement>) => {
        const { x, y, w, h } = fx.at(event.currentTarget);
        for (const side of [-1, 0, 1]) fx.puff(x + side * w * 0.35, y + h * 0.4, { size: 10, n: 4, vx: side * 50, vy: 4, life: 0.6 });
        fx.lines(x, y + h * 0.3, { n: 7, dir: Math.PI / 2, len: 70, spread: w, life: 0.35 });
        setLaunching(true);
        scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (!visible && !launching) return null;

    return (
        <button
            type="button"
            onClick={launch}
            onAnimationEnd={(event) => {
                if (event.animationName === 'launch') setLaunching(false);
            }}
            aria-label="Back to top"
            className={`group fixed bottom-4 right-4 z-10 grid justify-items-center gap-1 cursor-pointer ${launching ? 'animate-[launch_0.7s_ease-in_forwards]' : 'animate-[panel-in_0.25s_ease-out]'}`}
        >
            <svg viewBox="0 0 40 18" className="w-9 transition-[translate] duration-150 group-hover:-translate-y-1.5" aria-hidden="true">
                <path d="M4 15 20 5l16 10" fill="none" stroke="#17151F" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4 15 20 5l16 10" fill="none" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <PokeBall className="w-14 h-14 transition-[translate,rotate] duration-150 group-hover:-translate-y-1 group-hover:rotate-12" />
        </button>
    );
}
