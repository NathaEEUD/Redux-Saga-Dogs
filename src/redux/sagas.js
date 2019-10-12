import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';

/**
 * Watcher Saga:
 * Watches for actions dispatched to the store
 * Starts Worker Saga
 */
export function* watcherSaga() {
  yield takeLatest('API_CALL_REQUEST', workerSaga);
}

/**
 * Worker Saga:
 * Makes the api call when watcher saga sees the action
 */
function* workerSaga() {
  try {
    const response = yield call(fetchDog);
    const dog = response.data.message;

    // dispatch a success action to the store with the new dog
    yield put({ type: 'API_CALL_SUCCESS', dog });
  } catch (error) {
    // dispatch a failure action to the store with the error
    yield put({ type: 'API_CALL_FAILURE', error });
  }
}

/**
 * Function that returns dog api response
 */
function fetchDog() {
  return axios({
    method: 'get',
    url: 'https://dog.ceo/api/breeds/image/random'
  });
}
