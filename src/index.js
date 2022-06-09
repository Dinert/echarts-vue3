
import DEchart from '../packages/chart/index.js'
function install(Vue) {
  Vue.component(DEchart.name, DEchart)
}

export {
  DEchart
}


export default install  //umd