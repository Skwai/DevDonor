<template>
  <div class="Projects">
    <Loading v-if="loading" />
    <div v-else>
      <div v-if="projects.length">
        <Filters>
          <FilterMenu label="Skill" />
          <FilterMenu label="Skill" />
        </Filters>
        <ProjectPreview
          v-for="(project, index) in projects"
          :project="project"
          :key="index"
        />
      </div>
      <div v-else>
        <Alert>Sorry, no projects found</Alert>
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
      loading: true
    }
  },

  firebase () {
    return {
      projects: {
        source: db.ref('projects').limitToFirst(20),
        readyCallback () {
          this.loading = false
        }
      }
    }
  }
}
</script>

<style lang="stylus">
</style>
