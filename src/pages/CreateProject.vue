<template>
  <AppModal>
    <form @submit.prevent="submit">
      <AppHeading>Create a new project</AppHeading>
      <p>Have an idea for a great project? Fill out the form below to find developers to help you with it.</p>

      <AppSubheading>About your organization</AppSubheading>
      <AppField label="Organization name" v-model="project.organizationName" />
      <AppField label="Organization type" v-model="project.organizationType" />
      <AppField label="Region" v-model="project.region" />
      <AppField label="City" v-model="project.city" />
      <AppFiled label="Organization description" type="textarea" v-model="project.organizationDescription" />

      <AppUpload
        :maxFileSize="2"
        filePath="logos"
        :fileName="fileName"
        :url.sync="project.organizationLogo"
        label="Upload your logo"
        description="Upload a picture to use as your logo"
      />

      <AppSubheading>About your project</AppSubheading>
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
        label="Project description"
        v-model="project.description"
      />

      <AppBtn type="submit" color="primary">Create My Project</AppBtn>
      <AppBtn type="button" @click="cancel">Cancel</AppBtn>
    </form>
  </AppModal>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Action } from 'vuex-class'
import Project from '@/models/Project'
import { createID } from '@/services/db'

@Component
export default class CreateProjectPage extends Vue {
  project = { ...new Project() }
  fileName: string = ''

  @Action createProject: (project: Project) => Promise<void>

  cancel () {
    this.$router.push('/')
  }

  created () {
    this.fileName = createID()
  }

  async submit (ev: Event) {
    console.log(this.project)
    try {
      await this.createProject(this.project)
    } catch (err) {
      console.error(err)
    }
  }
}
</script>
