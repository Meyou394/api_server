// 导入数据库操作模块
const db = require('../db/index')

// 查找文章分类模块
exports.getCates = (req, res) => {
    // 查找未被删除的文章分类,降序排列[DESC] 升序排列[asc]
    const sql = 'select * from ev_article_cate where is_delete=0 order by id'
    db.query(sql, (err, results) => {
            if (err) return res.cc(err)
            if (results.length === 0) return res.cc('未查找到文章分类!')
            res.send({
                status: 0,
                message: '获取文章分类成功!',
                data: results
            })
        })
        // res.send('ok')
}

// 新增文章分类
exports.addCates = (req, res) => {
    // 判断要插入的分类名称和别名是否已经存在
    // 如果存在,则不允插入
    const sql = 'select * from ev_article_cate where name=? or alias=?'
    db.query(sql, [req.body.name, req.body.alias], (err, results) => {
        // sql 语句执行出错
        if (err) return res.cc(err)
            // console.log(results);
            // 分类已经存在
        console.log(results.length);
        console.log(results);
        // 分类名称和分类别名分别被两条数据占用
        if (results.length === 2) return res.cc('分类名称和分类别名分别被两条数据占用!')
            // 分类名称和别名被一条数据占用
        if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) return res.cc('分类名称和别名被一条数据占用!')
            // 分类名称被占用
        if (results.length === 1 && results[0].name === req.body.name) return res.cc('分类名称被占用!')
            // 分类别名被占用
        if (results.length === 1 && results[0].alias === req.body.alias) return res.cc('分类别名被占用!')
            // [测试时候添加]   多于两条占用
        if (results.length !== 0) return res.cc('系统发生异常!请联系系统管理员!')
            // 定义插入文章分类sql语句 
        const sql = 'insert into ev_article_cate set ?'
            // console.log(req.body);
        db.query(sql, [req.body], (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('插入文章分类失败!')
            res.cc('插入成功!', 0)
        })
    })

}

// 删除文章分类
exports.delCates = (req, res) => {
    // is_delete默认为0,表示为删除, 修改为1表示删除
    const sql = 'update ev_article_cate set is_delete=1 where id=? and is_delete=0'
    db.query(sql, req.params.id, (err, results) => {
        if (err) return res.cc(err)
        console.log(results);
        if (results.affectedRows !== 1) return res.cc('删除文章分类失败!  分类不存在!')
        res.cc('删除文章分类成功!', 0)
    })
}

// 根据id查找文章分类
exports.getCatesById = (req, res) => {
    const sql = 'select * from ev_article_cate where is_delete=0 and id=?'
    console.log(req.query);
    db.query(sql, req.query.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('根据ID查找文章分类失败!')
        res.send({
            status: 0,
            message: '查找文章分类成功!',
            data: results[0]
        })
    })
}

// id更改
exports.updateCatesById = (req, res) => {
    // 判断文章分类名称和别名是否已经存在
    const sql = "select * from ev_article_cate where id!=? and (name=? or alias=?)"
    db.query(sql, [req.body.id, req.body.name, req.body.alias], (err, results) => {
        if (err) return res.cc(err)
            // 分类名称和分类别名分别被两条数据占用
        if (results.length === 2) return res.cc('分类名称和分类别名分别被两条数据占用!')
            // 分类名称和别名被一条数据占用
        if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) return res.cc('分类名称和别名被一条数据占用!')
            // 分类名称被占用
        if (results.length === 1 && results[0].name === req.body.name) return res.cc('分类名称被占用!')
            // 分类别名被占用
        if (results.length === 1 && results[0].alias === req.body.alias) return res.cc('分类别名被占用!')
            // [测试时候添加]   多于两条占用
        if (results.length !== 0) return res.cc('系统发生异常!请联系系统管理员!')

        // 修改未被删除的文章分类
        const sql = 'update ev_article_cate set ? where is_delete=0 and id=?'
        db.query(sql, [req.body, req.body.id], (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('修改:根据ID修改文章分类失败!')
            res.cc('修改:根据id修改文章分类成功!', 0)
        })
    })

}