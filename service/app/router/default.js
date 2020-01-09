module.exports = app => {
	const { router, controller } = app
	router.get('/index', controller.default.home.index)
	router.get('/articles', controller.default.home.getArticleList)
	router.get('/articles/:id', controller.default.home.getArticleById)
}