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
      :options="causeOptions"
    />
  </form>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'
import ProjectFilterCategory from './ProjectFilterCategory.vue'
import CAUSE_OPTIONS from '../utils/causes'

@Component({
  components: {
    ProjectFilterCategory
  }
})
export default class ProjectFilters extends Vue {
  private skillOptions: string[] = ['Apps', 'Frontend', 'Backend', 'UX']
  private regionOptions: string[] = ['Australia', 'USA', 'Canada', 'New Zealand']
  private causeOptions = CAUSE_OPTIONS

  private filters = {
    regions: [],
    causes: [],
    skills: []
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
