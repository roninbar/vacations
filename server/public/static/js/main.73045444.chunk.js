(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{68:function(e,t,a){e.exports=a(84)},69:function(e,t,a){},78:function(e,t,a){},84:function(e,t,a){"use strict";a.r(t);a(69);var n=a(0),r=a.n(n),o=a(8),s=a.n(o),i=a(22),c=(a(78),a(21)),u=a(11),l=a(30),m=a(12),p=a.n(m),d=a(15),h=a(31),f=a(32),v=a(34),b=a(33),g=a(117),O=a(4),E=a(126);function w(e){return{type:"LOGIN",payload:e}}var y=function(e){Object(v.a)(a,e);var t=Object(b.a)(a);function a(e){var n;return Object(h.a)(this,a),(n=t.call(this,e)).state={username:"",password:"",submitted:!1},n}return Object(f.a)(a,[{key:"onSubmit",value:function(){var e=Object(d.a)(p.a.mark((function e(t){var a,n,r,o,s,i;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),a=this.props,n=a.logIn,r=a.history,o=this.state,s=o.username,i=o.password,this.setState({submitted:!0}),e.next=6,n(s,i);case 6:r.replace("/");case 7:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"onChangeField",value:function(e){var t=e.target,a=t.name,n=t.value;this.setState(Object(l.a)({},a,n))}},{key:"render",value:function(){var e=this.props.classes,t=this.state,a=t.username,n=t.password,o=t.submitted;return r.a.createElement("form",{className:e.root,noValidate:!0,autoComplete:"off",onSubmit:this.onSubmit.bind(this)},r.a.createElement(E.a,{variant:"outlined",type:"text",name:"username",label:"Username",value:a,onChange:this.onChangeField.bind(this)}),r.a.createElement(E.a,{variant:"outlined",type:"password",name:"password",label:"Password",value:n,onChange:this.onChangeField.bind(this)}),r.a.createElement(g.a,{type:"submit",variant:"contained",color:"primary",size:"large",disabled:!a||!n||o},"Log In"))}}]),a}(n.Component),j=Object(i.b)(null,(function(e){return{logIn:function(t,a){return e(function(e,t){return function(){var a=Object(d.a)(p.a.mark((function a(n){var r,o;return p.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return(r=new URLSearchParams).set("username",e),r.set("password",t),a.next=5,fetch("/user/login",{method:"POST",body:r});case 5:if(!(200<=(o=a.sent).status&&o.status<300)){a.next=16;break}return a.t0=n,a.t1=w,a.next=11,o.json();case 11:a.t2=a.sent,a.t3=(0,a.t1)(a.t2),(0,a.t0)(a.t3),a.next=17;break;case 16:400<=o.status&&o.status<500?n({type:"AUTH_ERROR"}):n({type:"UNKNOWN_ERROR"});case 17:case"end":return a.stop()}}),a)})));return function(e){return a.apply(this,arguments)}}()}(t,a))}}}))(Object(u.g)(Object(O.a)((function(e){return{root:{"& .MuiTextField-root, & .MuiButton-root":{margin:e.spacing(1)},"& .MuiTextField-root":{width:"25ch"}}}}))(y))),x=a(24);var C=Object(i.b)((function(e){return{username:e.user.name}}),null)((function(e){var t=e.username,a=e.component,n=Object(x.a)(e,["username","component"]);return r.a.createElement(u.b,Object.assign({},n,{render:function(e){return t?r.a.createElement(a,e):r.a.createElement(u.a,{to:{pathname:"/login",state:{referer:e.location}}})}}))})),R=function(e){Object(v.a)(a,e);var t=Object(b.a)(a);function a(e){var n;return Object(h.a)(this,a),(n=t.call(this,e)).state={firstname:"",lastname:"",username:"",password:"",password2:"",available:!0,submitted:!1},n}return Object(f.a)(a,[{key:"onChange",value:function(e){var t=e.target,a=t.name,n=t.value;this.setState(Object(l.a)({},a,n))}},{key:"onSubmit",value:function(){var e=Object(d.a)(p.a.mark((function e(t){var a,n,r,o,s,i,c;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),this.setState({submitted:!0}),e.prev=2,a=this.state,n=a.firstname,r=a.lastname,o=a.username,s=a.password,(i=new URLSearchParams).set("firstname",n),i.set("lastname",r),i.set("username",o),i.set("password",s),e.next=11,fetch("/user",{method:"POST",body:i});case 11:c=e.sent,201===c.status&&this.setState({firstname:"",lastname:"",username:"",password:"",password2:""});case 14:return e.prev=14,this.setState({submitted:!1}),e.finish(14);case 17:case"end":return e.stop()}}),e,this,[[2,,14,17]])})));return function(t){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this.state,t=e.firstname,a=e.lastname,n=e.username,o=e.available,s=e.password,i=e.password2,c=e.submitted,u=this.props.classes;return r.a.createElement("form",{className:u.root,noValidate:!0,autoComplete:"off",onSubmit:this.onSubmit.bind(this)},r.a.createElement(E.a,{variant:"outlined",type:"text",name:"firstname",label:"First Name",helperText:!t&&"Required.",error:!t,value:t,onChange:this.onChange.bind(this)}),r.a.createElement(E.a,{variant:"outlined",type:"text",name:"lastname",label:"Last Name",helperText:!a&&"Required.",error:!a,value:a,onChange:this.onChange.bind(this)}),r.a.createElement(E.a,{variant:"outlined",type:"text",name:"username",label:"Username",helperText:n?!o&&'"'.concat(n,'" is not available.'):"Required.",error:!n||!o,value:n,onChange:this.onChange.bind(this)}),r.a.createElement(E.a,{variant:"outlined",type:"password",name:"password",label:"Password",helperText:!s&&"Required.",error:!s,value:s,onChange:this.onChange.bind(this)}),r.a.createElement(E.a,{variant:"outlined",type:"password",name:"password2",label:"Repeat Password",helperText:s!==i&&"Passwords don't match.",error:s!==i,value:i,onChange:this.onChange.bind(this)}),r.a.createElement(g.a,{variant:"contained",type:"submit",color:"primary",size:"large",disabled:!t||!a||!n||!o||!s||s!==i||c,ref:this.submitButton},"Sign Up"))}},{key:"componentDidUpdate",value:function(){var e=Object(d.a)(p.a.mark((function e(t,a){var n,r,o,s;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n=a.username,!(r=this.state.username)||r===n){e.next=8;break}return e.next=5,fetch("/user/".concat(r),{method:"HEAD"});case 5:o=e.sent,s=o.status,this.setState({available:404===s});case 8:case"end":return e.stop()}}),e,this)})));return function(t,a){return e.apply(this,arguments)}}()}]),a}(n.Component),k=Object(u.g)(Object(O.a)((function(e){return{root:{"& .MuiTextField-root, & .MuiButton-root":{margin:e.spacing(1)},"& .MuiTextField-root":{width:"25ch"}}}}))(R)),S=a(121),T=a(125);function N(e,t){return{type:"SET_FOLLOWING",payload:{id:e,isFollowing:t}}}function F(e){return{type:"ERROR",payload:{status:e.status,statusText:e.statusText}}}var A=a(118),L=a(119),_=a(120),I=a(122),U=a(123),V=a(124),B=new(a(58).Html5Entities);var D=Object(O.a)({root:{maxWidth:345},media:{height:140}})((function(e){var t=e.classes,a=e.desc,n=e.from,o=e.to,s=e.picture,i=e.price,c=e.followers,u=e.isFollowing,l=e.onChangeFollowing;return r.a.createElement(A.a,{className:t.root},r.a.createElement(L.a,{className:t.media,image:s,title:a}),r.a.createElement(_.a,null,r.a.createElement(S.a,{variant:"h5",gutterBottom:!0},a),r.a.createElement(S.a,{variant:"subtitle1",gutterBottom:!0},B.decode("".concat(n.toDateString(),"&ndash;").concat(o.toDateString()))),r.a.createElement(S.a,{variant:"h6"},"\u20ac",i)),r.a.createElement(I.a,null,r.a.createElement(U.a,{badgeContent:c,color:"primary"},r.a.createElement(V.a,{value:"check",selected:Boolean(u),onChange:function(){return l(!u)}},r.a.createElement(S.a,{variant:"button"},"Follow")))))})),P=function(e){Object(v.a)(a,e);var t=Object(b.a)(a);function a(){return Object(h.a)(this,a),t.apply(this,arguments)}return Object(f.a)(a,[{key:"onChangeFollowing",value:function(e,t){this.props.setFollowing(e,t)}},{key:"render",value:function(){var e=this,t=this.props,a=t.classes,n=t.username,o=t.logOut,s=t.vacations;return r.a.createElement("div",{className:a.root},r.a.createElement(S.a,{className:a.logout},n," (",r.a.createElement(c.b,{to:"/login",onClick:o},"log out"),")"),r.a.createElement(T.a,{container:!0,spacing:4},s.map((function(t){var a=t.id,n=t.from,o=t.to,s=Object(x.a)(t,["id","from","to"]);return r.a.createElement(T.a,{item:!0,key:a,xs:12,sm:6,md:4,lg:3,xl:2},r.a.createElement(D,Object.assign({from:new Date(n),to:new Date(o)},s,{onChangeFollowing:e.onChangeFollowing.bind(e,a)})))}))))}},{key:"componentDidMount",value:function(){var e=Object(d.a)(p.a.mark((function e(){return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:this.props.loadVacations();case 1:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()}]),a}(n.Component),M=Object(i.b)((function(e){return{username:e.user.name,vacations:e.vacations.vacations}}),(function(e){return{logOut:function(){return e(function(){var e=Object(d.a)(p.a.mark((function e(t){var a,n;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("/user/logout",{method:"POST"});case 2:if(a=e.sent,!(200<=(n=a.status)&&n<300)){e.next=8;break}return e.abrupt("return",t({type:"LOGOUT"}));case 8:return e.abrupt("return",t({type:"UNKNOWN_ERROR"}));case 9:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())},loadVacations:function(){return e(function(){var e=Object(d.a)(p.a.mark((function e(t){var a,n;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t({type:"REQUEST_ALL_VACATIONS"}),e.next=3,fetch("/vacation/all");case 3:if(!(200<=(a=e.sent).status&&a.status<300)){e.next=11;break}return e.next=7,a.json();case 7:return n=e.sent,e.abrupt("return",t({type:"RECEIVE_ALL_VACATIONS",payload:n}));case 11:return e.abrupt("return",t(F(a)));case 12:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())},setFollowing:function(t,a){return e(function(e,t){return function(){var a=Object(d.a)(p.a.mark((function a(n){var r,o;return p.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return n(N(e,t)),a.next=3,fetch("/vacation/".concat(e),{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({isFollowing:t})});case 3:if(!(200<=(r=a.sent).status&&r.status<300)){a.next=11;break}return a.next=7,r.json();case 7:return o=a.sent,a.abrupt("return",n({type:"RECEIVE_ONE_VACATION",payload:o}));case 11:return a.abrupt("return",n(F(r)));case 12:case"end":return a.stop()}}),a)})));return function(e){return a.apply(this,arguments)}}()}(t,a))}}}))(Object(u.g)(Object(O.a)({root:{padding:"2rem",backgroundColor:"#f5f5f5"},logout:{float:"right"}})(P)));var W=function(){return r.a.createElement(c.a,null,r.a.createElement(u.d,null,r.a.createElement(u.b,{exact:!0,path:"/signup"},r.a.createElement(k,null),r.a.createElement(c.b,{to:"/login"},"Already have an account?")),r.a.createElement(u.b,{exact:!0,path:"/login"},r.a.createElement(j,null),r.a.createElement(c.b,{to:"/signup"},"Don't have an account yet?")),r.a.createElement(C,{exact:!0,path:"/",component:M})))},G=a(44),H=Object(G.b)({name:"counter",initialState:{value:0},reducers:{increment:function(e){e.value+=1},decrement:function(e){e.value-=1},incrementByAmount:function(e,t){e.value+=t.payload}}}),q=H.actions,J=(q.increment,q.decrement,q.incrementByAmount,H.reducer),K=a(38);var z=Object(G.a)({reducer:{counter:J,user:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{error:!1},t=e.error,a=Object(x.a)(e,["error"]),n=arguments.length>1?arguments[1]:void 0,r=n.type,o=n.payload;switch(r){case"LOGIN":return Object(K.a)({error:!1},o);case"LOGOUT":return{error:!1};case"AUTH_ERROR":return{error:!0};case"UNKNOWN_ERROR":return Object(K.a)({error:!0},a);default:return Object(K.a)({error:t},a)}},vacations:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{error:!1,loading:!1,vacations:[]},t=e.error,a=e.loading,n=e.vacations,r=arguments.length>1?arguments[1]:void 0,o=r.type,s=r.payload;switch(o){case"REQUEST_ALL_VACATIONS":return{error:!1,loading:!0,vacations:n};case"RECEIVE_ALL_VACATIONS":return{error:!1,loading:!1,vacations:s};case"RECEIVE_ONE_VACATION":return{error:!1,loading:!1,vacations:n.map((function(e){return e.id===s.id?s:e}))};case"SET_FOLLOWING":return{error:!1,loading:!1,vacations:n.map((function(e){var t=e.id,a=e.isFollowing,n=Object(x.a)(e,["id","isFollowing"]);return Object(K.a)({id:t,isFollowing:t===s.id?s.isFollowing:a},n)}))};case"ERROR":return{error:!0,loading:!1,vacations:n};case"LOGOUT":return{error:!1,loading:!1,vacations:[]};default:return{error:t,loading:a,vacations:n}}}}});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(i.a,{store:z},r.a.createElement(W,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[68,1,2]]]);
//# sourceMappingURL=main.73045444.chunk.js.map