// 导入数据库操作模块
const db = require('../db/index')

// 导入处理密码模块
const bcrypt = require('bcryptjs')

/* ----------------获取用户信息处理函数------------- */

// 1.查询除用户密码的基本信息
exports.getUserInfo = (req, res) => {

    const sql = 'select id,username,nickname,email,user_pic from ev_users where id = ?'
        // 调用db.query()执行sql语句
        // 注意:req对象上的user属性，是 Token 解析成功，express-jwt中间件挂载上去的
    db.query(sql, req.query.id, (err, results) => {
        // 执行 sql 语句失败
        if (err) return res.cc(err)

        // 执行 sql 语句成功
        // console.log(results.length);
        // 如果查询到的结果不为1
        if (results.length !== 1) return res.cc('获取用户信息失败!')

        // 查询成功返回数据
        res.send({
            status: 0,
            message: '获取用户信息成功!',
            data: results[0]
        })

    })
}

// 2.更新用户信息基本信息模块
exports.updateUserInfo = (req, res) => {
    const sql = 'update ev_users set ? where id=?'
    db.query(sql, [req.body, req.user.id], (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('更新用户信息失败!')
        res.cc('更新用户信息成功!', 0)
    })
}

// 3.修改用户密码模块
exports.updateUserPwd = (req, res) => {
    // 查询用户是否存在
    const sql = 'select * from ev_users where id=?'
    db.query(sql, req.user.id, (err, results) => {
        // 查询出错
        if (err) return res.cc(err)
            // 查询不到用户
        if (results.length !== 1) return res.cc('查询用户密码失败!')

        // 判断旧密码是否正确
        const isTrue = bcrypt.compareSync(req.body.oldPwd, results[0].password)
        if (!isTrue) return res.cc('旧密码错误!')

        // 修改密码
        const sql = 'update ev_users set password=? where id=?'
            // 对新密码进行加密
        const newPwd = bcrypt.hashSync(req.body.newPwd)
        db.query(sql, [newPwd, req.user.id], (err, results) => {
            // 查询出错
            if (err) return res.cc(err)
                // 查询影响行数
            if (results.affectedRows !== 1) return res.cc('重置密码失败')
            res.send({
                status: 0,
                message: '修改密码成功'
            })
        })
    })

}

// 4.更换头像﻿ε≡٩(๑>₃<)۶ 一心向学
exports.updateAvatar = (req, res) => {
    const sql = 'update ev_users set user_pic=? where id=?'
    db.query(sql, [req.body.avatar, req.user.id], (err, results) => {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('修改头像失败!')
        res.cc('修改头像成功!', 0)
    })
}