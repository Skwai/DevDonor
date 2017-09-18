<template>
  <div class="AccountMenu" :class="{ '-show': showAccountMenu }">
    <button
      @click.prevent="toggleAccountMenu"
      class="AccountMenu__Toggle"
    ><AccountAvatar :picture="getProfile.picture" /> <span class="AccountMenu__UserName">{{getProfile.given_name}}</span></button>
    <div class="AccountMenu__Options">
      <router-link to="profile" class="AccountMenu__Option">Your Profile</router-link>
      <router-link to="logout" class="AccountMenu__Option">Logout</router-link>
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
      'getProfile'
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

  &__UserName
    textSmallCaps()
    margin-left: 1rem
    line-height: 1

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
    padding: 1rem spacingBase

    &:hover
      color: colorPrimaryBlue
</style>
