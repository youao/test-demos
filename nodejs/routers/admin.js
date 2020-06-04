const { adminController } = require('../controller');
const Router = require("koa-router");
const router = new Router({
    prefix: "/admin",
});

router.get(['/', '/news'], adminController.news);
router.get('/newsView', adminController.newsView);
router.get('/newsAdd', adminController.newsAdd);
router.post('/newsAddSub', adminController.newsAddSub);
router.post('/newsUpdateSub', adminController.newsAddSub);
router.get('/newsDel', adminController.newsDel);

module.exports = router;