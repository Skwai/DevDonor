<template>
  <AppModal>
    <form>
      <AppSubheading>Create a new project</AppSubheading>
      <p>Hi! Have an idea for a great project? Fill out the form below to find developers to help you with it.</p>

      <AppField label="Your charity or not for profit name" :value="project.name" />

      <AppUpload />

      <AppField label="Charity type" :value="project.name" />
      <AppField label="Project title" :value="project.name" />
    </form>
  </AppModal>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import AppModal from '@/components/AppModal'
import AppSubheading from '@/components/AppSubheading'
import AppField from '@/components/AppField'
import AppUpload from '@/components/AppUpload'

@Component({
  components: {
    AppModal,
    AppSubheading,
    AppField,
    AppUpload
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
