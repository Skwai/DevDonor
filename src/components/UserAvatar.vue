<template>
  <Loading size="small" v-if="loading" />
  <router-link class="UserAvatar" :to="{ name: 'profile', params: { profileId: userId } }" v-else>
    <div class="UserAvatar__ImageWrap">
      <img class="UserAvatar__Image" :src="user.picture" :alt="user.name">
    </div>
    <div class="UserAvatar__Details" v-if="showDetails">
      <div class="UserAvatar__Name">{{user.name}}</div>
      <SmallCaps>{{user.role}}</SmallCaps>
    </div>
  </router-link>
</template>

<script>
import { db } from '@/services/firebase'
import Loading from '@/components/Loading'
import SmallCaps from '@/components/SmallCaps'

export default {
  props: ['userId', 'showDetails'],

  components: {
    Loading,
    SmallCaps
  },

  data () {
    return {
      loading: true
    }
  },

  firebase () {
    return {
      user: {
        source: db.ref('users').child(this.userId),
        asObject: true,
        readyCallback () {
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

.UserAvatar
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
