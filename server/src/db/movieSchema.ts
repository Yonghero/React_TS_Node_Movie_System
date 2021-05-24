import Mongoose from 'mongoose'
import { Movie } from '../entities/Movie'


// 定义此接口的原因为 ts和Mongoose结合不够友好 需要给定此类型检查 才能获取schema中的属性
export interface IMovie extends Movie,Mongoose.Document{}

const movieSchema = new Mongoose.Schema<IMovie>({
    name:String,
    types: [String],
    areas: [String],
    timeLong: Number,
    isHot: Boolean,
    isComing: Boolean,
    isClassic: Boolean,
    description: String,
    poster: String
},{
    versionKey:false
})

export default Mongoose.model<IMovie>('movie',movieSchema)
