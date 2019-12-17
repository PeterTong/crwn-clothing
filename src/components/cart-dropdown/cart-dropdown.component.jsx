import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';
import { selectCartItems } from '../../redux/cart/cart.selectors';
import './cart-dropdown.styles.scss';

const CartDropdown = ({ cartItems, history }) => (
  <div className='cart-dropdown'>
    <div className='cart-items'>
      {
				cartItems.length ? (
					cartItems.map(cartItem => (
					// how we are reusing components here using map fnuction 
        	<CartItem key={cartItem.id} item={cartItem} />
      		))
				) : (
					<span className='empty-message'>Your cart is empty</span>
				)
				
			}
    </div>
    <CustomButton onClick={() => history.push('/checkout')}>
		GO TO CHECKOUT
		</CustomButton>
  </div>
);

const mapStateToProps = createStructuredSelector({
	// this will make sure that our cart dropdown component 
	// is not rerenderd when ever the state changes that's unrelated to the card items, this can improve performance 
  cartItems: selectCartItems
});

export default withRouter(connect(mapStateToProps)(CartDropdown));