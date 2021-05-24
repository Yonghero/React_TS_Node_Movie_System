import React from 'react'
import {Upload} from "antd";
import {UploadFile} from "antd/lib/upload/interface";
import { PlusOutlined } from '@ant-design/icons'
import {IResponseData, IResponseError} from "../services/CommonTypes";

export interface IImgProps {
    value?:string,
    onChange?:(data:string)=>void
}

const ImgUpload:React.FC<IImgProps> = (props) => {

    const { value, onChange} = props

    const getFileList = (): Array<UploadFile> =>{
        if(!value) return []
        return [
            {
                uid:value,
                name:value,
                url:value
            }
        ]
    }


    const customRequest = async (e:any) => {
        const formData = new FormData()
        formData.append(e.filename, e.file)
        const request = new Request(e.action ,{
            method: 'POST',
            body: formData
        })

       const res:IResponseData<string> | IResponseError = await fetch(request).then(res => res.json())
        if(res.data && onChange){
            onChange(res.data)
        }


    }

    return (
        <>
            <Upload
                action='/api/upload'
                accept=".jpg,.png,.gif"
                listType="picture-card"
                name='myFile'
                fileList={getFileList()}
                customRequest={customRequest}
            >
                {
                 value ?
                    null : <div>
                         <PlusOutlined />
                         <div style={{ marginTop: 8 }}>Upload</div>
                     </div>
                }
            </Upload>
        </>
    )
}

export default ImgUpload
