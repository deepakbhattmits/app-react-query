/** @format */
import { useSearchPokemon } from '../hooks/useSearchPokemon';
const SearchPokemon = ({ pokemon }) => {
	const { queryInfo } = useSearchPokemon(pokemon);
	return queryInfo.isLoading ? (
		'Loading...'
	) : queryInfo.isError ? (
		<h3>Error: {queryInfo.error.message}</h3>
	) : (
		<>
			{queryInfo.data?.sprites?.front_default ? (
				<img
					src={queryInfo.data.sprites.front_default}
					alt={queryInfo.data?.name}
					width={95}
					height={95}
					style={{ border: '2px solid #ccc', margin: '5px' }}
				/>
			) : (
				<div
					style={{
						border: '2px solid #ccc',
						margin: '5px',
						width: '95px',
						height: '95px',
						display: 'flex',
						alignItems: 'center',
					}}>
					Pokemon not Found...
				</div>
			)}

			<br />
			{queryInfo.isFetching ? 'Updated...' : ''}
		</>
	);
};
export default SearchPokemon;
