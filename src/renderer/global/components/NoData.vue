/**
* Created by OXOYO on 2017/7/14.
* No data组件
*/

<style scoped lang="less" rel="stylesheet/less">
  .nodata {
    width: 100%;
    text-align: center;
    padding: 10px;
  }
</style>

<template>
  <div class="nodata" v-if="show">
    <slot>{{ text }}</slot>
  </div>
</template>

<script>
  export default {
    name: 'NoData',
    props: {
      show: {
        type: Boolean,
        default: false
      },
      text: {
        type: String,
        default: 'No data！'
      }
    }
  }
</script>

