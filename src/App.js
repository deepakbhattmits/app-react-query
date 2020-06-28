/** @format */

import React, { useState } from 'react';
import { ReactQueryDevtools } from 'react-query-devtools';
import { useQuery } from 'react-query';
import Button from './Button';
// import logo from './logo.svg';
import './App.css';
const fetchExchange = async (currency) => {
	const response = await fetch(
		`https://api.ratesapi.io/api/latest?base=${currency}`
	);
	const data = await response.json();
	return data;
};
const Exchange = () => {
	const [currency, setCurrency] = useState('CAD');
	const { status, data, error } = useQuery(currency, fetchExchange, {
		refetchOnWindowFocus: false,
	});
	if (status === 'loading')
		return (
			<div className='ui segment'>
				<div className='ui active dimmer'>
					<div className='ui indeterminate text loader'>Preparing Files</div>
				</div>
				<p></p>
			</div>
		);
	if (status === 'error') return <div>Error: {JSON.stringify(error)}</div>;
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
const App = () => {
	return (
		// <div className='App'>
		// 	<header className='App-header'>
		// 		<img src={logo} className='App-logo' alt='logo' />
		// 		<p>
		// 			Edit <code>src/App.js</code> and save to reload.
		// 		</p>
		// 		<a
		// 			className='App-link'
		// 			href='https://reactjs.org'
		// 			target='_blank'
		// 			rel='noopener noreferrer'>
		// 			Learn React
		// 		</a>
		// 	</header>
		// </div>
		<div className='App'>
			<Exchange />
			<ReactQueryDevtools initialIsOpen={false} />
		</div>
	);
};

export default App;
