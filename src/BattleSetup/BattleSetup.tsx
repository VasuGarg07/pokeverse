import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import {
    proceedToTeamSelection,
    saveBattleState,
    setBattleDifficulty,
    setPlayerNames,
    setSelectedRegions,
    setTeamSize,
} from '../store/battleSlice';
import { useAppDispatch } from '../store/useRedux';
import { Button, PokeBall, Slider } from '../lib/ui';
import { DIFFICULTY_LEVELS, REGION_COLORS, REGIONS } from '../helpers/constants';
import type { DifficultyId } from '../helpers/types';
import { PickPanel } from './PickPanel';
import { TrainerPanel } from './TrainerPanel';

const MAX_TEAM_SIZE = 15;

const DIFFICULTY_ART: Record<DifficultyId, { pokemonId: number; color: string }> = {
    beginner: { pokemonId: 4, color: '#F2C14B' },
    intermediate: { pokemonId: 5, color: '#F59B45' },
    advanced: { pokemonId: 6, color: '#F26A5A' },
    master: { pokemonId: 10035, color: '#17151F' },
};

export default function BattleSetup() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [player1Name, setPlayer1Name] = useState('');
    const [player2Name, setPlayer2Name] = useState('');
    const [teamSize, setTeamSizeLocal] = useState(6);
    const [selectedRegions, setSelectedRegionsLocal] = useState<string[]>([]);
    const [difficulty, setDifficultyLocal] = useState<DifficultyId>('intermediate');
    const [attempts, setAttempts] = useState(0);

    const toggleRegion = (regionName: string) => {
        setSelectedRegionsLocal(prev =>
            prev.includes(regionName) ? prev.filter(r => r !== regionName) : [...prev, regionName]
        );
    };

    const selectAllRegions = () => setSelectedRegionsLocal(REGIONS.map(r => r.name.toLowerCase()));
    const clearAllRegions = () => setSelectedRegionsLocal([]);

    const problems: Record<string, string> = {};
    if (!player1Name.trim()) problems.player1 = 'Required';
    if (!player2Name.trim()) problems.player2 = 'Required';
    if (selectedRegions.length === 0) problems.regions = 'Select at least one region';
    const errors = attempts > 0 ? problems : {};

    const handleStartBattle = () => {
        setAttempts(attempts + 1);
        if (Object.keys(problems).length > 0) return;
        dispatch(setPlayerNames({ player1: player1Name, player2: player2Name }));
        dispatch(setTeamSize(teamSize));
        dispatch(setSelectedRegions(selectedRegions));
        dispatch(setBattleDifficulty(difficulty));
        dispatch(proceedToTeamSelection());
        dispatch(saveBattleState());
        navigate('/battle-sim/team-selection');
    };

    useEffect(() => {
        document.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
    }, [attempts]);

    return (
        <div className="flex-1 w-full max-w-7xl mx-auto px-3 md:px-6 pt-4 md:pt-6 pb-20 space-y-6 md:space-y-8 overflow-x-clip">
            <h1 className="sr-only">Battle setup</h1>

            <div className="versus">
                <TrainerPanel player={1} name={player1Name} error={errors.player1} onChange={setPlayer1Name} />
                <TrainerPanel player={2} name={player2Name} error={errors.player2} onChange={setPlayer2Name} />
                <span className="versus-mark lettering" aria-hidden="true">VS</span>
            </div>

            <div className="panel p-4 md:px-8">
                <Slider
                    label="Pokémon per team"
                    value={teamSize}
                    min={1}
                    max={MAX_TEAM_SIZE}
                    step={1}
                    onChange={setTeamSizeLocal}
                />
                <div className="mt-2 grid grid-cols-[repeat(15,1fr)] justify-items-center gap-0.5" aria-hidden="true">
                    {Array.from({ length: MAX_TEAM_SIZE }, (_, index) => index < teamSize
                        ? <PokeBall key={index} className="w-full max-w-10 animate-[pop-out_0.3s_ease-out]" />
                        : <span key={index} className="w-full max-w-10 aspect-square rounded-full border-2 border-dashed border-silver" />
                    )}
                </div>
            </div>

            <div role="group" aria-label="Difficulty" className="grid grid-cols-2 gap-y-1.5 md:flex">
                {DIFFICULTY_LEVELS.map(({ id, label, level }) => (
                    <PickPanel
                        key={id}
                        name={label}
                        note={`Level ${level}`}
                        {...DIFFICULTY_ART[id]}
                        isSelected={id === difficulty}
                        onPick={() => setDifficultyLocal(id)}
                        className={`h-40 sm:h-48 md:h-60 md:basis-0 max-md:odd:[--l:0px] max-md:even:[--r:0px] md:first:[--l:0px] md:last:[--r:0px] ${id === difficulty ? 'md:grow-[1.5]' : 'md:grow'}`}
                        nameClassName={id === difficulty ? 'text-sm xs:text-lg md:text-2xl lg:text-4xl' : 'text-sm sm:max-md:text-lg lg:text-lg'}
                    />
                ))}
            </div>

            <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
                    <p className="font-bold">Pick the regions your Pokémon come from</p>
                    <div className="flex gap-2">
                        <Button tone="paper" onClick={selectAllRegions}>All</Button>
                        <Button tone="paper" onClick={clearAllRegions}>None</Button>
                    </div>
                </div>
                <div role="group" aria-label="Regions" aria-describedby={errors.regions && 'regions-error'} className="grid grid-cols-3 lg:grid-cols-9 gap-y-1.5">
                    {REGIONS.map((region) => {
                        const id = region.name.toLowerCase();
                        const isSelected = selectedRegions.includes(id);
                        return (
                            <PickPanel
                                key={id}
                                name={region.name}
                                note={`Gen ${region.generation}`}
                                color={REGION_COLORS[region.name]}
                                pokemonId={region.endId}
                                isSelected={isSelected}
                                onPick={() => toggleRegion(id)}
                                className="h-36 md:h-44 max-lg:nth-[3n+1]:[--l:0px] max-lg:nth-[3n]:[--r:0px] lg:first:[--l:0px] lg:last:[--r:0px]"
                                nameClassName="text-sm sm:text-base"
                            >
                                {isSelected && <PokeBall className="absolute left-3 bottom-9 sm:bottom-10 w-6 sm:w-8 animate-[pop-out_0.35s_ease-out]" />}
                            </PickPanel>
                        );
                    })}
                </div>
                {errors.regions && <p id="regions-error" role="alert" className="inline-block bg-white border-3 border-shadow px-2 py-0.5 font-bold text-crimson">{errors.regions}</p>}
            </div>

            <div className="text-center pt-2">
                <sakuga-button onClick={handleStartBattle}>Choose Your Team</sakuga-button>
            </div>
        </div>
    );
}
