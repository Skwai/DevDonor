<template>
  <div class="UserOrganization" v-if="organization">
    <img :src="organization.logo" class="UserOrganization__Logo">
    <div class="UserOrganization__Name">{{organization.name}}</div>
  </div>
</template>

<script>
import { db } from '@/services/firebase'

export default {
  props: ['organizationId'],

  firebase () {
    return {
      organization: {
        source: db.ref(`organizations/${this.organizationId}`),
        asObject: true
      }
    }
  }
}
</script>

<style lang="stylus">
@require "../styles/config.styl"

.UserOrganization
  padding: spacingTiny
  display: flex
  border: colorGray solid 1px
  align-items: center

  &__Logo
    width: 3rem
    height: 3rem
    object-fit: cover
    margin-right: spacingSmall

  &__Name
    font-weight: 600
</style>
