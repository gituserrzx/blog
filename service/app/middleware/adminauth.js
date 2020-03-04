module.exports = options => {
    return async function (ctx, next) {
        console.log(ctx.session)
        if(ctx.session.openId) {
            await next()
        } else {
            ctx.body = {
                error: 401,
                data: '没有登陆'
            }
        }
    }
}