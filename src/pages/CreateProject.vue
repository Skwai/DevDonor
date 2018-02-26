<template>
  <AppModal
    @close="cancel"
    :class="$style.CreateProject"
    :canClose="true"
  >
    <AppHeading>Create a new project</AppHeading>
    <p>Are you a charity or not-for-profit and have an idea for a great project? Fill out the form below to find developers to help you with it.</p>

    <div v-if="!getCurrentUser" :class="$style.CreateProject__Auth">
      <AppSubheading>You'll need to sign in to create a new project</AppSubheading>
      <AuthLogin />
    </div>
    <AppCard v-else-if="getCurrentUser" :class="$style.CreateProject__CurrentUser">
      <AppMediaObject align="center">
        <img slot="object" :src="getCurrentUser.photoURL" width="64" height="64">
        <div slot="body">
          <div><strong>{{getCurrentUser.displayName}}</strong></div>
          <div :class="$style.CreateProject__CurrentUserEmail">{{getCurrentUser.email}}</div>
          <AppLink @click="logout">Sign out of Google+</AppLink>
        </div>
      </AppMediaObject>
    </AppCard>
    <form v-if="getCurrentUser" @submit.prevent="submit">
      <template v-if="step === 1">
        <h2 :class="$style.CreateProject__Step">
          <span>About your organization</span>
          <AppTag>Step 1 of 2</AppTag>
        </h2>
        <AppFieldGroup>
          <AppField
            label="Organization name"
            :required="true"
            :span="2"
            :valid="validations[steps.STEP_1].organizationName"
            v-model="project.organizationName"
          />

          <AppSelect
            label="Charity type"
            :required="true"
            v-model="project.organizationType"
            :span="2"
            :options="causeOptions"
            :valid="validations[steps.STEP_1].organizationType"
            description="What goal or cause does your organization focus on?"
          ></AppSelect>

          <AppSelect
            label="Country"
            :required="true"
            v-model="project.country"
            :options="countryOptions"
            :valid="validations[steps.STEP_1].country"
          />

          <AppSelect
            label="State/Province"
            :required="true"
            v-model="project.state"
            :options="countryOptions"
            :valid="validations[steps.STEP_1].state"
          />

          <AppUpload
            :maxFileSize="2"
            filePath="logos"
            :span="2"
            :fileName="fileName"
            v-model="project.organizationLogo"
            label="Upload your logo"
            description="Upload a picture to use as your logo"
            :valid="validations[steps.STEP_1].organizationDescription"
          />

          <AppField
            type="textarea"
            :required="true"
            :span="2"
            label="Organization description"
            v-model="project.organizationDescription"
            :valid="validations[steps.STEP_1].organizationDescription"
            :minlength="10"
            :maxlength="200"
            description="Describe what your organization does, how it helps people, and what its mission is."
          />
        </AppFieldGroup>

        <div :class="$style.CreateProject__Actions">
          <AppBtn type="button" @click="cancel">Cancel</AppBtn>
          <AppBtn
            @click="nextStep"
            color="primary"
            size="large"
            :disabled="!isValid[steps.STEP_1]"
          >Next step</AppBtn>
        </div>
      </template>
      <template v-if="step === 2">
        <h2 :class="$style.CreateProject__Step">
          <span>About your project</span>
          <AppTag>Step 2 of 2</AppTag>
        </h2>
        <AppFieldGroup>
          <AppField
            label="Project name"
            :required="true"
            :span="2"
            :valid="validations[steps.STEP_2].title"
            v-model="project.title"
            :minlength="10"
            :maxlength="100"
          />

          <AppSelect
            label="Project type"
            v-model="project.projectType"
            :required="true"
            :span="2"
            :valid="validations[steps.STEP_2].projectType"
            :options="projectTypeOptions"
            description="What sort of project are you looking to create?"
          />

          <AppField
            type="textarea"
            :rows="10"
            :span="2"
            label="Project description"
            v-model="project.description"
            :valid="validations[steps.STEP_2].description"
            :required="true"
            :minlength="50"
          />
        </AppFieldGroup>
        <div :class="$style.CreateProject__Actions">
          <AppBtn
            type="button"
            @click="prevStep"
          >Previous Step</AppBtn>
          <AppBtn
            type="submit"
            color="primary"
            size="large"
            :disabled="!isValid[steps.STEP_1] || !isValid[steps.STEP_2]"
          >Create My Project</AppBtn>
        </div>
      </template>
    </form>
  </AppModal>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'

import Project from '../models/Project'
import { createID } from '../services/db'
import countries from '../utils/countries'
import { required, minLength, maxLength } from '../utils/validations'
import AuthLogin from '../components/AuthLogin.vue'

const CAUSE_OPTIONS = [
  'Art & Culture',
  'Animals & Environment',
  'Humanitarian Aid',
  'Youth & Education',
  'Social Services',
  'Health & Wellness'
]

const PROJECT_TYPE_OPTIONS = ['Web', 'Mobile', 'Desktop']

// the names of the steps
const STEP_1 = 'step1'
const STEP_2 = 'step2'
const STEPS = [STEP_1, STEP_2]

@Component({
  components: {
    AuthLogin
  }
})
export default class CreateProjectPage extends Vue {
  private project = new Project()
  private fileName: string = ''
  private step: number = 1
  private causeOptions: string[] = CAUSE_OPTIONS
  private countryOptions: string[] = countries.map((c: { name: string }) => c.name)
  private projectTypeOptions: string[] = PROJECT_TYPE_OPTIONS.slice(0)
  private steps: {} | undefined = undefined // non-reactive

  @Action private storeProjectFormData: (project: Project) => void
  @Action private createProject: (project: Project) => Promise<void>
  @Action private clearProjectFormData: () => void
  @Action private loadCurrentUser: () => Promise<void>
  @Action('logout') private actionLogout: () => void

  @Getter private getSavedCreateProjectFormData: {}
  @Getter private getCurrentUser: {}

  @Watch('project', { immediate: false, deep: true })
  private onProjectChanged(value: Project) {
    this.storeProjectFormData(value)
  }

  private async created() {
    this.steps = { STEP_1, STEP_2 }
    await this.loadCurrentUser()
    this.fileName = createID()
    Object.assign(this.project, this.getSavedCreateProjectFormData)
    window.onpopstate = this.loadURLStep.bind(this)
    this.loadURLStep()
  }

  private cancel() {
    this.$router.push('/')
  }

  private nextStep() {
    if (STEPS[this.step]) {
      this.step++
      this.pushURLStep()
    }
  }

  private prevStep() {
    if (STEPS[this.step - 2]) {
      this.step--
      this.pushURLStep()
    }
  }

  private loadURLStep() {
    const hash = window.location.hash.substring(1)
    this.step = hash && STEPS.includes(hash) ? STEPS.indexOf(hash) + 1 : 1
  }

  private pushURLStep() {
    const { step } = this
    const hash = `#${STEPS[this.step - 1]}`
    history.pushState(null, '', hash)
  }

  get validations() {
    const {
      organizationName,
      organizationType,
      organizationDescription,
      country,
      title,
      description,
      projectType,
      state
    } = this.project
    return {
      // step 1
      [STEP_1]: {
        organizationName: required(organizationName) && minLength(organizationName, 3),
        organizationType: required(organizationType),
        organizationDescription:
          required(organizationDescription) &&
          minLength(organizationDescription, 10) &&
          maxLength(organizationDescription, 200),
        country: required(country),
        state: required(state)
      },
      // step 2
      [STEP_2]: {
        title: required(title) && minLength(title, 10) && maxLength(title, 200),
        projectType: required(projectType),
        description: required(description) && minLength(description, 100)
      }
    }
  }

  get isValid() {
    return {
      [STEP_1]: Object.values(this.validations[STEP_1]).every((v) => !!v),
      [STEP_2]: Object.values(this.validations[STEP_2]).every((v) => !!v)
    }
  }

  private async submit(ev: Event) {
    if (!this.isValid) {
      return
    }
    try {
      await this.createProject(this.project)
      this.clearProjectFormData()
    } catch (err) {}
  }

  private logout() {
    this.actionLogout()
  }
}
</script>

<style lang="stylus" module>
@import '../styles/config.styl';
@import '../styles/text.styl';
@import '../styles/tag.styl';

.CreateProject {
  h3 {
    margin-bottom: $spacingBase;
  }

  h4 {
    margin-bottom: 0.5rem;
  }

  &__Auth {
    margin-top: $spacingBase;
    text-align: center;
    border-top: $colorGray solid 1px;
    padding-top: $spacingBase;
  }

  &__Step {
    margin: $spacingBase 0 $spacingBase;
    align-items: center;
    justify-content: space-between;
    display: flex;
    border-bottom: $colorGray solid 1px;
    padding-bottom: 1rem;
  }

  &__Actions {
    text-align: right;
  }

  &__CurrentUser {
    margin-top: $spacingBase;
  }

  &__CurrentUserEmail {
    // opacity: 0.7;
    // font-size: $fontSizeSmall;
    margin-bottom: 0.5rem;
  }
}
</style>
