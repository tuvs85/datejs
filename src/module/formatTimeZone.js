import toNumber from "./toNumber";
const zoneMap = {

}
function formatTimeZone(timezone){
  if ((typeof timezone).toLowerCase() === 'number'){
    return timezone
  }
  if (Number.isNaN(Number(timezone))){
    return zoneMap[timezone]
  }
  return toNumber(timezone)
}
export default formatTimeZone
