import Express from "express";
import multer from "multer";
import path from "path";
import {ResponseHelper} from "./ResponseHelper";

const router = Express.Router()


const storage = multer.diskStorage({
    destination: path.resolve(__dirname,'../../public/upload'),
    filename: function (req, file, cb) {
        const filename = new Date().getTime() + path.extname(file.originalname)
        cb(null, filename)
    }
})


// 允许通过的文件名
const allowExtname = ['.jpg','.png','.gif','.giff','.bmp']
const upload = multer(
    {
        storage:storage,
        limits: {
            fileSize: 1024 * 1024 * 1024
        },
        fileFilter(req,file,cb) {
            if(allowExtname.includes(path.extname(file.originalname))){
                cb(null, true)
            }else {
                cb(new Error('文件不符合要求'))
            }
        }
    }).single('myFile')

router.post('/',((req, res) => {
    upload(req, res, function (err) {
        if (err) {
            // 发生错误
            ResponseHelper.sendError(err,res)
        }else {
            const url = `/upload/${req.file.filename}`
            ResponseHelper.sendData(url, res)
        }
        // 一切都好
    })

}))


export default  router
