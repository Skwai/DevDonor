<template>
  <Loading v-if="loading" />
  <Page v-else>
    <form slot="content" @submit.prevent="submit">

      <Heading>Charity Registration</Heading>
      <ContentBlock>
        Nail jelly to the hothouse wall screw the pooch, or we are running out of runway. Touch base. On-brand but completeley fresh pushback.
      </ContentBlock>

      <TextField label="Organization Name" :value.sync="organization.name" />

      <SelectField
        label="Charity Type"
        :value.sync="organization.type"
        :options="{ nfp: 'Not for profit', charity: 'Charity' }"
       />

      <TextField
        label="Website URL"
        :value.sync="organization.url"
        description="If you don't have a website, paste a link to your Facebook page"
      />

      <SelectField
        label="Region"
        :value.sync="organization.region"
        :options="countryOptions"
        description="The region that your organization mainly operates"
      />

      <TextAreaField
        label="Quick Description"
        :value.sync="organization.bio"
        description="Write a brief description about your organization for users to see"
      />


      <Btn color="primary" size="large">Submit Application</Btn>
    </form>
    <div slot="sidebar">
      <Card>
        <Subheading>Before you register&hellip;</Subheading>
        Nail jelly to the hothouse wall screw the pooch, or we are running out of runway. Touch base. On-brand but completeley fresh pushback, we need to leverage our synergies, for helicopter view cannibalize, and herding cats gain traction. Staff engagement herding cats killing it, nor bottleneck mice.
      </Card>
    </div>
  </Page>
</template>

<script>
import { db, sanitizeRef } from '@/services/firebase'

export default {
  data () {
    return {
      loading: false,

      organization: {
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
    }
  },

  methods: {
    submit (ev) {}
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
