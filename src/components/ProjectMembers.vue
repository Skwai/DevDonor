<template>
  <section class="ProjectMembers">
    <Loading v-if="loading" />
    <div v-else>
      <h3 class="ProjectMembers__Heading">Project Members</h3>

      <ul class="ProjectMembers__Users">
        <li class="ProjectMembers__User"
          v-for="(user, key) in projectMembers"
          :key="key"
        ><UserAvatar :user="user" :showDetails="true" /></li>
      </ul>
    </div>
  </section>
</template>

<script>
import { db } from '@/services/firebase'
import Loading from '@/components/Loading'
import UserAvatar from '@/components/UserAvatar'

export default {
  props: ['projectId'],

  components: {
    UserAvatar,
    Loading
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

  &__Heading
    textCaps()
    margin-bottom: spacingBase
    opacity: .5
    text-align: center

  &__User + &__User
    margin-top: 1rem


</style>
