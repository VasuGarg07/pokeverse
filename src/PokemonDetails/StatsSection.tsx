import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { MAX_STAT_VALUE, STAT_LABELS, TYPE_COLORS } from '../helpers/constants';
import type { Pokemon } from '../helpers/types';

export default function StatsSection({ pokemon }: { pokemon: Pokemon }) {
    const stats = pokemon.stats.map(({ name, value }) => ({ label: STAT_LABELS[name], value }));
    const total = stats.reduce((sum, stat) => sum + stat.value, 0);
    const color = TYPE_COLORS[pokemon.types[0]];

    return (
        <div className="grid md:grid-cols-2 gap-4">
            <div className="panel p-2">
                <ResponsiveContainer width="100%" height={320}>
                    <RadarChart data={stats} outerRadius="66%">
                        <PolarGrid stroke="#17151F" strokeOpacity={0.3} />
                        <PolarAngleAxis dataKey="label" tick={{ fill: '#17151F', fontSize: 13, fontWeight: 700 }} />
                        <PolarRadiusAxis angle={90} domain={[0, 'dataMax']} tick={false} axisLine={false} />
                        <Radar dataKey="value" stroke="#17151F" strokeWidth={3} fill={color} fillOpacity={0.9} animationDuration={500} />
                    </RadarChart>
                </ResponsiveContainer>
            </div>

            <div className="panel p-4 flex flex-col justify-between gap-3">
                {stats.map(({ label, value }, index) => (
                    <div key={label} className="grid grid-cols-[4.5rem_2.5rem_1fr] items-center gap-2">
                        <span className="font-bold">{label}</span>
                        <span className="font-display text-right">{value}</span>
                        <span className="h-6 border-3 border-shadow">
                            <span
                                className="block h-full border-r-3 border-shadow origin-left animate-[bar-in_0.45s_cubic-bezier(0.3,1.5,0.5,1)_backwards]"
                                style={{ width: `${(value / MAX_STAT_VALUE) * 100}%`, background: color, animationDelay: `${index * 0.06}s` }}
                            />
                        </span>
                    </div>
                ))}
                <p className="flex flex-wrap gap-x-6 border-t-3 border-shadow pt-3 font-display">
                    <span>Total {total}</span>
                    <span>Average {Math.round(total / stats.length)}</span>
                </p>
            </div>
        </div>
    );
}
