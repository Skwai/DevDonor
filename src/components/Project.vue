<template>
  <Loading v-if="loading" />
  <Page class="Project" v-else>
    <div slot="content">
      <header class="Project__Header">
        <div class="Project__Meta">
          <time class="Project__CreatedAt" :datetime="project.createdAt">
            <span class="Project__Label">New</span>
            <GlyphIcon>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/></svg>
            </GlyphIcon>
            {{project.createdAt | moment('from', 'now')}}
          </time>
          <div class="Project__Region">
            <GlyphIcon>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
            </GlyphIcon>
            {{project.country}}
          </div>
        </div>
        <h1 class="Project__Title">{{project.title}}</h1>
        <div class="Project__Skills">
          <Tag v-for="(skill, key) in project.skills" :key="key" :tag="key" />
        </div>
      </header>
      <div class="Project__Description" v-html="description"></div>
    </div>
    <div slot="sidebar">
      <div class="Project__Join">
        <ContentBlock textAlign="center">
          <JoinProject :project="project" />
        </ContentBlock>
      </div>
      <OrganizationPreview :organizationId="project.organization" />
      <ProjectVolunteers :projectUserIds="project.volunteers" />
    </div>
  </Page>
</template>

<script>
import marked from 'marked'
import { mapGetters } from 'vuex'
import ProjectVolunteers from '@/components/ProjectVolunteers'
import OrganizationPreview from '@/components/OrganizationPreview'
import JoinProject from '@/components/JoinProject'

export default {
  components: {
    OrganizationPreview,
    ProjectVolunteers,
    JoinProject
  },

  data () {
    return {
      loading: true
    }
  },

  computed: {
    project () {
      return this.getProject(this.$route.params.projectId)
    },
    isNew () {
      return this.getProjectIsNew(this.$route.params.projectId)
    },
    description () {
      const { project } = this
      return project && project.description.length ? marked(project.description) : ''
    },
    ...mapGetters(['getProject', 'getProjectIsNew'])
  },

  async created () {
    try {
      await this.$store.dispatch('getProject', this.$route.params.projectId)
    } finally {
      this.loading = false
    }
  }
}
</script>

<style lang="stylus">
@require "../styles/grid.styl"
@require "../styles/text.styl"
@require "../styles/config.styl"
@require "../styles/card.styl"
@require "../styles/label.styl"

.Project
  &__Join
    margin-bottom: spacingBase

  &__Description
    textMarkdown()

  &__Region
    margin-left: auto
    display: flex
    align-items: center

  &__Label
    label()
    margin-right: 0.5rem

  &__Join,
  &__Members,
  &__Organization
    margin-bottom: spacingBase

  &__Skills
    margin-top: 1rem

  &__Header
    margin-bottom: spacingBase

  &__CreatedAt
    display: flex
    align-items: center

  &__Meta
    margin-bottom: spacingBase
    white-space: nowrap
    textSmallCaps()
    color: rgba(colorDarkBlue, .5)
    margin-left: auto
    display: flex
    align-items: center
    align-self: flex-start
</style>
