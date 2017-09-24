<template>
  <div class="TextAreaField" :class="{ '-empty': !value, '-disabled': disabled }">
    <label class="TextAreaField__Wrap">
      <textarea
        class="TextAreaField__Input"
        :required="required"
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
  props: ['options', 'label', 'disabled', 'value', 'required', 'type', 'errorMessage', 'description'],

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
@require "../styles/forms"

.TextAreaField
  spacing()

  &__Wrap
    field()

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
    fieldLabel()

  &__Input:focus + &__Label
    transform: translate(0, -100%) scale(0.875)
    color: colorPrimaryBlue
    opacity: 1
</style>
