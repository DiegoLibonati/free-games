import { collection, doc, setDoc, getDocs, deleteDoc } from "firebase/firestore/lite";

import { Game } from "@/types/app";

import { FirebaseDB } from "@/firebase/config";

import {
  setCategories,
  setFavoritesGames,
  setGames,
  setLoadingFavoritesGames,
  setLoadingGames,
} from "@/features/games/gamesSlice";
import { openAlert } from "@/features/ui/uiSlice";

import { AppDispatch, RootState } from "@/app/store";

import { gamesService } from "@/services/gamesService";

export const startGettingGames = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoadingGames(true));

      const data = await gamesService.getAll();

      dispatch(setGames(data));
      dispatch(setCategories(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const startSaveNewGameToFavorite = (game: Game) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const { user } = getState().auth;

    const collectionRef = collection(FirebaseDB, `${user.uid}/games/game`);
    const { docs } = await getDocs(collectionRef);

    const gameExistInFavorite = docs.find((document) => document.data().id === game.id);

    if (gameExistInFavorite) {
      return dispatch(
        openAlert({
          isOpen: true,
          title: "Favorite Game",
          type: "error",
          message: "¡You already have that game with favorite!",
        })
      );
    }

    const newGame = {
      ...game,
      idFirebase: "",
    };

    const newDoc = doc(collection(FirebaseDB, `${user.uid}/games/game`));

    newGame.idFirebase = newDoc.id;

    await setDoc(newDoc, newGame);

    return dispatch(
      openAlert({
        isOpen: true,
        title: "Favorite Game",
        type: "success",
        message: "¡Game added to your favorites successfully!",
      })
    );
  };
};

export const startGettingFavoriteGames = () => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(setLoadingFavoritesGames(true));

    const { user } = getState().auth;

    const collectionRef = collection(FirebaseDB, `${user.uid}/games/game`);
    const { docs } = await getDocs(collectionRef);

    const games: Game[] = docs.map((doc) => {
      const data = doc.data();

      return {
        id: data.id,
        developer: data.developer,
        freetogame_profile_url: data.freetogame_profile_url,
        game_url: data.game_url,
        genre: data.genre,
        platform: data.platform,
        publisher: data.publisher,
        release_date: data.release_date,
        short_description: data.short_description,
        thumbnail: data.thumbnail,
        title: data.title,
        idFirebase: doc.id,
      };
    });

    dispatch(setFavoritesGames(games as Game[]));
  };
};

export const startDeletingFavoriteGame = (game: Game) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const { user } = getState().auth;

    const docRef = doc(FirebaseDB, `${user.uid}/games/game/${game.idFirebase}`);

    await deleteDoc(docRef);

    dispatch(startGettingFavoriteGames());
  };
};

export const startGettingGamesByCategory = (category: string) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoadingGames(true));

      if (!category || category === "all") {
        const data: Game[] = await gamesService.getAll();
        dispatch(setGames(data));
        dispatch(setCategories(data));
        return;
      }

      const allGames = await gamesService.getAll();
      dispatch(setCategories(allGames));

      const data: Game[] = await gamesService.getByCategory(category);
      dispatch(setGames(data));
    } catch (error) {
      console.log(error);
    }
  };
};
