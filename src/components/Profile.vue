<template>
  <Page>
    <div slot="content">
      <img :src="getProfile.picture">
      <h1>{{getProfile.name}}</h1>

    </div>
    <div slot="sidebar">
      <div>
        Projects etc. go here
      </div>
    </div>
  </Page>
</template>

<script>
import Page from '@/components/Page'
import { mapGetters } from 'vuex'

export default {
  components: {
    Page
  },

  created () {
    console.log(this.getProfile)
  },

  computed: {
    ...mapGetters([
      'getProfile'
    ])
  }
}
</script>

<style lang="stylus">
@require "../styles/config.styl"
@require "../styles/text.styl"

.Profile
  margin-left: auto

</style>
