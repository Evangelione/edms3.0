(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[19],{iHNL:function(e,t,a){e.exports={checkBox:"checkBox___1hGS5"}},r48i:function(e,t,a){"use strict";a.r(t);a("DjyN");var r,n,l,s,i,c,o,m=a("NUBc"),p=(a("R9oj"),a("ECub")),d=(a("+L6B"),a("2/Rp")),h=(a("5NDa"),a("5rEg")),u=a("q1tI"),y=a.n(u),E=a("MuoO"),g=(a("2qtc"),a("kLXV")),b=(a("14J3"),a("BMrR")),f=a("jehZ"),v=a.n(f),N=(a("jCWc"),a("kPKH")),P=(a("sRBo"),a("kaz8")),I=(a("y8nQ"),a("Vl3Y")),L=a("iHNL"),S=a.n(L),x=(r=Object(E["connect"])(e=>{var t=e.partner,a=e.loading;return{partner:t,loading:a.models.partner}}),n=I["a"].create(),r(l=n((s=class extends u["Component"]{constructor(e){super(e),this.openInsertModal=(()=>{if(this.state.modalVisible)return!1;this.setState({modalVisible:!0},()=>{this.props.modify&&this.inquire()})}),this.closeInsertModal=(e=>{e&&e.stopPropagation(),this.setState({modalVisible:!1}),this.props.form.resetFields()}),this.inquire=(()=>{this.props.dispatch({type:"partner/inquirePartnerInfoById",payload:{id:this.props.modify}})}),this.handleSubmit=(e=>{e.preventDefault(),this.props.form.validateFieldsAndScroll((e,t)=>{if(!e){var a=this.props.modify,r=a?"updatePartnerInfoById":"insertPartner";a&&(t.id=a),this.props.dispatch({type:`partner/${r}`,payload:{form:t}}).then(()=>{this.closeInsertModal(),this.props.dispatch({type:"partner/fetchPartnerList",payload:{}})})}})}),this.state={modalVisible:!1}}render(){var e=this.state.modalVisible,t=this.props,a=t.children,r=t.form,n=t.loading,l=t.partner,s=l.menu_list,i=l.currentPartnerInfo,c=t.modify,o=r.getFieldDecorator,m={labelCol:{xs:{span:24},sm:{span:5}},wrapperCol:{xs:{span:24},sm:{span:18}}},p={wrapperCol:{xs:{span:24,offset:0},sm:{span:14,offset:6}}},u=s.map((e,t)=>{return y.a.createElement(N["a"],{span:8,key:t},y.a.createElement(P["a"],{value:e.id},e.name))});return y.a.createElement("div",{style:{display:"inline-block"},onClick:this.openInsertModal},a,y.a.createElement(g["a"],{visible:e,title:c?"\u7f16\u8f91\u4f19\u4f34":"\u65b0\u589e\u4f19\u4f34",width:600,bodyStyle:{padding:"24px 60px"},footer:null,onCancel:this.closeInsertModal,maskClosable:!1},y.a.createElement(I["a"],{onSubmit:this.handleSubmit},y.a.createElement(I["a"].Item,v()({},m,{label:"\u4f19\u4f34\u540d\u79f0"}),o("name",{rules:[{required:!0}],initialValue:c?i.name:""})(y.a.createElement(h["a"],{placeholder:"\u8bf7\u8f93\u5165\u4f19\u4f34\u540d\u79f0"}))),y.a.createElement(I["a"].Item,v()({},m,{label:"\u8054\u7cfb\u65b9\u5f0f"}),o("mobile",{rules:[{required:!0}],initialValue:c?i.mobile:""})(y.a.createElement(h["a"],{placeholder:"\u8bf7\u8f93\u5165\u8054\u7cfb\u65b9\u5f0f"}))),c?null:y.a.createElement(I["a"].Item,v()({},m,{label:"\u767b\u5f55\u5bc6\u7801"}),o("pwd",{rules:[{required:!0}],initialValue:c?i.pwd:""})(y.a.createElement(h["a"],{placeholder:"\u8bf7\u8f93\u5165\u767b\u5f55\u5bc6\u7801"}))),y.a.createElement(I["a"].Item,v()({},m,{label:"\u89d2\u8272\u540d\u79f0"}),o("role_name",{rules:[{required:!0}],initialValue:c?i.role_name:""})(y.a.createElement(h["a"],{placeholder:"\u8bf7\u8f93\u5165\u89d2\u8272\u540d\u79f0"}))),y.a.createElement(I["a"].Item,v()({},m,{label:"\u89d2\u8272\u6743\u9650"}),o("role_menu",{initialValue:c?i.role_menu:[]})(y.a.createElement(P["a"].Group,{style:{width:"100%"}},y.a.createElement(b["a"],{className:S.a.checkBox},u)))),y.a.createElement(I["a"].Item,p,y.a.createElement(d["a"],{type:"primary",htmlType:"submit",loading:n},"\u786e\u5b9a"),y.a.createElement(d["a"],{className:"red-btn",style:{marginLeft:20,marginTop:20},onClick:this.closeInsertModal},"\u53d6\u6d88")))))}},l=s))||l)||l),B=x,C=a("mjZG"),k=a("3tTZ"),w=h["a"].Search,_=(i=Object(E["connect"])(e=>{var t=e.partner,a=e.loading;return{partner:t,loading:a.models.partner}}),i((o=class extends u["Component"]{constructor(e){super(e),this.fetchPartnerList=(()=>{this.props.dispatch({type:"partner/fetchPartnerList",payload:{}})}),this.fetchMenuList=(()=>{this.props.dispatch({type:"partner/fetchMenuList",payload:{}})}),this.searchPartnerList=(e=>{this.props.dispatch({type:"partner/fetchPartnerList",payload:{find_str:e}})}),this.changePartnerName=(e=>{this.props.dispatch({type:"partner/save",payload:{find_str:e.target.value}}),""===e.target.value&&this.searchPartnerList("")}),this.pageChange=(e=>{this.props.dispatch({type:"partner/fetchPartnerList",payload:{page:e,find_str:this.props.partner.find_str}})}),this.mapItem=(()=>{var e=this.state.managementStatus,t=this.props.partner,r=t.partnerList,n=t.partnerPage;return r.length?r.map((t,r)=>y.a.createElement("div",{className:"list-item",key:t.id},y.a.createElement("div",{className:"serial-num"},r+1),y.a.createElement("div",{className:"company-box"},y.a.createElement("div",null,y.a.createElement("img",{src:a("tTbt"),alt:""})),y.a.createElement("div",{className:"company-name",style:{color:t.enable-0?"#413857":"#ccc"}},t.role_name)),y.a.createElement("div",{className:"contact-box"},y.a.createElement("div",{className:"contact-name",style:{color:t.enable-0?"#7B7B7B":"#ccc"}},t.name),y.a.createElement("div",{className:"contact-phone",style:{color:t.enable-0?"#7B7B7B":"#ccc"}},t.mobile?t.mobile:"--")),y.a.createElement("div",{className:"sales-box"},y.a.createElement("div",{style:{visibility:"hidden"}},y.a.createElement("div",null,"\u9500\u552e\u989d"),y.a.createElement("div",{className:"sales-price"},t.xiaoshoue," \u5143")),y.a.createElement("div",{style:{visibility:"hidden"}},y.a.createElement("div",null,"\u9500\u552e\u91cf"),y.a.createElement("div",{className:"sales-num"},t.xiaoshouliang," \u5428")),e?t.enable-0?y.a.createElement(k["a"],{state:"disablePartner",id:t.id,page:n},y.a.createElement(d["a"],{className:"red-btn"},"\u7981\u7528")):y.a.createElement(k["a"],{state:"enablePartner",id:t.id,page:n},y.a.createElement(d["a"],{className:"green-btn"},"\u542f\u7528")):y.a.createElement(B,{modify:t.id},y.a.createElement(d["a"],{type:"primary"},"\u7f16\u8f91"))))):y.a.createElement(p["a"],null)}),this.state={managementStatus:!1}}componentWillMount(){this.fetchPartnerList(),this.fetchMenuList()}render(){var e=this.state.managementStatus,t=this.props.partner,a=t.partnerPage,r=t.partnerTotal,n=t.find_str;return y.a.createElement(y.a.Fragment,null,y.a.createElement("div",{className:"toolbar"},y.a.createElement(B,null,y.a.createElement(d["a"],{type:"primary"},"\u65b0\u589e\u4f19\u4f34")),e?y.a.createElement(d["a"],{className:"yellow-btn",style:{marginLeft:10},onClick:()=>this.setState({managementStatus:!e})},"\u5b8c\u6210"):y.a.createElement(d["a"],{type:"primary",style:{marginLeft:10},onClick:()=>this.setState({managementStatus:!e})},"\u4f19\u4f34\u7ba1\u7406"),y.a.createElement(w,{placeholder:"\u8bf7\u8f93\u5165\u4f19\u4f34\u540d\u8fdb\u884c\u67e5\u627e",enterButton:"\u67e5\u627e",value:n,onChange:this.changePartnerName,onSearch:this.searchPartnerList,style:{width:"25rem",height:"2.5rem",float:"right",marginTop:19}})),y.a.createElement("div",{style:{padding:24}},this.mapItem()),y.a.createElement("div",{style:{textAlign:"center",marginBottom:50}},y.a.createElement(m["a"],{current:a,total:r,pageSize:C["f"],onChange:this.pageChange})))}},c=o))||c);t["default"]=_}}]);