<template>
  <div :class="$style.AppHelpText"><slot /></div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class AppHelpText extends Vue {}
</script>

<style lang="stylus" module>
@require '../styles/config.styl';

.AppHelpText {
  margin: $spacingTiny 0 0;
  opacity: 0.7;
  font-size: $fontSizeSmall;
}
</style>
