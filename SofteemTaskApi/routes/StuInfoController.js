const express = require('express');
const router = express.Router();
const PageJson = require("../model/PageJson");
const StuInfoService = require("../service/StuInfoService");

//检测登陆 
router.post("/checkLogin", async(req, resp) => {
    var params = { s_id, s_tel } = req.body;
    var stuInfoService = new StuInfoService();
    try {
        var result = await stuInfoService.checkLogin(params);
        if (result.length > 0) {
            resp.json(new PageJson("success", "登陆成功", result[0]));
        } else {
            resp.json(new PageJson("error", "用户名或密码错误"));
        }
    } catch (error) {
        resp.json(new PageJson("error", "服务器错误"));
    }
});


//注册 
router.post("/Register", async(req, resp) => {
    var params = { s_id, s_name, s_sex, s_qq, s_tel, s_major, s_class, s_local } = req.body;
    try {
        var stuInfoService = new StuInfoService();
        var result = await stuInfoService.register(params);
        if (result) {
            resp.json(new PageJson("success", "注册成功"));
        } else {
            resp.json(new PageJson("error", "注册失败"));
        }
    } catch (error) {
        resp.json(new PageJson("error", "服务器错误"));
    }
})

module.exports = router;