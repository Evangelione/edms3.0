(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[20],{"5a1N":function(e,a,t){"use strict";t.r(a);var r=t("MVZn"),n=t.n(r),s=t("o0o1"),c=t.n(s),o=(t("miYZ"),t("tsqr")),i=t("y0tt"),p=t("mjZG");function d(e){var a=e.page,t=e.find_str,r=new FormData;return r.append("page",a),r.append("limit",p["e"]),r.append("find_str",t),Object(i["a"])(`${p["c"]}/index/partner/list`,{method:"POST",body:r})}function u(){return Object(i["a"])(`${p["c"]}/index/role/menu-list`,{method:"GET"})}function f(e){var a=new FormData;return Object.keys(e).forEach((t,r)=>{"role_menu"===t?a.append(t,JSON.stringify(e[t])||""):a.append(t,e[t]||"")}),Object(i["a"])(`${p["c"]}/index/partner/add`,{method:"POST",body:a})}function l(e){var a=new FormData;return a.append("id",e),Object(i["a"])(`${p["c"]}/index/partner/info`,{method:"POST",body:a})}function m(e){var a=new FormData;return Object.keys(e).forEach((t,r)=>{"role_menu"===t?a.append(t,JSON.stringify(e[t])||""):a.append(t,e[t]||"")}),Object(i["a"])(`${p["c"]}/index/partner/update`,{method:"POST",body:a})}function h(e){var a=new FormData;return a.append("id",e),Object(i["a"])(`${p["c"]}/index/partner/forbidden`,{method:"POST",body:a})}a["default"]={namespace:"partner",state:{partnerList:[{company_name:1,id:22,user:111,phone:18989898989}],partnerPage:1,partnerTotal:0,find_str:"",menu_list:[],currentPartnerInfo:{}},subscriptions:{setup(e){e.dispatch;var a=e.history;return a.listen(e=>{e.pathname,e.query})}},effects:{fetchPartnerList:c.a.mark(function e(a,t){var r,n,s,i,p,u,f,l,m;return c.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=a.payload,n=r.page,s=void 0===n?1:n,i=r.find_str,p=void 0===i?"":i,u=t.call,f=t.put,e.next=4,u(d,{page:s,find_str:p});case 4:if(l=e.sent,m=l.data,1!==parseInt(m.code,10)){e.next=11;break}return e.next=9,f({type:"save",payload:{partnerList:m.data.list,partnerPage:parseInt(s,10),partnerTotal:parseInt(m.data.total,10),find_str:p}});case 9:e.next=12;break;case 11:o["a"].error(m.msg);case 12:case"end":return e.stop()}},e,this)}),fetchMenuList:c.a.mark(function e(a,t){var r,n,s,i;return c.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return a.payload,r=t.call,n=t.put,e.next=4,r(u);case 4:if(s=e.sent,i=s.data,1!==parseInt(i.code,10)){e.next=11;break}return e.next=9,n({type:"save",payload:{menu_list:i.data.list}});case 9:e.next=12;break;case 11:o["a"].error(i.msg);case 12:case"end":return e.stop()}},e,this)}),insertPartner:c.a.mark(function e(a,t){var r,n,s,i;return c.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=a.payload.form,n=t.call,e.next=4,n(f,r);case 4:s=e.sent,i=s.data,1===parseInt(i.code,10)?o["a"].success(i.msg):o["a"].error(i.msg);case 7:case"end":return e.stop()}},e,this)}),inquirePartnerInfoById:c.a.mark(function e(a,t){var r,n,s,i,p;return c.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=a.payload.id,n=t.call,s=t.put,e.next=4,n(l,r);case 4:if(i=e.sent,p=i.data,1!==parseInt(p.code,10)){e.next=11;break}return e.next=9,s({type:"save",payload:{currentPartnerInfo:p.data.info}});case 9:e.next=12;break;case 11:o["a"].error(p.msg);case 12:case"end":return e.stop()}},e,this)}),updatePartnerInfoById:c.a.mark(function e(a,t){var r,n,s,i;return c.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=a.payload.form,n=t.call,e.next=4,n(m,r);case 4:s=e.sent,i=s.data,1===parseInt(i.code,10)?o["a"].success(i.msg):o["a"].error(i.msg);case 7:case"end":return e.stop()}},e,this)}),disabledPartner:c.a.mark(function e(a,t){var r,n,s,i;return c.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=a.payload.id,n=t.call,e.next=4,n(h,r);case 4:s=e.sent,i=s.data,1===parseInt(i.code,10)?o["a"].success(i.msg):o["a"].error(i.msg);case 7:case"end":return e.stop()}},e,this)})},reducers:{save(e,a){return n()({},e,{},a.payload)}}}}}]);