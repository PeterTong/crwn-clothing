import { createStore, applyMiddleware} from 'redux';
//this does is it allows our browser to actually cache our store now depending on certain 
//configuration option we're going to set
import { persistStore } from 'redux-persist';

import logger from 'redux-logger';

import rootReducer from './root-reducer';

const middlewares = [];

if (process.env.NODE_ENV === 'development'){
	middlewares.push(logger);
}

// applyMiddleware is return object 
// in the applyMiddleware will spread in all of the methods or all of the values in this array 
// into this function(applyMiddleware) 
export const store = createStore(rootReducer, applyMiddleware(...middlewares));

// we're creating this new persisted version of our store right.
export const persistor = persistStore(store);

export default { store, persistStore };
