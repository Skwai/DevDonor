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
    <div class="TextField__Error" v-if="error && isDirty">{{errorMessage || "Invalid"}}</div>
    <HelpText v-if="description" class="TextField__Description">{{description}}</HelpText>
  </div>
</template>

<script>

export default {
  props: ['options', 'error', 'label', 'disabled', 'value', 'required', 'type', 'errorMessage', 'description'],

  data () {
    return {
      isDirty: false,
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
      this.isDirty = true
      this.focused = false
    }
  }
}
</script>

<style scope lang="stylus">
@require "../styles/config"
@require "../styles/forms"

.TextField
  spacing()

  &__Error
    color: colorRed
    font-size: 0.875rem
    padding: spacingTiny 0 0

  &__Wrap
    field()

  &__Label
    fieldLabel()

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

  &__Input:focus + &__Label
    transform: translate(0, -100%) scale(0.875)
    opacity: 1
</style>
