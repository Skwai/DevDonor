<template>
  <div>
    <AppLoading v-if="loading" />
    <ProjectListItem
      v-else-if="projects.length"
      v-for="project in projects"
      :key="project.id"
    />
    <div v-else>
      No Projects
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'
import ProjectListItem from '@/components/ProjectListItem'
import AppLoading from '@/components/AppLoading'
import Project from '@/types/Project'

@Component({
  components: {
    ProjectListItem,
    AppLoading
  }
})
export default class ProjectList extends Vue {
  loading: boolean = false

  @Getter projects: Project[]
  @Action getProjects: () => Promise<void>

  async created () {
    this.loading = true
    try {
      await this.getProjects()
    } catch (err) {
      console.error(err)
    } finally {
      this.loading = false
    }
  }
}
</script>
