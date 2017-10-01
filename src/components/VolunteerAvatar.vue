<template>
  <router-link class="VolunteerAvatar" :to="{ name: 'volunteer', params: { userId } }" v-if="!loading">
    <MediaObject align="center">
      <img slot="object" class="VolunteerAvatar__Image" :src="user.picture" :alt="user.name">

      <template slot="body" v-if="showDetails">
        <div class="VolunteerAvatar__Name">{{user.name}}</div>
        <SmallCaps>{{user.role}}</SmallCaps>
      </template>
    </MediaObject>
  </router-link>
</template>

<script>
import SmallCaps from '@/components/SmallCaps'

export default {
  props: ['userId', 'showDetails'],

  components: {
    SmallCaps
  },

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

.VolunteerAvatar
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
