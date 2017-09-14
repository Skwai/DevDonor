<template>
  <div class="Home">
    <PitchPreview v-for="(pitch, index) in pitchPreviews" :pitch="pitch" :key="index"></PitchPreview>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PitchPreview from '@/components/PitchPreview'

export default {
  computed: {
    ...mapGetters([
      'pitchPreviews'
    ])
  },
  components: {
    PitchPreview
  }
}
</script>

<style scoped lang="stylus">
</style>
