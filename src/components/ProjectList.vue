<template>
  <div :class="$style.ProjectList">
    <div :class="$style.ProjectList__Filters">
      <ProjectFilters />
    </div>
    <div :class="$style.ProjectList__Projects">
      <AppSubheading justify="center">Current Projects</AppSubheading>
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
import { IStateProjectList } from '../store/State'
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

  @Getter('getProjects') private projects: IStateProjectList
  @Action private loadProjects: () => Promise<void>

  private async created() {
    this.loading = true
    try {
      await this.loadProjects()
    } catch (err) {
    } finally {
      this.loading = false
    }
  }

  private hasProjects(): boolean {
    return !!Object.keys(this.projects).length
  }
}
</script>

<style lang="stylus" module>
@import '../styles/config.styl';
@import '../styles/container.styl';

.ProjectList {
  container();
  display: grid;
  grid-gap: 2rem;

  @media (min-width: 1024px) {
    grid-template-columns: 14rem auto;
  }
}
</style>
