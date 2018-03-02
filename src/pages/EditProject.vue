<template>
  <AppModal @close="close">
    <AppHeading>Edit this Project</AppHeading>

    <template v-if="!canEditProject">
      <h4>You'll need to sign in with the account that created this project.</h4>
      <AuthLogin />
    </template>

    <form v-else-if="project" @submit.prevent="update" ref="form">
      <AppFieldGroup>
        <AppField
          label="Project name"
          :required="true"
          :span="2"
          v-model="project.title"
          :minlength="10"
          :maxlength="200"
        />

        <AppRadioGroup
          label="Project type"
          description="What sort of project are you looking to create?"
          :span="2"
          :required="true"
          :options="projectTypeOptions"
          v-model="project.projectType"
        />

        <AppField
          type="textarea"
          :rows="10"
          :span="2"
          label="Project description"
          v-model="project.description"
          :required="true"
          :minlength="50"
        />
        <AppField
          label="Organization name"
          :required="true"
          :span="2"
          :maxlength="100"
          v-model="project.organizationName"
        />

        <AppSelect
          label="Charity type"
          :required="true"
          v-model="project.organizationType"
          :span="2"
          :options="organizationTypeOptions"
          description="What goal or cause does your organization focus on?"
        ></AppSelect>

        <AppSelect
          label="Country"
          :required="true"
          v-model="project.country"
          :options="countryOptions"
        />

        <AppUpload
          :maxFileSize="2"
          filePath="logos"
          :span="2"
          :fileName="fileName"
          v-model="project.organizationLogo"
          label="Upload your logo"
          description="Upload a picture to use as your logo"
        />

        <AppField
          type="url"
          :required="false"
          :span="2"
          label="Website"
          v-model="project.organizationUrl"
        />

        <AppField
          type="textarea"
          :required="true"
          :span="2"
          label="Organization description"
          v-model="project.organizationDescription"
          :minlength="10"
          :maxlength="200"
          description="Describe what your organization does, how it helps people, and what its mission is."
        />
      </AppFieldGroup>
      <AppBtnGroup>
        <AppBtn
          type="submit"
          color="primary"
          :loading="saving"
        >Update My Project</AppBtn>
      </AppBtnGroup>
    </form>
  </AppModal>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'
import AuthLogin from '../components/AuthLogin.vue'
import Project from '@/models/Project'
import { ORGANIZATION_TYPES } from '../data/organization-types'
import { PROJECT_TYPES_WITH_DESCRIPTIONS } from '../data/project'
import { COUNTRIES } from '../data/countries'
import IProjectProperties from '@/interfaces/ProjectProperties'

@Component({
  components: {
    AuthLogin
  }
})
export default class EditProjectPage extends Vue {
  private project: Project
  private saving = false

  private organizationTypeOptions = { ...ORGANIZATION_TYPES }
  private countryOptions = { ...COUNTRIES }
  private projectTypeOptions = { ...PROJECT_TYPES_WITH_DESCRIPTIONS }
  @Getter private getProjectById: (projectId: string) => Project
  @Getter private getCurrentUser: firebase.UserInfo

  @Action('updateProject')
  private actionUpdateProject: (
    { projectId, project }: { projectId: string; project: IProjectProperties }
  ) => Promise<void>

  @Action('showError') private actionShowError: (message: string) => void
  @Action('showSuccess') private actionShowSuccess: (message: string) => void

  get fileName() {
    return this.projectId
  }

  private close() {
    this.$router.push({ name: 'ViewProject', params: { projectId: this.projectId } })
  }

  get canEditProject() {
    return this.project.ownerId && this.getCurrentUser.uid === this.project.ownerId
  }

  get projectId() {
    return this.$route.params.projectId
  }

  private async update() {
    if (!this.checkValidity()) {
      return
    }
    try {
      this.saving = true
      const { projectId, project } = this
      await this.actionUpdateProject({ projectId, project })
      this.actionShowSuccess('Your project has been updated')
    } catch (err) {
      this.actionShowError('There was a problem updating this project')
    } finally {
      this.saving = false
    }
  }

  private checkValidity() {
    return (this.$refs.form as HTMLFormElement).reportValidity()
  }

  private created() {
    const project = this.getProjectById(this.$route.params.projectId)
    if (project) {
      return (this.project = { ...project })
    }
  }
}
</script>

<style lang="stylus" module>
@require '../styles/container';

.About {
  container();
}
</style>
