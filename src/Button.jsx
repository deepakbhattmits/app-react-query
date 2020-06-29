/** @format */

import React from 'react';
const Button = ({ className, handleClick, children }) => {
	return (
		<button className={className} onClick={handleClick}>
			{children}
		</button>
	);
};
export default Button;
