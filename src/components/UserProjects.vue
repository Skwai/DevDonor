<template>
  <Loading v-if="loading" />
  <div v-else class="UserProjects">
    <Container>
      <header class="UserProjects__Header">
        <Heading>Your Projects</Heading>
        <p>These are the projects you're currently participating in</p>
      </header>
      <div v-if="hasProjects" class="UserProjects__List">
        <div class="UserProjects__ListItem"
          v-for="(project, key) in projects"
          :key="key"
        >
          <ProjectPreview
            :projectId="key"
          />
        </div>
      </div>
      <Alert v-else>Sorry, no projects found</Alert>
    </Container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ProjectPreview from '@/components/ProjectPreview'

export default {
  components: {
    ProjectPreview
  },

  computed: {
    hasProjects () {
      return !!Object.keys(this.projects).length
    },
    ...mapGetters(['uid'])
  },

  data () {
    return {
      loading: true
    }
  },

  async created () {
    await this.$store.dispatch('getUserProjects', this.uid)
    this.projects = this.$store.getters.getUserProjects(this.uid)
    this.loading = false
  }
}
</script>

<style lang="stylus">
@require "../styles/config.styl"

.UserProjects
  padding: 0 spacingBase

  &__Header
    text-align: center
    padding: spacingBase 0

  &__List
    display: flex
    flex-wrap: wrap
    margin: (spacingBase / 2) (spacingBase / -2)

  &__ListItem
    display: flex
    padding: (spacingBase / 2)
    flex: 0 0 100%

    @media (min-width: 640px)
      flex: 0 0 50%

    @media (min-width: 1024px)
      flex: 0 0 (100% / 3)
</style>
