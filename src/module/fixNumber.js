export default function fixNumber(num){
  if ((typeof num).toLowerCase() === 'string'){
    num = parseFloat(num)
  }
  if (!Number.isInteger(num)){
    num = Number(num.toFixed(4))
  }
  return num;
}
