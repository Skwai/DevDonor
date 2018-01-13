<template>
  <div>
    <TheIntro />
    <AppContainer>
      <TheProjects />
    </AppContainer>
  </div>
</template>

<script>
import TheIntro from '@/components/TheIntro'
import TheProjects from '@/components/TheProjects'

export default {
  components: {
    TheIntro,
    TheProjects
  }
}
</script>

<style lang="stylus">

</style>
