'use strict'

const Controller = require('egg').Controller;
class HomeController extends Controller {
	async index() {

		this.ctx.body = 'ni hao'
	}
	async getArticleList() {
		let sql = `select article.id as id,
				article.title as title, 
				FROM_UNIXTIME(article.addTime,'%Y-%m-%d %k:%i:%s') as addTime, 
				article.view_count as view_count, 
				article.introduce as introduce,
				type.typeName as typeName from article LEFT JOIN type ON article.type_id = type.Id `
		const results = await this.app.mysql.query(sql)
		this.ctx.body = {
			data: results
		}
	}
	async getArticleById() {
		let id = this.ctx.params.id
		let sql = `select article.id as id, FROM_UNIXTIME(article.addTime,'%Y-%m-%d %k:%i:%s') as addTime, article.title as title, article.introduce as introduce, article.view_count as view_count,
		article.article_content as article_content, 
		type.typeName as typeName FROM article LEFT JOIN type ON article.type_id = type.Id WHERE article.id = ${id}`
		const result = await this.app.mysql.query(sql)
		console.log(result)
		this.ctx.body = {
			data: result[0]
		}
	}
	async getArtType() {
		const result = await this.app.mysql.select('type')
		this.ctx.body = {
			data: result
		}
	}
	async getListById() {
		const id = this.ctx.params.id
		let sql = `select article.id as id, FROM_UNIXTIME(article.addTime,'%Y-%m-%d %k:%i:%s') as addTime, article.title as title, article.introduce as introduce, article.view_count as view_count,
		article.article_content as article_content, 
		type.typeName as typeName FROM article LEFT JOIN type ON article.type_id = type.Id WHERE type.Id = ${id}`
		const result = await this.app.mysql.query(sql)
		// console.log(result)
		this.ctx.body = {
			data: result
		}
	}
}

module.exports = HomeController