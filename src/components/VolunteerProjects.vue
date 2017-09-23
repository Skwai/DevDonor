<template>
  <div class="VolunteerProjects">
    <h3 class="VolunteerProjects__Heading">Volunteer's Projects</h3>
    <div v-if="projectIds.length">
      Nothing yet
    </div>
    <ul class="VolunteerProjects__Projects" v-else>
      <li class="VolunteerProjects__Project" v-for="(project, key) in projectIds" :key="key">
        <VolunteerProject :projectId="key" />
      </li>
    </ul>
  </div>
</template>

<script>
import VolunteerProject from '@/components/VolunteerProject'

export default {
  props: ['projectIds'],

  components: {
    VolunteerProject
  }
}
</script>

<style lang="stylus">
@require "../styles/config.styl"
@require "../styles/text.styl"
@require "../styles/card.styl"

.VolunteerProjects
  card()

  &__Heading
    font-size: 87.5%;
    text-transform: uppercase;
    font-weight: 500;
    letter-spacing: 0.05em;
    margin-bottom: 1.5rem;
    opacity: 0.5;
    text-align: center;

  &__Project + &__Project
    margin-top: spacingSmall

</style>
