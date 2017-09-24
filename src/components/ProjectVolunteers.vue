<template>
  <section class="ProjectVolunteers">
    <h3 class="ProjectVolunteers__Heading">Project Members ({{userCount}})</h3>
    <ul class="ProjectVolunteers__Users">
      <li class="ProjectVolunteers__User"
        v-for="(user, key) in projectUserIds"
        v-if="user"
        :key="key"
      >
      <VolunteerAvatar :userId="key" :showDetails="true" /></li>
    </ul>
  </section>
</template>

<script>
import VolunteerAvatar from '@/components/VolunteerAvatar'

export default {
  props: ['projectUserIds'],

  components: {
    VolunteerAvatar
  },

  computed: {
    userCount () {
      return Object.values(this.projectUserIds).filter((v) => v === true).length
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


</style>
