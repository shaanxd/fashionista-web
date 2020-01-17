import { takeEvery, all, delay, put } from 'redux-saga/effects';
import Moment from 'moment';

import {
  AUTH_SUCCESS,
  CHECK_AUTH_TIMEOUT,
  checkAuthTimeout
} from '../actions/auth';
import { set } from '../store/storage';

function* handleAuthSuccess({ type, payload }) {
  const expiresIn = payload.expirationInSeconds;
  const expirationDate = Moment()
    .add(expiresIn, 's')
    .format();
  yield set({ ...payload, expirationDate });
  yield put(checkAuthTimeout(expiresIn));
}

function* handleCheckAuthTimeout({ type, payload }) {
  yield delay(payload * 1000);
  yield console.log('Token has expired');
}

function* watchAuthSaga() {
  yield all([
    takeEvery(AUTH_SUCCESS, handleAuthSuccess),
    takeEvery(CHECK_AUTH_TIMEOUT, handleCheckAuthTimeout)
  ]);
}

export default watchAuthSaga;
