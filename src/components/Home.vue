<template>
  <div class="Home">
    <PitchPreview v-for="(pitch, index) in pitches" :pitch="pitch" :key="index"></PitchPreview>
  </div>
</template>

<script>
import { db } from '@/services/firebase'
import PitchPreview from '@/components/PitchPreview'

console.log(db.ref('pitches'))

export default {
  components: {
    PitchPreview
  },
  firebase: {
    pitches: db.ref('pitches')
  }
}
</script>

<style scoped lang="stylus">
</style>
