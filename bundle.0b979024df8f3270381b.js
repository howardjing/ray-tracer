!function(t){function r(e){if(n[e])return n[e].exports;var i=n[e]={i:e,l:!1,exports:{}};return t[e].call(i.exports,i,i.exports,r),i.l=!0,i.exports}var n={};r.m=t,r.c=n,r.d=function(t,n,e){r.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:e})},r.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return r.d(n,"a",n),n},r.o=function(t,r){return Object.prototype.hasOwnProperty.call(t,r)},r.p="",r(r.s=0)}([function(t,r,n){"use strict";var e=n(1),i=function(t){return t&&t.__esModule?t:{default:t}}(e),o=document.querySelector("#app"),u=document.createElement("canvas");u.width=800,u.height=450,o.appendChild(u),(0,i.default)(u)},function(t,r,n){"use strict";function e(t){if(Array.isArray(t)){for(var r=0,n=Array(t.length);r<t.length;r++)n[r]=t[r];return n}return Array.from(t)}function i(t,r){if(!(t instanceof r))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(r,"__esModule",{value:!0}),r.reflectVector=r.ScreenToWorld=r.Vector=r.Point=void 0;var o=function(){function t(t,r){var n=[],e=!0,i=!1,o=void 0;try{for(var u,a=t[Symbol.iterator]();!(e=(u=a.next()).done)&&(n.push(u.value),!r||n.length!==r);e=!0);}catch(t){i=!0,o=t}finally{try{!e&&a.return&&a.return()}finally{if(i)throw o}}return n}return function(r,n){if(Array.isArray(r))return r;if(Symbol.iterator in Object(r))return t(r,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),u=function(){function t(t,r){for(var n=0;n<r.length;n++){var e=r[n];e.enumerable=e.enumerable||!1,e.configurable=!0,"value"in e&&(e.writable=!0),Object.defineProperty(t,e.key,e)}}return function(r,n,e){return n&&t(r.prototype,n),e&&t(r,e),r}}(),a=n(2),c=function(t){return t&&t.__esModule?t:{default:t}}(a),l=function(t){return[t.x,t.y,t.z]},f=function(t){return Math.sqrt(t.reduce(function(t,r){return t+Math.pow(r,2)},0))},s=function(t){var r=f(t);if(0===r)throw new Error("can't normalize 0 vector");return t.map(function(t){return t/r})},h=function(t,r){if(t.length!=r.length)throw new Error("cannot add array, dimension mismatch: "+t.length+" and "+r.length);return t.map(function(t,n){return t+r[n]})},d=function(t,r){if(t.length!=r.length)throw new Error("cannot subtract arrays, dimension mismatch: "+t.length+" and "+r.length);return t.map(function(t,n){return t-r[n]})},m=function(t,r){return t.map(function(t){return t*r})},y=function(t,r){if(t.length!=r.length)throw new Error("cannot take dot product, dimension mismatch: "+t.length+" and "+r.length);return t.map(function(t,n){return t*r[n]}).reduce(function(t,r){return t+r},0)},p=function(t,r,n){return Math.min(Math.max(t,r),n)},v=function(t,r){return r.multiplyScalar(2*r.dotProduct(t)).subtract(t)},g=function(){function t(r,n,o){var u=this;i(this,t),this.toArray=function(){return[u.red,u.green,u.blue]},this.multiply=function(r){return t.make.apply(t,e(m(u.toArray(),r)))},this.add=function(r){return t.make.apply(t,e(h(u.toArray(),r.toArray())))},this.red=Math.round(p(r,0,255)),this.green=Math.round(p(n,0,255)),this.blue=Math.round(p(o,0,255))}return u(t,[{key:"toRgbString",value:function(){return"rgb("+this.red+","+this.green+","+this.blue+")"}}],[{key:"make",value:function(t,r,n){return new this(t,r,n)}}]),t}(),k=function(){function t(r,n){var e=this;i(this,t),this.getColor=function(t,r,n,i){var o=i.subtract(t).normalize(),u=e.getAmbientColor(),a=e.getLambertianColor(t,r,n),c=e.getSpecularColor(r,n,o);return u.multiply(.2).add(a.multiply(.4)).add(c.multiply(.4))},this.getLambertianColor=function(t,r,n){var i=n.dotProduct(r);return e.color.multiply(i)},this.getSpecularColor=function(t,r,n){var i=v(r,t);return e.color.multiply(Math.pow(i.dotProduct(n),e.shinyness))},this.getAmbientColor=function(){return e.color},this.color=r,this.shinyness=n}return u(t,null,[{key:"make",value:function(t,r){return new this(t,r)}}]),t}(),w=function(){function t(r,n,o){var u=this;i(this,t),this.addVector=function(r){return t.make.apply(t,e(h(l(u),l(r))))},this.subtract=function(t){return M.make.apply(M,e(d(l(u),l(t))))},this.toArray=function(){return l(u)},this.x=r,this.y=n,this.z=o}return u(t,null,[{key:"make",value:function(t,r,n){return new this(t,r,n)}}]),t}(),b=function(t,r,n,e){return t*e-r*n},M=function(){function t(r,n,o){var u=this;i(this,t),this.magnitude=function(){return f(l(u))},this.normalize=function(){var t;return(t=u.constructor).make.apply(t,e(s(l(u))))},this.subtract=function(r){return t.make.apply(t,e(d(l(u),l(r))))},this.multiplyScalar=function(r){return t.make.apply(t,e(m(l(u),r)))},this.dotProduct=function(t){return y(l(u),l(t))},this.crossProduct=function(r){return t.make(b(u.y,u.z,r.y,r.z),-b(u.x,u.z,r.x,r.z),b(u.x,u.y,r.x,r.y))},this.toArray=function(){return l(u)},this.x=r,this.y=n,this.z=o}return u(t,null,[{key:"make",value:function(t,r,n){return new this(t,r,n)}}]),t}(),x=function(){function t(r,n){var e=this;i(this,t),this.pointAtTime=function(t){return e.origin.addVector(e.direction.multiplyScalar(t))},this.origin=r,this.direction=n}return u(t,null,[{key:"fromPoints",value:function(t,r){return new this(t,r.subtract(t).normalize())}},{key:"make",value:function(t,r){return new this(t,r)}}]),t}(),P=function(){function t(r,n,e){var o=this;i(this,t),this.intersect=function(t){var r=t.direction.dotProduct(o.normal);if(0===r)return null;var n=o.origin.subtract(t.origin).dotProduct(o.normal),e=n/r;return e<=0?null:t.pointAtTime(e)},this.normalVector=function(t){return o.normal},this.origin=r,this.normal=n.normalize(),this.material=e}return u(t,null,[{key:"make",value:function(t,r,n){return new this(t,r,n)}}]),t}(),A=function(){function t(r,n,o){var u=this;i(this,t),this.intersect=function(t){var r=t.origin.subtract(u.origin),n=t.direction.dotProduct(t.direction),i=t.direction.multiplyScalar(2).dotProduct(r),o=r.dotProduct(r)-Math.pow(u.radius,2),a=(0,c.default)(n,i,o);if(0===a.length)return null;var l=Math.min.apply(Math,e(a));return t.pointAtTime(l)},this.normalVector=function(t){return t.subtract(u.origin).normalize()},this.origin=r,this.radius=n,this.material=o}return u(t,null,[{key:"make",value:function(t,r,n){return new this(t,r,n)}}]),t}(),S=function t(r,n,e){var o=this;i(this,t),this.getPoint=function(t,r){var n=t/(o.screenMaxWidth-1),e=r/(o.screenMaxHeight-1),i=n*o.worldMaxWidth-o.worldMaxWidth/2,u=o.worldMaxHeight/2-e*o.worldMaxHeight;return w.make(i,0,u)},this.screenMaxWidth=r,this.screenMaxHeight=n,this.worldMaxWidth=e;var u=e/r;this.worldMaxHeight=u*n},z=function(t,r){var n=!0,e=!1,i=void 0;try{for(var o,u=t[Symbol.iterator]();!(n=(o=u.next()).done);n=!0){var a=o.value,c=r(a);if(c)return[a,c]}}catch(t){e=!0,i=t}finally{try{!n&&u.return&&u.return()}finally{if(e)throw i}}return[null,null]},C=g.make(0,0,0),_=function(t,r,n){var e=x.make(t,r),i=z(n,function(t){return t.intersect(e)}),u=o(i,2),a=u[0];u[1];return!!a},V=function(t,r){var n=new Set(t);return n.delete(r),n},E=function(t){for(var r=t.width,n=t.height,e=t.getContext("2d"),i=w.make(0,-10,0),u=P.make(w.make(0,0,-2),M.make(0,0,1),k.make(g.make(100,100,100),20)),a=A.make(w.make(0,0,0),2,k.make(g.make(50,100,150),20)),c=A.make(w.make(4,5,0),2,k.make(g.make(150,100,50),4)),l=w.make(-10,-5,3),f=new Set([a,c,u]),s=new S(r,n,10),h=0;h<r;h++)for(var d=0;d<n;d++)!function(t){var r=x.fromPoints(i,s.getPoint(h,t)),n=z(f,function(t){return t.intersect(r)}),u=o(n,2),a=u[0],c=u[1];if(a&&c){var d=a.normalVector(c),m=l,y=m.subtract(c).normalize(),p=_(c,y,V(f,a))?C:a.material.getColor(c,d,y,i);e.fillStyle=p.toRgbString(),e.fillRect(h,t,1,1)}}(d)};r.default=E,r.Point=w,r.Vector=M,r.ScreenToWorld=S,r.reflectVector=v},function(t,r,n){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var e=function(t,r,n){return Math.pow(r,2)-4*t*n},i=function(t,r,n){var i=e(t,r,n);if(i<0)return[];if(0===i)return[-r/(2*t)];var o=Math.sqrt(i);return[(-r+o)/(2*t),(-r-o)/(2*t)]};r.default=i}]);