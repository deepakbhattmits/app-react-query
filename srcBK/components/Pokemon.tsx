/** @format */
import { FC } from "react";
import { usePokemon } from "../hooks/usePokemon";
const Pokemon: FC = (): JSX.Element => {
  const { queryInfo } = usePokemon();
  const pokemon = () => {
    return queryInfo.isLoading ? (
      <h1>Loading...</h1>
    ) : queryInfo.isError ? (
      // queryInfo.error.message
      <h1>{queryInfo?.error}</h1>
    ) : queryInfo?.isSuccess ? (
      <>
        <h3>You are looking {queryInfo.data?.results.length} Pokemon</h3>
        <ul>
          {queryInfo.data.results.map(({ name }) => {
            return <li key={name}>{name}</li>;
          })}
        </ul>

        <br />
        {queryInfo.isFetching ? "Updated...." : ""}
      </>
    ) : (
      <span>No Pokemon found</span>
    );
  };
  return <>{pokemon()}</>;
};
export default Pokemon;
