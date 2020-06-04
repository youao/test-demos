const Koa = require('koa');
const serve = require('koa-static');
const body = require('koa-body')
const views = require('koa-views');
const { initDB } = require('./db');
const initRouter = require("./routers");

initDB();

const app = new Koa();

app.use(body());
app.use(views(__dirname + '/views', {
    map: { html: 'nunjucks' }
}));
app.use(serve(__dirname + "/static"));

initRouter(app);
app.listen(1111);