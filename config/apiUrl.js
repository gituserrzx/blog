const baseUrl = 'http://127.0.0.1:7001/default'

const serviceApi = {
	articles: baseUrl + '/articles',// 首页 所有文章接口
	articlesById: baseUrl + '/articles/', //文章详情
	types: baseUrl + '/types',
	listById: baseUrl + '/list/'
}
export default serviceApi