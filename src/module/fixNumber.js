import toNumber from "./toNumber";

export default function fixNumber(num){
  /*
  * 过滤纠正浮点数，如果是浮点数的话， 过滤4位 然后返回出去。
  *
  * */
  if ((typeof num).toLowerCase() === 'string'){
    num = toNumber(num)
  }
  if (!Number.isInteger(num)){
    num = toNumber(num.toFixed(4))
  }
  return num;
}
