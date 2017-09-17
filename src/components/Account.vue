<template>
  <div class="Account">
    <div v-if="getAuth">
      Current User
    </div>
    <div v-else>
      <button class="Account__Login" @click.prevent="login">Login</button>
      <div ref="login"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { login } from '@/services/firebase'

export default {
  computed: {
    ...mapGetters([
      'getAuth'
    ])
  },
  methods: {
    async login () {
      try {
        const result = await login(this.$refs.login)
        console.log(result)
      } catch (err) {

      } finally {

      }
    }
  }
}
</script>

<style lang="stylus">
@require "../styles/config.styl"
@require "../styles/text.styl"

.Account
  margin-left: auto

  &__Login
    textLink()

</style>
