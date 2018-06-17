import { takeLatest } from "redux-saga";
import { fork } from "redux-saga/effects";
import { adslotsFetchList, adslotsAdd, adslotsEdit } from "./adslots";

export function* sagas() {
  yield [
    fork(takeLatest, 'ADSLOT_FETCH_LIST', adslotsFetchList),
    fork(takeLatest, 'ADSLOT_ADD_START', adslotsAdd),
    fork(takeLatest, 'ADSLOT_EDIT_START', adslotsEdit),
  ];
}
