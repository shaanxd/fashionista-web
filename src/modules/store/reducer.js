import { combineReducers } from 'redux';
import { auth } from '../reducers/auth';
import { cart } from '../reducers/cart';

const rootReducer = combineReducers({
  auth,
  cart
});

export default rootReducer;
