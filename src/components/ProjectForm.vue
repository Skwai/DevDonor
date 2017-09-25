<template>
  <Page>
    <form slot="content">
      <Subheading>Create a Project</Subheading>
      <ContentBlock>
        <p>We will review your application to make sure everything is in order and and email you soon.</p>
      </ContentBlock>

      <div class="ProjectForm__Organizations">
        <UserOrganization :organizationId="org['.key']" v-for="(org, key) in userOrganizations" :key="key" />
      </div>

      <TextField
        label="Project title"
      />

      <CheckboxGroup
        label="Skills required"
        :options="skillOptions"
        description="Select the type of work required for this project"
      />

      <TextAreaField
        label="Project description"
      />

      <Btn color="primary" size="large">Create Project</Btn>
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

  computed: {
    ...mapGetters(['uid'])
  },

  data () {
    return {
      loading: true,
      skillOptions: []
    }
  },

  firebase () {
    return {
      userOrganizations: {
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
