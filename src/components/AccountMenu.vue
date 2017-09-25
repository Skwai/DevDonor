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
      <router-link to="/organization/create" class="AccountMenu__Option">Register an organization</router-link>
      <router-link v-for="(org, key) in userOrgs" :key="key" :to="'/organization/' + org['.key']">{{org['.key']}}</router-link>
      <router-link to="/project/create" class="AccountMenu__Option">Create a project</router-link>
      <router-link to="/profile" class="AccountMenu__Option">Your profile</router-link>
      <span tabindex="0" class="AccountMenu__Option" @click="logout">Logout</span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AccountAvatar from '@/components/AccountAvatar'
import { db } from '@/services/firebase'

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
  },
  firebase () {
    return {
      userOrgs: db.ref(`user/${this.uid}/organizations`)
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
    transition: transitionBase
    padding: spacingSmall spacingBase

    &:hover,
    &:focus
      background: rgba(0,0,0,.05)

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
    background: #fff
    transform: translate(0, 0.5rem) scale(.7, .7)
    transform-origin: right top
    right: 0
    min-width: 10rem
    box-shadow: rgba(0,0,0,.1) 0 2px 5px, rgba(0,0,0,.1) 0 0 0 1px
    transition-duration: transitionBase
    transition-property: opacity, transform
    opacity: 0
    top: -999rem
    padding: spacingTiny 0
    color: fontColorBase
    margin: 0

    .-show &
      transform: translate(0, 0) scale(1, 1)
      opacity: 1
      top: 100%

  &__Option
    display: block
    white-space: nowrap
    padding: 0.75rem spacingBase
    cursor: pointer
    transition: 0.2s

    &:hover,
    &:focus
      background: colorHighlight
      // color: colorPrimaryBlue
</style>
