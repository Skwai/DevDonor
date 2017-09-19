<template>
  <section class="ProjectUsers">
    <h3 class="ProjectUsers__Heading">Project Members ({{userCount}})</h3>
    <ul class="ProjectUsers__Users">
      <li class="ProjectUsers__User"
        v-for="(user, key) in projectUserIds"
        :key="key"
      >
      <UserAvatar :userId="key" :showDetails="true" /></li>
    </ul>
  </section>
</template>

<script>
import UserAvatar from '@/components/UserAvatar'

export default {
  props: ['projectUserIds'],

  components: {
    UserAvatar
  },

  computed: {
    userCount () {
      return Object.keys(this.projectUserIds).length
    }
  }
}
</script>

<style lang="stylus">
@require "../styles/config.styl"
@require "../styles/text.styl"
@require "../styles/card.styl"

.ProjectUsers
  card()

  &__Heading
    textCaps()
    margin-bottom: spacingBase
    opacity: .5
    text-align: center

  &__User + &__User
    margin-top: spacingSmall


</style>
