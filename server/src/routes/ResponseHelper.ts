import {Response} from "express";
import {ISearchResult} from "../entities/CommonTypes";
/**
 * 响应：服务器的接口的响应格式，往往是一种标准格式
 */
export class ResponseHelper{

    /**
     * 发送错误响应
     * @param error 错误消息
     * @param res  响应对象
     */
    public static sendError(error:string| string[],res:Response):void{
        let err
        if(Array.isArray(error)){
            err = error.join(';')
        }else{
            err = error
        }
        res.send({
            err,
            data: null
        })
    }

    /**
     * 响应一个普通数据
     * @param data
     * @param res
     */
    public static sendData(data:any,res:Response):void{
        res.send({
            err:'',
            data
        })
    }

    /**
     * 响应分页数据
     * @param result 满足搜索条件接口的结果
     * @param res
     */
    public static sendDataByPage<T>(result:ISearchResult<T>,res:Response):void{
        if(result.errors.length > 0){
            this.sendError(result.errors,res)
            return
        }
        res.send({
            err:'',
            data:result.data,
            total: result.count
        })
    }
}
