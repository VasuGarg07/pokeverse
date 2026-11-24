import { Check } from 'lucide-react';
import { Button, useModal } from '../lib/ui';
import { resetBattle } from '../store/battleSlice';
import { useAppDispatch, useAppSelector } from '../store/useRedux';

interface ContinueBattleDialogProps {
    onContinue: (path: string) => void;
}

const STEPS = ['Setup', 'Teams', 'Battle'];

const STEP_OF_PHASE: Record<string, number> = {
    SETUP: 0, TEAM_SELECTION: 1, LOADING: 1, BATTLE: 2, ENDED: 2,
};

const SIDES = [
    { panel: 'versus-left', sheet: 'bg-crimson pb-13 md:pb-3 md:pr-18' },
    { panel: 'versus-right', sheet: 'bg-cobalt pt-10 md:pt-3 md:pl-18 text-right' },
];

export default function ContinueBattleDialog({ onContinue }: ContinueBattleDialogProps) {
    const dispatch = useAppDispatch();
    const { close } = useModal();
    const { phase, players } = useAppSelector(state => state.battle);

    const getNavigationPath = () => {
        switch (phase) {
            case 'TEAM_SELECTION': return '/battle-sim/team-selection';
            case 'LOADING': return '/battle-sim/loading';
            case 'BATTLE': return '/battle-sim/battle';
            case 'ENDED': return '/battle-sim';
            default: return '/battle-sim';
        }
    };

    const handleContinue = () => { close(); onContinue(getNavigationPath()); };
    const handleNewBattle = () => { close(); dispatch(resetBattle()); onContinue('/battle-sim'); };

    const activeStep = STEP_OF_PHASE[phase] ?? 0;

    return (
        <div>
            <div className="speech px-5 py-4">
                <h3 className="font-display text-xl leading-tight">Continue where you left off?</h3>
                <p className="mt-1">Your session is saved and ready.</p>
            </div>

            <div className="mt-5 flex items-end gap-3">
                <img src="/pikachu.png" alt="" className="w-28 sm:w-36 -ml-2 shrink-0 animate-[pop-out_0.45s_ease-out]" />
                <ol className="grow space-y-1 pb-2">
                    {STEPS.map((step, index) => (
                        <li
                            key={step}
                            aria-current={index === activeStep ? 'step' : undefined}
                            className="slant slant-flow [--cut:polygon(12px_0,100%_0,calc(100%-12px)_100%,0_100%)]"
                        >
                            <span className={`sheet flex items-center gap-2 h-9 px-4 font-display text-sm ${index === activeStep ? 'bg-crimson text-white' : index < activeStep ? 'bg-shadow text-white' : 'bg-white text-smoke'}`}>
                                {index < activeStep ? <Check className="w-4 h-4" strokeWidth={4} aria-label="Done" /> : index + 1}
                                <span>{step}</span>
                            </span>
                        </li>
                    ))}
                </ol>
            </div>

            <div className="versus [--lean:36px]!">
                {players.map(({ name }, index) => (
                    <div key={index} className={`slant slant-flow ${SIDES[index].panel}`}>
                        <div className={`sheet h-full px-4 py-3 text-white ${SIDES[index].sheet}`}>
                            <p className="text-sm font-bold">Player {index + 1}</p>
                            <p className="font-display text-lg leading-tight wrap-anywhere">{name || 'No name'}</p>
                        </div>
                    </div>
                ))}
                <span className="versus-mark lettering text-5xl! top-1/2!" aria-hidden="true">VS</span>
            </div>

            <div className="mt-5 grid grid-cols-1 xs:grid-cols-2 gap-3">
                <Button tone="paper" onClick={handleNewBattle}>New Battle</Button>
                <Button tone="crimson" onClick={handleContinue}>Continue</Button>
            </div>
        </div>
    );
}
