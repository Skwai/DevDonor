<template>
  <Loading v-if="loading" />
  <Page v-else>
    <form slot="content" @submit.prevent="submit">
      <TextField label="Organization Name" :value.sync="organization.name" />
    </form>
  </Page>
</template>

<script>
import Loading from '@/components/Loading'
import Page from '@/components/Page'
import TextField from '@/components/TextField'

export default {
  components: {
    Loading,
    Page,
    TextField
  },

  data () {
    return {
      loading: false,

      organization: {
        name: null
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
