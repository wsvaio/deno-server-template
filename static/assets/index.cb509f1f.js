import{d as F,ak as b,al as A,x as s,a6 as B,M as S,am as E,G as o,H as c,F as p,_ as m,ad as n,S as L,U as g,an as N,a1 as r,$ as T,a0 as x,Y as h,a2 as $,I as q,a3 as w}from"./index.9e90613e.js";const V={class:"home"},z={class:"article-item"},D=["onClick"],H={m:"l-auto"},I={text:"center",m:"t-50px"},R=F({__name:"index",setup(G){const v=b();v.banner_title="HOME";const a=A(async e=>{var t;const{items:u,count:l,page:_}=await N({query:{page:+((t=e==null?void 0:e.page)!=null?t:0)+1,pageSize:5}});return{list:u,count:l,page:_}},{isNoMore:e=>!!e&&e.list.length>=e.count});s(a,"data"),s(a,"error"),s(a,"loading");const f=s(a,"loadMore"),y=s(a,"dataList");s(a,"loadingMore");const i=s(a,"noMore"),{data:M}=B(async()=>(await q({query:{page:1,pageSize:999}})).items),k=e=>e.replace(/<.*?>/gms,"").replace(/\s/g,"");return(e,u)=>{const l=S,_=E;return o(),c("div",V,[(o(!0),c(p,null,m(y.value,t=>(o(),c("div",z,[n("h2",{onClick:d=>e.$router.push({name:"blog_article",params:{_id:t._id}})},r(t.title),9,D),n("h3",null,r(k(t.content)),1),n("p",null,[(o(!0),c(p,null,m(t.tag_ids,d=>(o(),T(l,{type:"info"},{default:g(()=>[x(r(h(M).find(C=>C._id==d).name),1)]),_:2},1024))),256)),n("span",H,r(h($)(t.created_at)),1)])]))),256)),n("div",I,[L(_,{disabled:i.value,"un:text":"16px",p:"y-12px x-24px",onClick:f.value},{default:g(()=>[x(r(i.value?"\u6CA1\u6709\u66F4\u591A\u4E86":"\u52A0\u8F7D\u66F4\u591A"),1)]),_:1},8,["disabled","onClick"])])])}}});const U=w(R,[["__scopeId","data-v-c66e237d"]]);export{U as default};
