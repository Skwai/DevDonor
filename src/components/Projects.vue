<template>
  <div class="Projects">
    <Loading v-if="loading" />
    <div v-else>
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
          <FilterMenu
            label="Status"
            :options="statusOptions"
            :value.sync="filters.status"
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
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '@/services/firebase'
import ProjectPreview from '@/components/ProjectPreview'
import Filters from '@/components/Filters'

export default {
  components: {
    ProjectPreview,
    Filters
  },

  data () {
    return {
      loading: true,

      skillOptions: [],
      regionOptions: [],
      statusOptions: [],

      filters: {
        skill: null,
        region: null,
        status: null
      }
    }
  },

  firebase () {
    return {
      projects: {
        source: db.ref('projects').limitToFirst(20),
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
      regions: {
        source: db.ref('countries'),
        readyCallback (snapshot) {
          this.regionOptions = Object.keys(snapshot.val())
        }
      }
    }
  }
}
</script>

<style lang="stylus">
@require "../styles/config.styl"

.Projects
  &__List
    display: flex
    flex-wrap: wrap
    margin: (-1 * spacingBase / 2)

  &__ListItem
    display: flex
    flex: 0 0 (100% / 3)
    padding: (spacingBase / 2)

</style>
