<template>
  <Loading v-if="loading" />
  <div v-else>
    <Page v-if="submitted">
      <Card>
        <Subheading>Your application for <em>{{registration.name}}</em> has been submitted</Subheading>
        <ContentBlock>
          <p>We will review your application to make sure everything is in order and and email you soon.</p>
          <p>This is part of our process to ensure that all organizations are confirmed charities.</p>
        </ContentBlock>
      </Card>
    </Page>
    <Page v-else>
      <div slot="content">
        <div v-if="submitted">

        </div>
        <form v-else @submit.prevent="submit">

          <Heading>Charity Registration</Heading>
          <ContentBlock>
            Nail jelly to the hothouse wall screw the pooch, or we are running out of runway. Touch base. On-brand but completeley fresh pushback.
          </ContentBlock>

          <Alert v-if="error">{{error}}</Alert>

          <TextField label="Organization Name" :value.sync="registration.name" />

          <SelectField
            label="Charity Type"
            :value.sync="registration.type"
            :options="{ nfp: 'Not for profit', charity: 'Charity' }"
          />

          <TextField
            label="Website URL"
            :value.sync="registration.url"
            description="If you don't have a website, paste a link to your Facebook page"
          />

          <SelectField
            label="Region"
            :value.sync="registration.region"
            :options="countryOptions"
            description="The region that your organization mainly operates"
          />

          <Upload
            :maxFileSize="2"
            filePath="logos"
            :fileName="registrationId"
            :url.sync="registration.logo"
            label="Upload your logo"
          />

          <TextAreaField
            label="Short Description"
            :value.sync="registration.bio"
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
      </div>
    </Page>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { db, sanitizeRef } from '@/services/firebase'
import Upload from '@/components/Upload'

export default {
  components: {
    Upload
  },

  data () {
    return {
      loading: true,
      saving: false,
      error: null,
      submitted: false,

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
    countryOptions () {
      return sanitizeRef(this.countries)
    },
    validations () {
      return {

      }
    },
    ...mapGetters(['uid', 'registrationId'])
  },

  async created () {
    const registrations = await db.ref(`users/${this.uid}/registrations/`).once('value')

    // check if user has already submitted a registration
    if (registrations.exists()) {
      this.submitted = true
      const [ registrationId ] = Object.keys(registrations.val())
      const registration = await db.ref(`registrations/${registrationId}`).once('value')
      this.registration = registration.val()
    }

    if (!this.registrationId) {
      this.$store.dispatch('createRegistrationId')
    }

    this.loading = false
  },

  methods: {
    async submit (ev) {
      this.error = false
      this.saving = true
      try {
        const updates = {
          [`registrations/${this.registrationId}`]: this.registration,
          [`users/${this.uid}/registrations/${this.registrationId}`]: true
        }
        await db.ref().update(updates)
      } catch (err) {
        this.error = err
      } finally {
        this.saving = false
      }
    }
  },

  firebase () {
    return {
      countries: db.ref('countries')
    }
  }
}
</script>

<style lang="stylus">

</style>
