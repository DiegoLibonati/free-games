import { Fragment, useEffect } from "react";

import Footer from "@/components/Footer/Footer";
import NavBar from "@/components/NavBar/NavBar";
import HomeImagesSection from "@/components/HomeImagesSection/HomeImagesSection";
import CarouselsGamesSection from "@/components/CarouselsGamesSection/CarouselsGamesSection";
import ShowGamesSection from "@/components/ShowGamesSection/ShowGamesSection";
import UpcomingGamesSection from "@/components/UpcomingGamesSection/UpcomingGamesSection";

import { useGamesStore } from "@/hooks/useGamesStore";

import "@/pages/HomePage/HomePage.css";

const HomePage = () => {
  const { handleGetGames, handleSetToInitialState } = useGamesStore();

  const onInit = (): void => {
    console.log("Init - Home Page");
    handleGetGames();
  };

  const onDestroy = (): void => {
    console.log("Destroy - Home Page");
    handleSetToInitialState();
  };

  useEffect(() => {
    onInit();

    return () => onDestroy();
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
