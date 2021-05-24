/**
 * 搜索电影需要的条件
 * 经过类型演算得出新的类型
 */
import {ISearchCondition} from "../../services/CommonTypes";
import {IMovie} from "../../services/MovieService";
import {
    ChangeSwitchAction,
    DeleteAction,
    SaveMoviesAction,
    SetConditionAction,
    SetMovieLoadingAction,
    UniteAction
} from "../actions/MovieActions";

export type MovieSearchCondition = Required<ISearchCondition>

/**
 * 电影需要的数据
 */
export interface IMovieState {
    movies: IMovie[],
    total: number,
    isLoading: boolean,
    condition: MovieSearchCondition
}

const defaultState: IMovieState = {
    condition: {
        key:'',
        limit:10,
        page: 1
    },
    isLoading: false,
    total: 0,
    movies: []
}


export type MovieReducer<S,A> = (state:S,action:A) => S

const saveMovies: MovieReducer<IMovieState,SaveMoviesAction> =  (state,action)=> {
    return {
        ...state,
        movies: action.payload.movies,
        total: action.payload.total
    }
}
const setCondition:MovieReducer<IMovieState, SetConditionAction> = (state,action) => {
    return {
        ...state,
        condition: {
            ...state.condition,
            ...action.payload
        }
    }
}
const deleteMovie: MovieReducer<IMovieState, DeleteAction> = (state,action) => {
    return {
        ...state,
        movies: state.movies.filter(m => m._id !== action.payload),
        total: state.total - 1
    }
}

const setLoading:MovieReducer<IMovieState,SetMovieLoadingAction> = (state, action ) => {
    return {
        ...state,
        isLoading: action.payload
    }
}
const checkSwitch:MovieReducer<IMovieState, ChangeSwitchAction> = (state,action) => {
    const {_id,type,check} = action.payload
    const movie = state.movies.find(movie => movie._id === _id)
    if (!movie){
        return state
    }
    const tempM = [...state.movies].map(movie => {
        if(movie._id === _id){
            return {
                ...movie,
                [type]:check
            }
        }else {
            return movie
        }
    })
    return {
        ...state,
        movies:tempM
    }


}

export default function reducer(state:IMovieState = defaultState, action:UniteAction){
    switch (action.type) {
        case "movie_condition":
            return setCondition(state,action)
        case "movie_delete":
            return  deleteMovie(state, action)
        case "movie_save":
            return saveMovies(state,action)
        case "movie_loading":
            return setLoading(state, action)
        case "movie_switch":
            return checkSwitch(state,action)
        default:
            return state
    }
}
