var d2=Object.create;var rh=Object.defineProperty;var h2=Object.getOwnPropertyDescriptor;var g2=Object.getOwnPropertyNames;var x2=Object.getPrototypeOf,y2=Object.prototype.hasOwnProperty;var oh=(r=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(r,{get:(t,e)=>(typeof require<"u"?require:t)[e]}):r)(function(r){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+r+'" is not supported')});var Zt=(r,t)=>()=>{try{return t||r((t={exports:{}}).exports,t),t.exports}catch(e){throw t=0,e}},kt=(r,t)=>{for(var e in t)rh(r,e,{get:t[e],enumerable:!0})},b2=(r,t,e,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of g2(t))!y2.call(r,n)&&n!==e&&rh(r,n,{get:()=>t[n],enumerable:!(o=h2(t,n))||o.enumerable});return r};var xu=(r,t,e)=>(e=r!=null?d2(x2(r)):{},b2(t||!r||!r.__esModule?rh(e,"default",{value:r,enumerable:!0}):e,r));var Ob=Zt((eq,_b)=>{_b.exports=Ht;var pr=null;try{pr=new WebAssembly.Instance(new WebAssembly.Module(new Uint8Array([0,97,115,109,1,0,0,0,1,13,2,96,0,1,127,96,4,127,127,127,127,1,127,3,7,6,0,1,1,1,1,1,6,6,1,127,1,65,0,11,7,50,6,3,109,117,108,0,1,5,100,105,118,95,115,0,2,5,100,105,118,95,117,0,3,5,114,101,109,95,115,0,4,5,114,101,109,95,117,0,5,8,103,101,116,95,104,105,103,104,0,0,10,191,1,6,4,0,35,0,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,126,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,127,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,128,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,129,34,4,66,32,135,167,36,0,32,4,167,11,36,1,1,126,32,0,173,32,1,173,66,32,134,132,32,2,173,32,3,173,66,32,134,132,130,34,4,66,32,135,167,36,0,32,4,167,11])),{}).exports}catch{}function Ht(r,t,e){this.low=r|0,this.high=t|0,this.unsigned=!!e}Ht.prototype.__isLong__;Object.defineProperty(Ht.prototype,"__isLong__",{value:!0});function He(r){return(r&&r.__isLong__)===!0}Ht.isLong=He;var vb={},Nb={};function ei(r,t){var e,o,n;return t?(r>>>=0,(n=0<=r&&r<256)&&(o=Nb[r],o)?o:(e=qt(r,(r|0)<0?-1:0,!0),n&&(Nb[r]=e),e)):(r|=0,(n=-128<=r&&r<128)&&(o=vb[r],o)?o:(e=qt(r,r<0?-1:0,!1),n&&(vb[r]=e),e))}Ht.fromInt=ei;function lr(r,t){if(isNaN(r))return t?ti:ur;if(t){if(r<0)return ti;if(r>=Ab)return Fb}else{if(r<=-Eb)return We;if(r+1>=Eb)return Db}return r<0?lr(-r,t).neg():qt(r%Cc|0,r/Cc|0,t)}Ht.fromNumber=lr;function qt(r,t,e){return new Ht(r,t,e)}Ht.fromBits=qt;var Su=Math.pow;function dh(r,t,e){if(r.length===0)throw Error("empty string");if(r==="NaN"||r==="Infinity"||r==="+Infinity"||r==="-Infinity")return ur;if(typeof t=="number"?(e=t,t=!1):t=!!t,e=e||10,e<2||36<e)throw RangeError("radix");var o;if((o=r.indexOf("-"))>0)throw Error("interior hyphen");if(o===0)return dh(r.substring(1),t,e).neg();for(var n=lr(Su(e,8)),s=ur,a=0;a<r.length;a+=8){var i=Math.min(8,r.length-a),c=parseInt(r.substring(a,a+i),e);if(i<8){var p=lr(Su(e,i));s=s.mul(p).add(lr(c))}else s=s.mul(n),s=s.add(lr(c))}return s.unsigned=t,s}Ht.fromString=dh;function Ar(r,t){return typeof r=="number"?lr(r,t):typeof r=="string"?dh(r,t):qt(r.low,r.high,typeof t=="boolean"?t:r.unsigned)}Ht.fromValue=Ar;var kb=65536,Z2=1<<24,Cc=kb*kb,Ab=Cc*Cc,Eb=Ab/2,$b=ei(Z2),ur=ei(0);Ht.ZERO=ur;var ti=ei(0,!0);Ht.UZERO=ti;var bc=ei(1);Ht.ONE=bc;var Rb=ei(1,!0);Ht.UONE=Rb;var fh=ei(-1);Ht.NEG_ONE=fh;var Db=qt(-1,2147483647,!1);Ht.MAX_VALUE=Db;var Fb=qt(-1,-1,!0);Ht.MAX_UNSIGNED_VALUE=Fb;var We=qt(0,-2147483648,!1);Ht.MIN_VALUE=We;var tt=Ht.prototype;tt.toInt=function(){return this.unsigned?this.low>>>0:this.low};tt.toNumber=function(){return this.unsigned?(this.high>>>0)*Cc+(this.low>>>0):this.high*Cc+(this.low>>>0)};tt.toString=function(t){if(t=t||10,t<2||36<t)throw RangeError("radix");if(this.isZero())return"0";if(this.isNegative())if(this.eq(We)){var e=lr(t),o=this.div(e),n=o.mul(e).sub(this);return o.toString(t)+n.toInt().toString(t)}else return"-"+this.neg().toString(t);for(var s=lr(Su(t,6),this.unsigned),a=this,i="";;){var c=a.div(s),p=a.sub(c.mul(s)).toInt()>>>0,l=p.toString(t);if(a=c,a.isZero())return l+i;for(;l.length<6;)l="0"+l;i=""+l+i}};tt.getHighBits=function(){return this.high};tt.getHighBitsUnsigned=function(){return this.high>>>0};tt.getLowBits=function(){return this.low};tt.getLowBitsUnsigned=function(){return this.low>>>0};tt.getNumBitsAbs=function(){if(this.isNegative())return this.eq(We)?64:this.neg().getNumBitsAbs();for(var t=this.high!=0?this.high:this.low,e=31;e>0&&(t&1<<e)==0;e--);return this.high!=0?e+33:e+1};tt.isZero=function(){return this.high===0&&this.low===0};tt.eqz=tt.isZero;tt.isNegative=function(){return!this.unsigned&&this.high<0};tt.isPositive=function(){return this.unsigned||this.high>=0};tt.isOdd=function(){return(this.low&1)===1};tt.isEven=function(){return(this.low&1)===0};tt.equals=function(t){return He(t)||(t=Ar(t)),this.unsigned!==t.unsigned&&this.high>>>31===1&&t.high>>>31===1?!1:this.high===t.high&&this.low===t.low};tt.eq=tt.equals;tt.notEquals=function(t){return!this.eq(t)};tt.neq=tt.notEquals;tt.ne=tt.notEquals;tt.lessThan=function(t){return this.comp(t)<0};tt.lt=tt.lessThan;tt.lessThanOrEqual=function(t){return this.comp(t)<=0};tt.lte=tt.lessThanOrEqual;tt.le=tt.lessThanOrEqual;tt.greaterThan=function(t){return this.comp(t)>0};tt.gt=tt.greaterThan;tt.greaterThanOrEqual=function(t){return this.comp(t)>=0};tt.gte=tt.greaterThanOrEqual;tt.ge=tt.greaterThanOrEqual;tt.compare=function(t){if(He(t)||(t=Ar(t)),this.eq(t))return 0;var e=this.isNegative(),o=t.isNegative();return e&&!o?-1:!e&&o?1:this.unsigned?t.high>>>0>this.high>>>0||t.high===this.high&&t.low>>>0>this.low>>>0?-1:1:this.sub(t).isNegative()?-1:1};tt.comp=tt.compare;tt.negate=function(){return!this.unsigned&&this.eq(We)?We:this.not().add(bc)};tt.neg=tt.negate;tt.add=function(t){He(t)||(t=Ar(t));var e=this.high>>>16,o=this.high&65535,n=this.low>>>16,s=this.low&65535,a=t.high>>>16,i=t.high&65535,c=t.low>>>16,p=t.low&65535,l=0,u=0,m=0,f=0;return f+=s+p,m+=f>>>16,f&=65535,m+=n+c,u+=m>>>16,m&=65535,u+=o+i,l+=u>>>16,u&=65535,l+=e+a,l&=65535,qt(m<<16|f,l<<16|u,this.unsigned)};tt.subtract=function(t){return He(t)||(t=Ar(t)),this.add(t.neg())};tt.sub=tt.subtract;tt.multiply=function(t){if(this.isZero())return ur;if(He(t)||(t=Ar(t)),pr){var e=pr.mul(this.low,this.high,t.low,t.high);return qt(e,pr.get_high(),this.unsigned)}if(t.isZero())return ur;if(this.eq(We))return t.isOdd()?We:ur;if(t.eq(We))return this.isOdd()?We:ur;if(this.isNegative())return t.isNegative()?this.neg().mul(t.neg()):this.neg().mul(t).neg();if(t.isNegative())return this.mul(t.neg()).neg();if(this.lt($b)&&t.lt($b))return lr(this.toNumber()*t.toNumber(),this.unsigned);var o=this.high>>>16,n=this.high&65535,s=this.low>>>16,a=this.low&65535,i=t.high>>>16,c=t.high&65535,p=t.low>>>16,l=t.low&65535,u=0,m=0,f=0,d=0;return d+=a*l,f+=d>>>16,d&=65535,f+=s*l,m+=f>>>16,f&=65535,f+=a*p,m+=f>>>16,f&=65535,m+=n*l,u+=m>>>16,m&=65535,m+=s*p,u+=m>>>16,m&=65535,m+=a*c,u+=m>>>16,m&=65535,u+=o*l+n*p+s*c+a*i,u&=65535,qt(f<<16|d,u<<16|m,this.unsigned)};tt.mul=tt.multiply;tt.divide=function(t){if(He(t)||(t=Ar(t)),t.isZero())throw Error("division by zero");if(pr){if(!this.unsigned&&this.high===-2147483648&&t.low===-1&&t.high===-1)return this;var e=(this.unsigned?pr.div_u:pr.div_s)(this.low,this.high,t.low,t.high);return qt(e,pr.get_high(),this.unsigned)}if(this.isZero())return this.unsigned?ti:ur;var o,n,s;if(this.unsigned){if(t.unsigned||(t=t.toUnsigned()),t.gt(this))return ti;if(t.gt(this.shru(1)))return Rb;s=ti}else{if(this.eq(We)){if(t.eq(bc)||t.eq(fh))return We;if(t.eq(We))return bc;var a=this.shr(1);return o=a.div(t).shl(1),o.eq(ur)?t.isNegative()?bc:fh:(n=this.sub(t.mul(o)),s=o.add(n.div(t)),s)}else if(t.eq(We))return this.unsigned?ti:ur;if(this.isNegative())return t.isNegative()?this.neg().div(t.neg()):this.neg().div(t).neg();if(t.isNegative())return this.div(t.neg()).neg();s=ur}for(n=this;n.gte(t);){o=Math.max(1,Math.floor(n.toNumber()/t.toNumber()));for(var i=Math.ceil(Math.log(o)/Math.LN2),c=i<=48?1:Su(2,i-48),p=lr(o),l=p.mul(t);l.isNegative()||l.gt(n);)o-=c,p=lr(o,this.unsigned),l=p.mul(t);p.isZero()&&(p=bc),s=s.add(p),n=n.sub(l)}return s};tt.div=tt.divide;tt.modulo=function(t){if(He(t)||(t=Ar(t)),pr){var e=(this.unsigned?pr.rem_u:pr.rem_s)(this.low,this.high,t.low,t.high);return qt(e,pr.get_high(),this.unsigned)}return this.sub(this.div(t).mul(t))};tt.mod=tt.modulo;tt.rem=tt.modulo;tt.not=function(){return qt(~this.low,~this.high,this.unsigned)};tt.and=function(t){return He(t)||(t=Ar(t)),qt(this.low&t.low,this.high&t.high,this.unsigned)};tt.or=function(t){return He(t)||(t=Ar(t)),qt(this.low|t.low,this.high|t.high,this.unsigned)};tt.xor=function(t){return He(t)||(t=Ar(t)),qt(this.low^t.low,this.high^t.high,this.unsigned)};tt.shiftLeft=function(t){return He(t)&&(t=t.toInt()),(t&=63)===0?this:t<32?qt(this.low<<t,this.high<<t|this.low>>>32-t,this.unsigned):qt(0,this.low<<t-32,this.unsigned)};tt.shl=tt.shiftLeft;tt.shiftRight=function(t){return He(t)&&(t=t.toInt()),(t&=63)===0?this:t<32?qt(this.low>>>t|this.high<<32-t,this.high>>t,this.unsigned):qt(this.high>>t-32,this.high>=0?0:-1,this.unsigned)};tt.shr=tt.shiftRight;tt.shiftRightUnsigned=function(t){if(He(t)&&(t=t.toInt()),t&=63,t===0)return this;var e=this.high;if(t<32){var o=this.low;return qt(o>>>t|e<<32-t,e>>>t,this.unsigned)}else return t===32?qt(e,0,this.unsigned):qt(e>>>t-32,0,this.unsigned)};tt.shru=tt.shiftRightUnsigned;tt.shr_u=tt.shiftRightUnsigned;tt.toSigned=function(){return this.unsigned?qt(this.low,this.high,!1):this};tt.toUnsigned=function(){return this.unsigned?this:qt(this.low,this.high,!0)};tt.toBytes=function(t){return t?this.toBytesLE():this.toBytesBE()};tt.toBytesLE=function(){var t=this.high,e=this.low;return[e&255,e>>>8&255,e>>>16&255,e>>>24,t&255,t>>>8&255,t>>>16&255,t>>>24]};tt.toBytesBE=function(){var t=this.high,e=this.low;return[t>>>24,t>>>16&255,t>>>8&255,t&255,e>>>24,e>>>16&255,e>>>8&255,e&255]};Ht.fromBytes=function(t,e,o){return o?Ht.fromBytesLE(t,e):Ht.fromBytesBE(t,e)};Ht.fromBytesLE=function(t,e){return new Ht(t[0]|t[1]<<8|t[2]<<16|t[3]<<24,t[4]|t[5]<<8|t[6]<<16|t[7]<<24,e)};Ht.fromBytesBE=function(t,e){return new Ht(t[4]<<24|t[5]<<16|t[6]<<8|t[7],t[0]<<24|t[1]<<16|t[2]<<8|t[3],e)}});var Q0=Zt((Z0,Og)=>{(function(r,t,e){function o(i){var c=this,p=a();c.next=function(){var l=2091639*c.s0+c.c*23283064365386963e-26;return c.s0=c.s1,c.s1=c.s2,c.s2=l-(c.c=l|0)},c.c=1,c.s0=p(" "),c.s1=p(" "),c.s2=p(" "),c.s0-=p(i),c.s0<0&&(c.s0+=1),c.s1-=p(i),c.s1<0&&(c.s1+=1),c.s2-=p(i),c.s2<0&&(c.s2+=1),p=null}function n(i,c){return c.c=i.c,c.s0=i.s0,c.s1=i.s1,c.s2=i.s2,c}function s(i,c){var p=new o(i),l=c&&c.state,u=p.next;return u.int32=function(){return p.next()*4294967296|0},u.double=function(){return u()+(u()*2097152|0)*11102230246251565e-32},u.quick=u,l&&(typeof l=="object"&&n(l,p),u.state=function(){return n(p,{})}),u}function a(){var i=4022871197,c=function(p){p=String(p);for(var l=0;l<p.length;l++){i+=p.charCodeAt(l);var u=.02519603282416938*i;i=u>>>0,u-=i,u*=i,i=u>>>0,u-=i,i+=u*4294967296}return(i>>>0)*23283064365386963e-26};return c}t&&t.exports?t.exports=s:e&&e.amd?e(function(){return s}):this.alea=s})(Z0,typeof Og=="object"&&Og,typeof define=="function"&&define)});var tC=Zt((J0,Pg)=>{(function(r,t,e){function o(a){var i=this,c="";i.x=0,i.y=0,i.z=0,i.w=0,i.next=function(){var l=i.x^i.x<<11;return i.x=i.y,i.y=i.z,i.z=i.w,i.w^=i.w>>>19^l^l>>>8},a===(a|0)?i.x=a:c+=a;for(var p=0;p<c.length+64;p++)i.x^=c.charCodeAt(p)|0,i.next()}function n(a,i){return i.x=a.x,i.y=a.y,i.z=a.z,i.w=a.w,i}function s(a,i){var c=new o(a),p=i&&i.state,l=function(){return(c.next()>>>0)/4294967296};return l.double=function(){do var u=c.next()>>>11,m=(c.next()>>>0)/4294967296,f=(u+m)/(1<<21);while(f===0);return f},l.int32=c.next,l.quick=l,p&&(typeof p=="object"&&n(p,c),l.state=function(){return n(c,{})}),l}t&&t.exports?t.exports=s:e&&e.amd?e(function(){return s}):this.xor128=s})(J0,typeof Pg=="object"&&Pg,typeof define=="function"&&define)});var rC=Zt((eC,Lg)=>{(function(r,t,e){function o(a){var i=this,c="";i.next=function(){var l=i.x^i.x>>>2;return i.x=i.y,i.y=i.z,i.z=i.w,i.w=i.v,(i.d=i.d+362437|0)+(i.v=i.v^i.v<<4^(l^l<<1))|0},i.x=0,i.y=0,i.z=0,i.w=0,i.v=0,a===(a|0)?i.x=a:c+=a;for(var p=0;p<c.length+64;p++)i.x^=c.charCodeAt(p)|0,p==c.length&&(i.d=i.x<<10^i.x>>>4),i.next()}function n(a,i){return i.x=a.x,i.y=a.y,i.z=a.z,i.w=a.w,i.v=a.v,i.d=a.d,i}function s(a,i){var c=new o(a),p=i&&i.state,l=function(){return(c.next()>>>0)/4294967296};return l.double=function(){do var u=c.next()>>>11,m=(c.next()>>>0)/4294967296,f=(u+m)/(1<<21);while(f===0);return f},l.int32=c.next,l.quick=l,p&&(typeof p=="object"&&n(p,c),l.state=function(){return n(c,{})}),l}t&&t.exports?t.exports=s:e&&e.amd?e(function(){return s}):this.xorwow=s})(eC,typeof Lg=="object"&&Lg,typeof define=="function"&&define)});var nC=Zt((oC,Mg)=>{(function(r,t,e){function o(a){var i=this;i.next=function(){var p=i.x,l=i.i,u,m,f;return u=p[l],u^=u>>>7,m=u^u<<24,u=p[l+1&7],m^=u^u>>>10,u=p[l+3&7],m^=u^u>>>3,u=p[l+4&7],m^=u^u<<7,u=p[l+7&7],u=u^u<<13,m^=u^u<<9,p[l]=m,i.i=l+1&7,m};function c(p,l){var u,m,f=[];if(l===(l|0))m=f[0]=l;else for(l=""+l,u=0;u<l.length;++u)f[u&7]=f[u&7]<<15^l.charCodeAt(u)+f[u+1&7]<<13;for(;f.length<8;)f.push(0);for(u=0;u<8&&f[u]===0;++u);for(u==8?m=f[7]=-1:m=f[u],p.x=f,p.i=0,u=256;u>0;--u)p.next()}c(i,a)}function n(a,i){return i.x=a.x.slice(),i.i=a.i,i}function s(a,i){a==null&&(a=+new Date);var c=new o(a),p=i&&i.state,l=function(){return(c.next()>>>0)/4294967296};return l.double=function(){do var u=c.next()>>>11,m=(c.next()>>>0)/4294967296,f=(u+m)/(1<<21);while(f===0);return f},l.int32=c.next,l.quick=l,p&&(p.x&&n(p,c),l.state=function(){return n(c,{})}),l}t&&t.exports?t.exports=s:e&&e.amd?e(function(){return s}):this.xorshift7=s})(oC,typeof Mg=="object"&&Mg,typeof define=="function"&&define)});var aC=Zt((sC,Bg)=>{(function(r,t,e){function o(a){var i=this;i.next=function(){var p=i.w,l=i.X,u=i.i,m,f;return i.w=p=p+1640531527|0,f=l[u+34&127],m=l[u=u+1&127],f^=f<<13,m^=m<<17,f^=f>>>15,m^=m>>>12,f=l[u]=f^m,i.i=u,f+(p^p>>>16)|0};function c(p,l){var u,m,f,d,h,g=[],x=128;for(l===(l|0)?(m=l,l=null):(l=l+"\0",m=0,x=Math.max(x,l.length)),f=0,d=-32;d<x;++d)l&&(m^=l.charCodeAt((d+32)%l.length)),d===0&&(h=m),m^=m<<10,m^=m>>>15,m^=m<<4,m^=m>>>13,d>=0&&(h=h+1640531527|0,u=g[d&127]^=m+h,f=u==0?f+1:0);for(f>=128&&(g[(l&&l.length||0)&127]=-1),f=127,d=512;d>0;--d)m=g[f+34&127],u=g[f=f+1&127],m^=m<<13,u^=u<<17,m^=m>>>15,u^=u>>>12,g[f]=m^u;p.w=h,p.X=g,p.i=f}c(i,a)}function n(a,i){return i.i=a.i,i.w=a.w,i.X=a.X.slice(),i}function s(a,i){a==null&&(a=+new Date);var c=new o(a),p=i&&i.state,l=function(){return(c.next()>>>0)/4294967296};return l.double=function(){do var u=c.next()>>>11,m=(c.next()>>>0)/4294967296,f=(u+m)/(1<<21);while(f===0);return f},l.int32=c.next,l.quick=l,p&&(p.X&&n(p,c),l.state=function(){return n(c,{})}),l}t&&t.exports?t.exports=s:e&&e.amd?e(function(){return s}):this.xor4096=s})(sC,typeof Bg=="object"&&Bg,typeof define=="function"&&define)});var cC=Zt((iC,Vg)=>{(function(r,t,e){function o(a){var i=this,c="";i.next=function(){var l=i.b,u=i.c,m=i.d,f=i.a;return l=l<<25^l>>>7^u,u=u-m|0,m=m<<24^m>>>8^f,f=f-l|0,i.b=l=l<<20^l>>>12^u,i.c=u=u-m|0,i.d=m<<16^u>>>16^f,i.a=f-l|0},i.a=0,i.b=0,i.c=-1640531527,i.d=1367130551,a===Math.floor(a)?(i.a=a/4294967296|0,i.b=a|0):c+=a;for(var p=0;p<c.length+20;p++)i.b^=c.charCodeAt(p)|0,i.next()}function n(a,i){return i.a=a.a,i.b=a.b,i.c=a.c,i.d=a.d,i}function s(a,i){var c=new o(a),p=i&&i.state,l=function(){return(c.next()>>>0)/4294967296};return l.double=function(){do var u=c.next()>>>11,m=(c.next()>>>0)/4294967296,f=(u+m)/(1<<21);while(f===0);return f},l.int32=c.next,l.quick=l,p&&(typeof p=="object"&&n(p,c),l.state=function(){return n(c,{})}),l}t&&t.exports?t.exports=s:e&&e.amd?e(function(){return s}):this.tychei=s})(iC,typeof Vg=="object"&&Vg,typeof define=="function"&&define)});var lC=Zt((pC,Yu)=>{(function(r,t,e){var o=256,n=6,s=52,a="random",i=e.pow(o,n),c=e.pow(2,s),p=c*2,l=o-1,u;function m(w,I,k){var $=[];I=I==!0?{entropy:!0}:I||{};var R=g(h(I.entropy?[w,b(t)]:w??x(),3),$),D=new f($),_=function(){for(var O=D.g(n),L=i,M=0;O<c;)O=(O+M)*o,L*=o,M=D.g(1);for(;O>=p;)O/=2,L/=2,M>>>=1;return(O+M)/L};return _.int32=function(){return D.g(4)|0},_.quick=function(){return D.g(4)/4294967296},_.double=_,g(b(D.S),t),(I.pass||k||function(O,L,M,B){return B&&(B.S&&d(B,D),O.state=function(){return d(D,{})}),M?(e[a]=O,L):O})(_,R,"global"in I?I.global:this==e,I.state)}function f(w){var I,k=w.length,$=this,R=0,D=$.i=$.j=0,_=$.S=[];for(k||(w=[k++]);R<o;)_[R]=R++;for(R=0;R<o;R++)_[R]=_[D=l&D+w[R%k]+(I=_[R])],_[D]=I;($.g=function(O){for(var L,M=0,B=$.i,G=$.j,V=$.S;O--;)L=V[B=l&B+1],M=M*o+V[l&(V[B]=V[G=l&G+L])+(V[G]=L)];return $.i=B,$.j=G,M})(o)}function d(w,I){return I.i=w.i,I.j=w.j,I.S=w.S.slice(),I}function h(w,I){var k=[],$=typeof w,R;if(I&&$=="object")for(R in w)try{k.push(h(w[R],I-1))}catch{}return k.length?k:$=="string"?w:w+"\0"}function g(w,I){for(var k=w+"",$,R=0;R<k.length;)I[l&R]=l&($^=I[l&R]*19)+k.charCodeAt(R++);return b(I)}function x(){try{var w;return u&&(w=u.randomBytes)?w=w(o):(w=new Uint8Array(o),(r.crypto||r.msCrypto).getRandomValues(w)),b(w)}catch{var I=r.navigator,k=I&&I.plugins;return[+new Date,r,k,r.screen,b(t)]}}function b(w){return String.fromCharCode.apply(0,w)}if(g(e.random(),t),typeof Yu=="object"&&Yu.exports){Yu.exports=m;try{u=oh("crypto")}catch{}}else typeof define=="function"&&define.amd?define(function(){return m}):e["seed"+a]=m})(typeof self<"u"?self:pC,[],Math)});var Gg=Zt((ont,uC)=>{var h_=Q0(),g_=tC(),x_=rC(),y_=nC(),b_=aC(),C_=cC(),Ai=lC();Ai.alea=h_;Ai.xor128=g_;Ai.xorwow=x_;Ai.xorshift7=y_;Ai.xor4096=b_;Ai.tychei=C_;uC.exports=Ai});var U$=Zt((oae,G$)=>{function LW(r){var t=new Ue(r),e=t.readChunk();if(e.id!="MThd")throw"Bad MIDI file.  Expected 'MHdr', got: '"+e.id+"'";for(var o=MW(e.data),n=[],s=0;!t.eof()&&s<o.numTracks;s++){var a=t.readChunk();if(a.id!="MTrk")throw"Bad MIDI file.  Expected 'MTrk', got: '"+a.id+"'";var i=BW(a.data);n.push(i)}return{header:o,tracks:n}}function MW(r){var t=new Ue(r),e=t.readUInt16(),o=t.readUInt16(),n={format:e,numTracks:o},s=t.readUInt16();return s&32768?(n.framesPerSecond=256-(s>>8),n.ticksPerFrame=s&255):n.ticksPerBeat=s,n}function BW(r){for(var t=new Ue(r),e=[];!t.eof();){var o=s();e.push(o)}return e;var n;function s(){var a={};a.deltaTime=t.readVarInt();var i=t.readUInt8();if((i&240)===240)if(i===255){a.meta=!0;var c=t.readUInt8(),p=t.readVarInt();switch(c){case 0:if(a.type="sequenceNumber",p!==2)throw"Expected length for sequenceNumber event is 2, got "+p;return a.number=t.readUInt16(),a;case 1:return a.type="text",a.text=t.readString(p),a;case 2:return a.type="copyrightNotice",a.text=t.readString(p),a;case 3:return a.type="trackName",a.text=t.readString(p),a;case 4:return a.type="instrumentName",a.text=t.readString(p),a;case 5:return a.type="lyrics",a.text=t.readString(p),a;case 6:return a.type="marker",a.text=t.readString(p),a;case 7:return a.type="cuePoint",a.text=t.readString(p),a;case 32:if(a.type="channelPrefix",p!=1)throw"Expected length for channelPrefix event is 1, got "+p;return a.channel=t.readUInt8(),a;case 33:if(a.type="portPrefix",p!=1)throw"Expected length for portPrefix event is 1, got "+p;return a.port=t.readUInt8(),a;case 47:if(a.type="endOfTrack",p!=0)throw"Expected length for endOfTrack event is 0, got "+p;return a;case 81:if(a.type="setTempo",p!=3)throw"Expected length for setTempo event is 3, got "+p;return a.microsecondsPerBeat=t.readUInt24(),a;case 84:if(a.type="smpteOffset",p!=5)throw"Expected length for smpteOffset event is 5, got "+p;var l=t.readUInt8(),u={0:24,32:25,64:29,96:30};return a.frameRate=u[l&96],a.hour=l&31,a.min=t.readUInt8(),a.sec=t.readUInt8(),a.frame=t.readUInt8(),a.subFrame=t.readUInt8(),a;case 88:if(a.type="timeSignature",p!=2&&p!=4)throw"Expected length for timeSignature event is 4 or 2, got "+p;return a.numerator=t.readUInt8(),a.denominator=1<<t.readUInt8(),p===4?(a.metronome=t.readUInt8(),a.thirtyseconds=t.readUInt8()):(a.metronome=36,a.thirtyseconds=8),a;case 89:if(a.type="keySignature",p!=2)throw"Expected length for keySignature event is 2, got "+p;return a.key=t.readInt8(),a.scale=t.readUInt8(),a;case 127:return a.type="sequencerSpecific",a.data=t.readBytes(p),a;default:return a.type="unknownMeta",a.data=t.readBytes(p),a.metatypeByte=c,a}}else if(i==240){a.type="sysEx";var p=t.readVarInt();return a.data=t.readBytes(p),a}else if(i==247){a.type="endSysEx";var p=t.readVarInt();return a.data=t.readBytes(p),a}else throw"Unrecognised MIDI event type byte: "+i;else{var m;if((i&128)===0){if(n===null)throw"Running status byte encountered before status byte";m=i,i=n,a.running=!0}else m=t.readUInt8(),n=i;var f=i>>4;switch(a.channel=i&15,f){case 8:return a.type="noteOff",a.noteNumber=m,a.velocity=t.readUInt8(),a;case 9:var d=t.readUInt8();return a.type=d===0?"noteOff":"noteOn",a.noteNumber=m,a.velocity=d,d===0&&(a.byte9=!0),a;case 10:return a.type="noteAftertouch",a.noteNumber=m,a.amount=t.readUInt8(),a;case 11:return a.type="controller",a.controllerType=m,a.value=t.readUInt8(),a;case 12:return a.type="programChange",a.programNumber=m,a;case 13:return a.type="channelAftertouch",a.amount=m,a;case 14:return a.type="pitchBend",a.value=m+(t.readUInt8()<<7)-8192,a;default:throw"Unrecognised MIDI event type: "+f}}}}function Ue(r){this.buffer=r,this.bufferLen=this.buffer.length,this.pos=0}Ue.prototype.eof=function(){return this.pos>=this.bufferLen};Ue.prototype.readUInt8=function(){var r=this.buffer[this.pos];return this.pos+=1,r};Ue.prototype.readInt8=function(){var r=this.readUInt8();return r&128?r-256:r};Ue.prototype.readUInt16=function(){var r=this.readUInt8(),t=this.readUInt8();return(r<<8)+t};Ue.prototype.readInt16=function(){var r=this.readUInt16();return r&32768?r-65536:r};Ue.prototype.readUInt24=function(){var r=this.readUInt8(),t=this.readUInt8(),e=this.readUInt8();return(r<<16)+(t<<8)+e};Ue.prototype.readInt24=function(){var r=this.readUInt24();return r&8388608?r-16777216:r};Ue.prototype.readUInt32=function(){var r=this.readUInt8(),t=this.readUInt8(),e=this.readUInt8(),o=this.readUInt8();return(r<<24)+(t<<16)+(e<<8)+o};Ue.prototype.readBytes=function(r){var t=this.buffer.slice(this.pos,this.pos+r);return this.pos+=r,t};Ue.prototype.readString=function(r){var t=this.readBytes(r);return String.fromCharCode.apply(null,t)};Ue.prototype.readVarInt=function(){for(var r=0;!this.eof();){var t=this.readUInt8();if(t&128)r+=t&127,r<<=7;else return r+t}return r};Ue.prototype.readChunk=function(){var r=this.readString(4),t=this.readUInt32(),e=this.readBytes(t);return{id:r,length:t,data:e}};G$.exports=LW});var W$=Zt((nae,z$)=>{function VW(r,t){if(typeof r!="object")throw"Invalid MIDI data";t=t||{};var e=r.header||{},o=r.tracks||[],n,s=o.length,a=new ye;for(GW(a,e,s),n=0;n<s;n++)UW(a,o[n],t);return a.buffer}function GW(r,t,e){var o=t.format==null?1:t.format,n=128;t.timeDivision?n=t.timeDivision:t.ticksPerFrame&&t.framesPerSecond?n=-(t.framesPerSecond&255)<<8|t.ticksPerFrame&255:t.ticksPerBeat&&(n=t.ticksPerBeat&32767);var s=new ye;s.writeUInt16(o),s.writeUInt16(e),s.writeUInt16(n),r.writeChunk("MThd",s.buffer)}function UW(r,t,e){var o=new ye,n,s=t.length,a=null;for(n=0;n<s;n++)(e.running===!1||!e.running&&!t[n].running)&&(a=null),a=zW(o,t[n],a,e.useByte9ForNoteOff);r.writeChunk("MTrk",o.buffer)}function zW(r,t,e,o){var n=t.type,s=t.deltaTime,a=t.text||"",i=t.data||[],c=null;switch(r.writeVarInt(s),n){case"sequenceNumber":r.writeUInt8(255),r.writeUInt8(0),r.writeVarInt(2),r.writeUInt16(t.number);break;case"text":r.writeUInt8(255),r.writeUInt8(1),r.writeVarInt(a.length),r.writeString(a);break;case"copyrightNotice":r.writeUInt8(255),r.writeUInt8(2),r.writeVarInt(a.length),r.writeString(a);break;case"trackName":r.writeUInt8(255),r.writeUInt8(3),r.writeVarInt(a.length),r.writeString(a);break;case"instrumentName":r.writeUInt8(255),r.writeUInt8(4),r.writeVarInt(a.length),r.writeString(a);break;case"lyrics":r.writeUInt8(255),r.writeUInt8(5),r.writeVarInt(a.length),r.writeString(a);break;case"marker":r.writeUInt8(255),r.writeUInt8(6),r.writeVarInt(a.length),r.writeString(a);break;case"cuePoint":r.writeUInt8(255),r.writeUInt8(7),r.writeVarInt(a.length),r.writeString(a);break;case"channelPrefix":r.writeUInt8(255),r.writeUInt8(32),r.writeVarInt(1),r.writeUInt8(t.channel);break;case"portPrefix":r.writeUInt8(255),r.writeUInt8(33),r.writeVarInt(1),r.writeUInt8(t.port);break;case"endOfTrack":r.writeUInt8(255),r.writeUInt8(47),r.writeVarInt(0);break;case"setTempo":r.writeUInt8(255),r.writeUInt8(81),r.writeVarInt(3),r.writeUInt24(t.microsecondsPerBeat);break;case"smpteOffset":r.writeUInt8(255),r.writeUInt8(84),r.writeVarInt(5);var p={24:0,25:32,29:64,30:96},l=t.hour&31|p[t.frameRate];r.writeUInt8(l),r.writeUInt8(t.min),r.writeUInt8(t.sec),r.writeUInt8(t.frame),r.writeUInt8(t.subFrame);break;case"timeSignature":r.writeUInt8(255),r.writeUInt8(88),r.writeVarInt(4),r.writeUInt8(t.numerator);var u=Math.floor(Math.log(t.denominator)/Math.LN2)&255;r.writeUInt8(u),r.writeUInt8(t.metronome),r.writeUInt8(t.thirtyseconds||8);break;case"keySignature":r.writeUInt8(255),r.writeUInt8(89),r.writeVarInt(2),r.writeInt8(t.key),r.writeUInt8(t.scale);break;case"sequencerSpecific":r.writeUInt8(255),r.writeUInt8(127),r.writeVarInt(i.length),r.writeBytes(i);break;case"unknownMeta":t.metatypeByte!=null&&(r.writeUInt8(255),r.writeUInt8(t.metatypeByte),r.writeVarInt(i.length),r.writeBytes(i));break;case"sysEx":r.writeUInt8(240),r.writeVarInt(i.length),r.writeBytes(i);break;case"endSysEx":r.writeUInt8(247),r.writeVarInt(i.length),r.writeBytes(i);break;case"noteOff":var m=o!==!1&&t.byte9||o&&t.velocity==0?144:128;c=m|t.channel,c!==e&&r.writeUInt8(c),r.writeUInt8(t.noteNumber),r.writeUInt8(t.velocity);break;case"noteOn":c=144|t.channel,c!==e&&r.writeUInt8(c),r.writeUInt8(t.noteNumber),r.writeUInt8(t.velocity);break;case"noteAftertouch":c=160|t.channel,c!==e&&r.writeUInt8(c),r.writeUInt8(t.noteNumber),r.writeUInt8(t.amount);break;case"controller":c=176|t.channel,c!==e&&r.writeUInt8(c),r.writeUInt8(t.controllerType),r.writeUInt8(t.value);break;case"programChange":c=192|t.channel,c!==e&&r.writeUInt8(c),r.writeUInt8(t.programNumber);break;case"channelAftertouch":c=208|t.channel,c!==e&&r.writeUInt8(c),r.writeUInt8(t.amount);break;case"pitchBend":c=224|t.channel,c!==e&&r.writeUInt8(c);var f=8192+t.value,d=f&127,h=f>>7&127;r.writeUInt8(d),r.writeUInt8(h);break;default:throw"Unrecognized event type: "+n}return c}function ye(){this.buffer=[]}ye.prototype.writeUInt8=function(r){this.buffer.push(r&255)};ye.prototype.writeInt8=ye.prototype.writeUInt8;ye.prototype.writeUInt16=function(r){var t=r>>8&255,e=r&255;this.writeUInt8(t),this.writeUInt8(e)};ye.prototype.writeInt16=ye.prototype.writeUInt16;ye.prototype.writeUInt24=function(r){var t=r>>16&255,e=r>>8&255,o=r&255;this.writeUInt8(t),this.writeUInt8(e),this.writeUInt8(o)};ye.prototype.writeInt24=ye.prototype.writeUInt24;ye.prototype.writeUInt32=function(r){var t=r>>24&255,e=r>>16&255,o=r>>8&255,n=r&255;this.writeUInt8(t),this.writeUInt8(e),this.writeUInt8(o),this.writeUInt8(n)};ye.prototype.writeInt32=ye.prototype.writeUInt32;ye.prototype.writeBytes=function(r){this.buffer=this.buffer.concat(Array.prototype.slice.call(r,0))};ye.prototype.writeString=function(r){var t,e=r.length,o=[];for(t=0;t<e;t++)o.push(r.codePointAt(t));this.writeBytes(o)};ye.prototype.writeVarInt=function(r){if(r<0)throw"Cannot write negative variable-length integer";if(r<=127)this.writeUInt8(r);else{var t=r,e=[];for(e.push(t&127),t>>=7;t;){var o=t&127|128;e.push(o),t>>=7}this.writeBytes(e.reverse())}};ye.prototype.writeChunk=function(r,t){this.writeString(r),this.writeUInt32(t.length),this.writeBytes(t)};z$.exports=VW});var sb=Zt(nb=>{nb.parseMidi=U$();nb.writeMidi=W$()});var ab=Zt(ap=>{"use strict";Object.defineProperty(ap,"__esModule",{value:!0});ap.insert=ap.search=void 0;function H$(r,t,e){e===void 0&&(e="ticks");var o=0,n=r.length,s=n;if(n>0&&r[n-1][e]<=t)return n-1;for(;o<s;){var a=Math.floor(o+(s-o)/2),i=r[a],c=r[a+1];if(i[e]===t){for(var p=a;p<r.length;p++){var l=r[p];l[e]===t&&(a=p)}return a}else{if(i[e]<t&&c[e]>t)return a;i[e]>t?s=a:i[e]<t&&(o=a+1)}}return-1}ap.search=H$;function WW(r,t,e){if(e===void 0&&(e="ticks"),r.length){var o=H$(r,t[e],e);r.splice(o+1,0,t)}else r.push(t)}ap.insert=WW});var zd=Zt(ec=>{"use strict";Object.defineProperty(ec,"__esModule",{value:!0});ec.Header=ec.keySignatureKeys=void 0;var ib=ab(),Ud=new WeakMap;ec.keySignatureKeys=["Cb","Gb","Db","Ab","Eb","Bb","F","C","G","D","A","E","B","F#","C#"];var HW=(function(){function r(t){var e=this;if(this.tempos=[],this.timeSignatures=[],this.keySignatures=[],this.meta=[],this.name="",Ud.set(this,480),t){Ud.set(this,t.header.ticksPerBeat),t.tracks.forEach(function(n){n.forEach(function(s){s.meta&&(s.type==="timeSignature"?e.timeSignatures.push({ticks:s.absoluteTime,timeSignature:[s.numerator,s.denominator]}):s.type==="setTempo"?e.tempos.push({bpm:6e7/s.microsecondsPerBeat,ticks:s.absoluteTime}):s.type==="keySignature"&&e.keySignatures.push({key:ec.keySignatureKeys[s.key+7],scale:s.scale===0?"major":"minor",ticks:s.absoluteTime}))})});var o=0;t.tracks[0].forEach(function(n){o+=n.deltaTime,n.meta&&(n.type==="trackName"?e.name=n.text:(n.type==="text"||n.type==="cuePoint"||n.type==="marker"||n.type==="lyrics")&&e.meta.push({text:n.text,ticks:o,type:n.type}))}),this.update()}}return r.prototype.update=function(){var t=this,e=0,o=0;this.tempos.sort(function(n,s){return n.ticks-s.ticks}),this.tempos.forEach(function(n,s){var a=s>0?t.tempos[s-1].bpm:t.tempos[0].bpm,i=n.ticks/t.ppq-o,c=60/a*i;n.time=c+e,e=n.time,o+=i}),this.timeSignatures.sort(function(n,s){return n.ticks-s.ticks}),this.timeSignatures.forEach(function(n,s){var a=s>0?t.timeSignatures[s-1]:t.timeSignatures[0],i=(n.ticks-a.ticks)/t.ppq,c=i/a.timeSignature[0]/(a.timeSignature[1]/4);a.measures=a.measures||0,n.measures=c+a.measures})},r.prototype.ticksToSeconds=function(t){var e=(0,ib.search)(this.tempos,t);if(e!==-1){var o=this.tempos[e],n=o.time,s=(t-o.ticks)/this.ppq;return n+60/o.bpm*s}else{var a=t/this.ppq;return 60/120*a}},r.prototype.ticksToMeasures=function(t){var e=(0,ib.search)(this.timeSignatures,t);if(e!==-1){var o=this.timeSignatures[e],n=(t-o.ticks)/this.ppq;return o.measures+n/(o.timeSignature[0]/o.timeSignature[1])/4}else return t/this.ppq/4},Object.defineProperty(r.prototype,"ppq",{get:function(){return Ud.get(this)},enumerable:!1,configurable:!0}),r.prototype.secondsToTicks=function(t){var e=(0,ib.search)(this.tempos,t,"time");if(e!==-1){var o=this.tempos[e],n=o.time,s=t-n,a=s/(60/o.bpm);return Math.round(o.ticks+a*this.ppq)}else{var i=t/.5;return Math.round(i*this.ppq)}},r.prototype.toJSON=function(){return{keySignatures:this.keySignatures,meta:this.meta,name:this.name,ppq:this.ppq,tempos:this.tempos.map(function(t){return{bpm:t.bpm,ticks:t.ticks}}),timeSignatures:this.timeSignatures}},r.prototype.fromJSON=function(t){this.name=t.name,this.tempos=t.tempos.map(function(e){return Object.assign({},e)}),this.timeSignatures=t.timeSignatures.map(function(e){return Object.assign({},e)}),this.keySignatures=t.keySignatures.map(function(e){return Object.assign({},e)}),this.meta=t.meta.map(function(e){return Object.assign({},e)}),Ud.set(this,t.ppq),this.update()},r.prototype.setTempo=function(t){this.tempos=[{bpm:t,ticks:0}],this.update()},r})();ec.Header=HW});var pb=Zt(vr=>{"use strict";Object.defineProperty(vr,"__esModule",{value:!0});vr.ControlChange=vr.controlChangeIds=vr.controlChangeNames=void 0;vr.controlChangeNames={1:"modulationWheel",2:"breath",4:"footController",5:"portamentoTime",7:"volume",8:"balance",10:"pan",64:"sustain",65:"portamentoTime",66:"sostenuto",67:"softPedal",68:"legatoFootswitch",84:"portamentoControl"};vr.controlChangeIds=Object.keys(vr.controlChangeNames).reduce(function(r,t){return r[vr.controlChangeNames[t]]=t,r},{});var cb=new WeakMap,q$=new WeakMap,qW=(function(){function r(t,e){cb.set(this,e),q$.set(this,t.controllerType),this.ticks=t.absoluteTime,this.value=t.value}return Object.defineProperty(r.prototype,"number",{get:function(){return q$.get(this)},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"name",{get:function(){return vr.controlChangeNames[this.number]?vr.controlChangeNames[this.number]:null},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"time",{get:function(){var t=cb.get(this);return t.ticksToSeconds(this.ticks)},set:function(t){var e=cb.get(this);this.ticks=e.secondsToTicks(t)},enumerable:!1,configurable:!0}),r.prototype.toJSON=function(){return{number:this.number,ticks:this.ticks,time:this.time,value:this.value}},r})();vr.ControlChange=qW});var K$=Zt(Hd=>{"use strict";Object.defineProperty(Hd,"__esModule",{value:!0});Hd.createControlChanges=void 0;var Wd=pb();function KW(){return new Proxy({},{get:function(r,t){if(r[t])return r[t];if(Wd.controlChangeIds.hasOwnProperty(t))return r[Wd.controlChangeIds[t]]},set:function(r,t,e){return Wd.controlChangeIds.hasOwnProperty(t)?r[Wd.controlChangeIds[t]]=e:r[t]=e,!0}})}Hd.createControlChanges=KW});var j$=Zt(qd=>{"use strict";Object.defineProperty(qd,"__esModule",{value:!0});qd.PitchBend=void 0;var lb=new WeakMap,jW=(function(){function r(t,e){lb.set(this,e),this.ticks=t.absoluteTime,this.value=t.value}return Object.defineProperty(r.prototype,"time",{get:function(){var t=lb.get(this);return t.ticksToSeconds(this.ticks)},set:function(t){var e=lb.get(this);this.ticks=e.secondsToTicks(t)},enumerable:!1,configurable:!0}),r.prototype.toJSON=function(){return{ticks:this.ticks,time:this.time,value:this.value}},r})();qd.PitchBend=jW});var X$=Zt(cs=>{"use strict";Object.defineProperty(cs,"__esModule",{value:!0});cs.DrumKitByPatchID=cs.InstrumentFamilyByID=cs.instrumentByPatchID=void 0;cs.instrumentByPatchID=["acoustic grand piano","bright acoustic piano","electric grand piano","honky-tonk piano","electric piano 1","electric piano 2","harpsichord","clavi","celesta","glockenspiel","music box","vibraphone","marimba","xylophone","tubular bells","dulcimer","drawbar organ","percussive organ","rock organ","church organ","reed organ","accordion","harmonica","tango accordion","acoustic guitar (nylon)","acoustic guitar (steel)","electric guitar (jazz)","electric guitar (clean)","electric guitar (muted)","overdriven guitar","distortion guitar","guitar harmonics","acoustic bass","electric bass (finger)","electric bass (pick)","fretless bass","slap bass 1","slap bass 2","synth bass 1","synth bass 2","violin","viola","cello","contrabass","tremolo strings","pizzicato strings","orchestral harp","timpani","string ensemble 1","string ensemble 2","synthstrings 1","synthstrings 2","choir aahs","voice oohs","synth voice","orchestra hit","trumpet","trombone","tuba","muted trumpet","french horn","brass section","synthbrass 1","synthbrass 2","soprano sax","alto sax","tenor sax","baritone sax","oboe","english horn","bassoon","clarinet","piccolo","flute","recorder","pan flute","blown bottle","shakuhachi","whistle","ocarina","lead 1 (square)","lead 2 (sawtooth)","lead 3 (calliope)","lead 4 (chiff)","lead 5 (charang)","lead 6 (voice)","lead 7 (fifths)","lead 8 (bass + lead)","pad 1 (new age)","pad 2 (warm)","pad 3 (polysynth)","pad 4 (choir)","pad 5 (bowed)","pad 6 (metallic)","pad 7 (halo)","pad 8 (sweep)","fx 1 (rain)","fx 2 (soundtrack)","fx 3 (crystal)","fx 4 (atmosphere)","fx 5 (brightness)","fx 6 (goblins)","fx 7 (echoes)","fx 8 (sci-fi)","sitar","banjo","shamisen","koto","kalimba","bag pipe","fiddle","shanai","tinkle bell","agogo","steel drums","woodblock","taiko drum","melodic tom","synth drum","reverse cymbal","guitar fret noise","breath noise","seashore","bird tweet","telephone ring","helicopter","applause","gunshot"];cs.InstrumentFamilyByID=["piano","chromatic percussion","organ","guitar","bass","strings","ensemble","brass","reed","pipe","synth lead","synth pad","synth effects","world","percussive","sound effects"];cs.DrumKitByPatchID={0:"standard kit",8:"room kit",16:"power kit",24:"electronic kit",25:"tr-808 kit",32:"jazz kit",40:"brush kit",48:"orchestra kit",56:"sound fx kit"}});var Z$=Zt(jd=>{"use strict";Object.defineProperty(jd,"__esModule",{value:!0});jd.Instrument=void 0;var Kd=X$(),Y$=new WeakMap,XW=(function(){function r(t,e){if(this.number=0,Y$.set(this,e),this.number=0,t){var o=t.find(function(n){return n.type==="programChange"});o&&(this.number=o.programNumber)}}return Object.defineProperty(r.prototype,"name",{get:function(){return this.percussion?Kd.DrumKitByPatchID[this.number]:Kd.instrumentByPatchID[this.number]},set:function(t){var e=Kd.instrumentByPatchID.indexOf(t);e!==-1&&(this.number=e)},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"family",{get:function(){return this.percussion?"drums":Kd.InstrumentFamilyByID[Math.floor(this.number/8)]},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"percussion",{get:function(){var t=Y$.get(this);return t.channel===9},enumerable:!1,configurable:!0}),r.prototype.toJSON=function(){return{family:this.family,number:this.number,name:this.name}},r.prototype.fromJSON=function(t){this.number=t.number},r})();jd.Instrument=XW});var J$=Zt(Xd=>{"use strict";Object.defineProperty(Xd,"__esModule",{value:!0});Xd.Note=void 0;function YW(r){var t=Math.floor(r/12)-1;return Q$(r)+t.toString()}function Q$(r){var t=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"],e=r%12;return t[e]}function ZW(r){var t=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];return t.indexOf(r)}var QW=(function(){var r=/^([a-g]{1}(?:b|#|x|bb)?)(-?[0-9]+)/i,t={cbb:-2,cb:-1,c:0,"c#":1,cx:2,dbb:0,db:1,d:2,"d#":3,dx:4,ebb:2,eb:3,e:4,"e#":5,ex:6,fbb:3,fb:4,f:5,"f#":6,fx:7,gbb:5,gb:6,g:7,"g#":8,gx:9,abb:7,ab:8,a:9,"a#":10,ax:11,bbb:9,bb:10,b:11,"b#":12,bx:13};return function(e){var o=r.exec(e),n=o[1],s=o[2],a=t[n.toLowerCase()];return a+(parseInt(s,10)+1)*12}})(),ip=new WeakMap,JW=(function(){function r(t,e,o){ip.set(this,o),this.midi=t.midi,this.velocity=t.velocity,this.noteOffVelocity=e.velocity,this.ticks=t.ticks,this.durationTicks=e.ticks-t.ticks}return Object.defineProperty(r.prototype,"name",{get:function(){return YW(this.midi)},set:function(t){this.midi=QW(t)},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"octave",{get:function(){return Math.floor(this.midi/12)-1},set:function(t){var e=t-this.octave;this.midi+=e*12},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"pitch",{get:function(){return Q$(this.midi)},set:function(t){this.midi=12*(this.octave+1)+ZW(t)},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"duration",{get:function(){var t=ip.get(this);return t.ticksToSeconds(this.ticks+this.durationTicks)-t.ticksToSeconds(this.ticks)},set:function(t){var e=ip.get(this),o=e.secondsToTicks(this.time+t);this.durationTicks=o-this.ticks},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"time",{get:function(){var t=ip.get(this);return t.ticksToSeconds(this.ticks)},set:function(t){var e=ip.get(this);this.ticks=e.secondsToTicks(t)},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"bars",{get:function(){var t=ip.get(this);return t.ticksToMeasures(this.ticks)},enumerable:!1,configurable:!0}),r.prototype.toJSON=function(){return{duration:this.duration,durationTicks:this.durationTicks,midi:this.midi,name:this.name,ticks:this.ticks,time:this.time,velocity:this.velocity}},r})();Xd.Note=JW});var mb=Zt(Zd=>{"use strict";Object.defineProperty(Zd,"__esModule",{value:!0});Zd.Track=void 0;var ub=ab(),tH=pb(),eH=K$(),rH=j$(),t2=Z$(),oH=J$(),Yd=new WeakMap,nH=(function(){function r(t,e){var o=this;if(this.name="",this.notes=[],this.controlChanges=(0,eH.createControlChanges)(),this.pitchBends=[],Yd.set(this,e),t){var n=t.find(function(m){return m.type==="trackName"});this.name=n?n.text:""}if(this.instrument=new t2.Instrument(t,this),this.channel=0,t){for(var s=t.filter(function(m){return m.type==="noteOn"}),a=t.filter(function(m){return m.type==="noteOff"}),i=function(){var m=s.shift();c.channel=m.channel;var f=a.findIndex(function(h){return h.noteNumber===m.noteNumber&&h.absoluteTime>=m.absoluteTime});if(f!==-1){var d=a.splice(f,1)[0];c.addNote({durationTicks:d.absoluteTime-m.absoluteTime,midi:m.noteNumber,noteOffVelocity:d.velocity/127,ticks:m.absoluteTime,velocity:m.velocity/127})}},c=this;s.length;)i();var p=t.filter(function(m){return m.type==="controller"});p.forEach(function(m){o.addCC({number:m.controllerType,ticks:m.absoluteTime,value:m.value/127})});var l=t.filter(function(m){return m.type==="pitchBend"});l.forEach(function(m){o.addPitchBend({ticks:m.absoluteTime,value:m.value/Math.pow(2,13)})});var u=t.find(function(m){return m.type==="endOfTrack"});this.endOfTrackTicks=u!==void 0?u.absoluteTime:void 0}}return r.prototype.addNote=function(t){var e=Yd.get(this),o=new oH.Note({midi:0,ticks:0,velocity:1},{ticks:0,velocity:0},e);return Object.assign(o,t),(0,ub.insert)(this.notes,o,"ticks"),this},r.prototype.addCC=function(t){var e=Yd.get(this),o=new tH.ControlChange({controllerType:t.number},e);return delete t.number,Object.assign(o,t),Array.isArray(this.controlChanges[o.number])||(this.controlChanges[o.number]=[]),(0,ub.insert)(this.controlChanges[o.number],o,"ticks"),this},r.prototype.addPitchBend=function(t){var e=Yd.get(this),o=new rH.PitchBend({},e);return Object.assign(o,t),(0,ub.insert)(this.pitchBends,o,"ticks"),this},Object.defineProperty(r.prototype,"duration",{get:function(){if(!this.notes.length)return 0;for(var t=this.notes[this.notes.length-1].time+this.notes[this.notes.length-1].duration,e=0;e<this.notes.length-1;e++){var o=this.notes[e].time+this.notes[e].duration;t<o&&(t=o)}return t},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"durationTicks",{get:function(){if(!this.notes.length)return 0;for(var t=this.notes[this.notes.length-1].ticks+this.notes[this.notes.length-1].durationTicks,e=0;e<this.notes.length-1;e++){var o=this.notes[e].ticks+this.notes[e].durationTicks;t<o&&(t=o)}return t},enumerable:!1,configurable:!0}),r.prototype.fromJSON=function(t){var e=this;this.name=t.name,this.channel=t.channel,this.instrument=new t2.Instrument(void 0,this),this.instrument.fromJSON(t.instrument),t.endOfTrackTicks!==void 0&&(this.endOfTrackTicks=t.endOfTrackTicks);for(var o in t.controlChanges)t.controlChanges[o]&&t.controlChanges[o].forEach(function(n){e.addCC({number:n.number,ticks:n.ticks,value:n.value})});t.notes.forEach(function(n){e.addNote({durationTicks:n.durationTicks,midi:n.midi,ticks:n.ticks,velocity:n.velocity})})},r.prototype.toJSON=function(){for(var t={},e=0;e<127;e++)this.controlChanges.hasOwnProperty(e)&&(t[e]=this.controlChanges[e].map(function(n){return n.toJSON()}));var o={channel:this.channel,controlChanges:t,pitchBends:this.pitchBends.map(function(n){return n.toJSON()}),instrument:this.instrument.toJSON(),name:this.name,notes:this.notes.map(function(n){return n.toJSON()})};return this.endOfTrackTicks!==void 0&&(o.endOfTrackTicks=this.endOfTrackTicks),o},r})();Zd.Track=nH});var r2=Zt(fb=>{"use strict";Object.defineProperty(fb,"__esModule",{value:!0});function sH(r){var t=[];return e2(r,t),t}fb.flatten=sH;function e2(r,t){for(var e=0;e<r.length;e++){var o=r[e];Array.isArray(o)?e2(o,t):t.push(o)}}});var o2=Zt(cp=>{"use strict";var ps=cp&&cp.__spreadArray||function(r,t,e){if(e||arguments.length===2)for(var o=0,n=t.length,s;o<n;o++)(s||!(o in t))&&(s||(s=Array.prototype.slice.call(t,0,o)),s[o]=t[o]);return r.concat(s||Array.prototype.slice.call(t))};Object.defineProperty(cp,"__esModule",{value:!0});cp.encode=void 0;var aH=sb(),iH=zd(),cH=r2();function pH(r,t){return[{absoluteTime:r.ticks,channel:t,deltaTime:0,noteNumber:r.midi,type:"noteOn",velocity:Math.floor(r.velocity*127)},{absoluteTime:r.ticks+r.durationTicks,channel:t,deltaTime:0,noteNumber:r.midi,type:"noteOff",velocity:Math.floor(r.noteOffVelocity*127)}]}function lH(r){return(0,cH.flatten)(r.notes.map(function(t){return pH(t,r.channel)}))}function uH(r,t){return{absoluteTime:r.ticks,channel:t,controllerType:r.number,deltaTime:0,type:"controller",value:Math.floor(r.value*127)}}function mH(r){for(var t=[],e=0;e<127;e++)r.controlChanges.hasOwnProperty(e)&&r.controlChanges[e].forEach(function(o){t.push(uH(o,r.channel))});return t}function fH(r,t){return{absoluteTime:r.ticks,channel:t,deltaTime:0,type:"pitchBend",value:r.value}}function dH(r){var t=[];return r.pitchBends.forEach(function(e){t.push(fH(e,r.channel))}),t}function hH(r){return{absoluteTime:0,channel:r.channel,deltaTime:0,programNumber:r.instrument.number,type:"programChange"}}function gH(r){return{absoluteTime:0,deltaTime:0,meta:!0,text:r,type:"trackName"}}function xH(r){return{absoluteTime:r.ticks,deltaTime:0,meta:!0,microsecondsPerBeat:Math.floor(6e7/r.bpm),type:"setTempo"}}function yH(r){return{absoluteTime:r.ticks,deltaTime:0,denominator:r.timeSignature[1],meta:!0,metronome:24,numerator:r.timeSignature[0],thirtyseconds:8,type:"timeSignature"}}function bH(r){var t=iH.keySignatureKeys.indexOf(r.key);return{absoluteTime:r.ticks,deltaTime:0,key:t+7,meta:!0,scale:r.scale==="major"?0:1,type:"keySignature"}}function CH(r){return{absoluteTime:r.ticks,deltaTime:0,meta:!0,text:r.text,type:r.type}}function TH(r){var t={header:{format:1,numTracks:r.tracks.length+1,ticksPerBeat:r.header.ppq},tracks:ps([ps(ps(ps(ps([{absoluteTime:0,deltaTime:0,meta:!0,text:r.header.name,type:"trackName"}],r.header.keySignatures.map(function(e){return bH(e)}),!0),r.header.meta.map(function(e){return CH(e)}),!0),r.header.tempos.map(function(e){return xH(e)}),!0),r.header.timeSignatures.map(function(e){return yH(e)}),!0)],r.tracks.map(function(e){return ps(ps(ps([gH(e.name),hH(e)],lH(e),!0),mH(e),!0),dH(e),!0)}),!0)};return t.tracks=t.tracks.map(function(e){e=e.sort(function(n,s){return n.absoluteTime-s.absoluteTime});var o=0;return e.forEach(function(n){n.deltaTime=n.absoluteTime-o,o=n.absoluteTime,delete n.absoluteTime}),e.push({deltaTime:0,meta:!0,type:"endOfTrack"}),e}),new Uint8Array((0,aH.writeMidi)(t))}cp.encode=TH});var s2=Zt(Nr=>{"use strict";var wH=Nr&&Nr.__awaiter||function(r,t,e,o){function n(s){return s instanceof e?s:new e(function(a){a(s)})}return new(e||(e=Promise))(function(s,a){function i(l){try{p(o.next(l))}catch(u){a(u)}}function c(l){try{p(o.throw(l))}catch(u){a(u)}}function p(l){l.done?s(l.value):n(l.value).then(i,c)}p((o=o.apply(r,t||[])).next())})},IH=Nr&&Nr.__generator||function(r,t){var e={label:0,sent:function(){if(s[0]&1)throw s[1];return s[1]},trys:[],ops:[]},o,n,s,a;return a={next:i(0),throw:i(1),return:i(2)},typeof Symbol=="function"&&(a[Symbol.iterator]=function(){return this}),a;function i(p){return function(l){return c([p,l])}}function c(p){if(o)throw new TypeError("Generator is already executing.");for(;e;)try{if(o=1,n&&(s=p[0]&2?n.return:p[0]?n.throw||((s=n.return)&&s.call(n),0):n.next)&&!(s=s.call(n,p[1])).done)return s;switch(n=0,s&&(p=[p[0]&2,s.value]),p[0]){case 0:case 1:s=p;break;case 4:return e.label++,{value:p[1],done:!1};case 5:e.label++,n=p[1],p=[0];continue;case 7:p=e.ops.pop(),e.trys.pop();continue;default:if(s=e.trys,!(s=s.length>0&&s[s.length-1])&&(p[0]===6||p[0]===2)){e=0;continue}if(p[0]===3&&(!s||p[1]>s[0]&&p[1]<s[3])){e.label=p[1];break}if(p[0]===6&&e.label<s[1]){e.label=s[1],s=p;break}if(s&&e.label<s[2]){e.label=s[2],e.ops.push(p);break}s[2]&&e.ops.pop(),e.trys.pop();continue}p=t.call(r,e)}catch(l){p=[6,l],n=0}finally{o=s=0}if(p[0]&5)throw p[1];return{value:p[0]?p[1]:void 0,done:!0}}};Object.defineProperty(Nr,"__esModule",{value:!0});Nr.Header=Nr.Track=Nr.Midi=void 0;var SH=sb(),n2=zd(),db=mb(),vH=o2(),NH=(function(){function r(t){var e=this,o=null;if(t){var n=t instanceof ArrayBuffer?new Uint8Array(t):t;o=(0,SH.parseMidi)(n),o.tracks.forEach(function(s){var a=0;s.forEach(function(i){a+=i.deltaTime,i.absoluteTime=a})}),o.tracks=$H(o.tracks)}this.header=new n2.Header(o),this.tracks=[],t&&(this.tracks=o.tracks.map(function(s){return new db.Track(s,e.header)}),o.header.format===1&&this.tracks[0].duration===0&&this.tracks.shift())}return r.fromUrl=function(t){return wH(this,void 0,void 0,function(){var e,o;return IH(this,function(n){switch(n.label){case 0:return[4,fetch(t)];case 1:return e=n.sent(),e.ok?[4,e.arrayBuffer()]:[3,3];case 2:return o=n.sent(),[2,new r(o)];case 3:throw new Error("Could not load '".concat(t,"'"))}})})},Object.defineProperty(r.prototype,"name",{get:function(){return this.header.name},set:function(t){this.header.name=t},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"duration",{get:function(){var t=this.tracks.map(function(e){return e.duration});return Math.max.apply(Math,t)},enumerable:!1,configurable:!0}),Object.defineProperty(r.prototype,"durationTicks",{get:function(){var t=this.tracks.map(function(e){return e.durationTicks});return Math.max.apply(Math,t)},enumerable:!1,configurable:!0}),r.prototype.addTrack=function(){var t=new db.Track(void 0,this.header);return this.tracks.push(t),t},r.prototype.toArray=function(){return(0,vH.encode)(this)},r.prototype.toJSON=function(){return{header:this.header.toJSON(),tracks:this.tracks.map(function(t){return t.toJSON()})}},r.prototype.fromJSON=function(t){var e=this;this.header=new n2.Header,this.header.fromJSON(t.header),this.tracks=t.tracks.map(function(o){var n=new db.Track(void 0,e.header);return n.fromJSON(o),n})},r.prototype.clone=function(){var t=new r;return t.fromJSON(this.toJSON()),t},r})();Nr.Midi=NH;var kH=mb();Object.defineProperty(Nr,"Track",{enumerable:!0,get:function(){return kH.Track}});var EH=zd();Object.defineProperty(Nr,"Header",{enumerable:!0,get:function(){return EH.Header}});function $H(r){for(var t=[],e=0;e<r.length;e++)for(var o=t.length,n=new Map,s=Array(16).fill(0),a=0,i=r[e];a<i.length;a++){var c=i[a],p=o,l=c.channel;if(l!==void 0){c.type==="programChange"&&(s[l]=c.programNumber);var u=s[l],m="".concat(u," ").concat(l);n.has(m)?p=n.get(m):(p=o+n.size,n.set(m,p))}t[p]||t.push([]),t[p].push(c)}return t}});var eb={};kt(eb,{Abs:()=>fs,Acos:()=>Xo,Acosh:()=>Yo,AdadeltaOptimizer:()=>Yn,AdagradOptimizer:()=>Zn,AdamOptimizer:()=>Qn,AdamaxOptimizer:()=>Jn,Add:()=>bo,AddN:()=>ds,All:()=>ic,Any:()=>cc,ArgMax:()=>hs,ArgMin:()=>gs,Asin:()=>Zo,Asinh:()=>Qo,Atan:()=>Jo,Atan2:()=>en,Atanh:()=>tn,AvgPool:()=>xs,AvgPool3D:()=>ys,AvgPool3DGrad:()=>hp,AvgPoolGrad:()=>dp,BatchMatMul:()=>bs,BatchToSpaceND:()=>Cs,Bincount:()=>Ts,BroadcastArgs:()=>ws,BroadcastTo:()=>V2,Cast:()=>Co,Ceil:()=>rn,ClipByValue:()=>on,Complex:()=>Is,ComplexAbs:()=>Ss,Concat:()=>vs,Conv2D:()=>Ns,Conv2DBackpropFilter:()=>ks,Conv2DBackpropInput:()=>Es,Conv3D:()=>$s,Conv3DBackpropFilterV2:()=>gp,Conv3DBackpropInputV2:()=>As,Cos:()=>Rs,Cosh:()=>nn,CropAndResize:()=>_s,Cumprod:()=>Ds,Cumsum:()=>Fs,DataStorage:()=>Ko,DenseBincount:()=>Os,DepthToSpace:()=>Ps,DepthwiseConv2dNative:()=>Ls,DepthwiseConv2dNativeBackpropFilter:()=>Ms,DepthwiseConv2dNativeBackpropInput:()=>Bs,Diag:()=>Vs,Dilation2D:()=>Gs,Dilation2DBackpropFilter:()=>wu,Dilation2DBackpropInput:()=>Tu,ENV:()=>Cu,Einsum:()=>Us,Elu:()=>zs,EluGrad:()=>xp,Environment:()=>ac,Equal:()=>an,Erf:()=>Ws,Exp:()=>Hs,ExpandDims:()=>qs,Expm1:()=>cn,FFT:()=>pc,Fill:()=>Ks,FlipLeftRight:()=>js,Floor:()=>pn,FloorDiv:()=>ln,FromPixels:()=>hc,FusedBatchNorm:()=>Xs,FusedConv2D:()=>Gn,FusedDepthwiseConv2D:()=>Un,GatherNd:()=>Zs,GatherV2:()=>Ys,GraphModel:()=>_c,Greater:()=>un,GreaterEqual:()=>mn,IFFT:()=>Qs,Identity:()=>To,Imag:()=>Js,IsFinite:()=>fn,IsInf:()=>dn,IsNan:()=>hn,KernelBackend:()=>qr,LRN:()=>lc,LRNGrad:()=>yp,LeakyRelu:()=>ta,Less:()=>gn,LessEqual:()=>xn,LinSpace:()=>ea,Log:()=>ra,Log1p:()=>yn,LogSoftmax:()=>U2,LogicalAnd:()=>bn,LogicalNot:()=>Cn,LogicalOr:()=>Tn,LogicalXor:()=>G2,LowerBound:()=>z2,Max:()=>uc,MaxPool:()=>oa,MaxPool3D:()=>na,MaxPool3DGrad:()=>Cp,MaxPoolGrad:()=>bp,MaxPoolWithArgmax:()=>sa,Maximum:()=>wn,Mean:()=>aa,Min:()=>mc,Minimum:()=>In,MirrorPad:()=>ia,Mod:()=>ca,MomentumOptimizer:()=>ts,Multinomial:()=>pa,Multiply:()=>Sn,Neg:()=>fc,NonMaxSuppressionV3:()=>la,NonMaxSuppressionV4:()=>ua,NonMaxSuppressionV5:()=>ma,NotEqual:()=>vn,OP_SCOPE_SUFFIX:()=>Au,OneHot:()=>da,OnesLike:()=>fa,Optimizer:()=>Ee,OptimizerConstructors:()=>gr,Pack:()=>ha,PadV2:()=>ga,Pool:()=>W2,Pow:()=>xa,Prelu:()=>ya,Prod:()=>ba,RMSPropOptimizer:()=>es,RaggedGather:()=>Ca,RaggedTensorToTensor:()=>Ta,Range:()=>wa,Rank:()=>Eu,Real:()=>Ia,RealDiv:()=>sn,Reciprocal:()=>Nn,Reduction:()=>Kt,Relu:()=>kn,Relu6:()=>En,Reshape:()=>Sa,ResizeBilinear:()=>Na,ResizeBilinearGrad:()=>wp,ResizeNearestNeighbor:()=>va,ResizeNearestNeighborGrad:()=>Tp,Reverse:()=>ka,RotateWithOffset:()=>Ja,Round:()=>$n,Rsqrt:()=>An,SGDOptimizer:()=>co,ScatterNd:()=>Ea,SearchSorted:()=>$a,Select:()=>Aa,Selu:()=>Rn,Sigmoid:()=>_n,Sign:()=>Fn,Sin:()=>Da,Sinh:()=>Dn,Slice:()=>Ra,Softmax:()=>Oa,Softplus:()=>On,SpaceToBatchND:()=>Fa,SparseFillEmptyRows:()=>Pa,SparseReshape:()=>La,SparseSegmentMean:()=>Ma,SparseSegmentSum:()=>Ba,SparseToDense:()=>Va,SplitV:()=>_a,Sqrt:()=>Pn,Square:()=>Ip,SquaredDifference:()=>Ln,Step:()=>Bn,StridedSlice:()=>Ga,StringNGrams:()=>Ua,StringSplit:()=>za,StringToHashBucketFast:()=>Wa,Sub:()=>Ha,Sum:()=>dc,Tan:()=>qa,Tanh:()=>Mn,Tensor:()=>Et,TensorBuffer:()=>Rt,Tile:()=>wo,TopK:()=>Ka,Transform:()=>ja,Transpose:()=>Io,Unique:()=>Xa,Unpack:()=>Ya,UnsortedSegmentSum:()=>Za,UpperBound:()=>H2,Variable:()=>Yr,ZerosLike:()=>Qa,_FusedMatMul:()=>Vn,abs:()=>ne,acos:()=>Bp,acosh:()=>Vp,add:()=>ot,addN:()=>tg,all:()=>Gp,any:()=>Up,argMax:()=>zp,argMin:()=>Wp,asin:()=>Hp,asinh:()=>qp,atan:()=>Kp,atan2:()=>jp,atanh:()=>Xp,avgPool:()=>ui,avgPool3d:()=>ng,backend:()=>sR,backend_util:()=>v,basicLSTMCell:()=>sg,batchNorm:()=>Or,batchNorm2d:()=>ag,batchNorm3d:()=>ig,batchNorm4d:()=>cg,batchToSpaceND:()=>mi,bincount:()=>Yp,booleanMaskAsync:()=>mC,broadcastArgs:()=>pg,broadcastTo:()=>Pr,broadcast_util:()=>_r,browser:()=>Hh,buffer:()=>rt,cast:()=>dt,ceil:()=>Zp,clipByValue:()=>Qp,clone:()=>Le,complex:()=>Re,concat:()=>Ot,concat1d:()=>Jp,concat2d:()=>lg,concat3d:()=>ug,concat4d:()=>mg,conv1d:()=>tl,conv2d:()=>Mr,conv2dTranspose:()=>el,conv3d:()=>fg,conv3dTranspose:()=>dg,copyRegisteredKernels:()=>Y2,cos:()=>rl,cosh:()=>ol,cosineWindow:()=>Rc,cumprod:()=>nl,cumsum:()=>sl,customGrad:()=>ke,denseBincount:()=>hg,deprecationWarn:()=>I0,depthToSpace:()=>al,depthwiseConv2d:()=>$o,deregisterOp:()=>bT,device_util:()=>So,diag:()=>gg,dilation2d:()=>il,disableDeprecationWarnings:()=>jA,dispose:()=>ee,disposeVariables:()=>XA,div:()=>Ct,divNoNan:()=>cl,dot:()=>pl,dropout:()=>bC,einsum:()=>xg,elu:()=>di,enableDebugMode:()=>KA,enableProdMode:()=>qA,enclosingPowerOfTwo:()=>em,engine:()=>Fr,env:()=>F,equal:()=>fi,erf:()=>ll,euclideanNorm:()=>ul,exp:()=>Be,expandDims:()=>Xe,expm1:()=>ml,eye:()=>fl,fft:()=>Fo,fill:()=>Lr,findBackend:()=>oR,findBackendFactory:()=>nR,floor:()=>hi,floorDiv:()=>ii,fused:()=>rm,gather:()=>gi,gatherND:()=>xC,gather_util:()=>qh,getBackend:()=>eR,getGradient:()=>Iu,getKernel:()=>xc,getKernelsForBackend:()=>vp,grad:()=>K0,grads:()=>j0,greater:()=>no,greaterEqual:()=>xi,ifft:()=>io,imag:()=>ko,image:()=>pT,inTopKAsync:()=>CC,io:()=>to,irfft:()=>_i,isFinite:()=>dl,isInf:()=>hl,isNaN:()=>gl,keep:()=>Ke,kernel_impls:()=>ge,leakyRelu:()=>yi,less:()=>xl,lessEqual:()=>Ro,linalg:()=>lT,linspace:()=>bg,loadGraphModel:()=>Am,loadGraphModelSync:()=>YT,localResponseNormalization:()=>yl,log:()=>fr,log1p:()=>bi,logSigmoid:()=>bl,logSoftmax:()=>Cl,logSumExp:()=>Ti,logicalAnd:()=>so,logicalNot:()=>wi,logicalOr:()=>Ii,logicalXor:()=>Tl,losses:()=>uT,lowerBound:()=>Cg,matMul:()=>St,math:()=>Wh,max:()=>or,maxPool:()=>Si,maxPool3d:()=>Tg,maxPoolWithArgmax:()=>wg,maximum:()=>vi,mean:()=>ao,memory:()=>YA,meshgrid:()=>Ig,min:()=>Xn,minimum:()=>Ni,mirrorPad:()=>wl,mod:()=>Il,moments:()=>Sg,movingAverage:()=>fC,mul:()=>j,multiRNNCell:()=>vg,multinomial:()=>Ng,neg:()=>de,nextFrame:()=>um,norm:()=>oo,notEqual:()=>ki,oneHot:()=>Kn,ones:()=>Vr,onesLike:()=>Sl,op:()=>S,outerProduct:()=>kg,pad:()=>nr,pad1d:()=>Eg,pad2d:()=>$g,pad3d:()=>Ag,pad4d:()=>Rg,pool:()=>vl,pow:()=>mr,prelu:()=>$i,print:()=>Fp,prod:()=>Nl,profile:()=>ZA,raggedGather:()=>Dg,raggedTensorToTensor:()=>Fg,rand:()=>_g,randomGamma:()=>Ug,randomNormal:()=>kl,randomStandardNormal:()=>zg,randomUniform:()=>El,range:()=>Do,ready:()=>tR,real:()=>eo,reciprocal:()=>$l,registerBackend:()=>Pp,registerGradient:()=>K2,registerKernel:()=>yc,registerOp:()=>yT,relu:()=>Gr,relu6:()=>Di,removeBackend:()=>rR,reshape:()=>P,reverse:()=>Fe,reverse1d:()=>Wg,reverse2d:()=>Hg,reverse3d:()=>qg,reverse4d:()=>Kg,rfft:()=>_o,round:()=>Fi,rsqrt:()=>Al,scalar:()=>it,scatterND:()=>dC,scatter_util:()=>zu,searchSorted:()=>Ac,selu:()=>Rl,separableConv2d:()=>Dl,serialization:()=>Xh,setBackend:()=>JA,setPlatform:()=>aR,setdiff1dAsync:()=>jg,sigmoid:()=>rr,sign:()=>Fl,signal:()=>lm,sin:()=>_l,sinh:()=>Ol,slice:()=>yt,slice1d:()=>Xg,slice2d:()=>Yg,slice3d:()=>Zg,slice4d:()=>Qg,slice_util:()=>ce,softmax:()=>Pl,softplus:()=>Ci,spaceToBatchND:()=>Ei,sparse:()=>mT,sparseToDense:()=>gC,spectral:()=>cT,split:()=>dr,sqrt:()=>Te,square:()=>se,squaredDifference:()=>Oi,squeeze:()=>Oo,stack:()=>he,step:()=>Pi,stridedSlice:()=>Ll,string:()=>fT,sub:()=>pt,sum:()=>vt,sumOutType:()=>Hn,tan:()=>Ml,tanh:()=>jn,tensor:()=>fe,tensor1d:()=>we,tensor2d:()=>Po,tensor3d:()=>Lp,tensor4d:()=>Jg,tensor5d:()=>tx,tensor6d:()=>ex,tensor_util:()=>Sh,test_util:()=>Jh,tidy:()=>ht,tile:()=>Br,time:()=>QA,topk:()=>Bl,train:()=>dP,transpose:()=>Eo,truncatedNormal:()=>rx,unique:()=>Vl,unregisterGradient:()=>X2,unregisterKernel:()=>j2,unsortedSegmentSum:()=>Gl,unstack:()=>_e,upcastType:()=>Qt,upperBound:()=>ox,util:()=>y,valueAndGrad:()=>X0,valueAndGrads:()=>Y0,variable:()=>nx,variableGrads:()=>Ku,version_converter:()=>ZT,version_core:()=>V0,where:()=>je,whereAsync:()=>Ul,zeros:()=>Ve,zerosLike:()=>Jt});var Ko=class{constructor(t,e){this.backend=t,this.dataMover=e,this.data=new WeakMap,this.dataIdsCount=0}get(t){return this.data.has(t)||this.dataMover.moveData(this.backend,t),this.data.get(t)}set(t,e){this.dataIdsCount++,this.data.set(t,e)}has(t){return this.data.has(t)}delete(t){return this.dataIdsCount--,this.data.delete(t)}numDataIds(){return this.dataIdsCount}},qr=class{refCount(t){return tr("refCount")}incRef(t){return tr("incRef")}timerAvailable(){return!0}time(t){return tr("time")}read(t){return tr("read")}readSync(t){return tr("readSync")}readToGPU(t,e){return tr("readToGPU")}numDataIds(){return tr("numDataIds")}disposeData(t,e){return tr("disposeData")}write(t,e,o){return tr("write")}move(t,e,o,n,s){return tr("move")}memory(){return tr("memory")}floatPrecision(){return tr("floatPrecision")}epsilon(){return this.floatPrecision()===32?1e-7:1e-4}dispose(){return tr("dispose")}};function tr(r){throw new Error(`'${r}' not yet implemented or not found in the registry. This kernel may not be supported by the tfjs backend you have chosen`)}function yb(r){let t=r.length,e=0;for(;t>0;)e=Math.random()*t|0,t--,yu(r,t,e)}function C2(r,t){if(r.length!==t.length)throw new Error(`Array sizes must match to be shuffled together First array length was ${r.length}Second array length was ${t.length}`);let e=r.length,o=0;for(;e>0;)o=Math.random()*e|0,e--,yu(r,e,o),yu(t,e,o)}function rc(r,t,e){return Math.max(r,Math.min(t,e))}function T2(r){return r%2===0?r:r+1}function yu(r,t,e){let o=r[t];r[t]=r[e],r[e]=o}function w2(r){let t=0;for(let e=0;e<r.length;e++)t+=r[e];return t}function I2(r,t){let e=Math.random();return t*e+(1-e)*r}function S2(r,t){let e=0;for(let o=0;o<r.length;o++){let n=Number(r[o])-Number(t[o]);e+=n*n}return e}function E(r,t){if(!r)throw new Error(typeof t=="string"?t:t())}function Mt(r,t,e=""){E(ze(r,t),()=>e+` Shapes ${r} and ${t} must match`)}function er(r){E(r!=null,()=>"The input to the tensor constructor must be a non-null value.")}function Er(r,t=[],e=!1){if(t==null&&(t=[]),Array.isArray(r)||ie(r)&&!e)for(let o=0;o<r.length;++o)Er(r[o],t,e);else t.push(r);return t}function It(r){if(r.length===0)return 1;let t=r[0];for(let e=1;e<r.length;e++)t*=r[e];return t}function v2(r){return r.length===0}function ze(r,t){if(r===t)return!0;if(r==null||t==null||r.length!==t.length)return!1;for(let e=0;e<r.length;e++)if(r[e]!==t[e])return!1;return!0}function yo(r){return r%1===0}function N2(r){if(Math.tanh!=null)return Math.tanh(r);if(r===1/0)return 1;if(r===-1/0)return-1;{let t=Math.exp(2*r);return(t-1)/(t+1)}}function k2(r){let t=Math.ceil(Math.sqrt(r));return[t,Math.ceil(r/t)]}function E2(r){let t=new Uint32Array(r);for(let e=0;e<r;++e)t[e]=e;return yb(t),t}function ms(r,t){return t<=r.length?r:r+" ".repeat(t-r.length)}function $2(r,t=n=>0,e,o=setTimeout){return new Promise((n,s)=>{let a=0,i=()=>{if(r()){n();return}a++;let c=t(a);if(e!=null&&a>=e){s();return}o(i,c)};i()})}function A2(r,t){let e=1,o=-1;for(let s=0;s<r.length;++s)if(r[s]>=0)e*=r[s];else if(r[s]===-1){if(o!==-1)throw Error(`Shapes can only have 1 implicit size. Found -1 at dim ${o} and dim ${s}`);o=s}else if(r[s]<0)throw Error(`Shapes can not be < 0. Found ${r[s]} at dim ${s}`);if(o===-1){if(t>0&&t!==e)throw Error(`Size(${t}) must match the product of shape ${r}`);return r}if(e===0)throw Error(`Cannot infer the missing size in [${r}] when there are 0 elements`);if(t%e!==0)throw Error(`The implicit shape can't be a fractional number. Got ${t} / ${e}`);let n=r.slice();return n[o]=t/e,n}function jo(r,t){let e=t.length;return r=r==null?t.map((o,n)=>n):[].concat(r),E(r.every(o=>o>=-e&&o<e),()=>`All values in axis param must be in range [-${e}, ${e}) but got axis ${r}`),E(r.every(o=>yo(o)),()=>`All values in axis param must be integers but got axis ${r}`),r.map(o=>o<0?e+o:o)}function nh(r,t){let e=[],o=[],n=t!=null&&Array.isArray(t)&&t.length===0,s=t==null||n?null:jo(t,r).sort(),a=0;for(let i=0;i<r.length;++i){if(s!=null){if(s[a]===i&&r[i]!==1)throw new Error(`Can't squeeze axis ${i} since its dim '${r[i]}' is not 1`);(s[a]==null||s[a]>i)&&r[i]===1&&(e.push(r[i]),o.push(i)),s[a]<=i&&a++}r[i]!==1&&(e.push(r[i]),o.push(i))}return{newShape:e,keptDims:o}}function sh(r,t){let e=null;if(r==null||r==="float32")e=new Float32Array(t);else if(r==="int32")e=new Int32Array(t);else if(r==="bool")e=new Uint8Array(t);else throw new Error(`Unknown data type ${r}`);return e}function ah(r,t){let e=null;if(r==null||r==="float32")e=new Float32Array(t);else if(r==="int32")e=new Int32Array(t);else if(r==="bool")e=new Uint8Array(t);else if(r==="string")e=new Array(t);else throw new Error(`Unknown data type ${r}`);return e}function ih(r,t){for(let e=0;e<r.length;e++){let o=r[e];if(isNaN(o)||!isFinite(o))throw Error(`A tensor of type ${t} being uploaded contains ${o}.`)}}function ch(r){return r==="bool"||r==="complex64"||r==="float32"||r==="int32"||r==="string"}function R2(r,t){return!(t==="complex64"||t==="float32"&&r!=="complex64"||t==="int32"&&r!=="float32"&&r!=="complex64"||t==="bool"&&r==="bool")}function ie(r){return r instanceof Float32Array||r instanceof Int32Array||r instanceof Uint8Array||r instanceof Uint8ClampedArray}function bu(r){if(r==="float32"||r==="int32")return 4;if(r==="complex64")return 8;if(r==="bool")return 1;throw new Error(`Unknown dtype ${r}`)}function ph(r){if(r==null)return 0;let t=0;return r.forEach(e=>t+=e.length),t}function $r(r){return typeof r=="string"||r instanceof String}function bb(r){return typeof r=="boolean"}function Cb(r){return typeof r=="number"}function oc(r){return Array.isArray(r)?oc(r[0]):r instanceof Float32Array?"float32":r instanceof Int32Array||r instanceof Uint8Array||r instanceof Uint8ClampedArray?"int32":Cb(r)?"float32":$r(r)?"string":bb(r)?"bool":"float32"}function Kr(r){return!!(r&&r.constructor&&r.call&&r.apply)}function nc(r,t){for(let e=t;e<r;++e)if(r%e===0)return e;return r}function jr(r){let t=r.length;if(t<2)return[];let e=new Array(t-1);e[t-2]=r[t-1];for(let o=t-3;o>=0;--o)e[o]=e[o+1]*r[o+1];return e}function Tb(r,t,e,o=!1){let n=new Array;if(t.length===1){let s=t[0]*(o?2:1);for(let a=0;a<s;a++)n[a]=e[r+a]}else{let s=t[0],a=t.slice(1),i=a.reduce((c,p)=>c*p)*(o?2:1);for(let c=0;c<s;c++)n[c]=Tb(r+c*i,a,e,o)}return n}function us(r,t,e=!1){if(r.length===0)return t[0];let o=r.reduce((n,s)=>n*s)*(e?2:1);if(o===0)return[];if(o!==t.length)throw new Error(`[${r}] does not match the input size ${t.length}${e?" for a complex tensor":""}.`);return Tb(0,r,t,e)}function lp(r,t){let e=sc(r,t);for(let o=0;o<e.length;o++)e[o]=1;return e}function sc(r,t){if(t==null||t==="float32"||t==="complex64")return new Float32Array(r);if(t==="int32")return new Int32Array(r);if(t==="bool")return new Uint8Array(r);throw new Error(`Unknown data type ${t}`)}function D2(r,t){let e=r.reduce((o,n)=>o*n,1);if(t==null||t==="float32")return us(r,new Float32Array(e));if(t==="int32")return us(r,new Int32Array(e));if(t==="bool")return us(r,new Uint8Array(e));throw new Error(`Unknown data type ${t}`)}function up(r){r.forEach(t=>{E(Number.isInteger(t)&&t>=0,()=>`Tensor must have a shape comprised of positive integers but got shape [${r}].`)})}function F2(r,t,e){if(t===0)return 0;if(t===1)return r[0];let o=r[r.length-1];for(let n=0;n<r.length-1;++n)o+=e[n]*r[n];return o}function _2(r,t,e){if(t===0)return[];if(t===1)return[r];let o=new Array(t);for(let n=0;n<o.length-1;++n)o[n]=Math.floor(r/e[n]),r-=o[n]*e[n];return o[o.length-1]=r,o}function mp(r){return r&&r.then&&typeof r.then=="function"}var wb="tfjsflags",ac=class{constructor(t){this.global=t,this.flags={},this.flagRegistry={},this.urlFlags={},this.getQueryParams=P2,this.populateURLFlags()}setPlatform(t,e){this.platform!=null&&(F().getBool("IS_TEST")||F().getBool("PROD")||console.warn(`Platform ${this.platformName} has already been set. Overwriting the platform with ${t}.`)),this.platformName=t,this.platform=e}registerFlag(t,e,o){if(this.flagRegistry[t]={evaluationFn:e,setHook:o},this.urlFlags[t]!=null){let n=this.urlFlags[t];F().getBool("IS_TEST")||F().getBool("PROD")||console.warn(`Setting feature override from URL ${t}: ${n}.`),this.set(t,n)}}async getAsync(t){return t in this.flags?this.flags[t]:(this.flags[t]=await this.evaluateFlag(t),this.flags[t])}get(t){if(t in this.flags)return this.flags[t];let e=this.evaluateFlag(t);if(mp(e))throw new Error(`Flag ${t} cannot be synchronously evaluated. Please use getAsync() instead.`);return this.flags[t]=e,this.flags[t]}getNumber(t){return this.get(t)}getBool(t){return this.get(t)}getFlags(){return this.flags}get features(){return this.flags}set(t,e){if(this.flagRegistry[t]==null)throw new Error(`Cannot set flag ${t} as it has not been registered.`);this.flags[t]=e,this.flagRegistry[t].setHook!=null&&this.flagRegistry[t].setHook(e)}evaluateFlag(t){if(this.flagRegistry[t]==null)throw new Error(`Cannot evaluate flag '${t}': no evaluation function found.`);return this.flagRegistry[t].evaluationFn()}setFlags(t){this.flags=Object.assign({},t)}reset(){this.flags={},this.urlFlags={},this.populateURLFlags()}populateURLFlags(){if(typeof this.global>"u"||typeof this.global.location>"u"||typeof this.global.location.search>"u")return;let t=this.getQueryParams(this.global.location.search);wb in t&&t[wb].split(",").forEach(o=>{let[n,s]=o.split(":");this.urlFlags[n]=M2(n,s)})}};function P2(r){let t={};return r.replace(/[?&]([^=?&]+)(?:=([^&]*))?/g,(e,...o)=>(L2(t,o[0],o[1]),o.join("="))),t}function L2(r,t,e){r[decodeURIComponent(t)]=decodeURIComponent(e||"")}function M2(r,t){if(t=t.toLowerCase(),t==="true"||t==="false")return t==="true";if(`${+t}`===t)return+t;throw new Error(`Could not parse value flag value ${t} for flag ${r}.`)}function F(){return Cu}var Cu=null;function Ib(r){Cu=r}var lh;function uh(){if(lh==null){let r;if(typeof window<"u")r=window;else if(typeof global<"u")r=global;else if(typeof process<"u")r=process;else if(typeof self<"u")r=self;else throw new Error("Could not find a global object");lh=r}return lh}function B2(){let r=uh();return r._tfGlobals==null&&(r._tfGlobals=new Map),r._tfGlobals}function fp(r,t){let e=B2();if(e.has(r))return e.get(r);{let o=t();return e.set(r,o),e.get(r)}}var fs="Abs",Xo="Acos",Yo="Acosh",bo="Add",ds="AddN",ic="All",cc="Any",hs="ArgMax",gs="ArgMin",Zo="Asin",Qo="Asinh",Jo="Atan",tn="Atanh",en="Atan2",xs="AvgPool",dp="AvgPoolGrad",ys="AvgPool3D",hp="AvgPool3DGrad",bs="BatchMatMul",Cs="BatchToSpaceND",Ts="Bincount",V2="BroadcastTo",ws="BroadcastArgs",Co="Cast",rn="Ceil",on="ClipByValue",Is="Complex",Ss="ComplexAbs",vs="Concat",Ns="Conv2D",ks="Conv2DBackpropFilter",Es="Conv2DBackpropInput",$s="Conv3D",gp="Conv3DBackpropFilterV2",As="Conv3DBackpropInputV2",Rs="Cos",nn="Cosh",Ds="Cumprod",Fs="Cumsum",_s="CropAndResize",Os="DenseBincount",Ps="DepthToSpace",Ls="DepthwiseConv2dNative",Ms="DepthwiseConv2dNativeBackpropFilter",Bs="DepthwiseConv2dNativeBackpropInput",Vs="Diag",Gs="Dilation2D",Tu="Dilation2DBackpropInput",wu="Dilation2DBackpropFilter",sn="RealDiv",Us="Einsum",zs="Elu",xp="EluGrad",Ws="Erf",an="Equal",Hs="Exp",qs="ExpandDims",cn="Expm1",pc="FFT",Ks="Fill",js="FlipLeftRight",pn="Floor",ln="FloorDiv",Xs="FusedBatchNorm",Ys="GatherV2",Zs="GatherNd",un="Greater",mn="GreaterEqual",To="Identity",Qs="IFFT",Js="Imag",fn="IsFinite",dn="IsInf",hn="IsNan",ta="LeakyRelu",gn="Less",xn="LessEqual",ea="LinSpace",ra="Log",yn="Log1p",bn="LogicalAnd",Cn="LogicalNot",Tn="LogicalOr",G2="LogicalXor",U2="LogSoftmax",z2="LowerBound",lc="LRN",yp="LRNGrad",uc="Max",wn="Maximum",oa="MaxPool",bp="MaxPoolGrad",na="MaxPool3D",Cp="MaxPool3DGrad",sa="MaxPoolWithArgmax",aa="Mean",mc="Min",In="Minimum",ia="MirrorPad",ca="Mod",pa="Multinomial",Sn="Multiply",fc="Neg",vn="NotEqual",la="NonMaxSuppressionV3",ua="NonMaxSuppressionV4",ma="NonMaxSuppressionV5",fa="OnesLike",da="OneHot",ha="Pack",ga="PadV2",W2="Pool",xa="Pow",ya="Prelu",ba="Prod",Ca="RaggedGather",Ta="RaggedTensorToTensor",wa="Range",Ia="Real",Nn="Reciprocal",kn="Relu",Sa="Reshape",va="ResizeNearestNeighbor",Tp="ResizeNearestNeighborGrad",Na="ResizeBilinear",wp="ResizeBilinearGrad",En="Relu6",ka="Reverse",$n="Round",An="Rsqrt",Ea="ScatterNd",$a="SearchSorted",Aa="Select",Rn="Selu",Ra="Slice",Da="Sin",Dn="Sinh",Fn="Sign",_n="Sigmoid",On="Softplus",Pn="Sqrt",dc="Sum",Fa="SpaceToBatchND",_a="SplitV",Oa="Softmax",Pa="SparseFillEmptyRows",La="SparseReshape",Ma="SparseSegmentMean",Ba="SparseSegmentSum",Va="SparseToDense",Ln="SquaredDifference",Ip="Square",Ga="StridedSlice",Ua="StringNGrams",za="StringSplit",Wa="StringToHashBucketFast",Ha="Sub",qa="Tan",Mn="Tanh",wo="Tile",Ka="TopK",ja="Transform",Io="Transpose",Xa="Unique",Ya="Unpack",Za="UnsortedSegmentSum",H2="UpperBound",Qa="ZerosLike",Bn="Step",hc="FromPixels",Ja="RotateWithOffset",Vn="_FusedMatMul",Gn="FusedConv2D",Un="FusedDepthwiseConv2D";function Xr(...r){F().getBool("IS_TEST")||F().getBool("PROD")||console.warn(...r)}function q2(...r){F().getBool("IS_TEST")||F().getBool("PROD")||console.log(...r)}var gc=fp("kernelRegistry",()=>new Map),Sp=fp("gradRegistry",()=>new Map);function xc(r,t){let e=mh(r,t);return gc.get(e)}function Iu(r){return Sp.get(r)}function vp(r){let t=gc.entries(),e=[];for(;;){let{done:o,value:n}=t.next();if(o)break;let[s,a]=n,[i]=s.split("_");i===r&&e.push(a)}return e}function yc(r){let{kernelName:t,backendName:e}=r,o=mh(t,e);gc.has(o)&&Xr(`The kernel '${t}' for backend '${e}' is already registered`),gc.set(o,r)}function K2(r){let{kernelName:t}=r;Sp.has(t)&&F().getBool("DEBUG")&&Xr(`Overriding the gradient for '${t}'`),Sp.set(t,r)}function j2(r,t){let e=mh(r,t);if(!gc.has(e))throw new Error(`The kernel '${r}' for backend '${t}' is not registered`);gc.delete(e)}function X2(r){if(!Sp.has(r))throw new Error(`The gradient '${r}' for backend is not registered`);Sp.delete(r)}function Y2(r,t){vp(r).forEach(o=>{let n=Object.assign({},o,{backendName:t});yc(n)})}function mh(r,t){return`${t}_${r}`}var y={};kt(y,{arraysEqual:()=>ze,assert:()=>E,assertNonNegativeIntegerDimensions:()=>up,assertNonNull:()=>er,assertShapesMatch:()=>Mt,bytesFromStringArray:()=>ph,bytesPerElement:()=>bu,checkConversionForErrors:()=>ih,clamp:()=>rc,computeStrides:()=>jr,createScalarValue:()=>oA,createShuffledIndices:()=>E2,decodeString:()=>wc,distSquared:()=>S2,encodeString:()=>Wn,fetch:()=>sA,fingerPrint64:()=>rA,flatten:()=>Er,getArrayFromDType:()=>ah,getTypedArrayFromDType:()=>sh,hasEncodingLoss:()=>R2,hexToLong:()=>Np,indexToLoc:()=>_2,inferDtype:()=>oc,inferFromImplicitShape:()=>A2,isBoolean:()=>bb,isFunction:()=>Kr,isInt:()=>yo,isNumber:()=>Cb,isPromise:()=>mp,isScalarShape:()=>v2,isString:()=>$r,isTypedArray:()=>ie,isValidDtype:()=>ch,locToIndex:()=>F2,makeOnesTypedArray:()=>lp,makeZerosNestedTypedArray:()=>D2,makeZerosTypedArray:()=>sc,nearestDivisor:()=>nc,nearestLargerEven:()=>T2,now:()=>ni,parseAxisParam:()=>jo,randUniform:()=>I2,repeatedTry:()=>$2,rightPad:()=>ms,shuffle:()=>yb,shuffleCombo:()=>C2,sizeFromShape:()=>It,sizeToSquarishShape:()=>k2,squeezeShape:()=>nh,sum:()=>w2,swap:()=>yu,tanh:()=>N2,toNestedArray:()=>us,toTypedArray:()=>Tc});var gh=xu(Ob());var oi=gh.default||gh;function Np(r){return oi.fromString(r,!0,16)}var Lb=Np("c3a5c85c97cb3127"),ri=Np("b492b66fbe98f273"),Ae=Np("9ae16a3b2f90404f");function hh(r){return r.xor(r.shru(47))}function Mb(r,t,e){let o=r.slice(t,t+e);return oi.fromBytes(Array.from(o),!0,!0)}function Gt(r,t){return Mb(r,t,8)}function Pb(r,t){return Mb(r,t,4)}function me(r,t){return t===0?r:r.shru(t).or(r.shl(64-t))}function zn(r,t,e=Np("9ddfea08eb382d69")){let o=r.xor(t).mul(e);o=o.xor(o.shru(47));let n=t.xor(o).mul(e);return n=n.xor(n.shru(47)),n=n.mul(e),n}function Q2(r,t,e,o,n,s){n=n.add(r),s=me(s.add(n).add(o),21);let a=n;return n=n.add(t),n=n.add(e),s=s.add(me(n,44)),[n.add(o),s.add(a)]}function vu(r,t,e,o){return Q2(Gt(r,t),Gt(r,t+8),Gt(r,t+16),Gt(r,t+24),e,o)}function J2(r,t=r.length){if(t>=8){let e=Ae.add(t*2),o=Gt(r,0).add(Ae),n=Gt(r,t-8),s=me(n,37).mul(e).add(o),a=me(o,25).add(n).mul(e);return zn(s,a,e)}if(t>=4){let e=Ae.add(t*2),o=Pb(r,0);return zn(o.shl(3).add(t),Pb(r,t-4),e)}if(t>0){let e=r[0],o=r[t>>1],n=r[t-1],s=e+(o<<8),a=t+(n<<2);return hh(Ae.mul(s).xor(Lb.mul(a))).mul(Ae)}return Ae}function tA(r,t=r.length){let e=Ae.add(t*2),o=Gt(r,0).mul(ri),n=Gt(r,8),s=Gt(r,t-8).mul(e),a=Gt(r,t-16).mul(Ae);return zn(me(o.add(n),43).add(me(s,30)).add(a),o.add(me(n.add(Ae),18)).add(s),e)}function eA(r,t=r.length){let e=Ae.add(t*2),o=Gt(r,0).mul(Ae),n=Gt(r,8),s=Gt(r,t-8).mul(e),a=Gt(r,t-16).mul(Ae),i=me(o.add(n),43).add(me(s,30)).add(a),c=zn(i,o.add(me(n.add(Ae),18)).add(s),e),p=Gt(r,16).mul(e),l=Gt(r,24),u=i.add(Gt(r,t-32)).mul(e),m=c.add(Gt(r,t-24)).mul(e);return zn(me(p.add(l),43).add(me(u,30)).add(m),p.add(me(l.add(o),18)).add(u),e)}function rA(r,t=r.length){let e=oi.fromNumber(81,!0);if(t<=32)return t<=16?J2(r,t):tA(r,t);if(t<=64)return eA(r,t);let o=e,n=e.mul(ri).add(113),s=hh(n.mul(Ae).add(113)).mul(Ae),a=[oi.UZERO,oi.UZERO],i=[oi.UZERO,oi.UZERO];o=o.mul(Ae).add(Gt(r,0));let c=0,p=(t-1>>6)*64,l=p+(t-1&63)-63;do o=me(o.add(n).add(a[0]).add(Gt(r,c+8)),37).mul(ri),n=me(n.add(a[1]).add(Gt(r,c+48)),42).mul(ri),o=o.xor(i[1]),n=n.add(a[0]).add(Gt(r,c+40)),s=me(s.add(i[0]),33).mul(ri),a=vu(r,c,a[1].mul(ri),o.add(i[0])),i=vu(r,c+32,s.add(i[1]),n.add(Gt(r,c+16))),[s,o]=[o,s],c+=64;while(c!==p);let u=ri.add(s.and(255).shl(1));return c=l,i[0]=i[0].add(t-1&63),a[0]=a[0].add(i[0]),i[0]=i[0].add(a[0]),o=me(o.add(n).add(a[0]).add(Gt(r,c+8)),37).mul(u),n=me(n.add(a[1]).add(Gt(r,c+48)),42).mul(u),o=o.xor(i[1].mul(9)),n=n.add(a[0].mul(9).add(Gt(r,c+40))),s=me(s.add(i[0]),33).mul(u),a=vu(r,c,a[1].mul(u),o.add(i[0])),i=vu(r,c+32,s.add(i[1]),n.add(Gt(r,c+16))),[s,o]=[o,s],zn(zn(a[0],i[0],u).add(hh(n).mul(Lb)).add(s),zn(a[1],i[1],u).add(o),u)}function oA(r,t){return t==="string"?Wn(r):Tc([r],t)}function nA(r,t){return r instanceof Float32Array&&t==="float32"||r instanceof Int32Array&&t==="int32"||r instanceof Uint8Array&&t==="bool"}function Tc(r,t){if(t==="string")throw new Error("Cannot convert a string[] to a TypedArray");if(Array.isArray(r)&&(r=Er(r)),F().getBool("DEBUG")&&ih(r,t),nA(r,t))return r;if(t==null||t==="float32"||t==="complex64")return new Float32Array(r);if(t==="int32")return new Int32Array(r);if(t==="bool"){let e=new Uint8Array(r.length);for(let o=0;o<e.length;++o)Math.round(r[o])!==0&&(e[o]=1);return e}else throw new Error(`Unknown data type ${t}`)}function ni(){return F().platform.now()}function sA(r,t){return F().platform.fetch(r,t)}function Wn(r,t="utf-8"){return t=t||"utf-8",F().platform.encode(r,t)}function wc(r,t="utf-8"){return t=t||"utf-8",F().platform.decode(r,t)}var Nu=class{constructor(t,e){this.backendTimer=t,this.logger=e,e==null&&(this.logger=new xh)}profileKernel(t,e,o){let n,s=()=>{n=o()},a,i=ni();if(this.backendTimer.timerAvailable())a=this.backendTimer.time(s);else{s();for(let p of n)p.dataSync();a=Promise.resolve({kernelMs:ni()-i})}if(F().getBool("CHECK_COMPUTATION_FOR_ERRORS"))for(let p=0;p<n.length;p++){let l=n[p];l.data().then(u=>{aA(u,l.dtype,t)})}return{kernelName:t,outputs:n,inputs:e,timeMs:a.then(p=>p.kernelMs),extraInfo:a.then(p=>p.getExtraProfileInfo!=null?p.getExtraProfileInfo():"")}}logKernelProfile(t){let{kernelName:e,outputs:o,timeMs:n,inputs:s,extraInfo:a}=t;o.forEach(i=>{Promise.all([i.data(),n,a]).then(c=>{this.logger.logKernelProfile(e,i,c[0],c[1],s,c[2])})})}};function aA(r,t,e){if(t!=="float32")return!1;for(let o=0;o<r.length;o++){let n=r[o];if(isNaN(n)||!isFinite(n))return console.warn(`Found ${n} in the result of '${e}'`),!0}return!1}var xh=class{logKernelProfile(t,e,o,n,s,a){let i=typeof n=="number"?ms(`${n}ms`,9):n.error,c=ms(t,25),p=e.rank,l=e.size,u=ms(e.shape.toString(),14),m="";for(let f in s){let d=s[f];if(d!=null){let h=d.shape||e.shape,g=h.length;m+=`${f}: ${g}D ${g>0?h:""} `}}console.log(`%c${c}	%c${i}	%c${p}D ${u}	%c${l}	%c${m}	%c${a}`,"font-weight:bold","color:red","color:blue","color: orange","color: green","color: steelblue")}};function Bb(r,t,e){let o={},n={};for(let c=0;c<t.length;c++)o[t[c].id]=!0;for(let c=0;c<r.length;c++){let p=r[c],l=p.inputs;for(let u in l){let m=l[u],f=!1;for(let d=0;d<t.length;d++)if(o[m.id]){p.outputs.forEach(h=>o[h.id]=!0),f=!0,n[p.id]=!0;break}if(f)break}}let s={};s[e.id]=!0;let a={};for(let c=r.length-1;c>=0;c--){let p=r[c],l=p.inputs;for(let u=0;u<p.outputs.length;u++)if(s[p.outputs[u].id]){for(let m in l)s[l[m].id]=!0,a[p.id]=!0;break}}let i=[];for(let c=0;c<r.length;c++){let p=r[c];if(n[p.id]&&a[p.id]){let l={};for(let m in p.inputs){let f=p.inputs[m];o[f.id]&&(l[m]=f)}let u=Object.assign({},p);u.inputs=l,u.outputs=p.outputs,i.push(u)}}return i}function Vb(r,t,e,o){for(let n=t.length-1;n>=0;n--){let s=t[n],a=[];if(s.outputs.forEach(c=>{let p=r[c.id];p!=null?a.push(p):a.push(null)}),s.gradient==null)throw new Error(`Cannot compute gradient: gradient function not found for ${s.kernelName}.`);let i=s.gradient(a);for(let c in s.inputs){if(!(c in i))throw new Error(`Cannot backprop through input ${c}. Available gradients found: ${Object.keys(i)}.`);let p=e(()=>i[c]());if(p.dtype!=="float32")throw new Error(`Error in gradient for op ${s.kernelName}. The gradient of input ${c} must have 'float32' dtype, but has '${p.dtype}'`);let l=s.inputs[c];if(!ze(p.shape,l.shape))throw new Error(`Error in gradient for op ${s.kernelName}. The gradient of input '${c}' has shape '${p.shape}', which does not match the shape of the input '${l.shape}'`);if(r[l.id]==null)r[l.id]=p;else{let u=r[l.id];r[l.id]=o(u,p),u.dispose()}}}}var Gb=20,kp=3,yh=7;function Ub(r,t,e,o){let n=jr(t),s=iA(r,t,e,n),a=t.length,i=ku(r,t,e,n,s),c=["Tensor"];return o&&(c.push(`  dtype: ${e}`),c.push(`  rank: ${a}`),c.push(`  shape: [${t}]`),c.push("  values:")),c.push(i.map(p=>"    "+p).join(`
`)),c.join(`
`)}function iA(r,t,e,o){let n=It(t),s=o[o.length-1],a=new Array(s).fill(0),i=t.length,c=e==="complex64"?$p(r):r;if(i>1)for(let p=0;p<n/s;p++){let l=p*s;for(let u=0;u<s;u++)a[u]=Math.max(a[u],Ep(c[l+u],0,e).length)}return a}function Ep(r,t,e){let o;return Array.isArray(r)?o=`${parseFloat(r[0].toFixed(yh))} + ${parseFloat(r[1].toFixed(yh))}j`:$r(r)?o=`'${r}'`:e==="bool"?o=zb(r):o=parseFloat(r.toFixed(yh)).toString(),ms(o,t)}function zb(r){return r===0?"false":"true"}function ku(r,t,e,o,n,s=!0){let a=e==="complex64"?2:1,i=t[0],c=t.length;if(c===0){if(e==="complex64"){let h=$p(r);return[Ep(h[0],0,e)]}return e==="bool"?[zb(r[0])]:[r[0].toString()]}if(c===1){if(i>Gb){let g=kp*a,x=Array.from(r.slice(0,g)),b=Array.from(r.slice((i-kp)*a,i*a));return e==="complex64"&&(x=$p(x),b=$p(b)),["["+x.map((w,I)=>Ep(w,n[I],e)).join(", ")+", ..., "+b.map((w,I)=>Ep(w,n[i-kp+I],e)).join(", ")+"]"]}return["["+(e==="complex64"?$p(r):Array.from(r)).map((g,x)=>Ep(g,n[x],e)).join(", ")+"]"]}let p=t.slice(1),l=o.slice(1),u=o[0]*a,m=[];if(i>Gb){for(let h=0;h<kp;h++){let g=h*u,x=g+u;m.push(...ku(r.slice(g,x),p,e,l,n,!1))}m.push("...");for(let h=i-kp;h<i;h++){let g=h*u,x=g+u;m.push(...ku(r.slice(g,x),p,e,l,n,h===i-1))}}else for(let h=0;h<i;h++){let g=h*u,x=g+u;m.push(...ku(r.slice(g,x),p,e,l,n,h===i-1))}let f=c===2?",":"";m[0]="["+m[0]+f;for(let h=1;h<m.length-1;h++)m[h]=" "+m[h]+f;let d=`,
`;for(let h=2;h<c;h++)d+=`
`;return m[m.length-1]=" "+m[m.length-1]+"]"+(s?"":d),m}function $p(r){let t=[];for(let e=0;e<r.length;e+=2)t.push([r[e],r[e+1]]);return t}var Rt=class{constructor(t,e,o){if(this.dtype=e,this.shape=t.slice(),this.size=It(t),o!=null){let n=o.length;E(n===this.size,()=>`Length of values '${n}' does not match the size inferred by the shape '${this.size}'.`)}if(e==="complex64")throw new Error("complex64 dtype TensorBuffers are not supported. Please create a TensorBuffer for the real and imaginary parts separately and call tf.complex(real, imag).");this.values=o||ah(e,this.size),this.strides=jr(t)}set(t,...e){e.length===0&&(e=[0]),E(e.length===this.rank,()=>`The number of provided coordinates (${e.length}) must match the rank (${this.rank})`);let o=this.locToIndex(e);this.values[o]=t}get(...t){t.length===0&&(t=[0]);let e=0;for(let n of t){if(n<0||n>=this.shape[e]){let s=`Requested out of range element at ${t}.   Buffer shape=${this.shape}`;throw new Error(s)}e++}let o=t[t.length-1];for(let n=0;n<t.length-1;++n)o+=this.strides[n]*t[n];return this.values[o]}locToIndex(t){if(this.rank===0)return 0;if(this.rank===1)return t[0];let e=t[t.length-1];for(let o=0;o<t.length-1;++o)e+=this.strides[o]*t[o];return e}indexToLoc(t){if(this.rank===0)return[];if(this.rank===1)return[t];let e=new Array(this.shape.length);for(let o=0;o<e.length-1;++o)e[o]=Math.floor(t/this.strides[o]),t-=e[o]*this.strides[o];return e[e.length-1]=t,e}get rank(){return this.shape.length}toTensor(){return Rr().makeTensor(this.values,this.shape,this.dtype)}},Rr=null,Ic=null,cA=null;function Wb(r){Rr=r}function Hb(r){Ic=r}function qb(r){cA=r}var Et=class{constructor(t,e,o,n){this.kept=!1,this.isDisposedInternal=!1,this.shape=t.slice(),this.dtype=e||"float32",this.size=It(t),this.strides=jr(t),this.dataId=o,this.id=n,this.rankType=this.rank<5?this.rank.toString():"higher"}get rank(){return this.shape.length}async buffer(){let t=await this.data();return Ic.buffer(this.shape,this.dtype,t)}bufferSync(){return Ic.buffer(this.shape,this.dtype,this.dataSync())}async array(){let t=await this.data();return us(this.shape,t,this.dtype==="complex64")}arraySync(){return us(this.shape,this.dataSync(),this.dtype==="complex64")}async data(){this.throwIfDisposed();let t=Rr().read(this.dataId);if(this.dtype==="string"){let e=await t;try{return e.map(o=>wc(o))}catch{throw new Error("Failed to decode the string bytes into utf-8. To get the original bytes, call tensor.bytes().")}}return t}dataToGPU(t){return this.throwIfDisposed(),Rr().readToGPU(this.dataId,t)}dataSync(){this.throwIfDisposed();let t=Rr().readSync(this.dataId);if(this.dtype==="string")try{return t.map(e=>wc(e))}catch{throw new Error("Failed to decode the string bytes into utf-8. To get the original bytes, call tensor.bytes().")}return t}async bytes(){this.throwIfDisposed();let t=await Rr().read(this.dataId);return this.dtype==="string"?t:new Uint8Array(t.buffer)}dispose(){this.isDisposed||(Rr().disposeTensor(this),this.isDisposedInternal=!0)}get isDisposed(){return this.isDisposedInternal}throwIfDisposed(){if(this.isDisposed)throw new Error("Tensor is disposed.")}print(t=!1){return Ic.print(this,t)}clone(){return this.throwIfDisposed(),Ic.clone(this)}toString(t=!1){let e=this.dataSync();return Ub(e,this.shape,this.dtype,t)}cast(t){return this.throwIfDisposed(),Ic.cast(this,t)}variable(t=!0,e,o){return this.throwIfDisposed(),Rr().makeVariable(this,t,e,o)}};Object.defineProperty(Et,Symbol.hasInstance,{value:r=>!!r&&r.data!=null&&r.dataSync!=null&&r.throwIfDisposed!=null});function A(){return fp("Tensor",()=>Et)}A();var Yr=class extends Et{constructor(t,e,o,n){super(t.shape,t.dtype,t.dataId,n),this.trainable=e,this.name=o}assign(t){if(t.dtype!==this.dtype)throw new Error(`dtype of the new value (${t.dtype}) and previous value (${this.dtype}) must match`);if(!ze(t.shape,this.shape))throw new Error(`shape of the new value (${t.shape}) and previous value (${this.shape}) must match`);Rr().disposeTensor(this),this.dataId=t.dataId,Rr().incRef(this,null)}dispose(){Rr().disposeVariable(this),this.isDisposedInternal=!0}};Object.defineProperty(Yr,Symbol.hasInstance,{value:r=>r instanceof Et&&r.assign!=null&&r.assign instanceof Function});var Sh={};kt(Sh,{assertTypesMatch:()=>Ih,getTensorsInContainer:()=>Ap,isTensorInList:()=>lA,makeTypesMatch:()=>xt});var Eu;(function(r){r.R0="R0",r.R1="R1",r.R2="R2",r.R3="R3",r.R4="R4",r.R5="R5",r.R6="R6"})(Eu||(Eu={}));var bh;(function(r){r.float32="float32",r.int32="int32",r.bool="int32",r.complex64="complex64"})(bh||(bh={}));var Ch;(function(r){r.float32="float32",r.int32="int32",r.bool="bool",r.complex64="complex64"})(Ch||(Ch={}));var Th;(function(r){r.float32="float32",r.int32="float32",r.bool="float32",r.complex64="complex64"})(Th||(Th={}));var wh;(function(r){r.float32="complex64",r.int32="complex64",r.bool="complex64",r.complex64="complex64"})(wh||(wh={}));var pA={float32:Th,int32:bh,bool:Ch,complex64:wh};function Qt(r,t){if(r==="string"||t==="string"){if(r==="string"&&t==="string")return"string";throw new Error(`Can not upcast ${r} with ${t}`)}return pA[r][t]}function Hn(r){return Qt(r,"int32")}function xt(r,t){if(r.dtype===t.dtype)return[r,t];let e=Qt(r.dtype,t.dtype);return[r.cast(e),t.cast(e)]}function Ih(r,t){E(r.dtype===t.dtype,()=>`The dtypes of the first(${r.dtype}) and second(${t.dtype}) input must match`)}function lA(r,t){return t.some(e=>e.id===r.id)}function Ap(r){let t=[];return Kb(r,t,new Set),t}function Kb(r,t,e){if(r==null)return;if(r instanceof Et){t.push(r);return}if(!uA(r))return;let o=r;for(let n in o){let s=o[n];e.has(s)||(e.add(s),Kb(s,t,e))}}function uA(r){return Array.isArray(r)||typeof r=="object"}function vh(r){return r.kernelName!=null}var $u=class{constructor(){this.registeredVariables={},this.nextTapeNodeId=0,this.numBytes=0,this.numTensors=0,this.numStringTensors=0,this.numDataBuffers=0,this.gradientDepth=0,this.kernelDepth=0,this.scopeStack=[],this.numDataMovesStack=[],this.nextScopeId=0,this.tensorInfo=new WeakMap,this.profiling=!1,this.activeProfile={newBytes:0,newTensors:0,peakBytes:0,kernels:[],result:null,get kernelNames(){return Array.from(new Set(this.kernels.map(t=>t.name)))}}}dispose(){for(let t in this.registeredVariables)this.registeredVariables[t].dispose()}},Rp=class r{constructor(t){this.ENV=t,this.registry={},this.registryFactory={},this.pendingBackendInitId=0,this.state=new $u}async ready(){if(this.pendingBackendInit!=null)return this.pendingBackendInit.then(()=>{});if(this.backendInstance!=null)return;let t=this.getSortedBackends();for(let e=0;e<t.length;e++){let o=t[e];if(await this.initializeBackend(o).success){await this.setBackend(o);return}}throw new Error("Could not initialize any backends, all backend initializations failed.")}get backend(){if(this.pendingBackendInit!=null)throw new Error(`Backend '${this.backendName}' has not yet been initialized. Make sure to await tf.ready() or await tf.setBackend() before calling other methods`);if(this.backendInstance==null){let{name:t,asyncInit:e}=this.initializeBackendsAndReturnBest();if(e)throw new Error(`The highest priority backend '${t}' has not yet been initialized. Make sure to await tf.ready() or await tf.setBackend() before calling other methods`);this.setBackend(t)}return this.backendInstance}backendNames(){return Object.keys(this.registryFactory)}findBackend(t){if(!(t in this.registry))if(t in this.registryFactory){let{asyncInit:e}=this.initializeBackend(t);if(e)return null}else return null;return this.registry[t]}findBackendFactory(t){return t in this.registryFactory?this.registryFactory[t].factory:null}registerBackend(t,e,o=1){return t in this.registryFactory?(Xr(`${t} backend was already registered. Reusing existing backend factory.`),!1):(this.registryFactory[t]={factory:e,priority:o},!0)}async setBackend(t){if(this.registryFactory[t]==null)throw new Error(`Backend name '${t}' not found in registry`);if(this.backendName=t,this.registry[t]==null){this.backendInstance=null;let{success:e,asyncInit:o}=this.initializeBackend(t);if(!(o?await e:e))return!1}return this.backendInstance=this.registry[t],this.setupRegisteredKernels(),this.profiler=new Nu(this.backendInstance),!0}setupRegisteredKernels(){vp(this.backendName).forEach(e=>{e.setupFunc!=null&&e.setupFunc(this.backendInstance)})}disposeRegisteredKernels(t){vp(t).forEach(o=>{o.disposeFunc!=null&&o.disposeFunc(this.registry[t])})}initializeBackend(t){let e=this.registryFactory[t];if(e==null)throw new Error(`Cannot initialize backend ${t}, no registration found.`);try{let o=e.factory();if(o&&!(o instanceof qr)&&typeof o.then=="function"){let n=++this.pendingBackendInitId,s=o.then(a=>n<this.pendingBackendInitId?!1:(this.registry[t]=a,this.pendingBackendInit=null,!0)).catch(a=>(n<this.pendingBackendInitId||(this.pendingBackendInit=null,Xr(`Initialization of backend ${t} failed`),Xr(a.stack||a.message)),!1));return this.pendingBackendInit=s,{success:s,asyncInit:!0}}else return this.registry[t]=o,{success:!0,asyncInit:!1}}catch(o){return Xr(`Initialization of backend ${t} failed`),Xr(o.stack||o.message),{success:!1,asyncInit:!1}}}removeBackend(t){if(!(t in this.registryFactory))throw new Error(`${t} backend not found in registry`);this.backendName===t&&this.pendingBackendInit!=null&&this.pendingBackendInitId++,t in this.registry&&(this.disposeRegisteredKernels(t),this.registry[t].dispose(),delete this.registry[t]),delete this.registryFactory[t],this.backendName===t&&(this.pendingBackendInit=null,this.backendName=null,this.backendInstance=null)}getSortedBackends(){if(Object.keys(this.registryFactory).length===0)throw new Error("No backend found in registry.");return Object.keys(this.registryFactory).sort((t,e)=>this.registryFactory[e].priority-this.registryFactory[t].priority)}initializeBackendsAndReturnBest(){let t=this.getSortedBackends();for(let e=0;e<t.length;e++){let o=t[e],{success:n,asyncInit:s}=this.initializeBackend(o);if(s||n)return{name:o,asyncInit:s}}throw new Error("Could not initialize any backends, all backend initializations failed.")}moveData(t,e){let o=this.state.tensorInfo.get(e),n=o.backend,s=this.readSync(e),a=n.refCount(e);n.disposeData(e,!0),o.backend=t,t.move(e,s,o.shape,o.dtype,a),this.shouldCheckForMemLeaks()&&this.state.numDataMovesStack[this.state.numDataMovesStack.length-1]++}tidy(t,e){let o=null;if(e==null){if(typeof t!="function")throw new Error("Please provide a function to tidy()");e=t}else{if(typeof t!="string"&&!(t instanceof String))throw new Error("When calling with two arguments, the first argument to tidy() must be a string");if(typeof e!="function")throw new Error("When calling with two arguments, the 2nd argument to tidy() must be a function");o=t}let n;return this.scopedRun(()=>this.startScope(o),()=>this.endScope(n),()=>(n=e(),n instanceof Promise&&console.error("Cannot return a Promise inside of tidy."),n))}scopedRun(t,e,o){t();try{let n=o();return e(),n}catch(n){throw e(),n}}nextTensorId(){return r.nextTensorId++}nextVariableId(){return r.nextVariableId++}clone(t){let e=N.runKernel(To,{x:t}),o={x:t},n=a=>({x:()=>{let i="float32",c={x:a},p={dtype:i};return N.runKernel(Co,c,p)}}),s=[];return this.addTapeNode(this.state.activeScope.name,o,[e],n,s,{}),e}runKernel(t,e,o){if(this.backendName==null&&this.backend,!(xc(t,this.backendName)!=null))throw new Error(`Kernel '${t}' not registered for backend '${this.backendName}'`);return this.runKernelFunc({kernelName:t,inputs:e,attrs:o})}shouldCheckForMemLeaks(){return this.ENV.getBool("IS_TEST")}checkKernelForMemLeak(t,e,o){let n=this.backend.numDataIds(),s=0;o.forEach(c=>{s+=c.dtype==="complex64"?3:1});let a=this.state.numDataMovesStack[this.state.numDataMovesStack.length-1],i=n-e-s-a;if(i>0)throw new Error(`Backend '${this.backendName}' has an internal memory leak (${i} data ids) after running '${t}'`)}runKernelFunc(t){let e,o=[],n=this.isTapeOn(),s=this.state.numBytes,a=this.state.numTensors;this.shouldCheckForMemLeaks()&&this.state.numDataMovesStack.push(0);let i;this.backendName==null&&this.backend;let c,p=vh(t)?t.kernelName:this.state.activeScope!=null?this.state.activeScope.name:"";if(vh(t)){let{kernelName:d,inputs:h,attrs:g}=t;this.backendName==null&&this.backend;let x=xc(d,this.backendName);E(x!=null,()=>`Cannot find registered kernel '${d}' for backend '${this.backendName}'`),i=()=>{let b=this.backend.numDataIds();c=x.kernelFunc({inputs:h,attrs:g,backend:this.backend});let w=Array.isArray(c)?c:[c];this.shouldCheckForMemLeaks()&&this.checkKernelForMemLeak(d,b,w);let I=w.map(k=>k.rank!=null?k:this.makeTensorFromTensorInfo(k));if(n){let k=this.getTensorsForGradient(d,h,I);o=this.saveTensorsForBackwardMode(k)}return I}}else{let{forwardFunc:d}=t,h=g=>{n&&(o=g.map(x=>this.keep(this.clone(x))))};i=()=>{let g=this.backend.numDataIds();c=this.tidy(()=>d(this.backend,h));let x=Array.isArray(c)?c:[c];return this.shouldCheckForMemLeaks()&&this.checkKernelForMemLeak(p,g,x),x}}let{inputs:l,attrs:u}=t,m=vh(t)?null:t.backwardsFunc,f;return this.scopedRun(()=>this.state.kernelDepth++,()=>this.state.kernelDepth--,()=>{!this.ENV.getBool("DEBUG")&&!this.state.profiling?e=i():(f=this.profiler.profileKernel(p,l,()=>i()),this.ENV.getBool("DEBUG")&&this.profiler.logKernelProfile(f),e=f.outputs)}),n&&this.addTapeNode(p,l,e,m,o,u),this.state.profiling&&this.state.activeProfile.kernels.push({name:p,bytesAdded:this.state.numBytes-s,totalBytesSnapshot:this.state.numBytes,tensorsAdded:this.state.numTensors-a,totalTensorsSnapshot:this.state.numTensors,inputShapes:Object.keys(l).map(d=>l[d]!=null?l[d].shape:null),outputShapes:e.map(d=>d.shape),kernelTimeMs:f.timeMs,extraInfo:f.extraInfo}),Array.isArray(c)?e:e[0]}saveTensorsForBackwardMode(t){return t.map(o=>this.keep(this.clone(o)))}getTensorsForGradient(t,e,o){let n=Iu(t);if(n!=null){let s=n.inputsToSave||[],a=n.outputsToSave||[],i;n.saveAllInputs?(E(Array.isArray(e),()=>"saveAllInputs is true, expected inputs to be an array."),i=Object.keys(e).map(p=>e[p])):i=s.map(p=>e[p]);let c=o.filter((p,l)=>a[l]);return i.concat(c)}return[]}makeTensor(t,e,o,n){if(t==null)throw new Error("Values passed to engine.makeTensor() are null");o=o||"float32",n=n||this.backend;let s=t;o==="string"&&$r(t[0])&&(s=t.map(c=>Wn(c)));let a=n.write(s,e,o),i=new Et(e,o,a,this.nextTensorId());if(this.trackTensor(i,n),o==="string"){let c=this.state.tensorInfo.get(a),p=ph(s);this.state.numBytes+=p-c.bytes,c.bytes=p}return i}makeTensorFromDataId(t,e,o,n){o=o||"float32";let s={dataId:t,shape:e,dtype:o};return this.makeTensorFromTensorInfo(s,n)}makeTensorFromTensorInfo(t,e){let{dataId:o,shape:n,dtype:s}=t,a=new Et(n,s,o,this.nextTensorId());return this.trackTensor(a,e),a}makeVariable(t,e=!0,o,n){o=o||this.nextVariableId().toString(),n!=null&&n!==t.dtype&&(t=t.cast(n));let s=new Yr(t,e,o,this.nextTensorId());if(this.state.registeredVariables[s.name]!=null)throw new Error(`Variable with name ${s.name} was already registered`);return this.state.registeredVariables[s.name]=s,this.incRef(s,this.backend),s}trackTensor(t,e){this.state.numTensors++,t.dtype==="string"&&this.state.numStringTensors++;let o=0;t.dtype!=="complex64"&&t.dtype!=="string"&&(o=t.size*bu(t.dtype)),this.state.numBytes+=o,this.state.tensorInfo.has(t.dataId)||(this.state.numDataBuffers++,this.state.tensorInfo.set(t.dataId,{backend:e||this.backend,dtype:t.dtype,shape:t.shape,bytes:o})),t instanceof Yr||this.track(t)}incRef(t,e){this.trackTensor(t,e),this.backend.incRef(t.dataId)}removeDataId(t,e){this.state.tensorInfo.has(t)&&this.state.tensorInfo.get(t).backend===e&&(this.state.tensorInfo.delete(t),this.state.numDataBuffers--)}disposeTensor(t){if(!this.state.tensorInfo.has(t.dataId))return;let e=this.state.tensorInfo.get(t.dataId);if(this.state.numTensors--,t.dtype==="string"&&(this.state.numStringTensors--,this.state.numBytes-=e.bytes),t.dtype!=="complex64"&&t.dtype!=="string"){let o=t.size*bu(t.dtype);this.state.numBytes-=o}e.backend.disposeData(t.dataId)&&this.removeDataId(t.dataId,e.backend)}disposeVariables(){for(let t in this.state.registeredVariables){let e=this.state.registeredVariables[t];this.disposeVariable(e)}}disposeVariable(t){this.disposeTensor(t),this.state.registeredVariables[t.name]!=null&&delete this.state.registeredVariables[t.name]}memory(){let t=this.backend.memory();return t.numTensors=this.state.numTensors,t.numDataBuffers=this.state.numDataBuffers,t.numBytes=this.state.numBytes,this.state.numStringTensors>0&&(t.unreliable=!0,t.reasons==null&&(t.reasons=[]),t.reasons.push("Memory usage by string tensors is approximate (2 bytes per character)")),t}async profile(t){this.state.profiling=!0;let e=this.state.numBytes,o=this.state.numTensors;this.state.activeProfile.kernels=[],this.state.activeProfile.result=await t(),this.state.profiling=!1,this.state.activeProfile.peakBytes=Math.max(...this.state.activeProfile.kernels.map(n=>n.totalBytesSnapshot)),this.state.activeProfile.newBytes=this.state.numBytes-e,this.state.activeProfile.newTensors=this.state.numTensors-o;for(let n of this.state.activeProfile.kernels)n.kernelTimeMs=await n.kernelTimeMs,n.extraInfo=await n.extraInfo;return this.state.activeProfile}isTapeOn(){return this.state.gradientDepth>0&&this.state.kernelDepth===0}addTapeNode(t,e,o,n,s,a){let i={id:this.state.nextTapeNodeId++,kernelName:t,inputs:e,outputs:o,saved:s},c=Iu(t);c!=null&&(n=c.gradFunc),n!=null&&(i.gradient=p=>(p=p.map((l,u)=>{if(l==null){let m=o[u],f=sc(m.size,m.dtype);return this.makeTensor(f,m.shape,m.dtype)}return l}),n(p.length>1?p:p[0],s,a))),this.state.activeTape.push(i)}keep(t){return t.kept=!0,t}startTape(){this.state.gradientDepth===0&&(this.state.activeTape=[]),this.state.gradientDepth++}endTape(){this.state.gradientDepth--}startScope(t){let e={track:[],name:"unnamed scope",id:this.state.nextScopeId++};t&&(e.name=t),this.state.scopeStack.push(e),this.state.activeScope=e}endScope(t){let e=Ap(t),o=new Set(e.map(s=>s.id));for(let s=0;s<this.state.activeScope.track.length;s++){let a=this.state.activeScope.track[s];!a.kept&&!o.has(a.id)&&a.dispose()}let n=this.state.scopeStack.pop();this.state.activeScope=this.state.scopeStack.length===0?null:this.state.scopeStack[this.state.scopeStack.length-1],e.forEach(s=>{!s.kept&&s.scopeId===n.id&&this.track(s)})}gradients(t,e,o,n=!1){if(E(e.length>0,()=>"gradients() received an empty list of xs."),o!=null&&o.dtype!=="float32")throw new Error(`dy must have 'float32' dtype, but has '${o.dtype}'`);let s=this.scopedRun(()=>this.startTape(),()=>this.endTape(),()=>this.tidy("forward",t));E(s instanceof Et,()=>"The result y returned by f() must be a tensor.");let a=Bb(this.state.activeTape,e,s);if(!n&&a.length===0&&e.length>0)throw new Error("Cannot compute gradient of y=f(x) with respect to x. Make sure that the f you passed encloses all operations that lead from x to y.");return this.tidy("backward",()=>{let i={};i[s.id]=o??mA(s.shape),Vb(i,a,p=>this.tidy(p),fA);let c=e.map(p=>i[p.id]);return this.state.gradientDepth===0&&(this.state.activeTape.forEach(p=>{for(let l of p.saved)l.dispose()}),this.state.activeTape=null),{value:s,grads:c}})}customGrad(t){return E(Kr(t),()=>"The f passed in customGrad(f) must be a function."),(...e)=>{E(e.every(i=>i instanceof Et),()=>"The args passed in customGrad(f)(x1, x2,...) must all be tensors");let o,n={};e.forEach((i,c)=>{n[c]=i});let s=(i,c)=>(o=t(...e,c),E(o.value instanceof Et,()=>"The function f passed in customGrad(f) must return an object where `obj.value` is a tensor"),E(Kr(o.gradFunc),()=>"The function f passed in customGrad(f) must return an object where `obj.gradFunc` is a function."),o.value),a=(i,c)=>{let p=o.gradFunc(i,c),l=Array.isArray(p)?p:[p];E(l.length===e.length,()=>"The function f passed in customGrad(f) must return an object where `obj.gradFunc` is a function that returns the same number of tensors as inputs passed to f(...)."),E(l.every(m=>m instanceof Et),()=>"The function f passed in customGrad(f) must return an object where `obj.gradFunc` is a function that returns a list of only tensors.");let u={};return l.forEach((m,f)=>{u[f]=()=>m}),u};return this.runKernelFunc({forwardFunc:s,backwardsFunc:a,inputs:n})}}readSync(t){return this.state.tensorInfo.get(t).backend.readSync(t)}read(t){return this.state.tensorInfo.get(t).backend.read(t)}readToGPU(t,e){return this.state.tensorInfo.get(t).backend.readToGPU(t,e)}async time(t){let e=ni(),o=await this.backend.time(t);return o.wallMs=ni()-e,o}track(t){return this.state.activeScope!=null&&(t.scopeId=this.state.activeScope.id,this.state.activeScope.track.push(t)),t}get registeredVariables(){return this.state.registeredVariables}reset(){this.pendingBackendInitId++,this.state.dispose(),this.ENV.reset(),this.state=new $u;for(let t in this.registry)this.disposeRegisteredKernels(t),this.registry[t].dispose(),delete this.registry[t];this.backendName=null,this.backendInstance=null,this.pendingBackendInit=null}};Rp.nextTensorId=0;Rp.nextVariableId=0;function mA(r){let t=lp(It(r),"float32");return N.makeTensor(t,r,"float32")}function Nh(){let r=uh();if(r._tfengine==null){let t=new ac(r);r._tfengine=new Rp(t)}return Ib(r._tfengine.ENV),Wb(()=>r._tfengine),r._tfengine}var N=Nh();function fA(r,t){let e={a:r,b:t};return N.runKernel("Add",e)}var So={};kt(So,{isBrowser:()=>Eh,isMobile:()=>gA,mockIsMobile:()=>hA});function dA(){return typeof navigator<"u"&&navigator!=null}var kh;function hA(r){kh=r}function gA(r){if(kh!==void 0)return kh;if(r||dA()){if(r||(r=navigator),r.product==="ReactNative")return!0;let t=r.userAgent||r.vendor||(typeof window<"u"?window.opera:"");if(!t){let e=r;return e.userAgentData&&e.userAgentData.mobile}return/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(t)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(t.substr(0,4))}return!1}function Eh(){return typeof window<"u"&&window.document!=null||typeof WorkerGlobalScope<"u"}var qe=F();qe.registerFlag("DEBUG",()=>!1,r=>{r&&console.warn("Debugging mode is ON. The output of every math call will be downloaded to CPU and checked for NaNs. This significantly impacts performance.")});qe.registerFlag("IS_BROWSER",()=>Eh());qe.registerFlag("IS_NODE",()=>typeof process<"u"&&typeof process.versions<"u"&&typeof process.versions.node<"u");qe.registerFlag("IS_CHROME",()=>typeof navigator<"u"&&navigator!=null&&navigator.userAgent!=null&&/Chrome/.test(navigator.userAgent)&&/Google Inc/.test(navigator.vendor));qe.registerFlag("PROD",()=>!1);qe.registerFlag("TENSORLIKE_CHECK_SHAPE_CONSISTENCY",()=>qe.getBool("DEBUG"));qe.registerFlag("DEPRECATION_WARNINGS_ENABLED",()=>!0);qe.registerFlag("IS_TEST",()=>!1);qe.registerFlag("CHECK_COMPUTATION_FOR_ERRORS",()=>!0);qe.registerFlag("WRAP_TO_IMAGEBITMAP",()=>!1);qe.registerFlag("ENGINE_COMPILE_ONLY",()=>!1);qe.registerFlag("CANVAS2D_WILL_READ_FREQUENTLY_FOR_GPU",()=>!1);qe.registerFlag("USE_SETTIMEOUTCUSTOM",()=>!1);function Ce(r,t){let e=r;if(ie(r))return t==="string"?[]:[r.length];if(!Array.isArray(r))return[];let o=[];for(;Array.isArray(e)||ie(e)&&t!=="string";)o.push(e.length),e=e[0];return Array.isArray(r)&&F().getBool("TENSORLIKE_CHECK_SHAPE_CONSISTENCY")&&Xb(r,o,[]),o}function Xb(r,t,e){if(e=e||[],!Array.isArray(r)&&!ie(r)){E(t.length===0,()=>`Element arr[${e.join("][")}] is a primitive, but should be an array/TypedArray of ${t[0]} elements`);return}E(t.length>0,()=>`Element arr[${e.join("][")}] should be a primitive, but is an array of ${r.length} elements`),E(r.length===t[0],()=>`Element arr[${e.join("][")}] should have ${t[0]} elements, but has ${r.length} elements`);let o=t.slice(1);for(let n=0;n<r.length;++n)Xb(r[n],o,e.concat(n))}function jb(r,t,e,o){if(r!=="string_or_numeric"){if(r==null)throw new Error("Expected dtype cannot be null.");if(r!=="numeric"&&r!==t||r==="numeric"&&t==="string")throw new Error(`Argument '${e}' passed to '${o}' must be ${r} tensor, but got ${t} tensor`)}}function T(r,t,e,o="numeric"){if(r instanceof Et)return jb(o,r.dtype,t,e),r;let n=oc(r);if(n!=="string"&&["bool","int32","float32"].indexOf(o)>=0&&(n=o),jb(o,n,t,e),r==null||!ie(r)&&!Array.isArray(r)&&typeof r!="number"&&typeof r!="boolean"&&typeof r!="string"){let c=r==null?"null":r.constructor.name;throw new Error(`Argument '${t}' passed to '${e}' must be a Tensor or TensorLike, but got '${c}'`)}let s=Ce(r,n);!ie(r)&&!Array.isArray(r)&&(r=[r]);let i=n!=="string"?Tc(r,n):Er(r,[],!0);return N.makeTensor(i,s,n)}function vo(r,t,e,o="numeric"){if(!Array.isArray(r))throw new Error(`Argument ${t} passed to ${e} must be a \`Tensor[]\` or \`TensorLike[]\``);return r.map((s,a)=>T(s,`${t}[${a}]`,e,o))}var Au="__op";function S(r){let t=Object.keys(r);if(t.length!==1)throw new Error(`Please provide an object with a single key (operation name) mapping to a function. Got an object with ${t.length} keys.`);let e=t[0],o=r[e];e.endsWith("_")&&(e=e.substring(0,e.length-1)),e=e+Au;let n=(...s)=>{N.startScope(e);try{let a=o(...s);return mp(a)&&console.error("Cannot return a Promise inside of tidy."),N.endScope(a),a}catch(a){throw N.endScope(null),a}};return Object.defineProperty(n,"name",{value:e,configurable:!0}),n}function xA(r,t){let e=T(r,"real","complex"),o=T(t,"imag","complex");Mt(e.shape,o.shape,`real and imag shapes, ${e.shape} and ${o.shape}, must match in call to tf.complex().`);let n={real:e,imag:o};return N.runKernel(Is,n)}var Re=S({complex_:xA});function De(r,t,e,o){if(o==null&&(o=oc(r)),o==="complex64")throw new Error("Cannot construct a complex64 tensor directly. Please use tf.complex(real, imag).");if(!ie(r)&&!Array.isArray(r)&&typeof r!="number"&&typeof r!="boolean"&&typeof r!="string")throw new Error("values passed to tensor(values) must be a number/boolean/string or an array of numbers/booleans/strings, or a TypedArray");if(t!=null){up(t);let n=It(t),s=It(e);E(n===s,()=>`Based on the provided shape, [${t}], the tensor should have ${n} values but has ${s}`);for(let a=0;a<e.length;++a){let i=e[a],c=a===e.length-1?i!==It(t.slice(a)):!0;E(e[a]===t[a]||!c,()=>`Error creating a new Tensor. Inferred shape (${e}) does not match the provided shape (${t}). `)}}return!ie(r)&&!Array.isArray(r)&&(r=[r]),t=t||e,r=o!=="string"?Tc(r,o):Er(r,[],!0),N.makeTensor(r,t,o)}function fe(r,t,e){let o=Ce(r,e);return De(r,t,o,e)}var Dp={float32:4,float16:2,int32:4,uint16:2,uint8:1,bool:1,complex64:8};var Ru=4;async function Zb(r,t){let e=[],o=[],n=Array.isArray(r)?r.map(a=>a.name):Object.keys(r);for(let a=0;a<n.length;++a){let i=n[a],c=Array.isArray(r)?r[a].tensor:r[i];if(c.dtype!=="float32"&&c.dtype!=="int32"&&c.dtype!=="bool"&&c.dtype!=="string"&&c.dtype!=="complex64")throw new Error(`Unsupported dtype in weight '${i}': ${c.dtype}`);let p={name:i,shape:c.shape,dtype:c.dtype};if(c.dtype==="string"){let l=new Promise(async u=>{let m=await c.bytes(),f=m.reduce((g,x)=>g+x.length,0)+Ru*m.length,d=new Uint8Array(f),h=0;for(let g=0;g<m.length;g++){let x=m[g],b=new Uint8Array(new Uint32Array([x.length]).buffer);d.set(b,h),h+=Ru,d.set(x,h),h+=x.length}u(d)});o.push(l)}else o.push(c.data());t!=null&&(p.group=t),e.push(p)}let s=await Promise.all(o);return{data:yA(s),specs:e}}function Du(r,t){let e={},o,n=0;for(let s of t){let a=s.name,i=s.dtype,c=s.shape,p=It(c),l;if("quantization"in s){let u=s.quantization;if(u.dtype==="uint8"||u.dtype==="uint16"){if(!("min"in u&&"scale"in u))throw new Error(`Weight ${s.name} with quantization ${u.dtype} doesn't have corresponding metadata min and scale.`)}else if(u.dtype==="float16"){if(i!=="float32")throw new Error(`Weight ${s.name} is quantized with ${u.dtype} which only supports weights of type float32 not ${i}.`)}else throw new Error(`Weight ${s.name} has unknown quantization dtype ${u.dtype}. Supported quantization dtypes are: 'uint8', 'uint16', and 'float16'.`);let m=Dp[u.dtype],f=r.slice(n,n+p*m),d=u.dtype==="uint8"?new Uint8Array(f):new Uint16Array(f);if(i==="float32")if(u.dtype==="uint8"||u.dtype==="uint16"){l=new Float32Array(d.length);for(let h=0;h<d.length;h++){let g=d[h];l[h]=g*u.scale+u.min}}else if(u.dtype==="float16")o===void 0&&(o=wA()),l=o(d);else throw new Error(`Unsupported quantization type ${u.dtype} for weight type float32.`);else if(i==="int32"){if(u.dtype!=="uint8"&&u.dtype!=="uint16")throw new Error(`Unsupported quantization type ${u.dtype} for weight type int32.`);l=new Int32Array(d.length);for(let h=0;h<d.length;h++){let g=d[h];l[h]=Math.round(g*u.scale+u.min)}}else throw new Error(`Unsupported dtype in weight '${a}': ${i}`);n+=p*m}else if(i==="string"){let u=It(s.shape);l=[];for(let m=0;m<u;m++){let f=new Uint32Array(r.slice(n,n+Ru))[0];n+=Ru;let d=new Uint8Array(r.slice(n,n+f));l.push(d),n+=f}}else{let u=Dp[i],m=r.slice(n,n+p*u);if(i==="float32")l=new Float32Array(m);else if(i==="int32")l=new Int32Array(m);else if(i==="bool")l=new Uint8Array(m);else if(i==="complex64"){l=new Float32Array(m);let f=new Float32Array(l.length/2),d=new Float32Array(l.length/2);for(let x=0;x<f.length;x++)f[x]=l[x*2],d[x]=l[x*2+1];let h=fe(f,c,"float32"),g=fe(d,c,"float32");e[a]=Re(h,g),h.dispose(),g.dispose()}else throw new Error(`Unsupported dtype in weight '${a}': ${i}`);n+=p*u}i!=="complex64"&&(e[a]=fe(l,c,i))}return e}function yA(r){if(r===null)throw new Error(`Invalid input value: ${JSON.stringify(r)}`);let t=0,e=[];r.forEach(s=>{if(t+=s.byteLength,e.push(s.byteLength===s.buffer.byteLength?s:new s.constructor(s)),!(s instanceof Float32Array||s instanceof Int32Array||s instanceof Uint8Array))throw new Error(`Unsupported TypedArray subtype: ${s.constructor.name}`)});let o=new Uint8Array(t),n=0;return e.forEach(s=>{o.set(new Uint8Array(s.buffer),n),n+=s.byteLength}),o.buffer}var $h=typeof Buffer<"u"&&(typeof Blob>"u"||typeof atob>"u"||typeof btoa>"u");function Yb(r){return $h?Buffer.byteLength(r):new Blob([r]).size}function Qb(r){if($h)return Buffer.from(r).toString("base64");let t=new Uint8Array(r),e="";for(let o=0,n=t.length;o<n;o++)e+=String.fromCharCode(t[o]);return btoa(e)}function Jb(r){if($h){let o=Buffer.from(r,"base64");return o.buffer.slice(o.byteOffset,o.byteOffset+o.byteLength)}let t=atob(r),e=new Uint8Array(t.length);for(let o=0;o<t.length;++o)e.set([t.charCodeAt(o)],o);return e.buffer}function Sc(r){if(r.length===1)return r[0];let t=0;r.forEach(n=>{t+=n.byteLength});let e=new Uint8Array(t),o=0;return r.forEach(n=>{e.set(new Uint8Array(n),o),o+=n.byteLength}),e.buffer}function Ah(r){for(r=r.trim();r.endsWith("/");)r=r.slice(0,r.length-1);let e=r.split("/");return e[e.length-1]}function Fu(r,t){let e={modelTopology:r.modelTopology,format:r.format,generatedBy:r.generatedBy,convertedBy:r.convertedBy,weightsManifest:t};return r.signature!=null&&(e.signature=r.signature),r.userDefinedMetadata!=null&&(e.userDefinedMetadata=r.userDefinedMetadata),r.modelInitializer!=null&&(e.modelInitializer=r.modelInitializer),r.trainingConfig!=null&&(e.trainingConfig=r.trainingConfig),e}function Rh(r,t,e){let o={modelTopology:r.modelTopology,format:r.format,generatedBy:r.generatedBy,convertedBy:r.convertedBy};if(r.trainingConfig!=null&&(o.trainingConfig=r.trainingConfig),r.weightsManifest!=null){if(!t)throw new Error("modelJSON has weightsManifest but weightSpecs is null");if(!e)throw new Error("modelJSON has weightsManifest but weightData is null");o.weightSpecs=t,o.weightData=e}return r.signature!=null&&(o.signature=r.signature),r.userDefinedMetadata!=null&&(o.userDefinedMetadata=r.userDefinedMetadata),r.modelInitializer!=null&&(o.modelInitializer=r.modelInitializer),o}async function vc(r,t){let e,o;return r.weightsManifest!=null&&([e,o]=await t(r.weightsManifest)),Rh(r,e,o)}function Zr(r){if(r.modelTopology instanceof ArrayBuffer)throw new Error("Expected JSON model topology, received ArrayBuffer.");return{dateSaved:new Date,modelTopologyType:"JSON",modelTopologyBytes:r.modelTopology==null?0:Yb(JSON.stringify(r.modelTopology)),weightSpecsBytes:r.weightSpecs==null?0:Yb(JSON.stringify(r.weightSpecs)),weightDataBytes:r.weightData==null?0:r.weightData.byteLength}}function _u(r){let t=[];for(let e of r)t.push(...e.weights);return t}function bA(){let r=e=>{let o=e<<13,n=0;for(;(o&8388608)===0;)n-=8388608,o<<=1;return o&=-8388609,n+=947912704,o|n},t=new Uint32Array(2048);t[0]=0;for(let e=1;e<1024;e++)t[e]=r(e);for(let e=1024;e<2048;e++)t[e]=939524096+(e-1024<<13);return t}function CA(){let r=new Uint32Array(64);r[0]=0,r[31]=1199570944,r[32]=2147483648,r[63]=3347054592;for(let t=1;t<31;t++)r[t]=t<<23;for(let t=33;t<63;t++)r[t]=2147483648+(t-32<<23);return r}function TA(){let r=new Uint32Array(64);for(let t=0;t<64;t++)r[t]=1024;return r[0]=r[32]=0,r}function wA(){let r=bA(),t=CA(),e=TA();return o=>{let n=new ArrayBuffer(4*o.length),s=new Uint32Array(n);for(let a=0;a<o.length;a++){let i=o[a],c=r[e[i>>10]+(i&1023)]+t[i>>10];s[a]=c}return new Float32Array(n)}}var ue=class r{constructor(){this.saveRouters=[],this.loadRouters=[]}static getInstance(){return r.instance==null&&(r.instance=new r),r.instance}static registerSaveRouter(t){r.getInstance().saveRouters.push(t)}static registerLoadRouter(t){r.getInstance().loadRouters.push(t)}static getSaveHandlers(t){return r.getHandlers(t,"save")}static getLoadHandlers(t,e){return r.getHandlers(t,"load",e)}static getHandlers(t,e,o){let n=[];return(e==="load"?r.getInstance().loadRouters:r.getInstance().saveRouters).forEach(a=>{let i=a(t,o);i!==null&&n.push(i)}),n}},t0=r=>ue.registerSaveRouter(r),e0=r=>ue.registerLoadRouter(r),r0=r=>ue.getSaveHandlers(r),o0=(r,t)=>ue.getLoadHandlers(r,t);var Dh="tensorflowjs",Fh=1,si="models_store",qn="model_info_store";function n0(){if(!F().getBool("IS_BROWSER"))throw new Error("Failed to obtain IndexedDB factory because the current environmentis not a web browser.");let r=typeof window>"u"?self:window,t=r.indexedDB||r.mozIndexedDB||r.webkitIndexedDB||r.msIndexedDB||r.shimIndexedDB;if(t==null)throw new Error("The current browser does not appear to support IndexedDB.");return t}function _h(r){let t=r.result;t.createObjectStore(si,{keyPath:"modelPath"}),t.createObjectStore(qn,{keyPath:"modelPath"})}var Qr=class{constructor(t){if(this.indexedDB=n0(),t==null||!t)throw new Error("For IndexedDB, modelPath must not be null, undefined or empty.");this.modelPath=t}async save(t){if(t.modelTopology instanceof ArrayBuffer)throw new Error("BrowserLocalStorage.save() does not support saving model topology in binary formats yet.");return this.databaseAction(this.modelPath,t)}async load(){return this.databaseAction(this.modelPath)}databaseAction(t,e){return new Promise((o,n)=>{let s=this.indexedDB.open(Dh,Fh);s.onupgradeneeded=()=>_h(s),s.onsuccess=()=>{let a=s.result;if(e==null){let i=a.transaction(si,"readonly"),p=i.objectStore(si).get(this.modelPath);p.onsuccess=()=>{if(p.result==null)return a.close(),n(new Error(`Cannot find model with path '${this.modelPath}' in IndexedDB.`));o(p.result.modelArtifacts)},p.onerror=l=>(a.close(),n(p.error)),i.oncomplete=()=>a.close()}else{let i=Zr(e),c=a.transaction(qn,"readwrite"),p=c.objectStore(qn),l=p.put({modelPath:this.modelPath,modelArtifactsInfo:i}),u;l.onsuccess=()=>{u=a.transaction(si,"readwrite");let f=u.objectStore(si).put({modelPath:this.modelPath,modelArtifacts:e,modelArtifactsInfo:i});f.onsuccess=()=>o({modelArtifactsInfo:i}),f.onerror=d=>{p=c.objectStore(qn);let h=p.delete(this.modelPath);h.onsuccess=()=>(a.close(),n(f.error)),h.onerror=g=>(a.close(),n(f.error))}},l.onerror=m=>(a.close(),n(l.error)),c.oncomplete=()=>{u==null?a.close():u.oncomplete=()=>a.close()}}},s.onerror=a=>n(s.error)})}};Qr.URL_SCHEME="indexeddb://";var s0=r=>F().getBool("IS_BROWSER")&&!Array.isArray(r)&&r.startsWith(Qr.URL_SCHEME)?IA(r.slice(Qr.URL_SCHEME.length)):null;ue.registerSaveRouter(s0);ue.registerLoadRouter(s0);function IA(r){return new Qr(r)}function SA(r){return r.startsWith(Qr.URL_SCHEME)?r.slice(Qr.URL_SCHEME.length):r}var Ou=class{constructor(){this.indexedDB=n0()}async listModels(){return new Promise((t,e)=>{let o=this.indexedDB.open(Dh,Fh);o.onupgradeneeded=()=>_h(o),o.onsuccess=()=>{let n=o.result,s=n.transaction(qn,"readonly"),i=s.objectStore(qn).getAll();i.onsuccess=()=>{let c={};for(let p of i.result)c[p.modelPath]=p.modelArtifactsInfo;t(c)},i.onerror=c=>(n.close(),e(i.error)),s.oncomplete=()=>n.close()},o.onerror=n=>e(o.error)})}async removeModel(t){return t=SA(t),new Promise((e,o)=>{let n=this.indexedDB.open(Dh,Fh);n.onupgradeneeded=()=>_h(n),n.onsuccess=()=>{let s=n.result,a=s.transaction(qn,"readwrite"),i=a.objectStore(qn),c=i.get(t),p;c.onsuccess=()=>{if(c.result==null)return s.close(),o(new Error(`Cannot find model with path '${t}' in IndexedDB.`));{let l=i.delete(t),u=()=>{p=s.transaction(si,"readwrite");let f=p.objectStore(si).delete(t);f.onsuccess=()=>e(c.result.modelArtifactsInfo),f.onerror=d=>o(c.error)};l.onsuccess=u,l.onerror=m=>(u(),s.close(),o(c.error))}},c.onerror=l=>(s.close(),o(c.error)),a.oncomplete=()=>{p==null?s.close():p.oncomplete=()=>s.close()}},n.onerror=s=>o(n.error)})}};var No="/",Nc="tensorflowjs_models",a0="info",vA="model_topology",NA="weight_specs",kA="weight_data",EA="model_metadata";function i0(r){return{info:[Nc,r,a0].join(No),topology:[Nc,r,vA].join(No),weightSpecs:[Nc,r,NA].join(No),weightData:[Nc,r,kA].join(No),modelMetadata:[Nc,r,EA].join(No)}}function c0(r){for(let t of Object.values(r))window.localStorage.removeItem(t)}function $A(r){let t=r.split(No);if(t.length<3)throw new Error(`Invalid key format: ${r}`);return t.slice(1,t.length-1).join(No)}function AA(r){return r.startsWith(Jr.URL_SCHEME)?r.slice(Jr.URL_SCHEME.length):r}var Jr=class{constructor(t){if(!F().getBool("IS_BROWSER")||typeof window>"u"||typeof window.localStorage>"u")throw new Error("The current environment does not support local storage.");if(this.LS=window.localStorage,t==null||!t)throw new Error("For local storage, modelPath must not be null, undefined or empty.");this.modelPath=t,this.keys=i0(this.modelPath)}async save(t){if(t.modelTopology instanceof ArrayBuffer)throw new Error("BrowserLocalStorage.save() does not support saving model topology in binary formats yet.");{let e=JSON.stringify(t.modelTopology),o=JSON.stringify(t.weightSpecs),n=Zr(t);try{this.LS.setItem(this.keys.info,JSON.stringify(n)),this.LS.setItem(this.keys.topology,e),this.LS.setItem(this.keys.weightSpecs,o),this.LS.setItem(this.keys.weightData,Qb(t.weightData));let s={format:t.format,generatedBy:t.generatedBy,convertedBy:t.convertedBy,signature:t.signature!=null?t.signature:void 0,userDefinedMetadata:t.userDefinedMetadata!=null?t.userDefinedMetadata:void 0,modelInitializer:t.modelInitializer!=null?t.modelInitializer:void 0,trainingConfig:t.trainingConfig!=null?t.trainingConfig:void 0};return this.LS.setItem(this.keys.modelMetadata,JSON.stringify(s)),{modelArtifactsInfo:n}}catch{throw c0(this.keys),new Error(`Failed to save model '${this.modelPath}' to local storage: size quota being exceeded is a possible cause of this failure: modelTopologyBytes=${n.modelTopologyBytes}, weightSpecsBytes=${n.weightSpecsBytes}, weightDataBytes=${n.weightDataBytes}.`)}}}async load(){let t=JSON.parse(this.LS.getItem(this.keys.info));if(t==null)throw new Error(`In local storage, there is no model with name '${this.modelPath}'`);if(t.modelTopologyType!=="JSON")throw new Error("BrowserLocalStorage does not support loading non-JSON model topology yet.");let e={},o=JSON.parse(this.LS.getItem(this.keys.topology));if(o==null)throw new Error(`In local storage, the topology of model '${this.modelPath}' is missing.`);e.modelTopology=o;let n=JSON.parse(this.LS.getItem(this.keys.weightSpecs));if(n==null)throw new Error(`In local storage, the weight specs of model '${this.modelPath}' are missing.`);e.weightSpecs=n;let s=this.LS.getItem(this.keys.modelMetadata);if(s!=null){let i=JSON.parse(s);e.format=i.format,e.generatedBy=i.generatedBy,e.convertedBy=i.convertedBy,i.signature!=null&&(e.signature=i.signature),i.userDefinedMetadata!=null&&(e.userDefinedMetadata=i.userDefinedMetadata),i.modelInitializer!=null&&(e.modelInitializer=i.modelInitializer),i.trainingConfig!=null&&(e.trainingConfig=i.trainingConfig)}let a=this.LS.getItem(this.keys.weightData);if(a==null)throw new Error(`In local storage, the binary weight values of model '${this.modelPath}' are missing.`);return e.weightData=Jb(a),e}};Jr.URL_SCHEME="localstorage://";var p0=r=>F().getBool("IS_BROWSER")&&!Array.isArray(r)&&r.startsWith(Jr.URL_SCHEME)?RA(r.slice(Jr.URL_SCHEME.length)):null;ue.registerSaveRouter(p0);ue.registerLoadRouter(p0);function RA(r){return new Jr(r)}var Pu=class{constructor(){E(F().getBool("IS_BROWSER"),()=>"Current environment is not a web browser"),E(typeof window>"u"||typeof window.localStorage<"u",()=>"Current browser does not appear to support localStorage"),this.LS=window.localStorage}async listModels(){let t={},e=Nc+No,o=No+a0;for(let n=0;n<this.LS.length;++n){let s=this.LS.key(n);if(s.startsWith(e)&&s.endsWith(o)){let a=$A(s);t[a]=JSON.parse(this.LS.getItem(s))}}return t}async removeModel(t){t=AA(t);let e=i0(t);if(this.LS.getItem(e.info)==null)throw new Error(`Cannot find model at path '${t}'`);let o=JSON.parse(this.LS.getItem(e.info));return c0(e),o}};var kc="://",Dr=class r{constructor(){this.managers={}}static getInstance(){return r.instance==null&&(r.instance=new r),r.instance}static registerManager(t,e){E(t!=null,()=>"scheme must not be undefined or null."),t.endsWith(kc)&&(t=t.slice(0,t.indexOf(kc))),E(t.length>0,()=>"scheme must not be an empty string.");let o=r.getInstance();E(o.managers[t]==null,()=>`A model store manager is already registered for scheme '${t}'.`),o.managers[t]=e}static getManager(t){let e=r.getInstance().managers[t];if(e==null)throw new Error(`Cannot find model manager for scheme '${t}'`);return e}static getSchemes(){return Object.keys(r.getInstance().managers)}};function Lu(r){if(r.indexOf(kc)===-1)throw new Error(`The url string provided does not contain a scheme. Supported schemes are: ${Dr.getSchemes().join(",")}`);return{scheme:r.split(kc)[0],path:r.split(kc)[1]}}async function l0(r,t,e=!1){E(r!==t,()=>`Old path and new path are the same: '${r}'`);let o=ue.getLoadHandlers(r);E(o.length>0,()=>`Copying failed because no load handler is found for source URL ${r}.`),E(o.length<2,()=>`Copying failed because more than one (${o.length}) load handlers for source URL ${r}.`);let n=o[0],s=ue.getSaveHandlers(t);E(s.length>0,()=>`Copying failed because no save handler is found for destination URL ${t}.`),E(s.length<2,()=>`Copying failed because more than one (${o.length}) save handlers for destination URL ${t}.`);let a=s[0],i=Lu(r).scheme,c=Lu(r).path,p=i===Lu(r).scheme,l=await n.load();e&&p&&await Dr.getManager(i).removeModel(c);let u=await a.save(l);return e&&!p&&await Dr.getManager(i).removeModel(c),u.modelArtifactsInfo}async function u0(){let r=Dr.getSchemes(),t={};for(let e of r){let o=await Dr.getManager(e).listModels();for(let n in o){let s=e+kc+n;t[s]=o[n]}}return t}async function m0(r){let t=Lu(r);return Dr.getManager(t.scheme).removeModel(t.path)}async function f0(r,t){return l0(r,t,!1)}async function d0(r,t){return l0(r,t,!0)}var Oh=class{constructor(){this.messageName="setTimeoutCustom",this.functionRefs=[],this.handledMessageCount=0,this.hasEventListener=!1}fetch(t,e){return fetch(t,e)}now(){return performance.now()}encode(t,e){if(e!=="utf-8"&&e!=="utf8")throw new Error(`Browser's encoder only supports utf-8, but got ${e}`);return this.textEncoder==null&&(this.textEncoder=new TextEncoder),this.textEncoder.encode(t)}decode(t,e){return new TextDecoder(e).decode(t)}setTimeoutCustom(t,e){if(!window||!F().getBool("USE_SETTIMEOUTCUSTOM")){setTimeout(t,e);return}this.functionRefs.push(t),setTimeout(()=>{window.postMessage({name:this.messageName,index:this.functionRefs.length-1},"*")},e),this.hasEventListener||(this.hasEventListener=!0,window.addEventListener("message",o=>{if(o.source===window&&o.data.name===this.messageName){o.stopPropagation();let n=this.functionRefs[o.data.index];n(),this.handledMessageCount++,this.handledMessageCount===this.functionRefs.length&&(this.functionRefs=[],this.handledMessageCount=0)}},!0))}};if(F().get("IS_BROWSER")){F().setPlatform("browser",new Oh);try{Dr.registerManager(Jr.URL_SCHEME,new Pu)}catch{}try{Dr.registerManager(Qr.URL_SCHEME,new Ou)}catch{}}var DA={importFetch:()=>oh("node-fetch")},Ph;var Lh=class{constructor(){this.util=oh("util"),this.textEncoder=new this.util.TextEncoder}fetch(t,e){return F().global.fetch!=null?F().global.fetch(t,e):(Ph==null&&(Ph=DA.importFetch()),Ph(t,e))}now(){let t=process.hrtime();return t[0]*1e3+t[1]/1e6}encode(t,e){if(e!=="utf-8"&&e!=="utf8")throw new Error(`Node built-in encoder only supports utf-8, but got ${e}`);return this.textEncoder.encode(t)}decode(t,e){return t.length===0?"":new this.util.TextDecoder(e).decode(t)}};F().get("IS_NODE")&&!F().get("IS_BROWSER")&&F().setPlatform("node",new Lh);function rt(r,t="float32",e){return t=t||"float32",up(r),new Rt(r,t,e)}function FA(r,t){let e=T(r,"x","cast");if(!ch(t))throw new Error(`Failed to cast to unknown dtype ${t}`);if(t==="string"&&e.dtype!=="string"||t!=="string"&&e.dtype==="string")throw new Error("Only strings can be casted to strings");let o={x:e},n={dtype:t};return N.runKernel(Co,o,n)}var dt=S({cast_:FA});function _A(r){let e={x:T(r,"x","clone","string_or_numeric")};return N.runKernel(To,e)}var Le=S({clone_:_A});function Fp(r,t=!1){console.log(r.toString(t))}Nh();var OA={buffer:rt,cast:dt,clone:Le,print:Fp};Hb(OA);var to={};kt(to,{browserFiles:()=>g0,browserHTTPRequest:()=>b0,concatenateArrayBuffers:()=>Sc,copyModel:()=>f0,decodeWeights:()=>Du,encodeWeights:()=>Zb,fromMemory:()=>C0,fromMemorySync:()=>zh,getLoadHandlers:()=>o0,getModelArtifactsForJSON:()=>vc,getModelArtifactsForJSONSync:()=>Rh,getModelArtifactsInfoForJSON:()=>Zr,getSaveHandlers:()=>r0,getWeightSpecs:()=>_u,http:()=>Bu,isHTTPScheme:()=>Mu,listModels:()=>u0,loadWeights:()=>x0,moveModel:()=>d0,registerLoadRouter:()=>e0,registerSaveRouter:()=>t0,removeModel:()=>m0,weightsLoaderFactory:()=>Gh,withSaveHandler:()=>T0,withSaveHandlerSync:()=>w0});var PA="model",LA=".json",MA=".weights.bin";function h0(r){return new Promise(t=>setTimeout(t)).then(r)}var Ec=class r{constructor(t){if(!F().getBool("IS_BROWSER"))throw new Error("browserDownloads() cannot proceed because the current environment is not a browser.");t.startsWith(r.URL_SCHEME)&&(t=t.slice(r.URL_SCHEME.length)),(t==null||t.length===0)&&(t=PA),this.modelJsonFileName=t+LA,this.weightDataFileName=t+MA}async save(t){if(typeof document>"u")throw new Error("Browser downloads are not supported in this environment since `document` is not present");let e=window.URL.createObjectURL(new Blob([t.weightData],{type:"application/octet-stream"}));if(t.modelTopology instanceof ArrayBuffer)throw new Error("BrowserDownloads.save() does not support saving model topology in binary formats yet.");{let o=[{paths:["./"+this.weightDataFileName],weights:t.weightSpecs}],n=Fu(t,o),s=window.URL.createObjectURL(new Blob([JSON.stringify(n)],{type:"application/json"})),a=this.modelJsonAnchor==null?document.createElement("a"):this.modelJsonAnchor;if(a.download=this.modelJsonFileName,a.href=s,await h0(()=>a.dispatchEvent(new MouseEvent("click"))),t.weightData!=null){let i=this.weightDataAnchor==null?document.createElement("a"):this.weightDataAnchor;i.download=this.weightDataFileName,i.href=e,await h0(()=>i.dispatchEvent(new MouseEvent("click")))}return{modelArtifactsInfo:Zr(t)}}}};Ec.URL_SCHEME="downloads://";var Mh=class{constructor(t){if(t==null||t.length<1)throw new Error(`When calling browserFiles, at least 1 file is required, but received ${t}`);this.jsonFile=t[0],this.weightsFiles=t.slice(1)}async load(){return new Promise((t,e)=>{let o=new FileReader;o.onload=n=>{let s=JSON.parse(n.target.result),a=s.modelTopology;if(a==null){e(new Error(`modelTopology field is missing from file ${this.jsonFile.name}`));return}if(s.weightsManifest==null){e(new Error(`weightManifest field is missing from file ${this.jsonFile.name}`));return}if(this.weightsFiles.length===0){t({modelTopology:a});return}let c=vc(s,p=>this.loadWeights(p));t(c)},o.onerror=n=>e(`Failed to read model topology and weights manifest JSON from file '${this.jsonFile.name}'. BrowserFiles supports loading Keras-style tf.Model artifacts only.`),o.readAsText(this.jsonFile)})}loadWeights(t){let e=[],o=[];for(let a of t)e.push(...a.weights),o.push(...a.paths);let n=this.checkManifestAndWeightFiles(t),s=o.map(a=>this.loadWeightsFile(a,n[a]));return Promise.all(s).then(a=>[e,Sc(a)])}loadWeightsFile(t,e){return new Promise((o,n)=>{let s=new FileReader;s.onload=a=>{let i=a.target.result;o(i)},s.onerror=a=>n(`Failed to weights data from file of path '${t}'.`),s.readAsArrayBuffer(e)})}checkManifestAndWeightFiles(t){let e=[],o=this.weightsFiles.map(s=>Ah(s.name)),n={};for(let s of t)s.paths.forEach(a=>{let i=Ah(a);if(e.indexOf(i)!==-1)throw new Error(`Duplicate file basename found in weights manifest: '${i}'`);if(e.push(i),o.indexOf(i)===-1)throw new Error(`Weight file with basename '${i}' is not provided.`);n[a]=this.weightsFiles[o.indexOf(i)]});if(e.length!==this.weightsFiles.length)throw new Error(`Mismatch in the number of files in weights manifest (${e.length}) and the number of weight files provided (${this.weightsFiles.length}).`);return n}},BA=r=>F().getBool("IS_BROWSER")&&!Array.isArray(r)&&r.startsWith(Ec.URL_SCHEME)?VA(r.slice(Ec.URL_SCHEME.length)):null;ue.registerSaveRouter(BA);function VA(r="model"){return new Ec(r)}function g0(r){return new Mh(r)}function Bh(r,t,e,o){a(r),e=e??0,o=o??1,i(e,o);let n=0,s=c=>(c.then(p=>{let l=e+ ++n/r.length*(o-e);return t(l),p}),c);function a(c){E(c!=null&&Array.isArray(c)&&c.length>0,()=>"promises must be a none empty array")}function i(c,p){E(c>=0&&c<=1,()=>`Progress fraction must be in range [0, 1], but got startFraction ${c}`),E(p>=0&&p<=1,()=>`Progress fraction must be in range [0, 1], but got endFraction ${p}`),E(p>=c,()=>`startFraction must be no more than endFraction, but got startFraction ${c} and endFraction ${p}`)}return Promise.all(r.map(s))}async function Vh(r,t){t==null&&(t={});let e=t.fetchFunc==null?F().platform.fetch:t.fetchFunc,o=r.map(u=>e(u,t.requestInit,{isBinary:!0})),i=(t.onProgress==null?await Promise.all(o):await Bh(o,t.onProgress,0,.5)).map(u=>u.arrayBuffer());return t.onProgress==null?await Promise.all(i):await Bh(i,t.onProgress,.5,1)}async function x0(r,t="",e,o){return Gh(a=>Vh(a,{requestInit:o}))(r,t,e)}function Gh(r){return async(t,e="",o)=>{let n=t.map(()=>!1),s={},a=o!=null?o.map(()=>!1):[],i=[];if(t.forEach((f,d)=>{let h=0;f.weights.forEach(g=>{let x="quantization"in g?g.quantization.dtype:g.dtype,b=Dp[x]*It(g.shape),w=()=>{n[d]=!0,s[d]==null&&(s[d]=[]),s[d].push({manifestEntry:g,groupOffset:h,sizeBytes:b})};o!=null?o.forEach((I,k)=>{I===g.name&&(w(),a[k]=!0)}):w(),i.push(g.name),h+=b})}),!a.every(f=>f)){let f=o.filter((d,h)=>!a[h]);throw new Error(`Could not find weights in manifest with names: ${f.join(", ")}. 
Manifest JSON has weights with names: ${i.join(", ")}.`)}let c=n.reduce((f,d,h)=>(d&&f.push(h),f),[]),p=[];c.forEach(f=>{t[f].paths.forEach(d=>{let h=e+(e.endsWith("/")?"":"/")+d;p.push(h)})});let l=await r(p),u={},m=0;return c.forEach(f=>{let d=t[f].paths.length,h=0;for(let I=0;I<d;I++)h+=l[m+I].byteLength;let g=new ArrayBuffer(h),x=new Uint8Array(g),b=0;for(let I=0;I<d;I++){let k=new Uint8Array(l[m+I]);x.set(k,b),b+=k.byteLength}s[f].forEach(I=>{let k=g.slice(I.groupOffset,I.groupOffset+I.sizeBytes),$=Du(k,[I.manifestEntry]);for(let R in $)u[R]=$[R]}),m+=d}),u}}var GA="application/octet-stream",UA="application/json",_p=class{constructor(t,e){if(this.DEFAULT_METHOD="POST",e==null&&(e={}),this.weightPathPrefix=e.weightPathPrefix,this.onProgress=e.onProgress,this.weightUrlConverter=e.weightUrlConverter,e.fetchFunc!=null?(E(typeof e.fetchFunc=="function",()=>"Must pass a function that matches the signature of `fetch` (see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)"),this.fetch=e.fetchFunc):this.fetch=F().platform.fetch,E(t!=null&&t.length>0,()=>"URL path for http must not be null, undefined or empty."),Array.isArray(t)&&E(t.length===2,()=>`URL paths for http must have a length of 2, (actual length is ${t.length}).`),this.path=t,e.requestInit!=null&&e.requestInit.body!=null)throw new Error("requestInit is expected to have no pre-existing body, but has one.");this.requestInit=e.requestInit||{}}async save(t){if(t.modelTopology instanceof ArrayBuffer)throw new Error("BrowserHTTPRequest.save() does not support saving model topology in binary formats yet.");let e=Object.assign({method:this.DEFAULT_METHOD},this.requestInit);e.body=new FormData;let o=[{paths:["./model.weights.bin"],weights:t.weightSpecs}],n=Fu(t,o);e.body.append("model.json",new Blob([JSON.stringify(n)],{type:UA}),"model.json"),t.weightData!=null&&e.body.append("model.weights.bin",new Blob([t.weightData],{type:GA}),"model.weights.bin");let s=await this.fetch(this.path,e);if(s.ok)return{modelArtifactsInfo:Zr(t),responses:[s]};throw new Error(`BrowserHTTPRequest.save() failed due to HTTP response status ${s.status}.`)}async load(){let t=await this.fetch(this.path,this.requestInit);if(!t.ok)throw new Error(`Request to ${this.path} failed with status code ${t.status}. Please verify this URL points to the model JSON of the model to load.`);let e;try{e=await t.json()}catch{let a=`Failed to parse model JSON of response from ${this.path}.`;throw this.path.endsWith(".pb")?a+=" Your path contains a .pb file extension. Support for .pb models have been removed in TensorFlow.js 1.0 in favor of .json models. You can re-convert your Python TensorFlow model using the TensorFlow.js 1.0 conversion scripts or you can convert your.pb models with the 'pb2json'NPM script in the tensorflow/tfjs-converter repository.":a+=" Please make sure the server is serving valid JSON for this request.",new Error(a)}let o=e.modelTopology,n=e.weightsManifest;if(o==null&&n==null)throw new Error(`The JSON from HTTP path ${this.path} contains neither model topology or manifest for weights.`);return vc(e,s=>this.loadWeights(s))}async loadWeights(t){let e=Array.isArray(this.path)?this.path[1]:this.path,[o,n]=zA(e),s=this.weightPathPrefix||o,a=_u(t),i=[],c=[];for(let l of t)for(let u of l.paths)this.weightUrlConverter!=null?c.push(this.weightUrlConverter(u)):i.push(s+u+n);this.weightUrlConverter&&i.push(...await Promise.all(c));let p=await Vh(i,{requestInit:this.requestInit,fetchFunc:this.fetch,onProgress:this.onProgress});return[a,Sc(p)]}};_p.URL_SCHEME_REGEX=/^https?:\/\//;function zA(r){let t=r.lastIndexOf("/"),e=r.lastIndexOf("?"),o=r.substring(0,t),n=e>t?r.substring(e):"";return[o+"/",n]}function Mu(r){return r.match(_p.URL_SCHEME_REGEX)!=null}var y0=(r,t)=>{if(typeof fetch>"u"&&(t==null||t.fetchFunc==null))return null;{let e=!0;if(Array.isArray(r)?e=r.every(o=>Mu(o)):e=Mu(r),e)return Bu(r,t)}return null};ue.registerSaveRouter(y0);ue.registerLoadRouter(y0);function Bu(r,t){return new _p(r,t)}function b0(r,t){return Bu(r,t)}var Op=class{constructor(t){this.modelArtifacts=t}load(){return this.modelArtifacts}},Vu=class{constructor(t){this.saveHandler=t}save(t){return this.saveHandler(t)}},Uh=class{constructor(t){t.load&&(this.load=()=>Promise.resolve(t.load())),t.save&&(this.save=e=>Promise.resolve(t.save(e)))}};function C0(r,t,e,o){let n=arguments;return new Uh(zh(...n))}function zh(r,t,e,o){return arguments.length===1?r.modelTopology!=null||r.weightSpecs!=null?new Op(r):(console.warn("Please call tf.io.fromMemory() with only one argument. The argument should be of type ModelArtifacts. The multi-argument signature of tf.io.fromMemory() has been deprecated and will be removed in a future release."),new Op({modelTopology:r})):(console.warn("Please call tf.io.fromMemory() with only one argument. The argument should be of type ModelArtifacts. The multi-argument signature of tf.io.fromMemory() has been deprecated and will be removed in a future release."),new Op({modelTopology:r,weightSpecs:t,weightData:e,trainingConfig:o}))}function T0(r){return new Vu(r)}function w0(r){return new Vu(r)}var Wh={};kt(Wh,{confusionMatrix:()=>S0});function WA(r,t,e=!1,o=!1){let n=T(r,"a","matMul"),s=T(t,"b","matMul");[n,s]=xt(n,s);let a={a:n,b:s},i={transposeA:e,transposeB:o};return N.runKernel(bs,a,i)}var St=S({matMul_:WA});function HA(r,t,e=1,o=0,n="int32"){if(t<2)throw new Error(`Error in oneHot: depth must be >=2, but it is ${t}`);let a={indices:T(r,"indices","oneHot","int32")},i={dtype:n,depth:t,onValue:e,offValue:o};return N.runKernel(da,a,i)}var Kn=S({oneHot_:HA});function qA(){F().set("PROD",!0)}function KA(){F().set("DEBUG",!0)}function jA(){F().set("DEPRECATION_WARNINGS_ENABLED",!1),console.warn("TensorFlow.js deprecation warnings have been disabled.")}function I0(r){F().getBool("DEPRECATION_WARNINGS_ENABLED")&&console.warn(r+" You can disable deprecation warnings with tf.disableDeprecationWarnings().")}qb(I0);function XA(){N.disposeVariables()}function Fr(){return N}function YA(){return N.memory()}function ZA(r){return N.profile(r)}function ht(r,t){return N.tidy(r,t)}function ee(r){Ap(r).forEach(e=>e.dispose())}function Ke(r){return N.keep(r)}function QA(r){return N.time(r)}function JA(r){return N.setBackend(r)}function tR(){return N.ready()}function eR(){return N.backendName}function rR(r){N.removeBackend(r)}function oR(r){return N.findBackend(r)}function nR(r){return N.findBackendFactory(r)}function Pp(r,t,e=1){return N.registerBackend(r,t,e)}function sR(){return N.backend}function aR(r,t){F().setPlatform(r,t)}function iR(r){let e={input:T(r,"input","imag")};return N.runKernel(Js,e)}var ko=S({imag_:iR});function cR(r){let e={x:T(r,"x","neg")};return N.runKernel("Neg",e)}var de=S({neg_:cR});function pR(r){let e={input:T(r,"input","real")};return N.runKernel(Ia,e)}var eo=S({real_:pR});function lR(r,t,e){let o=T(r,"x","transpose");if(t==null&&(t=o.shape.map((a,i)=>i).reverse()),E(o.rank===t.length,()=>`Error in transpose: rank of input ${o.rank} must match length of perm ${t}.`),t.forEach(a=>{E(a>=0&&a<o.rank,()=>`All entries in 'perm' must be between 0 and ${o.rank-1} but got ${t}`)}),o.rank<=1)return o.clone();let n={x:o},s={perm:t};return o.dtype==="complex64"?ht(()=>{let a=eo(o),i=ko(o);return a=N.runKernel(Io,{x:a},s),i=N.runKernel(Io,{x:i},s),e&&(i=de(i)),Re(a,i)}):N.runKernel(Io,n,s)}var Eo=S({transpose_:lR});function uR(r,t,e){let o=T(r,"labels","confusionMatrix"),n=T(t,"predictions","confusionMatrix");E(e==null||e>0&&Number.isInteger(e),()=>`If provided, numClasses must be a positive integer, but got ${e}`),E(o.rank===1,()=>`Expected the rank of labels to be 1, but got ${o.rank}`),E(n.rank===1,()=>`Expected the rank of predictions to be 1, but got ${n.rank}`),E(o.shape[0]===n.shape[0],()=>`Mismatch in the number of examples: ${o.shape[0]} vs. ${n.shape[0]}. Labels and predictions should have the same number of elements.`),E(e>0&&Number.isInteger(e),()=>`numClasses is required to be a positive integer, but got ${e}`);let s=Kn(dt(o,"int32"),e),a=Kn(dt(n,"int32"),e),i=Eo(s),c=St(i,a);return dt(c,"int32")}var S0=S({confusionMatrix_:uR});var _r={};kt(_r,{assertAndGetBroadcastShape:()=>At,getBroadcastDims:()=>v0,getReductionAxes:()=>Gu});function v0(r,t){let e=r.length,o=[];for(let n=0;n<e;n++){let s=e-1-n,a=r[s]||1;(t[t.length-1-n]||1)>1&&a===1&&o.unshift(s)}return o}function Gu(r,t){let e=[];for(let o=0;o<t.length;o++){let n=r[r.length-o-1],s=t.length-o-1,a=t[s];(n==null||n===1&&a>1)&&e.unshift(s)}return e}function At(r,t){let e=[],o=Math.max(r.length,t.length);for(let n=0;n<o;n++){let s=r[r.length-n-1];s==null&&(s=1);let a=t[t.length-n-1];if(a==null&&(a=1),s===1)e.unshift(a);else if(a===1)e.unshift(s);else if(s!==a){let i=`Operands could not be broadcast together with shapes ${r} and ${t}.`;throw Error(i)}else e.unshift(s)}return e}var Hh={};kt(Hh,{fromPixels:()=>yR,fromPixelsAsync:()=>gR,toPixels:()=>xR});function Lp(r,t,e){if(er(r),t!=null&&t.length!==3)throw new Error("tensor3d() requires shape to have three numbers");let o=Ce(r,e);if(o.length!==3&&o.length!==1)throw new Error("tensor3d() requires values to be number[][][] or flat/TypedArray");if(o.length===1&&t==null)throw new Error("tensor3d() requires shape to be provided when `values` are a flat array");return De(r,t,o,e)}var ai;function N0(r,t=3){if(t>4)throw new Error("Cannot construct Tensor with more than 4 channels from pixels.");if(r==null)throw new Error("pixels passed to tf.browser.fromPixels() can not be null");let e=!1,o=!1,n=!1,s=!1,a=!1,i=!1;if(r.data instanceof Uint8Array)e=!0;else if(typeof ImageData<"u"&&r instanceof ImageData)o=!0;else if(typeof HTMLVideoElement<"u"&&r instanceof HTMLVideoElement)n=!0;else if(typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement)s=!0;else if(r.getContext!=null)a=!0;else if(typeof ImageBitmap<"u"&&r instanceof ImageBitmap)i=!0;else throw new Error(`pixels passed to tf.browser.fromPixels() must be either an HTMLVideoElement, HTMLImageElement, HTMLCanvasElement, ImageData in browser, or OffscreenCanvas, ImageData in webworker or {data: Uint32Array, width: number, height: number}, but was ${r.constructor.name}`);if(xc(hc,N.backendName)!=null){let d={pixels:r},h={numChannels:t};return N.runKernel(hc,d,h)}let[p,l]=n?[r.videoWidth,r.videoHeight]:[r.width,r.height],u;if(a)u=r.getContext("2d").getImageData(0,0,p,l).data;else if(o||e)u=r.data;else if(s||n||i){if(ai==null)if(typeof document>"u")if(typeof OffscreenCanvas<"u"&&typeof OffscreenCanvasRenderingContext2D<"u")ai=new OffscreenCanvas(1,1).getContext("2d");else throw new Error("Cannot parse input in current context. Reason: OffscreenCanvas Context2D rendering is not supported.");else ai=document.createElement("canvas").getContext("2d",{willReadFrequently:!0});ai.canvas.width=p,ai.canvas.height=l,ai.drawImage(r,0,0,p,l),u=ai.getImageData(0,0,p,l).data}let m;if(t===4)m=new Int32Array(u);else{let d=p*l;m=new Int32Array(d*t);for(let h=0;h<d;h++)for(let g=0;g<t;++g)m[h*t+g]=u[h*4+g]}return Lp(m,[l,p,t],"int32")}function mR(r){return r!=null&&r.data instanceof Uint8Array}function fR(){return typeof window<"u"&&typeof ImageBitmap<"u"&&window.hasOwnProperty("createImageBitmap")}function dR(r){return r!=null&&r.width!==0&&r.height!==0}function hR(r){return fR()&&!(r instanceof ImageBitmap)&&dR(r)&&!mR(r)}async function gR(r,t=3){let e=null;if(F().getBool("WRAP_TO_IMAGEBITMAP")&&hR(r)){let o;try{o=await createImageBitmap(r,{premultiplyAlpha:"none"})}catch{o=null}o!=null&&o.width===r.width&&o.height===r.height?e=o:e=r}else e=r;return N0(e,t)}async function xR(r,t){let e=T(r,"img","toPixels");if(!(r instanceof Et)){let p=e;e=dt(p,"int32"),p.dispose()}if(e.rank!==2&&e.rank!==3)throw new Error(`toPixels only supports rank 2 or 3 tensors, got rank ${e.rank}.`);let[o,n]=e.shape.slice(0,2),s=e.rank===2?1:e.shape[2];if(s>4||s===2)throw new Error(`toPixels only supports depth of size 1, 3 or 4 but got ${s}`);if(e.dtype!=="float32"&&e.dtype!=="int32")throw new Error(`Unsupported type for toPixels: ${e.dtype}. Please use float32 or int32 tensors.`);let a=await e.data(),i=e.dtype==="float32"?255:1,c=new Uint8ClampedArray(n*o*4);for(let p=0;p<o*n;++p){let l=[0,0,0,255];for(let m=0;m<s;m++){let f=a[p*s+m];if(e.dtype==="float32"){if(f<0||f>1)throw new Error(`Tensor values for a float32 Tensor must be in the range [0 - 1] but encountered ${f}.`)}else if(e.dtype==="int32"&&(f<0||f>255))throw new Error(`Tensor values for a int32 Tensor must be in the range [0 - 255] but encountered ${f}.`);s===1?(l[0]=f*i,l[1]=f*i,l[2]=f*i):l[m]=f*i}let u=p*4;c[u+0]=Math.round(l[0]),c[u+1]=Math.round(l[1]),c[u+2]=Math.round(l[2]),c[u+3]=Math.round(l[3])}if(t!=null){t.width=n,t.height=o;let p=t.getContext("2d"),l=new ImageData(c,n,o);p.putImageData(l,0,0)}return e!==r&&e.dispose(),c}var yR=S({fromPixels_:N0});var qh={};kt(qh,{prepareAndValidate:()=>k0});function k0(r,t){let e=r.shape.length,o=t.shape.length;if(e<1)throw new Error(`tf.gatherND() expects the input to be rank 1 or higher, but the rank was ${e}.`);if(o<1)throw new Error(`tf.gatherND() expects the indices to be rank 1 or higher, but the rank was ${o}.`);if(t.dtype!=="int32")throw new Error(`tf.gatherND() expects the indices to be int32 type, but the dtype was ${t.dtype}.`);if(t.shape[o-1]>e)throw new Error(`index innermost dimension length must be <= tensor rank; saw: ${t.shape[o-1]} vs. ${e}`);if(It(r.shape)===0)throw new Error(`Requested more than 0 entries, but input is empty. Input shape: ${r.shape}.`);let n=t.shape,s=n[n.length-1],a=1;for(let u=0;u<n.length-1;++u)a*=n[u];let i=r.shape,c=n.slice();c.pop();let p=1;for(let u=s;u<e;++u)p*=i[u],c.push(i[u]);let l=[...jr(r.shape).map(u=>u/p),1].slice(0,s);return[c,a,p,l]}var zu={};kt(zu,{calculateShapes:()=>E0,validateInput:()=>Uu,validateUpdateShape:()=>Kh});function Kh(r,t,e){let o=t.rank>1?t.shape[t.rank-1]:1,n=t.rank>1?t.rank-1:1,s=`Must have updates.shape = indices.shape[:batchDim] + shape[sliceDim:], got updates.shape: ${e.shape}, indices.shape: ${t.shape}, shape: ${r}, sliceDim: ${o}, and batchDim: ${n}.`;if(e.rank<n)throw new Error(s+` update.rank < ${n}. `);if(r.length<o+(e.rank-n))throw new Error(s+` Output shape length < ${o+(e.rank-n)}`);if(e.rank!==n+r.length-o)throw new Error(s+` update.rank != ${n+r.length-o}`);for(let a=0;a<n;++a)if(e.shape[a]!==t.shape[a])throw new Error(s+` updates.shape[${a}] (${e.shape[a]}) != indices.shape[${a}] (${t.shape[a]}).`);for(let a=0;a<e.rank-n;++a)if(e.shape[a+n]!==r[a+o])throw new Error(s+` updates.shape[${a+n}] (${e.shape[a+n]}) != shape[${a+n}] (${r[a+n]})`)}function Uu(r,t,e){if(t.rank<1)throw new Error(`tf.scatterND() expects the indices to be rank 1 or higher, but the rank was ${t.rank}.`);if(r.rank<1)throw new Error(`tf.scatterND() expects the updates to be rank 1 or higher, but the rank was ${r.rank}.`);if(t.dtype!=="int32")throw new Error(`The dtype of 'indices' should be int32, but got dtype: ${t.dtype}`);if(e.length<1)throw new Error(`Output rank must be greater or equal to 1, but got shape: ${e}`);if(e.length===0){if(t.size===0)throw new Error(`Indices specified for empty output. indices shape: ${t.shape}`);if(r.size===0)throw new Error(`Updates specified for empty output. updates shape: ${r.shape}`)}Kh(e,t,r)}function E0(r,t,e){let o=t.shape.length,n=o>1?t.shape[o-1]:1,s=e.length,a=1;for(let u=n;u<s;++u)a*=e[u];let i=n<1?1:n,c=It(t.shape)/i,p=[...jr(e.slice(0,n)),1],l=It(e);return{sliceRank:n,numUpdates:c,sliceSize:a,strides:p,outputSize:l}}var ce={};kt(ce,{assertParamsValid:()=>CR,computeFlatOffset:()=>vR,computeOutShape:()=>wR,getNormalizedAxes:()=>IR,isSliceContinous:()=>SR,maskToAxes:()=>TR,parseSliceParams:()=>NR,sliceInfo:()=>kR,startForAxis:()=>P0,startIndicesWithElidedDims:()=>F0,stopForAxis:()=>L0,stopIndicesWithElidedDims:()=>_0,stridesForAxis:()=>O0,stridesWithElidedDims:()=>A0});var jh=-2,bR=-1;function CR(r,t,e){let o=r.shape.length;E(o===t.length,()=>`Error in slice${o}D: Length of begin ${t} must match the rank of the array (${o}).`),E(o===e.length,()=>`Error in slice${o}D: Length of size ${e} must match the rank of the array (${o}).`);for(let n=0;n<o;++n)E(t[n]+e[n]<=r.shape[n],()=>`Error in slice${o}D: begin[${n}] + size[${n}] (${t[n]+e[n]}) would overflow input.shape[${n}] (${r.shape[n]})`)}function TR(r){let t=[],e=0;for(;r>0;)r&1&&t.push(e),r/=2,e++;return t}function wR(r,t,e){let o=[];for(let n=0;n<r.length;n++)o[n]=Math.ceil((t[n]-r[n])/e[n]);return o}function A0(r,t,e,o){let n=[...r];for(let s=n.length;s<o.length;s++)n.push(1);for(let s=0;s<e;s++)s===0?n[t]=1:(n.splice(t,0,1),n.pop());return n}function R0(r,t,e){return e<=r?e:e-(t-1)}function D0(r,t){let e=[];for(let o=0;o<r;o++)e.push(t+o);return e}function IR(r,t,e,o,n,s,a,i,c){let p=r.length,l=new Array(p),u=new Array(p),m=new Array(p);if(t.length&&e>0){let f=t[0],d=e+1;l=F0(a,f,d,o,r),u=_0(i,f,d,n,r),m=A0(s,f,d,r)}else for(let f=0;f<p;f++)l[f]=P0(a,o,s,r,f,c),u[f]=L0(i,n,s,r,f,c),m[f]=O0(s,f,c);return{begin:l,end:u,strides:m}}function F0(r,t,e,o,n){let s=[...n],a=D0(e,t);for(let i=0;i<s.length;i++)if(a.indexOf(i)>-1)s[i]=0;else{let c=R0(t,e,i),p=o[c];r&1<<c&&(p=0),s[i]=p}return s}function _0(r,t,e,o,n){let s=[...n],a=D0(e,t);for(let i=0;i<s.length;i++)if(a.indexOf(i)>-1)s[i]=Number.MAX_SAFE_INTEGER;else{let c=R0(t,e,i),p=o[c];r&1<<c&&(p=Number.MAX_SAFE_INTEGER),s[i]=p}for(let i=0;i<s.length;i++){let c=n[i];s[i]<0&&(s[i]+=c),s[i]=rc(0,s[i],n[i])}return s}function O0(r,t,e){let o=r[t];return(e&1<<t||o==null)&&(o=1),o}function P0(r,t,e,o,n,s){let a=t[n],i=e[n]||1;(r&1<<n||s&1<<n||a==null)&&(i>0?a=Number.MIN_SAFE_INTEGER:a=Number.MAX_SAFE_INTEGER);let c=o[n];return a<0&&(a+=c),a=rc(0,a,c-1),a}function L0(r,t,e,o,n,s){let a=t[n],i=e[n]||1;(r&1<<n||s&1<<n||a==null)&&(i>0?a=Number.MAX_SAFE_INTEGER:a=Number.MIN_SAFE_INTEGER);let c=o[n];return a<0&&(a+=c),i>0?a=rc(0,a,c):a=rc(-1,a,c-1),a}function SR(r,t,e){let o=e.length;for(let n=0;n<e.length;n++)if(e[n]>1){o=n;break}for(let n=o+1;n<e.length;n++)if(t[n]>0||e[n]!==r[n])return!1;return!0}function vR(r,t){let e=r.length>0?r[r.length-1]:1;for(let o=0;o<r.length-1;o++)e+=r[o]*t[o];return e}function NR(r,t,e){let o,n=r.shape.length;typeof t=="number"?o=[t,...new Array(n-1).fill(0)]:t.length<n?o=t.concat(new Array(n-t.length).fill(0)):o=t.slice(),o.forEach(a=>{E(a!==-1,()=>"slice() does not support negative begin indexing.")});let s;return e==null?s=new Array(n).fill(-1):typeof e=="number"?s=[e,...new Array(n-1).fill(-1)]:e.length<n?s=e.concat(new Array(n-e.length).fill(-1)):s=e,s=s.map((a,i)=>a>=0?a:(E(a===-1,()=>`Negative size values should be exactly -1 but got ${a} for the slice() size at index ${i}.`),r.shape[i]-o[i])),[o,s]}function kR(r,t,e,o,n,s,a,i,c){let p;if(o==null?(p=new Array(t.length),p.fill(1)):p=o,a!=null&&(a&a-1)!==0)throw new Error("Multiple ellipses in slice is not allowed.");let l=!1,u={dims:p.length,numAddAxisAfterEllipsis:0,begin:t.slice(),end:e.slice(),strides:p.slice(),beginMask:n,endMask:s,ellipsisMask:a,newAxisMask:i,shrinkAxisMask:c};for(let w=0;w<u.dims;w++)l&&(1<<w&i)!==0&&u.numAddAxisAfterEllipsis++,1<<w&a&&(l=!0);l||(u.ellipsisMask|=1<<u.dims,u.dims++);let m={dims:r.length,beginMask:0,endMask:0,beginValid:!1,endValid:!1};ER(u,m);let f=!0,d=!0,h=!0,g=[],x=[];for(let w=0;w<r.length;++w){if(m.strides[w]===0)throw Error(`strides[${w}] must be non-zero`);let I=!!(m.shrinkAxisMask&1<<w),k=r[w];if(k===-1){g.push(I?1:-1);continue}let $=[m.beginMask&1<<w,m.endMask&1<<w],R=[m.strides[w]>0?0:-1,m.strides[w]>0?k:k-1];if(I&&m.strides[w]<=0)throw Error("only stride 1 allowed on non-range indexing.");h=h&&m.strides[w]===1;let D=!!(m.beginMask&1<<w&&m.endMask&1<<w);if(m.beginValid&&m.endValid){if(I){let M=m.begin[w]<0?k+m.begin[w]:m.begin[w];if(m.begin[w]=M,m.end[w]=m.begin[w]+1,M<0||M>=k)throw Error(`slice index ${m.begin[w]} of dimension ${w} out of bounds.`)}else m.begin[w]=$0(m.begin[w],0,m.strides[w],k,$,R),m.end[w]=$0(m.end[w],1,m.strides[w],k,$,R);let L=m.strides[w]===1&&m.begin[w]===0&&m.end[w]===k;f=f&&L,d=d&&(w===0&&m.strides[w]===1||L)}else f=f&&m.strides[w]===1&&D,d=d&&(w===0&&m.strides[w]===1||D);let _,O=!1;if(m.beginValid&&m.endValid?(_=m.end[w]-m.begin[w],O=!0):I?(_=1,O=!0):D&&k>=0&&(m.strides[w]<0?_=-k:_=k,O=!0),O){let L;_===0||_<0!=m.strides[w]<0?L=0:L=Math.trunc(_/m.strides[w])+(_%m.strides[w]!==0?1:0),g.push(L)}else g.push(-1)}for(let w=0;w<m.finalShapeGatherIndices.length;++w){let I=m.finalShapeGatherIndices[w];I>=0?x.push(g[I]):I===jh&&x.push(1)}return{finalShapeSparse:x.filter((w,I)=>m.finalShapeGatherIndices[I]!==jh),finalShape:x,isIdentity:f,sliceDim0:d,isSimpleSlice:h,begin:m.begin,end:m.end,strides:m.strides}}function ER(r,t){t.beginMask=0,t.endMask=0,t.shrinkAxisMask=0;let e=0;t.beginValid=r.begin!=null,t.endValid=r.end!=null,t.begin=new Array(t.dims),t.end=new Array(t.dims),t.strides=new Array(t.dims),t.finalShapeGatherIndices=[],t.finalShapeGatherIndicesSparse=[],t.inputShapeGatherIndicesSparse=new Array(t.dims);for(let o=0;o<r.dims;o++)if(1<<o&r.ellipsisMask){let n=Math.min(t.dims-(r.dims-o)+1+r.numAddAxisAfterEllipsis,t.dims);for(;e<n;e++)t.begin[e]=0,t.end[e]=0,t.strides[e]=1,t.beginMask|=1<<e,t.endMask|=1<<e,t.finalShapeGatherIndices.push(e),t.finalShapeGatherIndicesSparse.push(-1),t.inputShapeGatherIndicesSparse[e]=o}else if(1<<o&r.newAxisMask)t.finalShapeGatherIndices.push(jh),t.finalShapeGatherIndicesSparse.push(-1);else{if(e===t.begin.length)throw Error(`Index out of range using input dim ${e}; input has only ${t.dims} dims, ${t.begin.length}.`);r.begin!=null&&(t.begin[e]=r.begin[o]),r.end!=null&&(t.end[e]=r.end[o]),t.strides[e]=r.strides[o],r.beginMask&1<<o&&(t.beginMask|=1<<e),r.endMask&1<<o&&(t.endMask|=1<<e),r.shrinkAxisMask&1<<o?(t.finalShapeGatherIndices.push(bR),t.finalShapeGatherIndicesSparse.push(-1),t.shrinkAxisMask|=1<<e):(t.finalShapeGatherIndices.push(e),t.finalShapeGatherIndicesSparse.push(o)),t.inputShapeGatherIndicesSparse[e]=o,e++}}function $0(r,t,e,o,n,s){if(n[t])return e>0?s[t]:s[t+1&1];{let a=r<0?o+r:r;return a<s[0]?s[0]:a>s[1]?s[1]:a}}var Xh={};kt(Xh,{Serializable:()=>Mp,SerializationMap:()=>Wu,registerClass:()=>Me});var Mp=class{getClassName(){return this.constructor.className}static fromConfig(t,e){return new t(e)}},Wu=class r{constructor(){this.classNameMap={}}static getMap(){return r.instance==null&&(r.instance=new r),r.instance}static register(t){r.getMap().classNameMap[t.className]=[t,t.fromConfig]}};function Me(r){E(r.className!=null,()=>"Class being registered does not have the static className property defined."),E(typeof r.className=="string",()=>"className is required to be a string, but got type "+typeof r.className),E(r.className.length>0,()=>"Class being registered has an empty-string as its className, which is disallowed."),Wu.register(r)}var Jh={};kt(Jh,{TEST_EPSILON_FLOAT16:()=>M0,createVideoElement:()=>PR,encodeStrings:()=>B0,expectArrayBuffersEqual:()=>OR,expectArraysClose:()=>AR,expectArraysEqual:()=>DR,expectNumbersClose:()=>FR,expectPromiseToFail:()=>RR,expectValuesInRange:()=>_R,play:()=>LR,testEpsilon:()=>Zh});var $R=.001,M0=.1;function AR(r,t,e){return e==null&&(e=Zh()),Yh(r,t,(o,n)=>Qh(o,n,e))}function Zh(){return N.backend.floatPrecision()===32?$R:M0}function Yh(r,t,e){let o=!0;if((ie(r)||ie(t))&&(o=!1),ie(r)&&ie(t)&&(o=!0),o){let a=r.constructor.name,i=t.constructor.name;if(a!==i)throw new Error(`Arrays are of different type. Actual: ${a}. Expected: ${i}`)}if(Array.isArray(r)&&Array.isArray(t)){let a=Ce(r),i=Ce(t);if(!ze(a,i))throw new Error(`Arrays have different shapes. Actual: [${a}]. Expected: [${i}]`)}let n=ie(r)?r:Er(r),s=ie(t)?t:Er(t);if(n.length!==s.length)throw new Error(`Arrays have different lengths actual: ${n.length} vs expected: ${s.length}.
Actual:   ${n}.
Expected: ${s}.`);for(let a=0;a<s.length;++a){let i=n[a],c=s[a];if(!e(i,c))throw new Error(`Arrays differ: actual[${a}] = ${i}, expected[${a}] = ${c}.
Actual:   ${n}.
Expected: ${s}.`)}typeof expect<"u"&&expect().nothing()}function RR(r,t){r().then(()=>t.fail(),()=>t()),typeof expect<"u"&&expect().nothing()}function DR(r,t){let e=typeof t=="string"||typeof t=="number"||typeof t=="boolean"?[t]:t;return $r(r)||$r(r[0])||$r(t)||$r(t[0])?Yh(r,e,(o,n)=>o==n):Yh(r,t,(o,n)=>Qh(o,n,0))}function FR(r,t,e){if(e==null&&(e=Zh()),!Qh(r,t,e))throw new Error(`Numbers differ: actual === ${r}, expected === ${t}`);typeof expect<"u"&&expect().nothing()}function Qh(r,t,e){return!isFinite(r)&&!isFinite(t)?!0:!(isNaN(r)||isNaN(t)||Math.abs(r-t)>e)}function _R(r,t,e){for(let o=0;o<r.length;o++)if(r[o]<t||r[o]>e)throw new Error(`Value out of range:${r[o]} low: ${t}, high: ${e}`)}function OR(r,t){let e=new Float32Array(r),o=new Float32Array(t);if(e.length!==o.length)throw new Error(`Expected ArrayBuffer to be of length ${o.length}, but it was ${e.length}`);for(let n=0;n<o.length;n++)if(e[n]!==o[n])throw new Error(`Expected ArrayBuffer value at ${n} to be ${o[n]} but got ${e[n]} instead`)}function B0(r){for(let t=0;t<r.length;t++){let e=r[t];Array.isArray(e)?B0(e):r[t]=Wn(e)}return r}function PR(r){let t=document.createElement("video");return"playsInline"in t&&(t.playsInline=!0),t.muted=!0,t.loop=!0,t.style.position="fixed",t.style.left="0px",t.style.top="0px",t.preload="auto",t.appendChild(r),new Promise(e=>{t.addEventListener("loadeddata",o=>e(t)),t.load()})}async function LR(r){await r.play(),"requestVideoFrameCallback"in r&&await new Promise(t=>{r.requestVideoFrameCallback(t)})}var V0="3.21.0";function MR(r,t){let e=T(r,"a","add"),o=T(t,"b","add");[e,o]=xt(e,o);let n={a:e,b:o};return N.runKernel("Add",n)}var ot=S({add_:MR});function BR(r,t){let e=T(r,"a","floorDiv"),o=T(t,"b","floorDiv");[e,o]=xt(e,o);let n={a:e,b:o};return N.runKernel(ln,n)}var ii=S({floorDiv_:BR});function VR(r,t){let e=T(r,"a","div"),o=T(t,"b","div");if([e,o]=xt(e,o),e.dtype==="int32"&&o.dtype==="int32")return ii(e,o);let n={a:e,b:o},s={};return N.runKernel(sn,n,s)}var Ct=S({div_:VR});function GR(r,t){let e=T(r,"a","mul"),o=T(t,"b","mul");[e,o]=xt(e,o);let n={a:e,b:o};return N.runKernel(Sn,n)}var j=S({mul_:GR});function UR(r){let t=T(r,"x","abs");if(t.dtype==="complex64"){let e={x:t};return N.runKernel(Ss,e)}else{let e={x:t};return N.runKernel("Abs",e)}}var ne=S({abs_:UR});function zR(r){let e={x:T(r,"x","acos")};return N.runKernel(Xo,e)}var Bp=S({acos_:zR});function WR(r){let e={x:T(r,"x","acosh")};return N.runKernel(Yo,e)}var Vp=S({acosh_:WR});function HR(r){E(Array.isArray(r),()=>"The argument passed to tf.addN() must be a list of tensors"),E(r.length>=1,()=>`Must pass at least one tensor to tf.addN(), but got ${r.length}`);let t=r.map((n,s)=>T(n,`tensors${s}`,"addN")),e=t[0];t.forEach(n=>{if(n.dtype!==e.dtype)throw new Error("All tensors passed to tf.addN() must have the same dtype")}),t.forEach(n=>{if(!ze(n.shape,e.shape))throw new Error("All tensors passed to tf.addN() must have the same shape")});let o=t;return N.runKernel(ds,o)}var tg=S({addN_:HR});function qR(r,t=null,e=!1){let n={x:T(r,"x","all","bool")},s={axis:t,keepDims:e};return N.runKernel("All",n,s)}var Gp=S({all_:qR});function KR(r,t=null,e=!1){let n={x:T(r,"x","any","bool")},s={axis:t,keepDims:e};return N.runKernel("Any",n,s)}var Up=S({any_:KR});function jR(r,t=0){let o={x:T(r,"x","argMax")},n={axis:t};return N.runKernel(hs,o,n)}var zp=S({argMax_:jR});function XR(r,t=0){let o={x:T(r,"x","argMin")},n={axis:t};return N.runKernel(gs,o,n)}var Wp=S({argMin_:XR});function YR(r){let e={x:T(r,"x","asin")};return N.runKernel(Zo,e)}var Hp=S({asin_:YR});function ZR(r){let e={x:T(r,"x","asinh")};return N.runKernel(Qo,e)}var qp=S({asinh_:ZR});function QR(r){let e={x:T(r,"x","atan")};return N.runKernel(Jo,e)}var Kp=S({atan_:QR});function JR(r,t){let e=T(r,"a","atan2"),o=T(t,"b","atan2");[e,o]=xt(e,o);let n={a:e,b:o};return N.runKernel(en,n)}var jp=S({atan2_:JR});function tD(r){let e={x:T(r,"x","atanh")};return N.runKernel(tn,e)}var Xp=S({atanh_:tD});function eD(r,t,e,o,n="NHWC",s){let a=r[3],i=[...t,a],c=U0(n);return li(r,i,e,s,o,null,null,c)}function rg(r,t,e,o,n,s,a="channelsLast"){let[i,c]=Hu(t),p;if(a==="channelsLast")p=[i,c,r[3],r[3]];else if(a==="channelsFirst")p=[i,c,r[1],r[1]];else throw new Error(`Unknown dataFormat ${a}`);return li(r,p,e,o,n,s,!1,a)}function rD(r,t,e,o,n,s,a="NDHWC"){let[i,c,p]=eg(t),l,u;if(a==="NDHWC")u="channelsLast",l=[i,c,p,r[4],r[4]];else if(a==="NCDHW")u="channelsFirst",l=[i,c,p,r[1],r[1]];else throw new Error(`Unknown dataFormat ${a}`);return G0(r,l,e,o,n,!1,u,s)}function li(r,t,e,o,n,s,a=!1,i="channelsLast"){let[c,p,l,u]=[-1,-1,-1,-1];if(i==="channelsLast")[c,p,l,u]=r;else if(i==="channelsFirst")[c,u,p,l]=r;else throw new Error(`Unknown dataFormat ${i}`);let[m,f,,d]=t,[h,g]=Hu(e),[x,b]=Hu(o),w=$c(m,x),I=$c(f,b),{padInfo:k,outHeight:$,outWidth:R}=sD(n,p,l,h,g,w,I,s,i),D=a?d*u:d,_;return i==="channelsFirst"?_=[c,D,$,R]:i==="channelsLast"&&(_=[c,$,R,D]),{batchSize:c,dataFormat:i,inHeight:p,inWidth:l,inChannels:u,outHeight:$,outWidth:R,outChannels:D,padInfo:k,strideHeight:h,strideWidth:g,filterHeight:m,filterWidth:f,effectiveFilterHeight:w,effectiveFilterWidth:I,dilationHeight:x,dilationWidth:b,inShape:r,outShape:_,filterShape:t}}function G0(r,t,e,o,n,s=!1,a="channelsLast",i){let[c,p,l,u,m]=[-1,-1,-1,-1,-1];if(a==="channelsLast")[c,p,l,u,m]=r;else if(a==="channelsFirst")[c,m,p,l,u]=r;else throw new Error(`Unknown dataFormat ${a}`);let[f,d,h,,g]=t,[x,b,w]=eg(e),[I,k,$]=eg(o),R=$c(f,I),D=$c(d,k),_=$c(h,$),{padInfo:O,outDepth:L,outHeight:M,outWidth:B}=aD(n,p,l,u,x,b,w,R,D,_,i),G=s?g*m:g,V;return a==="channelsFirst"?V=[c,G,L,M,B]:a==="channelsLast"&&(V=[c,L,M,B,G]),{batchSize:c,dataFormat:a,inDepth:p,inHeight:l,inWidth:u,inChannels:m,outDepth:L,outHeight:M,outWidth:B,outChannels:G,padInfo:O,strideDepth:x,strideHeight:b,strideWidth:w,filterDepth:f,filterHeight:d,filterWidth:h,effectiveFilterDepth:R,effectiveFilterHeight:D,effectiveFilterWidth:_,dilationDepth:I,dilationHeight:k,dilationWidth:$,inShape:r,outShape:V,filterShape:t}}function oD(r,t,e,o,n){o==null&&(o=og(r,t,e));let s=r[0],a=r[1],i=ci((s-t+2*o)/e+1,n),c=ci((a-t+2*o)/e+1,n);return[i,c]}function nD(r,t,e,o,n,s){n==null&&(n=og(r,t,o));let a=r[0],i=r[1],c=r[2],p=ci((a-t+2*n)/o+1,s),l=ci((i-t+2*n)/o+1,s),u=ci((c-t+2*n)/o+1,s);return[p,l,u,e]}function og(r,t,e,o=1){let n=$c(t,o);return Math.floor((r[0]*(e-1)-e+n)/2)}function Hu(r){return typeof r=="number"?[r,r,r]:r.length===2?[r[0],r[1],1]:r}function eg(r){return typeof r=="number"?[r,r,r]:r}function $c(r,t){return t<=1?r:r+(r-1)*(t-1)}function sD(r,t,e,o,n,s,a,i,c){let p,l,u;if(typeof r=="number"){p={top:r,bottom:r,left:r,right:r,type:r===0?"VALID":"NUMBER"};let f=oD([t,e],s,o,r,i);l=f[0],u=f[1]}else if(r==="same"){l=Math.ceil(t/o),u=Math.ceil(e/n);let m=Math.max(0,(l-1)*o+s-t),f=Math.max(0,(u-1)*n+a-e),d=Math.floor(m/2),h=m-d,g=Math.floor(f/2),x=f-g;p={top:d,bottom:h,left:g,right:x,type:"SAME"}}else if(r==="valid")p={top:0,bottom:0,left:0,right:0,type:"VALID"},l=Math.ceil((t-s+1)/o),u=Math.ceil((e-a+1)/n);else if(typeof r=="object"){let m=c==="channelsLast"?r[1][0]:r[2][0],f=c==="channelsLast"?r[1][1]:r[2][1],d=c==="channelsLast"?r[2][0]:r[3][0],h=c==="channelsLast"?r[2][1]:r[3][1];p={top:m,bottom:f,left:d,right:h,type:m===0&&f===0&&d===0&&h===0?"VALID":"EXPLICIT"},l=ci((t-s+m+f)/o+1,i),u=ci((e-a+d+h)/n+1,i)}else throw Error(`Unknown padding parameter: ${r}`);return{padInfo:p,outHeight:l,outWidth:u}}function aD(r,t,e,o,n,s,a,i,c,p,l){let u,m,f,d;if(typeof r=="number"){u={top:r,bottom:r,left:r,right:r,front:r,back:r,type:r===0?"VALID":"NUMBER"};let g=nD([t,e,o,1],i,1,n,r,l);m=g[0],f=g[1],d=g[2]}else if(r==="same"){m=Math.ceil(t/n),f=Math.ceil(e/s),d=Math.ceil(o/a);let h=(m-1)*n+i-t,g=(f-1)*s+c-e,x=(d-1)*a+p-o,b=Math.floor(h/2),w=h-b,I=Math.floor(g/2),k=g-I,$=Math.floor(x/2),R=x-$;u={top:I,bottom:k,left:$,right:R,front:b,back:w,type:"SAME"}}else if(r==="valid")u={top:0,bottom:0,left:0,right:0,front:0,back:0,type:"VALID"},m=Math.ceil((t-i+1)/n),f=Math.ceil((e-c+1)/s),d=Math.ceil((o-p+1)/a);else throw Error(`Unknown padding parameter: ${r}`);return{padInfo:u,outDepth:m,outHeight:f,outWidth:d}}function ci(r,t){if(!t)return Math.trunc(r);switch(t){case"round":return Math.round(r);case"ceil":return Math.ceil(r);case"floor":return Math.floor(r);default:throw new Error(`Unknown roundingMode ${t}`)}}function pi(r){let[t,e,o]=Hu(r);return t===1&&e===1&&o===1}function Ne(r,t){return pi(r)||pi(t)}function U0(r){if(r==="NHWC")return"channelsLast";if(r==="NCHW")return"channelsFirst";throw new Error(`Unknown dataFormat ${r}`)}function re(r,t,e){if(e!=null){if(typeof t=="string")throw Error(`Error in ${r}: pad must be an integer when using dimRoundingMode ${e} but got pad ${t}.`);if(typeof t=="number")E(yo(t),()=>`Error in ${r}: pad must be an integer when using dimRoundingMode ${e} but got pad ${t}.`);else if(typeof t=="object")t.forEach(o=>{o.forEach(n=>{E(yo(n),()=>`Error in ${r}: pad must be an integer when using dimRoundingMode ${e} but got pad ${n}.`)})});else throw Error(`Error in ${r}: Unknown padding parameter: ${t}`)}}function iD(r,t){let o={x:T(r,"x","reshape","string_or_numeric")},n={shape:t};return N.runKernel(Sa,o,n)}var P=S({reshape_:iD});function cD(r,t,e,o,n){let s=T(r,"x","avgPool","float32"),a=1;E(Ne(e,a),()=>`Error in avgPool: Either strides or dilations must be 1. Got strides ${e} and dilations '${a}'`);let i=s,c=!1;s.rank===3&&(c=!0,i=P(s,[1,s.shape[0],s.shape[1],s.shape[2]])),E(i.rank===4,()=>`Error in avgPool: x must be rank 4 but got rank ${i.rank}.`),re("avgPool",o,n);let p={x:i},l={filterSize:t,strides:e,pad:o,dimRoundingMode:n},u=N.runKernel(xs,p,l);return u=dt(u,s.dtype),c?P(u,[u.shape[1],u.shape[2],u.shape[3]]):u}var ui=S({avgPool_:cD});function pD(r,t,e,o,n,s="NDHWC"){let a=T(r,"x","avgPool3d","float32"),i=a,c=!1;a.rank===4&&(c=!0,i=P(a,[1,a.shape[0],a.shape[1],a.shape[2],a.shape[3]])),E(i.rank===5,()=>`Error in avgPool3d: x must be rank 5 but got rank ${i.rank}.`),E(s==="NDHWC",()=>`Error in avgPool3d: Only NDHWC is currently supported, but got dataFormat of ${s}`),re("avgPool3d",o,n);let p={x:i},l={filterSize:t,strides:e,pad:o,dimRoundingMode:n,dataFormat:s},u=N.runKernel(ys,p,l);return u=dt(u,i.dtype),c?P(u,[u.shape[1],u.shape[2],u.shape[3],u.shape[4]]):u}var ng=S({avgPool3d_:pD});function lD(r,t=0){E(r.length>=1,()=>"Pass at least one tensor to concat");let e=vo(r,"tensors","concat","string_or_numeric");if(e[0].dtype==="complex64"&&e.forEach(s=>{if(s.dtype!=="complex64")throw new Error(`Cannot concatenate complex64 tensors with a tensor
          with dtype ${s.dtype}. `)}),e.length===1)return Le(e[0]);let o=e,n={axis:t};return N.runKernel(vs,o,n)}var Ot=S({concat_:lD});function uD(r){let e={x:T(r,"x","sigmoid","float32")};return N.runKernel(_n,e)}var rr=S({sigmoid_:uD});function mD(r,t,e){let o=T(r,"x","slice","string_or_numeric");if(o.rank===0)throw new Error("Slicing scalar is not possible");let n={x:o},s={begin:t,size:e};return N.runKernel(Ra,n,s)}var yt=S({slice_:mD});function fD(r){let e={x:T(r,"x","tanh","float32")};return N.runKernel(Mn,e)}var jn=S({tanh_:fD});function dD(r,t,e,o,n,s){let a=T(r,"forgetBias","basicLSTMCell"),i=T(t,"lstmKernel","basicLSTMCell"),c=T(e,"lstmBias","basicLSTMCell"),p=T(o,"data","basicLSTMCell"),l=T(n,"c","basicLSTMCell"),u=T(s,"h","basicLSTMCell"),m=Ot([p,u],1),f=St(m,i),d=ot(f,c),h=d.shape[0],g=d.shape[1]/4,x=[h,g],b=yt(d,[0,0],x),w=yt(d,[0,g],x),I=yt(d,[0,g*2],x),k=yt(d,[0,g*3],x),$=ot(j(rr(b),jn(w)),j(l,rr(ot(a,I)))),R=j(jn($),rr(k));return[$,R]}var sg=S({basicLSTMCell_:dD});function hD(r,t,e){let o=T(r,"x","batchToSpaceND"),n=t.reduce((i,c)=>i*c);E(o.rank>=1+t.length,()=>`input rank is ${o.rank} but should be > than blockShape.length ${t.length}`),E(e.length===t.length,()=>`crops.length is ${e.length} but should be equal to blockShape.length  ${t.length}`),E(o.shape[0]%n===0,()=>`input tensor batch is ${o.shape[0]} but is not divisible by the product of the elements of blockShape ${t.join(" * ")} === ${n}`);let s={x:o},a={blockShape:t,crops:e};return N.runKernel(Cs,s,a)}var mi=S({batchToSpaceND_:hD});function z0(r){let t;return r.rank===0||r.rank===1?t=P(r,[1,1,1,r.size]):r.rank===2?t=P(r,[1,1,r.shape[0],r.shape[1]]):r.rank===3?t=P(r,[1,r.shape[0],r.shape[1],r.shape[2]]):t=r,t}function gD(r,t,e,o,n,s){s==null&&(s=.001);let a=T(r,"x","batchNorm"),i=T(t,"mean","batchNorm"),c=T(e,"variance","batchNorm"),p;n!=null&&(p=T(n,"scale","batchNorm"));let l;o!=null&&(l=T(o,"offset","batchNorm")),E(i.rank===c.rank,()=>"Batch normalization gradient requires mean and variance to have equal ranks."),E(l==null||i.rank===l.rank,()=>"Batch normalization gradient requires mean and offset to have equal ranks."),E(p==null||i.rank===p.rank,()=>"Batch normalization gradient requires mean and scale to have equal ranks.");let m={x:z0(a),scale:p,offset:l,mean:i,variance:c},f={varianceEpsilon:s},d=N.runKernel(Xs,m,f);return P(d,a.shape)}var Or=S({batchNorm_:gD});function xD(r,t,e,o,n,s){let a=T(r,"x","batchNorm"),i=T(t,"mean","batchNorm"),c=T(e,"variance","batchNorm"),p;n!=null&&(p=T(n,"scale","batchNorm"));let l;return o!=null&&(l=T(o,"offset","batchNorm")),E(a.rank===2,()=>`Error in batchNorm2D: x must be rank 2 but got rank ${a.rank}.`),E(i.rank===2||i.rank===1,()=>`Error in batchNorm2D: mean must be rank 2 or rank 1 but got rank ${i.rank}.`),E(c.rank===2||c.rank===1,()=>`Error in batchNorm2D: variance must be rank 2 or rank 1 but got rank ${c.rank}.`),p!=null&&E(p.rank===2||p.rank===1,()=>`Error in batchNorm2D: scale must be rank 2 or rank 1 but got rank ${p.rank}.`),l!=null&&E(l.rank===2||l.rank===1,()=>`Error in batchNorm2D: offset must be rank 2 or rank 1 but got rank ${l.rank}.`),Or(a,i,c,l,p,s)}var ag=S({batchNorm2d_:xD});function yD(r,t,e,o,n,s){let a=T(r,"x","batchNorm"),i=T(t,"mean","batchNorm"),c=T(e,"variance","batchNorm"),p;n!=null&&(p=T(n,"scale","batchNorm"));let l;return o!=null&&(l=T(o,"offset","batchNorm")),E(a.rank===3,()=>`Error in batchNorm3D: x must be rank 3 but got rank ${a.rank}.`),E(i.rank===3||i.rank===1,()=>`Error in batchNorm3D: mean must be rank 3 or rank 1 but got rank ${i.rank}.`),E(c.rank===3||c.rank===1,()=>`Error in batchNorm3D: variance must be rank 3 or rank 1 but got rank ${c.rank}.`),p!=null&&E(p.rank===3||p.rank===1,()=>`Error in batchNorm3D: scale must be rank 3 or rank 1 but got rank ${p.rank}.`),l!=null&&E(l.rank===3||l.rank===1,()=>`Error in batchNorm3D: offset must be rank 3 or rank 1 but got rank ${l.rank}.`),Or(a,i,c,l,p,s)}var ig=S({batchNorm3d_:yD});function bD(r,t,e,o,n,s){let a=T(r,"x","batchNorm"),i=T(t,"mean","batchNorm"),c=T(e,"variance","batchNorm"),p;n!=null&&(p=T(n,"scale","batchNorm"));let l;return o!=null&&(l=T(o,"offset","batchNorm")),E(a.rank===4,()=>`Error in batchNorm4D: x must be rank 4 but got rank ${a.rank}.`),E(i.rank===4||i.rank===1,()=>`Error in batchNorm4D: mean must be rank 4 or rank 1 but got rank ${i.rank}.`),E(c.rank===4||c.rank===1,()=>`Error in batchNorm4D: variance must be rank 4 or rank 1 but got rank ${c.rank}.`),p!=null&&E(p.rank===4||p.rank===1,()=>`Error in batchNorm4D: scale must be rank 4 or rank 1 but got rank ${p.rank}.`),l!=null&&E(l.rank===4||l.rank===1,()=>`Error in batchNorm4D: offset must be rank 4 or rank 1 but got rank ${l.rank}.`),Or(a,i,c,l,p,s)}var cg=S({batchNorm4d_:bD});function CD(r,t,e){let o=T(r,"x","bincount"),n=T(t,"weights","bincount");E(o.dtype==="int32",()=>`Error in bincount: input dtype must be int32, but got ${o.dtype}`),E(e>=0,()=>`size must be non-negative, but got ${e}.`),E(n.size===o.size||n.size===0,()=>`Error in bincount: weights must have the same size as input or0-length, but got input shape: ${o.shape}, weights shape: ${n.shape}.`);let s={x:o,weights:n},a={size:e};return N.runKernel(Ts,s,a)}var Yp=S({bincount_:CD});function TD(r,t){let e=T(r,"s0","broadcastArgs","int32"),o=T(t,"s1","broadcastArgs","int32");if(e.rank!==1)throw new Error(`broadcastArgs(): first input must be a vector (rank=1). Has rank ${e.rank}`);if(o.rank!==1)throw new Error(`broadcastArgs(): second input must be a vector (rank=1). Has rank ${o.rank}`);let n={s0:e,s1:o};return N.runKernel(ws,n)}var pg=S({broadcastArgs_:TD});function wD(r,t){let e=T(r,"broadcastTo","x"),o=e.shape;if(t.some(p=>!(p>0)||p%1!==0))throw new Error(`broadcastTo(): Invalid broadcast shape [${t}].`);if(t.length<e.rank)throw new Error(`broadcastTo(): shape.length=${t.length} < input.rank=${e.rank}.`);if(t.length>e.rank){let p=e.shape.slice();for(;p.length<t.length;)p.unshift(1);e=P(e,p)}let n=e.shape,s=Array.from(t);for(let p=t.length-1;p>=0;p--)if(n[p]===t[p])s[p]=1;else if(e.shape[p]!==1)throw new Error(`broadcastTo(): [${o}] cannot be broadcast to [${t}].`);if(s.map((p,l)=>p>1?l:-1).filter(p=>p>=0).length===0)return Le(e);let i={x:e},c={reps:s};return N.runKernel(wo,i,c)}var Pr=S({broadcastTo_:wD});function ID(r){let e={x:T(r,"x","ceil","float32")};return N.runKernel(rn,e)}var Zp=S({ceil_:ID});function Lr(r,t,e){let o={shape:r,value:t,dtype:e};return N.runKernel(Ks,{},o)}function SD(r,t,e){let o=T(r,"x","clipByValue");if(E(t<=e,()=>`Error in clip: min (${t}) must be less than or equal to max (${e}).`),t===e)return Lr(o.shape,t,o.dtype);let n={x:o},s={clipValueMin:t,clipValueMax:e};return N.runKernel(on,n,s)}var Qp=S({clipByValue_:SD});function vD(r){return Ot(r,0)}var Jp=S({concat1d_:vD});function ND(r,t){return Ot(r,t)}var lg=S({concat2d_:ND});function kD(r,t){return Ot(r,t)}var ug=S({concat3d_:kD});function ED(r,t){return Ot(r,t)}var mg=S({concat4d_:ED});function $D(r,t,e,o,n="NHWC",s=[1,1],a){let i=T(r,"x","conv2d","float32"),c=T(t,"filter","conv2d","float32"),p=i,l=!1;i.rank===3&&(l=!0,p=P(i,[1,i.shape[0],i.shape[1],i.shape[2]])),E(p.rank===4,()=>`Error in conv2d: input must be rank 4, but got rank ${p.rank}.`),E(c.rank===4,()=>`Error in conv2d: filter must be rank 4, but got rank ${c.rank}.`),re("conv2d",o,a);let u=n==="NHWC"?p.shape[3]:p.shape[1];E(u===c.shape[2],()=>`Error in conv2d: depth of input (${u}) must match input depth for filter ${c.shape[2]}.`),E(Ne(e,s),()=>`Error in conv2D: Either strides or dilations must be 1. Got strides ${e} and dilations '${s}'`);let m={x:p,filter:c},f={strides:e,pad:o,dataFormat:n,dilations:s,dimRoundingMode:a},d=N.runKernel(Ns,m,f);return l?P(d,[d.shape[1],d.shape[2],d.shape[3]]):d}var Mr=S({conv2d_:$D});function AD(r,t,e,o,n="NWC",s=1,a){let i=T(r,"x","conv1d"),c=T(t,"filter","conv1d"),p=i,l=!1;i.rank===2&&(l=!0,p=P(i,[1,i.shape[0],i.shape[1]])),E(p.rank===3,()=>`Error in conv1d: input must be rank 3, but got rank ${p.rank}.`),E(c.rank===3,()=>`Error in conv1d: filter must be rank 3, but got rank ${c.rank}.`),re("conv1d",o,a),E(p.shape[2]===c.shape[1],()=>`Error in conv1d: depth of input (${p.shape[2]}) must match input depth for filter ${c.shape[1]}.`),E(Ne(e,s),()=>`Error in conv1D: Either stride or dilation must be 1. Got stride ${e} and dilation '${s}'`),E(n==="NWC",()=>`Error in conv1d: got dataFormat of ${n} but only NWC is currently supported.`);let u=P(c,[1,c.shape[0],c.shape[1],c.shape[2]]),m=P(p,[p.shape[0],1,p.shape[1],p.shape[2]]),g=Mr(m,u,[1,e],o,"NHWC",[1,s],a);return l?P(g,[g.shape[2],g.shape[3]]):P(g,[g.shape[0],g.shape[2],g.shape[3]])}var tl=S({conv1d_:AD});function RD(r,t,e,o,n,s="NHWC",a){E(r.length===t.rank,()=>`Length of inShape (${r.length}) and rank of dy (${t.rank}) must match`);let i=r,c=t,p=!1;t.rank===3&&(p=!0,c=P(t,[1,t.shape[0],t.shape[1],t.shape[2]]),i=[1,r[0],r[1],r[2]]),E(i.length===4,()=>`Error in conv2dDerInput: inShape must be length 4, but got length ${i.length}.`),E(c.rank===4,()=>`Error in conv2dDerInput: dy must be rank 4, but got rank ${c.rank}`),E(e.rank===4,()=>`Error in conv2dDerInput: filter must be rank 4, but got rank ${e.rank}`);let l=s==="NHWC"?i[3]:i[1],u=s==="NHWC"?c.shape[3]:c.shape[1];E(l===e.shape[2],()=>`Error in conv2dDerInput: depth of input (${l}) must match input depth for filter ${e.shape[2]}.`),E(u===e.shape[3],()=>`Error in conv2dDerInput: depth of output (${u}) must match output depth for filter ${e.shape[3]}.`),re("conv2dDerInput",n,a);let m={dy:c,filter:e},f={strides:o,pad:n,dataFormat:s,dimRoundingMode:a,inputShape:i},d=N.runKernel(Es,m,f);return p?P(d,[d.shape[1],d.shape[2],d.shape[3]]):d}var qu=S({conv2DBackpropInput_:RD});function DD(r,t,e,o,n,s){let a=T(r,"x","conv2dTranspose"),i=T(t,"filter","conv2dTranspose");return qu(e,a,i,o,n,"NHWC",s)}var el=S({conv2dTranspose_:DD});function FD(r,t,e,o,n="NDHWC",s=[1,1,1]){let a=T(r,"x","conv3d"),i=T(t,"filter","conv3d"),c=a,p=!1;a.rank===4&&(p=!0,c=P(a,[1,a.shape[0],a.shape[1],a.shape[2],a.shape[3]])),E(c.rank===5,()=>`Error in conv3d: input must be rank 5, but got rank ${c.rank}.`),E(i.rank===5,()=>`Error in conv3d: filter must be rank 5, but got rank ${i.rank}.`),E(c.shape[4]===i.shape[3],()=>`Error in conv3d: depth of input (${c.shape[4]}) must match input depth for filter ${i.shape[3]}.`),E(Ne(e,s),()=>`Error in conv3D: Either strides or dilations must be 1. Got strides ${e} and dilations '${s}'`),E(n==="NDHWC",()=>`Error in conv3d: got dataFormat of ${n} but only NDHWC is currently supported.`);let l={x:c,filter:i},u={strides:e,pad:o,dataFormat:n,dilations:s},m=N.runKernel($s,l,u);return p?P(m,[m.shape[1],m.shape[2],m.shape[3],m.shape[4]]):m}var fg=S({conv3d_:FD});function _D(r,t,e,o,n){E(r.length===t.rank,()=>`Length of inShape (${r.length}) and rank of dy (${t.rank}) must match`);let s=r,a=t,i=!1;t.rank===4&&(i=!0,a=P(t,[1,t.shape[0],t.shape[1],t.shape[2],t.shape[3]]),s=[1,r[0],r[1],r[2],r[3]]);let c=s[4],p=a.shape[4];E(s.length===5,()=>`Error in conv3dDerInput: inShape must be length 5, but got length ${s.length}.`),E(a.rank===5,()=>`Error in conv3dDerInput: dy must be rank 5, but got rank ${a.rank}`),E(e.rank===5,()=>`Error in conv3dDerInput: filter must be rank 5, but got rank ${e.rank}`),E(c===e.shape[3],()=>`Error in conv3dDerInput: depth of input (${c}) must match input depth for filter ${e.shape[3]}.`),E(p===e.shape[4],()=>`Error in conv3dDerInput: depth of output (${p}) must match output depth for filter ${e.shape[4]}.`);let l={dy:a,filter:e},u={pad:n,strides:o,inputShape:s},m=N.runKernel(As,l,u);return i?P(m,[m.shape[1],m.shape[2],m.shape[3],m.shape[4]]):m}var W0=S({conv3DBackpropInput_:_D});function OD(r,t,e,o,n){let s=T(r,"x","conv3dTranspose"),a=T(t,"filter","conv3dTranspose");return W0(e,s,a,o,n)}var dg=S({conv3dTranspose_:OD});function PD(r){let e={x:T(r,"x","cos","float32")};return N.runKernel("Cos",e)}var rl=S({cos_:PD});function LD(r){let e={x:T(r,"x","cosh","float32")};return N.runKernel(nn,e)}var ol=S({cosh_:LD});function MD(r,t=0,e=!1,o=!1){let s={x:T(r,"x","cumprod")},a={axis:t,exclusive:e,reverse:o};return N.runKernel(Ds,s,a)}var nl=S({cumprod_:MD});function BD(r,t=0,e=!1,o=!1){let s={x:T(r,"x","cumsum")},a={axis:t,exclusive:e,reverse:o};return N.runKernel(Fs,s,a)}var sl=S({cumsum_:BD});function VD(r,t,e,o=!1){let n=T(r,"x","denseBincount"),s=T(t,"weights","denseBincount");E(n.dtype==="int32",()=>`Error in denseBincount: input dtype must be int32, but got ${n.dtype}`),E(n.rank<=2,()=>`Error in denseBincount: input must be at most rank 2, but got rank ${n.rank}.`),E(e>=0,()=>`size must be non-negative, but got ${e}.`),E(s.size===n.size||s.size===0,()=>`Error in denseBincount: weights must have the same shape as x or 0-length, but got x shape: ${n.shape}, weights shape: ${s.shape}.`);let a={x:n,weights:s},i={size:e,binaryOutput:o};return N.runKernel(Os,a,i)}var hg=S({denseBincount_:VD});function GD(r,t,e="NHWC"){let o=T(r,"x","depthToSpace","float32"),n=e==="NHWC"?o.shape[1]:o.shape[2],s=e==="NHWC"?o.shape[2]:o.shape[3],a=e==="NHWC"?o.shape[3]:o.shape[1];E(t>1,()=>`blockSize should be > 1 for depthToSpace, but was: ${t}`),E(n*t>=0,()=>`Negative dimension size caused by overflow when multiplying
    ${n} and ${t}  for depthToSpace with input shape
    ${o.shape}`),E(s*t>=0,()=>`Negative dimension size caused by overflow when multiplying
    ${s} and ${t} for depthToSpace with input shape
        ${o.shape}`),E(a%(t*t)===0,()=>`Dimension size must be evenly divisible by ${t*t} but is ${a} for depthToSpace with input shape ${o.shape}`);let i={x:o},c={blockSize:t,dataFormat:e};return N.runKernel(Ps,i,c)}var al=S({depthToSpace_:GD});function UD(r,t,e,o,n="NHWC",s=[1,1],a){let i=T(r,"x","depthwiseConv2d","float32"),c=T(t,"filter","depthwiseConv2d","float32"),p=i,l=!1;i.rank===3&&(l=!0,p=P(i,[1,i.shape[0],i.shape[1],i.shape[2]])),E(p.rank===4,()=>`Error in depthwiseConv2d: input must be rank 4, but got rank ${p.rank}.`),E(c.rank===4,()=>`Error in depthwiseConv2d: filter must be rank 4, but got rank ${c.rank}.`);let u=n==="NHWC"?p.shape[3]:p.shape[1];E(u===c.shape[2],()=>`Error in depthwiseConv2d: number of input channels (${u}) must match the inChannels dimension in filter ${c.shape[2]}.`),re("depthwiseConv2d",o,a);let m={x:p,filter:c},f={strides:e,pad:o,dataFormat:n,dilations:s,dimRoundingMode:a},d=N.runKernel(Ls,m,f);return l?P(d,[d.shape[1],d.shape[2],d.shape[3]]):d}var $o=S({depthwiseConv2d_:UD});function zD(r){let e={x:T(r,"x","diag")};return N.runKernel(Vs,e)}var gg=S({diag_:zD});function WD(r,t,e,o,n=[1,1],s="NHWC"){let a=T(r,"x","dilation2d"),i=T(t,"filter","dilation2d");E(a.rank===3||a.rank===4,()=>`Error in dilation2d: input must be rank 3 or 4, but got rank ${a.rank}.`),E(i.rank===3,()=>`Error in dilation2d: filter must be rank 3, but got rank ${i.rank}.`),E(s==="NHWC",()=>`Error in dilation2d: Only NHWC is currently supported, but got dataFormat of ${s}`);let c=a,p=!1;a.rank===3&&(c=P(a,[1,a.shape[0],a.shape[1],a.shape[2]]),p=!0);let l={x:c,filter:i},u={strides:e,pad:o,dilations:n},m=N.runKernel(Gs,l,u);return p?P(m,[m.shape[1],m.shape[2],m.shape[3]]):m}var il=S({dilation2d_:WD});function HD(r,t){let e=T(r,"a","equal","string_or_numeric"),o=T(t,"b","equal","string_or_numeric");[e,o]=xt(e,o),At(e.shape,o.shape);let n={a:e,b:o};return N.runKernel(an,n)}var fi=S({equal_:HD});function qD(r,t,e){let o=T(t,"a","where"),n=T(e,"b","where"),s=T(r,"condition","where","bool"),a=At(At(s.shape,o.shape),n.shape),i=Pr(s,a),c=Pr(o,a),p=Pr(n,a),l={condition:i,t:c,e:p};return N.runKernel(Aa,l)}var je=S({where_:qD});function KD(r){let e={x:T(r,"x","zerosLike")};return N.runKernel(Qa,e)}var Jt=S({zerosLike_:KD});function jD(r,t){let e=T(r,"a","div"),o=T(t,"b","div");[e,o]=xt(e,o);let n=Ct(e,o),s=Jt(n),a=fi(o,s);return je(a,s,n)}var cl=S({divNoNan_:jD});function XD(r,t){let e=T(r,"t1","dot"),o=T(t,"t2","dot");E((e.rank===1||e.rank===2)&&(o.rank===1||o.rank===2),()=>`Error in dot: inputs must all be rank 1 or 2, but got ranks ${e.rank} and ${o.rank}.`);let n=e.rank===1?e.size:e.shape[1],s=o.rank===1?o.size:o.shape[0];if(E(n===s,()=>`Error in dot: inner dimensions of inputs must match, but got ${n} and ${s}.`),e.rank===1&&o.rank===1){let a=P(e,[1,-1]),i=P(o,[-1,1]),c=St(a,i);return P(c,[])}else if(e.rank===1&&o.rank===2){let a=P(e,[1,-1]),i=P(o,[o.shape[0],o.shape[1]]),c=St(a,i);return P(c,[c.size])}else if(e.rank===2&&o.rank===1){let a=P(o,[-1,1]),i=St(e,a);return P(i,[i.size])}else{let a=P(o,[o.shape[0],o.shape[1]]);return St(e,a)}}var pl=S({dot_:XD});function YD(r,...t){let e=t.map((n,s)=>T(n,`tensors${s}`,"einsum")),o={equation:r};return N.runKernel(Us,e,o)}var xg=S({einsum_:YD});function ZD(r){let e={x:T(r,"x","elu","float32")};return N.runKernel("Elu",e)}var di=S({elu_:ZD});function QD(r){let t=T(r,"x","erf");E(t.dtype==="int32"||t.dtype==="float32",()=>"Input dtype must be `int32` or `float32`."),t.dtype==="int32"&&(t=dt(t,"float32"));let e={x:t};return N.runKernel("Erf",e)}var ll=S({erf_:QD});function yg(r,t){for(let e=0;e<r.length;++e)if(r[r.length-e-1]!==t-1-e)return!1;return!0}function H0(r,t,e){let o=r.length+t.length,n=[],s=0,a=0;for(let i=0;i<o;i++)e.indexOf(i)===-1?n.push(r[s++]):n.push(t[a++]);return n}function JD(r,t){let e=[],o=r.length;for(let s=0;s<o;s++)t.indexOf(s)===-1&&e.push(r[s]);let n=t.map(s=>r[s]);return[e,n]}function Ao(r,t){let e=t.map(o=>1);return H0(r,e,t)}function tF(r,t,e){E(yg(t,e),()=>`${r} supports only inner-most axes for now. Got axes ${t} and rank-${e} input.`)}function eF(r,t){if(yg(r,t))return null;let e=[];for(let o=0;o<t;++o)r.indexOf(o)===-1&&e.push(o);return r.forEach(o=>e.push(o)),e}function rF(r){return r.map((t,e)=>[e,t]).sort((t,e)=>t[1]-e[1]).map(t=>t[0])}function oF(r,t){let e=[];for(let o=t-r;o<t;++o)e.push(o);return e}function sF(r,t=null,e=!1){let n={x:T(r,"x","max")},s={reductionIndices:t,keepDims:e};return N.runKernel("Max",n,s)}var or=S({max_:sF});function aF(r,t=null,e=!1){let n={x:T(r,"x","min")},s={axis:t,keepDims:e};return N.runKernel("Min",n,s)}var Xn=S({min_:aF});function iF(r,t){let e=T(r,"base","pow"),o=T(t,"exp","pow");[e,o]=xt(e,o);let n={a:e,b:o};return N.runKernel("Pow",n)}var mr=S({pow_:iF});function it(r,t){if((ie(r)&&t!=="string"||Array.isArray(r))&&t!=="complex64")throw new Error("Error creating a new Scalar: value must be a primitive (number|boolean|string)");if(t==="string"&&ie(r)&&!(r instanceof Uint8Array))throw new Error("When making a scalar from encoded string, the value must be `Uint8Array`.");return De(r,[],[],t)}function cF(r){let e={x:T(r,"x","sqrt","float32")};return N.runKernel(Pn,e)}var Te=S({sqrt_:cF});function pF(r){let t=T(r,"x","square"),e={};return N.runKernel("Square",{x:t},e)}var se=S({square_:pF});function lF(r,t=null,e=!1){let o=T(r,"x","sum");o.dtype==="bool"&&(o=dt(o,"int32"));let n={x:o},s={axis:t,keepDims:e};return N.runKernel("Sum",n,s)}var vt=S({sum_:lF});function uF(r,t="euclidean",e=null,o=!1){r=T(r,"x","norm");let n=q0(r,t,e),s=n.shape;if(o){let a=jo(e,r.shape);s=Ao(n.shape,a)}return P(n,s)}function q0(r,t,e=null){if(r.rank===0)return ne(r);if(r.rank!==1&&e===null)return q0(P(r,[-1]),t,e);if(r.rank===1||typeof e=="number"||Array.isArray(e)&&e.length===1){if(t===1)return vt(ne(r),e);if(t===1/0)return or(ne(r),e);if(t===-1/0)return Xn(ne(r),e);if(t==="euclidean"||t===2)return Te(vt(mr(ne(r),it(2,"int32")),e));throw new Error(`Error in norm: invalid ord value: ${t}`)}if(Array.isArray(e)&&e.length===2){if(t===1)return or(vt(ne(r),e[0]),e[1]-1);if(t===1/0)return or(vt(ne(r),e[1]),e[0]);if(t===-1/0)return Xn(vt(ne(r),e[1]),e[0]);if(t==="fro"||t==="euclidean")return Te(vt(se(r),e));throw new Error(`Error in norm: invalid ord value: ${t}`)}throw new Error(`Error in norm: invalid axis: ${e}`)}var oo=S({norm_:uF});function mF(r,t=null,e=!1){return oo(r,"euclidean",t,e)}var ul=S({euclideanNorm_:mF});function fF(r){let e={x:T(r,"x","exp")};return N.runKernel("Exp",e)}var Be=S({exp_:fF});function dF(r,t=0){let e=T(r,"x","expandDims","string_or_numeric");E(t<=e.rank,()=>"Axis must be <= rank of the tensor");let o={input:e},n={dim:t};return N.runKernel(qs,o,n)}var Xe=S({expandDims_:dF});function hF(r){let e={x:T(r,"x","expm1")};return N.runKernel(cn,e)}var ml=S({expm1_:hF});function gF(r,t){let e=T(r,"x","tile","string_or_numeric");E(e.rank===t.length,()=>`Error in transpose: rank of input ${e.rank} must match length of reps ${t}.`);let o={x:e},n={reps:t};return N.runKernel(wo,o,n)}var Br=S({tile_:gF});function xF(r,t,e,o="float32"){t==null&&(t=r);let n=rt([r,t],o),s=r<=t?r:t;for(let i=0;i<s;++i)n.set(1,i,i);let a=P(n.toTensor(),[r,t]);if(e==null)return a;if(e.length===1)return Br(Xe(a,0),[e[0],1,1]);if(e.length===2)return Br(Xe(Xe(a,0),0),[e[0],e[1],1,1]);if(e.length===3)return Br(Xe(Xe(Xe(a,0),0),0),[e[0],e[1],e[2],1,1]);throw new Error(`eye() currently supports only 1D and 2D batchShapes, but received ${e.length}D.`)}var fl=S({eye_:xF});function yF(r){let e={x:T(r,"x","floor","float32")};return N.runKernel(pn,e)}var hi=S({floor_:yF});function bF(r,t,e=0,o=0){let n=T(r,"x","gather"),s=T(t,"indices","gather","int32"),a={x:n,indices:s},i={axis:e,batchDims:o};return N.runKernel(Ys,a,i)}var gi=S({gather_:bF});function CF(r,t){let e=T(r,"a","greater","string_or_numeric"),o=T(t,"b","greater","string_or_numeric");[e,o]=xt(e,o),At(e.shape,o.shape);let n={a:e,b:o};return N.runKernel(un,n)}var no=S({greater_:CF});function TF(r,t){let e=T(r,"a","greaterEqual","string_or_numeric"),o=T(t,"b","greaterEqual","string_or_numeric");[e,o]=xt(e,o),At(e.shape,o.shape);let n={a:e,b:o};return N.runKernel(mn,n)}var xi=S({greaterEqual_:TF});function wF(r){let e={x:T(r,"x","isFinite")};return N.runKernel(fn,e)}var dl=S({isFinite_:wF});function IF(r){let e={x:T(r,"x","isInf")};return N.runKernel(dn,e)}var hl=S({isInf_:IF});function SF(r){let e={x:T(r,"x","isNaN")};return N.runKernel(hn,e)}var gl=S({isNaN_:SF});function vF(r,t=.2){let o={x:T(r,"x","leakyRelu")},n={alpha:t};return N.runKernel(ta,o,n)}var yi=S({leakyRelu_:vF});function NF(r,t){let e=T(r,"a","less","string_or_numeric"),o=T(t,"b","less","string_or_numeric");[e,o]=xt(e,o),At(e.shape,o.shape);let n={a:e,b:o};return N.runKernel(gn,n)}var xl=S({less_:NF});function kF(r,t){let e=T(r,"a","lessEqual","string_or_numeric"),o=T(t,"b","lessEqual","string_or_numeric");[e,o]=xt(e,o),At(e.shape,o.shape);let n={a:e,b:o};return N.runKernel(xn,n)}var Ro=S({lessEqual_:kF});function bg(r,t,e){if(e<=0)throw new Error("The number of values should be positive.");let o={start:r,stop:t,num:e};return N.runKernel(ea,{},o)}function EF(r,t=5,e=1,o=1,n=.5){let s=T(r,"x","localResponseNormalization");E(s.rank===4||s.rank===3,()=>`Error in localResponseNormalization: x must be rank 3 or 4 but got
               rank ${s.rank}.`),E(yo(t),()=>`Error in localResponseNormalization: depthRadius must be an integer but got depthRadius ${t}.`);let a=s,i=!1;s.rank===3&&(i=!0,a=P(s,[1,s.shape[0],s.shape[1],s.shape[2]]));let c={x:a},p={depthRadius:t,bias:e,alpha:o,beta:n},l=N.runKernel("LRN",c,p);return i?P(l,[l.shape[1],l.shape[2],l.shape[3]]):l}var yl=S({localResponseNormalization_:EF});function $F(r){let e={x:T(r,"x","log","float32")};return N.runKernel("Log",e)}var fr=S({log_:$F});function AF(r){let e={x:T(r,"x","log1p")};return N.runKernel(yn,e)}var bi=S({log1p_:AF});function K0(r){return E(Kr(r),()=>"The f passed in grad(f) must be a function"),(t,e)=>{let o=T(t,"x","tf.grad","string_or_numeric"),n=e!=null?T(e,"dy","tf.grad"):null;return N.tidy(()=>{let{value:s,grads:a}=N.gradients(()=>r(o),[o],n);return n!=null&&Mt(s.shape,n.shape,"The shape of dy passed in grad(f)(x, dy) must match the shape returned by f(x)"),ju(a),a[0]})}}function j0(r){return E(Kr(r),()=>"The f passed in grads(f) must be a function"),(t,e)=>{E(Array.isArray(t),()=>"The args passed in grads(f)(args) must be an array of `Tensor`s or `TensorLike`s");let o=vo(t,"args","tf.grads","string_or_numeric"),n=e!=null?T(e,"dy","tf.grads"):null;return N.tidy(()=>{let{value:s,grads:a}=N.gradients(()=>r(...o),o,n);return n!=null&&Mt(s.shape,n.shape,"The shape of dy passed in grads(f)([x1,...], dy) must match the shape returned by f([x1,...])"),ju(a),a})}}function X0(r){return E(Kr(r),()=>"The f passed in valueAndGrad(f) must be a function"),(t,e)=>{E(t instanceof Et,()=>"The x passed in valueAndGrad(f)(x) must be a tensor"),E(e==null||e instanceof Et,()=>"The dy passed in valueAndGrad(f)(x, dy) must be a tensor");let{grads:o,value:n}=N.gradients(()=>r(t),[t],e);return ju(o),{grad:o[0],value:n}}}function Y0(r){return E(Kr(r),()=>"The f passed in valueAndGrads(f) must be a function"),(t,e)=>{E(Array.isArray(t)&&t.every(n=>n instanceof Et),()=>"The args passed in valueAndGrads(f)(args) must be array of tensors"),E(e==null||e instanceof Et,()=>"The dy passed in valueAndGrads(f)(args, dy) must be a tensor");let o=N.gradients(()=>r(...t),t,e);return e!=null&&Mt(o.value.shape,e.shape,"The shape of dy passed in valueAndGrads(f)([x1,...], dy) must match the shape returned by f([x1,...])"),ju(o.grads),o}}function Ku(r,t){E(Kr(r),()=>"The f passed in variableGrads(f) must be a function"),E(t==null||Array.isArray(t)&&t.every(p=>p instanceof Yr),()=>"The varList passed in variableGrads(f, varList) must be an array of variables");let e=t!=null;if(!e){t=[];for(let p in N.registeredVariables)t.push(N.registeredVariables[p])}let o=e?t.filter(p=>!p.trainable):null,n=t.length;t=t.filter(p=>p.trainable),E(t.length>0,()=>`variableGrads() expects at least one of the input variables to be trainable, but none of the ${n} variables is trainable.`);let s=!0,{value:a,grads:i}=N.gradients(r,t,null,s);E(i.some(p=>p!=null),()=>"Cannot find a connection between any variable and the result of the loss function y=f(x). Please make sure the operations that use variables are inside the function f passed to minimize()."),E(a.rank===0,()=>`The f passed in variableGrads(f) must return a scalar, but it returned a rank-${a.rank} tensor`);let c={};return t.forEach((p,l)=>{i[l]!=null&&(c[p.name]=i[l])}),o?.forEach(p=>c[p.name]=null),{value:a,grads:c}}function ke(r){return N.customGrad(r)}function ju(r){if(r.filter(e=>e==null).length>0)throw new Error(`Cannot compute gradient of y=f(x) with respect to x. Make sure that
    the f you passed encloses all operations that lead from x to y.`)}function RF(r){let e={x:T(r,"x","softplus")};return N.runKernel(On,e)}var Ci=S({softplus_:RF});function DF(r){let t=T(r,"x","logSigmoid");return ke(o=>({value:de(Ci(de(o))),gradFunc:a=>j(a,rr(de(o)))}))(t)}var bl=S({logSigmoid_:DF});function FF(r,t){let e=T(r,"a","sub"),o=T(t,"b","sub");[e,o]=xt(e,o);let n={a:e,b:o};return N.runKernel("Sub",n)}var pt=S({sub_:FF});function _F(r,t=-1){let e=T(r,"logits","logSoftmax");if(t===-1&&(t=e.rank-1),t!==e.rank-1)throw Error(`Log Softmax along a non-last dimension is not yet supported. Logits was rank ${e.rank} and axis was ${t}`);return ke((n,s)=>{let i=or(n,t,!0),c=pt(n,i),p=pt(dt(c,"float32"),fr(vt(Be(c),t,!0)));return s([p]),{value:p,gradFunc:(u,m)=>{let[f]=m,d=!0,h=Be(f);return pt(u,j(vt(u,t,d),h))}}})(e)}var Cl=S({logSoftmax_:_F});function OF(r,t=null,e=!1){let o=T(r,"x","logSumExp"),n=jo(t,o.shape),s=or(o,n,!0),a=pt(o,s),i=Be(a),c=vt(i,n),p=fr(c),l=ot(P(s,p.shape),p);if(e){let u=Ao(l.shape,n);return P(l,u)}return l}var Ti=S({logSumExp_:OF});function PF(r,t){let e=T(r,"a","logicalAnd","bool"),o=T(t,"b","logicalAnd","bool");At(e.shape,o.shape);let n={a:e,b:o};return N.runKernel(bn,n)}var so=S({logicalAnd_:PF});function LF(r){let e={x:T(r,"x","logicalNot","bool")};return N.runKernel(Cn,e)}var wi=S({logicalNot_:LF});function MF(r,t){let e=T(r,"a","logicalOr","bool"),o=T(t,"b","logicalOr","bool");At(e.shape,o.shape);let n={a:e,b:o};return N.runKernel(Tn,n)}var Ii=S({logicalOr_:MF});function BF(r,t){let e=T(r,"a","logicalXor","bool"),o=T(t,"b","logicalXor","bool");return At(e.shape,o.shape),so(Ii(r,t),wi(so(r,t)))}var Tl=S({logicalXor_:BF});var Xu=2147483648;function VF(r,t,e="left"){let o=T(r,"sortedSequence","searchSorted"),n=T(t,"values","searchSorted"),s=o.shape[o.shape.length-1],a=n.shape[n.shape.length-1],i=P(o,[-1,s]),c=P(n,[-1,a]);if(i.rank<2)throw new Error("Sorted input argument must be at least 2-dimensional");if(i.shape[0]!==c.shape[0])throw new Error("Leading dimension of 'sortedSequence' and 'values' must match.");if(It(c.shape)>=Xu)throw new Error(`values tensor size must less than ${Xu}`);if(i.shape[1]>=Xu)throw new Error(`trailing dim_size must less than ${Xu} for int32 output type, was ${i.shape[1]}`);let p={sortedSequence:i,values:c},l={side:e};return N.runKernel($a,p,l)}var Ac=S({searchSorted_:VF});function Cg(r,t){return Ac(r,t,"left")}function GF(r,t,e,o,n){let s=T(r,"x","maxPool"),a=1,i=s,c=!1;s.rank===3&&(c=!0,i=P(s,[1,s.shape[0],s.shape[1],s.shape[2]])),E(i.rank===4,()=>`Error in maxPool: input must be rank 4 but got rank ${i.rank}.`),E(Ne(e,a),()=>`Error in maxPool: Either strides or dilations must be 1. Got strides ${e} and dilations '${a}'`),re("maxPool",o,n);let p={x:i},l={filterSize:t,strides:e,pad:o,dimRoundingMode:n},u=N.runKernel(oa,p,l);return c?P(u,[u.shape[1],u.shape[2],u.shape[3]]):u}var Si=S({maxPool_:GF});function UF(r,t=[1,1,1],e,o,n,s="NDHWC"){let a=T(r,"x","maxPool3d"),i=a,c=!1;a.rank===4&&(c=!0,i=P(a,[1,a.shape[0],a.shape[1],a.shape[2],a.shape[3]])),E(i.rank===5,()=>`Error in maxPool3d: x must be rank 5 but got rank ${i.rank}.`),E(s==="NDHWC",()=>`Error in maxPool3d: Only NDHWC is currently supported, but got dataFormat of ${s}`),re("maxPool3d",o,n);let p={x:i},l={filterSize:t,strides:e,pad:o,dimRoundingMode:n,dataFormat:s},u=N.runKernel(na,p,l);return c?P(u,[u.shape[1],u.shape[2],u.shape[3],u.shape[4]]):u}var Tg=S({maxPool3d_:UF});function zF(r,t,e,o,n=!1){let a={x:T(r,"x","maxPoolWithArgmax")},i={filterSize:t,strides:e,pad:o,includeBatchInIndex:n},c=N.runKernel(sa,a,i);return{result:c[0],indexes:c[1]}}var wg=S({maxPoolWithArgmax_:zF});function WF(r,t){let e=T(r,"a","maximum"),o=T(t,"b","maximum");[e,o]=xt(e,o),e.dtype==="bool"&&(e=dt(e,"int32"),o=dt(o,"int32")),At(e.shape,o.shape);let n={a:e,b:o};return N.runKernel(wn,n)}var vi=S({maximum_:WF});function HF(r,t=null,e=!1){let n={x:T(r,"x","mean")},s={axis:t,keepDims:e};return N.runKernel(aa,n,s)}var ao=S({mean_:HF});function Ve(r,t="float32"){if(t==="complex64"){let o=Ve(r,"float32"),n=Ve(r,"float32");return Re(o,n)}let e=sc(It(r),t);return N.makeTensor(e,r,t)}function Vr(r,t="float32"){if(t==="complex64"){let o=Vr(r,"float32"),n=Ve(r,"float32");return Re(o,n)}let e=lp(It(r),t);return N.makeTensor(e,r,t)}function Ig(r,t,{indexing:e="xy"}={}){if(e!=="xy"&&e!=="ij")throw new TypeError(`${e} is not a valid third argument to meshgrid`);if(r===void 0)return[];let o=T(r,"x","meshgrid",r instanceof Et?r.dtype:"float32");if(t===void 0)return[o];let n=T(t,"y","meshgrid",t instanceof Et?t.dtype:"float32"),s=It(o.shape),a=It(n.shape);return e==="xy"?(o=P(o,[1,-1]),n=P(n,[-1,1]),[St(Vr([a,1],o.dtype),o),St(n,Vr([1,s],n.dtype))]):(o=P(o,[-1,1]),n=P(n,[1,-1]),[St(o,Vr([1,a],o.dtype)),St(Vr([s,1],n.dtype),n)])}function qF(r,t){let e=T(r,"a","minimum"),o=T(t,"b","minimum");[e,o]=xt(e,o),e.dtype==="bool"&&(e=dt(e,"int32"),o=dt(o,"int32")),At(e.shape,o.shape);let n={a:e,b:o};return N.runKernel(In,n)}var Ni=S({minimum_:qF});function KF(r,t,e){E(e==="reflect"||e==="symmetric",()=>`Invalid mode. Mode must be either reflect or symmetric. Got ${e}.`);let o=T(r,"x","mirrorPad");if(o.rank===0)throw new Error("mirrorPad(scalar) is not defined. Pass non-scalar to mirrorPad");E(t.length===o.rank,()=>`Padding doesn't match input. Must be ${o.rank}. Got ${t.length}.`);let n=e==="reflect"?1:0;for(let i=0;i<o.rank;i++)E(t[i].length===2,()=>"Invalid number of paddings. Must be length of 2 each."),E(t[i][0]>=0&&t[i][0]<=o.shape[i]-n&&t[i][1]>=0&&t[i][1]<=o.shape[i]-n,()=>`Padding in dimension ${i} cannot be greater than or equal to ${o.shape[i]-n} or less than 0 for input of shape ${o.shape}`);let s={paddings:t,mode:e},a={x:o};return N.runKernel(ia,a,s)}var wl=S({mirrorPad_:KF});function jF(r,t){let e=T(r,"a","mod"),o=T(t,"b","mod");[e,o]=xt(e,o);let n={a:e,b:o};return N.runKernel("Mod",n)}var Il=S({mod_:jF});function XF(r,t=null,e=!1){r=T(r,"x","moments");let o=jo(t,r.shape),n=ao(r,o,e),s=n.shape;e||(s=Ao(n.shape,o));let a=se(pt(dt(r,"float32"),P(n,s))),i=ao(a,o,e);return{mean:n,variance:i}}var Sg=S({moments_:XF});function YF(r,t,e,o){let n=T(t,"data","multiRNNCell"),s=vo(e,"c","multiRNNCell"),a=vo(o,"h","multiRNNCell"),i=n,c=[];for(let u=0;u<r.length;u++){let m=r[u](i,s[u],a[u]);c.push(m[0]),c.push(m[1]),i=m[1]}let p=[],l=[];for(let u=0;u<c.length;u+=2)p.push(c[u]),l.push(c[u+1]);return[p,l]}var vg=S({multiRNNCell_:YF});function ZF(r,t,e,o=!1){let n=T(r,"logits","multinomial"),s=n.size,a=n.rank;if(s<2)throw new Error(`Error in multinomial: you need at least 2 outcomes, but got ${s}.`);if(a>2)throw new Error(`Rank of probabilities must be 1 or 2, but is ${a}`);e=e||Math.random();let c={logits:a===1?P(n,[1,-1]):n},p={numSamples:t,seed:e,normalized:o},l=N.runKernel(pa,c,p);return a===1?P(l,[l.size]):l}var Ng=S({multinomial_:ZF});function QF(r,t){let e=T(r,"a","notEqual","string_or_numeric"),o=T(t,"b","notEqual","string_or_numeric");[e,o]=xt(e,o),At(e.shape,o.shape);let n={a:e,b:o};return N.runKernel(vn,n)}var ki=S({notEqual_:QF});function JF(r){let e={x:T(r,"x","onesLike")};return N.runKernel(fa,e)}var Sl=S({onesLike_:JF});function t_(r,t){let e=T(r,"v1","outerProduct"),o=T(t,"v2","outerProduct");E(e.rank===1&&o.rank===1,()=>`Error in outerProduct: inputs must be rank 1, but got ranks ${e.rank} and ${o.rank}.`);let n=P(e,[-1,1]),s=P(o,[1,-1]);return St(n,s)}var kg=S({outerProduct_:t_});function e_(r,t,e=0){let o=T(r,"x","pad");if(o.rank===0)throw new Error("pad(scalar) is not defined. Pass non-scalar to pad");let n={paddings:t,constantValue:e},s={x:o};return N.runKernel(ga,s,n)}var nr=S({pad_:e_});function r_(r,t,e=0){return E(t.length===2,()=>"Invalid number of paddings. Must be length of 2."),nr(r,[t],e)}var Eg=S({pad1d_:r_});function o_(r,t,e=0){return E(t.length===2&&t[0].length===2&&t[1].length===2,()=>"Invalid number of paddings. Must be length of 2 each."),nr(r,t,e)}var $g=S({pad2d_:o_});function n_(r,t,e=0){return E(t.length===3&&t[0].length===2&&t[1].length===2&&t[2].length===2,()=>"Invalid number of paddings. Must be length of 2 each."),nr(r,t,e)}var Ag=S({pad3d_:n_});function s_(r,t,e=0){return E(t.length===4&&t[0].length===2&&t[1].length===2&&t[2].length===2&&t[3].length===2,()=>"Invalid number of paddings. Must be length of 2 each."),nr(r,t,e)}var Rg=S({pad4d_:s_});function a_(r,t,e){let o=T(r,"x","spaceToBatchND");E(o.rank>=1+t.length,()=>`input rank ${o.rank} should be > than [blockShape] ${t.length}`),E(e.length===t.length,()=>`paddings.shape[0] ${e.length} must be equal to [blockShape] ${t.length}`),E(o.shape.reduce((a,i,c)=>c>0&&c<=t.length?a&&(i+e[c-1][0]+e[c-1][1])%t[c-1]===0:a,!0),()=>`input spatial dimensions ${o.shape.slice(1)} with paddings ${e.toString()} must be divisible by blockShapes ${t.toString()}`);let n={x:o},s={blockShape:t,paddings:e};return N.runKernel(Fa,n,s)}var Ei=S({spaceToBatchND_:a_});function i_(r,t,e,o,n,s,a){n==null&&(n=[1,1]),s==null&&(s=1),o===0&&(o="valid");let i=T(r,"x","maxPool"),c=i,p=!1;i.rank===3&&(p=!0,c=P(i,[1,i.shape[0],i.shape[1],i.shape[2]])),E(Ne(s,n),()=>`Error in pool: Either strides or dilations must be 1. Got strides ${s} and dilations '${n}'`);let l=rg(c.shape,t,s,n,o),u=[l.dilationHeight,l.dilationWidth],m;o==="same"?m=p_([l.filterHeight,l.filterWidth],u):m=[[0,0],[0,0]];let f=u[0]===1&&u[1]===1,[d,h]=c_([l.inHeight,l.inWidth],u,m),g=f?o:"valid",x=f?c:Ei(c,u,d),w=(e==="avg"?()=>ui(x,t,s,g,a):()=>Si(x,t,s,g,a))(),I=f?w:mi(w,u,h);return p?P(I,[I.shape[1],I.shape[2],I.shape[3]]):I}function c_(r,t,e){let o=e.map(l=>l[0]),n=e.map(l=>l[1]),s=r.concat(o,n),a=t.map((l,u)=>(l-s[u]%l)%l),i=n.map((l,u)=>l+a[u]),c=t.map((l,u)=>[o[u],i[u]]),p=t.map((l,u)=>[0,a[u]]);return[c,p]}function p_(r,t){let o=r.map((a,i)=>a+(a-1)*(t[i]-1)).map(a=>a-1),n=o.map(a=>Math.floor(a/2)),s=o.map((a,i)=>a-n[i]);return o.map((a,i)=>[n[i],s[i]])}var vl=S({pool_:i_});function l_(r,t){let e=T(r,"x","prelu"),o=T(t,"alpha","prelu"),n={x:e,alpha:o};return N.runKernel(ya,n)}var $i=S({prelu_:l_});function u_(r,t=null,e=!1){let o=T(r,"x","prod");o.dtype==="bool"&&(o=dt(o,"int32"));let n={x:o},s={axis:t,keepDims:e};return N.runKernel(ba,n,s)}var Nl=S({prod_:u_});function m_(r,t,e,o){let n=r.map((l,u)=>T(l,`tensors${u}`,"raggedGather","int32")),s=T(t,"paramsDenseValues","raggedGather"),a=T(e,"indices","raggedGather","int32"),i={paramsNestedSplits:n,paramsDenseValues:s,indices:a},c={outputRaggedRank:o},p=N.runKernel(Ca,i,c);return{outputNestedSplits:p.slice(0,p.length-1),outputDenseValues:p[p.length-1]}}var Dg=S({raggedGather_:m_});function f_(r,t,e,o,n){let s=T(r,"shape","raggedTensorToTensor","int32"),a=T(t,"values","raggedTensorToTensor"),i=T(e,"defaultValue","raggedTensorToTensor",a.dtype),c=o.map((u,m)=>T(u,`tensors${m}`,"raggedTensorToTensor","int32")),p={shape:s,values:a,defaultValue:i,rowPartitionTensors:c},l={rowPartitionTypes:n};return N.runKernel(Ta,p,l)}var Fg=S({raggedTensorToTensor_:f_});function d_(r,t,e){let o=It(r),n=null;if(e==null||e==="float32")n=new Float32Array(o);else if(e==="int32")n=new Int32Array(o);else if(e==="bool")n=new Uint8Array(o);else throw new Error(`Unknown data type ${e}`);for(let s=0;s<o;s++)n[s]=t();return N.makeTensor(n,r,e)}var _g=S({rand_:d_});var Ju=xu(Gg());var Ri=class{constructor(t,e,o,n,s){this.mean=t,this.stdDev=e,this.dtype=o,this.nextVal=NaN,this.truncated=n,this.truncated&&(this.upper=this.mean+this.stdDev*2,this.lower=this.mean-this.stdDev*2);let a=s||Math.random();this.random=Ju.alea(a.toString())}nextValue(){if(!isNaN(this.nextVal)){let n=this.nextVal;return this.nextVal=NaN,n}let t,e,o=!1;for(;!o;){let n,s,a;do n=2*this.random()-1,s=2*this.random()-1,a=n*n+s*s;while(a>=1||a===0);let i=Math.sqrt(-2*Math.log(a)/a);t=this.mean+this.stdDev*n*i,e=this.mean+this.stdDev*s*i,(!this.truncated||this.isValidTruncated(t))&&(o=!0)}return(!this.truncated||this.isValidTruncated(e))&&(this.nextVal=this.convertValue(e)),this.convertValue(t)}convertValue(t){return this.dtype==null||this.dtype==="float32"?t:Math.round(t)}isValidTruncated(t){return t<=this.upper&&t>=this.lower}},Zu=class{constructor(t,e,o,n){this.alpha=t,this.beta=1/e,this.dtype=o;let s=n||Math.random();this.randu=Ju.alea(s.toString()),this.randn=new Ri(0,1,o,!1,this.randu()),t<1?this.d=t+2/3:this.d=t-1/3,this.c=1/Math.sqrt(9*this.d)}nextValue(){let t,e,o,n,s,a;for(;;){do n=this.randn.nextValue(),a=1+this.c*n;while(a<=0);if(a*=a*a,t=n*n,e=1-.331*t*t,o=.5*t+this.d*(1-a+Math.log(a)),s=this.randu(),s<e||Math.log(s)<o)break}return a=1/this.beta*this.d*a,this.alpha<1&&(a*=Math.pow(this.randu(),1/this.alpha)),this.convertValue(a)}convertValue(t){return this.dtype==="float32"?t:Math.round(t)}},Qu=class{constructor(t=0,e=1,o,n){if(this.canReturnFloat=()=>this.dtype==null||this.dtype==="float32",this.min=t,this.range=e-t,this.dtype=o,n==null&&(n=Math.random()),typeof n=="number"&&(n=n.toString()),!this.canReturnFloat()&&this.range<=1)throw new Error(`The difference between ${t} - ${e} <= 1 and dtype is not float`);this.random=Ju.alea(n)}convertValue(t){return this.canReturnFloat()?t:Math.round(t)}nextValue(){return this.convertValue(this.min+this.range*this.random())}};function T_(r,t,e=1,o="float32",n){if(e==null&&(e=1),o==null&&(o="float32"),o!=="float32"&&o!=="int32")throw new Error(`Unsupported data type ${o}`);let s=new Zu(t,e,o,n),a=rt(r,o);for(let i=0;i<a.values.length;i++)a.values[i]=s.nextValue();return a.toTensor()}var Ug=S({randomGamma_:T_});function w_(r,t=0,e=1,o,n){if(o!=null&&o==="bool")throw new Error(`Unsupported data type ${o}`);let s=new Ri(t,e,o,!1,n),a=rt(r,o);for(let i=0;i<a.values.length;i++)a.values[i]=s.nextValue();return a.toTensor()}var kl=S({randomNormal_:w_});function I_(r,t,e){if(t!=null&&t==="bool")throw new Error(`Unsupported data type ${t}`);return kl(r,0,1,t,e)}var zg=S({randomStandardNormal_:I_});function S_(r,t=0,e=1,o="float32",n){let s=rt(r,o),a=new Qu(t,e,null,n);for(let i=0;i<s.values.length;i++)s.values[i]=a.nextValue();return s.toTensor()}var El=S({randomUniform_:S_});function Do(r,t,e=1,o="float32"){if(e===0)throw new Error("Cannot have a step of zero");let n={start:r,stop:t,step:e,dtype:o};return N.runKernel(wa,{},n)}function v_(r){let e={x:T(r,"x","reciprocal")};return N.runKernel(Nn,e)}var $l=S({reciprocal_:v_});function N_(r){let e={x:T(r,"x","relu")};return N.runKernel(kn,e)}var Gr=S({relu_:N_});function k_(r){let e={x:T(r,"x","relu6")};return N.runKernel(En,e)}var Di=S({relu6_:k_});function E_(r,t){let o={x:T(r,"x","reverse")},n={dims:t};return N.runKernel(ka,o,n)}var Fe=S({reverse_:E_});function $_(r){let t=T(r,"x","reverse");return E(t.rank===1,()=>`Error in reverse1D: x must be rank 1 but got rank ${t.rank}.`),Fe(t,0)}var Wg=S({reverse1d_:$_});function A_(r,t){let e=T(r,"x","reverse");return E(e.rank===2,()=>`Error in reverse2D: x must be rank 2 but got rank ${e.rank}.`),Fe(e,t)}var Hg=S({reverse2d_:A_});function R_(r,t){let e=T(r,"x","reverse");return E(e.rank===3,()=>`Error in reverse3D: x must be rank 3 but got rank ${e.rank}.`),Fe(e,t)}var qg=S({reverse3d_:R_});function D_(r,t){let e=T(r,"x","reverse");return E(e.rank===4,()=>`Error in reverse4D: x must be rank 4 but got rank ${e.rank}.`),Fe(e,t)}var Kg=S({reverse4d_:D_});function F_(r){let e={x:T(r,"x","round")};return N.runKernel($n,e)}var Fi=S({round_:F_});function __(r){let e={x:T(r,"x","rsqrt","float32")};return N.runKernel(An,e)}var Al=S({rsqrt_:__});function O_(r){let e={x:T(r,"x","selu")};return N.runKernel(Rn,e)}var Rl=S({selu_:O_});function P_(r,t,e,o,n,s=[1,1],a="NHWC"){let i=T(r,"x","separableConv2d"),c=T(t,"depthwiseFilter","separableConv2d"),p=T(e,"pointwiseFilter","separableConv2d"),l=i,u=!1;if(i.rank===3&&(u=!0,l=P(i,[1,i.shape[0],i.shape[1],i.shape[2]])),a==="NCHW")throw new Error("separableConv2d currently does not support dataFormat NCHW; only NHWC is supported");E(l.rank===4,()=>`Error in separableConv2d: input must be rank 4, but got rank ${l.rank}.`),E(c.rank===4,()=>`Error in separableConv2d: depthwise filter must be rank 4, but got rank ${c.rank}.`),E(p.rank===4,()=>`Error in separableConv2d: pointwise filter must be rank 4, but got rank ${c.rank}.`),E(p.shape[0]===1,()=>`Error in separableConv2d: the first dimension of pointwise filter  must be 1, but got ${p.shape[0]}.`),E(p.shape[1]===1,()=>`Error in separableConv2d: the second dimension of pointwise filter must be 1, but got ${p.shape[1]}.`);let m=c.shape[2],f=c.shape[3];E(p.shape[2]===m*f,()=>`Error in separableConv2d: the third dimension of pointwise filter must be ${m*f}, but got ${p.shape[2]}.`);let d=$o(l,c,o,n,a,s),g=Mr(d,p,1,"valid",a);return u?P(g,[g.shape[1],g.shape[2],g.shape[3]]):g}var Dl=S({separableConv2d_:P_});async function L_(r,t){let e=T(r,"x","setdiff1d"),o=T(t,"y","setdiff1d");E(e.dtype===o.dtype,()=>`x and y should have the same dtype, but got x (${e.dtype}) and y (${o.dtype}).`),E(e.rank===1,()=>`x should be 1D tensor, but got x (${e.shape}).`),E(o.rank===1,()=>`y should be 1D tensor, but got y (${o.shape}).`);let n=await e.data(),s=await o.data(),a=new Set(s),i=0;for(let l=0;l<n.length;l++)a.has(n[l])||i++;let c=new Rt([i],e.dtype),p=new Rt([i],"int32");for(let l=0,u=0;l<n.length;l++)a.has(n[l])||(c.values[u]=n[l],p.values[u]=l,u++);return[c.toTensor(),p.toTensor()]}var jg=L_;function M_(r){let e={x:T(r,"x","sign")};return N.runKernel(Fn,e)}var Fl=S({sign_:M_});function B_(r){let e={x:T(r,"x","sin","float32")};return N.runKernel("Sin",e)}var _l=S({sin_:B_});function V_(r){let e={x:T(r,"x","sinh")};return N.runKernel(Dn,e)}var Ol=S({sinh_:V_});function G_(r,t,e){let o=T(r,"x","slice1d");return E(o.rank===1,()=>`slice1d expects a rank-1 tensor, but got a rank-${o.rank} tensor`),yt(o,[t],[e])}var Xg=S({slice1d_:G_});function U_(r,t,e){let o=T(r,"x","slice2d");return E(o.rank===2,()=>`slice2d expects a rank-2 tensor, but got a rank-${o.rank} tensor`),yt(o,t,e)}var Yg=S({slice2d_:U_});function z_(r,t,e){let o=T(r,"x","slice3d");return E(o.rank===3,()=>`slice3d expects a rank-3 tensor, but got a rank-${o.rank} tensor`),yt(o,t,e)}var Zg=S({slice3d_:z_});function W_(r,t,e){let o=T(r,"x","slice4d");return E(o.rank===4,()=>`slice4d expects a rank-4 tensor, but got a rank-${o.rank} tensor`),yt(o,t,e)}var Qg=S({slice4d_:W_});function H_(r,t=-1){let e=T(r,"logits","softmax","float32");if(t===-1&&(t=e.rank-1),t!==e.rank-1)throw Error(`Softmax along a non-last dimension is not yet supported. Logits was rank ${e.rank} and dim was ${t}`);let o={logits:e},n={dim:t};return N.runKernel(Oa,o,n)}var Pl=S({softmax_:H_});function q_(r){E(r.dtype==="complex64",()=>`The dtype for tf.spectral.fft() must be complex64 but got ${r.dtype}.`);let t={input:r};return N.runKernel("FFT",t)}var Fo=S({fft_:q_});function K_(r){E(r.dtype==="complex64",()=>`The dtype for tf.spectral.ifft() must be complex64 but got ${r.dtype}.`);let t={input:r};return N.runKernel(Qs,t)}var io=S({ifft_:K_});function j_(r){let t=r.shape[r.shape.length-1],e=r.size/t,o;if(t<=2){let n=P(r,[e,t]);o=io(n)}else{let n=[e,2*(t-1)],s=P(eo(r),[e,t]),a=P(ko(r),[e,t]),i=Fe(yt(s,[0,1],[e,t-2]),1),c=j(Fe(yt(a,[0,1],[e,t-2]),1),it(-1)),p=Ot([s,i],1),l=Ot([a,c],1),u=P(Re(p,l),[n[0],n[1]]);o=io(u)}if(o=eo(o),r.rank===3&&r.shape[0]!==0){let n=o,s=r.shape[0];o=P(o,[s,o.shape[0]/s,o.shape[1]]),n.dispose()}return o}var _i=S({irfft_:j_});function X_(r,t,e=0){let n={x:T(r,"x","split")},s={numOrSizeSplits:t,axis:e};return N.runKernel(_a,n,s)}var dr=S({split_:X_});function Y_(r,t){E(r.dtype==="float32",()=>`The dtype for rfft() must be real value but got ${r.dtype}`);let e=r.shape[r.shape.length-1],o=r.size/e,n;if(t!=null&&t<e){let d=r.shape.map(g=>0),h=r.shape.map(g=>g);h[r.shape.length-1]=t,n=yt(r,d,h),e=t}else if(t!=null&&t>e){let d=r.shape.map(h=>h);d[r.shape.length-1]=t-e,n=Ot([r,Ve(d)],r.shape.length-1),e=t}else n=r;let s=Jt(n),a=P(Re(n,s),[o,e]),i=Fo(a),c=Math.floor(e/2)+1,p=eo(i),l=ko(i),u=dr(p,[c,e-c],p.shape.length-1),m=dr(l,[c,e-c],l.shape.length-1),f=n.shape.slice();return f[n.shape.length-1]=c,P(Re(u[0],m[0]),f)}var _o=S({rfft_:Y_});function Z_(r,t){let e=T(r,"a","squaredDifference"),o=T(t,"b","squaredDifference");[e,o]=xt(e,o),At(e.shape,o.shape);let n={a:e,b:o},s={};return N.runKernel(Ln,n,s)}var Oi=S({squaredDifference_:Z_});function Q_(r,t){let e=T(r,"x","squeeze","string_or_numeric");return P(e,nh(e.shape,t).newShape)}var Oo=S({squeeze_:Q_});function J_(r,t=0){let e=vo(r,"tensors","stack","string_or_numeric");E(e.length>=1,()=>"Pass at least one tensor to tf.stack"),e.length>0&&E(t<=e[0].rank,()=>"Axis must be <= rank of the tensor");let o=e,n={axis:t};return N.runKernel(ha,o,n)}var he=S({stack_:J_});function tO(r,t=0){let o={x:T(r,"x","step")},n={alpha:t};return N.runKernel(Bn,o,n)}var Pi=S({step_:tO});function eO(r,t,e,o,n=0,s=0,a=0,i=0,c=0){let l={x:T(r,"x","stridedSlice","string_or_numeric")},u={begin:t,end:e,strides:o,beginMask:n,endMask:s,ellipsisMask:a,newAxisMask:i,shrinkAxisMask:c};return N.runKernel(Ga,l,u)}var Ll=S({stridedSlice_:eO});function rO(r){let e={x:T(r,"x","tan","float32")};return N.runKernel("Tan",e)}var Ml=S({tan_:rO});function we(r,t){er(r);let e=Ce(r,t);if(e.length!==1)throw new Error("tensor1d() requires values to be a flat/TypedArray");return De(r,null,e,t)}function Po(r,t,e){if(er(r),t!=null&&t.length!==2)throw new Error("tensor2d() requires shape to have two numbers");let o=Ce(r,e);if(o.length!==2&&o.length!==1)throw new Error("tensor2d() requires values to be number[][] or flat/TypedArray");if(o.length===1&&t==null)throw new Error("tensor2d() requires shape to be provided when `values` are a flat/TypedArray");return De(r,t,o,e)}function Jg(r,t,e){if(er(r),t!=null&&t.length!==4)throw new Error("tensor4d() requires shape to have four numbers");let o=Ce(r,e);if(o.length!==4&&o.length!==1)throw new Error("tensor4d() requires values to be number[][][][] or flat/TypedArray");if(o.length===1&&t==null)throw new Error("tensor4d() requires shape to be provided when `values` are a flat array");return De(r,t,o,e)}function tx(r,t,e){if(er(r),t!=null&&t.length!==5)throw new Error("tensor5d() requires shape to have five numbers");let o=Ce(r,e);if(o.length!==5&&o.length!==1)throw new Error("tensor5d() requires values to be number[][][][][] or flat/TypedArray");if(o.length===1&&t==null)throw new Error("tensor5d() requires shape to be provided when `values` are a flat array");return De(r,t,o,e)}function ex(r,t,e){if(er(r),t!=null&&t.length!==6)throw new Error("tensor6d() requires shape to have six numbers");let o=Ce(r,e);if(o.length!==6&&o.length!==1)throw new Error("tensor6d() requires values to be number[][][][][][] or flat/TypedArray");if(o.length===1&&t==null)throw new Error("tensor6d() requires shape to be provided when `values` are a flat array");return t=t||o,De(r,t,o,e)}function oO(r,t=1,e=!0){let o=T(r,"x","topk");if(o.rank===0)throw new Error("topk() expects the input to be of rank 1 or higher");let n=o.shape[o.shape.length-1];if(t<0)throw new Error(`'k' passed to topk() must be >= 0 but got ${t}`);if(t>n)throw new Error(`'k' passed to topk() must be <= the last dimension (${n}) but got ${t}`);let s={x:o},a={k:t,sorted:e},[i,c]=N.runKernel(Ka,s,a);return{values:i,indices:c}}var Bl=S({topk_:oO});function nO(r,t=0,e=1,o,n){if(o!=null&&o==="bool")throw new Error("Unsupported data type $ { dtype }");let s=new Ri(t,e,o,!0,n),a=rt(r,o);for(let i=0;i<a.values.length;i++)a.values[i]=s.nextValue();return a.toTensor()}var rx=S({truncatedNormal_:nO});function sO(r,t=0){let e=T(r,"x","unique","string_or_numeric");E(e.rank>0,()=>"The input tensor must be at least 1D");let o={x:e},n={axis:t},[s,a]=N.runKernel(Xa,o,n);return{values:s,indices:a}}var Vl=S({unique_:sO});function aO(r,t,e){let o=T(r,"x","unsortedSegmentSum"),n=T(t,"segmentIds","unsortedSegmentSum","int32");E(yo(e),()=>"numSegments must be of dtype int");let s={x:o,segmentIds:n},a={numSegments:e};return N.runKernel(Za,s,a)}var Gl=S({unsortedSegmentSum_:aO});function iO(r,t=0){let e=T(r,"x","unstack","string_or_numeric");E(t>=-e.shape.length&&t<e.shape.length,()=>`Axis = ${t} is not in [-${e.shape.length}, ${e.shape.length})`);let o={value:e},n={axis:t};return N.runKernel(Ya,o,n)}var _e=S({unstack_:iO});function ox(r,t){return Ac(r,t,"right")}function nx(r,t=!0,e,o){return N.makeVariable(r,t,e,o)}function tm(r,t){let e=[];for(let s=0;s<t.length;s++)t[s]&&e.push(s);let o=rt(r,"int32"),n=rt([e.length,r.length],"int32");for(let s=0;s<e.length;s++){let a=o.indexToLoc(e[s]),i=s*r.length;n.values.set(a,i)}return n.toTensor()}async function cO(r){let t=T(r,"condition","whereAsync","bool"),e=await t.data(),o=tm(t.shape,e);return r!==t&&t.dispose(),o}var Ul=cO;async function pO(r,t,e){let o=T(r,"tensor","boolMask"),n=T(t,"mask","boolMask","bool"),s=e??0,a=n.rank,i=o.shape;E(a>0,()=>"mask cannot be scalar"),Mt(i.slice(s,s+a),n.shape,"mask's shape must match the first K dimensions of tensor's shape,");let c=1;for(let h=s;h<s+a;h++)c*=i[h];let p=i.slice(0,s).concat([c],i.slice(s+a)),l=P(o,p),u=P(n,[-1]),m=await Ul(u),f=Oo(m,[1]),d=gi(l,f,s);return r!==o&&o.dispose(),t!==n&&n.dispose(),f.dispose(),l.dispose(),u.dispose(),m.dispose(),d}var mC=pO;function lO(r,t,e,o,n=!0){let s=T(r,"v","movingAverage"),a=T(t,"x","movingAverage"),i=T(e,"decay","movingAverage");Ih(s,a),E(ze(s.shape,a.shape),()=>"Shape mismatch in v and x");let c=it(1),p=pt(c,i),l=j(pt(a,s),p);if(n){E(o!=null,()=>"When using zeroDebias: true, step is required.");let u=T(o,"step","movingAverage");l=Ct(l,pt(c,mr(i,u)))}return ot(s,l)}var fC=S({movingAverage_:lO});function uO(r,t,e){let o=T(r,"indices","scatterND","int32"),n=T(t,"updates","scatterND");Uu(n,o,e);let s={indices:o,updates:n},a={shape:e};return N.runKernel(Ea,s,a)}var dC=S({scatterND_:uO});function hC(r,t,e,o){if(r.dtype!=="int32")throw new Error(`tf.sparseToDense() expects the indices to be int32 type, but the dtype was ${r.dtype}.`);if(r.rank>2)throw new Error(`sparseIndices should be a scalar, vector, or matrix, but got shape ${r.shape}.`);let n=r.rank>0?r.shape[0]:1,s=r.rank>1?r.shape[1]:1;if(e.length!==s)throw new Error(`outputShape has incorrect number of elements:, ${e.length}, should be: ${s}.`);let a=t.size;if(!(t.rank===0||t.rank===1&&a===n))throw new Error(`sparseValues has incorrect shape ${t.shape}, should be [] or [${n}]`);if(t.dtype!==o.dtype)throw new Error("sparseValues.dtype must match defaultValues.dtype")}function fO(r,t,e,o=0){let n=T(r,"sparseIndices","sparseToDense","int32"),s=T(t,"sparseValues","sparseToDense","string_or_numeric"),a=T(o,"defaultValue","sparseToDense",s.dtype);hC(n,s,e,a);let i={sparseIndices:n,sparseValues:s,defaultValue:a},c={outputShape:e};return N.runKernel(Va,i,c)}var gC=S({sparseToDense_:fO});function dO(r,t){let e=T(t,"indices","gatherND","int32"),n={params:T(r,"x","gatherND","string_or_numeric"),indices:e};return N.runKernel(Zs,n)}var xC=S({gatherND_:dO});function yC(r,t){if(t==null)return r.shape.slice();if(ze(r.shape,t))return t;if(r.shape.length===t.length){let e=[];for(let o=0;o<r.shape.length;o++)t[o]==null&&r.shape[o]!=null?e.push(r.shape[o]):e.push(t[o]);return e}return t}function hO(r,t,e,o){let n=T(r,"x","dropout");if(E(n.dtype==="float32",()=>`x has to be a floating point tensor since it's going to be scaled, but got a ${n.dtype} tensor instead.`),E(t>=0&&t<1,()=>`rate must be a float in the range [0, 1), but got ${t}.`),t===0)return r instanceof Et?n.clone():n;let s=yC(n,e),a=1-t,i=Ct(hi(ot(El(s,0,1,"float32",o),a)),a);return j(n,i)}var bC=S({dropout_:hO});function em(r){return Math.floor(Math.pow(2,Math.ceil(Math.log(r)/Math.log(2))))}function Rc(r,t,e){let o=1-r%2,n=new Float32Array(r);for(let s=0;s<r;++s){let a=2*Math.PI*s/(r+o-1);n[s]=t-e*Math.cos(a)}return we(n,"float32")}async function gO(r,t,e=1){let o=T(r,"predictions","inTopK"),n=T(t,"targets","inTopK");E(o.rank>1,()=>`inTopK() expects the predictions to be of rank 2 or higher, but got ${o.rank}`),E(o.rank-1===n.rank,()=>`predictions rank should be 1 larger than targets rank, but got predictions rank ${o.rank} and targets rank ${n.rank}`),Mt(o.shape.slice(0,o.shape.length-1),n.shape,"predictions's shape should be align with the targets' shape, except the last dimension.");let s=o.shape[o.shape.length-1];E(e>0&&e<=s,()=>`'k' passed to inTopK() must be > 0 && <= the predictions last dimension (${s}), but got ${e}`);let a=await o.data(),i=await n.data(),[c,p]=[a.length/s,s],l=sh("bool",c);for(let u=0;u<c;u++){let m=u*p,f=a.subarray(m,m+p),d=[];for(let h=0;h<f.length;h++)d.push({value:f[h],index:h});d.sort((h,g)=>g.value-h.value),l[u]=0;for(let h=0;h<e;h++)if(d[h].index===i[u]){l[u]=1;break}}return r!==o&&o.dispose(),t!==n&&n.dispose(),fe(l,n.shape,"bool")}var CC=gO;var rm={};kt(rm,{conv2d:()=>wC,depthwiseConv2d:()=>vC,matMul:()=>NC});function xO(r,t,e,o,n,s="NHWC",a){let i=r;r.rank===3&&(i=P(r,[1,r.shape[0],r.shape[1],r.shape[2]]));let c=t;c.rank===3&&(c=P(t,[1,t.shape[0],t.shape[1],t.shape[2]])),E(i.rank===4,()=>`Error in conv2dDerFilter: input must be rank 4, but got shape ${i.shape}.`),E(c.rank===4,()=>`Error in conv2dDerFilter: dy must be rank 4, but got shape ${c.shape}.`),E(e.length===4,()=>`Error in conv2dDerFilter: filterShape must be length 4, but got ${e}.`);let p=s==="NHWC"?i.shape[3]:i.shape[1],l=s==="NHWC"?c.shape[3]:c.shape[1];E(p===e[2],()=>`Error in conv2dDerFilter: depth of input ${p}) must match input depth in filter (${e[2]}.`),E(l===e[3],()=>`Error in conv2dDerFilter: depth of dy (${l}) must match output depth for filter (${e[3]}).`),re("conv2dDerFilter",n,a);let u={x:i,dy:c},m={strides:o,pad:n,dataFormat:s,dimRoundingMode:a,filterShape:e};return N.runKernel(ks,u,m)}var TC=S({conv2DBackpropFilter_:xO});function Li(r,t,e){if(e==null||e==="linear")return r;if(e==="relu")return j(r,Pi(t));throw new Error(`Cannot compute gradient for fused activation ${e}.`)}function Mi(r,t){let e=t,o=Gu(r.shape,t.shape);return o.length>0&&(e=vt(e,o)),P(e,r.shape)}function Bi(r,t,e,o){if(t==="linear")return r;if(t==="relu")return Gr(r);if(t==="elu")return di(r);if(t==="relu6")return Di(r);if(t==="prelu")return $i(r,e);if(t==="leakyrelu")return yi(r,o);if(t==="sigmoid")return rr(r);throw new Error(`Unknown fused activation ${t}.`)}var Vi=(r,t)=>!(r>0)||t==="linear";function yO({x:r,filter:t,strides:e,pad:o,dataFormat:n="NHWC",dilations:s=[1,1],dimRoundingMode:a,bias:i,activation:c="linear",preluActivationWeights:p,leakyreluAlpha:l}){if(c=c||"linear",Vi(N.state.gradientDepth,c)===!1){E(n==="NHWC",()=>`Error in fused conv2d: got dataFormat of ${n} but only NHWC is currently supported for the case of gradient depth is 0 and the activation is not linear.`);let $=Mr(r,t,e,o,n,s,a);return i!=null&&($=ot($,i)),Bi($,c,p,l)}let u=T(r,"x","conv2d","float32"),m=T(t,"filter","conv2d","float32"),f=u,d=!1;u.rank===3&&(d=!0,f=P(u,[1,u.shape[0],u.shape[1],u.shape[2]])),E(f.rank===4,()=>`Error in fused conv2d: input must be rank 4, but got rank ${f.rank}.`),E(m.rank===4,()=>`Error in fused conv2d: filter must be rank 4, but got rank ${m.rank}.`),re("fused conv2d",o,a);let h=n==="NHWC"?f.shape[3]:f.shape[1];E(m.shape[2]===h,()=>`Error in conv2d: depth of input (${h}) must match input depth for filter ${m.shape[2]}.`),E(Ne(e,s),()=>`Error in conv2D: Either strides or dilations must be 1. Got strides ${e} and dilations '${s}'`);let g=li(f.shape,m.shape,e,s,o,a),x;i!=null&&(x=T(i,"bias","fused conv2d"),[x]=xt(x,u),n==="NHWC"?At(g.outShape,x.shape):(E(x.shape.length<=1,()=>`Error in fused conv2d: only supports scalar or 1-D Tensor bias for NCHW format but got the bias of rank-${x.shape.length}.`),E(x.shape.length===0||x.shape[0]===g.outChannels||x.shape[0]===1,()=>`Error in fused conv2d: bias shape (${x.shape}) is not compatible with the number of output channels (${g.outChannels})`)));let b;if(p!=null){let $=p.shape;if(E($.length<=1||$.length===3,()=>`Error in fused conv2d: only supports scalar, 1-D Tensor or 3-D Tensor PReLU activation weights but got a tensor of rank-${$.length}.`),$.length===1)E($[0]===1||$[0]===g.outChannels,()=>`Error in fused conv2d: PReLU activation weights (${$}) is not compatible with the number of output channels (${g.outChannels}).`);else if($.length===3)try{At($,g.outShape)}catch{let D=`Error in fused conv2d: PReLU activation weights (${$}) is not compatible with the output shape of the conv2d (${g.outShape}).`;throw Error(D)}b=T(p,"prelu weights","fused conv2d")}let w=($,R)=>{E(n==="NHWC",()=>`Error in gradient of fused conv2D: got dataFormat of ${n} but only NHWC is currently supported.`);let[D,_,O,L]=R,M=Li($,O,c);E(pi(s),()=>`Error in gradient of fused conv2D: dilation rates greater than 1 are not yet supported in gradients. Got dilations '${s}'`);let B=qu(_.shape,M,D,e,o),G=TC(_,M,D.shape,e,o),V=[B,G];if(L!=null){let W=Mi(L,M);V.push(W)}return V},I={x:f,filter:m,bias:x,preluActivationWeights:b},k={strides:e,pad:o,dataFormat:n,dilations:s,dimRoundingMode:a,activation:c,leakyreluAlpha:l};return i==null?ke((R,D,_)=>{let O=N.runKernel(Gn,I,k);return _([D,R,O]),d&&(O=P(O,[O.shape[1],O.shape[2],O.shape[3]])),{value:O,gradFunc:w}})(f,m):ke((R,D,_,O)=>{let L=N.runKernel(Gn,I,k);return O([D,R,L,_]),d&&(L=P(L,[L.shape[1],L.shape[2],L.shape[3]])),{value:L,gradFunc:w}})(f,m,x)}var wC=S({fusedConv2d_:yO});function bO(r,t,e,o,n,s=[1,1],a){let i=r;r.rank===3&&(i=P(r,[1,r.shape[0],r.shape[1],r.shape[2]]));let c=t;c.rank===3&&(c=P(t,[1,t.shape[0],t.shape[1],t.shape[2]]));let p={x:i,dy:c},l={strides:o,pad:n,dimRoundingMode:a,dilations:s,filterShape:e};return N.runKernel(Ms,p,l)}var IC=S({depthwiseConv2dNativeBackpropFilter_:bO});function CO(r,t,e,o,n,s=[1,1],a){let i=t,c=!1;t.rank===3&&(c=!0,i=P(t,[1,t.shape[0],t.shape[1],t.shape[2]]));let p={dy:i,filter:e},l={strides:o,pad:n,dimRoundingMode:a,dilations:s,inputShape:r},u=N.runKernel(Bs,p,l);return c?P(u,[u.shape[1],u.shape[2],u.shape[3]]):u}var SC=S({depthwiseConv2dNativeBackpropInput_:CO});function TO({x:r,filter:t,strides:e,pad:o,dataFormat:n="NHWC",dilations:s=[1,1],dimRoundingMode:a,bias:i,activation:c="linear",preluActivationWeights:p,leakyreluAlpha:l}){if(Vi(N.state.gradientDepth,c)===!1){let k=$o(r,t,e,o,n,s,a);return i!=null&&(k=ot(k,i)),Bi(k,c,p,l)}let u=T(r,"x","depthwiseConv2d","float32"),m=T(t,"filter","depthwiseConv2d","float32"),f=u,d=!1;u.rank===3&&(d=!0,f=P(u,[1,u.shape[0],u.shape[1],u.shape[2]])),E(f.rank===4,()=>`Error in fused depthwiseConv2d: input must be rank 4, but got rank ${f.rank}.`),E(m.rank===4,()=>`Error in fused depthwiseConv2d: filter must be rank 4, but got rank ${m.rank}.`),E(f.shape[3]===m.shape[2],()=>`Error in fused depthwiseConv2d: number of input channels (${f.shape[3]}) must match the inChannels dimension in filter ${m.shape[2]}.`),s==null&&(s=[1,1]),E(Ne(e,s),()=>`Error in fused depthwiseConv2d: Either strides or dilations must be 1. Got strides ${e} and dilations '${s}'`),re("fused depthwiseConv2d",o,a);let h=li(f.shape,m.shape,e,s,o,a,!0),g;i!=null&&(g=T(i,"bias","fused conv2d"),[g]=xt(g,u),At(h.outShape,g.shape));let x;p!=null&&(x=T(p,"prelu weights","fused depthwiseConv2d"));let b=(k,$)=>{E(pi(s),()=>`Error in gradient of fused depthwiseConv2d: dilation rates greater than 1 are not yet supported. Got dilations '${s}'`);let[R,D,_,O]=$,L=Li(k,_,c),M=SC(D.shape,L,R,e,o,s,a),B=IC(D,L,R.shape,e,o,s,a);if(O!=null){let G=Mi(g,L);return[M,B,G]}return[M,B]},w={x:f,filter:m,bias:g,preluActivationWeights:x},I={strides:e,pad:o,dataFormat:n,dilations:s,dimRoundingMode:a,activation:c,leakyreluAlpha:l};return i==null?ke(($,R,D)=>{let _=N.runKernel(Un,w,I);return D([R,$,_]),d&&(_=P(_,[_.shape[1],_.shape[2],_.shape[3]])),{value:_,gradFunc:b}})(f,m):ke(($,R,D,_)=>{let O=N.runKernel(Un,w,I);return _([R,$,O,D]),d&&(O=P(O,[O.shape[1],O.shape[2],O.shape[3]])),{value:O,gradFunc:b}})(f,m,g)}var vC=S({fusedDepthwiseConv2d_:TO});function wO({a:r,b:t,transposeA:e=!1,transposeB:o=!1,bias:n,activation:s="linear",preluActivationWeights:a,leakyreluAlpha:i=.2}){if(Vi(N.state.gradientDepth,s)===!1){let L=St(r,t,e,o);return n!=null&&(L=ot(L,n)),Bi(L,s,a,i)}let c=T(r,"a","fused matMul"),p=T(t,"b","fused matMul");[c,p]=xt(c,p);let l=e?c.shape[c.rank-2]:c.shape[c.rank-1],u=o?p.shape[p.rank-1]:p.shape[p.rank-2],m=e?c.shape[c.rank-1]:c.shape[c.rank-2],f=o?p.shape[p.rank-2]:p.shape[p.rank-1],d=c.shape.slice(0,-2),h=p.shape.slice(0,-2),g=It(d),x=It(h);E(l===u,()=>`Error in fused matMul: inner shapes (${l}) and (${u}) of Tensors with shapes ${c.shape} and ${p.shape} and transposeA=${e} and transposeB=${o} must match.`);let w=At(c.shape.slice(0,-2),p.shape.slice(0,-2)).concat([m,f]),I=e?P(c,[g,l,m]):P(c,[g,m,l]),k=o?P(p,[x,f,u]):P(p,[x,u,f]),$;n!=null&&($=T(n,"bias","fused matMul"),[$]=xt($,c),At(w,$.shape));let R;a!=null&&(R=T(a,"prelu weights","fused matMul"));let D=(L,M)=>{let[B,G,V,W]=M,H=Li(P(L,V.shape),V,s),U,q;if(!e&&!o?(U=St(H,G,!1,!0),q=St(B,H,!0,!1)):!e&&o?(U=St(H,G,!1,!1),q=St(H,B,!0,!1)):e&&!o?(U=St(G,H,!1,!0),q=St(B,H,!1,!1)):(U=St(G,H,!0,!0),q=St(H,B,!0,!0)),n!=null){let X=Mi(W,H);return[U,q,X]}else return[U,q]},_={a:I,b:k,bias:$,preluActivationWeights:R},O={transposeA:e,transposeB:o,activation:s,leakyreluAlpha:i};return n==null?ke((M,B,G)=>{let V=N.runKernel(Vn,_,O);return G([M,B,V]),{value:P(V,w),gradFunc:D}})(I,k):ke((M,B,G,V)=>{let W=N.runKernel(Vn,_,O);return V([M,B,W,G]),{value:P(W,w),gradFunc:D}})(I,k,$)}var NC=S({fusedMatMul_:wO});function IO(r){return Rc(r,.54,.46)}var kC=S({hammingWindow_:IO});function SO(r){return Rc(r,.5,.5)}var om=S({hannWindow_:SO});function vO(r,t,e,o=!1,n=0){let s=0,a=[];for(;s+t<=r.size;)a.push(yt(r,s,t)),s+=e;if(o)for(;s<r.size;){let i=s+t-r.size,c=Ot([yt(r,s,t-i),Lr([i],n)]);a.push(c),s+=e}return a.length===0?Po([],[0,t]):P(Ot(a),[a.length,t])}var nm=S({frame_:vO});function NO(r,t,e,o,n=om){o==null&&(o=em(t));let s=nm(r,t,e),a=j(s,n(t));return _o(a,o)}var EC=S({stft_:NO});function kO(r,t,e,o,n="bilinear",s=0){let a=T(r,"image","cropAndResize"),i=T(t,"boxes","cropAndResize","float32"),c=T(e,"boxInd","cropAndResize","int32"),p=i.shape[0];E(a.rank===4,()=>`Error in cropAndResize: image must be rank 4,but got rank ${a.rank}.`),E(i.rank===2&&i.shape[1]===4,()=>`Error in cropAndResize: boxes must be have size [${p},4] but had shape ${i.shape}.`),E(c.rank===1&&c.shape[0]===p,()=>`Error in cropAndResize: boxInd must be have size [${p}] but had shape ${i.shape}.`),E(o.length===2,()=>`Error in cropAndResize: cropSize must be of length 2, but got length ${o.length}.`),E(o[0]>=1&&o[1]>=1,()=>`cropSize must be atleast [1,1], but was ${o}`),E(n==="bilinear"||n==="nearest",()=>`method must be bilinear or nearest, but was ${n}`);let l={image:a,boxes:i,boxInd:c},u={method:n,extrapolationValue:s,cropSize:o};return N.runKernel(_s,l,u)}var $C=S({cropAndResize_:kO});function EO(r){let t=T(r,"image","flipLeftRight","float32");E(t.rank===4,()=>`Error in flipLeftRight: image must be rank 4,but got rank ${t.rank}.`);let e={image:t};return N.runKernel(js,e,{})}var AC=S({flipLeftRight_:EO});function $O(r){let t=T(r,"image","grayscaleToRGB"),e=t.rank-1,o=t.shape[e];E(t.rank>=2,()=>`Error in grayscaleToRGB: images must be at least rank 2, but got rank ${t.rank}.`),E(o===1,()=>`Error in grayscaleToRGB: last dimension of a grayscale image should be size 1, but got size ${o}.`);let n=new Array(t.rank);return n.fill(1,0,e),n[e]=3,Br(t,n)}var RC=S({grayscaleToRGB_:$O});function AO(r,t,e=0,o=.5){let n=T(r,"image","rotateWithOffset","float32");E(n.rank===4,()=>`Error in rotateWithOffset: image must be rank 4,but got rank ${n.rank}.`);let s={image:n},a={radians:t,fillValue:e,center:o};return N.runKernel(Ja,s,a)}var DC=S({rotateWithOffset_:AO});function hr(r,t,e,o,n,s){o==null&&(o=.5),n==null&&(n=Number.NEGATIVE_INFINITY),s==null&&(s=0);let a=r.shape[0];return e=Math.min(e,a),E(0<=o&&o<=1,()=>`iouThreshold must be in [0, 1], but was '${o}'`),E(r.rank===2,()=>`boxes must be a 2D tensor, but was of rank '${r.rank}'`),E(r.shape[1]===4,()=>`boxes must have 4 columns, but 2nd dimension was ${r.shape[1]}`),E(t.rank===1,()=>"scores must be a 1D tensor"),E(t.shape[0]===a,()=>`scores has incompatible shape with boxes. Expected ${a}, but was ${t.shape[0]}`),E(0<=s&&s<=1,()=>`softNmsSigma must be in [0, 1], but was '${s}'`),{maxOutputSize:e,iouThreshold:o,scoreThreshold:n,softNmsSigma:s}}function RO(r,t,e,o=.5,n=Number.NEGATIVE_INFINITY){let s=T(r,"boxes","nonMaxSuppression","float32"),a=T(t,"scores","nonMaxSuppression","float32"),i=hr(s,a,e,o,n);e=i.maxOutputSize,o=i.iouThreshold,n=i.scoreThreshold;let c={maxOutputSize:e,iouThreshold:o,scoreThreshold:n};return N.runKernel(la,{boxes:s,scores:a},c)}var FC=S({nonMaxSuppression_:RO});function _C(r,t,e){let o=DO(r,t,e),n=o<0?-(o+1):o;r.splice(n,0,t)}function DO(r,t,e){return _O(r,t,e||FO)}function FO(r,t){return r>t?1:r<t?-1:0}function _O(r,t,e){let o=0,n=r.length,s=0,a=!1;for(;o<n;){s=o+(n-o>>>1);let i=e(t,r[s]);i>0?o=s+1:(n=s,a=!i)}return a?o:-o-1}function sm(r,t,e,o,n){return sx(r,t,e,o,n,0)}function am(r,t,e,o,n,s){return sx(r,t,e,o,n,0,!1,s,!0)}function im(r,t,e,o,n,s){return sx(r,t,e,o,n,s,!0)}function sx(r,t,e,o,n,s,a=!1,i=!1,c=!1){let p=[];for(let g=0;g<t.length;g++)t[g]>n&&p.push({score:t[g],boxIndex:g,suppressBeginIndex:0});p.sort(OC);let l=s>0?-.5/s:0,u=[],m=[];for(;u.length<e&&p.length>0;){let g=p.pop(),{score:x,boxIndex:b,suppressBeginIndex:w}=g;if(x<n)break;let I=!1;for(let k=u.length-1;k>=w;--k){let $=OO(r,b,u[k]);if($>=o){I=!0;break}if(g.score=g.score*PO(o,l,$),g.score<=n)break}g.suppressBeginIndex=u.length,I||(g.score===x?(u.push(b),m.push(g.score)):g.score>n&&_C(p,g,OC))}let f=u.length,d=e-f;i&&d>0&&(u.push(...new Array(d).fill(0)),m.push(...new Array(d).fill(0)));let h={selectedIndices:u};return a&&(h.selectedScores=m),c&&(h.validOutputs=f),h}function OO(r,t,e){let o=r.subarray(t*4,t*4+4),n=r.subarray(e*4,e*4+4),s=Math.min(o[0],o[2]),a=Math.min(o[1],o[3]),i=Math.max(o[0],o[2]),c=Math.max(o[1],o[3]),p=Math.min(n[0],n[2]),l=Math.min(n[1],n[3]),u=Math.max(n[0],n[2]),m=Math.max(n[1],n[3]),f=(i-s)*(c-a),d=(u-p)*(m-l);if(f<=0||d<=0)return 0;let h=Math.max(s,p),g=Math.max(a,l),x=Math.min(i,u),b=Math.min(c,m),w=Math.max(x-h,0)*Math.max(b-g,0);return w/(f+d-w)}function PO(r,t,e){let o=Math.exp(t*e*e);return e<=r?o:0}function OC(r,t){return r.score-t.score||r.score===t.score&&t.boxIndex-r.boxIndex}async function LO(r,t,e,o=.5,n=Number.NEGATIVE_INFINITY){let s=T(r,"boxes","nonMaxSuppressionAsync"),a=T(t,"scores","nonMaxSuppressionAsync"),i=hr(s,a,e,o,n);e=i.maxOutputSize,o=i.iouThreshold,n=i.scoreThreshold;let c=await Promise.all([s.data(),a.data()]),p=c[0],l=c[1],{selectedIndices:u}=sm(p,l,e,o,n);return s!==r&&s.dispose(),a!==t&&a.dispose(),we(u,"int32")}var PC=LO;function MO(r,t,e,o=.5,n=Number.NEGATIVE_INFINITY,s=0){let a=T(r,"boxes","nonMaxSuppression"),i=T(t,"scores","nonMaxSuppression"),c=hr(a,i,e,o,n,s);e=c.maxOutputSize,o=c.iouThreshold,n=c.scoreThreshold,s=c.softNmsSigma;let p={boxes:a,scores:i},l={maxOutputSize:e,iouThreshold:o,scoreThreshold:n,softNmsSigma:s},u=N.runKernel(ma,p,l);return{selectedIndices:u[0],selectedScores:u[1]}}var LC=S({nonMaxSuppressionWithScore_:MO});async function BO(r,t,e,o=.5,n=Number.NEGATIVE_INFINITY,s=0){let a=T(r,"boxes","nonMaxSuppressionAsync"),i=T(t,"scores","nonMaxSuppressionAsync"),c=hr(a,i,e,o,n,s);e=c.maxOutputSize,o=c.iouThreshold,n=c.scoreThreshold,s=c.softNmsSigma;let p=await Promise.all([a.data(),i.data()]),l=p[0],u=p[1],{selectedIndices:m,selectedScores:f}=im(l,u,e,o,n,s);return a!==r&&a.dispose(),i!==t&&i.dispose(),{selectedIndices:we(m,"int32"),selectedScores:we(f)}}var MC=BO;function VO(r,t,e,o=.5,n=Number.NEGATIVE_INFINITY,s=!1){let a=T(r,"boxes","nonMaxSuppression"),i=T(t,"scores","nonMaxSuppression"),c=hr(a,i,e,o,n,null),p=c.maxOutputSize,l=c.iouThreshold,u=c.scoreThreshold,m={boxes:a,scores:i},f={maxOutputSize:p,iouThreshold:l,scoreThreshold:u,padToMaxOutputSize:s},d=N.runKernel(ua,m,f);return{selectedIndices:d[0],validOutputs:d[1]}}var BC=S({nonMaxSuppressionPadded_:VO});async function GO(r,t,e,o=.5,n=Number.NEGATIVE_INFINITY,s=!1){let a=T(r,"boxes","nonMaxSuppressionAsync"),i=T(t,"scores","nonMaxSuppressionAsync"),c=hr(a,i,e,o,n,null),p=c.maxOutputSize,l=c.iouThreshold,u=c.scoreThreshold,[m,f]=await Promise.all([a.data(),i.data()]),{selectedIndices:d,validOutputs:h}=am(m,f,p,l,u,s);return a!==r&&a.dispose(),i!==t&&i.dispose(),{selectedIndices:we(d,"int32"),validOutputs:it(h,"int32")}}var VC=GO;function UO(r,t,e=!1,o=!1){let n=T(r,"images","resizeBilinear");E(n.rank===3||n.rank===4,()=>`Error in resizeBilinear: x must be rank 3 or 4, but got rank ${n.rank}.`),E(t.length===2,()=>`Error in resizeBilinear: new shape must 2D, but got shape ${t}.`),E(o===!1||e===!1,()=>"Error in resizeBilinear: If halfPixelCenters is true, alignCorners must be false.");let s=n,a=!1;n.rank===3&&(a=!0,s=P(n,[1,n.shape[0],n.shape[1],n.shape[2]]));let[]=t,i={images:s},c={alignCorners:e,halfPixelCenters:o,size:t},p=N.runKernel(Na,i,c);return a?P(p,[p.shape[1],p.shape[2],p.shape[3]]):p}var cm=S({resizeBilinear_:UO});function zO(r,t,e=!1,o=!1){let n=T(r,"images","resizeNearestNeighbor");E(n.rank===3||n.rank===4,()=>`Error in resizeNearestNeighbor: x must be rank 3 or 4, but got rank ${n.rank}.`),E(t.length===2,()=>`Error in resizeNearestNeighbor: new shape must 2D, but got shape ${t}.`),E(n.dtype==="float32"||n.dtype==="int32",()=>"`images` must have `int32` or `float32` as dtype"),E(o===!1||e===!1,()=>"Error in resizeNearestNeighbor: If halfPixelCenters is true, alignCorners must be false.");let s=n,a=!1;n.rank===3&&(a=!0,s=P(n,[1,n.shape[0],n.shape[1],n.shape[2]]));let[]=t,i={images:s},c={alignCorners:e,halfPixelCenters:o,size:t},p=N.runKernel(va,i,c);return a?P(p,[p.shape[1],p.shape[2],p.shape[3]]):p}var pm=S({resizeNearestNeighbor_:zO});function WO(r,t="binary",e=!1,o=.5){let n=T(r,"image","threshold"),s=.2989,a=.587,i=.114,c=n.shape[0]*n.shape[1],p=j(we([o]),255),l,u,m,f;if(E(n.rank===3,()=>`Error in threshold: image must be rank 3,but got rank ${n.rank}.`),E(n.shape[2]===3||n.shape[2]===1,()=>`Error in threshold: image color channel must be equal to 3 or 1but got ${n.shape[2]}.`),E(n.dtype==="int32"||n.dtype==="float32",()=>`Error in dtype: image dtype must be int32 or float32,but got dtype ${n.dtype}.`),E(t==="otsu"||t==="binary",()=>`Method must be binary or otsu, but was ${t}`),n.shape[2]===3){[l,u,m]=dr(n,[1,1,1],-1);let g=j(l,s),x=j(u,a),b=j(m,i);f=ot(ot(g,x),b)}else f=r;if(t==="otsu"){let g=Yp(dt(Fi(f),"int32"),fe([]),256);p=HO(g,c)}let d=e?Ro(f,p):no(f,p);return dt(j(d,255),"int32")}function HO(r,t){let e=we([-1]),o=we([0]),n=we([0]),s,a,i,c,p,l;for(let u=0;u<r.size-1;u++){s=yt(r,0,u+1),a=yt(r,u+1),p=Ct(vt(s),t),l=Ct(vt(a),t);let m=vt(j(s,Do(0,s.size)));i=Ct(m,vt(s));let f=Lr(a.shape,s.size),d=ot(Do(0,a.size),f),h=j(a,d);c=Ct(vt(h),vt(a));let g=pt(i,c),x=pt(i,c),b=j(p,l);n=j(j(b,g),x);let w=no(n,o);o=je(w,n,o),e=je(w,we([u]),e)}return e}var GC=S({threshold_:WO});function qO(r,t,e="nearest",o="constant",n=0,s){let a=T(r,"image","transform","float32"),i=T(t,"transforms","transform","float32");E(a.rank===4,()=>`Error in transform: image must be rank 4,but got rank ${a.rank}.`),E(i.rank===2&&(i.shape[0]===a.shape[0]||i.shape[0]===1)&&i.shape[1]===8,()=>"Error in transform: Input transform should be batch x 8 or 1 x 8"),E(s==null||s.length===2,()=>`Error in transform: outputShape must be [height, width] or null, but got ${s}.`);let c={image:a,transforms:i},p={interpolation:e,fillMode:o,fillValue:n,outputShape:s};return N.runKernel(ja,c,p)}var UC=S({transform_:qO});function KO(r,t,e){E(t%1===0,()=>`bandPart(): numLower must be an integer, got ${t}.`),E(e%1===0,()=>`bandPart(): numUpper must be an integer, got ${e}.`);let o=T(r,"a","bandPart");E(o.rank>=2,()=>`bandPart(): Rank must be at least 2, got ${o.rank}.`);let n=o.shape,[s,a]=o.shape.slice(-2);if(!(t<=s))throw new Error(`bandPart(): numLower (${t}) must not be greater than the number of rows (${s}).`);if(!(e<=a))throw new Error(`bandPart(): numUpper (${e}) must not be greater than the number of columns (${a}).`);t<0&&(t=s),e<0&&(e=a);let i=P(Do(0,s,1,"int32"),[-1,1]),c=Do(0,a,1,"int32"),p=pt(i,c),l=so(Ro(p,it(+t,"int32")),xi(p,it(-e,"int32"))),u=Ve([s,a],o.dtype);return P(he(_e(P(o,[-1,s,a])).map(m=>je(l,m,u))),n)}var zC=S({bandPart_:KO});function jO(r){let t;if(Array.isArray(r)){t=!1,E(r!=null&&r.length>0,()=>"Gram-Schmidt process: input must not be null, undefined, or empty");let n=r[0].shape[0];for(let s=1;s<r.length;++s)E(r[s].shape[0]===n,()=>`Gram-Schmidt: Non-unique lengths found in the input vectors: (${r[s].shape[0]} vs. ${n})`)}else t=!0,r=dr(r,r.shape[0],0).map(n=>Oo(n,[0]));E(r.length<=r[0].shape[0],()=>`Gram-Schmidt: Number of vectors (${r.length}) exceeds number of dimensions (${r[0].shape[0]}).`);let e=[],o=r;for(let n=0;n<r.length;++n)e.push(N.tidy(()=>{let s=o[n];if(n>0)for(let a=0;a<n;++a){let i=j(vt(j(e[a],s)),e[a]);s=pt(s,i)}return Ct(s,oo(s,"euclidean"))}));return t?he(e,0):e}var WC=S({gramSchmidt_:jO});function XO(r,t=!1){if(E(r.rank>=2,()=>`qr() requires input tensor to have a rank >= 2, but got rank ${r.rank}`),r.rank===2)return HC(r,t);{let e=r.shape.slice(0,r.shape.length-2).reduce((c,p)=>c*p),o=_e(P(r,[e,r.shape[r.shape.length-2],r.shape[r.shape.length-1]]),0),n=[],s=[];o.forEach(c=>{let[p,l]=HC(c,t);n.push(p),s.push(l)});let a=P(he(n,0),r.shape),i=P(he(s,0),r.shape);return[a,i]}}function HC(r,t=!1){return N.tidy(()=>{E(r.shape.length===2,()=>`qr2d() requires a 2D Tensor, but got a ${r.shape.length}D Tensor.`);let e=r.shape[0],o=r.shape[1],n=fl(e),s=Le(r),a=Po([[1]],[1,1]),i=Le(a),c=e>=o?o:e;for(let p=0;p<c;++p){let l=s,u=i,m=n;[i,s,n]=N.tidy(()=>{let f=yt(s,[p,p],[e-p,1]),d=oo(f),h=yt(s,[p,p],[1,1]),g=je(no(h,0),Po([[-1]]),Po([[1]])),x=pt(h,j(g,d)),b=Ct(f,x);b.shape[0]===1?i=Le(a):i=Ot([a,yt(b,[1,0],[b.shape[0]-1,b.shape[1]])],0);let w=de(Ct(St(g,x),d)),I=yt(s,[p,0],[e-p,o]),k=j(w,i),$=Eo(i);if(p===0)s=pt(I,St(k,St($,I)));else{let _=pt(I,St(k,St($,I)));s=Ot([yt(s,[0,0],[p,o]),_],0)}let R=Eo(k),D=yt(n,[0,p],[e,n.shape[1]-p]);if(p===0)n=pt(D,St(St(D,i),R));else{let _=pt(D,St(St(D,i),R));n=Ot([yt(n,[0,0],[e,p]),_],1)}return[i,s,n]}),ee([l,u,m])}return!t&&e>o&&(n=yt(n,[0,0],[e,o]),s=yt(s,[0,0],[o,o])),[n,s]})}var qC=S({qr_:XO});var Kt;(function(r){r[r.NONE=0]="NONE",r[r.MEAN=1]="MEAN",r[r.SUM=2]="SUM",r[r.SUM_BY_NONZERO_WEIGHTS=3]="SUM_BY_NONZERO_WEIGHTS"})(Kt||(Kt={}));function YO(r,t,e=Kt.SUM_BY_NONZERO_WEIGHTS){let o=T(r,"losses","computeWeightedLoss"),n=null;t!=null&&(n=T(t,"weights","computeWeightedLoss"));let s=n==null?o:j(o,n);if(e===Kt.NONE)return s;if(e===Kt.SUM)return vt(s);if(e===Kt.MEAN){if(n==null)return ao(s);{let a=o.size/n.size,i=Ct(vt(s),vt(n));return a>1?Ct(i,it(a)):i}}if(e===Kt.SUM_BY_NONZERO_WEIGHTS){if(n==null)return Ct(vt(s),it(o.size));{let a=j(n,Vr(o.shape)),i=dt(vt(ki(a,it(0))),"float32");return Ct(vt(s),i)}}throw Error(`Unknown reduction: ${e}`)}var Ie=S({computeWeightedLoss_:YO});function ZO(r,t,e,o=Kt.SUM_BY_NONZERO_WEIGHTS){let n=T(r,"labels","absoluteDifference"),s=T(t,"predictions","absoluteDifference"),a=null;e!=null&&(a=T(e,"weights","absoluteDifference")),Mt(n.shape,s.shape,"Error in absoluteDifference: ");let i=ne(pt(n,s));return Ie(i,a,o)}var KC=S({absoluteDifference_:ZO});function QO(r,t,e,o,n=Kt.SUM_BY_NONZERO_WEIGHTS){let s=T(r,"labels","cosineDistance"),a=T(t,"predictions","cosineDistance"),i=null;o!=null&&(i=T(o,"weights","cosineDistance")),Mt(s.shape,a.shape,"Error in cosineDistance: ");let c=it(1),p=pt(c,vt(j(s,a),e,!0));return Ie(p,i,n)}var jC=S({cosineDistance_:QO});function JO(r,t,e,o=Kt.SUM_BY_NONZERO_WEIGHTS){let n=T(r,"labels","hingeLoss"),s=T(t,"predictions","hingeLoss"),a=null;e!=null&&(a=T(e,"weights","hingeLoss")),Mt(n.shape,s.shape,"Error in hingeLoss: ");let i=it(1);n=pt(j(it(2),n),i);let c=Gr(pt(i,j(n,s)));return Ie(c,a,o)}var XC=S({hingeLoss_:JO});function tP(r,t,e,o=1,n=Kt.SUM_BY_NONZERO_WEIGHTS){let s=T(r,"labels","huberLoss"),a=T(t,"predictions","huberLoss"),i=null;e!=null&&(i=T(e,"weights","huberLoss")),Mt(s.shape,a.shape,"Error in huberLoss: ");let c=it(o),p=ne(pt(a,s)),l=Ni(p,c),u=pt(p,l),m=ot(j(it(.5),se(l)),j(c,u));return Ie(m,i,n)}var YC=S({huberLoss_:tP});function eP(r,t,e,o=1e-7,n=Kt.SUM_BY_NONZERO_WEIGHTS){let s=T(r,"labels","logLoss"),a=T(t,"predictions","logLoss"),i=null;e!=null&&(i=T(e,"weights","logLoss")),Mt(s.shape,a.shape,"Error in logLoss: ");let c=it(1),p=it(o),l=de(j(s,fr(ot(a,p)))),u=j(pt(c,s),fr(ot(pt(c,a),p))),m=pt(l,u);return Ie(m,i,n)}var ZC=S({logLoss_:eP});function rP(r,t,e,o=Kt.SUM_BY_NONZERO_WEIGHTS){let n=T(r,"labels","meanSquaredError"),s=T(t,"predictions","meanSquaredError"),a=null;e!=null&&(a=T(e,"weights","meanSquaredError")),Mt(n.shape,s.shape,"Error in meanSquaredError: ");let i=Oi(n,s);return Ie(i,a,o)}var QC=S({meanSquaredError_:rP});function oP(r,t){let e=T(r,"labels","sigmoidCrossEntropyWithLogits"),o=T(t,"logits","sigmoidCrossEntropyWithLogits");Mt(e.shape,o.shape,"Error in sigmoidCrossEntropyWithLogits: ");let n=Gr(o),s=j(o,e),a=bi(Be(de(ne(o))));return ot(pt(n,s),a)}function nP(r,t,e,o=0,n=Kt.SUM_BY_NONZERO_WEIGHTS){let s=T(r,"multiClassLabels","sigmoidCrossEntropy"),a=T(t,"logits","sigmoidCrossEntropy"),i=null;if(e!=null&&(i=T(e,"weights","sigmoidCrossEntropy")),Mt(s.shape,a.shape,"Error in sigmoidCrossEntropy: "),o>0){let p=it(o),l=it(1),u=it(.5);s=ot(j(s,pt(l,p)),j(u,p))}let c=oP(s,a);return Ie(c,i,n)}var JC=S({sigmoidCrossEntropy_:nP});function sP(r,t,e=-1){if(e===-1&&(e=t.rank-1),e!==t.rank-1)throw Error(`Softmax cross entropy along a non-last dimension is not yet supported. Labels / logits was rank ${t.rank} and dim was ${e}`);return ke((n,s,a)=>{let c=Ti(s,[e],!0),p=pt(dt(s,"float32"),c);a([n,p]);let l=de(j(p,n));return{value:vt(l,[e]),gradFunc:(f,d)=>{let[h,g]=d,x=Ao(f.shape,[e]);return[j(P(f,x),pt(dt(h,"float32"),Be(g))),j(P(f,x),pt(Be(g),dt(h,"float32")))]}}})(r,t)}function aP(r,t,e,o=0,n=Kt.SUM_BY_NONZERO_WEIGHTS){let s=T(r,"onehotLabels","softmaxCrossEntropy"),a=T(t,"logits","softmaxCrossEntropy"),i=null;if(e!=null&&(i=T(e,"weights","softmaxCrossEntropy")),Mt(s.shape,a.shape,"Error in softmaxCrossEntropy: "),o>0){let p=it(o),l=it(1),u=it(s.shape[1]);s=ot(j(s,pt(l,p)),Ct(p,u))}let c=sP(s,a);return Ie(c,i,n)}var tT=S({softmaxCrossEntropy_:aP});function iP(r,t,e,o){let n=T(r,"indices","sparseFillEmptyRows","int32"),s=T(t,"values","sparseFillEmptyRows"),a=T(e,"denseShape","sparseFillEmptyRows","int32"),i=T(o,"defaultValue","sparseFillEmptyRows",s.dtype);if(n.rank!==2)throw new Error(`Indices should be Tensor2D but received shape
        ${n.shape}`);if(s.rank!==1)throw new Error(`Values should be Tensor1D but received shape ${s.shape}`);if(a.rank!==1)throw new Error(`Dense shape should be Tensor1D but received shape ${a.shape}`);if(i.rank!==0)throw new Error(`Default value should be a scalar but received shape ${i.shape}`);let c={indices:n,values:s,denseShape:a,defaultValue:i},p=N.runKernel(Pa,c);return{outputIndices:p[0],outputValues:p[1],emptyRowIndicator:p[2],reverseIndexMap:p[3]}}var eT=S({sparseFillEmptyRows_:iP});function cP(r,t,e){let o=T(r,"inputIndices","sparseReshape","int32"),n=T(t,"inputShape","sparseReshape","int32"),s=T(e,"newShape","sparseReshape","int32");if(o.rank!==2)throw new Error(`Input indices should be Tensor2D but received shape
        ${o.shape}`);if(n.rank!==1)throw new Error(`Input shape should be Tensor1D but received shape ${n.shape}`);if(s.rank!==1)throw new Error(`New shape should be Tensor1D but received shape ${s.shape}`);let a={inputIndices:o,inputShape:n,newShape:s},i=N.runKernel(La,a);return{outputIndices:i[0],outputShape:i[1]}}var rT=S({sparseReshape_:cP});function pP(r,t,e){let o=T(r,"data","sparseSegmentMean"),n=T(t,"indices","sparseSegmentMean","int32"),s=T(e,"segmentIds","sparseSegmentMean","int32");if(o.rank<1)throw new Error("Data should be at least 1 dimensional but received scalar");if(n.rank!==1)throw new Error(`Indices should be Tensor1D but received shape
          ${n.shape}`);if(s.rank!==1)throw new Error(`Segment ids should be Tensor1D but received shape
          ${s.shape}`);let a={data:o,indices:n,segmentIds:s};return N.runKernel(Ma,a)}var oT=S({sparseSegmentMean_:pP});function lP(r,t,e){let o=T(r,"data","sparseSegmentSum"),n=T(t,"indices","sparseSegmentSum","int32"),s=T(e,"segmentIds","sparseSegmentSum","int32");if(o.rank<1)throw new Error("Data should be at least 1 dimensional but received scalar");if(n.rank!==1)throw new Error(`Indices should be Tensor1D but received shape
         ${n.shape}`);if(s.rank!==1)throw new Error(`Segment ids should be Tensor1D but received shape
         ${s.shape}`);let a={data:o,indices:n,segmentIds:s};return N.runKernel(Ba,a)}var nT=S({sparseSegmentSum_:lP});function uP(r,t,e,o,n,s,a,i){let c=T(r,"data","stringNGrams","string");if(c.dtype!=="string")throw new Error("Data must be of datatype string");if(c.shape.length!==1)throw new Error(`Data must be a vector, saw: ${c.shape}`);let p=T(t,"dataSplits","stringNGrams");if(p.dtype!=="int32")throw new Error("Data splits must be of datatype int32");let l={separator:e,nGramWidths:o,leftPad:n,rightPad:s,padWidth:a,preserveShortSequences:i},u={data:c,dataSplits:p},m=N.runKernel(Ua,u,l);return{nGrams:m[0],nGramsSplits:m[1]}}var sT=S({stringNGrams_:uP});function mP(r,t,e=!0){let o=T(r,"input","stringSplit","string"),n=T(t,"delimiter","stringSplit","string");if(o.rank!==1)throw new Error(`Input should be Tensor1D but received shape ${o.shape}`);if(n.rank!==0)throw new Error(`Delimiter should be a scalar but received shape ${n.shape}`);let s={skipEmpty:e},a={input:o,delimiter:n},i=N.runKernel(za,a,s);return{indices:i[0],values:i[1],shape:i[2]}}var aT=S({stringSplit_:mP});function fP(r,t){let e=T(r,"input","stringToHashBucketFast","string"),o={numBuckets:t};if(t<=0)throw new Error("Number of buckets must be at least 1");let n={input:e};return N.runKernel(Wa,n,o)}var iT=S({stringToHashBucketFast_:fP});var cT={fft:Fo,ifft:io,rfft:_o,irfft:_i},lm={hammingWindow:kC,hannWindow:om,frame:nm,stft:EC},pT={flipLeftRight:AC,grayscaleToRGB:RC,resizeNearestNeighbor:pm,resizeBilinear:cm,rotateWithOffset:DC,cropAndResize:$C,nonMaxSuppression:FC,nonMaxSuppressionAsync:PC,nonMaxSuppressionWithScore:LC,nonMaxSuppressionWithScoreAsync:MC,nonMaxSuppressionPadded:BC,nonMaxSuppressionPaddedAsync:VC,threshold:GC,transform:UC},lT={bandPart:zC,gramSchmidt:WC,qr:qC},uT={absoluteDifference:KC,computeWeightedLoss:Ie,cosineDistance:jC,hingeLoss:XC,huberLoss:YC,logLoss:ZC,meanSquaredError:QC,sigmoidCrossEntropy:JC,softmaxCrossEntropy:tT},mT={sparseFillEmptyRows:eT,sparseReshape:rT,sparseSegmentMean:oT,sparseSegmentSum:nT},fT={stringNGrams:sT,stringSplit:aT,stringToHashBucketFast:iT};var Ee=class extends Mp{minimize(t,e=!1,o){let{value:n,grads:s}=this.computeGradients(t,o);if(o!=null){let a=o.map(i=>({name:i.name,tensor:s[i.name]}));this.applyGradients(a)}else this.applyGradients(s);return ee(s),e?n:(n.dispose(),null)}get iterations(){return this.iterations_==null&&(this.iterations_=0),this.iterations_}incrementIterations(){this.iterations_=this.iterations+1}computeGradients(t,e){return Ku(t,e)}dispose(){this.iterations_!=null&&ee(this.iterations_)}async saveIterations(){return this.iterations_==null&&(this.iterations_=0),{name:"iter",tensor:it(this.iterations_,"int32")}}async getWeights(){throw new Error("getWeights() is not implemented for this optimizer yet.")}async setWeights(t){throw new Error(`setWeights() is not implemented for this optimizer class ${this.getClassName()}`)}async extractIterations(t){return this.iterations_=(await t[0].tensor.data())[0],t.slice(1)}};Object.defineProperty(Ee,Symbol.hasInstance,{value:r=>r.minimize!=null&&r.computeGradients!=null&&r.applyGradients!=null});var Yn=class extends Ee{constructor(t,e,o=null){super(),this.learningRate=t,this.rho=e,this.epsilon=o,this.accumulatedGrads=[],this.accumulatedUpdates=[],o==null&&(this.epsilon=N.backend.epsilon())}applyGradients(t){(Array.isArray(t)?t.map(o=>o.name):Object.keys(t)).forEach((o,n)=>{let s=N.registeredVariables[o],a=!1;this.accumulatedGrads[n]==null&&(this.accumulatedGrads[n]={originalName:`${o}/accum_grad`,variable:ht(()=>Jt(s).variable(a))}),this.accumulatedUpdates[n]==null&&(this.accumulatedUpdates[n]={originalName:`${o}/accum_var`,variable:ht(()=>Jt(s).variable(a))});let i=Array.isArray(t)?t[n].tensor:t[o];if(i==null)return;let c=this.accumulatedGrads[n].variable,p=this.accumulatedUpdates[n].variable;ht(()=>{let l=ot(j(c,this.rho),j(se(i),1-this.rho)),u=j(Ct(Te(ot(p,this.epsilon)),Te(ot(c,this.epsilon))),i),m=ot(j(p,this.rho),j(se(u),1-this.rho));c.assign(l),p.assign(m);let f=ot(j(u,-this.learningRate),s);s.assign(f)})}),this.incrementIterations()}dispose(){this.accumulatedUpdates!=null&&(ee(this.accumulatedGrads.map(t=>t.variable)),ee(this.accumulatedUpdates.map(t=>t.variable)))}async getWeights(){let t=[...this.accumulatedGrads,...this.accumulatedUpdates];return[await this.saveIterations()].concat(t.map(e=>({name:e.originalName,tensor:e.variable})))}async setWeights(t){t=await this.extractIterations(t);let e=t.length/2,o=!1;this.accumulatedGrads=t.slice(0,e).map(n=>({originalName:n.name,variable:n.tensor.variable(o)})),this.accumulatedUpdates=t.slice(e,e*2).map(n=>({originalName:n.name,variable:n.tensor.variable(o)}))}getConfig(){return{learningRate:this.learningRate,rho:this.rho,epsilon:this.epsilon}}static fromConfig(t,e){return new t(e.learningRate,e.rho,e.epsilon)}};Yn.className="Adadelta";Me(Yn);var Zn=class extends Ee{constructor(t,e=.1){super(),this.learningRate=t,this.initialAccumulatorValue=e,this.accumulatedGrads=[]}applyGradients(t){(Array.isArray(t)?t.map(o=>o.name):Object.keys(t)).forEach((o,n)=>{let s=N.registeredVariables[o];this.accumulatedGrads[n]==null&&(this.accumulatedGrads[n]={originalName:`${o}/accumulator`,variable:ht(()=>Lr(s.shape,this.initialAccumulatorValue).variable(!1))});let a=Array.isArray(t)?t[n].tensor:t[o];if(a==null)return;let i=this.accumulatedGrads[n].variable;ht(()=>{let c=ot(i,se(a));i.assign(c);let p=ot(j(Ct(a,Te(ot(c,N.backend.epsilon()))),-this.learningRate),s);s.assign(p)})}),this.incrementIterations()}dispose(){this.accumulatedGrads!=null&&ee(this.accumulatedGrads.map(t=>t.variable))}async getWeights(){return[await this.saveIterations()].concat(this.accumulatedGrads.map(t=>({name:t.originalName,tensor:t.variable})))}async setWeights(t){t=await this.extractIterations(t);let e=!1;this.accumulatedGrads=t.map(o=>({originalName:o.name,variable:o.tensor.variable(e)}))}getConfig(){return{learningRate:this.learningRate,initialAccumulatorValue:this.initialAccumulatorValue}}static fromConfig(t,e){return new t(e.learningRate,e.initialAccumulatorValue)}};Zn.className="Adagrad";Me(Zn);var Qn=class extends Ee{constructor(t,e,o,n=null){super(),this.learningRate=t,this.beta1=e,this.beta2=o,this.epsilon=n,this.accumulatedFirstMoment=[],this.accumulatedSecondMoment=[],ht(()=>{this.accBeta1=it(e).variable(),this.accBeta2=it(o).variable()}),n==null&&(this.epsilon=N.backend.epsilon())}applyGradients(t){let e=Array.isArray(t)?t.map(o=>o.name):Object.keys(t);ht(()=>{let o=pt(1,this.accBeta1),n=pt(1,this.accBeta2);e.forEach((s,a)=>{let i=N.registeredVariables[s],c=!1;this.accumulatedFirstMoment[a]==null&&(this.accumulatedFirstMoment[a]={originalName:`${s}/m`,variable:ht(()=>Jt(i).variable(c))}),this.accumulatedSecondMoment[a]==null&&(this.accumulatedSecondMoment[a]={originalName:`${s}/v`,variable:ht(()=>Jt(i).variable(c))});let p=Array.isArray(t)?t[a].tensor:t[s];if(p==null)return;let l=this.accumulatedFirstMoment[a].variable,u=this.accumulatedSecondMoment[a].variable,m=ot(j(l,this.beta1),j(p,1-this.beta1)),f=ot(j(u,this.beta2),j(se(p),1-this.beta2)),d=Ct(m,o),h=Ct(f,n);l.assign(m),u.assign(f);let g=ot(j(Ct(d,ot(Te(h),this.epsilon)),-this.learningRate),i);i.assign(g)}),this.accBeta1.assign(j(this.accBeta1,this.beta1)),this.accBeta2.assign(j(this.accBeta2,this.beta2))}),this.incrementIterations()}dispose(){this.accBeta1.dispose(),this.accBeta2.dispose(),this.accumulatedFirstMoment!=null&&ee(this.accumulatedFirstMoment.map(t=>t.variable)),this.accumulatedSecondMoment!=null&&ee(this.accumulatedSecondMoment.map(t=>t.variable))}async getWeights(){let t=[...this.accumulatedFirstMoment,...this.accumulatedSecondMoment];return[await this.saveIterations()].concat(t.map(e=>({name:e.originalName,tensor:e.variable})))}async setWeights(t){t=await this.extractIterations(t),ht(()=>{this.accBeta1.assign(mr(this.beta1,this.iterations_+1)),this.accBeta2.assign(mr(this.beta2,this.iterations_+1))});let e=t.length/2,o=!1;this.accumulatedFirstMoment=t.slice(0,e).map(n=>({originalName:n.name,variable:n.tensor.variable(o)})),this.accumulatedSecondMoment=t.slice(e,e*2).map(n=>({originalName:n.name,variable:n.tensor.variable(o)}))}getConfig(){return{learningRate:this.learningRate,beta1:this.beta1,beta2:this.beta2,epsilon:this.epsilon}}static fromConfig(t,e){return new t(e.learningRate,e.beta1,e.beta2,e.epsilon)}};Qn.className="Adam";Me(Qn);var Jn=class extends Ee{constructor(t,e,o,n=null,s=0){super(),this.learningRate=t,this.beta1=e,this.beta2=o,this.epsilon=n,this.decay=s,this.accumulatedFirstMoment=[],this.accumulatedWeightedInfNorm=[],ht(()=>{this.iteration=it(0).variable(),this.accBeta1=it(e).variable()}),n==null&&(this.epsilon=N.backend.epsilon())}applyGradients(t){let e=Array.isArray(t)?t.map(o=>o.name):Object.keys(t);ht(()=>{let o=pt(1,this.accBeta1),n=Ct(-this.learningRate,ot(j(this.iteration,this.decay),1));e.forEach((s,a)=>{let i=N.registeredVariables[s],c=!1;this.accumulatedFirstMoment[a]==null&&(this.accumulatedFirstMoment[a]={originalName:`${s}/m`,variable:Jt(i).variable(c)}),this.accumulatedWeightedInfNorm[a]==null&&(this.accumulatedWeightedInfNorm[a]={originalName:`${s}/v`,variable:Jt(i).variable(c)});let p=Array.isArray(t)?t[a].tensor:t[s];if(p==null)return;let l=this.accumulatedFirstMoment[a].variable,u=this.accumulatedWeightedInfNorm[a].variable,m=ot(j(l,this.beta1),j(p,1-this.beta1)),f=j(u,this.beta2),d=ne(p),h=vi(f,d);l.assign(m),u.assign(h);let g=ot(j(Ct(n,o),Ct(m,ot(h,this.epsilon))),i);i.assign(g)}),this.iteration.assign(ot(this.iteration,1)),this.accBeta1.assign(j(this.accBeta1,this.beta1))}),this.incrementIterations()}dispose(){this.accBeta1.dispose(),this.iteration.dispose(),this.accumulatedFirstMoment!=null&&ee(this.accumulatedFirstMoment.map(t=>t.variable)),this.accumulatedWeightedInfNorm!=null&&ee(this.accumulatedWeightedInfNorm.map(t=>t.variable))}async getWeights(){throw new Error("getWeights() is not implemented for Adamax yet.")}async setWeights(t){throw new Error("setWeights() is not implemented for Adamax yet.")}getConfig(){return{learningRate:this.learningRate,beta1:this.beta1,beta2:this.beta2,epsilon:this.epsilon,decay:this.decay}}static fromConfig(t,e){return new t(e.learningRate,e.beta1,e.beta2,e.epsilon,e.decay)}};Jn.className="Adamax";Me(Jn);var co=class extends Ee{constructor(t){super(),this.learningRate=t,this.setLearningRate(t)}applyGradients(t){(Array.isArray(t)?t.map(o=>o.name):Object.keys(t)).forEach((o,n)=>{let s=Array.isArray(t)?t[n].tensor:t[o];if(s==null)return;let a=N.registeredVariables[o];ht(()=>{let i=ot(j(this.c,s),a);a.assign(i)})}),this.incrementIterations()}setLearningRate(t){this.learningRate=t,this.c!=null&&this.c.dispose(),this.c=Ke(it(-t))}dispose(){this.c.dispose()}async getWeights(){return[await this.saveIterations()]}async setWeights(t){if(t=await this.extractIterations(t),t.length!==0)throw new Error("SGD optimizer does not have settable weights.")}getConfig(){return{learningRate:this.learningRate}}static fromConfig(t,e){return new t(e.learningRate)}};co.className="SGD";Me(co);var ts=class extends co{constructor(t,e,o=!1){super(t),this.learningRate=t,this.momentum=e,this.useNesterov=o,this.accumulations=[],this.m=it(this.momentum)}applyGradients(t){(Array.isArray(t)?t.map(o=>o.name):Object.keys(t)).forEach((o,n)=>{let s=N.registeredVariables[o];this.accumulations[n]==null&&(this.accumulations[n]={originalName:`${o}/momentum`,variable:ht(()=>Jt(s).variable(!1))});let a=this.accumulations[n].variable,i=Array.isArray(t)?t[n].tensor:t[o];i!=null&&ht(()=>{let c,p=ot(j(this.m,a),i);this.useNesterov?c=ot(j(this.c,ot(i,j(p,this.m))),s):c=ot(j(this.c,p),s),a.assign(p),s.assign(c)})}),this.incrementIterations()}dispose(){this.m.dispose(),this.accumulations!=null&&ee(this.accumulations.map(t=>t.variable))}setMomentum(t){this.momentum=t}async getWeights(){return[await this.saveIterations()].concat(this.accumulations.map(t=>({name:t.originalName,tensor:t.variable})))}async setWeights(t){t=await this.extractIterations(t);let e=!1;this.accumulations=t.map(o=>({originalName:o.name,variable:o.tensor.variable(e)}))}getConfig(){return{learningRate:this.learningRate,momentum:this.momentum,useNesterov:this.useNesterov}}static fromConfig(t,e){return new t(e.learningRate,e.momentum,e.useNesterov)}};ts.className="Momentum";Me(ts);var es=class extends Ee{constructor(t,e=.9,o=0,n=null,s=!1){if(super(),this.learningRate=t,this.decay=e,this.momentum=o,this.epsilon=n,this.accumulatedMeanSquares=[],this.accumulatedMoments=[],this.accumulatedMeanGrads=[],this.centered=s,n==null&&(this.epsilon=N.backend.epsilon()),t==null)throw new Error("learningRate for RMSPropOptimizer must be defined.")}applyGradients(t){(Array.isArray(t)?t.map(o=>o.name):Object.keys(t)).forEach((o,n)=>{let s=N.registeredVariables[o],a=!1;this.accumulatedMeanSquares[n]==null&&(this.accumulatedMeanSquares[n]={originalName:`${o}/rms`,variable:ht(()=>Jt(s).variable(a))}),this.accumulatedMoments[n]==null&&(this.accumulatedMoments[n]={originalName:`${o}/momentum`,variable:ht(()=>Jt(s).variable(a))}),this.accumulatedMeanGrads[n]==null&&this.centered&&(this.accumulatedMeanGrads[n]={originalName:`${o}/mg`,variable:ht(()=>Jt(s).variable(a))});let i=Array.isArray(t)?t[n].tensor:t[o];if(i==null)return;let c=this.accumulatedMeanSquares[n].variable,p=this.accumulatedMoments[n].variable;ht(()=>{let l=ot(j(c,this.decay),j(se(i),1-this.decay));if(this.centered){let u=this.accumulatedMeanGrads[n].variable,m=ot(j(u,this.decay),j(i,1-this.decay)),f=Ct(j(i,this.learningRate),Te(pt(l,ot(se(m),this.epsilon)))),d=ot(j(p,this.momentum),f);c.assign(l),u.assign(m),p.assign(d);let h=pt(s,d);s.assign(h)}else{let u=ot(j(c,this.decay),j(se(i),1-this.decay)),m=ot(j(p,this.momentum),Ct(j(i,this.learningRate),Te(ot(u,this.epsilon))));c.assign(u),p.assign(m);let f=pt(s,m);s.assign(f)}})}),this.incrementIterations()}dispose(){this.accumulatedMeanSquares!=null&&ee(this.accumulatedMeanSquares.map(t=>t.variable)),this.accumulatedMeanGrads!=null&&this.centered&&ee(this.accumulatedMeanGrads.map(t=>t.variable)),this.accumulatedMoments!=null&&ee(this.accumulatedMoments.map(t=>t.variable))}async getWeights(){let t=[...this.accumulatedMeanSquares,...this.accumulatedMoments];return this.centered&&t.push(...this.accumulatedMeanGrads),[await this.saveIterations()].concat(t.map(e=>({name:e.originalName,tensor:e.variable})))}async setWeights(t){t=await this.extractIterations(t);let e=this.centered?t.length/3:t.length/2,o=!1;this.accumulatedMeanSquares=t.slice(0,e).map(n=>({originalName:n.name,variable:n.tensor.variable(o)})),this.accumulatedMoments=t.slice(e,e*2).map(n=>({originalName:n.name,variable:n.tensor.variable(o)})),this.centered&&(this.accumulatedMeanGrads=t.slice(e*2,e*3).map(n=>({originalName:n.name,variable:n.tensor.variable(o)})))}getConfig(){return{learningRate:this.learningRate,decay:this.decay,momentum:this.momentum,epsilon:this.epsilon,centered:this.centered}}static fromConfig(t,e){return new t(e.learningRate,e.decay,e.momentum,e.epsilon,e.centered)}};es.className="RMSProp";Me(es);var gr=class{static sgd(t){return new co(t)}static momentum(t,e,o=!1){return new ts(t,e,o)}static rmsprop(t,e=.9,o=0,n=null,s=!1){return new es(t,e,o,n,s)}static adam(t=.001,e=.9,o=.999,n=null){return new Qn(t,e,o,n)}static adadelta(t=.001,e=.95,o=null){return new Yn(t,e,o)}static adamax(t=.002,e=.9,o=.999,n=null,s=0){return new Jn(t,e,o,n,s)}static adagrad(t,e=.1){return new Zn(t,e)}};var dP={sgd:gr.sgd,momentum:gr.momentum,adadelta:gr.adadelta,adagrad:gr.adagrad,rmsprop:gr.rmsprop,adamax:gr.adamax,adam:gr.adam};var hP=typeof requestAnimationFrame<"u"?requestAnimationFrame:typeof setImmediate<"u"?setImmediate:r=>r();function um(){return new Promise(r=>hP(()=>r()))}var v={};kt(v,{ERF_A1:()=>DP,ERF_A2:()=>FP,ERF_A3:()=>_P,ERF_A4:()=>OP,ERF_A5:()=>PP,ERF_P:()=>RP,PARALLELIZE_THRESHOLD:()=>mm,RowPartitionType:()=>po,SELU_SCALE:()=>AP,SELU_SCALEALPHA:()=>$P,applyActivation:()=>Bi,assertAndGetBroadcastShape:()=>At,assertAxesAreInnerMostDims:()=>tF,assertParamsConsistent:()=>gP,assignToTypedArray:()=>UP,axesAreInnerMostDims:()=>yg,calculateShapes:()=>E0,checkEinsumDimSizes:()=>jP,checkPadOnDimRoundingMode:()=>re,combineLocations:()=>H0,combineRaggedTensorToTensorShapes:()=>yP,complexWithEvenIndex:()=>BP,complexWithOddIndex:()=>VP,computeConv2DInfo:()=>li,computeConv3DInfo:()=>G0,computeDefaultPad:()=>og,computeDilation2DInfo:()=>eD,computeOptimalWindowSize:()=>wP,computeOutAndReduceShapes:()=>JD,computeOutShape:()=>xP,computePool2DInfo:()=>rg,computePool3DInfo:()=>rD,convertConv2DDataFormat:()=>U0,decodeEinsumEquation:()=>qP,eitherStridesOrDilationsAreOne:()=>Ne,expandShapeToKeepDim:()=>Ao,exponent:()=>WP,exponents:()=>zP,fromStringArrayToUint8:()=>hL,fromUint8ToStringArray:()=>dL,getAxesPermutation:()=>eF,getBroadcastDims:()=>v0,getComplexWithIndex:()=>GP,getEinsumComputePath:()=>XP,getEinsumPermutation:()=>KP,getFusedBiasGradient:()=>Mi,getFusedDyActivation:()=>Li,getImageCenter:()=>IP,getInnerMostAxes:()=>oF,getPermuted:()=>vP,getRaggedRank:()=>CP,getReductionAxes:()=>Gu,getReshaped:()=>SP,getReshapedPermuted:()=>NP,getRowPartitionTypesHelper:()=>bP,getSliceBeginCoords:()=>kP,getSliceSize:()=>EP,getSparseFillEmptyRowsIndicesDenseShapeMismatch:()=>JP,getSparseFillEmptyRowsNegativeIndexErrorMessage:()=>tL,getSparseFillEmptyRowsOutOfRangeIndexErrorMessage:()=>eL,getSparseReshapeEmptyTensorZeroOutputDimErrorMessage:()=>nL,getSparseReshapeInputOutputMismatchErrorMessage:()=>aL,getSparseReshapeInputOutputMultipleErrorMessage:()=>sL,getSparseReshapeMultipleNegativeOneOutputDimErrorMessage:()=>rL,getSparseReshapeNegativeOutputDimErrorMessage:()=>oL,getSparseSegmentReductionIndicesOutOfRangeErrorMessage:()=>lL,getSparseSegmentReductionNegativeSegmentIdsErrorMessage:()=>iL,getSparseSegmentReductionNonIncreasingSegmentIdsErrorMessage:()=>cL,getSparseSegmentReductionSegmentIdOutOfRangeErrorMessage:()=>pL,getUndoAxesPermutation:()=>rF,isIdentityPermutation:()=>YP,log:()=>q2,mergeRealAndImagArrays:()=>LP,prepareAndValidate:()=>k0,prepareSplitSize:()=>QP,segment_util:()=>ix,shouldFuse:()=>Vi,slice_util:()=>ce,splitRealAndImagArrays:()=>MP,tupleValuesAreOne:()=>pi,upcastType:()=>Qt,validateDefaultValueShape:()=>TP,validateInput:()=>Uu,validateUpdateShape:()=>Kh,warn:()=>Xr});function gP(r,t){let e=r[0].length;r.forEach((n,s)=>{E(n.length===e,()=>`Error in concat${e}D: rank of tensors[${s}] must be the same as the rank of the rest (${e})`)}),E(t>=0&&t<e,()=>`Error in concat${e}D: axis must be between 0 and ${e-1}.`);let o=r[0];r.forEach((n,s)=>{for(let a=0;a<e;a++)E(a===t||n[a]===o[a],()=>`Error in concat${e}D: Shape of tensors[${s}] (${n}) does not match the shape of the rest (${o}) along the non-concatenated axis ${s}.`)})}function xP(r,t){let e=r[0].slice();for(let o=1;o<r.length;o++)e[t]+=r[o][t];return e}var po;(function(r){r[r.FIRST_DIM_SIZE=0]="FIRST_DIM_SIZE",r[r.VALUE_ROWIDS=1]="VALUE_ROWIDS",r[r.ROW_LENGTHS=2]="ROW_LENGTHS",r[r.ROW_SPLITS=3]="ROW_SPLITS",r[r.ROW_LIMITS=4]="ROW_LIMITS",r[r.ROW_STARTS=5]="ROW_STARTS"})(po||(po={}));function yP(r,t,e){let o=new Array;if(e==null&&t==null)return o;if(t==null)for(;o.length<r+e.length;)o.push(-1);else o=t.slice();if(e==null)return o;if(r+e.length!==o.length)throw new Error(`rt input.shape and shape=${t} are incompatible: rt input.rank = ${r+e.length}, but shape.rank = ${o.length}`);for(let n=1;n<e.length;++n){let s=e[n],a=o[o.length-e.length+n],i=o[a];if(s>=0)if(i>=0){if(i!==s)throw new Error(`rt input.shape and shape=${t} are incompatible: rt input.shape[${n+r}] = ${s} but shape[${n+r}] = ${i}`)}else o[a]=s}return o}function bP(r){let t={FIRST_DIM_SIZE:po.FIRST_DIM_SIZE,VALUE_ROWIDS:po.VALUE_ROWIDS,ROW_LENGTHS:po.ROW_LENGTHS,ROW_SPLITS:po.ROW_SPLITS,ROW_LIMITS:po.ROW_LIMITS,ROW_STARTS:po.ROW_STARTS},e=[];for(let o of r)if(o in t)e.push(t[o]);else break;return e}function CP(r){return r.length===0?0:r[0]===po.FIRST_DIM_SIZE?r.length-1:r.length}function TP(r,t){if(r==null||t==null)return;let e=r.length,o=t.length;if(e>=o)throw new Error(`defaultValue.shape=${r} and ragged tensor flatValues.shape=${t}, are incompatible: defaultValue.rank = ${e} must be less than ragged tensor input flatValues.rank = ${o})`);for(let n=0;n<Math.min(e,o-1);++n){let s=r[n],a=t[n+1];if(s>=0&&a>=0&&s!==1&&s!==a)throw new Error(`defaultValue.shape=${r}, and ragged tensor input flatValues.shape=${t} are incompatible: defaultValue.shape[${n-r.length}] = ${s} but ragged tensor input.flatValues.shape[${n-r.length}] = ${a}`)}}var mm=30;function wP(r){return r<=mm?r:nc(r,Math.floor(Math.sqrt(r)))}function IP(r,t,e){let o=e*(typeof r=="number"?r:r[0]),n=t*(typeof r=="number"?r:r[1]);return[o,n]}function SP(r,t,e,o=!0){let n=[];if(o)n=n.concat(t.slice(0)),n.push(r[0]/e),n=n.concat(r.slice(1));else{n=n.concat(r[0]);let s=t.length;for(let a=0;a<s;++a)n=n.concat([r[a+1]/t[a],t[a]]);n=n.concat(r.slice(s+1))}return n}function vP(r,t,e=!0){let o=[];if(e){o.push(t);for(let n=t+1;n<r;++n)n<=2*t?(o.push(n),o.push(n-(t+1))):o.push(n)}else{let n=[],s=[];for(let a=1;a<r;++a)a>=t*2+1||a%2===1?s.push(a):n.push(a);o.push(...n),o.push(0),o.push(...s)}return o}function NP(r,t,e,o=!0){let n=[];o?n.push(r[0]/e):n.push(r[0]*e);for(let s=1;s<r.length;++s)s<=t.length?o?n.push(t[s-1]*r[s]):n.push(r[s]/t[s-1]):n.push(r[s]);return n}function kP(r,t){let e=[0];for(let o=0;o<t;++o)e.push(r[o][0]);return e}function EP(r,t,e){let o=r.slice(0,1);for(let n=0;n<e;++n)o.push(r[n+1]-t[n][0]-t[n][1]);return o}var $P=1.7580993408473768,AP=1.0507009873554805;var RP=.3275911,DP=.254829592,FP=-.284496736,_P=1.421413741,OP=-1.453152027,PP=1.061405429;function LP(r,t){if(r.length!==t.length)throw new Error(`Cannot merge real and imag arrays of different lengths. real:${r.length}, imag: ${t.length}.`);let e=new Float32Array(r.length*2);for(let o=0;o<e.length;o+=2)e[o]=r[o/2],e[o+1]=t[o/2];return e}function MP(r){let t=new Float32Array(r.length/2),e=new Float32Array(r.length/2);for(let o=0;o<r.length;o+=2)t[o/2]=r[o],e[o/2]=r[o+1];return{real:t,imag:e}}function BP(r){let t=Math.ceil(r.length/4),e=new Float32Array(t),o=new Float32Array(t);for(let n=0;n<r.length;n+=4)e[Math.floor(n/4)]=r[n],o[Math.floor(n/4)]=r[n+1];return{real:e,imag:o}}function VP(r){let t=Math.floor(r.length/4),e=new Float32Array(t),o=new Float32Array(t);for(let n=2;n<r.length;n+=4)e[Math.floor(n/4)]=r[n],o[Math.floor(n/4)]=r[n+1];return{real:e,imag:o}}function GP(r,t){let e=r[t*2],o=r[t*2+1];return{real:e,imag:o}}function UP(r,t,e,o){r[o*2]=t,r[o*2+1]=e}function zP(r,t){let e=new Float32Array(r/2),o=new Float32Array(r/2);for(let n=0;n<Math.ceil(r/2);n++){let s=(t?2:-2)*Math.PI*(n/r);e[n]=Math.cos(s),o[n]=Math.sin(s)}return{real:e,imag:o}}function WP(r,t,e){let o=(e?2:-2)*Math.PI*(r/t),n=Math.cos(o),s=Math.sin(o);return{real:n,imag:s}}var ax="->",HP=/->/g,dT=",",hT="...";function qP(r,t){r=r.replace(/\s/g,"");let e=(r.length-r.replace(HP,"").length)/ax.length;if(e<1)throw new Error("Equations without an arrow are not supported.");if(e>1)throw new Error(`Equation must contain exactly one arrow ("${ax}").`);let[o,n]=r.split(ax);E(o.indexOf(hT)===-1,()=>`The ellipsis notation ("${hT}") is not supported yet.`);let s=o.split(dT),a=s.length;if(t!==a)throw new Error(`Expected ${a} input tensors, received ${t}`);if(a>2)throw new Error("Support for more than 2 input tensors is not implemented yet.");let i=[];for(let m=0;m<n.length;++m){let f=n[m];if(!s.some(d=>d.indexOf(f)!==-1))throw new Error(`Output subscripts contain the label ${f} not present in the input subscripts.`);i.indexOf(f)===-1&&i.push(f)}for(let m=0;m<o.length;++m){let f=o[m];i.indexOf(f)===-1&&f!==dT&&i.push(f)}let c=new Array(s.length);for(let m=0;m<a;++m){if(new Set(s[m].split("")).size!==s[m].length)throw new Error(`Found duplicate axes in input component ${s[m]}. Support for duplicate axes in input is not implemented yet.`);c[m]=[];for(let f=0;f<s[m].length;++f)c[m].push(i.indexOf(s[m][f]))}let p=i.length,l=n.length,u=[];for(let m=l;m<p;++m)u.push(m);return{allDims:i,summedDims:u,idDims:c}}function KP(r,t){let e=new Array(r);e.fill(-1);for(let n=0;n<t.length;++n)e[t[n]]=n;let o=[];for(let n=0;n<r;++n)e[n]===-1&&o.push(n);return e=e.filter(n=>n!==-1),{permutationIndices:e,expandDims:o}}function jP(r,t,e){let o=new Array(r);for(let n=0;n<e.length;++n){let s=e[n].shape;for(let a=0;a<t[n].length;++a)o[t[n][a]]===void 0?o[t[n][a]]=s[a]:E(o[t[n][a]]===s[a],()=>`Expected dimension ${o[t[n][a]]} at axis ${a} of input shaped ${JSON.stringify(s)}, but got dimension ${s[a]}`)}}function XP(r,t){let e=r,o=[],n=0;r.length===0&&e.push(-1),n=r.length+1;for(let a=0;a<n;++a)o.push([]);let s=[];for(let a=0;a<e.length;++a){let i=e[a],c=ZP(t,i);for(let p of c)s.indexOf(p)===-1&&(o[a].push(p),s.push(p))}return{path:e,steps:o}}function YP(r){return r.every((t,e)=>t===e)}function ZP(r,t){let e=[];for(let o=0;o<r.length;++o)(r[o].length===0||r[o].indexOf(t)!==-1||t===-1)&&e.push(o);return e}function QP(r,t,e=0){let o=[];if(typeof t=="number")E(r.shape[e]%t===0,()=>"Number of splits must evenly divide the axis."),o=new Array(t).fill(r.shape[e]/t);else{let n=t.reduce((a,i)=>(i===-1&&(a+=1),a),0);E(n<=1,()=>"There should be only one negative value in split array.");let s=t.indexOf(-1);if(s!==-1){let a=t.reduce((i,c)=>c>0?i+c:i);t[s]=r.shape[e]-a}E(r.shape[e]===t.reduce((a,i)=>a+i),()=>"The sum of sizes must match the size of the axis dimension."),o=t}return o}function JP(r){return`Received SparseTensor with denseShape[0] = 0 but
  indices.shape[0] = ${r}`}function tL(r,t){return`indices(${r}, 0) is invalid: ${t} < 0`}function eL(r,t,e){return`indices(${r}, 0) is invalid: ${t} >= ${e}`}function rL(r,t){return`only one output dimension may be -1, not both ${r} and ${t}`}function oL(r,t){return`size ${r} must be non-negative, not ${t}`}function nL(){return"reshape cannot infer the missing input size for an empty tensor unless all specified input sizes are non-zero"}function sL(r,t){let e=It(r),o=It(t);return`Input to reshape is a SparseTensor with ${e}
  dense values, but the requested shape requires a multiple of ${o}. inputShape=${r} outputShape= ${t}`}function aL(r,t){let e=It(r),o=It(t);return`Input to reshape is a tensor with ${e} dense values, but the requested shape has ${o}. inputShape=${r} outputShape=${t}`}function iL(){return"segment ids must be >= 0"}function cL(){return"segment ids are not increasing"}function pL(r,t){return`Segment id ${r} out of range [0, ${t}), possibly because segmentIds input is not sorted.`}function lL(r,t,e){return`Bad: indices[${r}] == ${t} out of range [0, ${e})`}var ix={};kt(ix,{collectGatherOpShapeInfo:()=>fL,computeOutShape:()=>mL,segOpComputeOptimalWindowSize:()=>uL});function uL(r,t){let e=!1,o;for(r<=mm?(o=r,e=!0):o=nc(r,Math.floor(Math.sqrt(r)));!e;)o>t||o===r?e=!0:o=nc(r,o+1);return o}function mL(r,t,e){let o=[],n=r.length;for(let s=0;s<n;s++)s!==t?o.push(r[s]):o.push(e);return o}function fL(r,t,e,o){let n=t.shape.length,s=r.shape.length;if(o!==0&&(o<-n||o>n))throw new Error(`Expect batchDims in the range of [-${n}, ${n}], but got ${o}`);if(o<0&&(o+=n),o>s)throw new Error(`batchDims (${o}) must be less than rank(x) (
    ${s}).`);if(e<o)throw new Error(`batchDims (${o}) must be less than or equal to axis (${e}).`);for(let u=0;u<o;++u)if(r.shape[u]!==t.shape[u])throw new Error(`x.shape[${u}]: ${r.shape[u]} should be equal to indices.shape[${u}]: ${t.shape[u]}.`);let a=r.shape[e],i=[],c=1,p=1,l=1;for(let u=0;u<o;++u)i.push(r.shape[u]),c*=r.shape[u];for(let u=o;u<e;u++)i.push(r.shape[u]),p*=r.shape[u];for(let u=o;u<n;u++)i.push(t.shape[u]);for(let u=e+1;u<s;u++)i.push(r.shape[u]),l*=r.shape[u];return{batchSize:c,sliceSize:l,outerSize:p,dimSize:a,outputShape:i}}function dL(r){try{return r.map(t=>wc(t))}catch(t){throw new Error(`Failed to decode encoded string bytes into utf-8, error: ${t}`)}}function hL(r){return r.map(t=>Wn(t))}var ge={};kt(ge,{nonMaxSuppressionV3Impl:()=>sm,nonMaxSuppressionV4Impl:()=>am,nonMaxSuppressionV5Impl:()=>im,whereImpl:()=>tm});A().prototype.abs=function(){return this.throwIfDisposed(),ne(this)};A().prototype.acos=function(){return this.throwIfDisposed(),Bp(this)};A().prototype.acosh=function(){return this.throwIfDisposed(),Vp(this)};A().prototype.add=function(r){return this.throwIfDisposed(),ot(this,r)};A().prototype.all=function(r,t){return this.throwIfDisposed(),Gp(this,r,t)};A().prototype.any=function(r,t){return this.throwIfDisposed(),Up(this,r,t)};A().prototype.argMax=function(r){return this.throwIfDisposed(),zp(this,r)};A().prototype.argMin=function(r){return this.throwIfDisposed(),Wp(this,r)};A().prototype.asScalar=function(){return this.throwIfDisposed(),E(this.size===1,()=>"The array must have only 1 element."),P(this,[])};A().prototype.asType=function(r){return this.throwIfDisposed(),dt(this,r)};A().prototype.as1D=function(){return this.throwIfDisposed(),P(this,[this.size])};A().prototype.as2D=function(r,t){return this.throwIfDisposed(),P(this,[r,t])};A().prototype.as3D=function(r,t,e){return this.throwIfDisposed(),P(this,[r,t,e])};A().prototype.as4D=function(r,t,e,o){return this.throwIfDisposed(),P(this,[r,t,e,o])};A().prototype.as5D=function(r,t,e,o,n){return this.throwIfDisposed(),P(this,[r,t,e,o,n])};A().prototype.asin=function(){return this.throwIfDisposed(),Hp(this)};A().prototype.asinh=function(){return this.throwIfDisposed(),qp(this)};A().prototype.atan=function(){return this.throwIfDisposed(),Kp(this)};A().prototype.atan2=function(r){return this.throwIfDisposed(),jp(this,r)};A().prototype.atanh=function(){return this.throwIfDisposed(),Xp(this)};A().prototype.avgPool=function(r,t,e,o){return this.throwIfDisposed(),ui(this,r,t,e,o)};A().prototype.batchToSpaceND=function(r,t){return this.throwIfDisposed(),mi(this,r,t)};A().prototype.batchNorm=function(r,t,e,o,n){return this.throwIfDisposed(),Or(this,r,t,e,o,n)};A().prototype.broadcastTo=function(r){return this.throwIfDisposed(),Pr(this,r)};A().prototype.cast=function(r){return this.throwIfDisposed(),dt(this,r)};A().prototype.ceil=function(){return this.throwIfDisposed(),Zp(this)};A().prototype.clipByValue=function(r,t){return this.throwIfDisposed(),Qp(this,r,t)};A().prototype.concat=function(r,t){return this.throwIfDisposed(),r instanceof Et&&(r=[r]),Ot([this,...r],t)};A().prototype.conv1d=function(r,t,e,o,n,s){return this.throwIfDisposed(),tl(this,r,t,e,o,n,s)};A().prototype.conv2dTranspose=function(r,t,e,o,n){return this.throwIfDisposed(),el(this,r,t,e,o,n)};A().prototype.conv2d=function(r,t,e,o,n,s){return this.throwIfDisposed(),Mr(this,r,t,e,o,n,s)};A().prototype.cos=function(){return this.throwIfDisposed(),rl(this)};A().prototype.cosh=function(){return this.throwIfDisposed(),ol(this)};A().prototype.cumprod=function(r,t,e){return this.throwIfDisposed(),nl(this,r,t,e)};A().prototype.cumsum=function(r,t,e){return this.throwIfDisposed(),sl(this,r,t,e)};A().prototype.depthToSpace=function(r,t){return this.throwIfDisposed(),al(this,r,t)};A().prototype.depthwiseConv2d=function(r,t,e,o,n,s){return this.throwIfDisposed(),$o(this,r,t,e,o,n,s)};A().prototype.dilation2d=function(r,t,e,o,n){return this.throwIfDisposed(),il(this,r,t,e,o,n)};A().prototype.divNoNan=function(r){return this.throwIfDisposed(),cl(this,r)};A().prototype.div=function(r){return this.throwIfDisposed(),Ct(this,r)};A().prototype.dot=function(r){return this.throwIfDisposed(),pl(this,r)};A().prototype.elu=function(){return this.throwIfDisposed(),di(this)};A().prototype.equal=function(r){return this.throwIfDisposed(),fi(this,r)};A().prototype.erf=function(){return this.throwIfDisposed(),ll(this)};A().prototype.euclideanNorm=function(r,t){return this.throwIfDisposed(),ul(this,r,t)};A().prototype.exp=function(){return this.throwIfDisposed(),Be(this)};A().prototype.expandDims=function(r){return this.throwIfDisposed(),Xe(this,r)};A().prototype.expm1=function(){return this.throwIfDisposed(),ml(this)};A().prototype.fft=function(){return this.throwIfDisposed(),Fo(this)};A().prototype.flatten=function(){return this.throwIfDisposed(),P(this,[this.size])};A().prototype.floor=function(){return this.throwIfDisposed(),hi(this)};A().prototype.floorDiv=function(r){return this.throwIfDisposed(),ii(this,r)};A().prototype.gather=function(r,t){return this.throwIfDisposed(),gi(this,r,t)};A().prototype.greaterEqual=function(r){return this.throwIfDisposed(),xi(this,r)};A().prototype.greater=function(r){return this.throwIfDisposed(),no(this,r)};A().prototype.ifft=function(){return this.throwIfDisposed(),io(this)};A().prototype.irfft=function(){return this.throwIfDisposed(),_i(this)};A().prototype.isFinite=function(){return this.throwIfDisposed(),dl(this)};A().prototype.isInf=function(){return this.throwIfDisposed(),hl(this)};A().prototype.isNaN=function(){return this.throwIfDisposed(),gl(this)};A().prototype.leakyRelu=function(r){return this.throwIfDisposed(),yi(this,r)};A().prototype.lessEqual=function(r){return this.throwIfDisposed(),Ro(this,r)};A().prototype.less=function(r){return this.throwIfDisposed(),xl(this,r)};A().prototype.localResponseNormalization=function(r,t,e,o){return this.throwIfDisposed(),yl(this,r,t,e,o)};A().prototype.logSigmoid=function(){return this.throwIfDisposed(),bl(this)};A().prototype.logSoftmax=function(r){return this.throwIfDisposed(),Cl(this,r)};A().prototype.logSumExp=function(r,t){return this.throwIfDisposed(),Ti(this,r,t)};A().prototype.log=function(){return this.throwIfDisposed(),fr(this)};A().prototype.log1p=function(){return this.throwIfDisposed(),bi(this)};A().prototype.logicalAnd=function(r){return this.throwIfDisposed(),so(this,r)};A().prototype.logicalNot=function(){return this.throwIfDisposed(),wi(this)};A().prototype.logicalOr=function(r){return this.throwIfDisposed(),Ii(this,r)};A().prototype.logicalXor=function(r){return this.throwIfDisposed(),Tl(this,r)};A().prototype.matMul=function(r,t,e){return this.throwIfDisposed(),St(this,r,t,e)};A().prototype.maxPool=function(r,t,e,o){return this.throwIfDisposed(),Si(this,r,t,e,o)};A().prototype.max=function(r,t){return this.throwIfDisposed(),or(this,r,t)};A().prototype.maximum=function(r){return this.throwIfDisposed(),vi(this,r)};A().prototype.mean=function(r,t){return this.throwIfDisposed(),ao(this,r,t)};A().prototype.min=function(r,t){return this.throwIfDisposed(),Xn(this,r,t)};A().prototype.minimum=function(r){return this.throwIfDisposed(),Ni(this,r)};A().prototype.mirrorPad=function(r,t){return this.throwIfDisposed(),wl(this,r,t)};A().prototype.mod=function(r){return this.throwIfDisposed(),Il(this,r)};A().prototype.mul=function(r){return this.throwIfDisposed(),j(this,r)};A().prototype.neg=function(){return this.throwIfDisposed(),de(this)};A().prototype.norm=function(r,t,e){return this.throwIfDisposed(),oo(this,r,t,e)};A().prototype.notEqual=function(r){return this.throwIfDisposed(),ki(this,r)};A().prototype.oneHot=function(r,t=1,e=0){return this.throwIfDisposed(),Kn(this,r,t,e)};A().prototype.onesLike=function(){return this.throwIfDisposed(),Sl(this)};A().prototype.pad=function(r,t){return this.throwIfDisposed(),nr(this,r,t)};A().prototype.pool=function(r,t,e,o,n,s){return this.throwIfDisposed(),vl(this,r,t,e,o,n,s)};A().prototype.pow=function(r){return this.throwIfDisposed(),mr(this,r)};A().prototype.prelu=function(r){return this.throwIfDisposed(),$i(this,r)};A().prototype.prod=function(r,t){return this.throwIfDisposed(),Nl(this,r,t)};A().prototype.reciprocal=function(){return this.throwIfDisposed(),$l(this)};A().prototype.relu=function(){return this.throwIfDisposed(),Gr(this)};A().prototype.relu6=function(){return this.throwIfDisposed(),Di(this)};A().prototype.reshapeAs=function(r){return this.throwIfDisposed(),P(this,r.shape)};A().prototype.reshape=function(r){return this.throwIfDisposed(),P(this,r)};A().prototype.resizeBilinear=function(r,t,e){return this.throwIfDisposed(),cm(this,r,t,e)};A().prototype.resizeNearestNeighbor=function(r,t,e){return this.throwIfDisposed(),pm(this,r,t,e)};A().prototype.reverse=function(r){return this.throwIfDisposed(),Fe(this,r)};A().prototype.rfft=function(){return this.throwIfDisposed(),_o(this)};A().prototype.round=function(){return this.throwIfDisposed(),Fi(this)};A().prototype.rsqrt=function(){return this.throwIfDisposed(),Al(this)};A().prototype.selu=function(){return this.throwIfDisposed(),Rl(this)};A().prototype.separableConv2d=function(r,t,e,o,n,s){return this.throwIfDisposed(),Dl(this,r,t,e,o,n,s)};A().prototype.sigmoid=function(){return this.throwIfDisposed(),rr(this)};A().prototype.sign=function(){return this.throwIfDisposed(),Fl(this)};A().prototype.sin=function(){return this.throwIfDisposed(),_l(this)};A().prototype.sinh=function(){return this.throwIfDisposed(),Ol(this)};A().prototype.slice=function(r,t){return this.throwIfDisposed(),yt(this,r,t)};A().prototype.softmax=function(r){return this.throwIfDisposed(),Pl(this,r)};A().prototype.softplus=function(){return this.throwIfDisposed(),Ci(this)};A().prototype.spaceToBatchND=function(r,t){return this.throwIfDisposed(),Ei(this,r,t)};A().prototype.split=function(r,t){return this.throwIfDisposed(),dr(this,r,t)};A().prototype.sqrt=function(){return this.throwIfDisposed(),Te(this)};A().prototype.square=function(){return this.throwIfDisposed(),se(this)};A().prototype.squaredDifference=function(r){return this.throwIfDisposed(),Oi(this,r)};A().prototype.squeeze=function(r){return this.throwIfDisposed(),Oo(this,r)};A().prototype.stack=function(r,t){this.throwIfDisposed();let e=r instanceof Et?[this,r]:[this,...r];return he(e,t)};A().prototype.step=function(r){return this.throwIfDisposed(),Pi(this,r)};A().prototype.stridedSlice=function(r,t,e,o,n,s,a,i){return this.throwIfDisposed(),Ll(this,r,t,e,o,n,s,a,i)};A().prototype.sub=function(r){return this.throwIfDisposed(),pt(this,r)};A().prototype.sum=function(r,t){return this.throwIfDisposed(),vt(this,r,t)};A().prototype.tan=function(){return this.throwIfDisposed(),Ml(this)};A().prototype.tanh=function(){return this.throwIfDisposed(),jn(this)};A().prototype.tile=function(r){return this.throwIfDisposed(),Br(this,r)};A().prototype.toBool=function(){return this.throwIfDisposed(),dt(this,"bool")};A().prototype.toFloat=function(){return this.throwIfDisposed(),dt(this,"float32")};A().prototype.toInt=function(){return this.throwIfDisposed(),dt(this,"int32")};A().prototype.topk=function(r,t){return this.throwIfDisposed(),Bl(this,r,t)};A().prototype.transpose=function(r){return this.throwIfDisposed(),Eo(this,r)};A().prototype.unique=function(r){return this.throwIfDisposed(),Vl(this,r)};A().prototype.unsortedSegmentSum=function(r,t){return this.throwIfDisposed(),Gl(this,r,t)};A().prototype.unstack=function(r){return this.throwIfDisposed(),_e(this,r)};A().prototype.where=function(r,t){return this.throwIfDisposed(),je(r,this,t)};A().prototype.zerosLike=function(){return this.throwIfDisposed(),Jt(this)};var gL=F();gL.registerFlag("KEEP_INTERMEDIATE_TENSORS",()=>!1,r=>{r&&console.warn("Keep intermediate tensors is ON. This will print the values of all intermediate tensors during model inference. Not all models support this mode. For details, check e2e/benchmarks/ model_config.js. This significantly impacts performance.")});var sr;(function(r){r[r.DT_INVALID=0]="DT_INVALID",r[r.DT_FLOAT=1]="DT_FLOAT",r[r.DT_DOUBLE=2]="DT_DOUBLE",r[r.DT_INT32=3]="DT_INT32",r[r.DT_UINT8=4]="DT_UINT8",r[r.DT_INT16=5]="DT_INT16",r[r.DT_INT8=6]="DT_INT8",r[r.DT_STRING=7]="DT_STRING",r[r.DT_COMPLEX64=8]="DT_COMPLEX64",r[r.DT_INT64=9]="DT_INT64",r[r.DT_BOOL=10]="DT_BOOL",r[r.DT_QINT8=11]="DT_QINT8",r[r.DT_QUINT8=12]="DT_QUINT8",r[r.DT_QINT32=13]="DT_QINT32",r[r.DT_BFLOAT16=14]="DT_BFLOAT16",r[r.DT_QINT16=15]="DT_QINT16",r[r.DT_QUINT16=16]="DT_QUINT16",r[r.DT_UINT16=17]="DT_UINT16",r[r.DT_COMPLEX128=18]="DT_COMPLEX128",r[r.DT_HALF=19]="DT_HALF",r[r.DT_RESOURCE=20]="DT_RESOURCE",r[r.DT_VARIANT=21]="DT_VARIANT",r[r.DT_UINT32=22]="DT_UINT32",r[r.DT_UINT64=23]="DT_UINT64",r[r.DT_FLOAT_REF=101]="DT_FLOAT_REF",r[r.DT_DOUBLE_REF=102]="DT_DOUBLE_REF",r[r.DT_INT32_REF=103]="DT_INT32_REF",r[r.DT_UINT8_REF=104]="DT_UINT8_REF",r[r.DT_INT16_REF=105]="DT_INT16_REF",r[r.DT_INT8_REF=106]="DT_INT8_REF",r[r.DT_STRING_REF=107]="DT_STRING_REF",r[r.DT_COMPLEX64_REF=108]="DT_COMPLEX64_REF",r[r.DT_INT64_REF=109]="DT_INT64_REF",r[r.DT_BOOL_REF=110]="DT_BOOL_REF",r[r.DT_QINT8_REF=111]="DT_QINT8_REF",r[r.DT_QUINT8_REF=112]="DT_QUINT8_REF",r[r.DT_QINT32_REF=113]="DT_QINT32_REF",r[r.DT_BFLOAT16_REF=114]="DT_BFLOAT16_REF",r[r.DT_QINT16_REF=115]="DT_QINT16_REF",r[r.DT_QUINT16_REF=116]="DT_QUINT16_REF",r[r.DT_UINT16_REF=117]="DT_UINT16_REF",r[r.DT_COMPLEX128_REF=118]="DT_COMPLEX128_REF",r[r.DT_HALF_REF=119]="DT_HALF_REF",r[r.DT_RESOURCE_REF=120]="DT_RESOURCE_REF",r[r.DT_VARIANT_REF=121]="DT_VARIANT_REF",r[r.DT_UINT32_REF=122]="DT_UINT32_REF",r[r.DT_UINT64_REF=123]="DT_UINT64_REF"})(sr||(sr={}));var xT;(function(r){let t;(function(e){e[e.LEGACY=0]="LEGACY",e[e.V1=1]="V1",e[e.V2=2]="V2"})(t=r.CheckpointFormatVersion||(r.CheckpointFormatVersion={}))})(xT||(xT={}));var cx={};function yT(r,t){let e={tfOpName:r,category:"custom",inputs:[],attrs:[],customExecutor:t};cx[r]=e}function fm(r){return cx[r]}function bT(r){delete cx[r]}function C(r,t,e,o,n){let s=t.inputParams[r];if(s&&s.inputIndexStart!==void 0){let i=s.inputIndexStart,c=s.inputIndexEnd===0?void 0:s.inputIndexEnd===void 0?i+1:s.inputIndexEnd;if(s.type==="tensor")return pe(t.inputNames[s.inputIndexStart],e,o,n);if(s.type==="tensors")return t.inputNames.slice(i,c).map(m=>pe(m,e,o,n));let p=pe(t.inputNames.slice(i)[0],e,o,n),l=p.dataSync();return s.type==="number"?l[0]:y.toNestedArray(p.shape,l)}let a=t.attrParams[r];return a&&a.value}function pe(r,t,e,o){let[n,s]=Oe(r);if(o!=null){let i=o.getHashTableHandleByName(n);if(i!=null)return i}let a=e.currentContextIds.find(i=>!!t[dm(n,i)]);return a!==void 0?t[dm(n,a)][s]:void 0}function CT(r,t,e){return t[dm(r,e.currentContextId)]}function xr(r,t){let[e,o,n]=Oe(r);return[dm(e,t&&t.currentContextId),o,n]}function dm(r,t){return t?`${r}-${t}`:r}function Oe(r){let t=r.split(":");if(t.length===1)return[r,0,void 0];let e=t[0],o=t.length===3?t[1]:void 0,n=Number(t[t.length-1]);return[e,n,o]}function zl(r,t,e){let o=C("pad",r,t,e);if(o==="explicit"){o=C("explicitPaddings",r,t,e);let n=[[0,0],[0,0],[0,0],[0,0]];for(let s=0;s<4;s++)n[s][0]=o[s*2],n[s][1]=o[s*2+1];return n}return o}function Ur(r){return r.kept?r:Le(r)}var px={};kt(px,{json:()=>yL});var yL=[{tfOpName:"Add",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"AddV2",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"AddN",category:"arithmetic",inputs:[{start:0,end:0,name:"tensors",type:"tensors"}]},{tfOpName:"BiasAdd",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0}]},{tfOpName:"Sub",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"RealDiv",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Div",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"DivNoNan",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"FloorDiv",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Mul",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Maximum",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Minimum",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Pow",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"SquaredDifference",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Mod",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"FloorMod",category:"arithmetic",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]}];var lx={};kt(lx,{json:()=>bL});var bL=[{tfOpName:"Abs",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Acos",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Asin",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Atan",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Atan2",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"y",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Ceil",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"ClipByValue",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"clipValueMin",type:"number"},{start:2,name:"clipValueMax",type:"number"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Complex",category:"basic_math",inputs:[{start:0,name:"real",type:"tensor"},{start:1,name:"imag",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"ComplexAbs",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Cos",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Cosh",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Elu",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Exp",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Floor",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Log",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Imag",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"Tout",name:"outputType",type:"dtype",notSupported:!0}]},{tfOpName:"Neg",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Real",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"Tout",name:"outputType",type:"dtype",notSupported:!0}]},{tfOpName:"Prelu",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"alpha",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Relu",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Relu6",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Selu",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Sigmoid",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Sin",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Sinh",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Sqrt",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Rsqrt",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Square",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Tan",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Tanh",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Sign",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Round",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Expm1",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Log1p",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Reciprocal",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Softplus",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Asinh",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Acosh",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Atanh",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Erf",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Prod",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axes",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool",notSupported:!0},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"LeakyRelu",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"alpha",name:"alpha",type:"number",defaultValue:.2},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"IsNan",category:"basic_math",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]}];var ux={};kt(ux,{json:()=>CL});var CL=[{tfOpName:"EmptyTensorList",category:"control",inputs:[{start:0,name:"elementShape",type:"shape"},{start:1,name:"maxNumElements",type:"number"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"LoopCond",category:"control",inputs:[{start:0,name:"pred",type:"tensor"}]},{tfOpName:"Switch",category:"control",inputs:[{start:0,name:"data",type:"tensor"},{start:1,name:"pred",type:"tensor"}]},{tfOpName:"Merge",category:"control",inputs:[{start:0,end:0,name:"tensors",type:"tensors"}]},{tfOpName:"Enter",category:"control",inputs:[{start:0,name:"tensor",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"frame_name",name:"frameName",type:"string"},{tfName:"is_constant",name:"isConstant",type:"bool"}]},{tfOpName:"Exit",category:"control",inputs:[{start:0,name:"tensor",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"NextIteration",category:"control",inputs:[{start:0,name:"tensor",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"TensorArrayV3",category:"control",inputs:[{start:0,name:"size",type:"number"}],attrs:[{tfName:"dtype",name:"dtype",type:"dtype"},{tfName:"element_shape",name:"elementShape",type:"shape"},{tfName:"dynamic_size",name:"dynamicSize",type:"bool"},{tfName:"clear_after_read",name:"clearAfterRead",type:"bool"},{tfName:"identical_element_shapes",name:"identicalElementShapes",type:"bool"},{tfName:"tensor_array_name",name:"name",type:"string"}]},{tfOpName:"TensorArrayWriteV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"tensor"},{start:1,name:"index",type:"number"},{start:2,name:"tensor",type:"tensor"},{start:3,name:"flowIn",type:"number"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"TensorArrayReadV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"tensor"},{start:1,name:"index",type:"number"},{start:2,name:"flowIn",type:"number"}],attrs:[{tfName:"dtype",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"TensorArrayGatherV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"tensor"},{start:1,name:"indices",type:"number[]"},{start:2,name:"flowIn",type:"number"}],attrs:[{tfName:"dtype",name:"dtype",type:"dtype"},{tfName:"element_shape",name:"elementShape",type:"shape"}]},{tfOpName:"TensorArrayScatterV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"tensor"},{start:1,name:"indices",type:"number[]"},{start:2,name:"tensor",type:"tensor"},{start:3,name:"flowIn",type:"number"}],attrs:[{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"TensorArrayConcatV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"tensor"},{start:1,name:"flowIn",type:"number"}],attrs:[{tfName:"dtype",name:"dtype",type:"dtype"},{tfName:"element_shape_except0",name:"elementShapeExcept0",type:"shape",notSupported:!0}]},{tfOpName:"TensorArraySplitV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"tensor"},{start:1,name:"tensor",type:"tensor"},{start:2,name:"lengths",type:"number[]"},{start:3,name:"flowIn",type:"number"}],attrs:[{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"TensorArraySizeV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"tensor"},{start:1,name:"flowIn",type:"number"}]},{tfOpName:"TensorArrayCloseV3",category:"control",inputs:[{start:0,name:"tensorArrayId",type:"tensor"}]},{tfOpName:"StatelessIf",category:"control",inputs:[{start:0,name:"cond",type:"tensor"},{start:1,end:0,name:"args",type:"tensors"}],attrs:[{tfName:"then_branch",name:"thenBranch",type:"func"},{tfName:"else_branch",name:"elseBranch",type:"func"}]},{tfOpName:"If",category:"control",inputs:[{start:0,name:"cond",type:"tensor"},{start:1,end:0,name:"args",type:"tensors"}],attrs:[{tfName:"then_branch",name:"thenBranch",type:"func"},{tfName:"else_branch",name:"elseBranch",type:"func"}]},{tfOpName:"StatelessWhile",category:"control",inputs:[{start:0,end:0,name:"args",type:"tensors"}],attrs:[{tfName:"cond",name:"cond",type:"func"},{tfName:"body",name:"body",type:"func"}]},{tfOpName:"While",category:"control",inputs:[{start:0,end:0,name:"args",type:"tensors"}],attrs:[{tfName:"cond",name:"cond",type:"func"},{tfName:"body",name:"body",type:"func"}]},{tfOpName:"TensorListScatter",category:"control",inputs:[{start:0,name:"tensor",type:"tensor"},{start:1,name:"indices",type:"number[]"},{start:2,name:"elementShape",type:"shape"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListScatterV2",category:"control",inputs:[{start:0,name:"tensor",type:"tensor"},{start:1,name:"indices",type:"number[]"},{start:2,name:"elementShape",type:"shape"},{start:3,name:"numElements",type:"number"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListGather",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"},{start:1,name:"indices",type:"number[]"},{start:2,name:"elementShape",type:"shape"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListGetItem",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"},{start:1,name:"index",type:"number"},{start:2,name:"elementShape",type:"shape"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListSetItem",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"},{start:1,name:"index",type:"number"},{start:2,name:"tensor",type:"tensor"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListReserve",category:"control",inputs:[{start:0,name:"elementShape",type:"shape"},{start:1,name:"numElements",type:"number"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListFromTensor",category:"control",inputs:[{start:0,name:"tensor",type:"tensor"},{start:1,name:"elementShape",type:"shape"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListStack",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"},{start:1,name:"elementShape",type:"shape"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"},{tfName:"num_elements",name:"numElements",type:"dtype"}]},{tfOpName:"TensorListSplit",category:"control",inputs:[{start:0,name:"tensor",type:"tensor"},{start:1,name:"elementShape",type:"shape"},{start:2,name:"lengths",type:"number[]"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListConcat",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"}],attrs:[{tfName:"element_shape",name:"elementShape",type:"shape"},{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListConcatV2",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"}],attrs:[{tfName:"element_shape",name:"elementShape",type:"shape"},{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListPopBack",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"},{start:1,name:"elementShape",type:"shape"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListPushBack",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"},{start:1,name:"tensor",type:"tensor"}],attrs:[{tfName:"element_dtype",name:"elementDType",type:"dtype"}]},{tfOpName:"TensorListLength",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"}]},{tfOpName:"TensorListResize",category:"control",inputs:[{start:0,name:"tensorListId",type:"tensor"},{start:1,name:"size",type:"number"}]}];var mx={};kt(mx,{json:()=>TL});var TL=[{tfOpName:"AvgPool",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0},{tfName:"ksize",name:"kernelSize",type:"number[]"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"MaxPool",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0},{tfName:"ksize",name:"kernelSize",type:"number[]"},{tfName:"explicit_paddings",name:"explicitPaddings",type:"number[]",defaultValue:[],notSupported:!0},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"MaxPoolWithArgmax",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"ksize",name:"kernelSize",type:"number[]"},{tfName:"include_batch_in_index",name:"includeBatchInIndex",type:"bool"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"AvgPool3D",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0},{tfName:"ksize",name:"kernelSize",type:"number[]"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"MaxPool3D",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0},{tfName:"ksize",name:"kernelSize",type:"number[]"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Conv1D",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"filter",type:"tensor"}],attrs:[{tfName:"stride",name:"stride",type:"number"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",defaultValue:"NWC"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"dilation",name:"dilation",type:"number",defaultValue:1}]},{tfOpName:"Conv2D",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"filter",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"useCudnnOnGpu",name:"useCudnnOnGpu",type:"bool"},{tfName:"data_format",name:"dataFormat",type:"string",defaultValue:"NHWC"},{tfName:"explicit_paddings",name:"explicitPaddings",type:"number[]",defaultValue:[]},{tfName:"dilations",name:"dilations",type:"number[]"}]},{tfOpName:"_FusedConv2D",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"filter",type:"tensor"},{start:2,end:0,name:"args",type:"tensors"}],attrs:[{tfName:"num_args",name:"numArgs",type:"number"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"explicit_paddings",name:"explicitPaddings",type:"number[]",defaultValue:[]},{tfName:"use_cudnn_on_gpu",name:"useCudnnOnGpu",type:"bool",defaultValue:!0},{tfName:"data_format",name:"dataFormat",type:"string",defaultValue:"NHWC"},{tfName:"dilations",name:"dilations",type:"number[]",defaultValue:[1,1,1,1]},{tfName:"fused_ops",name:"fusedOps",type:"string[]",defaultValue:[]},{tfName:"epsilon",name:"epsilon",type:"number",defaultValue:1e-4},{tfName:"leakyrelu_alpha",name:"leakyreluAlpha",type:"number",defaultValue:.2}]},{tfOpName:"Conv2DBackpropInput",category:"convolution",inputs:[{start:2,name:"x",type:"tensor"},{start:1,name:"filter",type:"tensor"},{start:0,name:"outputShape",type:"number[]"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0},{tfName:"explicit_paddings",name:"explicitPaddings",type:"number[]",defaultValue:[]},{tfName:"dilations",name:"dilations",type:"number[]",notSupported:!0}]},{tfOpName:"DepthwiseConv2d",category:"convolution",inputs:[{start:0,name:"input",type:"tensor"},{start:1,name:"filter",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",defaultValue:"NHWC"},{tfName:"explicit_paddings",name:"explicitPaddings",type:"number[]",defaultValue:[]},{tfName:"dilations",name:"dilations",type:"number[]"}]},{tfOpName:"DepthwiseConv2dNative",category:"convolution",inputs:[{start:0,name:"input",type:"tensor"},{start:1,name:"filter",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",defaultValue:"NHWC"},{tfName:"explicit_paddings",name:"explicitPaddings",type:"number[]",defaultValue:[]},{tfName:"dilations",name:"dilations",type:"number[]"}]},{tfOpName:"FusedDepthwiseConv2dNative",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"filter",type:"tensor"},{start:2,end:0,name:"args",type:"tensors"}],attrs:[{tfName:"num_args",name:"numArgs",type:"number"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",defaultValue:"NHWC"},{tfName:"dilations",name:"dilations",type:"number[]",defaultValue:[1,1,1,1]},{tfName:"fused_ops",name:"fusedOps",type:"string[]",defaultValue:[]},{tfName:"explicit_paddings",name:"explicitPaddings",type:"number[]",defaultValue:[]}]},{tfOpName:"Conv3D",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"filter",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"padding",name:"pad",type:"string"},{tfName:"data_format",name:"dataFormat",type:"string",defaultValue:"NHWC"},{tfName:"dilations",name:"dilations",type:"number[]"}]},{tfOpName:"Dilation2D",category:"convolution",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"filter",type:"tensor"}],attrs:[{tfName:"strides",name:"strides",type:"number[]"},{tfName:"rates",name:"dilations",type:"number[]"},{tfName:"padding",name:"pad",type:"string"}]}];var fx={};kt(fx,{json:()=>wL});var wL=[{tfOpName:"Fill",category:"creation",inputs:[{start:0,name:"shape",type:"number[]"},{start:1,name:"value",type:"number"}],attrs:[{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"LinSpace",category:"creation",inputs:[{start:0,name:"start",type:"number"},{start:1,name:"stop",type:"number"},{start:2,name:"num",type:"number"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"OneHot",category:"creation",inputs:[{start:0,name:"indices",type:"tensor"},{start:1,name:"depth",type:"number"},{start:2,name:"onValue",type:"number",defaultValue:1},{start:3,name:"offValue",type:"number",defaultValue:0}],attrs:[{tfName:"axis",name:"axis",type:"number",notSupported:!0},{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"Ones",category:"creation",inputs:[{start:0,name:"shape",type:"number[]"}],attrs:[{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"OnesLike",category:"creation",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"dtype",name:"dtype",type:"dtype"}]},{tfOpName:"RandomStandardNormal",category:"creation",inputs:[{start:0,name:"shape",type:"number[]"}],attrs:[{tfName:"seed",name:"seed",type:"number",defaultValue:0},{tfName:"seed2",name:"seed2",type:"number",defaultValue:0,notSupported:!0},{tfName:"dtype",name:"dtype",type:"dtype"},{tfName:"T",name:"T",type:"number",notSupported:!0}]},{tfOpName:"RandomUniform",category:"creation",inputs:[{start:0,name:"shape",type:"number[]"}],attrs:[{tfName:"minval",name:"minval",type:"number",defaultValue:0},{tfName:"maxval",name:"maxval",type:"number",defaultValue:1},{tfName:"dtype",name:"dtype",type:"dtype"},{tfName:"seed",name:"seed",type:"number",defaultValue:0},{tfName:"seed2",name:"seed2",type:"number",defaultValue:0,notSupported:!0},{tfName:"T",name:"T",type:"number",notSupported:!0}]},{tfOpName:"Range",category:"creation",inputs:[{start:0,name:"start",type:"number"},{start:1,name:"stop",type:"number"},{start:2,name:"step",type:"number",defaultValue:0}],attrs:[{tfName:"Tidx",name:"dtype",type:"dtype"}]},{tfOpName:"TruncatedNormal",category:"creation",inputs:[{start:0,name:"shape",type:"number[]"}],attrs:[{tfName:"means",name:"mean",type:"number",defaultValue:0},{tfName:"stddev",name:"stdDev",type:"number",defaultValue:1},{tfName:"seed",name:"seed",type:"number"},{tfName:"seed2",name:"seed2",type:"number",defaultValue:0,notSupported:!0},{tfName:"dtype",name:"dtype",type:"dtype"},{tfName:"T",name:"T",type:"number",notSupported:!0}]},{tfOpName:"Zeros",category:"creation",inputs:[{start:0,name:"shape",type:"number[]"}],attrs:[{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"ZerosLike",category:"creation",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype"}]},{tfOpName:"Multinomial",category:"creation",inputs:[{start:0,name:"logits",type:"tensor"},{start:1,name:"numSamples",type:"number"}],attrs:[{tfName:"seed",name:"seed",type:"number"},{tfName:"seed2",name:"seed2",type:"number"},{tfName:"T",name:"dtype",type:"dtype"},{tfName:"output_dtype",name:"output_dtype",type:"dtype"}]}];var dx={};kt(dx,{json:()=>IL});var IL=[{tfOpName:"NonMaxSuppressionV2",category:"dynamic",inputs:[{start:0,name:"boxes",type:"tensor"},{start:1,name:"scores",type:"tensor"},{start:2,name:"maxOutputSize",type:"number"},{start:3,name:"iouThreshold",type:"number"}]},{tfOpName:"NonMaxSuppressionV3",category:"dynamic",inputs:[{start:0,name:"boxes",type:"tensor"},{start:1,name:"scores",type:"tensor"},{start:2,name:"maxOutputSize",type:"number"},{start:3,name:"iouThreshold",type:"number"},{start:4,name:"scoreThreshold",type:"number"}]},{tfOpName:"NonMaxSuppressionV4",category:"dynamic",inputs:[{start:0,name:"boxes",type:"tensor"},{start:1,name:"scores",type:"tensor"},{start:2,name:"maxOutputSize",type:"number"},{start:3,name:"iouThreshold",type:"number"},{start:4,name:"scoreThreshold",type:"number"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0},{tfName:"T_threshold",name:"threshold",type:"dtype",notSupported:!0},{tfName:"pad_to_max_output_size",name:"padToMaxOutputSize",type:"bool"}]},{tfOpName:"NonMaxSuppressionV5",category:"dynamic",inputs:[{start:0,name:"boxes",type:"tensor"},{start:1,name:"scores",type:"tensor"},{start:2,name:"maxOutputSize",type:"number"},{start:3,name:"iouThreshold",type:"number"},{start:4,name:"scoreThreshold",type:"number"},{start:5,name:"softNmsSigma",type:"number"}]},{tfOpName:"Where",category:"dynamic",inputs:[{start:0,name:"condition",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"ListDiff",category:"dynamic",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"y",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]}];var hx={};kt(hx,{json:()=>SL});var SL=[{tfOpName:"LowerBound",category:"evaluation",inputs:[{start:0,name:"sortedSequence",type:"tensor"},{start:1,name:"values",type:"tensor"}]},{tfOpName:"TopKV2",category:"evaluation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"k",type:"number"}],attrs:[{tfName:"sorted",name:"sorted",type:"bool"}]},{tfOpName:"UpperBound",category:"evaluation",inputs:[{start:0,name:"sortedSequence",type:"tensor"},{start:1,name:"values",type:"tensor"}]},{tfOpName:"Unique",category:"evaluation",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"UniqueV2",category:"evaluation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number"}]}];var gx={};kt(gx,{json:()=>vL});var vL=[{tfOpName:"PlaceholderWithDefault",category:"graph",inputs:[{start:0,name:"default",type:"tensor"}],attrs:[{tfName:"shape",name:"shape",type:"shape"},{tfName:"dtype",name:"dtype",type:"dtype"}]},{tfOpName:"Placeholder",category:"graph",attrs:[{tfName:"shape",name:"shape",type:"shape"},{tfName:"dtype",name:"dtype",type:"dtype"}]},{tfOpName:"Const",category:"graph"},{tfOpName:"Identity",category:"graph",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"IdentityN",category:"graph",inputs:[{start:0,end:0,name:"x",type:"tensors"}]},{tfOpName:"Snapshot",category:"graph",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"Rank",category:"graph",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"Size",category:"graph",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"Shape",category:"graph",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"ShapeN",category:"graph",inputs:[{start:0,end:0,name:"x",type:"tensors"}]},{tfOpName:"Print",category:"graph",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"data",type:"tensors"}],attrs:[{tfName:"message",name:"message",type:"string"},{tfName:"first_n",name:"firstN",type:"number",notSupported:!0},{tfName:"summarize",name:"summarize",type:"number",defaultValue:3}]},{tfOpName:"NoOp",category:"graph",inputs:[]},{tfOpName:"StopGradient",category:"graph",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"FakeQuantWithMinMaxVars",category:"graph",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"min",name:"min",type:"number"},{tfName:"max",name:"max",type:"number"}]}];var xx={};kt(xx,{json:()=>NL});var NL=[{tfOpName:"HashTable",category:"hash_table",inputs:[],attrs:[{tfName:"shared_name",name:"sharedName",type:"string"},{tfName:"use_node_name_sharing",name:"useNodeNameSharing",type:"bool"},{tfName:"key_dtype",name:"keyDType",type:"dtype"},{tfName:"value_dtype",name:"valueDType",type:"dtype"}]},{tfOpName:"HashTableV2",category:"hash_table",inputs:[],attrs:[{tfName:"shared_name",name:"sharedName",type:"string"},{tfName:"use_node_name_sharing",name:"useNodeNameSharing",type:"bool"},{tfName:"key_dtype",name:"keyDType",type:"dtype"},{tfName:"value_dtype",name:"valueDType",type:"dtype"}]},{tfOpName:"LookupTableImport",category:"hash_table",inputs:[{start:0,name:"tableHandle",type:"tensor"},{start:1,name:"keys",type:"tensor"},{start:2,name:"values",type:"tensor"}],attrs:[{tfName:"Tin",name:"tIn",type:"dtype",notSupported:!0},{tfName:"Tout",name:"tOut",type:"dtype",notSupported:!0}]},{tfOpName:"LookupTableImportV2",category:"hash_table",inputs:[{start:0,name:"tableHandle",type:"tensor"},{start:1,name:"keys",type:"tensor"},{start:2,name:"values",type:"tensor"}],attrs:[{tfName:"Tin",name:"tIn",type:"dtype",notSupported:!0},{tfName:"Tout",name:"tOut",type:"dtype",notSupported:!0}]},{tfOpName:"LookupTableFind",category:"hash_table",inputs:[{start:0,name:"tableHandle",type:"tensor"},{start:1,name:"keys",type:"tensor"},{start:2,name:"defaultValue",type:"tensor"}],attrs:[{tfName:"Tin",name:"tIn",type:"dtype",notSupported:!0},{tfName:"Tout",name:"tOut",type:"dtype",notSupported:!0}]},{tfOpName:"LookupTableFindV2",category:"hash_table",inputs:[{start:0,name:"tableHandle",type:"tensor"},{start:1,name:"keys",type:"tensor"},{start:2,name:"defaultValue",type:"tensor"}],attrs:[{tfName:"Tin",name:"tIn",type:"dtype",notSupported:!0},{tfName:"Tout",name:"tOut",type:"dtype",notSupported:!0}]},{tfOpName:"LookupTableSize",category:"hash_table",inputs:[{start:0,name:"tableHandle",type:"tensor"}]},{tfOpName:"LookupTableSizeV2",category:"hash_table",inputs:[{start:0,name:"tableHandle",type:"tensor"}]}];var yx={};kt(yx,{json:()=>kL});var kL=[{tfOpName:"ResizeBilinear",category:"image",inputs:[{start:0,name:"images",type:"tensor"},{start:1,name:"size",type:"number[]"}],attrs:[{tfName:"align_corners",name:"alignCorners",type:"bool"},{tfName:"half_pixel_centers",name:"halfPixelCenters",type:"bool"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"ResizeNearestNeighbor",category:"image",inputs:[{start:0,name:"images",type:"tensor"},{start:1,name:"size",type:"number[]"}],attrs:[{tfName:"align_corners",name:"alignCorners",type:"bool"},{tfName:"half_pixel_centers",name:"halfPixelCenters",type:"bool"},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"CropAndResize",category:"image",inputs:[{start:0,name:"image",type:"tensor"},{start:1,name:"boxes",type:"tensor"},{start:2,name:"boxInd",type:"tensor"},{start:3,name:"cropSize",type:"number[]"}],attrs:[{tfName:"method",name:"method",type:"string"},{tfName:"extrapolation_value",name:"extrapolationValue",type:"number"}]},{tfOpName:"ImageProjectiveTransformV3",category:"image",inputs:[{start:0,name:"images",type:"tensor"},{start:1,name:"transforms",type:"tensor"},{start:2,name:"outputShape",type:"number[]"},{start:3,name:"fillValue",type:"number"}],attrs:[{tfName:"interpolation",name:"interpolation",type:"string"},{tfName:"fill_mode",name:"fillMode",type:"string"}]}];var bx={};kt(bx,{json:()=>EL});var EL=[{tfOpName:"Equal",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"NotEqual",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Greater",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"GreaterEqual",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Less",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"LessEqual",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"LogicalAnd",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"LogicalNot",category:"logical",inputs:[{start:0,name:"a",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"LogicalOr",category:"logical",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Select",category:"logical",inputs:[{start:0,name:"condition",type:"tensor"},{start:1,name:"a",type:"tensor"},{start:2,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"SelectV2",category:"logical",inputs:[{start:0,name:"condition",type:"tensor"},{start:1,name:"a",type:"tensor"},{start:2,name:"b",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]}];var Cx={};kt(Cx,{json:()=>$L});var $L=[{tfOpName:"_FusedMatMul",category:"matrices",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"},{start:2,end:0,name:"args",type:"tensors"}],attrs:[{tfName:"num_args",name:"numArgs",type:"number"},{tfName:"fused_ops",name:"fusedOps",type:"string[]",defaultValue:[]},{tfName:"epsilon",name:"epsilon",type:"number",defaultValue:1e-4},{tfName:"transpose_a",name:"transposeA",type:"bool",defaultValue:!1},{tfName:"transpose_b",name:"transposeB",type:"bool",defaultValue:!1},{tfName:"leakyrelu_alpha",name:"leakyreluAlpha",type:"number",defaultValue:.2},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"MatMul",category:"matrices",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"transpose_a",name:"transposeA",type:"bool",defaultValue:!1},{tfName:"transpose_b",name:"transposeB",type:"bool",defaultValue:!1},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"BatchMatMul",category:"matrices",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"adj_x",name:"transposeA",type:"bool",defaultValue:!1},{tfName:"adj_y",name:"transposeB",type:"bool",defaultValue:!1},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"BatchMatMulV2",category:"matrices",inputs:[{start:0,name:"a",type:"tensor"},{start:1,name:"b",type:"tensor"}],attrs:[{tfName:"adj_x",name:"transposeA",type:"bool",defaultValue:!1},{tfName:"adj_y",name:"transposeB",type:"bool",defaultValue:!1},{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Transpose",category:"matrices",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"perm",type:"number[]"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"Einsum",category:"matrices",inputs:[{start:0,end:0,name:"tensors",type:"tensors"}],attrs:[{tfName:"equation",name:"equation",type:"string"},{tfName:"N",name:"n",type:"number",defaultValue:2},{tfName:"T",name:"dtype",type:"dtype"}]}];var Tx={};kt(Tx,{json:()=>AL});var AL=[{tfOpName:"EuclideanNorm",category:"normalization",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool",defaultValue:!1}]},{tfOpName:"FusedBatchNorm",category:"normalization",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"scale",type:"tensor"},{start:2,name:"offset",type:"tensor"},{start:3,name:"mean",type:"tensor"},{start:4,name:"variance",type:"tensor"}],attrs:[{tfName:"epsilon",name:"epsilon",type:"number",defaultValue:.001},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0}]},{tfOpName:"FusedBatchNormV2",category:"normalization",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"scale",type:"tensor"},{start:2,name:"offset",type:"tensor"},{start:3,name:"mean",type:"tensor"},{start:4,name:"variance",type:"tensor"}],attrs:[{tfName:"epsilon",name:"epsilon",type:"number",defaultValue:.001},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0}]},{tfOpName:"FusedBatchNormV3",category:"normalization",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"scale",type:"tensor"},{start:2,name:"offset",type:"tensor"},{start:3,name:"mean",type:"tensor"},{start:4,name:"variance",type:"tensor"}],attrs:[{tfName:"epsilon",name:"epsilon",type:"number",defaultValue:.001},{tfName:"data_format",name:"dataFormat",type:"string",notSupported:!0}]},{tfOpName:"LRN",category:"normalization",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"depth_radius",name:"radius",type:"number",defaultValue:5},{tfName:"bias",name:"bias",type:"number",defaultValue:1},{tfName:"alpha",name:"alpha",type:"number",defaultValue:1},{tfName:"beta",name:"beta",type:"number",defaultValue:.5}]},{tfOpName:"Softmax",category:"normalization",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"LogSoftmax",category:"normalization",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"SparseToDense",category:"normalization",inputs:[{start:0,name:"sparseIndices",type:"tensor"},{start:1,name:"outputShape",type:"number[]"},{start:2,name:"sparseValues",type:"tensor"},{start:3,name:"defaultValue",type:"tensor"}],attrs:[{tfName:"validate_indices",name:"validateIndices",type:"bool",defaultValue:!0,notSupported:!0}]}];var wx={};kt(wx,{json:()=>RL});var RL=[{tfOpName:"Bincount",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"size",type:"number"},{start:2,name:"weights",type:"tensor"}]},{tfOpName:"DenseBincount",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"size",type:"number"},{start:2,name:"weights",type:"tensor"}],attrs:[{tfName:"binary_output",name:"binaryOutput",type:"bool"}]},{tfOpName:"Max",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool"}]},{tfOpName:"Mean",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool"}]},{tfOpName:"Min",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool"}]},{tfOpName:"Sum",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool"}]},{tfOpName:"All",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool"}]},{tfOpName:"Any",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool"}]},{tfOpName:"ArgMax",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number"}]},{tfOpName:"ArgMin",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number"}]},{tfOpName:"Prod",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}],attrs:[{tfName:"keep_dims",name:"keepDims",type:"bool"}]},{tfOpName:"Cumprod",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number"}],attrs:[{tfName:"exclusive",name:"exclusive",type:"bool"},{tfName:"reverse",name:"reverse",type:"bool"}]},{tfOpName:"Cumsum",category:"reduction",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number"}],attrs:[{tfName:"exclusive",name:"exclusive",type:"bool"},{tfName:"reverse",name:"reverse",type:"bool"}]}];var Ix={};kt(Ix,{json:()=>DL});var DL=[{tfOpName:"ConcatV2",category:"slice_join",inputs:[{start:0,end:-1,name:"tensors",type:"tensors"},{start:-1,name:"axis",type:"number"}],attrs:[{tfName:"N",name:"n",type:"number",defaultValue:2}]},{tfOpName:"Concat",category:"slice_join",inputs:[{start:1,end:0,name:"tensors",type:"tensors"},{start:0,name:"axis",type:"number"}],attrs:[{tfName:"N",name:"n",type:"number",defaultValue:2}]},{tfOpName:"GatherV2",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"indices",type:"tensor"},{start:2,name:"axis",type:"number",defaultValue:0}],attrs:[{tfName:"batch_dims",name:"batchDims",type:"number",defaultValue:0}]},{tfOpName:"Gather",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"indices",type:"tensor"}],attrs:[{tfName:"validate_indices",name:"validateIndices",type:"bool",notSupported:!0}]},{tfOpName:"Reverse",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"dims",type:"bool[]"}]},{tfOpName:"ReverseV2",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number[]"}]},{tfOpName:"Slice",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"begin",type:"number[]"},{start:2,name:"size",type:"number[]"}]},{tfOpName:"StridedSlice",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"begin",type:"number[]"},{start:2,name:"end",type:"number[]"},{start:3,name:"strides",type:"number[]"}],attrs:[{tfName:"begin_mask",name:"beginMask",type:"number",defaultValue:0},{tfName:"end_mask",name:"endMask",type:"number",defaultValue:0},{tfName:"new_axis_mask",name:"newAxisMask",type:"number",defaultValue:0},{tfName:"ellipsis_mask",name:"ellipsisMask",type:"number",defaultValue:0},{tfName:"shrink_axis_mask",name:"shrinkAxisMask",type:"number",defaultValue:0}]},{tfOpName:"Pack",category:"slice_join",inputs:[{start:0,end:0,name:"tensors",type:"tensors"}],attrs:[{tfName:"axis",name:"axis",type:"number",defaultValue:0}]},{tfOpName:"Unpack",category:"slice_join",inputs:[{start:0,name:"tensor",type:"tensor"}],attrs:[{tfName:"axis",name:"axis",type:"number",defaultValue:0},{tfName:"num",name:"num",type:"number",defaultValue:0,notSupported:!0}]},{tfOpName:"Tile",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"reps",type:"number[]"}]},{tfOpName:"Split",category:"slice_join",inputs:[{start:0,name:"axis",type:"number",defaultValue:0},{start:1,name:"x",type:"tensor"}],attrs:[{tfName:"num_split",name:"numOrSizeSplits",type:"number",defaultValue:1}]},{tfOpName:"SplitV",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"numOrSizeSplits",type:"number[]"},{start:2,name:"axis",type:"number",defaultValue:0}]},{tfOpName:"ScatterNd",category:"slice_join",inputs:[{start:0,name:"indices",type:"tensor"},{start:1,name:"values",type:"tensor"},{start:2,name:"shape",type:"number[]"}]},{tfOpName:"GatherNd",category:"slice_join",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"indices",type:"tensor"}]},{tfOpName:"SparseToDense",category:"slice_join",inputs:[{start:0,name:"sparseIndices",type:"tensor"},{start:1,name:"outputShape",type:"number[]"},{start:2,name:"sparseValues",type:"tensor"},{start:3,name:"defaultValue",type:"tensor"}],attrs:[{tfName:"validate_indices",name:"validateIndices",type:"bool",defaultValue:!1,notSupported:!0}]}];var Sx={};kt(Sx,{json:()=>FL});var FL=[{tfOpName:"SparseFillEmptyRows",category:"sparse",inputs:[{start:0,name:"indices",type:"tensor"},{start:1,name:"values",type:"tensor"},{start:2,name:"denseShape",type:"tensor"},{start:3,name:"defaultValue",type:"tensor"}]},{tfOpName:"SparseReshape",category:"sparse",inputs:[{start:0,name:"inputIndices",type:"tensor"},{start:1,name:"inputShape",type:"tensor"},{start:2,name:"newShape",type:"tensor"}],attrs:[{tfName:"T",name:"dtype",type:"dtype",notSupported:!0}]},{tfOpName:"SparseSegmentMean",category:"sparse",inputs:[{start:0,name:"data",type:"tensor"},{start:1,name:"indices",type:"tensor"},{start:2,name:"segmentIds",type:"tensor"}]},{tfOpName:"SparseSegmentSum",category:"sparse",inputs:[{start:0,name:"data",type:"tensor"},{start:1,name:"indices",type:"tensor"},{start:2,name:"segmentIds",type:"tensor"}]}];var vx={};kt(vx,{json:()=>_L});var _L=[{tfOpName:"FFT",category:"spectral",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"IFFT",category:"spectral",inputs:[{start:0,name:"x",type:"tensor"}]},{tfOpName:"RFFT",category:"spectral",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"fft_length",type:"number",notSupported:!0}]},{tfOpName:"IRFFT",category:"spectral",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"fft_length",type:"number",notSupported:!0}]}];var Nx={};kt(Nx,{json:()=>OL});var OL=[{tfOpName:"StringNGrams",category:"string",inputs:[{start:0,name:"data",type:"tensor"},{start:1,name:"dataSplits",type:"tensor"}],attrs:[{tfName:"separator",name:"separator",type:"string"},{tfName:"ngram_widths",name:"nGramWidths",type:"number[]"},{tfName:"left_pad",name:"leftPad",type:"string"},{tfName:"right_pad",name:"rightPad",type:"string"},{tfName:"pad_width",name:"padWidth",type:"number"},{tfName:"preserve_short_sequences",name:"preserveShortSequences",type:"bool"}],outputs:["ngrams","ngrams_splits"]},{tfOpName:"StringSplit",category:"string",inputs:[{start:0,name:"input",type:"tensor"},{start:1,name:"delimiter",type:"tensor"}],attrs:[{tfName:"skip_empty",name:"skipEmpty",type:"bool"}],outputs:["indices","values","shape"]},{tfOpName:"StringToHashBucketFast",category:"string",inputs:[{start:0,name:"input",type:"tensor"}],attrs:[{tfName:"num_buckets",name:"numBuckets",type:"number"}]}];var kx={};kt(kx,{json:()=>PL});var PL=[{tfOpName:"Cast",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"SrcT",name:"sdtype",type:"dtype",notSupported:!0},{tfName:"DstT",name:"dtype",type:"dtype"}]},{tfOpName:"ExpandDims",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"axis",type:"number"}]},{tfOpName:"MirrorPad",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"padding",type:"number[]"}],attrs:[{tfName:"mode",name:"mode",type:"string"}]},{tfOpName:"Pad",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"padding",type:"number[]"}],attrs:[{tfName:"constant_value",name:"constantValue",type:"number",defaultValue:0}]},{tfOpName:"PadV2",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"padding",type:"number[]"},{start:2,name:"constantValue",type:"number",defaultValue:0}]},{tfOpName:"Reshape",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"shape",type:"number[]"}]},{tfOpName:"Squeeze",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"axis",tfDeprecatedName:"squeeze_dims",name:"axis",type:"number[]"}]},{tfOpName:"SpaceToBatchND",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"blockShape",type:"number[]"},{start:2,name:"paddings",type:"number[]"}]},{tfOpName:"BatchToSpaceND",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"blockShape",type:"number[]"},{start:2,name:"crops",type:"number[]"}]},{tfOpName:"DepthToSpace",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"}],attrs:[{tfName:"block_size",name:"blockSize",type:"number"},{tfName:"data_format",name:"dataFormat",type:"string"}]},{tfOpName:"BroadcastTo",category:"transformation",inputs:[{start:0,name:"x",type:"tensor"},{start:1,name:"shape",type:"number[]"}],attrs:[]},{tfOpName:"BroadcastArgs",category:"transformation",inputs:[{start:0,name:"s0",type:"tensor"},{start:1,name:"s1",type:"tensor"}],attrs:[]}];var Wl=class{static get Instance(){return this._instance||(this._instance=new this)}constructor(){let t=[px,lx,ux,mx,fx,dx,hx,gx,xx,yx,bx,Cx,Tx,wx,Ix,Sx,vx,Nx,kx],e=[].concat(...t.map(o=>o.json));this.opMappers=e.reduce((o,n)=>(o[n.tfOpName]=n,o),{})}transformGraph(t,e={}){let o=t.node,n=[],s=[],a=[],i=o.reduce((h,g)=>(h[g.name]=this.mapNode(g),g.op.startsWith("Placeholder")?n.push(h[g.name]):g.op==="Const"?s.push(h[g.name]):(g.input==null||g.input.length===0)&&a.push(h[g.name]),h),{}),c=[],p=[],l={},u={};e!=null&&(l=this.mapSignatureEntries(e.inputs),u=this.mapSignatureEntries(e.outputs));let m=Object.keys(i);m.forEach(h=>{let g=i[h];g.inputNames.forEach((x,b)=>{let[w,,I]=xr(x),k=i[w];if(k.outputs!=null){let $=k.outputs.indexOf(I);if($!==-1){let R=`${w}:${$}`;g.inputNames[b]=R}}g.inputs.push(k),k.children.push(g)})}),Object.keys(u).length===0?m.forEach(h=>{let g=i[h];g.children.length===0&&p.push(g)}):Object.keys(u).forEach(h=>{let[g]=xr(h),x=i[g];x!=null&&(x.signatureKey=u[h],p.push(x))}),Object.keys(l).length>0?Object.keys(l).forEach(h=>{let[g]=xr(h),x=i[g];x&&(x.signatureKey=l[h],c.push(x))}):c=n;let f={};t.library!=null&&t.library.function!=null&&(f=t.library.function.reduce((h,g)=>(h[g.signature.name]=this.mapFunction(g),h),{}));let d={nodes:i,inputs:c,outputs:p,weights:s,placeholders:n,signature:e,functions:f};return a.length>0&&(d.initNodes=a),d}mapSignatureEntries(t){return Object.keys(t||{}).reduce((e,o)=>(e[t[o].name]=o,e),{})}mapNode(t){let e=fm(t.op)||this.opMappers[t.op]||{};t.attr==null&&(t.attr={});let o={name:t.name,op:t.op,category:e.category,inputNames:(t.input||[]).map(n=>n.startsWith("^")?n.slice(1):n),inputs:[],children:[],inputParams:{},attrParams:{},rawAttrs:t.attr,outputs:e.outputs};return e.inputs!=null&&(o.inputParams=e.inputs.reduce((n,s)=>(n[s.name]={type:s.type,inputIndexStart:s.start,inputIndexEnd:s.end},n),{})),e.attrs!=null&&(o.attrParams=e.attrs.reduce((n,s)=>{let a=s.type,i;switch(s.type){case"string":i=hm(t.attr,s.tfName,s.defaultValue),i===void 0&&s.tfDeprecatedName&&(i=hm(t.attr,s.tfDeprecatedName,s.defaultValue));break;case"string[]":i=wm(t.attr,s.tfName,s.defaultValue),i===void 0&&s.tfDeprecatedName&&(i=wm(t.attr,s.tfDeprecatedName,s.defaultValue));break;case"number":i=xm(t.attr,s.tfName,s.defaultValue||0),i===void 0&&s.tfDeprecatedName&&(i=xm(t.attr,s.tfDeprecatedName,s.defaultValue));break;case"number[]":i=Tm(t.attr,s.tfName,s.defaultValue),i===void 0&&s.tfDeprecatedName&&(i=Tm(t.attr,s.tfDeprecatedName,s.defaultValue));break;case"bool":i=gm(t.attr,s.tfName,s.defaultValue),i===void 0&&s.tfDeprecatedName&&(i=gm(t.attr,s.tfDeprecatedName,s.defaultValue));break;case"bool[]":i=Sm(t.attr,s.tfName,s.defaultValue),i===void 0&&s.tfDeprecatedName&&(i=Sm(t.attr,s.tfDeprecatedName,s.defaultValue));break;case"shape":i=Cm(t.attr,s.tfName,s.defaultValue),i===void 0&&s.tfDeprecatedName&&(i=Cm(t.attr,s.tfDeprecatedName,s.defaultValue));break;case"shape[]":i=Im(t.attr,s.tfName,s.defaultValue),i===void 0&&s.tfDeprecatedName&&(i=Im(t.attr,s.tfDeprecatedName,s.defaultValue));break;case"dtype":i=ym(t.attr,s.tfName,s.defaultValue),i===void 0&&s.tfDeprecatedName&&(i=ym(t.attr,s.tfDeprecatedName,s.defaultValue));break;case"dtype[]":i=bm(t.attr,s.tfName,s.defaultValue),i===void 0&&s.tfDeprecatedName&&(i=bm(t.attr,s.tfDeprecatedName,s.defaultValue));break;case"func":i=TT(t.attr,s.tfName,s.defaultValue),i===void 0&&s.tfDeprecatedName&&(i=TT(t.attr,s.tfDeprecatedName,s.defaultValue));break;case"tensor":case"tensors":break;default:throw new Error(`Unsupported param type: ${s.type} for op: ${t.op}`)}return n[s.name]={value:i,type:a},n},{})),o}mapFunction(t){let e=t.nodeDef,o=[],n=[],s={};e!=null&&(s=e.reduce((u,m)=>(u[m.name]=this.mapNode(m),m.op==="Const"&&n.push(u[m.name]),u),{}));let a=[],i=[];t.signature.inputArg.forEach(u=>{let[m]=xr(u.name),f={name:m,op:"Placeholder",inputs:[],inputNames:[],category:"graph",inputParams:{},attrParams:{dtype:{value:Ex(u.type),type:"dtype"}},children:[]};f.signatureKey=u.name,a.push(f),s[m]=f}),Object.keys(s).forEach(u=>{let m=s[u];m.inputNames.forEach((f,d)=>{let[h,,g]=xr(f),x=s[h];if(x.outputs!=null){let b=x.outputs.indexOf(g);if(b!==-1){let w=`${h}:${b}`;m.inputNames[d]=w}}m.inputs.push(x),x.children.push(m)})});let p=t.ret;t.signature.outputArg.forEach(u=>{let[m,f]=xr(p[u.name]),d=s[m];d!=null&&(d.defaultOutput=f,i.push(d))});let l=this.mapArgsToSignature(t);return{nodes:s,inputs:a,outputs:i,weights:n,placeholders:o,signature:l}}mapArgsToSignature(t){return{methodName:t.signature.name,inputs:t.signature.inputArg.reduce((e,o)=>(e[o.name]=this.mapArgToTensorInfo(o),e),{}),outputs:t.signature.outputArg.reduce((e,o)=>(e[o.name]=this.mapArgToTensorInfo(o,t.ret),e),{})}}mapArgToTensorInfo(t,e){let o=t.name;return e!=null&&(o=e[o]),{name:o,dtype:t.type}}};function LL(r){let t=F().global;if(typeof t.atob<"u")return t.atob(r);if(typeof Buffer<"u")return new Buffer(r,"base64").toString();throw new Error("Unable to decode base64 in this environment. Missing built-in atob() or Buffer()")}function wT(r,t){let e=Array.isArray(r)?String.fromCharCode.apply(null,r):LL(r);return t?e:e.toLowerCase()}function hm(r,t,e,o=!1){let n=r[t];return n!=null?wT(n.s,o):e}function gm(r,t,e){let o=r[t];return o?o.b:e}function xm(r,t,e){let o=r[t]||{},n=o.i!=null?o.i:o.f!=null?o.f:e;return typeof n=="number"?n:parseInt(n,10)}function Ex(r){switch(typeof r=="string"&&(r=sr[r]),r){case sr.DT_FLOAT:case sr.DT_HALF:return"float32";case sr.DT_INT32:case sr.DT_INT64:case sr.DT_INT8:case sr.DT_UINT8:return"int32";case sr.DT_BOOL:return"bool";case sr.DT_DOUBLE:return"float32";case sr.DT_STRING:return"string";default:return null}}function TT(r,t,e){let o=r[t];return o&&o.func?o.func.name:e}function ym(r,t,e){let o=r[t];return o&&o.type?Ex(o.type):e}function bm(r,t,e){let o=r[t];return o&&o.list&&o.list.type?o.list.type.map(n=>Ex(n)):e}function IT(r){if(!r.unknownRank)return r.dim!=null?r.dim.map(t=>typeof t.size=="number"?t.size:parseInt(t.size,10)):[]}function Cm(r,t,e){let o=r[t];return o&&o.shape?IT(o.shape):e}function Tm(r,t,e){let o=r[t];return o?((o.list.f&&o.list.f.length?o.list.f:o.list.i)||[]).map(n=>typeof n=="number"?n:parseInt(n,10)):e}function wm(r,t,e,o=!1){let n=r[t];return n&&n.list&&n.list.s?n.list.s.map(s=>wT(s,o)):e}function Im(r,t,e){let o=r[t];return o&&o.list&&o.list.shape?o.list.shape.map(n=>IT(n)):e}function Sm(r,t,e){let o=r[t];return o&&o.list&&o.list.b?o.list.b:e}var vm=class{constructor(t,e,o){this.node=t,this.tensorMap=e,this.context=o,this.inputs=[],this.attrs={},this.inputs=t.inputNames.map(n=>this.getInput(n)),t.rawAttrs!=null&&(this.attrs=Object.keys(t.rawAttrs).reduce((n,s)=>(n[s]=this.getAttr(s),n),{}))}getInput(t){return pe(t,this.tensorMap,this.context)}getAttr(t,e){let o=this.node.rawAttrs[t];if(o.tensor!=null)return pe(t,this.tensorMap,this.context);if(o.i!=null||o.f!=null)return xm(this.node.rawAttrs,t,e);if(o.s!=null)return hm(this.node.rawAttrs,t,e);if(o.b!=null)return gm(this.node.rawAttrs,t,e);if(o.shape!=null)return Cm(this.node.rawAttrs,t,e);if(o.type!=null)return ym(this.node.rawAttrs,t,e);if(o.list!=null){if(o.list.i!=null||o.list.f!=null)return Tm(this.node.rawAttrs,t,e);if(o.list.s!=null)return wm(this.node.rawAttrs,t,e);if(o.list.shape!=null)return Im(this.node.rawAttrs,t,e);if(o.list.b!=null)return Sm(this.node.rawAttrs,t,e);if(o.list.type!=null)return bm(this.node.rawAttrs,t,e)}return e}};var Dt={};kt(Dt,{OP_SCOPE_SUFFIX:()=>Au,abs:()=>ne,acos:()=>Bp,acosh:()=>Vp,add:()=>ot,addN:()=>tg,all:()=>Gp,any:()=>Up,argMax:()=>zp,argMin:()=>Wp,asin:()=>Hp,asinh:()=>qp,atan:()=>Kp,atan2:()=>jp,atanh:()=>Xp,avgPool:()=>ui,avgPool3d:()=>ng,basicLSTMCell:()=>sg,batchNorm:()=>Or,batchNorm2d:()=>ag,batchNorm3d:()=>ig,batchNorm4d:()=>cg,batchToSpaceND:()=>mi,bincount:()=>Yp,booleanMaskAsync:()=>mC,broadcastArgs:()=>pg,broadcastTo:()=>Pr,buffer:()=>rt,cast:()=>dt,ceil:()=>Zp,clipByValue:()=>Qp,clone:()=>Le,complex:()=>Re,concat:()=>Ot,concat1d:()=>Jp,concat2d:()=>lg,concat3d:()=>ug,concat4d:()=>mg,conv1d:()=>tl,conv2d:()=>Mr,conv2dTranspose:()=>el,conv3d:()=>fg,conv3dTranspose:()=>dg,cos:()=>rl,cosh:()=>ol,cosineWindow:()=>Rc,cumprod:()=>nl,cumsum:()=>sl,denseBincount:()=>hg,depthToSpace:()=>al,depthwiseConv2d:()=>$o,diag:()=>gg,dilation2d:()=>il,div:()=>Ct,divNoNan:()=>cl,dot:()=>pl,dropout:()=>bC,einsum:()=>xg,elu:()=>di,enclosingPowerOfTwo:()=>em,equal:()=>fi,erf:()=>ll,euclideanNorm:()=>ul,exp:()=>Be,expandDims:()=>Xe,expm1:()=>ml,eye:()=>fl,fft:()=>Fo,fill:()=>Lr,floor:()=>hi,floorDiv:()=>ii,fused:()=>rm,gather:()=>gi,gatherND:()=>xC,greater:()=>no,greaterEqual:()=>xi,ifft:()=>io,imag:()=>ko,image:()=>pT,inTopKAsync:()=>CC,irfft:()=>_i,isFinite:()=>dl,isInf:()=>hl,isNaN:()=>gl,leakyRelu:()=>yi,less:()=>xl,lessEqual:()=>Ro,linalg:()=>lT,linspace:()=>bg,localResponseNormalization:()=>yl,log:()=>fr,log1p:()=>bi,logSigmoid:()=>bl,logSoftmax:()=>Cl,logSumExp:()=>Ti,logicalAnd:()=>so,logicalNot:()=>wi,logicalOr:()=>Ii,logicalXor:()=>Tl,losses:()=>uT,lowerBound:()=>Cg,matMul:()=>St,max:()=>or,maxPool:()=>Si,maxPool3d:()=>Tg,maxPoolWithArgmax:()=>wg,maximum:()=>vi,mean:()=>ao,meshgrid:()=>Ig,min:()=>Xn,minimum:()=>Ni,mirrorPad:()=>wl,mod:()=>Il,moments:()=>Sg,movingAverage:()=>fC,mul:()=>j,multiRNNCell:()=>vg,multinomial:()=>Ng,neg:()=>de,norm:()=>oo,notEqual:()=>ki,oneHot:()=>Kn,ones:()=>Vr,onesLike:()=>Sl,op:()=>S,outerProduct:()=>kg,pad:()=>nr,pad1d:()=>Eg,pad2d:()=>$g,pad3d:()=>Ag,pad4d:()=>Rg,pool:()=>vl,pow:()=>mr,prelu:()=>$i,print:()=>Fp,prod:()=>Nl,raggedGather:()=>Dg,raggedTensorToTensor:()=>Fg,rand:()=>_g,randomGamma:()=>Ug,randomNormal:()=>kl,randomStandardNormal:()=>zg,randomUniform:()=>El,range:()=>Do,real:()=>eo,reciprocal:()=>$l,relu:()=>Gr,relu6:()=>Di,reshape:()=>P,reverse:()=>Fe,reverse1d:()=>Wg,reverse2d:()=>Hg,reverse3d:()=>qg,reverse4d:()=>Kg,rfft:()=>_o,round:()=>Fi,rsqrt:()=>Al,scalar:()=>it,scatterND:()=>dC,searchSorted:()=>Ac,selu:()=>Rl,separableConv2d:()=>Dl,setdiff1dAsync:()=>jg,sigmoid:()=>rr,sign:()=>Fl,signal:()=>lm,sin:()=>_l,sinh:()=>Ol,slice:()=>yt,slice1d:()=>Xg,slice2d:()=>Yg,slice3d:()=>Zg,slice4d:()=>Qg,softmax:()=>Pl,softplus:()=>Ci,spaceToBatchND:()=>Ei,sparse:()=>mT,sparseToDense:()=>gC,spectral:()=>cT,split:()=>dr,sqrt:()=>Te,square:()=>se,squaredDifference:()=>Oi,squeeze:()=>Oo,stack:()=>he,step:()=>Pi,stridedSlice:()=>Ll,string:()=>fT,sub:()=>pt,sum:()=>vt,tan:()=>Ml,tanh:()=>jn,tensor:()=>fe,tensor1d:()=>we,tensor2d:()=>Po,tensor3d:()=>Lp,tensor4d:()=>Jg,tensor5d:()=>tx,tensor6d:()=>ex,tile:()=>Br,topk:()=>Bl,transpose:()=>Eo,truncatedNormal:()=>rx,unique:()=>Vl,unsortedSegmentSum:()=>Gl,unstack:()=>_e,upperBound:()=>ox,variable:()=>nx,where:()=>je,whereAsync:()=>Ul,zeros:()=>Ve,zerosLike:()=>Jt});var ST=(r,t,e,o=Dt)=>{switch(r.op){case"BiasAdd":case"AddV2":case"Add":return[o.add(C("a",r,t,e),C("b",r,t,e))];case"AddN":return[o.addN(C("tensors",r,t,e))];case"FloorMod":case"Mod":return[o.mod(C("a",r,t,e),C("b",r,t,e))];case"Mul":return[o.mul(C("a",r,t,e),C("b",r,t,e))];case"RealDiv":case"Div":return[o.div(C("a",r,t,e),C("b",r,t,e))];case"DivNoNan":return[o.divNoNan(C("a",r,t,e),C("b",r,t,e))];case"FloorDiv":return[o.floorDiv(C("a",r,t,e),C("b",r,t,e))];case"Sub":return[o.sub(C("a",r,t,e),C("b",r,t,e))];case"Minimum":return[o.minimum(C("a",r,t,e),C("b",r,t,e))];case"Maximum":return[o.maximum(C("a",r,t,e),C("b",r,t,e))];case"Pow":return[o.pow(C("a",r,t,e),C("b",r,t,e))];case"SquaredDifference":return[o.squaredDifference(C("a",r,t,e),C("b",r,t,e))];default:throw TypeError(`Node type ${r.op} is not implemented`)}};var vT=(r,t,e,o=Dt)=>{switch(r.op){case"Abs":case"ComplexAbs":return[o.abs(C("x",r,t,e))];case"Acos":return[o.acos(C("x",r,t,e))];case"Acosh":return[o.acosh(C("x",r,t,e))];case"Asin":return[o.asin(C("x",r,t,e))];case"Asinh":return[o.asinh(C("x",r,t,e))];case"Atan":return[o.atan(C("x",r,t,e))];case"Atan2":return[o.atan2(C("x",r,t,e),C("y",r,t,e))];case"Atanh":return[o.atanh(C("x",r,t,e))];case"Ceil":return[o.ceil(C("x",r,t,e))];case"Complex":return[o.complex(C("real",r,t,e),C("imag",r,t,e))];case"Cos":return[o.cos(C("x",r,t,e))];case"Cosh":return[o.cosh(C("x",r,t,e))];case"Elu":return[o.elu(C("x",r,t,e))];case"Erf":return[o.erf(C("x",r,t,e))];case"Exp":return[o.exp(C("x",r,t,e))];case"Expm1":return[o.expm1(C("x",r,t,e))];case"Floor":return[o.floor(C("x",r,t,e))];case"Log":return[o.log(C("x",r,t,e))];case"Log1p":return[o.log1p(C("x",r,t,e))];case"Imag":return[o.imag(C("x",r,t,e))];case"Neg":return[o.neg(C("x",r,t,e))];case"Reciprocal":return[o.reciprocal(C("x",r,t,e))];case"Real":return[o.real(C("x",r,t,e))];case"Relu":return[o.relu(C("x",r,t,e))];case"Round":return[o.round(C("x",r,t,e))];case"Selu":return[o.selu(C("x",r,t,e))];case"Sigmoid":return[o.sigmoid(C("x",r,t,e))];case"Sin":return[o.sin(C("x",r,t,e))];case"Sign":return[o.sign(C("x",r,t,e))];case"Sinh":return[o.sinh(C("x",r,t,e))];case"Softplus":return[o.softplus(C("x",r,t,e))];case"Sqrt":return[o.sqrt(C("x",r,t,e))];case"Square":return[o.square(C("x",r,t,e))];case"Tanh":return[o.tanh(C("x",r,t,e))];case"Tan":return[o.tan(C("x",r,t,e))];case"ClipByValue":return[o.clipByValue(C("x",r,t,e),C("clipValueMin",r,t,e),C("clipValueMax",r,t,e))];case"Relu6":return[o.relu6(C("x",r,t,e))];case"Rsqrt":return[o.rsqrt(pe(r.inputNames[0],t,e))];case"Prod":return[o.prod(C("x",r,t,e),C("axes",r,t,e))];case"LeakyRelu":return[o.leakyRelu(C("x",r,t,e),C("alpha",r,t,e))];case"Prelu":return[o.prelu(C("x",r,t,e),C("alpha",r,t,e))];case"IsNan":return[o.isNaN(pe(r.inputNames[0],t,e))];default:throw TypeError(`Node type ${r.op} is not implemented`)}};function Ye(r,t,e=""){if(!(typeof r=="number"||typeof t=="number")){y.assert(r.length===t.length,()=>e+` Shapes ${r} and ${t} must match`);for(let o=0;o<r.length;o++){let n=r[o],s=t[o];y.assert(n<0||s<0||n===s,()=>e+` Shapes ${r} and ${t} must match`)}}}function NT(r){return!(typeof r=="number"||r.some(t=>t<0))}function Dc(r,t,e){let o=Nm(r,e),n=!NT(o);if(n&&t.length===0)throw new Error(`Tried to calculate elements of an empty list with non-fully-defined elementShape: ${o}`);if(n&&t.forEach(s=>{o=Nm(s.shape,o)}),!NT(o))throw new Error(`Non-fully-defined elementShape: ${o}`);return o}function Nm(r,t){if(typeof r=="number")return t;if(typeof t=="number")return r;if(r.length!==t.length)throw new Error(`Incompatible ranks during merge: ${r} vs. ${t}`);let e=[];for(let o=0;o<r.length;++o){let n=r[o],s=t[o];if(n>=0&&s>=0&&n!==s)throw new Error(`Incompatible shape during merge: ${r} vs. ${t}`);e[o]=n>=0?n:s}return e}var km=class{constructor(t,e,o,n,s,a,i){this.name=t,this.dtype=e,this.maxSize=o,this.elementShape=n,this.identicalElementShapes=s,this.dynamicSize=a,this.clearAfterRead=i,this.tensors=[],this.closed_=!1,this.idTensor=it(0),Ke(this.idTensor)}get id(){return this.idTensor.id}get closed(){return this.closed_}clearAndClose(t){this.tensors.forEach(e=>{(t==null||!t.has(e.tensor.id))&&e.tensor.dispose()}),this.tensors=[],this.closed_=!0,this.idTensor.dispose()}size(){return this.tensors.length}read(t){if(this.closed_)throw new Error(`TensorArray ${this.name} has already been closed.`);if(t<0||t>=this.size())throw new Error(`Tried to read from index ${t}, but array size is: ${this.size()}`);let e=this.tensors[t];if(e.cleared)throw new Error(`TensorArray ${this.name}: Could not read index ${t} twice because it was cleared after a previous read (perhaps try setting clear_after_read = false?).`);return this.clearAfterRead&&(e.cleared=!0),e.read=!0,e.tensor}readMany(t){return t.map(e=>this.read(e))}write(t,e){if(this.closed_)throw new Error(`TensorArray ${this.name} has already been closed.`);if(t<0||!this.dynamicSize&&t>=this.maxSize)throw new Error(`Tried to write to index ${t}, but array is not resizeable and size is: ${this.maxSize}`);let o=this.tensors[t]||{};if(e.dtype!==this.dtype)throw new Error(`TensorArray ${this.name}: Could not write to TensorArray index ${t},
          because the value dtype is ${e.dtype}, but TensorArray dtype is ${this.dtype}.`);if(this.size()===0&&(this.elementShape==null||this.elementShape.length===0)&&(this.elementShape=e.shape),Ye(this.elementShape,e.shape,`TensorArray ${this.name}: Could not write to TensorArray index ${t}.`),o.read)throw new Error(`TensorArray ${this.name}: Could not write to TensorArray index ${t}, because it has already been read.`);if(o.written)throw new Error(`TensorArray ${this.name}: Could not write to TensorArray index ${t}, because it has already been written.`);o.tensor=e,Ke(e),o.written=!0,this.tensors[t]=o}writeMany(t,e){if(t.length!==e.length)throw new Error(`TensorArray ${this.name}: could not write multiple tensors,because the index size: ${t.length} is not the same as tensors size: ${e.length}.`);t.forEach((o,n)=>this.write(o,e[n]))}gather(t,e){if(e&&e!==this.dtype)throw new Error(`TensorArray dtype is ${this.dtype} but gather requested dtype ${e}`);if(t)t=t.slice(0,this.size());else{t=[];for(let n=0;n<this.size();n++)t.push(n)}if(t.length===0)return fe([],[0].concat(this.elementShape));let o=this.readMany(t);return Ye(this.elementShape,o[0].shape,"TensorArray shape mismatch: "),he(o,0)}concat(t){if(t&&t!==this.dtype)throw new Error(`TensorArray dtype is ${this.dtype} but concat requested dtype ${t}`);if(this.size()===0)return fe([],[0].concat(this.elementShape));let e=[];for(let n=0;n<this.size();n++)e.push(n);let o=this.readMany(e);return Ye(this.elementShape,o[0].shape,`TensorArray shape mismatch: tensor array shape (${this.elementShape}) vs first tensor shape (${o[0].shape})`),Ot(o,0)}scatter(t,e){if(e.dtype!==this.dtype)throw new Error(`TensorArray dtype is ${this.dtype} but tensor has dtype ${e.dtype}`);if(t.length!==e.shape[0])throw new Error(`Expected len(indices) == tensor.shape[0], but saw: ${t.length} vs. ${e.shape[0]}`);let o=Math.max(...t);if(!this.dynamicSize&&o>=this.maxSize)throw new Error(`Max index must be < array size (${o}  vs. ${this.maxSize})`);this.writeMany(t,_e(e,0))}split(t,e){if(e.dtype!==this.dtype)throw new Error(`TensorArray dtype is ${this.dtype} but tensor has dtype ${e.dtype}`);let o=0,n=t.map(c=>(o+=c,o));if(o!==e.shape[0])throw new Error(`Expected sum of lengths to be equal to
          tensor.shape[0], but sum of lengths is
        ${o}, and tensor's shape is: ${e.shape}`);if(!this.dynamicSize&&t.length!==this.maxSize)throw new Error(`TensorArray's size is not equal to the size of lengths (${this.maxSize} vs. ${t.length}), and the TensorArray is not marked as dynamically resizeable`);let s=o===0?0:e.size/o,a=[];ht(()=>{e=P(e,[1,o,s]);for(let c=0;c<t.length;++c){let l=[0,c===0?0:n[c-1],0],u=[1,t[c],s];a[c]=P(yt(e,l,u),this.elementShape)}return a});let i=[];for(let c=0;c<t.length;c++)i[c]=c;this.writeMany(i,a)}};var Fc=class r{constructor(t,e,o,n=-1){this.tensors=t,this.elementShape=e,this.elementDtype=o,t?.forEach(s=>{if(o!==s.dtype)throw new Error(`Invalid data types; op elements ${o}, but list elements ${s.dtype}`);Ye(e,s.shape,"TensorList shape mismatch: "),Ke(s)}),this.idTensor=it(0),this.maxNumElements=n,Ke(this.idTensor)}get id(){return this.idTensor.id}copy(){return new r([...this.tensors],this.elementShape,this.elementDtype)}clearAndClose(t){this.tensors.forEach(e=>{(t==null||!t.has(e.id))&&e.dispose()}),this.tensors.length=0,this.idTensor.dispose()}size(){return this.tensors.length}stack(t,e,o=-1){if(e!==this.elementDtype)throw new Error(`Invalid data types; op elements ${e}, but list elements ${this.elementDtype}`);if(o!==-1&&this.tensors.length!==o)throw new Error(`Operation expected a list with ${o} elements but got a list with ${this.tensors.length} elements.`);Ye(t,this.elementShape,"TensorList shape mismatch: ");let n=Dc(this.elementShape,this.tensors,t);return ht(()=>{let s=this.tensors.map(a=>P(a,n));return he(s,0)})}popBack(t,e){if(e!==this.elementDtype)throw new Error(`Invalid data types; op elements ${e}, but list elements ${this.elementDtype}`);if(this.size()===0)throw new Error("Trying to pop from an empty list.");let o=Dc(this.elementShape,this.tensors,t),n=this.tensors.pop();return n.kept=!1,Ye(n.shape,t,"TensorList shape mismatch: "),P(n,o)}pushBack(t){if(t.dtype!==this.elementDtype)throw new Error(`Invalid data types; op elements ${t.dtype}, but list elements ${this.elementDtype}`);if(Ye(t.shape,this.elementShape,"TensorList shape mismatch: "),this.maxNumElements===this.size())throw new Error("Trying to push element into a full list.");Ke(t),this.tensors.push(t)}resize(t){if(t<0)throw new Error(`TensorListResize expects size to be non-negative. Got: ${t}`);if(this.maxNumElements!==-1&&t>this.maxNumElements)throw new Error(`TensorListResize input size ${t} is greater maxNumElement ${this.maxNumElements}.`);let e=new r([],this.elementShape,this.elementDtype,this.maxNumElements);e.tensors.length=t;for(let o=0;o<Math.min(this.tensors.length,t);++o)e.tensors[o]=this.tensors[o];return e}getItem(t,e,o){if(o!==this.elementDtype)throw new Error(`Invalid data types; op elements ${o}, but list elements ${this.elementDtype}`);if(t<0||t>this.tensors.length)throw new Error(`Trying to access element ${t} in a list with ${this.tensors.length} elements.`);if(this.tensors[t]==null)throw new Error(`element at index ${t} is null.`);Ye(this.tensors[t].shape,e,"TensorList shape mismatch: ");let n=Dc(this.elementShape,this.tensors,e);return P(this.tensors[t],n)}setItem(t,e){if(e.dtype!==this.elementDtype)throw new Error(`Invalid data types; op elements ${e.dtype}, but list elements ${this.elementDtype}`);if(t<0||this.maxNumElements!==-1&&t>=this.maxNumElements)throw new Error(`Trying to set element ${t} in a list with max ${this.maxNumElements} elements.`);Ye(this.elementShape,e.shape,"TensorList shape mismatch: "),Ke(e),this.tensors[t]!=null&&(this.tensors[t].kept=!1),this.tensors[t]=e}gather(t,e,o){if(e!==this.elementDtype)throw new Error(`Invalid data types; op elements ${e}, but list elements ${this.elementDtype}`);Ye(this.elementShape,o,"TensorList shape mismatch: "),t=t.slice(0,this.size());let n=Dc(this.elementShape,this.tensors,o);return t.length===0?fe([],[0].concat(n)):ht(()=>{let s=t.map(a=>P(this.tensors[a],n));return he(s,0)})}concat(t,e){if(t&&t!==this.elementDtype)throw new Error(`TensorList dtype is ${this.elementDtype} but concat requested dtype ${t}`);Ye(this.elementShape,e,"TensorList shape mismatch: ");let o=Dc(this.elementShape,this.tensors,e);return this.size()===0?fe([],[0].concat(o)):ht(()=>{let n=this.tensors.map(s=>P(s,o));return Ot(n,0)})}};function kT(r,t,e){let o=r.dtype;if(r.shape.length<1)throw new Error(`Tensor must be at least a vector, but saw shape: ${r.shape}`);if(r.dtype!==e)throw new Error(`Invalid data types; op elements ${r.dtype}, but list elements ${e}`);let n=r.shape.slice(1);Ye(n,t,"TensorList shape mismatch: ");let s=_e(r);return new Fc(s,t,o)}function ET(r,t,e,o){return new Fc([],r,t,o)}function $T(r,t,e,o){if(t.length!==r.shape[0])throw new Error(`Expected len(indices) == tensor.shape[0], but saw: ${t.length} vs. ${r.shape[0]}`);let n=Math.max(...t);if(o!=null&&o!==-1&&n>=o)throw new Error(`Max index must be < array size (${n}  vs. ${o})`);let s=new Fc([],e,r.dtype,o),a=_e(r,0);return t.forEach((i,c)=>{s.setItem(i,a[c])}),s}function AT(r,t,e){let o=0,n=t.map(l=>(o+=l,o));if(o!==r.shape[0])throw new Error(`Expected sum of lengths to be equal to
          tensor.shape[0], but sum of lengths is
        ${o}, and tensor's shape is: ${r.shape}`);let s=r.shape.slice(1),a=Nm(s,e),i=o===0?0:r.size/o,c=ht(()=>{let l=[];r=P(r,[1,o,i]);for(let u=0;u<t.length;++u){let f=[0,u===0?0:n[u-1],0],d=[1,t[u],i];l[u]=P(yt(r,f,d),a)}return r.dispose(),l}),p=new Fc([],e,r.dtype,t.length);for(let l=0;l<c.length;l++)p.setItem(l,c[l]);return p}var RT=async(r,t,e)=>{switch(r.op){case"If":case"StatelessIf":{let o=C("thenBranch",r,t,e),n=C("elseBranch",r,t,e),s=C("cond",r,t,e),a=C("args",r,t,e);return(await s.data())[0]?e.functionMap[o].executeFunctionAsync(a,e.tensorArrayMap,e.tensorListMap):e.functionMap[n].executeFunctionAsync(a,e.tensorArrayMap,e.tensorListMap)}case"While":case"StatelessWhile":{let o=C("body",r,t,e),n=C("cond",r,t,e),s=C("args",r,t,e),a=await e.functionMap[n].executeFunctionAsync(s,e.tensorArrayMap,e.tensorListMap),i=s.map(l=>l.id),c=await a[0].data();a.forEach(l=>{!l.kept&&i.indexOf(l.id)===-1&&l.dispose()});let p=s;for(;c[0];){let l=p;p=await e.functionMap[o].executeFunctionAsync(p,e.tensorArrayMap,e.tensorListMap);let u=p.map(f=>f.id);l.forEach(f=>{!f.kept&&i.indexOf(f.id)===-1&&u.indexOf(f.id)===-1&&f.dispose()});let m=await e.functionMap[n].executeFunctionAsync(p,e.tensorArrayMap,e.tensorListMap);c=await m[0].data(),m.forEach(f=>{!f.kept&&i.indexOf(f.id)===-1&&u.indexOf(f.id)===-1&&f.dispose()})}return p}case"LoopCond":{let o=C("pred",r,t,e);return[Ur(o)]}case"Switch":{let o=C("pred",r,t,e),n=C("data",r,t,e);return n.kept||(n=Ur(n)),(await o.data())[0]?[void 0,n]:[n,void 0]}case"Merge":{let o=r.inputNames.find(n=>pe(n,t,e)!==void 0);if(o){let n=pe(o,t,e);return[Ur(n)]}return}case"Enter":{let o=C("frameName",r,t,e),n=C("tensor",r,t,e);return e.enterFrame(o),[Ur(n)]}case"Exit":{let o=C("tensor",r,t,e);return e.exitFrame(),[Ur(o)]}case"NextIteration":{let o=C("tensor",r,t,e);return e.nextIteration(),[Ur(o)]}case"TensorArrayV3":{let o=C("size",r,t,e),n=C("dtype",r,t,e),s=C("elementShape",r,t,e),a=C("dynamicSize",r,t,e),i=C("clearAfterRead",r,t,e),c=C("identicalElementShapes",r,t,e),p=C("name",r,t,e),l=new km(p,n,o,s,c,a,i);return e.addTensorArray(l),[l.idTensor,it(1)]}case"TensorArrayWriteV3":{let o=C("tensorArrayId",r,t,e),n=C("index",r,t,e),s=C("tensor",r,t,e),a=e.getTensorArray(o.id);return a.write(n,s),[a.idTensor]}case"TensorArrayReadV3":{let o=C("tensorArrayId",r,t,e),n=C("index",r,t,e);return[e.getTensorArray(o.id).read(n)]}case"TensorArrayGatherV3":{let o=C("tensorArrayId",r,t,e),n=C("indices",r,t,e),s=C("dtype",r,t,e);return[e.getTensorArray(o.id).gather(n,s)]}case"TensorArrayScatterV3":{let o=C("tensorArrayId",r,t,e),n=C("indices",r,t,e),s=C("tensor",r,t,e),a=e.getTensorArray(o.id);return a.scatter(n,s),[a.idTensor]}case"TensorArrayConcatV3":{let o=C("tensorArrayId",r,t,e),n=e.getTensorArray(o.id),s=C("dtype",r,t,e);return[n.concat(s)]}case"TensorArraySplitV3":{let o=C("tensorArrayId",r,t,e),n=C("tensor",r,t,e),s=C("lengths",r,t,e),a=e.getTensorArray(o.id);return a.split(s,n),[a.idTensor]}case"TensorArraySizeV3":{let o=C("tensorArrayId",r,t,e),n=e.getTensorArray(o.id);return[it(n.size(),"int32")]}case"TensorArrayCloseV3":{let o=C("tensorArrayId",r,t,e),n=e.getTensorArray(o.id);return n.clearAndClose(),[n.idTensor]}case"TensorListSetItem":{let o=C("tensorListId",r,t,e),n=C("index",r,t,e),s=C("tensor",r,t,e),a=e.getTensorList(o.id);return a.setItem(n,s),[a.idTensor]}case"TensorListGetItem":{let o=C("tensorListId",r,t,e),n=C("index",r,t,e),s=C("elementShape",r,t,e),a=C("elementDType",r,t,e);return[e.getTensorList(o.id).getItem(n,s,a)]}case"TensorListScatterV2":case"TensorListScatter":{let o=C("indices",r,t,e),n=C("tensor",r,t,e),s=C("elementShape",r,t,e),a=C("numElements",r,t,e),i=$T(n,o,s,a);return e.addTensorList(i),[i.idTensor]}case"TensorListReserve":case"EmptyTensorList":{let o=C("elementShape",r,t,e),n=C("elementDType",r,t,e),s;r.op==="TensorListReserve"?s="numElements":s="maxNumElements";let a=C(s,r,t,e),i=r.op==="TensorListReserve"?-1:a,c=ET(o,n,a,i);return e.addTensorList(c),[c.idTensor]}case"TensorListGather":{let o=C("tensorListId",r,t,e),n=C("indices",r,t,e),s=C("elementShape",r,t,e),a=C("elementDType",r,t,e);return[e.getTensorList(o.id).gather(n,a,s)]}case"TensorListStack":{let o=C("tensorListId",r,t,e),n=C("elementShape",r,t,e),s=C("elementDType",r,t,e),a=C("numElements",r,t,e);return[e.getTensorList(o.id).stack(n,s,a)]}case"TensorListFromTensor":{let o=C("tensor",r,t,e),n=C("elementShape",r,t,e),s=C("elementDType",r,t,e),a=kT(o,n,s);return e.addTensorList(a),[a.idTensor]}case"TensorListConcat":case"TensorListConcatV2":{let o=C("tensorListId",r,t,e),n=e.getTensorList(o.id),s=C("dtype",r,t,e),a=C("elementShape",r,t,e);return[n.concat(s,a)]}case"TensorListPushBack":{let o=C("tensorListId",r,t,e),n=C("tensor",r,t,e),s=e.getTensorList(o.id);return s.pushBack(n),[s.idTensor]}case"TensorListPopBack":{let o=C("tensorListId",r,t,e),n=C("elementShape",r,t,e),s=C("elementDType",r,t,e);return[e.getTensorList(o.id).popBack(n,s)]}case"TensorListSplit":{let o=C("tensor",r,t,e),n=C("elementShape",r,t,e),s=C("lengths",r,t,e),a=AT(o,s,n);return e.addTensorList(a),[a.idTensor]}case"TensorListLength":{let o=C("tensorListId",r,t,e),n=e.getTensorList(o.id);return[it(n.size(),"int32")]}case"TensorListResize":{let o=C("tensorListId",r,t,e),n=C("size",r,t,e),a=e.getTensorList(o.id).resize(n);return e.addTensorList(a),[a.idTensor]}default:throw TypeError(`Node type ${r.op} is not implemented`)}};function DT(r,t,e){let[o,n]=C("fusedOps",r,t,e),s=o==="biasadd",a=!s,i=n==="prelu",c=o==="fusedbatchnorm",p=C("numArgs",r,t,e);if(s){if(i&&p!==2)throw new Error("FusedConv2d and DepthwiseConv2d with BiasAdd and Prelu must have two extra arguments: bias and alpha.");if(!i&&s&&p!==1)throw new Error("FusedConv2d and DepthwiseConv2d with BiasAdd must have one extra argument: bias.")}if(c)throw new Error("FusedConv2d and DepthwiseConv2d with FusedBatchNorm is not supported");let l=C("strides",r,t,e),u=zl(r,t,e),m=C("dataFormat",r,t,e).toUpperCase(),f=C("dilations",r,t,e),[d,h]=C("args",r,t,e);a&&(h=d,d=void 0);let g=C("leakyreluAlpha",r,t,e);return{stride:l,pad:u,dataFormat:m,dilations:f,biasArg:d,preluArg:h,activationFunc:n,leakyreluAlpha:g}}var FT=(r,t,e,o=Dt)=>{switch(r.op){case"Conv1D":{let n=C("stride",r,t,e),s=C("pad",r,t,e),a=C("dataFormat",r,t,e).toUpperCase(),i=C("dilation",r,t,e);return[o.conv1d(C("x",r,t,e),C("filter",r,t,e),n,s,a,i)]}case"Conv2D":{let n=C("strides",r,t,e),s=zl(r,t,e),a=C("dataFormat",r,t,e).toUpperCase(),i=C("dilations",r,t,e);return[o.conv2d(C("x",r,t,e),C("filter",r,t,e),[n[1],n[2]],s,a,[i[1],i[2]])]}case"_FusedConv2D":{let{stride:n,pad:s,dataFormat:a,dilations:i,biasArg:c,preluArg:p,activationFunc:l,leakyreluAlpha:u}=DT(r,t,e);return[o.fused.conv2d({x:C("x",r,t,e),filter:C("filter",r,t,e),strides:[n[1],n[2]],pad:s,dataFormat:a,dilations:[i[1],i[2]],bias:c,activation:l,preluActivationWeights:p,leakyreluAlpha:u})]}case"FusedDepthwiseConv2dNative":{let{stride:n,pad:s,dataFormat:a,dilations:i,biasArg:c,preluArg:p,activationFunc:l,leakyreluAlpha:u}=DT(r,t,e);return[o.fused.depthwiseConv2d({x:C("x",r,t,e),filter:C("filter",r,t,e),strides:[n[1],n[2]],pad:s,dataFormat:a,dilations:[i[1],i[2]],bias:c,activation:l,preluActivationWeights:p,leakyreluAlpha:u})]}case"Conv2DBackpropInput":case"Conv2dTranspose":{let n=C("outputShape",r,t,e),s=C("strides",r,t,e),a=zl(r,t,e);return[o.conv2dTranspose(C("x",r,t,e),C("filter",r,t,e),n,[s[1],s[2]],a)]}case"DepthwiseConv2dNative":case"DepthwiseConv2d":{let n=C("strides",r,t,e),s=zl(r,t,e),a=C("dilations",r,t,e),i=C("dataFormat",r,t,e).toUpperCase();return[o.depthwiseConv2d(C("input",r,t,e),C("filter",r,t,e),[n[1],n[2]],s,i,[a[1],a[2]])]}case"Conv3D":{let n=C("strides",r,t,e),s=C("pad",r,t,e),a=C("dataFormat",r,t,e).toUpperCase(),i=C("dilations",r,t,e);return[o.conv3d(C("x",r,t,e),C("filter",r,t,e),[n[1],n[2],n[3]],s,a,[i[1],i[2],i[3]])]}case"AvgPool":{let n=C("strides",r,t,e),s=C("pad",r,t,e),a=C("kernelSize",r,t,e);return[o.avgPool(C("x",r,t,e),[a[1],a[2]],[n[1],n[2]],s)]}case"MaxPool":{let n=C("strides",r,t,e),s=C("pad",r,t,e),a=C("kernelSize",r,t,e);return[o.maxPool(C("x",r,t,e),[a[1],a[2]],[n[1],n[2]],s)]}case"MaxPoolWithArgmax":{let n=C("strides",r,t,e),s=C("pad",r,t,e),a=C("kernelSize",r,t,e),i=C("includeBatchInIndex",r,t,e),{result:c,indexes:p}=o.maxPoolWithArgmax(C("x",r,t,e),[a[1],a[2]],[n[1],n[2]],s,i);return[c,p]}case"AvgPool3D":{let n=C("strides",r,t,e),s=C("pad",r,t,e),a=C("kernelSize",r,t,e);return[o.avgPool3d(C("x",r,t,e),[a[1],a[2],a[3]],[n[1],n[2],n[3]],s)]}case"MaxPool3D":{let n=C("strides",r,t,e),s=C("pad",r,t,e),a=C("kernelSize",r,t,e);return[o.maxPool3d(C("x",r,t,e),[a[1],a[2],a[3]],[n[1],n[2],n[3]],s)]}case"Dilation2D":{let n=C("strides",r,t,e),s=C("pad",r,t,e),a=C("dilations",r,t,e),i=n[1],c=n[2],p=a[1],l=a[2];return[o.dilation2d(C("x",r,t,e),C("filter",r,t,e),[i,c],s,[p,l],"NHWC")]}default:throw TypeError(`Node type ${r.op} is not implemented`)}};var _T=(r,t,e,o=Dt)=>{switch(r.op){case"Fill":{let n=C("shape",r,t,e),s=C("dtype",r,t,e),a=C("value",r,t,e);return[o.fill(n,a,s)]}case"LinSpace":{let n=C("start",r,t,e),s=C("stop",r,t,e),a=C("num",r,t,e);return[o.linspace(n,s,a)]}case"Multinomial":{let n=C("logits",r,t,e),s=C("numSamples",r,t,e),a=C("seed",r,t,e);return[o.multinomial(n,s,a)]}case"OneHot":{let n=C("indices",r,t,e),s=C("depth",r,t,e),a=C("onValue",r,t,e),i=C("offValue",r,t,e),c=C("dtype",r,t,e);return[o.oneHot(n,s,a,i,c)]}case"Ones":return[o.ones(C("shape",r,t,e),C("dtype",r,t,e))];case"OnesLike":return[o.onesLike(C("x",r,t,e))];case"RandomStandardNormal":return[o.randomStandardNormal(C("shape",r,t,e),C("dtype",r,t,e),C("seed",r,t,e))];case"RandomUniform":return[o.randomUniform(C("shape",r,t,e),C("minval",r,t,e),C("maxval",r,t,e),C("dtype",r,t,e))];case"Range":{let n=C("start",r,t,e),s=C("stop",r,t,e),a=C("step",r,t,e);return[o.range(n,s,a,C("dtype",r,t,e))]}case"TruncatedNormal":{let n=C("shape",r,t,e),s=C("mean",r,t,e),a=C("stdDev",r,t,e),i=C("seed",r,t,e);return[o.truncatedNormal(n,s,a,C("dtype",r,t,e),i)]}case"Zeros":return[o.zeros(C("shape",r,t,e),C("dtype",r,t,e))];case"ZerosLike":return[o.zerosLike(C("x",r,t,e))];default:throw TypeError(`Node type ${r.op} is not implemented`)}};function $x(r,t,e){let o=C("boxes",r,t,e),n=C("scores",r,t,e),s=C("maxOutputSize",r,t,e),a=C("iouThreshold",r,t,e),i=C("scoreThreshold",r,t,e),c=C("softNmsSigma",r,t,e);return{boxes:o,scores:n,maxOutputSize:s,iouThreshold:a,scoreThreshold:i,softNmsSigma:c}}var OT=async(r,t,e,o,n=Dt)=>{switch(r.op){case"NonMaxSuppressionV5":{let{boxes:s,scores:a,maxOutputSize:i,iouThreshold:c,scoreThreshold:p,softNmsSigma:l}=$x(r,t,e),u=await n.image.nonMaxSuppressionWithScoreAsync(s,a,i,c,p,l);return[u.selectedIndices,u.selectedScores]}case"NonMaxSuppressionV4":{let{boxes:s,scores:a,maxOutputSize:i,iouThreshold:c,scoreThreshold:p}=$x(r,t,e),l=C("padToMaxOutputSize",r,t,e),u=await n.image.nonMaxSuppressionPaddedAsync(s,a,i,c,p,l);return[u.selectedIndices,u.validOutputs]}case"NonMaxSuppressionV3":case"NonMaxSuppressionV2":{let{boxes:s,scores:a,maxOutputSize:i,iouThreshold:c,scoreThreshold:p}=$x(r,t,e);return[await n.image.nonMaxSuppressionAsync(s,a,i,c,p)]}case"Where":{let s=n.cast(C("condition",r,t,e),"bool"),a=[await n.whereAsync(s)];return s.dispose(),a}case"ListDiff":return n.setdiff1dAsync(C("x",r,t,e),C("y",r,t,e));default:throw TypeError(`Node type ${r.op} is not implemented`)}};var PT=(r,t,e,o=Dt)=>{switch(r.op){case"LowerBound":{let n=C("sortedSequence",r,t,e),s=C("values",r,t,e);return[o.lowerBound(n,s)]}case"TopKV2":{let n=C("x",r,t,e),s=C("k",r,t,e),a=C("sorted",r,t,e),i=o.topk(n,s,a);return[i.values,i.indices]}case"UpperBound":{let n=C("sortedSequence",r,t,e),s=C("values",r,t,e);return[o.upperBound(n,s)]}case"Unique":{let n=C("x",r,t,e),s=o.unique(n);return[s.values,s.indices]}case"UniqueV2":{let n=C("x",r,t,e),s=C("axis",r,t,e),a=o.unique(n,s);return[a.values,a.indices]}default:throw TypeError(`Node type ${r.op} is not implemented`)}};var LT=(r,t,e,o=Dt)=>{switch(r.op){case"Const":return t[r.name];case"PlaceholderWithDefault":let n=C("default",r,t,e);return[pe(r.name,t,e)||n];case"Placeholder":return[pe(r.name,t,e)];case"Identity":case"StopGradient":case"FakeQuantWithMinMaxVars":{let l=C("x",r,t,e);return[Ur(l)]}case"IdentityN":return C("x",r,t,e).map(l=>Ur(l));case"Snapshot":let s=C("x",r,t,e);return[Ur(s)];case"Shape":return[o.tensor1d(C("x",r,t,e).shape,"int32")];case"ShapeN":return C("x",r,t,e).map(l=>o.tensor1d(l.shape));case"Size":return[o.scalar(C("x",r,t,e).size,"int32")];case"Rank":return[o.scalar(C("x",r,t,e).rank,"int32")];case"NoOp":return[o.scalar(1)];case"Print":let a=C("x",r,t,e),i=C("data",r,t,e),c=C("message",r,t,e),p=C("summarize",r,t,e);console.warn("The graph has a tf.print() operation,usually used for debugging, which slows down performance."),console.log(c);for(let l=0;l<i.length;l++)console.log(Array.prototype.slice.call(i[l].dataSync()).slice(0,p));return[a];default:throw TypeError(`Node type ${r.op} is not implemented`)}};var Em=class{constructor(t,e){this.keyDType=t,this.valueDType=e,this.handle=it(0),this.tensorMap=new Map,Ke(this.handle)}get id(){return this.handle.id}clearAndClose(){this.tensorMap.forEach(t=>t.dispose()),this.tensorMap.clear(),this.handle.dispose()}size(){return this.tensorMap.size}tensorSize(){return it(this.size(),"int32")}async import(t,e){this.checkKeyAndValueTensor(t,e);let o=await t.data();return this.tensorMap.forEach(n=>n.dispose()),this.tensorMap.clear(),ht(()=>{let n=_e(e),s=o.length,a=n.length;y.assert(s===a,()=>`The number of elements doesn't match, keys has ${s} elements, the values has ${a} elements.`);for(let i=0;i<s;i++){let c=o[i],p=n[i];Ke(p),this.tensorMap.set(c,p)}return this.handle})}async find(t,e){this.checkKeyAndValueTensor(t,e);let o=await t.data();return ht(()=>{let n=[];for(let s=0;s<o.length;s++){let a=o[s],i=this.findWithDefault(a,e);n.push(i)}return he(n)})}findWithDefault(t,e){let o=this.tensorMap.get(t);return o??e}checkKeyAndValueTensor(t,e){if(t.dtype!==this.keyDType)throw new Error(`Expect key dtype ${this.keyDType}, but got ${t.dtype}`);if(e.dtype!==this.valueDType)throw new Error(`Expect value dtype ${this.valueDType}, but got ${e.dtype}`)}};var MT=async(r,t,e,o)=>{switch(r.op){case"HashTable":case"HashTableV2":{let n=C("keyDType",r,t,e),s=C("valueDType",r,t,e),a=new Em(n,s);return o.addHashTable(r.name,a),[a.handle]}case"LookupTableImport":case"LookupTableImportV2":{let n=C("tableHandle",r,t,e,o),s=C("keys",r,t,e),a=C("values",r,t,e);return[await o.getHashTableById(n.id).import(s,a)]}case"LookupTableFind":case"LookupTableFindV2":{let n=C("tableHandle",r,t,e,o),s=C("keys",r,t,e),a=C("defaultValue",r,t,e);return[await o.getHashTableById(n.id).find(s,a)]}case"LookupTableSize":case"LookupTableSizeV2":{let n=C("tableHandle",r,t,e,o);return[o.getHashTableById(n.id).tensorSize()]}default:throw TypeError(`Node type ${r.op} is not implemented`)}};var BT=(r,t,e,o=Dt)=>{switch(r.op){case"ResizeBilinear":{let n=C("images",r,t,e),s=C("size",r,t,e),a=C("alignCorners",r,t,e),i=C("halfPixelCenters",r,t,e);return[o.image.resizeBilinear(n,[s[0],s[1]],a,i)]}case"ResizeNearestNeighbor":{let n=C("images",r,t,e),s=C("size",r,t,e),a=C("alignCorners",r,t,e),i=C("halfPixelCenters",r,t,e);return[o.image.resizeNearestNeighbor(n,[s[0],s[1]],a,i)]}case"CropAndResize":{let n=C("image",r,t,e),s=C("boxes",r,t,e),a=C("boxInd",r,t,e),i=C("cropSize",r,t,e),c=C("method",r,t,e),p=C("extrapolationValue",r,t,e);return[o.image.cropAndResize(n,s,a,i,c,p)]}case"ImageProjectiveTransformV3":{let n=C("images",r,t,e),s=C("transforms",r,t,e),a=C("outputShape",r,t,e),i=C("fillValue",r,t,e),c=C("interpolation",r,t,e),p=C("fillMode",r,t,e);return[o.image.transform(n,s,c.toLowerCase(),p.toLowerCase(),i,a)]}default:throw TypeError(`Node type ${r.op} is not implemented`)}};var VT=(r,t,e,o=Dt)=>{switch(r.op){case"Equal":return[o.equal(C("a",r,t,e),C("b",r,t,e))];case"NotEqual":return[o.notEqual(C("a",r,t,e),C("b",r,t,e))];case"Greater":return[o.greater(C("a",r,t,e),C("b",r,t,e))];case"GreaterEqual":return[o.greaterEqual(C("a",r,t,e),C("b",r,t,e))];case"Less":return[o.less(C("a",r,t,e),C("b",r,t,e))];case"LessEqual":return[o.lessEqual(C("a",r,t,e),C("b",r,t,e))];case"LogicalAnd":return[o.logicalAnd(C("a",r,t,e),C("b",r,t,e))];case"LogicalNot":return[o.logicalNot(C("a",r,t,e))];case"LogicalOr":return[o.logicalOr(C("a",r,t,e),C("b",r,t,e))];case"Select":case"SelectV2":return[o.where(C("condition",r,t,e),C("a",r,t,e),C("b",r,t,e))];default:throw TypeError(`Node type ${r.op} is not implemented`)}};var GT=(r,t,e,o=Dt)=>{switch(r.op){case"BatchMatMul":case"BatchMatMulV2":case"MatMul":return[o.matMul(C("a",r,t,e),C("b",r,t,e),C("transposeA",r,t,e),C("transposeB",r,t,e))];case"Einsum":return[o.einsum(C("equation",r,t,e),...C("tensors",r,t,e))];case"Transpose":return[o.transpose(C("x",r,t,e),C("perm",r,t,e))];case"_FusedMatMul":let[n,s]=C("fusedOps",r,t,e),a=n==="biasadd",i=s==="prelu",c=C("numArgs",r,t,e),p=C("leakyreluAlpha",r,t,e);if(a){if(i&&c!==2)throw new Error("Fused MatMul with BiasAdd and Prelu must have two extra arguments: bias and alpha.");if(!i&&c!==1)throw new Error("Fused MatMul with BiasAdd must have one extra argument: bias.")}let[l,u]=C("args",r,t,e);return[o.fused.matMul({a:C("a",r,t,e),b:C("b",r,t,e),transposeA:C("transposeA",r,t,e),transposeB:C("transposeB",r,t,e),bias:l,activation:s,preluActivationWeights:u,leakyreluAlpha:p})];default:throw TypeError(`Node type ${r.op} is not implemented`)}};var UT=(r,t,e,o=Dt)=>{switch(r.op){case"EuclideanNorm":return[o.euclideanNorm(C("x",r,t,e),C("axis",r,t,e),C("keepDims",r,t,e))];case"FusedBatchNorm":case"FusedBatchNormV2":return[o.batchNorm(C("x",r,t,e),C("mean",r,t,e),C("variance",r,t,e),C("offset",r,t,e),C("scale",r,t,e),C("epsilon",r,t,e))];case"FusedBatchNormV3":return[o.batchNorm(C("x",r,t,e),C("mean",r,t,e),C("variance",r,t,e),C("offset",r,t,e),C("scale",r,t,e),C("epsilon",r,t,e))];case"LRN":return[o.localResponseNormalization(C("x",r,t,e),C("radius",r,t,e),C("bias",r,t,e),C("alpha",r,t,e),C("beta",r,t,e))];case"Softmax":return[o.softmax(C("x",r,t,e))];case"LogSoftmax":return[o.logSoftmax(C("x",r,t,e))];case"SparseToDense":return[o.sparseToDense(C("sparseIndices",r,t,e),C("outputShape",r,t,e),C("sparseValues",r,t,e),C("defaultValue",r,t,e))];default:throw TypeError(`Node type ${r.op} is not implemented`)}};var zT=(r,t,e,o=Dt)=>{switch(r.op){case"Max":{let i=C("axis",r,t,e),c=C("keepDims",r,t,e);return[o.max(C("x",r,t,e),i,c)]}case"Mean":{let i=C("axis",r,t,e),c=C("keepDims",r,t,e);return[o.mean(C("x",r,t,e),i,c)]}case"Min":{let i=C("axis",r,t,e),c=C("keepDims",r,t,e);return[o.min(C("x",r,t,e),i,c)]}case"Sum":{let i=C("axis",r,t,e),c=C("keepDims",r,t,e);return[o.sum(C("x",r,t,e),i,c)]}case"All":{let i=C("axis",r,t,e),c=C("keepDims",r,t,e);return[o.all(C("x",r,t,e),i,c)]}case"Any":{let i=C("axis",r,t,e),c=C("keepDims",r,t,e);return[o.any(C("x",r,t,e),i,c)]}case"ArgMax":{let i=C("axis",r,t,e);return[o.argMax(C("x",r,t,e),i)]}case"ArgMin":{let i=C("axis",r,t,e);return[o.argMin(C("x",r,t,e),i)]}case"Prod":{let i=C("axis",r,t,e),c=C("keepDims",r,t,e);return[o.prod(C("x",r,t,e),i,c)]}case"Cumprod":{let i=C("axis",r,t,e),c=C("exclusive",r,t,e),p=C("reverse",r,t,e);return[o.cumprod(C("x",r,t,e),i,c,p)]}case"Cumsum":{let i=C("axis",r,t,e),c=C("exclusive",r,t,e),p=C("reverse",r,t,e);return[o.cumsum(C("x",r,t,e),i,c,p)]}case"Bincount":let n=C("x",r,t,e),s=C("weights",r,t,e),a=C("size",r,t,e);return[o.bincount(n,s,a)];case"DenseBincount":{let i=C("x",r,t,e),c=C("weights",r,t,e),p=C("size",r,t,e),l=C("binaryOutput",r,t,e);return[o.denseBincount(i,c,p,l)]}default:throw TypeError(`Node type ${r.op} is not implemented`)}};var WT=(r,t,e,o=Dt)=>{switch(r.op){case"ConcatV2":case"Concat":{let n=C("n",r,t,e),s=C("axis",r,t,e),a=C("tensors",r,t,e);return a=a.slice(0,n),[o.concat(a,s)]}case"Gather":{let n=C("x",r,t,e),s=C("indices",r,t,e);return[o.gather(n,o.cast(s,"int32"),0)]}case"GatherV2":{let n=C("axis",r,t,e),s=C("batchDims",r,t,e),a=C("x",r,t,e),i=C("indices",r,t,e);return[o.gather(a,o.cast(i,"int32"),n,s)]}case"Reverse":{let n=C("dims",r,t,e),s=[];for(let i=0;i<n.length;i++)n[i]&&s.push(i);let a=C("x",r,t,e);return[o.reverse(a,s)]}case"ReverseV2":{let n=C("axis",r,t,e),s=C("x",r,t,e);return[o.reverse(s,n)]}case"Slice":{let n=C("begin",r,t,e),s=C("size",r,t,e);return[o.slice(C("x",r,t,e),n,s)]}case"StridedSlice":{let n=C("begin",r,t,e),s=C("end",r,t,e),a=C("strides",r,t,e),i=C("beginMask",r,t,e),c=C("endMask",r,t,e),p=C("ellipsisMask",r,t,e),l=C("newAxisMask",r,t,e),u=C("shrinkAxisMask",r,t,e),m=C("x",r,t,e);return[o.stridedSlice(m,n,s,a,i,c,p,l,u)]}case"Pack":return ht(()=>{let n=C("axis",r,t,e),s=C("tensors",r,t,e),a=s[0].shape,i=o.squeeze(s[0]).shape,c=s.map(p=>{let l=y.arraysEqual(p.shape,a);if(!l&&!y.arraysEqual(o.squeeze(p).shape,i))throw new Error("the input tensors shape does not match");return l?p:o.reshape(p,a)});return[o.stack(c,n)]});case"Unpack":{let n=C("axis",r,t,e),s=C("tensor",r,t,e);return o.unstack(s,n)}case"Tile":{let n=C("reps",r,t,e);return[o.tile(C("x",r,t,e),n)]}case"Split":case"SplitV":{let n=C("axis",r,t,e),s=C("numOrSizeSplits",r,t,e),a=C("x",r,t,e);return o.split(a,s,n)}case"ScatterNd":{let n=C("indices",r,t,e),s=C("values",r,t,e),a=C("shape",r,t,e);return[o.scatterND(n,s,a)]}case"GatherNd":{let n=C("x",r,t,e),s=C("indices",r,t,e);return[o.gatherND(n,s)]}case"SparseToDense":{let n=C("sparseIndices",r,t,e),s=C("outputShape",r,t,e),a=C("sparseValues",r,t,e),i=C("defaultValue",r,t,e);return[o.sparseToDense(n,a,s,a.dtype===i.dtype?i:o.cast(i,a.dtype))]}default:throw TypeError(`Node type ${r.op} is not implemented`)}};var HT=(r,t,e,o=Dt)=>{switch(r.op){case"SparseFillEmptyRows":{let{outputIndices:n,outputValues:s,emptyRowIndicator:a,reverseIndexMap:i}=o.sparse.sparseFillEmptyRows(C("indices",r,t,e),C("values",r,t,e),C("denseShape",r,t,e),C("defaultValue",r,t,e));return[n,s,a,i]}case"SparseReshape":{let{outputIndices:n,outputShape:s}=o.sparse.sparseReshape(C("inputIndices",r,t,e),C("inputShape",r,t,e),C("newShape",r,t,e));return[n,s]}case"SparseSegmentMean":return[o.sparse.sparseSegmentMean(C("data",r,t,e),C("indices",r,t,e),C("segmentIds",r,t,e))];case"SparseSegmentSum":return[o.sparse.sparseSegmentSum(C("data",r,t,e),C("indices",r,t,e),C("segmentIds",r,t,e))];default:throw TypeError(`Node type ${r.op} is not implemented`)}};var qT=(r,t,e,o=Dt)=>{switch(r.op){case"FFT":return[o.fft(C("x",r,t,e))];case"IFFT":return[o.ifft(C("x",r,t,e))];case"RFFT":return[o.rfft(C("x",r,t,e))];case"IRFFT":return[o.irfft(C("x",r,t,e))];default:throw TypeError(`Node type ${r.op} is not implemented`)}};var KT=(r,t,e,o=Dt)=>{switch(r.op){case"StringNGrams":{let{nGrams:n,nGramsSplits:s}=o.string.stringNGrams(C("data",r,t,e),C("dataSplits",r,t,e),C("separator",r,t,e),C("nGramWidths",r,t,e),C("leftPad",r,t,e),C("rightPad",r,t,e),C("padWidth",r,t,e),C("preserveShortSequences",r,t,e));return[n,s]}case"StringSplit":{let{indices:n,values:s,shape:a}=o.string.stringSplit(C("input",r,t,e),C("delimiter",r,t,e),C("skipEmpty",r,t,e));return[n,s,a]}case"StringToHashBucketFast":return[o.string.stringToHashBucketFast(C("input",r,t,e),C("numBuckets",r,t,e))];default:throw TypeError(`Node type ${r.op} is not implemented`)}};var jT=(r,t,e,o=Dt)=>{switch(r.op){case"Cast":return[o.cast(C("x",r,t,e),C("dtype",r,t,e))];case"ExpandDims":{let n=C("axis",r,t,e);return[o.expandDims(C("x",r,t,e),n)]}case"Squeeze":{let n=C("axis",r,t,e);return[o.squeeze(C("x",r,t,e),n)]}case"Reshape":return[o.reshape(C("x",r,t,e),C("shape",r,t,e))];case"MirrorPad":return[o.mirrorPad(C("x",r,t,e),C("padding",r,t,e),C("mode",r,t,e))];case"PadV2":case"Pad":return[o.pad(C("x",r,t,e),C("padding",r,t,e),C("constantValue",r,t,e))];case"SpaceToBatchND":{let n=C("blockShape",r,t,e),s=C("paddings",r,t,e);return[o.spaceToBatchND(C("x",r,t,e),n,s)]}case"BatchToSpaceND":{let n=C("blockShape",r,t,e),s=C("crops",r,t,e);return[o.batchToSpaceND(C("x",r,t,e),n,s)]}case"DepthToSpace":{let n=C("blockSize",r,t,e),s=C("dataFormat",r,t,e).toUpperCase();return[o.depthToSpace(C("x",r,t,e),n,s)]}case"BroadcastTo":return[o.broadcastTo(C("x",r,t,e),C("shape",r,t,e))];case"BroadcastArgs":return[o.broadcastArgs(C("s0",r,t,e),C("s1",r,t,e))];default:throw TypeError(`Node type ${r.op} is not implemented`)}};function Ax(r,t,e,o,n=ht){let s=((a,i,c)=>{switch(a.category){case"arithmetic":return n(()=>ST(a,i,c));case"basic_math":return n(()=>vT(a,i,c));case"control":return RT(a,i,c);case"convolution":return n(()=>FT(a,i,c));case"creation":return n(()=>_T(a,i,c));case"dynamic":return OT(a,i,c);case"evaluation":return n(()=>PT(a,i,c));case"image":return n(()=>BT(a,i,c));case"graph":return n(()=>LT(a,i,c));case"logical":return n(()=>VT(a,i,c));case"matrices":return n(()=>GT(a,i,c));case"normalization":return n(()=>UT(a,i,c));case"reduction":return n(()=>zT(a,i,c));case"slice_join":return n(()=>WT(a,i,c));case"sparse":return n(()=>HT(a,i,c));case"spectral":return n(()=>qT(a,i,c));case"string":return n(()=>KT(a,i,c));case"transformation":return n(()=>jT(a,i,c));case"hash_table":return MT(a,i,c,o);case"custom":let p=fm(a.op);if(p&&p.customExecutor)return p.customExecutor(new vm(a,i,c));throw TypeError(`Custom op ${a.op} is not registered.`);default:throw TypeError(`Unknown op '${a.op}'. File an issue at https://github.com/tensorflow/tfjs/issues so we can add it, or register a custom execution with tf.registerOp()`)}})(r,t,e);return y.isPromise(s)?s.then(a=>[].concat(a)):[].concat(s)}var Hl=class{constructor(t={},e={},o={},n={}){this.weightMap=t,this.tensorArrayMap=e,this.tensorListMap=o,this.functionMap=n,this.rootContext={id:0,frameName:"",iterationId:0},this.contexts=[this.rootContext],this.lastId=0,this.generateCurrentContextIds()}newFrame(t,e){return{id:t,frameName:e,iterationId:0}}set currentContext(t){this.contexts!==t&&(this.contexts=t,this.generateCurrentContextIds())}get currentContext(){return this.contexts}get currentContextId(){return this._currentContextIds[0]}get currentContextIds(){return this._currentContextIds}generateCurrentContextIds(){let t=[];for(let e=0;e<this.contexts.length-1;e++){let o=this.contexts.slice(0,this.contexts.length-e);t.push(this.contextIdforContexts(o))}t.push(""),this._currentContextIds=t}contextIdforContexts(t){return t?t.map(e=>e.id===0&&e.iterationId===0?"":`${e.frameName}-${e.iterationId}`).join("/"):""}enterFrame(t){this.contexts&&(this.lastId++,this.contexts=this.contexts.slice(),this.contexts.push(this.newFrame(this.lastId,t)),this._currentContextIds.unshift(this.contextIdforContexts(this.contexts)))}exitFrame(){if(this.contexts&&this.contexts.length>1)this.contexts=this.contexts.slice(),this.contexts.splice(-1),this.currentContextIds.shift();else throw new Error("Cannot exit frame, the context is empty")}nextIteration(){if(this.contexts&&this.contexts.length>0){this.contexts=this.contexts.slice(),this.lastId++;let t=Object.assign({},this.contexts[this.contexts.length-1]);t.iterationId+=1,t.id=this.lastId,this.contexts.splice(-1,1,t),this._currentContextIds.splice(0,1,this.contextIdforContexts(this.contexts))}else throw new Error("Cannot increase frame iteration, the context is empty")}getWeight(t){return this.weightMap[t]}addTensorArray(t){this.tensorArrayMap[t.id]=t}getTensorArray(t){return this.tensorArrayMap[t]}addTensorList(t){this.tensorListMap[t.id]=t}getTensorList(t){return this.tensorListMap[t]}dispose(t){for(let e in this.tensorArrayMap)this.tensorArrayMap[e].clearAndClose(t);for(let e in this.tensorListMap)this.tensorListMap[e].clearAndClose(t)}};function Rx(r,t,e,o){let n=new Set,s=[],a=null,i=null,c=new Set,p=Object.keys(r).map(m=>Oe(m)[0]),l=[];o!=null&&(l=o.map(m=>Oe(m.name)[0]));let u=[...t];for(;u.length>0;){let m=u.pop();if((Dx(m)||a3(m)||i3(m))&&a==null&&(a=m,i=a.children.map(f=>f.name).filter(f=>n.has(f))),n.add(m.name),e[m.name]==null&&p.indexOf(m.name)===-1&&l.indexOf(m.name)===-1){if(m.inputs.length===0){s.push(m.name);continue}m.inputs.forEach(f=>{c.has(f.name)||(c.add(f.name),u.push(f))})}}return{inputs:r,outputs:t,usedNodes:n,missingInputs:s,dynamicNode:a,syncInputs:i}}function XT(r,t,e){let{usedNodes:o,inputs:n}=e,s=[],a=Object.keys(n).map(l=>Oe(l)[0]).map(l=>r.nodes[l]),i=r.initNodes;a.forEach(l=>{o.has(l.name)&&s.push(l)}),r.weights.forEach(l=>{o.has(l.name)&&s.push(l)}),i?.forEach(l=>{o.has(l.name)&&s.push(l)});let c=new Set,p=[];for(;s.length>0;){let l=s.pop();c.add(l.name),t[l.name]||p.push(l),l.children.forEach(u=>{!c.has(u.name)&&o.has(u.name)&&u.inputs.every(m=>c.has(m.name))&&s.push(u)})}return p}var o3=["Switch","Merge","Enter","Exit","NextIteration","StatelessIf","StatelessWhile","if","While"],n3=["NonMaxSuppressionV2","NonMaxSuppressionV3","NonMaxSuppressionV5","Where"],s3=["HashTable","HashTableV2","LookupTableImport","LookupTableImportV2","LookupTableFind","LookupTableFindV2","LookupTableSize","LookupTableSizeV2"];function Dx(r){return o3.indexOf(r.op)>=0}function a3(r){return n3.indexOf(r.op)>=0}function i3(r){return s3.indexOf(r.op)>=0}var ql=class r{constructor(t,e){this.graph=t,this.parent=e,this.compiledMap=new Map,this._weightMap={},this.SEPERATOR=",",this._functions={},this._functionExecutorMap={},this.intermediateTensors={},this.keepTensorForDebug=!1,this._outputs=t.outputs,this._inputs=t.inputs,this._initNodes=t.initNodes,this._signature=t.signature,this._functions=t.functions,t.functions!=null&&Object.keys(t.functions).forEach(o=>{this._functionExecutorMap[o]=new r(t.functions[o],this)})}get weightIds(){return this.parent?this.parent.weightIds:this._weightIds}get functionExecutorMap(){return this.parent?this.parent.functionExecutorMap:this._functionExecutorMap}get weightMap(){return this.parent?this.parent.weightMap:this._weightMap}set weightMap(t){let e=Object.keys(t).map(o=>t[o].map(n=>n.id));this._weightIds=[].concat(...e),this._weightMap=t}set resourceManager(t){this._resourceManager=t}get inputs(){return this._inputs.map(t=>({name:t.name,shape:t.attrParams.shape?t.attrParams.shape.value:void 0,dtype:t.attrParams.dtype?t.attrParams.dtype.value:void 0}))}get outputs(){return this._outputs.map(t=>({name:t.name,shape:t.attrParams.shape?t.attrParams.shape.value:void 0,dtype:t.attrParams.dtype?t.attrParams.dtype.value:void 0}))}get inputNodes(){return this._inputs.map(t=>t.signatureKey||t.name)}get outputNodes(){return this._outputs.map(t=>{let e=t.signatureKey||t.name;return t.defaultOutput?`${e}:${t.defaultOutput}`:e})}get functions(){return Object.keys(this._functions).reduce((t,e)=>(t[e]=this._functions[e].signature,t),{})}getCompilationKey(t,e){let o=t.map(s=>s.name).sort(),n=e.map(s=>s.name).sort();return o.join(this.SEPERATOR)+"--"+n.join(this.SEPERATOR)}compile(t,e){let o=Rx(t,e,this.weightMap,this._initNodes),{missingInputs:n,dynamicNode:s,syncInputs:a}=o;if(s!=null)throw new Error(`This execution contains the node '${s.name}', which has the dynamic op '${s.op}'. Please use model.executeAsync() instead. Alternatively, to avoid the dynamic ops, specify the inputs [${a}]`);if(n.length>0){let i=e.map(p=>p.name),c=Object.keys(t);throw new Error(`Cannot compute the outputs [${i}] from the provided inputs [${c}]. Missing the following inputs: [${n}]`)}return XT(this.graph,this.weightMap,o)}execute(t,e){t=this.mapInputs(t);let o=Object.keys(t).sort();this.checkInputs(t),this.checkInputShapeAndType(t),e=this.mapOutputs(e),this.checkOutputs(e);let n=o.map(u=>this.graph.nodes[Oe(u)[0]]),s=e.map(u=>Oe(u)[0]),a=s.map(u=>this.graph.nodes[u]);this.resetIntermediateTensors(),a.length===0&&(a=this._outputs);let i=this.getCompilationKey(n,a),c=this.compiledMap.get(i);c==null&&(c=this.compile(t,a),this.compiledMap.set(i,c));let p={},l={};return ht(()=>{let u=new Hl(this.weightMap,p,l,this.functionExecutorMap),m=Object.assign({},this.weightMap);Object.keys(t).forEach(h=>{let[g,x]=Oe(h),b=[];b[x]=t[h],m[g]=b});let f=this.getFrozenTensorIds(m),d={};for(let h=0;h<c.length;h++){let g=c[h];if(!m[g.name]){let x=Ax(g,m,u,this._resourceManager);if(y.isPromise(x))throw new Error(`The execution of the op '${g.op}' returned a promise. Please use model.executeAsync() instead.`);m[g.name]=x,this.checkTensorForDisposal(g.name,g,m,u,f,s,d)}}return this.parent==null&&u.dispose(f),e.map(h=>pe(h,m,u))})}getFrozenTensorIds(t){let e=[].concat.apply([],Object.keys(t).map(o=>t[o]).map(o=>o.map(n=>n.id)));return new Set(e)}checkTensorForDisposal(t,e,o,n,s,a,i){e.category==="control"||a.indexOf(t)!==-1||(o[t].forEach(c=>{c!=null&&(i[c.id]=(i[c.id]||0)+e.children.length)}),e.inputs.forEach(c=>{if(c.category!=="control"){let p=CT(c.name,o,n);p?.forEach(l=>{if(l&&!l.kept&&!s.has(l.id)){let u=i[l.id];if(u===1){if(!this.keepTensorForDebug)l.dispose();else{let[m,f]=xr(e.name,n);this.intermediateTensors[m]?this.intermediateTensors[m][f]=l:(this.intermediateTensors[m]=[],this.intermediateTensors[m][f]=l)}delete i[l.id]}else u!=null&&i[l.id]--}})}}))}async executeAsync(t,e){return this._executeAsync(t,e)}disposeIntermediateTensors(){this.intermediateTensors&&(Object.keys(this.intermediateTensors).forEach(t=>this.intermediateTensors[t].forEach(e=>e.dispose())),this.disposeTensorsMap())}disposeTensorsMap(){this.tensorsMap&&Object.keys(this.tensorsMap).forEach(t=>{this.tensorsMap[t].forEach(o=>{o&&!o.kept&&!o.isDisposed&&!this.keepIds.has(o.id)&&o.dispose()})})}getIntermediateTensors(){return this.tensorsMap}resetIntermediateTensors(){for(let t in this.intermediateTensors)this.intermediateTensors[t].forEach(e=>e.dispose()),delete this.intermediateTensors[t]}async _executeAsync(t,e,o=!1,n={},s={}){o||(t=this.mapInputs(t),this.checkInputs(t),this.checkInputShapeAndType(t),e=this.mapOutputs(e),this.checkOutputs(e));try{this.keepTensorForDebug=F().getBool("KEEP_INTERMEDIATE_TENSORS")}catch(l){console.warn(l.message)}this.resetIntermediateTensors();let a=new Hl(this.weightMap,n,s,this.functionExecutorMap);this.tensorsMap=await this.executeWithControlFlow(t,a,e,o);let i=e.map(l=>pe(l,this.tensorsMap,a)),c=i.map(l=>l.id),p=Object.keys(t).map(l=>t[l].id);return this.keepIds=new Set([...c,...p,...this.weightIds]),this.keepTensorForDebug||this.disposeTensorsMap(),this.parent==null&&a.dispose(this.keepIds),i}async executeFunctionAsync(t,e,o){let n=t.reduce((s,a,i)=>(s[this.inputs[i].name]=a,s),{});return this._executeAsync(n,this.outputNodes,!0,e,o)}async executeWithControlFlow(t,e,o,n){let s=Object.keys(t),a=s.map(w=>this.graph.nodes[Oe(w)[0]]),i=o.map(w=>Oe(w)[0]),c=i.map(w=>this.graph.nodes[w]);c.length===0&&(c=this._outputs);let{usedNodes:p,missingInputs:l,dynamicNode:u,syncInputs:m}=Rx(t,c,this.weightMap,this._initNodes),f=[...a,...this.graph.weights,...this._initNodes||[]].map(w=>({node:w,contexts:e.currentContext})),d=Object.assign({},this.weightMap);Object.keys(t).forEach(w=>{let[I,k]=Oe(w),$=[];$[k]=t[w],d[I]=$});let h={},g=this.getFrozenTensorIds(d),x={};for(;f.length>0;){let w=this.processStack(a,f,e,d,x,g,i,h,p);await Promise.all(w)}u==null&&!n&&console.warn("This model execution did not contain any nodes with control flow or dynamic output shapes. You can use model.execute() instead.");let b=c.filter(w=>!Dx(w)&&!pe(w.name,d,e)).map(w=>w.name);if(b.length>0){let w="";throw u!=null&&(w=`Alternatively, to avoid the dynamic ops, use model.execute() and specify the inputs [${m}]`),new Error(`Cannot compute the outputs [${b}] from the provided inputs [${s}]. Consider providing the following inputs: [${l}]. ${w}`)}return d}processStack(t,e,o,n,s,a,i,c,p){let l=[];for(;e.length>0;){let u=e.pop();o.currentContext=u.contexts;let m="";if(u.node.op==="Enter"&&C("isConstant",u.node,n,o)&&([m]=xr(u.node.name,o)),n[u.node.name]==null){let f=Ax(u.node,n,o,this._resourceManager);m||([m]=xr(u.node.name,o));let d=o.currentContext;y.isPromise(f)?l.push(f.then(h=>(n[m]=h,o.currentContext=d,this.checkTensorForDisposal(m,u.node,n,o,a,i,c),this.processChildNodes(u.node,e,o,n,s,p),h))):(n[m]=f,this.checkTensorForDisposal(m,u.node,n,o,a,i,c),this.processChildNodes(u.node,e,o,n,s,p))}else this.processChildNodes(u.node,e,o,n,s,p)}return l}processChildNodes(t,e,o,n,s,a){t.children.forEach(i=>{let[c]=xr(i.name,o);s[c]||!a.has(i.name)||(i.op==="Merge"?i.inputNames.some(p=>!!pe(p,n,o))&&(s[c]=!0,e.push({contexts:o.currentContext,node:i})):i.inputNames.every(p=>!!pe(p,n,o))&&(s[c]=!0,e.push({contexts:o.currentContext,node:i})))})}dispose(){Object.keys(this.weightMap).forEach(t=>this.weightMap[t].forEach(e=>e.dispose()))}checkInputShapeAndType(t){Object.keys(t).forEach(e=>{let o=t[e],[n]=Oe(e),s=this.graph.nodes[n];if(s.attrParams.shape&&s.attrParams.shape.value){let a=s.attrParams.shape.value,i=a.length===o.shape.length&&o.shape.every((c,p)=>a[p]===-1||a[p]===c);y.assert(i,()=>`The shape of dict['${s.name}'] provided in model.execute(dict) must be [${a}], but was [${o.shape}]`)}s.attrParams.dtype&&s.attrParams.dtype.value&&y.assert(o.dtype===s.attrParams.dtype.value,()=>`The dtype of dict['${s.name}'] provided in model.execute(dict) must be ${s.attrParams.dtype.value}, but was ${o.dtype}`)})}mapInputs(t){let e={};for(let o in t)if(this._signature!=null&&this._signature.inputs!=null&&this._signature.inputs[o]!=null){let n=this._signature.inputs[o];e[n.name]=t[o]}else e[o]=t[o];return e}checkInputs(t){let e=Object.keys(t).filter(o=>{let[n]=Oe(o);return this.graph.nodes[n]==null});if(e.length>0)throw new Error(`The dict provided in model.execute(dict) has keys: [${e}] that are not part of graph`)}mapOutputs(t){return t.map(e=>this._signature!=null&&this._signature.outputs!=null&&this._signature.outputs[e]!=null?this._signature.outputs[e].name:e,{})}checkOutputs(t){t.forEach(e=>{let[o]=Oe(e);if(!this.graph.nodes[o])throw new Error(`The output '${e}' is not found in the graph`)})}};var $m=class{constructor(t={},e={}){this.hashTableNameToHandle=t,this.hashTableMap=e}addHashTable(t,e){this.hashTableNameToHandle[t]=e.handle,this.hashTableMap[e.id]=e}getHashTableHandleByName(t){return this.hashTableNameToHandle[t]}getHashTableById(t){return this.hashTableMap[t]}dispose(){for(let t in this.hashTableMap)this.hashTableMap[t].clearAndClose(),delete this.hashTableMap[t];for(let t in this.hashTableNameToHandle)this.hashTableNameToHandle[t].dispose(),delete this.hashTableNameToHandle[t]}};var c3="?tfjs-format=file",p3="model.json",_c=class{constructor(t,e={},o=to){this.modelUrl=t,this.loadOptions=e,this.version="n/a",this.io=o,e==null&&(this.loadOptions={}),this.resourceManager=new $m}get modelVersion(){return this.version}get inputNodes(){return this.executor.inputNodes}get outputNodes(){return this.executor.outputNodes}get inputs(){return this.executor.inputs}get outputs(){return this.executor.outputs}get weights(){return this.executor.weightMap}get metadata(){return this.artifacts.userDefinedMetadata}get modelSignature(){return this.signature}get modelStructuredOutputKeys(){return this.structuredOutputKeys}findIOHandler(){let t=this.modelUrl;if(t.load!=null)this.handler=t;else if(this.loadOptions.requestInit!=null)this.handler=this.io.browserHTTPRequest(t,this.loadOptions);else{let e=this.io.getLoadHandlers(t,this.loadOptions);if(e.length===0)e.push(this.io.browserHTTPRequest(t,this.loadOptions));else if(e.length>1)throw new Error(`Found more than one (${e.length}) load handlers for URL '${[t]}'`);this.handler=e[0]}}load(){if(this.findIOHandler(),this.handler.load==null)throw new Error("Cannot proceed with model loading because the IOHandler provided does not have the `load` method implemented.");let t=this.handler.load();return y.isPromise(t)?t.then(e=>this.loadSync(e)):this.loadSync(t)}loadSync(t){this.artifacts=t;let e=this.artifacts.modelTopology,o=this.artifacts.signature;if(this.artifacts.userDefinedMetadata!=null){let s=this.artifacts.userDefinedMetadata;s.signature!=null&&(o=s.signature),s.structuredOutputKeys!=null&&(this.structuredOutputKeys=s.structuredOutputKeys)}this.signature=o,this.version=`${e.versions.producer}.${e.versions.minConsumer}`;let n=this.io.decodeWeights(this.artifacts.weightData,this.artifacts.weightSpecs);if(this.executor=new ql(Wl.Instance.transformGraph(e,this.signature)),this.executor.weightMap=this.convertTensorMapToTensorsMap(n),this.executor.resourceManager=this.resourceManager,t.modelInitializer!=null&&t.modelInitializer.node!=null){let s=Wl.Instance.transformGraph(t.modelInitializer);this.initializer=new ql(s),this.initializer.weightMap=this.executor.weightMap,this.initializer.resourceManager=this.resourceManager,this.initializer.executeAsync({},[])}return!0}async save(t,e){if(typeof t=="string"){let o=this.io.getSaveHandlers(t);if(o.length===0)throw new Error(`Cannot find any save handlers for URL '${t}'`);if(o.length>1)throw new Error(`Found more than one (${o.length}) save handlers for URL '${t}'`);t=o[0]}if(t.save==null)throw new Error("GraphModel.save() cannot proceed because the IOHandler provided does not have the `save` attribute defined.");return t.save(this.artifacts)}predict(t,e){let o=this.execute(t,this.outputNodes);if(this.structuredOutputKeys){let n=o instanceof Et?[o]:o,s={};return n.forEach((a,i)=>s[this.structuredOutputKeys[i]]=a),s}return o}normalizeInputs(t){if(!(t instanceof Et)&&!Array.isArray(t))return t;if(t=Array.isArray(t)?t:[t],t.length!==this.inputNodes.length)throw new Error(`Input tensor count mismatch,the graph model has ${this.inputNodes.length} placeholders, while there are ${t.length} input tensors.`);return this.inputNodes.reduce((e,o,n)=>(e[o]=t[n],e),{})}normalizeOutputs(t){return t=t||this.outputNodes,Array.isArray(t)?t:[t]}execute(t,e){t=this.normalizeInputs(t),e=this.normalizeOutputs(e);let o=this.executor.execute(t,e);return o.length>1?o:o[0]}async executeAsync(t,e){t=this.normalizeInputs(t),e=this.normalizeOutputs(e);let o=await this.executor.executeAsync(t,e);return o.length>1?o:o[0]}getIntermediateTensors(){return this.executor.getIntermediateTensors()}disposeIntermediateTensors(){this.executor.disposeIntermediateTensors()}convertTensorMapToTensorsMap(t){return Object.keys(t).reduce((e,o)=>(e[o]=[t[o]],e),{})}dispose(){this.executor.dispose(),this.initializer&&this.initializer.dispose(),this.resourceManager.dispose()}};async function Am(r,t={},e=to){if(r==null)throw new Error("modelUrl in loadGraphModel() cannot be null. Please provide a url or an IOHandler that loads the model");t==null&&(t={}),t.fromTFHub&&typeof r=="string"&&(r=l3(r));let o=new _c(r,t,e);return await o.load(),o}function YT(r){if(r==null)throw new Error("modelUrl in loadGraphModelSync() cannot be null. Please provide model artifacts or an IOHandler that loads the model");let t;if(r instanceof Array){let[o,n]=r;if(!o)throw new Error("modelJSON must be the first element of the array");if(!n||!(n instanceof ArrayBuffer))throw new Error("An ArrayBuffer of weights must be the second element of the array");if(!("modelTopology"in o))throw new Error("Model JSON is missing 'modelTopology'");if(!("weightsManifest"in o))throw new Error("Model JSON is missing 'weightsManifest'");let s=to.getWeightSpecs(o.weightsManifest),a=to.getModelArtifactsForJSONSync(o,s,n);t=to.fromMemorySync(a)}else if("load"in r)t=r;else if("modelTopology"in r&&"weightSpecs"in r&&"weightData"in r)t=to.fromMemorySync(r);else throw new Error("Unknown model format");let e=new _c(t);return e.load(),e}function l3(r){return r.endsWith("/")||(r=r+"/"),`${r}${p3}${c3}`}var ZT="3.21.0";function z(r,t){Array.isArray(r)||(r=[r]),r.forEach(e=>{e!=null&&y.assert(e.dtype!=="complex64",()=>`${t} does not support complex64 tensors in the CPU backend.`)})}var u3=ge.whereImpl,Kl=class r extends qr{constructor(){super(),this.blockSize=48,this.firstUse=!0,this.data=new Ko(this,Fr())}nextDataId(){return r.nextDataId++}write(t,e,o){this.firstUse&&(this.firstUse=!1,F().get("IS_NODE")&&v.warn(`
============================
Hi, looks like you are running TensorFlow.js in Node.js. To speed things up dramatically, install our node backend, visit https://github.com/tensorflow/tfjs-node for more details. 
============================`));let n={id:this.nextDataId()};return this.data.set(n,{values:t,dtype:o,refCount:1}),n}makeTensorInfo(t,e,o){let n;if(e==="string"&&o!=null&&o.length>0&&y.isString(o[0])){let s=o.map(a=>y.encodeString(a));n=this.write(s,t,e)}else n=this.write(o,t,e);return{dataId:n,shape:t,dtype:e}}refCount(t){return this.data.has(t)?this.data.get(t).refCount:0}incRef(t){let e=this.data.get(t);e.refCount++}decRef(t){if(this.data.has(t)){let e=this.data.get(t);e.refCount--}}move(t,e,o,n,s){this.data.set(t,{values:e,dtype:n,refCount:s})}numDataIds(){return this.data.numDataIds()}async read(t){return this.readSync(t)}readSync(t){let{dtype:e,complexTensorInfos:o}=this.data.get(t);if(e==="complex64"){let n=this.readSync(o.real.dataId),s=this.readSync(o.imag.dataId);return v.mergeRealAndImagArrays(n,s)}return this.data.get(t).values}bufferSync(t){let e=this.readSync(t.dataId);if(t.dtype==="string")try{let o=e.map(n=>y.decodeString(n));return rt(t.shape,t.dtype,o)}catch{throw new Error("Failed to decode encoded string bytes into utf-8")}return rt(t.shape,t.dtype,e)}makeOutput(t,e,o){return Fr().makeTensorFromTensorInfo(this.makeTensorInfo(e,o,t),this)}disposeData(t,e=!1){if(this.data.has(t)){if(this.data.get(t).refCount--,!e&&this.data.get(t).refCount>0)return!1;let{complexTensorInfos:o}=this.data.get(t);o!=null&&(this.disposeData(o.real.dataId,!0),this.disposeData(o.imag.dataId,!0)),this.data.delete(t)}return!0}disposeIntermediateTensorInfo(t){this.disposeData(t.dataId)}async time(t){let e=y.now();return t(),{kernelMs:y.now()-e}}memory(){return{unreliable:!0,reasons:["The reported memory is an upper bound. Due to automatic garbage collection, the true allocated memory may be less."]}}where(t){z([t],"where");let e=this.readSync(t.dataId);return u3(t.shape,e)}dispose(){}floatPrecision(){return 32}epsilon(){return super.epsilon()}};Kl.nextDataId=0;var ay={};kt(ay,{addImpl:()=>Ox,bincountImpl:()=>Lc,bincountReduceImpl:()=>Rm,castImpl:()=>_x,ceilImpl:()=>Px,concatImpl:()=>Dm,equalImpl:()=>Lx,expImpl:()=>Bx,expm1Impl:()=>Gx,floorImpl:()=>Ux,gatherNdImpl:()=>Fm,gatherV2Impl:()=>_m,greaterEqualImpl:()=>Wx,greaterImpl:()=>zx,lessEqualImpl:()=>qx,lessImpl:()=>Hx,linSpaceImpl:()=>Om,logImpl:()=>Kx,maxImpl:()=>Pm,maximumImpl:()=>jx,minimumImpl:()=>Xx,multiplyImpl:()=>jl,negImpl:()=>Yx,notEqualImpl:()=>Zx,prodImpl:()=>Qx,raggedGatherImpl:()=>Lm,raggedTensorToTensorImpl:()=>Mm,rangeImpl:()=>Bm,rsqrtImpl:()=>ty,scatterImpl:()=>Lo,sigmoidImpl:()=>vw,simpleAbsImpl:()=>Fx,sliceImpl:()=>ry,sparseFillEmptyRowsImpl:()=>Vm,sparseReshapeImpl:()=>Gm,sparseSegmentReductionImpl:()=>Bc,sqrtImpl:()=>Ew,squaredDifferenceImpl:()=>oy,stridedSliceImpl:()=>Um,stringNGramsImpl:()=>zm,stringSplitImpl:()=>Wm,stringToHashBucketFastImpl:()=>Hm,subImpl:()=>sy,tileImpl:()=>qm,topKImpl:()=>Km,transposeImpl:()=>Mc,uniqueImpl:()=>jm});function Fx(r){let t=new Float32Array(r.length);for(let e=0;e<r.length;++e)t[e]=Math.abs(r[e]);return t}var m3=r=>{let{x:t}=r.inputs,e=r.backend;z(t,"abs");let o=new Float32Array(y.sizeFromShape(t.shape)),n=e.data.get(t.dataId).values;return o=Fx(n),e.makeOutput(o,t.shape,t.dtype)},QT={kernelName:"Abs",backendName:"cpu",kernelFunc:m3};function wt(r){return(t,e,o,n,s)=>{let a=v.assertAndGetBroadcastShape(t,e),i=a.length,c=y.computeStrides(a),p=y.sizeFromShape(a),l=y.getTypedArrayFromDType(s,p),u=t.length,m=e.length,f=y.computeStrides(t),d=y.computeStrides(e),h=v.getBroadcastDims(t,a),g=v.getBroadcastDims(e,a);if(h.length+g.length===0)for(let x=0;x<l.length;++x)l[x]=r(o[x%o.length],n[x%n.length]);else for(let x=0;x<l.length;++x){let b=y.indexToLoc(x,i,c),w=b.slice(-u);h.forEach(R=>w[R]=0);let I=y.locToIndex(w,u,f),k=b.slice(-m);g.forEach(R=>k[R]=0);let $=y.locToIndex(k,m,d);l[x]=r(o[I],n[$])}return[l,a]}}function le(r){let{inputs:t,backend:e}=r,{real:o,imag:n}=t,s=e.data.get(o.dataId).values,a=e.data.get(n.dataId).values,i=e.makeTensorInfo(o.shape,"complex64"),c=e.data.get(i.dataId);return c.complexTensorInfos={real:e.makeTensorInfo(o.shape,"float32",s),imag:e.makeTensorInfo(n.shape,"float32",a)},i}var JT={kernelName:Is,backendName:"cpu",kernelFunc:le};function Oc(r,t,e="float32"){if(e==="complex64"){let n=Oc(r,t,"float32"),s=Oc(r,t,"float32");return le({inputs:{real:n,imag:s},backend:r})}let o=y.makeZerosTypedArray(y.sizeFromShape(t),e);return r.makeTensorInfo(t,e,o)}function Se(r){let{inputs:t,backend:e}=r,{x:o}=t;return e.incRef(o.dataId),{dataId:o.dataId,shape:o.shape,dtype:o.dtype}}var tw={kernelName:To,backendName:"cpu",kernelFunc:Se};function yr(r){let{inputs:t,backend:e}=r,{input:o}=t,n=e.data.get(o.dataId).complexTensorInfos.real,s=e.data.get(n.dataId).values;return e.makeTensorInfo(n.shape,n.dtype,s)}var ew={kernelName:Ia,backendName:"cpu",kernelFunc:yr};function _x(r,t,e,o){if(o==="int32"){let n=Int32Array.from(r);return[t,"int32",n]}if(o==="bool"){let n=y.toTypedArray([0],e),[s,a]=wt((i,c)=>i!==c?1:0)(t,[],r,n,"bool");return[a,"bool",s]}throw new Error(`Error in Cast: failed to cast ${e} to ${o}`)}function br(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{dtype:s}=o;if(s==="complex64"){if(n.dtype==="complex64")return Se({inputs:{x:n},backend:e});let l=Oc(e,n.shape,n.dtype),u=br({inputs:{x:n},backend:e,attrs:{dtype:"float32"}}),m=le({inputs:{real:u,imag:l},backend:e});return e.disposeIntermediateTensorInfo(l),e.disposeIntermediateTensorInfo(u),m}if(n.dtype==="complex64"){let l=yr({inputs:{input:n},backend:e}),u=br({inputs:{x:l},backend:e,attrs:{dtype:s}});return e.disposeIntermediateTensorInfo(l),u}if(!y.hasEncodingLoss(n.dtype,s)){let l=Se({inputs:{x:n},backend:e});return{dataId:l.dataId,shape:l.shape,dtype:s}}let a=e.data.get(n.dataId).values,[i,c,p]=_x(a,n.shape,n.dtype,s);return e.makeTensorInfo(i,c,p)}var rw={kernelName:Co,backendName:"cpu",kernelFunc:br};function $t(r,t,e,o){return e==null?({inputs:n,backend:s})=>{let{a,b:i}=n,c=s;z([a,i],r);let p=c.data.get(a.dataId).values,l=c.data.get(i.dataId).values,u=a.dtype==="string"?v.fromUint8ToStringArray(p):p,m=a.dtype==="string"?v.fromUint8ToStringArray(l):l,f=o||a.dtype,[d,h]=t(a.shape,i.shape,u,m,f);return c.makeTensorInfo(h,f,d)}:({inputs:n,backend:s})=>{let{a,b:i}=n,c=s;if(a.dtype==="complex64"||i.dtype==="complex64"){let p=br({inputs:{x:a},backend:c,attrs:{dtype:"complex64"}}),l=c.data.get(p.dataId),u=l.complexTensorInfos.real,m=l.complexTensorInfos.imag,f=c.data.get(u.dataId).values,d=c.data.get(m.dataId).values,h=br({inputs:{x:i},backend:c,attrs:{dtype:"complex64"}}),g=c.data.get(h.dataId),x=g.complexTensorInfos.real,b=g.complexTensorInfos.imag,w=c.data.get(x.dataId).values,I=c.data.get(b.dataId).values,[k,$,R]=e(a.shape,i.shape,f,d,w,I),D=c.makeTensorInfo(R,"float32",k),_=c.makeTensorInfo(R,"float32",$),O=le({inputs:{real:D,imag:_},backend:c});return c.disposeIntermediateTensorInfo(p),c.disposeIntermediateTensorInfo(h),c.disposeIntermediateTensorInfo(D),c.disposeIntermediateTensorInfo(_),O}else{let p=c.data.get(a.dataId).values,l=c.data.get(i.dataId).values,u=o||a.dtype,[m,f]=t(a.shape,i.shape,p,l,u);return c.makeTensorInfo(f,u,m)}}}function Pc(r){return(t,e,o,n,s,a)=>{let i=v.assertAndGetBroadcastShape(t,e),c=y.sizeFromShape(i),p=i.length,l=y.computeStrides(i),u=y.getTypedArrayFromDType("float32",c),m=y.getTypedArrayFromDType("float32",c),f=v.getBroadcastDims(t,i),d=v.getBroadcastDims(e,i),h=v.mergeRealAndImagArrays(o,n),g=v.mergeRealAndImagArrays(s,a),x=t.length,b=y.computeStrides(t),w=e.length,I=y.computeStrides(e);if(f.length+d.length===0)for(let k=0;k<u.length;k++){let $=k%h.length,R=k%g.length,D=r(h[$*2],h[$*2+1],g[R*2],g[R*2+1]);u[k]=D.real,m[k]=D.imag}else for(let k=0;k<u.length;k++){let $=y.indexToLoc(k,p,l),R=$.slice(-x);f.forEach(M=>R[M]=0);let D=y.locToIndex(R,x,b),_=$.slice(-w);d.forEach(M=>_[M]=0);let O=y.locToIndex(_,w,I),L=r(h[D*2],h[D*2+1],g[O*2],g[O*2+1]);u[k]=L.real,m[k]=L.imag}return[u,m,i]}}var Ox=wt(((r,t)=>r+t)),f3=Pc(((r,t,e,o)=>({real:r+e,imag:t+o}))),lo=$t("Add",Ox,f3),ow={kernelName:"Add",backendName:"cpu",kernelFunc:lo};function Lc(r,t,e,o,n){let s=y.sizeFromShape(o),a=y.makeZerosTypedArray(n,e);for(let i=0;i<r.length;i++){let c=r[i];if(c<0)throw new Error("Input x must be non-negative!");c>=n||(s>0?a[c]+=t[i]:a[c]+=1)}return a}function Rm(r,t,e,o=!1){let n=r.shape[0],s=r.shape[1],a=rt([n,e],t.dtype);for(let i=0;i<n;i++)for(let c=0;c<s;c++){let p=r.get(i,c);if(p<0)throw new Error("Input x must be non-negative!");p>=e||(o?a.set(1,i,p):t.size>0?a.set(a.get(i,p)+t.get(i,c),i,p):a.set(a.get(i,p)+1,i,p))}return a}function Pe(r){return(t,e,o)=>{let n=y.getTypedArrayFromDType(e,t.length);for(let s=0;s<t.length;++s)n[s]=r(t[s],o);return n}}function ut(r,t,e){return({inputs:o,attrs:n,backend:s})=>{let{x:a}=o;if(z(a,r),a.dtype==="string"||e==="string")throw new Error("unaryKernelFunc does not support string input/output");let i=s,c=i.data.get(a.dataId).values,p=y.sizeFromShape(a.shape),l=e||a.dtype,u=y.getArrayFromDType(l,p);for(let m=0;m<p;++m)u[m]=t(c[m],n);return i.makeTensorInfo(a.shape,l,u)}}function Cr(r,t,e){return({inputs:o,attrs:n,backend:s})=>{let{x:a}=o;if(z(a,r),a.dtype==="string"||e==="string")throw new Error("unaryKernelFunc does not support string input/output");let i=s,c=i.data.get(a.dataId).values,p=e||a.dtype,l=t(c,p,n);return i.makeTensorInfo(a.shape,p,l)}}var Px=Pe(r=>Math.ceil(r)),d3=Cr(rn,Px),nw={kernelName:rn,backendName:"cpu",kernelFunc:d3};function Dm(r,t,e,o){let n=y.getArrayFromDType(e,y.sizeFromShape(t));if(o&&e!=="string"){let s=0;r.forEach(a=>{let i=y.sizeFromShape(a.shape);n.set(a.vals,s),s+=i})}else{let s=0;r.forEach(a=>{let i=e==="string"?v.fromUint8ToStringArray(a.vals):a.vals,c=0;for(let p=0;p<a.shape[0];++p){let l=p*t[1]+s;for(let u=0;u<a.shape[1];++u)n[l+u]=i[c++]}s+=a.shape[1]})}return n}var Lx=wt((r,t)=>r===t?1:0),Mx=$t(an,Lx,null,"bool"),sw={kernelName:an,backendName:"cpu",kernelFunc:Mx};var Bx=Pe(r=>Math.exp(r)),Vx=Cr("Exp",Bx,"float32"),aw={kernelName:"Exp",backendName:"cpu",kernelFunc:Vx};var Gx=Pe(r=>Math.expm1(r)),h3=Cr(cn,Gx),iw={kernelName:cn,backendName:"cpu",kernelFunc:h3};var Ux=Pe(r=>Math.floor(r)),g3=Cr(pn,Ux),cw={kernelName:pn,backendName:"cpu",kernelFunc:g3};function Fm(r,t,e,o,n,s,a,i,c){let p=rt([o,s],e);for(let l=0;l<o;l++){let u=[],m=0;for(let f=0;f<n;f++){let d=r[l*n+f];m+=d*a[f],u.push(d)}if(m<0||m>=c/s)throw new Error(`Invalid indices: ${u} does not index into ${i}`);for(let f=0;f<s;f++)p.values[l*s+f]=t.get(...t.indexToLoc(m*s+f))}return p}function _m(r,t,e){let o=rt(e,r.dtype);for(let n=0;n<o.size;++n){let a=o.indexToLoc(n).slice(),i=a[0],c=a[2],p=t.locToIndex([i,c]);a[2]=t.values[p];let l=r.locToIndex(a);0<=l&&l<r.values.length&&(o.values[n]=r.values[l])}return o}var zx=wt((r,t)=>r>t?1:0),x3=$t(un,zx,null,"bool"),pw={kernelName:un,backendName:"cpu",kernelFunc:x3};var Wx=wt((r,t)=>r>=t?1:0),y3=$t(mn,Wx,null,"bool"),lw={kernelName:mn,backendName:"cpu",kernelFunc:y3};var Hx=wt((r,t)=>r<t?1:0),b3=$t(gn,Hx,null,"bool"),uw={kernelName:gn,backendName:"cpu",kernelFunc:b3};var qx=wt((r,t)=>r<=t?1:0),C3=$t(xn,qx,null,"bool"),mw={kernelName:xn,backendName:"cpu",kernelFunc:C3};function Om(r,t,e){let o=(t-r)/(e-1),n=y.makeZerosTypedArray(e,"float32");n[0]=r;for(let s=1;s<n.length;s++)n[s]=n[s-1]+o;return n}var Kx=Pe(r=>Math.log(r)),T3=Cr("Log",Kx),fw={kernelName:"Log",backendName:"cpu",kernelFunc:T3};function Pm(r,t,e,o){let n=y.getTypedArrayFromDType(o,y.sizeFromShape(e));for(let s=0;s<n.length;++s){let a=s*t,i=r[a];for(let c=0;c<t;++c){let p=r[a+c];(Number.isNaN(p)||p>i)&&(i=p)}n[s]=i}return n}var jx=wt(((r,t)=>Math.max(r,t))),w3=$t(wn,jx),dw={kernelName:wn,backendName:"cpu",kernelFunc:w3};var Xx=wt(((r,t)=>Math.min(r,t))),I3=$t(In,Xx),hw={kernelName:In,backendName:"cpu",kernelFunc:I3};var jl=wt(((r,t)=>r*t)),S3=Pc(((r,t,e,o)=>({real:r*e-t*o,imag:r*o+t*e}))),Gi=$t(Sn,jl,S3),gw={kernelName:Sn,backendName:"cpu",kernelFunc:Gi};function Yx(r,t,e){let o=y.createScalarValue(-1,e);return jl([],t,o,r,e)}function v3(r){let{inputs:t,backend:e}=r,{x:o}=t;z(o,"neg");let n=e.data.get(o.dataId).values,[s,a]=Yx(n,o.shape,o.dtype);return e.makeTensorInfo(a,o.dtype,s)}var xw={kernelName:"Neg",backendName:"cpu",kernelFunc:v3};var Zx=wt(((r,t)=>r!==t?1:0)),N3=$t(vn,Zx,null,"bool"),yw={kernelName:vn,backendName:"cpu",kernelFunc:N3};function Mc(r,t,e,o,n){let s=t.length,a=y.sizeFromShape(t),i=y.computeStrides(t),c=y.computeStrides(n),p=y.getTypedArrayFromDType(e,y.sizeFromShape(n));for(let l=0;l<a;++l){let u=y.indexToLoc(l,s,i),m=new Array(u.length);for(let d=0;d<m.length;d++)m[d]=u[o[d]];let f=y.locToIndex(m,s,c);p[f]=r[l]}return p}function Ut(r){let{inputs:t,attrs:e,backend:o}=r,{x:n}=t,{perm:s}=e;z(n,"transpose");let a=n.shape.length,i=new Array(a);for(let u=0;u<i.length;u++)i[u]=n.shape[s[u]];let c=o.data.get(n.dataId).values,p=Mc(c,n.shape,n.dtype,s,i);return{dataId:o.write(p,i,n.dtype),shape:i,dtype:n.dtype}}var bw={kernelName:Io,backendName:"cpu",kernelFunc:Ut};function Qx(r,t,e,o){let[n,s]=v.computeOutAndReduceShapes(r,o),a=Qt(t,"int32"),i=y.makeZerosTypedArray(y.sizeFromShape(n),a),c=y.sizeFromShape(s);for(let p=0;p<i.length;++p){let l=p*c,u=1;for(let m=0;m<c;++m)u*=e[l+m];i[p]=u}return{outVals:i,outShape:n,outDtype:a}}function k3(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{axis:s,keepDims:a}=o;z(n,"prod");let i=n.shape.length,c=y.parseAxisParam(s,n.shape),p=v.getAxesPermutation(c,i),l=c,u=n,m=[];p!=null&&(u=Ut({inputs:{x:n},backend:e,attrs:{perm:p}}),m.push(u),l=v.getInnerMostAxes(l.length,i));let f=e.data.get(u.dataId).values,{outVals:d,outShape:h,outDtype:g}=Qx(u.shape,u.dtype,f,l),x=h;return a&&(x=v.expandShapeToKeepDim(h,c)),m.forEach(b=>e.disposeIntermediateTensorInfo(b)),e.makeTensorInfo(x,g,d)}var Cw={kernelName:ba,backendName:"cpu",kernelFunc:k3};function E3(r,t,e){r.forEach((o,n)=>{if(o<0||o>=e){let s=y.indexToLoc(n,t.length,y.computeStrides(t)).join(",");throw new Error(`indices[${s}] = ${o} is not in [0, ${e})`)}})}function $3(r,t){for(let e=0;e<r.length;++e){let o=r[e],n=e===r.length-1?t:r[e+1].length;if(o.length===0)throw new Error("Ragged splits may not be empty");if(o[0]<0)throw new Error("Ragged splits must be non-negative");if(o[o.length-1]>n)throw new Error("Ragged splits must not point past values");for(let s=1;s<o.length;++s)if(o[s-1]>o[s])throw new Error("Ragged splits must be sorted in ascending order")}}function A3(r,t,e,o){let n=[],s=0,a=t.length-1+e.length,i=new Array(a).fill(null).map(()=>[0]);$3(e,o);let c=1;for(let p=0;p<t.length-1;++p){c*=t[p];let l=t[p+1];for(let u=1;u<c+1;++u)i[p].push(u*l)}for(let p=0;p<r.length;++p){let l=r[p],u=r[p]+1;for(let m=0;m<e.length;++m){let f=e[m],d=m+t.length-1;if(d>=0){let h=i[d],g=h[h.length-1]-f[l];for(let x=l;x<u;++x)i[d].push(f[x+1]+g)}l=f[l],u=f[u]}u!==l&&(n.push([l,u]),s+=u-l)}return{outSplits:i,valueSlices:n,numValues:s}}function R3(r){let t=[];for(let e=0;e<r.length;++e){let o=r[e].length,n=y.getArrayFromDType("int32",o);t.push(n),r[e].forEach((s,a)=>n[a]=s)}return t}function Tw(r,t){let e=r.slice(0,t);for(;e.length<t;)e.push(1);for(let o=t;o<r.length;o++)e[t-1]*=r[o];return e}function D3(r,t,e,o,n,s){let a=Tw(t,2)[1],i=Tw(s,2)[1],c=0;for(let p of e)for(let l=p[0];l<p[1];++l){for(let u=0;u<o;++u)n[c*i+u]=r[l*a+u];++c}}function F3(r,t,e,o,n){let s=t.slice();s[0]=n;let a=y.getArrayFromDType(e,y.sizeFromShape(s)),i=r.length,c=i===0?0:i/t[0];return D3(r,t,o,c,a,s),[a,s]}function Lm(r,t,e,o,n,s,a,i){if(r.length===0)throw new Error("paramsNestedSplits must be non empty");if(t[0].length===0)throw new Error("Split tensors must not be scalars");let c=t[0][0]-1;if(E3(s,a,c),o.length===0)throw new Error("params.rank must be nonzero");let p=o[0],{outSplits:l,valueSlices:u,numValues:m}=A3(s,a,r,p),f=R3(l),d=F3(e,o,n,u,m);return[f,d[0],d[1]]}var Tr=v.RowPartitionType,Jx=class r{constructor(t,e,o,n,s,a,i,c,p,l){this.shape=t,this.shapeShape=e,this.values=o,this.valuesShape=n,this.valuesDType=s,this.defaultValue=a,this.defaultValueShape=i,this.rowPartitionValues=c,this.rowPartitionValuesShapes=p,this.rowPartitionTypes=v.getRowPartitionTypesHelper(l),this.raggedRank=v.getRaggedRank(this.rowPartitionTypes)}getRowPartitionTypeByDimension(t){return this.rowPartitionTypes[0]===Tr.FIRST_DIM_SIZE?this.rowPartitionTypes[t+1]:this.rowPartitionTypes[t]}getRowPartitionTensor(t){return this.rowPartitionTypes[0]===Tr.FIRST_DIM_SIZE?this.rowPartitionValues[t+1]:this.rowPartitionValues[t]}getMaxWidth(t){let e=this.getRowPartitionTensor(t-1);switch(this.getRowPartitionTypeByDimension(t-1)){case Tr.VALUE_ROWIDS:return r.getMaxWidthValueRowID(e);case Tr.ROW_SPLITS:return r.getMaxWidthRowSplit(e);default:throw new Error(`Cannot handle partition type ${Tr[this.getRowPartitionTypeByDimension(t-1)]}`)}}static getMaxWidthRowSplit(t){let e=t.length;if(e===0||e===1)return 0;let o=0;for(let n=0;n<e-1;++n){let s=t[n+1]-t[n];s>o&&(o=s)}return o}static getMaxWidthValueRowID(t){let e=t.length;if(e===0)return 0;let o=0,n=t[0],s=0;for(let a=1;a<e;++a){let i=t[a];i!==n&&(n=i,s=Math.max(a-o,s),o=a)}return Math.max(e-o,s)}tensorShapeFromTensor(t,e,o=!0){if(e.length===0){if(t[0]===-1)return[];throw new Error("The only valid scalar shape tensor is the fully unknown shape specified as -1.")}return Iw(t,o)}calculateOutputSize(t){let e=this.valuesShape,o=this.defaultValueShape;v.validateDefaultValueShape(o,e);let n=this.tensorShapeFromTensor(this.shape,this.shapeShape),a=v.combineRaggedTensorToTensorShapes(this.raggedRank,n,e);a[0]<0&&(a[0]=t);for(let i=1;i<=this.raggedRank;++i)a[i]<0&&(a[i]=this.getMaxWidth(i));return a}calculateFirstParentOutputIndex(t,e,o){let n=Math.min(t,o),s=[],a=0;for(let i=0;i<n;++i,a+=e)s.push(a);for(let i=n;i<t;++i)s.push(-1);return y.assert(s.length===t,()=>"Final length of result must be equal to firstDimension."),s}calculateOutputIndexRowSplit(t,e,o,n){let s=t.length,a=[];for(let i=0;i<s-1;++i){let c=t[i+1]-t[i],p=Math.min(n,c),l=e[i];l===-1&&(p=0);for(let u=0;u<p;++u)a.push(l),l+=o;for(let u=0;u<c-p;++u)a.push(-1)}if(s>0&&a.length!==t[s-1])throw new Error("Invalid row split size.");return a}calculateOutputIndexValueRowID(t,e,o,n){let s=t.length,a=[];if(s===0)return[];let i=0,c=t[0];if(c>=e.length)throw new Error(`Got currentValueRowId=${c}, which is not less than ${e.length}`);let p=e[c];a.push(p);for(let l=1;l<s;++l){let u=t[l];if(u===c)p>=0&&(++i,i<n?p+=o:p=-1);else{if(i=0,c=u,u>=e.length)throw new Error(`Got nextValueRowId=${u} which is not less than ${e.length}`);p=e[u]}a.push(p)}if(a.length!==t.length)throw new Error("Invalid row ids.");return a}calculateOutputIndex(t,e,o,n){let s=this.getRowPartitionTensor(t),a=this.getRowPartitionTypeByDimension(t);switch(a){case Tr.VALUE_ROWIDS:return this.calculateOutputIndexValueRowID(s,e,o,n);case Tr.ROW_SPLITS:if(s.length-1>e.length)throw new Error(`Row partition size is greater than output size: ${s.length-1} > ${e.length}`);return this.calculateOutputIndexRowSplit(s,e,o,n);default:throw new Error(`Unsupported partition type: ${Tr[a]}`)}}getFirstDimensionSize(){let t=this.rowPartitionValues[0];if(this.rowPartitionTypes.length===0)throw new Error("No row_partition_types given.");let e=this.rowPartitionTypes[0];switch(e){case Tr.FIRST_DIM_SIZE:return t[0];case Tr.VALUE_ROWIDS:throw new Error("Cannot handle VALUE_ROWIDS in first dimension.");case Tr.ROW_SPLITS:return this.rowPartitionValuesShapes[0][0]-1;default:throw new Error(`Cannot handle type ${Tr[e]}`)}}compute(){if(this.rowPartitionValues[0].length<=0)throw new Error("Invalid first partition input. Tensor requires at least one element.");let e=this.getFirstDimensionSize(),o=this.calculateOutputSize(e),n=new Array(this.raggedRank+1);n[n.length-1]=1;for(let c=n.length-2;c>=0;--c)n[c]=n[c+1]*o[c+1];let s=Iw(o,!1),a=y.getArrayFromDType(this.valuesDType,y.sizeFromShape(s));if(n[0]*o[0]>0){let c=this.calculateFirstParentOutputIndex(e,n[0],o[0]);for(let p=1;p<=this.raggedRank;++p)c=this.calculateOutputIndex(p-1,c,n[p],o[p]);this.setOutput(this.raggedRank,c,a,s)}return[s,a]}setOutput(t,e,o,n){if(o.length===0)return;let s=this.values,a=o,i=n.slice();i=i.slice(t+1);let c=y.sizeFromShape(i),p=e.length,l=this.defaultValue;if(l.length!==c&&l.length!==1){let d=this.defaultValueShape;ht(()=>{let h=P(l,d);l=Pr(h,i).dataSync()})}let u=0,m=0,f=0;for(let d=0;d<=p;++d){let h=d<p?e[d]:-1;if(h===f){++f;continue}if(m<f){let g=s.subarray(u*c),x=a.subarray(m*c),b=(f-m)*c;ww(x,g,b)}if(d>=p){let g=o.length;h=Math.floor(g/c)}if(h>f)if(this.defaultValue.length===1)a.subarray(f*c,h*c).fill(this.defaultValue[0]),f=h;else for(;h>f;){let g=a.slice(f*c);ww(g,l,c),++f}h<0?(u=d+1,m=f):(u=d,m=f,f=m+1)}}};function ww(r,t,e){for(let o=0;o<e;o++)r[o]=t[o]}function Iw(r,t){let e=[];for(let o of r){if(o<0){if(!t)throw new Error(`Dimension ${o} must be >= 0`);if(o<-1)throw new Error(`Dimension ${o} must be >= -1`);o=-1}e.push(o)}return e}function Mm(r,t,e,o,n,s,a,i,c,p){return new Jx(r,t,e,o,n,s,a,i,c,p).compute()}function Bm(r,t,e,o){let n=r===t,s=r<t&&e<0,a=t<r&&e>1;if(n||s||a)return y.makeZerosTypedArray(0,o);let i=Math.abs(Math.ceil((t-r)/e)),c=y.makeZerosTypedArray(i,o);t<r&&e===1&&(e=-1),c[0]=r;for(let p=1;p<c.length;p++)c[p]=c[p-1]+e;return c}var ty=Pe(r=>1/Math.sqrt(r)),_3=Cr(An,ty),Sw={kernelName:An,backendName:"cpu",kernelFunc:_3};function Lo(r,t,e,o,n,s,a,i,c,p){let l=[o/n,n],u=r.values,m=t.values;if(o===0)return rt(e,t.dtype);let f=rt(l,t.dtype);typeof c=="string"||typeof c=="number"?f.values.fill(c):typeof c=="boolean"&&f.values.fill(+c);for(let d=0;d<s;d++){let h=[],g=0;for(let x=0;x<a;x++){let b=u[d*a+x];h.push(b),g+=b*i[x]}if(g<0||g>=o/n)throw new Error(`Invalid indices: ${h} does not index into ${e}`);for(let x=0;x<n;x++)p?f.values[g*n+x]+=m[d*n+x]:f.values[g*n+x]=t.rank===0?m[0]:m[d*n+x]}return f}var vw=Pe(r=>1/(1+Math.exp(-r))),ey=ut(_n,r=>1/(1+Math.exp(-r))),Nw={kernelName:_n,backendName:"cpu",kernelFunc:ey};function ry(r,t,e,o,n){let s=ce.isSliceContinous(o,t,e),a=y.sizeFromShape(e),i=y.computeStrides(o);if(s){let u=ce.computeFlatOffset(t,i);return n==="string"?r.slice(u,u+a):r.subarray(u,u+a)}let c=n==="string"?v.fromUint8ToStringArray(r):r,p=rt(o,n,c),l=rt(e,n);for(let u=0;u<l.size;++u){let m=l.indexToLoc(u),f=m.map((d,h)=>d+t[h]);l.set(p.get(...f),...m)}return n==="string"?v.fromStringArrayToUint8(l.values):l.values}function wr(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{begin:s,size:a}=o;z(n,"slice");let[i,c]=ce.parseSliceParams(n,s,a);ce.assertParamsValid(n,i,c);let p=e.data.get(n.dataId).values,l=ry(p,i,c,n.shape,n.dtype);return e.makeTensorInfo(c,n.dtype,l)}var kw={kernelName:Ra,backendName:"cpu",kernelFunc:wr};function Vm(r,t,e,o,n,s,a){let i=t[0],c=s[0],p=new Array(c),l=new Array(i),u=t[1];if(c===0){if(i!==0)throw new Error(v.getSparseFillEmptyRowsIndicesDenseShapeMismatch(i));let g=y.getArrayFromDType(e,0),x=y.getArrayFromDType(n,0);return[g,[0,u],x,p,l]}let m=!0,f=0,d=new Array(c).fill(0);for(let g=0;g<i;++g){let x=r[g*u];if(x<0)throw new Error(v.getSparseFillEmptyRowsNegativeIndexErrorMessage(g,x));if(x>=c)throw new Error(v.getSparseFillEmptyRowsOutOfRangeIndexErrorMessage(g,x,c));++d[x],m=m&&x>=f,f=x}let h=!0;for(let g=0;g<c;++g){let x=d[g]===0;p[g]=x,h=h&&!x,d[g]=Math.max(d[g],1),g>0&&(d[g]+=d[g-1])}if(h&&m){let g=r,x=o;for(let b=0;b<i;++b)l[b]=b;return[g,[i,u],x,p,l]}else{let g=d[c-1],x=y.getArrayFromDType(e,g*u),b=y.getArrayFromDType(n,g),w=new Array(c).fill(0);for(let I=0;I<i;++I){let k=r[I*u],$=w[k],R=(k===0?0:d[k-1])+$;w[k]++;for(let D=0;D<u;++D)x[R*u+D]=r[I*u+D];b[R]=o[I],l[I]=R}for(let I=0;I<c;++I)if(w[I]===0){let $=I===0?0:d[I-1];x[$*u+0]=I;for(let R=1;R<u;++R)x[$*u+R]=0;b[$]=a}return[x,[g,u],b,p,l]}}function Gm(r,t,e,o,n){let s=y.sizeFromShape(o),a=t[0],i=n.length,c=[],p=1,l=-1;for(let g=0;g<i;++g){let x=n[g];if(x===-1){if(l!==-1)throw new Error(v.getSparseReshapeMultipleNegativeOneOutputDimErrorMessage(l,g));l=g,c.push(1)}else{if(x<0)throw new Error(v.getSparseReshapeNegativeOutputDimErrorMessage(g,x));p*=x,c.push(x)}}if(l!==-1){if(p<=0)throw new Error(v.getSparseReshapeEmptyTensorZeroOutputDimErrorMessage());let g=Math.trunc(s/p);if(p*g!==s)throw new Error(v.getSparseReshapeInputOutputMultipleErrorMessage(o,c));c[l]=g}if(y.sizeFromShape(c)!==s)throw new Error(v.getSparseReshapeInputOutputMismatchErrorMessage(o,c));let m=o.length,f=[];if(m>0){f[m-1]=1;for(let g=m-2;g>=0;--g)f[g]=f[g+1]*o[g+1]}let d=[];if(i>0){d[i-1]=1;for(let g=i-2;g>=0;--g)d[g]=d[g+1]*c[g+1]}let h=y.getArrayFromDType(e,a*i);for(let g=0;g<a;++g){let x=0;for(let b=0;b<m;++b)x+=r[g*m+b]*f[b];for(let b=0;b<i;++b)h[g*i+b]=Math.trunc(x/d[b]),x%=d[b]}return[h,[a,i],c]}function Bc(r,t,e,o,n,s=!1,a=0){let i=o.length,c=[t[0],r.length/t[0]],p=c[1],u=i>0?n[i-1]+1:0;if(u<0)throw new Error(v.getSparseSegmentReductionNegativeSegmentIdsErrorMessage());let m=t.slice();m[0]=u;let f=m.reduce((w,I)=>w*I,1),d=y.getArrayFromDType(e,f);if(i===0)return u>0&&d.fill(a),[d,m];if(u<=0)throw new Error(v.getSparseSegmentReductionNegativeSegmentIdsErrorMessage());let h=0,g=1,x=0,b=n[h];for(;;){let w=0;if(g<i){if(w=n[g],b===w){++g;continue}if(b>=w)throw new Error(v.getSparseSegmentReductionNonIncreasingSegmentIdsErrorMessage())}if(b<0||b>=u)throw new Error(v.getSparseSegmentReductionSegmentIdOutOfRangeErrorMessage(b,u));b>x&&d.fill(a,x*p,b*p);for(let I=h;I<g;++I){let k=o[I];if(k<0||k>=c[0])throw new Error(v.getSparseSegmentReductionIndicesOutOfRangeErrorMessage(I,o[I],c[0]));for(let $=0;$<p;$++)d[b*p+$]+=r[k*p+$]}if(s)for(let I=0;I<p;I++)d[b*p+I]/=g-h;if(h=g,++g,x=b+1,b=w,g>i)break}return x<u&&d.fill(a,x*p,u*p),[d,m]}var Ew=Pe(r=>Math.sqrt(r)),O3=ut(Pn,r=>Math.sqrt(r)),$w={kernelName:Pn,backendName:"cpu",kernelFunc:O3};var oy=wt(((r,t)=>{let e=r-t;return e*e})),P3=$t(Ln,oy),Aw={kernelName:Ln,backendName:"cpu",kernelFunc:P3};function Um(r,t,e,o){let n=rt(r,t.dtype);for(let s=0;s<n.size;s++){let a=n.indexToLoc(s),i=new Array(a.length);for(let c=0;c<i.length;c++)i[c]=a[c]*e[c]+o[c];n.set(t.get(...i),...a)}return n}var ny=class{constructor(t,e,o,n,s,a){this.separator=y.encodeString(t),this.nGramWidths=e,this.leftPad=y.encodeString(o),this.rightPad=y.encodeString(n),this.padWidth=s,this.preserveShort=a}getPadWidth(t){return Math.min(this.padWidth<0?t-1:this.padWidth,t-1)}getNumNGrams(t,e){let o=this.getPadWidth(e);return Math.max(0,t+2*o-e+1)}createNGrams(t,e,o,n,s,a){for(let i=0;i<s;++i){let c=this.getPadWidth(a),p=Math.max(0,c-i),l=Math.max(0,c-(s-(i+1))),u=a-(p+l),m=e+(p>0?0:i-c),f=0;f+=p*this.leftPad.length;for(let b=0;b<u;++b)f+=t[m+b].length;f+=l*this.rightPad.length;let d=p+l+u-1;f+=d*this.separator.length,o[n+i]=new Uint8Array(f);let h=o[n+i],g=0,x=b=>b.forEach(w=>h[g++]=w);for(let b=0;b<p;++b)x(this.leftPad),x(this.separator);for(let b=0;b<u-1;++b)x(t[m+b]),x(this.separator);if(u>0){x(t[m+u-1]);for(let b=0;b<l;++b)x(this.separator),x(this.rightPad)}else{for(let b=0;b<l-1;++b)x(this.rightPad),x(this.separator);x(this.rightPad)}}}compute(t,e){let o=t.length,n=e.length;if(n>0){let c=e[0];if(c!==0)throw new Error(`First split value must be 0, got ${c}`);for(let p=1;p<n;++p){let l=e[p]>=c;if(l=l&&e[p]<=o,!l)throw new Error(`Invalid split value ${e[p]}, must be in [${c}, ${o}]`);c=e[p]}if(c!==o)throw new Error(`Last split value must be data size. Expected ${o}, got ${c}`)}let s=n-1,a=y.getArrayFromDType("int32",n);if(o===0||n===0){let c=new Array(o);for(let p=0;p<=s;++p)a[p]=0;return[c,a]}a[0]=0;for(let c=1;c<=s;++c){let p=e[c]-e[c-1],l=0;this.nGramWidths.forEach(u=>{l+=this.getNumNGrams(p,u)}),this.preserveShort&&p>0&&l===0&&(l=1),a[c]=a[c-1]+l}let i=new Array(a[s]);for(let c=0;c<s;++c){let p=e[c],l=a[c];if(this.nGramWidths.forEach(u=>{let m=e[c+1]-e[c],f=this.getNumNGrams(m,u);this.createNGrams(t,p,i,l,f,u),l+=f}),this.preserveShort&&l===a[c]){let u=e[c+1]-e[c];if(u===0)continue;let m=u+2*this.padWidth;this.createNGrams(t,p,i,l,1,m)}}return[i,a]}};function zm(r,t,e,o,n,s,a,i){return new ny(e,o,n,s,a,i).compute(r,t)}function L3(r,t,e,o){if(!r.length)return;if(t.length===0){for(let s=0;s<r.length;++s)o.push(r.subarray(s,s+1));return}if(t.length===1){let s=t[0],a=r.indexOf(s);for(;a!==-1;){let i=r.subarray(0,a);(!e||i.length!==0)&&o.push(i),r=r.subarray(a+1),a=r.indexOf(s)}(!e||r.length!==0)&&o.push(r);return}let n=0;for(let s=0;s<r.length+1;s++)if(s===r.length||t.indexOf(r[s])!==-1){let a=r.subarray(n,s);(!e||a.length!==0)&&o.push(a),n=s+1}}function Wm(r,t,e){let o=r.length,n=[],s=0,a=0,i=new Array(o);for(let m=0;m<o;++m){let f=n.length;L3(r[m],t,e,n);let d=n.length-f;i[m]=d,s+=d,a=Math.max(a,d)}let c=y.getArrayFromDType("int32",s*2),p=new Array(s),l=[o,a],u=0;for(let m=0;m<o;++m)for(let f=0;f<i[m];++f)c[u*2]=m,c[u*2+1]=f,p[u]=n[u],++u;return[c,p,l]}function Hm(r,t){let e=y.getArrayFromDType("int32",r.length);for(let o=0;o<r.length;++o)e[o]=y.fingerPrint64(r[o]).modulo(t).getLowBitsUnsigned();return e}var sy=wt(((r,t)=>r-t)),M3=Pc(((r,t,e,o)=>({real:r-e,imag:t-o}))),Xl=$t("Sub",sy,M3),Rw={kernelName:"Sub",backendName:"cpu",kernelFunc:Xl};function qm(r,t){let e=new Array(r.rank);for(let n=0;n<e.length;n++)e[n]=r.shape[n]*t[n];let o=rt(e,r.dtype);for(let n=0;n<o.values.length;++n){let s=o.indexToLoc(n),a=new Array(r.rank);for(let c=0;c<a.length;c++)a[c]=s[c]%r.shape[c];let i=r.locToIndex(a);o.values[n]=r.values[i]}return o}var Yl=(r,t)=>{let e=t.value-r.value;return e===0?r.index-t.index:e};function Dw(r,t,e=0,o=r.length-1){for(;o>e;){if(o-e>600){let i=o-e+1,c=t-e+1,p=Math.log(i),l=.5*Math.exp(2*p/3),u=.5*Math.sqrt(p*l*(i-l)/i)*Math.sign(c-i/2),m=Math.max(e,Math.floor(t-c*l/i+u)),f=Math.min(o,Math.floor(t+(i-c)*l/i+u));Dw(r,t,m,f)}let n=r[t],s=e,a=o;for(y.swap(r,e,t),Yl(r[o],n)>0&&y.swap(r,e,o);s<a;){for(y.swap(r,s,a),s++,a--;Yl(r[s],n)<0;)s=s+1;for(;Yl(r[a],n)>0;)a=a-1}Yl(r[e],n)===0?y.swap(r,e,a):(a=a+1,y.swap(r,a,o)),a<=t&&(e=a+1),t<=a&&(o=a-1)}}function Km(r,t,e,o,n){let s=t[t.length-1],[a,i]=[r.length/s,s],c=y.getTypedArrayFromDType(e,a*o),p=y.getTypedArrayFromDType("int32",a*o);for(let u=0;u<a;u++){let m=u*i,f=r.subarray(m,m+i),d=new Array(f.length);f.forEach((b,w)=>d[w]={value:b,index:w}),o<d.length&&(Dw(d,o),d=d.slice(0,o)),n&&d.sort(Yl);let h=u*o,g=c.subarray(h,h+o),x=p.subarray(h,h+o);for(let b=0;b<o;b++)g[b]=d[b].value,x[b]=d[b].index}let l=t.slice();return l[l.length-1]=o,[rt(l,e,c),rt(l,"int32",p)]}function jm(r,t,e,o){let n=y.parseAxisParam(t,e)[0],s=[1,e[0],1];for(let d=0;d<n;d++)s[0]*=e[d];s[1]=e[n];for(let d=n+1;d<e.length;d++)s[2]*=e[d];let a={},i=new Int32Array(e[n]),c=new Rt(s,o,r),p=[],l=s[0]===1&&s[2]===1;for(let d=0;d<e[n];d++){let h;if(l)h=r[d].toString();else{let g=[];for(let x=0;x<s[0];x++)for(let b=0;b<s[2];b++)g.push(c.get(x,d,b));h=g.join(",")}if(a[h]!==void 0)i[d]=a[h];else{let g=Object.keys(a).length;a[h]=g,i[d]=g,p.push(d)}}let u=s.slice();u[1]=Object.keys(a).length;let m=new Rt(u,o);p.forEach((d,h)=>{for(let g=0;g<s[0];g++)for(let x=0;x<s[2];x++)m.set(c.get(g,d,x),g,h,x)});let f=e.slice();return f[n]=u[1],{outputValues:m.values,outputShape:f,indices:i}}Pp("cpu",()=>new Kl,1);var iy=ut("Elu",r=>r>=0?r:Math.exp(r)-1),Fw={kernelName:"Elu",backendName:"cpu",kernelFunc:iy};function cy(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{alpha:s}=o;z([n],"leakyRelu");let a=y.sizeFromShape(n.shape),i=e.data.get(n.dataId).values,c=y.getTypedArrayFromDType("float32",a);for(let p=0;p<i.length;p++)c[p]=i[p]<0?s*i[p]:i[p];return e.makeTensorInfo(n.shape,"float32",c)}var _w={kernelName:ta,backendName:"cpu",kernelFunc:cy};var B3=wt((r,t)=>r<0?t*r:r);function py(r){let{inputs:t,backend:e}=r,{x:o,alpha:n}=t;z([o,n],"prelu");let s=e.data.get(o.dataId).values,a=e.data.get(n.dataId).values,[i,c]=B3(o.shape,n.shape,s,a,"float32");return e.makeTensorInfo(c,"float32",i)}var Ow={kernelName:ya,backendName:"cpu",kernelFunc:py};var ly=ut(kn,r=>Math.max(0,r)),Pw={kernelName:kn,backendName:"cpu",kernelFunc:ly};var uy=ut(En,r=>Math.min(Math.max(0,r),6)),Lw={kernelName:En,backendName:"cpu",kernelFunc:uy};function Ui(r,t,e,o,n){if(e==="linear")return Se({inputs:{x:t},backend:r});if(e==="relu")return ly({inputs:{x:t},backend:r});if(e==="elu")return iy({inputs:{x:t},backend:r});if(e==="relu6")return uy({inputs:{x:t},backend:r});if(e==="prelu")return py({inputs:{x:t,alpha:o},backend:r});if(e==="leakyrelu")return cy({inputs:{x:t},backend:r,attrs:{alpha:n}});if(e==="sigmoid")return ey({inputs:{x:t},backend:r});throw new Error(`Activation ${e} has not been implemented for the CPU backend.`)}function bt(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{shape:s}=o,a=y.sizeFromShape(n.shape),i=y.inferFromImplicitShape(s,a),c=y.sizeFromShape(i);y.assert(a===c,()=>`The new shape (${i}) has ${c} elements and the old shape (${n.shape}) has ${a} elements. The new shape and old shape must have the same number of elements.`),e.incRef(n.dataId);let p=e.data.get(n.dataId);if(p.complexTensorInfos!=null){let l=p.complexTensorInfos.real,u=p.complexTensorInfos.imag;l.shape=i,u.shape=i}return{dataId:n.dataId,shape:i,dtype:n.dtype}}var Mw={kernelName:Sa,backendName:"cpu",kernelFunc:bt};function my(r){let{inputs:t,backend:e,attrs:o}=r,{a:n,b:s}=t,{transposeA:a,transposeB:i}=o;z([n,s],"matMul");let c=n.shape.length,p=s.shape.length,l=a?n.shape[c-2]:n.shape[c-1],u=i?s.shape[p-1]:s.shape[p-2],m=a?n.shape[c-1]:n.shape[c-2],f=i?s.shape[p-2]:s.shape[p-1],d=n.shape.slice(0,-2),h=s.shape.slice(0,-2),g=y.sizeFromShape(d),x=y.sizeFromShape(h),w=_r.assertAndGetBroadcastShape(n.shape.slice(0,-2),s.shape.slice(0,-2)).concat([m,f]);y.assert(l===u,()=>`Error in matMul: inner shapes (${l}) and (${u}) of Tensors with shapes ${n.shape} and ${s.shape} and transposeA=${a} and transposeB=${i} must match.`);let I=a?[g,l,m]:[g,m,l],k=i?[x,f,u]:[x,u,f],$=bt({inputs:{x:n},backend:e,attrs:{shape:I}}),R=bt({inputs:{x:s},backend:e,attrs:{shape:k}}),D=a?$.shape[1]:$.shape[2],_=a?$.shape[2]:$.shape[1],O=i?R.shape[1]:R.shape[2],L=Math.max(g,x),M=e.data.get($.dataId).values,B=e.data.get(R.dataId).values,G=y.computeStrides($.shape),V=y.computeStrides(R.shape),[W,H,U]=a?[G[0],1,G[1]]:[G[0],G[1],1],[q,X,Y]=i?[1,V[1],V[0]]:[V[1],1,V[0]],J=_*O,Z=rt([L,_,O],$.dtype),et=Z.values,Q=e.blockSize;for(let nt=0;nt<L;nt++)for(let ct=0;ct<_;ct+=Q)for(let mt=0;mt<O;mt+=Q)for(let ft=0;ft<D;ft+=Q){let Tt=Math.min(ct+Q,_),Nt=Math.min(mt+Q,O),Pt=Math.min(ft+Q,D);for(let Vt=ct;Vt<Tt;Vt++)for(let Wt=mt;Wt<Nt;Wt++){let jt=0;for(let Lt=ft;Lt<Pt;Lt++){let te=Math.min(nt,g-1)*W,oe=Math.min(nt,x-1)*Y,go=M[te+Vt*H+Lt*U],be=B[Lt*q+Wt*X+oe];jt+=go*be}et[nt*J+(Vt*O+Wt)]+=jt}}return e.disposeIntermediateTensorInfo($),e.disposeIntermediateTensorInfo(R),e.makeTensorInfo(w,Z.dtype,Z.values)}var Bw={kernelName:bs,backendName:"cpu",kernelFunc:my};function V3(r){let{inputs:t,backend:e,attrs:o}=r,{a:n,b:s,bias:a,preluActivationWeights:i}=t,{transposeA:c,transposeB:p,activation:l,leakyreluAlpha:u}=o,m,f,d,h=[];m=my({inputs:{a:n,b:s},attrs:{transposeA:c,transposeB:p},backend:e}),a&&(f=lo({inputs:{a:m,b:a},backend:e}),h.push(m),m=f),l&&(d=Ui(e,m,l,i,u),h.push(m),m=d);for(let x of h)e.disposeIntermediateTensorInfo(x);return m}var Vw={kernelName:Vn,backendName:"cpu",kernelFunc:V3};var G3=ut(Xo,r=>Math.acos(r)),Gw={kernelName:Xo,backendName:"cpu",kernelFunc:G3};var U3=ut(Yo,r=>Math.acosh(r)),Uw={kernelName:Yo,backendName:"cpu",kernelFunc:U3};function z3(r){let{inputs:t,backend:e}=r,o=t;z(t,"addN");let n=o.map(i=>e.data.get(i.dataId).values),s=rt(o[0].shape,o[0].dtype),a=s.values;for(let i=0;i<o.length;i++){let c=n[i];for(let p=0;p<a.length;p++)a[p]+=c[p]}return e.makeTensorInfo(s.shape,s.dtype,s.values)}var zw={kernelName:ds,backendName:"cpu",kernelFunc:z3};function W3(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{axis:s,keepDims:a}=o;z(n,"all");let i=y.parseAxisParam(s,n.shape),c=i,p=v.getAxesPermutation(c,n.shape.length),l=n;p!=null&&(l=Ut({inputs:{x:n},backend:e,attrs:{perm:p}}),c=v.getInnerMostAxes(c.length,n.shape.length)),v.assertAxesAreInnerMostDims("all",c,l.shape.length);let[u,m]=v.computeOutAndReduceShapes(l.shape,c),f=y.sizeFromShape(m),d=y.makeZerosTypedArray(y.sizeFromShape(u),l.dtype),h=e.data.get(l.dataId).values;for(let x=0;x<d.length;++x){let b=x*f,w=h[b];for(let I=0;I<f;++I){let k=h[b+I];w=w&&k}d[x]=w}p!=null&&e.disposeIntermediateTensorInfo(l);let g=e.makeTensorInfo(u,l.dtype,d);if(a){let x=v.expandShapeToKeepDim(u,i),b=bt({inputs:{x:g},backend:e,attrs:{shape:x}});return e.disposeIntermediateTensorInfo(g),b}return g}var Ww={kernelName:"All",backendName:"cpu",kernelFunc:W3};function H3(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{axis:s,keepDims:a}=o;z(n,"any");let i=y.parseAxisParam(s,n.shape),c=i,p=v.getAxesPermutation(c,n.shape.length),l=n;p!=null&&(l=Ut({inputs:{x:n},backend:e,attrs:{perm:p}}),c=v.getInnerMostAxes(c.length,n.shape.length)),v.assertAxesAreInnerMostDims("any",c,l.shape.length);let[u,m]=v.computeOutAndReduceShapes(l.shape,c),f=y.sizeFromShape(m),d=y.makeZerosTypedArray(y.sizeFromShape(u),l.dtype),h=e.data.get(l.dataId).values;for(let x=0;x<d.length;++x){let b=x*f,w=h[b];for(let I=0;I<f;++I){let k=h[b+I];w=w||k}d[x]=w}p!=null&&e.disposeIntermediateTensorInfo(l);let g=e.makeTensorInfo(u,l.dtype,d);if(a){let x=v.expandShapeToKeepDim(u,i),b=bt({inputs:{x:g},backend:e,attrs:{shape:x}});return e.disposeIntermediateTensorInfo(g),b}return g}var Hw={kernelName:"Any",backendName:"cpu",kernelFunc:H3};function q3(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{axis:s}=o;z(n,"argMax");let a=y.parseAxisParam(s,n.shape),i=v.getAxesPermutation(a,n.shape.length),c=n,p=[];i!=null&&(c=Ut({inputs:{x:n},backend:e,attrs:{perm:i}}),p.push(c),a=v.getInnerMostAxes(a.length,c.shape.length)),a=[a[0]],v.assertAxesAreInnerMostDims("argMax",a,c.shape.length);let[l,u]=v.computeOutAndReduceShapes(c.shape,a),m=y.sizeFromShape(l),f=y.makeZerosTypedArray(m,"int32"),d=y.sizeFromShape(u),h=e.data.get(c.dataId).values;for(let g=0;g<f.length;++g){let x=g*d,b=h[x],w=0;for(let I=0;I<d;++I){let k=h[x+I];k>b&&(b=k,w=I)}f[g]=w}return p.forEach(g=>e.disposeIntermediateTensorInfo(g)),e.makeTensorInfo(l,"int32",f)}var qw={kernelName:hs,backendName:"cpu",kernelFunc:q3};function K3(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{axis:s}=o;z(n,"argMin");let a=y.parseAxisParam(s,n.shape),i=v.getAxesPermutation(a,n.shape.length),c=n,p=[];i!=null&&(c=Ut({inputs:{x:n},backend:e,attrs:{perm:i}}),p.push(c),a=v.getInnerMostAxes(a.length,c.shape.length)),a=[a[0]],v.assertAxesAreInnerMostDims("argMin",a,c.shape.length);let[l,u]=v.computeOutAndReduceShapes(c.shape,a),m=y.sizeFromShape(l),f=y.makeZerosTypedArray(m,"int32"),d=y.sizeFromShape(u),h=e.data.get(c.dataId).values;for(let g=0;g<f.length;++g){let x=g*d,b=h[x],w=0;for(let I=0;I<d;++I){let k=h[x+I];k<b&&(b=k,w=I)}f[g]=w}return p.forEach(g=>e.disposeIntermediateTensorInfo(g)),e.makeTensorInfo(l,"int32",f)}var Kw={kernelName:gs,backendName:"cpu",kernelFunc:K3};var j3=ut(Zo,r=>Math.asin(r)),jw={kernelName:Zo,backendName:"cpu",kernelFunc:j3};var X3=ut(Qo,r=>Math.asinh(r)),Xw={kernelName:Qo,backendName:"cpu",kernelFunc:X3};var Y3=ut(Jo,r=>Math.atan(r)),Yw={kernelName:Jo,backendName:"cpu",kernelFunc:Y3};var Z3=wt((r,t)=>Math.atan2(r,t)),Q3=$t(en,Z3),Zw={kernelName:en,backendName:"cpu",kernelFunc:Q3};var J3=ut(tn,r=>Math.atanh(r)),Qw={kernelName:tn,backendName:"cpu",kernelFunc:J3};function Vc(r,t,e,o,n,s){let a=n.strideHeight,i=n.strideWidth,c=n.dilationHeight,p=n.dilationWidth,l=n.effectiveFilterHeight,u=n.effectiveFilterWidth,m=n.padInfo.top,f=n.padInfo.left,d=s==="max"?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,h=rt(n.outShape,e),g=h.values,x=n.outShape[1]*n.outShape[2]*n.outShape[3],b=n.outShape[2]*n.outShape[3],w=n.outShape[3];for(let I=0;I<n.batchSize;++I){let k=I*x,$=I*o[0];for(let R=0;R<n.inChannels;++R)for(let D=0;D<n.outHeight;++D){let _=D*a-m,O=Math.max(0,_),L=Math.min(n.inHeight,l+_),M=k+D*b;for(let B=0;B<n.outWidth;++B){let G=B*i-f,V=Math.max(0,G),W=Math.min(n.inWidth,u+G),H=d,U=0,q=0;for(let Y=O;Y<L;Y+=c){let J=$+Y*o[1];for(let Z=V;Z<W;Z+=p){let et=J+Z*o[2],Q=r[et+R];s==="max"&&Q>H?H=Q:s==="avg"&&(U+=Q,q++)}if(isNaN(H))break}let X=M+B*w+R;g[X]=s==="avg"?U/q:H}}}return h}function Xm(r,t,e,o,n=!1,s=!1){let a=rt(o.outShape,"int32"),i=o.strideHeight,c=o.strideWidth,p=o.dilationHeight,l=o.dilationWidth,u=o.effectiveFilterHeight,m=o.effectiveFilterWidth,f=o.padInfo.top,d=o.padInfo.left,h=rt(t,e,r);for(let g=0;g<o.batchSize;++g)for(let x=0;x<o.inChannels;++x)for(let b=0;b<o.outHeight;++b){let w=b*i-f,I=w;for(;I<0;)I+=p;let k=Math.min(o.inHeight,u+w);for(let $=0;$<o.outWidth;++$){let R=$*c-d,D=R;for(;D<0;)D+=l;let _=Math.min(o.inWidth,m+R),O=Number.NEGATIVE_INFINITY,L=-1;for(let M=I;M<k;M+=p){let B=M-w;for(let G=D;G<_;G+=l){let V=G-R,W=h.get(g,M,G,x);W>O&&(O=W,n?L=s?((g*o.inHeight+M)*o.inWidth+G)*o.inChannels+x:(M*o.inWidth+G)*o.inChannels+x:L=B*m+V)}}a.set(L,g,b,$,x)}}return a}function Ym(r,t,e,o,n,s){let a=n.strideDepth,i=n.strideHeight,c=n.strideWidth,p=n.dilationDepth,l=n.dilationHeight,u=n.dilationWidth,m=n.effectiveFilterDepth,f=n.effectiveFilterHeight,d=n.effectiveFilterWidth,h=n.padInfo.front,g=n.padInfo.top,x=n.padInfo.left,b=s==="max"?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY,w=rt(n.outShape,e),I=w.values,k=n.outShape[1]*n.outShape[2]*n.outShape[3]*n.outShape[4],$=n.outShape[2]*n.outShape[3]*n.outShape[4],R=n.outShape[3]*n.outShape[4],D=n.outShape[4];for(let _=0;_<n.batchSize;++_){let O=_*k,L=_*o[0];for(let M=0;M<n.inChannels;++M)for(let B=0;B<n.outDepth;++B){let G=B*a-h,V=G;for(;V<0;)V+=p;let W=Math.min(n.inDepth,m+G),H=O+B*$;for(let U=0;U<n.outHeight;++U){let q=U*i-g,X=q;for(;X<0;)X+=l;let Y=Math.min(n.inHeight,f+q),J=H+U*R;for(let Z=0;Z<n.outWidth;++Z){let et=Z*c-x,Q=et;for(;Q<0;)Q+=u;let nt=Math.min(n.inWidth,d+et),ct=J+Z*D,mt=b,ft=0,Tt=0;for(let Pt=V;Pt<W;Pt+=p){let Vt=L+Pt*o[1];for(let Wt=X;Wt<Y;Wt+=l){let jt=Vt+Wt*o[2];for(let Lt=Q;Lt<nt;Lt+=u){let te=jt+Lt*o[3],oe=r[te+M];if(s==="max"&&oe>mt?mt=oe:s==="avg"&&(ft+=oe,Tt++),isNaN(mt))break}if(isNaN(mt))break}if(isNaN(mt))break}let Nt=ct+M;I[Nt]=s==="avg"?ft/Tt:mt}}}}return w}function Jw(r,t){let e=rt(t.outShape,"int32"),o=t.strideDepth,n=t.strideHeight,s=t.strideWidth,a=t.dilationDepth,i=t.dilationHeight,c=t.dilationWidth,p=t.effectiveFilterDepth,l=t.effectiveFilterHeight,u=t.effectiveFilterWidth,m=t.padInfo.front,f=t.padInfo.top,d=t.padInfo.left;for(let h=0;h<t.batchSize;++h)for(let g=0;g<t.inChannels;++g)for(let x=0;x<t.outDepth;++x){let b=x*o-m,w=b;for(;w<0;)w+=a;let I=Math.min(t.inDepth,p+b);for(let k=0;k<t.outHeight;++k){let $=k*n-f,R=$;for(;R<0;)R+=i;let D=Math.min(t.inHeight,l+$);for(let _=0;_<t.outWidth;++_){let O=_*s-d,L=O;for(;L<0;)L+=c;let M=Math.min(t.inWidth,u+O),B=Number.NEGATIVE_INFINITY,G=-1;for(let V=w;V<I;V+=a){let W=V-b;for(let H=R;H<D;H+=i){let U=H-$;for(let q=L;q<M;q+=c){let X=q-O,Y=r.get(h,V,H,q,g);Y>=B&&(B=Y,G=W*l*u+U*l+X)}}}e.set(G,h,x,k,_,g)}}}return e}function tM(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t;z(n,"avgPool");let{filterSize:s,strides:a,pad:i,dimRoundingMode:c}=o,p=1;y.assert(v.eitherStridesOrDilationsAreOne(a,p),()=>`Error in avgPool: Either strides or dilations must be 1. Got strides ${a} and dilations '${p}'`);let l=v.computePool2DInfo(n.shape,s,a,p,i,c),u;if(l.filterWidth===1&&l.filterHeight===1&&y.arraysEqual(l.inShape,l.outShape))u=Se({inputs:{x:n},backend:e});else{let m=e.data.get(n.dataId).values,f=y.computeStrides(n.shape),d=Vc(m,n.shape,n.dtype,f,l,"avg");u=e.makeTensorInfo(l.outShape,n.dtype,d.values)}return u}var tI={kernelName:xs,backendName:"cpu",kernelFunc:tM};function eM(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{filterSize:s,strides:a,pad:i,dimRoundingMode:c,dataFormat:p}=o;z(n,"avgPool3d");let l=v.computePool3DInfo(n.shape,s,a,1,i,c,p),u=e.data.get(n.dataId).values,m=Ym(u,n.shape,n.dtype,y.computeStrides(n.shape),l,"avg");return e.makeTensorInfo(m.shape,"float32",m.values)}var eI={kernelName:ys,backendName:"cpu",kernelFunc:eM};function rM(r){let{inputs:t,backend:e,attrs:o}=r,{dy:n,input:s}=t,{filterSize:a,strides:i,pad:c,dimRoundingMode:p}=o;z([n,s],"avgPool3DGrad");let l=v.computePool3DInfo(s.shape,a,i,1,c,p),u=l.strideDepth,m=l.strideHeight,f=l.strideWidth,d=l.filterDepth,h=l.filterHeight,g=l.filterWidth,x=l.dilationDepth,b=l.dilationHeight,w=l.dilationWidth,I=l.effectiveFilterDepth,k=l.effectiveFilterHeight,$=l.effectiveFilterWidth,R=I-1-l.padInfo.front,D=$-1-l.padInfo.left,_=k-1-l.padInfo.top,O=rt(s.shape,"float32"),L=1/(d*h*g),M=e.bufferSync(n);for(let B=0;B<l.batchSize;++B)for(let G=0;G<l.inChannels;++G)for(let V=0;V<l.inDepth;++V)for(let W=0;W<l.inHeight;++W)for(let H=0;H<l.inWidth;++H){let U=V-R,q=W-_,X=H-D,Y=0;for(let J=0;J<I;J+=x){let Z=(U+J)/u;if(!(Z<0||Z>=l.outDepth||Math.floor(Z)!==Z))for(let et=0;et<k;et+=b){let Q=(q+et)/m;if(!(Q<0||Q>=l.outHeight||Math.floor(Q)!==Q))for(let nt=0;nt<$;nt+=w){let ct=(X+nt)/f;if(ct<0||ct>=l.outWidth||Math.floor(ct)!==ct)continue;let mt=M.get(B,Z,Q,ct,G);Y+=mt}}}O.set(Y*L,B,V,W,H,G)}return e.makeTensorInfo(O.shape,O.dtype,O.values)}var rI={kernelName:hp,backendName:"cpu",kernelFunc:rM};function oM(r){let{inputs:t,backend:e,attrs:o}=r,{dy:n,input:s}=t,a=s;z([n,s],"avgPoolGrad");let{filterSize:i,strides:c,pad:p}=o,l=v.computePool2DInfo(a.shape,i,c,1,p),u=l.strideHeight,m=l.strideWidth,f=l.filterHeight,d=l.filterWidth,h=l.dilationHeight,g=l.dilationWidth,x=l.effectiveFilterHeight,b=l.effectiveFilterWidth,w=b-1-l.padInfo.left,I=x-1-l.padInfo.top,k=rt(a.shape,"float32"),$=1/(f*d),R=e.data.get(n.dataId).values,D=rt(n.shape,"float32",R);for(let _=0;_<l.batchSize;++_)for(let O=0;O<l.inChannels;++O)for(let L=0;L<l.inHeight;++L)for(let M=0;M<l.inWidth;++M){let B=L-I,G=M-w,V=0;for(let W=0;W<x;W+=h){let H=(B+W)/u;if(!(H<0||H>=l.outHeight||Math.floor(H)!==H))for(let U=0;U<b;U+=g){let q=(G+U)/m;if(q<0||q>=l.outWidth||Math.floor(q)!==q)continue;let X=D.get(_,H,q,O);V+=X}}k.set(V*$,_,L,M,O)}return e.makeTensorInfo(k.shape,k.dtype,k.values)}var oI={kernelName:dp,backendName:"cpu",kernelFunc:oM};function nM(r){let{inputs:t,backend:e,attrs:o}=r,{x:n,scale:s,offset:a,mean:i,variance:c}=t;y.assert(i.shape.length===c.shape.length,()=>"Batch normalization gradient requires mean and variance to have equal ranks."),y.assert(a==null||i.shape.length===a.shape.length,()=>"Batch normalization gradient requires mean and offset to have equal ranks."),y.assert(s==null||i.shape.length===s.shape.length,()=>"Batch normalization gradient requires mean and scale to have equal ranks."),z([n,i,c,s,a],"batchNorm");let{varianceEpsilon:p}=o;p==null&&(p=.001);let l=e.data.get(n.dataId).values,u=e.data.get(i.dataId).values,m=e.data.get(c.dataId).values,f=s?e.data.get(s.dataId).values:new Float32Array([1]),d=a?e.data.get(a.dataId).values:new Float32Array([0]),h=new Float32Array(l.length),g=d.length,x=f.length,b=m.length,w=u.length,I=0,k=0,$=0,R=0;for(let D=0;D<l.length;++D)h[D]=d[I++]+(l[D]-u[k++])*f[$++]/Math.sqrt(m[R++]+p),I>=g&&(I=0),k>=w&&(k=0),$>=x&&($=0),R>=b&&(R=0);return e.makeTensorInfo(n.shape,n.dtype,h)}var nI={kernelName:Xs,backendName:"cpu",kernelFunc:nM};function sM(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{blockShape:s,crops:a}=o;z([n],"batchToSpaceND");let i=s.reduce((x,b)=>x*b),c=v.getReshaped(n.shape,s,i),p=v.getPermuted(c.length,s.length),l=v.getReshapedPermuted(n.shape,s,i),u=v.getSliceBeginCoords(a,s.length),m=v.getSliceSize(l,a,s.length),f=bt({inputs:{x:n},backend:e,attrs:{shape:c}}),d=Ut({inputs:{x:f},backend:e,attrs:{perm:p}}),h=bt({inputs:{x:d},backend:e,attrs:{shape:l}}),g=wr({inputs:{x:h},backend:e,attrs:{begin:u,size:m}});return e.disposeIntermediateTensorInfo(f),e.disposeIntermediateTensorInfo(d),e.disposeIntermediateTensorInfo(h),g}var sI={kernelName:Cs,backendName:"cpu",kernelFunc:sM};function aM(r){let{inputs:t,backend:e,attrs:o}=r,{x:n,weights:s}=t,{size:a}=o,i=e.data.get(n.dataId).values,c=e.data.get(s.dataId).values,p=Lc(i,c,s.dtype,s.shape,a);return e.makeTensorInfo([a],s.dtype,p)}var aI={kernelName:Ts,backendName:"cpu",kernelFunc:aM};function iM(r){let{inputs:t,backend:e}=r,{s0:o,s1:n}=t,s=e.data.get(o.dataId).values,a=e.data.get(n.dataId).values,i=v.assertAndGetBroadcastShape(Array.from(s),Array.from(a));return e.makeTensorInfo([i.length],"int32",Int32Array.from(i))}var iI={kernelName:ws,backendName:"cpu",kernelFunc:iM};var cM=ut(on,(r,t)=>{let e=t;return r>e.clipValueMax?e.clipValueMax:r<e.clipValueMin?e.clipValueMin:r}),cI={kernelName:on,backendName:"cpu",kernelFunc:cM};var pM=r=>{let{x:t}=r.inputs,e=r.backend,o=new Float32Array(y.sizeFromShape(t.shape)),n=e.data.get(t.dataId),s=n.complexTensorInfos.real,a=n.complexTensorInfos.imag,i=e.data.get(s.dataId).values,c=e.data.get(a.dataId).values;for(let p=0;p<i.length;p++){let l=i[p],u=c[p];o[p]=Math.hypot(l,u)}return e.makeOutput(o,t.shape,"float32")},pI={kernelName:Ss,backendName:"cpu",kernelFunc:pM};function uo(r){let{inputs:t,backend:e}=r,{input:o}=t,n=e.data.get(o.dataId).complexTensorInfos.imag,s=e.data.get(n.dataId).values;return e.makeTensorInfo(n.shape,n.dtype,s)}var lI={kernelName:Js,backendName:"cpu",kernelFunc:uo};function rs(r){let{inputs:t,backend:e,attrs:o}=r,{axis:n}=o,s=y.parseAxisParam(n,t[0].shape)[0],a=t.map(h=>h.shape);v.assertParamsConsistent(a,s);let i=v.computeOutShape(t.map(h=>h.shape),s);if(y.sizeFromShape(i)===0)return e.makeTensorInfo(i,t[0].dtype,[]);let c=t.filter(h=>y.sizeFromShape(h.shape)>0);if(c.length===1)return Se({inputs:{x:c[0]},backend:e});if(c[0].dtype==="complex64"){let h=c.map(I=>yr({inputs:{input:I},backend:e})),g=c.map(I=>uo({inputs:{input:I},backend:e})),x=rs({inputs:h,backend:e,attrs:{axis:s}}),b=rs({inputs:g,backend:e,attrs:{axis:s}}),w=le({inputs:{real:x,imag:b},backend:e});return h.forEach(I=>e.disposeIntermediateTensorInfo(I)),g.forEach(I=>e.disposeIntermediateTensorInfo(I)),e.disposeIntermediateTensorInfo(x),e.disposeIntermediateTensorInfo(b),w}let p=c.map(h=>{let x=[-1,y.sizeFromShape(h.shape.slice(s))];return bt({inputs:{x:h},backend:e,attrs:{shape:x}})}),l=p.map(h=>({vals:e.data.get(h.dataId).values,shape:h.shape}));i=v.computeOutShape(p.map(h=>h.shape),1);let u=p[0].shape[0]===1,m=Dm(l,i,t[0].dtype,u),f=v.computeOutShape(c.map(h=>h.shape),s),d=e.makeTensorInfo(f,t[0].dtype,m);return p.forEach(h=>e.disposeIntermediateTensorInfo(h)),d}var uI={kernelName:vs,backendName:"cpu",kernelFunc:rs};function fy(r){let{inputs:t,backend:e,attrs:o}=r,{x:n,filter:s}=t,{strides:a,pad:i,dataFormat:c,dilations:p,dimRoundingMode:l}=o;z([n,s],"conv2d");let u=v.convertConv2DDataFormat(c),m=v.computeConv2DInfo(n.shape,s.shape,a,p,i,l,!1,u),f=m.filterHeight,d=m.filterWidth,h=m.dilationHeight,g=m.dilationWidth,x=m.padInfo.left,b=m.padInfo.top,w=m.dataFormat==="channelsLast",I=new Rt(m.outShape,n.dtype),k=y.computeStrides(n.shape),$=y.computeStrides(s.shape),R=k[0],D=w?k[1]:k[2],_=w?k[2]:1,O=w?1:k[1],L=I.strides[0],M=w?I.strides[1]:I.strides[2],B=w?I.strides[2]:1,G=w?1:I.strides[1],V=e.data.get(n.dataId).values,W=e.data.get(s.dataId).values,H=I.values;for(let U=0;U<m.batchSize;++U){let q=U*R,X=U*L;for(let Y=0;Y<m.outHeight;++Y){let J=X+Y*M,Z=Y*m.strideHeight-b;for(let et=0;et<f;++et){let Q=Z+et*h;if(Q<0||Q>=m.inHeight)continue;let nt=et*$[0],ct=q+Q*D;for(let mt=0;mt<m.outWidth;++mt){let ft=J+mt*B,Tt=mt*m.strideWidth-x;for(let Nt=0;Nt<d;++Nt){let Pt=Tt+Nt*g;if(Pt<0||Pt>=m.inWidth)continue;let Vt=nt+Nt*$[1],Wt=ct+Pt*_,jt=Vt;for(let Lt=0;Lt<m.inChannels;++Lt){let te=V[Wt+Lt*O];for(let oe=0;oe<m.outChannels;++oe)H[ft+oe*G]+=te*W[jt+oe];jt+=m.outChannels}}}}}}return e.makeTensorInfo(I.shape,I.dtype,H)}var mI={kernelName:Ns,backendName:"cpu",kernelFunc:fy};function lM(r){let{inputs:t,backend:e,attrs:o}=r,{x:n,dy:s}=t,{strides:a,pad:i,dataFormat:c,dimRoundingMode:p,filterShape:l}=o;z([n,s],"conv2dBackpropFilter");let u=v.convertConv2DDataFormat(c),m=v.computeConv2DInfo(n.shape,l,a,1,i,p,!1,u),{strideHeight:f,strideWidth:d,filterHeight:h,filterWidth:g}=m,x=m.dataFormat==="channelsLast",b=new Rt(m.filterShape,"float32"),w=m.padInfo.left,I=m.padInfo.top,k=e.data.get(n.dataId).values,$=e.data.get(s.dataId).values,R=new Rt(n.shape,n.dtype,k),D=new Rt(s.shape,s.dtype,$);for(let _=0;_<h;++_){let O=Math.max(0,Math.ceil((I-_)/f)),L=Math.min(m.outHeight,(m.inHeight+I-_)/f);for(let M=0;M<g;++M){let B=Math.max(0,Math.ceil((w-M)/d)),G=Math.min(m.outWidth,(m.inWidth+w-M)/d);for(let V=0;V<m.inChannels;++V)for(let W=0;W<m.outChannels;++W){let H=0;for(let U=0;U<m.batchSize;++U)for(let q=O;q<L;++q){let X=_+q*f-I;for(let Y=B;Y<G;++Y){let J=M+Y*d-w;x?H+=R.get(U,X,J,V)*D.get(U,q,Y,W):H+=R.get(U,V,X,J)*D.get(U,W,q,Y)}}b.set(H,_,M,V,W)}}}return e.makeTensorInfo(b.shape,b.dtype,b.values)}var fI={kernelName:ks,backendName:"cpu",kernelFunc:lM};function uM(r){let{inputs:t,backend:e,attrs:o}=r,{dy:n,filter:s}=t,{inputShape:a,strides:i,pad:c,dataFormat:p,dimRoundingMode:l}=o;z([n,s],"conv2dBackpropInput");let u=y.computeStrides(s.shape),m=y.computeStrides(n.shape),f=v.convertConv2DDataFormat(p),d=v.computeConv2DInfo(a,s.shape,i,1,c,l,!1,f),h=new Rt(d.inShape,"float32"),g=h.values,x=e.data.get(n.dataId).values,b=e.data.get(s.dataId).values,[w,I,k]=u,{batchSize:$,filterHeight:R,filterWidth:D,inChannels:_,inHeight:O,inWidth:L,outChannels:M,outHeight:B,outWidth:G,strideHeight:V,strideWidth:W}=d;f=d.dataFormat;let H=R-1-d.padInfo.top,U=D-1-d.padInfo.left,q=f==="channelsLast",X=h.strides[0],Y=q?h.strides[1]:h.strides[2],J=q?h.strides[2]:1,Z=q?1:h.strides[1],et=m[0],Q=q?m[1]:m[2],nt=q?m[2]:1,ct=q?1:m[1];for(let mt=0;mt<$;++mt)for(let ft=0;ft<_;++ft)for(let Tt=0;Tt<O;++Tt){let Nt=Tt-H,Pt=Math.max(0,Math.ceil(Nt/V)),Vt=Math.min(B,(R+Nt)/V);for(let Wt=0;Wt<L;++Wt){let jt=Wt-U,Lt=Math.max(0,Math.ceil(jt/W)),te=Math.min(G,(D+jt)/W),oe=0;for(let be=Pt;be<Vt;++be){let zo=be*V-Nt;for(let Je=Lt;Je<te;++Je){let ls=Je*W-jt,kr=et*mt+Q*be+nt*Je,xo=w*(R-1-zo)+I*(D-1-ls)+k*ft;for(let Wo=0;Wo<M;++Wo){let Ho=x[kr+ct*Wo],qo=b[xo+Wo];oe+=Ho*qo}}}let go=X*mt+Y*Tt+J*Wt+Z*ft;g[go]=oe}}return e.makeTensorInfo(h.shape,h.dtype,h.values)}var dI={kernelName:Es,backendName:"cpu",kernelFunc:uM};function mM(r){let{inputs:t,backend:e,attrs:o}=r,{x:n,filter:s}=t,{strides:a,pad:i,dilations:c}=o;z([n,s],"conv3d");let p=v.computeConv3DInfo(n.shape,s.shape,a,c,i),{filterDepth:l,filterHeight:u,filterWidth:m,dilationDepth:f,dilationHeight:d,dilationWidth:h,padInfo:g}=p,x=g.front,b=g.left,w=g.top,I=new Rt(p.outShape,n.dtype),k=e.data.get(n.dataId).values,$=e.data.get(s.dataId).values,R=I.values,D=y.computeStrides(n.shape),_=y.computeStrides(s.shape);for(let O=0;O<p.batchSize;++O){let L=O*D[0],M=O*I.strides[0];for(let B=0;B<p.outDepth;++B){let G=M+B*I.strides[1],V=B*p.strideDepth-x;for(let W=0;W<l;++W){let H=V+W*f;if(H<0||H>=p.inDepth)continue;let U=W*_[0],q=L+H*D[1];for(let X=0;X<p.outHeight;++X){let Y=G+X*I.strides[2],J=X*p.strideHeight-w;for(let Z=0;Z<u;++Z){let et=J+Z*d;if(et<0||et>=p.inHeight)continue;let Q=U+Z*_[1],nt=q+et*D[2];for(let ct=0;ct<p.outWidth;++ct){let mt=Y+ct*p.outChannels,ft=ct*p.strideWidth-b;for(let Tt=0;Tt<m;++Tt){let Nt=ft+Tt*h;if(Nt<0||Nt>=p.inWidth)continue;let Pt=Q+Tt*_[2],Vt=nt+Nt*p.inChannels,Wt=Pt;for(let jt=0;jt<p.inChannels;++jt){let Lt=k[Vt+jt];for(let te=0;te<p.outChannels;++te)R[mt+te]+=Lt*$[Wt+te];Wt+=p.outChannels}}}}}}}}return e.makeTensorInfo(I.shape,I.dtype,I.values)}var hI={kernelName:$s,backendName:"cpu",kernelFunc:mM};function fM(r){let{inputs:t,backend:e,attrs:o}=r,{x:n,dy:s}=t,{strides:a,pad:i,filterShape:c}=o;z([n,s],"conv3dBackpropFilterV2");let p=y.computeStrides(n.shape),l=y.computeStrides(s.shape),u=v.computeConv3DInfo(n.shape,c,a,1,i),m=u.strideDepth,f=u.strideHeight,d=u.strideWidth,h=u.filterDepth,g=u.filterHeight,x=u.filterWidth,b=new Rt(u.filterShape,"float32"),w=b.values,[I,k,$,R]=b.strides,D=e.data.get(s.dataId).values,[_,O,L,M]=l,B=e.data.get(n.dataId).values,[G,V,W,H]=p,U=u.padInfo.front,q=u.padInfo.left,X=u.padInfo.top;for(let Y=0;Y<h;++Y){let J=Math.max(0,Math.ceil((U-Y)/m)),Z=Math.min(u.outDepth,(u.inDepth+U-Y)/m),et=Y*I;for(let Q=0;Q<g;++Q){let nt=Math.max(0,Math.ceil((X-Q)/f)),ct=Math.min(u.outHeight,(u.inHeight+X-Q)/f),mt=Q*k+et;for(let ft=0;ft<x;++ft){let Tt=Math.max(0,Math.ceil((q-ft)/d)),Nt=Math.min(u.outWidth,(u.inWidth+q-ft)/d),Pt=ft*$+mt;for(let Vt=0;Vt<u.inChannels;++Vt){let Wt=Vt*R+Pt;for(let jt=0;jt<u.outChannels;++jt){let Lt=0;for(let te=0;te<u.batchSize;++te){let oe=te*G,go=te*_;for(let be=J;be<Z;++be){let Je=(Y+be*m-U)*V+oe,ls=be*O+go;for(let kr=nt;kr<ct;++kr){let Wo=(Q+kr*f-X)*W+Je,Ho=kr*L+ls;for(let qo=Tt;qo<Nt;++qo){let th=(ft+qo*d-q)*H+Wo,eh=qo*M+Ho;Lt+=B[th+Vt]*D[eh+jt]}}}}w[Wt+jt]=Lt}}}}}return e.makeTensorInfo(b.shape,b.dtype,b.values)}var gI={kernelName:gp,backendName:"cpu",kernelFunc:fM};function dM(r){let{inputs:t,backend:e,attrs:o}=r,{dy:n,filter:s}=t,{pad:a,strides:i,inputShape:c}=o;z([n],"conv3dBackpropInputV2");let p=y.computeStrides(n.shape),l=y.computeStrides(s.shape),u=v.computeConv3DInfo(c,s.shape,i,1,a),m=new Rt(u.inShape,"float32"),f=m.values,[d,h,g,x]=m.strides,b=e.data.get(n.dataId).values,[w,I,k,$]=p,R=e.data.get(s.dataId).values,[D,_,O,L]=l,{batchSize:M,filterDepth:B,filterHeight:G,filterWidth:V,inChannels:W,inDepth:H,inHeight:U,inWidth:q,outChannels:X,outDepth:Y,outHeight:J,outWidth:Z,strideDepth:et,strideHeight:Q,strideWidth:nt}=u,ct=B-1-u.padInfo.front,mt=G-1-u.padInfo.top,ft=V-1-u.padInfo.left;for(let Tt=0;Tt<M;++Tt)for(let Nt=0;Nt<W;++Nt)for(let Pt=0;Pt<H;++Pt){let Vt=Pt-ct,Wt=Math.max(0,Math.ceil(Vt/et)),jt=Math.min(Y,(B+Vt)/et);for(let Lt=0;Lt<U;++Lt){let te=Lt-mt,oe=Math.max(0,Math.ceil(te/Q)),go=Math.min(J,(G+te)/Q);for(let be=0;be<q;++be){let zo=be-ft,Je=Math.max(0,Math.ceil(zo/nt)),ls=Math.min(Z,(V+zo)/nt),kr=0;for(let xo=Wt;xo<jt;++xo){let Wo=xo*et-Vt;for(let Ho=oe;Ho<go;++Ho){let qo=Ho*Q-te;for(let pp=Je;pp<ls;++pp){let th=pp*nt-zo,eh=w*Tt+I*xo+k*Ho+$*pp,u2=D*(B-1-Wo)+_*(G-1-qo)+O*(V-1-th)+L*Nt;for(let gu=0;gu<X;++gu){let m2=b[eh+gu],f2=R[u2+gu];kr+=m2*f2}}}}f[d*Tt+h*Pt+g*Lt+x*be+Nt]=kr}}}return e.makeTensorInfo(m.shape,m.dtype,m.values)}var xI={kernelName:As,backendName:"cpu",kernelFunc:dM};var hM=ut("Cos",r=>Math.cos(r)),yI={kernelName:"Cos",backendName:"cpu",kernelFunc:hM};var gM=ut(nn,r=>Math.cosh(r)),bI={kernelName:nn,backendName:"cpu",kernelFunc:gM};function xM(r){let{inputs:t,backend:e,attrs:o}=r,{image:n,boxes:s,boxInd:a}=t,{cropSize:i,method:c,extrapolationValue:p}=o,[l,u,m,f]=n.shape,d=s.shape[0],[h,g]=i,x=rt([d,h,g,f],"float32"),b=e.data.get(s.dataId).values,w=e.data.get(a.dataId).values,I=e.data.get(n.dataId).values,k=y.computeStrides(n.shape),$=y.computeStrides(x.shape);for(let R=0;R<d;R++){let D=R*4,_=b[D],O=b[D+1],L=b[D+2],M=b[D+3],B=w[R];if(B>=l)continue;let G=h>1?(L-_)*(u-1)/(h-1):0,V=g>1?(M-O)*(m-1)/(g-1):0;for(let W=0;W<h;W++){let H=h>1?_*(u-1)+W*G:.5*(_+L)*(u-1);if(H<0||H>u-1){for(let U=0;U<g;U++)for(let q=0;q<f;q++){let X=q+U*$[2]+W*$[1]+R*$[0];x.values[X]=p}continue}if(c==="bilinear"){let U=Math.floor(H),q=Math.ceil(H),X=H-U;for(let Y=0;Y<g;Y++){let J=g>1?O*(m-1)+Y*V:.5*(O+M)*(m-1);if(J<0||J>m-1){for(let nt=0;nt<f;nt++){let ct=nt+Y*$[2]+W*$[1]+R*$[0];x.values[ct]=p}continue}let Z=Math.floor(J),et=Math.ceil(J),Q=J-Z;for(let nt=0;nt<f;nt++){let ct=nt+Z*k[2]+U*k[1]+B*k[0],mt=I[ct];ct=nt+et*k[2]+U*k[1]+B*k[0];let ft=I[ct];ct=nt+Z*k[2]+q*k[1]+B*k[0];let Tt=I[ct];ct=nt+et*k[2]+q*k[1]+B*k[0];let Nt=I[ct],Pt=mt+(ft-mt)*Q,Vt=Tt+(Nt-Tt)*Q;ct=nt+Y*$[2]+W*$[1]+R*$[0],x.values[ct]=Pt+(Vt-Pt)*X}}}else for(let U=0;U<g;++U){let q=g>1?O*(m-1)+U*V:.5*(O+M)*(m-1);if(q<0||q>m-1){for(let J=0;J<f;J++){let Z=J+U*$[2]+W*$[1]+R*$[0];x.values[Z]=p}continue}let X=Math.round(q),Y=Math.round(H);for(let J=0;J<f;J++){let Z=J+X*k[2]+Y*k[1]+B*k[0],et=J+U*$[2]+W*$[1]+R*$[0];x.values[et]=I[Z]}}}}return e.makeTensorInfo(x.shape,x.dtype,x.values)}var CI={kernelName:_s,backendName:"cpu",kernelFunc:xM};function yM(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{axis:s,exclusive:a,reverse:i}=o;z(n,"cumprod");let c=v.getAxesPermutation([s],n.shape.length),p=n;c!=null&&(p=Ut({inputs:{x:n},backend:e,attrs:{perm:c}}));let l=v.getInnerMostAxes(1,n.shape.length)[0];if(l!==p.shape.length-1)throw new Error(`backend.cumprod in CPU expects an inner-most axis=${p.shape.length-1} but got axis=${l}`);let u=Qt(p.dtype,"int32"),m=y.makeOnesTypedArray(y.sizeFromShape(p.shape),u),f=e.data.get(p.dataId).values,d=p.shape[p.shape.length-1],h=i?(x,b)=>x+d-b-1:(x,b)=>x+b;for(let x=0;x<f.length;x+=d)for(let b=0;b<d;b++){let w=h(x,b);if(b===0)m[w]=a?1:f[w];else{let I=h(x,b-1);m[w]=a?f[I]*m[I]:f[w]*m[I]}}let g=e.makeTensorInfo(p.shape,u,m);if(c!=null){let x=v.getUndoAxesPermutation(c),b=Ut({inputs:{x:g},backend:e,attrs:{perm:x}});return e.disposeIntermediateTensorInfo(g),e.disposeIntermediateTensorInfo(p),b}return g}var TI={kernelName:Ds,backendName:"cpu",kernelFunc:yM};function bM(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{axis:s,exclusive:a,reverse:i}=o;z(n,"cumsum");let c=v.getAxesPermutation([s],n.shape.length),p=n;c!=null&&(p=Ut({inputs:{x:n},backend:e,attrs:{perm:c}}));let l=v.getInnerMostAxes(1,n.shape.length)[0];if(l!==p.shape.length-1)throw new Error(`backend.cumsum in CPU expects an inner-most axis=${p.shape.length-1} but got axis=${l}`);let u=Qt(p.dtype,"int32"),m=y.makeZerosTypedArray(y.sizeFromShape(p.shape),u),f=e.data.get(p.dataId).values,d=p.shape[p.shape.length-1],h=i?(x,b)=>x+d-b-1:(x,b)=>x+b;for(let x=0;x<f.length;x+=d)for(let b=0;b<d;b++){let w=h(x,b);if(b===0)m[w]=a?0:f[w];else{let I=h(x,b-1);m[w]=a?f[I]+m[I]:f[w]+m[I]}}let g=e.makeTensorInfo(p.shape,u,m);if(c!=null){let x=v.getUndoAxesPermutation(c),b=Ut({inputs:{x:g},backend:e,attrs:{perm:x}});return e.disposeIntermediateTensorInfo(g),e.disposeIntermediateTensorInfo(p),b}return g}var wI={kernelName:Fs,backendName:"cpu",kernelFunc:bM};function CM(r){let{inputs:t,backend:e,attrs:o}=r,{x:n,weights:s}=t,{size:a,binaryOutput:i}=o;if(n.shape.length===1){let c=e.data.get(n.dataId).values,p=e.data.get(s.dataId).values,l=Lc(c,p,s.dtype,s.shape,a);return e.makeTensorInfo([a],s.dtype,l)}else if(n.shape.length===2){let c=e.bufferSync(n),p=e.bufferSync(s),l=Rm(c,p,a,i);return e.makeTensorInfo(l.shape,s.dtype,l.values)}throw new Error(`Error in denseBincount: input must be at most rank 2, but got rank${n.shape.length}.`)}var II={kernelName:Os,backendName:"cpu",kernelFunc:CM};function TM(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{blockSize:s,dataFormat:a}=o;y.assert(a==="NHWC",()=>`Only NHWC dataFormat supported on CPU for depthToSpace. Got ${a}`);let i=n.shape[0],c=n.shape[1],p=n.shape[2],l=n.shape[3],u=c*s,m=p*s,f=l/(s*s),d=e.data.get(n.dataId).values,h=new Float32Array(i*u*m*f),g=0;for(let x=0;x<i;++x)for(let b=0;b<u;++b){let w=Math.floor(b/s),I=b%s;for(let k=0;k<m;++k){let $=Math.floor(k/s),R=k%s,D=(I*s+R)*f;for(let _=0;_<f;++_){let L=_+D+l*($+p*(w+c*x));h[g++]=d[L]}}}return e.makeTensorInfo([i,u,m,f],n.dtype,h)}var SI={kernelName:Ps,backendName:"cpu",kernelFunc:TM};function dy(r){let{inputs:t,backend:e,attrs:o}=r,{x:n,filter:s}=t,{strides:a,pad:i,dilations:c,dimRoundingMode:p}=o;z([n,s],"depthwiseConv2DNative");let l=y.computeStrides(n.shape),u=y.computeStrides(s.shape),m=c;m==null&&(m=[1,1]),y.assert(v.eitherStridesOrDilationsAreOne(a,m),()=>`Error in depthwiseConv2d: Either strides or dilations must be 1. Got strides ${a} and dilations '${m}'`);let f=v.computeConv2DInfo(n.shape,s.shape,a,m,i,p,!0),{filterHeight:d,filterWidth:h,dilationHeight:g,dilationWidth:x,padInfo:b}=f,w=b.left,I=b.top,k=f.outChannels/f.inChannels,$=new Rt(f.outShape,n.dtype),R=e.data.get(n.dataId).values,D=e.data.get(s.dataId).values,_=$.values;for(let O=0;O<f.batchSize;++O){let L=O*l[0],M=O*$.strides[0];for(let B=0;B<f.outHeight;++B){let G=M+B*$.strides[1],V=B*f.strideHeight-I;for(let W=0;W<d;++W){let H=V+W*g;if(H<0||H>=f.inHeight)continue;let U=W*u[0],q=L+H*l[1];for(let X=0;X<f.outWidth;++X){let Y=G+X*$.strides[2],J=X*f.strideWidth-w;for(let Z=0;Z<h;++Z){let et=J+Z*x;if(et<0||et>=f.inWidth)continue;let Q=U+Z*u[1],nt=q+et*f.inChannels,ct=Y,mt=Q;for(let ft=0;ft<f.inChannels;++ft){let Tt=R[nt+ft];for(let Nt=0;Nt<k;++Nt)_[ct+Nt]+=Tt*D[mt+Nt];ct+=k,mt+=k}}}}}}return e.makeTensorInfo($.shape,$.dtype,$.values)}var vI={kernelName:Ls,backendName:"cpu",kernelFunc:dy};function wM(r){let{inputs:t,backend:e,attrs:o}=r,{x:n,dy:s}=t,{strides:a,dilations:i,pad:c,dimRoundingMode:p,filterShape:l}=o;z([n,s],"depthwiseConv2dNativeBackpropFilter");let u=v.computeConv2DInfo(n.shape,l,a,i,c,p,!0),{strideHeight:m,strideWidth:f,filterHeight:d,filterWidth:h}=u,g=new Rt(u.filterShape,"float32"),x=u.padInfo.left,b=u.padInfo.top,w=u.outChannels/u.inChannels,I=e.data.get(n.dataId).values,k=new Rt(n.shape,n.dtype,I),$=e.data.get(s.dataId).values,R=new Rt(s.shape,s.dtype,$);for(let D=0;D<d;++D){let _=Math.max(0,Math.ceil((b-D)/m)),O=Math.min(u.outHeight,(u.inHeight+b-D)/m);for(let L=0;L<h;++L){let M=Math.max(0,Math.ceil((x-L)/f)),B=Math.min(u.outWidth,(u.inWidth+x-L)/f);for(let G=0;G<u.outChannels;++G){let V=Math.trunc(G/w),W=G%w,H=0;for(let U=0;U<u.batchSize;++U)for(let q=_;q<O;++q){let X=D+q*m-b;for(let Y=M;Y<B;++Y){let J=L+Y*f-x;H+=k.get(U,X,J,V)*R.get(U,q,Y,G)}}g.set(H,D,L,V,W)}}}return e.makeTensorInfo(g.shape,g.dtype,g.values)}var NI={kernelName:Ms,backendName:"cpu",kernelFunc:wM};function IM(r){let{inputs:t,backend:e,attrs:o}=r,{dy:n,filter:s}=t,{strides:a,dilations:i,pad:c,dimRoundingMode:p,inputShape:l}=o;z([n,s],"depthwiseConv2DNativeBackpropInput");let u=y.computeStrides(n.shape),m=y.computeStrides(s.shape),f=v.computeConv2DInfo(l,s.shape,a,i,c,p,!0),d=new Rt(f.inShape,"float32"),h=d.values,[g,x,b]=d.strides,w=e.data.get(n.dataId).values,[I,k,$]=u,R=e.data.get(s.dataId).values,[D,_,O]=m,{batchSize:L,filterHeight:M,filterWidth:B,inChannels:G,inHeight:V,inWidth:W,outChannels:H,outHeight:U,outWidth:q,strideHeight:X,strideWidth:Y}=f,J=M-1-f.padInfo.top,Z=B-1-f.padInfo.left,et=H/G;for(let Q=0;Q<L;++Q)for(let nt=0;nt<G;++nt)for(let ct=0;ct<V;++ct){let mt=ct-J,ft=Math.max(0,Math.ceil(mt/X)),Tt=Math.min(U,(M+mt)/X);for(let Nt=0;Nt<W;++Nt){let Pt=Nt-Z,Vt=Math.max(0,Math.ceil(Pt/Y)),Wt=Math.min(q,(B+Pt)/Y),jt=0;for(let Lt=ft;Lt<Tt;++Lt){let te=Lt*X-mt;for(let oe=Vt;oe<Wt;++oe){let go=oe*Y-Pt,be=I*Q+k*Lt+$*oe,zo=D*(M-1-te)+_*(B-1-go)+O*nt;for(let Je=0;Je<et;++Je){let ls=nt*et+Je,kr=w[be+ls],xo=R[zo+Je];jt+=kr*xo}}}h[g*Q+x*ct+b*Nt+nt]=jt}}return e.makeTensorInfo(d.shape,d.dtype,d.values)}var kI={kernelName:Bs,backendName:"cpu",kernelFunc:IM};function SM(r){let{inputs:t,backend:e}=r,{x:o}=t,n=y.sizeFromShape(o.shape),s=e.data.get(o.dataId).values,a=rt([n,n],o.dtype),i=a.values;for(let p=0;p<s.length;p++)i[p*n+p]=s[p];let c=[...o.shape,...o.shape];return e.makeTensorInfo(c,a.dtype,a.values)}var EI={kernelName:Vs,backendName:"cpu",kernelFunc:SM};var $I={kernelName:Gs,backendName:"cpu",kernelFunc:({inputs:r,backend:t,attrs:e})=>{let{x:o,filter:n}=r,{strides:s,pad:a,dilations:i}=e,c=t,p=c.data.get(o.dataId).values,l=o.shape.length,u=c.data.get(n.dataId).values,m=n.shape.length,{batchSize:f,inHeight:d,inWidth:h,inChannels:g,outHeight:x,outWidth:b,padInfo:w,strideHeight:I,strideWidth:k,filterHeight:$,filterWidth:R,dilationHeight:D,dilationWidth:_,outShape:O}=v.computeDilation2DInfo(o.shape,n.shape,s,a,"NHWC",i),L=y.sizeFromShape(O),M=O.length,B=y.getArrayFromDType(o.dtype,L);for(let V=0;V<f;++V)for(let W=0;W<x;++W){let H=W*I-w.top;for(let U=0;U<b;++U){let q=U*k-w.left;for(let X=0;X<g;++X){let Y=Number.MIN_SAFE_INTEGER;for(let Z=0;Z<$;++Z){let et=H+Z*D;if(et>=0&&et<d)for(let Q=0;Q<R;++Q){let nt=q+Q*_;if(nt>=0&&nt<h){let ct=y.locToIndex([V,et,nt,X],l,y.computeStrides(o.shape)),mt=y.locToIndex([Z,Q,X],m,y.computeStrides(n.shape)),ft=p[ct]+u[mt];ft>Y&&(Y=ft)}}}let J=y.locToIndex([V,W,U,X],M,y.computeStrides(O));B[J]=Y}}}return{dataId:c.write(y.toTypedArray(B,o.dtype),O,o.dtype),shape:O,dtype:o.dtype}}};var AI={kernelName:wu,backendName:"cpu",kernelFunc:({inputs:r,backend:t,attrs:e})=>{let{x:o,filter:n,dy:s}=r,{strides:a,pad:i,dilations:c}=e,p=t,l=y.toNestedArray(o.shape,p.data.get(o.dataId).values),u=y.toNestedArray(n.shape,p.data.get(n.dataId).values),{batchSize:m,inHeight:f,inWidth:d,inChannels:h,outHeight:g,outWidth:x,padInfo:b,strideHeight:w,strideWidth:I,filterHeight:k,filterWidth:$,dilationHeight:R,dilationWidth:D,outShape:_}=v.computeDilation2DInfo(o.shape,n.shape,a,i,"NHWC",c);y.assert(s.rank===_.length,()=>`Error in ${wu}, dy must have the same rank as output ${_.length}, but got ${s.rank}`);let O=y.toNestedArray(_,p.data.get(s.dataId).values),L=y.makeZerosNestedTypedArray(n.shape,n.dtype);for(let B=0;B<m;++B)for(let G=0;G<g;++G){let V=G*w-b.top;for(let W=0;W<x;++W){let H=W*I-b.left;for(let U=0;U<h;++U){let q=Number.MIN_SAFE_INTEGER,X=0,Y=0;for(let J=0;J<k;++J){let Z=V+J*R;if(Z>=0&&Z<f)for(let et=0;et<$;++et){let Q=H+et*D;if(Q>=0&&Q<d){let nt=l[B][Z][Q][U]+u[J][et][U];nt>q&&(q=nt,X=J,Y=et)}}}L[X][Y][U]+=O[B][G][W][U]}}}return{dataId:p.write(y.toTypedArray(L,o.dtype),n.shape,n.dtype),shape:n.shape,dtype:n.dtype}}};var RI={kernelName:Tu,backendName:"cpu",kernelFunc:({inputs:r,backend:t,attrs:e})=>{let{x:o,filter:n,dy:s}=r,{strides:a,pad:i,dilations:c}=e,p=t,l=y.toNestedArray(o.shape,p.data.get(o.dataId).values),u=y.toNestedArray(n.shape,p.data.get(n.dataId).values),{batchSize:m,inHeight:f,inWidth:d,inChannels:h,outHeight:g,outWidth:x,padInfo:b,strideHeight:w,strideWidth:I,filterHeight:k,filterWidth:$,dilationHeight:R,dilationWidth:D,outShape:_}=v.computeDilation2DInfo(o.shape,n.shape,a,i,"NHWC",c);y.assert(s.rank===_.length,()=>`Error in ${Tu}, dy must have the same rank as output ${_.length}, but got ${s.rank}`);let O=y.toNestedArray(_,p.data.get(s.dataId).values),L=y.makeZerosNestedTypedArray(o.shape,o.dtype);for(let B=0;B<m;++B)for(let G=0;G<g;++G){let V=G*w-b.top;for(let W=0;W<x;++W){let H=W*I-b.left;for(let U=0;U<h;++U){let q=Number.MIN_SAFE_INTEGER,X=V<0?0:V,Y=H<0?0:H;for(let J=0;J<k;++J){let Z=V+J*R;if(Z>=0&&Z<f)for(let et=0;et<$;++et){let Q=H+et*D;if(Q>=0&&Q<d){let nt=l[B][Z][Q][U]+u[J][et][U];nt>q&&(q=nt,X=Z,Y=Q)}}}L[B][X][Y][U]+=O[B][G][W][U]}}}return{dataId:p.write(y.toTypedArray(L,o.dtype),o.shape,o.dtype),shape:o.shape,dtype:o.dtype}}};function Mo(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{axis:s,keepDims:a}=o;z(n,"sum");let i;n.dtype==="bool"?i=br({inputs:{x:n},backend:e,attrs:{dtype:"int32"}}):i=Se({inputs:{x:n},backend:e});let c=i.shape.length,p=y.parseAxisParam(s,i.shape),l=v.getAxesPermutation(p,c),u=p,m=i;l!=null&&(m=Ut({inputs:{x:i},backend:e,attrs:{perm:l}}),u=v.getInnerMostAxes(u.length,c)),v.assertAxesAreInnerMostDims("sum",u,m.shape.length);let[f,d]=v.computeOutAndReduceShapes(m.shape,u),h=v.upcastType(m.dtype,"int32"),g=Oc(e,f,h),x=y.sizeFromShape(d),b=e.data.get(g.dataId).values,w=e.data.get(m.dataId).values;for(let I=0;I<b.length;++I){let k=I*x,$=0;for(let R=0;R<x;++R)$+=w[k+R];b[I]=$}if(a){let I=v.expandShapeToKeepDim(g.shape,p),k=g;g=bt({inputs:{x:g},backend:e,attrs:{shape:I}}),e.disposeIntermediateTensorInfo(k)}return e.disposeIntermediateTensorInfo(i),l!=null&&e.disposeIntermediateTensorInfo(m),g}var DI={kernelName:"Sum",backendName:"cpu",kernelFunc:Mo};function vM(r){let{inputs:t,backend:e,attrs:o}=r,{equation:n}=o,s=t,{allDims:a,summedDims:i,idDims:c}=v.decodeEinsumEquation(n,s.length);v.checkEinsumDimSizes(a.length,c,s);let{path:p,steps:l}=v.getEinsumComputePath(i,c),u=l.length,m=null,f=a.length,d=[];for(let h=0;h<u;++h){for(let g of l[h]){let{permutationIndices:x,expandDims:b}=v.getEinsumPermutation(f,c[g]),w;v.isIdentityPermutation(x)?w=s[g]:(w=Ut({inputs:{x:s[g]},backend:e,attrs:{perm:x}}),d.push(w));let I=w.shape.slice();for(let k=0;k<b.length;++k)I.splice(b[k],0,1);y.arraysEqual(w.shape,I)||(w=bt({inputs:{x:w},backend:e,attrs:{shape:I}}),d.push(w)),m===null?m=w:(m=Gi({inputs:{a:w,b:m},backend:e}),d.push(m))}h<u-1&&(p[h]>=0&&(m=Mo({inputs:{x:m},backend:e,attrs:{axis:p[h]-(a.length-f),keepDims:!1}}),d.push(m)),f--)}for(let h of d)h!==m&&e.disposeIntermediateTensorInfo(h);return m}var FI={kernelName:Us,backendName:"cpu",kernelFunc:vM};function NM(r){let{inputs:t,backend:e}=r,{dy:o,y:n}=t;z([o,n],"eluGrad");let s=new Float32Array(y.sizeFromShape(n.shape)),a=e.data.get(n.dataId).values,i=e.data.get(o.dataId).values;for(let c=0;c<a.length;++c){let p=a[c];p>=1?s[c]=i[c]:s[c]=i[c]*(p+1)}return e.makeTensorInfo(n.shape,"float32",s)}var _I={kernelName:xp,backendName:"cpu",kernelFunc:NM};var kM=v.ERF_P,EM=v.ERF_A1,$M=v.ERF_A2,AM=v.ERF_A3,RM=v.ERF_A4,DM=v.ERF_A5,FM=ut("Erf",r=>{let t=Math.sign(r),e=Math.abs(r),o=1/(1+kM*e);return t*(1-((((DM*o+RM)*o+AM)*o+$M)*o+EM)*o*Math.exp(-e*e))}),OI={kernelName:"Erf",backendName:"cpu",kernelFunc:FM};function Gc(r){let{inputs:t,backend:e,attrs:o}=r,{input:n}=t,{dim:s}=o,a=n.shape.length,i=n.shape.slice(),c=s;return s<0&&(y.assert(-(a+1)<=s,()=>`Axis must be in the interval [${-(a+1)}, ${a}]`),c=a+s+1),i.splice(c,0,1),bt({inputs:{x:n},backend:e,attrs:{shape:i}})}var PI={kernelName:qs,backendName:"cpu",kernelFunc:Gc};var _M=wt((r,t)=>r/t),Zl=$t(sn,_M),Ql={kernelName:sn,backendName:"cpu",kernelFunc:Zl};function Zm(r,t,e){let o=r.shape,n=o[0],s=o[1],a=e.data.get(r.dataId),i=a.complexTensorInfos.real,c=a.complexTensorInfos.imag,p=[n,s],l=y.sizeFromShape(p),u=y.getTypedArrayFromDType("float32",l),m=y.getTypedArrayFromDType("float32",l);for(let g=0;g<n;g++){let x=wr({inputs:{x:i},backend:e,attrs:{begin:[g,0],size:[1,s]}}),b=wr({inputs:{x:c},backend:e,attrs:{begin:[g,0],size:[1,s]}}),w=le({inputs:{real:x,imag:b},backend:e}),{real:I,imag:k}=OM(w,t,e),$=v.mergeRealAndImagArrays(I,k);for(let R=0;R<s;R++){let D=v.getComplexWithIndex($,R);u[g*s+R]=D.real,m[g*s+R]=D.imag}e.disposeIntermediateTensorInfo(x),e.disposeIntermediateTensorInfo(b),e.disposeIntermediateTensorInfo(w)}let f=e.makeTensorInfo(p,"float32",u),d=e.makeTensorInfo(p,"float32",m),h=le({inputs:{real:f,imag:d},backend:e});return e.disposeIntermediateTensorInfo(f),e.disposeIntermediateTensorInfo(d),h}function OM(r,t,e){let o=y.sizeFromShape(r.shape),n=e.data.get(r.dataId),s=e.data.get(n.complexTensorInfos.real.dataId).values,a=e.data.get(n.complexTensorInfos.imag.dataId).values;if(PM(o)){let i=hy(s,a,o,t,e),c=[r.shape[0],r.shape[1]];if(t){let p=e.makeTensorInfo(c,"float32",i.real),l=e.makeTensorInfo(c,"float32",i.imag),u=e.makeTensorInfo([],"float32",y.createScalarValue(o,"float32")),m=Se({inputs:{x:u},backend:e}),f=Ql.kernelFunc({inputs:{a:p,b:u},backend:e}),d=Ql.kernelFunc({inputs:{a:l,b:m},backend:e}),h=e.data.get(f.dataId).values,g=e.data.get(d.dataId).values;return e.disposeIntermediateTensorInfo(p),e.disposeIntermediateTensorInfo(l),e.disposeIntermediateTensorInfo(u),e.disposeIntermediateTensorInfo(m),e.disposeIntermediateTensorInfo(f),e.disposeIntermediateTensorInfo(d),{real:h,imag:g}}return i}else{let i=v.mergeRealAndImagArrays(s,a),c=LM(i,o,t);return v.splitRealAndImagArrays(c)}}function PM(r){return(r&r-1)===0}function hy(r,t,e,o,n){if(e===1)return{real:r,imag:t};let s=v.mergeRealAndImagArrays(r,t),a=e/2,i=v.complexWithEvenIndex(s),c=i.real,p=i.imag,l=[c.length],u=n.makeTensorInfo(l,"float32",c),m=n.makeTensorInfo(l,"float32",p),f=le({inputs:{real:u,imag:m},backend:n}),d=v.complexWithOddIndex(s),h=d.real,g=d.imag,x=[h.length],b=n.makeTensorInfo(x,"float32",h),w=n.makeTensorInfo(x,"float32",g),I=le({inputs:{real:b,imag:w},backend:n}),k=hy(c,p,a,o,n),$=k.real,R=k.imag,D=[$.length],_=n.makeTensorInfo(D,"float32",$),O=n.makeTensorInfo(D,"float32",R),L=le({inputs:{real:_,imag:O},backend:n}),M=hy(h,g,a,o,n),B=M.real,G=M.imag,V=[B.length],W=n.makeTensorInfo(V,"float32",B),H=n.makeTensorInfo(V,"float32",G),U=le({inputs:{real:W,imag:H},backend:n}),q=v.exponents(e,o),X=[q.real.length],Y=n.makeTensorInfo(X,"float32",q.real),J=n.makeTensorInfo(X,"float32",q.imag),Z=le({inputs:{real:Y,imag:J},backend:n}),et=Gi({inputs:{a:Z,b:U},backend:n}),Q=lo({inputs:{a:L,b:et},backend:n}),nt=Xl({inputs:{a:L,b:et},backend:n}),ct=yr({inputs:{input:Q},backend:n}),mt=yr({inputs:{input:nt},backend:n}),ft=uo({inputs:{input:Q},backend:n}),Tt=uo({inputs:{input:nt},backend:n}),Nt=rs({inputs:[ct,mt],backend:n,attrs:{axis:0}}),Pt=rs({inputs:[ft,Tt],backend:n,attrs:{axis:0}}),Vt=n.data.get(Nt.dataId).values,Wt=n.data.get(Pt.dataId).values;return n.disposeIntermediateTensorInfo(u),n.disposeIntermediateTensorInfo(m),n.disposeIntermediateTensorInfo(f),n.disposeIntermediateTensorInfo(b),n.disposeIntermediateTensorInfo(w),n.disposeIntermediateTensorInfo(I),n.disposeIntermediateTensorInfo(_),n.disposeIntermediateTensorInfo(O),n.disposeIntermediateTensorInfo(L),n.disposeIntermediateTensorInfo(W),n.disposeIntermediateTensorInfo(H),n.disposeIntermediateTensorInfo(U),n.disposeIntermediateTensorInfo(Y),n.disposeIntermediateTensorInfo(J),n.disposeIntermediateTensorInfo(Z),n.disposeIntermediateTensorInfo(et),n.disposeIntermediateTensorInfo(Q),n.disposeIntermediateTensorInfo(nt),n.disposeIntermediateTensorInfo(ct),n.disposeIntermediateTensorInfo(ft),n.disposeIntermediateTensorInfo(mt),n.disposeIntermediateTensorInfo(Tt),n.disposeIntermediateTensorInfo(Nt),n.disposeIntermediateTensorInfo(Pt),{real:Vt,imag:Wt}}function LM(r,t,e){let o=new Float32Array(t*2);for(let n=0;n<t;n++){let s=0,a=0;for(let i=0;i<t;i++){let c=v.exponent(n*i,t,e),p=v.getComplexWithIndex(r,i);s+=p.real*c.real-p.imag*c.imag,a+=p.real*c.imag+p.imag*c.real}e&&(s/=t,a/=t),v.assignToTypedArray(o,s,a,n)}return o}function MM(r){let{inputs:t,backend:e}=r,{input:o}=t,n=y.sizeFromShape(o.shape),s=o.shape[o.shape.length-1],a=n/s,i=bt({inputs:{x:o},backend:e,attrs:{shape:[a,s]}}),c=Zm(i,!1,e),p=bt({inputs:{x:c},backend:e,attrs:{shape:o.shape}});return e.disposeIntermediateTensorInfo(i),e.disposeIntermediateTensorInfo(c),p}var LI={kernelName:"FFT",backendName:"cpu",kernelFunc:MM};function Jl(r){let{backend:t,attrs:e}=r,{shape:o,value:n,dtype:s}=e,a=s||y.inferDtype(n),i=y.getArrayFromDType(a,y.sizeFromShape(o));return BM(i,n,a),t.makeTensorInfo(o,a,i)}var MI={kernelName:Ks,backendName:"cpu",kernelFunc:Jl};function BM(r,t,e){r.fill(t)}var BI={kernelName:js,backendName:"cpu",kernelFunc:({inputs:r,attrs:t,backend:e})=>{let{image:o}=r,n=e,s=y.getTypedArrayFromDType(o.dtype,y.sizeFromShape(o.shape)),[a,i,c,p]=o.shape,l=n.data.get(o.dataId).values;for(let m=0;m<a;m++){let f=m*c*i*p;for(let d=0;d<i;d++){let h=d*(c*p);for(let g=0;g<c;g++){let x=g*p;for(let b=0;b<p;b++){let w=Math.round(c-g-1),I=f+h+x+b,k=l[I];if(w>=0&&w<c){let $=w*p,R=f+h+$+b;k=l[R]}s[I]=k}}}}return{dataId:n.write(s,o.shape,o.dtype),shape:o.shape,dtype:o.dtype}}};var VM=wt((r,t)=>Math.floor(r/t)),GM=$t(ln,VM,null,"int32"),VI={kernelName:ln,backendName:"cpu",kernelFunc:GM};function UM(r){let{inputs:t,backend:e,attrs:o}=r,{x:n,filter:s,bias:a,preluActivationWeights:i}=t,{strides:c,pad:p,dataFormat:l,dilations:u,dimRoundingMode:m,activation:f,leakyreluAlpha:d}=o,h=fy({inputs:{x:n,filter:s},backend:e,attrs:{strides:c,pad:p,dataFormat:l,dilations:u,dimRoundingMode:m}});if(a){let g=h;if(l==="NCHW"&&a.shape.length===1&&a.shape[0]!==1){let x=bt({inputs:{x:a},backend:e,attrs:{shape:[a.shape[0],1,1]}});h=lo({inputs:{a:h,b:x},backend:e}),e.disposeIntermediateTensorInfo(x)}else h=lo({inputs:{a:h,b:a},backend:e});e.disposeIntermediateTensorInfo(g)}if(f){let g=h;if(l==="NCHW"&&f==="prelu"&&i.shape.length===1&&i.shape[0]!==1){let x=bt({inputs:{x:i},backend:e,attrs:{shape:[i.shape[0],1,1]}});h=Ui(e,h,f,x,d),e.disposeIntermediateTensorInfo(x)}else h=Ui(e,h,f,i,d);e.disposeIntermediateTensorInfo(g)}return h}var GI={kernelName:Gn,backendName:"cpu",kernelFunc:UM};function zM(r){let{inputs:t,backend:e,attrs:o}=r,{x:n,filter:s,bias:a,preluActivationWeights:i}=t,{strides:c,pad:p,dataFormat:l,dilations:u,dimRoundingMode:m,activation:f,leakyreluAlpha:d}=o,h=dy({inputs:{x:n,filter:s},backend:e,attrs:{strides:c,pad:p,dataFormat:l,dilations:u,dimRoundingMode:m}});if(a){let g=h;h=lo({inputs:{a:h,b:a},backend:e}),e.disposeIntermediateTensorInfo(g)}if(f){let g=h;h=Ui(e,h,f,i,d),e.disposeIntermediateTensorInfo(g)}return h}var UI={kernelName:Un,backendName:"cpu",kernelFunc:zM};function WM(r){let{inputs:t,backend:e}=r,{params:o,indices:n}=t,s=y.sizeFromShape(o.shape),a=n.shape,i=a[a.length-1],[c,p,l,u]=v.prepareAndValidate(o,n);if(p===0)return e.makeTensorInfo(c,o.dtype,[]);let m=e.data.get(n.dataId).values,f=e.bufferSync(o),d=Fm(m,f,o.dtype,p,i,l,u,o.shape,s);return e.makeTensorInfo(c,o.dtype,d.values)}var zI={kernelName:Zs,backendName:"cpu",kernelFunc:WM};function HM(r){let{inputs:t,backend:e,attrs:o}=r,{x:n,indices:s}=t,{axis:a,batchDims:i}=o;z([n,s],"gatherV2");let c=y.parseAxisParam(a,n.shape)[0],p=e.data.get(s.dataId).values,l=n.shape[c];for(let I=0;I<p.length;++I){let k=p[I];y.assert(k<=l-1&&k>=0,()=>`GatherV2: the index value ${k} is not in [0, ${l-1}]`)}let u=i;i==null&&(u=0);let m=y.sizeFromShape(s.shape),f=v.segment_util.collectGatherOpShapeInfo(n,s,c,u),d=bt({inputs:{x:n},backend:e,attrs:{shape:[f.batchSize,f.outerSize,f.dimSize,f.sliceSize]}}),h=bt({inputs:{x:s},backend:e,attrs:{shape:[f.batchSize,m/f.batchSize]}}),g=[f.batchSize,f.outerSize,m/f.batchSize,f.sliceSize],x=e.bufferSync(h),b=e.bufferSync(d),w=_m(b,x,g);return e.disposeIntermediateTensorInfo(d),e.disposeIntermediateTensorInfo(h),e.makeTensorInfo(f.outputShape,w.dtype,w.values)}var WI={kernelName:Ys,backendName:"cpu",kernelFunc:HM};function qM(r){let{inputs:t,backend:e}=r,{input:o}=t,n=y.sizeFromShape(o.shape),s=o.shape[o.shape.length-1],a=n/s,i=bt({inputs:{x:o},backend:e,attrs:{shape:[a,s]}}),c=Zm(i,!0,e),p=bt({inputs:{x:c},backend:e,attrs:{shape:o.shape}});return e.disposeIntermediateTensorInfo(i),e.disposeIntermediateTensorInfo(c),p}var HI={kernelName:Qs,backendName:"cpu",kernelFunc:qM};var KM=ut(fn,r=>Number.isFinite(r)?1:0,"bool"),qI={kernelName:fn,backendName:"cpu",kernelFunc:KM};var jM=ut(dn,r=>Math.abs(r)===1/0?1:0,"bool"),KI={kernelName:dn,backendName:"cpu",kernelFunc:jM};var XM=ut(hn,r=>Number.isNaN(r)?1:0,"bool"),jI={kernelName:hn,backendName:"cpu",kernelFunc:XM};function YM(r){let{backend:t,attrs:e}=r,{start:o,stop:n,num:s}=e,a=Om(o,n,s);return t.makeTensorInfo([a.length],"float32",a)}var XI={kernelName:ea,backendName:"cpu",kernelFunc:YM};var ZM=ut(yn,r=>Math.log1p(r)),YI={kernelName:yn,backendName:"cpu",kernelFunc:ZM};var QM=wt((r,t)=>r&&t),JM=$t(bn,QM,null,"bool"),ZI={kernelName:bn,backendName:"cpu",kernelFunc:JM};var tB=ut(Cn,r=>r?0:1,"bool"),QI={kernelName:Cn,backendName:"cpu",kernelFunc:tB};var eB=wt((r,t)=>r||t),rB=$t(Tn,eB,null,"bool"),JI={kernelName:Tn,backendName:"cpu",kernelFunc:rB};function oB(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{depthRadius:s,bias:a,alpha:i,beta:c}=o;z(n,"LRN");let p=n.shape[3],l=p-1,u=e.data.get(n.dataId).values,m=y.sizeFromShape(n.shape),f=new Float32Array(m);function d(h){let g=h%p,x=h-g+Math.max(0,g-s),b=h-g+Math.min(g+s,l),w=0;for(;x<=b;x++){let I=u[x];w+=I*I}return w}for(let h=0;h<m;h++){let g=d(h),x=u[h]*Math.pow(a+i*g,-c);f[h]=x}return e.makeTensorInfo(n.shape,n.dtype,f)}var tS={kernelName:"LRN",backendName:"cpu",kernelFunc:oB};function nB(r){let{inputs:t,backend:e,attrs:o}=r,{x:n,y:s,dy:a}=t,{depthRadius:i,bias:c,alpha:p,beta:l}=o;z(a,"LRNGrad");let u=y.sizeFromShape(a.shape),m=a.shape[3],f=e.data.get(a.dataId).values,d=e.data.get(n.dataId).values,h=e.data.get(s.dataId).values,g=new Float32Array(u),x=u;for(let b=0;b<x;b++){let w=b%m,I=b-w+Math.max(0,w-i),k=b-w+Math.min(m,w+i+1),$=0;for(let R=I;R<k;R++)$+=Math.pow(d[R],2);$=p*$+c;for(let R=I;R<k;R++){let D=-2*p*l*d[R]*h[b]/$;b===R&&(D+=Math.pow($,-l)),D*=f[b],g[R]+=D}}return e.makeTensorInfo(a.shape,n.dtype,g)}var eS={kernelName:yp,backendName:"cpu",kernelFunc:nB};function gy(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{reductionIndices:s,keepDims:a}=o,i=e,c=n.shape,p=c.length,l=y.parseAxisParam(s,c),u=l,m=v.getAxesPermutation(u,p),f=i.data.get(n.dataId).values;if(m!=null){let I=new Array(p);for(let k=0;k<I.length;k++)I[k]=c[m[k]];f=Mc(f,c,n.dtype,m,I),u=v.getInnerMostAxes(u.length,p),c=I}z(n,"max"),v.assertAxesAreInnerMostDims("max",u,p);let[d,h]=v.computeOutAndReduceShapes(c,u),g=y.sizeFromShape(h),x=Pm(f,g,d,n.dtype),b=i.write(x,d,n.dtype),w=d;return a&&(w=v.expandShapeToKeepDim(d,l)),{dataId:b,shape:w,dtype:n.dtype}}var rS={kernelName:"Max",backendName:"cpu",kernelFunc:gy};function sB(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t;z(n,"maxPool");let{filterSize:s,strides:a,pad:i,dimRoundingMode:c}=o,p=1;y.assert(v.eitherStridesOrDilationsAreOne(a,p),()=>`Error in maxPool: Either strides or dilations must be 1. Got strides ${a} and dilations '${p}'`);let l=v.computePool2DInfo(n.shape,s,a,p,i,c),u;if(l.filterWidth===1&&l.filterHeight===1&&y.arraysEqual(l.inShape,l.outShape))u=Se({inputs:{x:n},backend:e});else{let m=e.data.get(n.dataId).values,f=y.computeStrides(n.shape),d=Vc(m,n.shape,n.dtype,f,l,"max");u=e.makeTensorInfo(l.outShape,n.dtype,d.values)}return u}var oS={kernelName:oa,backendName:"cpu",kernelFunc:sB};function aB(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{filterSize:s,strides:a,pad:i,dimRoundingMode:c,dataFormat:p}=o;z(n,"maxPool3d");let l=v.computePool3DInfo(n.shape,s,a,1,i,c,p),u=e.data.get(n.dataId).values,m=Ym(u,n.shape,n.dtype,y.computeStrides(n.shape),l,"max");return e.makeTensorInfo(m.shape,"float32",m.values)}var nS={kernelName:na,backendName:"cpu",kernelFunc:aB};function iB(r){let{inputs:t,backend:e,attrs:o}=r,{dy:n,input:s}=t,{filterSize:a,strides:i,pad:c,dimRoundingMode:p}=o;z([n,s],"maxPool3DGrad");let l=v.computePool3DInfo(s.shape,a,i,1,c,p),u=e.bufferSync(s),m=Jw(u,l),f=l.strideDepth,d=l.strideHeight,h=l.strideWidth,g=l.dilationDepth,x=l.dilationHeight,b=l.dilationWidth,w=l.effectiveFilterDepth,I=l.effectiveFilterHeight,k=l.effectiveFilterWidth,$=w-1-l.padInfo.front,R=k-1-l.padInfo.left,D=I-1-l.padInfo.top,_=rt(s.shape,"float32"),O=e.bufferSync(n);for(let L=0;L<l.batchSize;++L)for(let M=0;M<l.inChannels;++M)for(let B=0;B<l.inDepth;++B)for(let G=0;G<l.inHeight;++G)for(let V=0;V<l.inWidth;++V){let W=B-$,H=G-D,U=V-R,q=0;for(let X=0;X<w;X+=g){let Y=(W+X)/f;if(!(Y<0||Y>=l.outDepth||Math.floor(Y)!==Y))for(let J=0;J<I;J+=x){let Z=(H+J)/d;if(!(Z<0||Z>=l.outHeight||Math.floor(Z)!==Z))for(let et=0;et<k;et+=b){let Q=(U+et)/h;if(Q<0||Q>=l.outWidth||Math.floor(Q)!==Q)continue;let nt=w*I*k-1-m.get(L,Y,Z,Q,M),ct=X*I*k+J*k+et,mt=nt===ct?1:0;if(mt===0)continue;let ft=O.get(L,Y,Z,Q,M);q+=ft*mt}}}_.set(q,L,B,G,V,M)}return e.makeTensorInfo(_.shape,_.dtype,_.values)}var sS={kernelName:Cp,backendName:"cpu",kernelFunc:iB};function cB(r){let{inputs:t,backend:e,attrs:o}=r,{dy:n,input:s,output:a}=t,i=s;z([s,a],"maxPoolGrad");let{filterSize:c,strides:p,pad:l,dimRoundingMode:u}=o,m=v.computePool2DInfo(i.shape,c,p,1,l,u),f=e.data.get(i.dataId).values,d=rt(m.outShape,i.dtype,Xm(f,i.shape,i.dtype,m).values),h=m.strideHeight,g=m.strideWidth,x=m.dilationHeight,b=m.dilationWidth,w=m.effectiveFilterHeight,I=m.effectiveFilterWidth,k=I-1-m.padInfo.left,$=w-1-m.padInfo.top,R=rt(i.shape,"float32"),D=e.data.get(n.dataId).values,_=rt(n.shape,"float32",D);for(let O=0;O<m.batchSize;++O)for(let L=0;L<m.inChannels;++L)for(let M=0;M<m.inHeight;++M)for(let B=0;B<m.inWidth;++B){let G=M-$,V=B-k,W=0;for(let H=0;H<w;H+=x){let U=(G+H)/h;if(!(U<0||U>=m.outHeight||Math.floor(U)!==U))for(let q=0;q<I;q+=b){let X=(V+q)/g;if(X<0||X>=m.outWidth||Math.floor(X)!==X)continue;let Y=w*I-1-d.get(O,U,X,L),J=H*I+q,Z=Y===J?1:0;if(Z===0)continue;let et=_.get(O,U,X,L);W+=et*Z}}R.set(W,O,M,B,L)}return e.makeTensorInfo(R.shape,R.dtype,R.values)}var aS={kernelName:bp,backendName:"cpu",kernelFunc:cB};function iS(r,t,e,o,n){let s=y.computeStrides(t),a=Vc(r,t,e,s,n,"max"),i=Xm(r,t,e,n,!0,o);return[a.values,i.values]}var cS={kernelName:sa,backendName:"cpu",kernelFunc:({inputs:r,attrs:t,backend:e})=>{let{x:o}=r,{filterSize:n,strides:s,pad:a,includeBatchInIndex:i}=t,c=e;z(o,"MaxPoolWithArgmax");let p=c.data.get(o.dataId).values,l=v.computePool2DInfo(o.shape,n,s,[1,1],a),[u,m]=iS(p,o.shape,o.dtype,i,l),f=c.write(u,l.outShape,o.dtype),d=c.write(m,l.outShape,o.dtype);return[{dataId:f,shape:l.outShape,dtype:o.dtype},{dataId:d,shape:l.outShape,dtype:"int32"}]}};function pB(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{axis:s,keepDims:a}=o,i=y.parseAxisParam(s,n.shape),p=v.computeOutAndReduceShapes(n.shape,i)[1],l=y.sizeFromShape(p),u=[],m=e.makeTensorInfo([],"float32",new Float32Array([l]));u.push(m);let f=br({inputs:{x:n},backend:e,attrs:{dtype:"float32"}});u.push(f);let d=Zl({inputs:{a:f,b:m},backend:e});u.push(d);let h=Mo({inputs:{x:d},backend:e,attrs:{axis:s,keepDims:a}});return u.forEach(g=>e.disposeIntermediateTensorInfo(g)),h}var pS={kernelName:aa,backendName:"cpu",kernelFunc:pB};function lB(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{axis:s,keepDims:a}=o;z(n,"min");let i=y.parseAxisParam(s,n.shape),c=i,p=v.getAxesPermutation(c,n.shape.length),l=n;p!=null&&(l=Ut({inputs:{x:n},backend:e,attrs:{perm:p}}),c=v.getInnerMostAxes(c.length,n.shape.length)),v.assertAxesAreInnerMostDims("min",c,l.shape.length);let[u,m]=v.computeOutAndReduceShapes(l.shape,c),f=y.sizeFromShape(m),d=y.makeZerosTypedArray(y.sizeFromShape(u),l.dtype),h=e.data.get(l.dataId).values;for(let x=0;x<d.length;++x){let b=x*f,w=h[b];for(let I=0;I<f;++I){let k=h[b+I];(Number.isNaN(k)||k<w)&&(w=k)}d[x]=w}p!=null&&e.disposeIntermediateTensorInfo(l);let g=e.makeTensorInfo(u,l.dtype,d);if(a){let x=v.expandShapeToKeepDim(u,i),b=bt({inputs:{x:g},backend:e,attrs:{shape:x}});return e.disposeIntermediateTensorInfo(g),b}return g}var lS={kernelName:"Min",backendName:"cpu",kernelFunc:lB};function uB(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{paddings:s,mode:a}=o;z(n,"mirrorPad");let i=s.map((w,I)=>w[0]+n.shape[I]+w[1]),c=s.map(w=>w[0]),p=s.map((w,I)=>w[0]+n.shape[I]),l=a==="reflect"?0:1,u=e.data.get(n.dataId).values,m=n.shape.length,f=y.computeStrides(n.shape),d=y.sizeFromShape(i),h=i.length,g=y.computeStrides(i),x=y.getTypedArrayFromDType(n.dtype,d);for(let w=0;w<d;w++){let I=y.indexToLoc(w,h,g);for(let $=0;$<h;$++)I[$]<c[$]?I[$]=c[$]*2-I[$]-l:I[$]>=p[$]&&(I[$]=(p[$]-1)*2-I[$]+l);I=I.map(($,R)=>$-c[R]);let k=y.locToIndex(I,m,f);x[w]=u[k]}return{dataId:e.write(x,i,n.dtype),shape:i,dtype:n.dtype}}var uS={kernelName:ia,backendName:"cpu",kernelFunc:uB};var mB=wt(((r,t)=>{let e=r%t;return r<0&&t<0||r>=0&&t>=0?e:(e+t)%t})),fB=$t("Mod",mB),mS={kernelName:"Mod",backendName:"cpu",kernelFunc:fB};var dS=xu(Gg());function xy(r){let{inputs:t,backend:e,attrs:o}=r,{logits:n}=t,{dim:s}=o,a=n.shape.length,i=s;if(i===-1&&(i=a-1),i!==a-1)throw Error(`Softmax along a non-last dimension is not yet supported. Logits was rank ${a} and dim was ${i}`);let c=y.parseAxisParam([i],n.shape),p=gy({inputs:{x:n},backend:e,attrs:{reductionIndices:c,keepDims:!1}}),l=v.expandShapeToKeepDim(p.shape,c),u=bt({inputs:{x:p},backend:e,attrs:{shape:l}}),m=Xl({inputs:{a:n,b:u},backend:e}),f=Vx({inputs:{x:m},backend:e}),d=Mo({inputs:{x:f},backend:e,attrs:{axis:c,keepDims:!1}}),h=bt({inputs:{x:d},backend:e,attrs:{shape:l}}),g=Zl({inputs:{a:f,b:h},backend:e});return e.disposeIntermediateTensorInfo(p),e.disposeIntermediateTensorInfo(u),e.disposeIntermediateTensorInfo(m),e.disposeIntermediateTensorInfo(f),e.disposeIntermediateTensorInfo(d),e.disposeIntermediateTensorInfo(h),g}var fS={kernelName:Oa,backendName:"cpu",kernelFunc:xy};function dB(r){let{inputs:t,backend:e,attrs:o}=r,{logits:n}=t,{numSamples:s,seed:a,normalized:i}=o;z(n,"multinomial");let c=i?n:xy({inputs:{logits:n},backend:e,attrs:{dim:-1}}),p=c.shape[0],l=c.shape[1],u=e.data.get(c.dataId).values,m=[p,s],f=y.makeZerosTypedArray(y.sizeFromShape(m),"int32");for(let d=0;d<p;++d){let h=d*l,g=new Float32Array(l-1);g[0]=u[h];for(let w=1;w<g.length;++w)g[w]=g[w-1]+u[h+w];let x=dS.alea(a.toString()),b=d*s;for(let w=0;w<s;++w){let I=x();f[b+w]=g.length;for(let k=0;k<g.length;k++)if(I<g[k]){f[b+w]=k;break}}}return i||e.disposeIntermediateTensorInfo(c),e.makeTensorInfo(m,"int32",f)}var hS={kernelName:pa,backendName:"cpu",kernelFunc:dB};var hB=ge.nonMaxSuppressionV3Impl;function gB(r){let{inputs:t,backend:e,attrs:o}=r,{boxes:n,scores:s}=t,{maxOutputSize:a,iouThreshold:i,scoreThreshold:c}=o;z(n,"NonMaxSuppression");let p=e.data.get(n.dataId).values,l=e.data.get(s.dataId).values,{selectedIndices:u}=hB(p,l,a,i,c);return e.makeTensorInfo([u.length],"int32",new Int32Array(u))}var gS={kernelName:la,backendName:"cpu",kernelFunc:gB};var xB=ge.nonMaxSuppressionV4Impl;function yB(r){let{inputs:t,backend:e,attrs:o}=r,{boxes:n,scores:s}=t,{maxOutputSize:a,iouThreshold:i,scoreThreshold:c,padToMaxOutputSize:p}=o;z(n,"NonMaxSuppressionPadded");let l=e.data.get(n.dataId).values,u=e.data.get(s.dataId).values,{selectedIndices:m,validOutputs:f}=xB(l,u,a,i,c,p);return[e.makeTensorInfo([m.length],"int32",new Int32Array(m)),e.makeTensorInfo([],"int32",new Int32Array([f]))]}var xS={kernelName:ua,backendName:"cpu",kernelFunc:yB};var bB=ge.nonMaxSuppressionV5Impl;function CB(r){let{inputs:t,backend:e,attrs:o}=r,{boxes:n,scores:s}=t,{maxOutputSize:a,iouThreshold:i,scoreThreshold:c,softNmsSigma:p}=o;z(n,"NonMaxSuppressionWithScore");let l=e.data.get(n.dataId).values,u=e.data.get(s.dataId).values,m=a,f=i,d=c,h=p,{selectedIndices:g,selectedScores:x}=bB(l,u,m,f,d,h);return[e.makeTensorInfo([g.length],"int32",new Int32Array(g)),e.makeTensorInfo([x.length],"float32",new Float32Array(x))]}var yS={kernelName:ma,backendName:"cpu",kernelFunc:CB};function TB(r){let{inputs:t,backend:e,attrs:o}=r,{indices:n}=t,{dtype:s,depth:a,onValue:i,offValue:c}=o;z(n,"oneHot");let p=y.sizeFromShape(n.shape),l=new Float32Array(p*a);l.fill(c);let u=e.data.get(n.dataId).values;for(let m=0;m<p;++m)u[m]>=0&&u[m]<a&&(l[m*a+u[m]]=i);return e.makeTensorInfo([...n.shape,a],s,l)}var bS={kernelName:da,backendName:"cpu",kernelFunc:TB};function tu(r){let{inputs:t,backend:e}=r,{x:o}=t;if(o.dtype==="string")throw new Error("zerosLike is not supported for string tensors");if(o.dtype==="complex64"){let n=yr({inputs:{input:o},backend:e}),s=tu({inputs:{x:n},backend:e}),a=uo({inputs:{input:o},backend:e}),i=tu({inputs:{x:a},backend:e}),c=le({inputs:{real:s,imag:i},backend:e});return e.disposeIntermediateTensorInfo(n),e.disposeIntermediateTensorInfo(s),e.disposeIntermediateTensorInfo(a),e.disposeIntermediateTensorInfo(i),c}else return Jl({backend:e,attrs:{shape:o.shape,value:0,dtype:o.dtype}})}var CS={kernelName:Qa,backendName:"cpu",kernelFunc:tu};function TS(r){let{inputs:t,backend:e}=r,{x:o}=t;if(o.dtype==="string")throw new Error("onesLike is not supported for string tensors");if(o.dtype==="complex64"){let n=yr({inputs:{input:o},backend:e}),s=TS({inputs:{x:n},backend:e}),a=uo({inputs:{input:o},backend:e}),i=tu({inputs:{x:a},backend:e}),c=le({inputs:{real:s,imag:i},backend:e});return e.disposeIntermediateTensorInfo(n),e.disposeIntermediateTensorInfo(s),e.disposeIntermediateTensorInfo(a),e.disposeIntermediateTensorInfo(i),c}else return Jl({backend:e,attrs:{shape:o.shape,value:1,dtype:o.dtype}})}var wS={kernelName:fa,backendName:"cpu",kernelFunc:TS};function yy(r){let{inputs:t,backend:e,attrs:o}=r,{axis:n}=o;if(t.length===1)return Gc({inputs:{input:t[0]},backend:e,attrs:{dim:n}});let s=t[0].shape,a=t[0].dtype;t.forEach(l=>{y.assertShapesMatch(s,l.shape,"All tensors passed to stack must have matching shapes"),y.assert(a===l.dtype,()=>"All tensors passed to stack must have matching dtypes")});let i=[],c=t.map(l=>{let u=Gc({inputs:{input:l},backend:e,attrs:{dim:n}});return i.push(u),u}),p=rs({inputs:c,backend:e,attrs:{axis:n}});return i.forEach(l=>e.disposeIntermediateTensorInfo(l)),p}var IS={kernelName:ha,backendName:"cpu",kernelFunc:yy};function wB(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{paddings:s,constantValue:a}=o;z(n,"pad");let i=s.map((b,w)=>b[0]+n.shape[w]+b[1]),c=s.map(b=>b[0]),p=e.data.get(n.dataId).values,l=y.sizeFromShape(n.shape),u=n.shape.length,m=y.computeStrides(n.shape),f=y.sizeFromShape(i),d=i.length,h=y.computeStrides(i),g=y.getTypedArrayFromDType(n.dtype,f);a!==0&&g.fill(a);for(let b=0;b<l;b++){let I=y.indexToLoc(b,u,m).map(($,R)=>$+c[R]),k=y.locToIndex(I,d,h);g[k]=p[b]}return{dataId:e.write(g,i,n.dtype),shape:i,dtype:n.dtype}}var Qm={kernelName:ga,backendName:"cpu",kernelFunc:wB};var IB=wt((r,t)=>Math.pow(r,t)),SB=$t("Pow",IB),SS={kernelName:"Pow",backendName:"cpu",kernelFunc:SB};function vB(r){let{inputs:t,backend:e,attrs:o}=r,{paramsNestedSplits:n,paramsDenseValues:s,indices:a}=t,{outputRaggedRank:i}=o,c=n.map(x=>e.data.get(x.dataId).values),p=n.map(x=>x.shape),l=e.data.get(s.dataId).values,u=e.data.get(a.dataId).values,[m,f,d]=Lm(c,p,l,s.shape,s.dtype,u,a.shape,i),h=m.map(x=>e.makeTensorInfo([x.length],"int32",x)),g=e.makeTensorInfo(d,s.dtype,f);return h.concat([g])}var vS={kernelName:Ca,backendName:"cpu",kernelFunc:vB};function NB(r){let{inputs:t,backend:e,attrs:o}=r,{shape:n,values:s,defaultValue:a,rowPartitionTensors:i}=t,{rowPartitionTypes:c}=o,p=e.data.get(n.dataId).values,l=e.data.get(s.dataId).values,u=e.data.get(a.dataId).values,m=i.map(g=>e.data.get(g.dataId).values),f=i.map(g=>g.shape),[d,h]=Mm(p,n.shape,l,s.shape,s.dtype,u,a.shape,m,f,c);return e.makeTensorInfo(d,s.dtype,h)}var NS={kernelName:Ta,backendName:"cpu",kernelFunc:NB};function kB(r){let{backend:t,attrs:e}=r,{start:o,stop:n,dtype:s,step:a}=e,i=Bm(o,n,a,s);return t.makeTensorInfo([i.length],s,i)}var kS={kernelName:wa,backendName:"cpu",kernelFunc:kB};var EB=ut(Nn,r=>1/r),ES={kernelName:Nn,backendName:"cpu",kernelFunc:EB};function $B(r){let{inputs:t,backend:e,attrs:o}=r,{images:n}=t,{alignCorners:s,halfPixelCenters:a,size:i}=o;z(n,"resizeBilinear");let c=y.computeStrides(n.shape),[p,l]=i,[u,m,f,d]=n.shape,h=e.data.get(n.dataId).values,g=new Float32Array(y.sizeFromShape([u,p,l,d])),x=[s&&p>1?m-1:m,s&&l>1?f-1:f],b=[s&&p>1?p-1:p,s&&l>1?l-1:l],w=0,I=x[0]/b[0],k=x[1]/b[1];for(let $=0;$<u;$++)for(let R=0;R<p;R++){let D;a?D=I*(R+.5)-.5:D=I*R;let _=Math.max(0,Math.floor(D)),O=D-_,L=Math.min(m-1,Math.ceil(D)),M=$*c[0]+_*c[1],B=$*c[0]+L*c[1];for(let G=0;G<l;G++){let V;a?V=k*(G+.5)-.5:V=k*G;let W=Math.max(0,Math.floor(V)),H=V-W,U=Math.min(f-1,Math.ceil(V)),q=M+W*c[2],X=B+W*c[2],Y=M+U*c[2],J=B+U*c[2];for(let Z=0;Z<d;Z++){let et=h[q+Z],Q=h[X+Z],nt=h[Y+Z],ct=h[J+Z],mt=et+(nt-et)*H,ft=Q+(ct-Q)*H,Tt=mt+(ft-mt)*O;g[w++]=Tt}}}return e.makeTensorInfo([u,p,l,d],"float32",g)}var $S={kernelName:Na,backendName:"cpu",kernelFunc:$B};function AB(r){let{inputs:t,backend:e,attrs:o}=r,{images:n,dy:s}=t,{alignCorners:a}=o;z([s,n],"resizeBilinearGrad");let i=y.computeStrides(n.shape),[c,p,l,u]=n.shape,[,m,f]=s.shape,d=new Float32Array(c*p*l*u),h=[a&&m>1?p-1:p,a&&f>1?l-1:l],g=[a&&m>1?m-1:m,a&&f>1?f-1:f],x=h[0]/g[0],b=h[1]/g[1],w=e.data.get(s.dataId).values,I=0;for(let k=0;k<c;k++){let $=k*i[0];for(let R=0;R<m;R++){let D=R*x,_=Math.floor(D),O=Math.min(Math.ceil(D),p-1),L=$+_*i[1],M=$+O*i[1],B=D-_,G=1-B;for(let V=0;V<f;V++){let W=V*b,H=Math.floor(W),U=Math.min(Math.ceil(W),l-1),q=W-H,X=1-q,Y=L+H*i[2],J=L+U*i[2],Z=M+H*i[2],et=M+U*i[2],Q=G*X,nt=G*q,ct=B*X,mt=B*q;for(let ft=0;ft<u;ft++){let Tt=w[I++];d[Y+ft]+=Tt*Q,d[J+ft]+=Tt*nt,d[Z+ft]+=Tt*ct,d[et+ft]+=Tt*mt}}}}return e.makeTensorInfo([c,l,p,u],"float32",d)}var AS={kernelName:wp,backendName:"cpu",kernelFunc:AB};function RB(r){let{inputs:t,backend:e,attrs:o}=r,{images:n}=t,{alignCorners:s,halfPixelCenters:a,size:i}=o;z(n,"resizeNearestNeighbor");let c=y.computeStrides(n.shape),[p,l]=i,[u,m,f,d]=n.shape,h=e.data.get(n.dataId).values,g=new Float32Array(u*p*l*d),x=[s&&p>1?m-1:m,s&&l>1?f-1:f],b=[s&&p>1?p-1:p,s&&l>1?l-1:l],w=x[0]/b[0],I=x[1]/b[1],k=0;for(let $=0;$<u;$++){let R=$*c[0];for(let D=0;D<p;D++){let _=a?w*(D+.5):w*D,O=Math.min(m-1,s?Math.round(_):Math.floor(_));a&&(O=Math.max(0,O));let L=R+O*c[1];for(let M=0;M<l;M++){let B=a?I*(M+.5):I*M,G=Math.min(f-1,s?Math.round(B):Math.floor(B));a&&(G=Math.max(0,G));let V=L+G*c[2];for(let W=0;W<d;W++){let H=h[V+W];g[k++]=H}}}}return e.makeTensorInfo([u,p,l,d],n.dtype,g)}var RS={kernelName:va,backendName:"cpu",kernelFunc:RB};function DB(r){let{inputs:t,backend:e,attrs:o}=r,{images:n,dy:s}=t,{alignCorners:a}=o;z([s,n],"resizeNearestNeighborGrad");let i=y.computeStrides(n.shape),c=y.computeStrides(s.shape),[p,l,u,m]=n.shape,[,f,d]=s.shape,h=new Float32Array(p*l*u*m),g=e.data.get(s.dataId).values,x=[a&&f>1?l-1:l,a&&d>1?u-1:u],b=[a&&f>1?f-1:f,a&&d>1?d-1:d],w=x[0]/b[0],I=x[1]/b[1],k=1/w,$=1/I,R=Math.ceil(k)*2+2,D=Math.ceil($)*2+2;for(let _=0;_<p;_++){let O=_*i[0];for(let L=0;L<l;L++){let M=O+L*i[1],B=Math.floor(L*k),G=Math.floor(B-R/2);for(let V=0;V<u;V++){let W=M+V*i[2],H=Math.floor(V*$),U=Math.floor(H-D/2);for(let q=0;q<m;q++){let X=0;for(let Y=0;Y<R;Y++){let J=Y+G;if(J<0||J>=f)continue;let Z=O+J*c[1],et=J*w,Q=Math.min(l-1,a?Math.round(et):Math.floor(et));if(L===Q)for(let nt=0;nt<D;nt++){let ct=nt+U;if(ct<0||ct>=d)continue;let mt=Z+ct*c[2],ft=ct*I,Tt=Math.min(u-1,a?Math.round(ft):Math.floor(ft));V===Tt&&(X+=g[mt+q])}}h[W+q]=X}}}}return e.makeTensorInfo(n.shape,n.dtype,h)}var DS={kernelName:Tp,backendName:"cpu",kernelFunc:DB};function FB(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{dims:s}=o;z(n,"reverse");let a=n.shape.length,i=y.parseAxisParam(s,n.shape);if(a===0)return Se({inputs:{x:n},backend:e});let c=new Rt(n.shape,n.dtype),p=e.bufferSync(n);for(let l=0;l<c.size;l++){let u=c.indexToLoc(l),m=u.slice();i.forEach(f=>m[f]=n.shape[f]-1-m[f]),c.set(p.get(...m),...u)}return e.makeTensorInfo(c.shape,c.dtype,c.values)}var FS={kernelName:ka,backendName:"cpu",kernelFunc:FB};var _S={kernelName:Ja,backendName:"cpu",kernelFunc:({inputs:r,attrs:t,backend:e})=>{let{image:o}=r,{radians:n,fillValue:s,center:a}=t,i=e,c=y.getTypedArrayFromDType(o.dtype,y.sizeFromShape(o.shape)),[p,l,u,m]=o.shape,[f,d]=v.getImageCenter(a,l,u),h=255,g=Math.sin(n),x=Math.cos(n),b=i.data.get(o.dataId).values;for(let I=0;I<p;I++){let k=I*u*l*m;for(let $=0;$<l;$++){let R=$*(u*m);for(let D=0;D<u;D++){let _=D*m;for(let O=0;O<m;O++){let L=[p,$,D,O],M=L[2],B=L[1],G=(M-f)*x-(B-d)*g,V=(M-f)*g+(B-d)*x;G=Math.round(G+f),V=Math.round(V+d);let W=s;if(typeof s!="number"&&(O===3?W=h:W=s[O]),G>=0&&G<u&&V>=0&&V<l){let U=V*(u*m),q=G*m,X=k+U+q+O;W=b[X]}let H=k+R+_+O;c[H]=W}}}}return{dataId:i.write(c,o.shape,o.dtype),shape:o.shape,dtype:o.dtype}}};var _B=ut($n,r=>{let t=Math.floor(r);return r-t<.5?Math.floor(r):r-t>.5?Math.ceil(r):t%2===0?t:t+1}),OS={kernelName:$n,backendName:"cpu",kernelFunc:_B};function OB(r){let{inputs:t,backend:e,attrs:o}=r,{indices:n,updates:s}=t,{shape:a}=o,{sliceRank:i,numUpdates:c,sliceSize:p,strides:l,outputSize:u}=v.calculateShapes(s,n,a),m=!0,f=e.bufferSync(n),d=e.bufferSync(s),h=Lo(f,d,a,u,p,c,i,l,0,m);return e.makeTensorInfo(a,h.dtype,h.values)}var PS={kernelName:Ea,backendName:"cpu",kernelFunc:OB};function PB(r,t){let e=0,o=r.length,n=0;for(;e<o;)n=Math.floor((e+o)/2),r[n]<t?e=n+1:o=n;return o}function LB(r,t){let e=0,o=r.length,n=0;for(;e<o;)n=Math.floor((e+o)/2),r[n]<=t?e=n+1:o=n;return o}function LS(r,t,e,o,n,s){let a=y.getArrayFromDType("int32",e*n);for(let i=0;i<e;++i){let c=r.slice(i*o,(i+1)*o),p=i*n;for(let l=0;l<n;++l)a[p+l]=s==="left"?PB(c,t[l+p]):LB(c,t[l+p])}return a}function MB(r){let{inputs:t,backend:e,attrs:o}=r,{sortedSequence:n,values:s}=t,{side:a}=o,i=e.data.get(n.dataId).values,c=e.data.get(s.dataId).values,p=LS(i,c,n.shape[0],n.shape[1],s.shape[1],a);return e.makeTensorInfo(s.shape,"int32",p)}var MS={kernelName:$a,backendName:"cpu",kernelFunc:MB};function BB(r){let{inputs:t,backend:e}=r,{condition:o,t:n,e:s}=t;z([o,n,s],"select");let a=o.shape.length,i=e.data.get(o.dataId).values,c=e.data.get(n.dataId).values,p=e.data.get(s.dataId).values,l=Qt(n.dtype,s.dtype),u=y.makeZerosTypedArray(y.sizeFromShape(n.shape),l),m=0,f=a===0||a>1||n.shape.length===1?1:y.sizeFromShape(n.shape.slice(1));for(let d=0;d<i.length;d++)for(let h=0;h<f;h++)i[d]===1?u[m++]=c[d]:u[m++]=p[d];return e.makeTensorInfo(n.shape,l,u)}var BS={kernelName:Aa,backendName:"cpu",kernelFunc:BB};var VB=v.SELU_SCALEALPHA,GB=v.SELU_SCALE,UB=ut(Rn,r=>r>=0?GB*r:VB*(Math.exp(r)-1)),VS={kernelName:Rn,backendName:"cpu",kernelFunc:UB};var zB=ut(Fn,r=>r<0?-1:r>0?1:0),GS={kernelName:Fn,backendName:"cpu",kernelFunc:zB};var WB=ut("Sin",r=>Math.sin(r)),US={kernelName:"Sin",backendName:"cpu",kernelFunc:WB};var HB=ut(Dn,r=>Math.sinh(r)),zS={kernelName:Dn,backendName:"cpu",kernelFunc:HB};var qB=11920928955078125e-23,WS=Math.log(qB)+2,KB=ut(On,r=>{let t=r>-WS,e=r<WS,o=Math.exp(r),n;return e?n=o:t?n=r:n=Math.log(1+o),n}),HS={kernelName:On,backendName:"cpu",kernelFunc:KB};function jB(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{blockShape:s,paddings:a}=o;z([n],"spaceToBatchND");let i=y.sizeFromShape(s),c=[[0,0]];c.push(...a);for(let $=1+s.length;$<n.shape.length;++$)c.push([0,0]);let p=Qm.kernelFunc({inputs:{x:n},backend:e,attrs:{paddings:c,constantValue:0}}),l=v.getReshaped(p.shape,s,i,!1),u=v.getPermuted(l.length,s.length,!1),m=v.getReshapedPermuted(p.shape,s,i,!1),h=bt({inputs:{x:p},backend:e,attrs:{shape:l}}),b=Ut({inputs:{x:h},backend:e,attrs:{perm:u}}),k=bt({inputs:{x:b},backend:e,attrs:{shape:m}});return e.disposeIntermediateTensorInfo(p),e.disposeIntermediateTensorInfo(h),e.disposeIntermediateTensorInfo(b),k}var qS={kernelName:Fa,backendName:"cpu",kernelFunc:jB};function XB(r){let{inputs:t,backend:e}=r,{indices:o,values:n,denseShape:s,defaultValue:a}=t;if(s.shape.length!==1)throw new Error(`Dense shape must be a vector, saw:
        ${s.shape}`);if(o.shape.length!==2)throw new Error(`Indices must be a matrix, saw:
        ${o.shape}`);if(n.shape.length!==1)throw new Error(`Values must be a vector, saw:
        ${n.shape}`);if(a.shape.length!==0)throw new Error(`Default value must be a scalar, saw:
        ${a.shape}`);let i=e.data.get(o.dataId).values,c=e.data.get(n.dataId).values,p=e.data.get(s.dataId).values,l=e.data.get(a.dataId).values[0],[u,m,f,d,h]=Vm(i,o.shape,o.dtype,c,n.dtype,p,l);return[e.makeTensorInfo(m,o.dtype,u),e.makeTensorInfo([m[0]],n.dtype,f),e.makeTensorInfo([d.length],"bool",new Uint8Array(d.map(g=>Number(g)))),e.makeTensorInfo([h.length],o.dtype,new Int32Array(h))]}var KS={kernelName:Pa,backendName:"cpu",kernelFunc:XB};function YB(r){let{inputs:t,backend:e}=r,{inputIndices:o,inputShape:n,newShape:s}=t;if(o.shape.length!==2)throw new Error(`Input indices should be a matrix but received shape
        ${o.shape}`);if(n.shape.length!==1)throw new Error(`Input shape should be a vector but received shape
        ${n.shape}`);if(s.shape.length!==1)throw new Error(`Target shape should be a vector but received shape ${s.shape}`);let a=Array.from(e.data.get(n.dataId).values),i=e.data.get(o.dataId).values,c=Array.from(e.data.get(s.dataId).values),[p,l,u]=Gm(i,o.shape,o.dtype,a,c);return[e.makeTensorInfo(l,o.dtype,p),e.makeTensorInfo([u.length],s.dtype,new Int32Array(u))]}var jS={kernelName:La,backendName:"cpu",kernelFunc:YB};function ZB(r){let{inputs:t,backend:e}=r,{data:o,indices:n,segmentIds:s}=t;if(o.shape.length<1)throw new Error("Data should be at least 1 dimensional but received scalar");if(n.shape.length!==1)throw new Error(`Indices should be a vector but received shape
          ${n.shape}`);if(s.shape.length!==1)throw new Error(`Segment ids should be a vector but received shape
          ${s.shape}`);if(n.shape[0]!==s.shape[0])throw new Error("segmentIds and indices should have same size.");let a=e.data.get(o.dataId).values,i=e.data.get(n.dataId).values,c=e.data.get(s.dataId).values,[p,l]=Bc(a,o.shape,o.dtype,i,c,!0);return e.makeTensorInfo(l,o.dtype,p)}var XS={kernelName:Ma,backendName:"cpu",kernelFunc:ZB};function QB(r){let{inputs:t,backend:e}=r,{data:o,indices:n,segmentIds:s}=t;if(o.shape.length<1)throw new Error("Data should be at least 1 dimensional but received scalar");if(n.shape.length!==1)throw new Error(`Indices should be a vector but received shape
         ${n.shape}`);if(s.shape.length!==1)throw new Error(`Segment ids should be a vector but received shape
         ${s.shape}`);if(n.shape[0]!==s.shape[0])throw new Error("segmentIds and indices should have same size.");let a=e.data.get(o.dataId).values,i=e.data.get(n.dataId).values,c=e.data.get(s.dataId).values,[p,l]=Bc(a,o.shape,o.dtype,i,c);return e.makeTensorInfo(l,o.dtype,p)}var YS={kernelName:Ba,backendName:"cpu",kernelFunc:QB};function JB(r){let{inputs:t,backend:e,attrs:o}=r,{sparseIndices:n,sparseValues:s,defaultValue:a}=t,{outputShape:i}=o,{sliceRank:c,numUpdates:p,sliceSize:l,strides:u,outputSize:m}=v.calculateShapes(s,n,i),f=!1,d=e.bufferSync(n),h;switch(s.dtype){case"bool":{let g=e.bufferSync(s),x=!!e.data.get(a.dataId).values[0];h=Lo(d,g,i,m,l,p,c,u,x,f);break}case"float32":{let g=e.bufferSync(s),x=e.data.get(a.dataId).values[0];h=Lo(d,g,i,m,l,p,c,u,x,f);break}case"int32":{let g=e.bufferSync(s),x=e.data.get(a.dataId).values[0];h=Lo(d,g,i,m,l,p,c,u,x,f);break}case"string":{let g=e.bufferSync(s),x=y.decodeString(e.data.get(a.dataId).values[0]);h=Lo(d,g,i,m,l,p,c,u,x,f);break}default:throw new Error(`Unsupported type ${s.dtype}`)}return e.makeTensorInfo(i,h.dtype,h.values)}var ZS={kernelName:Va,backendName:"cpu",kernelFunc:JB};function tV(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{numOrSizeSplits:s,axis:a}=o,i=y.parseAxisParam(a,n.shape)[0],c=v.prepareSplitSize(n,s,i),p=new Array(n.shape.length).fill(0),l=n.shape.slice();return c.map(u=>{let m=[...l];m[i]=u;let f=wr({inputs:{x:n},backend:e,attrs:{begin:p,size:m}});return p[i]+=u,f})}var QS={kernelName:_a,backendName:"cpu",kernelFunc:tV};var JS={kernelName:Ip,backendName:"cpu",kernelFunc:({inputs:r,backend:t})=>{let{x:e}=r,o=t;z(e,"square");let n=o.data.get(e.dataId).values,s=new Float32Array(n.length);for(let i=0;i<n.length;++i){let c=n[i];s[i]=c*c}return{dataId:o.write(s,e.shape,e.dtype),shape:e.shape,dtype:e.dtype}}};var eV=ut(Bn,(r,t)=>{let e=t;return isNaN(r)?NaN:r>0?1:e.alpha}),tv={kernelName:Bn,backendName:"cpu",kernelFunc:eV};function rV(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{begin:s,end:a,strides:i,beginMask:c,endMask:p,ellipsisMask:l,newAxisMask:u,shrinkAxisMask:m}=o;z(n,"stridedSlice");let{finalShapeSparse:f,finalShape:d,isIdentity:h,sliceDim0:g,isSimpleSlice:x,begin:b,end:w,strides:I}=ce.sliceInfo(n.shape,s,a,i,c,p,l,u,m),k;if(h)k=bt({inputs:{x:n},backend:e,attrs:{shape:d}});else if(g||x){y.assert(n.shape.length>=1,()=>`Input must have rank at least 1, got: ${n.shape.length}`);let $=ce.computeOutShape(b,w,I),R=wr({inputs:{x:n},backend:e,attrs:{begin:b,size:$}});k=bt({inputs:{x:R},backend:e,attrs:{shape:d}}),e.disposeIntermediateTensorInfo(R)}else{let $=e.bufferSync(n),R=Um(f,$,I,b);k=e.makeTensorInfo(d,R.dtype,R.values)}return k}var ev={kernelName:Ga,backendName:"cpu",kernelFunc:rV};function oV(r){let{inputs:t,backend:e,attrs:o}=r,{separator:n,nGramWidths:s,leftPad:a,rightPad:i,padWidth:c,preserveShortSequences:p}=o,{data:l,dataSplits:u}=t,m=e.data.get(l.dataId).values,f=e.data.get(u.dataId).values,[d,h]=zm(m,f,n,s,a,i,c,p);return[e.makeTensorInfo([d.length],"string",d),e.makeTensorInfo(u.shape,"int32",h)]}var rv={kernelName:Ua,backendName:"cpu",kernelFunc:oV};function nV(r){let{inputs:t,backend:e,attrs:o}=r,{skipEmpty:n}=o,{input:s,delimiter:a}=t;if(s.dtype!=="string")throw new Error("Input must be of datatype string");if(s.shape.length!==1)throw new Error(`Input must be a vector, got shape: ${s.shape}`);if(a.shape.length!==0)throw new Error(`Delimiter must be a scalar, got shape: ${a.shape}`);let i=e.data.get(s.dataId).values,c=e.data.get(a.dataId).values[0],[p,l,u]=Wm(i,c,n),m=l.length;return[e.makeTensorInfo([m,2],"int32",p),e.makeTensorInfo([m],"string",l),e.makeTensorInfo([2],"int32",new Int32Array(u))]}var ov={kernelName:za,backendName:"cpu",kernelFunc:nV};function sV(r){let{inputs:t,backend:e,attrs:o}=r,{numBuckets:n}=o,{input:s}=t;if(s.dtype!=="string")throw new Error("Input must be of datatype string");if(n<=0)throw new Error("Number of buckets must be at least 1");let a=e.data.get(s.dataId).values,i=Hm(a,n);return e.makeTensorInfo(s.shape,"int32",i)}var nv={kernelName:Wa,backendName:"cpu",kernelFunc:sV};var aV=ut("Tan",r=>Math.tan(r)),sv={kernelName:"Tan",backendName:"cpu",kernelFunc:aV};var iV=ut(Mn,r=>Math.tanh(r)),av={kernelName:Mn,backendName:"cpu",kernelFunc:iV};function cV(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{reps:s}=o;z(n,"tile");let a=qm(e.bufferSync(n),s);return e.makeTensorInfo(a.shape,a.dtype,a.values)}var iv={kernelName:wo,backendName:"cpu",kernelFunc:cV};function pV(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{k:s,sorted:a}=o;z(n,"topk");let i=e.data.get(n.dataId).values,[c,p]=Km(i,n.shape,n.dtype,s,a);return[e.makeTensorInfo(c.shape,c.dtype,c.values),e.makeTensorInfo(p.shape,p.dtype,p.values)]}var cv={kernelName:Ka,backendName:"cpu",kernelFunc:pV};function lV(r){let{inputs:t,attrs:e,backend:o}=r,{image:n,transforms:s}=t,{interpolation:a,fillMode:i,fillValue:c,outputShape:p}=e,[l,u,m,f]=n.shape,[d,h]=p??[u,m],g=[l,d,h,f],x=y.computeStrides(n.shape),b=x[0],w=x[1],I=x[2],k=y.computeStrides(g),$=k[0],R=k[1],D=k[2],_=y.getTypedArrayFromDType(n.dtype,y.sizeFromShape(g));_.fill(c);let O=o.data.get(n.dataId).values,L=o.data.get(s.dataId).values;for(let B=0;B<l;++B){let G=s.shape[0]===1?L:L.subarray(B*8,B*8+8);for(let V=0;V<d;++V)for(let W=0;W<h;++W)for(let H=0;H<f;++H){let U,q=G[6]*W+G[7]*V+1;if(q===0)continue;let X=(G[0]*W+G[1]*V+G[2])/q,Y=(G[3]*W+G[4]*V+G[5])/q,J=pv(X,m,i),Z=pv(Y,u,i);switch(a){case"nearest":U=hV(O,u,m,b,w,I,B,Z,J,H,c);break;case"bilinear":U=gV(O,u,m,b,w,I,B,Z,J,H,c);break;default:throw new Error(`Error in Transform: Expect 'nearest' or 'bilinear', but got ${a}`)}let et=B*$+V*R+W*D+H;_[et]=U}return o.makeTensorInfo(g,n.dtype,_)}return{dataId:o.write(_,g,n.dtype),shape:n.shape,dtype:n.dtype}}var lv={kernelName:ja,backendName:"cpu",kernelFunc:lV};function pv(r,t,e){switch(e){case"reflect":return uV(r,t);case"wrap":return mV(r,t);case"nearest":return dV(r,t);default:return fV(r,t)}}function uV(r,t){let e=r;if(e<0)if(t<=1)e=0;else{let o=2*t;e<o&&(e=o*Math.trunc(-e/o)+e),e=e<-t?e+o:-e-1}else if(e>t-1)if(t<=1)e=0;else{let o=2*t;e-=o*Math.trunc(e/o),e>=t&&(e=o-e-1)}return y.clamp(0,e,t-1)}function mV(r,t){let e=r;if(e<0)if(t<=1)e=0;else{let o=t-1;e+=t*(Math.trunc(-e/o)+1)}else if(e>t-1)if(t<=1)e=0;else{let o=t-1;e-=t*Math.trunc(e/o)}return y.clamp(0,e,t-1)}function fV(r,t){return r}function dV(r,t){return y.clamp(0,r,t-1)}function eu(r,t,e,o,n,s,a,i,c,p,l){let u=a*o+i*n+c*s+p;return 0<=i&&i<t&&0<=c&&c<e?r[u]:l}function hV(r,t,e,o,n,s,a,i,c,p,l){let u=Math.round(i),m=Math.round(c);return eu(r,t,e,o,n,s,a,u,m,p,l)}function gV(r,t,e,o,n,s,a,i,c,p,l){let u=Math.floor(i),m=Math.floor(c),f=u+1,d=m+1,h=(d-c)*eu(r,t,e,o,n,s,a,u,m,p,l)+(c-m)*eu(r,t,e,o,n,s,a,u,d,p,l),g=(d-c)*eu(r,t,e,o,n,s,a,f,m,p,l)+(c-m)*eu(r,t,e,o,n,s,a,f,d,p,l);return(f-i)*h+(i-u)*g}function xV(r){let{inputs:t,attrs:e,backend:o}=r,{axis:n}=e,{x:s}=t;z(s,"unique");let a=o.data.get(s.dataId).values,{outputValues:i,outputShape:c,indices:p}=jm(a,n,s.shape,s.dtype);return[o.makeTensorInfo(c,s.dtype,i),o.makeTensorInfo([p.length],"int32",p)]}var uv={kernelName:Xa,backendName:"cpu",kernelFunc:xV};function yV(r){let{inputs:t,backend:e,attrs:o}=r,{value:n}=t,{axis:s}=o;s<0&&(s+=n.shape.length);let a=n.shape.length,i=n.shape[s],c=new Array(a-1),p=0;for(let f=0;f<a;f++)f!==s&&(c[p++]=n.shape[f]);let l=new Array(a).fill(0),u=n.shape.slice();u[s]=1;let m=new Array(i);for(let f=0;f<m.length;f++){l[s]=f;let d=wr({inputs:{x:n},backend:e,attrs:{begin:l,size:u}});m[f]=bt({inputs:{x:d},backend:e,attrs:{shape:c}}),e.disposeIntermediateTensorInfo(d)}return m}var mv={kernelName:Ya,backendName:"cpu",kernelFunc:yV};function bV(r){let{inputs:t,backend:e,attrs:o}=r,{x:n,segmentIds:s}=t,{numSegments:a}=o;z(n,"unsortedSegmentSum");let i=n.shape.length,c=s.shape.length,p=[],l=[],u=i-c,m=s;for(let d=0;d<u;++d){let h=Gc({inputs:{input:m},backend:e,attrs:{dim:d+1}});m=h,l.push(h)}for(let d=0;d<a;++d){let h=y.createScalarValue(d,"int32"),g=e.makeTensorInfo([],"int32",h),x=Mx({inputs:{a:g,b:m},backend:e}),b=br({inputs:{x},backend:e,attrs:{dtype:"float32"}}),w=Gi({inputs:{a:b,b:n},backend:e}),I=Mo({inputs:{x:w},backend:e,attrs:{axis:0,keepDims:!1}});p.push(I),l.push(g),l.push(x),l.push(b),l.push(w),l.push(I)}let f=yy({inputs:p,backend:e,attrs:{axis:0}});return l.forEach(d=>e.disposeIntermediateTensorInfo(d)),f}var fv={kernelName:Za,backendName:"cpu",kernelFunc:bV};var CV=[Vw,QT,Gw,Uw,ow,zw,Ww,Hw,qw,Kw,jw,Xw,Yw,Zw,Qw,tI,eI,rI,oI,Bw,nI,sI,aI,iI,rw,nw,cI,JT,pI,uI,mI,fI,dI,hI,gI,xI,yI,bI,CI,TI,wI,II,SI,vI,NI,kI,EI,$I,AI,RI,FI,Fw,_I,sw,OI,aw,PI,iw,LI,MI,BI,cw,VI,GI,UI,zI,WI,pw,lw,tw,HI,lI,qI,KI,jI,_w,uw,mw,XI,fw,YI,ZI,QI,JI,tS,eS,rS,dw,oS,nS,sS,aS,cS,pS,lS,hw,uS,mS,hS,gw,xw,gS,xS,yS,yw,bS,wS,IS,Qm,SS,Ow,Cw,vS,NS,kS,ew,Ql,ES,Pw,Lw,Mw,$S,AS,RS,DS,FS,_S,OS,Sw,PS,MS,BS,VS,Nw,GS,US,zS,kw,fS,HS,qS,KS,jS,XS,YS,ZS,QS,$w,JS,Aw,tv,ev,rv,ov,nv,Rw,DI,sv,av,iv,cv,lv,bw,uv,mv,fv,CS];for(let r of CV)yc(r);var zi={},Jm={alpha:!1,antialias:!1,premultipliedAlpha:!1,preserveDrawingBuffer:!1,depth:!1,stencil:!1,failIfMajorPerformanceCaveat:!0};function dv(r,t){zi[r]=t}function Ze(r,t){if(!(r in zi)||t!=null){let o=wV(r,t);if(o!==null)zi[r]=o;else return console.log("Could not get context for WebGL version",r),null}let e=zi[r];return e==null||e.isContextLost()?(delete zi[r],Ze(r)):(e.disable(e.DEPTH_TEST),e.disable(e.STENCIL_TEST),e.disable(e.BLEND),e.disable(e.DITHER),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SAMPLE_COVERAGE),e.enable(e.SCISSOR_TEST),e.enable(e.CULL_FACE),e.cullFace(e.BACK),zi[r])}function TV(r){if(typeof OffscreenCanvas<"u"&&r===2)return new OffscreenCanvas(300,150);if(typeof document<"u")return document.createElement("canvas");throw new Error("Cannot create a canvas in this context")}function wV(r,t){if(r!==1&&r!==2)throw new Error("Cannot get WebGL rendering context, WebGL is disabled.");let e=t??TV(r);return e.addEventListener("webglcontextlost",o=>{o.preventDefault(),delete zi[r]},!1),F().getBool("SOFTWARE_WEBGL_ENABLED")&&(Jm.failIfMajorPerformanceCaveat=!1),r===1?e.getContext("webgl",Jm)||e.getContext("experimental-webgl",Jm):e.getContext("webgl2",Jm)}var os;(function(r){r[r.DENSE=0]="DENSE",r[r.SHARED_BATCH=1]="SHARED_BATCH"})(os||(os={}));var ve;(function(r){r[r.RENDER=0]="RENDER",r[r.UPLOAD=1]="UPLOAD",r[r.PIXELS=2]="PIXELS",r[r.DOWNLOAD=3]="DOWNLOAD"})(ve||(ve={}));var xe;(function(r){r[r.UNPACKED_FLOAT16=0]="UNPACKED_FLOAT16",r[r.UNPACKED_FLOAT32=1]="UNPACKED_FLOAT32",r[r.PACKED_4X1_UNSIGNED_BYTE=2]="PACKED_4X1_UNSIGNED_BYTE",r[r.PACKED_2X2_FLOAT32=3]="PACKED_2X2_FLOAT32",r[r.PACKED_2X2_FLOAT16=4]="PACKED_2X2_FLOAT16"})(xe||(xe={}));function Wi(r,t){return[t,r]}function hv(r,t){return r*t}function ru(r){let t=y.sizeFromShape(r),e=Math.ceil(t/4);return y.sizeToSquarishShape(e)}function mo(r,t){return[Math.max(1,Math.ceil(t/2)),Math.max(1,Math.ceil(r/2))]}function gv(r,t){let[e,o]=mo(r,t);return e*o*4}function ou(r,t){let e=r,o,n,s,a,i,c,p,l,u,m;return F().getNumber("WEBGL_VERSION")===2?(o=e.R32F,n=e.R16F,s=e.RGBA16F,a=e.RGBA32F,i=e.RED,p=4,l=1,u=e.HALF_FLOAT,m=e.FLOAT,c=e.RGBA8):(o=r.RGBA,n=r.RGBA,s=r.RGBA,a=e.RGBA,i=r.RGBA,p=4,l=4,u=t!=null?t.HALF_FLOAT_OES:null,m=r.FLOAT,c=r.RGBA),{internalFormatFloat:o,internalFormatHalfFloat:n,internalFormatPackedHalfFloat:s,internalFormatPackedFloat:a,textureFormatFloat:i,downloadTextureFormat:c,downloadUnpackNumChannels:p,defaultNumChannels:l,textureTypeHalfFloat:u,textureTypeFloat:m}}function at(r,t){let e=t();return F().getBool("DEBUG")&&IV(r),e}function IV(r){let t=r.getError();if(t!==r.NO_ERROR)throw new Error("WebGL Error: "+NV(r,t))}var SV=596e-10,vV=65504;function xv(r){return!!(F().getBool("WEBGL_RENDER_FLOAT32_ENABLED")||r===0||SV<Math.abs(r)&&Math.abs(r)<vV)}function NV(r,t){switch(t){case r.NO_ERROR:return"NO_ERROR";case r.INVALID_ENUM:return"INVALID_ENUM";case r.INVALID_VALUE:return"INVALID_VALUE";case r.INVALID_OPERATION:return"INVALID_OPERATION";case r.INVALID_FRAMEBUFFER_OPERATION:return"INVALID_FRAMEBUFFER_OPERATION";case r.OUT_OF_MEMORY:return"OUT_OF_MEMORY";case r.CONTEXT_LOST_WEBGL:return"CONTEXT_LOST_WEBGL";default:return`Unknown error code ${t}`}}function nu(r,t){return Bo(r,()=>r.getExtension(t),'Extension "'+t+'" not supported on this browser.')}function yv(r,t){let e=Bo(r,()=>r.createShader(r.VERTEX_SHADER),"Unable to create vertex WebGLShader.");if(at(r,()=>r.shaderSource(e,t)),at(r,()=>r.compileShader(e)),r.getShaderParameter(e,r.COMPILE_STATUS)===!1)throw console.log(r.getShaderInfoLog(e)),new Error("Failed to compile vertex shader.");return e}function bv(r,t){let e=Bo(r,()=>r.createShader(r.FRAGMENT_SHADER),"Unable to create fragment WebGLShader.");if(at(r,()=>r.shaderSource(e,t)),at(r,()=>r.compileShader(e)),F().get("ENGINE_COMPILE_ONLY"))return e;if(r.getShaderParameter(e,r.COMPILE_STATUS)===!1)throw Iy(t,r.getShaderInfoLog(e)),new Error("Failed to compile fragment shader.");return e}var kV=/ERROR: [0-9]+:([0-9]+):/g;function Iy(r,t){let e=kV.exec(t);if(e==null){console.log(`Couldn't parse line number in error: ${t}`),console.log(r);return}let o=+e[1],n=r.split(`
`),s=n.length.toString().length+2,a=n.map((u,m)=>y.rightPad((m+1).toString(),s)+u),i=0;for(let u=0;u<a.length;u++)i=Math.max(a[u].length,i);let c=a.slice(0,o-1),p=a.slice(o-1,o),l=a.slice(o);console.log(c.join(`
`)),console.log(t.split(`
`)[0]),console.log(`%c ${y.rightPad(p[0],i)}`,"border:1px solid red; background-color:#e3d2d2; color:#a61717"),console.log(l.join(`
`))}function Cv(r){return Bo(r,()=>r.createProgram(),"Unable to create WebGLProgram.")}function Tv(r,t){if(at(r,()=>r.linkProgram(t)),!F().get("ENGINE_COMPILE_ONLY")&&r.getProgramParameter(t,r.LINK_STATUS)===!1)throw console.log(r.getProgramInfoLog(t)),new Error("Failed to link vertex and fragment shaders.")}function ef(r,t){if(at(r,()=>r.validateProgram(t)),r.getProgramParameter(t,r.VALIDATE_STATUS)===!1)throw console.log(r.getProgramInfoLog(t)),new Error("Shader program validation failed.")}function wv(r,t){let e=Bo(r,()=>r.createBuffer(),"Unable to create WebGLBuffer");return at(r,()=>r.bindBuffer(r.ARRAY_BUFFER,e)),at(r,()=>r.bufferData(r.ARRAY_BUFFER,t,r.STATIC_DRAW)),e}function Iv(r,t){let e=Bo(r,()=>r.createBuffer(),"Unable to create WebGLBuffer");return at(r,()=>r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e)),at(r,()=>r.bufferData(r.ELEMENT_ARRAY_BUFFER,t,r.STATIC_DRAW)),e}function Sv(r){return Bo(r,()=>r.createTexture(),"Unable to create WebGLTexture.")}function vv(r,t){let e=F().getNumber("WEBGL_MAX_TEXTURE_SIZE");if(r<=0||t<=0){let o=`[${r}x${t}]`;throw new Error("Requested texture size "+o+" is invalid.")}if(r>e||t>e){let o=`[${r}x${t}]`,n=`[${e}x${e}]`;throw new Error("Requested texture size "+o+" greater than WebGL maximum on this browser / GPU "+n+".")}}function Nv(r){return Bo(r,()=>r.createFramebuffer(),"Unable to create WebGLFramebuffer.")}function Sy(r,t,e,o,n,s,a){let i=r.getAttribLocation(t,e);return i===-1?!1:(at(r,()=>r.bindBuffer(r.ARRAY_BUFFER,o)),at(r,()=>r.vertexAttribPointer(i,n,r.FLOAT,!1,s,a)),at(r,()=>r.enableVertexAttribArray(i)),!0)}function EV(r,t,e){AV(r,e),at(r,()=>r.activeTexture(r.TEXTURE0+e)),at(r,()=>r.bindTexture(r.TEXTURE_2D,t))}function kv(r,t,e){return Bo(r,()=>r.getUniformLocation(t,e),'uniform "'+e+'" not present in program.')}function Ev(r,t,e){return r.getUniformLocation(t,e)}function $v(r,t,e,o){at(r,()=>EV(r,t,o)),at(r,()=>r.uniform1i(e,o))}function rf(r,t,e){at(r,()=>r.bindFramebuffer(r.FRAMEBUFFER,e)),at(r,()=>r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,t,0))}function vy(r,t){at(r,()=>r.bindFramebuffer(r.FRAMEBUFFER,t)),at(r,()=>r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,null,0))}function su(r){let t=r.checkFramebufferStatus(r.FRAMEBUFFER);if(t!==r.FRAMEBUFFER_COMPLETE)throw new Error("Error binding framebuffer: "+$V(r,t))}function $V(r,t){switch(t){case r.FRAMEBUFFER_INCOMPLETE_ATTACHMENT:return"FRAMEBUFFER_INCOMPLETE_ATTACHMENT";case r.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT:return"FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT";case r.FRAMEBUFFER_INCOMPLETE_DIMENSIONS:return"FRAMEBUFFER_INCOMPLETE_DIMENSIONS";case r.FRAMEBUFFER_UNSUPPORTED:return"FRAMEBUFFER_UNSUPPORTED";default:return`unknown error ${t}`}}function Bo(r,t,e){let o=at(r,()=>t());if(o==null)throw new Error(e);return o}function AV(r,t){let e=r.MAX_COMBINED_TEXTURE_IMAGE_UNITS-1,o=t+r.TEXTURE0;if(o<r.TEXTURE0||o>e){let n=`[gl.TEXTURE0, gl.TEXTURE${e}]`;throw new Error(`textureUnit must be in ${n}.`)}}function ns(r,t=2){return y.sizeFromShape(r.slice(0,r.length-t))}function ss(r){if(r.length===0)throw Error("Cannot get rows and columns of an empty shape array.");return[r.length>1?r[r.length-2]:1,r[r.length-1]]}function of(r){let t=[1,1,1];return r.length===0||r.length===1&&r[0]===1||(t=[ns(r),...ss(r)]),t}function Av(r,t=!1){let e=F().getNumber("WEBGL_MAX_TEXTURE_SIZE"),o=F().getNumber("WEBGL_MAX_SIZE_FOR_NARROW_TEXTURE");o===1/0&&F().getBool("WEBGL_AUTO_SQUARIFY_NARROW_TEXTURE_SHAPE")&&(o=e/2),t&&(e=e*2,o=o*2,r=r.map((i,c)=>c>=r.length-2?y.nearestLargerEven(r[c]):r[c]),r.length===1&&(r=[2,r[0]])),r.length!==2&&(r=y.squeezeShape(r).newShape);let n=y.sizeFromShape(r),s=null;r.length<=1&&n<=e?s=[1,n]:r.length===2&&r[0]<=e&&r[1]<=e?s=r:r.length===3&&r[0]*r[1]<=e&&r[2]<=e?s=[r[0]*r[1],r[2]]:r.length===3&&r[0]<=e&&r[1]*r[2]<=e?s=[r[0],r[1]*r[2]]:r.length===4&&r[0]*r[1]*r[2]<=e&&r[3]<=e?s=[r[0]*r[1]*r[2],r[3]]:r.length===4&&r[0]<=e&&r[1]*r[2]*r[3]<=e&&(s=[r[0],r[1]*r[2]*r[3]]);let a=s!=null&&Math.max(...s)>o&&Math.min(...s)<=(t?2:1)&&Math.min(...s)>0;if(s==null||a)if(t){let i=ns(r),c=2,p=2;r.length&&([c,p]=ss(r)),n=i*(c/2)*(p/2),s=y.sizeToSquarishShape(n).map(l=>l*2)}else s=y.sizeToSquarishShape(n);return s}function tf(r){return r%2===0}function Hi(r,t){if(r=r.slice(-2),t=t.slice(-2),y.arraysEqual(r,t)||!r.length||!t.length||r[0]===0||r[1]===0||t[0]===0||t[1]===0)return!0;if(r.length!==t.length){let e=r.slice(-1)[0],o=t.slice(-1)[0];if(e===o||tf(e)&&tf(o)&&(r[0]===1||t[0]===1))return!0}return r[1]===t[1]&&tf(r[0])&&tf(t[0])}var Cy,Ty;function Rv(r){if(Cy==null){let t=Ze(r);Cy=t.getParameter(t.MAX_TEXTURE_SIZE)}return Cy}function Dv(r){if(Ty==null){let t=Ze(r);Ty=t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS)}return Math.min(16,Ty)}function Fv(r){if(r===0)return 0;let t,e=Ze(r);return ar(e,"EXT_disjoint_timer_query_webgl2")&&r===2?t=2:ar(e,"EXT_disjoint_timer_query")?t=1:t=0,t}function ar(r,t){return r.getExtension(t)!=null}function Ny(r){try{if(Ze(r)!=null)return!0}catch(t){return console.log("Error when getting WebGL context: ",t),!1}return!1}function _v(r){if(r===0)return!1;let t=Ze(r);if(r===1){if(!ar(t,"OES_texture_float"))return!1}else if(!ar(t,"EXT_color_buffer_float"))return!1;return wy(t)}function Ov(r){if(r===0)return!1;let t=Ze(r);if(r===1){if(!ar(t,"OES_texture_float")||!ar(t,"WEBGL_color_buffer_float"))return!1}else{if(ar(t,"EXT_color_buffer_float"))return wy(t);let o="EXT_color_buffer_half_float";if(ar(t,o)){let n=t.getExtension(o);return RV(t,n)}return!1}return wy(t)}function wy(r){let t=ou(r),e=r.createTexture();r.bindTexture(r.TEXTURE_2D,e),r.texImage2D(r.TEXTURE_2D,0,t.internalFormatFloat,1,1,0,t.textureFormatFloat,t.textureTypeFloat,null);let s=r.createFramebuffer();r.bindFramebuffer(r.FRAMEBUFFER,s),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,e,0);let a=r.checkFramebufferStatus(r.FRAMEBUFFER)===r.FRAMEBUFFER_COMPLETE;return r.bindTexture(r.TEXTURE_2D,null),r.bindFramebuffer(r.FRAMEBUFFER,null),r.deleteTexture(e),r.deleteFramebuffer(s),a}function RV(r,t){let e=ou(r,t),o=r.createTexture();r.bindTexture(r.TEXTURE_2D,o),r.texImage2D(r.TEXTURE_2D,0,e.internalFormatHalfFloat,1,1,0,e.textureFormatFloat,e.textureTypeHalfFloat,null);let a=r.createFramebuffer();r.bindFramebuffer(r.FRAMEBUFFER,a),r.framebufferTexture2D(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,o,0);let i=r.checkFramebufferStatus(r.FRAMEBUFFER)===r.FRAMEBUFFER_COMPLETE;return r.bindTexture(r.TEXTURE_2D,null),r.bindFramebuffer(r.FRAMEBUFFER,null),r.deleteTexture(o),r.deleteFramebuffer(a),i}function Pv(r){return r!==2?!1:Ze(r).fenceSync!=null}function fo(r,t){Array.isArray(r)||(r=[r]),r.forEach(e=>{e!=null&&y.assert(e.dtype!=="complex64",()=>`${t} does not support complex64 tensors in the WebGL backend.`)})}var lt=F();lt.registerFlag("HAS_WEBGL",()=>lt.getNumber("WEBGL_VERSION")>0);lt.registerFlag("WEBGL_VERSION",()=>Ny(2)?2:Ny(1)?1:0);lt.registerFlag("WEBGL_CHECK_NUMERICAL_PROBLEMS",()=>!1);lt.registerFlag("WEBGL_BUFFER_SUPPORTED",()=>lt.get("WEBGL_VERSION")===2);lt.registerFlag("WEBGL_CPU_FORWARD",()=>!0);lt.registerFlag("WEBGL_FORCE_F16_TEXTURES",()=>!1);lt.registerFlag("WEBGL_PACK",()=>lt.getBool("HAS_WEBGL"));lt.registerFlag("WEBGL_PACK_NORMALIZATION",()=>lt.getBool("WEBGL_PACK"));lt.registerFlag("WEBGL_PACK_CLIP",()=>lt.getBool("WEBGL_PACK"));lt.registerFlag("WEBGL_PACK_DEPTHWISECONV",()=>lt.getBool("WEBGL_PACK"));lt.registerFlag("WEBGL_PACK_BINARY_OPERATIONS",()=>lt.getBool("WEBGL_PACK"));lt.registerFlag("WEBGL_PACK_UNARY_OPERATIONS",()=>lt.getBool("WEBGL_PACK"));lt.registerFlag("WEBGL_PACK_ARRAY_OPERATIONS",()=>lt.getBool("WEBGL_PACK"));lt.registerFlag("WEBGL_PACK_IMAGE_OPERATIONS",()=>lt.getBool("WEBGL_PACK"));lt.registerFlag("WEBGL_PACK_REDUCE",()=>lt.getBool("WEBGL_PACK"));lt.registerFlag("WEBGL_LAZILY_UNPACK",()=>lt.getBool("WEBGL_PACK"));lt.registerFlag("WEBGL_CONV_IM2COL",()=>lt.getBool("WEBGL_PACK"));lt.registerFlag("WEBGL_MAX_TEXTURE_SIZE",()=>Rv(lt.getNumber("WEBGL_VERSION")));lt.registerFlag("WEBGL_MAX_TEXTURES_IN_SHADER",()=>Dv(lt.getNumber("WEBGL_VERSION")));lt.registerFlag("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION",()=>{let r=lt.getNumber("WEBGL_VERSION");return r===0?0:Fv(r)});lt.registerFlag("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE",()=>lt.getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")>0&&!So.isMobile());lt.registerFlag("WEBGL_RENDER_FLOAT32_CAPABLE",()=>_v(lt.getNumber("WEBGL_VERSION")));lt.registerFlag("WEBGL_RENDER_FLOAT32_ENABLED",()=>lt.getBool("WEBGL_FORCE_F16_TEXTURES")?!1:lt.getBool("WEBGL_RENDER_FLOAT32_CAPABLE"));lt.registerFlag("WEBGL_DOWNLOAD_FLOAT_ENABLED",()=>Ov(lt.getNumber("WEBGL_VERSION")));lt.registerFlag("WEBGL_FENCE_API_ENABLED",()=>Pv(lt.getNumber("WEBGL_VERSION")));lt.registerFlag("WEBGL_SIZE_UPLOAD_UNIFORM",()=>lt.getBool("WEBGL_RENDER_FLOAT32_ENABLED")?4:0);lt.registerFlag("WEBGL_DELETE_TEXTURE_THRESHOLD",()=>-1,r=>{if(r<0&&r!==-1)throw new Error(`WEBGL_DELETE_TEXTURE_THRESHOLD must be -1 (indicating never delete) or at least 0, but got ${r}.`)});lt.registerFlag("WEBGL_FLUSH_THRESHOLD",()=>So.isMobile()?1:-1,r=>{if(r<0&&r!==-1)throw new Error(`WEBGL_FLUSH_THRESHOLD must be -1 (indicating never manual flush) or at least 0, but got ${r}.`)});lt.registerFlag("CPU_HANDOFF_SIZE_THRESHOLD",()=>128);lt.registerFlag("WEBGL_USE_SHAPES_UNIFORMS",()=>!1);lt.registerFlag("TOPK_LAST_DIM_CPU_HANDOFF_SIZE_THRESHOLD",()=>1e5);lt.registerFlag("TOPK_K_CPU_HANDOFF_THRESHOLD",()=>128);lt.registerFlag("WEBGL_EXP_CONV",()=>!1);lt.registerFlag("SOFTWARE_WEBGL_ENABLED",()=>lt.getBool("IS_TEST"));lt.registerFlag("WEBGL_MAX_SIZE_FOR_NARROW_TEXTURE",()=>1/0);lt.registerFlag("WEBGL_AUTO_SQUARIFY_NARROW_TEXTURE_SHAPE",()=>!1);lt.registerFlag("WEBGL2_ISNAN_CUSTOM",()=>!1);function zt(){let r,t,e,o,n,s,a,i,c,p;return F().getNumber("WEBGL_VERSION")===2?(r="#version 300 es",t="in",e="out",o="in",n="texture",s="outputColor",a="out vec4 outputColor;",i=F().getBool("WEBGL2_ISNAN_CUSTOM")?`
      bool isnan_custom(float val) {
        uint floatToUint = floatBitsToUint(val);
        return (floatToUint & 0x7fffffffu) > 0x7f800000u;
      }

      bvec4 isnan_custom(vec4 val) {
        return bvec4(isnan_custom(val.x),
          isnan_custom(val.y), isnan_custom(val.z), isnan_custom(val.w));
      }

      #define isnan(value) isnan_custom(value)
    `:"",c="",p=`
      #define round(value) newRound(value)
      int newRound(float value) {
        return int(floor(value + 0.5));
      }

      ivec4 newRound(vec4 value) {
        return ivec4(floor(value + vec4(0.5)));
      }
    `):(r="",t="attribute",e="varying",o="varying",n="texture2D",s="gl_FragColor",a="",i=`
      #define isnan(value) isnan_custom(value)
      bool isnan_custom(float val) {
        return (val > 0. || val < 1. || val == 0.) ? false : true;
      }
      bvec4 isnan_custom(vec4 val) {
        return bvec4(isnan(val.x), isnan(val.y), isnan(val.z), isnan(val.w));
      }
    `,c=`
      uniform float INFINITY;

      bool isinf(float val) {
        return abs(val) == INFINITY;
      }
      bvec4 isinf(vec4 val) {
        return equal(abs(val), vec4(INFINITY));
      }
    `,p=`
      int round(float value) {
        return int(floor(value + 0.5));
      }

      ivec4 round(vec4 value) {
        return ivec4(floor(value + vec4(0.5)));
      }
    `),{version:r,attribute:t,varyingVs:e,varyingFs:o,texture2D:n,output:s,defineOutput:a,defineSpecialNaN:i,defineSpecialInf:c,defineRound:p}}function zr(r,t,e="index"){let o=y.computeStrides(t);return o.map((n,s)=>{let a=`int ${r[s]} = ${e} / ${n}`,i=s===o.length-1?`int ${r[s+1]} = ${e} - ${r[s]} * ${n}`:`index -= ${r[s]} * ${n}`;return`${a}; ${i};`}).join("")}function qi(r,t,e="index"){let o=y.computeStrides(t);return o.map((n,s)=>{let a=`int ${r[s]} = ${e} / outShapeStrides[${s}]`,i=s===o.length-1?`int ${r[s+1]} = ${e} - ${r[s]} * outShapeStrides[${s}]`:`index -= ${r[s]} * outShapeStrides[${s}]`;return`${a}; ${i};`}).join("")}function DV(r,t){let e=r.length,o=r.map(s=>`${t}[${s}]`),n=new Array(e-1);n[e-2]=o[e-1];for(let s=e-3;s>=0;--s)n[s]=`(${n[s+1]} * ${o[s+1]})`;return n}function Lv(r,t,e="index"){let o=r.map((s,a)=>a),n=DV(o,t);return n.map((s,a)=>{let i=`int ${r[a]} = ${e} / ${n[a]}`,c=a===n.length-1?`int ${r[a+1]} = ${e} - ${r[a]} * ${n[a]}`:`index -= ${r[a]} * ${n[a]}`;return`${i}; ${c};`}).join("")}function Uc(r){let t=y.computeStrides(r).map(e=>e.toString());return`
  int getFlatIndex(ivec3 coords) {
    return coords.x * ${t[0]} + coords.y * ${t[1]} + coords.z;
  }
`}function zc(){return`
  int getFlatIndex(ivec3 coords) {
    return coords.x * outShapeStrides[0] + coords.y * outShapeStrides[1] + coords.z;
  }
`}var sf=`
  const float FLOAT_MAX = 1.70141184e38;
  const float FLOAT_MIN = 1.17549435e-38;

  lowp vec4 encode_float(highp float v) {
    if (isnan(v)) {
      return vec4(255, 255, 255, 255);
    }

    highp float av = abs(v);

    if(av < FLOAT_MIN) {
      return vec4(0.0, 0.0, 0.0, 0.0);
    } else if(v > FLOAT_MAX) {
      return vec4(0.0, 0.0, 128.0, 127.0) / 255.0;
    } else if(v < -FLOAT_MAX) {
      return vec4(0.0, 0.0,  128.0, 255.0) / 255.0;
    }

    highp vec4 c = vec4(0,0,0,0);

    highp float e = floor(log2(av));
    highp float m = exp2(fract(log2(av))) - 1.0;

    c[2] = floor(128.0 * m);
    m -= c[2] / 128.0;
    c[1] = floor(32768.0 * m);
    m -= c[1] / 32768.0;
    c[0] = floor(8388608.0 * m);

    highp float ebias = e + 127.0;
    c[3] = floor(ebias / 2.0);
    ebias -= c[3] * 2.0;
    c[2] += floor(ebias) * 128.0;

    c[3] += 128.0 * step(0.0, -v);

    return c / 255.0;
  }
`;var{getBroadcastDims:Mv}=v;function Bv(r,t,e){let o=[];if(r.forEach(f=>{let d=y.sizeFromShape(f.shapeInfo.logicalShape);if(f.shapeInfo.isUniform?o.push(`uniform float ${f.name}${d>1?`[${d}]`:""};`):(o.push(`uniform sampler2D ${f.name};`),o.push(`uniform int offset${f.name};`)),e.enableShapeUniforms){let{uniformShape:h}=af(e.packedInputs,f.shapeInfo.logicalShape,f.shapeInfo.texShape);switch(h.length){case 1:o.push(`uniform int ${f.name}Shape;`);break;case 2:o.push(`uniform ivec2 ${f.name}Shape;`);break;case 3:o.push(`uniform ivec3 ${f.name}Shape;`);break;case 4:o.push(`uniform ivec4 ${f.name}Shape;`);break;default:break}o.push(`uniform ivec2 ${f.name}TexShape;`)}}),e.enableShapeUniforms){switch(t.logicalShape.length){case 1:o.push("uniform int outShape;");break;case 2:o.push("uniform ivec2 outShape;"),o.push("uniform int outShapeStrides;");break;case 3:o.push("uniform ivec3 outShape;"),o.push("uniform ivec2 outShapeStrides;");break;case 4:o.push("uniform ivec4 outShape;"),o.push("uniform ivec3 outShapeStrides;");break;default:break}o.push("uniform ivec2 outTexShape;")}e.customUniforms&&e.customUniforms.forEach(f=>{o.push(`uniform ${f.type} ${f.name}${f.arrayIndex?`[${f.arrayIndex}]`:""};`)});let n=o.join(`
`),s=r.map(f=>FV(f,t,e.packedInputs,e.enableShapeUniforms)).join(`
`),a=t.texShape,i=zt(),c=PV(i),p,l,u=BV(i);return t.isPacked?(p=_V(t.logicalShape,a,e.enableShapeUniforms),l=MV(i)):(p=OV(t.logicalShape,a,e.enableShapeUniforms),l=LV(i)),e.packedInputs&&(u+=zV),[u,c,l,n,p,s,e.userCode].join(`
`)}function Hc(r,t=!1){let e=r.shapeInfo.logicalShape;switch(e.length){case 0:return eG(r,t);case 1:return oG(r,t);case 2:return sG(r,t);case 3:return iG(r,t);case 4:return pG(r,t);case 5:return lG(r);case 6:return uG(r);default:throw new Error(`${e.length}-D input sampling is not yet supported`)}}function Vv(r,t){switch(r.shapeInfo.logicalShape.length){case 0:return tG(r);case 1:return rG(r,t);case 2:return nG(r,t);case 3:return aG(r,t);default:return cG(r,t)}}function FV(r,t,e=!1,o){let n="";e?n+=Vv(r,o):n+=Hc(r,o);let s=r.shapeInfo.logicalShape,a=t.logicalShape;return s.length<=a.length&&(e?n+=mG(r,t):n+=fG(r,t)),n}function _V(r,t,e){switch(r.length){case 0:return Gv();case 1:return WV(r,t,e);case 2:return QV(r,t,e);case 3:return qV(r,t,e);default:return jV(r,t,e)}}function OV(r,t,e){switch(r.length){case 0:return Gv();case 1:return HV(r,t,e);case 2:return JV(r,t,e);case 3:return KV(r,t,e);case 4:return XV(r,t,e);case 5:return YV(r,t);case 6:return ZV(r,t);default:throw new Error(`${r.length}-D output sampling is not yet supported`)}}function PV(r){return`
    float sampleTexture(sampler2D textureSampler, vec2 uv) {
      return ${r.texture2D}(textureSampler, uv).r;
    }
  `}function LV(r){return`
    void setOutput(float val) {
      ${r.output} = vec4(val, 0, 0, 0);
    }
  `}function MV(r){return`
    void setOutput(vec4 val) {
      ${r.output} = val;
    }
  `}function BV(r){return`${r.version}
    precision highp float;
    precision highp int;
    precision highp sampler2D;
    ${r.varyingFs} vec2 resultUV;
    ${r.defineOutput}
    const vec2 halfCR = vec2(0.5, 0.5);

    struct ivec5
    {
      int x;
      int y;
      int z;
      int w;
      int u;
    };

    struct ivec6
    {
      int x;
      int y;
      int z;
      int w;
      int u;
      int v;
    };

    uniform float NAN;
    ${r.defineSpecialNaN}
    ${r.defineSpecialInf}
    ${r.defineRound}

    int imod(int x, int y) {
      return x - y * (x / y);
    }

    int idiv(int a, int b, float sign) {
      int res = a / b;
      int mod = imod(a, b);
      if (sign < 0. && mod != 0) {
        res -= 1;
      }
      return res;
    }

    //Based on the work of Dave Hoskins
    //https://www.shadertoy.com/view/4djSRW
    #define HASHSCALE1 443.8975
    float random(float seed){
      vec2 p = resultUV * seed;
      vec3 p3  = fract(vec3(p.xyx) * HASHSCALE1);
      p3 += dot(p3, p3.yzx + 19.19);
      return fract((p3.x + p3.y) * p3.z);
    }

    ${VV}
    ${GV}
    ${UV}
  `}var VV=`
vec2 uvFromFlat(int texNumR, int texNumC, int index) {
  int texR = index / texNumC;
  int texC = index - texR * texNumC;
  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
}
vec2 packedUVfrom1D(int texNumR, int texNumC, int index) {
  int texelIndex = index / 2;
  int texR = texelIndex / texNumC;
  int texC = texelIndex - texR * texNumC;
  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
}
`,GV=`
vec2 packedUVfrom2D(int texelsInLogicalRow, int texNumR,
  int texNumC, int row, int col) {
  int texelIndex = (row / 2) * texelsInLogicalRow + (col / 2);
  int texR = texelIndex / texNumC;
  int texC = texelIndex - texR * texNumC;
  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
}
`,UV=`
vec2 packedUVfrom3D(int texNumR, int texNumC,
    int texelsInBatch, int texelsInLogicalRow, int b,
    int row, int col) {
  int index = b * texelsInBatch + (row / 2) * texelsInLogicalRow + (col / 2);
  int texR = index / texNumC;
  int texC = index - texR * texNumC;
  return (vec2(texC, texR) + halfCR) / vec2(texNumC, texNumR);
}
`,zV=`
  float getChannel(vec4 frag, vec2 innerDims) {
    vec2 modCoord = mod(innerDims, 2.);
    return modCoord.x == 0. ?
      (modCoord.y == 0. ? frag.r : frag.g) :
      (modCoord.y == 0. ? frag.b : frag.a);
  }
  float getChannel(vec4 frag, int dim) {
    float modCoord = mod(float(dim), 2.);
    return modCoord == 0. ? frag.r : frag.g;
  }
`;function Gv(){return`
    int getOutputCoords() {
      return 0;
    }
  `}function WV(r,t,e){let o=[Math.ceil(t[0]/2),Math.ceil(t[1]/2)];return o[0]===1?e?`
      int getOutputCoords() {
        return 2 * int(resultUV.x * ceil(float(outTexShape[1]) / 2.0));
      }
    `:`
      int getOutputCoords() {
        return 2 * int(resultUV.x * ${o[1]}.0);
      }
    `:o[1]===1?e?`
      int getOutputCoords() {
        return 2 * int(resultUV.y * ceil(float(outTexShape[0]) / 2.0));
      }
    `:`
      int getOutputCoords() {
        return 2 * int(resultUV.y * ${o[0]}.0);
      }
    `:e?`
    int getOutputCoords() {
      ivec2 packedTexShape = ivec2(ceil(float(outTexShape[0]) / 2.0), ceil(float(outTexShape[1]) / 2.0));
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(packedTexShape[0], packedTexShape[1]));
      return 2 * (resTexRC.x * packedTexShape[1] + resTexRC.y);
    }
  `:`
    int getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(${o[0]}, ${o[1]}));
      return 2 * (resTexRC.x * ${o[1]} + resTexRC.y);
    }
  `}function HV(r,t,e){return t[0]===1?e?`
      int getOutputCoords() {
        return int(resultUV.x * float(outTexShape[1]));
      }
    `:`
      int getOutputCoords() {
        return int(resultUV.x * ${t[1]}.0);
      }
    `:t[1]===1?e?`
      int getOutputCoords() {
        return int(resultUV.y * float(outTexShape[0]));
      }
    `:`
      int getOutputCoords() {
        return int(resultUV.y * ${t[0]}.0);
      }
    `:e?`
    int getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(outTexShape[0], outTexShape[1]));
      return resTexRC.x * outTexShape[1] + resTexRC.y;
    }
  `:`
    int getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(${t[0]}, ${t[1]}));
      return resTexRC.x * ${t[1]} + resTexRC.y;
    }
  `}function qV(r,t,e){if(e)return`
    ivec3 getOutputCoords() {
      ivec2 packedTexShape = ivec2(ceil(float(outTexShape[0]) / 2.0), ceil(float(outTexShape[1]) / 2.0));
      int texelsInLogicalRow = int(ceil(float(outShape[2]) / 2.0));
      int texelsInBatch = texelsInLogicalRow * int(ceil(float(outShape[1]) / 2.0));
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(packedTexShape[0], packedTexShape[1]));
      int index = resTexRC.x * packedTexShape[1] + resTexRC.y;

      int b = index / texelsInBatch;
      index -= b * texelsInBatch;

      int r = 2 * (index / texelsInLogicalRow);
      int c = imod(index, texelsInLogicalRow) * 2;

      return ivec3(b, r, c);
    }
  `;let o=[Math.ceil(t[0]/2),Math.ceil(t[1]/2)],n=Math.ceil(r[2]/2),s=n*Math.ceil(r[1]/2);return`
    ivec3 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(${o[0]}, ${o[1]}));
      int index = resTexRC.x * ${o[1]} + resTexRC.y;

      int b = index / ${s};
      index -= b * ${s};

      int r = 2 * (index / ${n});
      int c = imod(index, ${n}) * 2;

      return ivec3(b, r, c);
    }
  `}function KV(r,t,e){if(e)return`
  ivec3 getOutputCoords() {
    ivec2 resTexRC = ivec2(resultUV.yx *
                           vec2(outTexShape[0], outTexShape[1]));
    int index = resTexRC.x * outTexShape[1] + resTexRC.y;
    ${qi(["r","c","d"],r)}
    return ivec3(r, c, d);
  }
`;let o=zr(["r","c","d"],r);return`
    ivec3 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(${t[0]}, ${t[1]}));
      int index = resTexRC.x * ${t[1]} + resTexRC.y;
      ${o}
      return ivec3(r, c, d);
    }
  `}function jV(r,t,e){if(e)return`
    ivec4 getOutputCoords() {
      ivec2 packedTexShape = ivec2(ceil(float(outTexShape[0]) / 2.0), ceil(float(outTexShape[1]) / 2.0));
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(packedTexShape[0], packedTexShape[1]));
      int index = resTexRC.x * packedTexShape[1] + resTexRC.y;

      int texelsInLogicalRow = int(ceil(float(outShape[3]) / 2.0));
      int texelsInBatch = texelsInLogicalRow * int(ceil(float(outShape[2]) / 2.0));
      int texelsInBatchN = texelsInBatch * outShape[1];

      int b2 = index / texelsInBatchN;
      index -= b2 * texelsInBatchN;

      int b = index / texelsInBatch;
      index -= b * texelsInBatch;

      int r = 2 * (index / texelsInLogicalRow);
      int c = imod(index, texelsInLogicalRow) * 2;

      return ivec4(b2, b, r, c);
    }
  `;let o=[Math.ceil(t[0]/2),Math.ceil(t[1]/2)],n=Math.ceil(r[r.length-1]/2),s=n*Math.ceil(r[r.length-2]/2),a=s,i="",c="b, r, c";for(let p=2;p<r.length-1;p++)a*=r[r.length-p-1],i=`
      int b${p} = index / ${a};
      index -= b${p} * ${a};
    `+i,c=`b${p}, `+c;return`
    ivec${r.length} getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(${o[0]}, ${o[1]}));
      int index = resTexRC.x * ${o[1]} + resTexRC.y;

      ${i}

      int b = index / ${s};
      index -= b * ${s};

      int r = 2 * (index / ${n});
      int c = imod(index, ${n}) * 2;

      return ivec${r.length}(${c});
    }
  `}function XV(r,t,e){if(e)return`
    ivec4 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
        vec2(outTexShape[0], outTexShape[1]));
      int index = resTexRC.x * outTexShape[1] + resTexRC.y;
      ${qi(["r","c","d","d2"],r)}
      return ivec4(r, c, d, d2);
    }
  `;let o=zr(["r","c","d","d2"],r);return`
    ivec4 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
        vec2(${t[0]}, ${t[1]}));
      int index = resTexRC.x * ${t[1]} + resTexRC.y;
      ${o}
      return ivec4(r, c, d, d2);
    }
  `}function YV(r,t){let e=zr(["r","c","d","d2","d3"],r);return`
    ivec5 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx * vec2(${t[0]},
                             ${t[1]}));

      int index = resTexRC.x * ${t[1]} + resTexRC.y;

      ${e}

      ivec5 outShape = ivec5(r, c, d, d2, d3);
      return outShape;
    }
  `}function ZV(r,t){let e=zr(["r","c","d","d2","d3","d4"],r);return`
    ivec6 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
        vec2(${t[0]}, ${t[1]}));
      int index = resTexRC.x * ${t[1]} + resTexRC.y;

      ${e}

      ivec6 result = ivec6(r, c, d, d2, d3, d4);
      return result;
    }
  `}function QV(r,t,e){let o=[Math.ceil(t[0]/2),Math.ceil(t[1]/2)];if(y.arraysEqual(r,t))return e?`
      ivec2 getOutputCoords() {
        ivec2 packedTexShape = ivec2(ceil(float(outTexShape[0]) / 2.0), ceil(float(outTexShape[1]) / 2.0));
        return 2 * ivec2(resultUV.yx * vec2(packedTexShape[0], packedTexShape[1]));
      }
    `:`
      ivec2 getOutputCoords() {
        return 2 * ivec2(resultUV.yx * vec2(${o[0]}, ${o[1]}));
      }
    `;let n=Math.ceil(r[1]/2);return e?`
    ivec2 getOutputCoords() {
      ivec2 packedTexShape = ivec2(ceil(float(outTexShape[0]) / 2.0), ceil(float(outTexShape[1]) / 2.0));
      int texelsInLogicalRow = int(ceil(float(outShape[1]) / 2.0));
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(packedTexShape[0], packedTexShape[1]));

      int index = resTexRC.x * packedTexShape[1] + resTexRC.y;
      int r = 2 * (index / texelsInLogicalRow);
      int c = imod(index, texelsInLogicalRow) * 2;

      return ivec2(r, c);
    }
  `:`
    ivec2 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(${o[0]}, ${o[1]}));

      int index = resTexRC.x * ${o[1]} + resTexRC.y;
      int r = 2 * (index / ${n});
      int c = imod(index, ${n}) * 2;

      return ivec2(r, c);
    }
  `}function JV(r,t,e){return y.arraysEqual(r,t)?e?`
      ivec2 getOutputCoords() {
        return ivec2(resultUV.yx * vec2(outTexShape[0], outTexShape[1]));
      }
    `:`
      ivec2 getOutputCoords() {
        return ivec2(resultUV.yx * vec2(${t[0]}, ${t[1]}));
      }
    `:r[1]===1?e?`
      ivec2 getOutputCoords() {
        ivec2 resTexRC = ivec2(resultUV.yx *
                               vec2(outTexShape[0], outTexShape[1]));
        int index = resTexRC.x * outTexShape[1] + resTexRC.y;
        return ivec2(index, 0);
      }
    `:`
      ivec2 getOutputCoords() {
        ivec2 resTexRC = ivec2(resultUV.yx *
                               vec2(${t[0]}, ${t[1]}));
        int index = resTexRC.x * ${t[1]} + resTexRC.y;
        return ivec2(index, 0);
      }
    `:r[0]===1?e?`
      ivec2 getOutputCoords() {
        ivec2 resTexRC = ivec2(resultUV.yx *
                               vec2(outTexShape[0], outTexShape[1]));
        int index = resTexRC.x * outTexShape[1] + resTexRC.y;
        return ivec2(0, index);
      }
    `:`
      ivec2 getOutputCoords() {
        ivec2 resTexRC = ivec2(resultUV.yx *
                               vec2(${t[0]}, ${t[1]}));
        int index = resTexRC.x * ${t[1]} + resTexRC.y;
        return ivec2(0, index);
      }
    `:e?`
    ivec2 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(outTexShape[0], outTexShape[1]));
      int index = resTexRC.x * outTexShape[1] + resTexRC.y;
      int r = index / outShape[1];
      int c = index - r * outShape[1];
      return ivec2(r, c);
    }
  `:`
    ivec2 getOutputCoords() {
      ivec2 resTexRC = ivec2(resultUV.yx *
                             vec2(${t[0]}, ${t[1]}));
      int index = resTexRC.x * ${t[1]} + resTexRC.y;
      int r = index / ${r[1]};
      int c = index - r * ${r[1]};
      return ivec2(r, c);
    }
  `}function Ki(r){return`offset${r}`}function tG(r){let t=r.name,e="get"+t.charAt(0).toUpperCase()+t.slice(1),o=zt();return`
    vec4 ${e}() {
      return ${o.texture2D}(${t}, halfCR);
    }
  `}function eG(r,t){let e=r.name,o="get"+e.charAt(0).toUpperCase()+e.slice(1);if(r.shapeInfo.isUniform)return`float ${o}() {return ${e};}`;let[n,s]=r.shapeInfo.texShape;if(n===1&&s===1)return`
      float ${o}() {
        return sampleTexture(${e}, halfCR);
      }
    `;let a=Ki(e);if(t)return`
    float ${o}() {
      vec2 uv = uvFromFlat(${e}TexShape[0], ${e}TexShape[1], ${a});
      return sampleTexture(${e}, uv);
    }
  `;let[i,c]=r.shapeInfo.texShape;return`
    float ${o}() {
      vec2 uv = uvFromFlat(${i}, ${c}, ${a});
      return sampleTexture(${e}, uv);
    }
  `}function rG(r,t){let e=r.name,o="get"+e.charAt(0).toUpperCase()+e.slice(1),n=r.shapeInfo.texShape,s=zt();if(t)return`
    vec4 ${o}(int index) {
      ivec2 packedTexShape = ivec2(ceil(float(${e}TexShape[0]) / 2.0), ceil(float(${e}TexShape[1]) / 2.0));
      vec2 uv = packedUVfrom1D(
        packedTexShape[0], packedTexShape[1], index);
      return ${s.texture2D}(${e}, uv);
    }
  `;let a=[Math.ceil(n[0]/2),Math.ceil(n[1]/2)];return`
    vec4 ${o}(int index) {
      vec2 uv = packedUVfrom1D(
        ${a[0]}, ${a[1]}, index);
      return ${s.texture2D}(${e}, uv);
    }
  `}function oG(r,t){let e=r.name,o="get"+e.charAt(0).toUpperCase()+e.slice(1);if(r.shapeInfo.isUniform)return`
      float ${o}(int index) {
        ${qc(r)}
      }
    `;let n=r.shapeInfo.texShape,s=n[0],a=n[1];if(a===1&&s===1)return`
      float ${o}(int index) {
        return sampleTexture(${e}, halfCR);
      }
    `;let i=Ki(e);return a===1?t?`
      float ${o}(int index) {
        vec2 uv = vec2(0.5, (float(index + ${i}) + 0.5) / float(${e}TexShape[0]));
        return sampleTexture(${e}, uv);
      }
    `:`
      float ${o}(int index) {
        vec2 uv = vec2(0.5, (float(index + ${i}) + 0.5) / ${s}.0);
        return sampleTexture(${e}, uv);
      }
    `:s===1?t?`
      float ${o}(int index) {
        vec2 uv = vec2((float(index + ${i}) + 0.5) / float(${e}TexShape[1]), 0.5);
        return sampleTexture(${e}, uv);
      }
    `:`
      float ${o}(int index) {
        vec2 uv = vec2((float(index + ${i}) + 0.5) / ${a}.0, 0.5);
        return sampleTexture(${e}, uv);
      }
    `:t?`
    float ${o}(int index) {
      vec2 uv = uvFromFlat(${e}TexShape[0], ${e}TexShape[1], index + ${i});
      return sampleTexture(${e}, uv);
    }
  `:`
    float ${o}(int index) {
      vec2 uv = uvFromFlat(${s}, ${a}, index + ${i});
      return sampleTexture(${e}, uv);
    }
  `}function nG(r,t){let e=r.shapeInfo.logicalShape,o=r.name,n="get"+o.charAt(0).toUpperCase()+o.slice(1),s=r.shapeInfo.texShape,a=s[0],i=s[1],c=zt();if(s!=null&&y.arraysEqual(e,s))return t?`
      vec4 ${n}(int row, int col) {
        vec2 uv = (vec2(col, row) + halfCR) / vec2(${o}TexShape[1], ${o}TexShape[0]);

        return ${c.texture2D}(${o}, uv);
      }
    `:`
      vec4 ${n}(int row, int col) {
        vec2 uv = (vec2(col, row) + halfCR) / vec2(${i}.0, ${a}.0);

        return ${c.texture2D}(${o}, uv);
      }
    `;if(t)return`
    vec4 ${n}(int row, int col) {
      ivec2 packedTexShape = ivec2(ceil(float(${o}TexShape[0]) / 2.0), ceil(float(${o}TexShape[1]) / 2.0));
      int valuesPerRow = int(ceil(float(${o}Shape[1]) / 2.0));
      vec2 uv = packedUVfrom2D(valuesPerRow, packedTexShape[0], packedTexShape[1], row, col);
      return ${c.texture2D}(${o}, uv);
    }
  `;let p=[Math.ceil(s[0]/2),Math.ceil(s[1]/2)],l=Math.ceil(e[1]/2);return`
    vec4 ${n}(int row, int col) {
      vec2 uv = packedUVfrom2D(${l}, ${p[0]}, ${p[1]}, row, col);
      return ${c.texture2D}(${o}, uv);
    }
  `}function sG(r,t){let e=r.shapeInfo.logicalShape,o=r.name,n="get"+o.charAt(0).toUpperCase()+o.slice(1),s=r.shapeInfo.texShape;if(s!=null&&y.arraysEqual(e,s)){if(t)return`
      float ${n}(int row, int col) {
        vec2 uv = (vec2(col, row) + halfCR) / vec2(${o}TexShape[1], ${o}TexShape[0]);
        return sampleTexture(${o}, uv);
      }
    `;let m=s[0],f=s[1];return`
    float ${n}(int row, int col) {
      vec2 uv = (vec2(col, row) + halfCR) / vec2(${f}.0, ${m}.0);
      return sampleTexture(${o}, uv);
    }
  `}let{newShape:a,keptDims:i}=y.squeezeShape(e),c=a;if(c.length<e.length){let m=Kc(r,c),f=["row","col"];return`
      ${Hc(m,t)}
      float ${n}(int row, int col) {
        return ${n}(${jc(f,i)});
      }
    `}if(r.shapeInfo.isUniform)return`
      float ${n}(int row, int col) {
        int index = round(dot(vec2(row, col), vec2(${e[1]}, 1)));
        ${qc(r)}
      }
    `;let p=s[0],l=s[1],u=Ki(o);return l===1?t?`
      float ${n}(int row, int col) {
        float index = dot(vec3(row, col, ${u}), vec3(${o}Shape[1], 1, 1));
        vec2 uv = vec2(0.5, (index + 0.5) / float(${o}TexShape[0]));
        return sampleTexture(${o}, uv);
      }
    `:`
    float ${n}(int row, int col) {
      float index = dot(vec3(row, col, ${u}), vec3(${e[1]}, 1, 1));
      vec2 uv = vec2(0.5, (index + 0.5) / ${p}.0);
      return sampleTexture(${o}, uv);
    }
  `:p===1?t?`
      float ${n}(int row, int col) {
        float index = dot(vec3(row, col, ${u}), vec3(${o}Shape[1], 1, 1));
        vec2 uv = vec2((index + 0.5) / float(${o}TexShape[1]), 0.5);
        return sampleTexture(${o}, uv);
      }
    `:`
    float ${n}(int row, int col) {
      float index = dot(vec3(row, col, ${u}), vec3(${e[1]}, 1, 1));
      vec2 uv = vec2((index + 0.5) / ${l}.0, 0.5);
      return sampleTexture(${o}, uv);
    }
  `:t?`
      float ${n}(int row, int col) {
        // Explicitly use integer operations as dot() only works on floats.
        int index = row * ${o}Shape[1] + col + ${u};
        vec2 uv = uvFromFlat(${o}TexShape[0], ${o}TexShape[1], index);
        return sampleTexture(${o}, uv);
      }
    `:`
  float ${n}(int row, int col) {
    // Explicitly use integer operations as dot() only works on floats.
    int index = row * ${e[1]} + col + ${u};
    vec2 uv = uvFromFlat(${p}, ${l}, index);
    return sampleTexture(${o}, uv);
  }
`}function aG(r,t){let e=r.shapeInfo.logicalShape,o=r.name,n="get"+o.charAt(0).toUpperCase()+o.slice(1),s=r.shapeInfo.texShape,a=[Math.ceil(s[0]/2),Math.ceil(s[1]/2)];if(e[0]===1){let m=e.slice(1),f=[1,2],d=Kc(r,m),h=["b","row","col"];return`
        ${Vv(d,t)}
        vec4 ${n}(int b, int row, int col) {
          return ${n}(${jc(h,f)});
        }
      `}let i=zt();if(t)return`
    vec4 ${n}(int b, int row, int col) {
      ivec2 packedTexShape = ivec2(ceil(float(${o}TexShape[0]) / 2.0), ceil(float(${o}TexShape[1]) / 2.0));
      int valuesPerRow = int(ceil(float(${o}Shape[2]) / 2.0));
      int texelsInBatch = valuesPerRow * int(ceil(float(${o}Shape[1]) / 2.0));
      vec2 uv = packedUVfrom3D(
        packedTexShape[0], packedTexShape[1], texelsInBatch, valuesPerRow, b, row, col);
      return ${i.texture2D}(${o}, uv);
    }
  `;let c=a[0],p=a[1],l=Math.ceil(e[2]/2),u=l*Math.ceil(e[1]/2);return`
    vec4 ${n}(int b, int row, int col) {
      vec2 uv = packedUVfrom3D(
        ${c}, ${p}, ${u}, ${l}, b, row, col);
      return ${i.texture2D}(${o}, uv);
    }
  `}function iG(r,t){let e=r.shapeInfo.logicalShape,o=r.name,n="get"+o.charAt(0).toUpperCase()+o.slice(1),s=e[1]*e[2],a=e[2],{newShape:i,keptDims:c}=y.squeezeShape(e),p=i;if(p.length<e.length){let h=Kc(r,p),g=["row","col","depth"];return`
        ${Hc(h,t)}
        float ${n}(int row, int col, int depth) {
          return ${n}(${jc(g,c)});
        }
      `}if(r.shapeInfo.isUniform)return`
      float ${n}(int row, int col, int depth) {
        int index = round(dot(vec3(row, col, depth),
                          vec3(${s}, ${a}, 1)));
        ${qc(r)}
      }
    `;let l=r.shapeInfo.texShape,u=l[0],m=l[1],f=r.shapeInfo.flatOffset;if(m===s&&f==null)return t?`
      float ${n}(int row, int col, int depth) {
        int stride1 = ${o}Shape[2];
        float texR = float(row);
        float texC = dot(vec2(col, depth), vec2(stride1, 1));
        vec2 uv = (vec2(texC, texR) + halfCR) /
                   vec2(${o}TexShape[1], ${o}TexShape[0]);
        return sampleTexture(${o}, uv);
      }
    `:`
        float ${n}(int row, int col, int depth) {
          float texR = float(row);
          float texC = dot(vec2(col, depth), vec2(${a}, 1));
          vec2 uv = (vec2(texC, texR) + halfCR) /
                     vec2(${m}.0, ${u}.0);
          return sampleTexture(${o}, uv);
        }
      `;if(m===a&&f==null)return t?`
      float ${n}(int row, int col, int depth) {
        float texR = dot(vec2(row, col), vec2(${o}Shape[1], 1));
        float texC = float(depth);
        vec2 uv = (vec2(texC, texR) + halfCR) / vec2(${o}TexShape[1], ${o}TexShape[0]);
        return sampleTexture(${o}, uv);
      }
    `:`
    float ${n}(int row, int col, int depth) {
      float texR = dot(vec2(row, col), vec2(${e[1]}, 1));
      float texC = float(depth);
      vec2 uv = (vec2(texC, texR) + halfCR) / vec2(${m}.0, ${u}.0);
      return sampleTexture(${o}, uv);
    }
  `;let d=Ki(o);return t?`
    float ${n}(int row, int col, int depth) {
      // Explicitly use integer operations as dot() only works on floats.
      int stride0 = ${o}Shape[1] * ${o}Shape[2];
      int stride1 = ${o}Shape[2];
      int index = row * stride0 + col * stride1 + depth + ${d};
      vec2 uv = uvFromFlat(${o}TexShape[0], ${o}TexShape[1], index);
      return sampleTexture(${o}, uv);
    }
    `:`
      float ${n}(int row, int col, int depth) {
        // Explicitly use integer operations as dot() only works on floats.
        int index = row * ${s} + col * ${a} + depth + ${d};
        vec2 uv = uvFromFlat(${u}, ${m}, index);
        return sampleTexture(${o}, uv);
      }
  `}function cG(r,t){let e=r.name,o="get"+e.charAt(0).toUpperCase()+e.slice(1),n=zt();if(t)return`
    vec4 ${o}(int b2, int b, int row, int col) {
      int valuesPerRow = int(ceil(float(${e}Shape[3]) / 2.0));
      int texelsInBatch = valuesPerRow * int(ceil(float(${e}Shape[2]) / 2.0));
      int index = b * texelsInBatch + (row / 2) * valuesPerRow + (col / 2);
      texelsInBatch *= ${e}Shape[1];
      index = b2 * texelsInBatch + index;
      ivec2 packedTexShape = ivec2(ceil(float(${e}TexShape[0]) / 2.0), ceil(float(${e}TexShape[1]) / 2.0));
      int texR = index / packedTexShape[1];
      int texC = index - texR * packedTexShape[1];
      vec2 uv = (vec2(texC, texR) + halfCR) / vec2(packedTexShape[1], packedTexShape[0]); return ${n.texture2D}(${e}, uv);
    }
  `;let s=r.shapeInfo.logicalShape,a=s.length,i=r.shapeInfo.texShape,c=[Math.ceil(i[0]/2),Math.ceil(i[1]/2)],p=c[0],l=c[1],u=Math.ceil(s[a-1]/2),m=u*Math.ceil(s[a-2]/2),f="int b, int row, int col",d=`b * ${m} + (row / 2) * ${u} + (col / 2)`;for(let h=2;h<a-1;h++)f=`int b${h}, `+f,m*=s[a-h-1],d=`b${h} * ${m} + `+d;return`
    vec4 ${o}(${f}) {
      int index = ${d};
      int texR = index / ${l};
      int texC = index - texR * ${l};
      vec2 uv = (vec2(texC, texR) + halfCR) / vec2(${l}, ${p});
      return ${n.texture2D}(${e}, uv);
    }
  `}function pG(r,t){let e=r.shapeInfo.logicalShape,o=r.name,n="get"+o.charAt(0).toUpperCase()+o.slice(1),s=e[3],a=e[2]*s,i=e[1]*a,{newShape:c,keptDims:p}=y.squeezeShape(e);if(c.length<e.length){let b=Kc(r,c),w=["row","col","depth","depth2"];return`
      ${Hc(b,t)}
      float ${n}(int row, int col, int depth, int depth2) {
        return ${n}(${jc(w,p)});
      }
    `}if(r.shapeInfo.isUniform)return`
      float ${n}(int row, int col, int depth, int depth2) {
        int index = round(dot(vec4(row, col, depth, depth2),
                          vec4(${i}, ${a}, ${s}, 1)));
        ${qc(r)}
      }
    `;let l=r.shapeInfo.flatOffset,u=r.shapeInfo.texShape,m=u[0],f=u[1],d=`int stride2 = ${o}Shape[3];`,h=`int stride1 = ${o}Shape[2] * stride2;`,g=`int stride0 = ${o}Shape[1] * stride1;`;if(f===i&&l==null)return t?`
      float ${n}(int row, int col, int depth, int depth2) {
        ${d}
        ${h}
        float texR = float(row);
        float texC =
            dot(vec3(col, depth, depth2),
                vec3(stride1, stride2, 1));
        vec2 uv = (vec2(texC, texR) + halfCR) /
                   vec2(${o}TexShape[1], ${o}TexShape[0]);
        return sampleTexture(${o}, uv);
      }
    `:`
      float ${n}(int row, int col, int depth, int depth2) {
        float texR = float(row);
        float texC =
            dot(vec3(col, depth, depth2),
                vec3(${a}, ${s}, 1));
        vec2 uv = (vec2(texC, texR) + halfCR) /
                   vec2(${f}.0, ${m}.0);
        return sampleTexture(${o}, uv);
      }
    `;if(f===s&&l==null)return t?`
      float ${n}(int row, int col, int depth, int depth2) {
        float texR = dot(vec3(row, col, depth),
                         vec3(${o}Shape[1] * ${o}Shape[2], ${o}Shape[2], 1));
        float texC = float(depth2);
        vec2 uv = (vec2(texC, texR) + halfCR) /
                  vec2(${o}TexShape[1], ${o}TexShape[0]);
        return sampleTexture(${o}, uv);
      }
    `:`
      float ${n}(int row, int col, int depth, int depth2) {
        float texR = dot(vec3(row, col, depth),
                         vec3(${e[1]*e[2]}, ${e[2]}, 1));
        float texC = float(depth2);
        vec2 uv = (vec2(texC, texR) + halfCR) /
                  vec2(${f}.0, ${m}.0);
        return sampleTexture(${o}, uv);
      }
    `;let x=Ki(o);return t?`
    float ${n}(int row, int col, int depth, int depth2) {
      // Explicitly use integer operations as dot() only works on floats.
      ${d}
      ${h}
      ${g}
      int index = row * stride0 + col * stride1 +
          depth * stride2 + depth2;
      vec2 uv = uvFromFlat(${o}TexShape[0], ${o}TexShape[1], index + ${x});
      return sampleTexture(${o}, uv);
    }
  `:`
    float ${n}(int row, int col, int depth, int depth2) {
      // Explicitly use integer operations as dot() only works on floats.
      int index = row * ${i} + col * ${a} +
          depth * ${s} + depth2;
      vec2 uv = uvFromFlat(${m}, ${f}, index + ${x});
      return sampleTexture(${o}, uv);
    }
  `}function lG(r){let t=r.shapeInfo.logicalShape,e=r.name,o="get"+e.charAt(0).toUpperCase()+e.slice(1),n=t[4],s=t[3]*n,a=t[2]*s,i=t[1]*a,{newShape:c,keptDims:p}=y.squeezeShape(t);if(c.length<t.length){let h=Kc(r,c),g=["row","col","depth","depth2","depth3"];return`
      ${Hc(h)}
      float ${o}(int row, int col, int depth, int depth2, int depth3) {
        return ${o}(${jc(g,p)});
      }
    `}if(r.shapeInfo.isUniform)return`
      float ${o}(int row, int col, int depth, int depth2, int depth3) {
        float index = dot(
          vec4(row, col, depth, depth2),
          vec4(${i}, ${a}, ${s}, ${n})) +
          depth3;
        ${qc(r)}
      }
    `;let l=r.shapeInfo.flatOffset,u=r.shapeInfo.texShape,m=u[0],f=u[1];if(f===i&&l==null)return`
      float ${o}(int row, int col, int depth, int depth2, int depth3) {
        int texR = row;
        float texC = dot(vec4(col, depth, depth2, depth3),
                         vec4(${a}, ${s}, ${n}, 1));
        vec2 uv = (vec2(texC, texR) + halfCR) /
                   vec2(${f}.0, ${m}.0);
        return sampleTexture(${e}, uv);
      }
    `;if(f===n&&l==null)return`
      float ${o}(int row, int col, int depth, int depth2, int depth3) {
        float texR = dot(
          vec4(row, col, depth, depth2),
          vec4(${t[1]*t[2]*t[3]},
               ${t[2]*t[3]}, ${t[3]}, 1));
        int texC = depth3;
        vec2 uv = (vec2(texC, texR) + halfCR) /
                  vec2(${f}.0, ${m}.0);
        return sampleTexture(${e}, uv);
      }
    `;let d=Ki(e);return`
    float ${o}(int row, int col, int depth, int depth2, int depth3) {
      // Explicitly use integer operations as dot() only works on floats.
      int index = row * ${i} + col * ${a} + depth * ${s} +
          depth2 * ${n} + depth3 + ${d};
      vec2 uv = uvFromFlat(${m}, ${f}, index);
      return sampleTexture(${e}, uv);
    }
  `}function uG(r){let t=r.shapeInfo.logicalShape,e=r.name,o="get"+e.charAt(0).toUpperCase()+e.slice(1),{newShape:n,keptDims:s}=y.squeezeShape(t);if(n.length<t.length){let g=Kc(r,n),x=["row","col","depth","depth2","depth3","depth4"];return`
      ${Hc(g)}
      float ${o}(int row, int col, int depth,
                    int depth2, int depth3, int depth4) {
        return ${o}(${jc(x,s)});
      }
    `}let a=t[5],i=t[4]*a,c=t[3]*i,p=t[2]*c,l=t[1]*p;if(r.shapeInfo.isUniform)return`
      float ${o}(int row, int col, int depth,
                  int depth2, int depth3, int depth4) {
        int index = round(dot(
          vec4(row, col, depth, depth2),
          vec4(${l}, ${p}, ${c}, ${i})) +
          dot(
            vec2(depth3, depth4),
            vec2(${a}, 1)));
        ${qc(r)}
      }
    `;let u=r.shapeInfo.flatOffset,m=r.shapeInfo.texShape,f=m[0],d=m[1];if(d===l&&u==null)return`
      float ${o}(int row, int col, int depth,
                    int depth2, int depth3, int depth4) {
        int texR = row;
        float texC = dot(vec4(col, depth, depth2, depth3),
          vec4(${p}, ${c}, ${i}, ${a})) +
               float(depth4);
        vec2 uv = (vec2(texC, texR) + halfCR) /
                   vec2(${d}.0, ${f}.0);
        return sampleTexture(${e}, uv);
      }
    `;if(d===a&&u==null)return`
      float ${o}(int row, int col, int depth,
                    int depth2, int depth3, int depth4) {
        float texR = dot(vec4(row, col, depth, depth2),
          vec4(${t[1]*t[2]*t[3]*t[4]},
               ${t[2]*t[3]*t[4]},
               ${t[3]*t[4]},
               ${t[4]})) + float(depth3);
        int texC = depth4;
        vec2 uv = (vec2(texC, texR) + halfCR) /
                  vec2(${d}.0, ${f}.0);
        return sampleTexture(${e}, uv);
      }
    `;let h=Ki(e);return`
    float ${o}(int row, int col, int depth,
                  int depth2, int depth3, int depth4) {
      // Explicitly use integer operations as dot() only works on floats.
      int index = row * ${l} + col * ${p} + depth * ${c} +
          depth2 * ${i} + depth3 * ${a} + depth4 + ${h};
      vec2 uv = uvFromFlat(${f}, ${d}, index);
      return sampleTexture(${e}, uv);
    }
  `}function qc(r){let t=r.name,e=y.sizeFromShape(r.shapeInfo.logicalShape);return e<2?`return ${t};`:`
    for (int i = 0; i < ${e}; i++) {
      if (i == index) {
        return ${t}[i];
      }
    }
  `}function mG(r,t){let e=r.name,o=e.charAt(0).toUpperCase()+e.slice(1),n="get"+o+"AtOutCoords",s=r.shapeInfo.logicalShape.length,a=t.logicalShape.length,i=Mv(r.shapeInfo.logicalShape,t.logicalShape),c=gt(a),p=a-s,l,u=["x","y","z","w","u","v"];s===0?l="":a<2&&i.length>=1?l="coords = 0;":l=i.map(b=>`coords.${u[b+p]} = 0;`).join(`
`);let m="";a<2&&s>0?m="coords":m=r.shapeInfo.logicalShape.map((b,w)=>`coords.${u[w+p]}`).join(", ");let f="return outputValue;",h=y.sizeFromShape(r.shapeInfo.logicalShape)===1,x=y.sizeFromShape(t.logicalShape)===1;if(s===1&&!h&&!x)f=`
      return vec4(outputValue.xy, outputValue.xy);
    `;else if(h&&!x)a===1?f=`
        return vec4(outputValue.x, outputValue.x, 0., 0.);
      `:f=`
        return vec4(outputValue.x);
      `;else if(i.length){let b=s-2,w=s-1;i.indexOf(b)>-1&&i.indexOf(w)>-1?f="return vec4(outputValue.x);":i.indexOf(b)>-1?f="return vec4(outputValue.x, outputValue.y, outputValue.x, outputValue.y);":i.indexOf(w)>-1&&(f="return vec4(outputValue.xx, outputValue.zz);")}return`
    vec4 ${n}() {
      ${c} coords = getOutputCoords();
      ${l}
      vec4 outputValue = get${o}(${m});
      ${f}
    }
  `}function fG(r,t){let e=r.name,o=e.charAt(0).toUpperCase()+e.slice(1),n="get"+o+"AtOutCoords",s=t.texShape,a=r.shapeInfo.texShape,i=r.shapeInfo.logicalShape.length,c=t.logicalShape.length;if(!r.shapeInfo.isUniform&&i===c&&r.shapeInfo.flatOffset==null&&y.arraysEqual(a,s))return`
      float ${n}() {
        return sampleTexture(${e}, resultUV);
      }
    `;let p=gt(c),l=Mv(r.shapeInfo.logicalShape,t.logicalShape),u=c-i,m,f=["x","y","z","w","u","v"];i===0?m="":c<2&&l.length>=1?m="coords = 0;":m=l.map(h=>`coords.${f[h+u]} = 0;`).join(`
`);let d="";return c<2&&i>0?d="coords":d=r.shapeInfo.logicalShape.map((h,g)=>`coords.${f[g+u]}`).join(", "),`
    float ${n}() {
      ${p} coords = getOutputCoords();
      ${m}
      return get${o}(${d});
    }
  `}function gt(r){if(r<=1)return"int";if(r===2)return"ivec2";if(r===3)return"ivec3";if(r===4)return"ivec4";if(r===5)return"ivec5";if(r===6)return"ivec6";throw Error(`GPU for rank ${r} is not yet supported`)}function af(r,t,e){let{newShape:o,keptDims:n}=y.squeezeShape(t),s=t.length,a=r&&s===3&&t[0]===1,i=a?t.slice(1):o,c=!r&&s>1&&!y.arraysEqual(t,e)&&o.length<s||a;return{useSqueezeShape:c,uniformShape:c?i:t,keptDims:n}}function Kc(r,t){let e=JSON.parse(JSON.stringify(r));return e.shapeInfo.logicalShape=t,e}function jc(r,t){return t.map(e=>r[e]).join(", ")}function zv(r,t,e,o){let n=e.map((l,u)=>{let m={logicalShape:l.shape,texShape:l.isUniform?null:l.texData.texShape,isUniform:l.isUniform,isPacked:l.isUniform?!1:l.texData.isPacked,flatOffset:null};return l.texData!=null&&l.texData.slice!=null&&l.texData.slice.flatOffset>0&&(m.flatOffset=l.texData.slice.flatOffset),{name:t.variableNames[u],shapeInfo:m}}),s=n.map(l=>l.shapeInfo),a={logicalShape:o.shape,texShape:o.texData.texShape,isUniform:!1,isPacked:o.texData.isPacked,flatOffset:null},i=Bv(n,a,t),c=bv(r.gl,i),p=r.createProgram(c);return F().get("ENGINE_COMPILE_ONLY")?{program:t,fragmentShader:c,source:i,webGLProgram:p,inShapeInfos:s,outShapeInfo:a,uniformLocations:null,customUniformLocations:null,infLoc:null,nanLoc:null,inShapesLocations:null,inTexShapesLocations:null,outShapeLocation:null,outShapeStridesLocation:null,outTexShapeLocation:null}:Object.assign({program:t,fragmentShader:c,source:i,webGLProgram:p,inShapeInfos:s,outShapeInfo:a},ky(r,t,p))}function ky(r,t,e){let o={},n={},s={},a=[],i,c,p,l=null,u=null;u=r.getUniformLocation(e,"NAN",!1),F().getNumber("WEBGL_VERSION")===1&&(l=r.getUniformLocation(e,"INFINITY",!1));let m=!1;for(let f=0;f<t.variableNames.length;f++){let d=t.variableNames[f];o[d]=r.getUniformLocation(e,d,m),o[`offset${d}`]=r.getUniformLocation(e,`offset${d}`,m),t.enableShapeUniforms&&(n[`${d}Shape`]=r.getUniformLocation(e,`${d}Shape`,m),s[`${d}TexShape`]=r.getUniformLocation(e,`${d}TexShape`,m))}return t.enableShapeUniforms&&(i=r.getUniformLocation(e,"outShape",m),p=r.getUniformLocation(e,"outShapeStrides",m),c=r.getUniformLocation(e,"outTexShape",m)),t.customUniforms&&t.customUniforms.forEach((f,d)=>{a[d]=r.getUniformLocation(e,f.name,m)}),{uniformLocations:o,customUniformLocations:a,infLoc:l,nanLoc:u,inShapesLocations:n,inTexShapesLocations:s,outShapeLocation:i,outShapeStridesLocation:p,outTexShapeLocation:c}}function Uv(r,t){if(r.length!==t.length)throw Error(`Binary was compiled with ${r.length} inputs, but was executed with ${t.length} inputs`);r.forEach((e,o)=>{let n=e.logicalShape,s=t[o],a=s.shape;if(!y.arraysEqual(n,a))throw Error(`Binary was compiled with different shapes than the current args. Shapes ${n} and ${a} must match`);if(e.isUniform&&s.isUniform)return;let i=e.texShape,c=s.isUniform?null:s.texData.texShape;if(!y.arraysEqual(i,c))throw Error(`Binary was compiled with different texture shapes than the current args. Shape ${i} and ${c} must match`)})}function Wv(r,t,e,o,n){t.program.enableShapeUniforms||(Uv(t.inShapeInfos,e),Uv([t.outShapeInfo],[o]));let s=o.texData.texture,a=o.texData.texShape;o.texData.isPacked?r.setOutputPackedMatrixTexture(s.texture,a[0],a[1]):r.setOutputMatrixTexture(s.texture,a[0],a[1]),r.setProgram(t.webGLProgram),F().getNumber("WEBGL_VERSION")===1&&t.infLoc!==null&&r.gl.uniform1f(t.infLoc,1/0),t.nanLoc!==null&&r.gl.uniform1f(t.nanLoc,NaN),e.forEach((c,p)=>{let l=t.program.variableNames[p],u=t.uniformLocations[l],m=t.uniformLocations[`offset${l}`],f=t.inShapesLocations[`${l}Shape`],d=t.inTexShapesLocations[`${l}TexShape`];if(f){let{uniformShape:h}=af(t.program.packedInputs,c.shape,c.texData.texShape);switch(h.length){case 1:r.gl.uniform1iv(f,new Int32Array(h));break;case 2:r.gl.uniform2iv(f,new Int32Array(h));break;case 3:r.gl.uniform3iv(f,new Int32Array(h));break;case 4:r.gl.uniform4iv(f,new Int32Array(h));break;default:break}}if(d&&r.gl.uniform2i(d,c.texData.texShape[0],c.texData.texShape[1]),u!=null){if(c.isUniform){if(y.sizeFromShape(c.shape)<2)r.gl.uniform1f(u,c.uniformValues[0]);else{let h=c.uniformValues;h instanceof Float32Array||(h=new Float32Array(h)),r.gl.uniform1fv(u,h)}return}c.texData.slice!=null&&m!=null&&r.gl.uniform1i(m,c.texData.slice.flatOffset),r.setInputMatrixTexture(c.texData.texture.texture,u,p)}});let i=t.outShapeLocation;if(i)switch(o.shape.length){case 1:r.gl.uniform1iv(i,new Int32Array(o.shape));break;case 2:r.gl.uniform2iv(i,new Int32Array(o.shape));break;case 3:r.gl.uniform3iv(i,new Int32Array(o.shape));break;case 4:r.gl.uniform4iv(i,new Int32Array(o.shape));break;default:break}if(t.outShapeStridesLocation){let c=y.computeStrides(o.shape);switch(o.shape.length){case 2:r.gl.uniform1iv(t.outShapeStridesLocation,new Int32Array(c));break;case 3:r.gl.uniform2iv(t.outShapeStridesLocation,new Int32Array(c));break;case 4:r.gl.uniform3iv(t.outShapeStridesLocation,new Int32Array(c));break;default:break}}t.outTexShapeLocation&&r.gl.uniform2i(t.outTexShapeLocation,o.texData.texShape[0],o.texData.texShape[1]),t.program.customUniforms&&n&&t.program.customUniforms.forEach((c,p)=>{let l=t.customUniformLocations[p],u=n[p];if(c.type==="float")r.gl.uniform1fv(l,u);else if(c.type==="vec2")r.gl.uniform2fv(l,u);else if(c.type==="vec3")r.gl.uniform3fv(l,u);else if(c.type==="vec4")r.gl.uniform4fv(l,u);else if(c.type==="int")r.gl.uniform1iv(l,u);else if(c.type==="ivec2")r.gl.uniform2iv(l,u);else if(c.type==="ivec3")r.gl.uniform3iv(l,u);else if(c.type==="ivec4")r.gl.uniform4iv(l,u);else throw Error(`uniform type ${c.type} is not supported yet.`)}),r.executeProgram()}function Hv(r,t,e){let o="";t.concat(e).forEach(a=>{let i=a.texData!=null&&a.texData.slice!=null&&a.texData.slice.flatOffset>0;if(r.enableShapeUniforms&&!a.isUniform){let c=a.texData.texShape,{useSqueezeShape:p,uniformShape:l,keptDims:u}=af(r.packedInputs,a.shape,c),m="",f="",d="";if(l.length===1&&r.packedInputs){let k=[Math.ceil(c[0]/2),Math.ceil(c[1]/2)];m=`${k[0]>1}_${k[1]>1}`}else if(l.length===2&&!r.packedInputs)f=`${l[0]>1}_${l[1]>1}`;else if(l.length>2&&!r.packedInputs){let k=y.computeStrides(l);d=`${k[0]===c[1]}_${k[k.length-1]===c[1]}`}let h=a.shape.length,g=l.length===2&&y.arraysEqual(a.shape,c),x=y.sizeFromShape(a.shape)===1,b=v.getBroadcastDims(a.shape,e.shape),w=!r.packedInputs&&h===e.shape.length&&y.arraysEqual(c,e.texData.texShape),I=r.packedInputs||l.length>2?"":`${c[0]>1}_${c[1]>1}`;o+=`${h}_${w}_${p?u:""}_${l.length}_${x}_${b}_${g}_${m}_${f}_${d}_${I}_${i}`}else{let c=a.isUniform?"uniform":a.texData.texShape;o+=`${a.shape}_${c}_${i}`}});let n=r.userCode,s=r.constructor.name;return s+="_"+o+"_"+n+`${F().getNumber("WEBGL_VERSION")}`,s}function _t(r){return F().getBool("WEBGL_USE_SHAPES_UNIFORMS")&&r<=4}var cf=class{constructor(t){this.variableNames=["A"],this.packedInputs=!1,this.packedOutput=!0,this.outPackingScheme=os.DENSE,this.customUniforms=[{name:"texShape",type:"ivec2"}];let e=zt();this.outputShape=t,this.enableShapeUniforms=_t(this.outputShape.length),this.userCode=`
      ivec3 outCoordsFromFlatIndex(int index) {
        ${this.enableShapeUniforms?qi(["r","c","d"],t):zr(["r","c","d"],t)}
        return ivec3(r, c, d);
      }

      void main() {
        ivec2 resTexRC = ivec2(resultUV.yx * vec2(texShape[0], texShape[1]));
        int index = 4 * (resTexRC.x * texShape[1] + resTexRC.y);

        vec4 result = vec4(0.);

        for (int i=0; i<4; i++) {
          int flatIndex = index + i;
          ivec3 rc = outCoordsFromFlatIndex(flatIndex);
          result[i] = getA(rc.x, rc.y, rc.z);
        }

        ${e.output} = result;
      }
    `}};var pf=class{constructor(t){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.outPackingScheme=os.DENSE,this.customUniforms=[{name:"texShape",type:"ivec2"}];let e=zt();this.outputShape=t,this.enableShapeUniforms=_t(this.outputShape.length),this.userCode=`
      ivec3 outCoordsFromFlatIndex(int index) {
        ${this.enableShapeUniforms?qi(["r","c","d"],t):zr(["r","c","d"],t)}
        return ivec3(r, c, d);
      }

      void main() {
        ivec2 resTexRC = ivec2(resultUV.yx * vec2(texShape[0], texShape[1]));
        int index = 4 * (resTexRC.x * texShape[1] + resTexRC.y);

        vec4 result = vec4(0.);

        for (int i=0; i<4; i++) {
          int flatIndex = index + i;
          ivec3 rc = outCoordsFromFlatIndex(flatIndex);
          result[i] = getChannel(getA(rc.x, rc.y, rc.z), vec2(rc.y, rc.z));
        }

        ${e.output} = result;
      }
    `}};var lf=class{constructor(t){this.variableNames=["A"],this.outTexUsage=ve.DOWNLOAD;let e=zt();this.outputShape=t,this.userCode=`
      ${sf}

      void main() {
        float x = getAAtOutCoords();
        ${e.output} = encode_float(x);
      }
    `}};var uf=class{constructor(t){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!1,this.outTexUsage=ve.DOWNLOAD;let e=zt();this.outputShape=t,this.userCode=`
      ${sf}

      void main() {
        ivec3 coords = getOutputCoords();
        float x = getChannel(getAAtOutCoords(), vec2(coords.y, coords.z));
        ${e.output} = encode_float(x);
      }
    `}};var mf=class{constructor(t,e=!1){this.variableNames=["A"],this.customUniforms=[{name:"texShape",type:"ivec2"}];let o=zt();this.outputShape=t,this.enableShapeUniforms=_t(this.outputShape.length);let n="result";e&&(n="floor(result * 255. + 0.5)"),this.userCode=`
      ${this.enableShapeUniforms?zc():Uc(t)}

      void main() {
        ivec3 coords = getOutputCoords();

        int flatIndex = getFlatIndex(coords);
        int offset = imod(flatIndex, 4);

        flatIndex = idiv(flatIndex, 4, 1.);

        int r = flatIndex / texShape[1];
        int c = imod(flatIndex, texShape[1]);
        vec2 uv = (vec2(c, r) + halfCR) / vec2(texShape[1], texShape[0]);
        vec4 values = ${o.texture2D}(A, uv);

        float result;

        if(offset == 0) {
          result = values[0];
        } else if(offset == 1) {
          result = values[1];
        } else if(offset == 2) {
          result = values[2];
        } else {
          result = values[3];
        }

        ${o.output} = vec4(${n}, 0., 0., 0.);
      }
    `}};var ff=class{constructor(t,e=!1){this.variableNames=["A"],this.packedInputs=!1,this.packedOutput=!0,this.customUniforms=[{name:"texShape",type:"ivec2"}];let o=zt();this.outputShape=t,this.enableShapeUniforms=_t(this.outputShape.length);let n="",s="result";e&&(s="floor(result * 255. + 0.5)");for(let a=0;a<=1;a++)for(let i=0;i<=1;i++){let c=a*2+i;n+=`
          localCoords = coords;
          if(localCoords[2] + ${i} < ${this.enableShapeUniforms?"outShape[2]":`${t[2]}`}) {
          localCoords[2] += ${i};
          if (localCoords[1] + ${a} < ${this.enableShapeUniforms?"outShape[1]":`${t[1]}`}) {
            localCoords[1] += ${a};

            flatIndex = getFlatIndex(localCoords);
            offset = imod(flatIndex, 4);

            flatIndex = idiv(flatIndex, 4, 1.);

            int r = flatIndex / texShape[1];
            int c = imod(flatIndex, texShape[1]);
            vec2 uv = (vec2(c, r) + halfCR) / vec2(texShape[1], texShape[0]);
            values = ${o.texture2D}(A, uv);

            if (offset == 0) {
              result[${c}] = values[0];
            } else if (offset == 1) {
              result[${c}] = values[1];
            } else if (offset == 2) {
              result[${c}] = values[2];
            } else {
              result[${c}] = values[3];
            }
          }
        }
        `}this.userCode=`
        ${this.enableShapeUniforms?zc():Uc(t)}

        void main() {
          ivec3 coords = getOutputCoords();

          vec4 result = vec4(0.);
          int flatIndex, r, c, offset;
          ivec3 localCoords;
          vec2 uv;
          vec4 values;

          ${n}

          ${o.output} = ${s};
        }
    `}};function qv(r){let t=zt(),e=`${t.version}
    precision highp float;
    ${t.attribute} vec3 clipSpacePos;
    ${t.attribute} vec2 uv;
    ${t.varyingVs} vec2 resultUV;

    void main() {
      gl_Position = vec4(clipSpacePos, 1);
      resultUV = uv;
    }`;return yv(r,e)}function Kv(r){let t=new Float32Array([-1,1,0,0,1,-1,-1,0,0,0,1,1,0,1,1,1,-1,0,1,0]);return wv(r,t)}function jv(r){let t=new Uint16Array([0,1,2,2,1,3]);return Iv(r,t)}function au(r,t,e,o,n,s){vv(t,e);let a=Sv(r),i=r.TEXTURE_2D;return at(r,()=>r.bindTexture(i,a)),at(r,()=>r.texParameteri(i,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE)),at(r,()=>r.texParameteri(i,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE)),at(r,()=>r.texParameteri(i,r.TEXTURE_MIN_FILTER,r.NEAREST)),at(r,()=>r.texParameteri(i,r.TEXTURE_MAG_FILTER,r.NEAREST)),F().getNumber("WEBGL_VERSION")===1?at(r,()=>r.texImage2D(i,0,o,t,e,0,n,s,null)):at(r,()=>r.texStorage2D(i,1,o,t,e)),at(r,()=>r.bindTexture(r.TEXTURE_2D,null)),{texture:a,texShape:[e,t]}}function Ey(r){return r.internalFormatFloat}function Xv(r,t,e,o){let[n,s]=Wi(t,e);return au(r,n,s,Ey(o),o.textureFormatFloat,r.FLOAT)}function $y(r){return r.internalFormatHalfFloat}function Yv(r,t,e,o){let[n,s]=Wi(t,e);return au(r,n,s,$y(o),o.textureFormatFloat,o.textureTypeHalfFloat)}function Ay(r){return r.downloadTextureFormat}function Zv(r,t,e,o){let[n,s]=Wi(t,e);return au(r,n,s,Ay(o),r.RGBA,r.UNSIGNED_BYTE)}function Ry(r){return r.internalFormatPackedFloat}function Qv(r,t,e,o){let[n,s]=mo(t,e);return au(r,n,s,Ry(o),r.RGBA,r.FLOAT)}function Dy(r){return r.internalFormatPackedHalfFloat}function Jv(r,t,e,o){let[n,s]=mo(t,e);return au(r,n,s,Dy(o),r.RGBA,o.textureTypeHalfFloat)}function tN(r,t,e){return at(r,()=>r.bindBuffer(r.ARRAY_BUFFER,e)),Sy(r,t,"clipSpacePos",e,3,20,0)&&Sy(r,t,"uv",e,2,20,12)}function eN(r,t,e,o,n,s){at(r,()=>r.bindTexture(r.TEXTURE_2D,t));let a,i,c;n instanceof Uint8Array?(a=new Uint8Array(e*o*4),i=r.UNSIGNED_BYTE,c=r.RGBA):(a=new Float32Array(e*o*4),i=r.FLOAT,c=s.internalFormatPackedFloat),a.set(n),F().getNumber("WEBGL_VERSION")===2?at(r,()=>r.texSubImage2D(r.TEXTURE_2D,0,0,0,e,o,r.RGBA,i,a)):at(r,()=>r.texImage2D(r.TEXTURE_2D,0,c,e,o,0,r.RGBA,i,a)),at(r,()=>r.bindTexture(r.TEXTURE_2D,null))}function rN(r,t,e){at(r,()=>r.bindTexture(r.TEXTURE_2D,t)),e.data instanceof Uint8Array?F().getNumber("WEBGL_VERSION")===2?at(r,()=>r.texSubImage2D(r.TEXTURE_2D,0,0,0,e.width,e.height,r.RGBA,r.UNSIGNED_BYTE,e.data)):at(r,()=>r.texImage2D(r.TEXTURE_2D,0,r.RGBA,e.width,e.height,0,r.RGBA,r.UNSIGNED_BYTE,e.data)):F().getNumber("WEBGL_VERSION")===2?at(r,()=>r.texSubImage2D(r.TEXTURE_2D,0,0,0,r.RGBA,r.UNSIGNED_BYTE,e)):at(r,()=>r.texImage2D(r.TEXTURE_2D,0,r.RGBA,r.RGBA,r.UNSIGNED_BYTE,e)),at(r,()=>r.bindTexture(r.TEXTURE_2D,null))}function oN(r,t,e,o){let n=r.createBuffer();at(r,()=>r.bindBuffer(r.PIXEL_PACK_BUFFER,n));let i=4*4*t*e;return at(r,()=>r.bufferData(r.PIXEL_PACK_BUFFER,i,r.STREAM_READ)),at(r,()=>r.readPixels(0,0,e,t,r.RGBA,r.FLOAT,0)),at(r,()=>r.bindBuffer(r.PIXEL_PACK_BUFFER,null)),n}function nN(r,t,e){let o=r,n=new Float32Array(e);return o.bindBuffer(o.PIXEL_PACK_BUFFER,t),o.getBufferSubData(o.PIXEL_PACK_BUFFER,0,n),o.bindBuffer(o.PIXEL_PACK_BUFFER,null),n}function sN(r,t,e,o){let[n,s]=Wi(t,e),a=4,i=new Uint8Array(hv(t*e,a));return at(r,()=>r.readPixels(0,0,n,s,o.downloadTextureFormat,r.UNSIGNED_BYTE,i)),new Float32Array(i.buffer)}function aN(r,t,e,o,n,s,a,i){let c=r,p=new Float32Array(gv(s,a));return c.bindBuffer(c.PIXEL_PACK_BUFFER,t),c.getBufferSubData(c.PIXEL_PACK_BUFFER,0,p),c.bindBuffer(c.PIXEL_PACK_BUFFER,null),p}function iN(r,t,e){let o=new Float32Array(t*e*4);return at(r,()=>r.readPixels(0,0,e,t,r.RGBA,r.FLOAT,o)),o}var Xc=class{constructor(t){this.outputTexture=null,this.program=null,this.disposed=!1,this.vertexAttrsAreBound=!1,this.itemsToPoll=[];let e=F().getNumber("WEBGL_VERSION");t!=null?(this.gl=t,dv(e,t)):this.gl=Ze(e);let o="WEBGL_color_buffer_float",n="EXT_color_buffer_half_float";if(this.parallelCompilationExtension=this.gl.getExtension("KHR_parallel_shader_compile"),F().getNumber("WEBGL_VERSION")===1){let s="OES_texture_float",a="OES_texture_half_float";if(this.textureFloatExtension=nu(this.gl,s),ar(this.gl,a))this.textureHalfFloatExtension=nu(this.gl,a);else if(F().get("WEBGL_FORCE_F16_TEXTURES"))throw new Error("GL context does not support half float textures, yet the environment flag WEBGL_FORCE_F16_TEXTURES is set to true.");if(this.colorBufferFloatExtension=this.gl.getExtension(o),ar(this.gl,n))this.colorBufferHalfFloatExtension=nu(this.gl,n);else if(F().get("WEBGL_FORCE_F16_TEXTURES"))throw new Error("GL context does not support color renderable half floats, yet the environment flag WEBGL_FORCE_F16_TEXTURES is set to true.")}else if(o="EXT_color_buffer_float",ar(this.gl,o))this.colorBufferFloatExtension=this.gl.getExtension(o);else if(ar(this.gl,n))this.colorBufferHalfFloatExtension=this.gl.getExtension(n);else throw new Error("GL context does not support color renderable floats");this.vertexBuffer=Kv(this.gl),this.indexBuffer=jv(this.gl),this.framebuffer=Nv(this.gl),this.textureConfig=ou(this.gl,this.textureHalfFloatExtension)}get debug(){return F().getBool("DEBUG")}dispose(){if(this.disposed)return;this.program!=null&&console.warn("Disposing a GPGPUContext that still has a bound WebGLProgram. This is probably a resource leak, delete the program with GPGPUContext.deleteProgram before disposing."),this.outputTexture!=null&&console.warn("Disposing a GPGPUContext that still has a bound output matrix texture.  This is probably a resource leak, delete the output matrix texture with GPGPUContext.deleteMatrixTexture before disposing.");let t=this.gl;at(t,()=>t.finish()),at(t,()=>t.bindFramebuffer(t.FRAMEBUFFER,null)),at(t,()=>t.deleteFramebuffer(this.framebuffer)),at(t,()=>t.bindBuffer(t.ARRAY_BUFFER,null)),at(t,()=>t.bindBuffer(t.ELEMENT_ARRAY_BUFFER,null)),at(t,()=>t.deleteBuffer(this.indexBuffer)),this.disposed=!0}createFloat32MatrixTexture(t,e){return this.throwIfDisposed(),Xv(this.gl,t,e,this.textureConfig)}createFloat16MatrixTexture(t,e){return this.throwIfDisposed(),Yv(this.gl,t,e,this.textureConfig)}createUnsignedBytesMatrixTexture(t,e){return this.throwIfDisposed(),Zv(this.gl,t,e,this.textureConfig)}uploadPixelDataToTexture(t,e){this.throwIfDisposed(),rN(this.gl,t,e)}uploadDenseMatrixToTexture(t,e,o,n){this.throwIfDisposed(),eN(this.gl,t,e,o,n,this.textureConfig)}createFloat16PackedMatrixTexture(t,e){return this.throwIfDisposed(),Jv(this.gl,t,e,this.textureConfig)}createPackedMatrixTexture(t,e){return this.throwIfDisposed(),Qv(this.gl,t,e,this.textureConfig)}deleteMatrixTexture(t){this.throwIfDisposed(),this.outputTexture===t&&(vy(this.gl,this.framebuffer),this.outputTexture=null),at(this.gl,()=>this.gl.deleteTexture(t))}downloadByteEncodedFloatMatrixFromOutputTexture(t,e,o){return this.downloadMatrixDriver(t,()=>sN(this.gl,e,o,this.textureConfig))}downloadPackedMatrixFromBuffer(t,e,o,n,s,a){return aN(this.gl,t,e,o,n,s,a,this.textureConfig)}downloadFloat32MatrixFromBuffer(t,e){return nN(this.gl,t,e)}createBufferFromTexture(t,e,o){this.bindTextureToFrameBuffer(t);let n=oN(this.gl,e,o,this.textureConfig);return this.unbindTextureToFrameBuffer(),n}createAndWaitForFence(){let t=this.createFence(this.gl);return this.pollFence(t)}createFence(t){let e,o;if(F().getBool("WEBGL_FENCE_API_ENABLED")){let n=t,s=n.fenceSync(n.SYNC_GPU_COMMANDS_COMPLETE,0);t.flush(),o=()=>{let a=n.clientWaitSync(s,0,0);return a===n.ALREADY_SIGNALED||a===n.CONDITION_SATISFIED},e=s}else F().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")>0?(e=this.beginQuery(),this.endQuery(),o=()=>this.isQueryAvailable(e,F().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION"))):o=()=>!0;return{query:e,isFencePassed:o}}downloadMatrixFromPackedTexture(t,e,o){return this.downloadMatrixDriver(t,()=>iN(this.gl,e,o))}createProgram(t){this.throwIfDisposed();let e=this.gl;this.vertexShader==null&&(this.vertexShader=qv(e));let o=Cv(e);return at(e,()=>e.attachShader(o,this.vertexShader)),at(e,()=>e.attachShader(o,t)),Tv(e,o),this.debug&&ef(e,o),this.vertexAttrsAreBound||(this.setProgram(o),this.vertexAttrsAreBound=tN(e,this.program,this.vertexBuffer)),o}deleteProgram(t){this.throwIfDisposed(),t===this.program&&(this.program=null),t!=null&&at(this.gl,()=>this.gl.deleteProgram(t))}setProgram(t){this.throwIfDisposed(),this.program=t,this.program!=null&&this.debug&&ef(this.gl,this.program),at(this.gl,()=>this.gl.useProgram(t))}getUniformLocation(t,e,o=!0){return this.throwIfDisposed(),o?kv(this.gl,t,e):Ev(this.gl,t,e)}getAttributeLocation(t,e){return this.throwIfDisposed(),at(this.gl,()=>this.gl.getAttribLocation(t,e))}getUniformLocationNoThrow(t,e){return this.throwIfDisposed(),this.gl.getUniformLocation(t,e)}setInputMatrixTexture(t,e,o){this.throwIfDisposed(),this.throwIfNoProgram(),$v(this.gl,t,e,o)}setOutputMatrixTexture(t,e,o){this.setOutputMatrixTextureDriver(t,o,e)}setOutputPackedMatrixTexture(t,e,o){this.throwIfDisposed();let[n,s]=mo(e,o);this.setOutputMatrixTextureDriver(t,n,s)}setOutputMatrixWriteRegion(t,e,o,n){this.setOutputMatrixWriteRegionDriver(o,t,n,e)}setOutputPackedMatrixWriteRegion(t,e,o,n){throw new Error("setOutputPackedMatrixWriteRegion not implemented.")}debugValidate(){this.program!=null&&ef(this.gl,this.program),su(this.gl)}executeProgram(){this.throwIfDisposed(),this.throwIfNoProgram();let t=this.gl;this.debug&&this.debugValidate(),at(t,()=>t.drawElements(t.TRIANGLES,6,t.UNSIGNED_SHORT,0))}blockUntilAllProgramsCompleted(){this.throwIfDisposed(),at(this.gl,()=>this.gl.finish())}getQueryTimerExtension(){return this.disjointQueryTimerExtension==null&&(this.disjointQueryTimerExtension=nu(this.gl,F().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")===2?"EXT_disjoint_timer_query_webgl2":"EXT_disjoint_timer_query")),this.disjointQueryTimerExtension}getQueryTimerExtensionWebGL2(){return this.getQueryTimerExtension()}getQueryTimerExtensionWebGL1(){return this.getQueryTimerExtension()}beginQuery(){if(F().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")===2){let o=this.gl,n=this.getQueryTimerExtensionWebGL2(),s=o.createQuery();return o.beginQuery(n.TIME_ELAPSED_EXT,s),s}let t=this.getQueryTimerExtensionWebGL1(),e=t.createQueryEXT();return t.beginQueryEXT(t.TIME_ELAPSED_EXT,e),e}endQuery(){if(F().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION")===2){let e=this.gl,o=this.getQueryTimerExtensionWebGL2();e.endQuery(o.TIME_ELAPSED_EXT);return}let t=this.getQueryTimerExtensionWebGL1();t.endQueryEXT(t.TIME_ELAPSED_EXT)}async waitForQueryAndGetTime(t){return await y.repeatedTry(()=>this.disposed||this.isQueryAvailable(t,F().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION"))),this.getQueryTime(t,F().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_VERSION"))}getQueryTime(t,e){if(e===0)return null;if(e===2){let o=this.gl;return o.getQueryParameter(t,o.QUERY_RESULT)/1e6}else{let o=this.getQueryTimerExtensionWebGL1();return o.getQueryObjectEXT(t,o.QUERY_RESULT_EXT)/1e6}}isQueryAvailable(t,e){if(e===0)return!0;if(e===2){let o=this.gl,n=this.getQueryTimerExtensionWebGL2(),s=o.getQueryParameter(t,o.QUERY_RESULT_AVAILABLE);return this.disjoint==null&&(this.disjoint=this.gl.getParameter(n.GPU_DISJOINT_EXT)),s&&!this.disjoint}else{let o=this.getQueryTimerExtensionWebGL1(),n=o.getQueryObjectEXT(t,o.QUERY_RESULT_AVAILABLE_EXT);return this.disjoint==null&&(this.disjoint=this.gl.getParameter(o.GPU_DISJOINT_EXT)),n&&!this.disjoint}}pollFence(t){return new Promise(e=>{this.addItemToPoll(()=>t.isFencePassed(),()=>e())})}pollItems(){let t=xG(this.itemsToPoll.map(e=>e.isDoneFn));for(let e=0;e<=t;++e){let{resolveFn:o}=this.itemsToPoll[e];o()}this.itemsToPoll=this.itemsToPoll.slice(t+1)}addItemToPoll(t,e){if(this.itemsToPoll.push({isDoneFn:t,resolveFn:e}),this.itemsToPoll.length>1)return;let o;"setTimeoutCustom"in F().platform&&(o=F().platform.setTimeoutCustom.bind(F().platform)),y.repeatedTry(()=>(this.pollItems(),this.itemsToPoll.length===0),()=>0,null,o)}bindTextureToFrameBuffer(t){this.throwIfDisposed(),rf(this.gl,t,this.framebuffer),this.debug&&su(this.gl)}unbindTextureToFrameBuffer(){this.outputTexture!=null?(rf(this.gl,this.outputTexture,this.framebuffer),this.debug&&su(this.gl)):vy(this.gl,this.framebuffer)}downloadMatrixDriver(t,e){this.bindTextureToFrameBuffer(t);let o=e();return this.unbindTextureToFrameBuffer(),o}setOutputMatrixTextureDriver(t,e,o){this.throwIfDisposed();let n=this.gl;rf(n,t,this.framebuffer),this.debug&&su(n),this.outputTexture=t,at(n,()=>n.viewport(0,0,e,o)),at(n,()=>n.scissor(0,0,e,o))}setOutputMatrixWriteRegionDriver(t,e,o,n){this.throwIfDisposed(),at(this.gl,()=>this.gl.scissor(t,e,o,n))}throwIfDisposed(){if(this.disposed)throw new Error("Attempted to use disposed GPGPUContext.")}throwIfNoProgram(){if(this.program==null)throw new Error("No GPU program is currently set.")}};function xG(r){let t=0;for(;t<r.length&&r[t]();++t);return t-1}var{addImpl:cN,bincountImpl:df,bincountReduceImpl:pN,castImpl:lN,ceilImpl:uN,concatImpl:mN,equalImpl:fN,expImpl:dN,expm1Impl:hN,floorImpl:gN,gatherNdImpl:xN,gatherV2Impl:yN,greaterImpl:bN,greaterEqualImpl:CN,lessImpl:TN,lessEqualImpl:wN,linSpaceImpl:IN,logImpl:SN,maxImpl:vN,maximumImpl:NN,minimumImpl:kN,multiplyImpl:EN,negImpl:$N,notEqualImpl:AN,prodImpl:RN,raggedGatherImpl:DN,raggedTensorToTensorImpl:FN,rangeImpl:_N,rsqrtImpl:ON,scatterImpl:PN,sigmoidImpl:LN,simpleAbsImpl:hf,sliceImpl:MN,sparseFillEmptyRowsImpl:BN,sparseReshapeImpl:VN,sparseSegmentReductionImpl:gf,sqrtImpl:GN,stridedSliceImpl:UN,stringNGramsImpl:zN,stringSplitImpl:WN,stringToHashBucketFastImpl:HN,subImpl:qN,tileImpl:KN,topKImpl:jN,transposeImpl:ji,uniqueImpl:XN}=ay;function Fy(r,t){return["x","y","z","w","u","v"].slice(0,t).map(e=>`${r}.${e}`)}function Xt(r,t){return t===1?[r]:Fy(r,t)}function YN(r,t){if(r===1)return"rc";let e="";for(let o=0;o<r;o++)e+=t[o],o<r-1&&(e+=",");return e}var xf=class{constructor(t){if(this.variableNames=["A"],this.packedInputs=!1,this.packedOutput=!0,this.outputShape=t,this.rank=t.length,this.enableShapeUniforms=_t(this.outputShape.length),this.rank===0)this.userCode=`
        void main() {
          setOutput(vec4(getA(), 0., 0., 0.));
        }
      `;else{let e=Xt("rc",this.rank),o=gt(this.rank),n=this.getOutOfBoundsCondition(e),s=this.getSetup(e),a=this.getOutput(e);this.userCode=`
        void main() {
          ${o} rc = getOutputCoords();

          if(${n}) {
            setOutput(vec4(0));
          } else {
            ${s}

            setOutput(vec4(${a}));
          }
        }
      `}}getSourceCoordsArr(t){let e=[];for(let o=0;o<=1;o++)for(let n=0;n<=1;n++){let s=`${o===0?"r":"rp1"}, ${n===0?"c":"cp1"}`;for(let a=2;a<this.rank;a++)s=`${t[t.length-1-a]},`+s;e.push(s)}return e}getOutOfBoundsCondition(t){if(this.rank===1)return`rc > ${this.enableShapeUniforms?"outShape":this.outputShape[0]}`;let e="";for(let o=this.rank-2;o<this.rank;o++)e+=`${t[o]} >= ${this.enableShapeUniforms?`outShape[${o}]`:this.outputShape[o]}`,o<this.rank-1&&(e+="||");return e}getSetup(t){if(this.rank===1)return"";let e=t.slice(-2),o=this.enableShapeUniforms?`outShape[${this.rank} - 1]`:this.outputShape[this.rank-1],n=this.enableShapeUniforms?`outShape[${this.rank} - 2]`:this.outputShape[this.rank-2];return`
      int r = ${e[0]};
      int c = ${e[1]};
      int rp1 = r + 1;
      int cp1 = c + 1;

      bool cEdge = cp1 >= ${o};
      bool rEdge = rp1 >= ${n};
    `}getOutput(t){let e=this.getSourceCoordsArr(t);return this.rank===1?`getA(rc), (rc + 1 >= ${this.enableShapeUniforms?"outShape":this.outputShape[0]} ? 0. : getA(rc + 1)), 0, 0`:`getA(${e[0]}),
            cEdge ? 0. : getA(${e[1]}),
            rEdge ? 0. : getA(${e[2]}),
            rEdge || cEdge ? 0. : getA(${e[3]})`}};var Yc=class{constructor(t,e){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.customUniforms=[{name:"inputShape",type:"ivec3"}],this.outputShape=t,this.enableShapeUniforms=_t(this.outputShape.length);let o="";for(let n=0;n<4;n++){let s="thisRC = rc;";n%2===1&&(s+="thisRC.z += 1;"),n>1&&(s+="thisRC.y += 1;"),o+=`
        ${s}
        ${n>0?"if(thisRC.y < rows && thisRC.z < cols){":""}
          int flatIndex = getFlatIndex(thisRC);

          ivec3 inputRC = inputCoordsFromReshapedOutCoords(flatIndex);
          vec2 inputRCInnerDims = vec2(float(inputRC.y),float(inputRC.z));

          result[${n}] =
            getChannel(getA(inputRC.x, inputRC.y, inputRC.z), inputRCInnerDims);
        ${n>0?"}":""}
      `}this.userCode=`
      ${yG(e,this.enableShapeUniforms)}
      ${this.enableShapeUniforms?zc():Uc(t)}

      void main() {
        ivec3 rc = getOutputCoords();

        vec4 result = vec4(0.);

        ivec3 thisRC;
        int rows = ${this.enableShapeUniforms?"outShape[1]":t[1]};
        int cols = ${this.enableShapeUniforms?"outShape[2]":t[2]};

        ${o}

        setOutput(result);
      }
    `}};function yG(r,t){return`
    ivec3 inputCoordsFromReshapedOutCoords(int index) {
      ${t?Lv(["r","c","d"],"inputShape"):zr(["r","c","d"],r)}
      return ivec3(r, c, d);
    }
  `}var yf=class{constructor(t){this.gpgpu=t,this.numUsedTextures=0,this.numFreeTextures=0,this._numBytesAllocated=0,this._numBytesFree=0,this.freeTextures={},this.logEnabled=!1,this.usedTextures={}}acquireTexture(t,e,o){let n=QN(e,o),s=JN(t,n,o);s in this.freeTextures||(this.freeTextures[s]=[]),s in this.usedTextures||(this.usedTextures[s]=[]);let a=ZN(t,n,this.gpgpu.gl,this.gpgpu.textureConfig,o);if(this.freeTextures[s].length>0){this.numFreeTextures--,this.numUsedTextures++,this._numBytesFree-=a,this.log();let c=this.freeTextures[s].shift();return this.usedTextures[s].push(c),c}let i;return n===xe.PACKED_2X2_FLOAT32?i=this.gpgpu.createPackedMatrixTexture(t[0],t[1]):n===xe.PACKED_2X2_FLOAT16?i=this.gpgpu.createFloat16PackedMatrixTexture(t[0],t[1]):n===xe.UNPACKED_FLOAT32?i=this.gpgpu.createFloat32MatrixTexture(t[0],t[1]):n===xe.UNPACKED_FLOAT16?i=this.gpgpu.createFloat16MatrixTexture(t[0],t[1]):n===xe.PACKED_4X1_UNSIGNED_BYTE&&(i=this.gpgpu.createUnsignedBytesMatrixTexture(t[0],t[1])),this.usedTextures[s].push(i),this.numUsedTextures++,this._numBytesAllocated+=a,this.log(),i}releaseTexture(t,e,o,n){if(this.freeTextures==null)return;let s=QN(o,n),a=JN(e,s,n);a in this.freeTextures||(this.freeTextures[a]=[]);let i=ZN(e,s,this.gpgpu.gl,this.gpgpu.textureConfig,n),c=F().get("WEBGL_DELETE_TEXTURE_THRESHOLD");c!==-1&&this._numBytesAllocated>c?(this.gpgpu.deleteMatrixTexture(t.texture),this._numBytesAllocated-=i):(this.freeTextures[a].push(t),this.numFreeTextures++,this._numBytesFree+=i),this.numUsedTextures--;let p=this.usedTextures[a],l=p.indexOf(t);if(l<0)throw new Error("Cannot release a texture that was never provided by this texture manager");p.splice(l,1),this.log()}log(){if(!this.logEnabled)return;let t=this.numFreeTextures+this.numUsedTextures;console.log("Free/Used",`${this.numFreeTextures} / ${this.numUsedTextures}`,`(${t})`);let e=this._numBytesFree/this._numBytesAllocated;console.log(`Bytes allocated: ${this._numBytesAllocated}`),console.log(`Bytes unused: ${this._numBytesFree} (${Math.round(100*e)}%)`)}get numBytesAllocated(){return this._numBytesAllocated}get numBytesFree(){return this._numBytesFree}getNumUsedTextures(){return this.numUsedTextures}getNumFreeTextures(){return this.numFreeTextures}dispose(){if(this.freeTextures!=null){for(let t in this.freeTextures)this.freeTextures[t].forEach(e=>{this.gpgpu.deleteMatrixTexture(e.texture)});for(let t in this.usedTextures)this.usedTextures[t].forEach(e=>{this.gpgpu.deleteMatrixTexture(e.texture)});this.freeTextures=null,this.usedTextures=null,this.numUsedTextures=0,this.numFreeTextures=0,this._numBytesAllocated=0,this._numBytesFree=0}}};function bG(r,t){let e=r;if(t===e.R32F)return 4;if(t===e.R16F)return 2;if(t===e.RGBA32F)return 16;if(t===r.RGBA)return 16;if(t===e.RGBA16F)return 8;if(t===e.RGBA8)return 4;throw new Error(`Unknown internal format ${t}`)}function ZN(r,t,e,o,n){let s=CG(t,o),a;if(n){let[c,p]=mo(r[0],r[1]);a=c*p}else{let[c,p]=Wi(r[0],r[1]);a=c*p}let i=bG(e,s);return a*i}function CG(r,t){switch(r){case xe.PACKED_2X2_FLOAT32:return Ry(t);case xe.PACKED_2X2_FLOAT16:return Dy(t);case xe.UNPACKED_FLOAT32:return Ey(t);case xe.UNPACKED_FLOAT16:return $y(t);case xe.PACKED_4X1_UNSIGNED_BYTE:return Ay(t);default:throw new Error(`Unknown physical texture type ${r}`)}}function TG(r){return F().getBool("WEBGL_RENDER_FLOAT32_ENABLED")?r?xe.PACKED_2X2_FLOAT32:xe.UNPACKED_FLOAT32:r?xe.PACKED_2X2_FLOAT16:xe.UNPACKED_FLOAT16}function QN(r,t){if(r===ve.UPLOAD)return xe.PACKED_2X2_FLOAT32;if(r===ve.RENDER||r==null)return TG(t);if(r===ve.DOWNLOAD||r===ve.PIXELS)return xe.PACKED_4X1_UNSIGNED_BYTE;throw new Error(`Unknown logical texture type ${r}`)}function JN(r,t,e){return`${r[0]}_${r[1]}_${t}_${e}`}var $e=class{constructor(t,e){this.variableNames=["A"],this.outputShape=t,this.enableShapeUniforms=_t(this.outputShape.length),this.userCode=`
      float unaryOperation(float x) {
        ${e}
      }

      void main() {
        float x = getAAtOutCoords();
        float y = unaryOperation(x);

        setOutput(y);
      }
    `}},ae="if (isnan(x)) return x;",t1="return x;",_y="return abs(x);";var e1="return (x >= 0.0) ? x : (exp(x) - 1.0);",r1=ae+`
  return (x < 0.0) ? 0.0 : x;
`,o1=ae+`
  return (x < 0.0) ? 0.0 : min(6.0, x);
`,Xi="return x;",n1="return 1.0 / (1.0 + exp(-1.0 * x));";var a1="return x;",i1=`
  vec4 result;

  result.r = (x.r >= 0.0) ? x.r : (exp(x.r) - 1.0);
  result.g = (x.g >= 0.0) ? x.g : (exp(x.g) - 1.0);
  result.b = (x.b >= 0.0) ? x.b : (exp(x.b) - 1.0);
  result.a = (x.a >= 0.0) ? x.a : (exp(x.a) - 1.0);

  return result;
`,c1=`
  vec4 result = x * vec4(greaterThanEqual(x, vec4(0.0)));
  bvec4 isNaN = isnan(x);

  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`,p1=`
  vec4 result = min(x, vec4(6.)) * vec4(greaterThanEqual(x, vec4(0.0)));
  bvec4 isNaN = isnan(x);

  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`,l1="return 1.0 / (1.0 + exp(-1.0 * x));",ir=class{constructor(t,e){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=t,this.enableShapeUniforms=_t(this.outputShape.length),this.userCode=`
      vec4 unaryOperation(vec4 x) {
        ${e}
      }

      void main() {
        vec4 x = getAAtOutCoords();
        vec4 y = unaryOperation(x);

        setOutput(y);
      }
    `}};var bf=class{constructor(t){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!1,this.outputShape=t,this.enableShapeUniforms=_t(this.outputShape.length);let e=t.length,o=Xt("rc",e),n=gt(e),s=YN(e,o),a=o.slice(-2),i=e<=1?"rc":`vec2(${a.join(",")})`;this.userCode=`
      void main() {
        ${n} rc = getOutputCoords();
        vec4 packedInput = getA(${s});

        setOutput(getChannel(packedInput, ${i}));
      }
    `}};var IG=ge.whereImpl,SG=1e-7,vG=1e-4,Cf={};function NG(r){return r in Cf||(Cf[r]={}),Cf[r]}var kG=F().getNumber("CPU_HANDOFF_SIZE_THRESHOLD"),EG=600;function $G(){return F().global.screen==null?1024:F().global.screen.height*F().global.screen.width*window.devicePixelRatio*EG/1024/1024}var iu=class r extends qr{constructor(t){if(super(),this.pendingRead=new WeakMap,this.pendingDisposal=new WeakSet,this.dataRefCount=new WeakMap,this.numBytesInGPU=0,this.uploadWaitMs=0,this.downloadWaitMs=0,this.lastGlFlushTime=0,this.warnedAboutMemory=!1,this.pendingDeletes=0,this.disposed=!1,!F().getBool("HAS_WEBGL"))throw new Error("WebGL is not supported on this device");let e;if(t!=null){if(t instanceof Xc)e=t;else{let o=Ze(F().getNumber("WEBGL_VERSION"),t);e=new Xc(o)}this.binaryCache={},this.gpgpuCreatedLocally=!1}else{let o=Ze(F().getNumber("WEBGL_VERSION"));e=new Xc(o),this.binaryCache=NG(F().getNumber("WEBGL_VERSION")),this.gpgpuCreatedLocally=!0}this.gpgpu=e,this.canvas=this.gpgpu.gl.canvas,this.textureManager=new yf(this.gpgpu),this.numMBBeforeWarning=$G(),this.texData=new Ko(this,Fr())}nextDataId(){return r.nextDataId++}numDataIds(){return this.texData.numDataIds()-this.pendingDeletes}write(t,e,o){if((F().getBool("WEBGL_CHECK_NUMERICAL_PROBLEMS")||F().getBool("DEBUG"))&&this.checkNumericalProblems(t),o==="complex64"&&t!=null)throw new Error("Cannot write to a complex64 dtype. Please use tf.complex(real, imag).");let n={id:this.nextDataId()};return this.texData.set(n,{shape:e,dtype:o,values:t,usage:ve.UPLOAD,refCount:1}),n}refCount(t){return this.texData.has(t)?this.texData.get(t).refCount:0}incRef(t){let e=this.texData.get(t);e.refCount++}decRef(t){if(this.texData.has(t)){let e=this.texData.get(t);e.refCount--}}move(t,e,o,n,s){if(F().getBool("DEBUG")&&this.checkNumericalProblems(e),n==="complex64")throw new Error("Cannot write to a complex64 dtype. Please use tf.complex(real, imag).");this.texData.set(t,{shape:o,dtype:n,values:e,usage:ve.UPLOAD,refCount:s})}disposeIntermediateTensorInfo(t){this.disposeData(t.dataId)}readSync(t){let e=this.texData.get(t),{values:o,dtype:n,complexTensorInfos:s,slice:a,shape:i,isPacked:c}=e;if(a!=null){let m;c?m=new ir(i,Xi):m=new $e(i,Xi);let f=this.runWebGLProgram(m,[{dataId:t,shape:i,dtype:n}],n),d=this.readSync(f.dataId);return this.disposeIntermediateTensorInfo(f),d}if(o!=null)return this.convertAndCacheOnCPU(t);if(n==="string")return o;let p=this.activeTimers!=null,l;p&&(l=y.now());let u;if(n==="complex64"){let m=this.readSync(s.real.dataId),f=this.readSync(s.imag.dataId);u=v.mergeRealAndImagArrays(m,f)}else u=this.getValuesFromTexture(t);return p&&(this.downloadWaitMs+=y.now()-l),this.convertAndCacheOnCPU(t,u)}async read(t){if(this.pendingRead.has(t)){let d=this.pendingRead.get(t);return new Promise(h=>d.push(h))}let e=this.texData.get(t),{values:o,shape:n,slice:s,dtype:a,complexTensorInfos:i,isPacked:c}=e;if(s!=null){let d;c?d=new ir(n,Xi):d=new $e(n,Xi);let h=this.runWebGLProgram(d,[{dataId:t,shape:n,dtype:a}],a),g=this.read(h.dataId);return this.disposeIntermediateTensorInfo(h),g}if(o!=null)return this.convertAndCacheOnCPU(t);if(F().getBool("DEBUG")&&!F().getBool("WEBGL_DOWNLOAD_FLOAT_ENABLED")&&F().getNumber("WEBGL_VERSION")===2)throw new Error("tensor.data() with WEBGL_DOWNLOAD_FLOAT_ENABLED=false and WEBGL_VERSION=2 not yet supported.");let p=null,l;if(a!=="complex64"&&F().get("WEBGL_BUFFER_SUPPORTED")){l=this.decode(t);let d=this.texData.get(l.dataId);p=this.gpgpu.createBufferFromTexture(d.texture.texture,...ru(n))}this.pendingRead.set(t,[]),a!=="complex64"&&await this.gpgpu.createAndWaitForFence();let u;if(a==="complex64"){let d=await Promise.all([this.read(i.real.dataId),this.read(i.imag.dataId)]),h=d[0],g=d[1];u=v.mergeRealAndImagArrays(h,g)}else if(p==null)u=this.getValuesFromTexture(t);else{let d=y.sizeFromShape(n);u=this.gpgpu.downloadFloat32MatrixFromBuffer(p,d)}if(l!=null&&this.disposeIntermediateTensorInfo(l),p!=null){let d=this.gpgpu.gl;at(d,()=>d.deleteBuffer(p))}let m=this.convertAndCacheOnCPU(t,u),f=this.pendingRead.get(t);return this.pendingRead.delete(t),f.forEach(d=>d(m)),this.pendingDisposal.has(t)&&(this.pendingDisposal.delete(t),this.disposeData(t)&&Fr().removeDataId(t,this),this.pendingDeletes--),m}readToGPU(t,e={}){let o=this.texData.get(t),{values:n,shape:s,slice:a,dtype:i,isPacked:c,texture:p}=o;if(i==="complex64")throw new Error("Does not support reading texture for complex64 dtype.");if(a!=null){let f;c?f=new ir(s,Xi):f=new $e(s,Xi);let d=this.runWebGLProgram(f,[{dataId:t,shape:s,dtype:i}],i),h=this.readToGPU(d,e);return this.disposeIntermediateTensorInfo(d),h}if(p==null)throw n!=null?new Error("Data is not on GPU but on CPU."):new Error("There is no data on GPU or CPU.");let l=this.decode(t,e.customTexShape),u=Fr().makeTensorFromTensorInfo(l),m=this.texData.get(l.dataId);return Object.assign({tensorRef:u},m.texture)}bufferSync(t){let e=this.readSync(t.dataId);if(t.dtype==="string")try{let o=e.map(n=>y.decodeString(n));return rt(t.shape,t.dtype,o)}catch{throw new Error("Failed to decode encoded string bytes into utf-8")}return rt(t.shape,t.dtype,e)}checkNumericalProblems(t){if(t!=null)for(let e=0;e<t.length;e++){let o=t[e];if(!xv(o))throw F().getBool("WEBGL_RENDER_FLOAT32_CAPABLE")?Error(`The value ${o} cannot be represented with your current settings. Consider enabling float32 rendering: 'tf.env().set('WEBGL_RENDER_FLOAT32_ENABLED', true);'`):Error(`The value ${o} cannot be represented on this device.`)}}getValuesFromTexture(t){let{shape:e,dtype:o,isPacked:n}=this.texData.get(t),s=y.sizeFromShape(e);if(F().getBool("WEBGL_DOWNLOAD_FLOAT_ENABLED")){let m=this.decode(t),f=this.texData.get(m.dataId),d=this.gpgpu.downloadMatrixFromPackedTexture(f.texture.texture,...ru(e)).subarray(0,s);return this.disposeIntermediateTensorInfo(m),d}let a=F().getBool("WEBGL_PACK")&&n===!0,i=a?of(e):e,c=a?new uf(i):new lf(i),p=this.runWebGLProgram(c,[{shape:i,dtype:o,dataId:t}],"float32"),l=this.texData.get(p.dataId),u=this.gpgpu.downloadByteEncodedFloatMatrixFromOutputTexture(l.texture.texture,l.texShape[0],l.texShape[1]).subarray(0,s);return this.disposeIntermediateTensorInfo(p),u}timerAvailable(){return F().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE")>0}time(t){let e=this.activeTimers,o=[],n=!1;this.programTimersStack==null?(this.programTimersStack=o,n=!0):this.activeTimers.push(o),this.activeTimers=o,t();let s=y.flatten(this.activeTimers.map(c=>c.query)).filter(c=>c!=null),a=y.flatten(this.activeTimers.map(c=>c.name)).filter(c=>c!=null);this.activeTimers=e,n&&(this.programTimersStack=null);let i={uploadWaitMs:this.uploadWaitMs,downloadWaitMs:this.downloadWaitMs,kernelMs:null,wallMs:null};return(async()=>{if(F().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE")>0){let c=await Promise.all(s);i.kernelMs=y.sum(c),i.getExtraProfileInfo=()=>c.map((p,l)=>({name:a[l],ms:p})).map(p=>`${p.name}: ${p.ms}`).join(", ")}else i.kernelMs={error:"WebGL query timers are not supported in this environment."};return this.uploadWaitMs=0,this.downloadWaitMs=0,i})()}memory(){return{unreliable:!1,numBytesInGPU:this.numBytesInGPU,numBytesInGPUAllocated:this.textureManager.numBytesAllocated,numBytesInGPUFree:this.textureManager.numBytesFree}}startTimer(){return F().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE")>0?this.gpgpu.beginQuery():{startMs:y.now(),endMs:null}}endTimer(t){return F().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE")>0?(this.gpgpu.endQuery(),t):(t.endMs=y.now(),t)}async getQueryTime(t){if(F().getNumber("WEBGL_DISJOINT_QUERY_TIMER_EXTENSION_RELIABLE")>0)return this.gpgpu.waitForQueryAndGetTime(t);let e=t;return e.endMs-e.startMs}disposeData(t,e=!1){if(this.pendingDisposal.has(t))return!1;if(!this.texData.has(t))return!0;if(e?this.texData.get(t).refCount=0:this.texData.get(t).refCount--,!e&&this.texData.get(t).refCount>0)return!1;if(this.pendingRead.has(t))return this.pendingDisposal.add(t),this.pendingDeletes++,!1;this.releaseGPUData(t);let{complexTensorInfos:o}=this.texData.get(t);return o!=null&&(this.disposeData(o.real.dataId,e),this.disposeData(o.imag.dataId,e)),this.texData.delete(t),!0}releaseGPUData(t){let{texture:e,dtype:o,texShape:n,usage:s,isPacked:a,slice:i}=this.texData.get(t),c=i&&i.origDataId||t,p=this.dataRefCount.get(c);p>1?this.dataRefCount.set(c,p-1):(this.dataRefCount.delete(c),e!=null&&(this.numBytesInGPU-=this.computeBytes(n,o),this.textureManager.releaseTexture(e,n,s,a)));let l=this.texData.get(t);l.texture=null,l.texShape=null,l.isPacked=!1,l.slice=null}getTexture(t){return this.uploadToGPU(t),this.texData.get(t).texture.texture}getDataInfo(t){return this.texData.get(t)}shouldExecuteOnCPU(t,e=kG){return F().getBool("WEBGL_CPU_FORWARD")&&t.every(o=>this.texData.get(o.dataId).texture==null&&y.sizeFromShape(o.shape)<e)}getGPGPUContext(){return this.gpgpu}where(t){v.warn("tf.where() in webgl locks the UI thread. Call tf.whereAsync() instead");let e=t.dataSync();return IG(t.shape,e)}packedUnaryOp(t,e,o){let n=new ir(t.shape,e),s=this.compileAndRun(n,[t],o);return Fr().makeTensorFromTensorInfo(s)}abs(t){if(this.shouldExecuteOnCPU([t])&&t.dtype!=="complex64"){let n=hf(this.texData.get(t.dataId).values);return this.makeOutput(t.shape,t.dtype,n)}if(F().getBool("WEBGL_PACK_UNARY_OPERATIONS"))return this.packedUnaryOp(t,_y,t.dtype);let e=new $e(t.shape,_y),o=this.compileAndRun(e,[t]);return Fr().makeTensorFromTensorInfo(o)}makeTensorInfo(t,e,o){let n;if(e==="string"&&o!=null&&o.length>0&&y.isString(o[0])){let s=o.map(a=>y.encodeString(a));n=this.write(s,t,e)}else n=this.write(o,t,e);return this.texData.get(n).usage=null,{dataId:n,shape:t,dtype:e}}makeOutput(t,e,o){return Fr().makeTensorFromTensorInfo(this.makeTensorInfo(t,e,o),this)}unpackTensor(t){let e=new bf(t.shape);return this.runWebGLProgram(e,[t],t.dtype)}packTensor(t){let e=new xf(t.shape);return this.runWebGLProgram(e,[t],t.dtype,null,!0)}packedReshape(t,e){let o=[ns(t.shape),...ss(t.shape)],n={dtype:t.dtype,shape:o,dataId:t.dataId},s=[ns(e),...ss(e)],a=new Yc(s,o),i=!0,c=[o],p=this.runWebGLProgram(a,[n],t.dtype,c,i);return{dataId:p.dataId,shape:e,dtype:p.dtype}}decode(t,e){let o=this.texData.get(t),{isPacked:n,shape:s,dtype:a}=o;if(e!=null){let m=y.sizeFromShape(s),f=e[0]*e[1]*4;y.assert(m<=f,()=>"customTexShape is too small. Row * Column * 4 should be equal or larger than the size of the tensor data.")}let i=of(s),c;n?c=new pf(i):c=new cf(i);let p=!0,l=[e??ru(i)],u=this.runWebGLProgram(c,[{shape:i,dtype:a,dataId:t}],a,l,p,e);return{dtype:a,shape:s,dataId:u.dataId}}runWebGLProgram(t,e,o,n,s=!1,a){let i=this.makeTensorInfo(t.outputShape,o),c=this.texData.get(i.dataId);if(t.packedOutput&&(c.isPacked=!0),t.outPackingScheme===os.DENSE){let x=a??ru(t.outputShape);c.texShape=x.map(b=>b*2)}if(t.outTexUsage!=null&&(c.usage=t.outTexUsage),y.sizeFromShape(i.shape)===0)return c.values=y.getTypedArrayFromDType(i.dtype,0),i;let p=[],l=e.map(x=>{if(x.dtype==="complex64")throw new Error("GPGPUProgram does not support complex64 input. For complex64 dtypes, please separate the program into real and imaginary parts.");let b=this.texData.get(x.dataId);if(b.texture==null){if(!t.packedInputs&&y.sizeFromShape(x.shape)<=F().getNumber("WEBGL_SIZE_UPLOAD_UNIFORM"))return{shape:x.shape,texData:null,isUniform:!0,uniformValues:b.values};t.packedInputs&&(b.isPacked=!0,b.shape=x.shape)}if(this.uploadToGPU(x.dataId),!!b.isPacked!=!!t.packedInputs)x=b.isPacked?this.unpackTensor(x):this.packTensor(x),p.push(x),b=this.texData.get(x.dataId);else if(b.isPacked&&!Hi(b.shape,x.shape)){let w=x,I=x.shape;x.shape=b.shape,x=this.packedReshape(x,I),p.push(x),b=this.texData.get(x.dataId),w.shape=I}return{shape:x.shape,texData:b,isUniform:!1}});this.uploadToGPU(i.dataId);let u={shape:i.shape,texData:c,isUniform:!1},m=Hv(t,l,u),f=this.getAndSaveBinary(m,()=>zv(this.gpgpu,t,l,u)),d=this.activeTimers!=null,h;d&&(h=this.startTimer()),F().get("ENGINE_COMPILE_ONLY")||Wv(this.gpgpu,f,l,u,n),p.forEach(x=>this.disposeIntermediateTensorInfo(x)),d&&(h=this.endTimer(h),this.activeTimers.push({name:t.constructor.name,query:this.getQueryTime(h)}));let g=F().get("WEBGL_FLUSH_THRESHOLD");if(g>0){let x=y.now();x-this.lastGlFlushTime>g&&(this.gpgpu.gl.flush(),this.lastGlFlushTime=x)}if(!F().getBool("WEBGL_LAZILY_UNPACK")&&c.isPacked&&s===!1){let x=this.unpackTensor(i);return this.disposeIntermediateTensorInfo(i),x}return i}compileAndRun(t,e,o,n,s=!1){return o=o||e[0].dtype,this.runWebGLProgram(t,e,o,n,s)}getAndSaveBinary(t,e){return t in this.binaryCache||(this.binaryCache[t]=e()),this.binaryCache[t]}getTextureManager(){return this.textureManager}dispose(){this.disposed||(F().getBool("IS_TEST")||Object.keys(this.binaryCache).forEach(e=>{this.gpgpu.deleteProgram(this.binaryCache[e].webGLProgram),delete this.binaryCache[e]}),this.textureManager.dispose(),this.canvas!=null&&typeof HTMLCanvasElement<"u"&&this.canvas instanceof HTMLCanvasElement?this.canvas.remove():this.canvas=null,this.gpgpuCreatedLocally&&(this.gpgpu.program=null,this.gpgpu.dispose()),this.disposed=!0)}floatPrecision(){return this.floatPrecisionValue==null&&(this.floatPrecisionValue=ht(()=>{if(!F().get("WEBGL_RENDER_FLOAT32_ENABLED")){let t=F().getBool("DEBUG");F().set("DEBUG",!1);let e=this.abs(it(1e-8)).dataSync()[0];if(F().set("DEBUG",t),e>0)return 32}return 16})),this.floatPrecisionValue}epsilon(){return this.floatPrecision()===32?SG:vG}uploadToGPU(t){let e=this.texData.get(t),{shape:o,dtype:n,values:s,texture:a,usage:i,isPacked:c}=e;if(a!=null)return;let p=this.activeTimers!=null,l;p&&(l=y.now());let u=e.texShape;if(u==null&&(u=Av(o,c),e.texShape=u),s!=null){let m=of(o),f,d=u[1],h=u[0],g=s instanceof Uint8Array||s instanceof Uint8ClampedArray;(c||!g)&&([d,h]=mo(u[0],u[1])),c?f=new ff(m,g):f=new mf(m,g);let x=g?[h,d]:u,b=this.makeTensorInfo(x,n),w=this.texData.get(b.dataId);g?w.usage=ve.PIXELS:w.usage=ve.UPLOAD,w.texShape=x,this.gpgpu.uploadDenseMatrixToTexture(this.getTexture(b.dataId),d,h,s);let I=[[h,d]],$=this.runWebGLProgram(f,[b],n,I,!0),R=this.texData.get($.dataId);e.texShape=R.texShape,e.isPacked=R.isPacked,e.usage=R.usage,F().get("ENGINE_COMPILE_ONLY")?this.disposeData($.dataId):(e.texture=R.texture,e.values=null,this.texData.delete($.dataId)),this.disposeIntermediateTensorInfo(b),p&&(this.uploadWaitMs+=y.now()-l)}else{let m=this.acquireTexture(u,i,n,c);e.texture=m}}convertAndCacheOnCPU(t,e){let o=this.texData.get(t),{dtype:n}=o;return this.releaseGPUData(t),e!=null&&(o.values=AG(e,n)),o.values}acquireTexture(t,e,o,n){if(this.numBytesInGPU+=this.computeBytes(t,o),!this.warnedAboutMemory&&this.numBytesInGPU>this.numMBBeforeWarning*1024*1024){let s=(this.numBytesInGPU/1024/1024).toFixed(2);this.warnedAboutMemory=!0,console.warn(`High memory usage in GPU: ${s} MB, most likely due to a memory leak`)}return this.textureManager.acquireTexture(t,e,n)}computeBytes(t,e){return t[0]*t[1]*y.bytesPerElement(e)}checkCompileCompletion(){for(let[,t]of Object.entries(this.binaryCache))this.checkCompletion_(t)}async checkCompileCompletionAsync(){let t=[];if(this.gpgpu.parallelCompilationExtension){for(let[,e]of Object.entries(this.binaryCache))t.push(this.checkCompletionAsync_(e));return Promise.all(t)}else{for(let[,e]of Object.entries(this.binaryCache)){let o=new Promise(n=>{try{this.checkCompletion_(e),n(!0)}catch(s){throw s}});t.push(o)}return Promise.all(t)}}async checkCompletionAsync_(t){return this.gpgpu.gl.getProgramParameter(t.webGLProgram,this.gpgpu.parallelCompilationExtension.COMPLETION_STATUS_KHR)?this.checkCompletion_(t):(await um(),this.checkCompletionAsync_(t))}checkCompletion_(t){if(this.gpgpu.gl.getProgramParameter(t.webGLProgram,this.gpgpu.gl.LINK_STATUS)===!1)throw console.log(this.gpgpu.gl.getProgramInfoLog(t.webGLProgram)),this.gpgpu.gl.getShaderParameter(t.fragmentShader,this.gpgpu.gl.COMPILE_STATUS)===!1?(Iy(t.source,this.gpgpu.gl.getShaderInfoLog(t.fragmentShader)),new Error("Failed to compile fragment shader.")):new Error("Failed to link vertex and fragment shaders.");return!0}getUniformLocations(){for(let[,t]of Object.entries(this.binaryCache)){let{uniformLocations:e,customUniformLocations:o,infLoc:n,nanLoc:s,inShapesLocations:a,inTexShapesLocations:i,outShapeLocation:c,outShapeStridesLocation:p,outTexShapeLocation:l}=ky(this.gpgpu,t.program,t.webGLProgram);t.uniformLocations=e,t.customUniformLocations=o,t.infLoc=n,t.nanLoc=s,t.inShapesLocations=a,t.inTexShapesLocations=i,t.outShapeLocation=c,t.outShapeStridesLocation=p,t.outTexShapeLocation=l}}};iu.nextDataId=0;function AG(r,t){if(t==="float32"||t==="complex64")return r;if(t==="int32"||t==="bool"){let e=t==="int32"?new Int32Array(r.length):new Uint8Array(r.length);for(let o=0;o<e.length;++o)e[o]=Math.round(r[o]);return e}else throw new Error(`Unknown dtype ${t}`)}So.isBrowser()&&Pp("webgl",()=>new iu,2);var Zc=`
  if (isnan(a)) return a;
  if (isnan(b)) return b;
`;var cr=class{constructor(t,e,o){this.variableNames=["A","B"],this.outputShape=v.assertAndGetBroadcastShape(e,o),this.enableShapeUniforms=_t(this.outputShape.length),this.userCode=`
      float binaryOperation(float a, float b) {
        ${t}
      }

      void main() {
        float a = getAAtOutCoords();
        float b = getBAtOutCoords();
        setOutput(binaryOperation(a, b));
      }
    `}};var ho=`
  result.r = isNaN.r ? NAN : result.r;
  result.g = isNaN.g ? NAN : result.g;
  result.b = isNaN.b ? NAN : result.b;
  result.a = isNaN.a ? NAN : result.a;
`;var Ir=class{constructor(t,e,o,n=!1){this.variableNames=["A","B"],this.supportsBroadcasting=!0,this.packedInputs=!0,this.packedOutput=!0,this.outputShape=v.assertAndGetBroadcastShape(e,o);let s=this.outputShape.length;this.enableShapeUniforms=_t(s);let a="";if(n)if(s===0||y.sizeFromShape(this.outputShape)===1)a=`
          result.y = 0.;
          result.z = 0.;
          result.w = 0.;
        `;else if(a=`
          ${gt(s)} coords = getOutputCoords();
        `,s===1)this.enableShapeUniforms?a+=`
            result.y = (coords + 1) >= outShape ? 0. : result.y;
            result.z = 0.;
            result.w = 0.;
          `:a+=`
            result.y = (coords + 1) >= ${this.outputShape[0]} ? 0. : result.y;
            result.z = 0.;
            result.w = 0.;
          `;else{let c=Xt("coords",s);this.enableShapeUniforms?a+=`
            bool nextRowOutOfBounds =
              (${c[s-2]} + 1) >= outShape[${s} - 2];
            bool nextColOutOfBounds =
              (${c[s-1]} + 1) >= outShape[${s} - 1];
            result.y = nextColOutOfBounds ? 0. : result.y;
            result.z = nextRowOutOfBounds ? 0. : result.z;
            result.w = nextColOutOfBounds || nextRowOutOfBounds ? 0. : result.w;
          `:a+=`
            bool nextRowOutOfBounds =
              (${c[s-2]} + 1) >= ${this.outputShape[s-2]};
            bool nextColOutOfBounds =
              (${c[s-1]} + 1) >= ${this.outputShape[s-1]};
            result.y = nextColOutOfBounds ? 0. : result.y;
            result.z = nextRowOutOfBounds ? 0. : result.z;
            result.w = nextColOutOfBounds || nextRowOutOfBounds ? 0. : result.w;
          `}this.userCode=`
      vec4 binaryOperation(vec4 a, vec4 b) {
        ${t}
      }

      void main() {
        vec4 a = getAAtOutCoords();
        vec4 b = getBAtOutCoords();

        vec4 result = binaryOperation(a, b);
        ${a}

        setOutput(result);
      }
    `}};function Yt(r){let{inputs:t,backend:e}=r,{x:o}=t;return e.incRef(o.dataId),{dataId:o.dataId,shape:o.shape,dtype:o.dtype}}var u1={kernelName:To,backendName:"webgl",kernelFunc:Yt};function Ge(r){let{inputs:t,backend:e}=r,{real:o,imag:n}=t,s=e.makeTensorInfo(o.shape,"complex64"),a=e.texData.get(s.dataId),i=Yt({inputs:{x:o},backend:e}),c=Yt({inputs:{x:n},backend:e});return a.complexTensorInfos={real:i,imag:c},s}var m1={kernelName:Is,backendName:"webgl",kernelFunc:Ge};var Oy="return (a < 0.) ? b * a : a;",Py=`
  vec4 aLessThanZero = vec4(lessThan(a, vec4(0.)));
  return (aLessThanZero * (b * a)) + ((vec4(1.0) - aLessThanZero) * a);
`;function RG(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{alpha:s}=o,a=e.makeTensorInfo([],"float32",y.createScalarValue(s,"float32")),i=F().getBool("WEBGL_PACK_BINARY_OPERATIONS")?new Ir(Py,n.shape,a.shape):new cr(Oy,n.shape,a.shape),c=e.runWebGLProgram(i,[n,a],"float32");return e.disposeIntermediateTensorInfo(a),c}var f1={kernelName:ta,backendName:"webgl",kernelFunc:RG};var Ly="return (a < 0.) ? b * a : a;",My=`
  vec4 aLessThanZero = vec4(lessThan(a, vec4(0.)));
  return (aLessThanZero * (b * a)) + ((vec4(1.0) - aLessThanZero) * a);
`;function DG(r){let{inputs:t,backend:e}=r,{x:o,alpha:n}=t,s=F().getBool("WEBGL_PACK_BINARY_OPERATIONS")?new Ir(My,o.shape,n.shape):new cr(Ly,o.shape,n.shape);return e.runWebGLProgram(s,[o,n],"float32")}var d1={kernelName:ya,backendName:"webgl",kernelFunc:DG};var Sr="if (isnan(x)) return x;";function st({opSnippet:r,packedOpSnippet:t,cpuKernelImpl:e,dtype:o}){return({inputs:n,backend:s})=>{let{x:a}=n,i=s,c=o||a.dtype;if(i.shouldExecuteOnCPU([a])&&e!=null){let u=i.texData.get(a.dataId),m=e(u.values,c);return i.makeTensorInfo(a.shape,c,m)}let p=F().getBool("WEBGL_PACK_UNARY_OPERATIONS")&&t!=null,l;return p?l=new ir(a.shape,t):l=new $e(a.shape,r),i.runWebGLProgram(l,[a],c)}}function Ft({opSnippet:r,packedOpSnippet:t,checkOutOfBounds:e=!1,supportsComplex:o=!1,cpuKernelImpl:n,dtype:s}){return({inputs:a,backend:i})=>{let{a:c,b:p}=a,l=i;if(o&&c.dtype==="complex64"){let d=l.texData.get(c.dataId),h=l.texData.get(p.dataId),[g,x]=[[d.complexTensorInfos.real,h.complexTensorInfos.real],[d.complexTensorInfos.imag,h.complexTensorInfos.imag]].map(w=>{let[I,k]=w,$={dataId:I.dataId,dtype:I.dtype,shape:c.shape},R={dataId:k.dataId,dtype:k.dtype,shape:p.shape},D=new cr(r,c.shape,p.shape);return l.runWebGLProgram(D,[$,R],Qt(I.dtype,k.dtype))}),b=Ge({inputs:{real:g,imag:x},backend:l});return l.disposeIntermediateTensorInfo(g),l.disposeIntermediateTensorInfo(x),b}let u=s||Qt(c.dtype,p.dtype);if((c.dtype==="string"||p.dtype==="string"||l.shouldExecuteOnCPU([c,p]))&&n!=null){let d=l.texData.get(c.dataId).values,h=l.texData.get(p.dataId).values,g=c.dtype==="string"?v.fromUint8ToStringArray(d):d,x=c.dtype==="string"?v.fromUint8ToStringArray(h):h,[b,w]=n(c.shape,p.shape,g,x,u),I=l.makeTensorInfo(w,u),k=l.texData.get(I.dataId);return k.values=b,I}let m=F().getBool("WEBGL_PACK_BINARY_OPERATIONS")&&t!=null,f;return m?f=new Ir(t,c.shape,p.shape,e):f=new cr(r,c.shape,p.shape),l.runWebGLProgram(f,[c,p],u)}}function Vo(r,t=!1){if(r==="linear")return t?a1:t1;if(r==="relu")return t?c1:r1;if(r==="elu")return t?i1:e1;if(r==="relu6")return t?p1:o1;if(r==="prelu")return t?My:Ly;if(r==="leakyrelu")return t?Py:Oy;if(r==="sigmoid")return t?l1:n1;throw new Error(`Activation ${r} has not been implemented for the WebGL backend.`)}var Qc=class{constructor(t,e,o,n=!1,s=!1,a=!1,i=null,c=!1,p=!1){this.variableNames=["matrixA","matrixB"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=o,this.enableShapeUniforms=_t(this.outputShape.length);let l=n?t[1]:t[2],u=Math.ceil(l/2),m=n?"i * 2, rc.y":"rc.y, i * 2",f=s?"rc.z, i * 2":"i * 2, rc.z",d=n?["a.xxyy","a.zzww"]:["a.xxzz","a.yyww"],h=s?["b.xzxz","b.ywyw"]:["b.xyxy","b.zwzw"],g="",x="";i&&(c?g=`vec4 activation(vec4 a) {
          vec4 b = getPreluActivationWeightsAtOutCoords();
          ${i}
        }`:p?g=`vec4 activation(vec4 a) {
          vec4 b = getLeakyreluAlphaAtOutCoords();
          ${i}
        }`:g=`vec4 activation(vec4 x) {
          ${i}
        }`,x="result = activation(result);");let b=a?"result += getBiasAtOutCoords();":"";a&&this.variableNames.push("bias"),c&&this.variableNames.push("preluActivationWeights"),p&&this.variableNames.push("leakyreluAlpha");let w="rc.x",I="rc.x";t[0]<e[0]?w=`int(min(float(rc.x), ${t[0]-1}.))`:e[0]<t[0]&&(I=`int(min(float(rc.x), ${e[0]-1}.))`),this.userCode=`
      ${g}
      // Don't use uniform for sharedDimensionPacked for performance.
      const float sharedDimension = ${u}.0;

      vec4 dot2x2ARowBCol(ivec3 rc) {
        vec4 result = vec4(0);
        for (int i = 0; i < ${u}; i++) {
          int batchA = ${w};
          int batchB = ${I};
          vec4 a = getMatrixA(batchA, ${m});
          vec4 b = getMatrixB(batchB, ${f});

          // These swizzled products need to be separately added.
          // See: https://github.com/tensorflow/tfjs/issues/1735
          result += (${d[0]} * ${h[0]});
          result += (${d[1]} * ${h[1]});
        }
        return result;
      }

      void main() {
        ivec3 rc = getOutputCoords();
        vec4 result = dot2x2ARowBCol(rc);

        ${b}

        ${x}

        setOutput(result);
      }
    `}};var By={REAL:"return areal * breal - aimag * bimag;",IMAG:"return areal * bimag + aimag * breal;"},cu=class{constructor(t,e,o){this.variableNames=["AReal","AImag","BReal","BImag"],this.outputShape=v.assertAndGetBroadcastShape(e,o),this.userCode=`
      float binaryOpComplex(
          float areal, float aimag, float breal, float bimag) {
        ${t}
      }

      void main() {
        float areal = getARealAtOutCoords();
        float aimag = getAImagAtOutCoords();
        float breal = getBRealAtOutCoords();
        float bimag = getBImagAtOutCoords();
        setOutput(binaryOpComplex(areal, aimag, breal, bimag));
      }
    `}};var h1="return a * b;";function pu(r){let{inputs:t,backend:e}=r,{a:o,b:n}=t,s=v.upcastType(o.dtype,n.dtype);if(o.dtype==="complex64"){let i=e.texData.get(o.dataId),c=e.texData.get(n.dataId),p=new cu(By.REAL,o.shape,n.shape),l=new cu(By.IMAG,o.shape,n.shape),u=[{dataId:i.complexTensorInfos.real.dataId,dtype:i.complexTensorInfos.real.dtype,shape:o.shape},{dataId:i.complexTensorInfos.imag.dataId,dtype:i.complexTensorInfos.imag.dtype,shape:o.shape},{dataId:c.complexTensorInfos.real.dataId,dtype:c.complexTensorInfos.real.dtype,shape:n.shape},{dataId:c.complexTensorInfos.imag.dataId,dtype:c.complexTensorInfos.imag.dtype,shape:n.shape}],m=e.runWebGLProgram(p,u,"float32"),f=e.runWebGLProgram(l,u,"float32"),d=Ge({inputs:{real:m,imag:f},backend:e});return e.disposeIntermediateTensorInfo(m),e.disposeIntermediateTensorInfo(f),d}if(e.shouldExecuteOnCPU([o,n])){let i=e.texData.get(o.dataId),c=e.texData.get(n.dataId),[p,l]=EN(o.shape,n.shape,i.values,c.values,s),u=e.makeTensorInfo(l,s),m=e.texData.get(u.dataId);return m.values=p,u}let a;return F().getBool("WEBGL_PACK_BINARY_OPERATIONS")?a=new Ir(h1,o.shape,n.shape):a=new cr(h1,o.shape,n.shape),e.runWebGLProgram(a,[o,n],s)}var g1={kernelName:Sn,backendName:"webgl",kernelFunc:pu};function x1(r,t,e){let o=[ns(r.shape),...ss(r.shape)],n={dtype:r.dtype,shape:o,dataId:r.dataId},s=[ns(t),...ss(t)],a=new Yc(s,o),i=!0,c=[o],p=e.runWebGLProgram(a,[n],r.dtype,c,i);return{dataId:p.dataId,shape:t,dtype:p.dtype}}function K(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{shape:s}=o,a=e,i=y.sizeFromShape(n.shape),c=y.inferFromImplicitShape(s,i),p=y.sizeFromShape(c);y.assert(i===p,()=>`The new shape (${c}) has ${p} elements and the old shape (${n.shape}) has ${i} elements. The new shape and old shape must have the same number of elements.`);let l=a.texData.get(n.dataId);return l.isPacked&&!Hi(n.shape,c)&&!(l.texture!==null&&Hi(l.shape,c))?x1(n,c,a):(a.incRef(n.dataId),{dataId:n.dataId,shape:c,dtype:n.dtype})}var y1={kernelName:Sa,backendName:"webgl",kernelFunc:K};var lu=class{constructor(t,e){this.variableNames=["x"];let{windowSize:o,batchSize:n,inSize:s,outSize:a}=t;this.outputShape=[n,a];let i=Math.floor(o/4)*4,c=o%4,p="sumValue += dot(values, ones);";if(e!=null){let u=1/e;p=`sumValue += dot(values * ${y.isInt(u)?u.toPrecision(2):u}, ones);`}let l="";s%o>0&&(l=`
        if (inIdx < 0 || inIdx >= ${s}) {
          return 0.0;
        }
      `),this.userCode=`
      const vec4 ones = vec4(1.0, 1.0, 1.0, 1.0);

      float getValue(int batch, int inIdx) {
        ${l}
        return getX(batch, inIdx);
      }

      void main() {
        ivec2 coords = getOutputCoords();
        int batch = coords[0];
        int outIdx = coords[1];
        int inOffset = outIdx * ${o};

        float sumValue = 0.0;

        for (int i = 0; i < ${i}; i += 4) {
          int inIdx = inOffset + i;
          vec4 values = vec4(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            getValue(batch, inIdx + 2),
            getValue(batch, inIdx + 3)
          );

          ${p}
        }

        int inIdx = inOffset + ${i};
        if (${c===1}) {
          vec4 values = vec4(getValue(batch, inIdx), 0.0, 0.0, 0.0);

          ${p}
        } else if (${c===2}) {
          vec4 values = vec4(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1), 0.0, 0.0);

          ${p}
        } else if (${c===3}) {
          vec4 values = vec4(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            getValue(batch, inIdx + 2), 0.0);

          ${p}
        }
        setOutput(sumValue);
      }
    `}};var Tf=class{constructor(t,e){this.variableNames=["x"];let{windowSize:o,batchSize:n,inSize:s,outSize:a}=t;this.outputShape=[n,a];let i="0.0",c="";e==="prod"?i="1.0":e==="min"?(i="1.0 / 1e-20",c="min"):e==="max"&&(i="-1.0 / 1e-20",c="max");let p=`${e}(${e}(${e}(minMaxValue[0], minMaxValue[1]), minMaxValue[2]), minMaxValue[3])`;e==="sum"?p="sumValue":e==="prod"?p="prodValue":e==="all"?p="allValue":e==="any"&&(p="anyValue");let l=Math.floor(o/4)*4,u=o%4,m=`
      if (${e==="sum"}) {
        sumValue += dot(values, ones);
      } else if (${e==="prod"}) {
        vec2 tmp = vec2(values[0], values[1]) * vec2(values[2], values[3]);
        prodValue *= tmp[0] * tmp[1];
      } else {
        minMaxValue = ${c}(values, minMaxValue);
        if (${e==="min"} || ${e==="max"}) {
          minMaxValue = ${c}(values, minMaxValue);
          bvec4 isNaN = isnan(values);
          if (isNaN.r || isNaN.g || isNaN.b || isNaN.a) {
            minMaxValue = vec4(NAN);
          }
        }
      }
    `,f="vec4";e==="all"?(i="1.0",m=`
        bool reducedAllValue = all(values);
        float floatedReducedAllValue = float(reducedAllValue);
        allValue = float(allValue >= 1.0 && floatedReducedAllValue >= 1.0);
      `,f="bvec4"):e==="any"&&(i="0.0",m=`
        bool reducedAnyValue = any(values);
        float floatedReducedAnyValue = float(reducedAnyValue);
        anyValue = float(anyValue >= 1.0 || floatedReducedAnyValue >= 1.0);
      `,f="bvec4");let d="";s%o>0&&(d=`
        if (inIdx < 0 || inIdx >= ${s}) {
          return initializationValue;
        }
      `),this.userCode=`
      const float initializationValue = ${i};
      const vec4 ones = vec4(1.0, 1.0, 1.0, 1.0);

      float getValue(int batch, int inIdx) {
        ${d}
        return getX(batch, inIdx);
      }

      void main() {
        ivec2 coords = getOutputCoords();
        int batch = coords[0];
        int outIdx = coords[1];
        int inOffset = outIdx * ${o};

        vec4 minMaxValue = vec4(${i});
        float prodValue = 1.0;
        float sumValue = 0.0;
        float allValue = 1.0;
        float anyValue = 0.0;

        for (int i = 0; i < ${l}; i += 4) {
          int inIdx = inOffset + i;
          ${f} values = ${f}(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            getValue(batch, inIdx + 2),
            getValue(batch, inIdx + 3)
          );

          ${m}
        }

        int inIdx = inOffset + ${l};
        if (${u===1}) {
          ${f} values = ${f}(
            getValue(batch, inIdx),
            initializationValue,
            initializationValue,
            initializationValue
          );

          ${m}
        } else if (${u===2}) {
          ${f} values = ${f}(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            initializationValue,
            initializationValue
          );

          ${m}
        } else if (${u===3}) {
          ${f} values = ${f}(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            getValue(batch, inIdx + 2),
            initializationValue
          );

          ${m}
        }
        setOutput(${p});
      }
    `}};function _G(r){let t=[];for(;t.length===0||t[t.length-1].outSize!==1;){let e=t.length?t[t.length-1].outSize:r[1],o=v.computeOptimalWindowSize(e);t.push({inSize:e,windowSize:o,outSize:Math.ceil(e/o)})}return t}function Qe(r,t,e,o){let n=_G(r.shape),s=r;for(let a=0;a<n.length;a++){let{inSize:i,windowSize:c,outSize:p}=n[a],l,u;e==="mean"?l=a===0?new lu({windowSize:c,inSize:i,batchSize:r.shape[0],outSize:p},i):new lu({windowSize:c,inSize:i,batchSize:r.shape[0],outSize:p}):l=new Tf({windowSize:c,inSize:i,batchSize:r.shape[0],outSize:p},e),u=s,s=o.runWebGLProgram(l,[s],t),u.dataId!==r.dataId&&o.disposeIntermediateTensorInfo(u)}return s}var wf=class{constructor(t,e){this.variableNames=["A"];let o=new Array(t.length);for(let a=0;a<o.length;a++)o[a]=t[e[a]];this.outputShape=o,this.rank=o.length;let n=gt(this.rank),s=OG(e);this.userCode=`
    void main() {
      ${n} resRC = getOutputCoords();
      setOutput(getA(${s}));
    }
    `}};function OG(r){let t=r.length;if(t>6)throw Error(`Transpose for rank ${t} is not yet supported`);let e=["resRC.x","resRC.y","resRC.z","resRC.w","resRC.u","resRC.v"],o=new Array(t);for(let n=0;n<r.length;n++)o[r[n]]=e[n];return o.join()}var If=class{constructor(t,e){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0;let o=new Array(t.length);for(let l=0;l<o.length;l++)o[l]=t[e[l]];if(this.outputShape=o,this.rank=o.length,this.rank>6)throw Error(`Packed transpose for rank ${this.rank} is not yet supported.`);let n=gt(this.rank),s=Fy("rc",this.rank),a=new Array(this.rank);for(let l=0;l<e.length;l++)a[e[l]]=s[l];let i=`vec2(${a.slice(-2).join()})`,c=`++${s[this.rank-1]} < ${o[this.rank-1]}`,p=`getChannel(getA(${a.join()}), ${i})`;this.userCode=`
    void main() {
      ${n} rc = getOutputCoords();
      vec4 result = vec4(0.);
      result[0] = ${p};
      if(${c}) {
        result[1] = ${p};
      }
      --${s[this.rank-1]};
      if(++${s[this.rank-2]} < ${o[this.rank-2]}) {
        result[2] = ${p};
        if(${c}) {
          result[3] = ${p};
        }
      }
      setOutput(result);
    }
    `}};function as(r,t,e){let o=F().getBool("WEBGL_PACK_ARRAY_OPERATIONS")?new If(r.shape,t):new wf(r.shape,t);return e.runWebGLProgram(o,[r],r.dtype)}function b1(r,t,e,o){let n=t,s=r.shape.length,a=y.parseAxisParam(n,r.shape),i=a,c=v.getAxesPermutation(i,s),p=c!=null,l=r;p&&(l=as(r,c,o),i=v.getInnerMostAxes(i.length,s)),v.assertAxesAreInnerMostDims("sum",i,s);let[u,m]=v.computeOutAndReduceShapes(l.shape,i),f=u;e&&(f=v.expandShapeToKeepDim(u,a));let d=y.sizeFromShape(m),g=y.sizeFromShape(r.shape)/d,x=K({inputs:{x:l},attrs:{shape:[g,d]},backend:o}),b=Hn(r.dtype),w=Qe(x,b,"sum",o),I=K({inputs:{x:w},attrs:{shape:f},backend:o});return o.disposeIntermediateTensorInfo(x),o.disposeIntermediateTensorInfo(w),p&&o.disposeIntermediateTensorInfo(l),I}function Yi(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{axis:s,keepDims:a}=o;return b1(n,s,a,e)}var C1={kernelName:"Sum",backendName:"webgl",kernelFunc:Yi};function Bt(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{perm:s}=o,a=e,i=n.shape.length,c=new Array(i);for(let l=0;l<c.length;l++)c[l]=n.shape[s[l]];let p;if(a.shouldExecuteOnCPU([n])){let u=a.texData.get(n.dataId).values,m=ji(u,n.shape,n.dtype,s,c);p=a.makeTensorInfo(c,n.dtype);let f=a.texData.get(p.dataId);f.values=m}else p=as(n,s,a);return p}var T1={kernelName:Io,backendName:"webgl",kernelFunc:Bt};var Vy=1e3;function Zi({a:r,b:t,transposeA:e,transposeB:o,backend:n,bias:s=null,preluActivationWeights:a=null,leakyreluAlpha:i=0,activation:c=null}){let p=r.shape.length,l=t.shape.length,u=e?r.shape[p-2]:r.shape[p-1],m=o?t.shape[l-1]:t.shape[l-2],f=e?r.shape[p-1]:r.shape[p-2],d=o?t.shape[l-2]:t.shape[l-1],h=r.shape.slice(0,-2),g=t.shape.slice(0,-2),x=y.sizeFromShape(h),b=y.sizeFromShape(g),I=_r.assertAndGetBroadcastShape(r.shape.slice(0,-2),t.shape.slice(0,-2)).concat([f,d]);y.assert(u===m,()=>`Error in matMul: inner shapes (${u}) and (${m}) of Tensors with shapes ${r.shape} and ${t.shape} and transposeA=${e} and transposeB=${o} must match.`);let k=e?[x,u,f]:[x,f,u],$=o?[b,d,m]:[b,m,d],R=K({inputs:{x:r},backend:n,attrs:{shape:k}}),D=K({inputs:{x:t},backend:n,attrs:{shape:$}}),_=[R,D],O=Math.max(x,b),L=e?R.shape[1]:R.shape[2],M=s!=null,B=a!=null,G=c==="leakyrelu",V=c!=null?Vo(c,!0):null,W=M||B||G||V!=null,H;if((f===1||d===1)&&L>Vy&&W===!1){let q=R,X=D;e&&(q=Bt({inputs:{x:R},backend:n,attrs:{perm:[0,2,1]}}),_.push(q)),o&&(X=Bt({inputs:{x:D},backend:n,attrs:{perm:[0,2,1]}}),_.push(X));let Y=d!==1,J=d===1,Z=q;Y&&(Z=K({inputs:{x:q},backend:n,attrs:{shape:[O,L,1]}}),_.push(Z));let et=d===1?2:1,Q=X;J&&(Q=K({inputs:{x:X},backend:n,attrs:{shape:[O,1,L]}}),_.push(Q));let nt=pu({inputs:{a:Z,b:Q},backend:n});H=Yi({inputs:{x:nt},backend:n,attrs:{axis:et,keepDims:!0}}),_.push(nt)}else{let q=Qt(r.dtype,t.dtype),X=new Qc(k,$,[O,f,d],e,o,M,V,B,G),Y=[R,D];if(s!=null&&Y.push(s),B&&Y.push(a),G){let J=n.makeTensorInfo([],"float32",y.createScalarValue(i,"float32"));Y.push(J),_.push(J)}H=n.runWebGLProgram(X,Y,q)}let U=K({inputs:{x:H},backend:n,attrs:{shape:I}});_.push(H);for(let q of _)n.disposeIntermediateTensorInfo(q);return U}function PG(r){let{inputs:t,backend:e,attrs:o}=r,{a:n,b:s,bias:a,preluActivationWeights:i}=t,{transposeA:c,transposeB:p,activation:l,leakyreluAlpha:u}=o;return Zi({a:n,b:s,transposeA:c,transposeB:p,backend:e,bias:a,preluActivationWeights:i,leakyreluAlpha:u,activation:l})}var w1={kernelName:Vn,backendName:"webgl",kernelFunc:PG};var I1="return abs(x);";function LG(r){let{inputs:t,backend:e}=r,{x:o}=t;if(e.shouldExecuteOnCPU([o])&&o.dtype!=="complex64"){let s=e.texData.get(o.dataId),a=hf(s.values);return e.makeTensorInfo(o.shape,o.dtype,a)}let n;return F().getBool("WEBGL_PACK_UNARY_OPERATIONS")?n=new ir(o.shape,I1):n=new $e(o.shape,I1),e.runWebGLProgram(n,[o],o.dtype)}var S1={kernelName:"Abs",backendName:"webgl",kernelFunc:LG};var MG=ae+`
  if (abs(x) > 1.) {
    return NAN;
  }
  return acos(x);
`,BG=st({opSnippet:MG}),v1={kernelName:Xo,backendName:"webgl",kernelFunc:BG};var VG=ae+`
  if (x < 1.0) return NAN;
return log(x + sqrt(x * x - 1.0));`,GG=st({opSnippet:VG}),N1={kernelName:Yo,backendName:"webgl",kernelFunc:GG};var k1="return a + b;",UG=Ft({opSnippet:k1,packedOpSnippet:k1,supportsComplex:!0,cpuKernelImpl:cN}),E1={kernelName:"Add",backendName:"webgl",kernelFunc:UG};var Sf=class{constructor(t,e){this.outputShape=[],this.outputShape=t,this.variableNames=e.map((s,a)=>`T${a}`);let o=[];this.variableNames.forEach(s=>{o.push(`float v${s} = get${s}AtOutCoords();`)});let n=this.variableNames.map(s=>`v${s}`).join(" + ");this.userCode=`
      void main() {
        ${o.join(`
        `)}

        float result = ${n};
        setOutput(result);
      }
    `}};var vf=class{constructor(t,e){this.outputShape=[],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=t,this.variableNames=e.map((s,a)=>`T${a}`);let o=[];this.variableNames.forEach(s=>{o.push(`vec4 v${s} = get${s}AtOutCoords();`)});let n=this.variableNames.map(s=>`v${s}`).join(" + ");this.userCode=`
      void main() {
        ${o.join(`
        `)}

        vec4 result = ${n};
        setOutput(result);
      }
    `}};function Nf(r){let{inputs:t,backend:e}=r,o=t;if(o.length===1)return Yt({inputs:{x:o[0]},backend:e});if(o.length>F().get("WEBGL_MAX_TEXTURES_IN_SHADER")){let c=Math.floor(o.length/2),p=Nf({inputs:o.slice(0,c),backend:e}),l=Nf({inputs:o.slice(c),backend:e});return Nf({inputs:[p,l],backend:e})}let n=o.map(c=>c.dtype).reduce((c,p)=>Qt(c,p)),s=o.map(c=>c.shape),i=F().getBool("WEBGL_PACK")?new vf(o[0].shape,s):new Sf(o[0].shape,s);return e.runWebGLProgram(i,o,n)}var $1={kernelName:ds,backendName:"webgl",kernelFunc:Nf};function zG(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{axis:s,keepDims:a}=o,i=n.shape.length,c=y.parseAxisParam(s,n.shape),p=c,l=v.getAxesPermutation(p,i),u=n;l!=null&&(u=Bt({inputs:{x:n},backend:e,attrs:{perm:l}}),p=v.getInnerMostAxes(p.length,i)),v.assertAxesAreInnerMostDims("all",p,i);let[m,f]=v.computeOutAndReduceShapes(u.shape,p),d=y.sizeFromShape(f),h=K({inputs:{x:u},backend:e,attrs:{shape:[-1,d]}}),g=Qe(h,h.dtype,"all",e),x;if(a){let b=v.expandShapeToKeepDim(m,c);x=K({inputs:{x:g},backend:e,attrs:{shape:b}})}else x=K({inputs:{x:g},backend:e,attrs:{shape:m}});return e.disposeIntermediateTensorInfo(h),e.disposeIntermediateTensorInfo(g),l!=null&&e.disposeIntermediateTensorInfo(u),x}var A1={kernelName:"All",backendName:"webgl",kernelFunc:zG};function WG(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{axis:s,keepDims:a}=o,i=n.shape.length,c=y.parseAxisParam(s,n.shape),p=c,l=v.getAxesPermutation(p,i),u=n;l!=null&&(u=Bt({inputs:{x:n},backend:e,attrs:{perm:l}}),p=v.getInnerMostAxes(p.length,i)),v.assertAxesAreInnerMostDims("any",p,i);let[m,f]=v.computeOutAndReduceShapes(u.shape,p),d=y.sizeFromShape(f),h=K({inputs:{x:u},backend:e,attrs:{shape:[-1,d]}}),g=Qe(h,h.dtype,"any",e),x;if(a){let b=v.expandShapeToKeepDim(m,c);x=K({inputs:{x:g},backend:e,attrs:{shape:b}})}else x=K({inputs:{x:g},backend:e,attrs:{shape:m}});return e.disposeIntermediateTensorInfo(h),e.disposeIntermediateTensorInfo(g),l!=null&&e.disposeIntermediateTensorInfo(u),x}var R1={kernelName:"Any",backendName:"webgl",kernelFunc:WG};var kf=class{constructor(t,e,o){this.variableNames=["A"];let{windowSize:n,batchSize:s,outSize:a}=t;o||this.variableNames.push("bestIndicesA"),this.outputShape=[s,a];let i=e==="max"?">":"<",c=o?"inOffset + i;":"round(getBestIndicesA(batch, inOffset + i));";this.userCode=`
      void main() {
        ivec2 coords = getOutputCoords();
        int batch = coords[0];
        int outIdx = coords[1];
        int inOffset = outIdx * ${n};

        int bestIndex = inOffset;
        float bestValue = getA(batch, bestIndex);

        for (int i = 0; i < ${n}; i++) {
          int inIdx = ${c};
          float candidate = getA(batch, inIdx);
          if (candidate ${i} bestValue) {
            bestValue = candidate;
            bestIndex = inIdx;
          }
        }
        setOutput(float(bestIndex));
      }
    `}};var Ef=class{constructor(t,e,o,n){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,y.assert(t.length>2,()=>`Packed arg${o.charAt(0).toUpperCase()+o.slice(1)} supports only inputs with rank above 2.`);let s=t[t.length-1],a=Math.ceil(s/e);this.outputShape=t.slice(0,-1),a>1&&this.outputShape.push(a),n||this.variableNames.push("bestIndicesA");let i=this.outputShape,c=i.length,p=gt(c),l=Xt("coords",c),u,m;if(a===1){m=c+1;let D=gt(m);u=`
        ${D} sourceLocR = ${D}(${l.join()}, 0);
        ++${l[c-1]};
        ${D} sourceLocG = ${D}(${l.join()}, 0);
        ++${l[c-2]};
        ${D} sourceLocA = ${D}(${l.join()}, 0);
        --${l[c-1]};
        ${D} sourceLocB = ${D}(${l.join()}, 0);
        --${l[c-2]};`}else m=c,u=`
        ${p} sourceLocR = coords;
        ++${l[c-1]};
        ${p} sourceLocG = coords;
        ++${l[c-2]};
        ${p} sourceLocA = coords;
        --${l[c-1]};
        ${p} sourceLocB = coords;
        --${l[c-2]};`;let f=["x","y","z","w","u","v"].slice(0,m),d="."+f[m-1],h=f.map(D=>"int "+D),g=Xt("sourceLocR",m-1).concat("inIdx.r"),x=Xt("sourceLocG",m-1).concat("inIdx.g"),b=Xt("sourceLocB",m-1).concat("inIdx.b"),w=Xt("sourceLocA",m-1).concat("inIdx.a"),I=o==="max"?"greaterThan":"lessThan",k=n?"":`
          inIdx = round(vec4(getBestIndicesAChannel(${g.join()}),
                             getBestIndicesAChannel(${x.join()}),
                             getBestIndicesAChannel(${b.join()}),
                             getBestIndicesAChannel(${w.join()})));`,$=`vec4(
            getAChannel(${g.join()}),
            hasNextCol ? getAChannel(${x.join()}) : 0.,
            hasNextRow ? getAChannel(${b.join()}) : 0.,
            hasNextRow && hasNextCol ? getAChannel(${w.join()}) : 0.)`,R=n?"":`
      float getBestIndicesAChannel(${h.join()}) {
        return getChannel(getBestIndicesA(${f.join()}),
                                          vec2(${f.slice(-2).join()}));
      }`;this.userCode=`
      float getAChannel(${h.join()}) {
        return getChannel(getA(${f.join()}),
                               vec2(${f.slice(-2).join()}));
      }
      ${R}
      void main() {
        ${p} coords = getOutputCoords();
        bool hasNextCol = ${l[c-1]} < ${i[c-1]-1};
        bool hasNextRow = ${l[c-2]} < ${i[c-2]-1};
        ${u}
        ivec4 srcIdx = ivec4(sourceLocR${d}, sourceLocG${d},
          sourceLocB${d}, sourceLocA${d}) * ${e};
        ivec4 inIdx = srcIdx;
        vec4 bestIndex = vec4(inIdx);
        vec4 bestValue = ${$};

        for (int i = 0; i < ${e}; i++) {
          inIdx = srcIdx;
          ${k}
          vec4 candidate = ${$};
          bvec4 nan = isnan(candidate);
          bvec4 replace = bvec4(
            vec4(${I}(candidate, bestValue)) * (vec4(1.0) - vec4(nan)));

          bestValue = vec4(replace.x  ? candidate.x : bestValue.x,
                           replace.y  ? candidate.y : bestValue.y,
                           replace.z  ? candidate.z : bestValue.z,
                           replace.w  ? candidate.w : bestValue.w);
          bestIndex = mix(bestIndex, vec4(inIdx), vec4(replace));
          srcIdx++;
        }
        setOutput(bestIndex);
      }
    `}};function D1(r,t,e,o=null){let n=t.shape[0],s=t.shape[1];o!=null&&(n=o.shape[0],s=o.shape[1]);let a=v.computeOptimalWindowSize(s),i={windowSize:a,inSize:s,batchSize:n,outSize:Math.ceil(s/a)},c=new kf(i,e,o==null),p=[t];o!=null&&p.push(o);let l=r.runWebGLProgram(c,p,"int32");if(l.shape[1]===1)return l;let u=D1(r,t,e,l);return r.disposeIntermediateTensorInfo(l),u}function F1(r,t,e,o=null){let n=o!=null?o.shape:t.shape,s=n[n.length-1],a=v.computeOptimalWindowSize(s),i=new Ef(n,a,e,o==null),c=o==null?[t]:[t,o],p=r.runWebGLProgram(i,c,"int32");if(p.shape.length===t.shape.length){let l=F1(r,t,e,p);return r.disposeIntermediateTensorInfo(p),l}return p}function $f(r,t,e,o){let n=[e];if(v.assertAxesAreInnerMostDims("arg"+o.charAt(0).toUpperCase()+o.slice(1),n,t.shape.length),!F().getBool("WEBGL_PACK_REDUCE")||t.shape.length<=2){let s=[],a=r.texData.get(t.dataId),i=a!==null&&a.isPacked,c=t;i&&(c=r.unpackTensor(t),s.push(c));let[p,l]=v.computeOutAndReduceShapes(c.shape,n),u=y.sizeFromShape(l),m=K({inputs:{x:c},backend:r,attrs:{shape:[-1,u]}});s.push(m);let f=D1(r,m,o);s.push(f);let d=K({inputs:{x:f},backend:r,attrs:{shape:p}});return s.forEach(h=>r.disposeIntermediateTensorInfo(h)),d}return F1(r,t,o)}function HG(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{axis:s}=o,a=y.parseAxisParam(s,n.shape),i=v.getAxesPermutation(a,n.shape.length),c=n,p=[];i!=null&&(c=Bt({inputs:{x:n},backend:e,attrs:{perm:i}}),p.push(c),a=v.getInnerMostAxes(a.length,c.shape.length)),v.assertAxesAreInnerMostDims("argMax",[a[0]],c.shape.length);let l=$f(e,c,a[0],"max");return p.forEach(u=>e.disposeIntermediateTensorInfo(u)),l}var _1={kernelName:hs,backendName:"webgl",kernelFunc:HG};function qG(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{axis:s}=o,a=y.parseAxisParam(s,n.shape),i=v.getAxesPermutation(a,n.shape.length),c=n,p=[];i!=null&&(c=Bt({inputs:{x:n},backend:e,attrs:{perm:i}}),p.push(c),a=v.getInnerMostAxes(a.length,c.shape.length)),v.assertAxesAreInnerMostDims("argMin",[a[0]],c.shape.length);let l=$f(e,c,a[0],"min");return p.forEach(u=>e.disposeIntermediateTensorInfo(u)),l}var O1={kernelName:gs,backendName:"webgl",kernelFunc:qG};var KG=ae+`
  if (abs(x) > 1.) {
    return NAN;
  }
  return asin(x);
`,jG=st({opSnippet:KG}),P1={kernelName:Zo,backendName:"webgl",kernelFunc:jG};var XG=ae+"return log(x + sqrt(x * x + 1.0));",YG=st({opSnippet:XG}),L1={kernelName:Qo,backendName:"webgl",kernelFunc:YG};var ZG=ae+`
  return atan(x);
`,QG=st({opSnippet:ZG}),M1={kernelName:Jo,backendName:"webgl",kernelFunc:QG};var JG=Zc+`
  return atan(a, b);
`,tU=`
  vec4 result = atan(a, b);
  bvec4 isNaNA = isnan(a);
  bvec4 isNaNB = isnan(b);
  bvec4 isNaN = bvec4(isNaNA.x || isNaNB.x, isNaNA.y || isNaNB.y, isNaNA.z || isNaNB.z, isNaNA.w || isNaNB.w);
  `+ho+`
  return result;
`,eU=Ft({opSnippet:JG,packedOpSnippet:tU}),B1={kernelName:en,backendName:"webgl",kernelFunc:eU};var rU=ae+`
  if ((x < -1.0) || (x > 1.0)) return NAN;
return (log(1.0 + x) - log(1.0 - x)) / 2.0;`,oU=st({opSnippet:rU}),V1={kernelName:tn,backendName:"webgl",kernelFunc:oU};var Wr=class{constructor(t,e,o,n=!1,s=!1){if(this.variableNames=["x"],e==="avg"&&o)throw new Error("Cannot compute positions for average pool.");let a=t.filterWidth,i=t.strideHeight,c=t.strideWidth,p=t.dilationHeight,l=t.dilationWidth,u=t.effectiveFilterHeight,m=t.effectiveFilterWidth,f=t.padInfo.top,d=t.padInfo.left;this.outputShape=t.outShape;let h=e==="avg",g=`((batch  * ${t.inHeight} + xR) * ${t.inWidth} + xC) * ${t.inChannels} + d`,x=`(xR * ${t.inWidth} + xC) * ${t.inChannels} + d`,b="0.0";if(h||(b="-1.0 / 1e-20"),o){this.userCode=`
        const ivec2 strides = ivec2(${i}, ${c});
        const ivec2 pads = ivec2(${f}, ${d});

        void main() {
          ivec4 coords = getOutputCoords();
          int batch = coords[0];
          int d = coords[3];

          ivec2 xRCCorner = coords.yz * strides - pads;
          int xRCorner = xRCCorner.x;
          int xCCorner = xRCCorner.y;

          // max/min x(?, ?, d) to get y(yR, yC, d).
          // ? = to be determined
          float minMaxValue = 0.0;
          float minMaxValueFound = 0.0;
          int minMaxPosition = 0;
          float avgValue = 0.0;

          for (int wR = 0; wR < ${u};
              wR += ${p}) {
            int xR = xRCorner + wR;

            if (xR < 0 || xR >= ${t.inHeight}) {
              continue;
            }

            for (int wC = 0; wC < ${m};
                wC += ${l}) {
              int xC = xCCorner + wC;

              if (xC < 0 || xC >= ${t.inWidth}) {
                continue;
              }

              float value = getX(batch, xR, xC, d);

              // If a min / max value has already been found, use it. If not,
              // use the current value.
              float currMinMaxValue = mix(
                  value, minMaxValue, minMaxValueFound);
              if (value >= currMinMaxValue) {
                minMaxValue = value;
                minMaxValueFound = 1.0;
                minMaxPosition = ${n?s?g:x:`wR * ${m} + wC`};
              }
            }
          }
          setOutput(float(minMaxPosition));
        }
      `;return}let w="max",I=`${e}(${e}(${e}(minMaxValue[0], minMaxValue[1]), minMaxValue[2]), minMaxValue[3])`;e==="avg"&&(I="avgValue / count");let k=Math.floor(a/4)*4,$=a%4,R=`
      if (${h}) {
        avgValue += dot(values, ones);
      } else {
        minMaxValue = ${w}(values, minMaxValue);
      }
    `;this.userCode=`
      const ivec2 strides = ivec2(${i}, ${c});
      const ivec2 pads = ivec2(${f}, ${d});
      const float initializationValue = ${b};
      const vec4 ones = vec4(1.0, 1.0, 1.0, 1.0);

      float count = 0.0;

      float getValue(int batch, int xR, int xC, int d) {
        if (xC < 0 || xC >= ${t.inWidth}) {
          return initializationValue;
        }
        count += 1.0;
        return getX(batch, xR, xC, d);
      }

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords[0];
        int d = coords[3];

        ivec2 xRCCorner = coords.yz * strides - pads;
        int xRCorner = xRCCorner.x;
        int xCCorner = xRCCorner.y;

        // max/min x(?, ?, d) to get y(yR, yC, d).
        // ? = to be determined
        vec4 minMaxValue = vec4(${b});
        float avgValue = 0.0;
        count = 0.0;

        for (int wR = 0; wR < ${u};
            wR += ${p}) {
          int xR = xRCorner + wR;

          if (xR < 0 || xR >= ${t.inHeight}) {
            continue;
          }

          for (int wC = 0; wC < ${k}; wC += 4) {
            int xC = xCCorner + wC * ${l};

            vec4 values = vec4(
              getValue(batch, xR, xC, d),
              getValue(batch, xR, xC + ${l}, d),
              getValue(batch, xR, xC + 2 * ${l}, d),
              getValue(batch, xR, xC + 3 * ${l}, d)
            );

            ${R}
          }

          int xC = xCCorner + ${k};
          if (${$===1}) {
            vec4 values = vec4(
              getValue(batch, xR, xC, d),
              initializationValue,
              initializationValue,
              initializationValue
            );

            ${R}
          } else if (${$===2}) {
            vec4 values = vec4(
              getValue(batch, xR, xC, d),
              getValue(batch, xR, xC + ${l}, d),
              initializationValue,
              initializationValue
            );

            ${R}
          } else if (${$===3}) {
            vec4 values = vec4(
              getValue(batch, xR, xC, d),
              getValue(batch, xR, xC + ${l}, d),
              getValue(batch, xR, xC + 2 * ${l}, d),
              initializationValue
            );

            ${R}
          }
        }
        setOutput(${I});
      }
    `}},is=class{constructor(t,e,o,n=!1,s=!1){if(this.variableNames=["x"],e==="avg"&&o)throw new Error("Cannot compute positions for average pool.");let a=t.filterWidth,i=t.strideDepth,c=t.strideHeight,p=t.strideWidth,l=t.dilationDepth,u=t.dilationHeight,m=t.dilationWidth,f=t.effectiveFilterDepth,d=t.effectiveFilterHeight,h=t.effectiveFilterWidth,g=t.padInfo.front,x=t.padInfo.top,b=t.padInfo.left;this.outputShape=t.outShape;let w=e==="avg",I="0.0";if(w||(I="-1.0 / 1e-20"),o){this.userCode=`
        const ivec3 strides =
            ivec3(${i}, ${c}, ${p});
        const ivec3 pads = ivec3(${g}, ${x}, ${b});

        void main() {
          ivec5 coords = getOutputCoords();
          int batch = coords.x;
          int ch = coords.u;

          ivec3 xCorner = ivec3(coords.y, coords.z, coords.w) * strides - pads;
          int xDCorner = xCorner.x;
          int xRCorner = xCorner.y;
          int xCCorner = xCorner.z;

          // max/min x(?, ?, ?, ch) to get y(yD, yR, yC, ch).
          // ? = to be determined
          float minMaxValue = 0.0;
          float minMaxValueFound = 0.0;
          int minMaxPosition = 0;

          for (int wD = 0; wD < ${f};
              wD += ${l}) {
            int xD = xDCorner + wD;

            if (xD < 0 || xD >= ${t.inDepth}) {
              continue;
            }

            for (int wR = 0; wR < ${d};
                wR += ${u}) {
              int xR = xRCorner + wR;

              if (xR < 0 || xR >= ${t.inHeight}) {
                continue;
              }

              for (int wC = 0; wC < ${h};
                  wC += ${m}) {
                int xC = xCCorner + wC;

                if (xC < 0 || xC >= ${t.inWidth}) {
                  continue;
                }

                float value = getX(batch, xD, xR, xC, ch);

                // If a min / max value has already been found, use it. If not,
                // use the current value.
                float currMinMaxValue = mix(
                    value, minMaxValue, minMaxValueFound);
                if (value >= currMinMaxValue) {
                  minMaxValue = value;
                  minMaxValueFound = 1.0;
                  minMaxPosition = ${n?s?`(((batch * ${t.inDepth} + xD) * ${t.inHeight} + xR) * ${t.inWidth} + xC) * ${t.inChannels} + ch`:`((xD * ${t.inHeight} + xR) * ${t.inWidth} + xC) * ${t.inChannels} + ch`:`wD * ${d} * ${h} +
                      wR * ${h} + wC`};
                }
              }
            }
          }
          setOutput(float(minMaxPosition));
        }
      `;return}let k="max",$=`${e}(${e}(${e}(minMaxValue[0], minMaxValue[1]), minMaxValue[2]), minMaxValue[3])`;e==="avg"&&($="avgValue / count");let R=Math.floor(a/4)*4,D=a%4,_=`
      if (${w}) {
        avgValue += dot(values, ones);
      } else {
        minMaxValue = ${k}(values, minMaxValue);
      }
    `;this.userCode=`
      const ivec3 strides =
        ivec3(${i}, ${c}, ${p});
      const ivec3 pads = ivec3(${g}, ${x}, ${b});
      const float initializationValue = ${I};
      const vec4 ones = vec4(1.0, 1.0, 1.0, 1.0);

      float count = 0.0;

      float getValue(int batch, int xD, int xR, int xC, int ch) {
        if (xC < 0 || xC >= ${t.inWidth}) {
          return initializationValue;
        }
        count += 1.0;
        return getX(batch, xD, xR, xC, ch);
      }

      void main() {
        ivec5 coords = getOutputCoords();
        int batch = coords.x;
        int ch = coords.u;

        ivec3 xCorner = ivec3(coords.y, coords.z, coords.w) * strides - pads;
        int xDCorner = xCorner.x;
        int xRCorner = xCorner.y;
        int xCCorner = xCorner.z;

        // max/min x(?, ?, ?, d) to get y(yD, yR, yC, ch).
        // ? = to be determined
        vec4 minMaxValue = vec4(${I});
        float avgValue = 0.0;
        count = 0.0;

        for (int wD = 0; wD < ${f};
            wD += ${l}) {
          int xD = xDCorner + wD;

          if (xD < 0 || xD >= ${t.inDepth}) {
            continue;
          }

          for (int wR = 0; wR < ${d};
            wR += ${u}) {
            int xR = xRCorner + wR;

            if (xR < 0 || xR >= ${t.inHeight}) {
              continue;
            }

            for (int wC = 0; wC < ${R}; wC += 4) {
              int xC = xCCorner + wC * ${m};

              vec4 values = vec4(
                getValue(batch, xD, xR, xC, ch),
                getValue(batch, xD, xR, xC + ${m}, ch),
                getValue(batch, xD, xR, xC + 2 * ${m}, ch),
                getValue(batch, xD, xR, xC + 3 * ${m}, ch)
              );

              ${_}
            }

            int xC = xCCorner + ${R};
            if (${D===1}) {
              vec4 values = vec4(
                getValue(batch, xD, xR, xC, ch),
                initializationValue,
                initializationValue,
                initializationValue
              );

              ${_}
            } else if (${D===2}) {
              vec4 values = vec4(
                getValue(batch, xD, xR, xC, ch),
                getValue(batch, xD, xR, xC + ${m}, ch),
                initializationValue,
                initializationValue
              );

              ${_}
            } else if (${D===3}) {
              vec4 values = vec4(
                getValue(batch, xD, xR, xC, ch),
                getValue(batch, xD, xR, xC + ${m}, ch),
                getValue(batch, xD, xR, xC + 2 * ${m}, ch),
                initializationValue
              );

              ${_}
            }
          }
          setOutput(${$});
        }
      }
    `}};function nU(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t;fo(n,"avgPool");let{filterSize:s,strides:a,pad:i,dimRoundingMode:c}=o,p=1;y.assert(v.eitherStridesOrDilationsAreOne(a,p),()=>`Error in avgPool: Either strides or dilations must be 1. Got strides ${a} and dilations '${p}'`);let l=v.computePool2DInfo(n.shape,s,a,p,i,c);if(l.filterWidth===1&&l.filterHeight===1&&y.arraysEqual(l.inShape,l.outShape))return Yt({inputs:{x:n},backend:e});let u=new Wr(l,"avg",!1);return e.runWebGLProgram(u,[n],"float32")}var G1={kernelName:xs,backendName:"webgl",kernelFunc:nU};function sU(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{filterSize:s,strides:a,pad:i,dimRoundingMode:c,dataFormat:p}=o,l=[1,1,1],u=v.computePool3DInfo(n.shape,s,a,l,i,c,p),m=new is(u,"avg",!1);return e.runWebGLProgram(m,[n],"float32")}var U1={kernelName:ys,backendName:"webgl",kernelFunc:sU};var Af=class{constructor(t){this.variableNames=["dy"],this.outputShape=t.inShape;let e=t.filterHeight,o=t.filterWidth,n=t.strideHeight,s=t.strideWidth,a=t.dilationHeight,i=t.dilationWidth,c=t.effectiveFilterHeight,p=t.effectiveFilterWidth,l=c-1-t.padInfo.top,u=p-1-t.padInfo.left,m=1/(e*o);this.userCode=`
      const ivec2 pads = ivec2(${l}, ${u});
      const float avgMultiplier = float(${m});

      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];

        ivec2 dyRCCorner = coords.yz - pads;
        int dyRCorner = dyRCCorner.x;
        int dyCCorner = dyRCCorner.y;

        // Convolve dy(?, ?, d) with pos mask(:, :, d) to get dx(xR, xC, d).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;
        for (int wR = 0; wR < ${c};
            wR += ${a}) {
          float dyR = float(dyRCorner + wR) / ${n}.0;

          if (dyR < 0.0 || dyR >= ${t.outHeight}.0 || fract(dyR) > 0.0) {
            continue;
          }
          int idyR = int(dyR);

          for (int wC = 0; wC < ${p};
            wC+= ${i}) {
            float dyC = float(dyCCorner + wC) / ${s}.0;

            if (dyC < 0.0 || dyC >= ${t.outWidth}.0 ||
                fract(dyC) > 0.0) {
              continue;
            }
            int idyC = int(dyC);

            float dyValue = getDy(b, idyR, idyC, d);

            dotProd += dyValue * avgMultiplier;
          }
        }
        setOutput(dotProd);
      }
    `}},Rf=class{constructor(t){this.variableNames=["dy"],this.outputShape=t.inShape;let e=t.filterDepth,o=t.filterHeight,n=t.filterWidth,s=t.strideDepth,a=t.strideHeight,i=t.strideWidth,c=t.dilationDepth,p=t.dilationHeight,l=t.dilationWidth,u=t.effectiveFilterDepth,m=t.effectiveFilterHeight,f=t.effectiveFilterWidth,d=u-1-t.padInfo.front,h=m-1-t.padInfo.top,g=f-1-t.padInfo.left,x=1/(e*o*n);this.userCode=`
      const ivec3 pads = ivec3(${d}, ${h}, ${g});
      const float avgMultiplier = float(${x});

      void main() {
        ivec5 coords = getOutputCoords();
        int batch = coords.x;
        int ch = coords.u;

        ivec3 dyCorner = ivec3(coords.y, coords.z, coords.w) - pads;
        int dyDCorner = dyCorner.x;
        int dyRCorner = dyCorner.y;
        int dyCCorner = dyCorner.z;

        // Convolve dy(?, ?, ?, d) with pos mask(:, :, :, ch) to get
        // dx(xD, xR, xC, ch).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;

        for (int wD = 0; wD < ${u};
            wD += ${c}) {
          float dyD = float(dyDCorner + wD) / ${s}.0;

          if (dyD < 0.0 || dyD >= ${t.outDepth}.0 || fract(dyD) > 0.0) {
            continue;
          }
          int idyD = int(dyD);

          for (int wR = 0; wR < ${m};
              wR += ${p}) {
            float dyR = float(dyRCorner + wR) / ${a}.0;

            if (dyR < 0.0 || dyR >= ${t.outHeight}.0 ||
                fract(dyR) > 0.0) {
              continue;
            }
            int idyR = int(dyR);

            for (int wC = 0; wC < ${f};
                wC += ${l}) {
              float dyC = float(dyCCorner + wC) / ${i}.0;

              if (dyC < 0.0 || dyC >= ${t.outWidth}.0 ||
                  fract(dyC) > 0.0) {
                continue;
              }
              int idyC = int(dyC);

              float dyValue = getDy(batch, idyD, idyR, idyC, ch);

              dotProd += dyValue * avgMultiplier;
            }
          }
        }
        setOutput(dotProd);
      }
    `}};function aU(r){let{inputs:t,backend:e,attrs:o}=r,{dy:n,input:s}=t,a=s,{filterSize:i,strides:c,pad:p,dimRoundingMode:l}=o,u=[1,1,1],m=v.computePool3DInfo(a.shape,i,c,u,p,l),f=new Rf(m);return e.runWebGLProgram(f,[n],a.dtype)}var z1={kernelName:hp,backendName:"webgl",kernelFunc:aU};function iU(r){let{inputs:t,backend:e,attrs:o}=r,{dy:n,input:s}=t,a=s;fo([n,s],"avgPoolGrad");let{filterSize:i,strides:c,pad:p}=o,l=v.computePool2DInfo(a.shape,i,c,1,p),u=new Af(l);return e.runWebGLProgram(u,[n],a.dtype)}var W1={kernelName:dp,backendName:"webgl",kernelFunc:iU};function cU(r){let{inputs:t,backend:e,attrs:o}=r,{a:n,b:s}=t,{transposeA:a,transposeB:i}=o;return Zi({a:n,b:s,transposeA:a,transposeB:i,backend:e})}var H1={kernelName:bs,backendName:"webgl",kernelFunc:cU};var Df=class{constructor(t,e,o,n,s,a){this.outputShape=[],this.variableNames=["x","mean","variance"],v.assertAndGetBroadcastShape(t,e),v.assertAndGetBroadcastShape(t,o);let i="0.0";n!=null&&(v.assertAndGetBroadcastShape(t,n),this.variableNames.push("offset"),i="getOffsetAtOutCoords()");let c="1.0";s!=null&&(v.assertAndGetBroadcastShape(t,s),this.variableNames.push("scale"),c="getScaleAtOutCoords()"),this.outputShape=t,this.userCode=`
      void main() {
        float x = getXAtOutCoords();
        float mean = getMeanAtOutCoords();
        float variance = getVarianceAtOutCoords();
        float offset = ${i};
        float scale = ${c};
        float inv = scale * inversesqrt(variance + float(${a}));
        setOutput(dot(vec3(x, -mean, offset), vec3(inv, inv, 1)));
      }
    `}};var Ff=class{constructor(t,e,o,n,s,a){this.packedInputs=!0,this.packedOutput=!0,this.variableNames=["x","mean","variance"],v.assertAndGetBroadcastShape(t,e),v.assertAndGetBroadcastShape(t,o);let i="vec4(0.0)";n!=null&&(v.assertAndGetBroadcastShape(t,n),this.variableNames.push("offset"),i="getOffsetAtOutCoords()");let c="vec4(1.0)";s!=null&&(v.assertAndGetBroadcastShape(t,s),this.variableNames.push("scale"),c="getScaleAtOutCoords()"),this.outputShape=t,this.userCode=`
      void main() {
        vec4 offset = ${i};
        vec4 scale = ${c};

        vec4 x = getXAtOutCoords();
        vec4 mean = getMeanAtOutCoords();
        vec4 variance = getVarianceAtOutCoords();

        vec4 inv = scale * inversesqrt(variance + vec4(${a}));

        setOutput((x - mean) * inv + offset);
      }
    `}};var pU=({inputs:r,backend:t,attrs:e})=>{let{x:o,mean:n,variance:s,offset:a,scale:i}=r;y.assert(n.shape.length===s.shape.length,()=>"Batch normalization gradient requires mean and variance to have equal ranks."),y.assert(a==null||n.shape.length===a.shape.length,()=>"Batch normalization gradient requires mean and offset to have equal ranks."),y.assert(i==null||n.shape.length===i.shape.length,()=>"Batch normalization gradient requires mean and scale to have equal ranks.");let{varianceEpsilon:c}=e;c==null&&(c=.001);let p=[o,n,s],l=null;a!=null&&(l=a.shape,p.push(a));let u=null;i!=null&&(u=i.shape,p.push(i));let m=F().getBool("WEBGL_PACK_NORMALIZATION")?new Ff(o.shape,n.shape,s.shape,l,u,c):new Df(o.shape,n.shape,s.shape,l,u,c);return t.runWebGLProgram(m,p,p[0].dtype)},q1={kernelName:Xs,backendName:"webgl",kernelFunc:pU};var _f=class{constructor(t){this.variableNames=["source"],this.outputShape=t,this.rank=t.length;let e=gt(this.rank);this.customUniforms=[{name:"start",arrayIndex:this.rank,type:"int"}];let o=lU(this.rank),n,s=t.map((a,i)=>`sourceLoc.${Gy[i]} = start[${i}] + coords.${Gy[i]};`);n=`
        ${e} sourceLoc;
        ${e} coords = getOutputCoords();
        ${s.join(`
`)}
      `,this.userCode=`
      void main() {
        ${n}
        setOutput(getSource(${o}));
      }
    `}},Gy=["x","y","z","w","u","v"];function lU(r){if(r===1)return"sourceLoc";if(r<=6)return Gy.slice(0,r).map(t=>"sourceLoc."+t).join(",");throw Error(`Slicing for rank ${r} is not yet supported`)}var Of=class{constructor(t){this.variableNames=["source"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=t,this.rank=t.length,this.customUniforms=[{name:"start",arrayIndex:this.rank,type:"int"}];let e=gt(this.rank),o=Xt("coords",this.rank),n=Xt("sourceLoc",this.rank),s=this.rank===1?"sourceLoc":`vec2(${n.slice(-2).join()})`,a=`getChannel(getSource(${n.join()}), ${s})`,i=`
      result.x = ${a};
      if (++${o[this.rank-1]} < ${t[this.rank-1]}) {
        ++${n[this.rank-1]};
        result.y = ${a};
        --${n[this.rank-1]};
      }
    `,c=this.rank===1?"":`
      --${o[this.rank-1]};
      if (++${o[this.rank-2]} < ${t[this.rank-2]}) {
        ++${n[this.rank-2]};
        result.z = ${a};
        if (++${o[this.rank-1]} < ${t[this.rank-1]}) {
          ++${n[this.rank-1]};
          result.w = ${a};
        }
      }
    `,p=this.rank<=4?`sourceLoc = coords +
            ${e}(${t.map((l,u)=>`start[${u}]`).join()});`:t.map((l,u)=>`${n[u]} = ${o[u]} + start[${u}];`).join(`
`);this.userCode=`
      void main() {
        ${e} coords = getOutputCoords();
        ${e} sourceLoc;
        ${p}
        vec4 result = vec4(0.);
        ${i}
        ${c}
        setOutput(result);
      }
    `}};function uU(r,t,e,o){let n=o.texData.get(r.dataId),s=o.makeTensorInfo(e,r.dtype),a=o.texData.get(s.dataId);Object.assign(a,n),a.refCount=1,a.shape=e,a.dtype=r.dtype;let i=ce.computeFlatOffset(t,y.computeStrides(r.shape));n.slice&&(i+=n.slice.flatOffset),a.slice={flatOffset:i,origDataId:n.slice&&n.slice.origDataId||r.dataId};let c=o.dataRefCount.get(a.slice.origDataId)||1;return o.dataRefCount.set(a.slice.origDataId,c+1),s}function Hr(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{begin:s,size:a}=o,[i,c]=ce.parseSliceParams(n,s,a);if(ce.assertParamsValid(n,i,c),y.sizeFromShape(c)===0)return e.makeTensorInfo(c,n.dtype,[]);if(e.shouldExecuteOnCPU([n])||n.dtype==="string"){let u=e.texData.get(n.dataId),m=MN(u.values,i,c,n.shape,n.dtype);return e.makeTensorInfo(c,n.dtype,m)}let{isPacked:p}=e.texData.get(n.dataId),l=ce.isSliceContinous(n.shape,i,c);if(p||!l){let u=F().getBool("WEBGL_PACK_ARRAY_OPERATIONS")?new Of(c):new _f(c),m=[i];return e.runWebGLProgram(u,[n],n.dtype,m)}return e.uploadToGPU(n.dataId),uU(n,i,c,e)}var K1={kernelName:Ra,backendName:"webgl",kernelFunc:Hr};var mU=r=>{let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{blockShape:s,crops:a}=o;y.assert(n.shape.length<=4,()=>"batchToSpaceND for rank > 4 with a WebGL backend not implemented yet");let i=s.reduce((b,w)=>b*w),c=v.getReshaped(n.shape,s,i),p=v.getPermuted(c.length,s.length),l=v.getReshapedPermuted(n.shape,s,i),u=v.getSliceBeginCoords(a,s.length),m=v.getSliceSize(l,a,s.length),f=[],d=K({inputs:{x:n},backend:e,attrs:{shape:c}}),h=Bt({inputs:{x:d},backend:e,attrs:{perm:p}}),g=K({inputs:{x:h},backend:e,attrs:{shape:l}}),x=Hr({inputs:{x:g},backend:e,attrs:{begin:u,size:m}});return f.push(d),f.push(h),f.push(g),f.forEach(b=>e.disposeIntermediateTensorInfo(b)),x},j1={kernelName:Cs,backendName:"webgl",kernelFunc:mU};function fU(r){let{inputs:t,backend:e,attrs:o}=r,{x:n,weights:s}=t,{size:a}=o,i=e.readSync(n.dataId),c=e.readSync(s.dataId),p=df(i,c,s.dtype,s.shape,a);return e.makeTensorInfo([a],s.dtype,p)}var X1={kernelName:Ts,backendName:"webgl",kernelFunc:fU};function dU(r){let{inputs:t,backend:e}=r,{s0:o,s1:n}=t,s=e.readSync(o.dataId),a=e.readSync(n.dataId),i=v.assertAndGetBroadcastShape(Array.from(s),Array.from(a));return e.makeTensorInfo([i.length],"int32",Int32Array.from(i))}var Y1={kernelName:ws,backendName:"webgl",kernelFunc:dU};var hU="return float(a != b);",Uy=Ft({opSnippet:hU,cpuKernelImpl:AN,dtype:"bool"}),Z1={kernelName:vn,backendName:"webgl",kernelFunc:Uy};function Go(r){let{inputs:t,backend:e}=r,{input:o}=t,n=e.texData.get(o.dataId);return Yt({inputs:{x:n.complexTensorInfos.real},backend:e})}var Q1={kernelName:Ia,backendName:"webgl",kernelFunc:Go};var gU="return float(int(x));";function J1(r,t){let e=new $e(r.shape,gU),o=t.runWebGLProgram(e,[r],"int32");return{dataId:o.dataId,shape:o.shape,dtype:o.dtype}}function zy(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{dtype:s}=o;if(s==="complex64"){if(n.dtype==="complex64")return Yt({inputs:{x:n},backend:e});let a=Ve(n.shape),i=zy({inputs:{x:n},backend:e,attrs:{dtype:"float32"}}),c=Ge({inputs:{real:i,imag:a},backend:e});return a.dispose(),e.disposeIntermediateTensorInfo(i),c}if(n.dtype==="complex64"){let a=Go({inputs:{input:n},backend:e}),i=zy({inputs:{x:a},backend:e,attrs:{dtype:s}});return e.disposeIntermediateTensorInfo(a),i}if(!y.hasEncodingLoss(n.dtype,s)){let a=Yt({inputs:{x:n},backend:e});return{dataId:a.dataId,shape:a.shape,dtype:s}}if(e.shouldExecuteOnCPU([n])){let a=e.texData.get(n.dataId).values,[i,c,p]=lN(a,n.shape,n.dtype,s);return e.makeTensorInfo(i,c,p)}if(s==="int32")return J1(n,e);if(s==="bool"){let a=e.makeTensorInfo([],"bool",y.getTypedArrayFromDType("bool",1)),c=Uy({inputs:{a:n,b:a},backend:e});return e.disposeIntermediateTensorInfo(a),c}throw new Error(`Error in Cast: failed to cast ${n.dtype} to ${s}`)}var tk={kernelName:Co,backendName:"webgl",kernelFunc:zy};var ek="return ceil(x);",xU=st({opSnippet:ek,packedOpSnippet:ek,cpuKernelImpl:uN}),rk={kernelName:rn,backendName:"webgl",kernelFunc:xU};var Pf=class{constructor(t){this.variableNames=["A"],this.customUniforms=[{name:"minVal",type:"float"},{name:"maxVal",type:"float"}],this.outputShape=t,this.userCode=`

      void main() {
        float value = getAAtOutCoords();
        if (isnan(value)) {
          setOutput(value);
          return;
        }

        setOutput(clamp(value, minVal, maxVal));
      }
    `}};var Lf=class{constructor(t){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.customUniforms=[{name:"minVal",type:"float"},{name:"maxVal",type:"float"}],this.outputShape=t,this.userCode=`
      void main() {
        vec4 value = getAAtOutCoords();

        if (any(isnan(value))) {
          setOutput(value);
          return;
        }

        setOutput(clamp(value, vec4(minVal), vec4(maxVal)));
      }
    `}};function yU(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{clipValueMin:s,clipValueMax:a}=o,i;F().getBool("WEBGL_PACK_CLIP")?i=new Lf(n.shape):i=new Pf(n.shape);let c=[[s],[a]];return e.runWebGLProgram(i,[n],n.dtype,c)}var ok={kernelName:on,backendName:"webgl",kernelFunc:yU};var Mf=class{constructor(t){this.variableNames=["real","imag"],this.outputShape=t,this.userCode=`
      void main() {
        float re = abs(getRealAtOutCoords());
        float im = abs(getImagAtOutCoords());
        float mx = max(re, im);

        // sadly the length function in glsl is not underflow-safe
        // (at least not on Intel GPUs). So the safe solution is
        // to ensure underflow-safety in all cases.
        setOutput(
          mx == 0.0 ? 0.0 : mx * length(vec2(1, min(re, im)/mx))
        );
      }
    `}};function nk(r,t){return{dataId:t.dataId,dtype:t.dtype,shape:r.shape}}function bU(r){let{inputs:t,backend:e}=r,{x:o}=t,n=e.texData.get(o.dataId),s=new Mf(o.shape),a=[nk(o,n.complexTensorInfos.real),nk(o,n.complexTensorInfos.imag)];return e.runWebGLProgram(s,a,a[0].dtype)}var sk={kernelName:Ss,backendName:"webgl",kernelFunc:bU};var Bf=class{constructor(t){this.outputShape=[],this.outputShape=v.computeOutShape(t,1),this.variableNames=t.map((a,i)=>`T${i}`);let e=new Array(t.length-1);e[0]=t[0][1];for(let a=1;a<e.length;a++)e[a]=e[a-1]+t[a][1];let o=[`if (yC < ${e[0]}) setOutput(getT0(yR, yC));`];for(let a=1;a<e.length;a++){let i=e[a-1];o.push(`else if (yC < ${e[a]}) setOutput(getT${a}(yR, yC-${i}));`)}let n=e.length,s=e[e.length-1];o.push(`else setOutput(getT${n}(yR, yC-${s}));`),this.userCode=`
      void main() {
        ivec2 coords = getOutputCoords();
        int yR = coords.x;
        int yC = coords.y;

        ${o.join(`
        `)}
      }
    `}};var Gf=class{constructor(t,e){this.packedInputs=!0,this.packedOutput=!0,this.outputShape=[],this.outputShape=v.computeOutShape(t,e);let o=this.outputShape,n=o.length,s=gt(n),a=Xt("coords",n),i=["x","y","z","w","u","v"].slice(0,n);this.variableNames=t.map((h,g)=>`T${g}`);let c=new Array(t.length-1);c[0]=t[0][e];for(let h=1;h<c.length;h++)c[h]=c[h-1]+t[h][e];let p=i[e],l=i.slice(-2),u=i.join(),m=`if (${p} < ${c[0]}) {
        return getChannel(
            getT0(${u}), vec2(${l.join()}));
        }`;for(let h=1;h<c.length;h++){let g=c[h-1];m+=`
        if (${p} < ${c[h]}  && ${p} >= ${c[h-1]}) {
          return getChannel(
            getT${h}(${Vf(i,p,g)}),
            vec2(${Vf(l,p,g)}));
        }`}let f=c.length,d=c[c.length-1];m+=`
        return getChannel(
          getT${f}(${Vf(i,p,d)}),
          vec2(${Vf(l,p,d)}));`,this.userCode=`
      float getValue(${i.map(h=>"int "+h)}) {
        ${m}
      }

      void main() {
        ${s} coords = getOutputCoords();
        vec4 result = vec4(getValue(${a}), 0., 0., 0.);

        ${a[n-1]} = ${a[n-1]} + 1;
        if (${a[n-1]} < ${o[n-1]}) {
          result.g = getValue(${a});
        }

        ${a[n-2]} = ${a[n-2]} + 1;
        if (${a[n-2]} < ${o[n-2]}) {
          result.a = getValue(${a});
        }

        ${a[n-1]} = ${a[n-1]} - 1;
        if (${a[n-2]} < ${o[n-2]} &&
            ${a[n-1]} < ${o[n-1]}) {
          result.b = getValue(${a});
        }
        setOutput(result);
      }
    `}};function Vf(r,t,e){let o=r.indexOf(t);return r.map((s,a)=>a===o?`${s} - ${e}`:s).join()}function Qi(r){let{inputs:t,backend:e}=r,{input:o}=t,n=e.texData.get(o.dataId);return Yt({inputs:{x:n.complexTensorInfos.imag},backend:e})}var ak={kernelName:Js,backendName:"webgl",kernelFunc:Qi};function Jc(r,t,e){let o=r[0].dtype;if(o==="complex64"){let u=r.map(g=>Go({inputs:{input:g},backend:e})),m=r.map(g=>Qi({inputs:{input:g},backend:e})),f=Jc(u,t,e),d=Jc(m,t,e),h=Ge({inputs:{real:f,imag:d},backend:e});return u.forEach(g=>e.disposeIntermediateTensorInfo(g)),m.forEach(g=>e.disposeIntermediateTensorInfo(g)),e.disposeIntermediateTensorInfo(f),e.disposeIntermediateTensorInfo(d),h}let n=e.shouldExecuteOnCPU(r);if(o==="string"&&(n=!0),n){let u=r.map(b=>{let I=[-1,y.sizeFromShape(b.shape.slice(t))];return K({inputs:{x:b},backend:e,attrs:{shape:I}})}),m=u.map(b=>({vals:e.readSync(b.dataId),shape:b.shape})),f=v.computeOutShape(u.map(b=>b.shape),1),d=u[0].shape[0]===1,h=mN(m,f,o,d),g=v.computeOutShape(r.map(b=>b.shape),t),x=e.makeTensorInfo(g,o,h);return u.forEach(b=>e.disposeIntermediateTensorInfo(b)),x}let s=F().getNumber("WEBGL_MAX_TEXTURES_IN_SHADER");if(r.length>s){let u=[];for(let f=0;f<r.length;f+=s){let d=r.slice(f,f+s);u.push(Jc(d,t,e))}let m=Jc(u,t,e);for(let f of u)e.disposeIntermediateTensorInfo(f);return m}if(F().getBool("WEBGL_PACK_ARRAY_OPERATIONS")&&r[0].shape.length>1){let u=new Gf(r.map(m=>m.shape),t);return e.runWebGLProgram(u,r,o)}let{tensors2D:a,outShape:i}=CU(r,t,e),c=new Bf(a.map(u=>u.shape)),p=e.runWebGLProgram(c,a,o);a.forEach(u=>e.disposeIntermediateTensorInfo(u));let l=K({inputs:{x:p},attrs:{shape:i},backend:e});return e.disposeIntermediateTensorInfo(p),l}function CU(r,t,e){let o=v.computeOutShape(r.map(s=>s.shape),t);return{tensors2D:r.map(s=>K({inputs:{x:s},attrs:{shape:[-1,y.sizeFromShape(s.shape.slice(t))]},backend:e})),outShape:o}}function Wy(r){let{inputs:t,backend:e,attrs:o}=r,{axis:n}=o,s=y.parseAxisParam(n,t[0].shape)[0],a=t.map(p=>p.shape);v.assertParamsConsistent(a,s);let i=v.computeOutShape(t.map(p=>p.shape),s);if(y.sizeFromShape(i)===0)return e.makeTensorInfo(i,t[0].dtype,[]);let c=t.filter(p=>y.sizeFromShape(p.shape)>0);return c.length===1?Yt({inputs:{x:c[0]},backend:e}):Jc(c,s,e)}var ik={kernelName:vs,backendName:"webgl",kernelFunc:Wy};var tp=class{constructor(t,e=!1,o=null,n=!1,s=!1){this.variableNames=["x","W"],this.outputShape=t.outShape;let a=t.padInfo.top,i=t.padInfo.left,c=t.strideHeight,p=t.strideWidth,l=t.dilationHeight,u=t.dilationWidth,m=t.filterHeight,f=t.filterWidth,d=Math.floor(t.inChannels/4)*4,h=t.inChannels%4,g=t.dataFormat==="channelsLast",x=g?1:2,b=g?2:3,w=g?3:1,I="",k="";o&&(n?I=`float activation(float a) {
          float b = getPreluActivationWeightsAtOutCoords();
          ${o}
        }`:s?I=`float activation(float a) {
          float b = getLeakyreluAlphaAtOutCoords();
          ${o}
        }`:I=`
          float activation(float x) {
            ${o}
          }
        `,k="result = activation(result);");let $=e?"result += getBiasAtOutCoords();":"";e&&this.variableNames.push("bias"),n&&this.variableNames.push("preluActivationWeights"),s&&this.variableNames.push("leakyreluAlpha"),this.userCode=`
      ${I}

      const ivec2 strides = ivec2(${c}, ${p});
      const ivec2 pads = ivec2(${a}, ${i});

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords[0];
        int d2 = coords[${w}];

        ivec2 xRCCorner =
            ivec2(coords[${x}], coords[${b}]) * strides - pads;
        int xRCorner = xRCCorner.x;
        int xCCorner = xRCCorner.y;

        // Convolve x(?, ?, d1) with w(:, :, d1, d2) to get y(yR, yC, d2).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;
        for (int wR = 0; wR < ${m}; wR++) {
          int xR = xRCorner + wR * ${l};

          if (xR < 0 || xR >= ${t.inHeight}) {
            continue;
          }

          for (int wC = 0; wC < ${f}; wC++) {
            int xC = xCCorner + wC * ${u};

            if (xC < 0 || xC >= ${t.inWidth}) {
              continue;
            }

            for (int d1 = 0; d1 < ${d}; d1 += 4) {
              vec4 wValues = vec4(
                getW(wR, wC, d1, d2),
                getW(wR, wC, d1 + 1, d2),
                getW(wR, wC, d1 + 2, d2),
                getW(wR, wC, d1 + 3, d2)
              );

              if (${g}) {
                vec4 xValues = vec4(
                  getX(batch, xR, xC, d1),
                  getX(batch, xR, xC, d1 + 1),
                  getX(batch, xR, xC, d1 + 2),
                  getX(batch, xR, xC, d1 + 3)
                );
                dotProd += dot(xValues, wValues);
              } else {
                vec4 xValues = vec4(
                  getX(batch, d1, xR, xC),
                  getX(batch, d1 + 1, xR, xC),
                  getX(batch, d1 + 2, xR, xC),
                  getX(batch, d1 + 3, xR, xC)
                );
                dotProd += dot(xValues, wValues);
              }
            }

            if (${h===1}) {

              if (${g}) {
                dotProd +=
                    getX(batch, xR, xC, ${d}) *
                    getW(wR, wC, ${d}, d2);
              } else {
                dotProd +=
                    getX(batch, ${d}, xR, xC) *
                    getW(wR, wC, ${d}, d2);
              }

            } else if (${h===2}) {
              vec2 wValues = vec2(
                getW(wR, wC, ${d}, d2),
                getW(wR, wC, ${d} + 1, d2)
              );

              if (${g}) {
                vec2 xValues = vec2(
                  getX(batch, xR, xC, ${d}),
                  getX(batch, xR, xC, ${d} + 1)
                );
                dotProd += dot(xValues, wValues);
              } else {
                vec2 xValues = vec2(
                  getX(batch, ${d}, xR, xC),
                  getX(batch, ${d} + 1, xR, xC)
                );
                dotProd += dot(xValues, wValues);
              }

            } else if (${h===3}) {
              vec3 wValues = vec3(
                getW(wR, wC, ${d}, d2),
                getW(wR, wC, ${d} + 1, d2),
                getW(wR, wC, ${d} + 2, d2)
              );

              if (${g}) {
                vec3 xValues = vec3(
                  getX(batch, xR, xC, ${d}),
                  getX(batch, xR, xC, ${d} + 1),
                  getX(batch, xR, xC, ${d} + 2)
                );
                dotProd += dot(xValues, wValues);
              } else {
                vec3 xValues = vec3(
                  getX(batch, ${d}, xR, xC),
                  getX(batch, ${d} + 1, xR, xC),
                  getX(batch, ${d} + 2, xR, xC)
                );
                dotProd += dot(xValues, wValues);
              }

            }
          }
        }

        float result = dotProd;
        ${$}
        ${k}
        setOutput(result);
      }
    `}},Uf=class{constructor(t){this.variableNames=["x","W"],this.outputShape=t.outShape;let e=t.padInfo.front,o=t.padInfo.top,n=t.padInfo.left,s=t.strideDepth,a=t.strideHeight,i=t.strideWidth,c=t.dilationDepth,p=t.dilationHeight,l=t.dilationWidth,u=t.filterDepth,m=t.filterHeight,f=t.filterWidth,d=Math.floor(t.inChannels/4)*4,h=t.inChannels%4;this.userCode=`
      const ivec3 strides = ivec3(${s}, ${a}, ${i});
      const ivec3 pads = ivec3(${e}, ${o}, ${n});

      void main() {
        ivec5 coords = getOutputCoords();
        int batch = coords.x;
        int d2 = coords.u;

        ivec3 xFRCCorner = ivec3(coords.y, coords.z, coords.w) * strides - pads;
        int xFCorner = xFRCCorner.x;
        int xRCorner = xFRCCorner.y;
        int xCCorner = xFRCCorner.z;

        // Convolve x(?, ?, ?, d1) with w(:, :, :, d1, d2) to get
        // y(yF, yR, yC, d2). ? = to be determined. : = across all
        // values in that axis.
        float dotProd = 0.0;
        for (int wF = 0; wF < ${u}; wF++) {
          int xF = xFCorner + wF * ${c};

          if (xF < 0 || xF >= ${t.inDepth}) {
            continue;
          }

          for (int wR = 0; wR < ${m}; wR++) {
            int xR = xRCorner + wR * ${p};

            if (xR < 0 || xR >= ${t.inHeight}) {
              continue;
            }

            for (int wC = 0; wC < ${f}; wC++) {
              int xC = xCCorner + wC * ${l};

              if (xC < 0 || xC >= ${t.inWidth}) {
                continue;
              }

              for (int d1 = 0; d1 < ${d}; d1 += 4) {
                vec4 xValues = vec4(
                  getX(batch, xF, xR, xC, d1),
                  getX(batch, xF, xR, xC, d1 + 1),
                  getX(batch, xF, xR, xC, d1 + 2),
                  getX(batch, xF, xR, xC, d1 + 3)
                );
                vec4 wValues = vec4(
                  getW(wF, wR, wC, d1, d2),
                  getW(wF, wR, wC, d1 + 1, d2),
                  getW(wF, wR, wC, d1 + 2, d2),
                  getW(wF, wR, wC, d1 + 3, d2)
                );

                dotProd += dot(xValues, wValues);
              }

              if (${h===1}) {
                dotProd +=
                  getX(batch, xF, xR, xC, ${d}) *
                  getW(wF, wR, wC, ${d}, d2);
              } else if (${h===2}) {
                vec2 xValues = vec2(
                  getX(batch, xF, xR, xC, ${d}),
                  getX(batch, xF, xR, xC, ${d} + 1)
                );
                vec2 wValues = vec2(
                  getW(wF, wR, wC, ${d}, d2),
                  getW(wF, wR, wC, ${d} + 1, d2)
                );
                dotProd += dot(xValues, wValues);
              } else if (${h===3}) {
                vec3 xValues = vec3(
                  getX(batch, xF, xR, xC, ${d}),
                  getX(batch, xF, xR, xC, ${d} + 1),
                  getX(batch, xF, xR, xC, ${d} + 2)
                );
                vec3 wValues = vec3(
                  getW(wF, wR, wC, ${d}, d2),
                  getW(wF, wR, wC, ${d} + 1, d2),
                  getW(wF, wR, wC, ${d} + 2, d2)
                );
                dotProd += dot(xValues, wValues);
              }
            }
          }
        }
        setOutput(dotProd);
      }
    `}};var ep=class{constructor(t,e=!1,o=null,n=!1,s=!1){this.variableNames=["x","W"],this.packedInputs=!0,this.packedOutput=!0,this.customUniforms=[{name:"pads",type:"ivec2"},{name:"strides",type:"ivec2"},{name:"dilations",type:"ivec2"},{name:"inDims",type:"ivec2"}],this.outputShape=t.outShape,this.enableShapeUniforms=_t(this.outputShape.length);let a=t.padInfo.left,i=t.strideWidth,c=t.dilationWidth,p=t.filterHeight,l=t.filterWidth,u=l,m=`
       int xR; int xC; int xCOffset;
       vec4 wTexel; vec4 previous; vec4 final;`;for(let g=0;g<l;g++)m+=`
           vec4 xTexelC${g*2};
           int xTexelC${g*2}Ready;
           vec4 xTexelC${g*2+1};
           int xTexelC${g*2+1}Ready;
           vec4 xC${g};`;m+=`
     for (int r = 0; r < ${p}; r++) {
      for (int d1 = 0; d1 < ${t.inChannels}; d1 += 2) {
       `;for(let g=0;g<l;g++)m+=`
           xTexelC${g*2} = vec4(0.0);
           xTexelC${g*2}Ready = 0;
           xTexelC${g*2+1} = vec4(0.0);
           xTexelC${g*2+1}Ready = 0;
           xC${g} = vec4(0.0);`;m+=`
         xR = xRCorner + r * dilations[0];
         if (xR >=0 && xR < inDims[0]) {
       `;for(let g=0;g<(u+1)/2;g++){let x=g*2;if(m+=`
           xC = xCCorner + ${x*c};
           `,i===1){if(x<l&&(a%2===1?(m+=`
                 xCOffset = xC + 1;
                 if (xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${x}Ready == 0) {
                   xTexelC${x} = getX(batch, xR, xCOffset, d1);

                   // Need to manually clear unused channels in case
                   // we're reading from recycled texture.
                   if (xCOffset + 1 >= inDims[1]) {
                     xTexelC${x}.zw = vec2(0.0);
                   }
                   xTexelC${x}Ready = 1;
                 }
               `,c===1&&x>0?m+=`
                 xC${x} = vec4(xTexelC${x-2}.zw, xTexelC${x}.xy);
                 `:m+=`
                   xCOffset = xC + 1 - 2;

                   if (xCOffset >= 0 && xCOffset < inDims[1]) {
                     previous = getX(batch, xR, xCOffset, d1);

                     // Need to manually clear unused channels in case
                     // we're reading from recycled texture.
                     if (xCOffset + 1 >= inDims[1]) {
                       previous.zw = vec2(0.0);
                     }

                     xC${x} = vec4(previous.zw, xTexelC${x}.xy);
                   } else {
                     xC${x} = vec4(0.0, 0.0, xTexelC${x}.xy);
                   }
                   `):m+=`
                 if (xC >= 0 && xC < inDims[1] && xTexelC${x}Ready == 0) {
                   xTexelC${x} = getX(batch, xR, xC, d1);
                   if (xC + 1 >= inDims[1]) {
                     xTexelC${x}.zw = vec2(0.0);
                   }
                   xTexelC${x}Ready = 1;
                 }

                 xC${x} = xTexelC${x};
                 `,x+1<l)){let b=a%2===0?y.nearestLargerEven(c):c;c%2===0&&a%2===1||c%2!==0&&a%2!==1?(m+=`
                   xCOffset = xC + imod(pads[1], 2) + ${b};

                   if (xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${x+1}Ready == 0) {
                     xTexelC${x+1} = getX(batch, xR, xCOffset, d1);

                     // Need to manually clear unused channels in case
                     // we're reading from recycled texture.
                     if (xCOffset + 1 >= inDims[1]) {
                       xTexelC${x+1}.zw = vec2(0.0);
                     }
                     xTexelC${x+1}Ready = 1;
                   }
                   `,c>1?m+=`
                     xCOffset -= 2;
                     if (xCOffset >= 0 && xCOffset < inDims[1]) {
                      previous = getX(batch, xR, xCOffset, d1);
                      xC${x+1} = vec4(previous.zw, xTexelC${x+1}.xy);
                     } else {
                      xC${x+1} = vec4(0.0, 0.0, xTexelC${x+1}.xy);
                     }
                     `:m+=`
                     xC${x+1} = vec4(xTexelC${x}.zw, xTexelC${x+1}.xy);
                     `):b===1?m+=`
                     xC${x+1} = xTexelC${x};
                     `:m+=`
                     xCOffset = xC + ${b};

                     if (xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${x+1}Ready == 0) {
                       xTexelC${x+1} = getX(batch, xR, xCOffset, d1);
                       if (xCOffset + 1 >= inDims[1]) {
                         xTexelC${x+1}.zw = vec2(0.0);
                       }
                       xTexelC${x+1}Ready = 1;
                     }

                     xC${x+1} = xTexelC${x+1};
                     `}}else x<l&&(a%2===1?(m+=`
                 xCOffset = xC + 1 - strides[1];
                 if(xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${x}Ready == 0) {
                   xTexelC${x} = getX(batch, xR, xCOffset, d1);
                   // Need to manually clear unused channels in case
                   // we're reading from recycled texture.
                   if (xCOffset + 1 >= inDims[1]) {
                     xTexelC${x}.zw = vec2(0.0);
                   }
                   xTexelC${x}Ready = 1;
                 }

                 if(xC + 1 >= 0 && xC + 1 < inDims[1] && xTexelC${x+1}Ready == 0) {
                   xTexelC${x+1} = getX(batch, xR, xC + 1, d1);
                   // Need to manually clear unused channels in case
                   // we're reading from recycled texture.
                   if (xC + 2 >= inDims[1]) {
                     xTexelC${x+1}.zw = vec2(0.0);
                   }
                   xTexelC${x+1}Ready = 1;
                 }

                 xC${x} = vec4(xTexelC${x}.zw, xTexelC${x+1}.zw);
               `,x+1<l&&(m+=`
                   final = vec4(0.0);
                   xCOffset = xC + 1 + strides[1];
                   if(xCOffset >= 0 && xCOffset < inDims[1]) {
                     final = getX(batch, xR, xCOffset, d1);
                   }
                   xC${x+1} = vec4(xTexelC${x+1}.xy, final.xy);
                 `)):(m+=`
                 if(xC >= 0 && xC < inDims[1] && xTexelC${x}Ready == 0) {
                   xTexelC${x} = getX(batch, xR, xC, d1);
                   if (xC + 1 >= inDims[1]) {
                     xTexelC${x}.zw = vec2(0.0);
                   }
                   xTexelC${x}Ready = 1;
                 }

                 xCOffset = xC + strides[1];
                 if(xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${x+1}Ready == 0) {
                   xTexelC${x+1} = getX(batch, xR, xCOffset, d1);
                   if (xCOffset + 1 >= inDims[1]) {
                     xTexelC${x+1}.zw = vec2(0.);
                   }
                   xTexelC${x+1}Ready = 1;
                 }

                 xC${x} = vec4(
                   xTexelC${x}.xy, xTexelC${x+1}.xy);
               `,x+1<l&&(m+=`
                   xC${x+1} = vec4(xTexelC${x}.zw, xTexelC${x+1}.zw);
                 `)));x<l&&(m+=`
             wTexel = getW(r, ${x}, d1, d2);
             dotProd += xC${x}.xxzz * vec4(wTexel.xy, wTexel.xy);
             if(d1 + 1 < ${t.inChannels}) {
               dotProd += xC${x}.yyww * vec4(wTexel.zw, wTexel.zw);
             }
           `,x+1<l&&(m+=`
               wTexel = getW(r, ${x+1}, d1, d2);
               dotProd += xC${x+1}.xxzz * vec4(wTexel.xy, wTexel.xy);
               if(d1 + 1 < ${t.inChannels}) {
                 dotProd += xC${x+1}.yyww * vec4(wTexel.zw, wTexel.zw);
               }
             `))}m+=`
     }
   `,m+=`
     }
   `,m+=`
     }
   `;let f="",d="";o&&(n?f=`vec4 activation(vec4 a) {
           vec4 b = getPreluActivationWeightsAtOutCoords();
           ${o}
         }`:s?f=`vec4 activation(vec4 a) {
           vec4 b = getLeakyreluAlphaAtOutCoords();
           ${o}
         }`:f=`vec4 activation(vec4 x) {
           ${o}
         }`,d="result = activation(result);");let h=e?"result += getBiasAtOutCoords();":"";e&&this.variableNames.push("bias"),n&&this.variableNames.push("preluActivationWeights"),s&&this.variableNames.push("leakyreluAlpha"),this.userCode=`
       ${f}

       void main() {
         ivec4 coords = getOutputCoords();
         int batch = coords.x;
         ivec2 xRCCorner = coords.yz * strides - pads;
         int d2 = coords.w;
         int xRCorner = xRCCorner.x;
         int xCCorner = xRCCorner.y;

         //intialize dotProd with a small epsilon seems to reduce GPU accuracy loss.
         vec4 dotProd = vec4(0.000000000000001);

         ${m}

         vec4 result = dotProd - vec4(0.000000000000001);
         ${h}
         ${d}
         setOutput(result);
       }
     `}};var zf=class{constructor(t,e){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.customUniforms=[{name:"inputShape",type:"ivec4"},{name:"pad",type:"ivec2"},{name:"stride",type:"ivec2"},{name:"dilation",type:"ivec2"},{name:"inChannels",type:"int"},{name:"itemsPerBlockRow",type:"int"},{name:"outWidth",type:"int"}],this.outputShape=t,this.enableShapeUniforms=_t(this.outputShape.length);let{dataFormat:o}=e,n=zt(),s=o==="channelsLast",a=s?1:2,i=s?2:3,c=this.enableShapeUniforms?"if(blockIndex < outShape[2] && pos < outShape[1]) {":`if(blockIndex < ${t[2]} && pos < ${t[1]}) {`,p="";for(let l=0;l<=1;l++)for(let u=0;u<=1;u++)p+=`
          blockIndex = rc.z + ${u};
          pos = rc.y + ${l};

          ${c}
            offsetY = int(blockIndex / outWidth) * stride[0] - pad[0];
            d0 = offsetY + dilation[0] * (pos / itemsPerBlockRow);

            if(d0 < inputShape[${a}] && d0 >= 0) {
              // Use custom imod instead mod. On Intel GPU, mod may generate
              // unexpected value.
              // https://github.com/tensorflow/tfjs/issues/5447
              offsetX = imod(blockIndex, outWidth) * stride[1] - pad[1];
              d1 = offsetX + dilation[1] * (imod(pos, itemsPerBlockRow) /
                  inChannels);

              if(d1 < inputShape[${i}] && d1 >= 0) {

                ch = imod(pos, inChannels);

                if (${s}) {
                  innerDims = vec2(d1, ch);
                  result[${l*2+u}] = getChannel(
                    getA(rc.x, d0, int(innerDims.x),
                    int(innerDims.y)), innerDims);
                } else {
                  innerDims = vec2(d0, d1);
                  result[${l*2+u}] = getChannel(
                    getA(rc.x, ch, int(innerDims.x),
                    int(innerDims.y)), innerDims);
                }
              }
            }
          }
        `;this.userCode=`
      void main() {
        ivec3 rc = getOutputCoords();

        vec4 result = vec4(0);

        int blockIndex, pos, offsetY, d0, offsetX, d1, ch;
        vec2 innerDims;

        ${p}

        ${n.output} = result;
      }
    `}};function Wf(r,t){let e=r.length;return e>=3?t?[...r.slice(0,-3),r[e-3]*r[e-2],r[e-1]]:[...r.slice(0,-3),r[e-3],r[e-2]*r[e-1]]:!t&&e===1&&r[0]>1?[r[0],1]:null}function Hf({x:r,filter:t,convInfo:e,backend:o,bias:n=null,preluActivationWeights:s=null,leakyreluAlpha:a=0,activation:i=null}){let c=r.shape,p=o.texData.get(r.dataId),l=e.inChannels,u=c[0]*c[1]*c[2],m=e.outChannels,f=e.dataFormat==="channelsLast",d=!1,h=!1,g,x=[];if(s!=null){let I=Wf(s.shape,f);I!=null&&(s=K({inputs:{x:s},backend:o,attrs:{shape:I}}),x.push(s))}if(n!=null){let I=Wf(n.shape,f);I!=null&&(n=K({inputs:{x:n},backend:o,attrs:{shape:I}}),x.push(n))}if(!((u===1||m===1)&&l>Vy)&&p.isPacked&&f&&p.texture!=null&&c[2]%2!==0&&y.arraysEqual(p.shape.slice(-3),c.slice(-3))){let I=c[0]*c[1]*(c[2]+1),k={dataId:r.dataId,shape:[1,I,e.inChannels],dtype:r.dtype},$=p.shape;p.shape=p.shape.slice(),p.shape[p.shape.length-2]++,y.assert(Hi(p.shape,k.shape),()=>`packed reshape ${p.shape} to ${k.shape} isn't free`);let R=K({inputs:{x:t},backend:o,attrs:{shape:[1,e.inChannels,e.outChannels]}});x.push(R);let D=Zi({a:k,b:R,backend:o,transposeA:d,transposeB:h,bias:n,activation:i,preluActivationWeights:s,leakyreluAlpha:a}),_=o.texData.get(D.dataId);y.assert(_.isPacked,()=>"batchMatMul result is expected to be packed"),p.shape=$,_.shape=e.outShape,g=Yt({inputs:{x:D},backend:o}),g.shape=e.outShape,x.push(D)}else{let I=e.outHeight*e.outWidth,k=K({inputs:{x:r},backend:o,attrs:{shape:f?[e.batchSize,I,e.inChannels]:[e.batchSize,e.inChannels,I]}}),$=K({inputs:{x:t},backend:o,attrs:{shape:[1,e.inChannels,e.outChannels]}}),R=Zi({a:f?k:$,b:f?$:k,transposeA:!f,transposeB:h,backend:o,bias:n,activation:i,preluActivationWeights:s,leakyreluAlpha:a});g=K({inputs:{x:R},backend:o,attrs:{shape:e.outShape}}),x.push(k),x.push($),x.push(R)}for(let I of x)o.disposeIntermediateTensorInfo(I);return g}function qf({x:r,filter:t,convInfo:e,backend:o,bias:n=null,preluActivationWeights:s=null,leakyreluAlpha:a=0,activation:i=null}){let{filterWidth:c,filterHeight:p,inChannels:l,outWidth:u,outHeight:m,dataFormat:f}=e,d=f==="channelsLast",h=c*p*l,g=m*u,x=[e.batchSize,h,g],b=!0,w=!1,I=[];if(s!=null){let U=Wf(s.shape,d);U!=null&&(s=K({inputs:{x:s},backend:o,attrs:{shape:U}}),I.push(s))}if(n!=null){let U=Wf(n.shape,d);U!=null&&(n=K({inputs:{x:n},backend:o,attrs:{shape:U}}),I.push(n))}let k=K({inputs:{x:t},backend:o,attrs:{shape:[1,h,y.sizeFromShape(t.shape)/h]}});I.push(k);let $=new zf(x,e),R=[r.shape,[e.padInfo.top,e.padInfo.left],[e.strideHeight,e.strideWidth],[e.dilationHeight,e.dilationWidth],[e.inChannels],[e.filterWidth*e.inChannels],[e.outWidth]],D=o.runWebGLProgram($,[r],"float32",R),_=K({inputs:{x:D},backend:o,attrs:{shape:x}});I.push(D),I.push(_);let O=n!=null,L=s!=null,M=i==="leakyrelu",B=i?Vo(i,!0):null,G=new Qc(d?_.shape:k.shape,d?k.shape:_.shape,d?[e.batchSize,g,e.outChannels]:[e.batchSize,e.outChannels,g],b,w,O,B,L,M),V=d?[_,k]:[k,_];if(n&&V.push(n),L&&V.push(s),M){let U=o.makeTensorInfo([],"float32",y.createScalarValue(a,"float32"));V.push(U),I.push(U)}let W=o.runWebGLProgram(G,V,"float32"),H=K({inputs:{x:W},backend:o,attrs:{shape:e.outShape}});I.push(W);for(let U of I)o.disposeIntermediateTensorInfo(U);return H}function TU(r){let{inputs:t,backend:e,attrs:o}=r,{x:n,filter:s}=t,{strides:a,pad:i,dataFormat:c,dilations:p,dimRoundingMode:l}=o,u=v.convertConv2DDataFormat(c),m=v.computeConv2DInfo(n.shape,s.shape,a,p,i,l,!1,u),f;if(m.filterHeight===1&&m.filterWidth===1&&m.dilationHeight===1&&m.dilationWidth===1&&m.strideHeight===1&&m.strideWidth===1&&(m.padInfo.type==="SAME"||m.padInfo.type==="VALID"))f=Hf({x:n,filter:s,convInfo:m,backend:e});else if(m.strideWidth<=2&&u==="channelsLast"&&F().getBool("WEBGL_EXP_CONV")){let h=new ep(m),g=[[m.padInfo.top,m.padInfo.left],[m.strideHeight,m.strideWidth],[m.dilationHeight,m.dilationWidth],[m.inHeight,m.inWidth]];f=e.runWebGLProgram(h,[n,s],"float32",g)}else if(F().getBool("WEBGL_CONV_IM2COL"))f=qf({x:n,filter:s,convInfo:m,backend:e});else{let h=new tp(m);f=e.runWebGLProgram(h,[n,s],"float32")}let d=K({inputs:{x:f},backend:e,attrs:{shape:m.outShape}});return e.disposeIntermediateTensorInfo(f),d}var ck={kernelName:Ns,backendName:"webgl",kernelFunc:TU};var Kf=class{constructor(t){this.variableNames=["x","dy"],this.outputShape=t.filterShape;let e=t.strideHeight,o=t.strideWidth,n=t.padInfo.top,s=t.padInfo.left,a=t.dataFormat==="channelsLast";this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int wR = coords.x;
        int wC = coords.y;
        int d1 = coords.z;
        int d2 = coords.w;

        // Convolve x(?, ?, d1) with dy(:, :, d2) to get dw(wR, wC, d1, d2).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;

        for (int b = 0; b < ${t.batchSize}; b++) {
          for (int yR = 0; yR < ${t.outHeight}; yR++) {
            int xR = wR + yR * ${e} - ${n};

            if (xR < 0 || xR >= ${t.inHeight}) {
              continue;
            }

            for (int yC = 0; yC < ${t.outWidth}; yC++) {
              int xC = wC + yC * ${o} - ${s};

              if (xC < 0 || xC >= ${t.inWidth}) {
                continue;
              }

              if (${a}) {
                float dyValue = getDy(b, yR, yC, d2);
                float xValue = getX(b, xR, xC, d1);
                dotProd += (xValue * dyValue);
              } else {
                float dyValue = getDy(b, d2, yR, yC);
                float xValue = getX(b, d1, xR, xC);
                dotProd += (xValue * dyValue);
              }

            }
          }
        }
        setOutput(dotProd);
      }
    `}},jf=class{constructor(t){this.variableNames=["dy","W"],this.outputShape=t.inShape;let e=t.filterHeight,o=t.filterWidth,n=t.strideHeight,s=t.strideWidth,a=t.dataFormat==="channelsLast",i=e-1-t.padInfo.top,c=o-1-t.padInfo.left,p=a?1:2,l=a?2:3,u=a?3:1;this.userCode=`
      const ivec2 pads = ivec2(${i}, ${c});

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords[0];
        int d1 = coords[${u}];

        ivec2 dyCorner = ivec2(coords[${p}], coords[${l}]) - pads;
        int dyRCorner = dyCorner.x;
        int dyCCorner = dyCorner.y;

        // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;
        for (int wR = 0; wR < ${e}; wR++) {
          float dyR = float(dyRCorner + wR) / ${n}.0;

          if (dyR < 0.0 || dyR >= ${t.outHeight}.0 || fract(dyR) > 0.0) {
            continue;
          }
          int idyR = int(dyR);

          int wRPerm = ${e} - 1 - wR;

          for (int wC = 0; wC < ${o}; wC++) {
            float dyC = float(dyCCorner + wC) / ${s}.0;

            if (dyC < 0.0 || dyC >= ${t.outWidth}.0 ||
                fract(dyC) > 0.0) {
              continue;
            }
            int idyC = int(dyC);

            int wCPerm = ${o} - 1 - wC;

            for (int d2 = 0; d2 < ${t.outChannels}; d2++) {

              if (${a}) {
                float xValue = getDy(batch, idyR, idyC, d2);
                float wValue = getW(wRPerm, wCPerm, d1, d2);
                dotProd += xValue * wValue;
              } else {
                float xValue = getDy(batch, d2, idyR, idyC);
                float wValue = getW(wRPerm, wCPerm, d1, d2);
                dotProd += xValue * wValue;
              }

            }
          }
        }
        setOutput(dotProd);
      }
    `}},Xf=class{constructor(t){this.variableNames=["x","dy"],this.outputShape=t.filterShape;let e=t.strideDepth,o=t.strideHeight,n=t.strideWidth,s=t.padInfo.front,a=t.padInfo.top,i=t.padInfo.left;this.userCode=`
      void main() {
        ivec5 coords = getOutputCoords();
        int wF = coords.x;
        int wR = coords.y;
        int wC = coords.z;
        int d1 = coords.w;
        int d2 = coords.u;

        float dotProd = 0.0;

        for (int b = 0; b < ${t.batchSize}; b++) {
          for (int yF = 0; yF < ${t.outDepth}; yF++) {
            int xF = wF + yF * ${e} - ${s};

            if (xF < 0 || xF >= ${t.inDepth}) {
              continue;
            }

            for (int yR = 0; yR < ${t.outHeight}; yR++) {
              int xR = wR + yR * ${o} - ${a};

              if (xR < 0 || xR >= ${t.inHeight}) {
                continue;
              }

              for (int yC = 0; yC < ${t.outWidth}; yC++) {
                int xC = wC + yC * ${n} - ${i};

                if (xC < 0 || xC >= ${t.inWidth}) {
                  continue;
                }

                float dyValue = getDy(b, yF, yR, yC, d2);
                float xValue = getX(b, xF, xR, xC, d1);
                dotProd += (xValue * dyValue);
              }
            }
          }
        }
        setOutput(dotProd);
      }
    `}},Yf=class{constructor(t){this.variableNames=["dy","W"],this.outputShape=t.inShape;let e=t.filterDepth,o=t.filterHeight,n=t.filterWidth,s=t.strideDepth,a=t.strideHeight,i=t.strideWidth,c=e-1-t.padInfo.front,p=o-1-t.padInfo.top,l=n-1-t.padInfo.left;this.userCode=`
      const ivec3 pads = ivec3(${c}, ${p}, ${l});

      void main() {
        ivec5 coords = getOutputCoords();
        int batch = coords.x;
        int d1 = coords.u;


        ivec3 dyCorner = ivec3(coords.y, coords.z, coords.w) - pads;
        int dyFCorner = dyCorner.x;
        int dyRCorner = dyCorner.y;
        int dyCCorner = dyCorner.z;

        float dotProd = 0.0;
        for (int wF = 0; wF < ${e}; wF++) {
          float dyF = float(dyFCorner + wF) / ${s}.0;

          if (dyF < 0.0 || dyF >= ${t.outDepth}.0 || fract(dyF) > 0.0) {
            continue;
          }
          int idyF = int(dyF);

          int wFPerm = ${e} - 1 - wF;

          for (int wR = 0; wR < ${o}; wR++) {
            float dyR = float(dyRCorner + wR) / ${a}.0;

            if (dyR < 0.0 || dyR >= ${t.outHeight}.0 ||
              fract(dyR) > 0.0) {
              continue;
            }
            int idyR = int(dyR);

            int wRPerm = ${o} - 1 - wR;

            for (int wC = 0; wC < ${n}; wC++) {
              float dyC = float(dyCCorner + wC) / ${i}.0;

              if (dyC < 0.0 || dyC >= ${t.outWidth}.0 ||
                  fract(dyC) > 0.0) {
                continue;
              }
              int idyC = int(dyC);

              int wCPerm = ${n} - 1 - wC;

              for (int d2 = 0; d2 < ${t.outChannels}; d2++) {
                float xValue = getDy(batch, idyF, idyR, idyC, d2);
                float wValue = getW(wFPerm, wRPerm, wCPerm, d1, d2);
                dotProd += xValue * wValue;
              }
            }
          }
        }
        setOutput(dotProd);
      }
    `}};function wU(r){let{inputs:t,backend:e,attrs:o}=r,{x:n,dy:s}=t,{strides:a,pad:i,dataFormat:c,dimRoundingMode:p,filterShape:l}=o,u=v.convertConv2DDataFormat(c),m=v.computeConv2DInfo(n.shape,l,a,1,i,p,!1,u),f=new Kf(m);return e.runWebGLProgram(f,[n,s],"float32")}var pk={kernelName:ks,backendName:"webgl",kernelFunc:wU};function IU(r){let{inputs:t,backend:e,attrs:o}=r,{dy:n,filter:s}=t,{inputShape:a,strides:i,pad:c,dataFormat:p,dimRoundingMode:l}=o,u=v.convertConv2DDataFormat(p),m=v.computeConv2DInfo(a,s.shape,i,1,c,l,!1,u),f=new jf(m);return e.runWebGLProgram(f,[n,s],"float32")}var lk={kernelName:Es,backendName:"webgl",kernelFunc:IU};function SU(r){let{inputs:t,backend:e,attrs:o}=r,{x:n,filter:s}=t,{strides:a,pad:i,dilations:c}=o,p=v.computeConv3DInfo(n.shape,s.shape,a,c,i),l=new Uf(p);return e.runWebGLProgram(l,[n,s],"float32")}var uk={kernelName:$s,backendName:"webgl",kernelFunc:SU};function vU(r){let{inputs:t,backend:e,attrs:o}=r,{x:n,dy:s}=t,{strides:a,pad:i,filterShape:c}=o,p=v.computeConv3DInfo(n.shape,c,a,1,i),l=new Xf(p);return e.runWebGLProgram(l,[n,s],"float32")}var mk={kernelName:gp,backendName:"webgl",kernelFunc:vU};function NU(r){let{inputs:t,backend:e,attrs:o}=r,{dy:n,filter:s}=t,{pad:a,strides:i,inputShape:c}=o,p=v.computeConv3DInfo(c,s.shape,i,1,a),l=new Yf(p);return e.runWebGLProgram(l,[n,s],"float32")}var fk={kernelName:As,backendName:"webgl",kernelFunc:NU};var kU=Sr+`
  return cos(x);
`,EU=st({opSnippet:kU}),dk={kernelName:"Cos",backendName:"webgl",kernelFunc:EU};var $U=`
  float e2x = exp(-x);
  return (e2x + 1.0 / e2x) / 2.0;
`,AU=st({opSnippet:$U}),hk={kernelName:nn,backendName:"webgl",kernelFunc:AU};var Zf=class{constructor(t,e,o,n,s){this.variableNames=["Image","Boxes","BoxInd"],this.outputShape=[];let[a,i,c,p]=t,[l]=e,[u,m]=o;this.outputShape=[l,u,m,p];let f=n==="bilinear"?1:0,[d,h]=[`${i-1}.0`,`${c-1}.0`],[g,x,b]=u>1?[`${(i-1)/(u-1)}`,"(y2-y1) * height_ratio",`y1*${d} + float(y)*(height_scale)`]:["0.0","0.0",`0.5 * (y1+y2) * ${d}`],[w,I,k]=m>1?[`${(c-1)/(m-1)}`,"(x2-x1) * width_ratio",`x1*${h} + float(x)*(width_scale)`]:["0.0","0.0",`0.5 * (x1+x2) * ${h}`];this.userCode=`
      const float height_ratio = float(${g});
      const float width_ratio = float(${w});
      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int y = coords[1];
        int x = coords[2];
        int d = coords[3];

        // get box vals
        float y1 = getBoxes(b,0);
        float x1 = getBoxes(b,1);
        float y2 = getBoxes(b,2);
        float x2 = getBoxes(b,3);

        // get image in batch index
        int bInd = round(getBoxInd(b));
        if(bInd < 0 || bInd >= ${a}) {
          return;
        }

        float height_scale = ${x};
        float width_scale = ${I};

        float in_y = ${b};
        if( in_y < 0.0 || in_y > ${d} ) {
          setOutput(float(${s}));
          return;
        }
        float in_x = ${k};
        if( in_x < 0.0 || in_x > ${h} ) {
          setOutput(float(${s}));
          return;
        }

        vec2 sourceFracIndexCR = vec2(in_x,in_y);
        if(${f} == 1) {
          // Compute the four integer indices.
          ivec2 sourceFloorCR = ivec2(sourceFracIndexCR);
          ivec2 sourceCeilCR = ivec2(ceil(sourceFracIndexCR));

          float topLeft = getImage(b, sourceFloorCR.y, sourceFloorCR.x, d);
          float bottomLeft = getImage(b, sourceCeilCR.y, sourceFloorCR.x, d);
          float topRight = getImage(b, sourceFloorCR.y, sourceCeilCR.x, d);
          float bottomRight = getImage(b, sourceCeilCR.y, sourceCeilCR.x, d);

          vec2 fracCR = sourceFracIndexCR - vec2(sourceFloorCR);

          float top = topLeft + (topRight - topLeft) * fracCR.x;
          float bottom = bottomLeft + (bottomRight - bottomLeft) * fracCR.x;
          float newValue = top + (bottom - top) * fracCR.y;
          setOutput(newValue);
        } else {
          // Compute the coordinators of nearest neighbor point.
          ivec2 sourceNearestCR = ivec2(floor(
            sourceFracIndexCR + vec2(0.5,0.5)));
          float newValue = getImage(b, sourceNearestCR.y, sourceNearestCR.x, d);
          setOutput(newValue);
        }
      }
    `}};var RU=r=>{let{inputs:t,backend:e,attrs:o}=r,{image:n,boxes:s,boxInd:a}=t,{cropSize:i,method:c,extrapolationValue:p}=o,l=new Zf(n.shape,s.shape,i,c,p);return e.runWebGLProgram(l,[n,s,a],"float32")},gk={kernelName:_s,backendName:"webgl",kernelFunc:RU};var Ji;(function(r){r.Prod="*",r.Sum="+"})(Ji||(Ji={}));var uu=class{constructor(t,e,o,n){this.op=t,this.outputShape=e,this.variableNames=["x"],this.customUniforms=[{name:"index",type:"float"}];let s=this.outputShape.length,a=this.op===Ji.Prod?"1.0":"0.0",i=o?a:`getX(${xk(s,"coords",this.op)})`,c=this.outputShape[this.outputShape.length-1],p="",l="";o?(p=n?`end != ${c-1}`:"end != 0",l=n?"end + 1":"end - 1"):(p=n?`end + pow2 < ${c}`:"end >= pow2",l=n?"end + pow2":"end - pow2"),this.userCode=`
      void main() {
        ${gt(s)} coords = getOutputCoords();
        int end = ${yk(s,"coords",this.op)};
        float val = ${i};
        int pow2 = int(pow(2.0, index));
        if (${p}) {
          int idx = ${l};
          ${yk(s,"coords",this.op)} = idx;
          val ${this.op}= getX(${xk(s,"coords",this.op)});
        }
        setOutput(val);
      }
    `}};function xk(r,t,e){if(r===1)return`${t}`;if(r===2)return`${t}.x, ${t}.y`;if(r===3)return`${t}.x, ${t}.y, ${t}.z`;if(r===4)return`${t}.x, ${t}.y, ${t}.z, ${t}.w`;throw new Error(`Cumulative ${e} for rank ${r} is not yet supported`)}function yk(r,t,e){if(r===1)return`${t}`;if(r===2)return`${t}.y`;if(r===3)return`${t}.z`;if(r===4)return`${t}.w`;throw new Error(`Cumulative ${e} for rank ${r} is not yet supported`)}function Qf(r,t,e,o,n,s){let a=t.shape.length,i=v.getAxesPermutation([o],a),c=t;i!=null&&(c=Bt({inputs:{x:t},backend:e,attrs:{perm:i}}));let p=v.getInnerMostAxes(1,a)[0];if(p!==a-1)throw new Error(`WebGL cumprod shader expects an inner-most axis=${t.shape.length-1} but got axis=${o}`);let l=c.shape[p],u=Yt({inputs:{x:c},backend:e});for(let m=0;m<=Math.ceil(Math.log2(l))-1;m++){let f=new uu(r,c.shape,!1,s),d=[[m]],h=u;u=e.runWebGLProgram(f,[u],u.dtype,d),e.disposeIntermediateTensorInfo(h)}if(n){let m=new uu(r,c.shape,n,s),f=u;u=e.runWebGLProgram(m,[u],u.dtype),e.disposeIntermediateTensorInfo(f)}if(i!=null){let m=v.getUndoAxesPermutation(i),f=Bt({inputs:{x:u},backend:e,attrs:{perm:m}});return e.disposeIntermediateTensorInfo(u),e.disposeIntermediateTensorInfo(c),f}return u}function DU(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{axis:s,exclusive:a,reverse:i}=o;return Qf(Ji.Prod,n,e,s,a,i)}var bk={kernelName:Ds,backendName:"webgl",kernelFunc:DU};function FU(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{axis:s,exclusive:a,reverse:i}=o;return Qf(Ji.Sum,n,e,s,a,i)}var Ck={kernelName:Fs,backendName:"webgl",kernelFunc:FU};function _U(r){let{inputs:t,backend:e,attrs:o}=r,{x:n,weights:s}=t,{size:a,binaryOutput:i}=o;if(n.shape.length===1){let c=e.readSync(n.dataId),p=e.readSync(s.dataId),l=df(c,p,s.dtype,s.shape,a);return e.makeTensorInfo([a],s.dtype,l)}else if(n.shape.length===2){let c=e.bufferSync(n),p=e.bufferSync(s),l=pN(c,p,a,i);return e.makeTensorInfo(l.shape,s.dtype,l.values)}throw new Error(`Error in denseBincount: input must be at most rank 2, but got rank${n.shape.length}.`)}var Tk={kernelName:Os,backendName:"webgl",kernelFunc:_U};var Jf=class{constructor(t,e,o){this.variableNames=["x"],this.outputShape=[],this.outputShape=t,this.blockSize=e,this.dataFormat=o,this.userCode=`
    void main() {
      ivec4 coords = getOutputCoords();
      int b = coords[0];
      int h = ${this.getHeightCoordString()};
      int w = ${this.getWidthCoordString()};
      int d = ${this.getDepthCoordString()};

      int in_h = h / ${e};
      int offset_h = imod(h, ${e});
      int in_w = w / ${e};
      int offset_w = imod(w, ${e});
      int offset_d = (offset_h * ${e} + offset_w) *
        ${this.getOutputDepthSize()};
      int in_d = d + offset_d;

      float result = ${this.getInputSamplingString()};
      setOutput(result);
    }
  `}getHeightCoordString(){return this.dataFormat==="NHWC"?"coords[1]":"coords[2]"}getWidthCoordString(){return this.dataFormat==="NHWC"?"coords[2]":"coords[3]"}getDepthCoordString(){return this.dataFormat==="NHWC"?"coords[3]":"coords[1]"}getOutputDepthSize(){return this.dataFormat==="NHWC"?this.outputShape[3]:this.outputShape[1]}getInputSamplingString(){return this.dataFormat==="NHWC"?"getX(b, in_h, in_w, in_d)":"getX(b, in_d, in_h, in_w)"}};function OU(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{blockSize:s,dataFormat:a}=o,i=n.shape[0],c=a==="NHWC"?n.shape[1]:n.shape[2],p=a==="NHWC"?n.shape[2]:n.shape[3],l=a==="NHWC"?n.shape[3]:n.shape[1],u=c*s,m=p*s,f=l/(s*s),d=a==="NHWC"?[i,u,m,f]:[i,f,u,m],h=new Jf(d,s,a);return e.runWebGLProgram(h,[n],n.dtype)}var wk={kernelName:Ps,backendName:"webgl",kernelFunc:OU};var rp=class{constructor(t,e=!1,o=null,n=!1,s=!1){this.variableNames=["x","W"],this.customUniforms=[{name:"pads",type:"ivec2"},{name:"strides",type:"ivec2"},{name:"dilations",type:"ivec2"},{name:"inDims",type:"ivec2"}],this.outputShape=t.outShape,this.enableShapeUniforms=_t(this.outputShape.length);let a=t.filterHeight,i=t.filterWidth,c=t.outChannels/t.inChannels,p="",l="";o&&(n?p=`float activation(float a) {
          float b = getPreluActivationWeightsAtOutCoords();
          ${o}
        }`:s?p=`float activation(float a) {
          float b = getLeakyreluAlphaAtOutCoords();
          ${o}
        }`:p=`
          float activation(float x) {
            ${o}
          }
        `,l="result = activation(result);");let u=e?"result += getBiasAtOutCoords();":"";e&&this.variableNames.push("bias"),n&&this.variableNames.push("preluActivationWeights"),s&&this.variableNames.push("leakyreluAlpha"),this.userCode=`
      ${p}

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords.x;
        ivec2 xRCCorner = coords.yz * strides - pads;
        int d2 = coords.w;
        int d1 = d2 / ${c};
        int q = d2 - d1 * ${c};

        int xRCorner = xRCCorner.x;
        int xCCorner = xRCCorner.y;

        // Convolve x(?, ?, d1) with w(:, :, d1, q) to get y(yR, yC, d2).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;
        // TO DO(dsmilkov): Flatten the two for loops and vec4 the operations.
        for (int wR = 0; wR < ${a}; wR++) {
          int xR = xRCorner + wR * dilations[0];

          if (xR < 0 || xR >= inDims[0]) {
            continue;
          }

          for (int wC = 0; wC < ${i}; wC++) {
            int xC = xCCorner + wC * dilations[1];

            if (xC < 0 || xC >= inDims[1]) {
              continue;
            }

            float xVal = getX(batch, xR, xC, d1);
            float wVal = getW(wR, wC, d1, q);
            dotProd += xVal * wVal;
          }
        }

        float result = dotProd;
        ${u}
        ${l}
        setOutput(result);
      }
    `}};var op=class{constructor(t,e=!1,o=null,n=!1,s=!1){this.variableNames=["x","W"],this.packedInputs=!0,this.packedOutput=!0,this.customUniforms=[{name:"pads",type:"ivec2"},{name:"strides",type:"ivec2"},{name:"dilations",type:"ivec2"},{name:"inDims",type:"ivec2"}],this.outputShape=t.outShape,this.enableShapeUniforms=_t(this.outputShape.length);let a=t.outChannels/t.inChannels,i=t.padInfo.left,c=t.strideWidth,p=t.dilationWidth,l=t.filterHeight,u=t.filterWidth,m=u,f=`
      int xR; int xC; int xCOffset;
      vec4 wTexel; vec4 previous; vec4 final;`;for(let x=0;x<u;x++)f+=`
          vec4 xTexelC${x*2};
          int xTexelC${x*2}Ready;
          vec4 xTexelC${x*2+1};
          int xTexelC${x*2+1}Ready;
          vec4 xC${x};`;f+=`
    for (int r = 0; r < ${l}; r++) {
      `;for(let x=0;x<u;x++)f+=`
          xTexelC${x*2} = vec4(0.0);
          xTexelC${x*2}Ready = 0;
          xTexelC${x*2+1} = vec4(0.0);
          xTexelC${x*2+1}Ready = 0;
          xC${x} = vec4(0.0);`;f+=`
        xR = xRCorner + r * dilations[0];
        if (xR >=0 && xR < inDims[0]) {
      `;for(let x=0;x<(m+1)/2;x++){let b=x*2;if(f+=`
          xC = xCCorner + ${b*p};
          `,c===1){if(b<u&&(i%2===1?(f+=`
                xCOffset = xC + 1;
                if (xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${b}Ready == 0) {
                  xTexelC${b} = getX(batch, xR, xCOffset, d1);

                  // Need to manually clear unused channels in case
                  // we're reading from recycled texture.
                  if (xCOffset + 1 >= inDims[1]) {
                    xTexelC${b}.zw = vec2(0.0);
                  }
                  xTexelC${b}Ready = 1;
                }
              `,p===1&&b>0?f+=`
                xC${b} = vec4(xTexelC${b-2}.zw, xTexelC${b}.xy);
                `:f+=`
                  xCOffset = xC + 1 - 2;

                  if (xCOffset >= 0 && xCOffset < inDims[1]) {
                    previous = getX(batch, xR, xCOffset, d1);

                    // Need to manually clear unused channels in case
                    // we're reading from recycled texture.
                    if (xCOffset + 1 >= inDims[1]) {
                      previous.zw = vec2(0.0);
                    }

                    xC${b} = vec4(previous.zw, xTexelC${b}.xy);
                  } else {
                    xC${b} = vec4(0.0, 0.0, xTexelC${b}.xy);
                  }
                  `):f+=`
                if (xC >= 0 && xC < inDims[1] && xTexelC${b}Ready == 0) {
                  xTexelC${b} = getX(batch, xR, xC, d1);
                  if (xC + 1 >= inDims[1]) {
                    xTexelC${b}.zw = vec2(0.0);
                  }
                  xTexelC${b}Ready = 1;
                }

                xC${b} = xTexelC${b};
                `,b+1<u)){let w=i%2===0?y.nearestLargerEven(p):p;p%2===0&&i%2===1||p%2!==0&&i%2!==1?(f+=`
                  xCOffset = xC + imod(pads[1], 2) + ${w};

                  if (xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${b+1}Ready == 0) {
                    xTexelC${b+1} = getX(batch, xR, xCOffset, d1);

                    // Need to manually clear unused channels in case
                    // we're reading from recycled texture.
                    if (xCOffset + 1 >= inDims[1]) {
                      xTexelC${b+1}.zw = vec2(0.0);
                    }
                    xTexelC${b+1}Ready = 1;
                  }
                  `,p>1?f+=`
                    xCOffset -= 2;
                    if (xCOffset >= 0 && xCOffset < inDims[1]) {
                     previous = getX(batch, xR, xCOffset, d1);
                     xC${b+1} = vec4(previous.zw, xTexelC${b+1}.xy);
                    } else {
                     xC${b+1} = vec4(0.0, 0.0, xTexelC${b+1}.xy);
                    }
                    `:f+=`
                    xC${b+1} = vec4(xTexelC${b}.zw, xTexelC${b+1}.xy);
                    `):w===1?f+=`
                    xC${b+1} = xTexelC${b};
                    `:f+=`
                    xCOffset = xC + ${w};

                    if (xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${b+1}Ready == 0) {
                      xTexelC${b+1} = getX(batch, xR, xCOffset, d1);
                      if (xCOffset + 1 >= inDims[1]) {
                        xTexelC${b+1}.zw = vec2(0.0);
                      }
                      xTexelC${b+1}Ready = 1;
                    }

                    xC${b+1} = xTexelC${b+1};
                    `}}else b<u&&(i%2===1?(f+=`
                xCOffset = xC + 1 - strides[1];
                if(xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${b}Ready == 0) {
                  xTexelC${b} = getX(batch, xR, xCOffset, d1);
                  // Need to manually clear unused channels in case
                  // we're reading from recycled texture.
                  if (xCOffset + 1 >= inDims[1]) {
                    xTexelC${b}.zw = vec2(0.0);
                  }
                  xTexelC${b}Ready = 1;
                }

                if(xC + 1 >= 0 && xC + 1 < inDims[1] && xTexelC${b+1}Ready == 0) {
                  xTexelC${b+1} = getX(batch, xR, xC + 1, d1);
                  // Need to manually clear unused channels in case
                  // we're reading from recycled texture.
                  if (xC + 2 >= inDims[1]) {
                    xTexelC${b+1}.zw = vec2(0.0);
                  }
                  xTexelC${b+1}Ready = 1;
                }

                xC${b} = vec4(xTexelC${b}.zw, xTexelC${b+1}.zw);
              `,b+1<u&&(f+=`
                  final = vec4(0.0);
                  xCOffset = xC + 1 + strides[1];
                  if(xCOffset >= 0 && xCOffset < inDims[1]) {
                    final = getX(batch, xR, xCOffset, d1);
                  }
                  xC${b+1} = vec4(xTexelC${b+1}.xy, final.xy);
                `)):(f+=`
                if(xC >= 0 && xC < inDims[1] && xTexelC${b}Ready == 0) {
                  xTexelC${b} = getX(batch, xR, xC, d1);
                  if (xC + 1 >= inDims[1]) {
                    xTexelC${b}.zw = vec2(0.0);
                  }
                  xTexelC${b}Ready = 1;
                }

                xCOffset = xC + strides[1];
                if(xCOffset >= 0 && xCOffset < inDims[1] && xTexelC${b+1}Ready == 0) {
                  xTexelC${b+1} = getX(batch, xR, xCOffset, d1);
                  if (xCOffset + 1 >= inDims[1]) {
                    xTexelC${b+1}.zw = vec2(0.);
                  }
                  xTexelC${b+1}Ready = 1;
                }

                xC${b} = vec4(
                  xTexelC${b}.xy, xTexelC${b+1}.xy);
              `,b+1<u&&(f+=`
                  xC${b+1} = vec4(xTexelC${b}.zw, xTexelC${b+1}.zw);
                `)));b<u&&(f+=`
            wTexel = getW(r, ${b}, d1, q);
            dotProd += xC${b} * vec4(wTexel.xz, wTexel.xz);
          `,b+1<u&&(f+=`
              wTexel = getW(r, ${b+1}, d1, q);
              dotProd += xC${b+1} * vec4(wTexel.xz, wTexel.xz);
            `))}f+=`
    }
  `,f+=`
      }
    `;let d="",h="";o&&(n?d=`vec4 activation(vec4 a) {
          vec4 b = getPreluActivationWeightsAtOutCoords();
          ${o}
        }`:s?d=`vec4 activation(vec4 a) {
          vec4 b = getLeakyreluAlphaAtOutCoords();
          ${o}
        }`:d=`vec4 activation(vec4 x) {
          ${o}
        }`,h="result = activation(result);");let g=e?"result += getBiasAtOutCoords();":"";e&&this.variableNames.push("bias"),n&&this.variableNames.push("preluActivationWeights"),s&&this.variableNames.push("leakyreluAlpha"),this.userCode=`
      ${d}

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords.x;
        ivec2 xRCCorner = coords.yz * strides - pads;
        int d2 = coords.w;
        int d1 = d2 / ${a};
        int q = d2 - d1 * ${a};
        int xRCorner = xRCCorner.x;
        int xCCorner = xRCCorner.y;

        //intialize dotProd with a small epsilon seems to reduce GPU accuracy loss.
        vec4 dotProd = vec4(0.000000000000001);

        ${f}

        vec4 result = dotProd - vec4(0.000000000000001);
        ${g}
        ${h}
        setOutput(result);
      }
    `}};function PU(r){let{inputs:t,backend:e,attrs:o}=r,{x:n,filter:s}=t,{strides:a,pad:i,dilations:c,dimRoundingMode:p}=o,l=c;l==null&&(l=[1,1]),y.assert(v.eitherStridesOrDilationsAreOne(a,l),()=>`Error in depthwiseConv2d: Either strides or dilations must be 1. Got strides ${a} and dilations '${l}'`);let u=v.computeConv2DInfo(n.shape,s.shape,a,l,i,p,!0),m;F().getBool("WEBGL_PACK_DEPTHWISECONV")&&u.strideWidth<=2&&u.outChannels/u.inChannels===1?m=new op(u):m=new rp(u);let f=[[u.padInfo.top,u.padInfo.left],[u.strideHeight,u.strideWidth],[u.dilationHeight,u.dilationWidth],[u.inHeight,u.inWidth]];return e.runWebGLProgram(m,[n,s],"float32",f)}var Ik={kernelName:Ls,backendName:"webgl",kernelFunc:PU};var td=class{constructor(t){this.variableNames=["x","dy"],this.outputShape=t.filterShape;let e=t.strideHeight,o=t.strideWidth,n=t.padInfo.top,s=t.padInfo.left,a=t.outChannels/t.inChannels;this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int wR = coords.x;
        int wC = coords.y;
        int d1 = coords.z;
        int dm = coords.w;
        int d2 = d1 * ${a} + dm;

        float dotProd = 0.0;

        // TO DO: Vec4 over the batch size
        for (int b = 0; b < ${t.batchSize}; b++) {
          for (int yR = 0; yR < ${t.outHeight}; yR++) {
            int xR = wR + yR * ${e} - ${n};

            if (xR < 0 || xR >= ${t.inHeight}) {
              continue;
            }

            for (int yC = 0; yC < ${t.outWidth}; yC++) {
              int xC = wC + yC * ${o} - ${s};

              if (xC < 0 || xC >= ${t.inWidth}) {
                continue;
              }

              float dyValue = getDy(b, yR, yC, d2);
              float xValue = getX(b, xR, xC, d1);
              dotProd += (xValue * dyValue);
            }
          }
        }
        setOutput(dotProd);
      }
    `}},ed=class{constructor(t){this.variableNames=["dy","W"],this.outputShape=t.inShape;let e=t.filterHeight,o=t.filterWidth,n=t.strideHeight,s=t.strideWidth,a=e-1-t.padInfo.top,i=o-1-t.padInfo.left,c=t.outChannels/t.inChannels;this.userCode=`
      const ivec2 pads = ivec2(${a}, ${i});

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords[0];
        int d1 = coords[3];
        ivec2 dyCorner = coords.yz - pads;
        int dyRCorner = dyCorner.x;
        int dyCCorner = dyCorner.y;

        float dotProd = 0.0;

        for (int wR = 0; wR < ${e}; wR++) {
          float dyR = float(dyRCorner + wR) / ${n}.0;

          if (dyR < 0.0 || dyR >= ${t.outHeight}.0 || fract(dyR) > 0.0) {
            continue;
          }
          int idyR = int(dyR);

          int wRPerm = ${e} - 1 - wR;

          for (int wC = 0; wC < ${o}; wC++) {
            float dyC = float(dyCCorner + wC) / ${s}.0;

            if (dyC < 0.0 || dyC >= ${t.outWidth}.0 ||
                fract(dyC) > 0.0) {
              continue;
            }
            int idyC = int(dyC);

            int wCPerm = ${o} - 1 - wC;

            // TO DO: Vec4 over the channelMul
            for (int dm = 0; dm < ${c}; dm++) {
              int d2 = d1 * ${c} + dm;
              float xValue = getDy(batch, idyR, idyC, d2);
              float wValue = getW(wRPerm, wCPerm, d1, dm);
              dotProd += xValue * wValue;
            }
          }
        }
        setOutput(dotProd);
      }
    `}};function LU(r){let{inputs:t,backend:e,attrs:o}=r,{x:n,dy:s}=t,{strides:a,dilations:i,pad:c,dimRoundingMode:p,filterShape:l}=o,u=v.computeConv2DInfo(n.shape,l,a,i,c,p,!0),m=new td(u);return e.runWebGLProgram(m,[n,s],"float32")}var Sk={kernelName:Ms,backendName:"webgl",kernelFunc:LU};function MU(r){let{inputs:t,backend:e,attrs:o}=r,{dy:n,filter:s}=t,{strides:a,dilations:i,pad:c,dimRoundingMode:p,inputShape:l}=o,u=v.computeConv2DInfo(l,s.shape,a,i,c,p,!0),m=new ed(u);return e.runWebGLProgram(m,[n,s],"float32")}var vk={kernelName:Bs,backendName:"webgl",kernelFunc:MU};var rd=class{constructor(t){this.variableNames=["X"],this.outputShape=[t,t],this.userCode=`
      void main() {
          ivec2 coords = getOutputCoords();
          float val = coords[0] == coords[1] ? getX(coords[0]) : 0.0;
          setOutput(val);
      }
    `}};function BU(r){let{inputs:t,backend:e}=r,{x:o}=t,n=[...o.shape,...o.shape],s=y.sizeFromShape(o.shape),a=K({inputs:{x:o},backend:e,attrs:{shape:[s]}}),i=new rd(s),c=e.runWebGLProgram(i,[a],a.dtype),p=K({inputs:{x:c},backend:e,attrs:{shape:n}});return e.disposeIntermediateTensorInfo(a),e.disposeIntermediateTensorInfo(c),p}var Nk={kernelName:Vs,backendName:"webgl",kernelFunc:BU};var od=class{constructor(t){this.variableNames=["x","W"],this.outputShape=t.outShape;let{inHeight:e,inWidth:o,padInfo:n,strideHeight:s,strideWidth:a,filterHeight:i,filterWidth:c,dilationHeight:p,dilationWidth:l}=t,{top:u,left:m}=n;this.userCode=`
      const ivec2 strides = ivec2(${s}, ${a});
      const ivec2 pads = ivec2(${u}, ${m});
      const float neg_infinity = -3.4e38;

      void main() {
        ivec4 coords = getOutputCoords();
        int batch = coords.x;
        int d1 = coords.w;
        ivec2 outTopLeftCorner =
            coords.yz * strides - pads;
        int hBeg = outTopLeftCorner.x;
        int wBeg = outTopLeftCorner.y;

        float curVal = neg_infinity;
        for (int h = 0; h < ${i}; h++) {
          int hIn = hBeg + h * ${p};

          if (hIn >= 0 && hIn < ${e}) {
            for (int w = 0; w < ${c}; w++) {
              int wIn = wBeg + w * ${l};

              if (wIn >= 0 && wIn < ${o}) {
                float xVal = getX(batch, hIn, wIn, d1);
                float wVal = getW(h, w, d1);

                float val = xVal + wVal;
                if (val > curVal) {
                  curVal = val;
                }
              }
            }
          }
        }

        float result = curVal;
        setOutput(result);
      }
    `}};function VU(r){let{inputs:t,backend:e,attrs:o}=r,{x:n,filter:s}=t,{strides:a,pad:i,dilations:c}=o,p=v.computeDilation2DInfo(n.shape,s.shape,a,i,"NHWC",c),l,u=new od(p);l=e.runWebGLProgram(u,[n,s],"float32");let m=K({inputs:{x:l},backend:e,attrs:{shape:p.outShape}});return e.disposeIntermediateTensorInfo(l),m}var kk={kernelName:Gs,backendName:"webgl",kernelFunc:VU};function GU(r){let{inputs:t,backend:e,attrs:o}=r,{equation:n}=o,s=t,{allDims:a,summedDims:i,idDims:c}=v.decodeEinsumEquation(n,s.length);v.checkEinsumDimSizes(a.length,c,s);let{path:p,steps:l}=v.getEinsumComputePath(i,c),u=l.length,m=null,f=a.length,d=[];for(let h=0;h<u;++h){for(let g of l[h]){let{permutationIndices:x,expandDims:b}=v.getEinsumPermutation(f,c[g]),w;v.isIdentityPermutation(x)?w=s[g]:(w=Bt({inputs:{x:s[g]},backend:e,attrs:{perm:x}}),d.push(w));let I=w.shape.slice();for(let k=0;k<b.length;++k)I.splice(b[k],0,1);y.arraysEqual(w.shape,I)||(w=K({inputs:{x:w},backend:e,attrs:{shape:I}}),d.push(w)),m===null?m=w:(m=pu({inputs:{a:w,b:m},backend:e}),d.push(m))}h<u-1&&(p[h]>=0&&(m=Yi({inputs:{x:m},backend:e,attrs:{axis:p[h]-(a.length-f),keepDims:!1}}),d.push(m)),f--)}for(let h of d)h!==m&&e.disposeIntermediateTensorInfo(h);return m}var Ek={kernelName:Us,backendName:"webgl",kernelFunc:GU};var UU="return (x >= 0.0) ? x : (exp(x) - 1.0);",zU=`
  vec4 result;

  result.r = (x.r >= 0.0) ? x.r : (exp(x.r) - 1.0);
  result.g = (x.g >= 0.0) ? x.g : (exp(x.g) - 1.0);
  result.b = (x.b >= 0.0) ? x.b : (exp(x.b) - 1.0);
  result.a = (x.a >= 0.0) ? x.a : (exp(x.a) - 1.0);

  return result;
`,WU=st({opSnippet:UU,packedOpSnippet:zU}),$k={kernelName:"Elu",backendName:"webgl",kernelFunc:WU};var HU="return (b >= 1.0) ? a : a * (b + 1.0);",qU=`
  vec4 bGTEZero = vec4(greaterThanEqual(b, vec4(0.)));
  return (bGTEZero * a) + ((vec4(1.0) - bGTEZero) * (a * (b + vec4(1.0))));
`,KU=r=>{let{inputs:t,backend:e}=r,{dy:o,y:n}=t,s=F().getBool("WEBGL_PACK_BINARY_OPERATIONS")?new Ir(qU,o.shape,n.shape):new cr(HU,o.shape,n.shape);return e.runWebGLProgram(s,[o,n],o.dtype)},Ak={kernelName:xp,backendName:"webgl",kernelFunc:KU};var jU=`
  return vec4(equal(a, b));
`,XU="return float(a == b);",YU=Ft({opSnippet:XU,packedOpSnippet:jU,dtype:"bool",cpuKernelImpl:fN}),Rk={kernelName:an,backendName:"webgl",kernelFunc:YU};var ZU=`
  // Error function is calculated approximately with elementary function.
  // See "Handbook of Mathematical Functions with Formulas,
  // Graphs, and Mathematical Tables", Abramowitz and Stegun.
  float p = ${v.ERF_P};
  float a1 = ${v.ERF_A1};
  float a2 = ${v.ERF_A2};
  float a3 = ${v.ERF_A3};
  float a4 = ${v.ERF_A4};
  float a5 = ${v.ERF_A5};

  float sign = sign(x);
  x = abs(x);
  float t = 1.0 / (1.0 + p * x);
  return sign * (1.0 - (((((a5*t + a4)*t) + a3)*t + a2)*t + a1)*t*exp(-x*x));
`,QU=st({opSnippet:ZU}),Dk={kernelName:"Erf",backendName:"webgl",kernelFunc:QU};var JU=Sr+`
  return exp(x);
`,tz=`
  vec4 result = exp(x);
  bvec4 isNaN = isnan(x);
  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`,Hy=st({opSnippet:JU,packedOpSnippet:tz,cpuKernelImpl:dN,dtype:"float32"}),Fk={kernelName:"Exp",backendName:"webgl",kernelFunc:Hy};function nd(r){let{inputs:t,attrs:e,backend:o}=r,{dim:n}=e,{input:s}=t,a=s.shape.length,i=s.shape.slice(),c=n;return n<0&&(y.assert(-(a+1)<=n,()=>`Axis must be in the interval [${-(a+1)}, ${a}]`),c=a+n+1),i.splice(c,0,1),K({inputs:{x:s},backend:o,attrs:{shape:i}})}var _k={kernelName:qs,backendName:"webgl",kernelFunc:nd};var Ok="return exp(x) - 1.0;",ez=st({opSnippet:Ok,packedOpSnippet:Ok,cpuKernelImpl:hN}),Pk={kernelName:cn,backendName:"webgl",kernelFunc:ez};var mu=class{constructor(t,e,o){this.variableNames=["real","imag"];let n=e[1];this.outputShape=e;let s=o?`2.0 * ${Math.PI}`:`-2.0 * ${Math.PI}`,a=o?`${n}.0`:"1.0",i;if(t==="real")i="return real * expR - imag * expI;";else if(t==="imag")i="return real * expI + imag * expR;";else throw new Error(`FFT component must be either "real" or "imag", got ${t}.`);this.userCode=`
      const float exponentMultiplier = ${s};

      float unaryOpComplex(float real, float expR, float imag, float expI) {
        ${i}
      }

      float mulMatDFT(int batch, int index) {
        float indexRatio = float(index) / float(${n});
        float exponentMultiplierTimesIndexRatio =
            exponentMultiplier * indexRatio;

        float result = 0.0;

        for (int i = 0; i < ${n}; i++) {
          // x = (-2|2 * PI / N) * index * i;
          float x = exponentMultiplierTimesIndexRatio * float(i);
          float expR = cos(x);
          float expI = sin(x);
          float real = getReal(batch, i);
          float imag = getImag(batch, i);

          result +=
              unaryOpComplex(real, expR, imag, expI) / ${a};
        }

        return result;
      }

      void main() {
        ivec2 coords = getOutputCoords();
        setOutput(mulMatDFT(coords[0], coords[1]));
      }
    `}};function sd(r,t,e){let o=e.texData.get(r.dataId),n=y.sizeFromShape(r.shape),s=r.shape[r.shape.length-1],a=n/s,i=K({inputs:{x:r},backend:e,attrs:{shape:[a,s]}}),c=i.shape,p=new mu("real",c,t),l=new mu("imag",c,t),u=[{dataId:o.complexTensorInfos.real.dataId,dtype:o.complexTensorInfos.real.dtype,shape:c},{dataId:o.complexTensorInfos.imag.dataId,dtype:o.complexTensorInfos.imag.dtype,shape:c}],m=e.runWebGLProgram(p,u,"float32"),f=e.runWebGLProgram(l,u,"float32"),d=Ge({inputs:{real:m,imag:f},backend:e});e.disposeIntermediateTensorInfo(m),e.disposeIntermediateTensorInfo(f);let h=K({inputs:{x:d},backend:e,attrs:{shape:r.shape}});return e.disposeIntermediateTensorInfo(i),e.disposeIntermediateTensorInfo(d),h}function rz(r){let{inputs:t,backend:e}=r,{input:o}=t;return sd(o,!1,e)}var Lk={kernelName:"FFT",backendName:"webgl",kernelFunc:rz};var ad=class{constructor(t,e){this.outputShape=[],this.customUniforms=[{name:"value",type:"float"}],this.variableNames=["x"],this.outputShape=t,this.userCode=`
      void main() {
        // Input can be obtained from uniform value.
        setOutput(value);
      }
    `}};function Uo(r){let{backend:t,attrs:e}=r,{shape:o,value:n}=e,{dtype:s}=e;if(s=s||y.inferDtype(n),s==="string"){let a=y.getArrayFromDType(s,y.sizeFromShape(o));return a.fill(n),t.makeTensorInfo(o,s,a)}else{let a=new ad(o,n),i=[[n]];return t.runWebGLProgram(a,[],s,i)}}var Mk={kernelName:Ks,backendName:"webgl",kernelFunc:Uo};var id=class{constructor(t){this.variableNames=["Image"],this.outputShape=[];let e=t[2];this.outputShape=t,this.userCode=`
        void main() {
          ivec4 coords = getOutputCoords();
          int x = coords[2];

          int coordX = ${e} - x - 1;
          float outputValue;
          if(coordX >= 0 && coordX < ${e}) {
            outputValue = getImage(coords[0], coords[1], coordX, coords[3]);
          } else {
            outputValue = getImage(coords[0], coords[1], coords[2], coords[3]);
          }
          setOutput(outputValue);
        }
    `}};var Bk={kernelName:js,backendName:"webgl",kernelFunc:({inputs:r,backend:t})=>{let{image:e}=r,o=t,n=new id(e.shape);return o.runWebGLProgram(n,[e],e.dtype)}};var Vk="return floor(x);",oz=st({opSnippet:Vk,packedOpSnippet:Vk,cpuKernelImpl:gN}),Gk={kernelName:pn,backendName:"webgl",kernelFunc:oz};var nz=`
  float s = sign(a) * sign(b);
  int ia = round(a);
  int ib = round(b);
  if (ib != 0) {
    // Windows (D3D) wants guaranteed non-zero int division at compile-time.
    return float(idiv(ia, ib, s));
  } else {
    return NAN;
  }
`,sz=`
  ivec4 ia = round(a);
  ivec4 ib = round(b);
  bvec4 cond = notEqual(ib, ivec4(0));
  ivec4 result = ivec4(0);
  vec4 s = sign(a) * sign(b);

  // Windows (D3D) wants guaranteed non-zero int division at compile-time.
  if (cond[0]) {
    result[0] = idiv(ia[0], ib[0], s[0]);
  }
  if (cond[1]) {
    result[1] = idiv(ia[1], ib[1], s[1]);
  }
  if (cond[2]) {
    result[2] = idiv(ia[2], ib[2], s[2]);
  }
  if (cond[3]) {
    result[3] = idiv(ia[3], ib[3], s[3]);
  }
  return vec4(result);
`,az=Ft({opSnippet:nz,packedOpSnippet:sz,dtype:"int32"}),Uk={kernelName:ln,backendName:"webgl",kernelFunc:az};var cd=class{constructor(t){this.variableNames=["A"];let e=zt(),[o,n]=t;this.outputShape=t,this.userCode=`
      void main() {
        ivec3 coords = getOutputCoords();
        int texR = coords[0];
        int texC = coords[1];
        int depth = coords[2];
        vec2 uv = (vec2(texC, texR) + halfCR) / vec2(${n}.0, ${o}.0);

        vec4 values = ${e.texture2D}(A, uv);
        float value;
        if (depth == 0) {
          value = values.r;
        } else if (depth == 1) {
          value = values.g;
        } else if (depth == 2) {
          value = values.b;
        } else if (depth == 3) {
          value = values.a;
        }

        setOutput(floor(value * 255.0 + 0.5));
      }
    `}};var pd=class{constructor(t){this.variableNames=["A"],this.packedInputs=!1,this.packedOutput=!0;let e=zt(),[o,n]=t;this.outputShape=t,this.userCode=`
      void main() {
        ivec3 coords = getOutputCoords();
        int texR = coords[0];
        int texC = coords[1];
        int depth = coords[2];

        vec4 result = vec4(0.);

        for(int row=0; row<=1; row++) {
          for(int col=0; col<=1; col++) {
            texC = coords[1] + row;
            depth = coords[2] + col;

            vec2 uv = (vec2(texC, texR) + halfCR) /
                       vec2(${n}.0, ${o}.0);
            vec4 values = ${e.texture2D}(A, uv);
            float value;
            if (depth == 0) {
              value = values.r;
            } else if (depth == 1) {
              value = values.g;
            } else if (depth == 2) {
              value = values.b;
            } else if (depth == 3) {
              value = values.a;
            }

            result[row * 2 + col] = floor(value * 255.0 + 0.5);
          }
        }

        ${e.output} = result;
      }
    `}};var zk={kernelName:hc,backendName:"webgl",kernelFunc:iz},np,qy=F().getBool("CANVAS2D_WILL_READ_FREQUENTLY_FOR_GPU");function iz(r){let{inputs:t,backend:e,attrs:o}=r,{pixels:n}=t,{numChannels:s}=o,a=typeof HTMLVideoElement<"u"&&n instanceof HTMLVideoElement,i=typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement,[c,p]=a?[n.videoWidth,n.videoHeight]:[n.width,n.height],l=[p,c],u=[p,c,s];if(i||a){let h=F().getBool("CANVAS2D_WILL_READ_FREQUENTLY_FOR_GPU");(np==null||h!==qy)&&(qy=h,np=document.createElement("canvas").getContext("2d",{willReadFrequently:qy})),np.canvas.width=c,np.canvas.height=p,np.drawImage(n,0,0,c,p),n=np.canvas}let m=e.makeTensorInfo(l,"int32");e.texData.get(m.dataId).usage=ve.PIXELS,e.gpgpu.uploadPixelDataToTexture(e.getTexture(m.dataId),n);let f=F().getBool("WEBGL_PACK")?new pd(u):new cd(u),d=e.runWebGLProgram(f,[m],"int32");return e.disposeData(m.dataId),d}function cz(r){let{inputs:t,backend:e,attrs:o}=r,{x:n,filter:s,bias:a,preluActivationWeights:i}=t,{strides:c,pad:p,dataFormat:l,dilations:u,dimRoundingMode:m,activation:f,leakyreluAlpha:d}=o,h=v.convertConv2DDataFormat(l),g=v.computeConv2DInfo(n.shape,s.shape,c,u,p,m,!1,h),x,b=[],w=a!=null,I=i!=null,k=f==="leakyrelu",$=()=>{let D=[n,s],_=(O,L)=>{if(L==="NCHW"&&O.shape.length===1&&O.shape[0]!==1){let M=K({inputs:{x:O},backend:e,attrs:{shape:[O.shape[0],1,1]}});return b.push(M),M}return O};if(w&&D.push(_(a,l)),I&&D.push(_(i,l)),k){let O=e.makeTensorInfo([],"float32",y.createScalarValue(d,"float32"));D.push(O),b.push(O)}return D};if(g.filterHeight===1&&g.filterWidth===1&&g.dilationHeight===1&&g.dilationWidth===1&&g.strideHeight===1&&g.strideWidth===1&&(g.padInfo.type==="SAME"||g.padInfo.type==="VALID"))x=Hf({x:n,filter:s,convInfo:g,backend:e,bias:a,activation:f,preluActivationWeights:i,leakyreluAlpha:d});else if(g.strideWidth<=2&&h==="channelsLast"&&F().getBool("WEBGL_EXP_CONV")){let D=f?Vo(f,!0):null,_=new ep(g,w,D,I,k),O=[[g.padInfo.top,g.padInfo.left],[g.strideHeight,g.strideWidth],[g.dilationHeight,g.dilationWidth],[g.inHeight,g.inWidth]],L=$();x=e.runWebGLProgram(_,L,"float32",O)}else if(F().getBool("WEBGL_CONV_IM2COL"))x=qf({x:n,filter:s,convInfo:g,backend:e,bias:a,activation:f,preluActivationWeights:i,leakyreluAlpha:d});else{let D=f?Vo(f,!1):null,_=new tp(g,w,D,I,k),O=$();x=e.runWebGLProgram(_,O,"float32")}let R=K({inputs:{x},backend:e,attrs:{shape:g.outShape}});return b.push(x),b.forEach(D=>e.disposeIntermediateTensorInfo(D)),R}var Wk={kernelName:Gn,backendName:"webgl",kernelFunc:cz};function pz(r){let{inputs:t,backend:e,attrs:o}=r,{x:n,filter:s,bias:a,preluActivationWeights:i}=t,{strides:c,pad:p,dilations:l,dimRoundingMode:u,activation:m,leakyreluAlpha:f}=o,d=[],h=l;h==null&&(h=[1,1]),y.assert(v.eitherStridesOrDilationsAreOne(c,h),()=>`Error in depthwiseConv2d: Either strides or dilations must be 1. Got strides ${c} and dilations '${h}'`);let g=v.computeConv2DInfo(n.shape,s.shape,c,h,p,u,!0),x=F().getBool("WEBGL_PACK_DEPTHWISECONV")&&g.strideWidth<=2&&g.outChannels/g.inChannels===1,b=m?Vo(m,x):null,w=[n,s],I=a!=null,k=i!=null,$=m==="leakyrelu";if(I&&w.push(a),k&&w.push(i),$){let O=e.makeTensorInfo([],"float32",y.createScalarValue(f,"float32"));w.push(O),d.push(O)}let R;x?R=new op(g,I,b,k,$):R=new rp(g,I,b,k,$);let D=[[g.padInfo.top,g.padInfo.left],[g.strideHeight,g.strideWidth],[g.dilationHeight,g.dilationWidth],[g.inHeight,g.inWidth]],_=e.runWebGLProgram(R,w,"float32",D);return d.forEach(O=>e.disposeIntermediateTensorInfo(O)),_}var Hk={kernelName:Un,backendName:"webgl",kernelFunc:pz};var ld=class{constructor(t,e,o,n){this.sliceDim=t,this.strides=e,this.paramsShape=n,this.variableNames=["x","indices"],this.outputShape=o;let s=gt(o.length),a=`
    int index;`;for(let i=0;i<this.sliceDim;i++)a+=`
          index = round(getIndices(coords[0], ${i}));
          out_of_bounds = out_of_bounds || index < 0;
          out_of_bounds = out_of_bounds || index >= ${this.paramsShape[i]};
          flattenIndex += index * ${this.strides[i]};`;this.userCode=`
         void main() {
          ${s} coords = getOutputCoords();
          int flattenIndex = 0;
          bool out_of_bounds = false;

          ${a}

          setOutput(out_of_bounds ? 0.0 : getX(flattenIndex, coords[1]));
        }
      `}};function lz(r){let{inputs:t,backend:e}=r,{params:o,indices:n}=t,s=n.shape,a=s[s.length-1],i=y.sizeFromShape(o.shape),[c,p,l,u]=v.prepareAndValidate(o,n),m=K({inputs:{x:n},backend:e,attrs:{shape:[p,a]}}),f=K({inputs:{x:o},backend:e,attrs:{shape:[y.sizeFromShape(o.shape)/l,l]}});if(e.shouldExecuteOnCPU([o,n])||o.dtype==="string"){let x=e.readSync(n.dataId),b=e.bufferSync(o),w=xN(x,b,o.dtype,p,a,l,u,o.shape,i);return e.makeTensorInfo(c,o.dtype,w.values)}let d=new ld(a,u,[p,l],o.shape),h=e.runWebGLProgram(d,[f,m],f.dtype),g=K({inputs:{x:h},backend:e,attrs:{shape:c}});return e.disposeIntermediateTensorInfo(m),e.disposeIntermediateTensorInfo(f),e.disposeIntermediateTensorInfo(h),g}var qk={kernelName:Zs,backendName:"webgl",kernelFunc:lz};var ud=class{constructor(t,e){this.variableNames=["A","indices"],this.outputShape=e,this.rank=e.length;let o=gt(this.rank),n=uz(t,2);this.userCode=`
      void main() {
        ${o} resRC = getOutputCoords();
        int index = int(getIndices(resRC.x, resRC.z));
        float inBounds = (index >= 0) && (index < ${t[2]}) ? 1.0 : 0.0;
        setOutput(inBounds * getA(${n}));
      }
    `}};function uz(r,t){let e=["resRC.x","resRC.y","resRC.z","resRC.w"],o=[];for(let n=0;n<r.length;n++)n===2?o.push("index"):o.push(`${e[n]}`);return o.join()}function Ky(r){let{inputs:t,backend:e,attrs:o}=r,{x:n,indices:s}=t,{axis:a,batchDims:i}=o,c=y.parseAxisParam(a,n.shape)[0];if(F().get("DEBUG")){let b=e.readSync(s.dataId),w=n.shape[c];for(let I=0;I<b.length;++I){let k=b[I];y.assert(k<=w-1&&k>=0,()=>`GatherV2: the index value ${k} is not in [0, ${w-1}]`)}}let p=v.segment_util.collectGatherOpShapeInfo(n,s,c,i),l=y.sizeFromShape(s.shape),u=[],m=K({inputs:{x:n},backend:e,attrs:{shape:[p.batchSize,p.outerSize,p.dimSize,p.sliceSize]}}),f=K({inputs:{x:s},backend:e,attrs:{shape:[p.batchSize,l/p.batchSize]}});u.push(m),u.push(f);let d=[p.batchSize,p.outerSize,l/p.batchSize,p.sliceSize];if(e.shouldExecuteOnCPU([n,s])||n.dtype==="string"){let b=e.bufferSync(f),w=e.bufferSync(m),I=yN(w,b,d);return u.forEach(k=>e.disposeIntermediateTensorInfo(k)),e.makeTensorInfo(p.outputShape,I.dtype,I.values)}let h=new ud(m.shape,d),g=e.runWebGLProgram(h,[m,f],m.dtype);u.push(g);let x=K({inputs:{x:g},backend:e,attrs:{shape:p.outputShape}});return u.forEach(b=>e.disposeIntermediateTensorInfo(b)),x}var Kk={kernelName:Ys,backendName:"webgl",kernelFunc:Ky};var mz="return float(a > b);",fz=`
  return vec4(greaterThan(a, b));
`,dz=Ft({opSnippet:mz,packedOpSnippet:fz,cpuKernelImpl:bN,dtype:"bool"}),jk={kernelName:un,backendName:"webgl",kernelFunc:dz};var hz="return float(a >= b);",gz=`
  return vec4(greaterThanEqual(a, b));
`,xz=Ft({opSnippet:hz,packedOpSnippet:gz,dtype:"bool",cpuKernelImpl:CN}),Xk={kernelName:mn,backendName:"webgl",kernelFunc:xz};function yz(r){let{inputs:t,backend:e}=r,{input:o}=t;return sd(o,!0,e)}var Yk={kernelName:Qs,backendName:"webgl",kernelFunc:yz};var bz="return float(!isnan(x) && !isinf(x));",Cz=st({opSnippet:bz,dtype:"bool"}),Zk={kernelName:fn,backendName:"webgl",kernelFunc:Cz};var Tz="return float(isinf(x));",wz=st({opSnippet:Tz,dtype:"bool"}),Qk={kernelName:dn,backendName:"webgl",kernelFunc:wz};var Iz="return float(isnan(x));",Sz=st({opSnippet:Iz,dtype:"bool"}),Jk={kernelName:hn,backendName:"webgl",kernelFunc:Sz};var vz="return float(a < b);",Nz=`
  return vec4(lessThan(a, b));
`,kz=Ft({opSnippet:vz,packedOpSnippet:Nz,cpuKernelImpl:TN,dtype:"bool"}),tE={kernelName:gn,backendName:"webgl",kernelFunc:kz};var Ez="return float(a <= b);",$z=`
  return vec4(lessThanEqual(a, b));
`,Az=Ft({opSnippet:Ez,packedOpSnippet:$z,cpuKernelImpl:wN,dtype:"bool"}),eE={kernelName:xn,backendName:"webgl",kernelFunc:Az};function Rz(r){let{backend:t,attrs:e}=r,{start:o,stop:n,num:s}=e,a=IN(o,n,s);return t.makeTensorInfo([a.length],"float32",a)}var rE={kernelName:ea,backendName:"webgl",kernelFunc:Rz};var Dz=Sr+`
  return x < 0.0 ? 0./0. : log(x);
`,Fz=`
  vec4 result = log(x);
  bvec4 isNaN = isnan(x);
  result.r = isNaN.r ? x.r : (x.r < 0.0 ? 0./0. : result.r);
  result.g = isNaN.g ? x.g : (x.g < 0.0 ? 0./0. : result.g);
  result.b = isNaN.b ? x.b : (x.b < 0.0 ? 0./0. : result.b);
  result.a = isNaN.a ? x.a : (x.a < 0.0 ? 0./0. : result.a);
  return result;
`,_z=st({opSnippet:Dz,packedOpSnippet:Fz,cpuKernelImpl:SN}),oE={kernelName:"Log",backendName:"webgl",kernelFunc:_z};var Oz=Sr+`
  return log(1.0 + x);
`,Pz=st({opSnippet:Oz}),nE={kernelName:yn,backendName:"webgl",kernelFunc:Pz};var Lz="return float(a >= 1.0 && b >= 1.0);",Mz=`
  return vec4(
    vec4(greaterThanEqual(a, vec4(1.0))) *
    vec4(greaterThanEqual(b, vec4(1.0))));
`,Bz=Ft({opSnippet:Lz,packedOpSnippet:Mz,dtype:"bool"}),sE={kernelName:bn,backendName:"webgl",kernelFunc:Bz};var Vz="return float(!(x >= 1.0));",Gz=st({opSnippet:Vz}),aE={kernelName:Cn,backendName:"webgl",kernelFunc:Gz};var Uz="return float(a >= 1.0 || b >= 1.0);",zz=`
  return min(
    vec4(greaterThanEqual(a, vec4(1.0))) +
    vec4(greaterThanEqual(b, vec4(1.0))),
    vec4(1.0));
`,Wz=Ft({opSnippet:Uz,packedOpSnippet:zz,dtype:"bool"}),iE={kernelName:Tn,backendName:"webgl",kernelFunc:Wz};var md=class{constructor(t,e,o,n,s){this.variableNames=["x"],this.outputShape=[];let a=e,i=t[3]-1;this.outputShape=t;let c,p=`float(${o}) + float(${n}) * sum`;s===.5?c=`inversesqrt(${p})`:s===1?c=`1.0/(${p})`:c=`exp(log(${p}) * float(-${s}));`,this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int r = coords[1];
        int c = coords[2];
        int d = coords[3];
        float x = getX(b, r, c, d);
        float sum = 0.0;
        for (int j = -${a}; j <= ${a}; j++) {
          int idx = d + j;
          if (idx >= 0 && idx <=  ${i}) {
            float z = getX(b, r, c, idx);
            sum += z * z;
          }
        }
        float val = x * ${c};
        setOutput(val);
      }
    `}};var fd=class{constructor(t,e,o,n,s){this.variableNames=["x"],this.outputShape=[],this.packedInputs=!0,this.packedOutput=!0;let a=e,i=t[3]-1;this.outputShape=t;let c,p=`float(${o}) + float(${n}) * sum`;s===.5?c=`inversesqrt(${p})`:s===1?c=`1.0/(${p})`:c=`exp(log(${p}) * float(-${s}));`,this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords.x;
        int r = coords.y;
        int c = coords.z;
        int d = coords.w;

        bool hasNextCol = d < ${this.outputShape[3]};
        bool hasNextRow = c < ${this.outputShape[2]};

        vec4 sum = vec4(0.);
        vec4 xFragAtOutputCoords = getX(b, r, c, d);

        vec4 xAtOutputCoords = vec4(
          getChannel(xFragAtOutputCoords, vec2(c, d)),
          hasNextCol ?
            getChannel(xFragAtOutputCoords, vec2(c, d + 1)) : 0.0,
          hasNextRow ?
            getChannel(xFragAtOutputCoords , vec2(c + 1, d)) : 0.0,
          (hasNextRow && hasNextCol) ?
            getChannel(xFragAtOutputCoords, vec2(c + 1, d + 1)) : 0.0
        );

        int firstChannel = d - ${a};
        vec2 cache = vec2(0.);
        if(firstChannel >= 0){
          vec4 firstChannelFrag = getX(b, r, c, firstChannel);
          cache.x = getChannel(firstChannelFrag, vec2(c, firstChannel));
            if(hasNextRow){
              cache.y = getChannel(firstChannelFrag, vec2(c + 1, firstChannel));
            }
        }

        ivec2 depth = ivec2(d, d + 1);
        for (int j = - ${a}; j <= ${a}; j++) {
          ivec2 idx = depth + j;
          bvec2 aboveLowerBound = greaterThanEqual(idx, ivec2(0));
          bvec2 belowUpperBound = lessThanEqual(idx, ivec2(${i}));

          bool depthInRange = aboveLowerBound.x && belowUpperBound.x;
          bool depthPlusOneInRange = aboveLowerBound.y && belowUpperBound.y;

          if(depthInRange || depthPlusOneInRange){
            vec4 z = vec4(0.);
            vec4 xFragAtCurrentDepth;
            z.xz = cache.xy;
            if(depthPlusOneInRange && hasNextCol){
              xFragAtCurrentDepth = idx.y != d ?
                getX(b, r, c, idx.y) : xFragAtOutputCoords;
              z.y = getChannel(xFragAtCurrentDepth, vec2(c, idx.y));
              if(hasNextRow){
                z.w = getChannel(xFragAtCurrentDepth, vec2(c + 1, idx.y));
              }
            }
            cache.xy = z.yw;
            sum += z * z;
          }
        }
        vec4 result = xAtOutputCoords * ${c};
        setOutput(result);
      }
    `}};var Hz=r=>{let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{depthRadius:s,bias:a,alpha:i,beta:c}=o,p=F().getBool("WEBGL_PACK_NORMALIZATION")?new fd(n.shape,s,a,i,c):new md(n.shape,s,a,i,c);return e.runWebGLProgram(p,[n],n.dtype)},cE={kernelName:"LRN",backendName:"webgl",kernelFunc:Hz};var dd=class{constructor(t,e,o,n,s){this.variableNames=["inputImage","outputImage","dy"],this.outputShape=[],this.outputShape=t,this.depth=t[3],this.depthRadius=e,this.bias=o,this.alpha=n,this.beta=s,this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int r = coords[1];
        int c = coords[2];

        float result = 0.0;
        for (int d = 0; d < ${this.depth}; ++d) {
          int depthBegin = int(max(0.0, float(d - ${e})));
          int depthEnd = int(min(float(${this.depth}),
              float(d + ${e} + 1)));

          const int MIN_DEPTH_BEGIN = 0;
          const int MAX_DEPTH_END = ${this.depth};

          float norm = 0.0;
          for (int k = MIN_DEPTH_BEGIN; k < MAX_DEPTH_END; ++k) {
            if (k < depthBegin){
              continue;
            }
            else if (k >= depthBegin && k < depthEnd) {
              norm += getInputImage(b, r, c, k) * getInputImage(b, r, c, k);
            }
            else {
              break;
            }
          }

          norm = float(${n}) * norm + float(${o});

          for(int k = MIN_DEPTH_BEGIN; k < MAX_DEPTH_END; ++k){
            if (k < depthBegin){
              continue;
            }
            else if (k >= depthBegin && k < depthEnd){
              float dyi = -2.0 * float(${n})
                * float(${s})
                * getInputImage(b ,r ,c, k) * getOutputImage(b, r, c, d)
                / norm;
              if (k == d) {
                dyi += pow(norm, -1.0 * ${s});
              }
              if (k == coords[3]) {
                dyi *= getDy(b, r, c, d);
                result += dyi;
              }
            }
            else {
              break;
            }
          }
      }
      setOutput(result);
      }
    `}};var qz=r=>{let{inputs:t,backend:e,attrs:o}=r,{x:n,y:s,dy:a}=t,{depthRadius:i,bias:c,alpha:p,beta:l}=o,u=new dd(n.shape,i,c,p,l);return e.runWebGLProgram(u,[n,s,a],n.dtype)},pE={kernelName:yp,backendName:"webgl",kernelFunc:qz};function lE(r,t,e,o){let n=y.sizeFromShape(t),a=y.sizeFromShape(r.shape)/n,i=K({inputs:{x:r},attrs:{shape:[a,n]},backend:o}),c=Qe(i,r.dtype,"max",o),p=K({inputs:{x:c},attrs:{shape:e},backend:o});return o.disposeIntermediateTensorInfo(i),o.disposeIntermediateTensorInfo(c),p}function jy(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{reductionIndices:s,keepDims:a}=o,i=n.shape.length,c=y.parseAxisParam(s,n.shape),p=c,l=v.getAxesPermutation(p,i),u=l!=null,m=e.shouldExecuteOnCPU([n]),f=n;if(u){if(m){let w=e.texData.get(f.dataId).values,I=new Array(i);for(let R=0;R<I.length;R++)I[R]=n.shape[l[R]];let k=ji(w,n.shape,n.dtype,l,I);f=e.makeTensorInfo(I,n.dtype);let $=e.texData.get(f.dataId);$.values=k}else f=as(n,l,e);p=v.getInnerMostAxes(p.length,i)}v.assertAxesAreInnerMostDims("max",p,i);let[d,h]=v.computeOutAndReduceShapes(f.shape,p),g=d;a&&(g=v.expandShapeToKeepDim(d,c));let x;if(m){let w=e.texData.get(f.dataId).values,I=vN(w,y.sizeFromShape(h),g,n.dtype);x=e.makeTensorInfo(g,n.dtype);let k=e.texData.get(x.dataId);k.values=I}else x=lE(f,h,g,e);return u&&e.disposeIntermediateTensorInfo(f),x}var uE={kernelName:"Max",backendName:"webgl",kernelFunc:jy};var Kz=Zc+`
  return max(a, b);
`,jz=`
  vec4 result = vec4(max(a, b));
  bvec4 isNaNA = isnan(a);
  bvec4 isNaNB = isnan(b);
  bvec4 isNaN = bvec4(isNaNA.x || isNaNB.x, isNaNA.y || isNaNB.y, isNaNA.z || isNaNB.z, isNaNA.w || isNaNB.w);
  `+ho+`
  return result;
`,Xz=Ft({opSnippet:Kz,packedOpSnippet:jz,cpuKernelImpl:NN}),mE={kernelName:wn,backendName:"webgl",kernelFunc:Xz};function Yz(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t;fo(n,"maxPool");let{filterSize:s,strides:a,pad:i,dimRoundingMode:c}=o,p=1;y.assert(v.eitherStridesOrDilationsAreOne(a,p),()=>`Error in maxPool: Either strides or dilations must be 1. Got strides ${a} and dilations '${p}'`);let l=v.computePool2DInfo(n.shape,s,a,p,i,c);if(l.filterWidth===1&&l.filterHeight===1&&y.arraysEqual(l.inShape,l.outShape))return Yt({inputs:{x:n},backend:e});let u=new Wr(l,"max",!1);return e.runWebGLProgram(u,[n],n.dtype)}var fE={kernelName:oa,backendName:"webgl",kernelFunc:Yz};function Zz(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{filterSize:s,strides:a,pad:i,dataFormat:c,dimRoundingMode:p}=o,l=[1,1,1],u=v.computePool3DInfo(n.shape,s,a,l,i,p,c),m=new is(u,"max",!1);return e.runWebGLProgram(m,[n],n.dtype)}var dE={kernelName:na,backendName:"webgl",kernelFunc:Zz};var hd=class{constructor(t){this.variableNames=["dy","maxPos"],this.outputShape=t.inShape;let e=t.strideHeight,o=t.strideWidth,n=t.dilationHeight,s=t.effectiveFilterHeight,a=t.effectiveFilterWidth,i=s-1-t.padInfo.top,c=a-1-t.padInfo.left,p=s*a-1;this.userCode=`
      const ivec2 pads = ivec2(${i}, ${c});

      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];

        ivec2 dyRCCorner = coords.yz - pads;
        int dyRCorner = dyRCCorner.x;
        int dyCCorner = dyRCCorner.y;

        // Convolve dy(?, ?, d) with pos mask(:, :, d) to get dx(xR, xC, d).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;
        for (int wR = 0; wR < ${s};
          wR += ${n}) {
          float dyR = float(dyRCorner + wR) / ${e}.0;

          if (dyR < 0.0 || dyR >= ${t.outHeight}.0 || fract(dyR) > 0.0) {
            continue;
          }
          int idyR = int(dyR);

          for (int wC = 0; wC < ${a}; wC++) {
            float dyC = float(dyCCorner + wC) / ${o}.0;

            if (dyC < 0.0 || dyC >= ${t.outWidth}.0 ||
                fract(dyC) > 0.0) {
              continue;
            }
            int idyC = int(dyC);

            float dyValue = getDy(b, idyR, idyC, d);
            int maxPosValue = ${p} - int(getMaxPos(b, idyR, idyC, d));

            // Get the current value, check it against the value from the
            // position matrix.
            int curPosValue = wR * ${a} + wC;
            float mask = float(maxPosValue == curPosValue ? 1.0 : 0.0);

            dotProd += dyValue * mask;
          }
        }
        setOutput(dotProd);
      }
    `}},gd=class{constructor(t){this.variableNames=["dy","maxPos"],this.outputShape=t.inShape;let e=t.strideDepth,o=t.strideHeight,n=t.strideWidth,s=t.dilationDepth,a=t.dilationHeight,i=t.dilationWidth,c=t.effectiveFilterDepth,p=t.effectiveFilterHeight,l=t.effectiveFilterWidth,u=c-1-t.padInfo.front,m=p-1-t.padInfo.top,f=l-1-t.padInfo.left,d=c*p*l-1;this.userCode=`
      const ivec3 pads = ivec3(${u}, ${m}, ${f});

      void main() {
        ivec5 coords = getOutputCoords();
        int batch = coords.x;
        int ch = coords.u;

        ivec3 dyCorner = ivec3(coords.y, coords.z, coords.w) - pads;
        int dyDCorner = dyCorner.x;
        int dyRCorner = dyCorner.y;
        int dyCCorner = dyCorner.z;

        // Convolve dy(?, ?, ?, ch) with pos mask(:, :, :, d) to get
        // dx(xD, xR, xC, ch).
        // ? = to be determined. : = across all values in that axis.
        float dotProd = 0.0;

        for (int wD = 0; wD < ${c};
           wD += ${s}) {
          float dyD = float(dyDCorner + wD) / ${e}.0;

          if (dyD < 0.0 || dyD >= ${t.outDepth}.0 || fract(dyD) > 0.0) {
            continue;
          }
          int idyD = int(dyD);

          for (int wR = 0; wR < ${p};
              wR += ${a}) {
            float dyR = float(dyRCorner + wR) / ${o}.0;

            if (dyR < 0.0 || dyR >= ${t.outHeight}.0 ||
                fract(dyR) > 0.0) {
              continue;
            }
            int idyR = int(dyR);

            for (int wC = 0; wC < ${l};
                wC += ${i}) {
              float dyC = float(dyCCorner + wC) / ${n}.0;

              if (dyC < 0.0 || dyC >= ${t.outWidth}.0 ||
                  fract(dyC) > 0.0) {
                continue;
              }
              int idyC = int(dyC);

              float dyValue = getDy(batch, idyD, idyR, idyC, ch);
              int maxPosValue = ${d} -
                  int(getMaxPos(batch, idyD, idyR, idyC, ch));

              // Get the current value, check it against the value from the
              // position matrix.
              int curPosValue =
                  wD * ${p} * ${l} +
                  wR * ${l} + wC;
              float mask = float(maxPosValue == curPosValue ? 1.0 : 0.0);

              dotProd += dyValue * mask;
            }
          }
        }
        setOutput(dotProd);
      }
    `}};function Qz(r){let{inputs:t,backend:e,attrs:o}=r,{dy:n,input:s}=t,a=s,{filterSize:i,strides:c,pad:p,dimRoundingMode:l}=o,u=[1,1,1],m=v.computePool3DInfo(a.shape,i,c,u,p,l),f=new is(m,"max",!0),d=e.runWebGLProgram(f,[a],a.dtype),h=new gd(m),g=e.runWebGLProgram(h,[n,d],a.dtype);return e.disposeIntermediateTensorInfo(d),g}var hE={kernelName:Cp,backendName:"webgl",kernelFunc:Qz};function Jz(r){let{inputs:t,backend:e,attrs:o}=r,{dy:n,input:s,output:a}=t,i=s;fo([s,a],"maxPoolGrad");let{filterSize:c,strides:p,pad:l,dimRoundingMode:u}=o,m=v.computePool2DInfo(i.shape,c,p,1,l,u),f=!0,d=new Wr(m,"max",f),h=e.runWebGLProgram(d,[i],i.dtype),g=new hd(m),x=e.runWebGLProgram(g,[n,h],i.dtype);return e.disposeIntermediateTensorInfo(h),x}var gE={kernelName:bp,backendName:"webgl",kernelFunc:Jz};function xE(r,t,e,o){let n=new Wr(e,"max",!1),s=o.runWebGLProgram(n,[r],"float32");n=new Wr(e,"max",!0,!0,t);let a=o.runWebGLProgram(n,[r],"float32");return[s,a]}var yE={kernelName:sa,backendName:"webgl",kernelFunc:({inputs:r,attrs:t,backend:e})=>{let{x:o}=r,{filterSize:n,strides:s,pad:a,includeBatchInIndex:i}=t,c=e;y.assert(o.shape.length===4,()=>`Error in maxPool: input must be rank 4 but got rank ${o.shape.length}.`);let p=[1,1];y.assert(v.eitherStridesOrDilationsAreOne(s,p),()=>`Error in maxPool: Either strides or dilations must be 1. Got strides ${s} and dilations '${p}'`);let l=v.computePool2DInfo(o.shape,n,s,p,a),[u,m]=xE(o,i,l,c);return[u,m]}};function bE(r,t,e,o){let n=y.sizeFromShape(t),a=y.sizeFromShape(r.shape)/n,i=K({inputs:{x:r},attrs:{shape:[a,n]},backend:o}),c=Qe(i,"float32","mean",o),p=K({inputs:{x:c},attrs:{shape:e},backend:o});return o.disposeIntermediateTensorInfo(i),o.disposeIntermediateTensorInfo(c),p}var CE={kernelName:aa,backendName:"webgl",kernelFunc:({inputs:r,attrs:t,backend:e})=>{let{x:o}=r,{keepDims:n,axis:s}=t,a=e,i=o.shape.length,c=y.parseAxisParam(s,o.shape),p=c,l=v.getAxesPermutation(p,i),u=l!=null,m=a.shouldExecuteOnCPU([o]),f=[],d=o;if(u){if(m){let I=a.texData.get(d.dataId).values,k=new Array(i);for(let D=0;D<k.length;D++)k[D]=o.shape[l[D]];let $=ji(I,o.shape,o.dtype,l,k);d=a.makeTensorInfo(k,o.dtype);let R=a.texData.get(d.dataId);R.values=$}else d=as(o,l,a);f.push(d),p=v.getInnerMostAxes(p.length,i)}v.assertAxesAreInnerMostDims("sum",p,i);let[h,g]=v.computeOutAndReduceShapes(d.shape,p),x=h;n&&(x=v.expandShapeToKeepDim(h,c));let b=bE(d,g,x,a);for(let w of f)a.disposeIntermediateTensorInfo(w);return b}};function t4(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{axis:s,keepDims:a}=o,i=n.shape.length,c=y.parseAxisParam(s,n.shape),p=c,l=v.getAxesPermutation(p,i),u=n;l!=null&&(u=Bt({inputs:{x:n},backend:e,attrs:{perm:l}}),p=v.getInnerMostAxes(p.length,n.shape.length)),v.assertAxesAreInnerMostDims("min",p,i);let[m,f]=v.computeOutAndReduceShapes(u.shape,p),d=y.sizeFromShape(f),h=K({inputs:{x:u},backend:e,attrs:{shape:[-1,d]}}),g=Qe(h,h.dtype,"min",e),x;if(a){let b=v.expandShapeToKeepDim(m,c);x=K({inputs:{x:g},backend:e,attrs:{shape:b}})}else x=K({inputs:{x:g},backend:e,attrs:{shape:m}});return e.disposeIntermediateTensorInfo(h),e.disposeIntermediateTensorInfo(g),l!=null&&e.disposeIntermediateTensorInfo(u),x}var TE={kernelName:"Min",backendName:"webgl",kernelFunc:t4};var e4=Zc+`
  return min(a, b);
`,r4=`
  vec4 result = vec4(min(a, b));
  bvec4 isNaNA = isnan(a);
  bvec4 isNaNB = isnan(b);
  bvec4 isNaN = bvec4(isNaNA.x || isNaNB.x, isNaNA.y || isNaNB.y, isNaNA.z || isNaNB.z, isNaNA.w || isNaNB.w);
  `+ho+`
  return result;
`,o4=Ft({opSnippet:e4,packedOpSnippet:r4,cpuKernelImpl:kN}),wE={kernelName:In,backendName:"webgl",kernelFunc:o4};var xd=class{constructor(t,e,o){this.variableNames=["x"],this.outputShape=e.map((l,u)=>l[0]+t[u]+l[1]);let n=t.length,s=gt(n),a=e.map(l=>l[0]).join(","),i=e.map((l,u)=>l[0]+t[u]).join(","),c=["coords[0]","coords[1]","coords[2]","coords[3]"].slice(0,n),p=o==="reflect"?0:1;if(n===1){this.userCode=`
        int start = ${a};
        int end = ${i};

        void main() {
          int outC = getOutputCoords();
          if (outC < start) {
            outC = start * 2 - outC - ${p};
          } else if(outC >= end) {
            outC = (end - 1) * 2 - outC + ${p};
          }
          setOutput(getX(outC - start));
        }
      `;return}this.userCode=`
      ${s} start = ${s}(${a});
      ${s} end = ${s}(${i});

      void main() {
        ${s} outC = getOutputCoords();
        for (int i = 0; i < ${n}; i++) {
          if (outC[i] < start[i]) {
            outC[i] = start[i] * 2 - outC[i] - ${p};
          } else if(outC[i] >= end[i]) {
            outC[i] = (end[i] - 1) * 2 - outC[i] + ${p};
          }
        }
        ${s} coords = outC - start;
        setOutput(getX(${c}));
      }
    `}};var yd=class{constructor(t,e,o){this.variableNames=["x"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=e.map((d,h)=>d[0]+t[h]+d[1]);let n=t.length,s=gt(n),a=e.map(d=>d[0]).join(","),i=e.map((d,h)=>d[0]+t[h]).join(","),c=Xt("rc",n),p=Xt("source",n),l=`${c[n-1]} < ${this.outputShape[n-1]}`,u=n===1?"source":`vec2(${p.slice(-2).join()})`,m=o==="reflect"?0:1,f="";if(n===1){let d=`
        ${s} source = rc;
        if (source < start) {
          source = start * 2 - source - ${m};
        } else if (source >= end) {
          source = (end - 1) * 2 - source + ${m};
        }
        source -= start;
      `;f=`
        ${s} rc = outputLoc;
        ${d}
        result[0] = getChannel(getX(${p.join()}), ${u});
        ${c[n-1]} += 1;
        if(${l}) {
          ${d}
          result[1] = getChannel(getX(${p.join()}), ${u});
        }
      `}else{let d=`
        ${s} source = rc;
        ${s} lt = ${s}(lessThan(source, start));
        ${s} gte = ${s}(greaterThanEqual(source, end));
        ${s} orig = 1 - (lt + gte);
        source = orig * source +
                lt * (start * 2 - source - ${m}) +
                gte * ((end - 1) * 2 - source + ${m});
        source -= start;
      `;f=`
        ${s} rc = outputLoc;
        ${d}
        result[0] = getChannel(getX(${p.join()}), ${u});
        ${c[n-1]} += 1;
        if(${l}) {
          ${d}
          result[1] = getChannel(getX(${p.join()}), ${u});
        }
        rc = outputLoc;
        ${c[n-2]} += 1;
        if(${c[n-2]} < ${this.outputShape[n-2]}) {
          ${d}
          result[2] = getChannel(getX(${p.join()}), ${u});
          ${c[n-1]} += 1;
          if(${l}) {
            ${d}
            result[3] = getChannel(getX(${p.join()}), ${u});
          }
        }
      `}this.userCode=`
      const ${s} start = ${s}(${a});
      const ${s} end = ${s}(${i});

      void main() {
        ${s} outputLoc = getOutputCoords();
        vec4 result = vec4(0.);
        ${f}
        setOutput(result);
      }
    `}};var n4=({inputs:r,backend:t,attrs:e})=>{let{x:o}=r,{paddings:n,mode:s}=e,a=F().getBool("WEBGL_PACK_ARRAY_OPERATIONS")?new yd(o.shape,n,s):new xd(o.shape,n,s);return t.runWebGLProgram(a,[o],o.dtype)},IE={kernelName:ia,backendName:"webgl",kernelFunc:n4};var s4=`if (b == 0.0) return NAN;
  return mod(a, b);`,a4=`
  vec4 result = mod(a, b);
  bvec4 isNaN = equal(b, vec4(0.0));
  `+ho+`
  return result;
`,i4=Ft({opSnippet:s4,packedOpSnippet:a4}),SE={kernelName:"Mod",backendName:"webgl",kernelFunc:i4};var bd=class{constructor(t,e,o){this.variableNames=["probs"],this.customUniforms=[{name:"seed",type:"float"}],this.outputShape=[t,o],this.userCode=`
      void main() {
        ivec2 coords = getOutputCoords();
        int batch = coords[0];

        float r = random(seed);
        float cdf = 0.0;

        for (int i = 0; i < ${e-1}; i++) {
          cdf += getProbs(batch, i);

          if (r < cdf) {
            setOutput(float(i));
            return;
          }
        }

        // If no other event happened, last event happened.
        setOutput(float(${e-1}));
      }
    `}};var c4=`
if (a == b) {
  return 1.0;
};
return a / b;`,p4=`
  // vec4 one = vec4(equal(a, b));
  // return one + (vec4(1.0) - one) * a / b;
  vec4 result = a / b;
  if(a.x == b.x) {
    result.x = 1.;
  }
  if(a.y == b.y) {
    result.y = 1.;
  }
  if(a.z == b.z) {
    result.z = 1.;
  }
  if(a.w == b.w) {
    result.w = 1.;
  }

  return result;
`,Xy=Ft({opSnippet:c4,packedOpSnippet:p4,checkOutOfBounds:!0}),vE={kernelName:sn,backendName:"webgl",kernelFunc:Xy};var NE="return a - b;",Yy=Ft({opSnippet:NE,packedOpSnippet:NE,supportsComplex:!0,cpuKernelImpl:qN}),kE={kernelName:"Sub",backendName:"webgl",kernelFunc:Yy};function Zy(r){let{inputs:t,backend:e,attrs:o}=r,{logits:n}=t,{dim:s}=o,a=y.parseAxisParam([s],n.shape),i=jy({inputs:{x:n},backend:e,attrs:{reductionIndices:a,keepDims:!1}}),c=v.expandShapeToKeepDim(i.shape,a),p=K({inputs:{x:i},backend:e,attrs:{shape:c}}),l=Yy({inputs:{a:n,b:p},backend:e}),u=Hy({inputs:{x:l},backend:e}),m=Yi({inputs:{x:u},backend:e,attrs:{axis:a,keepDims:!1}}),f=K({inputs:{x:m},backend:e,attrs:{shape:c}}),d=Xy({inputs:{a:u,b:f},backend:e});return e.disposeIntermediateTensorInfo(i),e.disposeIntermediateTensorInfo(p),e.disposeIntermediateTensorInfo(l),e.disposeIntermediateTensorInfo(u),e.disposeIntermediateTensorInfo(m),e.disposeIntermediateTensorInfo(f),d}var EE={kernelName:Oa,backendName:"webgl",kernelFunc:Zy};function l4(r){let{inputs:t,backend:e,attrs:o}=r,{logits:n}=t,{numSamples:s,seed:a,normalized:i}=o,c=i?n:Zy({inputs:{logits:n},backend:e,attrs:{dim:n.shape.length-1}}),p=c.shape[0],l=c.shape[1],u=new bd(p,l,s),m=[[a]],f=e.runWebGLProgram(u,[c],"int32",m);return i||e.disposeIntermediateTensorInfo(c),f}var $E={kernelName:pa,backendName:"webgl",kernelFunc:l4};var u4=ae+`
  return -x;
`,m4=`
  vec4 result = -x;
  bvec4 isNaN = isnan(x);

  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`;function f4(r){let{inputs:t,backend:e}=r,{x:o}=t;if(e.shouldExecuteOnCPU([o])){let s=e.texData.get(o.dataId),[a,i]=$N(s.values,o.shape,o.dtype);return e.makeTensorInfo(i,o.dtype,a)}let n;return F().getBool("WEBGL_PACK_UNARY_OPERATIONS")?n=new ir(o.shape,m4):n=new $e(o.shape,u4),e.runWebGLProgram(n,[o],o.dtype)}var AE={kernelName:"Neg",backendName:"webgl",kernelFunc:f4};var d4=ge.nonMaxSuppressionV3Impl;function h4(r){v.warn("tf.nonMaxSuppression() in webgl locks the UI thread. Call tf.nonMaxSuppressionAsync() instead");let{inputs:t,backend:e,attrs:o}=r,{boxes:n,scores:s}=t,{maxOutputSize:a,iouThreshold:i,scoreThreshold:c}=o,p=e.readSync(n.dataId),l=e.readSync(s.dataId),{selectedIndices:u}=d4(p,l,a,i,c);return e.makeTensorInfo([u.length],"int32",new Int32Array(u))}var RE={kernelName:la,backendName:"webgl",kernelFunc:h4};var g4=ge.nonMaxSuppressionV4Impl;function x4(r){v.warn("tf.nonMaxSuppression() in webgl locks the UI thread. Call tf.nonMaxSuppressionAsync() instead");let{inputs:t,backend:e,attrs:o}=r,{boxes:n,scores:s}=t,{maxOutputSize:a,iouThreshold:i,scoreThreshold:c,padToMaxOutputSize:p}=o,l=e.readSync(n.dataId),u=e.readSync(s.dataId),{selectedIndices:m,validOutputs:f}=g4(l,u,a,i,c,p);return[e.makeTensorInfo([m.length],"int32",new Int32Array(m)),e.makeTensorInfo([],"int32",new Int32Array([f]))]}var DE={kernelName:ua,backendName:"webgl",kernelFunc:x4};var y4=ge.nonMaxSuppressionV5Impl;function b4(r){v.warn("tf.nonMaxSuppression() in webgl locks the UI thread. Call tf.nonMaxSuppressionAsync() instead");let{inputs:t,backend:e,attrs:o}=r,{boxes:n,scores:s}=t,{maxOutputSize:a,iouThreshold:i,scoreThreshold:c,softNmsSigma:p}=o,l=e.readSync(n.dataId),u=e.readSync(s.dataId),m=a,f=i,d=c,h=p,{selectedIndices:g,selectedScores:x}=y4(l,u,m,f,d,h);return[e.makeTensorInfo([g.length],"int32",new Int32Array(g)),e.makeTensorInfo([x.length],"float32",new Float32Array(x))]}var FE={kernelName:ma,backendName:"webgl",kernelFunc:b4};var Cd=class{constructor(t,e,o,n){this.variableNames=["indices"],this.outputShape=[t,e],this.userCode=`
      void main() {
        ivec2 coords = getOutputCoords();
        int index = round(getIndices(coords.x));
        setOutput(mix(float(${n}), float(${o}),
                      float(index == coords.y)));
      }
    `}};var C4=r=>{let{inputs:t,backend:e,attrs:o}=r,{indices:n}=t,{dtype:s,depth:a,onValue:i,offValue:c}=o,p=y.sizeFromShape(n.shape),l=new Cd(p,a,i,c),u=K({inputs:{x:n},backend:e,attrs:{shape:[p]}}),m=e.runWebGLProgram(l,[u],s);e.disposeIntermediateTensorInfo(u);let f=[...n.shape,a],d=K({inputs:{x:m},backend:e,attrs:{shape:f}});return e.disposeIntermediateTensorInfo(m),d},_E={kernelName:da,backendName:"webgl",kernelFunc:C4};function fu(r){let{inputs:t,backend:e}=r,{x:o}=t;if(o.dtype==="complex64"){let n=Go({inputs:{input:o},backend:e}),s=fu({inputs:{x:n},backend:e}),a=Qi({inputs:{input:o},backend:e}),i=fu({inputs:{x:a},backend:e}),c=Ge({inputs:{real:s,imag:i},backend:e});return e.disposeIntermediateTensorInfo(n),e.disposeIntermediateTensorInfo(s),e.disposeIntermediateTensorInfo(a),e.disposeIntermediateTensorInfo(i),c}else return Uo({attrs:{shape:o.shape,dtype:o.dtype,value:o.dtype==="string"?"":0},backend:e})}var OE={kernelName:Qa,backendName:"webgl",kernelFunc:fu};function PE(r){let{inputs:t,backend:e}=r,{x:o}=t;if(o.dtype==="string")throw new Error("onesLike is not supported under string dtype");if(o.dtype==="complex64"){let n=Go({inputs:{input:o},backend:e}),s=PE({inputs:{x:n},backend:e}),a=Qi({inputs:{input:o},backend:e}),i=fu({inputs:{x:a},backend:e}),c=Ge({inputs:{real:s,imag:i},backend:e});return e.disposeIntermediateTensorInfo(n),e.disposeIntermediateTensorInfo(s),e.disposeIntermediateTensorInfo(a),e.disposeIntermediateTensorInfo(i),c}else return Uo({attrs:{shape:o.shape,dtype:o.dtype,value:1},backend:e})}var LE={kernelName:fa,backendName:"webgl",kernelFunc:PE};function T4(r){let{inputs:t,backend:e,attrs:o}=r,{axis:n}=o;if(t.length===1)return nd({inputs:{input:t[0]},backend:e,attrs:{dim:n}});let s=t[0].shape,a=t[0].dtype;t.forEach(l=>{y.assertShapesMatch(s,l.shape,"All tensors passed to stack must have matching shapes"),y.assert(a===l.dtype,()=>"All tensors passed to stack must have matching dtypes")});let i=[],c=t.map(l=>{let u=nd({inputs:{input:l},backend:e,attrs:{dim:n}});return i.push(u),u}),p=Wy({inputs:c,backend:e,attrs:{axis:n}});return i.forEach(l=>e.disposeIntermediateTensorInfo(l)),p}var ME={kernelName:ha,backendName:"webgl",kernelFunc:T4};var Td=class{constructor(t,e,o){this.variableNames=["x"],this.customUniforms=[{name:"value",type:"float"}],this.outputShape=e.map((p,l)=>p[0]+t[l]+p[1]);let n=t.length,s=gt(n),a=e.map(p=>p[0]).join(","),i=e.map((p,l)=>p[0]+t[l]).join(","),c=["coords[0]","coords[1]","coords[2]","coords[3]"].slice(0,n);if(n===1){this.userCode=`
        int start = ${a};
        int end = ${i};

        void main() {
          int outC = getOutputCoords();
          if (outC < start || outC >= end) {
            setOutput(value);
          } else {
            setOutput(getX(outC - start));
          }
        }
      `;return}this.userCode=`
      ${s} start = ${s}(${a});
      ${s} end = ${s}(${i});

      void main() {
        ${s} outC = getOutputCoords();
        if (any(lessThan(outC, start)) || any(greaterThanEqual(outC, end))) {
          setOutput(value);
        } else {
          ${s} coords = outC - start;
          setOutput(getX(${c}));
        }
      }
    `}};var wd=class{constructor(t,e,o){this.variableNames=["x"],this.packedInputs=!0,this.packedOutput=!0,this.customUniforms=[{name:"value",type:"float"}],this.outputShape=e.map((h,g)=>h[0]+t[g]+h[1]);let n=t.length,s=gt(n),a=e.map(h=>h[0]).join(","),i=e.map((h,g)=>h[0]+t[g]).join(","),c=Xt("rc",n),p=Xt("source",n),l=`${c[n-1]} < ${this.outputShape[n-1]}`,u=n===1?"source":`vec2(${p.slice(-2).join()})`,m=[`${s} rc = outputLoc;`,`${c[n-1]} += 1;
       if(${l}) {
      `,n===1?"":`}
       rc = outputLoc;
       ${c[n-2]} += 1;
       if(${c[n-2]} < ${this.outputShape[n-2]}) {`,n===1?"":`  ${c[n-1]} += 1;
         if(${l}) {`],f=n===1?"rc < start || rc >= end":"any(lessThan(rc, start)) || any(greaterThanEqual(rc, end))",d="";for(let h=0,g=n===1?2:4;h<g;h++)d+=`
        ${m[h]}
        if (${f}) {
          result[${h}] = float(value);
        } else {
          ${s} source = rc - start;
          result[${h}] = getChannel(getX(${p.join()}), ${u});
        }
      `;d+=n===1?"} ":"}}",this.userCode=`
      const ${s} start = ${s}(${a});
      const ${s} end = ${s}(${i});

      void main() {
        ${s} outputLoc = getOutputCoords();
        vec4 result = vec4(0.);
        ${d}
        setOutput(result);
      }
    `}};var Qy=r=>{let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{paddings:s,constantValue:a}=o;if(y.sizeFromShape(n.shape)===0){let p=s.map((l,u)=>l[0]+n.shape[u]+l[1]);return Uo({backend:e,attrs:{shape:p,value:a,dtype:n.dtype}})}let i=F().getBool("WEBGL_PACK_ARRAY_OPERATIONS")?new wd(n.shape,s,a):new Td(n.shape,s,a),c=[[a]];return e.runWebGLProgram(i,[n],n.dtype,c)},BE={kernelName:ga,backendName:"webgl",kernelFunc:Qy};var w4=`
  if(a < 0.0 && floor(b) < b){
    return NAN;
  }
  if (b == 0.0) {
    return 1.0;
  }
  return (round(mod(b, 2.0)) != 1) ?
      pow(abs(a), b) : sign(a) * pow(abs(a), b);
`,I4=`
  // isModRound1 has 1 for components with round(mod(b, 2.0)) == 1, 0 otherwise.
  vec4 isModRound1 = vec4(equal(round(mod(b, 2.0)), ivec4(1)));
  vec4 multiplier = sign(a) * isModRound1 + (vec4(1.0) - isModRound1);
  vec4 result = multiplier * pow(abs(a), b);

  // Ensure that a^0 = 1, including 0^0 = 1 as this correspond to TF and JS
  bvec4 isExpZero = equal(b, vec4(0.0));
  result.r = isExpZero.r ? 1.0 : result.r;
  result.g = isExpZero.g ? 1.0 : result.g;
  result.b = isExpZero.b ? 1.0 : result.b;
  result.a = isExpZero.a ? 1.0 : result.a;

  bvec4 isNaN1 = lessThan(a, vec4(0.0));
  bvec4 isNaN2 = lessThan(floor(b), b);
  bvec4 isNaN = bvec4(isNaN1.x && isNaN2.x, isNaN1.y && isNaN2.y, isNaN1.z && isNaN2.z, isNaN1.w && isNaN2.w);
  `+ho+`
  return result;
`,S4=Ft({opSnippet:w4,packedOpSnippet:I4}),VE={kernelName:"Pow",backendName:"webgl",kernelFunc:S4};function v4(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{axis:s,keepDims:a}=o,i=n.shape.length,c=[],p=y.parseAxisParam(s,n.shape),l=p,u=v.getAxesPermutation(l,i),m=n;u!=null&&(m=Bt({inputs:{x:n},backend:e,attrs:{perm:u}}),l=v.getInnerMostAxes(l.length,i),c.push(m)),v.assertAxesAreInnerMostDims("prod",l,i);let f;if(e.shouldExecuteOnCPU([m])){let d=e.texData.get(m.dataId).values,{outVals:h,outShape:g,outDtype:x}=RN(m.shape,m.dtype,d,l);f=e.makeTensorInfo(g,x,h)}else{let[d,h]=v.computeOutAndReduceShapes(m.shape,l),g=y.sizeFromShape(h),x=K({inputs:{x:m},backend:e,attrs:{shape:[-1,g]}}),b=Hn(n.dtype),w=Qe(x,b,"prod",e);f=K({inputs:{x:w},backend:e,attrs:{shape:d}}),c.push(x),c.push(w)}if(a){c.push(f);let d=v.expandShapeToKeepDim(f.shape,p);f=K({inputs:{x:f},backend:e,attrs:{shape:d}})}return c.forEach(d=>e.disposeIntermediateTensorInfo(d)),f}var GE={kernelName:ba,backendName:"webgl",kernelFunc:v4};function N4(r){let{inputs:t,backend:e,attrs:o}=r,{paramsNestedSplits:n,paramsDenseValues:s,indices:a}=t,{outputRaggedRank:i}=o,c=n.map(x=>e.readSync(x.dataId)),p=n.map(x=>x.shape),l=e.readSync(s.dataId),u=e.readSync(a.dataId),[m,f,d]=DN(c,p,l,s.shape,s.dtype,u,a.shape,i),h=m.map(x=>e.makeTensorInfo([x.length],"int32",x)),g=e.makeTensorInfo(d,s.dtype,f);return h.concat([g])}var UE={kernelName:Ca,backendName:"webgl",kernelFunc:N4};function k4(r){let{inputs:t,backend:e,attrs:o}=r,{shape:n,values:s,defaultValue:a,rowPartitionTensors:i}=t,{rowPartitionTypes:c}=o,p=e.readSync(n.dataId),l=e.readSync(s.dataId),u=e.readSync(a.dataId),m=i.map(g=>e.readSync(g.dataId)),f=i.map(g=>g.shape),[d,h]=FN(p,n.shape,l,s.shape,s.dtype,u,a.shape,m,f,c);return e.makeTensorInfo(d,s.dtype,h)}var zE={kernelName:Ta,backendName:"webgl",kernelFunc:k4};var Jy=r=>{let{backend:t,attrs:e}=r,{start:o,stop:n,step:s,dtype:a}=e,i=_N(o,n,s,a);return t.makeTensorInfo([i.length],a,i)},WE={kernelName:wa,backendName:"webgl",kernelFunc:Jy};var E4="return 1.0 / x;",$4=st({opSnippet:E4}),HE={kernelName:Nn,backendName:"webgl",kernelFunc:$4};var A4=ae+`
  return (x < 0.0) ? 0.0 : x;
`,R4=`
  vec4 result = x * vec4(greaterThanEqual(x, vec4(0.0)));
  bvec4 isNaN = isnan(x);

  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`,D4=st({opSnippet:A4,packedOpSnippet:R4}),qE={kernelName:kn,backendName:"webgl",kernelFunc:D4};var F4=ae+`
  return (x < 0.0) ? 0.0 : min(6.0, x);
`,_4=`
  vec4 result = min(x, vec4(6.)) * vec4(greaterThanEqual(x, vec4(0.0)));
  bvec4 isNaN = isnan(x);

  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`,O4=st({opSnippet:F4,packedOpSnippet:_4}),KE={kernelName:En,backendName:"webgl",kernelFunc:O4};var Id=class{constructor(t,e,o,n,s){this.variableNames=["A"],this.outputShape=[];let[a,i,c,p]=t;this.outputShape=[a,e,o,p];let l=[n&&e>1?i-1:i,n&&o>1?c-1:c],u=[n&&e>1?e-1:e,n&&o>1?o-1:o],m;s?m="(vec2(yRC) + vec2(0.5)) * effectiveInputOverOutputRatioRC - vec2(0.5)":m="vec2(yRC) * effectiveInputOverOutputRatioRC",this.userCode=`
      const vec2 effectiveInputOverOutputRatioRC = vec2(
          ${l[0]/u[0]},
          ${l[1]/u[1]});
      const vec2 inputShapeRC = vec2(${i}.0, ${c}.0);

      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];
        ivec2 yRC = coords.yz;

        // Fractional source index.
        vec2 sourceFracIndexRC = ${m};

        // Compute the four integer indices.
        ivec2 sourceFloorRC = ivec2(max(sourceFracIndexRC, vec2(0.0)));
        ivec2 sourceCeilRC = ivec2(
          min(inputShapeRC - 1.0, ceil(sourceFracIndexRC)));

        float topLeft = getA(b, sourceFloorRC.x, sourceFloorRC.y, d);
        float bottomLeft = getA(b, sourceCeilRC.x, sourceFloorRC.y, d);
        float topRight = getA(b, sourceFloorRC.x, sourceCeilRC.y, d);
        float bottomRight = getA(b, sourceCeilRC.x, sourceCeilRC.y, d);

        vec2 fracRC = sourceFracIndexRC - vec2(sourceFloorRC);

        float top = topLeft + (topRight - topLeft) * fracRC.y;
        float bottom = bottomLeft + (bottomRight - bottomLeft) * fracRC.y;
        float newValue = top + (bottom - top) * fracRC.x;

        setOutput(newValue);
      }
    `}};var Sd=class{constructor(t,e,o,n,s){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=[];let[a,i,c,p]=t;this.outputShape=[a,e,o,p];let l=[n&&e>1?i-1:i,n&&o>1?c-1:c],u=[n&&e>1?e-1:e,n&&o>1?o-1:o],m;s?m="(vec3(yRC) + vec3(0.5)) * effectiveInputOverOutputRatioRC - vec3(0.5)":m="vec3(yRC) * effectiveInputOverOutputRatioRC",this.userCode=`
      const vec3 effectiveInputOverOutputRatioRC = vec3(
          ${l[0]/u[0]},
          ${l[1]/u[1]},
          ${l[1]/u[1]});
      const vec3 inputShapeRC = vec3(${i}.0, ${c}.0,
                                     ${c}.0);

      float getAValue(int b, int r, int c, int d) {
        return getChannel(getA(b, r, c, d), vec2(c, d));
      }

      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];
        // Calculate values for next column in yRC.z.
        ivec3 yRC = coords.yzz + ivec3(0, 0, 1);

        // Fractional source index.
        vec3 sourceFracIndexRC = ${m};

        // Compute the four integer indices.
        ivec3 sourceFloorRC = ivec3(max(sourceFracIndexRC, vec3(0.0)));
        ivec3 sourceCeilRC = ivec3(
          min(inputShapeRC - 1.0, ceil(sourceFracIndexRC)));

        // Should we calculate next column and row elements in 2x2 packed cell.
        bool hasNextCol = d < ${p-1};
        bool hasNextRow = coords.z < ${o-1};

        // In parallel, construct four corners for all four components in
        // packed 2x2 cell.
        vec4 topLeft = vec4(
          getAValue(b, sourceFloorRC.x, sourceFloorRC.y, d),
          hasNextCol ? getAValue(b, sourceFloorRC.x, sourceFloorRC.y, d + 1)
                     : 0.0,
          hasNextRow ? getAValue(b, sourceFloorRC.x, sourceFloorRC.z, d)
                     : 0.0,
          (hasNextRow && hasNextCol) ?
            getAValue(b, sourceFloorRC.x, sourceFloorRC.z, d + 1) : 0.0);

        vec4 bottomLeft = vec4(
          getAValue(b, sourceCeilRC.x, sourceFloorRC.y, d),
          hasNextCol ? getAValue(b, sourceCeilRC.x, sourceFloorRC.y, d + 1)
                     : 0.0,
          hasNextRow ? getAValue(b, sourceCeilRC.x, sourceFloorRC.z, d)
                     : 0.0,
          (hasNextRow && hasNextCol) ?
            getAValue(b, sourceCeilRC.x, sourceFloorRC.z, d + 1) : 0.0);

        vec4 topRight = vec4(
          getAValue(b, sourceFloorRC.x, sourceCeilRC.y, d),
          hasNextCol ? getAValue(b, sourceFloorRC.x, sourceCeilRC.y, d + 1)
                     : 0.0,
          hasNextRow ? getAValue(b, sourceFloorRC.x, sourceCeilRC.z, d)
                     : 0.0,
          (hasNextRow && hasNextCol) ?
            getAValue(b, sourceFloorRC.x, sourceCeilRC.z, d + 1) : 0.0);

        vec4 bottomRight = vec4(
          getAValue(b, sourceCeilRC.x, sourceCeilRC.y, d),
          hasNextCol ? getAValue(b, sourceCeilRC.x, sourceCeilRC.y, d + 1)
                     : 0.0,
          hasNextRow ? getAValue(b, sourceCeilRC.x, sourceCeilRC.z, d)
                     : 0.0,
          (hasNextRow && hasNextCol) ?
            getAValue(b, sourceCeilRC.x, sourceCeilRC.z, d + 1) : 0.0);

        vec3 fracRC = sourceFracIndexRC - vec3(sourceFloorRC);

        vec4 top = mix(topLeft, topRight, fracRC.yyzz);
        vec4 bottom = mix(bottomLeft, bottomRight, fracRC.yyzz);
        vec4 newValue = mix(top, bottom, fracRC.x);

        setOutput(newValue);
      }
    `}};function P4(r){let{inputs:t,backend:e,attrs:o}=r,{images:n}=t,{alignCorners:s,halfPixelCenters:a,size:i}=o,[c,p]=i,l=F().getBool("WEBGL_PACK_IMAGE_OPERATIONS")?new Sd(n.shape,c,p,s,a):new Id(n.shape,c,p,s,a);return e.runWebGLProgram(l,[n],"float32")}var jE={kernelName:Na,backendName:"webgl",kernelFunc:P4};var vd=class{constructor(t,e,o){this.variableNames=["dy"],this.outputShape=[],this.outputShape=e;let[,n,s]=e,[,a,i]=t,c=[o&&a>1?n-1:n,o&&i>1?s-1:s],p=[o&&a>1?a-1:a,o&&i>1?i-1:i],l=c[0]/p[0],u=c[1]/p[1],m=1/l,f=1/u,d=Math.ceil(m)*2+2,h=Math.ceil(f)*2+2;this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];
        int r = coords[1];
        int c = coords[2];

        float accumulator = 0.0;

        const float heightScale = float(${l});
        const float widthScale = float(${u});

        const float invHeightScale = float(${m});
        const float invWidthScale = float(${f});

        const int winHeight = int(${d});
        const int winWidth = int(${h});

        // Compute bounds for where in dy we will look
        float startRLerp = floor(float(r) * invHeightScale);
        int startDyR = int(startRLerp - float(winHeight / 2));

        float startCLerp = floor(float(c) * invWidthScale);
        int startDyC = int(startCLerp - float(winWidth / 2));

        // Loop over dy
        for (int dyROffset = 0; dyROffset < winHeight; dyROffset++) {
          int dyR = dyROffset + startDyR;

          // Guard against the window exceeding the bounds of dy
          if (dyR < 0 || dyR >= ${a}) {
            continue;
          }

          for (int dyCOffset = 0; dyCOffset < winWidth; dyCOffset++) {
            int dyC = dyCOffset + startDyC;

            // Guard against the window exceeding the bounds of dy
            if (dyC < 0 || dyC >= ${i}) {
              continue;
            }

            float dxR = float(dyR) * heightScale;
            int topDxRIndex = int(floor(dxR));
            int bottomDxRIndex = int(min(ceil(dxR), ${n-1}.0));
            float dxRLerp = dxR - float(topDxRIndex);
            float inverseDxRLerp = 1.0 - dxRLerp;

            float dxC = float(dyC) * widthScale;
            int leftDxCIndex = int(floor(dxC));
            int rightDxCIndex = int(min(ceil(dxC), ${s-1}.0));
            float dxCLerp = dxC - float(leftDxCIndex);
            float inverseDxCLerp = 1.0 - dxCLerp;

            if (r == topDxRIndex && c == leftDxCIndex) {
              // topLeft
              accumulator +=
                getDy(b, dyR, dyC, d) * inverseDxRLerp * inverseDxCLerp;
            }

            if (r == topDxRIndex && c == rightDxCIndex) {
              // topRight
              accumulator += getDy(b, dyR, dyC, d) * inverseDxRLerp * dxCLerp;
            }

            if (r == bottomDxRIndex && c == leftDxCIndex) {
              // bottomLeft
              accumulator += getDy(b, dyR, dyC, d) * dxRLerp * inverseDxCLerp;
            }

            if (r == bottomDxRIndex && c == rightDxCIndex) {
              // bottomRight
              accumulator += getDy(b, dyR, dyC, d) * dxRLerp * dxCLerp;
            }
          }
        }
        // End loop over dy

        setOutput(accumulator);
      }
    `}};function L4(r){let{inputs:t,backend:e,attrs:o}=r,{images:n,dy:s}=t,{alignCorners:a}=o,i=new vd(s.shape,n.shape,a);return e.runWebGLProgram(i,[s],s.dtype)}var XE={kernelName:wp,backendName:"webgl",kernelFunc:L4};var Nd=class{constructor(t,e,o,n,s){this.variableNames=["A"],this.outputShape=[];let[a,i,c,p]=t;this.outputShape=[a,e,o,p];let l=[n&&e>1?i-1:i,n&&o>1?c-1:c],u=[n&&e>1?e-1:e,n&&o>1?o-1:o],m=n?"0.5":"0.0",f;s?f="max((vec2(yRC) + vec2(0.5)) * effectiveInputOverOutputRatioRC, vec2(0.0))":f="vec2(yRC) * effectiveInputOverOutputRatioRC",this.userCode=`
      const vec2 effectiveInputOverOutputRatioRC = vec2(
          ${l[0]/u[0]},
          ${l[1]/u[1]});
      const vec2 inputShapeRC = vec2(${i}.0, ${c}.0);

      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];
        ivec2 yRC = coords.yz;

        // Fractional source index.
        vec2 sourceFracIndexRC = ${f};

        // Compute the coordinators of nearest neighbor point.
        ivec2 sourceNearestRC = ivec2(
          min(inputShapeRC - 1.0, floor(sourceFracIndexRC + ${m})));
        float newValue = getA(b, sourceNearestRC.x, sourceNearestRC.y, d);

        setOutput(newValue);
      }
    `}};var kd=class{constructor(t,e,o,n,s){this.variableNames=["A"],this.packedInputs=!0,this.packedOutput=!0,this.outputShape=[];let[a,i,c,p]=t;this.outputShape=[a,e,o,p];let l=[n&&e>1?i-1:i,n&&o>1?c-1:c],u=[n&&e>1?e-1:e,n&&o>1?o-1:o],m=n?"0.5":"0.0",f;s?f="max((vec3(yRC) + vec3(0.5)) * effectiveInputOverOutputRatioRC, vec3(0.0))":f="vec3(yRC) * effectiveInputOverOutputRatioRC",this.userCode=`
      const vec3 effectiveInputOverOutputRatioRC = vec3(
          ${l[0]/u[0]},
          ${l[1]/u[1]},
          ${l[1]/u[1]});
      const vec3 inputShapeRC = vec3(${i}.0, ${c}.0,
                                     ${c}.0);

      float getAValue(int b, int r, int c, int d) {
        return getChannel(getA(b, r, c, d), vec2(c, d));
      }

      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];
        // Calculate values for next column in yRC.z.
        ivec3 yRC = coords.yzz + ivec3(0, 0, 1);

        // Fractional source index.
        vec3 sourceFracIndexRC = ${f};

        // Compute the coordinators of nearest neighbor point.
        ivec3 sourceNearestRC = ivec3(
          min(inputShapeRC - 1.0, floor(sourceFracIndexRC + ${m})));

        // Should we calculate next column and row elements in 2x2 packed cell.
        bool hasNextCol = d < ${p-1};
        bool hasNextRow = coords.z < ${o-1};

        vec4 newValue = vec4(
          getAValue(b, sourceNearestRC.x, sourceNearestRC.y, d),
          hasNextCol ? getAValue(b, sourceNearestRC.x, sourceNearestRC.y, d + 1)
                     : 0.0,
          hasNextRow ? getAValue(b, sourceNearestRC.x, sourceNearestRC.z, d)
                     : 0.0,
          (hasNextRow && hasNextCol) ?
            getAValue(b, sourceNearestRC.x, sourceNearestRC.z, d + 1) : 0.0);

        setOutput(newValue);
      }
    `}};function M4(r){let{inputs:t,backend:e,attrs:o}=r,{images:n}=t,{alignCorners:s,halfPixelCenters:a,size:i}=o,[c,p]=i,l=F().getBool("WEBGL_PACK_IMAGE_OPERATIONS")?new kd(n.shape,c,p,s,a):new Nd(n.shape,c,p,s,a);return e.runWebGLProgram(l,[n],n.dtype)}var YE={kernelName:va,backendName:"webgl",kernelFunc:M4};var Ed=class{constructor(t,e,o){this.variableNames=["dy"],this.outputShape=[],this.outputShape=e;let[,n,s]=e,[,a,i]=t,c=[o&&a>1?n-1:n,o&&i>1?s-1:s],p=[o&&a>1?a-1:a,o&&i>1?i-1:i],l=c[0]/p[0],u=c[1]/p[1],m=1/l,f=1/u,d=Math.ceil(m)*2+2,h=Math.ceil(f)*2+2;this.userCode=`
      void main() {
        ivec4 coords = getOutputCoords();
        int b = coords[0];
        int d = coords[3];
        int r = coords[1];
        int c = coords[2];

        float accumulator = 0.0;

        const float heightScale = float(${l});
        const float widthScale = float(${u});

        const float invHeightScale = float(${m});
        const float invWidthScale = float(${f});

        const int winHeight = int(${d});
        const int winWidth = int(${h});

        // Compute bounds for where in dy we will look
        float startRLerp = floor(float(r) * invHeightScale);
        int startDyR = int(floor(startRLerp - float(winHeight / 2)));

        float startCLerp = floor(float(c) * invWidthScale);
        int startDyC = int(floor(startCLerp - float(winWidth / 2)));

        // Loop over dy
        for (int dyROffset = 0; dyROffset < winHeight; dyROffset++) {
          int dyR = dyROffset + startDyR;

          // Guard against the window exceeding the bounds of dy
          if (dyR < 0 || dyR >= ${a}) {
            continue;
          }

          for (int dyCOffset = 0; dyCOffset < winWidth; dyCOffset++) {
            int dyC = dyCOffset + startDyC;

            // Guard against the window exceeding the bounds of dy
            if (dyC < 0 || dyC >= ${i}) {
              continue;
            }

            float sourceFracRow =
              float(${c[0]}) *
                (float(dyR) / float(${p[0]}));

            float sourceFracCol =
                float(${c[1]}) *
                  (float(dyC) / float(${p[1]}));

            int sourceNearestRow = int(min(
                float(int(${n}) - 1),
                ${o} ? float(round(sourceFracRow)) :
                                  float(floor(sourceFracRow))));

            int sourceNearestCol = int(min(
                float(int(${s}) - 1),
                ${o} ? float(round(sourceFracCol)) :
                                  float(floor(sourceFracCol))));

            if (r == sourceNearestRow && c == sourceNearestCol) {
              accumulator += getDy(b, dyR, dyC, d);
            }
          }
        }
        // End loop over dy

        setOutput(accumulator);
      }
    `}};function B4(r){let{inputs:t,backend:e,attrs:o}=r,{images:n,dy:s}=t,{alignCorners:a}=o,i=new Ed(s.shape,n.shape,a);return e.runWebGLProgram(i,[s],s.dtype)}var ZE={kernelName:Tp,backendName:"webgl",kernelFunc:B4};var $d=class{constructor(t,e){this.variableNames=["x"];let o=t.length;if(o>4)throw new Error(`WebGL backend: Reverse of rank-${o} tensor is not yet supported`);if(this.outputShape=t,o===1){this.userCode=`
        void main() {
          int coord = getOutputCoords();
          setOutput(getX(${t[0]} - coord - 1));
        }
      `;return}let n=i=>e.indexOf(i)!==-1&&t[i]!==1?`${t[i]} - coords[${i}] - 1`:`coords[${i}]`,s=t.map((i,c)=>n(c)).join(","),a=gt(o);this.userCode=`
      void main() {
        ${a} coords = getOutputCoords();
        setOutput(getX(${s}));
      }
    `}};var Ad=class{constructor(t,e){this.variableNames=["x"],this.packedInputs=!0,this.packedOutput=!0;let o=t.length;if(o>4)throw new Error(`WebGL backend: Reverse of rank-${o} tensor is not yet supported`);this.outputShape=t;let n=Xt("rc",o),s=`${n[o-1]} + 1 < ${this.outputShape[o-1]}`,a=`${n[o-2]} + 1 < ${this.outputShape[o-2]}`,i=gt(o);o===1?this.userCode=`
        void main(){
          int rc = getOutputCoords();
          vec4 result = vec4(0.);
          result.r = getChannel(getX(${t[0]} - rc - 1),
            ${t[0]} - rc - 1);
          if(${s}){
              result.g = getChannel(getX(${t[0]} - (rc  + 1) - 1),
                ${t[0]} - (rc  + 1) - 1);
          }
          setOutput(result);
        }
      `:this.userCode=`
        void main() {
          ${i} rc = getOutputCoords();
          vec4 result = vec4(0.);
          result.r = ${c(n.slice())};
          if(${s}){
            result.g = ${p(n.slice())};
          }
          if(${a}) {
            result.b = ${l(n.slice())};
            if(${s}) {
              result.a = ${u(n.slice())};
            }
          }
          setOutput(result);
        }
    `;function c(d){return m(d)}function p(d){return d[o-1]="("+d[o-1]+" + 1)",m(d)}function l(d){return d[o-2]="("+d[o-2]+" + 1)",m(d)}function u(d){return d[o-1]="("+d[o-1]+" + 1)",d[o-2]="("+d[o-2]+" + 1)",m(d)}function m(d){let h=t.map((b,w)=>f(w,d)),g=h.join(","),x=h.slice(-2).join(",");return`getChannel(getX(${g}), vec2(${x}))`}function f(d,h){return e.indexOf(d)!==-1&&t[d]!==1?`${t[d]} - ${h[d]} - 1`:`${h[d]}`}}};function V4(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{dims:s}=o,a=n.shape.length,i=y.parseAxisParam(s,n.shape);if(a===0)return Yt({inputs:{x:n},backend:e});let c=F().getBool("WEBGL_PACK_ARRAY_OPERATIONS")?new Ad(n.shape,i):new $d(n.shape,i);return e.runWebGLProgram(c,[n],n.dtype)}var QE={kernelName:ka,backendName:"webgl",kernelFunc:V4};var Rd=class{constructor(t,e){this.variableNames=["Image"],this.outputShape=[],this.customUniforms=[{name:"params",type:"vec4"}];let o=t[1],n=t[2];this.outputShape=t;let s="";typeof e=="number"?s=`float outputValue = ${e.toFixed(2)};`:s=`
        vec3 fill = vec3(${e.join(",")});
        float outputValue = fill[coords[3]];`,this.userCode=`
        void main() {
          ivec4 coords = getOutputCoords();
          int x = coords[2];
          int y = coords[1];
          float coordXFloat = (float(x) - params[0]) * params[3] -
            (float(y) - params[1]) * params[2];
          float coordYFloat = (float(x) - params[0]) * params[2] +
            (float(y) - params[1]) * params[3];
          int coordX = int(round(coordXFloat + params[0]));
          int coordY = int(round(coordYFloat + params[1]));
          ${s}
          if(coordX >= 0 && coordX < ${n} && coordY >= 0 && coordY < ${o}) {
            outputValue = getImage(coords[0], coordY, coordX, coords[3]);
          }
          setOutput(outputValue);
        }
    `}};var JE={kernelName:Ja,backendName:"webgl",kernelFunc:({inputs:r,attrs:t,backend:e})=>{let{image:o}=r,{radians:n,fillValue:s,center:a}=t,i=e,c=new Rd(o.shape,s),[p,l]=v.getImageCenter(a,o.shape[1],o.shape[2]),u=[[p,l,Math.sin(n),Math.cos(n)]];return i.runWebGLProgram(c,[o],o.dtype,u)}};var G4=`
  // OpenGL ES does not support round function.
  // The algorithm is based on banker's rounding.
  float base = floor(x);
  if ((x - base) < 0.5) {
    return floor(x);
  } else if ((x - base) > 0.5) {
    return ceil(x);
  } else {
    if (mod(base, 2.0) == 0.0) {
      return base;
    } else {
      return base + 1.0;
    }
  }
`,U4=st({opSnippet:G4}),t$={kernelName:$n,backendName:"webgl",kernelFunc:U4};var z4="return inversesqrt(x);",W4=st({opSnippet:z4,cpuKernelImpl:ON}),e$={kernelName:An,backendName:"webgl",kernelFunc:W4};var sp=class{constructor(t,e,o,n,s,a,i=!0){this.variableNames=["updates","indices","defaultValue"],this.outputShape=a;let c=gt(s.length),p=gt(a.length),l="";o===1?l="i":o===2&&(l="i, j");let u=`getIndices(${l})`,m="";n===1?m="i":n===2&&(m="i, coords[1]");let f=`getUpdates(${m})`,d=e>1?"strides[j]":"strides";this.userCode=`
        ${c} strides = ${c}(${s});

        void main() {
          ${p} coords = getOutputCoords();
          float sum = 0.0;
          bool found = false;
          for (int i = 0; i < ${t}; i++) {
            int flattenedIndex = 0;
            for (int j = 0; j < ${e}; j++) {
              int index = round(${u});
              flattenedIndex += index * ${d};
            }
            if (flattenedIndex == coords[0]) {
              sum += ${f};
              found = true;
            }
          }
          setOutput(mix(getDefaultValue(), sum, float(found)));
        }
      `}};function H4(r){let{inputs:t,backend:e,attrs:o}=r,{indices:n,updates:s}=t,{shape:a}=o,{sliceRank:i,numUpdates:c,sliceSize:p,strides:l,outputSize:u}=v.calculateShapes(s,n,a),m=[u/p,p];if(u===0)return e.makeTensorInfo(a,n.dtype);let f=K({inputs:{x:n},backend:e,attrs:{shape:[c,i]}}),d=K({inputs:{x:s},backend:e,attrs:{shape:[c,p]}}),h=e.makeTensorInfo([],"float32",new Float32Array([0])),g=new sp(c,i,f.shape.length,d.shape.length,l,m),x=e.runWebGLProgram(g,[d,f,h],d.dtype),b=K({inputs:{x},backend:e,attrs:{shape:a}});return e.disposeIntermediateTensorInfo(f),e.disposeIntermediateTensorInfo(d),e.disposeIntermediateTensorInfo(x),e.disposeIntermediateTensorInfo(h),b}var r$={kernelName:Ea,backendName:"webgl",kernelFunc:H4};var Dd=class{constructor(t,e,o,n){this.variableNames=["sortedSequence","values"],this.customUniforms=[{name:"numInputs",type:"int"}],this.outputShape=[t,o];let s="while (left < right) {",a=`for (int i = 0; i < ${Math.ceil(Math.log2(e+1))}; ++i) { if (left >= right) break;`,i=F().getNumber("WEBGL_VERSION")===2?s:a,c=n==="left"?"<":"<=";this.userCode=`
       int findBound(int batch, float value) {
         int left = 0;
         int right = numInputs;
         int mid;
         ${i}
           mid = (left + right) / 2;
           if (getSortedSequence(batch, mid) ${c} value) {
             left = mid + 1;
           } else {
             right = mid;
           }
         }
         return right;
       }

       void main() {
         ivec2 coords = getOutputCoords();
         int batch = coords[0];
         int valueIndex = coords[1];

         float value = getValues(batch, valueIndex);

         setOutput(float(findBound(batch, value)));
       }
     `}};function q4(r){let{inputs:t,backend:e,attrs:o}=r,{sortedSequence:n,values:s}=t,{side:a}=o,i=new Dd(n.shape[0],n.shape[1],s.shape[1],a),c=[[n.shape[1]]];return e.runWebGLProgram(i,[n,s],"int32",c)}var o$={kernelName:$a,backendName:"webgl",kernelFunc:q4};var Fd=class{constructor(t,e,o){this.variableNames=["c","a","b"],this.outputShape=e;let n,s;if(o>4)throw Error(`Where for rank ${o} is not yet supported`);if(o===1)s="resRC",n="resRC";else{let i=["resRC.x","resRC.y","resRC.z","resRC.w"],c=[],p=[];for(let l=0;l<e.length;l++)p.push(`${i[l]}`),l<t&&c.push(`${i[l]}`);n=c.join(),s=p.join()}let a=gt(o);this.userCode=`
      void main() {
        ${a} resRC = getOutputCoords();
        float cVal = getC(${n});
        if (cVal >= 1.0) {
          setOutput(getA(${s}));
        } else {
          setOutput(getB(${s}));
        }
      }
    `}};function K4(r){let{inputs:t,backend:e}=r,{condition:o,t:n,e:s}=t,a=new Fd(o.shape.length,n.shape,n.shape.length);return e.runWebGLProgram(a,[o,n,s],Qt(n.dtype,s.dtype))}var n$={kernelName:Aa,backendName:"webgl",kernelFunc:K4};var j4=`
  // Stable and Attracting Fixed Point (0, 1) for Normalized Weights.
  // see: https://arxiv.org/abs/1706.02515
  float scaleAlpha = ${v.SELU_SCALEALPHA};
  float scale = ${v.SELU_SCALE};
  return (x >= 0.0) ? scale * x : scaleAlpha * (exp(x) - 1.0);
`,X4=st({opSnippet:j4}),s$={kernelName:Rn,backendName:"webgl",kernelFunc:X4};var Y4=Sr+`
  return 1.0 / (1.0 + exp(-1.0 * x));
`,Z4=`
  vec4 result = 1.0 / (1.0 + exp(-1.0 * x));
  bvec4 isNaN = isnan(x);

  result.r = isNaN.r ? x.r : result.r;
  result.g = isNaN.g ? x.g : result.g;
  result.b = isNaN.b ? x.b : result.b;
  result.a = isNaN.a ? x.a : result.a;

  return result;
`,Q4=st({opSnippet:Y4,packedOpSnippet:Z4,cpuKernelImpl:LN}),a$={kernelName:_n,backendName:"webgl",kernelFunc:Q4};var J4=`
  if (isnan(x)) { return 0.0; }
  return sign(x);
`,tW=st({opSnippet:J4}),i$={kernelName:Fn,backendName:"webgl",kernelFunc:tW};var eW=Sr+`
  return sin(x);
`,rW=st({opSnippet:eW}),c$={kernelName:"Sin",backendName:"webgl",kernelFunc:rW};var oW=`
  float e2x = exp(x);
  return (e2x - 1.0 / e2x) / 2.0;
`,nW=st({opSnippet:oW}),p$={kernelName:Dn,backendName:"webgl",kernelFunc:nW};var sW=`
  float epsilon = 1.1920928955078125e-7;
  float threshold = log(epsilon) + 2.0;

  bool too_large = x > -threshold;
  bool too_small = x < threshold;

  float result;
  float exp_x = exp(x);

  if (too_large){
    result = x;
  }
  else if (too_small){
    result = exp_x;
  }
  else{
    result = log(exp_x + 1.0);
  }
  return result;
`,aW=st({opSnippet:sW}),l$={kernelName:On,backendName:"webgl",kernelFunc:aW};var iW=r=>{let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{blockShape:s,paddings:a}=o;y.assert(n.shape.length<=4,()=>"spaceToBatchND for rank > 4 with a WebGL backend not implemented yet");let i=s.reduce((x,b)=>x*b),c=[[0,0]];c.push(...a);for(let x=1+s.length;x<n.shape.length;++x)c.push([0,0]);let p=[],l=Qy({inputs:{x:n},backend:e,attrs:{paddings:c,constantValue:0}}),u=v.getReshaped(l.shape,s,i,!1),m=v.getPermuted(u.length,s.length,!1),f=v.getReshapedPermuted(l.shape,s,i,!1),d=K({inputs:{x:l},backend:e,attrs:{shape:u}}),h=Bt({inputs:{x:d},backend:e,attrs:{perm:m}}),g=K({inputs:{x:h},backend:e,attrs:{shape:f}});return p.push(l),p.push(d),p.push(h),p.forEach(x=>e.disposeIntermediateTensorInfo(x)),g},u$={kernelName:Fa,backendName:"webgl",kernelFunc:iW};function cW(r){let{inputs:t,backend:e}=r,{indices:o,values:n,denseShape:s,defaultValue:a}=t;if(s.shape.length!==1)throw new Error(`Dense shape must be a vector, saw:
         ${s.shape}`);if(o.shape.length!==2)throw new Error(`Indices must be a matrix, saw:
         ${o.shape}`);if(n.shape.length!==1)throw new Error(`Values must be a vector, saw:
         ${n.shape}`);if(a.shape.length!==0)throw new Error(`Default value must be a scalar, saw:
        ${a.shape}`);let i=e.readSync(o.dataId),c=e.readSync(n.dataId),p=e.readSync(s.dataId),l=e.readSync(a.dataId)[0],[u,m,f,d,h]=BN(i,o.shape,o.dtype,c,n.dtype,p,l);return[e.makeTensorInfo(m,o.dtype,u),e.makeTensorInfo([m[0]],n.dtype,f),e.makeTensorInfo([d.length],"bool",new Uint8Array(d.map(g=>Number(g)))),e.makeTensorInfo([h.length],o.dtype,new Int32Array(h))]}var m$={kernelName:Pa,backendName:"webgl",kernelFunc:cW};function pW(r){let{inputs:t,backend:e}=r,{inputIndices:o,inputShape:n,newShape:s}=t;if(o.shape.length!==2)throw new Error(`Input indices should be a matrix but received shape ${o.shape}`);if(n.shape.length!==1)throw new Error(`Input shape should be a vector but received shape ${n.shape}`);if(s.shape.length!==1)throw new Error(`Target shape should be a vector but received shape ${s.shape}`);let a=Array.from(e.readSync(n.dataId)),i=e.readSync(o.dataId),c=Array.from(e.readSync(s.dataId)),[p,l,u]=VN(i,o.shape,o.dtype,a,c);return[e.makeTensorInfo(l,o.dtype,p),e.makeTensorInfo([u.length],s.dtype,new Int32Array(u))]}var f$={kernelName:La,backendName:"webgl",kernelFunc:pW};function lW(r){let{inputs:t,backend:e}=r,{data:o,indices:n,segmentIds:s}=t;if(o.shape.length<1)throw new Error("Data should be at least 1 dimensional but received scalar");if(n.shape.length!==1)throw new Error(`Indices should be a vector but received shape
              ${n.shape}`);if(s.shape.length!==1)throw new Error(`Segment ids should be a vector but received shape
              ${s.shape}`);let a=e.readSync(o.dataId),i=e.readSync(n.dataId),c=e.readSync(s.dataId),[p,l]=gf(a,o.shape,o.dtype,i,c,!0);return e.makeTensorInfo(l,o.dtype,p)}var d$={kernelName:Ma,backendName:"webgl",kernelFunc:lW};function uW(r){let{inputs:t,backend:e}=r,{data:o,indices:n,segmentIds:s}=t;if(o.shape.length<1)throw new Error("Data should be at least 1 dimensional but received scalar");if(n.shape.length!==1)throw new Error(`Indices should be a vector but received shape
             ${n.shape}`);if(s.shape.length!==1)throw new Error(`Segment ids should be a vector but received shape
             ${s.shape}`);let a=e.readSync(o.dataId),i=e.readSync(n.dataId),c=e.readSync(s.dataId),[p,l]=gf(a,o.shape,o.dtype,i,c);return e.makeTensorInfo(l,o.dtype,p)}var h$={kernelName:Ba,backendName:"webgl",kernelFunc:uW};function mW(r){let{inputs:t,backend:e,attrs:o}=r,{sparseIndices:n,sparseValues:s,defaultValue:a}=t,{outputShape:i}=o,{sliceRank:c,numUpdates:p,sliceSize:l,strides:u,outputSize:m}=v.calculateShapes(s,n,i),f=!1;if(s.dtype==="string"){let x=e.bufferSync(n),b=e.bufferSync(s),w=y.decodeString(e.readSync(a.dataId)[0]),I=PN(x,b,i,m,l,p,c,u,w,f);return e.makeTensorInfo(i,I.dtype,I.values)}let d=new sp(p,c,n.shape.length,s.shape.length,u,[m,1],f),h=e.runWebGLProgram(d,[s,n,a],s.dtype),g=K({inputs:{x:h},backend:e,attrs:{shape:i}});return e.disposeIntermediateTensorInfo(h),g}var g$={kernelName:Va,backendName:"webgl",kernelFunc:mW};function fW(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{numOrSizeSplits:s,axis:a}=o,i=y.parseAxisParam(a,n.shape)[0],c=v.prepareSplitSize(n,s,i),p=n.shape.length,l=new Array(p).fill(0),u=n.shape.slice();return c.map(m=>{let f=[...u];f[i]=m;let d=Hr({inputs:{x:n},backend:e,attrs:{begin:l,size:f}});return l[i]+=m,d})}var x$={kernelName:_a,backendName:"webgl",kernelFunc:fW};var y$="return sqrt(x);",dW=st({opSnippet:y$,packedOpSnippet:y$,cpuKernelImpl:GN}),b$={kernelName:Pn,backendName:"webgl",kernelFunc:dW};var hW="return x * x;",gW=st({opSnippet:hW}),C$={kernelName:Ip,backendName:"webgl",kernelFunc:gW};var T$="return (a - b) * (a - b);",xW=Ft({opSnippet:T$,packedOpSnippet:T$}),w$={kernelName:Ln,backendName:"webgl",kernelFunc:xW};function yW({inputs:r,attrs:t,backend:e}){let{x:o}=r,n=ae+`
    return x > 0.0 ? 1.0 : float(${t.alpha});
  `,s=new $e(o.shape,n);return e.runWebGLProgram(s,[o],o.dtype)}var I$={kernelName:Bn,backendName:"webgl",kernelFunc:yW};var _d=class{constructor(t,e,o){this.variableNames=["x"],this.outputShape=o;let n=o.length,s=gt(o.length),a=gt(o.length),i="";if(n===1)i="coords * strides + begin";else{let c=0;i=o.map((p,l)=>(c++,o.length===1?`coords * strides[${l}] + begin[${l}]`:`coords[${c-1}] * strides[${l}] + begin[${l}]`)).join(",")}this.userCode=`
      ${s} begin = ${s}(${t});
      ${s} strides = ${s}(${e});

      void main() {
        ${a} coords = getOutputCoords();
        setOutput(getX(${i}));
      }
    `}};function bW(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{begin:s,end:a,strides:i,beginMask:c,endMask:p,ellipsisMask:l,newAxisMask:u,shrinkAxisMask:m}=o,{finalShapeSparse:f,finalShape:d,isIdentity:h,sliceDim0:g,isSimpleSlice:x,begin:b,end:w,strides:I}=ce.sliceInfo(n.shape,s,a,i,c,p,l,u,m),k;if(h)k=K({inputs:{x:n},backend:e,attrs:{shape:d}});else if(g||x){y.assert(n.shape.length>=1,()=>`Input must have rank at least 1, got: ${n.shape.length}`);let R=ce.computeOutShape(b,w,I),D=Hr({inputs:{x:n},backend:e,attrs:{begin:b,size:R}});k=K({inputs:{x:D},backend:e,attrs:{shape:d}}),e.disposeIntermediateTensorInfo(D)}else if(e.shouldExecuteOnCPU([n])){let D=e.readSync(n.dataId),_=rt(n.shape,n.dtype,D),O=UN(f,_,I,b);k=e.makeTensorInfo(d,n.dtype,O.values)}else{let D=new _d(b,I,f);k=e.runWebGLProgram(D,[n],n.dtype)}let $=K({inputs:{x:k},backend:e,attrs:{shape:d}});return e.disposeIntermediateTensorInfo(k),$}var S$={kernelName:Ga,backendName:"webgl",kernelFunc:bW};function CW(r){let{inputs:t,backend:e,attrs:o}=r,{separator:n,nGramWidths:s,leftPad:a,rightPad:i,padWidth:c,preserveShortSequences:p}=o,{data:l,dataSplits:u}=t,m=e.readSync(l.dataId),f=e.readSync(u.dataId),[d,h]=zN(m,f,n,s,a,i,c,p);return[e.makeTensorInfo([d.length],"string",d),e.makeTensorInfo(u.shape,"int32",h)]}var v$={kernelName:Ua,backendName:"webgl",kernelFunc:CW};function TW(r){let{inputs:t,backend:e,attrs:o}=r,{skipEmpty:n}=o,{input:s,delimiter:a}=t;if(s.dtype!=="string")throw new Error("Input must be of datatype string");if(s.shape.length!==1)throw new Error(`Input must be a vector, got shape: ${s.shape}`);if(a.shape.length!==0)throw new Error(`Delimiter must be a scalar, got shape: ${a.shape}`);let i=e.readSync(s.dataId),c=e.readSync(a.dataId)[0],[p,l,u]=WN(i,c,n),m=l.length;return[e.makeTensorInfo([m,2],"int32",p),e.makeTensorInfo([m],"string",l),e.makeTensorInfo([2],"int32",new Int32Array(u))]}var N$={kernelName:za,backendName:"webgl",kernelFunc:TW};function wW(r){let{inputs:t,backend:e,attrs:o}=r,{numBuckets:n}=o,{input:s}=t;if(s.dtype!=="string")throw new Error("Input must be of datatype string");if(n<=0)throw new Error("Number of buckets must be at least 1");let a=e.readSync(s.dataId),i=HN(a,n);return e.makeTensorInfo(s.shape,"int32",i)}var k$={kernelName:Wa,backendName:"webgl",kernelFunc:wW};var IW="return tan(x);",SW=st({opSnippet:IW}),E$={kernelName:"Tan",backendName:"webgl",kernelFunc:SW};var vW=`
  float e2x = exp(-2.0 * abs(x));
  return sign(x) * (1.0 - e2x) / (1.0 + e2x);
`,NW=st({opSnippet:vW}),$$={kernelName:Mn,backendName:"webgl",kernelFunc:NW};var Od=class{constructor(t,e){this.variableNames=["A"];let o=new Array(t.length);for(let a=0;a<o.length;a++)o[a]=t[a]*e[a];this.outputShape=o,this.rank=o.length;let n=gt(this.rank),s=kW(t);this.userCode=`
      void main() {
        ${n} resRC = getOutputCoords();
        setOutput(getA(${s}));
      }
    `}};function kW(r){let t=r.length;if(t>5)throw Error(`Tile for rank ${t} is not yet supported`);if(t===1)return`imod(resRC, ${r[0]})`;let e=["resRC.x","resRC.y","resRC.z","resRC.w","resRC.u"],o=[];for(let n=0;n<r.length;n++)o.push(`imod(${e[n]}, ${r[n]})`);return o.join()}function tb(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{reps:s}=o;if(n.dtype==="string"||n.shape.length>5){let c=e.readSync(n.dataId),p=n.dtype==="string"?c.map(m=>y.decodeString(m)):c,l=rt(n.shape,n.dtype,p),u=KN(l,s);return e.makeTensorInfo(u.shape,u.dtype,u.values)}let a=new Od(n.shape,s);return e.runWebGLProgram(a,[n],n.dtype)}var A$={kernelName:wo,backendName:"webgl",kernelFunc:tb};var Pd=class{constructor(t){this.variableNames=["x","indices"],this.customUniforms=[{name:"n",type:"int"},{name:"firstPass",type:"int"},{name:"negativeInf",type:"float"},{name:"dir",type:"int"},{name:"inc",type:"int"}],this.outputShape=t,this.userCode=`
       void main() {
         ivec2 coords = getOutputCoords();
         int batch = coords[0];
         int elemIdx = coords[1];

         // We compare elements pair-wise within a group of size 2 * inc.
         // The comparing rule for each group alternates between ascending
         // and descending. Within each group, we compare each pair at
         // positions i and i+inc. To decide whether an element at position i
         // is x0 or x1, we mod it by 2 * inc, if the result is smaller than
         // inc, it is in the first half of the group, we denote it as x0,
         // otherwise we denote it as x1.
         // For example, as shown in the Bitonic top K paper referenced above,
         // Figure5(a) shows that element[1] is in the
         // second half of the group when group size is 2, but it is in the
         // first half of the group when group size is 4.

         bool isFirstInPair = imod(elemIdx, 2 * inc) < inc;
         int i = isFirstInPair ? elemIdx : elemIdx - inc;

         int i0 = firstPass == 1 ? i : int(getIndices(batch, i));
         int i1 = firstPass == 1 ? i + inc : int(getIndices(batch, i + inc));
         float x0 = i0 < n ? getX(batch, i0) : negativeInf;
         float x1 = i1 < n ? getX(batch, i1) : negativeInf;

         // Denotes which direction indices are in (ascending or descending).
         bool reverse = imod(elemIdx, 2 * dir) >= dir;
         bool isGreater = x0 > x1 || (x0 == x1 && i1 > i0);
         if (reverse == isGreater) { // Elements in opposite order of direction
           int iTemp = i0;
           i0 = i1;
           i1 = iTemp;
         }
         if (isFirstInPair) {
            setOutput(float(i0));
         } else {
            setOutput(float(i1));
         }
       }
     `}},Ld=class{constructor(t){this.variableNames=["x","indices"],this.customUniforms=[{name:"n",type:"int"},{name:"firstPass",type:"int"},{name:"k",type:"int"}],this.outputShape=t,this.userCode=`
    void main() {
         // Takes max of indices (0, k), (1, k + 1), (2, k + 2) ...
         ivec2 coords = getOutputCoords();
         int batch = coords[0];
         int elemIdx = coords[1];

         // The output size is half of the previous size.
         // If the previous sequence is | | | | _ _ _ _  | | | |  _ _ _ _ (k=4),
         // we only need to output the indices at positions |, the indices at
         // positions _ can be thrown away, see Figure5(b) After Phase 2
         // (Merge phase) in the Bitonic Top K paper referenced above.
         // For example, the paper shows we only need to output the orange bars.
         // The output sequence should look like this | | | | | | | |.
         // Because the sequence is halved, to map the output index back
         // to the previous sequence to find the corresponding value,
         // we need to double the index. When we double the index,
         // we basically interpolate a position, so 2i looks like
         // | _ | _ | _ | _ | _ | _ | _. We move the | to the first k position
         // of each 2k positions by - elemIdx % k. E.g. for output at
         // index 4,5,6,7, we want to get the corresponding element at
         // original index 8,9,10,11, for output at index 8,9,10,11,
         // we want to get the corresponding element at original index
         // 16,17,18,19, so on and so forth.

         int i = elemIdx < k ? elemIdx : (elemIdx * 2 - imod(elemIdx, k));
         int i0 = firstPass == 1 ? i : int(getIndices(batch, i));
         int i1 = firstPass == 1 ? i + k : int(getIndices(batch, i + k));

         float x0 = getX(batch, i0);
         float x1 = i1 < n ? getX(batch, i1) : x0;

         setOutput(x0 >= x1 ? float(i0) : float(i1));
       }
     `}};function tc(r,t){t!==null&&r.disposeIntermediateTensorInfo(t)}function R$(r){let t=1;for(;t<r;)t*=2;return t}function EW(r){let{inputs:t,backend:e,attrs:o}=r,{x:n}=t,{k:s,sorted:a}=o,i=F().getNumber("TOPK_LAST_DIM_CPU_HANDOFF_SIZE_THRESHOLD"),c=F().getNumber("TOPK_K_CPU_HANDOFF_THRESHOLD"),p=n.shape,l=p[p.length-1];if(e.shouldExecuteOnCPU([n])||l<i||s>c){let O=e.readSync(n.dataId),[L,M]=jN(O,p,n.dtype,s,a);return[e.makeTensorInfo(L.shape,L.dtype,L.values),e.makeTensorInfo(M.shape,M.dtype,M.values)]}if(s===0)return p[p.length-1]=0,[e.makeTensorInfo(p,n.dtype,[]),e.makeTensorInfo(p,"int32",[])];if(l===1)return[n,Uo({attrs:{shape:p,dtype:"int32",value:0},backend:e})];let u=e.texData.get(n.dataId),m=u!==null&&u.isPacked,f=m?e.unpackTensor(n):n,h=y.sizeFromShape(p)/l,g=K({inputs:{x:f},attrs:{shape:[h,l]},backend:e});m&&tc(e,f);let x=R$(s),b=R$(l),w=null,I=()=>w===null?[g,g]:[g,w],k=(O,L,M)=>{let B=I(),G=new Pd(M),W=[[l],[w===null?1:0],[Number.NEGATIVE_INFINITY],[O],[L]],H=w;w=e.runWebGLProgram(G,B,"int32",W),tc(e,H)};for(let O=1;O<x;O*=2){let L=O*2;for(let M=O;M>=1;M/=2)k(L,M,[h,b])}for(let O=b;O>x;O/=2){let L=I(),M=new Ld([h,O/2]),G=[[l],[w===null?1:0],[x]],V=w;w=e.runWebGLProgram(M,L,"int32",G),tc(e,V);let W=x/2,H=W*2;for(let U=W;U>=1;U/=2)k(H,U,w.shape)}let $=w;w=Hr({inputs:{x:w},backend:e,attrs:{begin:0,size:[h,s]}}),tc(e,$);let R=Ky({inputs:{x:g,indices:w},backend:e,attrs:{axis:1,batchDims:1}});tc(e,g);let D=p.slice(0,-1);D.push(s),$=w,w=K({inputs:{x:w},attrs:{shape:D},backend:e}),tc(e,$);let _=R;return R=K({inputs:{x:R},attrs:{shape:D},backend:e}),tc(e,_),[R,w]}var D$={kernelName:Ka,backendName:"webgl",kernelFunc:EW};var Md=class{constructor(t,e,o,n,s,a){this.variableNames=["Image","Transforms"],this.outputShape=a;let i=o==="nearest"?1:2,c;switch(n){case"constant":c=1;break;case"reflect":c=2;break;case"wrap":c=3;break;case"nearest":c=4;break;default:c=1;break}this.userCode=`
            float mapCoord(float outCoord, float len) {
              float inCoord = outCoord;
              if(${c} == 2) {
                if (inCoord < 0.0) {
                  if (len <= 1.0) {
                    inCoord = 0.0;
                  } else {
                    float sz2 = 2.0 * len;
                    if (inCoord < sz2) {
                      inCoord = sz2 * float(int(float(-inCoord / sz2))) +
                      inCoord;
                    }
                    inCoord = inCoord < -len ? inCoord + sz2 : -inCoord - 1.0;
                  }
                } else if (inCoord > len - 1.0) {
                  if (len <= 1.0) {
                    inCoord = 0.0;
                  } else {
                    float sz2 = 2.0 * len;
                    inCoord -= sz2 * float(int(float(inCoord / sz2)));
                    if (inCoord >= len) {
                      inCoord = sz2 - inCoord - 1.0;
                    }
                  }
                }
                return clamp(inCoord, 0.0, len - 1.0);
              } else if (${c} == 3) {
                if (inCoord < 0.0) {
                  if (len <= 1.0) {
                    inCoord = 0.0;
                  } else {
                    float sz = len - 1.0;
                    inCoord += len * (float(int(float(-inCoord / sz))) + 1.0);
                  }
                } else if (inCoord > len - 1.0) {
                  if (len <= 1.0) {
                    inCoord = 0.0;
                  } else {
                    float sz = len - 1.0;
                    inCoord -= len * float(int(float(inCoord / sz)));
                  }
                }
                return clamp(inCoord, 0.0, len - 1.0);
              } else if (${c} == 4) {
                return clamp(outCoord, 0.0, len - 1.0);
              } else {
                return outCoord;
              }
            }

            float readWithFillValue(int batch, int coordY, int coordX,
              int channel) {
              float outputValue;
              if (0 <= coordY && coordY < ${t} && 0 <= coordX && coordX < ${e}) {
                  outputValue = getImage(batch, coordY, coordX, channel);
              } else {
                outputValue = float(${s});
              }
              return outputValue;
            }

            void main() {
              ivec4 coords = getOutputCoords();
              float outputValue;
              int batch = coords[0];
              int x = coords[2];
              int y = coords[1];
              int channel = coords[3];
              float xf = float(x);
              float yf = float(y);
              float a1 = getTransforms(batch, 0);
              float a2 = getTransforms(batch, 1);
              float a3 = getTransforms(batch, 2);
              float b1 = getTransforms(batch, 3);
              float b2 = getTransforms(batch, 4);
              float b3 = getTransforms(batch, 5);
              float c1 = getTransforms(batch, 6);
              float c2 = getTransforms(batch, 7);
              float projection = c1 * xf + c2 * yf + 1.0;
              if (projection == 0.0) {
                outputValue = float(${s});
              } else {
                float inX = (a1 * xf + a2 * yf + a3) / projection;
                float inY = (b1 * xf + b2 * yf + b3) / projection;
                float mapX = mapCoord(inX, float(${e}));
                float mapY = mapCoord(inY, float(${t}));

                if (${i} == 1) {
                  int coordY = int(round(mapY));
                  int coordX = int(round(mapX));
                  outputValue = readWithFillValue(batch, coordY, coordX,
                    channel);
                } else {
                  float yFloor = floor(mapY);
                  float xFloor = floor(mapX);
                  float yCeil = yFloor + 1.0;
                  float xCeil = xFloor + 1.0;
                  float valueYFloor = (xCeil - mapX) *
                  readWithFillValue(batch, int(yFloor), int(xFloor), channel) +
                  (mapX - xFloor) *
                  readWithFillValue(batch, int(yFloor), int(xCeil), channel);
                  float valueYCeil = (xCeil - mapX) *
                  readWithFillValue(batch, int(yCeil), int(xFloor), channel) +
                  (mapX - xFloor) *
                  readWithFillValue(batch, int(yCeil), int(xCeil), channel);
                  outputValue = (yCeil - mapY) * valueYFloor +
                  (mapY - yFloor) * valueYCeil;
                }
              }
              setOutput(outputValue);
            }
        `}};function $W(r){let{inputs:t,backend:e,attrs:o}=r,{image:n,transforms:s}=t,{interpolation:a,fillMode:i,fillValue:c,outputShape:p}=o,[l,u,m,f]=n.shape,[d,h]=p??[u,m],g=[l,d,h,f],x=new Md(u,m,a,i,c,g);return e.runWebGLProgram(x,[n,s],"float32")}var F$={kernelName:ja,backendName:"webgl",kernelFunc:$W};function AW(r){let{inputs:t,attrs:e,backend:o}=r,{axis:n}=e,{x:s}=t;fo(s,"unique"),console.warn("WARNING: ","UI might be locked temporarily as data is being downloaded");let a=o.readSync(s.dataId),{outputValues:i,outputShape:c,indices:p}=XN(a,n,s.shape,s.dtype);return[o.makeTensorInfo(c,s.dtype,i),o.makeTensorInfo([p.length],"int32",p)]}var _$={kernelName:Xa,backendName:"webgl",kernelFunc:AW};function RW(r){let{inputs:t,backend:e,attrs:o}=r,{value:n}=t,{axis:s}=o;s<0&&(s+=n.shape.length);let a=n,i=a.shape.length,c=n.shape[s],p=new Array(i-1),l=0;for(let h=0;h<i;h++)h!==s&&(p[l++]=a.shape[h]);let u=[],m=new Array(i).fill(0),f=a.shape.slice();f[s]=1;let d=new Array(c);for(let h=0;h<d.length;h++){m[s]=h;let g=Hr({inputs:{x:a},backend:e,attrs:{begin:m,size:f}}),x=K({inputs:{x:g},backend:e,attrs:{shape:p}});d[h]=x,u.push(g)}return u.forEach(h=>e.disposeIntermediateTensorInfo(h)),d}var O$={kernelName:Ya,backendName:"webgl",kernelFunc:RW};var Bd=class{constructor(t,e){this.variableNames=["x","segmentIds"];let o=t.windowSize,n=t.batchSize,s=t.inSize,a=t.numSegments,i=a*Math.ceil(s/o);this.outputShape=[n,i];let c="0.0",p="sumValue",l=Math.floor(o/4)*4,u=o%4,m=`
        sumValue += dot(values, segFilter);
    `,f="";s%o>0&&(f=`
        if (inIdx < 0 || inIdx >= ${s}) {
          return initializationValue;
        }
      `);let d="";s%o>0&&(d=`
        if (inIdx < 0 || inIdx >= ${s}) {
          return -1.0;
        }
      `),this.userCode=`
      const float initializationValue = ${c};

      float getValue(int batch, int inIdx) {
        ${f}
        return getX(batch, inIdx);
      }

      float getSegmentIdAtIndex(int inIdx) {
        ${d}
        return getSegmentIds(inIdx);
      }

      void main() {
        ivec2 coords = getOutputCoords();
        int batch = coords[0];
        int outIdx = coords[1];
        int inOffset = int(floor(float(outIdx) / float(
          ${a})) * float(${o}));
        int currentSeg = int(mod(float(outIdx), float(${a})));

        float sumValue = 0.0;

        for (int i = 0; i < ${l}; i += 4) {
          int inIdx = inOffset + i;
          vec4 values = vec4(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            getValue(batch, inIdx + 2),
            getValue(batch, inIdx + 3)
          );

          vec4 segFilter = vec4(
            int(getSegmentIdAtIndex(inIdx)) == currentSeg ? 1 : 0,
            int(getSegmentIdAtIndex(inIdx + 1)) == currentSeg ? 1 : 0,
            int(getSegmentIdAtIndex(inIdx + 2)) == currentSeg ? 1 : 0,
            int(getSegmentIdAtIndex(inIdx + 3)) == currentSeg ? 1 : 0
          );

          ${m}
        }

        int inIdx = inOffset + ${l};
        if (${u===1}) {
          vec4 values = vec4(
            getValue(batch, inIdx),
            initializationValue,
            initializationValue,
            initializationValue
          );

          int inIdxSeg = int(getSegmentIdAtIndex(inIdx));

          vec4 segFilter = vec4(
            int(getSegmentIdAtIndex(inIdx)) == currentSeg ? 1 : 0,
            0,
            0,
            0
          );

          ${m}
        } else if (${u===2}) {
          vec4 values = vec4(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            initializationValue,
            initializationValue
          );

          vec4 segFilter = vec4(
            int(getSegmentIdAtIndex(inIdx)) == currentSeg ? 1 : 0,
            int(getSegmentIdAtIndex(inIdx + 1)) == currentSeg ? 1 : 0,
              0,
              0
          );

          ${m}
        } else if (${u===3}) {
          vec4 values = vec4(
            getValue(batch, inIdx),
            getValue(batch, inIdx + 1),
            getValue(batch, inIdx + 2),
            initializationValue
          );

          vec4 segFilter = vec4(
            int(getSegmentIdAtIndex(inIdx)) == currentSeg ? 1 : 0,
            int(getSegmentIdAtIndex(inIdx + 1)) == currentSeg ? 1 : 0,
            int(getSegmentIdAtIndex(inIdx + 2)) == currentSeg ? 1 : 0,
            0
          );

          ${m}
        }
        setOutput(${p});
      }
    `}};function DW(r){let{inputs:t,backend:e,attrs:o}=r,{x:n,segmentIds:s}=t,{numSegments:a}=o,i=n.shape.length,c=[],p=0,l=v.getAxesPermutation([p],i),u=n;l!=null&&(u=Bt({inputs:{x:n},backend:e,attrs:{perm:l}}),c.push(u),p=v.getInnerMostAxes(1,i)[0]);let m=v.segment_util.computeOutShape(u.shape,p,a),f=y.sizeFromShape([u.shape[p]]),d=K({inputs:{x:u},backend:e,attrs:{shape:[-1,f]}});c.push(d);let h=Hn(n.dtype),g=(I,k,$,R,D)=>{let _=I.shape[0],O=I.shape[1],L=v.segment_util.segOpComputeOptimalWindowSize(O,D),M={windowSize:L,inSize:O,batchSize:_,numSegments:D},B=new Bd(M,k),G=e.compileAndRun(B,[I,$],R);if(c.push(G),G.shape[1]===D)return G;let V=Jy({backend:e,attrs:{start:0,stop:D,step:1,dtype:"float32"}}),W=tb({inputs:{x:V},backend:e,attrs:{reps:[O/L]}});return c.push(V),c.push(W),g(G,k,W,R,D)},x=g(d,"unsortedSegmentSum",s,h,a),b=K({inputs:{x},backend:e,attrs:{shape:m}}),w=b;if(l!=null){c.push(b);let I=v.getUndoAxesPermutation(l);w=Bt({inputs:{x:w},backend:e,attrs:{perm:I}})}return c.forEach(I=>e.disposeIntermediateTensorInfo(I)),w}var P$={kernelName:Za,backendName:"webgl",kernelFunc:DW};var FW=[w1,S1,v1,N1,E1,$1,A1,R1,_1,O1,P1,L1,M1,B1,V1,G1,U1,z1,W1,H1,q1,j1,X1,Y1,tk,rk,ok,m1,sk,ik,ck,pk,lk,uk,mk,fk,dk,hk,gk,bk,Ck,Tk,wk,Ik,Sk,vk,Nk,kk,Ek,$k,Ak,Rk,Dk,Fk,_k,Pk,Lk,Mk,Bk,Gk,Uk,zk,Wk,Hk,qk,Kk,jk,Xk,u1,Yk,ak,Zk,Qk,Jk,f1,tE,eE,rE,oE,nE,sE,aE,iE,cE,pE,uE,mE,fE,dE,hE,gE,yE,CE,TE,wE,IE,SE,$E,g1,AE,RE,DE,FE,Z1,_E,LE,ME,BE,VE,d1,GE,UE,zE,WE,Q1,vE,HE,qE,KE,y1,jE,XE,YE,ZE,QE,JE,t$,e$,r$,o$,n$,s$,a$,i$,c$,p$,K1,EE,l$,u$,m$,f$,d$,h$,g$,x$,b$,C$,w$,I$,S$,v$,N$,k$,kE,C1,E$,$$,A$,D$,F$,T1,_$,O$,P$,OE];for(let r of FW)yc(r);var rb={contours:"Identity",onsets:"Identity_2",frames:"Identity_1"},L$=1,du=22050,ob=256,_W=Math.floor(du/ob),OW=2,B$=du*OW-ob,V$=30,M$=Math.floor(V$/2),Vd=V$*ob,PW=B$-Vd,Gd=class{constructor(t){if(Vd%2!==0)throw new Error(`OVERLAP_LENGTH_FRAMES is not divisible by 2! Is ${Vd}`);this.model=typeof t=="string"?Am(t):t}adjustNoteStart(t,e){return t.map(o=>({startTimeSeconds:o.startTimeSeconds+e,durationSeconds:o.durationSeconds,pitch_midi:o.pitchMidi,amplitude:o.amplitude,pitchBends:o.pitchBends}))}async evaluateSingleFrame(t,e){let o=await this.model,n=yt(t,e,1),s=o.execute(n,[rb.frames,rb.onsets,rb.contours]);return[s[0],s[1],s[2]]}async prepareData(t){let e=Jp([Ve([Math.floor(Vd/2)],"float32"),fe(t)]);return[Xe(lm.frame(e,B$,PW,!0,0),-1),t.length]}unwrapOutput(t){let e=t;e=t.slice([0,M$,0],[-1,t.shape[1]-2*M$,-1]);let o=e.shape;return e.reshape([o[0]*o[1],o[2]])}async evaluateModel(t,e,o){let n;if(t instanceof Float32Array)n=t;else{if(t.sampleRate!==du)throw new Error(`Input audio buffer is not at correct sample rate! Is ${t.sampleRate}. Should be ${du}`);if(t.numberOfChannels!==L$)throw new Error(`Input audio buffer is not mono! Number of channels is ${t.numberOfChannels}. Should be ${L$}`);n=t.getChannelData(0)}let[s,a]=await this.prepareData(n),i=Math.floor(a*(_W/du)),c=0;for(let p=0;p<s.shape[0];++p){o(p/s.shape[0]);let[l,u,m]=await this.evaluateSingleFrame(s,p),f=this.unwrapOutput(l),d=this.unwrapOutput(u),h=this.unwrapOutput(m),g=f.shape[0];if(!(c>=i)){if(g+c>=i){let x=i-c;f=f.slice([0,0],[x,-1]),d=d.slice([0,0],[x,-1]),h=h.slice([0,0],[x,-1])}c+=g,e(await f.array(),await d.array(),await h.array())}}o(1)}};var AH=xu(s2()),Qd=21,Jd=22050,i2=2,hu=256,RH=Math.floor(Jd/hu),c2=RH*i2,DH=Jd*i2-hu,FH=hu/Jd*(c2-DH/hu)+.0018,hb=87,_H=3;var OH=88,yae=OH*_H,a2=r=>12*(Math.log2(r)-Math.log2(440))+69;var gb=r=>r*hu/Jd-FH*Math.floor(r/c2);function PH(r){return r.length===0?null:r.reduce((t,e,o)=>r[t]>e?t:o,-1)}function LH(r,t){let e=[],o=[];for(let n=0;n<r.length;n++)for(let s=0;s<r[n].length;s++)r[n][s]>t&&(e.push(n),o.push(s));return[e,o]}function MH(r){let[t,e,o]=r.reduce((a,i)=>{let[c,p,l]=i.reduce((u,m)=>[u[0]+m,u[1]+m*m,u[2]+1],[0,0,0]);return[a[0]+c,a[1]+p,a[2]+l]},[0,0,0]),n=t/o,s=Math.sqrt(1/(o-1)*(e-t*t/o));return[n,s]}function xb(r){return r.reduce((t,e)=>Math.max(t,...e),0)}function BH(r){let t=r[0].map(e=>e.slice());for(let e=1;e<r.length;++e)for(let o=0;o<r[0].length;++o)for(let n=0;n<r[0][0].length;++n)t[o][n]=Math.min(t[o][n],r[e][o][n]);return t}function VH(r,t=1){let e=[];for(let o=0;o<r[0].length;++o)for(let n=0;n<r.length;++n){let s=!0;for(let a=Math.max(0,n-t);s&&a<=Math.min(r.length-1,n+t);++a)a!==n&&(s=s&&r[n][o]>r[a][o]);s&&e.push([n,o])}return e}function GH(r){let t=r[0].map(e=>e.slice());for(let e=1;e<r.length;++e)for(let o=0;o<r[0].length;++o)for(let n=0;n<r[0][0].length;++n)t[o][n]=Math.max(t[o][n],r[e][o][n]);return t}function UH(r){return r!==null}function zH(r,t,e,o){if(e){let n=a2(e)-Qd;for(let s=0;s<r.length;s++)r[s].fill(0,n);for(let s=0;s<t.length;s++)t[s].fill(0,n)}if(o){let n=a2(o)-Qd;for(let s=0;s<r.length;s++)r[s].fill(0,0,n);for(let s=0;s<t.length;s++)t[s].fill(0,0,n)}}function WH(r,t,e=2){let o=Array.from(Array(e).keys()).map(i=>i+1).map(i=>{let c=Array(i).fill(Array(t[0].length).fill(0)).concat(t),p=c.slice(i),l=c.slice(0,-i);if(p.length!==l.length)throw new Error(`nPlus length !== minusN length: ${p.length} !== ${l.length}`);return p.map((u,m)=>u.map((f,d)=>f-l[m][d]))}),n=BH(o);n=n.map(i=>i.map(c=>Math.max(c,0))),n=n.map((i,c)=>c<e?i.fill(0):i);let s=xb(r),a=xb(n);return n=n.map(i=>i.map(c=>s*c/a)),GH([r,n])}function p2(r,t,e=.5,o=.3,n=5,s=!0,a=null,i=null,c=!0,p=11){let l=o;if(l===null){let[b,w]=MH(r);l=b+w}let u=r.length;zH(t,r,a,i);let m=t;s&&(m=WH(t,r));let f=m.map(b=>b.map(()=>0));VH(m).forEach(([b,w])=>{f[b][w]=m[b][w]});let[d,h]=LH(f,e);d.reverse(),h.reverse();let g=r.map(b=>b.slice()),x=d.map((b,w)=>{let I=h[w];if(b>=u-1)return null;let k=b+1,$=0;for(;k<u-1&&$<p;)g[k][I]<l?$+=1:$=0,k+=1;if(k-=$,k-b<=n)return null;for(let D=b;D<k;++D)g[D][I]=0,I<hb&&(g[D][I+1]=0),I>0&&(g[D][I-1]=0);let R=r.slice(b,k).reduce((D,_)=>D+_[I],0)/(k-b);return{startFrame:b,durationFrames:k-b,pitchMidi:I+Qd,amplitude:R}}).filter(UH);if(c===!0)for(;xb(g)>l;){let[b,w]=g.reduce((_,O,L)=>{let M=PH(O);return O[M]>g[_[0]][_[1]]?[L,M]:_},[0,0]);g[b][w]=0;let I=b+1,k=0;for(;I<u-1&&k<p;)g[I][w]<l?k+=1:k=0,g[I][w]=0,w<hb&&(g[I][w+1]=0),w>0&&(g[I][w-1]=0),I+=1;let $=I-1-k;for(I=b-1,k=0;I>0&&k<p;)g[I][w]<l?k+=1:k=0,g[I][w]=0,w<hb&&(g[I][w+1]=0),w>0&&(g[I][w-1]=0),I-=1;let R=I+1+k;if(R<0)throw new Error(`iStart is not positive! value: ${R}`);if($>=u)throw new Error(`iEnd is past end of times. (iEnd, times.length): (${$}, ${u})`);let D=r.slice(R,$).reduce((_,O)=>_+O[w],0)/($-R);$-R<=n||x.push({startFrame:R,durationFrames:$-R,pitchMidi:w+Qd,amplitude:D})}return x}var l2=r=>r.map(t=>({pitchMidi:t.pitchMidi,amplitude:t.amplitude,pitchBends:t.pitchBends,startTimeSeconds:gb(t.startFrame),durationSeconds:gb(t.startFrame+t.durationFrames)-gb(t.startFrame)}));export{Gd as BasicPitch,l2 as noteFramesToTime,p2 as outputToNotesPoly,eb as tf};
/*! Bundled license information:

@tensorflow/tfjs-core/dist/backends/backend.js:
@tensorflow/tfjs-core/dist/util_base.js:
@tensorflow/tfjs-core/dist/global_util.js:
@tensorflow/tfjs-core/dist/ops/complex.js:
@tensorflow/tfjs-core/dist/ops/clone.js:
@tensorflow/tfjs-core/dist/ops/mat_mul.js:
@tensorflow/tfjs-core/dist/ops/one_hot.js:
@tensorflow/tfjs-core/dist/ops/imag.js:
@tensorflow/tfjs-core/dist/ops/real.js:
@tensorflow/tfjs-core/dist/ops/add.js:
@tensorflow/tfjs-core/dist/ops/floorDiv.js:
@tensorflow/tfjs-core/dist/ops/div.js:
@tensorflow/tfjs-core/dist/ops/mul.js:
@tensorflow/tfjs-core/dist/ops/add_n.js:
@tensorflow/tfjs-core/dist/ops/all.js:
@tensorflow/tfjs-core/dist/ops/any.js:
@tensorflow/tfjs-core/dist/ops/atan2.js:
@tensorflow/tfjs-core/dist/ops/conv_util.js:
@tensorflow/tfjs-core/dist/ops/reshape.js:
@tensorflow/tfjs-core/dist/ops/avg_pool.js:
@tensorflow/tfjs-core/dist/ops/avg_pool_3d.js:
@tensorflow/tfjs-core/dist/ops/concat.js:
@tensorflow/tfjs-core/dist/ops/basic_lstm_cell.js:
@tensorflow/tfjs-core/dist/ops/batch_to_space_nd.js:
@tensorflow/tfjs-core/dist/ops/batchnorm.js:
@tensorflow/tfjs-core/dist/ops/bincount.js:
@tensorflow/tfjs-core/dist/ops/broadcast_to.js:
@tensorflow/tfjs-core/dist/ops/fill.js:
@tensorflow/tfjs-core/dist/ops/conv2d.js:
@tensorflow/tfjs-core/dist/ops/conv2d_backprop_input.js:
@tensorflow/tfjs-core/dist/ops/conv3d.js:
@tensorflow/tfjs-core/dist/ops/conv3d_backprop_input.js:
@tensorflow/tfjs-core/dist/ops/dense_bincount.js:
@tensorflow/tfjs-core/dist/ops/depth_to_space.js:
@tensorflow/tfjs-core/dist/ops/depthwise_conv2d.js:
@tensorflow/tfjs-core/dist/ops/diag.js:
@tensorflow/tfjs-core/dist/ops/dilation2d.js:
@tensorflow/tfjs-core/dist/ops/equal.js:
@tensorflow/tfjs-core/dist/ops/where.js:
@tensorflow/tfjs-core/dist/ops/div_no_nan.js:
@tensorflow/tfjs-core/dist/ops/dot.js:
@tensorflow/tfjs-core/dist/ops/elu.js:
@tensorflow/tfjs-core/dist/ops/max.js:
@tensorflow/tfjs-core/dist/ops/pow.js:
@tensorflow/tfjs-core/dist/ops/expand_dims.js:
@tensorflow/tfjs-core/dist/ops/tile.js:
@tensorflow/tfjs-core/dist/ops/eye.js:
@tensorflow/tfjs-core/dist/ops/greater.js:
@tensorflow/tfjs-core/dist/ops/greater_equal.js:
@tensorflow/tfjs-core/dist/ops/leaky_relu.js:
@tensorflow/tfjs-core/dist/ops/less.js:
@tensorflow/tfjs-core/dist/ops/less_equal.js:
@tensorflow/tfjs-core/dist/ops/local_response_normalization.js:
@tensorflow/tfjs-core/dist/ops/sub.js:
@tensorflow/tfjs-core/dist/ops/log_sum_exp.js:
@tensorflow/tfjs-core/dist/ops/logical_and.js:
@tensorflow/tfjs-core/dist/ops/logical_not.js:
@tensorflow/tfjs-core/dist/ops/logical_or.js:
@tensorflow/tfjs-core/dist/ops/logical_xor.js:
@tensorflow/tfjs-core/dist/ops/max_pool.js:
@tensorflow/tfjs-core/dist/ops/max_pool_3d.js:
@tensorflow/tfjs-core/dist/ops/maximum.js:
@tensorflow/tfjs-core/dist/ops/minimum.js:
@tensorflow/tfjs-core/dist/ops/mirror_pad.js:
@tensorflow/tfjs-core/dist/ops/mod.js:
@tensorflow/tfjs-core/dist/ops/moments.js:
@tensorflow/tfjs-core/dist/ops/multinomial.js:
@tensorflow/tfjs-core/dist/ops/not_equal.js:
@tensorflow/tfjs-core/dist/ops/pad.js:
@tensorflow/tfjs-core/dist/ops/space_to_batch_nd.js:
@tensorflow/tfjs-core/dist/ops/prelu.js:
@tensorflow/tfjs-core/dist/ops/prod.js:
@tensorflow/tfjs-core/dist/ops/rand.js:
@tensorflow/tfjs-core/dist/ops/random_gamma.js:
@tensorflow/tfjs-core/dist/ops/random_normal.js:
@tensorflow/tfjs-core/dist/ops/random_uniform.js:
@tensorflow/tfjs-core/dist/ops/relu.js:
@tensorflow/tfjs-core/dist/ops/relu6.js:
@tensorflow/tfjs-core/dist/ops/reverse_1d.js:
@tensorflow/tfjs-core/dist/ops/reverse_2d.js:
@tensorflow/tfjs-core/dist/ops/reverse_3d.js:
@tensorflow/tfjs-core/dist/ops/reverse_4d.js:
@tensorflow/tfjs-core/dist/ops/selu.js:
@tensorflow/tfjs-core/dist/ops/spectral/fft.js:
@tensorflow/tfjs-core/dist/ops/spectral/ifft.js:
@tensorflow/tfjs-core/dist/ops/split.js:
@tensorflow/tfjs-core/dist/ops/squared_difference.js:
@tensorflow/tfjs-core/dist/ops/squeeze.js:
@tensorflow/tfjs-core/dist/ops/stack.js:
@tensorflow/tfjs-core/dist/ops/truncated_normal.js:
@tensorflow/tfjs-core/dist/ops/unique.js:
@tensorflow/tfjs-core/dist/ops/unsorted_segment_sum.js:
@tensorflow/tfjs-core/dist/ops/unstack.js:
@tensorflow/tfjs-core/dist/ops/where_async.js:
@tensorflow/tfjs-core/dist/ops/conv2d_backprop_filter.js:
@tensorflow/tfjs-core/dist/ops/depthwise_conv2d_native_backprop_filter.js:
@tensorflow/tfjs-core/dist/ops/depthwise_conv2d_native_backprop_input.js:
@tensorflow/tfjs-core/dist/ops/image/crop_and_resize.js:
@tensorflow/tfjs-core/dist/ops/image/flip_left_right.js:
@tensorflow/tfjs-core/dist/ops/image/rotate_with_offset.js:
@tensorflow/tfjs-core/dist/ops/nonmax_util.js:
@tensorflow/tfjs-core/dist/ops/image/non_max_suppression.js:
@tensorflow/tfjs-core/dist/backends/non_max_suppression_impl.js:
@tensorflow/tfjs-core/dist/ops/image/non_max_suppression_async.js:
@tensorflow/tfjs-core/dist/ops/image/non_max_suppression_with_score.js:
@tensorflow/tfjs-core/dist/ops/image/non_max_suppression_with_score_async.js:
@tensorflow/tfjs-core/dist/ops/image/non_max_suppression_padded.js:
@tensorflow/tfjs-core/dist/ops/image/non_max_suppression_padded_async.js:
@tensorflow/tfjs-core/dist/ops/image/resize_bilinear.js:
@tensorflow/tfjs-core/dist/ops/image/resize_nearest_neighbor.js:
@tensorflow/tfjs-core/dist/ops/linalg/band_part.js:
@tensorflow/tfjs-core/dist/ops/linalg/gram_schmidt.js:
@tensorflow/tfjs-core/dist/ops/linalg/qr.js:
@tensorflow/tfjs-core/dist/ops/loss_ops_utils.js:
@tensorflow/tfjs-core/dist/ops/losses/absolute_difference.js:
@tensorflow/tfjs-core/dist/ops/losses/huber_loss.js:
@tensorflow/tfjs-core/dist/ops/losses/log_loss.js:
@tensorflow/tfjs-core/dist/ops/losses/mean_squared_error.js:
@tensorflow/tfjs-core/dist/ops/losses/sigmoid_cross_entropy.js:
@tensorflow/tfjs-core/dist/ops/losses/softmax_cross_entropy.js:
@tensorflow/tfjs-core/dist/ops/ops.js:
@tensorflow/tfjs-core/dist/ops/rotate_util.js:
@tensorflow/tfjs-core/dist/backends/kernel_impls.js:
@tensorflow/tfjs-core/dist/public/chained_ops/abs.js:
@tensorflow/tfjs-core/dist/public/chained_ops/acos.js:
@tensorflow/tfjs-core/dist/public/chained_ops/acosh.js:
@tensorflow/tfjs-core/dist/public/chained_ops/add.js:
@tensorflow/tfjs-core/dist/public/chained_ops/all.js:
@tensorflow/tfjs-core/dist/public/chained_ops/any.js:
@tensorflow/tfjs-core/dist/public/chained_ops/arg_max.js:
@tensorflow/tfjs-core/dist/public/chained_ops/arg_min.js:
@tensorflow/tfjs-core/dist/public/chained_ops/as_scalar.js:
@tensorflow/tfjs-core/dist/public/chained_ops/as_type.js:
@tensorflow/tfjs-core/dist/public/chained_ops/as1d.js:
@tensorflow/tfjs-core/dist/public/chained_ops/as2d.js:
@tensorflow/tfjs-core/dist/public/chained_ops/as3d.js:
@tensorflow/tfjs-core/dist/public/chained_ops/as4d.js:
@tensorflow/tfjs-core/dist/public/chained_ops/as5d.js:
@tensorflow/tfjs-core/dist/public/chained_ops/asin.js:
@tensorflow/tfjs-core/dist/public/chained_ops/asinh.js:
@tensorflow/tfjs-core/dist/public/chained_ops/atan.js:
@tensorflow/tfjs-core/dist/public/chained_ops/atan2.js:
@tensorflow/tfjs-core/dist/public/chained_ops/atanh.js:
@tensorflow/tfjs-core/dist/public/chained_ops/batch_to_space_nd.js:
@tensorflow/tfjs-core/dist/public/chained_ops/batchnorm.js:
@tensorflow/tfjs-core/dist/public/chained_ops/broadcast_to.js:
@tensorflow/tfjs-core/dist/public/chained_ops/cast.js:
@tensorflow/tfjs-core/dist/public/chained_ops/ceil.js:
@tensorflow/tfjs-core/dist/public/chained_ops/clip_by_value.js:
@tensorflow/tfjs-core/dist/public/chained_ops/concat.js:
@tensorflow/tfjs-core/dist/public/chained_ops/conv1d.js:
@tensorflow/tfjs-core/dist/public/chained_ops/conv2d_transpose.js:
@tensorflow/tfjs-core/dist/public/chained_ops/conv2d.js:
@tensorflow/tfjs-core/dist/public/chained_ops/cos.js:
@tensorflow/tfjs-core/dist/public/chained_ops/cosh.js:
@tensorflow/tfjs-core/dist/public/chained_ops/cumsum.js:
@tensorflow/tfjs-core/dist/public/chained_ops/depth_to_space.js:
@tensorflow/tfjs-core/dist/public/chained_ops/depthwise_conv2d.js:
@tensorflow/tfjs-core/dist/public/chained_ops/dilation2d.js:
@tensorflow/tfjs-core/dist/public/chained_ops/div_no_nan.js:
@tensorflow/tfjs-core/dist/public/chained_ops/div.js:
@tensorflow/tfjs-core/dist/public/chained_ops/dot.js:
@tensorflow/tfjs-core/dist/public/chained_ops/elu.js:
@tensorflow/tfjs-core/dist/public/chained_ops/equal.js:
@tensorflow/tfjs-core/dist/public/chained_ops/erf.js:
@tensorflow/tfjs-core/dist/public/chained_ops/exp.js:
@tensorflow/tfjs-core/dist/public/chained_ops/expand_dims.js:
@tensorflow/tfjs-core/dist/public/chained_ops/expm1.js:
@tensorflow/tfjs-core/dist/public/chained_ops/fft.js:
@tensorflow/tfjs-core/dist/public/chained_ops/flatten.js:
@tensorflow/tfjs-core/dist/public/chained_ops/floor.js:
@tensorflow/tfjs-core/dist/public/chained_ops/floorDiv.js:
@tensorflow/tfjs-core/dist/public/chained_ops/gather.js:
@tensorflow/tfjs-core/dist/public/chained_ops/greater_equal.js:
@tensorflow/tfjs-core/dist/public/chained_ops/greater.js:
@tensorflow/tfjs-core/dist/public/chained_ops/ifft.js:
@tensorflow/tfjs-core/dist/public/chained_ops/irfft.js:
@tensorflow/tfjs-core/dist/public/chained_ops/is_finite.js:
@tensorflow/tfjs-core/dist/public/chained_ops/is_inf.js:
@tensorflow/tfjs-core/dist/public/chained_ops/is_nan.js:
@tensorflow/tfjs-core/dist/public/chained_ops/leaky_relu.js:
@tensorflow/tfjs-core/dist/public/chained_ops/less_equal.js:
@tensorflow/tfjs-core/dist/public/chained_ops/less.js:
@tensorflow/tfjs-core/dist/public/chained_ops/local_response_normalization.js:
@tensorflow/tfjs-core/dist/public/chained_ops/log_sigmoid.js:
@tensorflow/tfjs-core/dist/public/chained_ops/log_softmax.js:
@tensorflow/tfjs-core/dist/public/chained_ops/log_sum_exp.js:
@tensorflow/tfjs-core/dist/public/chained_ops/log.js:
@tensorflow/tfjs-core/dist/public/chained_ops/log1p.js:
@tensorflow/tfjs-core/dist/public/chained_ops/logical_and.js:
@tensorflow/tfjs-core/dist/public/chained_ops/logical_not.js:
@tensorflow/tfjs-core/dist/public/chained_ops/logical_or.js:
@tensorflow/tfjs-core/dist/public/chained_ops/logical_xor.js:
@tensorflow/tfjs-core/dist/public/chained_ops/mat_mul.js:
@tensorflow/tfjs-core/dist/public/chained_ops/max.js:
@tensorflow/tfjs-core/dist/public/chained_ops/maximum.js:
@tensorflow/tfjs-core/dist/public/chained_ops/mean.js:
@tensorflow/tfjs-core/dist/public/chained_ops/min.js:
@tensorflow/tfjs-core/dist/public/chained_ops/minimum.js:
@tensorflow/tfjs-core/dist/public/chained_ops/mirror_pad.js:
@tensorflow/tfjs-core/dist/public/chained_ops/mod.js:
@tensorflow/tfjs-core/dist/public/chained_ops/mul.js:
@tensorflow/tfjs-core/dist/public/chained_ops/neg.js:
@tensorflow/tfjs-core/dist/public/chained_ops/norm.js:
@tensorflow/tfjs-core/dist/public/chained_ops/not_equal.js:
@tensorflow/tfjs-core/dist/public/chained_ops/one_hot.js:
@tensorflow/tfjs-core/dist/public/chained_ops/ones_like.js:
@tensorflow/tfjs-core/dist/public/chained_ops/pad.js:
@tensorflow/tfjs-core/dist/public/chained_ops/pow.js:
@tensorflow/tfjs-core/dist/public/chained_ops/prelu.js:
@tensorflow/tfjs-core/dist/public/chained_ops/prod.js:
@tensorflow/tfjs-core/dist/public/chained_ops/reciprocal.js:
@tensorflow/tfjs-core/dist/public/chained_ops/relu.js:
@tensorflow/tfjs-core/dist/public/chained_ops/relu6.js:
@tensorflow/tfjs-core/dist/public/chained_ops/reshape_as.js:
@tensorflow/tfjs-core/dist/public/chained_ops/reshape.js:
@tensorflow/tfjs-core/dist/public/chained_ops/resize_bilinear.js:
@tensorflow/tfjs-core/dist/public/chained_ops/resize_nearest_neighbor.js:
@tensorflow/tfjs-core/dist/public/chained_ops/reverse.js:
@tensorflow/tfjs-core/dist/public/chained_ops/rfft.js:
@tensorflow/tfjs-core/dist/public/chained_ops/round.js:
@tensorflow/tfjs-core/dist/public/chained_ops/rsqrt.js:
@tensorflow/tfjs-core/dist/public/chained_ops/selu.js:
@tensorflow/tfjs-core/dist/public/chained_ops/separable_conv2d.js:
@tensorflow/tfjs-core/dist/public/chained_ops/sigmoid.js:
@tensorflow/tfjs-core/dist/public/chained_ops/sign.js:
@tensorflow/tfjs-core/dist/public/chained_ops/sin.js:
@tensorflow/tfjs-core/dist/public/chained_ops/sinh.js:
@tensorflow/tfjs-core/dist/public/chained_ops/slice.js:
@tensorflow/tfjs-core/dist/public/chained_ops/softmax.js:
@tensorflow/tfjs-core/dist/public/chained_ops/softplus.js:
@tensorflow/tfjs-core/dist/public/chained_ops/space_to_batch_nd.js:
@tensorflow/tfjs-core/dist/public/chained_ops/split.js:
@tensorflow/tfjs-core/dist/public/chained_ops/sqrt.js:
@tensorflow/tfjs-core/dist/public/chained_ops/square.js:
@tensorflow/tfjs-core/dist/public/chained_ops/squared_difference.js:
@tensorflow/tfjs-core/dist/public/chained_ops/squeeze.js:
@tensorflow/tfjs-core/dist/public/chained_ops/stack.js:
@tensorflow/tfjs-core/dist/public/chained_ops/step.js:
@tensorflow/tfjs-core/dist/public/chained_ops/strided_slice.js:
@tensorflow/tfjs-core/dist/public/chained_ops/sub.js:
@tensorflow/tfjs-core/dist/public/chained_ops/sum.js:
@tensorflow/tfjs-core/dist/public/chained_ops/tan.js:
@tensorflow/tfjs-core/dist/public/chained_ops/tanh.js:
@tensorflow/tfjs-core/dist/public/chained_ops/tile.js:
@tensorflow/tfjs-core/dist/public/chained_ops/to_bool.js:
@tensorflow/tfjs-core/dist/public/chained_ops/to_float.js:
@tensorflow/tfjs-core/dist/public/chained_ops/to_int.js:
@tensorflow/tfjs-core/dist/public/chained_ops/topk.js:
@tensorflow/tfjs-core/dist/public/chained_ops/transpose.js:
@tensorflow/tfjs-core/dist/public/chained_ops/unique.js:
@tensorflow/tfjs-core/dist/public/chained_ops/unsorted_segment_sum.js:
@tensorflow/tfjs-core/dist/public/chained_ops/unstack.js:
@tensorflow/tfjs-core/dist/public/chained_ops/where.js:
@tensorflow/tfjs-core/dist/public/chained_ops/zeros_like.js:
@tensorflow/tfjs-core/dist/public/chained_ops/register_all_chained_ops.js:
@tensorflow/tfjs-core/dist/ops/ops_for_converter.js:
@tensorflow/tfjs-converter/dist/executor/tensor_utils.js:
@tensorflow/tfjs-converter/dist/executor/tensor_list.js:
@tensorflow/tfjs-converter/dist/executor/hash_table.js:
@tensorflow/tfjs-converter/dist/operations/executors/hash_table_executor.js:
@tensorflow/tfjs-backend-cpu/dist/utils/binary_impl.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/Complex.js:
@tensorflow/tfjs-backend-cpu/dist/utils/zeros_impl.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/Identity.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/Real.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/Cast.js:
@tensorflow/tfjs-backend-cpu/dist/utils/binary_utils.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/Add.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/Bincount_impl.js:
@tensorflow/tfjs-backend-cpu/dist/utils/unary_impl.js:
@tensorflow/tfjs-backend-cpu/dist/utils/unary_utils.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/Concat_impl.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/Equal.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/GatherV2_impl.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/Greater.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/GreaterEqual.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/Less.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/LessEqual.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/LinSpace_impl.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/Max_impl.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/Maximum.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/Minimum.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/Multiply.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/Neg.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/NotEqual.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/Transpose_impl.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/Transpose.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/Prod.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/Range_impl.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/Scatter_impl.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/Slice.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/SquaredDifference.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/StridedSlice_impl.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/Sub.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/TopK_impl.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/Unique_impl.js:
@tensorflow/tfjs-backend-cpu/dist/shared.js:
@tensorflow/tfjs-backend-cpu/dist/base.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/LeakyRelu.js:
@tensorflow/tfjs-backend-cpu/dist/utils/fused_utils.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/Reshape.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/AddN.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/All.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/Any.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/ArgMax.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/ArgMin.js:
@tensorflow/tfjs-backend-cpu/dist/utils/pool_utils.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/AvgPool.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/AvgPool3D.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/AvgPool3DGrad.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/AvgPoolGrad.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/BatchNorm.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/BatchToSpaceND.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/Bincount.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/Imag.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/Concat.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/Conv2D.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/Conv2DBackpropFilter.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/Conv2DBackpropInput.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/Conv3D.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/Conv3DBackpropFilterV2.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/Conv3DBackpropInputV2.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/Cos.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/CropAndResize.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/Cumsum.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/DenseBincount.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/DepthToSpace.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/DepthwiseConv2dNative.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/DepthwiseConv2dNativeBackpropFilter.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/DepthwiseConv2dNativeBackpropInput.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/Diag.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/Dilation2D.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/Dilation2DBackpropFilter.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/Dilation2DBackpropInput.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/Sum.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/EluGrad.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/ExpandDims.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/RealDiv.js:
@tensorflow/tfjs-backend-cpu/dist/utils/fft_utils.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/FFT.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/Fill.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/FlipLeftRight.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/FloorDiv.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/FusedConv2D.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/FusedDepthwiseConv2D.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/GatherNd.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/GatherV2.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/IFFT.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/LinSpace.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/LogicalAnd.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/LogicalOr.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/LRN.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/LRNGrad.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/Max.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/MaxPool.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/MaxPool3D.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/MaxPool3DGrad.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/MaxPoolGrad.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/MaxPoolWithArgmax_impl.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/MaxPoolWithArgmax.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/Mean.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/Min.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/MirrorPad.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/Mod.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/Softmax.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/Multinomial.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/NonMaxSuppressionV3.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/NonMaxSuppressionV4.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/OneHot.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/ZerosLike.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/OnesLike.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/Pack.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/PadV2.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/Pow.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/Range.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/ResizeBilinear.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/ResizeBilinearGrad.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/ResizeNearestNeighbor.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/ResizeNearestNeighborGrad.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/Reverse.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/RotateWithOffset.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/ScatterNd.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/Select.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/SpaceToBatchND.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/SparseToDense.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/SplitV.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/StridedSlice.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/Tile.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/TopK.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/Unpack.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/UnsortedSegmentSum.js:
@tensorflow/tfjs-backend-cpu/dist/register_all_kernels.js:
@tensorflow/tfjs-backend-cpu/dist/index.js:
@tensorflow/tfjs-backend-webgl/dist/kernel_utils/shared.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/Identity.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/Complex.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/LeakyRelu.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/Prelu.js:
@tensorflow/tfjs-backend-webgl/dist/kernel_utils/kernel_funcs_utils.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/Multiply.js:
@tensorflow/tfjs-backend-webgl/dist/kernel_utils/reshape.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/Reshape.js:
@tensorflow/tfjs-backend-webgl/dist/mean_gpu.js:
@tensorflow/tfjs-backend-webgl/dist/kernel_utils/reduce.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/Transpose_impl.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/Sum_impl.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/Sum.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/Transpose.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/BatchMatMul_impl.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/Abs.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/Acos.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/Acosh.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/Add.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/AddN.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/All.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/Any.js:
@tensorflow/tfjs-backend-webgl/dist/kernel_utils/arg_min_max.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/ArgMax.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/ArgMin.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/Asin.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/Asinh.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/Atan.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/Atan2.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/Atanh.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/AvgPool.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/AvgPool3D.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/AvgPool3DGrad.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/AvgPoolGrad.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/BatchMatMul.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/BatchNorm.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/Slice.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/BatchToSpaceND.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/Bincount.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/NotEqual.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/Real.js:
@tensorflow/tfjs-backend-webgl/dist/kernel_utils/int.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/Cast.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/Ceil.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/ClipByValue.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/ComplexAbs.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/Imag.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/Concat_impl.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/Concat.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/Conv2D_impl.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/Conv2D.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/Conv2DBackpropFilter.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/Conv2DBackpropInput.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/Conv3D.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/Conv3DBackpropFilterV2.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/Conv3DBackpropInputV2.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/Cos.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/Cosh.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/CropAndResize.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/DenseBincount.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/DepthToSpace.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/DepthwiseConv2dNative.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/DepthwiseConv2dNativeBackpropFilter.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/DepthwiseConv2dNativeBackpropInput.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/Diag.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/Dilation2D.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/Elu.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/EluGrad.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/Equal.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/Erf.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/Exp.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/Expm1.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/FFT_impl.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/FFT.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/Fill.js:
@tensorflow/tfjs-backend-webgl/dist/flip_left_right_gpu.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/FlipLeftRight.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/Floor.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/FloorDiv.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/FusedConv2D.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/FusedDepthwiseConv2D.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/GatherNd.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/GatherV2.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/Greater.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/GreaterEqual.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/IFFT.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/IsFinite.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/IsInf.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/IsNaN.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/Less.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/LessEqual.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/LinSpace.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/Log.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/Log1p.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/LogicalAnd.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/LogicalNot.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/LogicalOr.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/LRN.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/LRNGrad.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/Max_impl.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/Max.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/Maximum.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/MaxPool.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/MaxPool3D.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/MaxPool3DGrad.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/MaxPoolGrad.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/MaxPoolWithArgmax_impl.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/MaxPoolWithArgmax.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/Mean_impl.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/Mean.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/Min.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/Minimum.js:
@tensorflow/tfjs-backend-webgl/dist/mirror_pad_gpu.js:
@tensorflow/tfjs-backend-webgl/dist/mirror_pad_packed_gpu.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/MirrorPad.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/Mod.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/RealDiv.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/Sub.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/Softmax.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/Multinomial.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/Neg.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/NonMaxSuppressionV3.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/NonMaxSuppressionV4.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/NonMaxSuppressionV5.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/OneHot.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/ZerosLike.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/OnesLike.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/Pack.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/PadV2.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/Pow.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/Prod.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/Range.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/Reciprocal.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/Relu.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/Relu6.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/ResizeBilinear.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/ResizeBilinearGrad.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/ResizeNearestNeighbor.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/ResizeNearestNeighborGrad.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/Reverse.js:
@tensorflow/tfjs-backend-webgl/dist/rotate_gpu.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/RotateWithOffset.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/Round.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/Rsqrt.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/ScatterNd.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/Select.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/Selu.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/Sigmoid.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/Sign.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/Sin.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/Sinh.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/Softplus.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/SpaceToBatchND.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/SparseToDense.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/SplitV.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/Sqrt.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/SquaredDifference.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/Step.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/StridedSlice.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/Tan.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/Tanh.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/Tile.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/TopK.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/Unpack.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/UnsortedSegmentSum.js:
@tensorflow/tfjs-backend-webgl/dist/register_all_kernels.js:
@tensorflow/tfjs-backend-webgl/dist/index.js:
  (**
   * @license
   * Copyright 2020 Google LLC. All Rights Reserved.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   * =============================================================================
   *)

@tensorflow/tfjs-core/dist/environment.js:
@tensorflow/tfjs-core/dist/util.js:
@tensorflow/tfjs-core/dist/tape.js:
@tensorflow/tfjs-core/dist/tensor.js:
@tensorflow/tfjs-core/dist/types.js:
@tensorflow/tfjs-core/dist/device_util.js:
@tensorflow/tfjs-core/dist/ops/broadcast_util.js:
@tensorflow/tfjs-core/dist/test_util.js:
@tensorflow/tfjs-core/dist/ops/axis_util.js:
@tensorflow/tfjs-core/dist/browser_util.js:
@tensorflow/tfjs-core/dist/ops/concat_util.js:
@tensorflow/tfjs-core/dist/ops/reduce_util.js:
@tensorflow/tfjs-core/dist/index.js:
@tensorflow/tfjs-backend-webgl/dist/tex_util.js:
@tensorflow/tfjs-backend-webgl/dist/webgl_util.js:
@tensorflow/tfjs-backend-webgl/dist/shader_compiler.js:
@tensorflow/tfjs-backend-webgl/dist/gpgpu_math.js:
@tensorflow/tfjs-backend-webgl/dist/gpgpu_util.js:
@tensorflow/tfjs-backend-webgl/dist/gpgpu_context.js:
@tensorflow/tfjs-backend-webgl/dist/texture_manager.js:
@tensorflow/tfjs-backend-webgl/dist/unaryop_gpu.js:
@tensorflow/tfjs-backend-webgl/dist/backend_webgl.js:
@tensorflow/tfjs-backend-webgl/dist/binaryop_gpu.js:
@tensorflow/tfjs-backend-webgl/dist/reduce_gpu.js:
@tensorflow/tfjs-backend-webgl/dist/transpose_gpu.js:
@tensorflow/tfjs-backend-webgl/dist/argminmax_gpu.js:
@tensorflow/tfjs-backend-webgl/dist/pool_gpu.js:
@tensorflow/tfjs-backend-webgl/dist/avg_pool_backprop_gpu.js:
@tensorflow/tfjs-backend-webgl/dist/batchnorm_gpu.js:
@tensorflow/tfjs-backend-webgl/dist/slice_gpu.js:
@tensorflow/tfjs-backend-webgl/dist/clip_gpu.js:
@tensorflow/tfjs-backend-webgl/dist/concat_gpu.js:
@tensorflow/tfjs-backend-webgl/dist/conv_gpu.js:
@tensorflow/tfjs-backend-webgl/dist/conv_backprop_gpu.js:
@tensorflow/tfjs-backend-webgl/dist/crop_and_resize_gpu.js:
@tensorflow/tfjs-backend-webgl/dist/conv_gpu_depthwise.js:
@tensorflow/tfjs-backend-webgl/dist/dilation_gpu.js:
@tensorflow/tfjs-backend-webgl/dist/gather_gpu.js:
@tensorflow/tfjs-backend-webgl/dist/lrn_gpu.js:
@tensorflow/tfjs-backend-webgl/dist/max_pool_backprop_gpu.js:
@tensorflow/tfjs-backend-webgl/dist/multinomial_gpu.js:
@tensorflow/tfjs-backend-webgl/dist/onehot_gpu.js:
@tensorflow/tfjs-backend-webgl/dist/pad_gpu.js:
@tensorflow/tfjs-backend-webgl/dist/resize_bilinear_gpu.js:
@tensorflow/tfjs-backend-webgl/dist/reverse_gpu.js:
@tensorflow/tfjs-backend-webgl/dist/select_gpu.js:
@tensorflow/tfjs-backend-webgl/dist/strided_slice_gpu.js:
@tensorflow/tfjs-backend-webgl/dist/tile_gpu.js:
  (**
   * @license
   * Copyright 2017 Google LLC. All Rights Reserved.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   * =============================================================================
   *)

@tensorflow/tfjs-core/dist/log.js:
@tensorflow/tfjs-core/dist/profiler.js:
@tensorflow/tfjs-core/dist/tensor_format.js:
@tensorflow/tfjs-core/dist/tensor_util.js:
@tensorflow/tfjs-core/dist/engine.js:
@tensorflow/tfjs-core/dist/tensor_util_env.js:
@tensorflow/tfjs-core/dist/ops/operation.js:
@tensorflow/tfjs-core/dist/ops/tensor_ops_util.js:
@tensorflow/tfjs-core/dist/ops/tensor.js:
@tensorflow/tfjs-core/dist/io/types.js:
@tensorflow/tfjs-core/dist/io/io_utils.js:
@tensorflow/tfjs-core/dist/io/router_registry.js:
@tensorflow/tfjs-core/dist/io/indexed_db.js:
@tensorflow/tfjs-core/dist/io/local_storage.js:
@tensorflow/tfjs-core/dist/io/model_management.js:
@tensorflow/tfjs-core/dist/io/browser_files.js:
@tensorflow/tfjs-core/dist/io/weights_loader.js:
@tensorflow/tfjs-core/dist/io/http.js:
@tensorflow/tfjs-core/dist/io/passthrough.js:
@tensorflow/tfjs-core/dist/io/io.js:
@tensorflow/tfjs-core/dist/globals.js:
@tensorflow/tfjs-core/dist/ops/neg.js:
@tensorflow/tfjs-core/dist/ops/transpose.js:
@tensorflow/tfjs-core/dist/ops/confusion_matrix.js:
@tensorflow/tfjs-core/dist/math.js:
@tensorflow/tfjs-core/dist/ops/tensor3d.js:
@tensorflow/tfjs-core/dist/serialization.js:
@tensorflow/tfjs-core/dist/ops/abs.js:
@tensorflow/tfjs-core/dist/ops/acos.js:
@tensorflow/tfjs-core/dist/ops/acosh.js:
@tensorflow/tfjs-core/dist/ops/asin.js:
@tensorflow/tfjs-core/dist/ops/asinh.js:
@tensorflow/tfjs-core/dist/ops/atan.js:
@tensorflow/tfjs-core/dist/ops/atanh.js:
@tensorflow/tfjs-core/dist/ops/sigmoid.js:
@tensorflow/tfjs-core/dist/ops/slice.js:
@tensorflow/tfjs-core/dist/ops/tanh.js:
@tensorflow/tfjs-core/dist/ops/ceil.js:
@tensorflow/tfjs-core/dist/ops/clip_by_value.js:
@tensorflow/tfjs-core/dist/ops/cos.js:
@tensorflow/tfjs-core/dist/ops/cosh.js:
@tensorflow/tfjs-core/dist/ops/cumsum.js:
@tensorflow/tfjs-core/dist/ops/zeros_like.js:
@tensorflow/tfjs-core/dist/ops/erf.js:
@tensorflow/tfjs-core/dist/ops/scalar.js:
@tensorflow/tfjs-core/dist/ops/sqrt.js:
@tensorflow/tfjs-core/dist/ops/sum.js:
@tensorflow/tfjs-core/dist/ops/norm.js:
@tensorflow/tfjs-core/dist/ops/exp.js:
@tensorflow/tfjs-core/dist/ops/expm1.js:
@tensorflow/tfjs-core/dist/ops/floor.js:
@tensorflow/tfjs-core/dist/ops/gather.js:
@tensorflow/tfjs-core/dist/ops/is_finite.js:
@tensorflow/tfjs-core/dist/ops/is_inf.js:
@tensorflow/tfjs-core/dist/ops/is_nan.js:
@tensorflow/tfjs-core/dist/ops/linspace.js:
@tensorflow/tfjs-core/dist/ops/log.js:
@tensorflow/tfjs-core/dist/ops/log1p.js:
@tensorflow/tfjs-core/dist/gradients.js:
@tensorflow/tfjs-core/dist/ops/softplus.js:
@tensorflow/tfjs-core/dist/ops/log_sigmoid.js:
@tensorflow/tfjs-core/dist/ops/max_pool_with_argmax.js:
@tensorflow/tfjs-core/dist/ops/zeros.js:
@tensorflow/tfjs-core/dist/ops/ones.js:
@tensorflow/tfjs-core/dist/ops/ones_like.js:
@tensorflow/tfjs-core/dist/ops/pool.js:
@tensorflow/tfjs-core/dist/ops/rand_util.js:
@tensorflow/tfjs-core/dist/ops/range.js:
@tensorflow/tfjs-core/dist/ops/reciprocal.js:
@tensorflow/tfjs-core/dist/ops/reverse.js:
@tensorflow/tfjs-core/dist/ops/round.js:
@tensorflow/tfjs-core/dist/ops/rsqrt.js:
@tensorflow/tfjs-core/dist/ops/sign.js:
@tensorflow/tfjs-core/dist/ops/sin.js:
@tensorflow/tfjs-core/dist/ops/sinh.js:
@tensorflow/tfjs-core/dist/ops/slice1d.js:
@tensorflow/tfjs-core/dist/ops/slice2d.js:
@tensorflow/tfjs-core/dist/ops/slice3d.js:
@tensorflow/tfjs-core/dist/ops/slice4d.js:
@tensorflow/tfjs-core/dist/ops/softmax.js:
@tensorflow/tfjs-core/dist/ops/spectral/irfft.js:
@tensorflow/tfjs-core/dist/ops/spectral/rfft.js:
@tensorflow/tfjs-core/dist/ops/step.js:
@tensorflow/tfjs-core/dist/ops/strided_slice.js:
@tensorflow/tfjs-core/dist/ops/tan.js:
@tensorflow/tfjs-core/dist/ops/tensor1d.js:
@tensorflow/tfjs-core/dist/ops/tensor2d.js:
@tensorflow/tfjs-core/dist/ops/tensor4d.js:
@tensorflow/tfjs-core/dist/ops/tensor5d.js:
@tensorflow/tfjs-core/dist/ops/tensor6d.js:
@tensorflow/tfjs-core/dist/ops/topk.js:
@tensorflow/tfjs-core/dist/ops/variable.js:
@tensorflow/tfjs-core/dist/backends/where_impl.js:
@tensorflow/tfjs-core/dist/ops/boolean_mask.js:
@tensorflow/tfjs-core/dist/ops/moving_average.js:
@tensorflow/tfjs-core/dist/ops/scatter_nd.js:
@tensorflow/tfjs-core/dist/ops/sparse_to_dense.js:
@tensorflow/tfjs-core/dist/ops/gather_nd.js:
@tensorflow/tfjs-core/dist/ops/dropout.js:
@tensorflow/tfjs-core/dist/optimizers/optimizer.js:
@tensorflow/tfjs-core/dist/optimizers/adadelta_optimizer.js:
@tensorflow/tfjs-core/dist/optimizers/adagrad_optimizer.js:
@tensorflow/tfjs-core/dist/optimizers/adam_optimizer.js:
@tensorflow/tfjs-core/dist/optimizers/adamax_optimizer.js:
@tensorflow/tfjs-core/dist/optimizers/sgd_optimizer.js:
@tensorflow/tfjs-core/dist/optimizers/momentum_optimizer.js:
@tensorflow/tfjs-core/dist/optimizers/rmsprop_optimizer.js:
@tensorflow/tfjs-core/dist/optimizers/optimizer_constructors.js:
@tensorflow/tfjs-core/dist/train.js:
@tensorflow/tfjs-core/dist/ops/array_ops_util.js:
@tensorflow/tfjs-core/dist/ops/selu_util.js:
@tensorflow/tfjs-core/dist/ops/erf_util.js:
@tensorflow/tfjs-core/dist/backends/complex_util.js:
@tensorflow/tfjs-core/dist/ops/segment_util.js:
@tensorflow/tfjs-core/dist/backends/backend_util.js:
@tensorflow/tfjs-converter/dist/operations/executors/utils.js:
@tensorflow/tfjs-converter/dist/operations/operation_mapper.js:
@tensorflow/tfjs-converter/dist/operations/executors/arithmetic_executor.js:
@tensorflow/tfjs-converter/dist/operations/executors/basic_math_executor.js:
@tensorflow/tfjs-converter/dist/executor/tensor_array.js:
@tensorflow/tfjs-converter/dist/operations/executors/control_executor.js:
@tensorflow/tfjs-converter/dist/operations/executors/convolution_executor.js:
@tensorflow/tfjs-converter/dist/operations/executors/creation_executor.js:
@tensorflow/tfjs-converter/dist/operations/executors/dynamic_executor.js:
@tensorflow/tfjs-converter/dist/operations/executors/evaluation_executor.js:
@tensorflow/tfjs-converter/dist/operations/executors/graph_executor.js:
@tensorflow/tfjs-converter/dist/operations/executors/image_executor.js:
@tensorflow/tfjs-converter/dist/operations/executors/logical_executor.js:
@tensorflow/tfjs-converter/dist/operations/executors/matrices_executor.js:
@tensorflow/tfjs-converter/dist/operations/executors/normalization_executor.js:
@tensorflow/tfjs-converter/dist/operations/executors/reduction_executor.js:
@tensorflow/tfjs-converter/dist/operations/executors/slice_join_executor.js:
@tensorflow/tfjs-converter/dist/operations/executors/spectral_executor.js:
@tensorflow/tfjs-converter/dist/operations/executors/transformation_executor.js:
@tensorflow/tfjs-converter/dist/operations/operation_executor.js:
@tensorflow/tfjs-converter/dist/executor/graph_executor.js:
@tensorflow/tfjs-converter/dist/executor/graph_model.js:
@tensorflow/tfjs-converter/dist/index.js:
@tensorflow/tfjs-backend-webgl/dist/canvas_util.js:
@tensorflow/tfjs-backend-webgl/dist/glsl_version.js:
@tensorflow/tfjs-backend-webgl/dist/shader_compiler_util.js:
@tensorflow/tfjs-backend-webgl/dist/encode_float_gpu.js:
@tensorflow/tfjs-backend-webgl/dist/encode_float_packed_gpu.js:
@tensorflow/tfjs-backend-webgl/dist/encode_matrix_gpu.js:
@tensorflow/tfjs-backend-webgl/dist/encode_matrix_packed_gpu.js:
@tensorflow/tfjs-backend-webgl/dist/packing_util.js:
@tensorflow/tfjs-backend-webgl/dist/pack_gpu.js:
@tensorflow/tfjs-backend-webgl/dist/reshape_packed_gpu.js:
@tensorflow/tfjs-backend-webgl/dist/unaryop_packed_gpu.js:
@tensorflow/tfjs-backend-webgl/dist/unpack_gpu.js:
@tensorflow/tfjs-backend-webgl/dist/binaryop_packed_gpu.js:
@tensorflow/tfjs-backend-webgl/dist/mulmat_packed_gpu.js:
@tensorflow/tfjs-backend-webgl/dist/binaryop_complex_gpu.js:
@tensorflow/tfjs-backend-webgl/dist/batchnorm_packed_gpu.js:
@tensorflow/tfjs-backend-webgl/dist/clip_packed_gpu.js:
@tensorflow/tfjs-backend-webgl/dist/complex_abs_gpu.js:
@tensorflow/tfjs-backend-webgl/dist/depth_to_space_gpu.js:
@tensorflow/tfjs-backend-webgl/dist/conv_packed_gpu_depthwise.js:
@tensorflow/tfjs-backend-webgl/dist/conv_backprop_gpu_depthwise.js:
@tensorflow/tfjs-backend-webgl/dist/fft_gpu.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/FromPixels_utils/from_pixels_gpu.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/FromPixels_utils/from_pixels_packed_gpu.js:
@tensorflow/tfjs-backend-webgl/dist/lrn_grad_gpu.js:
@tensorflow/tfjs-backend-webgl/dist/resize_bilinear_backprop_gpu.js:
@tensorflow/tfjs-backend-webgl/dist/resize_nearest_neighbor_gpu.js:
@tensorflow/tfjs-backend-webgl/dist/resize_nearest_neighbor_backprop_gpu.js:
@tensorflow/tfjs-backend-webgl/dist/scatter_gpu.js:
@tensorflow/tfjs-backend-webgl/dist/segment_gpu.js:
  (**
   * @license
   * Copyright 2018 Google LLC. All Rights Reserved.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   * =============================================================================
   *)

@tensorflow/tfjs-core/dist/kernel_registry.js:
@tensorflow/tfjs-core/dist/flags.js:
@tensorflow/tfjs-core/dist/platforms/platform_browser.js:
@tensorflow/tfjs-core/dist/platforms/platform_node.js:
@tensorflow/tfjs-core/dist/io/progress.js:
@tensorflow/tfjs-core/dist/ops/browser.js:
@tensorflow/tfjs-core/dist/ops/square.js:
@tensorflow/tfjs-core/dist/ops/dropout_util.js:
@tensorflow/tfjs-core/dist/ops/signal_ops_util.js:
@tensorflow/tfjs-core/dist/ops/in_top_k.js:
@tensorflow/tfjs-core/dist/ops/fused_util.js:
@tensorflow/tfjs-core/dist/ops/fused/conv2d.js:
@tensorflow/tfjs-core/dist/ops/fused/depthwise_conv2d.js:
@tensorflow/tfjs-core/dist/ops/fused/mat_mul.js:
@tensorflow/tfjs-core/dist/ops/fused_ops.js:
@tensorflow/tfjs-core/dist/ops/signal/hamming_window.js:
@tensorflow/tfjs-core/dist/ops/signal/hann_window.js:
@tensorflow/tfjs-core/dist/ops/signal/frame.js:
@tensorflow/tfjs-core/dist/ops/signal/stft.js:
@tensorflow/tfjs-core/dist/backends/non_max_suppression_util.js:
@tensorflow/tfjs-converter/dist/operations/custom_op/register.js:
@tensorflow/tfjs-converter/dist/operations/custom_op/node_value_impl.js:
@tensorflow/tfjs-converter/dist/executor/model_analysis.js:
@tensorflow/tfjs-backend-cpu/dist/cpu_util.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/Tile_impl.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/NonMaxSuppressionV5.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/Square.js:
@tensorflow/tfjs-backend-webgl/dist/flags_webgl.js:
@tensorflow/tfjs-backend-webgl/dist/decode_matrix_gpu.js:
@tensorflow/tfjs-backend-webgl/dist/decode_matrix_packed_gpu.js:
@tensorflow/tfjs-backend-webgl/dist/transpose_packed_gpu.js:
@tensorflow/tfjs-backend-webgl/dist/addn_gpu.js:
@tensorflow/tfjs-backend-webgl/dist/addn_packed_gpu.js:
@tensorflow/tfjs-backend-webgl/dist/argminmax_packed_gpu.js:
@tensorflow/tfjs-backend-webgl/dist/slice_packed_gpu.js:
@tensorflow/tfjs-backend-webgl/dist/concat_packed_gpu.js:
@tensorflow/tfjs-backend-webgl/dist/im2col_packed_gpu.js:
@tensorflow/tfjs-backend-webgl/dist/diag_gpu.js:
@tensorflow/tfjs-backend-webgl/dist/fill_gpu.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/FromPixels.js:
@tensorflow/tfjs-backend-webgl/dist/lrn_packed_gpu.js:
@tensorflow/tfjs-backend-webgl/dist/pad_packed_gpu.js:
@tensorflow/tfjs-backend-webgl/dist/resize_bilinear_packed_gpu.js:
@tensorflow/tfjs-backend-webgl/dist/resize_nearest_neighbor_packed_gpu.js:
@tensorflow/tfjs-backend-webgl/dist/reverse_packed_gpu.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/Square.js:
  (**
   * @license
   * Copyright 2019 Google LLC. All Rights Reserved.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   * =============================================================================
   *)

@tensorflow/tfjs-core/dist/hash_util.js:
@tensorflow/tfjs-core/dist/ops/slice_util.js:
@tensorflow/tfjs-core/dist/ops/broadcast_args.js:
@tensorflow/tfjs-core/dist/ops/einsum.js:
@tensorflow/tfjs-core/dist/ops/meshgrid.js:
@tensorflow/tfjs-core/dist/ops/image/grayscale_to_rgb.js:
@tensorflow/tfjs-core/dist/ops/image/transform.js:
@tensorflow/tfjs-core/dist/ops/sparse/sparse_fill_empty_rows.js:
@tensorflow/tfjs-core/dist/ops/sparse/sparse_reshape.js:
@tensorflow/tfjs-core/dist/ops/sparse/sparse_segment_mean.js:
@tensorflow/tfjs-core/dist/ops/sparse/sparse_segment_sum.js:
@tensorflow/tfjs-core/dist/ops/string/string_n_grams.js:
@tensorflow/tfjs-core/dist/ops/string/string_split.js:
@tensorflow/tfjs-core/dist/ops/string/string_to_hash_bucket_fast.js:
@tensorflow/tfjs-core/dist/backends/einsum_util.js:
@tensorflow/tfjs-core/dist/ops/sparse/sparse_fill_empty_rows_util.js:
@tensorflow/tfjs-core/dist/ops/sparse/sparse_reshape_util.js:
@tensorflow/tfjs-core/dist/ops/sparse/sparse_segment_reduction_util.js:
@tensorflow/tfjs-core/dist/public/chained_ops/euclidean_norm.js:
@tensorflow/tfjs-converter/dist/flags.js:
@tensorflow/tfjs-converter/dist/operations/executors/sparse_executor.js:
@tensorflow/tfjs-converter/dist/operations/executors/string_executor.js:
@tensorflow/tfjs-backend-cpu/dist/backend_cpu.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/GatherNd_Impl.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/SparseFillEmptyRows_impl.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/SparseReshape_impl.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/SparseSegmentReduction_impl.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/StringNGrams_impl.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/StringSplit_impl.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/StringToHashBucketFast_impl.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/BroadcastArgs.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/Einsum.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/SparseFillEmptyRows.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/SparseReshape.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/SparseSegmentMean.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/SparseSegmentSum.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/StringNGrams.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/StringSplit.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/StringToHashBucketFast.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/Transform.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/BroadcastArgs.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/Einsum.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/SparseFillEmptyRows.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/SparseReshape.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/SparseSegmentMean.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/SparseSegmentSum.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/StringNGrams.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/StringSplit.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/StringToHashBucketFast.js:
@tensorflow/tfjs-backend-webgl/dist/transform_gpu.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/Transform.js:
  (**
   * @license
   * Copyright 2021 Google LLC. All Rights Reserved.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   * =============================================================================
   *)

@tensorflow/tfjs-core/dist/ops/buffer.js:
@tensorflow/tfjs-core/dist/ops/cast.js:
@tensorflow/tfjs-core/dist/ops/print.js:
@tensorflow/tfjs-core/dist/base_side_effects.js:
@tensorflow/tfjs-core/dist/ops/arg_max.js:
@tensorflow/tfjs-core/dist/ops/arg_min.js:
@tensorflow/tfjs-core/dist/ops/min.js:
@tensorflow/tfjs-core/dist/ops/log_softmax.js:
@tensorflow/tfjs-core/dist/ops/mean.js:
@tensorflow/tfjs-core/dist/ops/setdiff1d_async.js:
@tensorflow/tfjs-core/dist/base.js:
@tensorflow/tfjs-backend-webgl/dist/base.js:
  (**
   * @license
   * Copyright 2020 Google Inc. All Rights Reserved.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   * =============================================================================
   *)

@tensorflow/tfjs-core/dist/version.js:
@tensorflow/tfjs-converter/dist/version.js:
  (** @license See the LICENSE file. *)

@tensorflow/tfjs-core/dist/ops/cumprod.js:
@tensorflow/tfjs-core/dist/public/chained_ops/cumprod.js:
  (**
   * @license
   * Copyright 2022 Google LLC. All Rights Reserved.
   * Licensed under the Apache License, Version 2.0 (the 'License');
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an 'AS IS' BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   * =============================================================================
   *)

@tensorflow/tfjs-core/dist/ops/euclidean_norm.js:
@tensorflow/tfjs-core/dist/ops/search_sorted.js:
@tensorflow/tfjs-core/dist/ops/lower_bound.js:
@tensorflow/tfjs-core/dist/ops/ragged_gather.js:
@tensorflow/tfjs-core/dist/ops/ragged_tensor_to_tensor.js:
@tensorflow/tfjs-core/dist/ops/random_standard_normal.js:
@tensorflow/tfjs-core/dist/ops/upper_bound.js:
@tensorflow/tfjs-core/dist/ops/ragged_to_dense_util.js:
@tensorflow/tfjs-converter/dist/operations/op_list/arithmetic.js:
@tensorflow/tfjs-converter/dist/operations/op_list/basic_math.js:
@tensorflow/tfjs-converter/dist/operations/op_list/control.js:
@tensorflow/tfjs-converter/dist/operations/op_list/convolution.js:
@tensorflow/tfjs-converter/dist/operations/op_list/creation.js:
@tensorflow/tfjs-converter/dist/operations/op_list/dynamic.js:
@tensorflow/tfjs-converter/dist/operations/op_list/evaluation.js:
@tensorflow/tfjs-converter/dist/operations/op_list/graph.js:
@tensorflow/tfjs-converter/dist/operations/op_list/hash_table.js:
@tensorflow/tfjs-converter/dist/operations/op_list/image.js:
@tensorflow/tfjs-converter/dist/operations/op_list/logical.js:
@tensorflow/tfjs-converter/dist/operations/op_list/matrices.js:
@tensorflow/tfjs-converter/dist/operations/op_list/normalization.js:
@tensorflow/tfjs-converter/dist/operations/op_list/reduction.js:
@tensorflow/tfjs-converter/dist/operations/op_list/slice_join.js:
@tensorflow/tfjs-converter/dist/operations/op_list/sparse.js:
@tensorflow/tfjs-converter/dist/operations/op_list/spectral.js:
@tensorflow/tfjs-converter/dist/operations/op_list/string.js:
@tensorflow/tfjs-converter/dist/operations/op_list/transformation.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/RaggedGather_impl.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/RaggedTensorToTensor_impl.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/Cumprod.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/RaggedGather.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/RaggedTensorToTensor.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/SearchSorted_impl.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/SearchSorted.js:
@tensorflow/tfjs-backend-webgl/dist/conv_packed_gpu.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/Cum_impl.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/Cumprod.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/Cumsum.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/RaggedGather.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/RaggedTensorToTensor.js:
@tensorflow/tfjs-backend-webgl/dist/search_sorted_gpu.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/SearchSorted.js:
  (**
   * @license
   * Copyright 2022 Google LLC. All Rights Reserved.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   * =============================================================================
   *)

@tensorflow/tfjs-core/dist/ops/image/threshold.js:
  (**
   * @license
   * Copyright 2021 Google LLC. All Rights Reserved.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * https://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   * =============================================================================
   *)

@tensorflow/tfjs-converter/dist/data/compiled_api.js:
  (**
   * @license
   * Copyright 2019 Google LLC. All Rights Reserved.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *
   * =============================================================================
   *)

@tensorflow/tfjs-backend-cpu/dist/kernels/Abs.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/Ceil.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/Exp.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/Expm1.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/Floor.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/Log.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/Rsqrt.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/Sigmoid.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/Sqrt.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/Elu.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/Prelu.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/Relu.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/Relu6.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/BatchMatMul.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/_FusedMatMul.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/Acos.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/Acosh.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/Asin.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/Asinh.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/Atan.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/Atan2.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/Atanh.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/ClipByValue.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/ComplexAbs.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/Cosh.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/Erf.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/IsFinite.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/IsInf.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/IsNaN.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/Log1p.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/LogicalNot.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/Reciprocal.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/Round.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/Selu.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/Sign.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/Sin.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/Sinh.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/Softplus.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/Step.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/Tan.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/Tanh.js:
@tensorflow/tfjs-backend-cpu/dist/kernels/Unique.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/_FusedMatMul.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/ExpandDims.js:
@tensorflow/tfjs-backend-webgl/dist/kernels/Unique.js:
  (**
   * @license
   * Copyright 2020 Google LLC. All Rights Reserved.
   * Licensed under the Apache License, Version 2.0 (the License);
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an AS IS BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   * =============================================================================
   *)
*/
