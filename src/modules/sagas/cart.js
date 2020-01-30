import { takeEvery, all, put, call, delay, select } from 'redux-saga/effects';

import {
  ADD_TO_CART,
  GET_CART,
  addToCartFailure,
  addToCartSuccess,
  getCartSuccess,
  getCartFailure,
  DELETE_CART
} from '../actions/cart';
import { addToCart, getCart, deleteCart } from '../api/cart';

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
  try {
    const token = yield select(getToken);
    const result = yield call(getCart, token);
    yield delay(1000);
    yield put(getCartSuccess(result));
  } catch (err) {
    yield put(getCartFailure(err.message));
  }
}

function* handleDeleteCart({ type, payload }) {
  try {
    const token = yield select(getToken);
    const result = yield call(deleteCart, payload, token);
    yield delay(1000);
    yield put(getCartSuccess(result));
  } catch (err) {
    yield put(getCartFailure(err.message));
  }
}

function* watchCartSaga() {
  yield all([
    takeEvery(ADD_TO_CART, handleAddToCart),
    takeEvery(GET_CART, handleGetCart),
    takeEvery(DELETE_CART, handleDeleteCart)
  ]);
}

export default watchCartSaga;
