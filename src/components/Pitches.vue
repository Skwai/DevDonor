<template>
  <div class="Pitches">
    <Loading v-if="loading" />
    <PitchPreview
      v-else
      v-for="(pitch, index) in pitches"
      :pitch="pitch"
      :key="index"
    />
  </div>
</template>

<script>
import { db } from '@/services/firebase'
import PitchPreview from '@/components/PitchPreview'
import Loading from '@/components/Loading'

export default {
  components: {
    PitchPreview,
    Loading
  },

  data () {
    return {
      loading: true
    }
  },

  firebase () {
    return {
      pitches: {
        source: db.ref('pitches').orderByChild('createdAt').limitToLast(20),
        readyCallback () {
          this.loading = false
        }
      }
    }
  }
}
</script>

<style lang="stylus">
</style>
