import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
// storage mean we get the actual local storage object on our window browser
import storage from 'redux-persist/lib/storage';


import userReducer  from './user/user.reducer';
import cartReducer from './cart/cart.reducer';

const persistConfig = {
	key: 'root',
	storage,
	// this is string array of any of the reducer that we want to store
	//'cart' is key 
	whitelist: ['cart']
}

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer
});

export default persistReducer(persistConfig, rootReducer);