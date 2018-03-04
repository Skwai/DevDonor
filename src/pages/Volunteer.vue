<template>
  <AppModal
    @close="cancel"
    :canClose="true"
  >
    <template v-if="submitted">
      <AppHeading>Great! Your message has been sent</AppHeading>
      <p>You should hear back from this charity soon.</p>
    </template>
    <template v-else>
      <AppHeading>Volunteer for this project</AppHeading>
      <p>So you're interested in helping out with this project? Great!</p>

      <CurrentUser
        v-if="getCurrentUser"
        :currentUser="getCurrentUser"
      />

      <template v-else>
        <h4>You'll need to sign in first, so that this charity can contact you</h4>
        <AuthLogin />
      </template>

      <h2>You've already volunteered for this project</h2>

      <form
        v-if="getCurrentUser && !alreadyVolunteered"
        @submit.prevent="submit"
      >
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
          <AppBtn
            @click="cancel"
          >Cancel</AppBtn>
          <AppBtn
            :loading="submitting"
            type="submit"
            color="primary"
          >Send Message</AppBtn>
        </AppBtnGroup>
      </form>
    </template>
  </AppModal>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'
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
  private submitting = false
  private submitted = false

  @Action('createVolunteer')
  private actionCreateVolunteer: (
    { user, projectId, message }: { user: firebase.UserInfo; projectId: string; message: string }
  ) => Promise<void>
  @Action('showError') private actionShowError: (message: string) => void
  @Getter private getCurrentUser: firebase.UserInfo
  @Getter private getIsUserVolunteerProject: (projectId: string) => boolean

  private cancel() {
    this.$router.push({
      path: '../',
      append: true
    })
  }

  get projectId() {
    return this.$route.params.projectId
  }

  get alreadyVolunteered() {
    return this.getIsUserVolunteerProject(this.projectId)
  }

  private async submit() {
    if (this.submitting) {
      return
    }

    this.submitting = true

    try {
      const user = this.getCurrentUser
      const { projectId, message } = this

      await this.actionCreateVolunteer({
        user,
        projectId,
        message
      })
      this.submitted = true
    } catch (err) {
      this.actionShowError('There was a problem sending your message')
    } finally {
      this.submitting = false
    }
  }
}
</script>

<style lang="stylus" module>
</style>
