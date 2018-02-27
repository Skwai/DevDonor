<template>
  <form :class="$style.ProjectFilters">
    <ProjectFilterCategory
      label="Project Type"
      :options="projectTypeOptions"
      v-model="filters.projectTypes"
    />
    <ProjectFilterCategory
      label="Region"
      :options="countryOptions"
      v-model="filters.countries"
    />
    <ProjectFilterCategory
      label="Causes"
      :options="causeOptions"
      v-model="filters.causes"
    />
  </form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'
import ProjectFilterCategory from './ProjectFilterCategory.vue'
import { CAUSES } from '../data/causes'
import { PROJECT_TYPES } from '../data/project'
import { COUNTRIES } from '../data/countries'

interface IFilters {
  [key: string]: string[]
}

@Component({
  components: {
    ProjectFilterCategory
  }
})
export default class ProjectFilters extends Vue {
  private projectTypeOptions = PROJECT_TYPES
  private countryOptions = COUNTRIES
  private causeOptions = CAUSES

  private filters: IFilters = {
    countries: [],
    causes: [],
    projectTypes: []
  }

  private setFilter(filter: string, value: string[]) {
    this.filters[filter] = value
  }
}
</script>

<style lang="stylus" module>
@import '../styles/config.styl';

.ProjectFilters {
  &__Category {
    background: #fff;
    border-top: $colorLightGray solid 1px;
  }
}
</style>
