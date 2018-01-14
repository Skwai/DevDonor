<template>
  <h1 :class="$style.AppSubheading"><slot /></h1>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class AppSubheading extends Vue {}
</script>

<style lang="stylus" module>
@require "../styles/config"

.AppSubheading
  margin-bottom: $spacingBase
</style>
