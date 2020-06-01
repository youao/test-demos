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

router.get('/admin', async (ctx, next) => {
    const sql = 'SELECT * FROM `news`';
    const [data] = await con().execute(sql);
    ctx.response.body = env.render('admin.html', { data });
});

app.use(router.routes());
app.listen(1111);