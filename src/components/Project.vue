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
      <div class="Project__Join">
        <ContentBlock textAlign="center">
          <div v-if="!userInProject">
            <p>Interested in helping out?</p>
            <Btn
              :click="joinProject"
              :loading="joining"
            >Volunteer for this project</Btn>
          </div>
          <div v-else>
            <p>You've applied to join this project.</p>
            <Btn
              :click="leaveProject"
            >Leave Project</Btn>
          </div>
        </ContentBlock>
      </div>
      <OrganizationPreview :organizationId="project.organization" />
      <ProjectVolunteers :projectUserIds="project.volunteers" />
    </div>
  </Page>
</template>

<script>
import { db } from '@/services/firebase'
import marked from 'marked'
import { mapGetters } from 'vuex'

import ProjectVolunteers from '@/components/ProjectVolunteers'
import OrganizationPreview from '@/components/OrganizationPreview'

export default {
  components: {
    OrganizationPreview,
    ProjectVolunteers
  },

  data () {
    return {
      loading: true,
      joining: false,
      leaving: false
    }
  },

  methods: {
    async joinProject () {
      const path = `projects/${this.$route.params.projectId}/volunteers`
      this.joining = false
      try {
        await db.ref(path).update({ [this.uid]: false })
        this.$store.dispatch('showNotification', {
          type: 'success',
          message: 'You\'ve applied to join the project'
        })
      } catch (err) {
        this.$store.dispatch('showNotification', {
          type: 'error',
          message: 'There was a problem trying to join this project'
        })
      } finally {
        this.joining = false
      }
    },

    async leaveProject () {
      const path = `projects/${this.$route.params.projectId}/volunteers`
      this.leaving = true
      try {
        await db.ref(path).child(this.uid).remove()
        this.$store.dispatch('showNotification', {
          type: 'success',
          message: 'You\'ve left this project'
        })
      } catch (err) {
        this.$store.dispatch('showNotification', {
          type: 'error',
          message: 'There was a problem trying to leave this project'
        })
      } finally {
        this.leaving = false
      }
    }
  },

  computed: {
    userInProject () {
      return this.project && this.uid && Object.keys(this.project.volunteers).includes(this.uid)
    },
    description () {
      return this.project && this.project.description ? marked(this.project.description) : ''
    },
    ...mapGetters(['uid'])
  },

  firebase () {
    return {
      project: {
        source: db.ref('projects').child(this.$route.params.projectId),
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
@require "../styles/grid.styl"
@require "../styles/text.styl"
@require "../styles/config.styl"
@require "../styles/card.styl"

.Project
  &__Join
    margin-bottom: spacingBase
    card()

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
