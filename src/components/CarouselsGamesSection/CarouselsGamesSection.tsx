import { useEffect, useState } from "react";

import { Game, Carousel } from "@/types/app";

import Loader from "@/components/Loader/Loader";
import CarouselGames from "@/components/CarouselGames/CarouselGames";

import { useGamesStore } from "@/hooks/useGamesStore";

import { getSliceArraySorted } from "@/helpers/getSliceArraySorted";

import { gamesService } from "@/services/gamesService";

import "@/components/CarouselsGamesSection/CarouselsGamesSection.css";

const CarouselsGamesSection = () => {
  const [carousels, setCarousels] = useState<Carousel<Game>[]>([]);

  const { categories } = useGamesStore();

  const handleGetGamesFromCategories = (categories: string[]): void => {
    categories.forEach(async (category) => {
      try {
        setCarousels((state) => [...state, { name: category, isLoading: true, arr: [] }]);

        const data = await gamesService.getByCategory(category);

        setCarousels((state) => state.filter((carousel) => !carousel.isLoading));
        setCarousels((state) => [
          ...state,
          { name: category, isLoading: false, arr: data.slice(0, 20) },
        ]);
      } catch (e) {
        console.log(e);
        setCarousels((state) => state.filter((carousel) => !carousel.isLoading));
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

export default CarouselsGamesSection;
