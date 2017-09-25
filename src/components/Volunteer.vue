<template>
  <Loading v-if="loading" />
  <Page v-else>
    <div slot="content">
      <header class="Volunteer__Header">
        <Avatar :src="user.picture" :label="user.name" />
        <div class="Volunteer__HeaderDetails">
          <h1>{{user.name}}</h1>
          <div><SmallCaps>{{user.role}}, {{user.region}}</SmallCaps></div>
          <div class="Volunteer__Tags">
            <Tag v-for="(tag, key) in user.skills" :key="key" :tag="tag" />
          </div>
        </div>
      </header>
      <Subheading>About me</Subheading>
      <div v-html="bio" class="Volunteer__Bio"></div>
    </div>
    <div slot="sidebar">
      <VolunteerProjects :projectIds="user.projects" />
    </div>
  </Page>
</template>

<script>
import { db } from '@/services/firebase'
import marked from 'marked'
import VolunteerProjects from '@/components/VolunteerProjects'

export default {
  components: {
    VolunteerProjects
  },

  data () {
    return {
      loading: true
    }
  },

  computed: {
    bio () {
      return this.user && this.user.bio ? marked(this.user.bio) : null
    }
  },

  firebase () {
    return {
      user: {
        source: db.ref('users').child(this.$route.params.userId),
        asObject: true,
        readyCallback () {
          this.loading = false
        }
      }
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

</style>
