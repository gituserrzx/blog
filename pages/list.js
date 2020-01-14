import React, { useState, useEffect} from 'react'
import Head from 'next/head'
import { Row, Col, List, Icon, Breadcrumb } from 'antd'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import '../public/style/pages/index.css'
import api from '../config/apiUrl'
import Axios from 'axios';
import Link from 'next/link'

const MyList = (list) => {
  const [mylist, setMylist] = useState(list.data)
  useEffect(() => {
    setMylist(list.data)
  })
  return (
    <div>
      <Head>
        <title>List</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header></Header>
      <Row className='comm-main' type='flex' justify='center'>
        <Col className='comm-left' xs={24} sm={24} md={16} lg={18} xl={14}>
          <div className='bread-div'>
            <Breadcrumb>
              <Breadcrumb.Item>
                <a href='/'>首页</a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <a href='/'>视频教程</a>
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <List header={<div>最新日志</div>}
            itemLayout='vertical'
            dataSource={mylist}
            renderItem={item => (
              <List.Item>
                <Link href={{pathname:'/detailed', query:{id: item.id}}} className="list-title">
                <a>{item.title}</a>  
                </Link>
                <div className='list-icon'>
                  <span><Icon type='calendar' />{item.addTime}</span>
                  <span><Icon type='folder' /> {item.typeName}</span>
                  <span><Icon type='fire' /> {item.view_count}人</span>
                </div>
                <div className="list-context">
                  {item.introduce}
                </div>
              </List.Item>
            )}
          />
        </Col>
        <Col className='comm-right' xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author/>
          <Advert/>
      </Col>
      </Row>
      <Footer/>
    </div>
  )
}
MyList.getInitialProps = async (context) => {

  const id = context.query.id
  const promise = new Promise(resolve => {
    Axios(api.listById + id).then(res => {
      console.log(res)
      resolve(res.data)
    })
  }) 
  return await promise
}

export default MyList
