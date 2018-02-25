<template>
  <button :class="$style.AppLink">
    <slot />
  </button>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class AppLink extends Vue {}
</script>

<style lang="stylus" module>
@require '../styles/config';

.AppLink {
  color: $colorPrimary;
  transition: $transitionBase;
  background: transparent;
  padding: 0;
  border: 0;
  -webkit-appearance: none;

  &:hover {
    box-shadow: $colorPrimary 0 1px 0;
  }
}
</style>
