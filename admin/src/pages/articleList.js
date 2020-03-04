import React, { useState, useEffect } from 'react'
import '../static/css/articleList.css'
import { List, Row, Col, Modal, message, Button, Switch } from 'antd'

const { confirm } = Modal;

function ArticleList(props) {
    const [list, setList] = useState([])
    return (
        <div>
            <List
                header={
                    <Row className='list-div'>
                        <Col span={8}>
                            <b>标题</b>
                        </Col>
                        <Col span={3}>
                            <b>类别</b>
                        </Col>
                        <Col span={3}>
                            <b>发布时间</b>
                        </Col>
                        {/* <Col span={3}>
                            <b>集数</b>
                        </Col> */}
                        <Col span={3}>
                            <b>浏览量</b>
                        </Col>

                        <Col span={4}>
                            <b>操作</b>
                        </Col>
                    </Row>
                }
                bordered
                dataSource={list}
                renderItem={
                    item => {
                        return (
                            <List.Item>
                                <Row className="list-div">
                                    <Col span={8}>
                                        {item.title}
                                    </Col>
                                    <Col span={8}>
                                        {item.typeName}
                                    </Col>
                                    <Col span={3}>
                                        {item.addTime}
                                    </Col>
                                    {/* <Col span={3}>
                                        共<span>{item.part_count}</span>
                                    </Col> */}
                                    <Col span={3}>
                                        {item.view_count}
                                    </Col>
                                    <Col span={4}>
                                        <Button type='primary'>
                                            修改
                                        </Button>
                                        <Button type='primary' danger > 
                                            修改
                                        </Button>
                                    </Col>
                                </Row>
                            </List.Item>
                        )
                    }
                }
            >

            </List>
        </div>
    )
}
export default ArticleList