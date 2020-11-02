const zoneMap = {

}
function formatTimeZone(timezone){
  if ((typeof timezone).toLowerCase() === 'number'){
    return timezone
  }
  if (Number.isNaN(Number(timezone))){
    return zoneMap[timezone]
  }
  return Number(timezone)
}
export default formatTimeZone
