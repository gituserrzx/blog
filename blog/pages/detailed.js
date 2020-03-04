import React from 'react'
import Head from 'next/head'
import { Row, Col, Breadcrumb, Icon, Affix } from 'antd'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import '../public/style/pages/detailed.css'
import 'markdown-navbar/dist/navbar.css'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import Tocify from '../components/tocify.tsx'
import {getArticlesById} from '../config/api'

const Detailed = (props) => {
  console.log(props)
  const tocify = new Tocify()
  const renderer = new marked.Renderer()
  renderer.heading = function (text, level, raw) {
    const anchor = tocify.add(text, level)
    return `<a id="${anchor}" href="#${anchor}" class='anchor-fix'>
    <h${level}>${text}</h${level}>
    </a>\n`
  }
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

  let html = marked(props.article_content)
  return (
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
                <Breadcrumb.Item>文章</Breadcrumb.Item>
                <Breadcrumb.Item>{props.title}</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <div>
              <div className='detailed-title'>
              {props.title}
          </div>
              <div className="list-icon center">
                <span><Icon type="calendar" /> {props.addTime}</span>
                <span><Icon type="folder" /> {props.typeName}</span>
                <span><Icon type="fire" /> {props.view_count}人</span>
              </div>
              <div className="detailed-content" dangerouslySetInnerHTML={{
                __html: html
              }}>
                {/* <Markdown source={markdown}
                  escapehtml={false}
                /> */}

              </div>
            </div>

          </div>
        </Col>
        <Col className='comm-right' xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
          <Affix offsetTop={5}>
            <div className='detailed-nav comm-box'>
              <div className='nav-title'>文章目录</div>
              {tocify && tocify.render()}
            </div>
          </Affix>

        </Col>
      </Row>
      <Footer />
    </div>
  )
}
Detailed.getInitialProps = async (context) => {
  console.log(context)
  const id = context.query.id
  const promise = new Promise(resolve => {
    getArticlesById(id).then(res => {
      resolve(res.data.data)
    }).catch(e => {
      console.log(e)
    })
  })
  return await promise
}
export default Detailed
