import React, { useState, useEffect } from 'react'
import marked from 'marked'
import '../static/css/addArticle.css'
import { Row, Col, Input, Select, Button, DatePicker, message} from 'antd'
import { getTypes,addArticle, updateArticle } from '../config/api'

const { Option } = Select
const { TextArea } = Input

function AddArticle(props) {
    const [articleId, setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
    const [articleTitle, setArticleTitle] = useState('')   //文章标题
    const [articleContent, setArticleContent] = useState('')  //markdown的编辑内容
    const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
    const [introducemd, setIntroducemd] = useState()            //简介的markdown内容
    const [introducehtml, setIntroducehtml] = useState('等待编辑') //简介的html内容
    const [showDate, setShowDate] = useState()   //发布日期
    const [updateDate, setUpdateDate] = useState() //修改日志的日期
    const [typeInfo, setTypeInfo] = useState([]) // 文章类别信息
    const [selectedType, setSelectType] = useState('请选择类型') //选择的文章类别
    marked.setOptions({
        renderer: new marked.Renderer(),
        grm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        smartypants: false,
    })
    useEffect(() => {
        async function getTypeInfo() {
            const typesResult = await getTypes()
            if(typesResult.data.error == 0) {
                setTypeInfo(typesResult.data.data)   
            } else {
                localStorage.removeItem('openId')
                props.history.push('/')
            }
        }
        getTypeInfo()
    }, [])
    const changeContent = (e) => {
        setArticleContent(e.target.value)
        const html = marked(e.target.value)
        console.log(html)
        setMarkdownContent(html)
    }
    const changeIntroduce = (e) => {
        setIntroducemd(e.target.value)
        const html = marked(e.target.value)
        setIntroducehtml(html)
    }
    const selectType = (e) => {
        setSelectType(e)
    }
    const publishArticle = async () => {
        if(!articleTitle) {
            message.error('文章标题不能为空')
            return
        } else if (!articleContent) {
            message.error('文章内容不能为空')
            return 
        } else if (!introducemd) {
            message.error('文章的简介不能为空')
        } else if (!selectedType) {
            message.error('文章的类型不能为空')
            return
        } else if(!showDate) {
            message.error('发布的时间不能为空')
            return
        } else {
            let data = {}
            data.type_id = selectedType
            data.title = articleTitle
            data.article_content = articleContent
            data.introduce = introducemd
            let datetime = showDate.replace('-', '/')
            data.addTime = (new Date(datetime).getTime())/1000
            if(articleId === 0) {
                data.view_count = Math.ceil(Math.random() * 100) + 1000
               let result =  await addArticle(data)
               console.log(result)
                if(result.data.error == 0) {
                    message.success('文章保存成功')
                    setArticleId(result.data.articleId)
                } else {
                    message.error('文章保存失败')
                }

            } else {
                data.Id = articleId
                let result = await updateArticle(data)
                if(result.data.error == 0) {
                    message.success('文章修改成功')
                } else {
                    message.error('文章修改失败')
                }
            }
        }
    }
    return (
        <div>
            <Row gutter={5}>
                <Col span={18}>
                    <Row gutter={10}>
                        <Col span={20}>
                            <Input
                                value={articleTitle}
                                onChange={e => {
                                    setArticleTitle(e.target.value)
                                }}
                                size="large"
                                placeholder="博客标题" />
                        </Col>
                        <Col span={4}>
                            &nbsp;
                            <Select onChange={selectType} defaultValue={selectedType} size="large">
                                {
                                    typeInfo.map((item, index) => {
                                    return <Option value={item.Id} key={index}>
                                            {item.typeName}
                                    </Option>
                                    })
                                }

                            </Select>
                        </Col>
                    </Row>
                    <br />
                    <Row gutter={10}>
                        <Col span={12}>
                            <TextArea
                                placeholder='文章内容'
                                className='markdown-content'
                                rows={30}
                                onChange={changeContent} />
                        </Col>
                        <Col span={12}>
                            <div className='show-html'
                                dangerouslySetInnerHTML={
                                    {
                                        __html: markdownContent
                                    }
                                }
                            ></div>
                        </Col>
                    </Row>
                </Col>
                <Col span={6}>
                    <Row>
                        <Col span={24}>
                            <Button size='large'>暂存文章</Button>
                            <Button
                                type='primary'
                                size='large'
                                onClick={publishArticle}>发布文章</Button>
                        </Col>
                        <Col span={24}>
                            <br />
                            <TextArea
                                placeholder='文章简介'
                                rows={4}
                                onChange={changeIntroduce} />
                            <br /><br />
                            <div className="introduce-html" dangerouslySetInnerHTML={{
                                __html: introducehtml
                            }}>

                            </div>
                        </Col>
                        <Col span={12}>
                            <div className="date-select">
                                <DatePicker
                                    onChange={(date, dateString) => {
                                        setShowDate(dateString)
                                    }}
                                    placeholder='发布日期'
                                    size='large'
                                />
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}
export default AddArticle