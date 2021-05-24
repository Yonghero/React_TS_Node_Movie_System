import React, {useEffect, useRef, useState} from 'react'
import {Table, Switch, Button, Popconfirm, Input, Space} from 'antd'
import {IMovie} from "../services/MovieService";
import {ColumnsType, FilterConfirmProps} from "antd/lib/table/interface";
import {NavLink} from "react-router-dom";
import {FilterDropdownProps} from "antd/es/table/interface";

export interface IMovieProp {
    movies: IMovie[],
    total: number
}
export interface IMovieEvent {
    onLoad:()=>void,
    onPageChange?: (page: number, pageSize?: number) => void,
    onSwitchChange:(check:boolean,type:string,_id:string) => void,
    onDelete:(id:string) => Promise<boolean>,
    onKeySearch:(key:string) => Promise<void>
}

function SearchOutlined() {
    return null;
}

const MovieTable:React.FC<IMovieProp & IMovieEvent> = (props) => {

    const { movies,total ,onPageChange, onSwitchChange, onDelete, onKeySearch} = props

    useEffect(()=>{
        props.onLoad()
    },[])

    const searchRef = useRef(null)


    // @ts-ignore
    const handleSearch = async (selectedKeys, confirm, dataIndex) => {
        console.log('hd', selectedKeys, dataIndex)
        console.log(searchRef)
        await onKeySearch(selectedKeys[0])
   }

    const handleReset = (clearFilters:()=>void) => {
        clearFilters()
   }

    const getColumnSearchProps = (dataIndex:string) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }:FilterDropdownProps) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={searchRef}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button onClick={() => handleReset(clearFilters!)} size="small" style={{ width: 90 }}>
                        Reset
                    </Button>
                </Space>
            </div>
        ),
    })

    const columns:ColumnsType<IMovie>= [
        {
            title: '电影名称',
            dataIndex: 'name',
            key: 'name',
            render: text => <a>{text}</a>,
            ...getColumnSearchProps('name')
        },
        {
            title: '电影类型',
            dataIndex: 'types',
            key: 'types',
            render: (text:string[]) => {
                return text.join(',') + ' '
            }
        },
        {
            title: '上映区域',
            dataIndex: 'area',
            key: 'area',
            render: (text:string[]) => {
                return text ? text?.join(', ') : '暂无'
            },
        },
        {
            title: '上映时长',
            dataIndex: 'timeLong',
            key: 'timeLong',
            render: text => <a>{text}</a>
        },
        {
            title: '上映时长',
            dataIndex: 'timeLong',
            key: 'timeLong',
            render: text => <a>{text}</a>,
        },
        {
            title: '即将上映',
            dataIndex: 'isComing',
            key: 'isComing',
            render: (text:boolean,record) => {
                return (
                    <Switch checked={text} onChange={(check:boolean)=>{
                        onSwitchChange(check,'isComing',record._id!)
                    }} />
                )
            },
        },
        {
            title: '正在热映',
            dataIndex: 'isHot',
            key: 'isHot',
            render: (text:boolean,record) => {
                return (
                    <Switch checked={text} onChange={(check:boolean)=>{
                        onSwitchChange(check,'isHot',record._id!)
                    }} />
                )
            },
        },
        {
            title: '经典影片',
            dataIndex: 'isClassic',
            key: 'isClassic',
            render: (text:boolean,record) => {
                return (
                    <Switch checked={text} onChange={(check:boolean)=>{
                        onSwitchChange(check,'isClassic',record._id!)
                    }} />
                )
            },
        },
        {
            title: '编辑',
            dataIndex: '_id',
            key: 'id',
            render: (text:string) => {
                return (
                    <>
                        <Button type="primary" size="small" style={{marginRight:"10px"}}>
                            <NavLink to={{
                                pathname:"/editMovie/"+text
                            }}>
                                edit
                            </NavLink>
                        </Button>
                            <Popconfirm
                                title="Are you sure to delete this movie?"
                                onConfirm={()=>{onDelete(text).then()}}
                                okText="Yes"
                                cancelText="No"
                            >
                                <Button type="primary" danger size="small">
                                    delete
                                </Button>
                            </Popconfirm>
                    </>


                )
            },
        },
    ]
    return (
        <Table columns={columns}
               dataSource={movies}
               pagination={{
                   total:total,
                   onChange:onPageChange,
                   showSizeChanger: false
               }}
        />
    )
}

export default MovieTable
