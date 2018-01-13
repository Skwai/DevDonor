<template>
  <section class="ProjectVolunteers">
    <h3 class="ProjectVolunteers__Heading">Project Members ({{userCount}})</h3>
    <ul class="ProjectVolunteers__Users" v-if="userCount > 0">
      <li class="ProjectVolunteers__User"
        v-for="(user, key) in projectUserIds"
        v-if="user"
        :key="key"
      >
      <AppVolunteerAvatar :userId="key" :showDetails="true" /></li>
    </ul>
    <div v-else class="ProjectVolunteers__Empty">
      <p>This project needs your help!</p>
    </div>
  </section>
</template>

<script>
import AppVolunteerAvatar from '@/components/AppVolunteerAvatar'

export default {
  props: ['projectUserIds'],

  components: {
    AppVolunteerAvatar
  },

  computed: {
    userCount () {
      return this.projectUserIds ? Object.values(this.projectUserIds).filter((v) => v === true).length : 0
    }
  }
}
</script>

<style lang="stylus">
@require "../styles/config.styl"
@require "../styles/text.styl"
@require "../styles/card.styl"

.ProjectVolunteers
  card()

  &__Heading
    textCaps()
    margin-bottom: spacingBase
    opacity: .5
    text-align: center

  &__User + &__User
    margin-top: spacingSmall

  &__Empty
    text-align: center
</style>
