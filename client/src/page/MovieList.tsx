import React, {useEffect} from 'react'
import MovieTable from "../components/MovieTable";
import {useDispatch, useSelector} from "react-redux";
import {IRootState} from "../redux/reducers/RootReducer";
import MovieActions from '../redux/actions/MovieActions'

const MovieList:React.FC = () => {
    const { movies,condition,total } = useSelector((state:IRootState) => state.MovieReducer)
    const dispatch = useDispatch()
    // 首次加载请求电影数据
    const onLoad = () => {
        dispatch(MovieActions.fetchMovies(condition))
    }
    useEffect(onLoad,[])
    // 分页请求处理
    const pageChange = (page:number, pageSize?:number) => {
        console.log('page',page,'pageSize',pageSize)
        dispatch(MovieActions.fetchMovies({
            page
        }))
    }
    // 表格数据编辑
    const switchChange = (check:boolean,type:string,_id:string) => {
        console.log('check', check,'type',type)
        dispatch(MovieActions.changeSwitch(check,type,_id))
    }
    // 删除电影
    const deleteMovie = async (id:string):Promise<boolean> => {
        await dispatch(MovieActions.deleteMovie(id))
        return true
    }
    // 根据关键词搜索
    const keySearch = async (key:string):Promise<void> => {
        await dispatch(MovieActions.fetchMovies({
            ...condition,
            page:1,
            key,
        }))
    }

    return (
        <>
            <div className="edit_movie" style={{
                transition: 'all .5s'
            }}>
                <MovieTable movies={movies}
                   onLoad={onLoad}
                   total={total}
                   onPageChange={pageChange}
                   onSwitchChange={switchChange}
                   onDelete={deleteMovie}
                   onKeySearch={keySearch}/>
            </div>
        </>
    )
}

export default MovieList
