const { newsModel } = require('../model');

module.exports = {

    async news(ctx) {
        const { page = 1, pageSize = 5 } = ctx.query;
        const data = await newsModel.findByPage(page, pageSize);
        const dataAll = await newsModel.findAll(page, pageSize);
        const total = dataAll.length;
        const totalPage = Math.ceil(total / pageSize);
        await ctx.render('news.html', { data, totalPage });
    },

    async view(ctx) {
        const { id } = ctx.query;
        if (!id) {
            return false;
        }
        const data = await newsModel.findById(id);
        await ctx.render('newsview.html', { data });
    },

};