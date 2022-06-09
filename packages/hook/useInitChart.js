import echarts from "#/default/echarts"
import defaultOptions from "#/default/options"
import { onMounted } from 'vue'
import { resize } from '@/utils/tools.js'
import _ from 'lodash'

const initChart = ({ props, emit, id }) => {
  // data
  let chartDom = null
  let chart = null

  // onMounted
  onMounted(() => {

    // 初始化图表
    chartDom = document.getElementById(id);
    chart = echarts.init(chartDom);

    // 默认配置
    let propDfaultOptions = _.defaultsDeep(props.options, defaultOptions)


    // 数据组装完成
    let options = _.defaultsDeep(props.chartData, propDfaultOptions)

    // 数据组装完成的回调
    if (typeof options.configCallback === 'function') {
      options = options.configCallback(options, chart)
    } else {
      emit('config-callback', options, chart, value => {
        options = value
      })
    }

    // 渲染图表
    chart.setOption(options, true);

    // 图表渲染完成
    typeof options.callback === 'function' && options.callback(chart, options)
    emit('callback', chart, options)

    resize(() => {
      chart.resize()
    }, 10)
  })

}

export default initChart