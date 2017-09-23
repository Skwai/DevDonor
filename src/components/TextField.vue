<template>
  <div class="TextField" :class="{ '-empty': !value, '-disabled': disabled, '-focused': focused }">
    <label class="TextField__Wrap">
      <input
        class="TextField__Input"
        type="text"
        :required="required"
        v-model="inputValue"
        :disabled="disabled"
        @focus="onFocus"
        @blur="onBlur"
      >
      <span class="TextField__Label">{{label}}</span>
    </label>
    <HelpText v-if="description" class="TextField__Description">{{description}}</HelpText>
  </div>
</template>

<script>

export default {
  props: ['options', 'label', 'disabled', 'value', 'required', 'type', 'errorMessage', 'description'],

  data () {
    return {
      error: null,
      focused: false,
      inputValue: this.value
    }
  },

  watch: {
    value (newValue) {
      this.inputValue = newValue
    },

    inputValue () {
      this.$emit('update:value', this.inputValue)
    }
  },

  methods: {
    onFocus () {
      this.focused = true
    },

    onBlur () {
      this.focused = false
    }
  }
}
</script>

<style scope lang="stylus">
@require "../styles/config"

.TextField
  spacing()

  &__Wrap
    background: colorOffWhite
    position: relative
    display: block
    position: relative
    box-shadow: inset rgba(0,0,0,.1) 0 1px 1px
    transition: transitionBase

    .-focused &
      background: #fff
      box-shadow: inset colorPrimaryBlue 0 0 0 1px

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
    transition: transitionBase

    .-empty &
      padding: 1.5rem spacingSmall

    &:invalid
      box-shadow: none

    &:focus
      outline: 0
      padding: 2rem spacingSmall 1rem

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
</style>
