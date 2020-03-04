import React,{useState} from 'react'
import {Spin, Card, Input, Icon, Button,message} from 'antd'
import 'antd/dist/antd.css'
import '../static/css/login.css'
import {checkLogin} from '../config/api'

export default function Login(props) {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const login = async () => {
        setIsLoading(true)
        if(!userName) {
            setTimeout(() => {
                setIsLoading(false)
            },500)
            message.error('用户名不能为空')
            return false
        } 
        if(!password) {
            setTimeout(() => {
                setIsLoading(false)
            },500)
            message.error('密码不能为空')
            return false
        }
        var data = {
            userName,
            password
        }
        const result = await checkLogin(data)
        setIsLoading(false)
        if(result.data.error === 0) {
            localStorage.setItem('openId', result.data.openId)
            props.history.push('/index')
        } else {
            message.error('用户名或密码错误')
        }
    }
    return (
        <div className='login-div' >
            <Spin tip='Loading...' spinning={isLoading}>
                <Card title='CoderZX blog login' style={{ width: 400 }} bordered={true} >
                    <Input 
                        id='userName' 
                        size='large'
                        placeholder='Enter your userName' 
                        prefix={<Icon type='user' style={{color: 'rgba(0,0,0,.25)'}}></Icon>} 
                        onChange={(e) => {
                            setUserName(e.target.value)
                        }} />
                        <br />
                        <br />
                        <Input.Password 
                        id='password' 
                        size='large'
                        placeholder='Enter your password' 
                        prefix={<Icon type='key' style={{color: 'rgba(0,0,0,.25)'}}></Icon>} 
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }} />
                        <br/>
                        <br/>
                        <Button type='primary' size='large'block onClick={login}>登陆</Button>
                </Card>
            </Spin>
        </div>
    )
}
