/**
 *  读取请求内容
 */

const path = require('path')
const fs = require('fs')

/* 封装读取目录内容方法 */
const dir = require('./dir')

/* 封装读取文件内容方法 */
const file = require('./file')

async function content(ctx, fullStaticPath) {

    // 封装请求资源的完整绝对路径
    let reqPath = path.join(fullStaticPath, ctx.url)

    // 判断请求路径是否为目录或者文件
    let exist = fs.existsSync(reqPath)

    // 返回请求内容， 默认为空
    let content = ''

    if (!exist) {

        // 如果请求路径不存在， 返回 404
        content = '404 Not Found!'
    } else {

        // 判断访问地址是文件还是文件夹
        let stat = fs.statSync(reqPath)

        if (stat.isDirectory()) {

            // 如果为目录， 则宣读读取目录内容
            content = dir(ctx.url, reqPath)
        } else {

            // 如果为文件， 则读取文件内容
            content = await file(reqPath)
        }
    }

    return content
}

module.exports = content