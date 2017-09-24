<template>
  <Page>
    <form slot="content">
      <Subheading>Create a Project</Subheading>
      <ContentBlock>
        <p>We will review your application to make sure everything is in order and and email you soon.</p>
      </ContentBlock>

      <div class="organizations">
        <div v-for="(org, key) in orgs">
        </div>
      </div>

      <TextField
        label="Project title"
      />

      <TextAreaField
        label="Project description"
      />

      <Btn color="primary" size="large">Create Project</Btn>



    </form>
    <div slot="sidebar">
      <Card>
        <p>Test</p>
      </Card>
    </div>
  </Page>
</template>

<script>
import { mapGetters } from 'vuex'
import { db } from '@/services/firebase'

export default {
  computed: {
    ...mapGetters([
      'uid'
    ])
  },

  data () {
    return {
      orgs: []
    }
  },

  async created () {
    const userOrgsRef = await db.ref(`users/${this.uid}/organizations`).once('value')
    if (!userOrgsRef.exists()) {
      // TODO: empty organizations
      return
    }
  }
}
</script>

<style lang="stylus">
</style>
