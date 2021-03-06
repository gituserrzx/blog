import React, { useState, useEffect} from 'react'
import Head from 'next/head'
import { Row, Col, List, Icon, Breadcrumb } from 'antd'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import '../public/style/pages/index.css'
import Link from 'next/link'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import {getListById} from '../config/api'

const MyList = (list) => {
  const [typeName, setTypeName] = useState('')
  const [mylist, setMylist] = useState(list.data)
  useEffect(() => {
    setMylist(list.data)
    // setTypeName(list.url.query.typeName)
  })
  const renderer = new marked.Renderer()
  marked.setOptions({
    renderer: renderer, //定义渲染的方式
    gfm: true,//启用github的渲染模式
    pedantic: false,  //是否不容错
    sanitize: false, //是否忽略html标签
    tables: true, //github表格渲染
    break: false, //github的样式的换行符
    smartLists: true, //自动渲染列表
    // highlight: function (code) {
    //   return hljs.highlightAuto(code).value
    // }
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
                <a href='/'>文章</a>
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <List header={<div>最新日志</div>}
            itemLayout='vertical'
            dataSource={mylist}
            renderItem={item => (
              <List.Item>
                <Link href={{pathname:'/detailed', query:{id: item.id}}} >
                <a className="list-title">{item.title}</a>  
                </Link>
                <div className='list-icon'>
                  <span><Icon type='calendar' />{item.addTime}</span>
                  <span><Icon type='folder' /> {item.typeName}</span>
                  <span><Icon type='fire' /> {item.view_count}人</span>
                </div>
                <div className="list-context" dangerouslySetInnerHTML={{
                  __html: marked(item.introduce)
                }}>
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
    getListById(id).then(res => {
      // console.log(res)
      resolve(res.data)
    })
  }) 
  return await promise
}

export default MyList
