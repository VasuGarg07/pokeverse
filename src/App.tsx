import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Link, Navigate, NavLink, Outlet, ScrollRestoration, useNavigate, useLocation } from 'react-router';
import { Provider } from 'react-redux';
import { QueryClientProvider } from '@tanstack/react-query';
import { ModalProvider, PokeBall } from './lib/ui';
import { queryClient } from './lib/shared';
import { ArrowLeft, BookOpen, Swords } from 'lucide-react';
import { GithubIcon, LinkedinIcon, XIcon } from './lib/ui';
import { store } from './store/store';
import Pokeverse from './Pokeverse';
import Pokedex from './Pokedex/Pokedex';
import PokemonDetails from './PokemonDetails/PokemonDetails';
import BattleSimLayout from './BattleSimLayout/BattleSimLayout';
import BattleSetup from './BattleSetup/BattleSetup';
import TeamSelection from './TeamSelection/TeamSelection';
import PrepareBattle from './PrepareBattle/PrepareBattle';
import BattleScreen from './BattleScreen/BattleScreen';

const SOCIALS = [
    { href: 'https://github.com/VasuGarg07', icon: GithubIcon, label: 'GitHub' },
    { href: 'https://linkedin.com/in/vasu-garg-07', icon: LinkedinIcon, label: 'LinkedIn' },
    { href: 'https://x.com/_vasugarg_', icon: XIcon, label: 'X' },
];

const SECTIONS = [
    { path: '/pokedex', label: 'Pokédex', icon: BookOpen, cut: 'nav-dex', paper: '#D3E3C8' },
    { path: '/battle-sim', label: 'Battle', icon: Swords, cut: 'nav-battle', paper: '#F1E1B0' },
];

const HOME_PAPER = '#F3D3CC';

function AppLayout() {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const paper = SECTIONS.find(({ path }) => pathname.startsWith(path))?.paper ?? HOME_PAPER;

    useEffect(() => {
        document.documentElement.style.setProperty('--paper', paper);
    }, [paper]);

    return (
        <div className="min-h-screen bg-chalk flex flex-col">

            <header className="sticky top-0 z-20 h-14 bg-white border-b-3 border-shadow px-3 md:px-6 flex items-center gap-1 shrink-0">
                {pathname !== '/' && (
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        data-press="browse"
                        className="w-11 h-11 grid place-items-center hover:text-crimson cursor-pointer shrink-0"
                        aria-label="Go back"
                    >
                        <ArrowLeft size={20} strokeWidth={3} />
                    </button>
                )}
                <Link to="/" data-press="browse" aria-label="Pokéverse home" className="flex items-center min-w-11 min-h-11 font-display text-lg md:text-2xl">
                    {pathname !== '/' && <PokeBall className="sm:hidden w-8 h-8" />}
                    <span className={pathname !== '/' ? 'hidden sm:inline' : ''}><span className="text-crimson">Poké</span>verse</span>
                </Link>
                <nav className="ml-auto flex self-stretch -mr-3 md:-mr-6">
                    {SECTIONS.map(({ path, label, icon: Icon, cut }) => (
                        <NavLink key={path} to={path} data-press="browse" className={`nav-panel slant ${cut}`}>
                            <span className="sheet flex items-center justify-center gap-2">
                                <Icon className="hidden sm:block w-5 h-5" strokeWidth={2.75} />
                                {label}
                            </span>
                        </NavLink>
                    ))}
                </nav>
            </header>

            <main className="flex-1 flex flex-col">
                <Outlet />
            </main>
            <ScrollRestoration />

            <footer className="border-t-10 border-crimson bg-shadow text-white px-3 md:px-6 py-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm shrink-0">
                <span>© {new Date().getFullYear()} Vasu Garg</span>
                <span>
                    Data from <a href="https://pokeapi.co" target="_blank" rel="noopener noreferrer" className="font-bold underline">PokéAPI</a>,
                    effects by <a href="https://sakuga-vfx.vercel.app" target="_blank" rel="noopener noreferrer" className="font-bold underline">Sakuga VFX</a>
                </span>
                <div className="sm:ml-auto flex gap-3">
                    {SOCIALS.map(({ href, icon, label }) => (
                        <pv-link-tip key={label} href={href} text={label} label={label}>
                            <img src={icon} alt="" className="w-5 h-5" />
                        </pv-link-tip>
                    ))}
                </div>
            </footer>
        </div>
    );
}

const router = createBrowserRouter([
    {
        element: <AppLayout />,
        children: [
            { path: '/', element: <Pokeverse /> },
            { path: '/pokedex', element: <Pokedex /> },
            { path: '/pokedex/:id', element: <PokemonDetails /> },
            {
                path: '/battle-sim',
                element: <BattleSimLayout />,
                children: [
                    { index: true, element: <BattleSetup /> },
                    { path: 'team-selection', element: <TeamSelection /> },
                    { path: 'loading', element: <PrepareBattle /> },
                    { path: 'battle', element: <BattleScreen /> },
                ],
            },
            { path: '*', element: <Navigate to="/" replace /> },
        ],
    },
]);

export default function App() {
    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <ModalProvider>
                    <RouterProvider router={router} />
                </ModalProvider>
            </QueryClientProvider>
        </Provider>
    );
}
