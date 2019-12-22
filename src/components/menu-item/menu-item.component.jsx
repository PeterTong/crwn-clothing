import React from 'react';
// withRoute is higher order component, it is a function that takes 
// a component as an argument and which turns you a modified component, return to you a new component
import { withRouter } from 'react-router-dom';

import './menu-item.styles.scss';



const MenuItem = ({ title, imageUrl, size, history, linkUrl, match }) => (
	// in style, we are using javascript template strings here
	// ES6: string interpolation `${}`
	<div 
		className={`${size} menu-item`}
		onClick={() => history.push(`${match.url}${linkUrl}`)}
	>
		<div className='background-image' style={{
		backgroundImage: `url(${imageUrl})`
 		}}
		>

		</div>
				<div className='content'>
					<h1 className='title'>{title.toUpperCase()}</h1>
					<span className='subtitle'>SHOP NOW</span>
				</div>
	</div>
);

export default withRouter(MenuItem);
