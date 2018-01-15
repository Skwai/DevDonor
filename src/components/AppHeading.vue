<template>
  <h1 :class="$style.AppHeading"><slot /></h1>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class AppHeading extends Vue {}
</script>

<style lang="stylus" module>
@require "../styles/config"

.AppHeading
  margin-top: $spacingBase
  margin-bottom: $spacingBase

  &:first-child
    margin-top: 0
</style>
