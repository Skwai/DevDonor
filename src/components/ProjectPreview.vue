<template>
  <article class="ProjectPreview" :class="{ '-loading': loading }">
    <router-link :to="{ name: 'project', params: { projectId: project['.key'] } }" class="ProjectPreview__Link">
      <div class="ProjectPreview__Logo">
        <div class="ProjectPreview__LogoWrap">
          <img class="ProjectPreview__LogoImage" :src="organization.logo">
        </div>
        <div class="ProjectPreview__Category">{{organization.type}}</div>
      </div>
      <div class="ProjectPreview__Details">
        <header class="ProjectPreview__Header">
          <div class="ProjectPreview__HeaderInner">
            <h1 class="ProjectPreview__Organization">{{organization.name}}</h1>
            <div class="ProjectPreview__Region">{{organization.region}}</div>
          </div>
          <time class="ProjectPreview__CreatedAt" :datetime="project.createdAt">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="#444" stroke-width="1" stroke-linecap="square" stroke-miterlimit="10"><path d="M12 10v4h4"/><circle cx="12" cy="14" r="9"/><path d="M10 1h4M12 1v4"/></g></svg>
            <span>{{project.createdAt | moment('from', 'now')}}</span>
          </time>
        </header>
        <div class="ProjectPreview__Description">{{project.title}}</div>
        <div class="ProjectPreview__Tags">
          <Tag v-for="(tag, key) in project.tags":key="key" :tag="tag" />
        </div>
      </div>
    </router-link>
  </article>
</template>

<script>
import { db } from '@/services/firebase'

export default {
  props: ['project'],

  data () {
    return {
      loading: true
    }
  },

  firebase () {
    return {
      organization: {
        source: db.ref(`organizations`).child(this.project.organization),
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

.ProjectPreview
  position: relative
  transition: transitionLong
  transform: translate3d(0,0,0)
  transform-origin: center center

  *
    transform: translate3d(0,0,0)

  &:hover
    z-index: 2

  &.-loading
    opacity: 0

  + .ProjectPreview
    margin-top: -1px

  &__Category
    textSmallCaps()
    font-size: 0.75rem
    text-align: center
    opacity: .4
    width: 100%
    margin-top: spacingSmall

  &__Link
    display: flex
    color: inherit
    transition: transitionLong
    background: #fff
    align-items: stretch
    transform: translate3d(0,0,0,0)
    transition: transitionBase
    box-shadow: colorGray 0 0 0 1px

    &:hover
      box-shadow: rgba(35,47,65,.1) 0 2px 2rem, colorGray 0 0 0 1px

      @media (min-width: 1024px)
        transform: scale(1.02)

  &__Tags
    margin-top: spacingSmall

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
      box-shadow: rgba(0,0,0,.1) 0 1px 2px, colorLightGray 0 0 0 1px

    &Image
      max-width: 100%
      max-height: 100%

  &__Organization
    textHeading()
    color: colorPrimaryBlue

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
      margin-right: spacingSmall

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
