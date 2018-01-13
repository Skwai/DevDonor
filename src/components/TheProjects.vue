<template>
  <div class="Projects">
    <AppLoading v-if="loading" />
    <template v-else>
      <div v-if="hasProjects" class="Projects__List">
        <div class="Projects__ListItem"
          v-for="(project, key) in projects"
          :key="key"
        >
          <AppProjectPreview :projectId="key" />
        </div>
      </div>
      <AppAlert v-else>Sorry, no projects found</AppAlert>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AppProjectPreview from '@/components/AppProjectPreview'

export default {
  components: {
    AppProjectPreview
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
