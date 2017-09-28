<template>
  <div class="JoinProject">
    <template v-if="!uid">
      Sign up to volunter for this project
    </template>
    <template v-else>
      <template v-if="currentUserInProject">
        <p v-if="currentUserPending">You've applied to join this project</p>
        <p v-else>You've joined this project</p>
        <Btn
          :click="leaveProject"
          :loading="leaving"
        >Leave Project</Btn>
      </template>
      <template v-else>
        <p>Interested in helping out?</p>
        <Btn
          color="dark"
          :click="joinProject"
          :loading="joining"
        >Volunteer for this project</Btn>
      </template>
    </template>
  </div>
</template>

<script>
import { db } from '@/services/firebase'
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
