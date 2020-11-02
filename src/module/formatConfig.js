function formatConfig(config){
  if ((typeof config).toLowerCase() === 'number'){
    return {
      zone: config
    }
  }
  if ((typeof config).toLowerCase() === 'string'){

    // if (zoneMap[config]){
    //   return {
    //     zone: zoneMap[config]
    //   }
    // }
  }
  return config;
}
export default formatConfig
