import {IMovie, MovieService} from "../../services/MovieService";
import {IAction} from "./ActionTypes";
import {ISearchCondition} from "../../services/CommonTypes";
import {ThunkAction} from "redux-thunk";
import {IRootState} from "../reducers/RootReducer";


export type SaveMoviesAction = IAction<'movie_save', {
    movies:IMovie[],
    total: number
}>

function saveMoviesAction(movies:IMovie[],total: number):SaveMoviesAction{
    return {
        type:'movie_save',
        payload: {
            movies,
            total
        }
    }
}

export type SetMovieLoadingAction = IAction<'movie_loading', boolean>

function setMovieLoadingAction(loading:boolean):SetMovieLoadingAction{
    return {
        type: 'movie_loading',
        payload: loading
    }
}


export type SetConditionAction = IAction<'movie_condition', ISearchCondition>
function setConditionAction(condition:ISearchCondition):SetConditionAction{
    return {
        type: 'movie_condition',
        payload: condition
    }
}

export type DeleteAction = IAction<'movie_delete', string>
function deleteAction(id:string) : DeleteAction{
    return {
        type: 'movie_delete',
        payload:id
    }
}

export type SetLoadingAction = IAction<'movie_loading', boolean>

function setLoadingAction(loading:boolean):SetLoadingAction {
    return{
        type:'movie_loading',
        payload:loading
    }
}


function fetchMovies(condition:ISearchCondition) :
    ThunkAction<Promise<void>, IRootState, any, UniteAction>
{
    return async (dispatch, getState) => {
        // 1. 设置加载状态
        dispatch(setLoadingAction(true))
        // 2.更新查询条件
        dispatch(setConditionAction(condition))
        // 3. 获取更新后的条件
        const newCondition = getState().MovieReducer.condition
        const resp = await MovieService.getMovies(newCondition)
        dispatch(saveMoviesAction(resp.data,resp.total))
        dispatch(setLoadingAction(false))
    }
}


function deleteMovie(id:string):any{
    return async (dispatch: any) => {
        dispatch(setLoadingAction(true))
        await MovieService.delete(id)
        dispatch(deleteAction(id))
        dispatch(setLoadingAction(false))
    }
}
export type ChangeSwitchAction = IAction<'movie_switch', {
    check:boolean,
    type:string,
    _id:string
}>
function changeSwitchAction(check:boolean,type:string,_id:string):ChangeSwitchAction{
    return{
        type:'movie_switch',
        payload:{
            check,
            type,
            _id
        }
    }
}
function changeSwitch(check:boolean,type:string,_id:string)
    :ThunkAction<Promise<void>, IRootState, any, UniteAction>
{
    return async dispatch => {
        await MovieService.edit(_id,{
            [type]:check
        })
        dispatch(changeSwitchAction(check,type,_id))
    }
}

export type UniteAction = DeleteAction | SetConditionAction | SaveMoviesAction | SetLoadingAction | ChangeSwitchAction


export default {
    setConditionAction,
    setMovieLoadingAction,
    saveMoviesAction,
    deleteAction,
    setLoadingAction,
    fetchMovies,
    deleteMovie,
    changeSwitch
}
