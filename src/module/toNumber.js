function toNumber(value){
  if ((typeof value).toLowerCase() === 'number' )return value;
  return parseFloat(value);
}
export default toNumber
