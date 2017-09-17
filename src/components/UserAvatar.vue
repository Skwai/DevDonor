<template>
  <router-link class="UserAvatar" to="#">
    <div class="UserAvatar__ImageWrap">
      <img class="UserAvatar__Image" :src="user.profilePicture" :alt="user.name">
    </div>
    <div class="UserAvatar__Details" v-if="showDetails">
      <div class="UserAvatar__Name">{{user.name}}</div>
      <div class="UserAvatar__Role">{{user.role}}</div>
    </div>
  </router-link>
</template>

<script>
export default {
  props: ['user', 'showDetails']
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
    margin-left: 1rem

  &__Name
    font-weight: 500

  &__Role
    textSmallCaps()
    opacity: .5

  &__ImageWrap
    size = 3.5rem
    width: size
    height: size
    display: inline-flex
    line-height: 1
    justify-content: stretch
    align-items: stretch
    border-radius: 4px
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
