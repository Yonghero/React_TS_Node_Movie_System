import React, {useEffect} from 'react'
import {Form, Input, Button, Checkbox, InputNumber, Switch, message} from 'antd';
import ImgUpload from "./ImageUpload";
import {IMovie} from "../services/MovieService";
import {useHistory, useParams} from "react-router";



export type CheckBoxType = {label:string,value:string}
export interface IMovieFormProps {
    movie?:IMovie,
    onSubmit:(movie:IMovie) => Promise<string>
}
const layout = {
    // labelCol: {
    //     span: 2,
    //     offset: 0
    // },
    // wrapperCol: {
    //     span: 19,
    //     offset: 1
    // }
}

const movieTypes:CheckBoxType[] = [
    {label:'喜剧', value: '喜剧'},
    {label:'科幻', value: '科幻'},
    {label:'悬疑', value: '悬疑'},
    {label:'爱情', value: '爱情'},
    {label:'剧情', value: '剧情'},
    {label:'犯罪', value: '犯罪'}
]
const movieArea:CheckBoxType[] = [
    {label:'中国', value: '中国'},
    {label:'美国', value: '美国'},
    {label:'韩国', value: '韩国'},
    {label:'日本', value: '日本'},
    {label:'英国', value: '英国'}
]
const MovieForm : React.FC<IMovieFormProps> = (props) =>{

    const {movie, onSubmit} = props

    const [form] = Form.useForm()
    const  history = useHistory()

    useEffect(()=>{
        console.log(movie)
       form.setFieldsValue(movie)
    },[movie])

    const submit = () => {
        form.validateFields().then(values => {
            onSubmit(values as IMovie).then(mes => {
                if(!mes){
                    message.success('添加成功！',1).then(()=>{
                        history.push('/movie')
                    })
                }else {
                    message.error(mes).then()
                }
            })

        }).catch(err => {
            console.log(err)
        })
    }



    return (
        <Form
            {...layout}
            form={form}
            name="basic"
            initialValues={movie}
        >
            <Form.Item
                label="电影名称"
                name="name"
                rules={[{ required: true, message: '请输入电影' }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="电影时长"
                name="timeLong"
                rules={[{ required: true, message: '请输入电影时长' }]}
            >
                <InputNumber  min={1} max={9999}/>
            </Form.Item>

            <Form.Item
                label="即将上映"
                name="isComing"
                valuePropName="checked"
            >
                <Switch />
            </Form.Item>


            <Form.Item
                label="正在热映"
                name="isHot"
                valuePropName="checked"

            >
                <Switch/>
            </Form.Item>

            <Form.Item
                label="海报"
                name="poster"
            >
              <ImgUpload/>
            </Form.Item>


            <Form.Item
                label="电影类型"
                name="types"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Checkbox.Group  options={movieTypes} >
                </Checkbox.Group>
            </Form.Item>
            <Form.Item
                label="上映区域"
                name="areas"
                rules={[{ required: true, message: 'Please input your password!' }]}
            >
                <Checkbox.Group  options={movieArea}>
                </Checkbox.Group>
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" onClick={submit}>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
}






export default MovieForm
