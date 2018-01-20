<template>
  <article>
    <TheIntro />
    <ProjectList />
    <router-view />
  </article>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import ProjectList from '@/components/ProjectList.vue'
import TheIntro from '@/components/TheIntro.vue'

@Component({
  components: {
    ProjectList,
    TheIntro
  }
})
export default class HomePage extends Vue {}
</script>

<style lang="stylus" module>
</style>
