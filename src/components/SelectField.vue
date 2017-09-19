<template>
  <div class="SelectField" :class="{ '-empty': !value, '-disabled': disabled, '-open': open }">
    <label class="SelectField__Wrap">
      <input
        class="SelectField__Input"
        type="text"
        required
        v-model="inputValue"
        :disabled="disabled"
        @input="filterOptions"
        @keydown.tab="hideOptions"
        @keydown.down="firstOption"
        @focus="showOptions"
      >
      <span class="SelectField__Label">{{label}}</span>
    </label>
    <div class="SelectField__Options" ref="options">
      <div
        class="SelectField__Option"
        :class="{ '-selected': value === key }"
        v-for="(option, key) in filteredOptions"
        :key="key"
        @click="selectOption(key, option)"
        @keydown.tab="hideOptions"
        @keydown.enter="selectOption(key, option)"
        @keydown.down="nextOption"
        @keydown.up="prevOption"
        :tabindex="open ? 0 : -1"
      >{{option}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['options', 'label', 'disabled', 'value', 'errorMessage', 'description'],

  data () {
    return {
      error: null,
      open: false,
      filterValue: '',
      inputValue: ''
    }
  },

  created () {
    if (this.value) {
      this.inputValue = this.options[this.value] || ''
    }
  },

  mounted () {
    this.onDocumentClick = this.onDocumentClick.bind(this)
    document.addEventListener('click', this.onDocumentClick)
  },

  destroyed () {
    document.removeEventListener('click', this.onDocumentClick)
  },

  computed: {
    filteredOptions () {
      const { options } = this
      const keys = Object.keys(options)
      const filter = String(this.filterValue || '').toLowerCase()
      if (!keys.length) return {}

      const filtered = keys
        .filter((k) => options[k].toLowerCase().includes(filter))
        .reduce((obj, k) => Object.assign(obj, { [k]: options[k] }), {})
      return filtered
    }
  },

  methods: {
    filterOptions (ev) {
      this.filterValue = ev.target.value
    },

    lastOption (ev) {
      if (!ev.target.nextElementSibling) {
        this.hideOptions()
      }
    },

    onDocumentClick (ev) {
      if (!this.$el.contains(ev.target)) {
        this.hideOptions()
      }
    },

    firstOption () {
      this.$refs.options.firstChild.focus()
    },

    nextOption (ev) {
      const next = ev.target.nextElementSibling
      if (next) {
        next.focus()
      }
    },

    prevOption (ev) {
      const prev = ev.target.previousElementSibling
      if (prev) {
        prev.focus()
      }
    },

    hideOptions () {
      this.open = false
    },

    showOptions () {
      this.open = true
    },

    selectOption (value, option) {
      this.inputValue = option
      this.filterValue = ''
      this.$emit('update:value', value)
      this.hideOptions()
    }
  }
}
</script>

<style lang="stylus">
@require "../styles/config"

.SelectField
  margin-bottom: spacingBase
  position: relative

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

  &__Options
    position: absolute
    left: 0
    min-width: 100%
    max-height 30vh
    overflow-y: scroll
    background: #fff
    box-shadow: rgba(35,47,65,.1) 0 2px 2rem, rgba(0,0,0,.1) 0 0 0 1px
    transition: transitionBase
    transition-property: opacity, transform
    transform: scale(0.7, 0.7)
    opacity: 0
    top: -999rem
    z-index: zIndexCover

    .-open &
      transform: scale(1, 1)
      opacity: 1
      top: 100%

  &__Option
    cursor: pointer
    padding: 0.75rem spacingSmall
    color: fontColorBase
    font-weight: 500

    &.-selected
      color: colorPrimaryBlue

    &:hover,
    &:focus
      background: colorOffWhite

    &:focus
      outline: 0


</style>
