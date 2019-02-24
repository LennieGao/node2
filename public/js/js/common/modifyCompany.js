function ModifyCompany(list){
    this.list = list;
    this.init();
  
}

ModifyCompany.prototype = {
    init:function(){
       this.itemClick();
       this.modifyClick();
    },
    itemClick:function(){
        
        this.list.each($.proxy(this.handleEach,this))

    },
    handleEach(i){

        this.list.eq(i).find("#js_ModifyCompany_btn").on("click",i,$.proxy(this.handleItemClick,this))
    },
    handleItemClick(e){
        
        var id = this.list.eq(e.data).attr("data-id");
        var merchantName = this.list.eq(e.data).find(".merchantName").text();
        var merchantAddress = this.list.eq(e.data).find(".merchantAddress").text();
        var merchantCost = this.list.eq(e.data).find(".merchantCost").text();
        var merchantTell = this.list.eq(e.data).find(".merchantTell").text();

        
        this.merchantName =  $("#Modify-merchantName")
        this.merchantName.val(merchantName)
        this.merchantAddress = $("#Modify-merchantAddress");
        this.merchantAddress.val( merchantAddress)
        this.merchantCost = $("#Modify-merchantCost") ;
        this.merchantCost.val(merchantCost);
        this.merchantTell = $("#Modify-merchantTell") ;
        this.merchantTell.val(merchantTell);
        this.merchantLogo = $("#Modify-merchantLogo");
        this.id =  $("#modify_model")
        this.id .attr("data-id",id);
    },
    modifyClick:function(){
        $("#js_ModifyCompany_btn").on("click",$.proxy(this.handleModifyClick,this))
    },
    handleModifyClick(){

        var formData = new FormData();
        formData.append("_id", this.id.attr("data-id"));
        formData.append("merchantName", this.merchantName.val());
        formData.append("merchantAddress", this.merchantAddress.val());
        formData.append("merchantCost", this.merchantCost.val());
        formData.append("merchantTell", this.merchantTell.val());
        formData.append("merchantLogo", this.merchantLogo[0].files[0]);
        console.log(this.merchantLogo[0].files[0])
        $.ajax({
            type:"post",
            url:"/merchant/modifyMerchant",
            contentType:false,
            processData:false,
            data:formData,
            error:alert(111),
            success:$.proxy(this.handleModifySucc,this)
        })

    },
    handleModifySucc(data){
       if(data.status){
           alert("修改成功");
           location.reload(true);
       }
    }
}
