<template>
  <AppModal @close="close">
    <AppHeading>Delete this Project</AppHeading>

    <template v-if="!canDeleteProject">
      <h4>You'll need to sign in with the account that created this project.</h4>
      <AuthLogin />
    </template>
    <template v-else>
      <p>Are you sure you want delete this project? You won't be able to recover it.</p>
      <AppBtnGroup>
        <AppBtn @click="close">No way</AppBtn>
        <AppBtn color="dark" @click="deleteProject">Yes, delete it</AppBtn>
      </AppBtnGroup>
    </template>
  </AppModal>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'
import Project from '@/models/Project'
import AuthLogin from '../components/AuthLogin.vue'

@Component({
  components: {
    AuthLogin
  }
})
export default class DeleteProject extends Vue {
  private deleting = false

  @Getter private getProjectById: (projectId: string) => Project
  @Getter private getCurrentUserId: string

  @Action('deleteProject') private actionDeleteProject: (projectId: string) => Promise<void>
  @Action('showError') private actionShowError: (message: string) => void

  get project() {
    return this.getProjectById(this.projectId)
  }

  get projectId() {
    return this.$route.params.projectId
  }

  get canDeleteProject() {
    return this.project.ownerId === this.getCurrentUserId
  }

  private close() {
    this.$router.push({ path: '../', append: true })
  }

  private async deleteProject() {
    try {
      this.deleting = true
      await this.actionDeleteProject(this.projectId)
    } catch (err) {
      this.actionShowError('There was a problem deleting this project')
    } finally {
      this.deleting = false
    }
  }
}
</script>
