import { useState, type CSSProperties } from 'react';
import { useNavigate, useParams } from 'react-router';
import { DETAIL_TABS, TYPE_COLORS } from '../helpers/constants';
import { BackToTop, Button, PokeBall, Tabs } from '../lib/ui';
import { usePokemon } from '../hooks/usePokemon';
import HeroSection from './HeroSection';
import InfoSection from './InfoSection';
import EntriesSection from './EntriesSection';
import GallerySection from './GallerySection';
import MovesGrid from './MovesGrid';
import EvolutionChain from './EvolutionChain';
import VarietiesSection from './VarietiesSection';
import StatsSection from './StatsSection';

const SECTIONS: Record<string, typeof InfoSection> = {
    info: InfoSection,
    entries: EntriesSection,
    moves: MovesGrid,
    stats: StatsSection,
    evolution: EvolutionChain,
    varieties: VarietiesSection,
    gallery: GallerySection,
};

export default function PokemonDetails() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const pokemonId = parseInt(id || '1');

    const { pokemon, isLoading, error } = usePokemon(pokemonId);
    const [activeTab, setActiveTab] = useState('info');

    if (isLoading) {
        return (
            <div role="status" className="flex-1 grid place-content-center justify-items-center gap-3 py-20 font-bold">
                <PokeBall className="w-20 h-20 animate-[ball-wobble_1.2s_ease-in-out_infinite]" />
                Loading Pokémon
            </div>
        );
    }

    if (error || !pokemon) {
        return (
            <div className="flex-1 grid place-content-center justify-items-center gap-4 p-6 text-center">
                <h1 className="font-display text-2xl">That Pokémon did not load</h1>
                <p>Check the number in the address or your connection, then try again.</p>
                <Button tone="crimson" onClick={() => navigate('/pokedex')}>Back to Pokédex</Button>
            </div>
        );
    }

    const color = TYPE_COLORS[pokemon.types[0]];
    const Section = SECTIONS[activeTab];

    return (
        <div className="flex-1" style={{ background: `color-mix(in srgb, ${color} 30%, white)`, '--line': color } as CSSProperties}>
            <div className="max-w-7xl mx-auto px-3 md:px-6 pt-4 md:pt-6">
                <HeroSection pokemon={pokemon} />
            </div>

            <div className="sticky top-14 z-10 mt-5 bg-white border-y-3 border-shadow">
                <div className="max-w-5xl mx-auto px-3 md:px-6">
                    <Tabs label="Pokémon details" tabs={DETAIL_TABS} active={activeTab} onChange={setActiveTab} />
                </div>
            </div>

            <div key={`${pokemon.id}-${activeTab}`} role="tabpanel" className="max-w-5xl mx-auto px-3 md:px-6 pt-6 pb-12 animate-[section-in_0.22s_ease-out]">
                <Section pokemon={pokemon} />
            </div>

            <BackToTop />
        </div>
    );
}
