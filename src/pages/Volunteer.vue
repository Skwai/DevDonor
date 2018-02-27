<template>
  <AppModal
    @close="cancel"
    :canClose="true"
  >
    <AppHeading>Volunteer for this project</AppHeading>
    <p>So you're interested in helping out with this project? Great!</p>
    <p>Fill out this form to get in touch.</p>

    <CurrentUser v-if="getCurrentUser" :currentUser="getCurrentUser" />
    <template v-else>
      <h4>You'll need to sign in first, so that this charity can contact you</h4>
      <AuthLogin />
    </template>

    <form v-if="getCurrentUser">
      <AppFieldGroup>
        <AppField
          type="textarea"
          v-model="message"
          label="Message to charity"
          :required="true"
          :minlength="50"
          :span="2"
          :rows="8"
          placeholder="Send a message with a bit about yourself, your skills and your experience."
        />
      </AppFieldGroup>
      <AppBtnGroup>
        <AppBtn type="submit" color="primary">Send Message</AppBtn>
      </AppBtnGroup>
    </form>
  </AppModal>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import AuthLogin from '../components/AuthLogin.vue'
import CurrentUser from '../components/CurrentUser.vue'

@Component({
  components: {
    CurrentUser,
    AuthLogin
  }
})
export default class Volunteer extends Vue {
  private message: string = ''

  @Getter private getCurrentUser: {}

  private cancel() {
    this.$router.push({
      path: '../',
      append: true
    })
  }
}
</script>

<style lang="stylus" module>
</style>
