const Koa = require('koa')
const views = require('koa-views')
const path = require('path')
const app = new Koa()

// 加载模板引擎
app.use(views(path.join(__dirname, './view'), {
    extension: 'ejs'
}))


app.use(async (ctx) => {
    let title = 'Hello Koa2'
    await ctx.render('index', {
        title,
    })
})

app.listen(3000, () => {
    console.log('服务开启成功！')
})