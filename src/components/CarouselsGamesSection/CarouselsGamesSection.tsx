import { useEffect, useState } from "react";

import type { JSX } from "react";
import type { Game, Carousel } from "@/types/app";

import Loader from "@/components/Loader/Loader";
import CarouselGames from "@/components/CarouselGames/CarouselGames";

import { useGamesStore } from "@/hooks/useGamesStore";

import { getSliceArraySorted } from "@/helpers/getSliceArraySorted";

import gameService from "@/services/gameService";

import "@/components/CarouselsGamesSection/CarouselsGamesSection.css";

const CarouselsGamesSection = (): JSX.Element => {
  const [carousels, setCarousels] = useState<Carousel<Game>[]>([]);

  const { categories } = useGamesStore();

  const handleGetGamesFromCategories = async (categories: string[]): Promise<void> => {
    await Promise.all(
      categories.map(async (category) => {
        try {
          setCarousels((state) => [...state, { name: category, isLoading: true, arr: [] }]);
          const data = await gameService.getByCategory(category);
          setCarousels((state) => state.filter((carousel) => !carousel.isLoading));
          setCarousels((state) => [
            ...state,
            { name: category, isLoading: false, arr: data.slice(0, 20) },
          ]);
        } catch (e) {
          console.log(e);
          setCarousels((state) => state.filter((carousel) => !carousel.isLoading));
        }
      })
    );
  };

  useEffect(() => {
    if (!categories.length) return;

    const randomCategories = getSliceArraySorted(categories, 5);

    void handleGetGamesFromCategories(randomCategories);
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

export default CarouselsGamesSection;
