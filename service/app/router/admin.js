const amdin = require('../middleware/adminauth')
module.exports = app => {
    const {router, controller} = app
    console.log(app)
    var adminauth = app.middleware.adminauth()
    router.get('/admin/index/', controller.admin.main.index)
    router.post('/admin/checkLogin', controller.admin.main.checkLogin)
    router.get('/admin/types', adminauth,controller.admin.main.getTypeInfo)
    router.post('/admin/addArticle', adminauth, controller.admin.main.addArticle)
    router.post('/admin/updateArticle', adminauth, controller.admin.main.updateArticle)
}