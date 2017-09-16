<template>
  <div class="Pitches">
    <Loading v-if="loading" />
    <div v-else>
      <Filters>
        <Btn color="light">Skill: Any</Btn>
        <Btn color="light">Region: All</Btn>
      </Filters>
      <PitchPreview
        v-for="(pitch, index) in pitches"
        :pitch="pitch"
        :key="index"
      />
    </div>
  </div>
</template>

<script>
import { db } from '@/services/firebase'
import PitchPreview from '@/components/PitchPreview'
import Loading from '@/components/Loading'
import Filters from '@/components/Filters'
import Btn from '@/components/Btn'

export default {
  components: {
    PitchPreview,
    Loading,
    Filters,
    Btn
  },

  data () {
    return {
      loading: true
    }
  },

  firebase () {
    return {
      pitches: {
        source: db.ref('pitches').limitToFirst(20),
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
