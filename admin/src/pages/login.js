import React,{useState} from 'react'
import {Spin, Card, Input, Icon, Button} from 'antd'
import 'antd/dist/antd.css'

export default function Login() {
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    return (
        <div className='login-div' >
            <Spin tip='Loading...' spinning={isLoading}>
                <Card title='CoderZX blog login' style={{ width: 400 }} bordered={true} >
                    <Input />
                </Card>
            </Spin>
        </div>
    )
}
