import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { proceedToLoading, saveBattleState, selectTeam } from '../store/battleSlice';
import { useAppDispatch, useAppSelector } from '../store/useRedux';
import { generateRandomTeams } from '../helpers/utilities';
import { Button } from '../lib/ui';
import { PlayerSide } from './PlayerSide';
import { TeamPanel } from './TeamPanel';
import { TeamStage } from './TeamStage';

const TEAM_COUNT = 6;
const COLORS = ['#D00000', '#0264A3'];
const TONES = ['crimson', 'cobalt'] as const;
const teamLabel = (index: number) => `Team ${String.fromCharCode(65 + index)}`;

interface TeamPickerProps {
    side: 0 | 1;
    teams: number[][];
    onReveal: (teamIds: number[]) => void;
}

function TeamPicker({ side, teams, onReveal }: TeamPickerProps) {
    const [picked, setPicked] = useState<number | null>(null);

    return (
        <>
            <div role="group" aria-label="Teams" className="grid grid-cols-2 sm:grid-cols-3 gap-y-1.5">
                {teams.map((team, index) => (
                    <TeamPanel
                        key={index}
                        label={teamLabel(index)}
                        size={team.length}
                        color={COLORS[side]}
                        isSelected={index === picked}
                        onPick={() => setPicked(index)}
                    />
                ))}
            </div>
            <Button tone={TONES[side]} press="hit" disabled={picked === null} onClick={() => onReveal(teams[picked!])}>
                {picked === null ? 'Pick a team' : `Open ${teamLabel(picked)}`}
            </Button>
        </>
    );
}

export default function TeamSelection() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { players, teamSize, selectedRegions, phase } = useAppSelector(state => state.battle);

    const [teams, setTeams] = useState<number[][][]>([[], []]);
    const [revealed, setRevealed] = useState<Record<number, number[]>>({});

    useEffect(() => {
        if (phase === 'TEAM_SELECTION') {
            setTeams([0, 1].map(() => generateRandomTeams(teamSize, selectedRegions, TEAM_COUNT)));
        }
    }, [phase, teamSize, selectedRegions]);

    const handleReveal = (side: 0 | 1, teamIds: number[]) => {
        setRevealed(prev => ({ ...prev, [side]: teamIds }));
        dispatch(selectTeam({ playerId: side, teamIds }));
    };

    const handleProceed = () => {
        dispatch(proceedToLoading());
        dispatch(saveBattleState());
        navigate('/battle-sim/loading');
    };

    const bothRevealed = Boolean(revealed[0] && revealed[1]);

    return (
        <div className="flex-1 w-full max-w-7xl mx-auto px-3 md:px-6 pt-4 md:pt-6 pb-20 overflow-x-clip">
            <h1 className="sr-only">Team selection</h1>

            <div className="relative grid lg:grid-cols-2 gap-x-6 gap-y-8 lg:gap-y-3">
                {([0, 1] as const).map((side) => (
                    <PlayerSide key={side} side={side} name={players[side].name} note={revealed[side] && 'Ready'}>
                        {revealed[side]
                            ? <TeamStage side={side} team={revealed[side].map((id) => ({ id, isReady: true }))} />
                            : <TeamPicker side={side} teams={teams[side]} onReveal={(teamIds) => handleReveal(side, teamIds)} />}
                    </PlayerSide>
                ))}
                <span className="banner-mark lettering" aria-hidden="true">VS</span>
            </div>

            <div className="min-h-20 mt-8 grid place-items-center text-center">
                {bothRevealed
                    ? <sakuga-button onClick={handleProceed}>Begin Battle</sakuga-button>
                    : <p className="font-bold">Both players open a team to continue.</p>}
            </div>
        </div>
    );
}
