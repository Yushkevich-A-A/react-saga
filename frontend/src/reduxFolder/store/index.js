import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import createSagaMiddleware from 'redux-saga';
import serviceSearchReducer from "../reducers/skillsReducer/skillsReducer";
import saga from '../sagas';

const reducer = combineReducers({
    searchReducer: serviceSearchReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const sagaMiddleware = createSagaMiddleware();

const store = createStore( reducer, composeEnhancers(
    applyMiddleware(sagaMiddleware)
));

sagaMiddleware.run(saga);

export default store;