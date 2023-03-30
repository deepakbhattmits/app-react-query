/** @format */
import { FC, useState } from 'react';
import Button from './reusable/Button';
import { useExchange } from '../hooks/useExchange';

const Exchange:FC = ():JSX.Element => {
	const [currency, setCurrency] = useState('CAD');
	const { isLoading, isError, data, error } = useExchange(currency);
	if (isLoading)
		return (
			<div className='ui segment'>
				<div className='ui active dimmer'>
					<div className='ui indeterminate text loader'>Preparing Files</div>
				</div>
				<p></p>
			</div>
		);
	if (isError) return <div>Error: {JSON.stringify(error)}</div>;
	return (
		<>
			<div className='ui inverted segment'>
				{['USD', 'CAD', 'EUR'].map((item, index) => {
					return (
						<Button
							key={index}
							className={`ui inverted ${
								item === 'USD'
									? 'olive'
									: item === 'CAD'
									? 'pink'
									: item === 'EUR'
									? 'green'
									: ''
							} button`}
							handleClick={() => setCurrency(item)}>
							{item}
						</Button>
					);
				})}
			</div>
			<div className='main-wrapper'>
				<div className='currency-container'>
					<h1 className='ui header'>Showing currency :{currency}</h1>
					<i
						className={`${currency
							.substring(0, currency.length - 1)
							.toLowerCase()} flag`}></i>
				</div>
				<pre className='pre'>{JSON.stringify(data, null, 2)}</pre>
			</div>
		</>
	);
};
export default Exchange;
