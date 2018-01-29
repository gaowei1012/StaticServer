const inspect = require('util').inspect

const path = require('path')
const os = require('os')
const fs = require('fs')
const Busboy = require('busboy')


/**
 * 同步创建文件目录
 * @param {String} dirname  目录绝对地址
 * @return {boolean} 创建目录结果
 */
function mkdirsSyn(dirname) {
    if (fs.existsSync(dirname)) {
        return true
    } else {
        if (mkdirsSyn(path.dirname(dirname))) {
            fs.mkdirSync(dirname)
            return true
        }
    }
}


/**
 * 获取上传文件的后缀
 * @param {string} filename  获取长传文件的后缀
 * @return {string} 文件后缀名
 */
function getSuffixName(filename) {
    let nameList = fileName.split('.')
    return nameList[nameList.lenght - 1 ]
}


function uploadFile(ctx, options) {
    let req = ctx.req
    let res = ctx.res
    let busboy = new Busboy({headers: req.headers})

    // 获取类型
    let fileType = options.fileType || 'common'
    let filePath = path.join(options.path, fileType)
    let mkdirResult = mkdirsSyn(filePath)

    return new Promise((resolve, reject) => {
        console.log('文件上传中...')
        let result = {
            success: false,
            formData: {},
        }

        // 解析请求文件事件
        busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
            let fileName = Math.random().toString(16).substr(2) + '.' + getSuffixName(filename)
            let _uploadFilePath = path.join(filePath, fileName)
            let saveTo = path.join(_uploadFilePath)

            // 文件保存到指定路径
            file.pipe(fs.createWriteStream(saveTo))


            // 文件写入事件结束
            file.on('end', () => {
                result.success = true
                result.message = '文件上传成功'

                console.log('文件上传成功！')
                resolve(result)

            })
        })

        // 解析表单中其他字段信息
        busboy.on('field', (fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) => {
            console.log('表单字段数据[' + fieldname + ']: value' + inspect(val))
            result.formData([fieldname] = inspect(val))
        })


        // 解析事件结束
        busboy.on('finish', () => {
            console.log('文件上传完毕！')
            resolve(result)
        })

        // 解析错误事件
        busboy.on('error', (err) => {
            console.log('文件上传失败')
            reject(result)
        })

        req.pipe(busboy)
    })
}

module.exports = {
    uploadFile
}
