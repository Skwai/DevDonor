<template>
  <div :class="$style.ProjectList">
    <AppLoading v-if="loading" />
    <div
      v-else-if="projects.length"
      v-for="project in projects"
      class="$style.ProjectList__Item"
      :key="project.id"
    >
      <ProjectPreview
        :project="project"
      />
    </div>
    <div v-else :class="$style.ProjectList__Empty">
      <AppHeading>No Projects</AppHeading>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'
import ProjectPreview from '@/components/ProjectPreview'
import Project from '@/models/Project'

@Component({
  components: {
    ProjectPreview
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

<style lang="stylus" module>
@import "../styles/container.styl"

.ProjectList
  container()
  display: grid
  grid-template-columns: 20rem 20rem 20rem
  grid-gap: 1rem
  justify-content: center

  &__Item
    justify-self: stretch

  &__Empty
    text-align: center
</style>
