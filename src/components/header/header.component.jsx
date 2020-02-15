import React from 'react';
// import { Link } from 'react-router-dom';

// connect is higher component that lets us modify our component to have access to things related to redux
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { auth } from '../../firebase/firebase.utils';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { selectCartHidden} from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selectors';


// This is a a new special syntax when importing SVG in React. The ReactComponent import name is special and tells Create React App that 
// you want a React component that renders an SVG, rather than its filename. https://create-react-app.dev/docs/adding-images-fonts-and-files/

import { ReactComponent as Logo } from '../../assets/crown.svg';

import { 
	HeaderContainer, 
	LogoContainer, 
	OptionsContainer, 
	OptionLink 
} from './header.styles';

const Header = ({ currentUser, hidden }) => (
	<HeaderContainer className='header'>
		<LogoContainer to='/'>
			<Logo className='logo' /> 
		</LogoContainer>
		<OptionsContainer>
			<OptionLink to='/shop'>
				SHOP
			</OptionLink>
			<OptionLink to='/shop'>
				CONTACT
			</OptionLink>
			{
				currentUser ? 
				<OptionLink as='div' onClick={() => auth.signOut()}>SIGN OUT</OptionLink>
				:
				<OptionLink to='./signin'>
					SIGN IN
				</OptionLink>
			}
			<CartIcon/>
		</OptionsContainer>
		{
			hidden ? null : <CartDropdown/>
		}
		
	</HeaderContainer>
);

// https://react-redux.js.org/api/connect
// first argument of connect is mapStateToProps function 
// if it is specified, the new wrapper component will subscribe to Redux store updates. 
// This means that any time the store is updated, mapStateToProps will be called.

// destructure nest value 
const mapStateToProps = createStructuredSelector({
	// state is root reducer
	currentUser : selectCurrentUser,
	hidden: selectCartHidden
}); 
export default connect(mapStateToProps)(Header);