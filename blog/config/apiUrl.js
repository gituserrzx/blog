const baseUrl = 'http://127.0.0.1:7001/default'

const serviceApi = {
	articles: '/articles',// 首页 所有文章接口
	articlesById: '/articles/', //文章详情
	types: '/types',
	listById: '/list/'
}
export default {
	baseUrl,
	serviceApi
}