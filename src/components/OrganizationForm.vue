<template>
  <Loading v-if="isLoading" />
  <Page v-else>
    <template slot="content">
      <Alert v-if="isPendingApproval">
        Your charity registration has been submitted and is pending approval.
      </Alert>
      <form @submit.prevent="submit" v-else>

        <Heading>Charity Registration</Heading>
        <ContentBlock>
          Nail jelly to the hothouse wall screw the pooch, or we are running out of runway. Touch base. On-brand but completeley fresh pushback.
        </ContentBlock>

        <TextField
          label="Organization Name"
          :value.sync="org.name"
          :error="!validation.name"
          errorMessage="Please enter your charity name"
        />

        <TextField
          label="Website URL"
          :value.sync="org.url"
          :error="!validation.url"
          description="If you don't have a website, paste a link to your Facebook page"
        />

        <SelectField
          label="Country"
          :value.sync="org.country"
          :options="countryOptions"
          :error="!validation.country"
          errorMessage="Please select a country"
          description="The country that your organization is based"
        />

        <Upload
          :maxFileSize="2"
          filePath="logos"
          :fileName="organizationId"
          :url.sync="org.logo"
          label="Upload Your Logo"
          description="Upload a picture to use as your logo"
        />

        <TextAreaField
          label="Short Description"
          :value.sync="org.description"
          :error="!validation.description"
          errorMessage="Please enter a description"
          description="Write a brief description about your charity for users to see"
        />

        <Btn color="primary" size="large" :loading="saving" :disabled="!isValid">Submit Application</Btn>
      </form>
    </template>
    <template slot="sidebar">
      <Card v-if="!submitted">
        <Subheading>Before you register&hellip;</Subheading>
        Nail jelly to the hothouse wall screw the pooch, or we are running out of runway. Touch base. On-brand but completeley fresh pushback, we need to leverage our synergies, for helicopter view cannibalize, and herding cats gain traction. Staff engagement herding cats killing it, nor bottleneck mice.
      </Card>
    </template>
    </Page>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import db from '@/services/firebase'
import Upload from '@/components/Upload'

export default {
  components: {
    Upload
  },

  data () {
    return {
      loading: true,
      saving: false,
      submitted: false,

      countryOptions: [],

      org: {
        description: null,
        logo: null,
        name: null,
        country: null,
        url: null
      }
    }
  },

  computed: {
    isPendingApproval () {
      return this.$route.params.organizationId &&
        this.org.status !== 'APPROVED'
    },

    validation () {
      const { org } = this
      return {
        description: String(org.description).length,
        logo: String(org.logo).length,
        name: String(org.name).length,
        country: this.countryOptions.includes(org.country),
        url: String(org.url).length
      }
    },

    isValid () {
      const { validation } = this
      return Object.keys(validation).every(k => validation[k])
    },

    isLoading () {
      return this.loading
    },

    ...mapGetters(['uid'])
  },

  async created () {
    if (this.$route.params.organizationId) {
      this.organizationId = this.$route.params.organizationId
      const snapshot = await db.ref(`organizations/${this.organizationId}`).once('value')
      this.org = snapshot.val()
    } else {
      this.organizationId = db.ref('organizations').push().key
    }
    this.loading = false
  },

  methods: {
    submit (ev) {
      if (!this.isValid) {
        return this.$store.dispatch('showNotification', {
          type: 'error',
          message: 'There are problems with your registration'
        })
      }

      // submit
      this.createOrganization()
    },

    async createOrganization () {
      this.saving = true
      const { organizationId } = this

      try {
        const updates = {
          [`organizations/${organizationId}`]: this.org,
          [`users/${this.uid}/organizations/${organizationId}`]: true
        }
        await db.ref().update(updates)
        this.$store.dispatch('showNotification', {
          type: 'success',
          message: 'Your registration has been submitted'
        })
        this.$router.push({ name: 'organization', params: { organizationId } })
      } catch (err) {
        this.$store.dispatch('showNotification', {
          type: 'error',
          message: 'Error submitting form'
        })
      } finally {
        this.saving = false
      }
    }
  },

  firebase () {
    return {
      countries: {
        source: db.ref('countries'),
        readyCallback (snapshot) {
          this.countryOptions = Object.keys(snapshot.val())
        }
      }
    }
  }
}
</script>

<style lang="stylus">

</style>
