<template>
  <router-link v-if="to" :to="to" :class="$style.AppNavListItem" @click="$emit('click', $event)">
    <span :class="$style.AppNavListItem__Icon" v-if="$slots.icon">
      <slot name="icon" />
    </span>
    <slot />
  </router-link>
  <button v-else :class="$style.AppNavListItem" @click="$emit('click', $event)">
    <span :class="$style.AppNavListItem__Icon" v-if="$slots.icon">
      <slot name="icon" />
    </span>
    <slot />
  </button>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class AppNavListItem extends Vue {
  @Prop({ type: [String, Object] })
  private to: string | {}
}
</script>

<style lang="stylus" module>
@require '../styles/config';
@require '../styles/text';

.AppNavListItem {
  display: flex;
  align-items: center;
  padding: 0.75rem $spacingBase;
  transition: $transitionBase;
  user-select: none;
  background: transparent;
  border: 0;
  -moz-appearance: none;
  -webkit-appearance: none;
  white-space: nowrap;
  font-size: 0.875rem;

  &:hover, &:focus {
    color: $colorPrimary;
    background: $colorHighlight;
  }

  &__Icon {
    margin-right: 1em;
    align-self: center;
    opacity: 0.5;

    &, svg {
      width: 1.25em;
      height: 1.25em;
    }

    svg {
      fill: currentColor;
    }
  }
}
</style>
