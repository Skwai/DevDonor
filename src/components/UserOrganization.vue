<template>
  <div class="UserOrganization" v-if="organization">
    <img :src="organization.logo" class="UserOrganization__Logo">
    <div class="UserOrganization__Name">{{organization.name}}</div>
  </div>
</template>

<script>
import db from '@/services/firebase'

export default {
  props: ['organizationId'],

  data () {
    return {
      organization: null
    }
  },

  methods: {
    async getOrganization () {
      const snapshot = await db.ref(`organizations/${this.organizationId}`).once('value')
      this.organization = snapshot.val()
    }
  },

  created () {
    this.getOrganization()
  },

  watch: {
    organizationId (newVal, oldVal) {
      if (newVal) {
        this.getOrganization()
      }
    }
  }
}
</script>

<style lang="stylus">
@require "../styles/config.styl"

.UserOrganization
  display: flex
  align-items: center

  &__Logo
    width: 3rem
    height: 3rem
    object-fit: cover
    margin-right: spacingSmall

  &__Name
    font-weight: 600
</style>
