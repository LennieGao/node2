function Page(){
    this.container = $("#header");
    this.init();
}

Page.prototype = {
    init:function(){
        this.create()
    },
    create(){
        this.header = new Header(this.container);
        // this.render = new TabBar().handleCompanyClick(new TabBar().handleGetCompanySucc)
    }
}


new Page();