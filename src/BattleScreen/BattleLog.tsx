import { useEffect, useRef } from 'react';

const VISIBLE_LINES = 12;

export default function BattleLog({ logs }: { logs: string[] }) {
    const list = useRef<HTMLOListElement>(null);

    useEffect(() => {
        list.current!.scrollTop = list.current!.scrollHeight;
    }, [logs]);

    const lines = logs.slice(-VISIBLE_LINES);

    return (
        <ol ref={list} role="log" aria-label="Battle log" tabIndex={0} className="panel h-44 lg:h-50 p-3 space-y-1.5 overflow-y-auto">
            {lines.map((line, index) => (
                <li key={logs.length - lines.length + index} className={`leading-snug wrap-anywhere ${index === lines.length - 1 ? 'font-black' : 'text-smoke'}`}>{line}</li>
            ))}
        </ol>
    );
}
