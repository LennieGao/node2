const mongoose = require("../utils/database").mongoose;

const Company = mongoose.model("dbJob", {
    "merchantLogo": String,
    "merchantName": String,
    "merchantAddress": String,
    "merchantCost": String,
    "merchantTell": String
})


const addCompany = (companyInfo, cb) => {
    let company = new Company(companyInfo);
    company.save().then((result) => {
        cb(result)
    })
}


//分页companyInfo = {page:"",limit:""}
const findCompany = (companyInfo, cb) => {
    Company.find().skip((companyInfo.page - 1) * companyInfo.limit).limit(Number(companyInfo.limit)).then((data) => {
        cb(data);
    })
}

//总条目数
const findCompanyCount = (cb) => {
    Company.find().then((data) => {
        cb(data);
    })
}

const updateCompany = (conpanyId, modifyCompany, cb) => {

    Company.update(conpanyId, {
        $set: modifyCompany
    }, ).then((result) => {
        cb(result)
    })
}

module.exports = {
    addCompany,
    findCompany,
    findCompanyCount,
    updateCompany
}