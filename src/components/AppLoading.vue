<template>
  <div :class="$style.AppLoading">
    <AppSpinner></AppSpinner>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class AppLoading extends Vue {}
</script>

<style lang="stylus" module>
@require '../styles/config';

.AppLoading {
  size = 3rem;
  max-width: size;
  max-height: size;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: $spacingBase auto;
  line-height: 0;
  align-self: center;

  &[size='small'] {
    width: 2rem;
  }
}
</style>
