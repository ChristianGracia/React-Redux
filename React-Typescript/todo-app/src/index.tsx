import React from "react";
import ReactDOM from "react-dom";

export default function App(): JSX.Elment {
  return <h1>Typescript</h1>;
}

const root = document.getElementById("app-root");
ReactDOM.render(<App />, root);
