<template>
  <article>
    <ProjectList />
  </article>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import ProjectList from '@/components/ProjectList.vue'

@Component({
  components: {
    ProjectList
  }
})
export default class HomePage extends Vue {}
</script>

<style lang="stylus" module>
</style>
