<template>
  <div class="JoinProject">
    <template v-if="!uid">
      Sign up to volunter for this project
    </template>
    <template v-else>
      <template v-if="currentUserInProject">
        <p v-if="currentUserPending">You've applied to join this project</p>
        <p v-else>You've joined this project</p>
        <AppBtn
          @click="leaveProject"
          :loading="leaving"
        >Leave Project</AppBtn>
      </template>
      <template v-else>
        <p>Interested in helping out?</p>
        <AppBtn
          color="dark"
          @click="joinProject"
          :loading="joining"
        >Volunteer for this project</AppBtn>
      </template>
    </template>
  </div>
</template>

<script>
import db from '@/services/firebase'
import { mapGetters } from 'vuex'

export default {
  props: ['project'],

  computed: {
    currentUserPending () {
      const { project, uid } = this
      return project &&
        uid &&
        project.volunteers &&
        uid in project.volunteers &&
        project.volunteers[uid] === false
    },
    currentUserInProject () {
      const { project, uid } = this
      return project && uid && project.volunteers && Object.keys(project.volunteers).includes(uid)
    },
    ...mapGetters(['uid'])
  },

  data () {
    return {
      joining: false,
      leaving: false
    }
  },

  methods: {
    updateProjectMember (joined = true) {
      const updates = {
        [`projects/${this.$route.params.projectId}/volunteers/${this.uid}`]: joined ? true : null,
        [`users/${this.uid}/projects/${this.$route.params.projectId}`]: joined ? true : null
      }
      return db.ref().update(updates)
    },

    async joinProject () {
      this.joining = false
      try {
        await this.updateProjectMember(true)
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
      this.leaving = true
      try {
        await this.updateProjectMember(null)
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
  }
}
</script>

<style lang="stylus">
@require "../styles/text.styl"
@require "../styles/config.styl"
@require "../styles/card.styl"
@require "../styles/label.styl"

.JoinProject
  card()
</style>
