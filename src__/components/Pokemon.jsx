/** @format */
import { usePokemon } from '../hooks/usePokemon';
const Pokemon = () => {
	const { queryInfo } = usePokemon();
	return queryInfo.isLoading ? (
		'Loading...'
	) : queryInfo.isError ? (
		queryInfo.error.message
	) : (
		<>
			<h3>You are looking {queryInfo.data?.results.length} Pokemon</h3>
			<ul>
				{queryInfo.data.results.map(({ name }) => {
					return <li key={name}>{name}</li>;
				})}
			</ul>

			<br />
			{queryInfo.isFetching ? 'Updated....' : ''}
		</>
	);
};
export default Pokemon;
