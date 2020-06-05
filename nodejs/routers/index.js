const Router = require("koa-router");
const router = new Router();
const admin = require("./admin");
const news = require("./news");

router.get('/', async (ctx) => {
    // await ctx.render('index.html');
    ctx.response.redirect('/news');
});

module.exports = (app) => {
    app.use(router.routes());  
    app.use(admin.routes());
    app.use(news.routes());
};