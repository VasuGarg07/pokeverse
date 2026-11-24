import type { LucideIcon } from 'lucide-react';

interface TabsProps {
    label: string;
    tabs: readonly { id: string; label: string; icon: LucideIcon }[];
    active: string;
    onChange: (id: string) => void;
}

export function Tabs({ label, tabs, active, onChange }: TabsProps) {
    return (
        <div role="tablist" aria-label={label} className="flex overflow-x-auto py-2 [scrollbar-width:none]">
            {tabs.map(({ id, label, icon: Icon }) => (
                <button
                    key={id}
                    type="button"
                    role="tab"
                    aria-selected={id === active}
                    data-press="browse"
                    onClick={(event) => {
                        onChange(id);
                        event.currentTarget.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' });
                    }}
                    className="tab-panel slant slant-flow shrink-0 cursor-pointer"
                >
                    <span className={`sheet flex items-center gap-2 h-10 px-6 text-sm font-bold whitespace-nowrap ${id === active ? 'bg-crimson text-white' : 'bg-white text-shadow hover:bg-shadow hover:text-white'}`}>
                        <Icon className="w-4 h-4" strokeWidth={2.5} />
                        {label}
                    </span>
                </button>
            ))}
        </div>
    );
}
