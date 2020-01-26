import { all } from 'redux-saga/effects';

import authSaga from '../sagas/auth';
import cartSaga from '../sagas/cart';

function* rootSaga() {
  yield all([authSaga(), cartSaga()]);
}

export default rootSaga;
