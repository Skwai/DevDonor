<template>
  <main id="app">
    <TheHeader />
    <router-view />
    <TheFooter />
  </main>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import TheHeader from '@/components/TheHeader'
import TheFooter from '@/components/TheFooter'

@Component({
  components: {
    TheHeader,
    TheFooter
  }
})
export default class App extends Vue {
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
