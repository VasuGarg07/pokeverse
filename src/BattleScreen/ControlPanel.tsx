import type { ReactNode } from 'react';

interface ControlPanelProps {
    title: string;
    side: number;
    onBack?: () => void;
    children: ReactNode;
}

export function ControlPanel({ title, side, onBack, children }: ControlPanelProps) {
    return (
        <section className="panel lg:absolute lg:bottom-0 lg:inset-x-0 lg:min-h-full flex flex-col animate-[section-in_0.2s_ease-out]">
            <div className={`flex items-stretch justify-between border-b-3 border-shadow text-white ${side === 0 ? 'bg-crimson' : 'bg-cobalt'}`}>
                <h2 className="min-h-11 flex items-center px-4 py-1 font-display leading-tight wrap-anywhere">{title}</h2>
                {onBack && (
                    <button type="button" data-press="browse" onClick={onBack} className="shrink-0 px-5 bg-white text-shadow border-l-3 border-shadow font-display text-sm cursor-pointer hover:bg-shadow hover:text-white">
                        Back
                    </button>
                )}
            </div>
            <div className="grow p-3 grid">{children}</div>
        </section>
    );
}
