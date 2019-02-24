function TabBar() {
    this.container = $("#tabBar");
    this.detailsContent = $(".detailsContent");
    this.init();
}

TabBar.Template = `
    <ul class="tabNav">
        <li>
            <a href="##">系统首页</a>
        </li>
        <li>
            <a href="##">商家管理</a>
            <ul>
                <li><a href="##" id="js_company_list">商家列表</a></li>
                <li><a href="##" id="js_add_company">新增商家</a></li>
            </ul>
        </li>
    </ul>
`;
TabBar.prototype = {
    init: function () {
        this.createDom();
        this.tabToggle();
        this.Addmerchant();
        this.companyList();
        // this.schart();
    },
    createDom: function () {
        this.el = $("<div></div>");
        this.el.append(TabBar.Template);
        this.container.append(this.el);
    },
    tabToggle: function () {
        this.el.find(".tabNav>li").children(0).on("click", $.proxy(this.handleTabClick))
    },
    handleTabClick: function () {
        $(this).next().slideToggle();
    },
    Addmerchant: function () {
        this.el.find("#js_add_company").on("click", $.proxy(this.handleAdd, this))
    },
    handleAdd: function () {
        this.detailsContent.load("../../html/Addmerchant.html", $.proxy(this.handleSucc, this));
    },
    handleSucc: function () {

        $("#js_addCompany_btn").on("click", $.proxy(this.handleAddmerchant, this))
    },
    //添加公司
    handleAddmerchant: function () {

        this.merchantName = $("#merchantName");
        this.merchantAddress = $("#merchantAddress");
        this.merchantCost = $("#merchantCost");
        this.merchantTell = $("#merchantTell");
        this.merchantLogo = $("#merchantLogo");

        //模拟form表单提交
        var formData = new FormData();

        formData.append("merchantName", this.merchantName.val());
        formData.append("merchantAddress", this.merchantAddress.val());
        formData.append("merchantCost", this.merchantCost.val());
        formData.append("merchantTell", this.merchantTell.val());
        formData.append("merchantLogo", this.merchantLogo[0].files[0]);

        $.ajax({
            type: "post",
            url: "/merchant/Addmerchant",
            data: formData,
            contentType: false,
            processData: false,
            // error:alert(111),
            success: $.proxy(this.handleAddSucc, this)
        })
    },
    handleAddSucc: function (data) {
        if (data.status) {
            alert("添加成功");
            this.merchantName.val("")
            this.merchantAddress.val("")
            this.merchantCost.val("")
            this.merchantTell.val("")
            this.merchantLogo.val("")
        }
    },
    //分页开始
    companyList: function () {
        //当点击公司列表的时候 触发了一个函数 handleCompanyClick
        $("#js_company_list").on("click",this.handleGetCompanySucc,$.proxy(this.handleCompanyClick, this))
    },
    handleCompanyClick(params) {
      
        //清空 detailsContent
        this.detailsContent.text("");

        //获取数据 第一次获取数据5条数据 需要将这个5条数据渲染到页面上handleGetCompanySucc
        $.ajax({
            type: "get",
            url: "/merchant/merchantList",
            headers:{
                "X-Token":Cookies.get("token")
            },
            data: {
                page: this.page,
                limit: 5
            },
            success: $.proxy(Object.prototype.toString.call(params) == "[object Function]"?params:params.data, this)
        })
    },
    handleGetCompanySucc(data) {
        if(data.status){
            //渲染到页面上
             this.render(data);
        
            //分页页码
            //new LayPage().init(this,data);
        }else{
            alert(data.info);
        }
    },
    handleGetCompanyPageSucc(data) {
       if(data.status){
            this.render(data);
       }else{
            alert(data.info);
       }

    },
    render(data){
        var str = "";
        for (var i = 0; i < data.data.length; i++) {
            str += `
            <ul class="list-group" data-id=${data.data[i]._id}>
                <li class="list-group-item merchantLogo"><img src="http://localhost:3000${data.data[i].merchantLogo}" /></li>
                <li class="list-group-item merchantName">${data.data[i].merchantName}</li>
                <li class="list-group-item merchantAddress">${data.data[i].merchantAddress}</li>
                <li class="list-group-item merchantCost">${data.data[i].merchantCost}</li>
                <li class="list-group-item merchantTell">${data.data[i].merchantTell}</li>
                <li class="list-group-item"><button type="button" id="js_ModifyCompany_btn">编辑</button></li>
                <li class="list-group-item"><button type="button" id="js_ModifyCompany_btn">查看</button></li>
            </ul>
            `
        }
        this.detailsContent.html(str);
        var merchantList = $(".list-group");
        new ModifyCompany(merchantList);


    },
    //分页结束
   
}

 new TabBar()



