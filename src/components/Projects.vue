<template>
  <div class="Projects">
    <Loading v-if="loading" />
    <div v-else>
      <div v-if="projects.length">
        <Filters>
          <Btn color="light">Skill: Any</Btn>
          <Btn color="light">Region: All</Btn>
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
import Loading from '@/components/Loading'
import Alert from '@/components/Alert'
import Filters from '@/components/Filters'
import Btn from '@/components/Btn'

export default {
  components: {
    Alert,
    ProjectPreview,
    Loading,
    Filters,
    Btn
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
