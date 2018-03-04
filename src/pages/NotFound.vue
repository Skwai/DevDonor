<template>
  <article :class="$style.NotFound">
    <AppHeading>Page Not Found</AppHeading>
    <div :class="$style.NotFound__Content">
    </div>
  </article>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class NotFoundPage extends Vue {}
</script>

<style lang="stylus" module>
@require '../styles/config';
@require '../styles/container';
@require '../styles/text';

.NotFound {
  container(40rem);
  padding-top: $spacingLarge;
  padding-bottom: $spacingLarge;

  &__Content {
    textContent();
  }
}
</style>
