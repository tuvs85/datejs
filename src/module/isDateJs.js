function isDateJs(time){
  if ((typeof time).toLowerCase() === 'object'){
    if (time.__isDay__){
      return true;
    }
    return false;
  }
}
export default isDateJs
