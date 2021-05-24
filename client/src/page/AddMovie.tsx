import React from 'react'
import {IMovie, MovieService} from "../services/MovieService";
import MovieForm from "../components/MovieForm";

const AddMovie:React.FC = () => {
    return (
        <>
            <div className="add_movie" style={{
                transition: 'all .5s'
            }}>
                <MovieForm onSubmit={ async (movie:IMovie) => {
                    const res =  await MovieService.add(movie)
                    console.log(res)
                    if(res.err){
                        return '操作失败'
                    }
                    return ''
                }}/>
            </div>
        </>
    )
}

export default AddMovie
