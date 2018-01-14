<template>
  <AppModal>
    <form>
      <AppSubheading>Create a new project</AppSubheading>
      <p>Hi! Have an idea for a great project? Fill out the form below to find developers to help you with it.</p>
      <AppField label="Project name" :value="project.name" />
      <AppField label="Project name" :value="project.name" />
    </form>
  </AppModal>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import AppModal from '@/components/AppModal'
import AppSubheading from '@/components/AppSubheading'
import AppField from '@/components/AppField'

@Component({
  components: {
    AppModal,
    AppSubheading,
    AppField
  }
})
export default class CreateProjectPage extends Vue {
  @Getter currentUser: any

  project = {
    name: ''
  }

  created () {
    if (!this.currentUser) {
      // this.$router.push({ name: 'Home' })
    }
  }
}
</script>
