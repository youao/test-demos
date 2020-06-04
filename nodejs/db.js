const mysql = require("mysql2/promise");

let connection;
module.exports = {
  async initDB() {
    // 连接到数据库
    connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "123",
      database: "nodejs03",
    });
  },

  con() {
    return connection;
  },
};
