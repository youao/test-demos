const { newsController } = require('../controller');
const Router = require("koa-router");
const router = new Router({
    prefix: "/news",
});

router.get('/', newsController.news);
router.get('/view', newsController.view);

module.exports = router;