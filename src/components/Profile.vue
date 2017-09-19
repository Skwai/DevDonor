<template>
  <Loading v-if="loading" />
  <Page v-else>
    <div slot="content">
      <header class="Profile__Header">
        <img class="Profile__Avatar" :src="user.picture">
        <div class="Profile__HeaderDetails">
          <h1>{{user.name}}</h1>
          <div><SmallCaps>{{user.role}}, {{user.region}}</SmallCaps></div>
          <div class="Profile__Tags">
            <Tag v-for="(tag, key) in tags" :key="key" :tag="tag" />
          </div>
        </div>
      </header>
      <Subheading>About me</Subheading>
      <div v-html="bio" class="Profile__Bio"></div>
    </div>
    <div slot="sidebar">
      <UserProjects :userId="$route.params.profileId" />
    </div>
  </Page>
</template>

<script>
import Page from '@/components/Page'
import Tag from '@/components/Tag'
import Loading from '@/components/Loading'
import { db } from '@/services/firebase'
import marked from 'marked'
import UserProjects from '@/components/UserProjects'
import SmallCaps from '@/components/SmallCaps'
import Subheading from '@/components/Subheading'

export default {
  components: {
    Page,
    Loading,
    UserProjects,
    Tag,
    SmallCaps,
    Subheading
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
      user: {
        source: db.ref('/users').child(this.$route.params.profileId),
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

.Profile

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
