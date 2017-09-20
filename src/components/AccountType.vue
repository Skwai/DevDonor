<template>
  <div class="AccountType">
    <div class="AccountType__Inner">
      <button class="AccountType__Option">
        <svg class="AccountType__OptionIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none" stroke-width="1" stroke-miterlimit="10" stroke-linecap="square"><path d="M4 7c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/><path d="M7 16v5H3v-4l-2-3v-4h6"/><path d="M20 7c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/><path d="M17 16v5h4v-4l2-3v-4h-6"/><path d="M12 7c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z"/><path d="M14 23h-4v-4l-3-3v-6h10v6l-3 3z"/></g></svg>
        <div class="AccountType__OptionLabel">Register as charity</div>
      </button>
      <button class="AccountType__Option">
        <svg class="AccountType__OptionIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none" stroke-width="1" stroke-miterlimit="10" stroke-linecap="square"><path d="M6 8l-4 4 4 4m12-8l4 4-4 4"/><path d="M10 20l4-16"/></g></svg>
        <div class="AccountType__OptionLabel">Register as volunteer</div>
      </button>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="stylus">
@require "../styles/config.styl"
@require "../styles/text.styl"

.AccountType
  position: fixed
  left: 0
  top: 0
  width: 100%
  height: 100%
  background: rgba(colorDarkBlue, .7)

  &__Inner
    position: absolute
    z-index: 2
    top: 30vh
    display: flex
    background: #fff
    // width: 50%
    left: 50%
    transform: translate(-50%, 0)
    border-radius: borderRadiusBase
    overflow: hidden

  &__Option
    padding: spacingLarge spacingLarge
    border: 0
    background: transparent
    color: colorDarkBlue
    text-align: center
    flex: 1
    textCaps()
    transition: transitionBase

    &:hover
      background: colorLightGray

    &Icon
      width: 3rem
      height: 3rem
      stroke: currentColor

    &Label
      margin-top: 1rem
      white-space: nowrap

</style>
