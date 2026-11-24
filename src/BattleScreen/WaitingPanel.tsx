import { ControlPanel } from './ControlPanel';

interface WaitingPanelProps {
    playerName: string;
    side: number;
    events: string[];
}

export default function WaitingPanel({ playerName, side, events }: WaitingPanelProps) {
    return (
        <ControlPanel title={`${playerName}'s move`} side={side}>
            <div className="min-h-44 lg:min-h-0 flex flex-col justify-center gap-1.5">
                {events.map((event) => (
                    <p key={event} className="font-display text-base md:text-lg leading-snug wrap-anywhere animate-[section-in_0.2s_ease-out]">{event}</p>
                ))}
            </div>
        </ControlPanel>
    );
}
