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
  margin-top: $spacingTiny;
  opacity: 0.6;
  font-size: $fontSizeSmall;
}
</style>
