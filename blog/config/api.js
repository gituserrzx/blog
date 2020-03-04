import request from './request'
import apiUrl from './apiUrl'

export function getArticles () {
   return request.get(apiUrl.serviceApi.articles)
}
export function getArticlesById(id) {
    return request.get(apiUrl.serviceApi.articlesById + id)
}
export function getTypes () {
    return request.get(apiUrl.serviceApi.types)
}
export function getListById (id) {
    return request.get(apiUrl.serviceApi.listById + id)
}