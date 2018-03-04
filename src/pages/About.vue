<template>
  <AppPage>
    <AppHeading>About this website</AppHeading>
    <AppContent v-html="content"></AppContent>
  </AppPage>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { loadMarkdownContent } from '../services/content'

@Component
export default class AboutPage extends Vue {
  private loading = false
  private content: string | null = null

  private async created() {
    this.loading = true
    try {
      this.content = await loadMarkdownContent('about')
    } catch (err) {
      // TODO: error
    } finally {
      this.loading = false
    }
  }
}
</script>
