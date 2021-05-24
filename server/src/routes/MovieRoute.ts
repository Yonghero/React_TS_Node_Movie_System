import Express from 'express'
import {MovieService} from "../services/movieService";
import {ResponseHelper} from "./ResponseHelper";

const router = Express.Router()

// http://localhost:2000/api/movie/id
router.get('/:id',  async (req, res) => {
    try{
        const id = req.params.id
        const data = await MovieService.findMovieById(id)
        ResponseHelper.sendData(data,res)
    }catch (e){
        ResponseHelper.sendData(null,res)
    }
})

router.post('/',async (req,res)=>{
    console.log(req.body)
    const data = await MovieService.addMovie(req.body)
    ResponseHelper.sendData(data,res)
})

router.delete('/:id',async (req,res)=>{
    try {
        const id = req.params.id
        const data = await MovieService.delMovie(id)
        ResponseHelper.sendData(true,res)
    }catch (e){
        ResponseHelper.sendError('id错误', res)
    }
})

router.put('/:id',async (req,res) => {
   try{
       const result = await MovieService.editMovie(req.params.id,req.body)
       if(result.length > 0) {
           ResponseHelper.sendError(result, res)
       }else {
           ResponseHelper.sendData(true,res)
       }
   }catch (e){
       ResponseHelper.sendError('id错误', res)
   }
})

router.get('/',async (req,res) => {
    const condition = req.query
    const result = await MovieService.find(condition as any)
    ResponseHelper.sendDataByPage(result, res)
})
export default router
