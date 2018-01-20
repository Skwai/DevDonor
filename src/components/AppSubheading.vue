<template>
  <h2 :class="$style.AppSubheading"><slot /></h2>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class AppSubheading extends Vue {
}
</script>

<style lang="stylus" module>
@require "../styles/config"

.AppSubheading
  margin-top: $spacingLarge
  margin-bottom: $spacingBase
  font-size: 1.25rem

  &:first-child
    margin-top: 0
</style>
