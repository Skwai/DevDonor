<template>
  <div class="Projects">
    <Loading v-if="loading" />
    <template v-else>
      <div v-if="projects.length" class="Projects__List">
        <div class="Projects__ListItem"
          v-for="(project, index) in projects"
          :key="index"
        >
          <ProjectPreview
            :project="project"
          />
        </div>
      </div>
      <Alert v-else>Sorry, no projects found</Alert>
    </template>
  </div>
</template>

<script>
import { db } from '@/services/firebase'
import ProjectPreview from '@/components/ProjectPreview'
import Filters from '@/components/Filters'

const PROJECTS_PER_PAGE = 30

export default {
  components: {
    ProjectPreview,
    Filters
  },

  data () {
    return {
      loading: true,
      projects: [],

      skillOptions: [],
      regionOptions: [],

      filters: {
        skill: null,
        region: null
      }
    }
  },

  firebase () {
    return {
      projects: {
        source: db.ref('projects').limitToFirst(PROJECTS_PER_PAGE),
        readyCallback () {
          this.loading = false
        }
      },
      skills: {
        source: db.ref('skills'),
        readyCallback (snapshot) {
          this.skillOptions = Object.keys(snapshot.val())
        }
      },
      countries: {
        source: db.ref('countries'),
        readyCallback (snapshot) {
          this.regionOptions = [...new Set(Object.values(snapshot.val()))]
        }
      }
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

    @media (min-width: 640px)
      flex: 0 0 50%

    @media (min-width: 1024px)
      flex: 0 0 (100% / 3)
</style>
