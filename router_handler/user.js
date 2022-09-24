// 注册用户 导入数据库操作模块
const db = require('../db/index')

// 导入bcryptjs加密模块
const bcrypt = require('bcryptjs')

// 导入生成Token包
const jwt = require('jsonwebtoken')
    // 导入秘钥
const config = require('../config')
const { expiresIn } = require('../config')
exports.reguser = (req, res) => {
        // 获取客户端提交表单的数据
        const userinfo = req.body
            // console.log(userinfo);
            // 判断用户名或密码是否为空
            // if (!userinfo.username || !userinfo.password) {
            //     return res.cc('用户名或密码不合法!')
            // }
            // 检测用户名是否存在
        const serUserSql = 'select * from ev_users where username=?'
        db.query(serUserSql, userinfo.username, (err, results) => {
                // 执行失败
                if (err) {
                    return res.cc(err)
                }
                // 判断是否占用
                if (results.length > 0) {
                    return res.cc('用户名已被占用,请更换用户名!')
                }

                // 请求接口
                // return res.cc('请求成功! 用户名未被占用!', 0)


                // 未被占用 加密密码 调用bcryptjs.hashSync() 
                userinfo.password = bcrypt.hashSync(userinfo.password, 10)
                console.log(userinfo.password);
                // 加密后的注册用户名和密码
                const userInsert = { name: userinfo.username, psd: userinfo.password }
                    // 插入数据库
                const insertUserSql = 'insert into ev_users(username,password) values(?,?)'
                db.query(insertUserSql, [userInsert.name, userInsert.psd], (err, results) => {
                    if (err) return res.cc(err)
                    if (results.affectedRows !== 1) return res.cc('注册失败，请稍后再试!')
                    res.cc('注册成功!', 0)
                })
            })
            // res.send('reguser ok')
    }
    // 登录
exports.login = (req, res) => {
    // 接收表单数据
    const userinfo = req.body
        // 定义sql语句
    const sql = 'select * from ev_users where username=?'
        // 执行sql语句
    db.query(sql, userinfo.username, (err, results) => {
        if (err) return res.cc(err)
            // 执行成功，获取的数据不等于1
        if (results.length !== 1) return res.cc('登录失败!')
            // 判断密码是否正确 用用户输入的密码和数据库中加密密码进行比对
            // console.log(userinfo.password);
            // 加上trim去掉请求密码空格，原因  可能ApiPost输入框造成
        const istrue = bcrypt.compareSync(userinfo.password.trim(), results[0].password)
        if (!istrue) return res.cc('密码错误!')
            // TODO: 在服务器端生成Token字符串
        const user = {...results[0], password: '', user_pic: '' }

        // 对用户的信息加密，生成一个Token字符串
        const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn: config.expiresIn })
        console.log('Token:' + tokenStr);
        res.send({
            status: 0,
            message: '登陆成功!',
            Token: 'Bearer ' + tokenStr
        })

    })
}

// 查询所有用户
exports.findAllUsers = (req, res) => {
    const sql = "select  *  from ev_users"
    db.query(sql, (err, results) => {
        if (err) return res.cc(err)
        if (results.length === 0) return res.cc('用户列表为空!')
            // 查询成功返回数据
        res.send({
            status: 0,
            message: '获取用户信息成功!',
            data: results
        })
    })
}

// 检测用户名是否被占用
exports.serUsers = (req, res) => {
    // 获取客户端提交表单的数据
    const userinfo = req.body
        // console.log(userinfo);
        // 判断用户名或密码是否为空
        // if (!userinfo.username || !userinfo.password) {
        //     return res.cc('用户名或密码不合法!')
        // }
        // 检测用户名是否存在
    const serUserSql = 'select * from ev_users where username=?'
    db.query(serUserSql, userinfo.username, (err, results) => {
            // 执行失败
            if (err) {
                return res.cc(err)
            }
            // 判断是否占用
            if (results.length > 0) {
                return res.cc('用户名已被占用,请更换用户名!')
            }
            // 请求接口
            return res.cc('请求成功! 用户名未被占用!', 0)
        })
        // res.send('reguser ok')
}