function toDate(time){
  if (!time) return new Date();
  if ((typeof time).toLowerCase() === 'object')return time;
  return new Date(time);
}
export default toDate
