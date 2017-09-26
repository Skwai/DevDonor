<template>
  <div class="FilterMenu" :class="{ '-open': open }">
    <Btn :click="toggle">{{label}}: {{value}}</Btn>
    <div class="FilterMenu__Options" @click="onOptionsClick">
      <div class="FilterMenu__Option">All</div>
      <div class="FilterMenu__Option -selected">Foo</div>
      <div class="FilterMenu__Option">Bar</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['label'],

  data () {
    return {
      open: false,
      value: 'Any'
    }
  },

  mounted () {
    this.onDocumentClick = this.onDocumentClick.bind(this)
    document.addEventListener('click', this.onDocumentClick)
  },

  destroyed () {
    document.removeEventListener('click', this.onDocumentClick)
  },

  methods: {
    toggle () {
      this.open = !this.open
    },

    onOptionsClick (ev) {
      this.open = false
    },

    onDocumentClick (ev) {
      if (!this.$el.contains(ev.target)) {
        this.open = false
      }
    }
  }
}
</script>

<style lang="stylus">
@require "../styles/config.styl"

.FilterMenu
  position: relative

  &__Options
    position: absolute
    background: #fff
    box-shadow: rgba(0,0,0,0.1) 0 2px 5px, rgba(0,0,0,0.1) 0 0 0 1px
    width: auto
    left: 0
    top: -999rem
    z-index: zIndexCover
    min-width: 100%
    padding: spacingTiny 0
    font-size: 0.9375rem;
    margin-top: 0.5rem
    transform: translate(0, 0.5rem) scale(.7, .7)
    opacity: 0
    transition-duration: transitionBase
    transition-property: opacity, transform

    .-open &
      transform: translate(0, 0) scale(1, 1)
      opacity: 1
      top: 100%

  &__Option
    padding: spacingTiny spacingBase
    cursor: pointer
    transition: transitionBase

    &.-selected
      color: colorPrimaryBlue

    &:hover,
    &:focus
      background: colorHighlight

</style>
