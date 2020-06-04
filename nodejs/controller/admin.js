const { newsModel } = require('../model');

module.exports = {

    async news(ctx) {
        const { page = 1,  pageSize = 5} = ctx.query;
        const data = await newsModel.findByPage(page, pageSize);
        await ctx.render('admin.html', { data });
    },
    
    async newsView(ctx) {
        const { id } = ctx.query;
        if (!id) {
            return false;
        }
        const data = await newsModel.findById(id);
        await ctx.render('addnews.html', { data });
    },

    async newsAdd(ctx) {
        await ctx.render('addnews.html');
    },

    async newsAddSub(ctx) {
        const { title, content } = ctx.request.body;
        const id = await newsModel.addOne(title, content);
        const status = !!id;
        ctx.body = JSON.stringify({
            status,
            data: { id },
            msg: '添加' + (status ? '成功' : '失败')
        });
    },

    async newsUpdateSub(ctx) {
        const { title, content, id } = ctx.request.body;
        const status = await newsModel.upDate(title, content, id);
        ctx.body = JSON.stringify({
            status,
            msg: '更新' + (status ? '成功' : '失败')
        });
    },

    async newsDel(ctx) {
        const { id } = ctx.query;
        if (!id) {
            return false;
        }
        const status = await newsModel.delById(id);
        ctx.body = JSON.stringify({
            status,
            msg: '删除' + (status ? '成功' : '失败')
        });
    }

  };