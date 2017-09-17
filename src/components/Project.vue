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
          <Btn color="primary" size="large">Join this project</Btn>
        </div>
        <ProjectMembers :projectId="project['.key']" />
        <OrganizationPreview :organizationId="project.organization" />
      </aside>
    </div>
  </div>
</template>

<script>
import { db } from '@/services/firebase'
import marked from 'marked'

import Loading from '@/components/Loading'
import Btn from '@/components/Btn'
import ProjectMembers from '@/components/ProjectMembers'
import OrganizationPreview from '@/components/OrganizationPreview'

export default {
  components: {
    Loading,
    Btn,
    OrganizationPreview,
    ProjectMembers
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

.Project
  &__Container
    container()
    display: flex
    padding: spacingBase spacingBase

  &__Title
    margin-bottom: spacingBase
    font-weight: 500

  &__Description
    textLead()
    textMarkdown()

  &__Sidebar
    flex: 0 0 20rem
    margin-left: spacingBase

  &__Details
    flex: 1 0

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
