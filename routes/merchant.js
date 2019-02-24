var express = require('express');
var router = express.Router();
var companyController = require("../controller/merchant");
var multer = require("multer");

// 开始
var storage = multer.diskStorage({
    //第一个方法文件存储的位置
    destination: function (req, file, cb) {
      cb(null, './public/img')
    },
    //第二个是文件命名
    filename: function (req, file, cb) {
      cb(null, Date.now()+ '-' + file.originalname  )
    }
  })
  
var upload = multer({ storage: storage })
//规定当字段可以接受到的图片有多少张
var cpUpload = upload.fields([{ name: 'merchantLogo', maxCount: 1 }])
//结束

//增
router.post("/Addmerchant",cpUpload,companyController.Addmerchant)
//查
router.get("/merchantList",companyController.merchantList)
//改 
router.post("/modifyMerchant",cpUpload,companyController.modifyMerchant)

module.exports = router;