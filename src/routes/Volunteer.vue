<template>
  <AppLoading v-if="loading" />
  <AppPage v-else>
    <template slot="content">
      <header class="Volunteer__Header">
        <AppAvatar :src="user.picture" :label="user.name" />
        <div class="Volunteer__HeaderDetails">
          <h1>{{user.name}}</h1>
          <div><AppSmallCaps>{{user.role}}, {{user.region}}</AppSmallCaps></div>
          <div class="Volunteer__Tags">
            <AppTag v-for="(skill, key) in user.skills" :key="key" :tag="key" />
          </div>
        </div>
      </header>
      <AppSubheading>About me</AppSubheading>
      <div v-html="bio" class="Volunteer__Bio"></div>
    </template>
    <template slot="sidebar">
      <AppVolunteerProject :projectIds="user.projects" />
    </template>
  </AppPage>
</template>

<script>
import marked from 'marked'
import AppVolunteerProject from '@/components/AppVolunteerProject'

export default {
  components: {
    AppVolunteerProject
  },

  data () {
    return {
      user: {},
      loading: true
    }
  },

  computed: {
    bio () {
      return this.user && this.user.bio ? marked(this.user.bio) : null
    }
  },

  async created () {
    try {
      await this.$store.dispatch('getUser', this.$route.params.userId)
      this.user = this.$store.getters.getUser(this.$route.params.userId)
    } finally {
      this.loading = false
    }
  }
}
</script>

<style lang="stylus">
@require "../styles/config.styl"
@require "../styles/text.styl"
@require "../styles/card.styl"

.Volunteer
  &__Skills
    margin-top: spacingSmall

  &__Header
    display: flex
    margin-bottom: spacingBase
    padding-bottom: spacingBase
    border-bottom: colorLightGray solid 1px

    &Details
      margin-left: spacingBase

  &__Bio
    textMarkdown()

  &__Tags
    margin-top: 0.5rem

</style>
