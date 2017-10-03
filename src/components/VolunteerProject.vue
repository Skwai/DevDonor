<template>
  <router-link
    :to="{ name: 'project', params: { projectId: projectId } }"
    v-if="!loading"
    class="VolunteerProject"
  >
    <img :src="organization.logo" class="VolunteerProject__Logo">
    <div class="VolunteerProject__Details">
      <div class="VolunteerProject__Name">{{organization.name}}</div>
      <SmallCaps><time :datetime="project.createdAt">{{project.createdAt | moment('from', 'now')}}</time></SmallCaps>
    </div>
  </router-link>
</template>

<script>
import SmallCaps from '@/components/SmallCaps'

export default {
  props: ['projectId'],

  components: {
    SmallCaps
  },

  data () {
    return {
      loading: true,
      project: {},
      organization: {}
    }
  },

  async created () {
    try {
      await this.$store.dispatch('getProject', this.projectId)
      this.project = this.$store.getters.getProject(this.projectId)
      await this.$store.dispatch('getOrganization', this.project.organization)
      this.organization = this.$store.getters.getOrganization(this.project.organization)
    } finally {
      this.loading = false
    }
  }
}
</script>

<style lang="stylus">
@require "../styles/config.styl"
@require "../styles/text.styl"

.VolunteerProject
  display: flex
  align-items: center

  &__Name
    font-weight: 500

  &__Logo
    size = 3.5rem
    width: size
    height: size
    min-width: size
    min-height: size
    object-fit: cover
    margin-right: spacingBase
    border-radius: borderRadiusBase
    box-shadow: rgba(0,0,0,.1) 0 0 0 1px


</style>
