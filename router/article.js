const express = require('express')
const router = express.Router()

// 导入文章处理模块函数
const article_handle = require('../router_handler/article')

// 导入解析form-data的中间件
const multer = require('multer')
const path = require('path')

// 创建multer实例 通过dest指定文件的存放路径
const uploads = multer({ dest: path.join(__dirname, '../uploads') })

// 导入验证数据中间件
const expressJoi = require('@escook/express-joi')
const { add_article_schema } = require('../schema/article')

// uploads.single()是一个局部生效中间件,用来解析formData格式的表单数据
// 发布文章的路由
// 注意:在当前发布文章路由中,先后使用了两个中间件
//      先使用multer解析表单数据
//      在使用expressjoi 对解析的表单数据进行验证
router.post('/add', uploads.single('cover_img'), expressJoi(add_article_schema), article_handle.addArticle)

module.exports = router