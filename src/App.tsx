import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider, Link, Navigate, NavLink, Outlet, ScrollRestoration, useNavigate, useLocation } from 'react-router';
import { Provider } from 'react-redux';
import { QueryClientProvider } from '@tanstack/react-query';
import { ModalProvider } from './lib/ui';
import { queryClient } from './lib/shared';
import { ArrowLeft } from 'lucide-react';
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
    { path: '/pokedex', label: 'Pokédex', paper: '#D3E3C8' },
    { path: '/battle-sim', label: 'Battle', paper: '#F1E1B0' },
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
                <Link to="/" data-press="browse" className="flex items-center min-h-11 font-display text-lg md:text-2xl">
                    <span className="text-crimson">Poké</span>verse
                </Link>
                <nav className="ml-auto flex">
                    {SECTIONS.map(({ path, label }) => (
                        <NavLink
                            key={path}
                            to={path}
                            data-press="browse"
                            className={({ isActive }) => `grid place-items-center min-h-11 px-3 md:px-5 font-display text-sm md:text-base ${isActive ? 'bg-shadow text-white' : 'hover:text-crimson'}`}
                        >
                            {label}
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
