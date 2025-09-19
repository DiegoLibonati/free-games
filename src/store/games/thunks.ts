import {
  collection,
  doc,
  setDoc,
  getDocs,
  deleteDoc,
} from "firebase/firestore/lite";

import { AppDispatch, Game, RootState } from "@src/entities/entities";

import { getGames } from "@src/api/getGames";
import { getGamesByCategory } from "@src/api/getGamesByCategory";
import { FirebaseDB } from "@src/firebase/config";
import {
  setCategories,
  setFavoritesGames,
  setGames,
  setLoadingFavoritesGames,
  setLoadingGames,
} from "@src/store/games/gamesSlice";
import { openAlert } from "@src/store/ui/uiSlice";

// --- NEW ---

export const startGettingGames = () => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(setLoadingGames(true));

      const data = await getGames();

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

    const gameExistInFavorite = docs.find(
      (document) => document.data().id === game.id
    );

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
        const data: Game[] = await getGames();
        dispatch(setGames(data));
        dispatch(setCategories(data));
        return;
      }

      const allGames = await getGames();
      dispatch(setCategories(allGames));

      const data: Game[] = await getGamesByCategory(category);
      dispatch(setGames(data));
    } catch (error) {
      console.log(error);
    }
  };
};

// --- END - NEW ---

// export const startGettingInformationToHomeCard = () => {
//   return async (dispatch: AppDispatch) => {
//     try {
//       dispatch(setLoading());
//       dispatch(setLoadingHomeCardsWithInformation());

//       const response = await gamesApi.get("/api/games", {
//         method: "GET",
//         params: { id: "452" },
//       });

//       const data = await response.data;
//       const shuffledData = [...data].sort(() => 0.5 - Math.random());
//       const dataSliced: Game[] = shuffledData.slice(0, 12);
//       const singleGame: Game = data[Math.floor(Math.random() * data.length)];

//       dispatch(setHomeCard(singleGame));
//       dispatch(setHomeCardsWithInformation(dataSliced));
//     } catch (error) {
//       console.log(error);
//     }
//   };
// };

// export const startGettingGamesToSliders = () => {
//   return async (dispatch: AppDispatch, getState: () => RootState) => {
//     const categories = [];

//     try {
//       dispatch(setLoadingGamesSliders());

//       const shuffled = getState()
//         .games.allCategoriesOfApi.map((value) => ({
//           value,
//           sort: Math.random(),
//         }))
//         .sort((a, b) => a.sort - b.sort)
//         .map(({ value }) => value);

//       for await (const item of shuffled) {
//         if (categories.length === 3) {
//           break;
//         } else {
//           if (categories[item as keyof string[]] || item === "all") {
//             continue;
//           } else {
//             categories.push(item);
//           }
//         }
//       }

//       const responseSliderOne = await gamesApi.get(
//         `/api/games?category=${categories[0]}`,
//         {
//           method: "GET",
//           params: { id: "452" },
//         }
//       );

//       const dataSliderOne: Game[] = await responseSliderOne.data;
//       const dataSliderOneSliced: Game[] = dataSliderOne.slice(0, 9);

//       const finalObjectOne = {
//         categoryName: categories[0],
//         games: dataSliderOneSliced,
//       };

//       dispatch(setGamesSliderOne(finalObjectOne));

//       const responseSliderTwo = await gamesApi.get(
//         `/api/games?category=${categories[1]}`,
//         {
//           method: "GET",
//           params: { id: "452" },
//         }
//       );

//       const dataSliderTwo: Game[] = await responseSliderTwo.data;
//       const dataSliderTwoSliced: Game[] = dataSliderTwo.slice(0, 9);

//       const finalObjectTwo = {
//         categoryName: categories[1],
//         games: dataSliderTwoSliced,
//       };

//       dispatch(setGamesSliderTwo(finalObjectTwo));

//       const responseSliderTr = await gamesApi.get(
//         `/api/games?category=${categories[2]}`,
//         {
//           method: "GET",
//           params: { id: "452" },
//         }
//       );

//       const dataSliderTr: Game[] = await responseSliderTr.data;
//       const dataSliderTrSliced: Game[] = dataSliderTr.slice(0, 9);

//       const finalObjectTr = {
//         categoryName: categories[2],
//         games: dataSliderTrSliced,
//       };

//       dispatch(setGamesSliderTr(finalObjectTr));
//     } catch (error) {
//       console.log(error);
//     }
//   };
// };
