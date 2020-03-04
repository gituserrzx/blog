import request from './request'
import apiUrl from './apiUrl'

export function checkLogin(data) {
   return request.post(apiUrl.serviceApi.checkLogin,data)
}
export function getTypes () {
   return request.get(apiUrl.serviceApi.types)
}
export function addArticle (data) {
   return request.post(apiUrl.serviceApi.addArticle, data)
}
export function updateArticle (data) {
   return request.post(apiUrl.serviceApi.updateArticle, data)
}