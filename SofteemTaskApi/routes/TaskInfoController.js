const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const PageJson = require('../model/PageJson');
const upload = multer({
    dest: path.join(__dirname, "../uploadTaskFiles")
});
const TaskInfoService = require("../service/TaskInfoService");

//上传作业文件
router.post("/uploadTaskFiles", upload.single("taskFile"), (req, resp) => {
    var file = req.file;
    try {
        //如果文件夹不存在，则创建文件夹
        if (!fs.existsSync(path.join(__dirname, "../uploadTaskFiles"))) {
            fs.mkdirSync(path.join(__dirname, "../uploadTaskFiles"));
        }
        fs.renameSync(file.path, file.destination + "/" + file.filename.substr(-10) + file.originalname);
        resp.json(new PageJson("success", "文件上传成功", "/uploadTaskFiles/" + file.filename.substr(-10) + file.originalname));
    } catch (error) {
        resp.json(new PageJson("error", "服务器错误", error));
    }
});

//根据s_id获取学生作业
router.get("/findByS_id/:s_id/:pageIndex", async(req, resp) => {
    var params = { s_id, pageIndex } = req.params;
    var taskInfoService = new TaskInfoService();
    try {
        var pageList = await taskInfoService.findByS_id(params);
        resp.json(new PageJson("success", "获取成功", pageList))
    } catch (error) {
        resp.json(new PageJson("error", "服务器错误"));
    }
});


//提交作业
router.post("/addTaskInfo", async(req, resp) => {
    var params = { s_id, t_content, t_path } = req.body;
    var taskInfoService = new TaskInfoService();
    try {
        var result = await taskInfoService.addTaskInfo(params);
        if (result) {
            resp.json(new PageJson("success", "添加成功"));
        } else {
            resp.json(new PageJson("error", "添加失败"));
        }
    } catch (error) {
        resp.json(new PageJson("error", "服务器错误", error));
    }
});


module.exports = router;