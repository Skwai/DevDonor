<template>
  <div class="AccountMenu" :class="{ '-show': showAccountMenu }">
    <button
      @click.prevent="toggleAccountMenu"
      class="AccountMenu__Toggle"
    >
      <AccountAvatar :picture="auth.photoURL" />
      <svg class="AccountMenu__ToggleIcon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"/></svg>
    </button>
    <div class="AccountMenu__Options" @click="onOptionsClick">
      <router-link to="/register" class="AccountMenu__Option">Register a charity</router-link>
      <router-link to="/profile" class="AccountMenu__Option">Your profile</router-link>
      <span tabindex="0" class="AccountMenu__Option" @click="logout">Logout</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AccountAvatar from '@/components/AccountAvatar'

export default {
  components: {
    AccountAvatar
  },

  computed: {
    ...mapGetters([
      'auth'
    ])
  },

  mounted () {
    this.onDocumentClick = this.onDocumentClick.bind(this)
    document.addEventListener('click', this.onDocumentClick)
  },

  destroyed () {
    document.removeEventListener('click', this.onDocumentClick)
  },

  methods: {
    logout () {
      this.$store.dispatch('logout')
    },

    onOptionsClick (ev) {
      this.showAccountMenu = false
    },

    onDocumentClick (ev) {
      if (!this.$el.contains(ev.target)) {
        this.showAccountMenu = false
      }
    },

    toggleAccountMenu () {
      this.showAccountMenu = !this.showAccountMenu
    }
  },

  data () {
    return {
      showAccountMenu: false
    }
  }
}
</script>

<style lang="stylus">
@require "../styles/config.styl"
@require "../styles/text.styl"

.AccountMenu
  position: relative

  &__Toggle
    background: none
    border: 0
    padding: 0
    color: #fff
    display: flex
    align-items: center
    position: relative

    &:focus
      outline: 0

    &Icon
      width: 1.5rem
      height: 1.5rem
      fill: currentColor
      margin-left: spacingTiny
      transition: transitionBase

      .-show &
        transform: rotate(180deg)

  &__Options
    position: absolute
    background: colorDarkBlue
    top: 100%
    transform: translate(1px, 0) scale(.7, .7)
    transform-origin: right top
    right: 0
    min-width: 10rem
    box-shadow: rgba(0,0,0,.1) 0 2px 5px
    transition-duration: transitionBase
    transition-property: opacity, transform
    opacity: 0
    top: -999rem

    .-show &
      transform: translate(1px, 0.5rem) scale(1, 1)
      opacity: 1
      top: 100%

    &::after
      size = 0.5rem
      content: ""
      position: absolute
      top: 0
      right: calc(1.25rem + 1px)
      transform: translate(50%, -100%)
      border-bottom: colorDarkBlue solid size
      border-left: transparent solid size
      border-right: transparent solid size

  &__Option
    display: block
    color: #fff
    font-size: 0.875rem
    white-space: nowrap
    padding: spacingSmall spacingBase
    cursor: pointer

    &:hover,
    &:focus
      color: colorPrimaryBlue
</style>
