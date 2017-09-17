<template>
  <div class="Project">
    <Loading v-if="loading" />
    <div v-else class="Project__Container">
      <article class="Project__Details">
        <header>
          <div class="Project__Meta">
            <time class="Project__CreatedAt" :datetime="project.createdAt">
              <span>Posted {{project.createdAt | moment('from', 'now')}}</span>
            </time>
          </div>
          <h1 class="Project__Title">{{project.title}}</h1>
        </header>
        <div class="Project__Description" v-html="description"></div>
      </article>
      <aside class="Project__Sidebar">
        <div class="Project__Join">
          <JoinProject />
        </div>
        <div class="Project__Organization">
          <OrganizationPreview :organizationId="project.organization" />
        </div>
        <div class="Project__Members">
          <ProjectMembers :projectId="project['.key']" />
        </div>
      </aside>
    </div>
  </div>
</template>

<script>
import { db } from '@/services/firebase'
import marked from 'marked'

import Loading from '@/components/Loading'
import Btn from '@/components/Btn'
import JoinProject from '@/components/JoinProject'
import ProjectMembers from '@/components/ProjectMembers'
import OrganizationPreview from '@/components/OrganizationPreview'

export default {
  components: {
    Loading,
    Btn,
    OrganizationPreview,
    ProjectMembers,
    JoinProject
  },

  data () {
    return {
      loading: true
    }
  },

  computed: {
    description () {
      return this.project ? marked(this.project.description) : null
    }
  },

  firebase () {
    return {
      project: {
        source: db.ref('projects').child(this.$route.params.projectId),
        asObject: true,
        readyCallback (snapshot) {
          this.loading = false
        }
      }
    }
  }
}
</script>

<style lang="stylus">
@require "../styles/grid.styl"
@require "../styles/text.styl"
@require "../styles/config.styl"
@require "../styles/card.styl"

.Project
  background: colorOffWhite
  min-height: 100vh
  border-bottom: colorLightGray solid 1px

  &__Container
    container()
    display: flex
    flex-wrap: wrap

    @media (min-width: 768px)
      flex-wrap: nowrap

  &__Title
    margin-bottom: spacingBase
    font-weight: 500

  &__Description
    textLead()
    textMarkdown()

  &__Sidebar
    padding: spacingBase
    flex: 0 0 100%

    @media (min-width: 768px)
      flex: 0 0 24rem

  &__Details
    flex: 1 0
    background: #fff
    padding: spacingBase

    @media (min-width: 768px)
      padding: spacingLarge

  &__Join,
  &__Members,
  &__Organization
    margin-bottom: spacingBase

  &__Meta
    margin-bottom: spacingBase
    white-space: nowrap
    textSmallCaps()
    opacity: .4
    margin-left: auto
    display: flex
    align-items: center
    align-self: flex-start

    svg
      width: 1rem
      height: 1rem
      margin-right: 0.5rem
</style>
