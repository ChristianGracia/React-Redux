import React from "react";
import { Store } from "./Store";
import "./index.css";
import { IAction, IEpisode } from "./interfaces/interfaces";

const EpisodeList = React.lazy(() => import("./EpisodesList"));

export default function App(): JSX.Element {
  const { state, dispatch } = React.useContext(Store);

  React.useEffect(() => {
    state.episodes.length === 0 && fetchDataAction();
  });
  const fetchDataAction = async () => {
    const URL =
      "https://api.tvmaze.com/singlesearch/shows?q=rick-&-morty&embed=episodes";
    const data = await fetch(URL);

    const dataJSON = await data.json();

    return dispatch({
      type: "FETCH_DATA",
      payload: dataJSON._embedded.episodes
    });
  };
  const toggleFavoriteAction = (episode: IEpisode): IAction => {
    const episodeInFav = state.favorites.includes(episode);
    let dispatchObj = {
      type: "ADD_FAV",
      payload: episode
    };
    if (episodeInFav) {
      const favWithoutEpisode = state.favorites.filter(
        (fav: IEpisode) => fav.id != episode.id
      );
      dispatchObj = {
        type: "REMOVE_FAV",
        payload: favWithoutEpisode
      };
    }
    return dispatch(dispatchObj);
  };
  const props = {
    episodes: state.episode,
    toggleFavAction: toggleFavoriteAction,
    favorites: state.favorites
  };

  console.log(state);
  return (
    <React.Fragment>
      <header className="header"></header>
      <h1>Ricky & Morty Video Picker</h1>
      <p>Pick your favorite episode!</p>
      <section className="episodeLayout">
        <EpisodeList {...props} />
      </section>
    </React.Fragment>
  );
}
