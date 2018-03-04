<template>
  <div :class="$style.ProjectList">
    <div :class="$style.ProjectList__Filters">
      <ProjectFilters @update="onFilterChange" />
    </div>
    <div :class="$style.ProjectList__Projects">
      <!--<h1 :class="$style.ProjectList__Heading">Current Projects</h1>-->
      <AppLoading v-if="loading" />
      <div v-else-if="error" :class="$style.ProjectList__Error">
        <h3>There was an error loading projects</h3>
      </div>
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

@Component({
  components: {
    ProjectFilters,
    ProjectPreview
  }
})
export default class ProjectList extends Vue {
  private loading: boolean = false
  private error: boolean = false

  @Getter('getFilteredProjects') private projects: IProjectList
  @Action('loadProjects') private actionLoadProjects: () => Promise<void>
  @Action('setProjectFilters') private actionSetProjectFilters: (filters: any) => void

  private async created() {
    this.loadProjects()
  }

  private async loadProjects(filters: any = {}) {
    this.loading = true
    this.error = false

    try {
      await this.actionLoadProjects()
    } catch (err) {
      this.error = true
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
    grid-gap: 1rem;
  }

  &__Error {
    card();
    text-align: center;
  }

  &__Empty {
    card();
    text-align: center;
  }

  &__Heading {
    text-align: center;
    margin-top: 0;
    textCaps();
    font-size: 1rem;
    margin-bottom: $spacingBase;
    font-weight: 600;
    opacity: 0.7;
  }
}
</style>
