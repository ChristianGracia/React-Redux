import React from "react";
import { Store } from "./Store";

export default function App(): JSX.Element {
  const { state, dispatch } = React.useContext(Store);

  React.useEffect(() => {
    // state.episodes.length === 0 && fetchDataAction();
    fetchDataAction();
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
  console.log(state);
  return (
    <React.Fragment>
      <h1>Ricky & Morty Video Picker</h1>
      <p>Pick your favorite episode!</p>
      <section>
        {state.episodes.map(episode => {
          return (
            <section key={episode.id}>
              <img
                src={episode.image.medium}
                alt={`Rick and morty ${episode.name}`}
              />
              <div>{episode.name}</div>
              <section>
                Seasion: {episode.season} Number: {episode.number}
              </section>
            </section>
          );
        })}
      </section>
    </React.Fragment>
  );
}
