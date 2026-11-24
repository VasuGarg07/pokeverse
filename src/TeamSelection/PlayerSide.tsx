import type { ReactNode } from 'react';

interface PlayerSideProps {
    side: number;
    name: string;
    note?: string;
    children: ReactNode;
}

const BANNERS = [
    { banner: 'banner-left', sheet: 'bg-crimson lg:pr-32' },
    { banner: 'banner-right', sheet: 'bg-cobalt lg:pl-32 lg:flex-row-reverse lg:text-right' },
];

export function PlayerSide({ side, name, note, children }: PlayerSideProps) {
    const { banner, sheet } = BANNERS[side];

    return (
        <section aria-label={name} className="flex flex-col gap-3 lg:grid lg:grid-rows-subgrid lg:row-span-2">
            <div className={`slant slant-flow ${banner}`}>
                <div className={`sheet h-full flex flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 md:px-6 pt-4 pb-6 lg:pb-4 ${sheet}`}>
                    <div className="focus-lines absolute inset-0 [--at:50%_50%] [--clear:3rem] [--line:#ffffff40]" />
                    <div className="relative">
                        <p className="font-bold text-white">Player {side + 1}</p>
                        <h2 className="lettering text-3xl md:text-4xl leading-tight wrap-anywhere">{name}</h2>
                    </div>
                    {note && <p role="status" className="relative bg-white border-3 border-shadow px-2 font-bold text-shadow">{note}</p>}
                </div>
            </div>
            <div className="flex flex-col gap-3">{children}</div>
        </section>
    );
}
