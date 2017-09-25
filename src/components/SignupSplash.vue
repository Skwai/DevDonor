<template>
  <Modal>
    <div class="SignupSplash">
      <div class="SignupSplash__Options">
        <router-link
          class="SignupSplash__Option"
          to="/organizations/create"
          @click.native="cancel"
        >
          <svg class="SignupSplash__OptionIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none" stroke-width="1" stroke-miterlimit="10" stroke-linecap="square"><path d="M4 7c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/><path d="M7 16v5H3v-4l-2-3v-4h6"/><path d="M20 7c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/><path d="M17 16v5h4v-4l2-3v-4h-6"/><path d="M12 7c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z"/><path d="M14 23h-4v-4l-3-3v-6h10v6l-3 3z"/></g></svg>
          <div class="SignupSplash__OptionLabel">Register a Charity</div>
          <div class="SignupSplash__OptionDescription">You will be able to create projects</div>
        </router-link>
        <router-link
          class="SignupSplash__Option"
          to="/profile"
          @click.native="cancel"
        >
          <svg class="SignupSplash__OptionIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g fill="none" stroke-width="1" stroke-miterlimit="10" stroke-linecap="square"><path d="M6 8l-4 4 4 4m12-8l4 4-4 4"/><path d="M10 20l4-16"/></g></svg>
          <div class="SignupSplash__OptionLabel">Create a volunteer profile</div>
          <div class="SignupSplash__OptionDescription">You will be able volunteer on projects</div>
        </router-link>
      </div>
      <button
        type="submit"
        class="SignupSplash__Cancel"
        @click.prevent="cancel"
      >Cancel</button>
    </div>
  </Modal>
</template>

<script>
import Modal from '@/components/Modal'

export default {
  components: {
    Modal
  },

  data () {
    return {
      SignupSplash: null
    }
  },

  beforeDestroy () {
    this.$store.dispatch('hideSignupSplash')
  },

  methods: {
    cancel () {
      this.$store.dispatch('hideSignupSplash')
    }
  }
}
</script>

<style lang="stylus">
@require "../styles/config.styl"
@require "../styles/text.styl"

.SignupSplash

  &__Options
    display: flex
    flex-wrap: wrap

    @media (min-width: 768px)
      flex-wrap: nowrap

  &__Option
    padding: spacingBase
    border: 0
    background: colorDarkBlue
    text-align: center
    flex: 1
    transition: transitionBase
    cursor: pointer
    color: #fff
    min-width: 20rem

    @media (min-width: 768px)
      padding: spacingLarge spacingLarge
      width: 20rem

    &:hover
      background: colorPrimaryBlue

    &:hover &Icon
      stroke: #fff

    &Icon
      width: 3rem
      height: 3rem
      stroke: colorPrimaryBlue
      transition: transitionBase

    &Label
      margin-top: spacingBase
      white-space: nowrap
      textCaps()
      margin-bottom: 0.25rem

    &Description
      font-size: fontSizeSmall
      opacity: .7

  &__Cancel
    background: #fff
    color: colorPrimaryBlue
    display: block
    border: 0
    textCaps()
    width: 100%
    padding: spacingBase
    box-shadow: rgba(0,0,0,.1) 0 -2px 1rem
    position: relative

    &:focus
      outline: 0
</style>
