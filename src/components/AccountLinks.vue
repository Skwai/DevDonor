<template>
  <div class="AccountLinks">
    <router-link class="AccountLinks__Item" to="/profile">Profile</router-link>
    <div class="AccountLinks__Item AccountLinks__Dropdown">Projects</div>
    <div class="AccountLinks__Item AccountLinks__Dropdown">Charities</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { db } from '@/services/firebase'

export default {
  computed: {
    ...mapGetters([
      'uid'
    ])
  },

  firebase () {
    const { uid } = this
    return {
      userProjects: {
        source: db.ref(`users/${uid}/projects`)
      }
    }
  }
}
</script>

<style lang="stylus">
@require "../styles/config.styl"
@require "../styles/text.styl"

.AccountLinks
  font-weight: 500
  text-align: center
  display: flex
  height: 100%
  textCaps()

  &__Item
    height: 100%
    padding: spacingSmall spacingBase
    transition: transitionBase
    display: flex
    align-items: center
    position: relative

    &:hover,
    &:focus
      background: rgba(0,0,0,.05)
</style>
