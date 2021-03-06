import React, { useState } from 'react'
import Head from 'next/head'
import { Row, Col, List, Icon } from 'antd'
import Header from '../components/Header'
import Author from '../components/Author'
import Link from 'next/link'
// import Axios from 'axios'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import '../public/style/pages/index.css'
import api from '../config/apiUrl'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import {getArticles} from '../config/api'

const Home = (list) => {
  const [mylist, setMylist] = useState(
    list.data
  ) 
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
        <title>Home</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header></Header>
      <Row className='comm-main' type='flex' justify='center'>
        <Col className='comm-left' xs={24} sm={24} md={16} lg={18} xl={14}>
          <List header={<div>最新日志</div>}
            itemLayout='vertical'
            dataSource={mylist}
            renderItem={item => (
              <List.Item>
                <div className="list-title">
                  <Link href={{pathname:'/detailed', query:{id: item.id}}}><a>{item.title}</a></Link>
                </div>
                <div className='list-icon'>
                  <span><Icon type='calendar' /> {item.addTime}</span>
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
          <Author />
          <Advert />
        </Col>
      </Row>
      <Footer />
    </div>

  )
}
Home.getInitialProps = async () => {
  const promise = new Promise(resolve => {
    getArticles().then(res => {
      resolve(res.data)
    }).catch(res => {
      console.log(res)
    })
  })
  return await promise
}

export default Home
