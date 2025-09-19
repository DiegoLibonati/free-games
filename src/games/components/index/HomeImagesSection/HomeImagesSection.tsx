import { HomeCard } from "@src/games/components/index/HomeCard/HomeCard";

import { useAutoSlide } from "@src/hooks/useAutoSlide";
import { imagesOfGames } from "@src/constants/games";

import "@src/games/components/index/HomeImagesSection/HomeImagesSection.css";

export const HomeImagesSection = (): JSX.Element => {
  const autoIndex = useAutoSlide(imagesOfGames);

  return (
    <section className="home-images">
      {imagesOfGames.map((img, index) => {
        let position = "home-images__background home-images__background--next-slide";

        if (index === autoIndex) {
          position = "home-images__background home-images__background--active-slide";
        }

        if (
          index === autoIndex - 1 ||
          (autoIndex === 0 && index === imagesOfGames.length - 1)
        ) {
          position = "home-images__background home-images__background--last-slide";
        }

        return (
          <div
            key={`img-${index}`}
            className={position}
            style={{
              background: `linear-gradient(to bottom, rgba(4,9,38,0) 19%, rgba(6,14,58,0) 25%, rgba(8,18,74,0.07) 30%, rgba(8,18,74,0.35) 50%, rgba(8,18,74,0.36) 51%, rgba(8,18,74,0.64) 71%, rgba(8,18,74,1) 97%, rgba(8,18,74,1) 100%), url(${img})`,
              filter:
                "progid:DXImageTransform.Microsoft.gradient( startColorstr='#050b2e', endColorstr='#050b2e', GradientType=0 )",
            }}
          ></div>
        );
      })}

      <HomeCard></HomeCard>
    </section>
  );
};
