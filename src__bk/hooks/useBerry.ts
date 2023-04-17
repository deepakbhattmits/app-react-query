/** @format */
import { useQuery } from "@tanstack/react-query";

export const useBerry = () => {
  const fetchBerries = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000)); //lag for 1 sec.
    // if (true) {
    // 	throw new Error('something went wrong');
    // }
    const response = await fetch(`https://pokeapi.co/api/v2/berry`);
    const data = await response.json();
    return data;
  };
  const queryInfo = useQuery(["berries"], fetchBerries);
  return {
    queryInfo,
  };
};
