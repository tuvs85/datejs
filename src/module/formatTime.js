function formatTime(time){
  if ((typeof time).toLowerCase() === 'number'){
    return new Date(((time).toString().length === 10)?(time * 1000): time)
  }
  if (!Number.isNaN(Number(time))){
    return new Date(Number(time));
  }
  return new Date(time);
}
export default formatTime
