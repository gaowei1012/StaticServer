const Koa = require('koa')
const path = require('path')
const static = require('koa-static')

const app = new Koa()

// 静态资源文件入口
const staticPath = '/static';

app.use(static(
    path.join(__dirname, staticPath)
))

app.use( async (ctx) => {
    ctx.body = 'hello koa-static'
})

app.listen(3000, () => {
    console.log('静态服务启动成功！')
})
/**
 *  Koa-Static 中间件
 * 
 */