const express = require('express')
const router = express.Router()
    // 导入路由处理函数模块
const catesHandler = require('../router_handler/cates')

// 导入验证数据中间件
const expressJoi = require('@escook/express-joi')
    // 导入验证规则
const { article_cates_schema, del_cates_schema, get_cates_schema, update_cates_schema } = require('../schema/cates')

// 查找文章分类
router.get('/cates', catesHandler.getCates)

// 新增文章分类
router.post('/addCates', expressJoi(article_cates_schema), catesHandler.addCates)

// 根据id删除文章分类
router.get('/deleteCate/:id', expressJoi(del_cates_schema), catesHandler.delCates)

// 根据id获取文章分类
// router.get('/cates/:id', expressJoi(get_cates_schema), catesHandler.getCatesById)
router.get('/findCateByid', expressJoi(get_cates_schema), catesHandler.getCatesById)

// 根据id更新文章分类
router.post('/cates/:id', expressJoi(update_cates_schema), catesHandler.updateCatesById)



module.exports = router