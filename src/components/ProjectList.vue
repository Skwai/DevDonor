<template>
  <div>
    <ProjectListItem v-for="project in projects" :key="project.id" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import ProjectListItem from '@/components/ProjectListItem'
import Project from '@/types/Project'

@Component({
  components: {
    ProjectListItem
  }
})
export default class ProjectList extends Vue {
  @Getter projects: Project[]
}
</script>
