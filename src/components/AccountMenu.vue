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
      <router-link to="/organization/create" class="AccountMenu__Option">Register a charity</router-link>
      <router-link
        v-for="(org, key) in organizations"
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
      <div class="AccountMenu__OptionsDivider"></div>
      <router-link to="/profile" class="AccountMenu__Option">Your profile</router-link>
      <router-link to="/projects" class="AccountMenu__Option">Your projects <Counter>0</Counter></router-link>
      <div class="AccountMenu__OptionsDivider"></div>
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

  data () {
    return {
      showAccountMenu: false
    }
  },

  computed: {
    organizations () {
      return this.$store.getters.getUserOrganizations(this.uid)
    },

    ...mapGetters([
      'uid',
      'auth'
    ])
  },

  async created () {
    await this.$store.dispatch('getUserOrganizations', this.uid)
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
  }
}
</script>

<style lang="stylus">
@require "../styles/config.styl"
@require "../styles/text.styl"
@require "../styles/options.styl"

.AccountMenu
  position: relative
  margin-right: (-1 * spacingBase)

  &__Toggle
    background: none
    border: 0
    padding: 0
    display: flex
    align-items: center
    position: relative
    transition: transitionBase
    padding: spacingSmall spacingBase
    color: inherit

    &:hover,
    &:focus,
    .-open &
      background: rgba(0,0,0,.05)

    &:focus
      outline: 0

    &Icon
      width: 1.25rem
      height: 1.25rem
      margin-left: spacingTiny
      transition: transitionBase
      fill: currentColor

      .-open &
        transform: rotate(180deg)

  &__Options
    optionsList()
    transform-origin: right top
    right: 0
    left: auto

  &__Option
    optionsItem()
    min-width: 16rem

    &:hover,
    &:focus
      background: colorHighlight

  &__OptionsDivider
    optionsDivider()

  &__OptionsLogo
    margin-left: auto
    width: 1.5rem
    height: 1.5rem
    object-fit: cover
    border-radius: 50%
</style>
