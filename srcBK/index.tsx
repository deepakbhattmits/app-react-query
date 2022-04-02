/** @format */

import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
// import App from './components/App';
import Pokemon from "./components/Pokemon";
// import * as serviceWorker from './serviceWorker';
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { ReactQueryDevtools } from "react-query/devtools";
const queryClient = new QueryClient();
const rootElement = document.querySelector("#root");
ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Hydrate>
        {/* <App /> */}
        <Pokemon />
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </Hydrate>
    </QueryClientProvider>
  </React.StrictMode>,
  rootElement
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
