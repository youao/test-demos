const Router = require("koa-router");
const router = new Router();
const admin = require("./admin");

router.get('/', async (ctx) => {
    await ctx.render('index.html');
});

module.exports = (app) => {
    app.use(router.routes());  
    app.use(admin.routes());
};