import axios from "axios";
import {IResponseData, IResponseError, IResponsePageData, ISearchCondition} from "./CommonTypes";

export interface IMovie {
    _id?:string,
    name:string,
    types:string[],
    area: string[],
    timeLong:number,
    isComing:boolean,
    isHot:boolean,
    isClassic:boolean,
    poster?:string,
    description?:string,
    key?:1
}

export class MovieService {

    static async add (movie:IMovie):Promise<IResponseData<IMovie> | IResponseError> {
        const {data} =  await axios.post('/api/movie/',movie)
        return data
    }

    static async edit(id:string,movie:Partial<IMovie>):Promise<IResponseData<IMovie> | IResponseError> {
        const { data } = await axios.put('/api/movie/' + id, movie)
        return data
    }

    static async delete(id:string):Promise<IResponseData<true> | IResponseError> {
         const {data} =   await axios.delete('/api/movie/'+ id)
         return data
    }

    static async getMovieById(id:string):Promise<IResponseData<IMovie | null>>{
        const {data} =  await axios.get('/api/movie/' + id)
        return  data
    }

    static async getMovies(condition: ISearchCondition):Promise<IResponsePageData<IMovie>>{
      const { data } = await axios.get('/api/movie' , {
            params: condition
        })
        return data
    }
}
