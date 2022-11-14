/** @format */

/** @format */
import { useQuery } from '@tanstack/react-query';
export const useExchange = (currency) => {
	const fetchExchange = async ({ queryKey }) => {
		const response = await fetch(
			`https://api.ratesapi.io/api/latest?base=${queryKey[1]}`
		);
		const data = await response.json();
		return data;
	};

	const queryInfo = useQuery(['currency', currency], fetchExchange, {
		refetchOnWindowFocus: false,
	});
	const { isLoading, isError, error, data } = queryInfo;
	return {
		isLoading,
		isError,
		data,
		error,
	};
};
