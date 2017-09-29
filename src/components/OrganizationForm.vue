<template>
  <Loading v-if="isLoading" />
  <Page v-else>
    <template slot="content">
      <form @submit.prevent="submit">

        <Heading>Charity Registration</Heading>
        <ContentBlock>
          Nail jelly to the hothouse wall screw the pooch, or we are running out of runway. Touch base. On-brand but completeley fresh pushback.
        </ContentBlock>

        <TextField
          label="Organization Name"
          :value.sync="organization.name"
          :error="!validation.name"
          errorMessage="Please enter your charity name"
        />

        <TextField
          label="Website URL"
          :value.sync="organization.url"
          :error="!validation.url"
          description="If you don't have a website, paste a link to your Facebook page"
        />

        <SelectField
          label="Country"
          :value.sync="organization.country"
          :options="countryOptions"
          :error="!validation.country"
          errorMessage="Please select a country"
          description="The country that your organization is based"
        />

        <Upload
          :maxFileSize="2"
          filePath="logos"
          :fileName="organizationId"
          :url.sync="organization.logo"
          label="Upload Your Logo"
          description="Upload a picture to use as your logo"
        />

        <TextAreaField
          label="Short Description"
          :value.sync="organization.description"
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

      organization: {
        description: null,
        logo: null,
        name: null,
        country: null,
        url: null
      }
    }
  },

  computed: {
    validation () {
      const { organization } = this
      return {
        description: String(organization.description).length,
        logo: String(organization.logo).length,
        name: String(organization.name).length,
        country: this.countryOptions.includes(organization.country),
        url: String(organization.url).length
      }
    },
    isValid () {
      const { validation } = this
      return Object.keys(validation).every(k => validation[k])
    },
    isLoading () {
      return this.loading
    },
    ...mapGetters(['uid', 'countries'])
  },

  async created () {
    if (this.$route.params.organizationId) {
      this.organizationId = this.$route.params.organizationId
      await this.$store.dispatch('getOrganization', this.$route.params.organizationId)
      const organization = this.$store.getters.getOrganization(this.organizationId)
      Object.assign(this.organization, organization)
    } else {
      this.organizationId = db.ref('organizations').push().key
    }
    this.loading = false
  },

  methods: {
    async submit (ev) {
      if (!this.isValid) {
        return this.$store.dispatch('errorNotification', 'There are problems with your registration')
      }

      try {
        this.saving = true
        await this.$store.dispatch('updateOrganization', {
          key: this.organizationId
        })
      } finally {
        this.saving = false
      }
    }
  }

  /*
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
  */
}
</script>

<style lang="stylus">

</style>
