import { useEffect, useRef } from 'react';
import PokemonCard from './PokemonCard';
import { RegionPanels } from './RegionPanels';
import { ITEMS_PER_PAGE, REGION_COLORS } from '../helpers/constants';
import type { Region } from '../helpers/types';
import { useInfinitePokemon } from '../hooks/useInfinitePokemon';
import { BackToTop, Button, PokeBall } from '../lib/ui';
import { useAppDispatch, useAppSelector } from '../store/useRedux';
import { setSelectedRegion } from '../store/pokedexSlice';

export default function Pokedex() {
    const dispatch = useAppDispatch();
    const selectedRegion = useAppSelector((state) => state.pokedex.selectedRegion);

    const observerTarget = useRef<HTMLDivElement>(null);

    const {
        data,
        error,
        refetch,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
    } = useInfinitePokemon({
        regionStart: selectedRegion.startId,
        regionEnd: selectedRegion.endId,
    });

    const allPokemons = data?.pages.flat() ?? [];

    useEffect(() => {
        if (!observerTarget.current) return;
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
                    fetchNextPage();
                }
            },
            { threshold: 0.5 }
        );
        observer.observe(observerTarget.current);
        return () => observer.disconnect();
    }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

    const handleRegionChange = (region: Region) => {
        dispatch(setSelectedRegion(region));
        window.scrollTo({ top: 0 });
    };

    const paper = `color-mix(in srgb, ${REGION_COLORS[selectedRegion.name]} 34%, white)`;

    return (
        <div className="flex-1 flex flex-col" style={{ background: paper }}>
            <h1 className="sr-only">Pokédex: {selectedRegion.name}</h1>

            <div className="max-w-7xl mx-auto w-full px-3 md:px-6 pt-5 pb-10">
                <RegionPanels selected={selectedRegion} onSelect={handleRegionChange} />

                <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-3 gap-y-8">
                    {allPokemons.map((pokemon, index) => (
                        <PokemonCard
                            key={pokemon.id}
                            pokemon={pokemon}
                            isSplash={index === 0}
                            delay={(index % ITEMS_PER_PAGE) * 0.03}
                        />
                    ))}
                </div>

                <div ref={observerTarget} role="status" className="min-h-28 grid place-items-center text-center font-bold">
                    {error ? (
                        <div className="space-y-3">
                            <p>The Pokémon did not load. Check your connection and try again.</p>
                            <Button tone="crimson" onClick={() => refetch()}>Try again</Button>
                        </div>
                    ) : isLoading || isFetchingNextPage ? (
                        <>
                            <PokeBall className="w-16 h-16 animate-[ball-wobble_1.2s_ease-in-out_infinite]" />
                            <span className="sr-only">Loading Pokémon</span>
                        </>
                    ) : !hasNextPage && (
                        <p>That is all {allPokemons.length} Pokémon in {selectedRegion.name}.</p>
                    )}
                </div>
            </div>

            <BackToTop />
        </div>
    );
}
