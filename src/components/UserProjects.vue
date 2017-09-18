<template>
  <div class="UserProjects">
    <Loading v-if="loading" />

    <div v-else>
      <h3 class="UserProjects__Heading">Projects</h3>
      <ul class="UserProjects__Projects">
        <li class="UserProjects__Project" v-for="(project, key) in userProjects" :key="key">
          <UserProject :projectId="key" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Loading from '@/components/Loading'
import { db } from '@/services/firebase'
import UserProject from '@/components/UserProject'

export default {
  props: ['userId'],

  components: {
    Loading,
    UserProject
  },

  data () {
    return {
      loading: true
    }
  },

  firebase () {
    return {
      userProjects: {
        source: db.ref('/userProjects').child(this.userId),
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
@require "../styles/config.styl"
@require "../styles/text.styl"
@require "../styles/card.styl"

.UserProjects
  card()

  &__Heading
    font-size: 87.5%;
    text-transform: uppercase;
    font-weight: 500;
    letter-spacing: 0.05em;
    margin-bottom: 1.5rem;
    opacity: 0.5;
    text-align: center;

  &__Project + &__Project
    margin-top: 1rem

</style>
