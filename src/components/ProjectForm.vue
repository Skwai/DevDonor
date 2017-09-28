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
          v-if="Object.keys(userOrgs).length"
          class="ProjectForm__OrganizationToggle"
          @click.prevent="toggleOrganizations"
        ><UserOrganization :organizationId="project.organization" /></button>
        <Loading size="small" v-else />
        <div class="ProjectForm__OrganizationOptions">
          <div
            class="ProjectForm__OrganizationOption"
            v-for="(org, key) in userOrgs"
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
        :options="skillOptions"
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
import { db } from '@/services/firebase'
import UserOrganization from '@/components/UserOrganization'

export default {
  components: {
    UserOrganization
  },

  data () {
    return {
      loading: true,
      saving: false,
      skillOptions: [],
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
    ...mapGetters(['uid'])
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
      const projectId = db.ref('projects').push().key
      this.saving = true
      try {
        await this.updateProject()
        await db.ref(`users/${this.uid}/projects/${projectId}`).update(true)
        this.$store.dispatch('showNotification', {
          message: 'Your project has been created',
          type: 'success'
        })
        this.$router.push({ name: 'project', params: { projectId } })
      } catch (err) {
        this.$dispatch('showNotification', {
          message: 'There was an error saving your project',
          type: 'error'
        })
      } finally {
        this.saving = false
      }
    },

    updateProject (projectId) {
      const { description, title, organization } = this.project
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

  firebase () {
    return {
      userOrgs: {
        source: db.ref(`users/${this.uid}/organizations`),
        readyCallback (snapshot) {
          if (!snapshot.exists()) {
            this.$router.push({ name: '404' })
          }
          const [org] = Object.keys(snapshot.val())
          this.project.organization = org
          this.loading = false
        }
      },
      skills: {
        source: db.ref('skills'),
        readyCallback (snapshot) {
          this.skillOptions = Object.keys(snapshot.val())
        }
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
