/** @format */
import { useQuery } from "@tanstack/react-query";

export const usePokemon = () => {
  const fetchPokemon = async () => {
    await new Promise((resolve) => setTimeout(resolve, 3000)); //lag for 1 sec.
    // if (true) {
    // 	throw new Error('something went wrong');
    // }
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon`);
    const data = await response.json();
    return data;
  };
  const queryInfo = useQuery(["pokemon"], fetchPokemon);
  return {
    queryInfo,
  };
};
