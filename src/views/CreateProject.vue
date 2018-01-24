<template>
  <AppModal @close="cancel" :class="$style.CreateProject">
    <form @submit.prevent="submit">
      <AppHeading>Create a new project</AppHeading>
      <p>Have an idea for a great project? Fill out the form below to find developers to help you with it.</p>

      <div v-if="step === 1">
        <h2 :class="$style.CreateProject__Step">Step 1. About your organization</h2>
        <AppFieldGroup>
          <AppField
            label="Organization name"
            :required="true"
            :span="2"
            v-model="project.organizationName"
          />

          <AppSelect
            label="Organization type"
            :required="true"
            v-model="project.organizationType"
            :options="causeOptions"
          />

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
            :url.sync="project.organizationLogo"
            label="Upload your logo"
            description="Upload a picture to use as your logo"
          />

          <AppField
            type="textarea"
            :required="true"
            :span="2"
            label="Organization description"
            v-model="project.organizationType"
            description="Describe what your organization does, how it helps people, and what its mission is."
          />
        </AppFieldGroup>

        <div :class="$style.CreateProject__Actions">
          <AppBtn type="button" @click="cancel">Cancel</AppBtn>
          <AppBtn @click="nextStep" color="primary" size="large">Next step</AppBtn>
        </div>
      </div>
      <div v-if="step === 2">
        <h2 :class="$style.CreateProject__Step">Step 2. About your project</h2>
        <AppFieldGroup>
          <AppField
            label="Project title"
            :required="true"
            v-model="project.title"
          />

          <AppSelect
            label="Project type"
            v-model="project.type"
            :required="true"
            :options="projectTypeOptions"
          />

          <AppField
            type="textarea"
            rows="10"
            label="Project description"
            v-model="project.description"
            :required="true"
          />
        </AppFieldGroup>
        <div :class="$style.CreateProject__Actions">
          <AppBtn type="button" @click="prevStep">Previous Step</AppBtn>
          <AppBtn type="submit" color="primary" size="large">Create My Project</AppBtn>
        </div>
      </div>
    </form>
  </AppModal>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Action } from 'vuex-class'

import Project from '@/models/Project'
import { createID } from '@/services/db'
import countries from '@/utils/countries'

const CAUSE_OPTIONS = [
  'Art & Culture',
  'Animals & Environment',
  'Humanitarian Aid',
  'Youth & Education',
  'Social Services',
  'Health & Wellness'
]

const PROJECT_TYPE_OPTIONS = ['Web', 'Mobile', 'Desktop']

@Component
export default class CreateProjectPage extends Vue {
  private project = { ...new Project() }
  private fileName: string = ''
  private step: number = 1
  private causeOptions: string[] = CAUSE_OPTIONS
  private countryOptions: string[] = countries.map(
    (c: { name: string }) => c.name
  )
  private projectTypeOptions: string[] = PROJECT_TYPE_OPTIONS.slice(0)

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

  get validations() {
    const {
      title,
      description,
      type,
      country,
      organizationName,
      organizationType,
      organizationDescription
    } = this.project

    return {
      country: this.countryOptions.includes(country),
      description: description.length > 1,
      title: title.length > 1,
      type: PROJECT_TYPE_OPTIONS.includes(type),
      organizationDescription: organizationDescription.length > 1,
      organizationName: organizationName.length > 1,
      organizationType: organizationType.length > 1
    }
  }

  get isValid() {
    return Object.values(this.validations).every(v => !!v)
  }

  private async submit(ev: Event) {
    if (!this.isValid) {
      return
    }
    console.log(this.project)
    try {
      await this.createProject(this.project)
    } catch (err) {
      console.error(err)
    }
  }
}
</script>

<style lang="stylus" module>
@import "../styles/config.styl"
@import "../styles/text.styl"

.CreateProject
  h3
    margin-bottom: $spacingBase

  &__Step
    margin: 2rem 0 2rem

  &__Actions
    text-align: right
</style>
