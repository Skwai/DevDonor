<template>
  <Loading v-if="loading" />
  <Page v-else>
    <form slot="content" @submit.prevent="submit">
      <Heading>Your Profile</Heading>
      <ContentBlock>
        Nail jelly to the hothouse wall screw the pooch, or we are running out of runway. Touch base. On-brand but completeley fresh pushback.
      </ContentBlock>

      <FormBlock legend="Profile picture">
        <MediaObject align="center">
          <div slot="object">
            <Avatar v-if="user.picture" :url="user.picture" description="Your profile picture" />
            <Upload v-else
              :maxFileSize="2"
              filePath="avatars"
              :fileName="registrationId"
              :url.sync="user.picture"
              label="Upload a profile picture"
            />
          </div>
          <div slot="body">
            <p>Upload a professional portrait that clearly shows your face</p>
          </div>
        </MediaObject>
      </FormBlock>

      <FormBlock legend="Basic information">

        <TextField
          label="Name"
          :value.sync="profile.name"
          :options="roleOptions"
        />

        <SelectField
          label="Country"
          :value.sync="user.country"
          :options="countryOptions"
        />

      </FormBlock>

      <FormBlock legend="Professional history">

        <TextField
          label="Professional title"
          :value.sync="profile.role"
          description='A professional title that describes the work you do. Eg. "Web Developer" or "UX Designer"'
        />

        <CheckboxGroup
          label="Professional skills"
          :options="skillOptions"
          description="Select the type of work you have expertise in"
          value="profile.skills"
        />

        <TextAreaField
          label="About You"
          :value.sync="profile.bio"
          description="Write a brief description about yourself"
        />

      </FormBlock>

      <Btn
        color="primary"
        size="large"
        type="submit"
        :loading="saving"
      >Update your profile</Btn>
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
      loading: true,
      saving: false,

      profile: {
        bio: null,
        role: null,
        country: null,
        skills: null
      }
    }
  },

  computed: {
    countryOptions () {
      return sanitizeRef(this.countries)
    },
    skillOptions () {
      return [
        'Desktop Software Development',
        'Web Development',
        'Mobile Development',
        'Product Management',
        'Systems Administration / DevOps',
        'UX Design',
        'Design'
      ]
    },
    validations () {
      return {
      }
    },
    ...mapGetters(['uid'])
  },

  methods: {
    async submit (ev) {
      ev.preventDefault()
      this.saving = true
      const { bio, country, role, skills } = this.profile
      await this.$firebaseRefs.user.update({
        bio,
        country,
        role,
        skills
      })
      this.saving = false
    }
  },

  firebase () {
    return {
      countries: db.ref('countries'),
      user: {
        source: db.ref('users').child(this.uid),
        asObject: true,
        readyCallback (snapshot) {
          Object.assign(this.profile, snapshot.val())
          console.log(this.profile)
          this.loading = false
        }
      }
    }
  }
}
</script>

<style lang="stylus">

</style>
