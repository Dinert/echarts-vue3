<script setup>
import _ from 'lodash'
import initChart from '#/hook/useInitChart'
import { getUuid } from '@/utils/tools.js'

// props
const props = defineProps({
  options: {
    type: Object,
    default: () => { }
  },
  chartData: {
    type: Object,
    default: () => { }
  }
})
// emit
const emit = defineEmits(['config-callback', 'callback'])

// data
const id = 'e_chart_' + getUuid()
initChart({props, emit, id})


</script>

<template>
  <div class="e_chart">
    <div :id="id"></div>
  </div>
</template>



<style lang="scss" scoped>
.e_chart {
  width: 100%;
  height: 100%;

  &>div {
    height: 100%;
    width: 100%;
  }
}
</style>