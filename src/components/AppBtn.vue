<template>
  <router-link
    v-if="to"
    :to="to"
    :class="$style.AppBtn"
    :color="color"
    :size="size"
    :loading="loading"
    :block="block"
    @click="click"
    :style="backgroundColor"
  >
    <span v-if="loading" :class="$style.AppBtn__Loading">
      <AppSpinner />
    </span>
    <span :class="$style.AppBtn__Icon" v-if="$slots.icon">
      <slot name="icon" />
    </span>
    <span :class="$style.AppBtn__Label"><slot /></span>
  </router-link>
  <button
    v-else
    :class="$style.AppBtn"
    :disabled="disabled"
    :type="type"
    :color="color"
    :size="size"
    :loading="loading"
    :block="block"
    @click="click"
    :style="backgroundColor"
  >
    <span v-if="loading" :class="$style.AppBtn__Loading">
      <AppSpinner />
    </span>
    <span :class="$style.AppBtn__Icon" v-if="$slots.icon">
      <slot name="icon" />
    </span>
    <span :class="$style.AppBtn__Label"><slot /></span>
  </button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class AppBtn extends Vue {
  @Prop({ type: [String, Object] })
  private to: string | {}

  @Prop({ required: false })
  private color: string

  @Prop() private size: string

  @Prop({ default: false, required: false })
  private block: boolean

  @Prop({ default: false, required: false })
  private loading: boolean

  @Prop({ default: 'button', required: false })
  private type: string

  @Prop({ default: false, required: false })
  private disabled: boolean

  @Prop({ required: false })
  private background: string

  get backgroundColor() {
    if (this.background) {
      return `background-color: ${this.background}; color: #fff`
    }
    return null
  }

  private click(ev: Event) {
    if (this.loading) {
      ev.preventDefault()
      return false
    }

    this.$emit('click', ev)
  }
}
</script>

<style lang="stylus" module>
@keyframes -loading {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(359deg);
  }
}

@require '../styles/config.styl';
@require '../styles/text.styl';

.AppBtn {
  border-radius: 99rem;
  padding: 0.675rem 1.5rem;
  display: inline-flex;
  align-items: center;
  transition: transitionBase;
  text-decoration: none;
  background: transparent;
  color: inherit;
  border: 0;
  textCaps();
  white-space: nowrap;
  cursor: pointer;
  position: relative;
  font-size: 0.875rem;
  font-weight: 600;

  &:hover, &:focus {
    color: $colorPrimary;
  }

  + .AppBtn {
    margin-left: 0.5rem;
  }

  &[block] {
    display: block;
    width: 100%;
  }

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &:focus, &:active {
    outline: 0;
  }

  &[loading] {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &[loading] &__Label {
    opacity: 0;
  }

  &__Loading {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 2rem;
    height: 2rem;
    transform: translate(-50%, -50%);
  }

  &[size='large'] {
    padding: 1rem 2rem;
    font-weight: 600;
  }

  &[size='small'] {
    padding: 0.5rem 1rem;
    font-weight: 600;
    font-size: 0.8125rem;
  }

  &[color='stroke'] {
    box-shadow: inset rgba($colorPrimary, 0.5) 0 0 0 1px;
    color: $colorPrimary;
  }

  &[color='dark'] {
    background: $colorDarkBlue;
    box-shadow: none;
    color: #fff;
  }

  &[color='primary'] {
    background: $colorPrimary;
    box-shadow: none;
    color: #fff;
  }

  &__Icon {
    margin-right: 1em;
    align-self: center;

    &, svg {
      width: 1em;
      height: 1em;
    }

    svg {
      fill: currentColor;
    }
  }
}
</style>
