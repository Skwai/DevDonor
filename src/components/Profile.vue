<template>
  <Loading v-if="loading" />
  <Page v-else>
    <form slot="content" @submit.prevent="submit">
      <Heading>Your Profile</Heading>
      <ContentBlock>
        Nail jelly to the hothouse wall screw the pooch, or we are running out of runway. Touch base. On-brand but completeley fresh pushback.
      </ContentBlock>

      <FormBlock legend="Basic information">
        <TextField
          label="Name"
          :value.sync="currentUser.name"
          :error="!validation.name"
          errorMessage="Please enter a name"
        />
        <SelectField
          label="Country"
          :value.sync="currentUser.country"
          :options="countries"
          :error="!validation.country"
          errorMessage="Please select a country"
        />
      </FormBlock>

      <FormBlock legend="Professional history">
        <TextField
          label="Professional title"
          :value.sync="currentUser.role"
          :error="!validation.role"
          errorMessage="Please enter a professional title"
          description='A professional title that describes the work you do. Eg. "Web Developer" or "UX Designer"'
        />
        <CheckboxGroup
          label="Professional skills"
          :options="skills"
          :error="!validation.skills"
          errorMessage="Please select some skills"
          description="Select the type of work you have expertise in"
          :value.sync="currentUser.skills"
        />
      </FormBlock>
      <FormBlock legend="Your biography">
        <TextAreaField
          label="A little bit about yourself"
          :value.sync="currentUser.bio"
          :error="!validation.bio"
          errorMessage="Please enter a brief biography"
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
import Upload from '@/components/Upload'

export default {
  components: {
    Upload
  },

  data () {
    return {
      loading: true,
      saving: false,
      organizationId: null
    }
  },

  computed: {
    validation () {
      const { currentUser, countries, skills } = this
      return {
        bio: String(currentUser.bio).length,
        role: String(currentUser.role).length,
        country: countries.includes(currentUser.country),
        skills: skills.includes(currentUser.skill)
      }
    },
    ...mapGetters(['uid', 'currentUser', 'skills', 'countries'])
  },

  methods: {
    async submit () {
      this.saving = true
      this.error = false
      const { bio, country, role, skills } = this.currentUser

      try {
        await this.$store.dispatch('updateUser', {
          key: this.uid,
          bio,
          country,
          role,
          skills
        })
        this.$store.dispatch('successNotification', 'Your profile has been updated')
      } catch (err) {
        this.$store.dispatch('errorNotification', 'Could not update your profile')
      } finally {
        this.saving = false
      }
    }
  },

  async created () {
    await this.$store.dispatch('getSkills')
    await this.$store.dispatch('getCountries')
    await this.$store.dispatch('getUser', this.uid)
    this.loading = false
  }
}
</script>

<style lang="stylus">

</style>
