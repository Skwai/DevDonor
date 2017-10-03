<template>
  <article class="ProjectPreview">
    <router-link
      v-if="!loading"
      :to="{ name: 'project', params: { projectId: projectId } }"
      class="ProjectPreview__Link"
    >
      <div class="ProjectPreview__Label" v-if="isNew">NEW</div>
      <img class="ProjectPreview__Logo" :src="organization.logo">
      <div class="ProjectPreview__Body">
        <header class="ProjectPreview__Header">
          <h1 class="ProjectPreview__Organization">{{organization.name}}</h1>
          <div class="ProjectPreview__Region">
            <Glyph><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg></Glyph>
          {{organization.country}}
        </div>
        </header>
        <div class="ProjectPreview__Title">{{project.title}}</div>
        <div class="ProjectPreview__Tags">
          <Tag v-for="(skill, key) in project.skills" :key="key" :tag="key" />
        </div>
        <time class="ProjectPreview__CreatedAt" :datetime="project.createdAt">
          <Glyph><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="#444" stroke-width="1" stroke-linecap="square" stroke-miterlimit="10"><path d="M12 10v4h4"/><circle cx="12" cy="14" r="9"/><path d="M10 1h4M12 1v4"/></g></svg></Glyph>
          <span>{{project.createdAt | moment('from', 'now')}}</span>
        </time>
      </div>
    </router-link>
  </article>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: ['projectId'],

  data () {
    return {
      loading: true
    }
  },

  async created () {
    await this.$store.dispatch('getProject', this.projectId)
    await this.$store.dispatch('getOrganization', this.project.organization)
    this.loading = false
  },

  computed: {
    isNew () {
      return this.isNewProject(this.projectId)
    },
    project () {
      return this.getProject(this.projectId)
    },
    organization () {
      if (this.project && this.project.organization) {
        return this.getOrganization(this.project.organization)
      }
      return {}
    },
    ...mapGetters(['getProject', 'getOrganization', 'isNewProject'])
  }
}
</script>

<style lang="stylus">
@require "../styles/config.styl"
@require "../styles/text.styl"
@require "../styles/label.styl"

.ProjectPreview
  logoSize = 5rem

  margin-top: (logoSize / 2)
  position: relative
  transition: transitionLong
  transform: translate3d(0,0,0)
  transform-origin: center center
  display: flex
  text-align: center
  width: 100%

  &:hover
    z-index: 2

  &.-loading
    opacity: 0

  + .ProjectPreview
    margin-top: -1px

  &__Category
    textSmallCaps()
    font-size: 0.75rem
    opacity: .4
    width: 100%
    margin-top: spacingSmall

  &__Label
    position: absolute
    right: 0
    top: 0
    transform: translate(8px, -8px)
    label()

  &__Link
    display: flex
    color: inherit
    transition: transitionLong
    background: #fff
    flex-direction: column
    align-items: stretch
    transition: transitionBase
    box-shadow: colorGray 0 0 0 1px
    width: 100%
    -webkit-backface-visibility: hidden;
    -webkit-transform: translateZ(0) scale(1.0, 1.0);

    &:focus
      outline: 0

    &:hover,
    &:focus
      box-shadow: rgba(colorPrimaryBlue, .2) 0 2px 2rem, colorPrimaryBlue 0 0 0 1px

    &:hover .ProjectPreview__Logo,
    &:focus .ProjectPreview__Logo
      box-shadow: rgba(colorPrimaryBlue, .2) 0 1px 1rem, colorPrimaryBlue 0 0 0 1px
      transform: translate(-50%, -50%) scale(1.1)

  &__Skills
    margin-top: spacingSmall

  &__Logo
    position: absolute
    left: 50%
    top: 0
    transform: translate(-50%, -50%)
    width: auto
    max-width: 50%
    min-width: logoSize
    height: logoSize
    display: flex
    align-items: center
    justify-content: center
    background: #fff
    box-shadow: rgba(0,0,0,.1) 0 1px 2px, colorGray 0 0 0 1px
    border: #fff 4px solid
    object-fit: cover
    transition: transitionBase
    -webkit-backface-visibility: hidden;


  &__Organization
    textSubheading()

  &__Body
    flex: 1
    padding: (spacingBase + logoSize / 2) spacingBase spacingBase
    display: flex
    flex-direction: column

  &__Region
    margin-top: 0.35rem
    textSmallCaps()
    flex: 0 0 100%
    opacity: .5
    font-weight: 500

  &__Header
    margin-bottom: 1rem

  &__Title
    margin-bottom: 1rem
    flex: 1

  &__CreatedAt
    textSmallCaps()
    opacity: .5
    display: flex
    align-items: center
    justify-content: center
    line-height: 1rem
    margin-top: 1rem

    svg
      width: 1rem
      height: 1rem
      margin-right: 0.5rem
</style>
