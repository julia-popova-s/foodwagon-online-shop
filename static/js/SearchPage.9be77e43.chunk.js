(self.webpackChunkfoodwagon_online_shop=self.webpackChunkfoodwagon_online_shop||[]).push([[281],{4781:(e,t,a)=>{"use strict";a.d(t,{R:()=>l});var n=a(1694),r=a.n(n);const c="priceBlock_priceBlock__t4r3F",s="priceBlock_priceBlock__price__V9L2q",o="priceBlock_priceBlock__price_theme__jCrMH";var i=a(184);const l=e=>{let{classNames:t,discount:a,price:n}=e;return(0,i.jsxs)("div",{className:c,children:[a?(0,i.jsxs)("div",{className:r()(s,t),children:["$ ",(n-n*a/100).toFixed(2)]}):null,(0,i.jsxs)("div",{className:r()(s,t,{[o]:a}),children:["$",n.toFixed(2)]})]})}},6610:(e,t,a)=>{"use strict";a.d(t,{R:()=>n.R});var n=a(4781)},2945:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>B});var n=a(4843),r=a(3232),c=a(7597),s=a(2861),o=a(2791),i=a(4365),l=a(3947),_=a(8010),d=a(1087),u=a(549),h=a(4261),p=a(4781);const m={popup:"searchPagePopup_popup__HYphf",card:"searchPagePopup_card__zvoRz",card__left:"searchPagePopup_card__left__GRkul",card__image:"searchPagePopup_card__image__w1jwG",card__title:"searchPagePopup_card__title__XaWSR",card__price:"searchPagePopup_card__price__NfhTC",card__prices:"searchPagePopup_card__prices__j5ToS",priceBlock__price_theme:"searchPagePopup_priceBlock__price_theme__Ox84I",card_priceDiscount:"searchPagePopup_card_priceDiscount__odrrg",card__right:"searchPagePopup_card__right__bvWcf"};var f=a(184);const g=(0,o.forwardRef)(((e,t)=>{let{isLoaded:a,isOpen:n,list:r}=e;return(0,f.jsx)(u.Z,{classNames:"alert",in:n&&a,timeout:300,unmountOnExit:!0,children:(0,f.jsx)("div",{className:m.popup,ref:t,children:r.map((e=>{let{discount:t,id:a,image:n,price:r,restaurantId:c,title:s}=e;return(0,f.jsx)(d.rU,{className:m.link,to:"/restaurant/".concat(c,"/product/").concat(a),children:(0,f.jsxs)("div",{className:m.card,children:[(0,f.jsx)("div",{className:m.card__left,children:(0,f.jsx)("img",{alt:s,className:m.card__image,src:"/foodwagon-online-shop"+n})}),(0,f.jsxs)("div",{className:m.card__right,children:[(0,f.jsx)("div",{className:m.card__title,children:s}),(0,f.jsx)(p.R,{classNames:m.card__prices,discount:t,price:r})]})]})},(0,h.Z)())}))})})})),v="searchPanel_search__bwoBg",x="searchPanel_search__btn__GuW8r",b=()=>{const[e,t]=(0,o.useState)(""),[a,n]=(0,o.useState)(!1),c=(0,o.useRef)(null),d=(0,o.useRef)(null),u=(0,r.TL)(),h=(0,r.CG)(i.MX),p=(0,r.CG)(i.bQ),m=(0,r.CG)(s.PR),b=()=>{u((0,s.VN)({currentPage:1,limit:8,searchValue:e})),u((0,s.D4)(1)),n(!1),window.scrollTo(0,0)};(0,o.useEffect)((()=>{const e=e=>{var t,a;null!==(t=c.current)&&void 0!==t&&t.contains(e.target)||null!==(a=d.current)&&void 0!==a&&a.contains(e.target)?n(!0):n(!1)};return document.body.addEventListener("mousedown",e),()=>document.body.removeEventListener("mousedown",e)}),[]),(0,o.useEffect)((()=>{u((0,i.Nx)({currentPage:1,limit:4,searchValue:e})),u((0,s.D4)(1))}),[u,e]),(0,o.useEffect)((()=>{u((0,s.VN)({currentPage:m,limit:8,searchValue:e})),window.scrollTo(0,0)}),[m]);return(0,f.jsxs)("div",{className:v,children:[(0,f.jsx)(l.o,{handleKeyDown:e=>{"Enter"===e.key&&b()},handleSearchValue:e=>{t(e)},iconUrl:"/images/header/search.svg",placeholder:"Enter Your Request",ref:d}),(0,f.jsx)(_.Q,{classNames:x,handleClick:b,icon:"search",label:"Find Food"}),(0,f.jsx)(g,{isLoaded:h,isOpen:a,list:p,ref:c})]})};var j=a(8753),N=a(7707),P=a(8175);const y=e=>(0,f.jsxs)(P.ZP,{backgroundColor:"#f3f3f3",foregroundColor:"#ecebeb",height:503,speed:2,viewBox:"0 0 343 503",width:343,...e,children:[(0,f.jsx)("rect",{height:"228",rx:"16",ry:"16",width:"343",x:"0",y:"0"}),(0,f.jsx)("rect",{height:"53",rx:"8",ry:"8",width:"343",x:"0",y:"244"}),(0,f.jsx)("rect",{height:"26",rx:"8",ry:"8",width:"343",x:"0",y:"305"}),(0,f.jsx)("rect",{height:"26",rx:"8",ry:"8",width:"70",x:"0",y:"339"}),(0,f.jsx)("rect",{height:"60",rx:"8",ry:"8",width:"343",x:"0",y:"390"})]}),C="searchPage_searchPage__QJSEW",w="searchPage_title__kfxb3",k="searchPage_panel__Vczb8",I="searchPage_menuList__IhMJn",L="searchPage_menuList__item__v7-Fr",O="searchPage_message__+9ZIq",B=()=>{(0,n.q)();const e=(0,r.CG)(s.eH),t=(0,r.CG)(s.PR),a=(0,r.CG)(s.bQ),o=(0,r.CG)(s.MX),i=(0,r.CG)(s.dS),l=(0,r.TL)(),_=e=>{l((0,c.gK)(e))},d=e=>{l((0,c.gb)(e))},u=e=>{l((0,c.nQ)(e))},h=new Array(4).fill(0).map(((e,t)=>(0,f.jsx)(y,{},t)));return(0,f.jsx)("div",{className:C,children:(0,f.jsxs)("div",{className:"container",children:[(0,f.jsx)("div",{className:w,children:"Search Food"}),(0,f.jsx)("div",{className:k,children:(0,f.jsx)(b,{})}),"reject"===i&&"string"===typeof e&&(0,f.jsx)("div",{className:O,children:e}),(0,f.jsxs)("div",{className:I,children:[o&&a.map((e=>(0,f.jsx)(j.Z,{classNames:L,...e,handleCountInput:u,handleProductAdd:_,handleProductRemove:d},e.id))),"loading"===i&&h]}),i&&!e&&(0,f.jsx)(N.t,{currentPage:t,handlePageChange:e=>{l((0,s.D4)(e))},pageCount:3})]})})}},8753:(e,t,a)=>{"use strict";a.d(t,{Z:()=>g});var n=a(1632),r=a(9806),c=a(1694),s=a.n(c),o=a(1087),i=a(3232),l=a(7597),_=a(9807),d=a(6610),u=a(4032),h=a(1598),p=a(8010);const m={card:"card_card__U1p6D",card__up:"card_card__up__HDkkq",card__image:"card_card__image__cZROL",card__name:"card_card__name__hHTPj",card__location:"card_card__location__vExjm",card__locationIcon:"card_card__locationIcon__eX98w",card__price:"card_card__price__wRZm-",card__btn:"card_card__btn__giIGi",card__btns:"card_card__btns__0UUCZ",card__counter:"card_card__counter__YbYTm"};var f=a(184);const g=e=>{var t,a;const{classNames:c,discount:g,handleCountInput:v,handleProductAdd:x,handleProductRemove:b,id:j,image:N,price:P,restaurantId:y,restaurantName:C,title:w}=e,k={discount:g,id:j,image:N,price:P,restaurantId:y,restaurantName:C,title:w},I=null===(t=(0,i.CG)(l.iq)[y])||void 0===t||null===(a=t.items[j])||void 0===a?void 0:a.quantity,L=()=>{x(k)};return(0,f.jsxs)("div",{className:s()(m.card,c),children:[(0,f.jsx)("div",{className:m.card__up,children:(0,f.jsxs)(o.rU,{className:m.card__upLink,to:"/restaurant/".concat(y,"/product/").concat(j),children:[(0,f.jsx)("img",{alt:"food",className:m.card__image,src:"/foodwagon-online-shop"+N}),g>0&&(0,f.jsx)(u.s,{discount:g,view:"smallLabel"})]})}),(0,f.jsx)(o.rU,{className:m.card__name,to:"/restaurant/".concat(y,"/product/").concat(j),children:(0,_.O)(w,47)}),(0,f.jsxs)(o.rU,{className:m.card__location,to:"/restaurant/".concat(y,"/product/").concat(j),children:[(0,f.jsx)(r.G,{className:m.card__locationIcon,icon:n.opg}),(0,_.O)(C,24)]}),(0,f.jsx)(d.R,{classNames:m.card__price,discount:g,price:P}),I?(0,f.jsx)(h.a,{classNames:m.card__counter,handleProductMinus:()=>{b(k)},handleProductPlus:L,handleQuantityInput:e=>v({id:j,price:P,quantity:e,restaurantId:y}),quantity:I||0}):(0,f.jsx)(p.Q,{classNames:m.card__btn,handleClick:L,label:"Order Now"})]})}},4393:(e,t,a)=>{"use strict";a.d(t,{A:()=>i});var n=a(1694),r=a.n(n),c=a(2791);const s={buttons:"counter_buttons__OVEIu",buttons__input:"counter_buttons__input__LU3WF",button:"counter_button__TZDrT",disabledBtn:"counter_disabledBtn__k6ceu"};var o=a(184);const i=e=>{let{classNames:t,handleProductMinus:a,handleProductPlus:n,handleQuantityInput:i,quantity:l}=e;const[_,d]=(0,c.useState)(l);return(0,o.jsxs)("div",{className:r()(s.buttons,t),children:[(0,o.jsx)("button",{className:r()(s.button,s.buttons__plus,{[s.disabledBtn]:_>98}),disabled:_>98,onClick:()=>{n(),d(_+1)},children:"+"}),(0,o.jsx)("input",{className:r()(s.buttons__input),maxLength:2,onChange:e=>{const t=e.target.value.replace(/[^0-9]/gi,"");""!==t?(d(+t),i(+t)):d(0)},type:"text",value:_}),(0,o.jsx)("button",{className:r()(s.buttons__minus,s.button),onClick:()=>{a(),d(_-1)},children:"\u2013"})]})};i.defaultProps={quantity:0}},4032:(e,t,a)=>{"use strict";a.d(t,{s:()=>p});var n=a(1694),r=a.n(n);const c="discount_label__8oW+1",s="discount_label__discount__xZACj",o="discount_label__discountPercent__ninge",i="discount_label__discountOff__nYZns",l="discount_smallLabel__ZzO-o",_="discount_smallLabel__discount__c4Cpa",d="discount_smallLabel__discountPercent__GdmW4",u="discount_smallLabel__discountOff__WMe9z";var h=a(184);const p=e=>{let{classNames:t,discount:a,view:n}=e;const p="smallLabel"===n;return(0,h.jsxs)("div",{className:r()(c,t,{[l]:p}),children:[(0,h.jsx)("div",{className:r()(s,{[_]:p}),children:a}),(0,h.jsx)("div",{className:r()(o,{[d]:p}),children:"%"}),(0,h.jsx)("div",{className:r()(i,{[u]:p}),children:"off"})]})}},7707:(e,t,a)=>{"use strict";a.d(t,{t:()=>o});var n=a(6048),r=a.n(n);const c="pagination_root__LfyJU";var s=a(184);const o=e=>{let{currentPage:t,handlePageChange:a,pageCount:n}=e;return(0,s.jsx)(r(),{breakLabel:"...",className:c,forcePage:t-1,nextLabel:">",onPageChange:e=>a(e.selected+1),pageCount:n,pageRangeDisplayed:4,previousLabel:"<",renderOnZeroPageCount:null})}},3947:(e,t,a)=>{"use strict";a.d(t,{o:()=>m});var n=a(1694),r=a.n(n),c=a(5095),s=a.n(c),o=a(2791),i=a(3080);const l="textInput_search__EBFuj",_="textInput_search__input__XdEXy",d="textInput_search__inputIcon__1k8ND",u="textInput_search__clearBtn__rPrtc",h="textInput_search__clearIcon__dynk9";var p=a(184);const m=(0,o.forwardRef)(((e,t)=>{let{address:a,children:n,classNames:c,handleKeyDown:m,handleSearchValue:f,iconUrl:g,placeholder:v}=e;const x=(0,o.useRef)(null),[b,j]=(0,o.useState)(""),N=()=>{var e;j(""),f(""),null===(e=x.current)||void 0===e||e.focus()},P=(0,o.useCallback)(s()((e=>{f(e)}),500),[]);return(0,o.useEffect)((()=>{a&&j(a)}),[a]),(0,p.jsxs)("div",{className:r()(l,c),ref:t,children:[(0,p.jsx)("input",{onKeyDown:e=>{var t;m&&m(e),"Delete"===(t=e).key&&(t.preventDefault(),N())},autoComplete:"off",className:_,maxLength:150,name:"find",onChange:e=>{j(e.target.value),P(e.target.value)},placeholder:v,ref:x,type:"text",value:b}),b&&(0,p.jsx)("button",{className:u,onClick:N,children:(0,p.jsx)(i.Q,{className:h,src:"".concat("/foodwagon-online-shop","/images/ui/clear_icon.svg"),wrapper:"span"})}),n,g&&(0,p.jsx)(i.Q,{className:d,src:"".concat("/foodwagon-online-shop").concat(g),wrapper:"span"})]})}))},1598:(e,t,a)=>{"use strict";a.d(t,{a:()=>l});var n=a(1694),r=a.n(n),c=a(1087),s=a(4393);const o={buttons:"counterWithButton_buttons__ESchW",buttons__link:"counterWithButton_buttons__link__WKvso"};var i=a(184);const l=e=>{let{classNames:t,handleProductMinus:a,handleProductPlus:n,handleQuantityInput:l,quantity:_}=e;return(0,i.jsxs)("div",{className:o.buttons,children:[(0,i.jsx)(c.rU,{className:r()(o.buttons__link,o.buttons__link_color,t),to:"/cart",children:"To Cart"}),(0,i.jsx)(s.A,{classNames:o.buttons__counter,handleProductMinus:a,handleProductPlus:n,handleQuantityInput:l,quantity:_})]})}},8010:(e,t,a)=>{"use strict";a.d(t,{Q:()=>u});var n,r=a(1694),c=a.n(r),s=a(2791);function o(){return o=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e},o.apply(this,arguments)}function i(e,t){let{title:a,titleId:r,...c}=e;return s.createElement("svg",o({width:15,height:15,viewBox:"0 0 15 15",fill:"none",xmlns:"http://www.w3.org/2000/svg",ref:t,"aria-labelledby":r},c),a?s.createElement("title",{id:r},a):null,n||(n=s.createElement("path",{d:"M13.8086 12.3049L11.0742 9.57056C10.9375 9.46118 10.7734 9.37915 10.6094 9.37915H10.1719C10.9102 8.42212 11.375 7.21899 11.375 5.87915C11.375 2.76196 8.80469 0.19165 5.6875 0.19165C2.54297 0.19165 0 2.76196 0 5.87915C0 9.02368 2.54297 11.5667 5.6875 11.5667C7 11.5667 8.20312 11.1292 9.1875 10.3635V10.8284C9.1875 10.9924 9.24219 11.1565 9.37891 11.2932L12.0859 14.0002C12.3594 14.2737 12.7695 14.2737 13.0156 14.0002L13.7812 13.2346C14.0547 12.9885 14.0547 12.5784 13.8086 12.3049ZM5.6875 9.37915C3.74609 9.37915 2.1875 7.82056 2.1875 5.87915C2.1875 3.96509 3.74609 2.37915 5.6875 2.37915C7.60156 2.37915 9.1875 3.96509 9.1875 5.87915C9.1875 7.82056 7.60156 9.37915 5.6875 9.37915Z",fill:"white"})))}const l=s.forwardRef(i),_=(a.p,{searchButton:"searchButton_searchButton__HUIsC"});var d=a(184);const u=e=>{let{classNames:t,handleClick:a,icon:n,label:r}=e;return(0,d.jsxs)("button",{className:c()(_.searchButton,t),onClick:a,children:[n&&"search"===n&&(0,d.jsx)(l,{className:_.searchButton__icon}),(0,d.jsx)("span",{children:r})]})}},9807:(e,t,a)=>{"use strict";a.d(t,{O:()=>n});const n=(e,t)=>(null===e||void 0===e?void 0:e.length)>t?"".concat(e.slice(0,t-1),"..."):e},5095:(e,t,a)=>{var n=NaN,r="[object Symbol]",c=/^\s+|\s+$/g,s=/^[-+]0x[0-9a-f]+$/i,o=/^0b[01]+$/i,i=/^0o[0-7]+$/i,l=parseInt,_="object"==typeof a.g&&a.g&&a.g.Object===Object&&a.g,d="object"==typeof self&&self&&self.Object===Object&&self,u=_||d||Function("return this")(),h=Object.prototype.toString,p=Math.max,m=Math.min,f=function(){return u.Date.now()};function g(e){var t=typeof e;return!!e&&("object"==t||"function"==t)}function v(e){if("number"==typeof e)return e;if(function(e){return"symbol"==typeof e||function(e){return!!e&&"object"==typeof e}(e)&&h.call(e)==r}(e))return n;if(g(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=g(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=e.replace(c,"");var a=o.test(e);return a||i.test(e)?l(e.slice(2),a?2:8):s.test(e)?n:+e}e.exports=function(e,t,a){var n,r,c,s,o,i,l=0,_=!1,d=!1,u=!0;if("function"!=typeof e)throw new TypeError("Expected a function");function h(t){var a=n,c=r;return n=r=void 0,l=t,s=e.apply(c,a)}function x(e){var a=e-i;return void 0===i||a>=t||a<0||d&&e-l>=c}function b(){var e=f();if(x(e))return j(e);o=setTimeout(b,function(e){var a=t-(e-i);return d?m(a,c-(e-l)):a}(e))}function j(e){return o=void 0,u&&n?h(e):(n=r=void 0,s)}function N(){var e=f(),a=x(e);if(n=arguments,r=this,i=e,a){if(void 0===o)return function(e){return l=e,o=setTimeout(b,t),_?h(e):s}(i);if(d)return o=setTimeout(b,t),h(i)}return void 0===o&&(o=setTimeout(b,t)),s}return t=v(t)||0,g(a)&&(_=!!a.leading,c=(d="maxWait"in a)?p(v(a.maxWait)||0,t):c,u="trailing"in a?!!a.trailing:u),N.cancel=function(){void 0!==o&&clearTimeout(o),l=0,n=i=r=o=void 0},N.flush=function(){return void 0===o?s:j(f())},N}}}]);
//# sourceMappingURL=SearchPage.9be77e43.chunk.js.map