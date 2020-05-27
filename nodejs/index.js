const Koa = require('koa');
const sever = require('koa-static');
const router = require('koa-router')();
const nunjucks = require('nunjucks');

const app = new Koa();

app.use(sever('.'));

function createEnv(path, opts) {
    var
        autoescape = opts.autoescape === undefined ? true : opts.autoescape,
        noCache = opts.noCache || false,
        watch = opts.watch || false,
        throwOnUndefined = opts.throwOnUndefined || false,
        env = new nunjucks.Environment(
            new nunjucks.FileSystemLoader(path, {
                noCache: noCache,
                watch: watch,
            }), {
                autoescape: autoescape,
                throwOnUndefined: throwOnUndefined
            });
    if (opts.filters) {
        for (var f in opts.filters) {
            env.addFilter(f, opts.filters[f]);
        }
    }
    return env;
}

var env = createEnv('views', {
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
    ctx.response.body = env.render('admin.html');
});

app.use(router.routes());
app.listen(1111);