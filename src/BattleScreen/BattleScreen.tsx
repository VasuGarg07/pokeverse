import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { useAppDispatch, useAppSelector } from '../store/useRedux';
import { endTurn, forfeit, resetToSetup, selectMove, switchPokemon } from '../store/battleSlice';
import { TYPE_COLORS } from '../helpers/constants';
import type { BattlePokemon } from '../helpers/types';
import { formatString } from '../helpers/utilities';
import { fx } from '../lib/sakuga';
import { playAttack, playImpact } from './attackScene';
import { Fighter } from './Fighter';
import { FighterHud } from './FighterHud';
import BattleLog from './BattleLog';
import ActionPanel from './ActionPanel';
import MovePanel from './MovePanel';
import SwitchPanel from './SwitchPanel';
import WaitingPanel from './WaitingPanel';
import BattleEndDialog from './BattleEndDialog';

const TERRAINS = [
    { sky: '#A9DBF2', ground: '#6FB35C' },
    { sky: '#8F83C9', ground: '#4B4080' },
    { sky: '#F7A36B', ground: '#B5523A' },
    { sky: '#7CC4E8', ground: '#3F79AE' },
    { sky: '#C9D6E2', ground: '#8C99A8' },
    { sky: '#BFE6E4', ground: '#E0B765' },
    { sky: '#BDE5A0', ground: '#3F9A5B' },
    { sky: '#7FC6BE', ground: '#2E7F7C' },
    { sky: '#F5B3A0', ground: '#C98A4E' },
];

const RECALL_MS = 400;
const KO_MS = 1300;
const TURN_PAUSE_MS = 1100;

function useShownIndex(team: BattlePokemon[], activeIndex: number) {
    const [shown, setShown] = useState(activeIndex);

    useEffect(() => {
        if (shown === activeIndex) return;
        const timer = setTimeout(() => setShown(activeIndex), team[shown].currentHP > 0 ? RECALL_MS : KO_MS);
        return () => clearTimeout(timer);
    }, [shown, activeIndex]);

    return shown;
}

export default function BattleScreen() {
    const dispatch = useAppDispatch();
    const battle = useAppSelector(state => state.battle);
    const stage = useRef<HTMLDivElement>(null);
    const [selectedAction, setSelectedAction] = useState<'fight' | 'switch' | null>(null);
    const [terrain] = useState(() => TERRAINS[Math.floor(Math.random() * TERRAINS.length)]);
    const [isAttacking, setIsAttacking] = useState(false);
    const [logMark, setLogMark] = useState(0);
    const [flash, setFlash] = useState<{ color: string; at: string } | null>(null);
    const [showEnd, setShowEnd] = useState(false);

    const { players, currentPlayerTurn: side } = battle;
    const shown = [useShownIndex(players[0].team, players[0].activePokemon), useShownIndex(players[1].team, players[1].activePokemon)];
    const isSettled = players.every(({ activePokemon }, index) => activePokemon === shown[index]);

    const currentPlayer = players[side];
    const activePokemon = currentPlayer.team[currentPlayer.activePokemon];
    const hasEnded = battle.phase === 'ENDED';
    const winnerSide = battle.winner === players[0].name ? 0 : 1;

    useEffect(() => {
        if (!currentPlayer.hasActed || !isSettled || hasEnded) return;
        const timer = setTimeout(() => dispatch(endTurn()), TURN_PAUSE_MS);
        return () => clearTimeout(timer);
    }, [currentPlayer.hasActed, isSettled, hasEnded, dispatch]);

    useEffect(() => {
        if (!hasEnded) return;
        const timer = setTimeout(() => setShowEnd(true), KO_MS);
        return () => clearTimeout(timer);
    }, [hasEnded]);

    const showStage = () => {
        setLogMark(battle.battleLog.length);
        setSelectedAction(null);
        scrollTo({ top: 0, behavior: fx.calm ? 'auto' : 'smooth' });
    };

    const handleMoveSelect = (moveIndex: number) => {
        const move = activePokemon.selectedMoves[moveIndex];
        const [attacker, target] = [side, 1 - side].map((index) => stage.current!.querySelector<HTMLElement>(`[data-side="${index}"] img`)!);

        showStage();
        setIsAttacking(true);
        setTimeout(() => {
            dispatch(selectMove({ playerId: side, moveIndex }));
            setIsAttacking(false);
            setFlash({ color: TYPE_COLORS[move.type], at: side === 0 ? '74% 42%' : '26% 58%' });
            playImpact(stage.current!, target, move, side === 0 ? 1 : -1);
        }, playAttack(attacker, target, move));
    };

    const handleSwitch = (index: number) => {
        showStage();
        dispatch(switchPokemon({ playerId: side, index }));
    };

    const controls = isAttacking || currentPlayer.hasActed || hasEnded ? (
        <WaitingPanel
            playerName={currentPlayer.name}
            side={side}
            events={isAttacking ? [`${formatString(activePokemon.name)} attacks!`] : battle.battleLog.slice(logMark)}
        />
    ) : selectedAction === 'fight' ? (
        <MovePanel moves={activePokemon.selectedMoves} side={side} onSelect={handleMoveSelect} onBack={() => setSelectedAction(null)} />
    ) : selectedAction === 'switch' ? (
        <SwitchPanel team={currentPlayer.team} side={side} activeIndex={currentPlayer.activePokemon} onSwitch={handleSwitch} onBack={() => setSelectedAction(null)} />
    ) : (
        <ActionPanel
            key={side}
            playerName={currentPlayer.name}
            side={side}
            onFight={() => setSelectedAction('fight')}
            onSwitch={() => setSelectedAction('switch')}
            onForfeit={() => { showStage(); dispatch(forfeit(side)); }}
        />
    );

    return (
        <div className="flex-1 w-full max-w-7xl mx-auto px-3 md:px-6 pt-3 pb-4 lg:h-[calc(100dvh-3.5rem)] lg:min-h-[34rem] lg:flex-none flex flex-col">
            <h1 className="sr-only">Battle</h1>

            <div className="relative z-1 grid grid-cols-2">
                {players.map(({ name, team }, index) => (
                    <FighterHud key={index} trainer={name} team={team} pokemon={team[shown[index]]} side={index} />
                ))}
                <p className="absolute left-1/2 top-full -translate-1/2 bg-white border-3 border-shadow px-3 py-0.5 font-display text-sm md:text-lg whitespace-nowrap">Turn {battle.turn}</p>
            </div>

            <div ref={stage} className="battle-stage slant h-72 sm:h-88 lg:h-auto lg:grow">
                <div className="sheet" style={{ background: terrain.sky, '--ground': terrain.ground, '--sky': terrain.sky } as CSSProperties}>
                    <div className="tone absolute inset-x-0 top-[34%] h-[34%] text-[color-mix(in_srgb,var(--sky),white_45%)]" />
                    <div className="absolute inset-x-0 bottom-0 h-[46%] bg-(--ground) [clip-path:polygon(0_22%,100%_0,100%_100%,0_100%)]">
                        <div className="tone absolute inset-x-0 bottom-0 h-1/2 text-[color-mix(in_srgb,var(--ground),#17151F_26%)]" />
                    </div>
                    {flash && (
                        <div
                            onAnimationEnd={() => setFlash(null)}
                            className="focus-lines absolute inset-0 [--clear:3rem] animate-[rush_0.5s_ease-out]"
                            style={{ '--at': flash.at, '--line': flash.color } as CSSProperties}
                        />
                    )}
                    {players.map(({ team, activePokemon: active }, index) => (
                        <Fighter
                            key={`${index}-${shown[index]}`}
                            side={index}
                            pokemon={team[shown[index]]}
                            isLeaving={active !== shown[index]}
                            isWinner={showEnd && winnerSide === index}
                        />
                    ))}
                </div>
            </div>

            <div className="mt-3 grid lg:grid-cols-[1fr_20rem] lg:grid-rows-[100%] gap-3 lg:h-50 shrink-0">
                <div className="relative z-1">
                {showEnd
                    ? <BattleEndDialog winner={battle.winner!} side={winnerSide} onPlayAgain={() => dispatch(resetToSetup())} />
                    : controls}
                </div>
                <BattleLog logs={battle.battleLog} />
            </div>
        </div>
    );
}
