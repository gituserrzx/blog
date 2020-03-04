module.exports = app => {
	const { router, controller } = app
	router.get('/default/index', controller.default.home.index)
	router.get('/default/articles', controller.default.home.getArticleList)
	router.get('/default/articles/:id', controller.default.home.getArticleById)
	router.get('/default/types', controller.default.home.getArtType)
	router.get('/default/list/:id', controller.default.home.getListById)
}