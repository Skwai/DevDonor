<template>
  <div class="Projects">
    <Loading v-if="loading" />
    <template v-else>
      <div v-if="hasProjects" class="Projects__List">
        <div class="Projects__ListItem"
          v-for="(project, key) in projects"
          :key="key"
        >
          <ProjectPreview :projectId="key" />
        </div>
      </div>
      <Alert v-else>Sorry, no projects found</Alert>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ProjectPreview from '@/components/ProjectPreview'

export default {
  components: {
    ProjectPreview
  },

  data () {
    return {
      loading: true
    }
  },

  computed: {
    projects () {
      return this.getProjects()
    },
    hasProjects () {
      return Object.keys(this.projects).length
    },
    ...mapGetters(['getProjects'])
  },

  async created () {
    try {
      await this.$store.dispatch('getProjects')
    } finally {
      this.loading = false
    }
  }
}
</script>

<style lang="stylus">
@require "../styles/config.styl"

.Projects
  padding: 0 spacingBase

  &__List
    display: flex
    flex-wrap: wrap
    margin: (spacingBase / 2) (spacingBase / -2)

  &__ListItem
    display: flex
    padding: (spacingBase / 2)
    flex: 0 0 100%

    @media (min-width: 480px)
      flex: 0 0 50%

    @media (min-width: 768px)
      flex: 0 0 (100% / 3)
</style>
