function Login(container) {
    this.container = $(".box");
    this.init();
}
Login.Template = `
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
                <button type="submit" class="btn btn-default denglu">登陆</button>
                <a href="./html/register.html">点击注册</a>
            </div>
        </div>
    </form>
`

Login.prototype = {
    init: function () {
        this.createDom();
        this.userLogin();
    },
    createDom() {
        this.el = Login.Template;
        this.container.append(this.el)
    },

    userLogin() {
        this.container.find(".btn-default").on("click", $.proxy(this.handleLoginBtn, this))
    },

    handleLoginBtn() {
        var obj = {
            username: this.container.find("#inputEmail3").val(),
            password: this.container.find("#inputPassword3").val(),
        }

        $.ajax({
            type: "post",
            url: "/api/login",
            data: obj,
            success: $.proxy(this.handleLoginSucc, this),
        })
    },

    handleLoginSucc(data) {
        if (data.status) {
            alert(data.info);
            location.href="../../html/tabBar.html";
        } else {
            alert(data.info);
            location.reload(true);
        }
    }
}
new Login();