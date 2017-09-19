<template>
  <div class="TextField" :class="{ '-empty': !value, '-disabled': disabled }">
    <label class="TextField__Wrap">
      <input
        class="TextField__Input"
        type="text"
        required
        v-model="inputValue"
        :disabled="disabled"
      >
      <span class="TextField__Label">{{label}}</span>
    </label>
  </div>
</template>

<script>

export default {
  props: ['options', 'label', 'disabled', 'value', 'type', 'errorMessage'],
  data () {
    return {
      error: null,
      inputValue: this.value
    }
  },
  watch: {
    inputValue () {
      console.log(this.value)
      this.$emit('update:value', this.inputValue)
    }
  }
}
</script>

<style scope lang="stylus">
@require "../styles/config"

.TextField
  margin-bottom: spacingBase

  &__Wrap
    position: relative
    display: block
    position: relative

    .-disabled &
      cursor: not-allowed
      opacity: .5

  &__Input
    display: block
    width: 100%
    background: transparent
    border: rgba(0,0,0,.1) solid 1px
    line-height: 1rem
    font-size: 1rem
    font-weight: 500
    z-index: 2
    position: relative
    padding: spacingBase spacingSmall spacingTiny

    .-empty &
      padding: spacingSmall spacingSmall

    &:invalid
      box-shadow: none

    &:focus
      outline: 0
      border-color: #499aff
      padding: spacingBase spacingSmall spacingTiny

  &__Wrap:hover &__Input
    border-color: #499aff

  &__Label
    cursor: text
    top: 50%
    left: spacingSmall
    position: absolute
    display: block
    opacity: .5
    cursor: text
    z-index: 1
    transition: transitionBase
    transform: translate(0, -100%) scale(0.875)
    transform-origin: left top

    .-empty &
      transform: translate(0, -50%)

  &__Input:focus + &__Label
    transform: translate(0, -100%) scale(0.875)
</style>
