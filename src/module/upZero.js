function upZero(value){
  if (!value)return '00';
  if (value.toString().length>=2)return String(value);
  return `0${value}`
}
export default upZero
