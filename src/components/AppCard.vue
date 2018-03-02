<template>
  <div :class="$style.AppCard">
    <slot />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class AppCard extends Vue {}
</script>

<style lang="stylus" module>
@require '../styles/config';
@require '../styles/card';

.AppCard {
  card();
  margin-bottom: $spacingBase;
}
</style>
