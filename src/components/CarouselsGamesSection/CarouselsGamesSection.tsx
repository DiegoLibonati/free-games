import { useEffect, useState } from "react";

import { Game, Carousel } from "@src/entities/app";

import { Loader } from "@src/components/Loader/Loader";
import { CarouselGames } from "@src/components/CarouselGames/CarouselGames";

import { useGamesStore } from "@src/hooks/useGamesStore";

import { getSliceArraySorted } from "@src/helpers/getSliceArraySorted";

import { getGamesByCategory } from "@src/api/get/getGamesByCategory";

import "@src/components/CarouselsGamesSection/CarouselsGamesSection.css";

export const CarouselsGamesSection = (): JSX.Element => {
  const [carousels, setCarousels] = useState<Carousel<Game>[]>([]);

  const { categories } = useGamesStore();

  const handleGetGamesFromCategories = (categories: string[]): void => {
    categories.forEach(async (category) => {
      try {
        setCarousels((state) => [
          ...state,
          { name: category, isLoading: true, arr: [] },
        ]);

        const data = await getGamesByCategory(category);

        setCarousels((state) =>
          state.filter((carousel) => !carousel.isLoading)
        );
        setCarousels((state) => [
          ...state,
          { name: category, isLoading: false, arr: data.slice(0, 20) },
        ]);
      } catch (e) {
        setCarousels((state) =>
          state.filter((carousel) => !carousel.isLoading)
        );
      }
    });
  };

  useEffect(() => {
    if (!categories.length) return;

    const randomCategories = getSliceArraySorted(categories, 5);

    handleGetGamesFromCategories(randomCategories);
  }, [categories]);

  return (
    <section className="carousels">
      {carousels.map((carousel, index) => {
        return carousel.isLoading ? (
          <article key={`${carousel.name}-${index}`} className="carousel-games">
            <Loader></Loader>
          </article>
        ) : (
          <CarouselGames
            key={`${carousel.name}-${index}`}
            games={carousel.arr}
            name={carousel.name}
          ></CarouselGames>
        );
      })}
    </section>
  );
};
