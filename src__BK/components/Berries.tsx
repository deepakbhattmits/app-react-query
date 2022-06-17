/** @format */
import { useBerry } from "../hooks/useBerry";
const Berries = () => {
  const { queryInfo } = useBerry();
  return queryInfo.isLoading ? (
    "Loading..."
  ) : queryInfo.isError ? (
    // queryInfo?.error.message
    queryInfo?.error
  ) : (
    <>
      <h3>You are looking {queryInfo.data?.results.length} Berries</h3>
      <ul>
        {queryInfo.data.results.map(({ name }) => {
          return <li key={name}>{name}</li>;
        })}
      </ul>

      <br />
      {queryInfo.isFetching ? "Updated...." : ""}
    </>
  );
};
export default Berries;
