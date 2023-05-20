/** @format */
import { useQuery } from "@tanstack/react-query";
// import axios, { CancelToken } from 'axios';

export const useSearchPokemon = (pokemon) => {
  // via axios
  // const fetchPokemon = () => {
  // 	const source = CancelToken.source();
  // 	const promise = new Promise((resolve) => setTimeout(resolve, 1000))
  // 		.then(() => {
  // 			return axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`, {
  // 				cancelToken: source.token,
  // 			});
  // 		})
  // 		.then((res) => res.data);
  // 	promise.cancel = () => {
  // 		source.cancel('Query was cancelled by react query');
  // 	};
  // 	return promise;
  // };

  // via fetch
  const fetchPokemon = () => {
    const controller = new AbortController();

    const signal = controller.signal;

    const promise = new Promise((resolve) => setTimeout(resolve, 1000))
      .then(() => {
        return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`, {
          method: "GET",
          signal,
        });
      })
      .then((res) => res.json());
    // promise.cancel = () => {
    // 	controller.abort();
    // };

    return promise;
  };
  const queryInfo = useQuery(["pokemon", pokemon], fetchPokemon, {
    enabled: !!pokemon,
    retry: 1,
    retryDelay: 1000,
  });
  return {
    queryInfo,
  };
};
