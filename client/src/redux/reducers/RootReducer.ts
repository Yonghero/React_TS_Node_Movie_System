import {combineReducers} from "redux";
import MovieReducer, {IMovieState} from './MovieReducer'

export interface IRootState {
    MovieReducer: IMovieState
}

export default combineReducers({
    MovieReducer
})


