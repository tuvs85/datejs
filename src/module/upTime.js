import toNumber from "./toNumber";
import toDate from "./toDate";
function upTime(time) {
  if (!time)return 0;
  if (Number.isNaN(toNumber(time)))return toDate(time).getTime();
  if (time.toString().length === 10)return toNumber(time)*1000;
  return time;
}
export default upTime
