<template>
  <section class="ProjectUsers">
    <Loading v-if="loading" />
    <div v-else>
      <h3 class="ProjectUsers__Heading">Project Members ({{projectUsers.length}})</h3>
      <ul class="ProjectUsers__Users">
        <li class="ProjectUsers__User"
          v-for="(user, key) in projectUsers"
          :key="key"
        ><UserAvatar :userId="user['.key']" :showDetails="true" /></li>
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
      projectUsers: {
        source: db.ref('projectUsers').child(this.projectId),
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

.ProjectUsers
  card()

  &__Heading
    textCaps()
    margin-bottom: spacingBase
    opacity: .5
    text-align: center

  &__User + &__User
    margin-top: spacingSmall


</style>
