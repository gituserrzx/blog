import { Avatar, Divider } from 'antd'
import '../public/style/components/author.css'

const Author = () => {
	return(
		<div className="author-div comm-box">
			<div>
				<Avatar size={100} src='https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3470783845,4203906546&fm=26&gp=0.jpg' />
				<div className="author-introduction">
					专注于web和移动端开发
				<Divider>社交账号</Divider>
					<Avatar size={28} icon='github' className='account' />
					<Avatar size={28} icon='qq' className='account' />
					<Avatar size={28} icon='wechat' className='account' />
				</div>
			</div>
		</div>
	)
} 
export default Author