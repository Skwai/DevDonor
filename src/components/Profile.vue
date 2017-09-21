<template>
  <Loading v-if="loading" />
  <Page v-else>
    <form slot="content" @submit.prevent="submit">
      <Heading>Volunteer Profile</Heading>
      <ContentBlock>
        Nail jelly to the hothouse wall screw the pooch, or we are running out of runway. Touch base. On-brand but completeley fresh pushback.
      </ContentBlock>

      <SelectField
        label="Role"
        :value.sync="user.role"
        :options="roleOptions"
       />

      <SelectField
        label="Country"
        :value.sync="user.region"
        :options="countryOptions"
        description="The region that your organization mainly operates"
      />

      <TextAreaField
        label="About You"
        :value.sync="user.bio"
        description="Write a brief description about your organization for users to see"
      />

      <Btn color="primary" size="large" type="submit">Update Profile</Btn>
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
import { mapGetters } from 'vuex'
import { db, sanitizeRef } from '@/services/firebase'
import Upload from '@/components/Upload'

export default {
  components: {
    Upload
  },

  data () {
    return {
      loading: false
    }
  },

  computed: {
    ...mapGetters(['uid']),
    countryOptions () {
      return sanitizeRef(this.countries)
    },
    roleOptions () {
      return {}
    }
  },

  methods: {
    submit (ev) {
      ev.preventDefault()
      const { bio, region, role } = this.user
      this.$firebaseRefs.user.update({
        bio,
        region,
        role
      })
    }
  },

  firebase () {
    return {
      countries: db.ref('countries'),
      user: {
        source: db.ref('users').child(this.uid),
        asObject: true,
        readyCallback (ss) {
          this.loading = false
        }
      }
    }
  }
}
</script>

<style lang="stylus">

</style>
