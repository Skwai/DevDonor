<template>
  <Loading v-if="loading" />
  <Page v-else>
    <form slot="content" @submit.prevent="submit">
      <Heading>Volunteer Profile</Heading>
      <ContentBlock>
        Nail jelly to the hothouse wall screw the pooch, or we are running out of runway. Touch base. On-brand but completeley fresh pushback.
      </ContentBlock>

      <TextField
        label="Email"
        :value.sync="user.email"
        :options="roleOptions"
        disabled
       />

      <TextField
        label="Name"
        :value.sync="user.name"
        :options="roleOptions"
        disabled
       />

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
        description="Write a brief description about yourself"
      />

      <Btn color="primary" size="large" type="submit">Update your profile</Btn>
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
      loading: true
    }
  },

  computed: {
    countryOptions () {
      return sanitizeRef(this.countries)
    },
    roleOptions () {
      return {}
    },
    validations () {
      return {
        bio: () => true,
        region: () => true,
        role: () => true
      }
    },
    ...mapGetters(['uid'])
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
        readyCallback (snapshot) {
          if (!snapshot.exists()) {
            console.log('NO USER')
          }
          console.log(snapshot.val())
          this.loading = false
        }
      }
    }
  }
}
</script>

<style lang="stylus">

</style>
