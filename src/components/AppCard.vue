<template>
  <div :class="$style.AppCard">
    <slot />
  </div>
</template>

<script lang="ts">
</script>

<style lang="stylus" module>
@require '../styles/config';

.AppCard {
  padding: $spacingBase;
  border: $colorLightGray solid 1px;
  box-shadow: rgba(0, 0, 0, 0.1) 0 2px 1rem;
}
</style>
