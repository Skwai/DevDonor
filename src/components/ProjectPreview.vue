<template>
  <router-link
    :to="{ name: 'ViewProject', params: { projectId: project.id } }"
    :class="$style.ProjectPreview"
  >
    <div :class="$style.ProjectPreview__LogoWrap">
      <img :class="$style.ProjectPreview__Logo" :src="project.organizationLogo">

    </div>
    <div :class="$style.ProjectPreview__Body">
      <header :class="$style.ProjectPreview__Header">
        <h2 :class="$style.ProjectPreview__Title">{{project.title}}</h2>
        <time :class="$style.ProjectPreview__CreatedAt" :datetime="project.createdAt">
          <AppGlyph><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path></svg></AppGlyph>
          <span>{{createdAt}}</span>
        </time>
      </header>
      <div :class="$style.ProjectPreview__Meta">
        <div :class="$style.ProjectPreview__Organization">{{project.organizationName}}</div>
        <div :class="$style.ProjectPreview__Region">
          <AppGlyph><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg></AppGlyph>
          <span>{{countryName}}</span>
        </div>
      </div>
      <div :class="$style.ProjectPreview__Tags">
        <AppTag>{{projectType}}</AppTag>
      </div>
    </div>
  </router-link>
</template>

<script lang="ts" >
import moment from 'moment'
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import IProjectProperties from '../interfaces/ProjectProperties'

@Component
export default class ProjectPreview extends Vue {
  @Prop({ required: true })
  private project: IProjectProperties

  @Getter private getCountryName: (countryCode: string) => string
  @Getter private getProjectTypeName: (projectType: string) => string

  get countryName() {
    if (this.project.country) {
      return this.getCountryName(this.project.country)
    }
  }

  get projectType() {
    if (this.project.projectType) {
      return this.getProjectTypeName(this.project.projectType)
    }
  }

  get createdAt() {
    const days = moment().diff(this.project.createdAt, 'days')
    if (days === 0) {
      return 'Today'
    }
    return `${days}d ago`
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
  $logoSize = 4rem;
  width: 100%;
  color: inherit;
  display: block;
  flex-direction: row;
  transition: $transitionBase;
  width: 100%;
  -webkit-backface-visibility: hidden;
  position: relative;
  transform-origin: center center;
  card();
  will-change: box-shadow;
  display: grid;
  padding: $spacingBase;
  grid-gap: $spacingBase;
  grid-template-columns: $logoSize 1fr;
  align-items: center;

  @media (min-width: 768px) {
    padding: $spacingBase;
    grid-gap: $spacingBase;
  }

  &:hover, &:focus {
    box-shadow: rgba($colorDarkBlue, 0.1) 0 2px 1rem;
  }

  &:hover &__Title, &:focus &__Title {
    color: $colorPrimary;
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
    margin: 0;
    font-weight: 600;
    line-height: 1.35;
    transition: $transitionBase;
    margin: 0;
    color: $colorPrimary;
    font-size: 1rem;
  }

  &__Body {
    align-self: center;
    border-left: $colorGray solid 1px;
    padding-left: $spacingBase;
  }

  &__Meta {
    font-weight: 500;
    display: flex;
    align-items: center;
    font-size: $fontSizeSmall;
    color: rgba($colorDarkBlue, 0.7);
  }

  &__Organization {
    font-weight: 700;
  }

  &__Header {
    display: flex;
    align-items: flex-start;
    margin-bottom: 0.75rem;
  }

  &__CreatedAt {
    display: flex;
    align-items: center;
    margin-left: auto;
    color: rgba($colorDarkBlue, 0.7);
    white-space: nowrap;
    padding-left: $spacingBase;
    font-size: $fontSizeSmall;
  }

  &__Region {
    margin-left: 1.5rem;
    display: flex;
    align-items: center;
  }

  &__Tags {
    margin-top: 0.75rem;
  }
}
</style>
