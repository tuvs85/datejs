!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define("lib/dateJs",t):(e="undefined"!=typeof globalThis?globalThis:e||self).dateJs=t()}(this,function(){"use strict";function r(e){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function i(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function t(t,e){var n,o=Object.keys(t);return Object.getOwnPropertySymbols&&(n=Object.getOwnPropertySymbols(t),e&&(n=n.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),o.push.apply(o,n)),o}function s(o){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?t(Object(r),!0).forEach(function(e){var t,n;t=o,e=r[n=e],n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e}):Object.getOwnPropertyDescriptors?Object.defineProperties(o,Object.getOwnPropertyDescriptors(r)):t(Object(r)).forEach(function(e){Object.defineProperty(o,e,Object.getOwnPropertyDescriptor(r,e))})}return o}function a(e){return e?2<=e.toString().length?String(e):"0".concat(e):"00"}var u={};var o=function(){function n(e,t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,n),n.prototype.defaultConfig={zone:-(new Date).getTimezoneOffset()/60},n.prototype.time=((e=e)?"number"===r(e).toLowerCase()?new Date(10===e.toString().length?1e3*e:e):Number.isNaN(Number(e))?new Date(e):new Date(Number(e)):new Date)||Date.now(),n.prototype.config=s(s({},this.defaultConfig),"number"===r(t=t).toLowerCase()?{zone:t}:(r(t).toLowerCase(),t)),n.prototype.__isDay__=!0,this.init()}var e,t,o;return e=n,(t=[{key:"init",value:function(){var e=this.format(),e={$Y:a(e.getFullYear()),$M:a(e.getMonth()),$D:a(e.getDate()),$h:a(e.getHours()),$m:a(e.getMinutes()),$s:a(e.getSeconds()),$S:a(e.getMilliseconds()),$stamps:e.getTime(),$stamp:parseInt(e.getTime()/1e3),$z:this.config.zone};this.$Y=e.$Y,this.$M=e.$M,this.$D=e.$D,this.$h=e.$h,this.$m=e.$m,this.$s=e.$s,this.$S=e.$S,this.$stamps=e.$stamps,this.$stamp=e.$stamp,this.$z=e.$z}},{key:"toZone",value:function(e){e=0<arguments.length&&void 0!==e?e:"";return String(e).length?this.config.zone="number"===r(e=e).toLowerCase()?e:Number.isNaN(Number(e))?u[e]:Number(e):this.config.zone=this.defaultConfig.zone,this}},{key:"format",value:function(e){if(!e)return new Date(this.time);var t=new Date(this.time);Number(this.config.zone)!==Number(this.defaultConfig.zone)&&(t=new Date(t.getTime()+60*(this.config.zone-this.defaultConfig.zone)*60*1e3));t={YY:t.getFullYear().toString().slice(2),YYYY:t.getFullYear(),MM:a(t.getMonth()),DD:a(t.getDate()),hh:a(t.getHours()),mm:a(t.getMinutes()),ss:a(t.getSeconds()),SS:a(t.getMilliseconds().toString().slice(0,2)),SSS:a(t.getMilliseconds())};return e.replace(/YYYY/g,t.YYYY).replace(/YY/g,t.YY).replace(/MM/g,t.MM).replace(/DD/g,t.DD).replace(/hh/g,t.hh).replace(/mm/g,t.mm).replace(/ss/g,t.ss).replace(/SSS/g,t.SSS).replace(/SS/g,t.SS)}},{key:"stamp",value:function(){return new Date(this.format(this.config.format)).getTime()}}])&&i(e.prototype,t),o&&i(e,o),n}();return function(e,t){return"object"===r(n=this).toLowerCase()&&n.__isDay__?e:new o(e,t);var n}});
//# sourceMappingURL=datejs.js.map