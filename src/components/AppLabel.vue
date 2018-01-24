<template>
  <span :class="$style.AppLabel"><slot /></span>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class AppLabel extends Vue {}
</script>

<style lang="stylus" module>
@import "../styles/label.styl"

.AppLabel
  label()

  + .AppLabel
    margin-left: 0.25rem
</style>
