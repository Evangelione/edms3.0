(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[7],{hrJo:function(e,a,t){"use strict";t.r(a);t("DjyN");var l,n,s,i,r,c,o,m=t("NUBc"),p=(t("Q9mQ"),t("diRs")),d=(t("DZo9"),t("8z0m")),h=(t("+L6B"),t("2/Rp")),u=(t("R9oj"),t("ECub")),E=(t("5NDa"),t("5rEg")),g=t("q1tI"),y=t.n(g),b=t("MuoO"),v=(t("2qtc"),t("kLXV")),C=(t("6UJt"),t("DFOY")),f=t("pVnL"),x=t.n(f),L=(t("y8nQ"),t("Vl3Y")),I=(t("OaEy"),t("2fM7")),N=(t("O3gP"),t("lrIw")),_=N["a"].Option,w=I["a"].Option,k=(l=Object(b["connect"])(e=>{var a=e.global,t=e.loading;return{global:a,loading:t.models.client}}),n=L["a"].create(),l(s=n((i=class extends g["Component"]{constructor(e){super(e),this.openInsertModal=(()=>{if(this.state.modalVisible)return!1;this.setState({modalVisible:!0}),this.props.dispatch({type:"global/inquireCascadeOptions",payload:{module:"cust"}})}),this.closeInsertModal=(e=>{e&&e.stopPropagation(),this.setState({modalVisible:!1}),this.props.form.resetFields()}),this.loadData=(e=>{var a=e[e.length-1];a.loading=!0,this.props.dispatch({type:"global/inquireCascadeOptions",payload:{module:"cust",district_name:a.value,targetOption:a}}).then(()=>{})}),this.handleChange=(e=>{console.log(`selected ${e}`)}),this.handleSubmit=(e=>{e.preventDefault(),this.props.form.validateFieldsAndScroll((e,a)=>{if(!e){var t={province:a.area_arr[0],city:a.area_arr[1],area:a.area_arr[2]||""};delete a.area_arr,Object.assign(a,t),this.props.dispatch({type:"client/insertClient",payload:{form:a}}).then(()=>{this.closeInsertModal(),this.props.dispatch({type:"client/fetchClientList",payload:{}})})}})}),this.state={modalVisible:!1,autoCompleteResult:[]}}render(){var e=this.state,a=e.modalVisible,t=e.autoCompleteResult,l=this.props,n=l.children,s=l.form,i=l.global,r=l.loading,c=s.getFieldDecorator,o=i.cascadeOptions,m={labelCol:{xs:{span:24},sm:{span:6}},wrapperCol:{xs:{span:24},sm:{span:14}}},p={wrapperCol:{xs:{span:24,offset:0},sm:{span:14,offset:6}}},d=t.map(e=>y.a.createElement(_,{key:e},e));return y.a.createElement("div",{style:{display:"inline-block"},onClick:this.openInsertModal},n,y.a.createElement(v["a"],{visible:a,title:"\u65b0\u589e\u5ba2\u6237",width:600,bodyStyle:{padding:"24px 60px"},footer:null,onCancel:this.closeInsertModal,maskClosable:!1},y.a.createElement(L["a"],{onSubmit:this.handleSubmit},y.a.createElement(L["a"].Item,x()({},m,{label:"\u7eb3\u7a0e\u4eba\u8bc6\u522b\u53f7"}),c("tax_number",{rules:[{required:!0}]})(y.a.createElement(E["a"],{placeholder:"\u8bf7\u8f93\u5165\u7eb3\u7a0e\u4eba\u8bc6\u522b\u53f7"}))),y.a.createElement(L["a"].Item,x()({},m,{label:"\u516c\u53f8\u5168\u79f0"}),c("company_full_name",{rules:[{required:!0}]})(y.a.createElement(E["a"],{placeholder:"\u8bf7\u8f93\u5165\u516c\u53f8\u5168\u79f0"}))),y.a.createElement(L["a"].Item,x()({},m,{label:"\u516c\u53f8\u7b80\u79f0"}),c("company_name",{rules:[{required:!0}]})(y.a.createElement(E["a"],{placeholder:"\u8bf7\u8f93\u5165\u516c\u53f8\u7b80\u79f0"}))),y.a.createElement(L["a"].Item,x()({},m,{label:"\u516c\u53f8\u7c7b\u578b"}),c("company_flow",{initialValue:"1"})(y.a.createElement(I["a"],{style:{width:"100%"},onChange:this.handleChange},y.a.createElement(w,{value:"1"},"\u8d38\u6613\u5546"),y.a.createElement(w,{value:"2"},"\u96f6\u552e\u5546")))),y.a.createElement(L["a"].Item,x()({},m,{label:"\u7701\u5e02\u533a\u53bf"}),c("area_arr",{initialValue:[],rules:[{type:"array",message:"\u7701\u5e02\u533a\u53bf"}]})(y.a.createElement(C["a"],{options:o,loadData:this.loadData,placeholder:"\u8bf7\u9009\u62e9\u7701\u5e02\u533a\u53bf"}))),y.a.createElement(L["a"].Item,x()({},m,{label:"\u8be6\u7ec6\u5730\u5740"}),c("company_address")(y.a.createElement(E["a"],{placeholder:"\u8bf7\u8f93\u5165\u8be6\u7ec6\u5730\u5740"}))),y.a.createElement(L["a"].Item,x()({},m,{label:"\u5f00\u6237\u94f6\u884c"}),c("bank")(y.a.createElement(N["a"],{dataSource:d,placeholder:"\u8bf7\u9009\u62e9\u5f00\u6237\u94f6\u884c"},y.a.createElement(E["a"],null)))),y.a.createElement(L["a"].Item,x()({},m,{label:"\u94f6\u884c\u8d26\u53f7"}),c("bank_account")(y.a.createElement(E["a"],{placeholder:"\u8bf7\u8f93\u5165\u94f6\u884c\u8d26\u53f7"}))),y.a.createElement(L["a"].Item,x()({},m,{label:"\u8054\u7cfb\u4eba"}),c("contact",{rules:[{required:!0}]})(y.a.createElement(E["a"],{placeholder:"\u8bf7\u8f93\u5165\u8054\u7cfb\u4eba"}))),y.a.createElement(L["a"].Item,x()({},m,{label:"\u8054\u7cfb\u4eba\u7535\u8bdd"}),c("contact_phone",{rules:[{required:!0}]})(y.a.createElement(E["a"],{placeholder:"\u8bf7\u8f93\u5165\u8054\u7cfb\u4eba\u7535\u8bdd"}))),y.a.createElement(L["a"].Item,p,y.a.createElement(h["a"],{type:"primary",htmlType:"submit",loading:r},"\u786e\u5b9a"),y.a.createElement(h["a"],{className:"red-btn",style:{marginLeft:20,marginTop:20},onClick:this.closeInsertModal},"\u53d6\u6d88")))))}},s=i))||s)||s),O=k,q=t("usdK"),D=t("mjZG"),S=E["a"].Search,V=(r=Object(b["connect"])(e=>{var a=e.client,t=e.loading;return{client:a,loading:t.models.client}}),r((o=class extends g["Component"]{constructor(){super(...arguments),this.fetchClientList=(()=>{this.props.dispatch({type:"client/fetchClientList",payload:{}})}),this.searchClientList=(e=>{this.props.dispatch({type:"client/fetchClientList",payload:{customer_name:e}})}),this.changeCustomerName=(e=>{this.props.dispatch({type:"client/save",payload:{customer_name:e.target.value}}),""===e.target.value&&this.searchClientList("")}),this.pageChange=(e=>{this.props.dispatch({type:"client/fetchClientList",payload:{page:e,customer_name:this.props.client.customer_name}})}),this.upLoadExcel=(e=>{this.props.dispatch({type:"client/upLoadExcel",payload:{file:e}}).then(()=>{this.fetchClientList()})}),this.mapItem=(()=>{var e=this.props.client.clientList;return e.length?e.map((e,a)=>y.a.createElement("div",{className:"list-item",key:e.id,onClick:this.goClientDetail.bind(null,e.id,e.company_name)},y.a.createElement("div",{className:"serial-num"},a+1),y.a.createElement("div",{className:"company-box"},y.a.createElement("div",null,y.a.createElement("img",{src:t("tTbt"),alt:""})),y.a.createElement("div",{className:"company-name"},e.company_name)),y.a.createElement("div",{className:"contact-box"},y.a.createElement("div",{className:"contact-name"},e.user),y.a.createElement("div",{className:"contact-phone"},e.phone)),y.a.createElement("div",{className:"sales-box"},y.a.createElement("div",null,y.a.createElement("div",null,"\u9500\u552e\u989d"),y.a.createElement("div",{className:"sales-price"},e.xiaoshoue," \u5143")),y.a.createElement("div",null,y.a.createElement("div",null,"\u9500\u552e\u91cf"),y.a.createElement("div",{className:"sales-num"},e.xiaoshouliang," \u5428"))))):y.a.createElement(u["a"],null)}),this.goClientDetail=((e,a)=>{q["a"].push(this.props.location.pathname+`/${e}?company=${a}`)})}componentWillMount(){this.fetchClientList()}render(){var e=this.props.loading,a=this.props.client,t=a.clientPage,l=a.clientTotal,n=a.customer_name,s=y.a.createElement("div",null,"\u5bfc\u5165\u4fe1\u606f"),i=y.a.createElement(y.a.Fragment,null,y.a.createElement("div",null,y.a.createElement("p",null,"1. \u4e0a\u4f20\u4fe1\u606f\u6587\u4ef6\u65f6\uff0c\u8bf7\u4f7f\u7528excel\u6587\u4ef6\uff0c\u652f\u6301\u6587\u4ef6\u683c\u5f0f\u4e3a.xls\u6216\u8005.xlsx\uff1b"),y.a.createElement("p",null,"2. \u4fe1\u606f\u6587\u4ef6\u5185\u5bb9\uff0c\u8bf7\u4e25\u683c\u6309\u7167\u6a21\u677f\u6837\u5f0f\u586b\u5199\uff0c\u7ea2\u8272\u7684\u5b57\u6bb5\u5fc5\u987b\u586b\u5199\uff0c\u5176\u4f59\u5b57\u6bb5\u82e5\u6ca1\u6709\u5219\u53ef\u4ee5\u4e0d\u586b\uff1b"),y.a.createElement("p",null,"3. \u5bfc\u5165\u4fe1\u606f\u65f6\uff0c\u5982\u679c\u548c\u5df2\u6709\u7684\u4fe1\u606f\u76f8\u540c\uff0c\u5219\u5bfc\u5165\u540e\u81ea\u52a8\u66f4\u65b0\u5176\u4fe1\u606f\uff1b")),y.a.createElement("div",{style:{textAlign:"center"}},y.a.createElement(h["a"],{className:"light-btn"},"\u4e0b\u8f7d\u5ba2\u6237\u6a21\u7248"),y.a.createElement(d["a"],{accept:".xls,.xlsx",name:"excel",action:`${D["c"]}/index/cust/customer-import`,customRequest:this.upLoadExcel,showUploadList:!1},y.a.createElement(h["a"],{className:"light-btn",style:{marginLeft:20},loading:e},"\u5bfc\u5165\u5ba2\u6237")),y.a.createElement(h["a"],{className:"light-btn",style:{marginLeft:20}},"\u4e0b\u8f7d\u7ad9\u70b9\u6a21\u7248"),y.a.createElement(d["a"],{accept:".xls,.xlsx",name:"excel",action:`${D["c"]}/index/site/site-import`,customRequest:this.upLoadExcel,showUploadList:!1},y.a.createElement(h["a"],{className:"light-btn",style:{marginLeft:20},loading:e},"\u5bfc\u5165\u7ad9\u70b9"))));return y.a.createElement(y.a.Fragment,null,y.a.createElement("div",{className:"toolbar"},y.a.createElement(O,null,y.a.createElement(h["a"],{type:"primary"},"\u65b0\u589e\u5ba2\u6237")),y.a.createElement(p["a"],{placement:"bottomLeft",title:s,content:i,trigger:"click"},y.a.createElement(h["a"],{type:"primary",style:{marginLeft:10}},"\u5bfc\u5165\u4fe1\u606f")),y.a.createElement(S,{placeholder:"\u8bf7\u8f93\u5165\u5ba2\u6237\u540d\u8fdb\u884c\u67e5\u627e",enterButton:"\u67e5\u627e",value:n,onChange:this.changeCustomerName,onSearch:this.searchClientList,style:{width:"25rem",height:"2.5rem",float:"right",marginTop:19}})),y.a.createElement("div",{style:{padding:24}},this.mapItem()),y.a.createElement("div",{style:{textAlign:"center",marginBottom:50}},y.a.createElement(m["a"],{current:t,total:l,pageSize:D["f"],onChange:this.pageChange})))}},c=o))||c);a["default"]=V}}]);