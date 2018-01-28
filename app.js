const Koa = require('koa')
const app = new Koa()

app.use((ctx) => {
    ctx.body = 'Koa'
})

app.listen(3000, () => {
    console.log('资源服务启动成功!')
})