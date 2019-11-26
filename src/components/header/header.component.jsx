import React from 'react';
import { Link } from 'react-router-dom';

// connect is higher component that lets us modify our component to have access to things related to redux
import { connect } from 'react-redux';
 
import { auth } from '../../firebase/firebase.utils';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';


// This is a a new special syntax when importing SVG in React. The ReactComponent import name is special and tells Create React App that 
// you want a React component that renders an SVG, rather than its filename. https://create-react-app.dev/docs/adding-images-fonts-and-files/

import { ReactComponent as Logo } from '../../assets/crown.svg';

import './header.styles.scss';

const Header = ({ currentUser, hidden }) => (
	<div className='header'>
		<Link className='logo-container' to='/'>
			<Logo className='logo' /> 
		</Link>
		<div className='options'>
			<Link className='option' to='/shop'>
				SHOP
			</Link>
			<Link className='option' to='/shop'>
				CONTACT
			</Link>
			{
				currentUser ? 
				<div className='option' onClick={() => auth.signOut()}>SIGN OUT</div>
				:
				<Link className='option' to='./signin'>
					SIGN IN
				</Link>
			}
			<CartIcon/>
		</div>
		{
			hidden ? null : <CartDropdown/>
		}
		
	</div>
);

// https://react-redux.js.org/api/connect
// first argument of connect is mapStateToProps function 
// if it is specified, the new wrapper component will subscribe to Redux store updates. 
// This means that any time the store is updated, mapStateToProps will be called.

// destructure nest value 
const mapStateToProps = ({user: { currentUser}, cart: { hidden }}) => ({
	// state is root reducer
	currentUser,
	hidden
}); 
export default connect(mapStateToProps)(Header);