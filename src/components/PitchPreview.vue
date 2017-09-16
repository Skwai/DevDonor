<template>
  <article class="PitchPreview" :class="{ '-loading': loading }">
    <router-link :to="{ name: 'pitch', params: { pitchId: 'pitch1' } }" class="PitchPreview__Link">
      <div class="PitchPreview__Logo">
        <img class="PitchPreview__LogoImage" :src="organization.logo">
      </div>
      <div class="PitchPreview__Details">
        <header class="PitchPreview__Header">
          <h1 class="PitchPreview__Organization">{{organization.name}}</h1>
          <time class="PitchPreview__CreatedAt" :datetime="pitch.createdAt">3 days ago</time>
          <div class="PitchPreview__Region">{{organization.region}}</div>
        </header>
        <div class="PitchPreview__Description">{{pitch.description}}</div>
      </div>
    </router-link>
  </article>
</template>

<script>
import { db } from '@/services/firebase'

export default {
  props: ['pitch'],

  data () {
    return {
      loading: true
    }
  },

  firebase () {
    return {
      organization: {
        source: db.ref(`organizations`).child(this.pitch.organization),
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
@require "../styles/config.styl"
@require "../styles/text.styl"

.PitchPreview
  border: colorLightGray solid
  border-width: 1px 1px 1px

  &.-loading
    opacity: 0

  + .PitchPreview
    border-top: 0

  &__Link
    display: flex
    color: inherit
    transition: transitionBase
    padding: spacingBase
    background: #fff

    &:hover
      background: colorOffWhite

  &__Logo
    size = 4.5rem
    width: size
    height: size
    flex: 0 0 size
    display: flex
    align-items: center
    justify-content: center
    background: #fff
    box-shadow: rgba(0,0,0,.15) 0 1px 2px
    margin-right: spacingBase

  &__LogoImage
    max-width: 100%
    max-height: 100%

  &__Organization
    textSubheading()

  &__Details
    flex: 1

  &__Region
    textSmallCaps()
    flex: 0 0 100%

  &__Description
    margin-top: 0.35rem
    white-space: nowrap
    max-width: 100%
    overflow: hidden
    text-overflow: ellipsis

  &__Header
    display: flex
    flex-wrap: wrap

  &__CreatedAt
    text-align: right
    white-space: nowrap
    opacity: .5
    margin-left: auto
</style>
