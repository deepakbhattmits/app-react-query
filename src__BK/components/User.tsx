/** @format */
import { useDependentQueries } from '../hooks/useDependentQueries';
const User = () => {
	const { queryInfo, queryPostInfo } = useDependentQueries();
	if (queryInfo.isLoading) {
		return 'Loading...';
	}
	return (
		<>
			<p>User Name:{JSON.stringify(queryInfo.data, null, 2)}</p>

			{/* <p>
				{queryPostInfo.isIdle
					? null
					: queryPostInfo.isLoading
					? 'Loading...'
					: queryPostInfo.data.length}
			</p> */}
			<p>{queryInfo.isFetching ? 'Updating...' : null}</p>
		</>
	);
};
export default User;
