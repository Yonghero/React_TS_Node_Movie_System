import React, {useEffect, useState} from "react";
import styled from 'styled-components'
import { Layout,Menu } from 'antd'
import { CSSTransition,TransitionGroup } from 'react-transition-group'
import {NavLink, Route, Switch, useLocation} from 'react-router-dom'
import Home from "../page/Home";
import AddMovie from "../page/AddMovie";
import EditMovie from "../page/EditMovie";
import MovieList from "../page/MovieList";
import '../assets/style.css'
const { Header, Footer, Sider, Content } = Layout;

const AnimatedSwitch = (props:any) => {
    const { children } = props
    return (
        <Route
            render={({ location }) => (
                <TransitionGroup>
                    <CSSTransition
                        key={location.key}
                        classNames={'fade'}
                        timeout={props.duration || 300}
                    >
                        <Switch location={location}>{children}</Switch>
                    </CSSTransition>
                </TransitionGroup>
            )}
        />
    )
}


const routerKeyMap :any = {
    '/':'0',
    '/movie':'1',
    '/addMovie':'2'
}

const _Layout:React.FC = () => {

    const [key, setKey] = useState('0')
    const {pathname} = useLocation()
    useEffect(()=>{
        setKey(routerKeyMap[pathname])
    },[pathname])

    return (
        <Container>
            <Layout>
                <Header>
                    <NavLink to="/">
                        Yonghero's MovieSystem
                    </NavLink>
                </Header>
                <Layout>
                    <Sider>
                        <Menu
                            mode="vertical"
                            theme="dark"
                            selectedKeys={[key]}
                        >
                            <Menu.Item key="0">
                                <NavLink to="/">
                                   首页
                                </NavLink>
                            </Menu.Item>
                            <Menu.Item key="1">
                                <NavLink to="/movie">
                                    电影列表
                                </NavLink>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <NavLink to="/addMovie">
                                   新增电影
                                </NavLink>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Content>
                        <AnimatedSwitch>
                                   <Route exact path="/" component={Home} />
                                   <Route path="/movie" component={MovieList} />
                                   <Route path="/addMovie" component={AddMovie}/>
                                   <Route path="/editMovie/:id" component={EditMovie}/>
                        </AnimatedSwitch>
                    </Content>
                </Layout>
                <Footer>Footer</Footer>
            </Layout>
        </Container>
    )
}

export default _Layout


const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  
  main{
    padding: 1em;
  }
`
