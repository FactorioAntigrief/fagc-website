(this["webpackJsonpfagc-website"]=this["webpackJsonpfagc-website"]||[]).push([[0],{174:function(e,t,n){},175:function(e,t,n){},220:function(e,t,n){"use strict";n.r(t);var c=n(0),a=n.n(c),i=n(56),o=n.n(i),r=(n(174),n(175),n(297)),l=n(29),s=n.n(l),d=n(88),u=n(7),j=n(295),m=n(150),b=n(233),h=new(n(87).FAGCWrapper)({apiurl:"http://localhost:3000",socketurl:"ws://localhost:8000",enableWebSocket:!1}),f=n(141),p=n(299),O=n(285),x=n(300),v=n(301),y=n(291),g=n(143),w=Object(g.a)({palette:{primary:{main:"#1e88e5",light:"#6ab7ff",dark:"#005cb2"},secondary:{main:"#7b1fa2",light:"#ae52d4",dark:"#4a0072"},background:{default:"#182528",paper:"#263438"}},typography:{fontFamily:["Roboto","Open Sans"].join(","),fontSize:16}}),k=Object(y.a)({root:{background:w.palette.background.default},p:{color:"#ddd9d9"},pmono:{color:"#ddd9d9",fontFamily:"Roboto Mono"},footerData:{color:"#ffffff"},columnHeader:{color:"#ffffff"}}),C=n(2),I=function(e){var t=e.reports,n=(e.withProfileData,Object(c.useState)(null)),a=Object(u.a)(n,2),i=a[0],o=a[1],r=Object(c.useState)(!1),l=Object(u.a)(r,2),m=l[0],b=l[1],y=Object(c.useState)(null),g=Object(u.a)(y,2),w=g[0],I=g[1],S=Object(c.useState)(null),N=Object(u.a)(S,2),D=N[0],R=N[1],F=Object(c.useState)(null),B=Object(u.a)(F,2),P=B[0],L=B[1],A=Object(c.useState)(!1),E=Object(u.a)(A,2),G=E[0],H=E[1],T=k();Object(c.useEffect)((function(){if(!G&&i){var e=function(){var e=Object(d.a)(s.a.mark((function e(){var n,c,a;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return H(!0),I(null),n=t.find((function(e){return e.id===i})),e.next=5,h.rules.fetchRule(n.brokenRule);case 5:return c=e.sent,e.next=8,h.communities.fetchCommunity(n.communityId);case 8:a=e.sent,L(c),R(a),I(n),H(!1);case 13:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();e()}}),[i]);var W=t.map((function(e){return{id:e.id,col1:e.id,col2:e.playername,col3:e.brokenRule,col4:e.communityId,col5:e.adminId}})),J=[{field:"col1",headerName:"ID",cellClassName:T.pmono},{field:"col2",headerName:"Playername",width:144,cellClassName:T.p},{field:"col3",headerName:"Broken rule",width:120,cellClassName:T.pmono},{field:"col4",headerName:"Community ID",width:128,cellClassName:T.pmono},{field:"col5",headerName:"Admin ID",width:196,cellClassName:T.pmono}],M=Object(C.jsxs)(p.a,{open:m,onClose:function(){return b(!1)},children:[Object(C.jsxs)(O.a,{children:["Report with ID ",i]}),Object(C.jsxs)(x.a,{children:[Object(C.jsxs)(v.a,{children:["Playername: ",null===w||void 0===w?void 0:w.playername]}),Object(C.jsxs)(v.a,{children:["Broken rule ID: ",null===w||void 0===w?void 0:w.brokenRule]}),Object(C.jsxs)(v.a,{children:["Broken Rule short description:"," ",G?Object(C.jsx)(j.a,{style:{display:"inline"},width:"4rem"}):null===P||void 0===P?void 0:P.shortdesc]}),Object(C.jsxs)(v.a,{children:["Broken Rule long description:"," ",G?Object(C.jsx)(j.a,{style:{display:"inline"},width:"4rem"}):null===P||void 0===P?void 0:P.longdesc]}),Object(C.jsxs)(v.a,{children:["Community ID: ",null===w||void 0===w?void 0:w.communityId]}),Object(C.jsxs)(v.a,{children:["Community name:"," ",G?Object(C.jsx)(j.a,{style:{display:"inline"},width:"4rem"}):null===D||void 0===D?void 0:D.name]}),Object(C.jsxs)(v.a,{children:["Community contact:"," ",G?Object(C.jsx)(j.a,{style:{display:"inline"},width:"4rem"}):null===D||void 0===D?void 0:D.contact]})]})]});return console.log(T.columnHeader),Object(C.jsxs)(C.Fragment,{children:[Object(C.jsx)(f.a,{rows:W,columns:J,classes:{rowCount:T.columnHeader},onRowDoubleClick:function(e){o(e.row.col1),b(!0)}}),M]})},S=function(e){var t=e.playername,n=e.communityId,a=Object(c.useState)(null),i=Object(u.a)(a,2),o=i[0],l=i[1],f=Object(c.useState)(!0),p=Object(u.a)(f,2),O=p[0],x=p[1],v=k();Object(c.useEffect)((function(){var e=function(){var e=Object(d.a)(s.a.mark((function e(){var c;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,h.profiles.fetchCommunity(t,n);case 2:if(c=e.sent,l(c),!c){e.next=7;break}return e.next=7,h.communities.fetchCommunity(c.communityId);case 7:x(!1);case 8:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();e()}),[]);var y=function(e){return Object(C.jsx)(j.a,{style:{display:"inline-block"},width:null!==e&&void 0!==e?e:"4em"})};if(o&&!O||!o&&O){var g=h.communities.resolveID((null===o||void 0===o?void 0:o.communityId)||"");return Object(C.jsxs)(m.a,{style:{margin:16,padding:16,alignItems:"center",alignContent:"center"},elevation:1,children:[Object(C.jsxs)(b.a,{variant:"h2",className:v.p,children:["Playername: ",O?y():null===o||void 0===o?void 0:o.playername]}),Object(C.jsxs)(b.a,{variant:"h3",className:v.p,children:["Community:"," ",O?y("6em"):"".concat(null===g||void 0===g?void 0:g.name," (").concat(null===g||void 0===g?void 0:g.id,")")]}),o&&o.reports&&Object(C.jsx)("div",{style:{height:384,width:768,marginLeft:"auto",marginRight:"auto"},children:Object(C.jsx)(I,{reports:o.reports})})]})}return O?Object(C.jsx)(r.a,{item:!0,xs:"auto",children:Object(C.jsx)("p",{children:"Loading..."})}):Object(C.jsx)("div",{children:"An error occured"})};var N=function(){return Object(C.jsx)("div",{className:"App",children:Object(C.jsx)(r.a,{container:!0,spacing:2,direction:"column",alignItems:"center",children:Object(C.jsx)(S,{playername:"Windsinger",communityId:"p1UgG0G"})})})},D=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,305)).then((function(t){var n=t.getCLS,c=t.getFID,a=t.getFCP,i=t.getLCP,o=t.getTTFB;n(e),c(e),a(e),i(e),o(e)}))},R=n(298),F=n(290),B=n(287),P=n(304),L=n(65),A=n(64),E=n(288),G=function(){var e=Object(c.useState)(!1),t=Object(u.a)(e,2),n=t[0],a=t[1];return window.addEventListener("scroll",(function(){a(window.scrollY>100)})),Object(C.jsx)(B.a,{in:n,children:Object(C.jsx)(P.a,{sx:{position:"fixed",bottom:"50px",right:"50px"},children:Object(C.jsx)(L.a,{onClick:function(){return window.scrollTo({top:0,behavior:"smooth"})},children:Object(C.jsx)(A.a,{children:Object(C.jsx)(E.a,{})})})})})},H=n(289);n(218),n(219);o.a.render(Object(C.jsx)(a.a.StrictMode,{children:Object(C.jsx)(R.a,{theme:w,children:Object(C.jsxs)(H.a,{injectFirst:!0,children:[Object(C.jsx)(F.a,{}),Object(C.jsx)(N,{}),Object(C.jsx)(G,{})]})})}),document.getElementById("root")),D()}},[[220,1,2]]]);
//# sourceMappingURL=main.39e3dc14.chunk.js.map