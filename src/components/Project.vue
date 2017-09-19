<template>
  <Loading v-if="loading" />
  <Page class="Project" v-else>
    <div slot="content">
      <header>
        <div class="Project__Meta">
          <time class="Project__CreatedAt" :datetime="project.createdAt">
            <span>Posted {{project.createdAt | moment('from', 'now')}}</span>
          </time>
        </div>
        <h1 class="Project__Title">{{project.title}}</h1>
      </header>
      <div class="Project__Description" v-html="description"></div>
    </div>
    <div slot="sidebar">
      <JoinProject />
      <OrganizationPreview :organizationId="project.organization" />
      <ProjectUsers :projectUserIds="project.users" />
    </div>
  </Page>
</template>

<script>
import { db } from '@/services/firebase'
import marked from 'marked'

import JoinProject from '@/components/JoinProject'
import ProjectUsers from '@/components/ProjectUsers'
import OrganizationPreview from '@/components/OrganizationPreview'

export default {
  components: {
    OrganizationPreview,
    ProjectUsers,
    JoinProject
  },

  data () {
    return {
      loading: true
    }
  },

  computed: {
    description () {
      return this.project && this.project.description ? marked(this.project.description) : ''
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
  &__Title
    margin-bottom: spacingBase
    font-weight: 500

  &__Description
    textLead()
    textMarkdown()

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
