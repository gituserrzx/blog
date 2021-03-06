
const Controller = require('egg').Controller

class MainController extends Controller {
    async index() {
        this.ctx.body = 'hi api'
    }
    async checkLogin() {
        const userName = this.ctx.request.body.userName
        const password = this.ctx.request.body.password
        console.log(userName, password)
        const sql = `SELECT userName FROM admin_user WHERE userName = ${userName} AND password = ${password}`
        const res = await this.app.mysql.query(sql)
        if (res.length > 0) {
            let openId = new Date().getTime()
            this.ctx.session.openId = { 'openId': openId }
            this.ctx.body ={
                data: "登录成功",
                error: 0,
                openId: openId,
                info: this
            }
        } else {
            this.ctx.body = {
                data: '登录失败',
                error: 1
            }
            
        }
    }
    async getTypeInfo () {
        const result = await this.app.mysql.select('type')
        this.ctx.body = {
            data: result,
            error: 0
        }
    }
    async addArticle() {
        const tempInfo = this.ctx.request.body
        const result = await this.app.mysql.insert('article', tempInfo)
        console.log(result)
        const insertSuccess = result.affectedRows === 1
        const insertId = result.insertId
        if(insertSuccess) {
            this.ctx.body ={
                error: 0,
                insertId: insertId
            }
        }
    }
    async updateArticle () {
        let tempArticle = this.ctx.request.body
        const result = await this.app.mysql.update('article', tempArticle)
        const updateSuccess = result.affectedRows === 1
        if(updateSuccess) {
            this.ctx.body = {
                error: 0
            }
        }
    }
}

module.exports = MainController