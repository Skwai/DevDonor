<template>
  <router-link class="AppVolunteerAvatar" :to="{ name: 'volunteer', params: { userId } }" v-if="!loading">
    <AppMediaObject align="center">
      <img slot="object" class="AppVolunteerAvatar__Image" :src="user.picture" :alt="user.name">

      <template slot="body" v-if="showDetails">
        <div class="AppVolunteerAvatar__Name">{{user.name}}</div>
        <AppSmallCaps>{{user.role}}</AppSmallCaps>
      </template>
    </AppMediaObject>
  </router-link>
</template>

<script>
export default {
  props: ['userId', 'showDetails'],

  data () {
    return {
      user: null,
      loading: true
    }
  },

  async created () {
    try {
      await this.$store.dispatch('getUser', this.userId)
      this.user = this.$store.getters.getUser(this.userId)
    } finally {
      this.loading = false
    }
  }
}
</script>

<style lang="stylus">
@require "../styles/config.styl"
@require "../styles/text.styl"

.AppVolunteerAvatar
  display: flex
  align-items: center

  &:hover &__ImageWrap
    transform: scale(1.1)

  &:hover &__Name
    color: colorPrimaryBlue

  &__Details
    flex: 1

  &__Name
    font-weight: 500

  &__Image
    object-fit: cover
    size = 4rem
    width: size
    height: size
    border-radius: borderRadiusBase
    overflow: hidden
    transition: transitionBase
    transform: translate3d(0,0,0)

</style>
