<template>
  <Loading v-if="loading" />
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
          :options="countries"
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

        <Btn
          color="primary"
          size="large"
          :loading="saving"
          :disabled="!isValid"
        >Submit Application</Btn>
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
        description: !!String(organization.description).length,
        logo: !!String(organization.logo).length,
        name: !!String(organization.name).length,
        country: this.countries.includes(organization.country),
        url: !!String(organization.url).length
      }
    },
    isValid () {
      const { validation } = this
      return Object.keys(validation).every(k => validation[k])
    },
    ...mapGetters(['uid', 'countries'])
  },

  async created () {
    this.organizationId = this.$route.params.organizationId || db.ref('organizations').push().key
    await this.$store.dispatch('getCountries')
    if (this.$route.params.organizationId) {
      await this.$store.dispatch('getOrganization', this.organizationId)
      Object.assign(this.organization, this.$store.getters.getOrganization(this.organizationId))
    }
    this.loading = false
  },

  methods: {
    async submit () {
      if (!this.isValid) {
        this.$store.dispatch('errorNotification', 'There are problems with your registration')
        return
      }
      try {
        this.saving = true
        const { description, logo, name, country, url } = this.organization
        await this.$store.dispatch('updateOrganization', {
          key: this.organizationId,
          description,
          logo,
          name,
          country,
          url
        })
        this.$store.dispatch('successNotification', 'Your registration has been submitted')
        this.$router.push({ name: 'organization', params: { organizationId: this.organizationId } })
      } catch (err) {
        this.$store.dispatch('errorNotification', 'There was an error submitting your registration')
      } finally {
        this.saving = false
      }
    }
  }
}
</script>

<style lang="stylus">
</style>
