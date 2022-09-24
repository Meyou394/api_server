const express = require('express')
const router = express.Router()
    // 导入路由处理函数模块
const userInfoHandler = require('../router_handler/userinfo')

// 导入验证数据中间件
const expressJoi = require('@escook/express-joi')
    // 导入更新信息验证规则
const { update_userinfo_schema, update_userPwd_schema, update_avatar_schema } = require('../schema/user')

// 获取用户信息路由
router.get('/userinfo', userInfoHandler.getUserInfo)

// 更新用户信息路由
router.post('/userinfo', expressJoi(update_userinfo_schema), userInfoHandler.updateUserInfo)

// 修改用户密码路由
router.post('/updatePwd', expressJoi(update_userPwd_schema), userInfoHandler.updateUserPwd)

// 更换头像
router.post('/update/avatar', expressJoi(update_avatar_schema), userInfoHandler.updateAvatar)

// 向外共享路由信息
module.exports = router