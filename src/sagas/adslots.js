import { call, put } from "redux-saga/effects";
import ApiHelper from '../api';

const API_HOST = 'http://localhost:8080/adslots';

export function* adslotsFetchList(action) {
  try {
    const response = yield call(ApiHelper.get, API_HOST);

    yield put({
      type: 'ADSLOT_LIST_SAVE',
      adslots: response.data.adslots,
    });
  } catch(error) {
    action.callbackError();
  }
}

export function* adslotsAdd(action) {
  try {
    const response = yield call(ApiHelper.post, API_HOST, action.adslot);

    yield put({
      type: 'ADSLOT_ADD_SAVE',
      adslot: response.data.adslot,
    });

    action.callbackSuccess();
  } catch(error) {
    action.callbackError(error);
  }
}

export function* adslotsEdit(action) {
  try {
    const response = yield call(ApiHelper.patch,
      `${API_HOST}/${action.adslot.id}`,
      action.adslot);

    yield put({
      type: 'ADSLOT_EDIT_SAVE',
      adslot: action.adslot,
    });

    action.callbackSuccess();
  } catch (error) {
    action.callbackError();
  }
}
