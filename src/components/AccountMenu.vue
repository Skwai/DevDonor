<template>
  <div class="AccountMenu" :class="{ '-open': showAccountMenu }">
    <button
      @click.prevent="toggleAccountMenu"
      class="AccountMenu__Toggle"
    >
      <AccountAvatar :picture="auth.photoURL" />
      <svg class="AccountMenu__ToggleIcon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"/></svg>
    </button>
    <div class="AccountMenu__Options" @click="onOptionsClick">
      <div class="AccountMenu__OptionGroup">
        <router-link to="/organization/create" class="AccountMenu__Option">Register a charity</router-link>
        <router-link
          v-for="(org, key) in orgs"
          :key="key"
          :to="'/organization/' + key"
          class="AccountMenu__Option"
        >{{org.name}}
          <img
            class="AccountMenu__OptionsLogo"
            :src="org.logo"
            :alt="org.name"
          >
        </router-link>
        <router-link to="/project/create" class="AccountMenu__Option">Create a project</router-link>
      </div>
      <div class="AccountMenu__OptionGroup">
        <router-link to="/profile" class="AccountMenu__Option">Your profile</router-link>
        <router-link to="/profile" class="AccountMenu__Option">Your projects <Counter>0</Counter></router-link>
      </div>
      <div class="AccountMenu__OptionGroup">
        <span tabindex="0" class="AccountMenu__Option" @click="logout">Logout</span>
      </div>
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
      'uid',
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
      orgs: {},
      showAccountMenu: false
    }
  },

  firebase () {
    return {
      userOrgs: {
        source: db.ref(`users/${this.uid}/organizations`),
        async readyCallback (snapshot) {
          const promises = []
          snapshot.forEach(({ key }) => {
            promises.push(db.ref(`organizations/${key}`).once('value'))
          })
          const orgSnapshots = await Promise.all(promises)
          const orgs = orgSnapshots.reduce((obj, s) => Object.assign(obj, { [s.key]: s.val() }), {})
          this.orgs = orgs
        }
      }
    }
  }
}
</script>

<style lang="stylus">
@require "../styles/config.styl"
@require "../styles/text.styl"

.AccountMenu
  position: relative
  margin-right: (-1 * spacingBase)

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
    &:focus,
    .-open &
      background: rgba(0,0,0,.05)

    &:focus
      outline: 0

    &Icon
      width: 1.5rem
      height: 1.5rem
      fill: currentColor
      margin-left: spacingTiny
      transition: transitionBase

      .-open &
        transform: rotate(180deg)

  &__Options
    position: absolute
    background: #fff
    transform: translate(0, 0.5rem) scale(.7, .7)
    transform-origin: right top
    right: 0
    top: -999rem
    box-shadow: rgba(0,0,0,.1) 0 2px 5px, rgba(0,0,0,.1) 0 0 0 1px
    transition-duration: transitionBase
    transition-property: opacity, transform
    opacity: 0
    margin: 0
    padding: spacingTiny 0
    color: fontColorBase
    font-size: 0.9375rem

    .-open &
      transform: translate(0, 0) scale(1, 1)
      opacity: 1
      top: 100%

  &__Option
    display: flex
    white-space: nowrap
    padding: spacingTiny spacingBase
    cursor: pointer
    transition: transitionBase
    white-space: nowrap
    align-items: center
    min-width: 16rem

    &:hover,
    &:focus
      background: colorHighlight

  &__OptionGroup + &__OptionGroup
    border-top: rgba(0,0,0,.1) solid 1px
    margin-top: spacingTiny
    padding-top: spacingTiny

  &__OptionsLogo
    margin-left: auto
    width: 1.5rem
    height: 1.5rem
    object-fit: cover
    border-radius: 50%

</style>
