(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[8],{XM3e:function(e,a,t){"use strict";t.r(a);var n=t("MVZn"),r=t.n(n),s=t("o0o1"),c=t.n(s),i=(t("miYZ"),t("tsqr")),o=t("y0tt"),d=t("mjZG");function u(e){var a=e.page,t=e.customer_name,n=new FormData;return n.append("page",a),n.append("limit",d["c"]),n.append("customer_name",t),Object(o["a"])(`${d["a"]}/index/cust/cust-list`,{method:"POST",body:n})}function p(e){var a=new FormData;return Object.keys(e).forEach((t,n)=>{a.append(t,e[t]||"")}),Object(o["a"])(`${d["a"]}/index/cust/add-cust`,{method:"POST",body:a})}function l(e){var a=new FormData;return Object.keys(e).forEach((t,n)=>{a.append(t,e[t]||"")}),Object(o["a"])(`${d["a"]}/index/cust/update-cust`,{method:"POST",body:a})}function m(e){var a=new FormData;return Object.keys(e).forEach((t,n)=>{a.append(t,e[t]||"")}),Object(o["a"])(`${d["a"]}/index/cust/update-contact`,{method:"POST",body:a})}function f(e){var a=new FormData;return a.append("id",e),Object(o["a"])(`${d["a"]}/index/cust/cust-info`,{method:"POST",body:a})}function h(e){var a=new FormData;return Object.keys(e).forEach((t,n)=>{a.append(t,e[t]||"")}),Object(o["a"])(`${d["a"]}/index/cust/set-finance`,{method:"POST",body:a})}function w(e){var a=e.page,t=e.customer_id,n=e.site_name,r=new FormData;return r.append("page",a),r.append("limit",d["c"]),r.append("customer_id",t),r.append("site_name",n),Object(o["a"])(`${d["a"]}/index/site/site-list`,{method:"POST",body:r})}function y(e){var a=new FormData;return Object.keys(e).forEach((t,n)=>{a.append(t,e[t]||"")}),Object(o["a"])(`${d["a"]}/index/site/add-site`,{method:"POST",body:a})}function x(e){var a=new FormData;return Object.keys(e).forEach((t,n)=>{a.append(t,e[t]||"")}),Object(o["a"])(`${d["a"]}/index/site/update-site`,{method:"POST",body:a})}function v(e){var a=new FormData;return a.append("id",e),Object(o["a"])(`${d["a"]}/index/site/site-info`,{method:"POST",body:a})}function b(e){var a=new FormData;return a.append("id",e),Object(o["a"])(`${d["a"]}/index/site/site-info`,{method:"POST",body:a})}function g(e){var a=new FormData;return a.append(e.filename,e.file),Object(o["a"])(e.action,{method:"POST",body:a})}a["default"]={namespace:"client",state:{clientInfoCurrentTabs:"1",clientList:[],clientPage:1,clientTotal:0,currentClientInfo:{},customer_name:"",siteList:[],sitePage:1,siteTotal:0,currentSiteInfo:{},site_name:"",salesHistoryList:[{id:"1",cp:"\u80e1\u5f66\u658c",age:32,address:"\u897f\u6e56\u533a\u6e56\u5e95\u516c\u56ed1\u53f7"},{id:"2",cp:"\u80e1\u5f66\u7956",age:42,address:"\u897f\u6e56\u533a\u6e56\u5e95\u516c\u56ed1\u53f7"}],salesHistoryPage:1,salesHistoryTotal:0,reconciliationHistoryList:[{id:"1",kh:"\u80e1\u5f66\u658c12",age:32,address:"\u897f\u6e56\u533a\u6e56\u5e95\u516c\u56ed1\u53f7"},{id:"2",kh:"\u80e1\u5f66\u7956",age:42,address:"\u897f\u6e56\u533a\u6e56\u5e95\u516c\u56ed1\u53f7"}],reconciliationHistoryPage:1,reconciliationHistoryTotal:0},subscriptions:{setup(e){e.dispatch;var a=e.history;return a.listen(e=>{e.pathname,e.query})}},effects:{fetchClientList:c.a.mark(function e(a,t){var n,r,s,o,d,p,l,m,f;return c.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=a.payload,r=n.page,s=void 0===r?1:r,o=n.customer_name,d=void 0===o?"":o,p=t.call,l=t.put,e.next=4,p(u,{page:s,customer_name:d});case 4:if(m=e.sent,f=m.data,1!==parseInt(f.code,10)){e.next=11;break}return e.next=9,l({type:"save",payload:{clientList:f.data.list,clientPage:parseInt(s,10),clientTotal:parseInt(f.data.total,10),customer_name:d}});case 9:e.next=12;break;case 11:i["a"].error(f.msg);case 12:case"end":return e.stop()}},e,this)}),insertClient:c.a.mark(function e(a,t){var n,r,s,o;return c.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=a.payload.form,r=t.call,e.next=4,r(p,n);case 4:s=e.sent,o=s.data,1===parseInt(o.code,10)?i["a"].success(o.msg):i["a"].error(o.msg);case 7:case"end":return e.stop()}},e,this)}),updateClientInfo:c.a.mark(function e(a,t){var n,r,s,o;return c.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=a.payload.form,r=t.call,e.next=4,r(l,n);case 4:s=e.sent,o=s.data,1===parseInt(o.code,10)?i["a"].success(o.msg):i["a"].error(o.msg);case 7:case"end":return e.stop()}},e,this)}),updateClientContact:c.a.mark(function e(a,t){var n,r,s,o;return c.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=a.payload.form,r=t.call,e.next=4,r(m,n);case 4:s=e.sent,o=s.data,1===parseInt(o.code,10)?i["a"].success(o.msg):i["a"].error(o.msg);case 7:case"end":return e.stop()}},e,this)}),inquireClientInfoById:c.a.mark(function e(a,t){var n,r,s,o,d;return c.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=a.payload.id,r=t.call,s=t.put,e.next=4,r(f,n);case 4:if(o=e.sent,d=o.data,1!==parseInt(d.code,10)){e.next=11;break}return e.next=9,s({type:"save",payload:{currentClientInfo:d.data.info}});case 9:e.next=12;break;case 11:i["a"].error(d.msg);case 12:case"end":return e.stop()}},e,this)}),setClientFinance:c.a.mark(function e(a,t){var n,r,s,o;return c.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=a.payload,r=t.call,e.next=4,r(h,n);case 4:s=e.sent,o=s.data,1===parseInt(o.code,10)?i["a"].success(o.msg):i["a"].error(o.msg);case 7:case"end":return e.stop()}},e,this)}),fetchSiteList:c.a.mark(function e(a,t){var n,r,s,o,d,u,p,l,m,f;return c.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=a.payload,r=n.page,s=void 0===r?1:r,o=n.customer_id,d=n.site_name,u=void 0===d?"":d,p=t.call,l=t.put,e.next=4,p(w,{page:s,customer_id:o,site_name:u});case 4:if(m=e.sent,f=m.data,1!==parseInt(f.code,10)){e.next=11;break}return e.next=9,l({type:"save",payload:{siteList:f.data.list,sitePage:parseInt(s,10),siteTotal:parseInt(f.data.total,10),site_name:u}});case 9:e.next=12;break;case 11:i["a"].error(f.msg);case 12:case"end":return e.stop()}},e,this)}),insertSite:c.a.mark(function e(a,t){var n,r,s,o;return c.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=a.payload.form,r=t.call,e.next=4,r(y,n);case 4:s=e.sent,o=s.data,1===parseInt(o.code,10)?i["a"].success(o.msg):i["a"].error(o.msg);case 7:case"end":return e.stop()}},e,this)}),updateSiteInfo:c.a.mark(function e(a,t){var n,r,s,o;return c.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=a.payload.form,r=t.call,e.next=4,r(x,n);case 4:s=e.sent,o=s.data,1===parseInt(o.code,10)?i["a"].success(o.msg):i["a"].error(o.msg);case 7:case"end":return e.stop()}},e,this)}),inquireSiteInfoById:c.a.mark(function e(a,t){var n,r,s,o,d;return c.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=a.payload.id,r=t.call,s=t.put,e.next=4,r(v,n);case 4:if(o=e.sent,d=o.data,1!==parseInt(d.code,10)){e.next=11;break}return e.next=9,s({type:"save",payload:{currentSiteInfo:d.data.info}});case 9:e.next=12;break;case 11:i["a"].error(d.msg);case 12:case"end":return e.stop()}},e,this)}),deleteSite:c.a.mark(function e(a,t){var n,r,s,o;return c.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=a.payload.id,r=t.call,e.next=4,r(b,n);case 4:s=e.sent,o=s.data,1===parseInt(o.code,10)?i["a"].success("\u5df2\u79fb\u9664"):i["a"].error(o.msg);case 7:case"end":return e.stop()}},e,this)}),upLoadExcel:c.a.mark(function e(a,t){var n,r,s,o;return c.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n=a.payload.file,r=t.call,e.next=4,r(g,n);case 4:s=e.sent,o=s.data;try{1===parseInt(o.code,10)?i["a"].success(`\u5bfc\u5165\u6210\u529f ${o.num.success_num} \u6761`):i["a"].error(o.msg)}catch(e){i["a"].error(e)}case 7:case"end":return e.stop()}},e,this)})},reducers:{save(e,a){return r()({},e,{},a.payload)}}}}}]);