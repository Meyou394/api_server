const express = require('express')
    // 创建路由对象
const router = express.Router()

// 导入用户路由处理函数模块
const userHandler = require('../router_handler/user')

// 1.导入验证数据中间件
const expressjoi = require('@escook/express-joi')
    // 2.导入需要的验证规则对象
const { reg_login_schema } = require('../schema/user')
    // console.log(reg_login_schema);

// 注册新用户  
router.post('/reguser', expressjoi(reg_login_schema), userHandler.reguser)

// 登录
router.post('/login', expressjoi(reg_login_schema), userHandler.login)

// 查询所有用户
router.get('/findAllUsers', userHandler.findAllUsers)

// 请求接口.查询用户名是否被占用
router.post('/serUsers', userHandler.serUsers)

module.exports = router