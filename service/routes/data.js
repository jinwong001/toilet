var express = require('express');
var router = express.Router();
var fs = require("fs");
var PATH = "./public/data/";


/* GET home page. */
//客户端调用
router.get('/read', function (req, res, next) {

    var type = req.param("type") || "";
    fs.readFile(PATH + type + '.json', function (err, data) {
        if (err) {
            return res.send({status: 0, info: "读取文件失败"});
        }

        var COUNT = 50;
        var obj = [];
        try {
            obj = JSON.parse(data.toString());
        } catch (e) {
            obj = [];
        }
        if (obj.length > COUNT) {
            obj = obj.slice(0, COUNT);
        }

        return res.send({status: 0, data: obj});
    });
});

//文件写入，服务端调用
router.post("/write", function (req, res, next) {
    var type = req.param("type") || "";
    var url = req.param('url') || '';
    var title = req.param('title') || '';
    var img = req.param('img') || '';
    if (!type || !url || !title || !img) {
        return res.send({status: 0, info: "提交字段不全"});
    }

    var path = PATH + type + '.json';
    fs.readFile(path, function (err, data) {
        if (err) {
            return res.send({status: 0, info: "读取文件失败"});
        }

        var arr = JSON.parse(data.toString());
        var obj = {
            img: img,
            url: url,
            title: title,
            id: guidGenerate(),
            time: new Date()
        }

        arr.splice(0, 0, obj);
        //写入文件
        var newData = JSON.stringify(arr);
        fs.writeFile(path, newData, function (err) {
            if (err) {
                return res.send({status: 0, info: "写入文件失败"})
            }

            return res.send({status: 1, data: arr});

        })
    })
})

router.post("/writeConfig", function (req, res, next) {

    //TODO:后期进行提交数据的验证
    //防xss攻击 xss
    // npm install xss
    // require('xss')
    // var str = xss(name);
    var data = req.body.data;
    var obj = JSON.parse(data);
    var newData = JSON.stringify(obj);
    fs.write(PATH + "config.json", newData, function (err) {
        if (err) {
            return res.send({status: 0, info: "写入失败"});
        }

        return res.send({status: 1, data: obj});
    })
});


//guid
function guidGenerate() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    }).toUpperCase();
}


module.exports = router;
