<template>
  <Page>
    <form slot="content" @submit.prevent="submit">
      <Subheading>Create a Project</Subheading>
      <ContentBlock>
        <p>We will review your application to make sure everything is in order and and email you soon.</p>
      </ContentBlock>

      <div class="ProjectForm__Organizations">
        <UserOrganization :organizationId="org['.key']" v-for="(org, key) in userOrgs" :key="key" />
      </div>

      <TextField
        label="Project title"
        :value="project.title"
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
        <p>Test</p>
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

      project: {
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
    async submit () {
      const projectId = db.ref('projects').push().key
      const { description, title } = this.project
      const organization = this.userOrgs[0]['.key']
      const skills = this.project.skills.reduce((obj, v) => Object.assign(obj, { [v]: true }), {})
      this.saving = true
      try {
        await db.ref(`projects/${projectId}`).transaction((data) => {
          // Add the author to the project if they're not already
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
        this.$store.dispatch('showNotification', {
          message: 'Your project has been created',
          type: 'success'
        })
        this.$router.push({ name: 'project', params: { projectId } })
      } catch (err) {
        console.log(err)
      } finally {
        this.saving = false
      }
    }
  },

  firebase () {
    return {
      userOrgs: {
        source: db.ref(`users/${this.uid}/organizations`),
        readyCallback (snapshot) {
          if (!snapshot.exists()) {
            // TODO: empty organizations
          }
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

.ProjectForm
  &__Organizations
    margin-bottom: spacingBase
</style>
