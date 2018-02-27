<template>
  <div :class="$style.AppBtnGroup">
    <slot />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class AppBtnGroup extends Vue {}
</script>

<style lang="stylus" module>
.AppBtnGroup {
  text-align: right;
}
</style>
