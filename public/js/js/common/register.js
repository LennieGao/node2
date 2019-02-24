function Register(container) {
    this.container = $(".box");
    this.init();
}

Register.Template = `
    <form class="form-horizontal">
        <h2>LennieGao</h2>
        <div class="form-group yhm">
            <label for="inputEmail3" class="col-sm-2 control-label">用户名</label>
            <div class="col-sm-10">
                <input type="text" class="form-control" id="inputEmail3" placeholder="请输入用户名">
            </div>
        </div>
        <div class="form-group mima">
            <label for="inputPassword3" class="col-sm-2 control-label">密码</label>
            <div class="col-sm-10">
                <input type="password" class="form-control" id="inputPassword3" placeholder="请输入密码">
            </div>
        </div>
        <div class="form-group">
            <div class="col-sm-offset-2 col-sm-10">
                <button type="submit" class="btn btn-default zhuce">注册</button>
            </div>
        </div>
    </form>
`

Register.prototype = {
    init: function () {
        this.createDom();
        this.handleRegisterClick();
    },
    createDom() {
        this.el = Register.Template;
        this.container.append(this.el)
    },
    handleRegisterClick() {
        this.container.find(".zhuce").on("click", $.proxy(this.handleClickCb, this))
    },
    handleClickCb() {
        
        var username = this.container.find("#inputEmail3").val();
        var password = this.container.find("#inputPassword3").val();
        //alert(username+password);

        $.ajax({
            type: "post",
            url: "/api/register",
            data: {
                username,
                password,
            },
            //error:alert(222),
            success: $.proxy(this.handleRegisterSucc, this)
        })
    },
    handleRegisterSucc(data) {
        if (data.status) {
            alert("注册成功");
            location.href="../../../index.html";
        }else{
            alert("注册失败");
            location.reload(true);
        }
    }
}
new Register();