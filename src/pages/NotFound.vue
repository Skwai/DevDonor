<template>
  <article :class="$style.NotFound">
    <div :class="$style.NotFound__ErrorCode">404</div>
    <AppHeading>Page Not Found</AppHeading>
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
  text-align: center;
  color: $colorPrimary;
  flex: 1;

  &__ErrorCode {
    font-size: 5rem;
    line-height: 1;
    color: transparent;
    text-shadow: $colorPrimary 4px 4px 0;
    font-weight: 700;
    color: #fff;
    text-align: center;
  }

  &__Content {
    textContent();
  }
}
</style>
