/** @format */
// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { ReactQueryDevtools } from "react-query/devtools";
import App from "./components/App";
import Pokemon from "./components/Pokemon";
// import * as serviceWorker from './serviceWorker';
import "./styles/index.css";
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
      <App />
      <Pokemon />
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
    </Hydrate>
  </QueryClientProvider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
