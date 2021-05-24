export interface IAction<T extends string,p> {
    type: T,
    payload:p
}
