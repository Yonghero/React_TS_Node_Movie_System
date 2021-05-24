import {Movie} from "../entities/Movie";
import movieModel, {IMovie} from "../db/movieSchema";
import {SearchCondition} from "../entities/SearchCondition";
import {ISearchResult} from "../entities/CommonTypes";

export class MovieService {
    public static async addMovie(movie: object): Promise<IMovie | string[]> {
        // 1. 转换类型
        const movieC = Movie.transform(movie)
        // 2. 数据验证
        const errors = await movieC.validatorThis()
        if (errors.length > 0) {
            return errors
        }

        // 添加movie
        return await movieModel.create(movieC)
    }

    public static async editMovie(id: string, movie: object): Promise<string[]> {
        const movieC = Movie.transform(movie)
        const errors = await movieC.validatorThis(true)
        await movieModel.updateOne({_id: id}, movie)
        return errors
    }


    public static async delMovie(id: string): Promise<any> {
        return movieModel.deleteOne({_id: id});
    }

    public static async findMovieById(id: string): Promise<IMovie | null> {
        return movieModel.findById(id);
    }

    public static async find(condition: SearchCondition): Promise<ISearchResult<IMovie>> {
        const conEntity = SearchCondition.transform(condition)
        const errors = await conEntity.validatorThis()
        if (errors.length > 0) {
            return {
                count: 0,
                data: null,
                errors
            }
        }
        /*
        *   find根据关键字搜索 skip跳过前page页数据 limit返回limit条数据
        * */
        const movies = await movieModel.find({name: {$regex: new RegExp(conEntity.key)}})
            .skip((conEntity.page - 1) * conEntity.limit)
            .limit(conEntity.limit)
        const count = await movieModel.find({name: {$regex: new RegExp(conEntity.key)}})
            .countDocuments()

        return {
            count,
            data: movies,
            errors: []
        }
    }
}
