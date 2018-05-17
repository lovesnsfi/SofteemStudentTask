const DBUtil = require("../utils/DBUtil");

class StuInfoServie {
    //登陆
    checkLogin({ s_id, s_tel }) {
        return new Promise((resolve, reject) => {
            var conn = DBUtil.getConn();
            var strSql = "select * from stu_info where s_id=? and s_tel=? and isDel=false ";
            conn.query(strSql, [s_id, s_tel], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
                conn.end();
            });
        });
    }

    //注册
    register({ s_id, s_name, s_sex, s_qq, s_tel, s_major, s_class, s_local }) {
        return new Promise((resolve, reject) => {
            var conn = DBUtil.getConn();
            var strInsertSql = "insert into stu_info (s_id, s_name, s_sex, s_qq, s_tel, s_major, s_class, s_local,isDel) values (?,?,?,?,?,?,?,?,?)";
            conn.query(strInsertSql, [s_id, s_name, s_sex, s_qq, s_tel, s_major, s_class, s_local, false], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(result.affectedRows > 0 ? true : false);
                }
            })
        });
    }
}



module.exports = StuInfoServie;