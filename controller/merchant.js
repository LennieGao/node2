const companyModel = require("../model/merchant");
const AuthToken = require("../utils/Auth");
const Addmerchant = (req, res) => {

    let {
        merchantName,
        merchantAddress,
        merchantCost,
        merchantTell
    } = req.body
    let urlPath = req.files.merchantLogo[0].path.replace(/\\/g, "/").replace(/public/, "");

    companyModel.addCompany({
        merchantName,
        merchantAddress,
        merchantCost,
        merchantTell,
        merchantLogo: urlPath
    }, (result) => {
        if (result) {
            res.json({
                status: true,
                info: "添加成功"
            })
        } else {
            res.json({
                status: false,
                info: "添加失败"
            })
        }
    })

}

const merchantList = (req, res) => {
    let token = req.headers["x-token"];

    AuthToken.getToken(token, "BK1821", (err) => {

        if (err) {
            console.log("12345")
            res.json({
                status: false,
                info: "令牌失效"
            })
        } else {

            let {
                page,
                limit
            } = req.query;
            //分页
            companyModel.findCompany({
                page,
                limit
            }, (data) => {
                if (data.length > 0) {
                    //总条目数字
                    companyModel.findCompanyCount((result) => {
                        let count = result.length;
                        res.json({
                            status: true,
                            data: data,
                            count
                        })

                    })
                }

            })
        }
    })

}


const modifyMerchant = (req, res) => {
    let {
        merchantName,
        merchantAddress,
        merchantCost,
        merchantTell,
        _id
    } = req.body
    let urlPath = req.files.merchantLogo[0].path.replace(/\\/g, "/").replace(/public/, "");
    companyModel.updateCompany({
        _id
    }, {
        merchantName,
        merchantAddress,
        merchantCost,
        merchantTell,
        merchantLogo: urlPath
    }, (data) => {
        if (data) {
            res.json({
                status: true,
                info: "修改成功"
            })
        }
    })
}


module.exports = {
    Addmerchant,
    merchantList,
    modifyMerchant
}