<template>
  <div :class="$style.AppNavList">
    <slot />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class AppNavList extends Vue {}
</script>

<style lang="stylus" module>
.AppNavList {
  display: grid;
}
</style>
