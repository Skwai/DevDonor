<template>
  <div class="CheckboxGroup">
    <div class="CheckboxGroup__Label">{{label}}</div>
    <div class="CheckboxGroup__Options">
      <label class="CheckboxGroup__Option" v-for="(option, key) in options" :key="key">
        <input
          class="CheckboxGroup__OptionInput"
          type="checkbox"
          v-model="values"
          :value="option"
        >
        <span class="CheckboxGroup__OptionLabel">{{option}}</span>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  props: ['label', 'description', 'options', 'value'],

  data () {
    return {
      values: []
    }
  }
}
</script>

<style lang="stylus">
@require "../styles/config.styl"

.CheckboxGroup
  spacing()

  &__Label
    font-weight: 600
    margin-bottom: spacingSmall

  &__Options
    display: flex
    flex-wrap: wrap
    margin: (-1 * spacingTiny) (-1 * spacingSmall)

  &__Option
    padding: spacingTiny spacingSmall

    &Input
      position: absolute
      opacity: 0
      left: -999rem

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
