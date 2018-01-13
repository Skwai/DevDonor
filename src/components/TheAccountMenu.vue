<template>
  <div class="TheAccountMenu" :class="{ '-open': showTheAccountMenu }">
    <button
      @click.prevent="toggleTheAccountMenu"
      class="TheAccountMenu__Toggle"
    >
      <AppAccountAvatar :picture="auth.photoURL" />
      <svg class="TheAccountMenu__ToggleIcon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z"/></svg>
    </button>
    <div class="TheAccountMenu__Options" @click="onOptionsClick">
      <Loading v-if="loading" size="small" />
      <template v-else>
        <router-link to="/organization/create" class="TheAccountMenu__Option">Register a charity</router-link>
        <router-link
          v-if="Object.keys(organizations)"
          v-for="(org, key) in organizations"
          :key="key"
          :to="'/organization/' + key"
          class="TheAccountMenu__Option"
        >{{org.name}}
          <img
            class="TheAccountMenu__OptionsLogo"
            :src="org.logo"
            :alt="org.name"
          >
        </router-link>
        <router-link to="/project/create" class="TheAccountMenu__Option">Create a project</router-link>
        <div class="TheAccountMenu__OptionsDivider"></div>
        <router-link to="/profile" class="TheAccountMenu__Option">Your profile</router-link>
        <router-link to="/projects" class="TheAccountMenu__Option">Your projects <Counter>{{projectCount}}</Counter></router-link>
        <div class="TheAccountMenu__OptionsDivider"></div>
        <span tabindex="0" class="TheAccountMenu__Option" @click="logout">Logout</span>
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AppAccountAvatar from '@/components/AppAccountAvatar'

export default {
  components: {
    AppAccountAvatar
  },

  data () {
    return {
      showTheAccountMenu: false,
      loading: true
    }
  },

  computed: {
    projectCount () {
      return this.$store.getters.getUserProjectCount(this.uid)
    },

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
    await this.$store.dispatch('getUserProjects', this.uid)
    this.loading = false
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
      this.showTheAccountMenu = false
    },

    onDocumentClick (ev) {
      if (!this.$el.contains(ev.target)) {
        this.showTheAccountMenu = false
      }
    },

    toggleTheAccountMenu () {
      this.showTheAccountMenu = !this.showTheAccountMenu
    }
  }
}
</script>

<style lang="stylus">
@require "../styles/config.styl"
@require "../styles/text.styl"
@require "../styles/options.styl"

.TheAccountMenu
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
