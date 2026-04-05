import { collection, doc, setDoc, getDocs, deleteDoc } from "firebase/firestore/lite";

import type { Game } from "@/types/app";

import { FirebaseDB } from "@/firebase/config";

import {
  setCategories,
  setFavoritesGames,
  setGames,
  setLoadingFavoritesGames,
  setLoadingGames,
} from "@/features/games/gamesSlice";
import { openAlert } from "@/features/ui/uiSlice";

import type { AppDispatch, RootState } from "@/app/store";

import gameService from "@/services/gameService";

export const startGettingGames = () => {
  return async (dispatch: AppDispatch): Promise<void> => {
    try {
      dispatch(setLoadingGames(true));

      const data = await gameService.getAll();

      dispatch(setGames(data));
      dispatch(setCategories(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const startSaveNewGameToFavorite = (game: Game) => {
  return async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
    const { user } = getState().auth;

    const collectionRef = collection(FirebaseDB, `${user.uid}/games/game`);
    const { docs } = await getDocs(collectionRef);

    const gameExistInFavorite = docs.find((document) => document.data().id === game.id);

    if (gameExistInFavorite) {
      dispatch(
        openAlert({
          isOpen: true,
          title: "Favorite Game",
          type: "error",
          message: "¡You already have that game with favorite!",
        })
      );

      return;
    }

    const newGame = {
      ...game,
      idFirebase: "",
    };

    const newDoc = doc(collection(FirebaseDB, `${user.uid}/games/game`));

    newGame.idFirebase = newDoc.id;

    await setDoc(newDoc, newGame);

    dispatch(
      openAlert({
        isOpen: true,
        title: "Favorite Game",
        type: "success",
        message: "¡Game added to your favorites successfully!",
      })
    );
    return;
  };
};

export const startGettingFavoriteGames = () => {
  return async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
    dispatch(setLoadingFavoritesGames(true));

    const { user } = getState().auth;

    const collectionRef = collection(FirebaseDB, `${user.uid}/games/game`);
    const { docs } = await getDocs(collectionRef);

    const games: Game[] = docs.map((doc) => {
      const data = doc.data();

      return {
        id: data.id as number,
        developer: data.developer as string,
        freetogame_profile_url: data.freetogame_profile_url as string,
        game_url: data.game_url as string,
        genre: data.genre as string,
        platform: data.platform as string,
        publisher: data.publisher as string,
        release_date: data.release_date as string,
        short_description: data.short_description as string,
        thumbnail: data.thumbnail as string,
        title: data.title as string,
        idFirebase: doc.id,
      };
    });

    dispatch(setFavoritesGames(games));
  };
};

export const startDeletingFavoriteGame = (game: Game) => {
  return async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
    const { user } = getState().auth;

    const docRef = doc(FirebaseDB, `${user.uid}/games/game/${game.idFirebase}`);

    await deleteDoc(docRef);

    void dispatch(startGettingFavoriteGames());
  };
};

export const startGettingGamesByCategory = (category: string) => {
  return async (dispatch: AppDispatch): Promise<void> => {
    try {
      dispatch(setLoadingGames(true));

      if (!category || category === "all") {
        const data: Game[] = await gameService.getAll();
        dispatch(setGames(data));
        dispatch(setCategories(data));
        return;
      }

      const allGames = await gameService.getAll();
      dispatch(setCategories(allGames));

      const data: Game[] = await gameService.getByCategory(category);
      dispatch(setGames(data));
    } catch (error) {
      console.log(error);
    }
  };
};
