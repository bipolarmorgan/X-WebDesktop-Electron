/**
* Created by OXOYO on 2018/1/12.
*
*/

<style scoped lang="less" rel="stylesheet/less">

</style>

<template>
  <div
    class="context-menu-item"
    :name="info.name"
    :style="info.style"
    @click.stop="triggerMenuItem"
  >
    <Icon
      class="context-menu-icon"
      v-if="info.icon"
      :type="info.icon.type"
      :style="info.icon.style"
    >
    </Icon>
    <div class="context-menu-label">
      <div class="context-menu-label-text">{{ info.text }}</div>
      <Icon
        class="context-menu-icon-child"
        v-if="info.children && info.children.length"
        type="arrow-right-b"
      >
      </Icon>
    </div>

    <slot name="child"></slot>
  </div>
</template>

<script>
  export default {
    name: 'ContextMenuItem',
    props: {
      info: {
        type: Object,
        required: true
      }
    },
    methods: {
      // Trigger menu FIXME 可以考虑点击时判断是否有子菜单，有子菜单则turn on子菜单
      triggerMenuItem: function () {
        let _t = this
        console.log('triggerMenuItem', _t.info.text, _t.info.name)
        // _t.$Message.info('Trigger menu: ' + _t.info.name)
        if (_t.info && _t.info.action && _t.info.action.type) {
          switch (_t.info.action.type) {
            case 'bus':
              console.log('_t.info.action.handler', _t.info.action.handler)
              _t.$utils.bus.$emit(_t.info.action.handler, _t.info.action.params)
              break
            case 'callback':
              if (typeof _t.info.action.handler === 'function') {
                _t.info.action.handler(_t.info.action.params)
              }
              break
          }
        }
        // 广播事件，shut down菜单
        _t.$utils.bus.$emit('platform/contextMenu/hide')
      }
    }
  }
</script>

