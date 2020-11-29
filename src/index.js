import formatTime from "./module/formatTime";
import formatConfig from "./module/formatConfig";
import upZero from "./module/upZero";
import upTime from "./module/upTime";
import formatTimeZone from "./module/formatTimeZone";
import isDateJs from "./module/isDateJs";
import fixNumber from "./module/fixNumber";

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
    DateJs.prototype.__isDate__ = true;
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
      "$z": this.$z
    } = {
      "$Y": upZero(date.getFullYear()),
      "$M": upZero(date.getMonth()+1),
      "$D": upZero(date.getDate()),
      "$h": upZero(date.getHours()),
      "$m": upZero(date.getMinutes()),
      "$s": upZero(date.getSeconds()),
      "$S": upZero(date.getMilliseconds()),
      "$stamps": date.getTime(),
      "$stamp": parseInt(date.getTime() / 1000),
      "$z": this.config.zone
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
      "MM": upZero(date.getMonth()+1),
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

  add(value) {
    /*
    * add 添加函数时间，接受数值、对象格式
    * 传递数值时  默认当传递为需要增加的小时，
    * 传递对象时，  进行数据兼容覆盖处理，
    * 判断是否有day、hour、minute、second
    * 如果有时 添加对应的时间，并且重新返回出去。
    *
    *
    * */
    let addObj = {
      hour: value
    }
    if ((typeof value).toLowerCase() === 'object') {
      delete addObj.hour;
      addObj = value;
      for (let z in addObj){
        addObj[z] = fixNumber(addObj[z])
      }
    }
    if (addObj.day) {
      this.time = new Date(this.time).getTime() + (addObj.day * 24 * 60 * 60 * 1000)
    }
    if (addObj.hour) {
      this.time = new Date(this.time).getTime() + (addObj.hour * 60 * 60 * 1000)
    }
    if (addObj.minute) {
      this.time = new Date(this.time).getTime() + (addObj.minute * 60 * 1000)
    }
    if (addObj.second) {
      this.time = new Date(this.time).getTime() + (addObj.second * 1000)
    }
    return formatTime(this.time)
  }
  /*
  *
    countDown(downTime,format,autoCount = false){
    downTime = upTime(downTime);
    if (this.time >= downTime){
      autoCount = false;
    }
    if (autoCount){
      this.countDownTimes = setTimeout(()=>{
        console.log('countDownTime')
        DateJs.prototype.time = new Date(new Date(DateJs.prototype.time).getTime() + 1000);
        this.countDown(downTime,format,autoCount)
      }, 1000)
    }
    if (!format){
      if (!downTime){
        return 0;
      }
      if (this.time - downTime <0){
        return (downTime - this.time) / 1000;
      }
      return (this.time - downTime) / 1000;
    }
    let countTime = (this.time - downTime) / 1000;
    if (countTime < 0){
      countTime = (downTime - this.time) / 1000;
    }
    let d = upZero(parseInt(countTime / 60 / 60 / 24));
    let h = upZero(parseInt(countTime / 60 / 60 % 24));
    let m = upZero(parseInt(countTime / 60 % 60));
    let s = upZero(parseInt(countTime % 60));
    let formatMap = {
      'DD': /DD/g.test(format),
      'HH': /HH/g.test(format),
      'mm': /mm/g.test(format),
      'ss': /ss/g.test(format),
    }
    if (Object.values(formatMap).every(item=>item)){
      return format.replace(/DD/g, d).replace(/HH/g, h).replace(/mm/g, m).replace(/ss/g, s);
    }
    if (formatMap['DD']){
      return format.replace(/DD/g, d);
    }else{
      if (formatMap['HH']){
        return format.replace(/HH/g, parseInt(countTime / 3600)).replace(/mm/g, m).replace(/ss/g, s);
      }
      if (formatMap['mm']){
        return format.replace(/mm/g, parseInt(countTime / 60)).replace(/ss/g, s);
      }
      if (formatMap['ss']){
        return format.replace(/ss/g, parseInt(countTime))
      }
    }
  }
  stopCountDown(){
    if (this.countDownTimes){
      clearTimeout(this.countDownTimes)
    }
  }
  * */
}
function dateJs(time,config){
  if (time!== window && isDateJs(time)){
    return time;
  }
  return new DateJs(time,config)
}
export default dateJs;
