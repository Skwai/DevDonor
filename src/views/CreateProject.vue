<template>
  <AppModal @close="cancel">
    <form @submit.prevent="submit">
      <AppHeading>Create a new project</AppHeading>
      <p>Have an idea for a great project? Fill out the form below to find developers to help you with it.</p>

      <div v-if="step === 1">
        <h2>Step 1. About your organization</h2>
        <AppFieldGroup>
          <AppField
            label="Organization name"
            v-model="project.organizationName"
          />
          <AppSelect
            label="Organization type"
            v-model="project.organizationType"
            :options="['Animals', 'People']"
          />
          <AppField
            type="textarea"
            label="Organization description"
            v-model="project.organizationType"
          />
          <AppField
            label="Country"
            v-model="project.country"
          />

          <AppField
            label="City"
            v-model="project.city"
          />

          <AppField
            label="Organization description"
            type="textarea"
            v-model="project.organizationDescription"
          />

          <AppUpload
            :maxFileSize="2"
            filePath="logos"
            :fileName="fileName"
            :url.sync="project.organizationLogo"
            label="Upload your logo"
            description="Upload a picture to use as your logo"
          />
        </AppFieldGroup>

        <AppBtn @click="nextStep" color="primary" size="large">Next: About my project</AppBtn>
      </div>
      <div v-if="step === 2">
        <h2>Step 2. About your project</h2>
        <AppField
          label="Project title"
          v-model="project.title"
        />

        <AppField
          label="Project type"
          v-model="project.type"
        />

        <AppField
          type="textarea"
          rows="10"
          label="Project description"
          v-model="project.description"
        />

        <AppBtn type="submit" color="primary" size="large">Create My Project</AppBtn>
        <AppBtn type="button" @click="cancel">Cancel</AppBtn>
      </div>
    </form>
  </AppModal>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Action } from 'vuex-class'

import Project from '@/models/Project'
import { createID } from '@/services/db'

@Component
export default class CreateProjectPage extends Vue {
  private project = { ...new Project() }
  private fileName: string = ''
  private step: number = 1

  @Action private createProject: (project: Project) => Promise<void>

  private cancel() {
    console.log('cancelled')
    this.$router.push('/')
  }

  private created() {
    this.fileName = createID()
  }

  private nextStep() {
    this.step++
  }

  private prevStep() {
    this.step--
  }

  private async submit(ev: Event) {
    console.log(this.project)
    try {
      await this.createProject(this.project)
    } catch (err) {
      console.error(err)
    }
  }
}
</script>
