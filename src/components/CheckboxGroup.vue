<template>
  <div class="CheckboxGroup">
    <div class="CheckboxGroup__Label">{{label}}</div>
    <HelpText v-if="description">{{description}}</HelpText>
    <div class="CheckboxGroup__Options">
      <label class="CheckboxGroup__Option" v-for="(description, value) in options" :key="value">
        <input
          class="CheckboxGroup__OptionInput"
          type="checkbox"
          v-model="selected"
          :value="value"
        >
        <span class="CheckboxGroup__OptionLabel">{{value}} <small class="CheckboxGroup__OptionDescription">{{description}}</small></span>
      </label>
    </div>
    <div class="CheckboxGroup__Error" v-if="error">{{errorMessage || "InvalidInvalid"}}</div>
  </div>
</template>

<script>
export default {
  props: [
    'label',
    'description',
    'options',
    'value',
    'error',
    'errorMessage'
  ],

  data () {
    return {
      selected: Object.keys(this.value) || []
    }
  },

  watch: {
    selected (value) {
      const obj = value.reduce((obj, v) => Object.assign(obj, { [v]: true }), {})
      this.$emit('update:value', obj)
    }
  }
}
</script>

<style lang="stylus">
@require "../styles/config.styl"
@require "../styles/card.styl"

.CheckboxGroup
  spacing()
  card()

  &__Label
    font-weight: 600

  &__Options
    display: flex
    flex-wrap: wrap
    margin-top: spacingSmall

  &__Option
    padding: spacingTiny 0
    flex: 0 0 100%

    &Input
      position: absolute
      opacity: 0
      left: -999rem

    &Description
      font-size: 100%
      opacity: .5
      display: inline-block
      margin-left: 0.5rem

    &Label
      font-size: fontSizeSmall
      font-weight: 500
      display: flex
      align-items: center
      transition: transitionBase
      position: relative

      &:hover
        color: colorPrimaryBlue
        cursor: pointer

      &::before
        content: ""
        width: 1.25rem
        height: 1.25rem
        border-radius: borderRadiusBase
        margin-right: spacingTiny
        background: colorOffWhite
        box-shadow: inset colorGray 0 0 0 1px
        transition: transitionBase

      &:hover::before
        background: #fff
        box-shadow: inset colorPrimaryBlue 0 0 0 1px

      input:checked + &
        color: colorPrimaryBlue

        &::before
          background: colorPrimaryBlue
          box-shadow: inset colorPrimaryBlue 0 0 0 1px

        &::after
          opacity: 1


      &::after
        opacity: 0
        transition: transitionBase
        content: ""
        position: absolute
        top: (1.25rem / 2)
        left: (1.25rem / 2)
        width: 1rem
        height: 1rem
        transform: translate(-50%, -50%)
        border-radius: borderRadiusBase
        background: embedurl("../assets/check.svg", "utf8")
        background-size: contain
</style>
