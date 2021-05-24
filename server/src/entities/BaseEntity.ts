import {plainToClass} from "class-transformer";
import {ClassConstructor} from "class-transformer/types/interfaces";
import {validate} from "class-validator";

/**
 * 基础实体类
 * 提出一些相同的功能
 */
export abstract class BaseEntity {
    /**
     * 平面对象转换为实体类
     * @param cls 构造函数
     * @param obj 平面对象
     */
    // ClassConstructor<T> 代表类型检查为构造函数
    public static baseTransform<T>(cls: ClassConstructor<T>, obj: object): T {
        if (obj instanceof cls) {
            return obj
        }
       return  plainToClass(cls,obj)
    }

    /**
     * 数据验证
     * @param skipMissingProperties 是否跳过检查未传递的参数
     */
    public async validatorThis(skipMissingProperties = false): Promise<string[]> {
        const errors = await validate(this,{
            skipMissingProperties:skipMissingProperties
        })
        // [{constraints:{'错误信息'}},{constraints:{'错误信息'},{constraints:{'错误信息'}]
        const temp = errors.map(e => Object.values(e.constraints))
        const result: string[] = []
        // ['错误信息','错误信息','错误信息''错误信息']
        temp.forEach(t => result.push(...t))
        return result
    }
}
