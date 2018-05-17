const DBUtil = require("../utils/DBUtil");
const PageList = require("../model/PageList");
class TaskInfoService {
    addTaskInfo({ s_id, t_content, t_path }) {
            return new Promise((resolve, reject) => {
                var conn = DBUtil.getConn();
                var strSql = "insert into task_info (t_Date, s_id, t_content, t_path, isDel) values (?,?,?,?,?)";
                conn.query(strSql, [new Date(), s_id, t_content, t_path, false], (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result.affectedRows > 0 ? true : false);
                    }
                    conn.end();
                })
            });
        }
        //根据学号来查询学生的作业
    findByS_id({ s_id, pageIndex }) {
        return new Promise((resolve, reject) => {
            var conn = DBUtil.getConn();
            var strSql = "select * from task_info where s_id=? and isDel=false limit ?,?";
            var strCountSql = "select count(*) 'sumCount' from task_info where isDel=false and s_id=?";
            conn.query(strSql + ";" + strCountSql, [s_id, (pageIndex - 1) * 10, 10, s_id], (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    var pageList = new PageList(pageIndex, result[1][0].sumCount, result[0]);
                    resolve(pageList);
                }
            });
        });
    }
}

module.exports = TaskInfoService;