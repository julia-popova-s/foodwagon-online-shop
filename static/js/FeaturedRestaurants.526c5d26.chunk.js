/*! For license information please see FeaturedRestaurants.526c5d26.chunk.js.LICENSE.txt */
(self.webpackChunkfoodwagon_online_shop=self.webpackChunkfoodwagon_online_shop||[]).push([[636],{2458:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>F});var a=r(2791),s=r(9434),i=r(3080),n=r(3232);const o=e=>e.restaurants.list,c=e=>e.restaurants.isLoaded;var l=r(3018);const d=e=>e.sortingType.orderType,_=e=>e.sortingType.sortType,u=e=>e.sortingType.category;var p=r(6348),m=r(7376),g=r(1694),h=r.n(g);const f={categories__list:"categories_categories__list__J0JYy",categories__item:"categories_categories__item__FWl3J",categories__item_active:"categories_categories__item_active__UbF-Z"};var v=r(184);const y=e=>{let{activeCategory:t,handleChangeCategory:r,items:a}=e;return(0,v.jsx)("div",{className:f.categories,children:(0,v.jsx)("ul",{className:f.categories__list,children:a.map(((e,a)=>(0,v.jsx)("li",{className:h()(f.categories__item,{[f.categories__item_active]:t===a}),onClick:()=>r(a),children:e},"".concat(e,"_").concat(a))))})})};var x=r(4804),j=r(1087),b=r(9807);const N={card:"cardFeatured_card__yzHMt",card__up:"cardFeatured_card__up__XX4lf",card__image:"cardFeatured_card__image__q38kg",card__discount:"cardFeatured_card__discount__uGdTF",card__fast:"cardFeatured_card__fast__QrXOM",card__text:"cardFeatured_card__text__YWERv",location:"cardFeatured_location__LpFc4",location__name:"cardFeatured_location__name__BC-X4",location__icon:"cardFeatured_location__icon__6LGgk",location__img:"cardFeatured_location__img__WimJp",location__rating:"cardFeatured_location__rating__WQHZC"},w=e=>{const{deliveryTime:t,imageSrc:r,logo_photos:a,name:s,weighted_rating_value:n}=e;return(0,v.jsxs)("div",{className:N.card,children:[(0,v.jsxs)("div",{className:N.card__up,children:[(0,v.jsx)("img",{alt:s,className:N.card__image,src:"/foodwagon-online-shop"+r}),(0,v.jsxs)("div",{className:N.card__discount,children:[(0,v.jsx)(i.Q,{src:"".concat("/foodwagon-online-shop","/images/food/label.svg"),wrapper:"span"}),"time: ",t," min"]}),(0,v.jsxs)("div",{className:N.card__fast,children:[(0,v.jsx)(i.Q,{src:"/foodwagon-online-shop/images/food/watch.svg",wrapper:"span"}),t<=100?"Fast":"Not fast"]})]}),(0,v.jsxs)("div",{className:h()(N.card__location,N.location),children:[(0,v.jsx)("div",{className:N.location__img,children:(0,v.jsx)("img",{alt:s,className:N.location__icon,src:"/foodwagon-online-shop"+a})}),(0,v.jsxs)("div",{className:N.location__text,children:[(0,v.jsx)("p",{className:N.location__name,children:(0,b.O)(s,25)}),(0,v.jsxs)("span",{className:N.location__rating,children:[(0,v.jsx)(i.Q,{className:N.location__icon,src:"/foodwagon-online-shop/images/food/star.svg",wrapper:"span"}),n.toFixed(2)]})]})]}),(0,v.jsx)("div",{className:N.card__text,children:"Open Now"})]})};var C=r(8175);const E=e=>(0,v.jsxs)(C.ZP,{backgroundColor:"#f3f3f3",foregroundColor:"#ecebeb",height:463,speed:2,viewBox:"0 0 357 463",width:357,...e,children:[(0,v.jsx)("rect",{height:"301",rx:"16",ry:"16",width:"357",x:"0",y:"0"}),(0,v.jsx)("rect",{height:"50",rx:"8",ry:"8",width:"50",x:"0",y:"325"}),(0,v.jsx)("rect",{height:"50",rx:"8",ry:"8",width:"283",x:"74",y:"325"}),(0,v.jsx)("rect",{height:"42",rx:"16",ry:"16",width:"132",x:"0",y:"421"})]}),O="restaurantList_restaurantListWrapper__6z9jC",L=e=>{let{isLoading:t,list:r}=e;const a=new Array(4).fill(0).map(((e,t)=>(0,v.jsx)(E,{},t)));return(0,v.jsx)("div",{className:O,children:t&&r?r.map((e=>(0,v.jsx)(j.rU,{to:"restaurant/".concat(e.id,"/product/").concat(e.backgroundId),children:(0,v.jsx)(w,{...e})},e.id))):a})},T={restaurantList:"featuredRestaurants_restaurantList__gFV3g",restaurantList__filters:"featuredRestaurants_restaurantList__filters__0hCrX",restaurantList__title:"featuredRestaurants_restaurantList__title__cDgCo",restaurantList__list:"featuredRestaurants_restaurantList__list__pOiK+",restaurantList__btn:"featuredRestaurants_restaurantList__btn__865w6",restaurantList__popup:"featuredRestaurants_restaurantList__popup__u4S0S"},k=["All","Pasta","Salad","Fish","Meat","Soup","Burger"],S=[{name:"popularity",order:m.K.DESC,type:m.z.POPULAR},{name:"rating",order:m.K.DESC,type:m.z.RATING},{name:"delivery time",order:m.K.ASC,type:m.z.TIME},{name:"alphabetically",order:m.K.ASC,type:m.z.NAME}],F=()=>{const[e,t]=(0,a.useState)(4),r=(0,n.TL)(),m=(0,s.v9)(u),g=(0,s.v9)(_),h=(0,s.v9)(d),f=(0,s.v9)(c),j=(0,s.v9)(o),b=(0,a.useCallback)((e=>{r((0,p.PR)(e))}),[]),N=(0,a.useCallback)(((e,t)=>{r((0,p.Td)({orderType:t,sortType:e}))}),[]);return(0,a.useEffect)((()=>{r((0,l.Nx)({category:k[m],limit:e,orderType:h,sortType:g}))}),[g,m,e,h]),(0,v.jsx)("section",{className:T.restaurants,id:"featuredRestaurants",children:(0,v.jsx)("div",{className:"container",children:(0,v.jsxs)("div",{className:T.restaurantList,children:[(0,v.jsx)("h4",{className:T.restaurantList__title,children:"Featured Restaurants"}),(0,v.jsxs)("div",{className:T.restaurantList__filters,children:[(0,v.jsx)(y,{activeCategory:m,handleChangeCategory:b,items:k}),(0,v.jsx)(x.T,{activeSortType:g,classNames:T.restaurantList__popup,handleChangeSortType:N,items:S,orderType:h})]}),(0,v.jsx)(L,{isLoading:f,list:j}),(0,v.jsxs)("button",{className:T.restaurantList__btn,onClick:()=>{t(2*e)},children:["View All",(0,v.jsx)(i.Q,{className:T.restaurantList__btnLeft,src:"/foodwagon-online-shop/images/food/btn_left.svg",wrapper:"span"})]})]})})})}},4804:(e,t,r)=>{"use strict";r.d(t,{T:()=>h});var a=r(1694),s=r.n(a),i=r(2791),n=r(549),o=r(61);const c="sortPopup_sort__3+lQH",l="sortPopup_sort__title__29ue6",d="sortPopup_sort__list__55Yzq",_="sortPopup_sort__link__nOQ3-",u="sortPopup_sort__popup__RPH9T",p="sortPopup_sort__item__GcAEi",m="sortPopup_sort__item_active__2QF6O";var g=r(184);const h=e=>{var t;let{activeSortType:r,classNames:a,handleChangeSortType:h,items:f,orderType:v}=e;const[y,x]=(0,i.useState)(!1),j=()=>{x(!1)},b=(0,o.O)(j),N=null===f||void 0===f||null===(t=f.find((e=>e.type===r)))||void 0===t?void 0:t.name;return(0,g.jsxs)("div",{className:s()(c,a),children:[(0,g.jsxs)("div",{className:l,ref:b,children:["sort by",(0,g.jsx)("span",{className:_,onClick:()=>{x(!0)},children:N})]}),(0,g.jsx)(n.Z,{classNames:"alert",in:y,timeout:300,unmountOnExit:!0,children:(0,g.jsx)("div",{className:u,children:(0,g.jsx)("ul",{className:d,onClick:j,children:null===f||void 0===f?void 0:f.map(((e,t)=>{let{name:a,order:i,type:n}=e;return(0,g.jsx)("li",{className:s()(p,{[m]:n===r&&i===v}),onClick:()=>h(n,i),children:a},"".concat(n,"_").concat(t))}))})})})]})}},61:(e,t,r)=>{"use strict";r.d(t,{O:()=>s});var a=r(2791);const s=e=>{const t=(0,a.useRef)(null);return(0,a.useEffect)((()=>{const r=r=>{var a;null!==(a=t.current)&&void 0!==a&&a.contains(r.target)||e()};return document.body.addEventListener("mousedown",r),()=>document.body.removeEventListener("mousedown",r)}),[e]),t}},9807:(e,t,r)=>{"use strict";r.d(t,{O:()=>a});const a=(e,t)=>(null===e||void 0===e?void 0:e.length)>t?"".concat(e.slice(0,t-1),"..."):e},1694:(e,t)=>{var r;!function(){"use strict";var a={}.hasOwnProperty;function s(){for(var e=[],t=0;t<arguments.length;t++){var r=arguments[t];if(r){var i=typeof r;if("string"===i||"number"===i)e.push(r);else if(Array.isArray(r)){if(r.length){var n=s.apply(null,r);n&&e.push(n)}}else if("object"===i){if(r.toString!==Object.prototype.toString&&!r.toString.toString().includes("[native code]")){e.push(r.toString());continue}for(var o in r)a.call(r,o)&&r[o]&&e.push(o)}}}return e.join(" ")}e.exports?(s.default=s,e.exports=s):void 0===(r=function(){return s}.apply(t,[]))||(e.exports=r)}()},8175:(e,t,r)=>{"use strict";r.d(t,{ZP:()=>c});var a=r(2791),s=function(){return s=Object.assign||function(e){for(var t,r=1,a=arguments.length;r<a;r++)for(var s in t=arguments[r])Object.prototype.hasOwnProperty.call(t,s)&&(e[s]=t[s]);return e},s.apply(this,arguments)};var i=function(e){var t=e.animate,r=void 0===t||t,i=e.animateBegin,n=e.backgroundColor,o=void 0===n?"#f5f6f7":n,c=e.backgroundOpacity,l=void 0===c?1:c,d=e.baseUrl,_=void 0===d?"":d,u=e.children,p=e.foregroundColor,m=void 0===p?"#eee":p,g=e.foregroundOpacity,h=void 0===g?1:g,f=e.gradientRatio,v=void 0===f?2:f,y=e.gradientDirection,x=void 0===y?"left-right":y,j=e.uniqueKey,b=e.interval,N=void 0===b?.25:b,w=e.rtl,C=void 0!==w&&w,E=e.speed,O=void 0===E?1.2:E,L=e.style,T=void 0===L?{}:L,k=e.title,S=void 0===k?"Loading...":k,F=e.beforeMask,P=void 0===F?null:F,R=function(e,t){var r={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(r[a]=e[a]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var s=0;for(a=Object.getOwnPropertySymbols(e);s<a.length;s++)t.indexOf(a[s])<0&&Object.prototype.propertyIsEnumerable.call(e,a[s])&&(r[a[s]]=e[a[s]])}return r}(e,["animate","animateBegin","backgroundColor","backgroundOpacity","baseUrl","children","foregroundColor","foregroundOpacity","gradientRatio","gradientDirection","uniqueKey","interval","rtl","speed","style","title","beforeMask"]),A=j||Math.random().toString(36).substring(6),Q=A+"-diff",M=A+"-animated-diff",z=A+"-aria",K=C?{transform:"scaleX(-1)"}:null,B="0; "+N+"; 1",X=O+"s",D="top-bottom"===x?"rotate(90)":void 0;return(0,a.createElement)("svg",s({"aria-labelledby":z,role:"img",style:s(s({},T),K)},R),S?(0,a.createElement)("title",{id:z},S):null,P&&(0,a.isValidElement)(P)?P:null,(0,a.createElement)("rect",{role:"presentation",x:"0",y:"0",width:"100%",height:"100%",clipPath:"url("+_+"#"+Q+")",style:{fill:"url("+_+"#"+M+")"}}),(0,a.createElement)("defs",null,(0,a.createElement)("clipPath",{id:Q},u),(0,a.createElement)("linearGradient",{id:M,gradientTransform:D},(0,a.createElement)("stop",{offset:"0%",stopColor:o,stopOpacity:l},r&&(0,a.createElement)("animate",{attributeName:"offset",values:-v+"; "+-v+"; 1",keyTimes:B,dur:X,repeatCount:"indefinite",begin:i})),(0,a.createElement)("stop",{offset:"50%",stopColor:m,stopOpacity:h},r&&(0,a.createElement)("animate",{attributeName:"offset",values:-v/2+"; "+-v/2+"; "+(1+v/2),keyTimes:B,dur:X,repeatCount:"indefinite",begin:i})),(0,a.createElement)("stop",{offset:"100%",stopColor:o,stopOpacity:l},r&&(0,a.createElement)("animate",{attributeName:"offset",values:"0; 0; "+(1+v),keyTimes:B,dur:X,repeatCount:"indefinite",begin:i})))))},n=function(e){return e.children?(0,a.createElement)(i,s({},e)):(0,a.createElement)(o,s({},e))},o=function(e){return(0,a.createElement)(n,s({viewBox:"0 0 476 124"},e),(0,a.createElement)("rect",{x:"48",y:"8",width:"88",height:"6",rx:"3"}),(0,a.createElement)("rect",{x:"48",y:"26",width:"52",height:"6",rx:"3"}),(0,a.createElement)("rect",{x:"0",y:"56",width:"410",height:"6",rx:"3"}),(0,a.createElement)("rect",{x:"0",y:"72",width:"380",height:"6",rx:"3"}),(0,a.createElement)("rect",{x:"0",y:"88",width:"178",height:"6",rx:"3"}),(0,a.createElement)("circle",{cx:"20",cy:"20",r:"20"}))};const c=n}}]);
//# sourceMappingURL=FeaturedRestaurants.526c5d26.chunk.js.map