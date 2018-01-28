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
 }