function upTime(time) {
  if (!time)return 0;
  if (Number.isNaN(Number(time)))return new Date(time).getTime();
  if (time.toString().length === 10)return Number(time)*1000;
  return time;
}
export default upTime
