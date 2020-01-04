import React from 'react'
import Head from 'next/head'
import { Row, Col, Breadcrumb, Icon } from 'antd'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import '../public/style/pages/detailed.css'

const Detailed = () => (
  <div>
    <Head>
      <title>Detailed</title>
      <link rel='icon' href='/favicon.ico' />
    </Head>
    <Header></Header>
    <Row className='comm-main' type='flex' justify='center'>
      <Col className='comm-left' xs={24} sm={24} md={16} lg={18} xl={14}>
        <div>
          <div className="bread-div">
            <Breadcrumb>
              <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
              <Breadcrumb.Item>视频列表</Breadcrumb.Item>
              <Breadcrumb.Item>xxxx</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <div>
            <div className='detailed-title'>
              blog的开发
          </div>
            <div className="list-icon center">
              <span><Icon type="calendar" /> 2019-06-28</span>
              <span><Icon type="folder" /> 视频教程</span>
              <span><Icon type="fire" /> 5498人</span>
            </div>
            <div className="detailed-content" >
              详细内容，下节课编写
               </div>
          </div>

        </div>
      </Col>
      <Col className='comm-right' xs={0} sm={0} md={7} lg={5} xl={4}>
        <Author/>
        <Advert/>
      </Col>
    </Row>
  </div>
)

export default Detailed
