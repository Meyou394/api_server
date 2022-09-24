// 导入express
const express = require('express')
    // 创建服务器实例
const app = express()
    // 配置cors跨域
const cors = require('cors')
app.use(cors())
    // 解析表单数据中间件
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
    // 托管静态资源
app.use('/uploads', express.static('./uploads'))


// 封装res.cc中间件
// status 默认为1，表示失败
// err错误对象或字符串
app.use((req, res, next) => {
    res.cc = (err, status = 1) => {
        res.send({
            status,
            message: err instanceof Error ? err.message : err
        })
    }
    next()
})

// 导入使用路由模块
const userRouter = require('./router/user')
const Joi = require('joi')
app.use('/api', userRouter)

// 解析Token字符串
const expressJWT = require('express-jwt')
const config = require('./config')
app.use(expressJWT({ secret: config.jwtSecretKey, algorithms: ['HS256'] }).unless({ path: [/^\/api/] }))

// 导入并使用用户信息
const userInfo = require('./router/userinfo')
app.use('/my', userInfo)

// 倒入文章分类模块
const cates = require('./router/cates')
app.use('/my/article', cates)

// 导入文章模块
const article = require('./router/article')
app.use('/my/article', article)

// 定义错误级别中间件
app.use((err, req, res, next) => {
    // 验证失败导致的错误  用来验证用户名密码规则的错误
    if (err instanceof Joi.ValidationError) return res.cc(err)
        // 未知错误
    if (err.name === 'UnauthorizedError') return res.cc('身份认证失败!')
        // console.log(err);
    res.cc(err)
})

// 启动服务器
app.listen(80, () => {
    console.log('服务器启动成功  http://127.0.0.1:80');
})