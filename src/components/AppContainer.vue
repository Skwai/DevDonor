<template>
  <div :class="$style.AppContainer">
    <slot />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class AppContainer extends Vue {}
</script>

<style lang="stylus" module>
@import '../styles/config.styl';

.AppContainer {
  width: 64rem;
  margin: 0 auto;
  max-width: 100vw;
  padding: 0 $spacingBase;
}
</style>
