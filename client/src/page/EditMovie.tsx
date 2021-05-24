import React, {useEffect, useState} from 'react'
import { useParams} from "react-router";
import MovieForm from "../components/MovieForm";
import {IMovie, MovieService} from "../services/MovieService";
export interface IParams {
    id:string
}


const EditMovie:React.FC<any> = (props) => {
    const { id } = useParams<IParams>()
    const [movie, setMovie] = useState({} as IMovie)

    useEffect(()=> {
        MovieService.getMovieById(id).then(res => {
            if(!res.err) {
                setMovie(res.data as IMovie)
            }
        })
    },[id])

    return (
        <div style={{
            transition: 'all .5s'
        }}>
            <MovieForm
                movie={movie}
                onSubmit={ async (movie:IMovie)=>{
                   const res = await MovieService.edit(id,movie)
                    if(res.err){
                        return '编辑失败！'
                    }
                    return ''
                }}/>
        </div>
    )
}

export default EditMovie
