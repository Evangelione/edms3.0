(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[17],{"9a0a":function(e,t,a){"use strict";a.r(t);a("14J3");var i,l,n,s,r,c,o,m,d,u,S,h=a("BMrR"),p=(a("jCWc"),a("kPKH")),E=(a("Q9mQ"),a("diRs")),f=(a("DZo9"),a("8z0m")),v=(a("+L6B"),a("2/Rp")),y=a("q1tI"),b=a.n(y),I=a("MuoO"),g=a("mjZG"),C=a("gJaX"),N=a("jwVT"),_=a("42v0"),x=a.n(_),F=(a("2qtc"),a("kLXV")),k=(a("iQDF"),a("+eQT")),q=(a("5NDa"),a("5rEg")),w=a("pVnL"),L=a.n(w),B=a("MVZn"),O=a.n(B),Y=(a("y8nQ"),a("Vl3Y")),M=(a("OaEy"),a("2fM7")),j=a("j6FA"),D=M["a"].Option,V=(i=Object(I["connect"])(e=>{var t=e.order,a=e.loading;return{order:t,loading:a.models.order}}),l=Y["a"].create(),i(n=l((s=class extends y["Component"]{constructor(){super(...arguments),this.state={visible:!1,clientSelectionStatus:!1,visibleClientInfo:!1,siteSelectionStatus:!1,visibleSiteInfo:!1,siteSelectionStatus2:!1,visibleSiteInfo2:!1,flag:!0,currentClientInfo:{},currentSiteInfo:{},currentSiteInfo2:{},currentSiteNum:1},this.changeType=(e=>{"2"===e?this.setState({flag:!1}):this.setState({flag:!0})}),this.getItemsValue=(()=>{var e=!1;return this.props.form.validateFieldsAndScroll((t,a)=>{a.customer_id=this.state.currentClientInfo.id,a.site1_id=this.state.currentSiteInfo.id,this.state.currentSiteInfo2.id&&(a.site2_id=this.state.currentSiteInfo2.id),console.log(a),t?e=!1:(a.site1_time=a.site1_time.format("YYYY-MM-DD"),this.state.currentSiteInfo2.id&&(a.site2_time=a.site2_time.format("YYYY-MM-DD")),e=a)}),e}),this.deleteClientSelect=(()=>{this.setState({visible:!1,clientSelectionStatus:!1,visibleClientInfo:!1,siteSelectionStatus:!1,visibleSiteInfo:!1,siteSelectionStatus2:!1,visibleSiteInfo2:!1,flag:!0,currentClientInfo:{},currentSiteInfo:{},currentSiteInfo2:{},currentSiteNum:1}),this.props.dispatch({type:"order/save",payload:{siteSelectByCreatePlan:[]}})}),this.changeClientSelectionStatus=(()=>{this.setState({clientSelectionStatus:!this.state.clientSelectionStatus})}),this.changeSiteSelectionStatus=(()=>{this.setState({siteSelectionStatus:!this.state.siteSelectionStatus})}),this.changeSiteSelectionStatus2=(()=>{this.setState({siteSelectionStatus2:!this.state.siteSelectionStatus2})}),this.setClientInfo=((e,t)=>{this.setState({currentClientInfo:O()({},t.props)}),this.props.dispatch({type:"order/inquireSiteSelectInfoByCreatePlan",payload:{id:e}}).then(()=>{this.setState({visibleClientInfo:!0})})}),this.setSiteInfo=((e,t)=>{this.setState({currentSiteInfo:O()({},t.props)}),this.setState({visibleSiteInfo:!0})}),this.setSiteInfo2=((e,t)=>{this.setState({currentSiteInfo2:O()({},t.props)}),this.setState({visibleSiteInfo2:!0})}),this.parseNumber=((e,t,a)=>{var i=a.target.value;if(""===i)return!1;isNaN(i)&&(i=0);var l=Object(j["a"])(i,t);this.props.form.setFieldsValue({[e]:l})}),this._addSiteField=(()=>{if(this.props.extraSite>3)return!1;this.setState({currentSiteNum:this.state.currentSiteNum+1}),this.props.addSiteField()}),this._removeSiteField=(()=>{if(this.state.extraSite<0)return!1;this.setState({currentSiteNum:this.state.currentSiteNum-1}),this.props.removeSiteField()})}render(){var e=this.state,t=e.clientSelectionStatus,a=e.visibleClientInfo,i=e.siteSelectionStatus,l=e.visibleSiteInfo,n=e.siteSelectionStatus2,s=e.visibleSiteInfo2,r=e.flag,c=e.currentClientInfo,o=e.currentSiteInfo,m=e.currentSiteInfo2,d=e.currentSiteNum,u=this.props,S=u.form.getFieldDecorator,E=u.order,f=E.clientSelectByCreatePlan,y=E.siteSelectByCreatePlan,I=u.extraSite,C=u.removeClientField,N={labelCol:{xs:{span:24},sm:{span:3}},wrapperCol:{xs:{span:24},sm:{span:16}}},_={labelCol:{xs:{span:24},sm:{span:8}},wrapperCol:{xs:{span:24},sm:{span:15}}};return b.a.createElement(b.a.Fragment,null,b.a.createElement("div",{className:"modal-line",style:{width:828,marginLeft:"-12px",marginBottom:24}}),b.a.createElement(h["a"],{style:{position:"relative"}},b.a.createElement(g["d"],{type:"icon-icon-test109",className:"delete-icon",onClick:C}),a?b.a.createElement(h["a"],{style:{marginBottom:25}},b.a.createElement(p["a"],{span:3},b.a.createElement("div",{style:{paddingLeft:31}},g["a"])),b.a.createElement(p["a"],{span:15,style:{marginLeft:9}},b.a.createElement("div",{className:x.a["site-select-info"]},b.a.createElement("div",null,b.a.createElement("div",null,b.a.createElement("div",{className:x.a["site-name"]},c.company_name,b.a.createElement("span",{className:x.a["blue-font"],onClick:()=>this.setState({visibleClientInfo:!1})},"\u66f4\u6539"),b.a.createElement("span",{className:x.a["delete-font"],onClick:this.deleteClientSelect},"\u5220\u9664")),b.a.createElement("div",null,c.contact," ",c.contact_phone)),b.a.createElement("div",null,b.a.createElement("div",null,"\u9884\u4ed8\u6b3e\u989d ",b.a.createElement("span",{className:x.a["red-font"]},c.balance,"\u5143")),b.a.createElement("div",null,"\u4fe1\u7528\u989d\u5ea6 ",b.a.createElement("span",{className:x.a["red-font"]},c.credit,"\u5143"))))))):b.a.createElement(Y["a"].Item,L()({label:g["a"]},N),S("customer_id",{rules:[{required:!0}]})(t?b.a.createElement(M["a"],{placeholder:"\u8bf7\u9009\u62e9\u5ba2\u6237",autoFocus:!0,defaultOpen:!0,onBlur:this.changeClientSelectionStatus,onSelect:this.setClientInfo},f.map(e=>{return b.a.createElement(D,L()({value:e.id,key:e.id},e),e.company_name)})):b.a.createElement(v["a"],{className:"btn-select",style:{width:"100%",height:41},onClick:this.changeClientSelectionStatus},"\u8bf7\u9009\u62e9\u5ba2\u6237")))),b.a.createElement(h["a"],null,b.a.createElement(p["a"],{span:9},b.a.createElement(Y["a"].Item,L()({label:"\u6536\u6b3e\u65b9\u5f0f"},_),S("payment_type",{initialValue:"1"})(b.a.createElement(M["a"],null,b.a.createElement(D,{value:"1"},"\u9884\u4ed8\u6b3e"),b.a.createElement(D,{value:"2"},"\u4fe1\u7528\u989d"))))),b.a.createElement(p["a"],{span:10,style:{width:"46.2%"}},b.a.createElement(Y["a"].Item,L()({label:"\u914d\u9001\u65b9\u5f0f"},_,{style:{marginLeft:10}}),S("delivery_type",{rules:[{required:!0}],initialValue:"1"})(b.a.createElement(M["a"],{placeholder:"\u8bf7\u9009\u62e9\u914d\u9001\u65b9\u5f0f",onChange:this.changeType},b.a.createElement(D,{value:"1"},"\u5356\u65b9\u914d\u9001"),b.a.createElement(D,{value:"2"},"\u4e70\u65b9\u81ea\u63d0"),b.a.createElement(D,{value:"3"},"\u6211\u65b9\u914d\u9001")))))),b.a.createElement(h["a"],null,b.a.createElement(p["a"],{span:9},b.a.createElement(Y["a"].Item,L()({label:"\u9500\u552e\u4ef7\u683c"},_),S("price",{rules:[{required:!0}]})(b.a.createElement(q["a"],{placeholder:"\u8bf7\u8f93\u5165\u91d1\u989d",onBlur:this.parseNumber.bind(null,"price",2),addonAfter:"\u5143/\u5428"})))),b.a.createElement(p["a"],{span:10,style:{width:"46.2%"}},b.a.createElement(Y["a"].Item,L()({label:"\u989d\u5916\u8d39\u7528"},_,{style:{marginLeft:10}}),S("extra_fee",{rules:[{required:!0}]})(b.a.createElement(q["a"],{placeholder:"\u8bf7\u8f93\u5165\u91d1\u989d",onBlur:this.parseNumber.bind(null,"extra_fee",2),addonAfter:"\u5143"}))))),b.a.createElement("div",{className:"modal-line",style:{width:828,marginLeft:"-12px",marginBottom:24}}),b.a.createElement(b.a.Fragment,null,b.a.createElement(h["a"],{style:{position:"relative"}},I<3?b.a.createElement(g["d"],{type:"icon-icon-test110",className:"add-icon",onClick:this._addSiteField}):null,l?b.a.createElement(h["a"],null,b.a.createElement(p["a"],{span:3},b.a.createElement("div",{style:{paddingLeft:31}},g["g"])),b.a.createElement(p["a"],{span:15,style:{marginLeft:9}},b.a.createElement("div",{className:x.a["site-select-info"]},b.a.createElement("div",null,b.a.createElement("div",null,b.a.createElement("div",{className:x.a["site-name"]},o.site_name,b.a.createElement("span",{className:x.a["blue-font"],onClick:()=>this.setState({visibleSiteInfo:!1})},"\u66f4\u6539"),b.a.createElement("span",{className:x.a["delete-font"],onClick:()=>this.setState({visibleSiteInfo:!1,siteSelectionStatus:!1,currentSiteInfo:{}})},"\u5220\u9664")),b.a.createElement("div",null,o.contact," ",o.contact_phone))),b.a.createElement("div",null,b.a.createElement("div",{className:x.a["blue-background"]},g["m"][o.site_type-1]),b.a.createElement("div",null,o.province," ",o.city," ",o.area," ",o.site_address))))):b.a.createElement(Y["a"].Item,L()({label:g["g"]},N),S("site1_id",{rules:[{required:r}]})(i?b.a.createElement(M["a"],{placeholder:"\u8bf7\u9009\u62e9\u7ad9\u70b9",autoFocus:!0,defaultOpen:!0,onBlur:this.changeSiteSelectionStatus,onSelect:this.setSiteInfo},y.map(e=>{return b.a.createElement(D,L()({value:e.id,key:e.id},e),e.site_name)})):b.a.createElement(v["a"],{className:"btn-select",style:{width:"100%",height:41},onClick:this.changeSiteSelectionStatus},"\u8bf7\u9009\u62e9\u7ad9\u70b9")))),b.a.createElement(h["a"],null,b.a.createElement(p["a"],{span:9},b.a.createElement(Y["a"].Item,L()({label:"\u8ba1\u5212\u6570\u91cf"},_),S("site1_quantity",{rules:[{required:r}]})(b.a.createElement(q["a"],{placeholder:"\u8bf7\u8f93\u5165\u6570\u91cf",onBlur:this.parseNumber.bind(null,"site1_quantity",3),addonAfter:"\u5428"})))),b.a.createElement(p["a"],{span:10,style:{width:"46.2%"}},b.a.createElement(Y["a"].Item,L()({label:"\u5378\u8d27\u65f6\u95f4"},_,{style:{marginLeft:10}}),S("site1_time")(b.a.createElement(k["a"],{suffixIcon:b.a.createElement(g["d"],{className:"time-icon",type:"icon-icon-test8"}),style:{width:"100%"}})))))),d>1?b.a.createElement(b.a.Fragment,null,b.a.createElement(h["a"],{style:{position:"relative"}},I<3?b.a.createElement(g["d"],{type:"icon-icon-test110",className:"add-icon",onClick:this._addSiteField}):null,b.a.createElement(g["d"],{type:"icon-icon-test109",className:"delete-icon",onClick:this._removeSiteField}),s?b.a.createElement(h["a"],null,b.a.createElement(p["a"],{span:3},b.a.createElement("div",{style:{paddingLeft:31}},g["g"])),b.a.createElement(p["a"],{span:15,style:{marginLeft:9}},b.a.createElement("div",{className:x.a["site-select-info"]},b.a.createElement("div",null,b.a.createElement("div",null,b.a.createElement("div",{className:x.a["site-name"]},m.site_name,b.a.createElement("span",{className:x.a["blue-font"],onClick:()=>this.setState({visibleSiteInfo2:!1})},"\u66f4\u6539"),b.a.createElement("span",{className:x.a["delete-font"],onClick:()=>this.setState({visibleSiteInfo2:!1,siteSelectionStatus2:!1,currentSiteInfo2:{}})},"\u5220\u9664")),b.a.createElement("div",null,m.contact," ",m.contact_phone))),b.a.createElement("div",null,b.a.createElement("div",{className:x.a["blue-background"]},g["m"][m.site_type-1]),b.a.createElement("div",null,m.province," ",m.city," ",m.area," ",m.site_address))))):b.a.createElement(Y["a"].Item,L()({label:g["g"]},N),S("site2_id",{rules:[{required:r}]})(n?b.a.createElement(M["a"],{placeholder:"\u8bf7\u9009\u62e9\u7ad9\u70b9",autoFocus:!0,defaultOpen:!0,onBlur:this.changeSiteSelectionStatus2,onSelect:this.setSiteInfo2},y.map(e=>{return b.a.createElement(D,L()({value:e.id,key:e.id},e),e.site_name)})):b.a.createElement(v["a"],{className:"btn-select",style:{width:"100%",height:41},onClick:this.changeSiteSelectionStatus2},"\u8bf7\u9009\u62e9\u7ad9\u70b9")))),b.a.createElement(h["a"],null,b.a.createElement(p["a"],{span:9},b.a.createElement(Y["a"].Item,L()({label:"\u8ba1\u5212\u6570\u91cf"},_),S("site2_quantity",{rules:[{required:r}]})(b.a.createElement(q["a"],{placeholder:"\u8bf7\u8f93\u5165\u6570\u91cf",onBlur:this.parseNumber.bind(null,"site2_quantity",3),addonAfter:"\u5428"})))),b.a.createElement(p["a"],{span:10,style:{width:"46.2%"}},b.a.createElement(Y["a"].Item,L()({label:"\u5378\u8d27\u65f6\u95f4"},_,{style:{marginLeft:10}}),S("site2_time")(b.a.createElement(k["a"],{suffixIcon:b.a.createElement(g["d"],{className:"time-icon",type:"icon-icon-test8"}),style:{width:"100%"}})))))):null)}},n=s))||n)||n),A=V,R=M["a"].Option,P=(r=Object(I["connect"])(e=>{var t=e.order,a=e.loading;return{order:t,loading:a.models.order}}),c=Y["a"].create(),r(o=c((m=class extends y["Component"]{constructor(){super(...arguments),this.state={visible:!1,clientSelectionStatus:!1,visibleClientInfo:!1,siteSelectionStatus:!1,visibleSiteInfo:!1,siteSelectionStatus2:!1,visibleSiteInfo2:!1,siteSelectionStatus3:!1,visibleSiteInfo3:!1,flag:!0,currentClientInfo:{},currentSiteInfo:{},currentSiteInfo2:{},currentSiteInfo3:{},extraClient:1,extraSite:1,currentSiteNum:1,maxQuantity:25,site1_quantity:0,site2_quantity:0,site3_quantity:0},this.showModal=(()=>{if(this.state.visible)return!1;this.setState({visible:!0}),this.props.dispatch({type:"order/fetchClientSelect",payload:{}});var e=JSON.parse(localStorage.getItem("userData"));e.trade_type}),this.hideModal=(e=>{e&&e.stopPropagation(),this.setState({visible:!1,clientSelectionStatus:!1,visibleClientInfo:!1,siteSelectionStatus:!1,visibleSiteInfo:!1,siteSelectionStatus2:!1,visibleSiteInfo2:!1,siteSelectionStatus3:!1,visibleSiteInfo3:!1,flag:!0,currentClientInfo:{},currentSiteInfo:{},currentSiteInfo2:{},currentSiteInfo3:{},extraClient:1,extraSite:1,currentSiteNum:1})}),this.changeClientSelectionStatus=(()=>{this.setState({clientSelectionStatus:!this.state.clientSelectionStatus})}),this.changeSiteSelectionStatus=(()=>{this.setState({siteSelectionStatus:!this.state.siteSelectionStatus})}),this.changeSiteSelectionStatus2=(()=>{this.setState({siteSelectionStatus2:!this.state.siteSelectionStatus2})}),this.changeSiteSelectionStatus3=(()=>{this.setState({siteSelectionStatus3:!this.state.siteSelectionStatus3})}),this.setClientInfo=((e,t)=>{this.setState({currentClientInfo:O()({},t.props)}),this.props.dispatch({type:"order/inquireSiteSelectInfoByCreatePlan",payload:{id:e}}).then(()=>{this.setState({visibleClientInfo:!0})})}),this.setSiteInfo=((e,t)=>{this.setState({currentSiteInfo:O()({},t.props)}),this.setState({visibleSiteInfo:!0})}),this.setSiteInfo2=((e,t)=>{this.setState({currentSiteInfo2:O()({},t.props)}),this.setState({visibleSiteInfo2:!0})}),this.setSiteInfo3=((e,t)=>{this.setState({currentSiteInfo3:O()({},t.props)}),this.setState({visibleSiteInfo3:!0})}),this.submit=(()=>{this.props.form.validateFieldsAndScroll((e,t)=>{t.customer_id=this.state.currentClientInfo.id,t.site1_id=this.state.currentSiteInfo.id,this.state.currentSiteInfo2.id&&(t.site2_id=this.state.currentSiteInfo2.id),this.state.currentSiteInfo3.id&&(t.site3_id=this.state.currentSiteInfo3.id);var a=!0,i=!0;if(this.state.extraClient>1&&(a=this.formRef2.getItemsValue()),this.state.extraClient>2&&(i=this.formRef3.getItemsValue()),!e&&a&&i){console.log(t),"2"!==t.delivery_type&&(t.site1_time=t.site1_time.format("YYYY-MM-DD")),this.state.currentSiteInfo2.id&&(t.site2_time=t.site2_time.format("YYYY-MM-DD")),this.state.currentSiteInfo3.id&&(t.site3_time=t.site3_time.format("YYYY-MM-DD"));var l=[t];!0!==a&&l.push(a),!0!==i&&l.push(i),console.log(l),this.props.dispatch({type:"order/submitCreatePlan",payload:{form:l}}).then(()=>{this.hideModal(),this.props.dispatch({type:"order/fetchOrderList",payload:{}})})}})}),this.parseNumber=((e,t,a)=>{var i=a.target.value;if(""===i)return!1;isNaN(i)&&(i=0);var l=Object(j["a"])(i,t);this.props.form.setFieldsValue({[e]:l})}),this.parseNumberQuantity=((e,t,a)=>{var i,l=this.state,n=l.maxQuantity,s=l.site1_quantity,r=l.site2_quantity,c=l.site3_quantity,o=a.target.value;if(""===o)return!1;isNaN(o)&&(o=0),o-=0,i="site1_quantity"===e?o+parseFloat(r)+parseFloat(c)<=n?Object(j["a"])(o,t):Object(j["a"])(n-r-c,t):"site2_quantity"===e?parseFloat(s)+o+parseFloat(c)<=n?Object(j["a"])(o,t):Object(j["a"])(n-s-c,t):parseFloat(s)+parseFloat(r)+o<=n?Object(j["a"])(o,t):Object(j["a"])(n-s-r,t),this.setState({[e]:i}),this.props.form.setFieldsValue({[e]:i})}),this.changeType=(e=>{"2"===e?this.setState({flag:!1}):this.setState({flag:!0})}),this.deleteClientSelect=(()=>{this.setState({visibleClientInfo:!1,clientSelectionStatus:!1,visibleSiteInfo:!1,siteSelectionStatus:!1,visibleSiteInfo2:!1,siteSelectionStatus2:!1,visibleSiteInfo3:!1,siteSelectionStatus3:!1,currentClientInfo:{},currentSiteInfo:{},currentSiteInfo2:{},currentSiteInfo3:{}}),this.props.dispatch({type:"order/save",payload:{siteSelectByCreatePlan:[]}})}),this.addClientField=(()=>{if(this.state.extraSite>3)return!1;this.setState({extraClient:this.state.extraClient+1,extraSite:this.state.extraSite+1})}),this.removeClientField=(()=>{if(this.state.extraSite<0)return!1;this.setState({extraClient:this.state.extraClient-1,extraSite:this.state.extraSite-1})}),this.addSiteField=(()=>{if(this.state.extraSite>3)return!1;this.setState({extraSite:this.state.extraSite+1})}),this._addSiteField=(()=>{if(this.state.extraSite>3)return!1;this.setState({currentSiteNum:this.state.currentSiteNum+1}),this.addSiteField()}),this.removeSiteField=(()=>{if(this.state.extraSite<0)return!1;this.setState({extraSite:this.state.extraSite-1})}),this._removeSiteField=(()=>{if(this.state.extraSite<0)return!1;this.setState({currentSiteNum:this.state.currentSiteNum-1}),this.removeSiteField()})}render(){var e=this.state,t=e.clientSelectionStatus,a=e.visibleClientInfo,i=e.siteSelectionStatus,l=e.siteSelectionStatus2,n=e.siteSelectionStatus3,s=e.visibleSiteInfo,r=e.visibleSiteInfo2,c=e.visibleSiteInfo3,o=e.flag,m=e.currentClientInfo,d=e.currentSiteInfo,u=e.currentSiteInfo2,S=e.currentSiteInfo3,E=e.extraClient,f=e.extraSite,y=e.currentSiteNum,I=this.props,C=I.form,N=C.getFieldDecorator,_=C.getFieldValue,w=I.order,B=w.clientSelectByCreatePlan,O=w.siteSelectByCreatePlan,D=I.children,V=I.loading,P={labelCol:{xs:{span:24},sm:{span:3}},wrapperCol:{xs:{span:24},sm:{span:16}}},Q={labelCol:{xs:{span:24},sm:{span:8}},wrapperCol:{xs:{span:24},sm:{span:15}}};return b.a.createElement("div",{onClick:this.showModal,style:{display:"inline-block"}},D,b.a.createElement(F["a"],{title:"\u521b\u5efa\u8ba2\u5355",visible:this.state.visible,onCancel:this.hideModal,footer:null,width:840,maskClosable:!1,destroyOnClose:!0,bodyStyle:{padding:0}},b.a.createElement(Y["a"],{style:{padding:"24px 24px 10px"}},b.a.createElement(b.a.Fragment,null,b.a.createElement(h["a"],{style:{position:"relative"}},f<3?b.a.createElement(g["d"],{type:"icon-icon-test110",className:"add-icon",onClick:this.addClientField}):null,a?b.a.createElement(h["a"],{style:{marginBottom:25}},b.a.createElement(p["a"],{span:3},b.a.createElement("div",{style:{paddingLeft:31}},g["a"])),b.a.createElement(p["a"],{span:15,style:{marginLeft:9}},b.a.createElement("div",{className:x.a["site-select-info"]},b.a.createElement("div",null,b.a.createElement("div",null,b.a.createElement("div",{className:x.a["site-name"]},m.company_name,b.a.createElement("span",{className:x.a["blue-font"],onClick:()=>this.setState({visibleClientInfo:!1})},"\u66f4\u6539"),b.a.createElement("span",{className:x.a["delete-font"],onClick:this.deleteClientSelect},"\u5220\u9664")),b.a.createElement("div",null,m.contact," ",m.contact_phone)),b.a.createElement("div",null,b.a.createElement("div",null,"\u9884\u4ed8\u6b3e\u989d ",b.a.createElement("span",{className:x.a["red-font"]},m.balance,"\u5143")),b.a.createElement("div",null,"\u4fe1\u7528\u989d\u5ea6 ",b.a.createElement("span",{className:x.a["red-font"]},m.credit,"\u5143"))))))):b.a.createElement(Y["a"].Item,L()({label:g["a"]},P),N("customer_id",{rules:[{required:!0}]})(t?b.a.createElement(M["a"],{placeholder:"\u8bf7\u9009\u62e9\u5ba2\u6237",autoFocus:!0,defaultOpen:!0,onBlur:this.changeClientSelectionStatus,onSelect:this.setClientInfo},B.map(e=>{return b.a.createElement(R,L()({value:e.id,key:e.id},e),e.company_name)})):b.a.createElement(v["a"],{className:"btn-select",style:{width:"100%",height:41},onClick:this.changeClientSelectionStatus},"\u8bf7\u9009\u62e9\u5ba2\u6237")))),b.a.createElement(h["a"],null,b.a.createElement(p["a"],{span:9},b.a.createElement(Y["a"].Item,L()({label:"\u6536\u6b3e\u65b9\u5f0f"},Q),N("payment_type",{initialValue:"1"})(b.a.createElement(M["a"],null,b.a.createElement(R,{value:"1"},"\u9884\u4ed8\u6b3e"),b.a.createElement(R,{value:"2"},"\u4fe1\u7528\u989d"))))),b.a.createElement(p["a"],{span:10,style:{width:"46.2%"}},b.a.createElement(Y["a"].Item,L()({label:"\u914d\u9001\u65b9\u5f0f"},Q,{style:{marginLeft:10}}),N("delivery_type",{rules:[{required:!0}],initialValue:"1"})(b.a.createElement(M["a"],{placeholder:"\u8bf7\u9009\u62e9\u914d\u9001\u65b9\u5f0f",onChange:this.changeType},b.a.createElement(R,{value:"1"},"\u5356\u65b9\u914d\u9001"),b.a.createElement(R,{value:"2"},"\u4e70\u65b9\u81ea\u63d0"),b.a.createElement(R,{value:"3"},"\u6211\u65b9\u914d\u9001")))))),b.a.createElement(h["a"],null,b.a.createElement(p["a"],{span:9},b.a.createElement(Y["a"].Item,L()({label:"\u9500\u552e\u4ef7\u683c"},Q),N("price",{rules:[{required:!0}]})(b.a.createElement(q["a"],{placeholder:"\u8bf7\u8f93\u5165\u91d1\u989d",onBlur:this.parseNumber.bind(null,"price",2),addonAfter:"\u5143/\u5428"})))),b.a.createElement(p["a"],{span:10,style:{width:"46.2%"}},b.a.createElement(Y["a"].Item,L()({label:"\u989d\u5916\u8d39\u7528"},Q,{style:{marginLeft:10}}),N("extra_fee",{rules:[{required:!0}]})(b.a.createElement(q["a"],{placeholder:"\u8bf7\u8f93\u5165\u91d1\u989d",onBlur:this.parseNumber.bind(null,"extra_fee",2),addonAfter:"\u5143"}))))),b.a.createElement("div",{className:"modal-line",style:{width:828,marginLeft:"-12px",marginBottom:24}}),b.a.createElement(b.a.Fragment,null,b.a.createElement(h["a"],{style:{position:"relative"}},f<3?b.a.createElement(g["d"],{type:"icon-icon-test110",className:"add-icon",onClick:this._addSiteField}):null,s?b.a.createElement(h["a"],null,b.a.createElement(p["a"],{span:3},b.a.createElement("div",{style:{paddingLeft:31}},g["g"])),b.a.createElement(p["a"],{span:15,style:{marginLeft:9}},b.a.createElement("div",{className:x.a["site-select-info"]},b.a.createElement("div",null,b.a.createElement("div",null,b.a.createElement("div",{className:x.a["site-name"]},d.site_name,b.a.createElement("span",{className:x.a["blue-font"],onClick:()=>this.setState({visibleSiteInfo:!1})},"\u66f4\u6539"),b.a.createElement("span",{className:x.a["delete-font"],onClick:()=>this.setState({visibleSiteInfo:!1,siteSelectionStatus:!1,currentSiteInfo:{}})},"\u5220\u9664")),b.a.createElement("div",null,d.contact," ",d.contact_phone))),b.a.createElement("div",null,b.a.createElement("div",{className:x.a["blue-background"]},g["m"][d.site_type-1]),b.a.createElement("div",null,d.province," ",d.city," ",d.area," ",d.site_address))))):b.a.createElement(Y["a"].Item,L()({label:g["g"]},P),N("site1_id",{rules:[{required:o}]})(i?b.a.createElement(M["a"],{placeholder:"\u8bf7\u9009\u62e9\u7ad9\u70b9",autoFocus:!0,defaultOpen:!0,onBlur:this.changeSiteSelectionStatus,onSelect:this.setSiteInfo},O.map(e=>{return b.a.createElement(R,L()({value:e.id,key:e.id},e),e.site_name)})):b.a.createElement(v["a"],{className:"btn-select",style:{width:"100%",height:41},onClick:this.changeSiteSelectionStatus},"\u8bf7\u9009\u62e9\u7ad9\u70b9")))),b.a.createElement(h["a"],null,b.a.createElement(p["a"],{span:9},b.a.createElement(Y["a"].Item,L()({label:"\u8ba1\u5212\u6570\u91cf"},Q),N("site1_quantity",{rules:[{required:!0}]})(b.a.createElement(q["a"],{placeholder:"\u8bf7\u8f93\u5165\u6570\u91cf",onBlur:this.parseNumber.bind(null,"site1_quantity",3),addonAfter:"\u5428"})))),b.a.createElement(p["a"],{span:10,style:{width:"46.2%"}},b.a.createElement(Y["a"].Item,L()({label:"\u5378\u8d27\u65f6\u95f4"},Q,{style:{marginLeft:10}}),N("site1_time")(b.a.createElement(k["a"],{suffixIcon:b.a.createElement(g["d"],{className:"time-icon",type:"icon-icon-test8"}),style:{width:"100%"}})))))),y>1?b.a.createElement(b.a.Fragment,null,b.a.createElement(h["a"],{style:{position:"relative"}},b.a.createElement(g["d"],{type:"icon-icon-test109",className:"delete-icon",onClick:this._removeSiteField}),r?b.a.createElement(h["a"],null,b.a.createElement(p["a"],{span:3},b.a.createElement("div",{style:{paddingLeft:31}},g["g"])),b.a.createElement(p["a"],{span:15,style:{marginLeft:9}},b.a.createElement("div",{className:x.a["site-select-info"]},b.a.createElement("div",null,b.a.createElement("div",null,b.a.createElement("div",{className:x.a["site-name"]},u.site_name,b.a.createElement("span",{className:x.a["blue-font"],onClick:()=>this.setState({visibleSiteInfo2:!1})},"\u66f4\u6539"),b.a.createElement("span",{className:x.a["delete-font"],onClick:()=>this.setState({visibleSiteInfo2:!1,siteSelectionStatus2:!1,currentSiteInfo2:{}})},"\u5220\u9664")),b.a.createElement("div",null,u.contact," ",u.contact_phone))),b.a.createElement("div",null,b.a.createElement("div",{className:x.a["blue-background"]},g["m"][u.site_type-1]),b.a.createElement("div",null,u.province," ",u.city," ",u.area," ",u.site_address))))):b.a.createElement(Y["a"].Item,L()({label:g["g"]},P),N("site2_id",{rules:[{required:o}]})(l?b.a.createElement(M["a"],{placeholder:"\u8bf7\u9009\u62e9\u7ad9\u70b9",autoFocus:!0,defaultOpen:!0,onBlur:this.changeSiteSelectionStatus2,onSelect:this.setSiteInfo2},O.map(e=>{return b.a.createElement(R,L()({value:e.id,key:e.id},e),e.site_name)})):b.a.createElement(v["a"],{className:"btn-select",style:{width:"100%",height:41},onClick:this.changeSiteSelectionStatus2},"\u8bf7\u9009\u62e9\u7ad9\u70b9")))),b.a.createElement(h["a"],null,b.a.createElement(p["a"],{span:9},b.a.createElement(Y["a"].Item,L()({label:"\u8ba1\u5212\u6570\u91cf"},Q),N("site2_quantity",{rules:[{required:!0}]})(b.a.createElement(q["a"],{placeholder:"\u8bf7\u8f93\u5165\u6570\u91cf",onBlur:this.parseNumber.bind(null,"site2_quantity",3),addonAfter:"\u5428"})))),b.a.createElement(p["a"],{span:10,style:{width:"46.2%"}},b.a.createElement(Y["a"].Item,L()({label:"\u5378\u8d27\u65f6\u95f4"},Q,{style:{marginLeft:10}}),N("site2_time")(b.a.createElement(k["a"],{suffixIcon:b.a.createElement(g["d"],{className:"time-icon",type:"icon-icon-test8"}),style:{width:"100%"}})))))):null,y>2?b.a.createElement(b.a.Fragment,null,b.a.createElement(h["a"],{style:{position:"relative"}},b.a.createElement(g["d"],{type:"icon-icon-test109",className:"delete-icon",onClick:this._removeSiteField}),c?b.a.createElement(h["a"],null,b.a.createElement(p["a"],{span:3},b.a.createElement("div",{style:{paddingLeft:31}},g["g"])),b.a.createElement(p["a"],{span:15,style:{marginLeft:9}},b.a.createElement("div",{className:x.a["site-select-info"]},b.a.createElement("div",null,b.a.createElement("div",null,b.a.createElement("div",{className:x.a["site-name"]},S.site_name,b.a.createElement("span",{className:x.a["blue-font"],onClick:()=>this.setState({visibleSiteInfo3:!1})},"\u66f4\u6539"),b.a.createElement("span",{className:x.a["delete-font"],onClick:()=>this.setState({visibleSiteInfo3:!1,siteSelectionStatus3:!1,currentSiteInfo3:{}})},"\u5220\u9664")),b.a.createElement("div",null,S.contact," ",S.contact_phone))),b.a.createElement("div",null,b.a.createElement("div",{className:x.a["blue-background"]},g["m"][S.site_type-1]),b.a.createElement("div",null,S.province," ",S.city," ",S.area," ",S.site_address))))):b.a.createElement(Y["a"].Item,L()({label:g["g"]},P),N("site3_id",{rules:[{required:o}]})(n?b.a.createElement(M["a"],{placeholder:"\u8bf7\u9009\u62e9\u7ad9\u70b9",autoFocus:!0,defaultOpen:!0,onBlur:this.changeSiteSelectionStatus3,onSelect:this.setSiteInfo3},O.map(e=>{return b.a.createElement(R,L()({value:e.id,key:e.id},e),e.site_name)})):b.a.createElement(v["a"],{className:"btn-select",style:{width:"100%",height:41},onClick:this.changeSiteSelectionStatus3},"\u8bf7\u9009\u62e9\u7ad9\u70b9")))),b.a.createElement(h["a"],null,b.a.createElement(p["a"],{span:9},b.a.createElement(Y["a"].Item,L()({label:"\u8ba1\u5212\u6570\u91cf"},Q),N("site3_quantity",{rules:[{required:!0}]})(b.a.createElement(q["a"],{placeholder:"\u8bf7\u8f93\u5165\u6570\u91cf",onBlur:this.parseNumber.bind(null,"site3_quantity",3),addonAfter:"\u5428"})))),b.a.createElement(p["a"],{span:10,style:{width:"46.2%"}},b.a.createElement(Y["a"].Item,L()({label:"\u5378\u8d27\u65f6\u95f4"},Q,{style:{marginLeft:10}}),N("site3_time")(b.a.createElement(k["a"],{suffixIcon:b.a.createElement(g["d"],{className:"time-icon",type:"icon-icon-test8"}),style:{width:"100%"}})))))):null),E>1&&f<4?b.a.createElement(A,{extraSite:f,removeClientField:this.removeClientField,addSiteField:this.addSiteField,removeSiteField:this.removeSiteField,wrappedComponentRef:e=>this.formRef2=e}):null,E>2&&f<4?b.a.createElement(A,{extraSite:f,removeClientField:this.removeClientField,addSiteField:this.addSiteField,removeSiteField:this.removeSiteField,wrappedComponentRef:e=>this.formRef3=e}):null),b.a.createElement("div",{className:x.a["create-plan-modal-footer"]},b.a.createElement("div",null,b.a.createElement("div",null,b.a.createElement("div",{style:{marginLeft:30}},"\u9500\u552e\u603b\u91cf ",b.a.createElement("span",{className:x.a["red-font"]},_("quantity_1")||"0.000"," \u5428")),b.a.createElement("div",{style:{marginLeft:30}},"\u9500\u552e\u603b\u989d ",b.a.createElement("span",{className:x.a["red-font"]},Object(j["a"])(parseFloat(_("price")||0)*parseFloat(_("quantity_1")||0)+parseFloat(_("extra_fee")||0),2)," \u5143"))),b.a.createElement("div",{style:{marginRight:20}},b.a.createElement(v["a"],{type:"primary",style:{marginRight:10},loading:V,onClick:this.submit},"\u786e\u8ba4\u521b\u5efa"),b.a.createElement(v["a"],{className:"red-btn",onClick:this.hideModal},"\u53d6\u6d88"))))))}},o=m))||o)||o),Q=P,T=(d=Object(I["connect"])(e=>{var t=e.loading;return{loading:t.models.order}}),d((S=class extends y["Component"]{constructor(){super(...arguments),this.upLoadExcel=(e=>{this.props.dispatch({type:"order/upLoadExcel",payload:{file:e}})})}render(){var e=this.props.loading,t=b.a.createElement("div",null,"\u5bfc\u5165\u4fe1\u606f"),a=b.a.createElement(b.a.Fragment,null,b.a.createElement("div",null,b.a.createElement("p",null,"1. \u4e0a\u4f20\u4fe1\u606f\u6587\u4ef6\u65f6\uff0c\u8bf7\u4f7f\u7528excel\u6587\u4ef6\uff0c\u652f\u6301\u6587\u4ef6\u683c\u5f0f\u4e3a.xls\u6216\u8005.xlsx\uff1b"),b.a.createElement("p",null,"2. \u4fe1\u606f\u6587\u4ef6\u5185\u5bb9\uff0c\u8bf7\u4e25\u683c\u6309\u7167\u6a21\u677f\u6837\u5f0f\u586b\u5199\uff0c\u7ea2\u8272\u7684\u5b57\u6bb5\u5fc5\u987b\u586b\u5199\uff0c ",b.a.createElement("br",null),"\u5176\u4f59\u5b57\u6bb5\u82e5\u6ca1\u6709\u5219\u53ef\u4ee5\u4e0d\u586b\uff1b"),b.a.createElement("p",null,"3. \u5bfc\u5165\u4fe1\u606f\u65f6\uff0c\u5982\u679c\u548c\u5df2\u6709\u7684\u4fe1\u606f\u76f8\u540c\uff0c\u5219\u5bfc\u5165\u540e\u81ea\u52a8\u66f4\u65b0\u5176\u4fe1\u606f\uff1b")),b.a.createElement("div",{style:{textAlign:"center"}},b.a.createElement(v["a"],{className:"light-btn"},"\u4e0b\u8f7d\u4fe1\u606f\u6a21\u7248"),b.a.createElement(f["a"],{accept:".xls,.xlsx",name:"excel",action:`${g["c"]}/index/order/order-import`,customRequest:this.upLoadExcel,showUploadList:!1},b.a.createElement(v["a"],{className:"light-btn",style:{marginLeft:20},loading:e},"\u4e0a\u4f20\u4fe1\u606f\u6587\u4ef6"))));return b.a.createElement("div",null,b.a.createElement("div",{className:"toolbar"},b.a.createElement(Q,null,b.a.createElement(v["a"],{type:"primary"},"\u65b0\u589e\u8ba2\u5355")),b.a.createElement(E["a"],{placement:"bottomLeft",title:t,content:a,trigger:"click"},b.a.createElement(v["a"],{type:"primary",style:{marginLeft:10}},"\u5bfc\u5165\u4fe1\u606f"))),b.a.createElement("div",{style:{padding:24}},b.a.createElement("div",null,g["k"].map((e,t)=>{return b.a.createElement("div",{key:t,className:x.a["order-type"]},b.a.createElement("div",null,e.label))})),b.a.createElement(h["a"],{gutter:16},b.a.createElement(p["a"],{span:12},b.a.createElement(C["default"],null)),b.a.createElement(p["a"],{span:12},b.a.createElement(N["default"],null)))))}},u=S))||u);t["default"]=T}}]);