<template>
  <AppPage>
    <AppHeading>Privacy Policy</AppHeading>
    <AppLoading v-if="loading" />
    <AppContent v-else-if="content" v-html="content"></AppContent>
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
      this.content = await loadMarkdownContent('privacy')
    } catch (err) {
      // TODO: error
    } finally {
      this.loading = false
    }
  }
}
</script>
