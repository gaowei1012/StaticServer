const Koa = require('koa')

const app = new Koa()

app.use( async (ctx) => {
    
    if (ctx.url === '/index') {

        ctx.cookies.set(
            'cid',
            'Hello Koa Cookie',
            {
                domain: 'localhost',
                path: '/index',
                maxAge: 10 * 60 * 1000,
                expires: new Date('2018-12-12'),
                httpOnly: false,
                overwrite: false
            }
        )

        ctx.body = 'Cookie is ok'
    } else {
        ctx.body = 'Hello Koa'
    }
})

app.listen(3000, () => {
    console.log('静态资源启动成功！')
})


