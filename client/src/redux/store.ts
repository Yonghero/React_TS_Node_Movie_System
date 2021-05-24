import {applyMiddleware, combineReducers, createStore} from "redux";
import logger from 'redux-logger'
import ReduxThunk, {ThunkMiddleware} from 'redux-thunk'
import RootReducer from './reducers/RootReducer'


const store = createStore(
    RootReducer,
    applyMiddleware(ReduxThunk,logger)
)


export default store
