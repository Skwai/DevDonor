<template>
  <article :class="$style.AppPage">
    <slot />
  </article>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class AppPage extends Vue {}
</script>

<style lang="stylus" module>
@require '../styles/config';
@require '../styles/container';

.AppPage {
  container(40rem);
  padding-top: $spacingLarge;
  padding-bottom: $spacingLarge;
}
</style>
