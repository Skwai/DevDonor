<template>
  <article class="PitchPreview" :class="{ '-loading': loading }">
    <router-link :to="{ name: 'pitch', params: { pitchId: 'pitch1' } }" class="PitchPreview__Link">
      <div class="PitchPreview__Logo">
        <div class="PitchPreview__LogoWrap">
          <img class="PitchPreview__LogoImage" :src="organization.logo">
        </div>
        <div class="PitchPreview__Category">{{organization.type}}</div>
      </div>
      <div class="PitchPreview__Details">
        <header class="PitchPreview__Header">
          <div class="PitchPreview__HeaderInner">
            <h1 class="PitchPreview__Organization">{{organization.name}}</h1>
            <div class="PitchPreview__Region">{{organization.region}}</div>
          </div>
          <time class="PitchPreview__CreatedAt" :datetime="pitch.createdAt">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="#444" stroke-width="1" stroke-linecap="square" stroke-miterlimit="10"><path d="M12 10v4h4"/><circle cx="12" cy="14" r="9"/><path d="M10 1h4M12 1v4"/></g></svg>
            <span>{{pitch.createdAt | moment('from', 'now')}}</span>
          </time>
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
  border-width: 1px
  position: relative
  transition: transitionLong
  transform: translate3d(0,0,0)
  transform-origin: center center

  &:hover
    z-index: 2
    border-color: rgba(0,0,0,.15)

    @media (min-width: 1024px)
      transform: scale(1.02)

  &.-loading
    opacity: 0

  + .PitchPreview
    margin-top: -1px

  &__Category
    textSmallCaps()
    font-size: 0.75rem
    text-align: center
    opacity: .4
    width: 100%
    margin-top: 1rem

  &__Link
    display: flex
    color: inherit
    transition: transitionLong
    background: #fff
    align-items: stretch
    transform: translate3d(0,0,0,0)

    &:hover
      box-shadow: rgba(35,47,65,.15) 0 2px 2rem

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

  &__Details
    flex: 1
    padding: spacingBase
    display: flex
    align-items: flex-start
    flex-wrap: wrap
    align-self: flex-start

  &__Region
    margin-top: 0.35rem
    textSmallCaps()
    flex: 0 0 100%
    opacity: .4
    font-size: 0.75rem
    font-weight: 500

  &__Description
    margin-top: 0.35rem
    flex: 0 0 100%

  &__Header
    display: flex
    flex: 0 0 100%

    &Inner
      margin-right: 1rem

  &__CreatedAt
    text-align: right
    white-space: nowrap
    textSmallCaps()
    opacity: .4
    margin-left: auto
    display: flex
    align-items: center
    align-self: flex-start

    svg
      width: 1rem
      height: 1rem
      margin-right: 0.5rem
</style>
