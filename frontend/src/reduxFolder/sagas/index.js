import { takeLatest, put, spawn, debounce, call } from 'redux-saga/effects';
import { searchSkillsError, searchSkillsRequest, searchSkillsSuccess } from '../actions/actions';
import { searchSkills } from '../api';

// changeSearch

function filterChangeSearchAction({type, payload}) {
    return type === 'CHANGE_SEARCH_FIELD';
}

function* handleChangeSearchSaga(action) {
    yield put(searchSkillsRequest(action.payload.search))
}

function* watchChangeSearchSaga() {
    yield debounce(100, filterChangeSearchAction, handleChangeSearchSaga);
}

// searchRequest

function* handleSearchSkillsSaga(action) {
    try {

        if (action.payload.search.trim() === '') {
            return;
        }
        const data = yield call(searchSkills, action.payload.search);
        yield put(searchSkillsSuccess(data));
    } catch (e) {
        yield put(searchSkillsError(e.message));
    }
}

function* watchSearchSkillsSaga() {
    yield takeLatest('SEARCH_SKILLS_REQUEST', handleSearchSkillsSaga);
}

export default function* saga() {
    yield spawn(watchChangeSearchSaga);
    yield spawn(watchSearchSkillsSaga);
}
