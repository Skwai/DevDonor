<template>
  <article>
    <h1>{{project.title}}</h1>
  </article>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'
import ProjectList from '@/components/ProjectList.vue'
import TheIntro from '@/components/TheIntro.vue'

@Component
export default class HomePage extends Vue {
  loading: boolean = true

  @Action getProject: (projectID: string) => Promise<void>

  async created () {
    const projectID = this.$route.params.projectID
    try {
      await this.getProject(projectID)
    } catch (err) {
      console.error(err)
    } finally {
      this.loading = false
    }
  }
}
</script>

<style lang="stylus" module>
</style>
