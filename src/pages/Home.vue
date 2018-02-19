<template>
  <article>
    <TheIntro />
    <ProjectList />
  </article>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import ProjectList from '../components/ProjectList.vue'
import TheIntro from '../components/TheIntro.vue'

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
