/**
 * 条件搜索实体类
 */
import {BaseEntity} from "./BaseEntity";
import {IsInt, Min} from "class-validator";
import {Type} from "class-transformer";

export class SearchCondition extends BaseEntity {
    /**
     * 页码
     */
    @IsInt({message: '页码必须为则还能整数'})
    @Min(1, {message: '页码最小为第一页'})
    @Type(() => Number)
    public page?: number = 1

    /**
     * 页容量
     */
    @IsInt({message: '页容量必须为则还能整数'})
    @Min(1, {message: '页容量最小为第一页'})
    @Type(() => Number)
    public limit?: number = 10
    /**
     * 关键字查询
     */
    @Type(() => String)
    public key?: string

    public static transform(obj: object): SearchCondition {
        return super.baseTransform(SearchCondition, obj)
    }


}
