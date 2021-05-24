export interface IResponseError {
    err:string | string[],
    data: null
}

export interface IResponseData<T> {
    err:'',
    data:T
}

export interface IResponsePageData<T> {
    err:'',
    data:T[],
    total: number
}

export interface ISearchCondition<> {
    page?:number,
    limit?:number,
    key?:string
}
