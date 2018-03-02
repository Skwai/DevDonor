<template>
  <a :class="$style.AppLink" @click="$emit('click', $event)" v-if="href" :href="href">
    <slot />
  </a>
  <button v-else :class="$style.AppLink" @click="$emit('click', $event)">
    <slot />
  </button>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class AppLink extends Vue {
  @Prop() private href: string
}
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
