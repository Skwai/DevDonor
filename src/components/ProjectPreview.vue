<template>
  <router-link
    :to="{ name: 'ViewProject', params: { projectID: project.id } }"
    class="ProjectPreview"
  >
    <div class="ProjectPreview__LogoWrap">
      <img class="ProjectPreview__Logo" :src="project.organizationLogo">
    </div>
    <div class="ProjectPreview__Body">
      <header class="ProjectPreview__Header">
        <h2 class="ProjectPreview__Title">
          {{project.title}}
        </h2>
      </header>
      <div class="ProjectPreview__Meta">
        <div class="ProjectPreview__Organization">{{project.organizationName}}</div>
        <div class="ProjectPreview__Region">
          <AppGlyph><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg></AppGlyph>
          <span>{{project.country}}</span>
        </div>
        <time class="ProjectPreview__CreatedAt" :datetime="project.createdAt">
          <div class="ProjectPreview__Label" v-if="isNew">New</div>
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
import { IProjectProperties } from '../models/Project'

const DESCRIPTION_WORD_LENGTH = 30

@Component
export default class ProjectPreview extends Vue {
  @Prop({ required: true })
  private project: IProjectProperties

  get isNew() {
    return false // return new Date()
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

<style lang="stylus">
@require '../styles/config.styl';
@require '../styles/text.styl';
@require '../styles/label.styl';
@require '../styles/card.styl';

.ProjectPreview {
  $logoSize = 4rem;
  width: 100%;
  display: flex;
  color: inherit;
  flex-direction: row;
  background: #fff;
  transition: $transitionBase;
  padding: $spacingBase;
  width: 100%;
  -webkit-backface-visibility: hidden;
  position: relative;
  card();

  &:hover &__Title, &:focus &__Title {
    color: $colorPrimary;
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
    margin: 0 0 0.5rem;
    // color: $colorPrimary;
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
    flex: 1;
    align-self: center;
  }

  &__Meta {
    font-weight: 500;
    display: flex;
    align-items: center;
    font-size: $fontSizeSmall;
  }

  &__Header {
    display: flex;
    align-items: flex-start;
  }

  &__Description {
    font-size: $fontSizeSmall;
    opacity: 0.7;
    margin-bottom: 1rem;
  }

  &__CreatedAt {
    display: flex;
    align-items: center;
    margin-left: 1.5rem;
    opacity: 0.5;

    svg {
      width: 1rem;
      height: 1rem;
      margin-right: 0.5rem;
    }
  }
}
</style>
