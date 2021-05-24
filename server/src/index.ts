import Mongoose from "mongoose";
import Express from 'express'
import movieRouter from './routes/MovieRoute'
import uploadRouter from './routes/UploadRoute'
import "reflect-metadata"
import path from "path";

Mongoose.connect("mongodb://localhost:27017/moviedb", {
    useNewUrlParser: true
}).then(() => console.log("连接数据库成功"));


const app = Express()
app.listen(2000)
// 访问静态资源
app.use('/upload', Express.static(path.resolve(__dirname,'../public/upload')))
app.use(Express.json()) // 配置中间件，用于解析请求消息体中的json格式数据
app.use('/api/movie',movieRouter)
app.use('/api/upload', uploadRouter)
//
// const movie:object = {
//     area: ['中国'],
//     isClassic: false,
//     isComing: false,œ
//     isHot: false,
//     name: "流浪地球3",
//     timeLong: 0.1,
//     types: ['喜剧']
// }
//
// MovieService.addMovie(movie).then(m => {
//     console.log(m)
// })
// MovieService.editMovie('60960fbe79394111fa985f61',movie).then( m => {
//     console.log(m)
// })
// MovieService.delMovie('60960fbe79394111fa985f61').then(m => {
//     console.log(m)
// })
// const condition:any = {
//     page:2,
//     limit:10
// }
// MovieService.find(condition).then((res) => {
//     console.log(res.data.length)
// })
