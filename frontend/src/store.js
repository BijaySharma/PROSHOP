import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productReducer, productDetailsReducer } from './reducers/productsReducers';

const reducer = combineReducers({
    productList: productReducer,
    productDetails: productDetailsReducer
});

const initialState = {};

const middlewares = [thunk];

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middlewares)));

export default store;