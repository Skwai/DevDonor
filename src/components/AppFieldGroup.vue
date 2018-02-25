<template>
  <div :class="$style.AppFieldGroup">
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class AppFormFields extends Vue {}
</script>

<style lang="stylus" module>
@import '../styles/config.styl';

.AppFieldGroup {
  display: grid;
  grid-gap: $spacingLarge;
  grid-template-columns: repeat(2, 1fr);
  margin-bottom: $spacingLarge;
}
</style>
