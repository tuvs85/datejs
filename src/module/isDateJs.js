function isDateJs(t){
  if ((typeof t).toLowerCase() === 'object'){
    if (t.__isDay__){
      return true;
    }
    return false;
  }
  return false;
}
export default isDateJs
