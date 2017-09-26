<template>
  <div class="TextAreaField" :class="{ '-empty': !value, '-disabled': disabled, '-focused': focused }">
    <label class="TextAreaField__Wrap">
      <textarea
        class="TextAreaField__Input"
        :required="required"
        v-model="inputValue"
        :disabled="disabled"
        rows="15"
        cols="40"
        @focus="onFocus"
        @blur="onBlur"
      ></textarea>
      <span class="TextAreaField__Label">{{label}}</span>
    </label>
    <div class="TextAreaField__Error" v-if="error && isDirty">{{errorMessage || "Invalid"}}</div>
    <HelpText v-if="description" class="TextAreaField__Description">{{description}}</HelpText>
  </div>
</template>

<script>

export default {
  props: ['options', 'label', 'disabled', 'value', 'required', 'type', 'error', 'errorMessage', 'description'],

  data () {
    return {
      isDirty: false,
      focused: false,
      inputValue: this.value
    }
  },

  watch: {
    inputValue () {
      this.$emit('update:value', this.inputValue)
    }
  },

  methods: {
    onFocus () {
      this.isDirty = true
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
@require "../styles/forms"

.TextAreaField
  spacing()

  &__Error
    color: colorRed
    font-size: 0.875rem
    padding: spacingTiny 0 0

  &__Wrap
    field()

  &__Input
    display: block
    width: 100%
    background: transparent
    border: 0
    line-height: lineHeightBase
    font-size: 1rem
    font-weight: 400
    z-index: 2
    position: relative
    padding: 2rem spacingSmall 1rem

    .-empty &
      padding: 1.5rem spacingSmall

    &:invalid
      box-shadow: none

    &:focus
      outline: 0
      border-color: colorPrimaryBlue
      padding: 2rem spacingSmall 1rem

  &__Wrap:hover &__Input
    border-color: colorPrimaryBlue

  &__Label
    fieldLabel()

  &__Input:focus + &__Label
    transform: translate(0, -100%) scale(0.875)
    color: colorPrimaryBlue
    opacity: 1
</style>
