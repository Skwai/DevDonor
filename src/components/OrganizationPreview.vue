<template>
  <article class="OrganizationPreview">
    <Loading v-if="loading" />
    <div v-else class="OrganizationPreview__Inner">
      <div class="OrganizationPreview__Logo">
        <img class="OrganizationPreview__LogoImage" :src="organization.logo" :alt="organization.name + ' logo'">
      </div>
      <header class="OrganizationPreview__Header">
        <SmallCaps>{{organization.region}}</SmallCaps>
        <h2 class="OrganizationPreview__Name">{{organization.name}}</h2>
      </header>
      <div class="OrganizationPreview__Description" v-html="description"></div>
      <footer class="OrganizationPreview__Footer">
        <div><SmallCaps>{{getCharityType(organization.type)}}</SmallCaps></div>
        <a class="OrganizationPreview__Link" :href="organization.url">{{organization.url}}</a>
      </footer>
    </div>
  </article>
</template>

<script>
import { mapGetters } from 'vuex'
import marked from 'marked'
import SmallCaps from '@/components/SmallCaps'
import Loading from '@/components/Loading'
import { db } from '@/services/firebase'

export default {
  props: ['organizationId'],

  components: {
    SmallCaps,
    Loading
  },

  data () {
    return {
      loading: true
    }
  },

  computed: {
    ...mapGetters([
      'getCharityType'
    ]),
    description () {
      return marked(this.organization.description)
    }
  },

  firebase () {
    return {
      organization: {
        source: db.ref('organizations').child(this.organizationId),
        asObject: true,
        readyCallback () {
          this.loading = false
        }
      }
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
    width: 5rem
    height: 5rem
    background: #fff
    box-shadow: rgba(0,0,0,.1) 0 1px 2px, colorLightGray 0 0 0 1px
    display: flex
    align-items: center
    justify-content: center

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

