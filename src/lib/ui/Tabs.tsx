import type { LucideIcon } from 'lucide-react';

interface TabsProps {
    label: string;
    tabs: readonly { id: string; label: string; icon: LucideIcon }[];
    active: string;
    onChange: (id: string) => void;
}

export function Tabs({ label, tabs, active, onChange }: TabsProps) {
    return (
        <div role="tablist" aria-label={label} className="flex gap-1.5 overflow-x-auto py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
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
                    className={`flex items-center gap-1.5 min-h-11 px-3.5 border-3 text-sm font-bold whitespace-nowrap shrink-0 cursor-pointer ${id === active
                        ? 'bg-shadow border-shadow text-white'
                        : 'bg-white border-transparent text-smoke hover:border-shadow hover:text-shadow'
                    }`}
                >
                    <Icon className="w-4 h-4" />
                    {label}
                </button>
            ))}
        </div>
    );
}
