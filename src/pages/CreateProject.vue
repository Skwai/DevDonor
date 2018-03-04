<template>
  <div :class="$style.CreateProject">
    <template v-if="submitted">
      <AppHeading>Great! Your project has been created</AppHeading>
      <p>We'll notify you by email when people want to join your project.</p>
      <!-- TODO: fix link below -->
      <p><AppBtn to="/projects" color="stroke">View your new project page</AppBtn></p>
    </template>
    <template v-else>
      <AppHeading>Create a new project</AppHeading>
      <p>Are you a charity or not-for-profit and have an idea for a great project? Fill out the form below to find developers to help you with it.</p>
      <div
        v-if="!getCurrentUser"
        :class="$style.CreateProject__Auth"
      >
        <h4>You'll need to sign in to create a new project</h4>
        <AuthLogin />
      </div>
      <CurrentUser
        v-else-if="getCurrentUser"
        :currentUser="getCurrentUser"
      />
      <form v-if="getCurrentUser" @submit.prevent="submit" ref="form">
        <template v-if="step === 1">
          <h2 :class="$style.CreateProject__Step">
            <span>About your project</span>
            <AppTag>Step 1 of 2</AppTag>
          </h2>
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
              :rows="12"
              :span="2"
              label="About your project"
              v-model="project.description"
              placeholder="Describe what your project is about and the type of help and skills you're looking for"
              :required="true"
              :minlength="50"
              description="Markdown is supported"
            />
          </AppFieldGroup>

          <AppBtnGroup>
            <AppBtn
              @click="nextStep"
              color="primary"
            >Next step</AppBtn>
          </AppBtnGroup>
        </template>
        <template v-if="step === 2">
          <h2 :class="$style.CreateProject__Step">
            <span>About your organization</span>
            <AppTag>Step 2 of 2</AppTag>
          </h2>
          <AppFieldGroup>
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
              type="button"
              @click="prevStep"
            >Previous Step</AppBtn>
            <AppBtn
              type="submit"
              color="primary"
              :loading="submitting"
            >Create My Project</AppBtn>
          </AppBtnGroup>
        </template>
      </form>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'
import Project from '../models/Project'
import { createID } from '../services/db'
import AuthLogin from '../components/AuthLogin.vue'
import CurrentUser from '../components/CurrentUser.vue'
import { ORGANIZATION_TYPES } from '../data/organization-types'
import { PROJECT_TYPES_WITH_DESCRIPTIONS } from '../data/project'
import { COUNTRIES } from '../data/countries'

// the names of the steps
const STEP_1 = 'step1'
const STEP_2 = 'step2'
const STEPS = [STEP_1, STEP_2]

@Component({
  components: {
    AuthLogin,
    CurrentUser
  }
})
export default class CreateProjectPage extends Vue {
  private project = new Project()
  private fileName: string = ''
  private step: number = 1
  private organizationTypeOptions = { ...ORGANIZATION_TYPES }
  private countryOptions = { ...COUNTRIES }
  private projectTypeOptions = { ...PROJECT_TYPES_WITH_DESCRIPTIONS }
  private steps: {} | undefined = undefined // non-reactive
  private submitting: boolean = false
  private submitted: boolean = false

  @Action private storeProjectFormData: (project: Project) => void
  @Action('createProject') private actionCreateProject: (project: Project) => Promise<void>
  @Action private clearProjectFormData: () => void
  @Action('showError') private actionShowError: (message: string) => void
  @Getter private getSavedCreateProjectFormData: {}
  @Getter private getCurrentUser: firebase.UserInfo

  @Watch('project', { immediate: false, deep: true })
  private onProjectChanged(value: Project) {
    this.storeProjectFormData(value)
  }

  private created() {
    this.steps = { STEP_1, STEP_2 }
    this.fileName = createID()
    Object.assign(this.project, this.getSavedCreateProjectFormData)
    window.onpopstate = this.loadUrlStep.bind(this)
    this.loadUrlStep()
  }

  private nextStep() {
    const valid = this.checkValidity()
    if (valid && STEPS[this.step]) {
      this.step++
      this.pushUrlStep()
    }
  }

  private checkValidity() {
    return (this.$refs.form as HTMLFormElement).reportValidity()
  }

  private prevStep() {
    if (STEPS[this.step - 2]) {
      this.step--
      this.pushUrlStep()
    }
  }

  private loadUrlStep() {
    const hash = window.location.hash.substring(1)
    this.step = hash && STEPS.includes(hash) ? STEPS.indexOf(hash) + 1 : 1
  }

  private pushUrlStep() {
    const { step } = this
    const hash = `#${STEPS[this.step - 1]}`
    history.pushState(null, '', hash)
  }

  private async submit(ev: Event) {
    const valid = this.checkValidity()
    if (!valid || this.submitting) {
      return
    }
    this.submitting = true
    try {
      await this.actionCreateProject(this.project)
      this.clearProjectFormData()
      this.submitted = true
    } catch (err) {
      this.actionShowError('There was a problem creating your project')
    } finally {
      this.submitting = false
    }
  }
}
</script>

<style lang="stylus" module>
@import '../styles/config.styl';
@import '../styles/text.styl';
@import '../styles/tag.styl';
@import '../styles/card.styl';

@keyframes CreateProject {
  0% {
    opacity: 0;
    transform: translateY(-3rem);
  }

  50% {
    opacity: 1;
  }

  100% {
    opacity: 1;
    transform: translateY(0rem);
  }
}

.CreateProject {
  card();
  max-width: 90vw;
  width: 46rem;
  margin: $spacingLarge auto;
  padding: $spacingLarge;
  animation: CreateProject 0.75s 0.5s 1 forwards;
  opacity: 0;

  &__Auth {
    margin-top: $spacingBase;
    border-top: $colorGray solid 1px;
  }

  &__Step {
    margin: $spacingBase 0 $spacingBase;
    align-items: center;
    justify-content: space-between;
    display: flex;
    border-bottom: $colorGray solid 1px;
    padding-bottom: 1rem;
  }
}
</style>
