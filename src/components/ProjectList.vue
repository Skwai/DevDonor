<template>
  <div :class="$style.ProjectList">
    <div :class="$style.ProjectList__Filters">
      <ProjectFilters @update="onFilterChange" />
    </div>
    <div :class="$style.ProjectList__Projects">
      <AppLoading v-if="loading" />
      <div v-else-if="error" :class="$style.ProjectList__Error">
        <AppWarning>There was an error loading projects</AppWarning>
      </div>
      <div
        v-else-if="projects.length"
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
        <div v-if="getNextProjectId" :class="$style.ProjectList__More">
          <AppBtn @click="loadNextPage" :loading="loadingNextPage">Load more</AppBtn>
        </div>
      </div>
      <div v-else :class="$style.ProjectList__Empty">
        <h3>Sorry, no projects found</h3>
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
import IProjectFilters from '@/interfaces/ProjectFilters'

@Component({
  components: {
    ProjectFilters,
    ProjectPreview
  }
})
export default class ProjectList extends Vue {
  private loading: boolean = false
  private loadingNextPage: boolean = false
  private error: boolean = false
  private projectFilters: IProjectFilters = {
    projectType: '',
    country: '',
    organizationType: ''
  }
  private projects: Project[] = []
  private pages = 1

  @Getter private getNextProjectId: string | null

  @Getter
  private getFilteredProjects: (
    {
      projectFilters,
      pages,
      projectsPerPage
    }: {
      projectFilters: IProjectFilters
      pages?: number
      projectsPerPage?: number
    }
  ) => Project[]

  @Action('loadProjects')
  private actionLoadProjects: (
    {
      projectFilters,
      projectsPerPage,
      startAtProjectId
    }: {
      projectFilters: IProjectFilters
      projectsPerPage?: number
      startAtProjectId?: string | null
    }
  ) => Promise<void>

  private async created() {
    this.loadProjects()
  }

  private async loadProjects(filters: any = {}) {
    this.loading = true
    this.error = false
    this.projects = []
    this.pages = 1

    const { projectFilters } = this

    try {
      await this.actionLoadProjects({ projectFilters })
      this.projects = this.getFilteredProjects({ projectFilters })
    } catch (err) {
      this.error = true
    } finally {
      this.loading = false
    }
  }

  private async loadNextPage() {
    if (!this.getNextProjectId) {
      return
    }

    this.loadingNextPage = true
    this.pages += 1
    const { projectFilters, projects, pages } = this

    try {
      await this.actionLoadProjects({ projectFilters, startAtProjectId: this.getNextProjectId })
      this.projects = this.getFilteredProjects({ projectFilters, pages })
    } finally {
      this.loadingNextPage = false
    }
  }

  private onFilterChange(filters: IProjectFilters) {
    this.projectFilters = filters
    this.loadProjects()
  }
}
</script>

<style lang="stylus" module>
@import '../styles/config';
@import '../styles/container';
@import '../styles/card';
@import '../styles/text';

.ProjectList {
  display: grid;
  container();
  grid-gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: 14rem auto;
  }

  &__Items {
    display: grid;
    card();
    padding: 0;
  }

  &__Error {
    card();
    text-align: center;
  }

  &__Empty {
    card();
    text-align: center;
  }

  &__More {
    text-align: center;
    padding: 0.5rem;
  }
}
</style>
