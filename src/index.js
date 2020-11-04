import React from "react";
import ReactDOM from "react-dom";

import reportWebVitals from "./reportWebVitals";
import { DataLayer } from "./components/DataLayer";
import reducer, { initialState } from "./utils/reducers";

import AppRouter from "./router/AppRouter";

import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <DataLayer initialState={initialState} reducer={reducer}>
      <AppRouter />
    </DataLayer>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
