<template>
  <Loading v-if="loading" />
  <Page v-else>
    <div slot="content">
      <header class="Volunteer__Header">
        <img class="Volunteer__Avatar" :src="user.picture">
        <div class="Volunteer__HeaderDetails">
          <h1>{{user.name}}</h1>
          <div><SmallCaps>{{user.role}}, {{user.region}}</SmallCaps></div>
          <div class="Volunteer__Tags">
            <Tag v-for="(tag, key) in tags" :key="key" :tag="tag" />
          </div>
        </div>
      </header>
      <Subheading>About me</Subheading>
      <div v-html="bio" class="Volunteer__Bio"></div>
    </div>
    <div slot="sidebar">
      <VolunteerProjects :projectIds="volunteer.projects" />
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
      loading: true,
      tags: [
        'JavaScript',
        'HTML',
        'CSS'
      ]
    }
  },

  computed: {
    bio () {
      return this.user && this.user.bio ? marked(this.user.bio) : null
    }
  },

  firebase () {
    return {
      volunteer: {
        source: db.ref('/volunteers').child(this.$route.params.profileId),
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

  &__Tags
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

  &__Avatar
    width: 6rem
    height: 6rem
    object-fit: cover
    border-radius: borderRadiusBase

</style>
