<template>
  <router-link
    v-if="to"
    :to="to"
    :class="$style.AppBtn"
    :color="color"
    :size="size"
    :loading="loading"
    @click="click"
  >
    <span v-if="loading" :class="$style.AppBtn__Loading">
      <AppSpinner />
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
    @click="click"
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
  @Prop() private to: string

  @Prop() private color: string

  @Prop() private size: string

  @Prop({ default: false })
  private loading: boolean

  @Prop({ default: 'button' })
  private type: string

  @Prop({ default: false })
  private disabled: boolean

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
@keyframes -loading
  from
    transform: rotate(0deg)
  to
    transform: rotate(359deg)

@require "../styles/config.styl"
@require "../styles/text.styl"

.AppBtn
  background: #fff
  border-radius: 99rem
  padding: 0.75rem 1.5rem
  display: inline-flex
  align-items: center
  transition: transitionBase
  text-decoration: none
  background: #fff
  color: inherit
  border: 0
  textSmallCaps()
  white-space: nowrap
  cursor: pointer
  position: relative

  &[disabled]
    cursor: not-allowed
    opacity: .5

  &:focus,
  &:active
    outline: 0

  &[loading]
    opacity: .5
    cursor: not-allowed

  &[loading] &__Label
    opacity: 0

  &__Loading
    position: absolute
    left: 50%
    top: 50%
    width: 2rem
    height: 2rem
    transform: translate(-50%, -50%)

  &[size=large]
    padding: spacingSmall 2rem
    font-size: 0.9125rem
    font-weight: 600

  &[color=white]
    background: #fff
    color: $colorDarkBlue
    box-shadow: none

  &[color=dark]
    background: $colorDarkBlue
    box-shadow: none
    color: #fff

  &[color=primary]
    background: $colorPrimary
    box-shadow: none
    color: #fff

  &:active
    transform: translateY(-2px)

  &__Icon
    margin-right: 1em

    svg
      width: 2em
      height: 2em
      stroke: currentColor
</style>
