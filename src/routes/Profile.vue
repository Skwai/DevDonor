<template>
  <Loading v-if="loading" />
  <Page v-else>
    <form slot="content" @submit.prevent="submit">
      <Heading>Your Profile</Heading>
      <ContentBlock>
        Nail jelly to the hothouse wall screw the pooch, or we are running out of runway. Touch base. On-brand but completeley fresh pushback.
      </ContentBlock>

      <TextField
        label="Professional title"
        :value.sync="profile.role"
        :error="!validation.role"
        errorMessage="Please enter a professional title"
        description='A professional title that describes the work you do. Eg. "Web Developer" or "UX Designer"'
      />
      <SelectField
        label="Country"
        :value.sync="profile.country"
        :options="countries"
        :error="!validation.country"
        errorMessage="Please select a country"
      />
      <CheckboxGroup
        label="Professional skills"
        :options="skills"
        :error="!validation.skills"
        errorMessage="Please select some skills"
        description="Select the type of work you have expertise in"
        :value.sync="profile.skills"
      />
      <TextAreaField
        label="A little bit about yourself"
        :value.sync="profile.bio"
        :error="!validation.bio"
        errorMessage="Please enter a brief biography"
      />

      <Btn
        color="primary"
        size="large"
        type="submit"
        :loading="saving"
        :disabled="!isValid"
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

export default {
  data () {
    return {
      loading: true,
      saving: false,
      organizationId: null,

      profile: {
        bio: null,
        country: null,
        role: null,
        skills: []
      }
    }
  },

  computed: {
    validation () {
      const { profile, countries } = this
      return {
        bio: !!String(profile.bio).length,
        country: countries.includes(profile.country),
        role: !!String(profile.role).length,
        skills: !!Object.keys(profile.skills).length
      }
    },
    isValid () {
      return Object.values(this.validation).every(v => v)
    },
    ...mapGetters(['uid', 'skills', 'countries'])
  },

  methods: {
    async submit () {
      if (!this.isValid) {
        this.$store.dispatch('errorNotification', 'There are problems with your details')
        return
      }
      this.saving = true
      this.error = false
      const { bio, country, role, skills } = this.profile
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
    Object.assign(this.profile, await this.$store.getters.getUser(this.uid))
    this.loading = false
  }
}
</script>

<style lang="stylus">

</style>
