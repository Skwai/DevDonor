<template>
  <div role="alert" :class="$style.AppWarning"><slot /></div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class AppWarning extends Vue {}
</script>

<style lang="stylus" module>
@require '../styles/config';

.AppWarning {
  margin-top: $spacingLarge;
  margin-bottom: $spacingBase;
  font-size: 1.125rem;
  text-align: center;
  color: $colorRed;
  font-weight: 600;
}
</style>
