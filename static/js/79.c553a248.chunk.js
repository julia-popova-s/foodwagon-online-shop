"use strict";(self.webpackChunkfoodwagon_online_shop=self.webpackChunkfoodwagon_online_shop||[]).push([[79],{4079:function(t,e,r){r.r(e),r.d(e,{default:function(){return E}});var n=r(1413),a=r(5987),c=r(9439),_=r(1632),s=r(9806),o=r(1694),i=r.n(o),l=r(2791),d=r(9434),u=r(7689),m=r(1087),p=r(6721),f=r(4346),h=r(549),N="popup_popup__rG1+G",v="popup_popup__title__Biofz",x="popup_popup__btns__5TCjr",j="popup_popup__btnOk__m4OuS",b="popup_popup__btnClose__689yO",g="popup_popupWrapper__NXms1",k=r(184),P=(0,l.forwardRef)((function(t,e){var r=t.children,n=t.handleClickClose,a=t.handleClickOk,c=t.show;return(0,k.jsx)(h.Z,{classNames:"alert",in:c,timeout:300,unmountOnExit:!0,children:(0,k.jsx)("div",{className:g,ref:e,children:(0,k.jsxs)("div",{className:N,children:[(0,k.jsx)("div",{className:v,children:r}),(0,k.jsxs)("div",{className:x,children:[(0,k.jsx)("button",{className:j,onClick:a,children:"Ok"}),(0,k.jsx)("button",{className:b,onClick:n,children:"Close"})]})]})})})})),B=r(3169),C=r(630),I=r(4419),y=r(3782),w={product:"cardProduct_product__s-qdc",product__image:"cardProduct_product__image__GL2TH",product__img:"cardProduct_product__img__uSN0W",product__btnReturn:"cardProduct_product__btnReturn__1WSGY",product__btnDelete:"cardProduct_product__btnDelete__im5DQ",info:"cardProduct_info__dfnJ4",info__title:"cardProduct_info__title__T1w9w",info__titleLink:"cardProduct_info__titleLink__Vov6I",info__name:"cardProduct_info__name__uWlkJ",info__nameIcon:"cardProduct_info__nameIcon__8Oykf",info__nameLink:"cardProduct_info__nameLink__Q9Ibc",info__price:"cardProduct_info__price__GcIlz",info__price_theme:"cardProduct_info__price_theme__HNMvR",counter:"cardProduct_counter__QscCY",counter__btns:"cardProduct_counter__btns__DkHg4",counter__price:"cardProduct_counter__price__B3CNG",loadingBar:"cardProduct_loadingBar__OwFtW",loadingBar__inner:"cardProduct_loadingBar__inner__SF8Lb",loading:"cardProduct_loading__J8Z9J",loadingBar__shadow:"cardProduct_loadingBar__shadow__1SVsK",btnReturn:"cardProduct_btnReturn__9U0QV",returnedBlock:"cardProduct_returnedBlock__JLpDs",product__counterWithPrice:"cardProduct_product__counterWithPrice__C0D05",product__info:"cardProduct_product__info__Do9BC"};function L(t){var e=t.amount,r=t.discount,n=t.handleAddProduct,a=t.handleDeleteProduct,o=t.handleInputCount,d=t.handleRemoveProduct,u=t.id,p=t.image,f=t.price,h=t.quantity,N=t.restaurantId,v=t.restaurantName,x=t.title,j=(0,l.useState)(!1),b=(0,c.Z)(j,2),g=b[0],P=b[1],B={discount:r,id:u,image:p,price:f,restaurantId:N,restaurantName:v,title:x};return(0,l.useEffect)((function(){if(g){var t=setTimeout((function(){d({id:u,restaurantId:N})}),2e3);return function(){return clearTimeout(t)}}}),[g]),(0,k.jsxs)("div",{className:w.product,children:[(0,k.jsx)("div",{className:w.product__image,children:(0,k.jsxs)(m.rU,{className:w.product__imageLink,to:"/restaurant/".concat(N,"/product/").concat(u),children:[(0,k.jsx)("img",{alt:x,className:w.product__img,src:"/foodwagon-online-shop"+p}),r>0&&(0,k.jsx)(I.s,{classNames:w.product__discount,discount:r,view:"smallLabel"})]})}),g?(0,k.jsxs)("div",{className:w.returnedBlock,children:[(0,k.jsx)("button",{className:i()(w.btnReturn,w.product__btnReturn),onClick:function(){return P(!1)},children:"Restore to cart"}),(0,k.jsx)("div",{className:i()(w.loadingBar,w.product__loadingBar),children:(0,k.jsx)("div",{className:w.loadingBar__inner,children:(0,k.jsx)("div",{className:w.loadingBar__shadow})})})]}):(0,k.jsxs)(k.Fragment,{children:[(0,k.jsxs)("div",{className:i()(w.product__info,w.info),children:[(0,k.jsx)("p",{className:w.info__title,children:(0,k.jsx)(m.rU,{className:w.info__titleLink,to:"/restaurant/".concat(N,"/product/").concat(u),children:x})}),(0,k.jsxs)("p",{className:w.info__name,children:[(0,k.jsx)(s.G,{className:w.info__nameIcon,icon:_.opg}),(0,k.jsx)(m.rU,{className:w.info__nameLink,to:"/restaurant/".concat(N,"/product/").concat(u),children:v})]}),(0,k.jsx)(y.R,{discount:r,price:f})]}),(0,k.jsxs)("div",{className:i()(w.product__counter,w.counter),children:[(0,k.jsx)(C.A,{classNames:w.counter__btns,handleInputQuantity:function(t){t?o({id:u,price:f,quantity:t,restaurantId:N}):P(!0)},handleMinusProduct:function(){return a({id:u,restaurantId:N})},handlePlusProduct:function(){return n(B)},quantity:h}),(0,k.jsxs)("div",{className:w.counter__price,children:["$ ",e&&e.toFixed(2)]}),(0,k.jsx)("button",{className:i()(w.product__btnDelete,w.btnDelete),onClick:function(){return P(!0)},children:"x"})]})]})]})}var Z="modal_popup__fhq58",O="modal_popup__title__Mga-t",R="modal_popup__name__FnjNj",S="modal_popup__btns__bCXdk",D="modal_popup__btnClose__uZ746",q="modal_popupWrapper__ZJHkL",F=(0,l.forwardRef)((function(t,e){var r=t.handleCloseModal,n=t.name,a=t.orderNumber,c=t.show,_=(0,d.v9)(f.Cn);return(0,k.jsx)(h.Z,{classNames:"alert",in:c,timeout:300,unmountOnExit:!0,children:(0,k.jsx)("div",{className:q,ref:e,children:(0,k.jsxs)("div",{className:Z,children:[(0,k.jsx)("div",{className:O,children:(0,k.jsxs)("span",{className:R,children:["Order \u2116",a," from restaurant \xab",n,"\xbb was created, user: ",_]})}),(0,k.jsx)("div",{className:S,children:(0,k.jsx)("button",{className:D,onClick:r,children:"Close"})})]})})})})),W={cart:"cartPage_cart__QNVyK",cart__title:"cartPage_cart__title__q9M5V",cart__inner:"cartPage_cart__inner__sze1T",cart__top:"cartPage_cart__top__Lbtwl",cart__list:"cartPage_cart__list__p9v9d",cart__name:"cartPage_cart__name__kTvBY",cart__empty:"cartPage_cart__empty__e+d5B",cart__result:"cartPage_cart__result__L3C0y",cart__result_color:"cartPage_cart__result_color__D5ybm",cart__image:"cartPage_cart__image__f4SYa",cart__clear:"cartPage_cart__clear__TAml9",cart__clearIcon:"cartPage_cart__clearIcon__cTSDR",cart__clearBtn:"cartPage_cart__clearBtn__-P6VK",cart__btnOrder:"cartPage_cart__btnOrder__38Z8z",cart__orderInfo:"cartPage_cart__orderInfo__Flri+",cart__restaurantName:"cartPage_cart__restaurantName__ZzbLm",cart__links:"cartPage_cart__links__kZpll",cart__linkItem:"cartPage_cart__linkItem__V1Ao7",popup__name:"cartPage_popup__name__dWw58"},T=["quantity"],V=0;var E=function(){var t=(0,u.TH)().pathname,e=(0,l.useState)(""),r=(0,c.Z)(e,2),o=r[0],h=r[1],N=(0,l.useState)(""),v=(0,c.Z)(N,2),x=v[0],j=v[1],b=(0,l.useState)(!1),g=(0,c.Z)(b,2),C=g[0],I=g[1],y=(0,l.useState)(!1),w=(0,c.Z)(y,2),Z=w[0],O=w[1],R=(0,l.useRef)(null),S=(0,l.useRef)(null),D=(0,d.v9)(p.fU),q=(0,d.v9)(p.iq),E=(0,d.v9)(p.co),Q=(0,d.v9)(f.Kj),A=(0,d.I0)(),G=(0,u.s0)();return(0,l.useEffect)((function(){window.scrollTo(0,0)}),[t]),(0,l.useEffect)((function(){var t=function(t){var e;null!==(e=R.current)&&void 0!==e&&e.contains(t.target)&&I(!1)};return document.body.addEventListener("click",t),function(){return document.body.removeEventListener("click",t)}}),[]),E?(0,k.jsxs)("div",{className:W.cart,children:[(0,k.jsxs)("div",{className:i()(W.cart__container,"container"),children:[(0,k.jsx)("h1",{className:W.cart__title,children:"Shopping cart"}),(0,k.jsx)("div",{className:W.cart__inner,children:E&&D.map((function(t){var e=(0,c.Z)(t,2),r=e[0],o=e[1],d=Object.values(o.items),u=o.totalAmount,m=o.totalCount,N=d[0]&&d[0].restaurantName;return(0,k.jsxs)("div",{className:i()(W.cart__order,W.cart__order_border),children:[(0,k.jsxs)("div",{className:W.cart__top,children:[(0,k.jsx)("div",{className:W.cart__restaurantName,children:N}),(0,k.jsx)("div",{className:W.cart__clear,children:(0,k.jsxs)("button",{className:W.cart__clearBtn,onClick:function(){return function(t){var e=t.restaurantId,r=t.restaurantName;h(r),j(e),I(!0)}({restaurantId:r,restaurantName:N})},children:[(0,k.jsx)(s.G,{className:W.cart__clearIcon,icon:_.Vui,size:"lg"}),"clear"]})})]}),(0,k.jsx)("div",{className:W.cart__list,children:m?(0,k.jsxs)(k.Fragment,{children:[d.map((function(t){var e=t.quantity,r=(0,a.Z)(t,T);return(0,l.createElement)(L,(0,n.Z)((0,n.Z)({},r),{},{handleAddProduct:function(t){return e=t,void A((0,p.gK)(e));var e},handleDeleteProduct:function(t){return function(t,e){var r=t.id,n=t.restaurantId;A(e<1?(0,p.kh)({id:r,restaurantId:n}):(0,p.gb)({id:r,restaurantId:n}))}(t,e)},handleInputCount:function(t){return function(t){A((0,p.nQ)(t))}(t)},handleRemoveProduct:function(t){return function(t){var e=t.id,r=t.restaurantId;A((0,p.kh)({id:e,restaurantId:r}))}(t)},key:r.id,quantity:e}))})),(0,k.jsxs)("div",{className:i()(W.cart__orderInfo,W.cart__orderInfo_border),children:[(0,k.jsxs)("p",{className:W.cart__result,children:["Your order for the total amount $"," ",(0,k.jsx)("span",{className:W.cart__result_color,children:u&&u.toFixed(2)})," and"," ",(0,k.jsx)("span",{className:W.cart__result_color,children:m})," items"]}),(0,k.jsx)(B.s,{name:"Place an order",onClick:function(){return function(t,e){var r=q[t];Q?(h(e),j(t),V++,O(!0),A((0,f.qQ)({list:r,name:e,orderNumber:V}))):G("/login")}(r,N)}})]})]}):null})]},r)}))})]}),(0,k.jsx)(F,{handleCloseModal:function(){A((0,p.LL)({restaurantId:x})),O(!1)},name:o,orderNumber:V,ref:S,show:Z}),(0,k.jsx)(P,{handleClickClose:function(){I(!1)},handleClickOk:function(){A((0,p.LL)({restaurantId:x})),I(!1)},ref:R,show:C,children:(0,k.jsxs)(k.Fragment,{children:["Are you sure you want to empty the cart from ",(0,k.jsxs)("span",{className:W.popup__name,children:["\xab",o,"\xbb"]}),"?"]})})]}):(0,k.jsx)("div",{className:W.cart,children:(0,k.jsx)("div",{className:i()(W.cart__container,"container"),children:(0,k.jsx)("div",{className:W.cart__inner,children:(0,k.jsxs)("div",{className:W.cart__empty,children:[(0,k.jsx)("p",{className:W.cart__name,children:"Shopping cart is empty"}),(0,k.jsx)("p",{className:W.cart__result,children:"Use the search to find everything you need."}),(0,k.jsxs)("p",{className:W.cart__links,children:["Go to"," ",(0,k.jsx)(m.rU,{className:W.cart__linkItem,to:"/search",children:"search page"})," ","or"," ",(0,k.jsx)(m.rU,{className:W.cart__linkItem,to:"/",children:"menu"})]})]})})})})}},3782:function(t,e,r){r.d(e,{R:function(){return o}});var n=r(4942),a=r(1694),c=r.n(a),_={priceBlock__price:"priceBlock_priceBlock__price__tSCxu",priceBlock__price_theme:"priceBlock_priceBlock__price_theme__2tPMo"},s=r(184);function o(t){var e=t.classNames,r=t.discount,a=t.price;return(0,s.jsxs)("div",{className:_.priceBlock,children:[r?(0,s.jsxs)("div",{className:c()(_.priceBlock__price,e),children:["$ ",(a-a*r/100).toFixed(2)]}):null,(0,s.jsxs)("div",{className:c()(_.priceBlock__price,e,(0,n.Z)({},_.priceBlock__price_theme,r)),children:["$",a.toFixed(2)]})]})}},630:function(t,e,r){r.d(e,{A:function(){return l}});var n=r(4942),a=r(9439),c=r(1694),_=r.n(c),s=r(2791),o={buttons:"counter_buttons__5pKLK",buttons__input:"counter_buttons__input__U1D55",button:"counter_button__WVIk7",disabledBtn:"counter_disabledBtn__q76Lf"},i=r(184);function l(t){var e=t.classNames,r=t.handleInputQuantity,c=t.handleMinusProduct,l=t.handlePlusProduct,d=t.quantity,u=(0,s.useState)(d),m=(0,a.Z)(u,2),p=m[0],f=m[1];return(0,i.jsxs)("div",{className:_()(o.buttons,e),children:[(0,i.jsx)("button",{className:_()(o.button,o.buttons__plus,(0,n.Z)({},o.disabledBtn,p>98)),disabled:p>98,onClick:function(){l(),f(p+1)},children:"+"}),(0,i.jsx)("input",{className:_()(o.buttons__input),maxLength:"2",onChange:function(t){var e=t.target.value.replace(/[^0-9]/gi,"");""!==e?(f(+e),r(+e)):f("")},type:"text",value:p}),(0,i.jsx)("button",{className:_()(o.buttons__minus,o.button),onClick:function(){c(),f(p-1)},children:"\u2013"})]})}l.defaultProps={quantity:0}},4419:function(t,e,r){r.d(e,{s:function(){return f}});var n=r(4942),a=r(1694),c=r.n(a),_="discount_label__3nKEK",s="discount_label__discount__jZAvi",o="discount_label__discountPercent__eFk2O",i="discount_label__discountOff__6R3Oo",l="discount_smallLabel__W+3VV",d="discount_smallLabel__discount__sDwyk",u="discount_smallLabel__discountPercent__Jc6pB",m="discount_smallLabel__discountOff__DYXzc",p=r(184);function f(t){var e=t.classNames,r=t.discount,a="smallLabel"===t.view;return(0,p.jsxs)("div",{className:c()(_,e,(0,n.Z)({},l,a)),children:[(0,p.jsx)("div",{className:c()(s,(0,n.Z)({},d,a)),children:r}),(0,p.jsx)("div",{className:c()(o,(0,n.Z)({},u,a)),children:"%"}),(0,p.jsx)("div",{className:c()(i,(0,n.Z)({},m,a)),children:"off"})]})}},3169:function(t,e,r){r.d(e,{s:function(){return o}});var n=r(1694),a=r.n(n),c=r(3080),_={orderButton:"orderButton_orderButton__Bi4Wd"},s=r(184);function o(t){var e=t.classNames,r=t.name,n=t.onClick;return(0,s.jsxs)("button",{className:a()(_.orderButton,e),onClick:n,children:[r,(0,s.jsx)(c.Q,{className:_.orderButton__icon,src:"".concat("/foodwagon-online-shop","/images/cards-big/btn.svg"),wrapper:"span"})]})}},5987:function(t,e,r){r.d(e,{Z:function(){return a}});var n=r(3366);function a(t,e){if(null==t)return{};var r,a,c=(0,n.Z)(t,e);if(Object.getOwnPropertySymbols){var _=Object.getOwnPropertySymbols(t);for(a=0;a<_.length;a++)r=_[a],e.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(t,r)&&(c[r]=t[r])}return c}}}]);
//# sourceMappingURL=79.c553a248.chunk.js.map