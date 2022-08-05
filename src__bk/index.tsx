/** @format */
// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Hydrate } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import App from "./components/App";
import Pokemon from "./components/Pokemon";
// import * as serviceWorker from './serviceWorker';
import "./styles/_index.scss";
// import { ReactNode } from "react";

// declare module "react-query/types/react/QueryClientProvider" {
//   interface QueryClientProviderProps {
//     children?: ReactNode;
//   }
// }
const queryClient = new QueryClient();
const rootElement = document.querySelector("#root");
const root = createRoot(rootElement);
root.render(
  <QueryClientProvider client={queryClient}>
    <Hydrate>
      <main>
        <App />
        <Pokemon />
        <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      </main>
    </Hydrate>
  </QueryClientProvider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
