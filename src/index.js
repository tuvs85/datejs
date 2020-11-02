import formatTime from "./module/formatTime";
import formatConfig from "./module/formatConfig";
import upZero from "./module/upZero";
import formatTimeZone from "./module/formatTimeZone";
import isDateJs from "./module/isDateJs";

class DateJs{
  constructor(time, config) {
    this.defaultConfig = {
      zone: -(new Date().getTimezoneOffset() / 60),
    }
    this.time = formatTime(time);
    this.config = {
      ...this.defaultConfig,
      ...(formatConfig(config))
    }
    this.__isDay__ = true;
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
    } = {
      "$Y": date.getFullYear(),
      "$M": upZero(date.getMonth()),
      "$D": upZero(date.getDate()),
      "$h": upZero(date.getHours()),
      "$m": upZero(date.getMinutes()),
      "$s": upZero(date.getSeconds()),
      "$S": upZero(date.getMilliseconds()),
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
    // return
    return new Date(this.format(this.config.format)).getTime();
  }
}
function dateJs(time,config){
  if (isDateJs(time)){
    return time;
  }
  return new DateJs(time,config)
}
export default dateJs;
