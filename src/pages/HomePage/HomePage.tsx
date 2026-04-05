import { Fragment, useEffect } from "react";

import type { JSX } from "react";

import Footer from "@/components/Footer/Footer";
import NavBar from "@/components/NavBar/NavBar";
import HomeImagesSection from "@/components/HomeImagesSection/HomeImagesSection";
import CarouselsGamesSection from "@/components/CarouselsGamesSection/CarouselsGamesSection";
import ShowGamesSection from "@/components/ShowGamesSection/ShowGamesSection";
import UpcomingGamesSection from "@/components/UpcomingGamesSection/UpcomingGamesSection";

import { useGamesStore } from "@/hooks/useGamesStore";

import "@/pages/HomePage/HomePage.css";

const HomePage = (): JSX.Element => {
  const { handleGetGames, handleSetToInitialState } = useGamesStore();

  const onInit = (): void => {
    handleGetGames();
  };

  const onDestroy = (): void => {
    handleSetToInitialState();
  };

  useEffect(() => {
    onInit();

    return (): void => {
      onDestroy();
    };
  }, []);

  return (
    <Fragment>
      <NavBar></NavBar>

      <main className="main-home-page">
        <HomeImagesSection></HomeImagesSection>
        <CarouselsGamesSection></CarouselsGamesSection>
        <ShowGamesSection></ShowGamesSection>
        <UpcomingGamesSection></UpcomingGamesSection>
      </main>

      <Footer></Footer>
    </Fragment>
  );
};

export default HomePage;
