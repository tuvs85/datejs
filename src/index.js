import formatTime from "./module/formatTime";
import formatConfig from "./module/formatConfig";
import upZero from "./module/upZero";
import upTime from "./module/upTime";
import formatTimeZone from "./module/formatTimeZone";
import isDateJs from "./module/isDateJs";

class DateJs{
  constructor(time, config) {
    DateJs.prototype.defaultConfig = {
      zone: -(new Date().getTimezoneOffset() / 60)
    }
    DateJs.prototype.time = formatTime(time) || Date.now();
    DateJs.prototype.config = {
      ...this.defaultConfig,
      ...(formatConfig(config))
    }
    DateJs.prototype.__isDay__ = true;
    this.init()
  }
  init(){
    const date = this.format();
    ({"$Y":this.$Y,
      "$M": this.$M,
      "$D": this.$D,
      "$h": this.$h,
      "$m": this.$m,
      "$s": this.$s,
      "$S": this.$S,
      "$stamps": this.$stamps,
      "$stamp": this.$stamp,
    } = {
      "$Y": upZero(date.getFullYear()),
      "$M": upZero(date.getMonth()),
      "$D": upZero(date.getDate()),
      "$h": upZero(date.getHours()),
      "$m": upZero(date.getMinutes()),
      "$s": upZero(date.getSeconds()),
      "$S": upZero(date.getMilliseconds()),
      "$stamps": date.getTime(),
      "$stamp": parseInt(date.getTime() / 1000),
    });
  }
  toZone(timezone = ''){
    if (!String(timezone).length) {
      this.config.zone = this.defaultConfig.zone;
      return this;
    };
    this.config.zone = formatTimeZone(timezone)
    return this;
  }
  format(format) {
    if (!format) return new Date(this.time);
    let date = new Date(this.time);
    if (Number(this.config.zone) !== Number(this.defaultConfig.zone)){
      date = new Date(date.getTime() + ((this.config.zone - this.defaultConfig.zone) * 60 * 60 * 1000));
    }
    const time = {
      "YY": date.getFullYear().toString().slice(2),
      "YYYY": date.getFullYear(),
      "MM": upZero(date.getMonth()),
      "DD": upZero(date.getDate()),
      "hh": upZero(date.getHours()),
      "mm": upZero(date.getMinutes()),
      "ss": upZero(date.getSeconds()),
      "SS": upZero(date.getMilliseconds().toString().slice(0,2)),
      "SSS": upZero(date.getMilliseconds()),
    }
    return format.replace(/YYYY/g, time.YYYY)
      .replace(/YY/g, time.YY)
      .replace(/MM/g, time.MM)
      .replace(/DD/g, time.DD)
      .replace(/hh/g, time.hh)
      .replace(/mm/g, time.mm)
      .replace(/ss/g, time.ss)
      .replace(/SSS/g, time.SSS)
      .replace(/SS/g, time.SS);
  }
  stamp(){
    return new Date(this.format(this.config.format)).getTime();
  }
  countDown(downTime,format){
    if (!format){
      setTimeout(()=>{
        DateJs.prototype.time = new Date(Number(DateJs.prototype.time) + 1000);
      },1000)
      if (!downTime){
        return 0;
      }
      downTime = upTime(downTime);
      if (this.time - downTime <0){
        return downTime - this.time;
      }
      return this.time - downTime;
    }
    let countTime = this.time - downTime;
    if (countTime <0){
      countTime = downTime - this.time;
    }
    let d = parseInt(countTime / 60 / 60 / 24);
    let h = parseInt(countTime / 60 / 60 % 24);
    let m = parseInt(countTime / 60 % 60);
    let s = parseInt(countTime % 60);
    return format.replace(/DD/g, d).replace(/HH/g, h).replace(/MM/g, m).replace(/SS/g, s);
  }
}
function dateJs(time,config){
  if (isDateJs(this)){
    return time;
  }
  return new DateJs(time,config)
}
export default dateJs;