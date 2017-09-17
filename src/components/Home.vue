<template>
  <div>
    <Intro />
    <Container>
      <Projects />
    </Container>
  </div>
</template>

<script>
import Intro from '@/components/Intro'
import Container from '@/components/Container'
import Projects from '@/components/Projects'

export default {
  components: {
    Intro,
    Projects,
    Container
  }
}
</script>

<style lang="stylus">

</style>
