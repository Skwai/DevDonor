<template>
  <router-link
    :to="{ name: 'ViewProject', params: { projectID: project.id } }"
    :class="$style.ProjectPreview"
  >
    <div :class="$style.ProjectPreview__LogoWrap">
      <img :class="$style.ProjectPreview__Logo" :src="project.organizationLogo">
    </div>
    <div :class="$style.ProjectPreview__Body">
      <header :class="$style.ProjectPreview__Header">
        <h2 :class="$style.ProjectPreview__Title">{{project.title}}</h2>
        <div :class="$style.ProjectPreview__Type">
          <AppTag>Mobile Project</AppTag>
        </div>
      </header>
      <div>
      </div>
      <div :class="$style.ProjectPreview__Meta">
        <!--
        <div v-if="isNew" :class="$style.ProjectPreview__New">
          <AppLabel>New</AppLabel>
        </div>
        -->
        <div :class="$style.ProjectPreview__Organization">{{project.organizationName}}</div>
        <div :class="$style.ProjectPreview__Region">
          <AppGlyph><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg></AppGlyph>
          <span>{{project.country}}</span>
        </div>
        <time :class="$style.ProjectPreview__CreatedAt" :datetime="project.createdAt">
          <AppGlyph><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path></svg></AppGlyph>
          <span>Created {{createdAt}}</span>
        </time>
      </div>
    </div>
  </router-link>
</template>

<script lang="ts" >
import moment from 'moment'
import { Component, Prop, Vue } from 'vue-property-decorator'
import IProjectProperties from '../interfaces/ProjectProperties'

const DESCRIPTION_WORD_LENGTH = 30
const NEW_PROJECT_DAYS = 14 * 24 * 60 * 60 * 1000

@Component
export default class ProjectPreview extends Vue {
  @Prop({ required: true })
  private project: IProjectProperties

  get isNew() {
    return new Date()
  }

  get createdAt() {
    return moment(this.project.createdAt).fromNow()
  }

  get description() {
    if (this.project.description) {
      return this.project.description
        .split(' ')
        .splice(0, DESCRIPTION_WORD_LENGTH)
        .join(' ')
    }
  }

  get skills() {
    return ['UX', 'Apps']
  }
}
</script>

<style lang="stylus" module>
@require '../styles/config';
@require '../styles/text';
@require '../styles/label';
@require '../styles/card';

.ProjectPreview {
  $logoSize = 5rem;
  width: 100%;
  display: grid;
  grid-gap: $spacingBase;
  grid-template-columns: $logoSize 1fr;
  color: inherit;
  flex-direction: row;
  background: #fff;
  transition: $transitionBase;
  padding: $spacingBase;
  width: 100%;
  -webkit-backface-visibility: hidden;
  position: relative;
  card();
  transform-origin: center center;
  will-change: box-shadow;

  &:hover, &:focus {
    box-shadow: rgba(0, 0, 0, 0.2) 0 2px 2rem;
  }

  &__Category {
    textSmallCaps();
    font-size: 0.75rem;
    opacity: 0.4;
    width: 100%;
    margin-top: $spacingSmall;
  }

  &__Label {
    label();
    margin-right: 1rem;
  }

  &__Skills {
    margin-top: $spacingSmall;
  }

  &__Logo {
    width: auto;
    width: $logoSize;
    -webkit-backface-visibility: hidden;
    height: auto;

    &Wrap {
      height: $logoSize;
      width: $logoSize;
      margin-right: $spacingBase;
      display: flex;
      align-items: center;
      background: #fff;
    }
  }

  &__Title {
    textSubheading();
    margin: 0;
    color: $colorPrimary;
    font-weight: 500;
    line-height: 1.35;
    transition: $transitionBase;
  }

  &__Region {
    margin-left: 1.5rem;
    display: flex;
    align-items: center;
    opacity: 0.5;
  }

  &__Body {
    align-self: center;
  }

  &__Meta {
    font-weight: 500;
    display: flex;
    align-items: center;
    font-size: $fontSizeSmall;
  }

  &__Organization {
    font-weight: 700;
  }

  &__Header {
    display: flex;
    align-items: flex-start;
    margin-bottom: 0.5rem;
  }

  &__New {
    margin-right: $spacingBase;
  }

  &__Type {
    margin-left: auto;
    padding-left: $spacingBase;
  }

  &__CreatedAt {
    display: flex;
    align-items: center;
    margin-left: $spacingBase;
    opacity: 0.5;
  }
}
</style>
