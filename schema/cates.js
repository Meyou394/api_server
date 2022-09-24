// 导入定义验证规则包
const joi = require('joi')

// 验证规则对象 - 文章分类
const name = joi.string().max(255).required()
const alias = joi.string().alphanum().max(255).required()

// 验证规则对象 - 文章id
const id = joi.number().integer().min(1)

// post请求:body
exports.article_cates_schema = {
    body: {
        name,
        alias
    }
}

// get请求:params
exports.del_cates_schema = {
    params: {
        id
    }
}

// 根据id查找
exports.get_cates_schema = {
    params: {
        id
    }
}

// 根据ID更新
exports.update_cates_schema = {
    body: {
        id,
        name,
        alias
    }
}