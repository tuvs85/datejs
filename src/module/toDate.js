function toDate(time){
  if ((typeof time).toLowerCase() === 'object')return time;
  return new Date(time);
}
export default toDate
