<template>
  <Loading v-if="loading" />
  <div v-else>
    <Page v-if="submitted">
      <Card>
        <Subheading>Your application for <em>{{registration.name}}</em> has been submitted</Subheading>
        <ContentBlock>
          <p>We will review your application to make sure everything is in order and and email you soon.</p>
          <p>This is part of our process to ensure that all organizations are confirmed charities.</p>
          <p>If you have any questions please <router-link to="/contact">contact us</router-link></p>
        </ContentBlock>
      </Card>
    </Page>
    <Page v-else>
      <form @submit.prevent="submit" slot="content">

        <Heading>Charity Registration</Heading>
        <ContentBlock>
          Nail jelly to the hothouse wall screw the pooch, or we are running out of runway. Touch base. On-brand but completeley fresh pushback.
        </ContentBlock>

        <TextField
          label="Organization Name"
          :value.sync="registration.name"
          :error="validations.name"
          errorMessage="Please enter your charity name"
        />

        <SelectField
          label="Charity Type"
          :value.sync="registration.type"
          :error="validations.type"
          errorMessage="Please select a charity type"
          :options="organizationTypeOptions"
        />

        <TextField
          label="Website URL"
          :value.sync="registration.url"
          :error="validations.url"
          description="If you don't have a website, paste a link to your Facebook page"
        />

        <SelectField
          label="Region"
          :value.sync="registration.region"
          :options="countryOptions"
          :error="validations.region"
          errorMessage="Please select a region"
          description="The region that your organization mainly operates"
        />

        <Upload
          :maxFileSize="2"
          filePath="logos"
          :fileName="organizationId"
          :url.sync="registration.logo"
          label="Upload your logo"
        />

        <TextAreaField
          label="Short Description"
          :value.sync="registration.bio"
          :error="validations.bio"
          errorMessage="Please enter a description"
          description="Write a brief description about your organization for users to see"
        />

        <Btn color="primary" size="large" :loading="saving">Submit Application</Btn>
      </form>
      <div slot="sidebar">
        <Card v-if="!submitted">
          <Subheading>Before you register&hellip;</Subheading>
          Nail jelly to the hothouse wall screw the pooch, or we are running out of runway. Touch base. On-brand but completeley fresh pushback, we need to leverage our synergies, for helicopter view cannibalize, and herding cats gain traction. Staff engagement herding cats killing it, nor bottleneck mice.
        </Card>
      </div>
    </Page>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { db } from '@/services/firebase'
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

      registration: {
        bio: null,
        logo: null,
        name: null,
        type: null,
        url: null,
        region: null
      }
    }
  },

  computed: {
    validations () {
      return {
        bio: (val) => val.length,
        logo: (val) => val.length,
        name: (val) => val.length,
        region: (val) => val.length,
        url: (val) => val.length,
        type: (val) => val.length
      }
    },
    ...mapGetters(['uid'])
  },

  async created () {
    this.organizationId = db.ref('organizations').push().key
    const registrations = await db.ref(`users/${this.uid}/organizations/`).once('value')

    // check if user has already submitted a registration
    if (registrations.exists()) {
      this.submitted = true
      const [ organizationId ] = Object.keys(registrations.val())
      const registration = await db.ref(`organizations/${organizationId}`).once('value')
      this.registration = registration.val()
    }

    if (!this.organizationId) {
      this.$store.dispatch('createOrganizationId')
    }

    this.loading = false
  },

  methods: {
    submit (ev) {
      if (!Object.values(this.validations).every(v => v)) {
        return this.$store.dispatch('showNotification', {
          type: 'error',
          message: 'There are problems with your registration'
        })
      }

      // validate fields
      if (!this.validate()) return

      // submit
      this.createRegistration()
    },

    validate () {
      return Object.values(this.validations).every(v => v)
    },

    async createRegistration () {
      this.saving = true
      const { organizationId } = this

      try {
        const updates = {
          [`organizations/${organizationId}`]: this.registration,
          [`users/${this.uid}/organizations/${organizationId}`]: true
        }
        await db.ref().update(updates)
        this.$store.dispatch('showNotification', {
          type: 'success',
          message: 'Your registration has been submitted'
        })
        this.submitted = true
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
        source: db.ref('organizationTypes'),
        readyCallback (snapshot) {
          this.countryOptions = Object.keys(snapshot.val())
        }
      },
      organizationTypes: {
        source: db.ref('organizationTypes'),
        readyCallback (snapshot) {
          this.organizationTypeOptions = Object.keys(snapshot.val())
        }
      }
    }
  }
}
</script>

<style lang="stylus">

</style>
