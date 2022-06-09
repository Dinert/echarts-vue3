import DEchart from './src/index.vue'
DEchart.install = (Vue) => {
  Vue.component(DEchart.name, DEchart)
}

export default DEchart