<template>
  <loading slot="content" v-if="loading" />
  <AppPage v-else>
    <form @submit.prevent="submit">
      <AppSubheading>Create a Project</AppSubheading>
      <AppContentBlock>
        <p>We will review your application to make sure everything is in order and and email you soon.</p>
      </AppContentBlock>

      <div
        class="ProjectForm__Organization"
        :class="{ '-open': showOrganizations }"
      >
        <button
          v-if="Object.keys(organizations).length"
          class="ProjectForm__OrganizationToggle"
          @click.prevent="toggleOrganizations"
        >
          <AppUserOrganization :organizationId="project.organization" />
        </button>
        <AppLoading size="small" v-else />
        <div class="ProjectForm__OrganizationOptions">
          <div
            class="ProjectForm__OrganizationOption"
            v-for="(org, key) in organizations"
            :key="key"
            @click="selectOrganization(org['.key'])"
          >
            <AppUserOrganization :organizationId="org['.key']" />
          </div>
        </div>
      </div>

      <AppTextField
        label="Project title"
        :value.sync="project.title"
      />

      <AppCheckboxGroup
        label="Skills required"
        :options="skills"
        :value.sync="project.skills"
        description="Select the type of work required for this project"
      />

      <AppTextAreaField
        label="Project description"
        :value.sync="project.description"
      />

      <AppBtn color="primary" size="large" :loading="saving">Create Project</AppBtn>
    </form>
    <div slot="sidebar">
      <AppCard>
        <p>Nail jelly to the hothouse wall screw the pooch, or we are running out of runway. Touch base. On-brand but completeley fresh pushback, we need to leverage our synergies, for helicopter view cannibalize, and herding cats gain traction. Staff engagement herding cats killing it, nor bottleneck mice.</p>
      </AppCard>
    </div>
  </AppPage>
</template>

<script>
import { mapGetters } from 'vuex'
import db from '@/services/firebase'
import AppUserOrganization from '@/components/AppUserOrganization'

export default {
  components: {
    AppUserOrganization
  },

  data () {
    return {
      loading: true,
      saving: false,

      showOrganizations: false,

      organizations: {},

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
      return Object.values(validation).every((v) => v)
    },
    ...mapGetters(['uid', 'countries', 'skills'])
  },

  async created () {
    this.projectId = this.$route.params.projectId || db.ref('projects').push().key
    await this.$store.dispatch('getUserOrganizations', this.uid)
    await this.$store.dispatch('getCountries')
    await this.$store.dispatch('getSkills')
    this.organizations = this.$store.getters.getUserOrganizations(this.uid)
    // set initial organization as the first
    this.selectOrganization(Object.keys(this.organizations).pop())
    this.loading = false
  },

  methods: {
    toggleOrganizations () {
      this.showOrganizations = !this.showOrganizations
    },

    selectOrganization (organizationId) {
      this.project.organization = organizationId
      this.project.country = this.organizations[organizationId].country
      this.showOrganizations = false
    },

    async submit () {
      if (!this.isValid) {
        return this.$store.dispatch('errorNotification', 'There are problems with your registration')
      }

      try {
        this.saving = true
        const { description, title, organization, skills } = this.project
        await this.$store.dispatch('updateProject', {
          key: this.projectId,
          description,
          title,
          organization,
          skills
        })
        if (!this.$route.params.projectId) {
          this.$router.push({ name: 'poject', params: { projectId: this.projectId } })
        }
        this.$store.dispatch('successNotification', 'Your project has been created')
      } catch (err) {
        this.$store.dispatch('errorNotification', 'There was an error saving your project')
      } finally {
        this.saving = false
      }
    }
  }
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
