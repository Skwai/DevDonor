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
    <div v-if="description" class="TextField__Description">{{description}}</div>
  </div>
</template>

<script>

export default {
  props: ['options', 'label', 'disabled', 'value', 'type', 'errorMessage', 'description'],

  data () {
    return {
      error: null,
      inputValue: this.value
    }
  },

  watch: {
    inputValue () {
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
    background: colorOffWhite
    position: relative
    display: block
    position: relative
    box-shadow: inset rgba(0,0,0,.1) 0 1px 1px

    .-disabled &
      cursor: not-allowed
      opacity: .5

  &__Input
    display: block
    width: 100%
    background: transparent
    border: 0
    line-height: 1rem
    font-size: 1rem
    font-weight: 500
    z-index: 2
    position: relative
    padding: 2rem spacingSmall 1rem

    .-empty &
      padding: 1.5rem spacingSmall

    &:invalid
      box-shadow: none

    &:focus
      outline: 0
      border-color: #499aff
      padding: 2rem spacingSmall 1rem

  &__Wrap:hover &__Input
    border-color: #499aff

  &__Label
    cursor: text
    top: 50%
    left: spacingSmall
    position: absolute
    display: block
    cursor: text
    z-index: 1
    transition: transitionBase
    transform: translate(0, -100%) scale(0.875)
    transform-origin: left top
    font-weight: 600
    opacity: .5

    .-empty &
      transform: translate(0, -50%)
      opacity: 1

  &__Input:focus + &__Label
    transform: translate(0, -100%) scale(0.875)
    color: colorPrimaryBlue
    opacity: 1

  &__Description
    margin: spacingTiny 0 0
    opacity: .7
</style>
