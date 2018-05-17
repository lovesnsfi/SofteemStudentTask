const mysql = require('mysql');
class DBUtil {
    static getConn() {
        var conn = mysql.createConnection({
            host: "127.0.0.1",
            user: "root",
            password: "123456",
            database: "studenttask",
            port: 3306,
            multipleStatements: true
        });
        conn.connect();
        return conn;
    }
}

module.exports = DBUtil;