import { createSelector } from 'reselect';
// two types of selector, the first type is input selector that doesn't use createSelector 
// the second type is output selector that uses input selectors and createSelector to build themselves.

// input selector
const selectCart = state => state.cart;


export const selectCartItems = createSelector(
	[selectCart],
	(cart) => cart.cartItems
)

export const selectCartHidden = createSelector(
	[selectCart],
	(cart) => cart.hidden
)

export const selectCartItemsCount = createSelector(
  [selectCartItems],
  cartItems =>
    cartItems.reduce(
      (accumalatedQuantity, cartItem) =>
        accumalatedQuantity + cartItem.quantity,
      0
    )
);

export const selectCartTotal = createSelector(
  [selectCartItems],
  cartItems =>
    cartItems.reduce(
      (accumalatedQuantity, cartItem) =>
        accumalatedQuantity + cartItem.quantity * cartItem.price,
      0
    )
);
