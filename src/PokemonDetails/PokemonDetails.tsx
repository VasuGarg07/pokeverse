import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { DETAIL_TABS } from '../helpers/constants';
import { Tabs } from '../lib/ui';
import { usePokemon } from '../hooks/usePokemon';
import HeroSection from './HeroSection';
import InfoSection from './InfoSection';
import EntriesSection from './EntriesSection';
import GallerySection from './GallerySection';
import MovesGrid from './MovesGrid';
import EvolutionChain from './EvolutionChain';
import VarietiesSection from './VarietiesSection';
import StatsSection from './StatsSection';

export default function PokemonDetails() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const pokemonId = parseInt(id || '1');

    const { pokemon, isLoading, error } = usePokemon(pokemonId);
    const [activeTab, setActiveTab] = useState('info');

    if (isLoading) {
        return (
            <div className="flex-1 flex items-center justify-center bg-chalk py-20">
                <div className="text-center space-y-4">
                    <div className="w-14 h-14 border-4 border-silver border-t-crimson rounded-full animate-spin mx-auto" />
                    <p className="text-sm font-medium text-smoke">Loading Pokémon...</p>
                </div>
            </div>
        );
    }

    if (error || !pokemon) {
        return (
            <div className="flex-1 flex items-center justify-center bg-chalk p-8">
                <div className="text-center space-y-4 max-w-sm">
                    <div className="w-16 h-16 rounded-full bg-crimson/10 flex items-center justify-center mx-auto">
                        <span className="text-3xl">😞</span>
                    </div>
                    <h2 className="text-xl font-black text-shadow">Pokémon Not Found</h2>
                    <p className="text-sm text-smoke">Could not load Pokémon data. Please try again.</p>
                    <button
                        onClick={() => navigate('/pokedex')}
                        className="px-5 py-2.5 bg-crimson hover:bg-ruby text-white text-sm font-bold rounded-lg transition-all duration-200"
                    >
                        Back to Pokédex
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col bg-chalk">
            <HeroSection pokemon={pokemon} />

            <div className="sticky top-14 z-10 bg-white border-y-3 border-shadow">
                <div className="max-w-4xl mx-auto px-3">
                    <Tabs label="Pokémon details" tabs={DETAIL_TABS} active={activeTab} onChange={setActiveTab} />
                </div>
            </div>

            <div className="max-w-4xl mx-auto w-full px-4 py-6">
                {activeTab === 'info' && <InfoSection pokemon={pokemon} />}
                {activeTab === 'entries' && <EntriesSection pokemon={pokemon} />}
                {activeTab === 'moves' && <MovesGrid pokemon={pokemon} />}
                {activeTab === 'stats' && <StatsSection pokemon={pokemon} />}
                {activeTab === 'evolution' && <EvolutionChain pokemon={pokemon} />}
                {activeTab === 'varieties' && <VarietiesSection pokemon={pokemon} />}
                {activeTab === 'gallery' && <GallerySection pokemon={pokemon} />}
            </div>
        </div>
    );
}
