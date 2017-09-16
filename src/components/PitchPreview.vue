<template>
  <article class="PitchPreview" :class="{ '-loading': loading }">
    <router-link :to="{ name: 'pitch', params: { pitchId: 'pitch1' } }" class="PitchPreview__Link">
      <div class="PitchPreview__Logo">
        <div class="PitchPreview__LogoWrap">
          <img class="PitchPreview__LogoImage" :src="organization.logo">
        </div>
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
  position: relative

  &:hover
    z-index: 2

  &.-loading
    opacity: 0

  + .PitchPreview
    border-top: 0

  &__Link
    display: flex
    color: inherit
    transition: transitionBase
    background: #fff
    align-items: stretch

    &:hover
      box-shadow: rgba(35,47,65,.2) 0 2px 2rem

  &__Logo
    padding: spacingBase
    background: colorOffWhite

    &Wrap
      size = 5rem
      width: size
      height: size
      display: flex
      align-items: center
      justify-content: center
      background: #fff
      box-shadow: rgba(0,0,0,.1) 0 0 0 1px

    &Image
      max-width: 100%
      max-height: 100%

  &__Organization
    textHeading()
    color: colorPrimaryBlue

  &__Details
    flex: 1
    padding: spacingBase

  &__Region
    margin-top: 0.35rem
    textSmallCaps()
    flex: 0 0 100%

  &__Description
    margin-top: 0.35rem

  &__Header
    display: flex
    flex-wrap: wrap

  &__CreatedAt
    text-align: right
    white-space: nowrap
    opacity: .5
    margin-left: auto
</style>
