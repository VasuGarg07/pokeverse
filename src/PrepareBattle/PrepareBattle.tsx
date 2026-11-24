import { useNavigate } from 'react-router';
import { setPlayerTeam, startBattle } from '../store/battleSlice';
import { useAppDispatch, useAppSelector } from '../store/useRedux';
import { useBattlePokemon } from '../hooks/useBattlePokemon';
import { Button } from '../lib/ui';
import { PlayerSide } from '../TeamSelection/PlayerSide';
import { TeamStage } from '../TeamSelection/TeamStage';

export default function PrepareBattle() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { teamSize, selectedRegions, players, level } = useAppSelector(state => state.battle);

    const player1Ids = players[0].selectedTeamIds;
    const player2Ids = players[1].selectedTeamIds;

    const { player1Team, player2Team, allReady, isError, error } = useBattlePokemon({
        player1Ids,
        player2Ids,
        level,
    });

    const handleBeginBattle = () => {
        dispatch(setPlayerTeam({ playerId: 0, team: player1Team.map(s => s.pokemon!) }));
        dispatch(setPlayerTeam({ playerId: 1, team: player2Team.map(s => s.pokemon!) }));
        dispatch(startBattle());
        navigate('/battle-sim/battle');
    };

    if (!teamSize || selectedRegions.length === 0) return null;

    if (isError) {
        return (
            <div className="flex-1 grid place-content-center justify-items-center gap-4 p-6 text-center">
                <h1 className="font-display text-2xl">The teams did not load</h1>
                <p className="wrap-anywhere">{error || 'Check your connection, then try again.'}</p>
                <Button tone="crimson" onClick={() => navigate('/battle-sim')}>Back to Setup</Button>
            </div>
        );
    }

    const sides = [
        { ids: player1Ids, team: player1Team },
        { ids: player2Ids, team: player2Team },
    ];

    return (
        <div className="flex-1 w-full max-w-7xl mx-auto px-3 md:px-6 pt-4 md:pt-6 pb-20 overflow-x-clip">
            <h1 className="sr-only">{allReady ? 'Teams ready' : 'Preparing battle'}</h1>

            <div className="relative grid lg:grid-cols-2 gap-x-6 gap-y-8 lg:gap-y-3">
                {sides.map(({ ids, team }, side) => (
                    <PlayerSide key={side} side={side} name={players[side].name} note={`${team.filter(({ isLoading }) => !isLoading).length} of ${team.length} ready`}>
                        <TeamStage side={side} team={team.map(({ pokemon, isLoading }, index) => ({ id: ids[index], name: pokemon?.name, isReady: !isLoading }))} />
                    </PlayerSide>
                ))}
                <span className="banner-mark lettering" aria-hidden="true">VS</span>
            </div>

            <div className="min-h-20 mt-8 grid place-items-center">
                <sakuga-button disabled={!allReady} onClick={handleBeginBattle}>{allReady ? 'Begin Battle' : 'Loading teams'}</sakuga-button>
            </div>
        </div>
    );
}
