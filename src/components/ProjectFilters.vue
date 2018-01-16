<template>
  <form :class="$style.ProjectFilters">
    <ProjectFilterCategory
      label="Skills"
      :options="skillOptions"
    />
    <ProjectFilterCategory
      label="Region"
      :options="regionOptions"
    />
    <ProjectFilterCategory
      label="Causes"
      :options="typeOptions"
    />
  </form>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import ProjectFilterCategory from '@/components/ProjectFilterCategory'

@Component({
  components: {
    ProjectFilterCategory
  }
})
export default class ProjectFilters extends Vue {
  skillOptions: string[] = [
    'Apps',
    'Frontend',
    'Backend',
    'UX'
  ]

  regionOptions: string[] = [
    'Australia',
    'USA',
    'Canada',
    'New Zealand'
  ]

  typeOptions: string[] = [
    'Animal welfare',
    'Homeless',
    'Sports clubs'
  ]
}
</script>

<style lang="stylus" module>
@import "../styles/config.styl"

.ProjectFilters
  &__Category
    // background: #fff
    border-top: $colorLightGray solid 1px
</style>
