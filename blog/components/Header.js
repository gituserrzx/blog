import React, { useState, useEffect } from 'react'
import '../public/style/components/header.css'
import { Row, Col, Menu, Icon } from 'antd'
import axios from 'axios'
import api from '../config/apiUrl'
import Router from 'next/router'

const Header = () => {
	const [artTypeArr, setArtTypeArr] = useState([])
	useEffect(() => {
		const getType = async () => {
			const result = await axios(api.types).then(res => {
				return res.data.data
			})
			setArtTypeArr(result)
		}
		getType()
	}, [])
	const handleNav = (e) => {
		console.log(e)
		if (e.key == 0) {
			Router.push('/index')
		} else {
			let typeName
			// console.log(artTypeArr)
			// for(let i = 0; i < artTypeArr.length; i++) {
			// 	if(e.key == artTypeArr[i].Id) {
			// 		typeName = artTypeArr[i].typeName
			// 		break
			// 	}
			// }
			// console.log(typeName)
			Router.push('/list?id=' + e.key)
		}
	}
	return (
		<div className="header">
			<Row type='flex' justify='center'>
				<Col xs={24} sm={24} md={10} lg={12} xl={11}>
					<span className='header-logo'>
						codeZX
				</span>
					<span className='header-txt'>
						专注前端开发
				</span>
				</Col>
				<Col xs={0} sm={0} md={14} lg={12} xl={7} push={1}>
					<Menu mode='horizontal' onClick={handleNav}>
						<Menu.Item key='0'>
							<Icon type='home' />
							博客首页
						</Menu.Item>
						{artTypeArr.map(item => {
							return (
								<Menu.Item key={item.Id}>
									{/* <Icon type={item.icon} /> */}
									{item.typeName}
								</Menu.Item >
							)
						})}

					</Menu>
				</Col>
			</Row>
		</div>
	)
}
export default Header