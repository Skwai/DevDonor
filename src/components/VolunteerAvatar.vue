<template>
  <router-link class="VolunteerAvatar" :to="{ name: 'volunteer', params: { userId } }">
    <div class="VolunteerAvatar__ImageWrap">
      <img class="VolunteerAvatar__Image" :src="volunteer.picture" :alt="volunteer.name">
    </div>
    <div class="VolunteerAvatar__Details" v-if="showDetails">
      <div class="VolunteerAvatar__Name">{{volunteer.name}}</div>
      <SmallCaps>{{volunteer.role}}</SmallCaps>
    </div>
  </router-link>
</template>

<script>
import { db } from '@/services/firebase'
import SmallCaps from '@/components/SmallCaps'

export default {
  props: ['userId', 'showDetails'],

  components: {
    SmallCaps
  },

  data () {
    return {
      loading: true
    }
  },

  firebase () {
    return {
      volunteer: {
        source: db.ref('users').child(this.userId),
        asObject: true,
        readyCallback (snapshot) {
          this.loading = false
        }
      }
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
    margin-left: spacingSmall

  &__Name
    font-weight: 500

  &__ImageWrap
    size = 3.5rem
    width: size
    height: size
    display: inline-flex
    line-height: 1
    justify-content: stretch
    align-items: stretch
    border-radius: borderRadiusBase
    overflow: hidden
    transition: transitionBase
    transform: translate3d(0,0,0)

  &__Image
    width: 100%
    height: 100%
    object-fit: cover
    display: block
    transform: translate3d(0,0,0)

</style>
