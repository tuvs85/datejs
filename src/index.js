

function fTime(time){
  if ((typeof time).toLowerCase() === 'number'){
    return new Date(((time).toString().length === 10)?(time * 1000): time)
  }
  if (!Number.isNaN(Number(time))){
    return new Date(Number(time));
  }
  return new Date(time);
}
const zoneMap = {

}
function fConfig(config){
  if ((typeof config).toLowerCase() === 'number'){
    return {
      zone: config
    }
  }
  if ((typeof config).toLowerCase() === 'string'){

    // if (zoneMap[config]){
    //   return {
    //     zone: zoneMap[config]
    //   }
    // }
  }
  return config;
}
function upZero(value){
  if (!value || value.toString().length>=2)return value;
  return `0${value}`
}
function fTimezone(timezone){
  if ((typeof timezone).toLowerCase() === 'number'){
    return timezone
  }
  if (Number.isNaN(Number(timezone))){
    return zoneMap[timezone]
  }
  return Number(timezone)
}
class DateJs{
  constructor(time, config) {
    if ((typeof time).toLowerCase() === 'object'){
      this.time = fTime(time.time);
    } else {
      this.time = fTime(time);
    }
    this.defaultConfig = {
      zone: -(new Date().getTimezoneOffset() / 60),
    }
    this.config = {
      ...this.defaultConfig,
      ...(fConfig(config))
    }
  }
  toZone(timezone = ''){
    if (!String(timezone).length) {
      this.config.zone = this.defaultConfig.zone;
      return this;
    };
    this.config.zone = fTimezone(timezone)
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
      "SS": upZero(date.getMilliseconds()).toString().slice(2),
      "SSS": upZero(date.getMilliseconds()),
    }
    return format.replace(/YYYY/g, time.YYYY).replace(/YY/g, time.YY).replace(/MM/g, time.MM).replace(/DD/g, time.DD).replace(/hh/g, time.hh).replace(/mm/g, time.mm).replace(/ss/g, time.ss).replace(/SSS/g, time.SSS).replace(/SS/g, time.SS);
  }
}
export default DateJs;
