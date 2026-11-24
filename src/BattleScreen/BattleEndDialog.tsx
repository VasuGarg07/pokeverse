import { useEffect, useRef } from 'react';
import { fx } from '../lib/sakuga';

interface BattleEndDialogProps {
    winner: string;
    side: number;
    onPlayAgain: () => void;
}

export default function BattleEndDialog({ winner, side, onPlayAgain }: BattleEndDialogProps) {
    const title = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const { x, y, w, h } = fx.at(title.current!);
        fx.burst(x, y, { r: Math.min(w, 260) * 0.6, spikes: 21, life: 0.45 });
        for (const end of [-1, 1]) fx.kira(x + end * w * 0.55, y - h * 0.3, { r: 26, life: 0.7, col: '#F8D030' });
        fx.sfx('pon', x + w * 0.3, y - h, { size: 120, ...fx.hollow() });
    }, []);

    return (
        <div className="slant slant-flow lg:absolute! lg:bottom-0 lg:inset-x-0 lg:min-h-full flex flex-col [--cut:polygon(0_16px,100%_0,100%_100%,0_100%)] animate-[panel-in_0.3s_ease-out]">
            <div className={`sheet grow flex flex-wrap lg:flex-nowrap items-center justify-center gap-x-8 gap-y-4 px-4 py-6 lg:py-3 ${side === 0 ? 'bg-crimson' : 'bg-cobalt'}`}>
                <div className="focus-lines absolute inset-0 [--at:50%_50%] [--clear:6rem] [--line:#ffffff66]" />
                <img src="/pikachu.png" alt="" className="relative w-28 md:w-36 origin-bottom [--hop:16%] animate-[jump_0.6s_ease-in-out_2]" />
                <h2 ref={title} className="relative lettering text-4xl md:text-5xl lg:text-4xl leading-tight text-center wrap-anywhere">{winner} wins!</h2>
                <sakuga-button className="shrink-0" variant="secondary" onClick={onPlayAgain}>Play Again</sakuga-button>
            </div>
        </div>
    );
}
