<template>
  <section class="ProjectMembers">
    <h3>Members</h3>

    <div class="ProjectMembers__List">
      <UserAvatar :user="user" v-for="(user, key) in projectMembers" :key="key" />
    </div>
  </section>
</template>

<script>
import { db } from '@/services/firebase'
import UserAvatar from '@/components/UserAvatar'

export default {
  props: ['projectId'],

  components: {
    UserAvatar
  },

  data () {
    return {
      loading: true
    }
  },

  firebase () {
    return {
      projectMembers: {
        source: db.ref('projectMembers').child(this.projectId),
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

.ProjectMembers
  card()

</style>
