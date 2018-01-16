<template>
  <article class="ProjectPreview">
    <router-link
      :to="{ name: 'Project', params: { projectID: project.id } }"
      class="ProjectPreview__Link"
    >
      <img class="ProjectPreview__Logo" :src="project.organizationLogo">
      <div class="ProjectPreview__Body">
        <header class="ProjectPreview__Header">
          <h3 class="ProjectPreview__Title">
            {{project.title}}
          </h3>
          <time class="ProjectPreview__CreatedAt" :datetime="project.createdAt">
            <div class="ProjectPreview__Label" v-if="isNew">New</div>
            <AppGlyph>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path></svg>
            </AppGlyph>
            <span>{{createdAt}}</span>
          </time>
        </header>
        <div class="ProjectPreview__Description">{{description}}</div>
        <div class="ProjectPreview__Meta">
          <span class="ProjectPreview__Organization">
            {{project.organizationName}}
          </span>
          <span class="ProjectPreview__Region">
            <AppGlyph><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg></AppGlyph>
            {{project.city}}, {{project.country}}
          </span>
        </div>
      </div>
    </router-link>
  </article>
</template>

<script lang="ts" >
import { Vue, Component, Prop } from 'vue-property-decorator'
import Project from '@/models/Project'
import moment from 'moment'

const DESCRIPTION_WORD_LENGTH = 30

@Component
export default class ProjectPreview extends Vue {
  @Prop({ required: true })
  project: Project

  get isNew () {
    return new Date()
  }

  get createdAt () {
    return moment(this.project.createdAt).fromNow()
  }

  get description () {
    return this.project.description.split(' ').splice(0, DESCRIPTION_WORD_LENGTH).join(' ')
  }

  get skills () {
    return ['UX', 'Apps']
  }
}
</script>

<style lang="stylus">
@require "../styles/config.styl"
@require "../styles/text.styl"
@require "../styles/label.styl"

.ProjectPreview
  $logoSize = 5rem

  transition: transitionLong
  transform: translate3d(0,0,0)
  transform-origin: center center
  width: 100%
  // margin-bottom: $spacingBase

  &:hover,
  &:focus
    position: relative
    z-index: 2

  &__Category
    textSmallCaps()
    font-size: 0.75rem
    opacity: .4
    width: 100%
    margin-top: $spacingSmall

  &__Label
    label()
    margin-right: 1rem

  &__Link
    display: flex
    color: inherit
    flex-direction: row
    transition: $transitionLong
    background: #fff
    // box-shadow: rgba(0,0,0,.125) 0 1px 1px
    transition: $transitionBase
    padding: $spacingBase
    width: 100%
    -webkit-backface-visibility: hidden
    -webkit-transform: translateZ(0) scale(1, 1)
    box-shadow: $colorGray 0 0 0 1px
    // border-bottom: $colorGray solid 1px

    &:focus
      outline: 0

    &:hover,
    &:focus
      box-shadow: rgba($colorPrimary, .2) 0 2px 2rem, $colorPrimary 0 0 0 1px

      .ProjectPreview__Logo
        box-shadow: $colorPrimary 0 0 0 1px

  &__Skills
    margin-top: $spacingSmall

  &__Logo
    width: auto
    max-width: 50%
    min-width: $logoSize
    height: $logoSize
    display: flex
    justify-content: center
    background: #fff
    // box-shadow: rgba(0,0,0,.125) 0 1px 1px
    box-shadow: $colorGray 0 0 0 1px
    border: #fff solid 5px
    object-fit: cover
    transition: $transitionBase
    -webkit-backface-visibility: hidden
    margin-right: $spacingBase

  &__Title
    textSubheading()
    margin: 0
    color: $colorPrimary

  &__Organization
    margin-right: $spacingBase

  &__Region
    margin-left: auto
    display: flex
    align-items: center

  &__Body
    flex: 1

  &__Meta
    textSmallCaps()
    font-weight: 500
    display: flex
    align-items: center

  &__Header
    margin-bottom: 1rem
    display: flex

  &__Description
    font-size: $fontSizeSmall
    opacity: .7
    margin-bottom: 1rem

  &__CreatedAt
    textSmallCaps()
    display: flex
    align-items: center
    align-self: center
    margin-left: auto
    padding-left: $spacingBase

    svg
      width: 1rem
      height: 1rem
      margin-right: 0.5rem
</style>
