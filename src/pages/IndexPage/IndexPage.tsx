import { Fragment, useEffect } from "react";

import { Footer } from "@src/components/Footer/Footer";
import { NavBar } from "@src/components/NavBar/NavBar";
import { HomeImagesSection } from "@src/components/HomeImagesSection/HomeImagesSection";
import { CarouselsGamesSection } from "@src/components/CarouselsGamesSection/CarouselsGamesSection";
import { ShowGamesSection } from "@src/components/ShowGamesSection/ShowGamesSection";
import { UpcomingGamesSection } from "@src/components/UpcomingGamesSection/UpcomingGamesSection";

import { useGamesStore } from "@src/hooks/useGamesStore";

import "@src/pages/IndexPage/IndexPage.css";

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
