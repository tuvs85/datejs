/*


document.write(window.dateJs(new Date()).format('YY-MM-DD'))
document.write('<br/>')
document.write(window.dateJs(new Date()).format('YYYY-MM-DD'))
document.write('<br/>')
document.write(window.dateJs(new Date()).format('YYYY-MM-DD hh:mm:ss'))
document.write('<br/>')
document.write(window.dateJs(new Date()).format('YYYY-MM-DD hh:mm:ss:SS'))
document.write('<br/>')
document.write(window.dateJs(new Date()).format('YYYY-MM-DD hh:mm:ss:SSS'))
document.write('<br/>')
document.write(window.dateJs(new Date()).format('YYYY/MM/DD'))
document.write('<br/>')
document.write(window.dateJs(new Date()).format('YYYY/MM/DD hh:mm:ss'))
document.write('<br/>')
document.write(window.dateJs(new Date()).format('YYYY/MM/DD hh:mm:ss'))
document.write('<br/>')
document.write(window.dateJs(new Date()).format('YYYY/MM/DD hh:mm:ss:SS'))
document.write('<br/>')
document.write(window.dateJs(new Date()).format('YYYY/MM/DD hh:mm:ss:SSS'))
document.write('<br/>')
document.write(window.dateJs(new Date()).toZone().format('YYYY/MM/DD hh:mm:ss:SSS'))
document.write('<br/>')
document.write(window.dateJs(new Date()).toZone().stamp())
document.write('<br/>')
document.write(window.dateJs(new Date()).$Y);
const time1 = window.dateJs();
const time2 = window.dateJs();
setInterval(()=>{
  // console.log(window.dateJs(1604503596556).countDown(1605499380, 'DD 天 HH 时 mm 分 ss 秒'))
  // console.log(window.dateJs(1604503596556).countDown(1605499380, 'HH 时 mm 分 ss 秒'))
  // console.log(window.dateJs(1604503596556).countDown(1605499380, 'mm 分 ss 秒'))
  // console.log(window.dateJs(1604503596556).countDown(1605499380, 'ss 秒'))
// console.log(window.dateJs(1604503596556).countDown(1605499380, 'DD 天 HH 时 mm 分 ss 秒', true))
// console.log(window.dateJs(1604503596556).countDown(1605499380, 'HH 时 mm 分 ss 秒', true))
// console.log(window.dateJs(1604503596556).countDown(1605499380, 'mm 分 ss 秒', true))
// console.log(window.dateJs(1604503596556).countDown(1605499380, 'ss 秒', true))
},1000)


* */
const roads = [
  "爱丽丝的房子-鲍勃的房子",
  "爱丽丝的房子-小屋",
  "爱丽丝的房子-邮局",
  "鲍勃的房子-市政大厅",
  "达里亚的房子-厄尼的房子",
  "达里亚的房子-市政大厅",
  "厄尼的房子-Grete的房子",
  "Grete的房子-农场",
  "Grete的房子-商店",
  "市场-农场",
  "市场-邮局",
  "市场-商店",
  "市场-市政大厅",
  "商店-市政大厅"
]
function huildGraph(edges){
  let graph = Object.create(null);
  function addEdge(from, to){
    if (graph[from] == null){
      graph[from] = [to]
      return
    }
    graph[from].push(to)
  }
  for(let [from, to] of edges.map(r=>r.split('-'))){
    addEdge(from, to);
    addEdge(to, from);
  }
  return graph;
}
const roadGraph = huildGraph(roads);
console.log(roadGraph)

class VillageState{
  constructor(place,parcels) {
    this.place = place;
    this.parcels = parcels;
  }
  move(destination){
    if (!roadGraph[this.place].includes(destination)){
      return this;
    }
    let parcels = this.parcels.map(item=>{
      if (item.place != this.place) return item;
      return {place: destination, address: item.address}
    }).filter(item=>item.place != item.address);
    return new VillageState(destination, parcels)
  }
}
let first = new VillageState('邮局', [{'place': '邮局', 'address': "爱丽丝的房子"}]);
let next = first.move("爱丽丝的房子");
console.log(next.place);
console.log(next.parcels);
console.log(first.place);
function runRobot(state, robot, memory){
  for(let turn = 0;;turn++){
    if (state.parcels.length === 0){
      console.log(`Done in ${turn} truns`);
      break;
    }
    let action = robot(state,memory);
    state = state.move(action.direction);
    memory = action.memory;
    console.log(`Moved to ${action.direction}`);
  }
}
function randomPick(array){
  return array[Math.floor(Math.random() * array.length)]
}
function randomRobot(state){
  return {direction:randomPick(roadGraph[state.place])};
}
VillageState.random = function (parcelCount = 5){
  let parcels = [];
  for (let i =0; i<parcelCount;i++){
    let address = randomPick(Object.keys(roadGraph)), place;
    do {
      place = randomPick(Object.keys(roadGraph));
    }while (place == address);
    parcels.push({place, address})
  }
  return new VillageState('邮局', parcels)
}
runRobot(VillageState.random(), randomRobot);
