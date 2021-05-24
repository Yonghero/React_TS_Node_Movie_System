import {ArrayMinSize, IsArray, IsInt, IsNotEmpty, Max, Min, validate} from "class-validator";
import {plainToClass, Type} from "class-transformer";
import "reflect-metadata"
import {BaseEntity} from "./BaseEntity";


export class Movie extends BaseEntity{
    /**
     * @Type 作用: plainObject转换为实体类时 可以在运行过程中进行类型验证
     */

    @IsNotEmpty({message: '电影名称不能为空'})
    @Type(() => String)
    public name: string

    @IsNotEmpty({message: '电影类型不能为空'})
    @ArrayMinSize(1, {message: '电影类型至少包括一项'})
    @IsArray({message: '电影类型必须为数组'})
    @Type(() => String) // 数组的每一项为字符串
    public types: string[]

    @IsNotEmpty({message: '上映地区不为空'})
    @ArrayMinSize(1, {message: '上映地区至少有一个'})
    @Type(() => String)
    public area: string[]


    @IsNotEmpty({message: '电影上映时长'})
    @IsInt({message: '时长必须是整数'})
    @Min(1, {message: '时长最少一分钟'})
    @Max(999999, {message: '电影时长过长'})
    @Type(() => Number)
    public timeLong: number

    @IsNotEmpty({message: '是否即将上映'})
    @Type(() => Boolean)
    public isComing: boolean = false

    @IsNotEmpty({message: "是否热映不可以为空"})
    @Type(() => Boolean)
    public isHot: boolean = false;

    @IsNotEmpty({message: "是否是经典影片不可以为空"})
    @Type(() => Boolean)
    public isClassic: boolean = false;

    // 海报
    @Type(() => String)
    public poster?: string;

    @Type(() => String)
    public description?: string


    public static transform(obj: object): Movie {
        return super.baseTransform(Movie,obj)
    }
}
