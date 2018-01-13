<template>
  <form>
    <AppFilterMenu
      label="Region"
      v-model="filters.region"
      :options="{}"
    ></AppFilterMenu>
  </form>
</template>

<script>
export default {

  data () {
    return {
      filters: {
        region: null
      }
    }
  }

}
</script>

<style lang="stylus" module>
@import "../styles/config.styl"
</style>
