import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import usersReducer from './reducer';
import thunk from 'redux-thunk';


const reducers = combineReducers({
    usersList: usersReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default createStore(
    reducers,
    composeEnhancers(applyMiddleware(thunk))
);