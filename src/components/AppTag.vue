<template>
  <span :class="$style.AppTag"><slot /></span>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class AppTag extends Vue {}
</script>

<style lang="stylus" module>
@import "../styles/label.styl"

.AppTag
  label()

  + .AppTag
    margin-left: 0.25rem
</style>
