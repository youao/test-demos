const Koa = require('koa');
const sever = require('koa-static');
const router = require('koa-router')();
const { createEnv } = require('./static/js/nunjucksEnv');
const { initDB, con } = require('./static/js/db');

initDB();

const app = new Koa();

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
    // const offset = (currentPage - 1) * PER_SIZE;
    // const limit = PER_SIZE;
    const sql = 'SELECT * FROM `news` LIMIT ?,?';
    const [data] = await con().execute(sql, [(page - 1) * 5, 5]);

    ctx.response.body = env.render('admin.html', { data });
});

router.get('/admin/newsAdd', async (ctx, next) => {
    ctx.response.body = env.render('addnews.html');
});

router.get('/admin/newsDel', async (ctx, next) => {
    const { id } = ctx.query;
    if (!id) {
        return false;
    }
    const sql = 'DELETE FROM `news` where `id`=?';
    const [res] = await con().execute(sql, [id]);
    // console.log(res);
    const status = res.affectedRows ? !0 : !1;
    ctx.body = JSON.stringify({
        status,
        msg: '删除' + (status ? '成功' : '失败')
    });
});

app.use(router.routes());
app.listen(1111);