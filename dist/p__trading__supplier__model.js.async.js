(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[25],{TCwS:function(e,a,t){"use strict";t.r(a);var r=t("MVZn"),n=t.n(r),s=t("o0o1"),o=t.n(s),c=(t("miYZ"),t("tsqr")),p=t("y0tt"),i=t("mjZG");function u(e){var a=e.page,t=e.supp_name,r=new FormData;return r.append("page",a),r.append("limit",i["f"]),r.append("supp_name",t),Object(p["a"])(`${i["c"]}/index/supp/page`,{method:"POST",body:r})}function d(e){var a=new FormData;return Object.keys(e).forEach((t,r)=>{a.append(t,e[t]||"")}),Object(p["a"])(`${i["c"]}/index/supp/add-supp`,{method:"POST",body:a})}function l(e){var a=new FormData;return Object.keys(e).forEach((t,r)=>{a.append(t,e[t]||"")}),Object(p["a"])(`${i["c"]}/index/supp/update-supp`,{method:"POST",body:a})}function m(e){var a=new FormData;return Object.keys(e).forEach((t,r)=>{a.append(t,e[t]||"")}),Object(p["a"])(`${i["c"]}/index/supp/update-contact`,{method:"POST",body:a})}function f(e){var a=new FormData;return a.append("id",e),Object(p["a"])(`${i["c"]}/index/supp/supp-info`,{method:"POST",body:a})}function h(e){var a=new FormData;return Object.keys(e).forEach((t,r)=>{a.append(t,e[t]||"")}),Object(p["a"])(`${i["c"]}/index/supp/set-finance`,{method:"POST",body:a})}function g(e){var a=e.page,t=e.supp_id,r=e.goods_name,n=new FormData;return n.append("page",a),n.append("limit",i["f"]),n.append("supp_id",t),n.append("goods_name",r),Object(p["a"])(`${i["c"]}/index/goods/page`,{method:"POST",body:n})}function w(e){var a=new FormData;return Object.keys(e).forEach((t,r)=>{a.append(t,e[t]||"")}),Object(p["a"])(`${i["c"]}/index/goods/add-goods`,{method:"POST",body:a})}function y(e){var a=new FormData;return Object.keys(e).forEach((t,r)=>{a.append(t,e[t]||"")}),Object(p["a"])(`${i["c"]}/index/goods/update-goods`,{method:"POST",body:a})}function x(e){var a=new FormData;return a.append("id",e),Object(p["a"])(`${i["c"]}/index/goods/goods-info`,{method:"POST",body:a})}function v(e){var a=new FormData;return a.append("id",e),Object(p["a"])(`${i["c"]}/index/goods/goods-info`,{method:"POST",body:a})}function b(e){var a=new FormData;return a.append(e.filename,e.file),Object(p["a"])(e.action,{method:"POST",body:a})}a["default"]={namespace:"supplier",state:{supplierInfoCurrentTabs:"1",supplierList:[],supplierPage:1,supplierTotal:0,currentSupplierInfo:{},supp_name:"",gasSourceList:[],gasSourcePage:1,gasSourceTotal:0,currentGasSourceInfo:{},goods_name:"",salesHistoryList:[{id:"1",cp:"\u80e1\u5f66\u658c",age:32,address:"\u897f\u6e56\u533a\u6e56\u5e95\u516c\u56ed1\u53f7"},{id:"2",cp:"\u80e1\u5f66\u7956",age:42,address:"\u897f\u6e56\u533a\u6e56\u5e95\u516c\u56ed1\u53f7"}],salesHistoryPage:1,salesHistoryTotal:0,reconciliationHistoryList:[{id:"1",kh:"\u80e1\u5f66\u658c12",age:32,address:"\u897f\u6e56\u533a\u6e56\u5e95\u516c\u56ed1\u53f7"},{id:"2",kh:"\u80e1\u5f66\u7956",age:42,address:"\u897f\u6e56\u533a\u6e56\u5e95\u516c\u56ed1\u53f7"}],reconciliationHistoryPage:1,reconciliationHistoryTotal:0},subscriptions:{setup(e){e.dispatch;var a=e.history;return a.listen(e=>{e.pathname,e.query})}},effects:{fetchSupplierList:o.a.mark(function e(a,t){var r,n,s,p,i,d,l,m,f;return o.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=a.payload,n=r.page,s=void 0===n?1:n,p=r.supp_name,i=void 0===p?"":p,d=t.call,l=t.put,e.next=4,d(u,{page:s,supp_name:i});case 4:if(m=e.sent,f=m.data,1!==parseInt(f.code,10)){e.next=11;break}return e.next=9,l({type:"save",payload:{supplierList:f.data.list,supplierPage:parseInt(s,10),supplierTotal:parseInt(f.data.total,10),supp_name:i}});case 9:e.next=12;break;case 11:c["a"].error(f.msg);case 12:case"end":return e.stop()}},e,this)}),insertSupplier:o.a.mark(function e(a,t){var r,n,s,p;return o.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=a.payload.form,n=t.call,e.next=4,n(d,r);case 4:s=e.sent,p=s.data,1===parseInt(p.code,10)?c["a"].success(p.msg):c["a"].error(p.msg);case 7:case"end":return e.stop()}},e,this)}),updateSupplierInfo:o.a.mark(function e(a,t){var r,n,s,p;return o.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=a.payload.form,n=t.call,e.next=4,n(l,r);case 4:s=e.sent,p=s.data,1===parseInt(p.code,10)?c["a"].success(p.msg):c["a"].error(p.msg);case 7:case"end":return e.stop()}},e,this)}),updateSupplierContact:o.a.mark(function e(a,t){var r,n,s,p;return o.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=a.payload.form,n=t.call,e.next=4,n(m,r);case 4:s=e.sent,p=s.data,1===parseInt(p.code,10)?c["a"].success(p.msg):c["a"].error(p.msg);case 7:case"end":return e.stop()}},e,this)}),getSupplierInfoById:o.a.mark(function e(a,t){var r,n,s,p,i;return o.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=a.payload.id,n=t.call,s=t.put,e.next=4,n(f,r);case 4:if(p=e.sent,i=p.data,1!==parseInt(i.code,10)){e.next=11;break}return e.next=9,s({type:"save",payload:{currentSupplierInfo:i.data.info}});case 9:e.next=12;break;case 11:c["a"].error(i.msg);case 12:case"end":return e.stop()}},e,this)}),setSupplierFinance:o.a.mark(function e(a,t){var r,n,s,p;return o.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=a.payload,n=t.call,e.next=4,n(h,r);case 4:s=e.sent,p=s.data,1===parseInt(p.code,10)?c["a"].success(p.msg):c["a"].error(p.msg);case 7:case"end":return e.stop()}},e,this)}),fetchGasSourceList:o.a.mark(function e(a,t){var r,n,s,p,i,u,d,l,m,f;return o.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=a.payload,n=r.page,s=void 0===n?1:n,p=r.supp_id,i=r.goods_name,u=void 0===i?"":i,d=t.call,l=t.put,e.next=4,d(g,{page:s,supp_id:p,goods_name:u});case 4:if(m=e.sent,f=m.data,1!==parseInt(f.code,10)){e.next=11;break}return e.next=9,l({type:"save",payload:{gasSourceList:f.data.list,gasSourcePage:parseInt(s,10),gasSourceTotal:parseInt(f.data.total,10),goods_name:u}});case 9:e.next=12;break;case 11:c["a"].error(f.msg);case 12:case"end":return e.stop()}},e,this)}),insertGasSource:o.a.mark(function e(a,t){var r,n,s,p;return o.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=a.payload.form,n=t.call,e.next=4,n(w,r);case 4:s=e.sent,p=s.data,1===parseInt(p.code,10)?c["a"].success(p.msg):c["a"].error(p.msg);case 7:case"end":return e.stop()}},e,this)}),updateGasSourceInfo:o.a.mark(function e(a,t){var r,n,s,p;return o.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=a.payload.form,n=t.call,e.next=4,n(y,r);case 4:s=e.sent,p=s.data,1===parseInt(p.code,10)?c["a"].success(p.msg):c["a"].error(p.msg);case 7:case"end":return e.stop()}},e,this)}),inquireGasSourceInfoById:o.a.mark(function e(a,t){var r,n,s,p,i;return o.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=a.payload.id,n=t.call,s=t.put,e.next=4,n(x,r);case 4:if(p=e.sent,i=p.data,1!==parseInt(i.code,10)){e.next=11;break}return e.next=9,s({type:"save",payload:{currentGasSourceInfo:i.data.info}});case 9:e.next=12;break;case 11:c["a"].error(i.msg);case 12:case"end":return e.stop()}},e,this)}),deleteGasSource:o.a.mark(function e(a,t){var r,n,s,p;return o.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=a.payload.id,n=t.call,e.next=4,n(v,r);case 4:s=e.sent,p=s.data,1===parseInt(p.code,10)?c["a"].success("\u5df2\u79fb\u9664"):c["a"].error(p.msg);case 7:case"end":return e.stop()}},e,this)}),upLoadExcel:o.a.mark(function e(a,t){var r,n,s,p;return o.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=a.payload.file,n=t.call,e.next=4,n(b,r);case 4:s=e.sent,p=s.data;try{1===parseInt(p.code,10)?c["a"].success(`\u5bfc\u5165\u6210\u529f ${p.num.success_num} \u6761`):c["a"].error(p.msg)}catch(e){c["a"].error(e)}case 7:case"end":return e.stop()}},e,this)})},reducers:{save(e,a){return n()({},e,{},a.payload)}}}}}]);