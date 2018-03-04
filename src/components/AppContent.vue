<template>
  <span :class="$style.AppContent">
    <slot />
  </span>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class AppContent extends Vue {}
</script>

<style lang="stylus" module>
@require '../styles/text';

.AppContent {
  textContent();
}
</style>
