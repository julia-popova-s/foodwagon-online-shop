/*! For license information please see FlashDeals.30f41fd3.chunk.js.LICENSE.txt */
(self.webpackChunkfoodwagon_online_shop=self.webpackChunkfoodwagon_online_shop||[]).push([[243],{4799:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>O});var a=r(2791),n=r(9434),i=r(1087),o=r(3232),s=r(4446),l=r(9037);var c=r(6028);const d="flashDealCard_card__TUX4M",u="flashDealCard_card__up__4XBvc",f="flashDealCard_card__image__AEGJL",h="flashDealCard_card__discount__iFMPM",m="flashDealCard_card__name__YOoF+",p="flashDealCard_card__text__QjB3R",_="flashDealCard_discount__pCJvJ";var v=r(184);let g=function(e){return e.END="Promotion has ended",e.OK="Days Remaining",e}({});const y=e=>{let{discount:t,image:r,restaurantName:a,salePeriodEnd:n,salePeriodStart:i}=e;const o=((e,t)=>{const r=Date.parse(e),a=Date.parse(t),n=(new Date).getTime();return r<=n&&n<=a?Math.floor((Date.parse(t)-n)/864e5):0})(i,n);return(0,v.jsxs)("div",{className:d,children:[(0,v.jsxs)("div",{className:u,children:[(0,v.jsx)("img",{alt:a,className:f,src:"/foodwagon-online-shop"+r}),t&&t?(0,v.jsx)(c.s,{classNames:h,discount:t}):null,(0,v.jsx)(c.s,{classNames:_,discount:t,view:"smallLabel"})]}),(0,v.jsx)("p",{className:m,children:a}),(0,v.jsx)("p",{className:p,children:o?"".concat(o," ").concat(g.OK):g.END})]})};var x=r(8175);const b=e=>(0,v.jsxs)(x.ZP,{backgroundColor:"#f3f3f3",foregroundColor:"#ecebeb",height:415,speed:2,viewBox:"0 0 357 415",width:357,...e,children:[(0,v.jsx)("rect",{height:"301",rx:"16",ry:"16",width:"357",x:"0",y:"0"}),(0,v.jsx)("rect",{height:"26",rx:"8",ry:"8",width:"204",x:"0",y:"333"}),(0,v.jsx)("rect",{height:"42",rx:"8",ry:"8",width:"204",x:"0",y:"373"})]}),j={discountBlock:"flashDeals_discountBlock__Tpp1x"},E="333f1471-d10f-4b1d-a654-d3c070cb3500",O=()=>{const e=(0,o.TL)(),t=(0,n.v9)(l.bQ),r=(0,n.v9)(l.dS);return(0,a.useEffect)((()=>{e((0,l.UH)({limit:4,orderType:s.x.DESC,restaurantId:E,sortType:s.u.DISCOUNT}))}),[E]),(0,v.jsx)("div",{className:j.flashDeals,children:(0,v.jsx)("div",{className:"container",children:(0,v.jsx)("div",{className:j.discountBlock,children:"resolve"===r&&t?t.map(((e,t)=>(0,v.jsx)(i.rU,{to:"restaurant/".concat(E,"/product/").concat(e.id),children:(0,v.jsx)(y,{...e})},"".concat(e.id,"_").concat(t)))):new Array(4).fill(0).map(((e,t)=>(0,v.jsx)(b,{},t)))})})})}},4032:(e,t,r)=>{"use strict";r.d(t,{s:()=>m});var a=r(1694),n=r.n(a);const i="discount_label__8oW+1",o="discount_label__discount__xZACj",s="discount_label__discountPercent__ninge",l="discount_label__discountOff__nYZns",c="discount_smallLabel__ZzO-o",d="discount_smallLabel__discount__c4Cpa",u="discount_smallLabel__discountPercent__GdmW4",f="discount_smallLabel__discountOff__WMe9z";var h=r(184);const m=e=>{let{classNames:t,discount:r,view:a}=e;const m="smallLabel"===a;return(0,h.jsxs)("div",{className:n()(i,t,{[c]:m}),children:[(0,h.jsx)("div",{className:n()(o,{[d]:m}),children:r}),(0,h.jsx)("div",{className:n()(s,{[u]:m}),children:"%"}),(0,h.jsx)("div",{className:n()(l,{[f]:m}),children:"off"})]})}},6028:(e,t,r)=>{"use strict";r.d(t,{s:()=>a.s});var a=r(4032)},1694:(e,t)=>{var r;!function(){"use strict";var a={}.hasOwnProperty;function n(){for(var e=[],t=0;t<arguments.length;t++){var r=arguments[t];if(r){var i=typeof r;if("string"===i||"number"===i)e.push(r);else if(Array.isArray(r)){if(r.length){var o=n.apply(null,r);o&&e.push(o)}}else if("object"===i){if(r.toString!==Object.prototype.toString&&!r.toString.toString().includes("[native code]")){e.push(r.toString());continue}for(var s in r)a.call(r,s)&&r[s]&&e.push(s)}}}return e.join(" ")}e.exports?(n.default=n,e.exports=n):void 0===(r=function(){return n}.apply(t,[]))||(e.exports=r)}()},8175:(e,t,r)=>{"use strict";r.d(t,{ZP:()=>l});var a=r(2791),n=function(){return n=Object.assign||function(e){for(var t,r=1,a=arguments.length;r<a;r++)for(var n in t=arguments[r])Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e},n.apply(this,arguments)};var i=function(e){var t=e.animate,r=void 0===t||t,i=e.animateBegin,o=e.backgroundColor,s=void 0===o?"#f5f6f7":o,l=e.backgroundOpacity,c=void 0===l?1:l,d=e.baseUrl,u=void 0===d?"":d,f=e.children,h=e.foregroundColor,m=void 0===h?"#eee":h,p=e.foregroundOpacity,_=void 0===p?1:p,v=e.gradientRatio,g=void 0===v?2:v,y=e.gradientDirection,x=void 0===y?"left-right":y,b=e.uniqueKey,j=e.interval,E=void 0===j?.25:j,O=e.rtl,w=void 0!==O&&O,C=e.speed,N=void 0===C?1.2:C,D=e.style,k=void 0===D?{}:D,P=e.title,S=void 0===P?"Loading...":P,T=e.beforeMask,B=void 0===T?null:T,L=function(e,t){var r={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(r[a]=e[a]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var n=0;for(a=Object.getOwnPropertySymbols(e);n<a.length;n++)t.indexOf(a[n])<0&&Object.prototype.propertyIsEnumerable.call(e,a[n])&&(r[a[n]]=e[a[n]])}return r}(e,["animate","animateBegin","backgroundColor","backgroundOpacity","baseUrl","children","foregroundColor","foregroundOpacity","gradientRatio","gradientDirection","uniqueKey","interval","rtl","speed","style","title","beforeMask"]),M=b||Math.random().toString(36).substring(6),U=M+"-diff",A=M+"-animated-diff",Z=M+"-aria",K=w?{transform:"scaleX(-1)"}:null,R="0; "+E+"; 1",G=N+"s",I="top-bottom"===x?"rotate(90)":void 0;return(0,a.createElement)("svg",n({"aria-labelledby":Z,role:"img",style:n(n({},k),K)},L),S?(0,a.createElement)("title",{id:Z},S):null,B&&(0,a.isValidElement)(B)?B:null,(0,a.createElement)("rect",{role:"presentation",x:"0",y:"0",width:"100%",height:"100%",clipPath:"url("+u+"#"+U+")",style:{fill:"url("+u+"#"+A+")"}}),(0,a.createElement)("defs",null,(0,a.createElement)("clipPath",{id:U},f),(0,a.createElement)("linearGradient",{id:A,gradientTransform:I},(0,a.createElement)("stop",{offset:"0%",stopColor:s,stopOpacity:c},r&&(0,a.createElement)("animate",{attributeName:"offset",values:-g+"; "+-g+"; 1",keyTimes:R,dur:G,repeatCount:"indefinite",begin:i})),(0,a.createElement)("stop",{offset:"50%",stopColor:m,stopOpacity:_},r&&(0,a.createElement)("animate",{attributeName:"offset",values:-g/2+"; "+-g/2+"; "+(1+g/2),keyTimes:R,dur:G,repeatCount:"indefinite",begin:i})),(0,a.createElement)("stop",{offset:"100%",stopColor:s,stopOpacity:c},r&&(0,a.createElement)("animate",{attributeName:"offset",values:"0; 0; "+(1+g),keyTimes:R,dur:G,repeatCount:"indefinite",begin:i})))))},o=function(e){return e.children?(0,a.createElement)(i,n({},e)):(0,a.createElement)(s,n({},e))},s=function(e){return(0,a.createElement)(o,n({viewBox:"0 0 476 124"},e),(0,a.createElement)("rect",{x:"48",y:"8",width:"88",height:"6",rx:"3"}),(0,a.createElement)("rect",{x:"48",y:"26",width:"52",height:"6",rx:"3"}),(0,a.createElement)("rect",{x:"0",y:"56",width:"410",height:"6",rx:"3"}),(0,a.createElement)("rect",{x:"0",y:"72",width:"380",height:"6",rx:"3"}),(0,a.createElement)("rect",{x:"0",y:"88",width:"178",height:"6",rx:"3"}),(0,a.createElement)("circle",{cx:"20",cy:"20",r:"20"}))};const l=o}}]);
//# sourceMappingURL=FlashDeals.30f41fd3.chunk.js.map