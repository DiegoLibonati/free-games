import { Fragment, useEffect } from "react";

import { Footer } from "@src/ui/components/Footer/Footer";
import { NavBar } from "@src/ui/components/NavBar/NavBar";
import { HomeImagesSection } from "@src/games/components/index/HomeImagesSection/HomeImagesSection";
import { CarouselsGamesSection } from "@src/games/components/index/CarouselsGamesSection/CarouselsGamesSection";
import { ShowGamesSection } from "@src/games/components/index/ShowGamesSection/ShowGamesSection";
import { UpcomingGamesSection } from "@src/games/components/index/UpcomingGamesSection/UpcomingGamesSection";

import { useGamesStore } from "@src/hooks/useGamesStore";

import "@src/games/pages/IndexPage/IndexPage.css";

export const IndexPage = (): JSX.Element => {
  const { handleGetGames, handleSetToInitialState } = useGamesStore();

  const onInit = (): void => {
    console.log("Init - Index Page");
    handleGetGames();
  };

  const onDestroy = (): void => {
    console.log("Destroy - Index Page");
    handleSetToInitialState();
  };

  useEffect(() => {
    onInit();

    return () => onDestroy();
  }, []);

  return (
    <Fragment>
      <NavBar></NavBar>

      <main className="main-index-page">
        <HomeImagesSection></HomeImagesSection>
        <CarouselsGamesSection></CarouselsGamesSection>
        <ShowGamesSection></ShowGamesSection>
        <UpcomingGamesSection></UpcomingGamesSection>
      </main>

      <Footer></Footer>
    </Fragment>
  );
};
