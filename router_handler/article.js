// 导入数据库模块
const db = require('../db/index')
const path = require('path');
const { syncBuiltinESMExports } = require('module');

// 使用multer解析表单数据
// 使用express.urlencoded()中间件无法解析multipart/form-data格式的请求提数据
exports.addArticle = (req, res) => {
    // 验证是否上传封面
    console.log(req.file);
    // if (!req.file || req.file.fieldname !== 'cover_img') return res.cc('文章封面是必选参数!')
    if (!req.file) return res.cc('文章封面是必选参数!')

    // 验证数据通过
    // 处理文章的信息对象
    const articleinfo = {
        ...req.body,
        // 文章封面路径
        cover_img: path.join('/uploads', req.file.filename),
        pub_date: new Date(),
        author_id: req.user.id
    }
    console.log(articleinfo);

    // 发布文章sql语句
    const sql = 'insert into ev_articles set ?'
    db.query(sql, articleinfo, (err, results) => {
            // 发生错误
            if (err) return res.cc(err)
                // 为发生错误
                // 判断sql有没有执行成功
            if (results.affectedRows !== 1) return res.cc('发布文章失败!')
            res.cc('发布文章成功!', 0)
        })
        // res.send('ok')
}