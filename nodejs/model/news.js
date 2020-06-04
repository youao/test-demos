const { con } = require("../db");

const timeToStr = time => {
    return new Date(+time).toLocaleString();
}

module.exports = {

    async findById(id) {
        const sql = 'SELECT * FROM `news` where `id`=?';
        const [rows] = await con().execute(sql, [id]);
        return rows[0];
    },

    async findByPage(page, pagesize) {
        const sql = 'SELECT * FROM `news` LIMIT ?,?';
        let [rows] = await con().execute(sql, [(page - 1) * pagesize, pagesize]);   
        rows.forEach(it => {
            it.update_time = timeToStr(it.update_time);
        });
        return rows;
    },

    async findAll() {
        const sql = 'SELECT * FROM `news`';
        const [rows] = await con().execute(sql);
        return rows;
    },

    async addOne(title, content) {
        const time = new Date().getTime();
        const sql = 'INSERT INTO news(`id`,`title`,`content`,`create_time`,`update_time`) VALUES(0,?,?,?,?)';
        const [rows] = await con().execute(sql, [title, content, time, time]);
        return rows.affectedRows ? rows.insertId : !1;
    },

    async upDate(title, content, id) {
        const time = new Date().getTime();
        const sql = 'UPDATE news SET `title` = ?,`content` = ?,`update_time` = ? WHERE `id` = ?';
        const [rows] = await con().execute(sql, [title, content, time, id]);
        return rows.affectedRows ? !0 : !1;
    },

    async delById(id) {
        const sql = 'DELETE FROM `news` where `id`=?';
        const [rows] = await con().execute(sql, [id]);
        return rows.affectedRows ? !0 : !1;
    },

};