const userModel = require("../model/user");

const crypto = require('crypto');

const AuthToken = require("../utils/Auth");

const register = (req,res)=>{
    let {username,password} = req.body;
    //需要判断用户名是否存在
    userModel.userFind({username},(result)=>{
        if(result){
            res.json({
                status:false,
                info:"用户名已存在"
            })
        }else{

            //创建加密模式 sha256  2
            const hash = crypto.createHash('sha256');
            //加密的数据  3
            hash.update(password);
            //加密的结果  4
            //console.log(hash.digest('hex'));
            userModel.userSave({username,password:hash.digest('hex')},(result)=>{
                if(result){
                    res.json({
                        status:true,
                        info:"注册成功"
                    })
                }
            })
        }
    })
}


const login = (req,res)=>{
    let {username,password} = req.body;

    userModel.userFind({username},function(result){
        if(result){
            const hash = crypto.createHash('sha256');
            hash.update(password);

            if(result.password == hash.digest('hex')){


                let payload = {
                    username,
                }
                let secret = "BK1821";

               res.cookie("token",AuthToken.setToken(payload,secret));
               res.cookie("user",username);


                res.json({
                    status:true,
                    info:"登陆成功",
                    user:username
                })
            }else{
                res.json({
                    status:false,
                    info:"密码错误"
                })
            }
        }else{
            //不存在
            res.json({
                status:false,
                info:"用户名不存在"
            })
        }
    })
}

module.exports = {
    register,
    login
}