<template>
  <div class="TextAreaField" :class="{ '-empty': !value, '-disabled': disabled }">
    <label class="TextAreaField__Wrap">
      <textarea
        class="TextAreaField__Input"
        required
        v-model="inputValue"
        :disabled="disabled"
        rows="5"
        cols="40"
      ></textarea>
      <span class="TextAreaField__Label">{{label}}</span>
    </label>
    <HelpText v-if="description" class="TextAreaField__Description">{{description}}</HelpText>
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

.TextAreaField
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
    line-height: lineHeightBase
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
    top: 2rem
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
</style>
