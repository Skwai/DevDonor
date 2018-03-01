<template>
  <form :class="$style.ProjectFilters">
    <ProjectFilterCategory
      label="Project Type"
      :options="projectTypeOptions"
      v-model="filters.projectType"
    />
    <ProjectFilterCategory
      label="Region"
      :options="countryOptions"
      v-model="filters.country"
    />
    <ProjectFilterCategory
      label="Causes"
      :options="organizationTypeOptions"
      v-model="filters.organizationType"
    />
  </form>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import ProjectFilterCategory from './ProjectFilterCategory.vue'
import { ORGANIZATION_TYPES } from '../data/organization-types'
import { PROJECT_TYPES } from '../data/project'
import { COUNTRIES } from '../data/countries'
import IProjectFilters from '../interfaces/ProjectFilters'

@Component({
  components: {
    ProjectFilterCategory
  }
})
export default class ProjectFilters extends Vue {
  private projectTypeOptions = PROJECT_TYPES
  private countryOptions = COUNTRIES
  private organizationTypeOptions = ORGANIZATION_TYPES

  private filters: IProjectFilters = {
    country: '',
    organizationType: '',
    projectType: ''
  }

  @Watch('filters', { deep: true })
  private onFiltersChange(filters: IProjectFilters) {
    this.$emit('update', this.filters)
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
