"use strict";(self.webpackChunkfoodwagon_online_shop=self.webpackChunkfoodwagon_online_shop||[]).push([[129],{6650:(t,e,s)=>{s.r(e),s.d(e,{default:()=>b});var a=s(1694),n=s.n(a),r=s(2791),c=s(5717),l=s(3232),o=s(7597),i=s(5900),_=s(8753),d=s(8271),u=s(8175);const p={popularItems:"popularItems_popularItems__YrFTO",popularItems__title:"popularItems_popularItems__title__JbuVR",popularItems__list:"popularItems_popularItems__list__tKh6Q",popularItems__btn:"popularItems_popularItems__btn__Xrxcw",popularItems__btn_left:"popularItems_popularItems__btn_left__LedI-",popularItems__btn_right:"popularItems_popularItems__btn_right__uMA7k",popularItems__card:"popularItems_popularItems__card__i-nUD",container:"popularItems_container__6N16x",loader:"popularItems_loader__rEjYQ"};var m=s(184);const h=t=>(0,m.jsxs)(u.ZP,{backgroundColor:"#f3f3f3",foregroundColor:"#ecebeb",height:469,speed:2,viewBox:"0 0 283 469",width:283,...t,className:p.loader,children:[(0,m.jsx)("rect",{height:"239",rx:"16",ry:"16",width:"283",x:"0",y:"0"}),(0,m.jsx)("rect",{height:"53",rx:"8",ry:"8",width:"283",x:"0",y:"255"}),(0,m.jsx)("rect",{height:"26",rx:"8",ry:"8",width:"283",x:"0",y:"316"}),(0,m.jsx)("rect",{height:"26",rx:"8",ry:"8",width:"70",x:"0",y:"350"}),(0,m.jsx)("rect",{height:"60",rx:"8",ry:"8",width:"283",x:"0",y:"409"})]}),b=()=>{const t=(0,l.TL)(),e=(0,r.useRef)(null);(0,r.useEffect)((()=>{t((0,i.Sv)({currentPage:2,limit:10,rating:5}))}),[]);const s=(0,l.CG)(i.MX),a=(0,l.CG)(i.bQ),u={dots:!1,infinite:!0,nextArrow:(0,m.jsx)(d.v,{classNames:n()(p.popularItems__btn,p.popularItems__btn_right),handleClick:()=>{var t;return null===e||void 0===e||null===(t=e.current)||void 0===t?void 0:t.slickNext()},type:"right"}),prevArrow:(0,m.jsx)(d.v,{classNames:n()(p.popularItems__btn,p.popularItems__btn_left),handleClick:()=>{var t;return null===e||void 0===e||null===(t=e.current)||void 0===t?void 0:t.slickPrev()},type:"left"}),responsive:[{breakpoint:1770,settings:{dots:!1,infinite:!0,slidesToScroll:1,slidesToShow:4}},{breakpoint:1480,settings:{dots:!1,infinite:!0,slidesToScroll:1,slidesToShow:3}},{breakpoint:1180,settings:{dots:!1,infinite:!0,slidesToScroll:1,slidesToShow:2}},{breakpoint:760,settings:{dots:!1,infinite:!0,slidesToScroll:1,slidesToShow:1}}],slidesToScroll:1,slidesToShow:5,speed:500},b=new Array(5).fill(0).map(((t,e)=>(0,m.jsx)(h,{},e)));return(0,m.jsx)("section",{className:p.popularItemsBlock,children:(0,m.jsx)("div",{className:p.container,children:(0,m.jsxs)("div",{className:p.popularItems,children:[(0,m.jsx)("h3",{className:p.popularItems__title,children:"Popular items"}),(0,m.jsx)("div",{className:p.popularItems__list,children:(0,m.jsx)(c.Z,{...u,ref:e,children:s?a.map((e=>(0,m.jsx)(_.Z,{...e,classNames:p.popularItems__card,handleCountInput:e=>(e=>{t((0,o.nQ)(e))})(e),handleProductAdd:e=>{return s=e,void t((0,o.gK)(s));var s},handleProductRemove:e=>{return s=e,void t((0,o.gb)(s));var s}},e.id))):b})})]})})})}},4781:(t,e,s)=>{s.d(e,{R:()=>i});var a=s(1694),n=s.n(a);const r="priceBlock_priceBlock__t4r3F",c="priceBlock_priceBlock__price__V9L2q",l="priceBlock_priceBlock__price_theme__jCrMH";var o=s(184);const i=t=>{let{classNames:e,discount:s,price:a}=t;return(0,o.jsxs)("div",{className:r,children:[s?(0,o.jsxs)("div",{className:n()(c,e),children:["$ ",(a-a*s/100).toFixed(2)]}):null,(0,o.jsxs)("div",{className:n()(c,e,{[l]:s}),children:["$",a.toFixed(2)]})]})}},6610:(t,e,s)=>{s.d(e,{R:()=>a.R});var a=s(4781)},8753:(t,e,s)=>{s.d(e,{Z:()=>v});var a=s(1632),n=s(9806),r=s(1694),c=s.n(r),l=s(1087),o=s(3232),i=s(7597),_=s(9807),d=s(6610),u=s(4032),p=s(1598),m=s(8010);const h={card:"card_card__U1p6D",card__up:"card_card__up__HDkkq",card__image:"card_card__image__cZROL",card__name:"card_card__name__hHTPj",card__location:"card_card__location__vExjm",card__locationIcon:"card_card__locationIcon__eX98w",card__price:"card_card__price__wRZm-",card__btn:"card_card__btn__giIGi",card__btns:"card_card__btns__0UUCZ",card__counter:"card_card__counter__YbYTm"};var b=s(184);const v=t=>{var e,s;const{classNames:r,discount:v,handleCountInput:x,handleProductAdd:j,handleProductRemove:g,id:N,image:I,price:f,restaurantId:w,restaurantName:C,title:k}=t,y={discount:v,id:N,image:I,price:f,restaurantId:w,restaurantName:C,title:k},B=null===(e=(0,o.CG)(i.iq)[w])||void 0===e||null===(s=e.items[N])||void 0===s?void 0:s.quantity,P=()=>{j(y)};return(0,b.jsxs)("div",{className:c()(h.card,r),children:[(0,b.jsx)("div",{className:h.card__up,children:(0,b.jsxs)(l.rU,{className:h.card__upLink,to:"/restaurant/".concat(w,"/product/").concat(N),children:[(0,b.jsx)("img",{alt:"food",className:h.card__image,src:"/foodwagon-online-shop"+I}),v>0&&(0,b.jsx)(u.s,{discount:v,view:"smallLabel"})]})}),(0,b.jsx)(l.rU,{className:h.card__name,to:"/restaurant/".concat(w,"/product/").concat(N),children:(0,_.O)(k,47)}),(0,b.jsxs)(l.rU,{className:h.card__location,to:"/restaurant/".concat(w,"/product/").concat(N),children:[(0,b.jsx)(n.G,{className:h.card__locationIcon,icon:a.opg}),(0,_.O)(C,24)]}),(0,b.jsx)(d.R,{classNames:h.card__price,discount:v,price:f}),B?(0,b.jsx)(p.a,{classNames:h.card__counter,handleProductMinus:()=>{g(y)},handleProductPlus:P,handleQuantityInput:t=>x({id:N,price:f,quantity:t,restaurantId:w}),quantity:B||0}):(0,b.jsx)(m.Q,{classNames:h.card__btn,handleClick:P,label:"Order Now"})]})}},4393:(t,e,s)=>{s.d(e,{A:()=>o});var a=s(1694),n=s.n(a),r=s(2791);const c={buttons:"counter_buttons__OVEIu",buttons__input:"counter_buttons__input__LU3WF",button:"counter_button__TZDrT",disabledBtn:"counter_disabledBtn__k6ceu"};var l=s(184);const o=t=>{let{classNames:e,handleProductMinus:s,handleProductPlus:a,handleQuantityInput:o,quantity:i}=t;const[_,d]=(0,r.useState)(i);return(0,l.jsxs)("div",{className:n()(c.buttons,e),children:[(0,l.jsx)("button",{className:n()(c.button,c.buttons__plus,{[c.disabledBtn]:_>98}),disabled:_>98,onClick:()=>{a(),d(_+1)},children:"+"}),(0,l.jsx)("input",{className:n()(c.buttons__input),maxLength:2,onChange:t=>{const e=t.target.value.replace(/[^0-9]/gi,"");""!==e?(d(+e),o(+e)):d(0)},type:"text",value:_}),(0,l.jsx)("button",{className:n()(c.buttons__minus,c.button),onClick:()=>{s(),d(_-1)},children:"\u2013"})]})};o.defaultProps={quantity:0}},4032:(t,e,s)=>{s.d(e,{s:()=>m});var a=s(1694),n=s.n(a);const r="discount_label__8oW+1",c="discount_label__discount__xZACj",l="discount_label__discountPercent__ninge",o="discount_label__discountOff__nYZns",i="discount_smallLabel__ZzO-o",_="discount_smallLabel__discount__c4Cpa",d="discount_smallLabel__discountPercent__GdmW4",u="discount_smallLabel__discountOff__WMe9z";var p=s(184);const m=t=>{let{classNames:e,discount:s,view:a}=t;const m="smallLabel"===a;return(0,p.jsxs)("div",{className:n()(r,e,{[i]:m}),children:[(0,p.jsx)("div",{className:n()(c,{[_]:m}),children:s}),(0,p.jsx)("div",{className:n()(l,{[d]:m}),children:"%"}),(0,p.jsx)("div",{className:n()(o,{[u]:m}),children:"off"})]})}},1598:(t,e,s)=>{s.d(e,{a:()=>i});var a=s(1694),n=s.n(a),r=s(1087),c=s(4393);const l={buttons:"counterWithButton_buttons__ESchW",buttons__link:"counterWithButton_buttons__link__WKvso"};var o=s(184);const i=t=>{let{classNames:e,handleProductMinus:s,handleProductPlus:a,handleQuantityInput:i,quantity:_}=t;return(0,o.jsxs)("div",{className:l.buttons,children:[(0,o.jsx)(r.rU,{className:n()(l.buttons__link,l.buttons__link_color,e),to:"/cart",children:"To Cart"}),(0,o.jsx)(c.A,{classNames:l.buttons__counter,handleProductMinus:s,handleProductPlus:a,handleQuantityInput:i,quantity:_})]})}},8010:(t,e,s)=>{s.d(e,{Q:()=>u});var a,n=s(1694),r=s.n(n),c=s(2791);function l(){return l=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var s=arguments[e];for(var a in s)Object.prototype.hasOwnProperty.call(s,a)&&(t[a]=s[a])}return t},l.apply(this,arguments)}function o(t,e){let{title:s,titleId:n,...r}=t;return c.createElement("svg",l({width:15,height:15,viewBox:"0 0 15 15",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:e,"aria-labelledby":n},r),s?c.createElement("title",{id:n},s):null,a||(a=c.createElement("path",{d:"M13.8086 12.3049L11.0742 9.57056C10.9375 9.46118 10.7734 9.37915 10.6094 9.37915H10.1719C10.9102 8.42212 11.375 7.21899 11.375 5.87915C11.375 2.76196 8.80469 0.19165 5.6875 0.19165C2.54297 0.19165 0 2.76196 0 5.87915C0 9.02368 2.54297 11.5667 5.6875 11.5667C7 11.5667 8.20312 11.1292 9.1875 10.3635V10.8284C9.1875 10.9924 9.24219 11.1565 9.37891 11.2932L12.0859 14.0002C12.3594 14.2737 12.7695 14.2737 13.0156 14.0002L13.7812 13.2346C14.0547 12.9885 14.0547 12.5784 13.8086 12.3049ZM5.6875 9.37915C3.74609 9.37915 2.1875 7.82056 2.1875 5.87915C2.1875 3.96509 3.74609 2.37915 5.6875 2.37915C7.60156 2.37915 9.1875 3.96509 9.1875 5.87915C9.1875 7.82056 7.60156 9.37915 5.6875 9.37915Z",fill:"white"})))}const i=c.forwardRef(o),_=(s.p,{searchButton:"searchButton_searchButton__HUIsC"});var d=s(184);const u=t=>{let{classNames:e,handleClick:s,icon:a,label:n}=t;return(0,d.jsxs)("button",{className:r()(_.searchButton,e),onClick:s,children:[a&&"search"===a&&(0,d.jsx)(i,{className:_.searchButton__icon}),(0,d.jsx)("span",{children:n})]})}},8271:(t,e,s)=>{s.d(e,{v:()=>_});var a=s(1694),n=s.n(a),r=s(3080);const c={sliderButton:"sliderButton_sliderButton__H5qWS"};var l=s(184);const o="/images/ui/arrow_left.svg",i="/images/ui/arrow_right.svg",_=t=>{let{classNames:e,handleClick:s,type:a}=t;return(0,l.jsx)("button",{className:n()(c.sliderButton,e),onClick:s,children:"left"===a?(0,l.jsx)(r.Q,{className:c.sliderButton__arrow,src:"".concat("/foodwagon-online-shop").concat(o)}):(0,l.jsx)(r.Q,{className:c.sliderButton__arrow,src:"".concat("/foodwagon-online-shop").concat(i)})})}},9807:(t,e,s)=>{s.d(e,{O:()=>a});const a=(t,e)=>(null===t||void 0===t?void 0:t.length)>e?"".concat(t.slice(0,e-1),"..."):t}}]);
//# sourceMappingURL=PopularItems.3c042bfd.chunk.js.map