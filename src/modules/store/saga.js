import { all } from 'redux-saga/effects';

import authSaga from '../sagas/auth';

function* rootSaga() {
  yield all([authSaga()]);
}

export default rootSaga;
