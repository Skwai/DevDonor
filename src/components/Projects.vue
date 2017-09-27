<template>
  <div class="Projects">
    <Loading v-if="loading" />
    <template v-else>
      <Filters>
        <FilterMenu
          label="Skill"
          :options="skillOptions"
          :value.sync="filters.skill"
        />
        <FilterMenu
          label="Region"
          :options="regionOptions"
          :value.sync="filters.region"
        />
      </Filters>
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
import { db, formatObjects } from '@/services/firebase'
import ProjectPreview from '@/components/ProjectPreview'
import Filters from '@/components/Filters'

const PROJECTS_PER_PAGE = 100

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

  watch: {
    'filters.skill' (val) {
      this.getProjects()
    },
    'filters.region' (val) {
      this.getProjects()
    }
  },

  created () {
    this.getProjects()
  },

  methods: {
    async getProjects () {
      this.loading = true
      try {
        const ref = db.ref('projects')
        const snapshot = await ref.limitToFirst(PROJECTS_PER_PAGE).once('value')
        const projects = formatObjects(snapshot)
        const { skill, region } = this.filters
        const { countries } = this
        const filtered = projects
          .filter((v) => skill ? (v.skills && skill in v.skills) : true)
          .filter((v) => {
            // Get the region of the project country
            const [r] = Object.values(countries)
              .filter((c) => c['.key'] === v.country)
              .map((c) => c['.value'])
            return region ? r === region : true
          })
        this.projects = filtered
      } catch (err) {
        console.log(err)
        this.$store.dispatch('showNotification', {
          message: 'Error retrieving projects',
          type: 'error'
        })
      } finally {
        this.loading = false
      }
    }
  },

  firebase () {
    return {
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
