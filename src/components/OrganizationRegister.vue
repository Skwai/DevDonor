<template>
  <Loading v-if="loading" />
  <Page v-else>
    <form slot="content" @submit.prevent="submit">

      <Heading>Charity Registration</Heading>
      <Content>
        Nail jelly to the hothouse wall screw the pooch, or we are running out of runway. Touch base. On-brand but completeley fresh pushback.
      </Content>

      <TextField label="Organization Name" :value.sync="organization.name" />

      <TextField label="Organization Type" :value.sync="organization.type" />

      <TextField
        label="Website URL"
        :value.sync="organization.url"
        description="If you don't have a website, paste a link to your Facebook page"
      />
      <TextField
        label="Region"
        :value.sync="organization.region"
        description="The region that your organization mainly operates"
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
import Loading from '@/components/Loading'
import Page from '@/components/Page'
import Heading from '@/components/Heading'
import TextField from '@/components/TextField'
import Content from '@/components/Content'
import Card from '@/components/Card'
import Subheading from '@/components/Subheading'
import Btn from '@/components/Btn'

export default {
  components: {
    Loading,
    Page,
    TextField,
    Heading,
    Content,
    Card,
    Subheading,
    Btn
  },

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

  methods: {
    submit (ev) {
      console.log(ev)
    }
  }
}
</script>

<style lang="stylus">

</style>
