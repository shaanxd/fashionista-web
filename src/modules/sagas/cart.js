import { takeEvery, all, put, call, delay, select } from 'redux-saga/effects';

import {
  ADD_TO_CART,
  GET_CART,
  addToCartFailure,
  addToCartSuccess
} from '../actions/cart';
import { addToCart } from '../api/cart';

const getToken = state => state.auth.auth.token;

function* handleAddToCart({ type, payload }) {
  try {
    const token = yield select(getToken);
    const result = yield call(addToCart, payload, token);
    yield delay(1000);
    yield put(addToCartSuccess(result));
  } catch (err) {
    yield put(addToCartFailure(err.message));
  }
}

function* handleGetCart({ type }) {
  yield console.log('GET CART');
}

function* watchCartSaga() {
  yield all([
    takeEvery(ADD_TO_CART, handleAddToCart),
    takeEvery(GET_CART, handleGetCart)
  ]);
}

export default watchCartSaga;
