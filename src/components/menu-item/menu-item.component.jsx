import React from 'react';
import './menu-item.styles.scss';


const MenuItem = ({ title, imageUrl, size }) => (
	// in style, we are using javascript template strings here
	<div style={{
		backgroundImage: `url(${imageUrl})`

	}} 
		// ES6: string interpolation `${}`
		className={`${size} menu-item`}
	>
				<div className='content'>
					<h1 className='title'>{title}</h1>
					<span className='subtitle'>SHOP NOW</span>
				</div>
	</div>
);

export default MenuItem;
