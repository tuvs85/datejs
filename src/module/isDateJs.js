function isDateJs(t){
  if ((typeof t).toLowerCase() === 'object'){
    if (t.__isDate__){
      return true;
    }
    return false;
  }
  return false;
}
export default isDateJs
