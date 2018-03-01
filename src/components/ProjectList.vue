<template>
  <div :class="$style.ProjectList">
    <div :class="$style.ProjectList__Filters">
      <ProjectFilters @update="onFilterChange" />
    </div>
    <div :class="$style.ProjectList__Projects">
      <AppLoading v-if="loading" />
      <div
        v-else-if="hasProjects"
        :class="$style.ProjectList__Items"
      >
        <div
          v-for="project in projects"
          :class="$style.ProjectList__Item"
          :key="project.id"
        >
          <ProjectPreview
            :project="project"
          />
        </div>
      </div>
      <div v-else :class="$style.ProjectList__Empty">
        <AppHeading>No Projects</AppHeading>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'
import Project from '../models/Project'
import IProjectList from '../interfaces/ProjectList'
import ProjectFilters from './ProjectFilters.vue'
import ProjectPreview from './ProjectPreview.vue'

@Component({
  components: {
    ProjectFilters,
    ProjectPreview
  }
})
export default class ProjectList extends Vue {
  private loading: boolean = false

  @Getter('getFilteredProjects') private projects: IProjectList
  @Action('loadProjects') private actionLoadProjects: () => Promise<void>
  @Action('setProjectFilters') private actionSetProjectFilters: (filters: any) => void

  private async created() {
    this.loadProjects()
  }

  private async loadProjects(filters: any = {}) {
    this.loading = true
    try {
      await this.actionLoadProjects()
    } catch (err) {
    } finally {
      this.loading = false
    }
  }

  get hasProjects(): boolean {
    return !!Object.keys(this.projects).length
  }

  private onFilterChange(filters: {}) {
    this.actionSetProjectFilters(filters)
    this.loadProjects()
  }
}
</script>

<style lang="stylus" module>
@import '../styles/config';
@import '../styles/container';

.ProjectList {
  display: grid;
  container();
  grid-gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: 14rem auto;
  }

  &__Items {
    display: grid;
    grid-gap: 1rem;
  }
}
</style>
