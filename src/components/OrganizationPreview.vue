<template>
  <article class="OrganizationPreview">
    <Loading v-if="loading" />
    <div v-else class="OrganizationPreview__Inner">
      <div class="OrganizationPreview__Logo">
        <img
          class="OrganizationPreview__LogoImage"
          :src="organization.logo"
          :alt="organization.name + ' logo'"
        >
      </div>
      <header class="OrganizationPreview__Header">
        <h2 class="OrganizationPreview__Name">{{organization.name}}</h2>
        <SmallCaps>{{organization.country}}</SmallCaps>
      </header>
      <div class="OrganizationPreview__Description" v-html="description"></div>
      <footer class="OrganizationPreview__Footer">
        <a class="OrganizationPreview__Link" :href="organization.url">{{organization.url}}</a>
      </footer>
    </div>
  </article>
</template>

<script>
import marked from 'marked'

export default {
  props: ['organizationId'],

  data () {
    return {
      loading: true
    }
  },

  async created () {
    await this.$store.dispatch('getOrganization', this.organizationId)
    this.loading = false
  },

  computed: {
    organization () {
      return this.$store.getters.getOrganization(this.organizationId)
    },
    description () {
      return this.organization && this.organization.description ? marked(this.organization.description) : null
    }
  }
}
</script>

<style lang="stylus">
@require "../styles/card.styl"
@require "../styles/text.styl"
@require "../styles/config.styl"

.OrganizationPreview
  overflow: hidden
  padding-top: 2.5rem

  &__Header
    text-align: center
    margin-bottom: spacingSmall

  &__Name
    margin: 0.5rem 0

  &__Logo
    position: absolute
    top: 0
    left: 50%
    transform: translate(-50%, -50%)
    width: auto
    min-width: 2rem
    height: 5rem
    background: #fff
    box-shadow: rgba(0,0,0,.1) 0 1px 2px, colorGray 0 0 0 1px
    display: flex
    align-items: center
    justify-content: center
    border: #fff solid 4px

    &Image
      max-width: 100%
      max-height: 100%

  &__Link
    textLink()
    textSmall()

  &__Description
    textMarkdown()
    opacity: .7
    font-size: 0.875rem

  &__Inner
    card()
    position: relative
    padding-top: spacingBase + 2.5rem

  &__Footer
    text-align: center
    margin-top: spacingSmall
</style>

