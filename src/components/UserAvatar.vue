<template>
  <div class="UserAvatar">
    <img :src="user.profilePicture" :alt="user.name">
  </div>
</template>

<script>
export default {
  props: ['user']
}
</script>

<style lang="stylus">
@require "../styles/config.styl"

.UserAvatar
  font-size: 1.15rem
  font-weight: 500
  padding: spacingBase
  text-align: center

</style>
