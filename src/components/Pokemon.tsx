/** @format */
import { FC } from "react";
import { usePokemon } from "../hooks/usePokemon";
const Pokemon: FC = (): JSX.Element => {
  const { queryInfo } = usePokemon();
  const pokemon = () => {
    return queryInfo?.isLoading ? (
      <h1>Loading...</h1>
    ) : queryInfo?.isError ? (
      // queryInfo.error.message
      <h1>{queryInfo?.error as string}</h1>
    ) : queryInfo?.isSuccess ? (
      <>
        <h3>You are looking {queryInfo.data?.results.length} Pokemon</h3>
        <ul className="list__wrapper">
          {queryInfo.data.results.map(({ name, url }) => {
            return (
              <li className="list__wrapper--item" key={name}>
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                    url?.match(/[^pokemon\\/]+?(?=\/)/gi)[3]
                  }.png`}
                  alt={name}
                  className="list__wrapper--item-image"
                />
                <span className="list__wrapper--item-name">{name}</span>
              </li>
            );
          })}
        </ul>

        <br />
        {queryInfo.isFetching ? "Updated...." : ""}
      </>
    ) : (
      <span>No Pokemon found</span>
    );
  };
  return pokemon();
};
export default Pokemon;
