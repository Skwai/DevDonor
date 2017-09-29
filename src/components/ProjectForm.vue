<template>
  <Page>
    <form slot="content" @submit.prevent="submit">
      <Subheading>Create a Project</Subheading>
      <ContentBlock>
        <p>We will review your application to make sure everything is in order and and email you soon.</p>
      </ContentBlock>

      <div
        class="ProjectForm__Organization"
        :class="{ '-open': showOrganizations }"
      >
        <button
          v-if="Object.keys(organizations).length"
          class="ProjectForm__OrganizationToggle"
          @click.prevent="toggleOrganizations"
        ><UserOrganization :organizationId="project.organization" /></button>
        <Loading size="small" v-else />
        <div class="ProjectForm__OrganizationOptions">
          <div
            class="ProjectForm__OrganizationOption"
            v-for="(org, key) in organizations"
            :key="key"
            @click="selectOrganization(org['.key'])"
          ><UserOrganization :organizationId="org['.key']" /></div>
        </div>
      </div>

      <TextField
        label="Project title"
        :value.sync="project.title"
      />

      <CheckboxGroup
        label="Skills required"
        :options="skills"
        :value.sync="project.skills"
        description="Select the type of work required for this project"
      />

      <TextAreaField
        label="Project description"
        :value.sync="project.description"
      />

      <Btn color="primary" size="large" :loading="saving">Create Project</Btn>
    </form>
    <div slot="sidebar">
      <Card>
        <p>Nail jelly to the hothouse wall screw the pooch, or we are running out of runway. Touch base. On-brand but completeley fresh pushback, we need to leverage our synergies, for helicopter view cannibalize, and herding cats gain traction. Staff engagement herding cats killing it, nor bottleneck mice.</p>
      </Card>
    </div>
  </Page>
</template>

<script>
import { mapGetters } from 'vuex'
import db from '@/services/firebase'
import UserOrganization from '@/components/UserOrganization'

export default {
  components: {
    UserOrganization
  },

  data () {
    return {
      loading: true,
      saving: false,

      showOrganizations: false,

      project: {
        country: null,
        organization: null,
        title: null,
        description: null,
        skills: []
      }
    }
  },

  computed: {
    organizations () {
      return this.$store.getters.getUserProjects(this.uid)
    },
    validation () {
      const { project } = this
      return {
        country: this.countries.includes(project.country),
        organization: !!String(project.organization).length,
        title: !!String(project.title).length,
        description: !!String(project.description).length,
        skills: !!String(project.skills).length
      }
    },
    isValid () {
      const { validation } = this
      return Object.keys(validation).every(k => validation[k])
    },
    ...mapGetters(['uid', 'countries', 'skills'])
  },

  async created () {
    this.projectId = db.ref('projects').push().key
    await this.$store.dispatch('getUserProjects', this.uid)
    await this.$store.dispatch('getCountries')
    await this.$store.dispatch('getSkills')
  },

  methods: {
    toggleOrganizations () {
      this.showOrganizations = !this.showOrganizations
    },

    selectOrganization (orgId) {
      this.project.organization = orgId
      this.showOrganizations = false
    },

    async submit () {
      if (!this.isValid) {
        return this.$store.dispatch('errorNotification', 'There are problems with your registration')
      }

      try {
        this.saving = true
        const { description, title, organization, skills } = this.project
        await this.dispatch('updateProject', {
          description,
          title,
          organization,
          skills
        })
      } catch (err) {
        this.$dispatch('errorNotification', 'There was an error saving your project')
      } finally {
        this.saving = false
      }
    }
  }
  /*
    updateProject (projectId) {
      const skills = this.project.skills.reduce((obj, v) => Object.assign(obj, { [v]: true }), {})
      return db.ref(`projects/${this.projectId}`).transaction((data) => {
        const volunteers = (data && data.volunteers && this.uid in data.volunteers)
          ? data.volunteers
          : { [this.uid]: true }
        return {
          organization: data && data.organization ? data.organization : organization,
          createdAt: data && data.createdAt ? data.createdAt : new Date().toISOString(),
          title,
          skills,
          description,
          volunteers
        }
      })
    }
  },
  */
}
</script>

<style lang="stylus">
@require "../styles/config.styl"
@require "../styles/options.styl"
@require "../styles/forms.styl"

.ProjectForm
  &__Organization
    position: relative
    field()
    margin-bottom: spacingBase
    line-height: 0

    &Toggle
      border: 0
      padding: 0
      background: transparent
      cursor: pointer
      padding: spacingTiny
      width: 100%

      &:focus
        outline: 0

    &Options
      optionsList()

    &Option
      optionsItem()
      padding: spacingTiny

</style>
