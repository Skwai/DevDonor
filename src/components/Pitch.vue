<template>
  <div class="Pitch">
    <Loading v-if="loading" />
    <div v-else>
      <h1>{{ organization.name }}</h1>
      <p>{{pitch.description}}</p>
    </div>
  </div>
</template>

<script>
import { db, bindObject } from '@/services/firebase'
import PitchPreview from '@/components/PitchPreview'
import Loading from '@/components/Loading'

export default {
  components: {
    PitchPreview,
    Loading
  },

  data () {
    return {
      loading: true,
      pitch: {},
      organization: {}
    }
  },

  async created () {
    try {
      const pitch = await bindObject(this, 'pitch', db.ref('pitches').child(this.$route.params.pitchId))
      await bindObject(this, 'organization', db.ref('organizations').child(pitch.organization))
    } finally {
      this.loading = false
    }
  }
}
</script>

<style lang="stylus">
</style>
