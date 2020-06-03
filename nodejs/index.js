const Koa = require('koa');
const sever = require('koa-static');
const body = require('koa-body')
const router = require('koa-router')();
const { createEnv } = require('./static/js/nunjucksEnv');
const { initDB, con } = require('./static/js/db');

initDB();

const app = new Koa();

app.use(body());
app.use(sever('.'));

const env = createEnv('views', {
    watch: true,
    filters: {
        hex: function (n) {
            return '0x' + n.toString(16);
        }
    }
});

router.get('/', async (ctx, next) => {
    ctx.response.body = env.render('index.html');
});

router.get(['/admin', '/admin/news'], async (ctx, next) => {
    const { page = 1 } = ctx.query;
    const sql = 'SELECT * FROM `news` LIMIT ?,?';
    let [data] = await con().execute(sql, [(page - 1) * 5, 5]);

    data.forEach(it => {
        it.create_time = new Date(+it.create_time).toLocaleString();;
    })
    ctx.response.body = env.render('admin.html', { data });
});

router.get('/admin/newsView', async (ctx, next) => {
    const { id } = ctx.query;
    if (!id) {
        return false;
    }
    const sql = 'SELECT * FROM `news` where `id`=?';
    const [res] = await con().execute(sql, [id]);
    ctx.response.body = env.render('addnews.html', {
        data: res[0]
    });
});

router.get('/admin/newsAdd', async (ctx, next) => {
    ctx.response.body = env.render('addnews.html');
});

router.post('/admin/newsAddSub', async (ctx, next) => {
    const { title, content } = ctx.request.body;
    const time = new Date().getTime();
    const sql = 'INSERT INTO news(`id`,`title`,`content`,`create_time`,`update_time`) VALUES(0,?,?,?,?)';
    const [res] = await con().execute(sql, [title, content, time, time]);
    const status = res.affectedRows ? !0 : !1;
    ctx.body = JSON.stringify({
        status,
        data: {
            id: res.insertId
        },
        msg: '添加' + (status ? '成功' : '失败')
    });
});

router.post('/admin/newsUpdateSub', async (ctx, next) => {
    const { title, content, id } = ctx.request.body;
    const time = new Date().getTime();
    const sql = 'UPDATE news SET `title` = ?,`content` = ?,`update_time` = ? WHERE `id` = ?';
    const [res] = await con().execute(sql, [title, content, time, id]);
    const status = res.affectedRows ? !0 : !1;
    ctx.body = JSON.stringify({
        status,
        msg: '更新' + (status ? '成功' : '失败')
    });
});

router.get('/admin/newsDel', async (ctx, next) => {
    const { id } = ctx.query;
    if (!id) {
        return false;
    }
    const sql = 'DELETE FROM `news` where `id`=?';
    const [res] = await con().execute(sql, [id]);
    const status = res.affectedRows ? !0 : !1;
    ctx.body = JSON.stringify({
        status,
        msg: '删除' + (status ? '成功' : '失败')
    });
});

app.use(router.routes());
app.listen(1111);