// 导入定义验证规则包
const joi = require('joi')

// 定义用户名和密码的验证 \s 是匹配所有空白符，包括换行，\S 非空白符，不包括换行。
const username = joi.string().alphanum().min(1).max(10).required()
    // const password = joi.string().pattern(/^[\S]{6,12}/).required()
const password = joi.string().pattern(/^[\S]{6,12}/)

// 定义id 昵称 邮箱验证规则
const uid = joi.number().integer().min(1).required()
const userNickname = joi.string().max(16).required()
const userEmail = joi.string().email().required()

// 头像
const avatar = joi.string().dataUri().required()

// 向外共享验证规则
// 1.验证规则对象 - 注册和登录
exports.reg_login_schema = {
    body: {
        username,
        password
    }
}

// 2.验证规则对象 - 更新基本信息
exports.update_userinfo_schema = {
    body: {
        id: uid,
        nickname: userNickname,
        email: userEmail
    }
}

// 3.验证规则对象 - 更新密码信息
exports.update_userPwd_schema = {
    body: {
        oldPwd: password,
        // joi.not(joi.ref('oldPwd'))表示新密码的值不能和旧密码一致
        // .concat()用于合并两条验证规则
        newPwd: joi.not(joi.ref('oldPwd')).concat(password)
    }
}

// 4.验证规则对象 - 更新头像
exports.update_avatar_schema = {
    body: {
        avatar
    }
}