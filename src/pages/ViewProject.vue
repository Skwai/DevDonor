<template>
  <AppLoading v-if="loading" />
  <div v-else-if="project" :class="$style.ViewProject">
    <header :class="$style.ViewProject__Header">
      <div :class="$style.ViewProject__Meta">
        <div :class="$style.ViewProject__Created">
          <span :class="$style.ViewProject__New" v-if="isNew">
            <AppTag>New</AppTag>
          </span>
          <AppGlyph>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path></svg>
          </AppGlyph>
          Created {{createdAt}}
        </div>
        <div :class="$style.ViewProject__Region">
          <AppGlyph>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"></path></svg>
          </AppGlyph>
          {{countryName}}
        </div>
        <div :class="$style.ViewProject__Actions">
          <AppBtn :to="{ name: 'DeleteProject', params: { projectId: $route.params.projectId } }" size="small">
            <!--<svg slot="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path data-color="color-2" d="M10.1 4.5L8 6.6 5.9 4.5 4.5 5.9 6.6 8l-2.1 2.1 1.4 1.4L8 9.4l2.1 2.1 1.4-1.4L9.4 8l2.1-2.1z"/><path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm0 14c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6z"/></svg>-->
            Delete
          </AppBtn>
          <AppBtn :to="{ name: 'EditProject', params: { projectId: $route.params.projectId } }" size="small">
            <!--<svg slot="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path d="M11.7.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM4.6 14H2v-2.6l6-6L10.6 8l-6 6zM12 6.6L9.4 4 11 2.4 13.6 5 12 6.6z"/></svg>-->
            Edit
          </AppBtn>
        </div>
      </div>
      <h1 :class="$style.ViewProject__Title">{{project.title}}</h1>
    </header>

    <div :class="$style.ViewProject__Body">
      <div :class="$style.ViewProject__Description">
        <AppSubheading>About the project</AppSubheading>
        <div v-html="description" :class="$style.ViewProject__Description"></div>
      </div>
      <article :class="$style.ViewProject__Sidebar">
        <div :class="$style.ViewProject__Volunteer">
          <AppCard>
            <h3>Interested in helping out?</h3>
            <p>This project is seeking volunteers</p>
            <AppBtn
              :to="{ path: 'volunteer', append: true }"
              color="primary"
              :block=true
            >Volunteer for project</AppBtn>
          </AppCard>
        </div>

        <AppCard :class="$style.ViewProject__Organization">
          <div :class="$style.ViewProject__LogoWrap">
            <img
              :class="$style.ViewProject__Logo"
              :src="project.organizationLogo"
            >
          </div>
          <h3>{{project.organizationName}}</h3>
          <h5>{{organizationType}}</h5>
          <p v-if="project.organizationUrl" :class="$style.ViewProject__OrganizationUrl"><AppLink :href="project.organizationUrl" target="_blank">{{domainName}}</AppLink></p>
          <div>{{project.organizationDescription}}</div>
        </AppCard>
      </article>
    </div>
    <router-view />
  </div>
</template>

<script lang="ts">
import marked from 'marked'
import moment from 'moment'
import { Component, Vue } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'
import { NEW_PROJECT_DAYS } from '../config'
import Project from '../models/Project'

@Component
export default class ViewProjectPage extends Vue {
  private loading: boolean = true
  private project: Project | null = null

  @Action private loadProjectById: (projectId: string) => Promise<void>

  @Getter('getProjectById') private getProject: (projectId: string) => Project | null
  @Getter private getCountryName: (countryCode: string) => string
  @Getter private getOrganizationType: (orgType: string) => string

  get countryName() {
    if (this.project) {
      return this.getCountryName(this.project.country)
    }
  }

  get organizationType() {
    if (this.project) {
      return this.getOrganizationType(this.project.organizationType)
    }
  }

  get skills() {
    return ['UX', 'Apps']
  }

  get projectId() {
    return this.$route.params.projectId
  }

  get isNew() {
    if (!this.project || !this.project.createdAt) {
      return false
    }
    return (
      new Date(this.project.createdAt).getTime() >
      new Date().getTime() - NEW_PROJECT_DAYS * 24 * 60 * 60 * 1000
    )
  }

  get createdAt() {
    if (this.project) {
      return moment(this.project.createdAt).fromNow()
    }
  }

  get description(): string | null {
    if (!this.project || !this.project.description) {
      return null
    }
    return marked(this.project.description)
  }

  get domainName() {
    if (!this.project || !this.project.organizationUrl) {
      return null
    }

    return new URL(this.project.organizationUrl).host
  }

  private async created() {
    try {
      await this.loadProjectById(this.projectId)
      this.project = this.getProject(this.projectId)

      if (this.project && this.project.deleted) {
        throw Error('Project has been deleted')
      }
    } catch (err) {
      this.$router.push({ name: 'NotFound' })
    } finally {
      this.loading = false
    }
  }
}
</script>

<style lang="stylus" module>
@import '../styles/config';
@import '../styles/text';
@import '../styles/container';

.ViewProject {
  container();

  &__Header {
    margin-bottom: $spacingLarge;
  }

  &__Meta {
    display: flex;
    align-items: center;
    margin-bottom: $spacingBase;
    white-space: nowrap;
    color: rgba($fontColorBase, 0.7);
  }

  &__Organization {
    background: #fff;
    padding: $spacingBase;
    font-size: 0.875rem;

    h3, h5 {
      text-align: center;
    }

    h3 {
      margin-bottom: 0.5rem;
    }

    h5 {
      margin-top: 0.5rem;
      margin-bottom: 1rem;
    }
  }

  &__Sidebar {
    h3 {
      margin-top: 0;
      text-align: center;
    }
  }

  &__Description {
    textContent();
  }

  &__Logo {
    width: 100%;
    height: auto;

    &Wrap {
      margin: 0 auto 1rem;
      width: 5rem;
    }
  }

  &__Actions {
    margin-left: auto;
  }

  &__Volunteer {
    margin: 0 0 $spacingBase;
    text-align: center;
  }

  &__Title {
    font-size: 2rem;
    margin-bottom: 0;
  }

  &__New {
    margin-right: $spacingBase;
  }

  &__Region, &__Created {
    display: flex;
    align-items: center;
    margin-right: $spacingBase;
  }

  &__Body {
    display: grid;
    grid-gap: $spacingLarge;

    @media (min-width: 640px) {
      grid-template-columns: 1fr 20rem;
    }

    @media (min-width: 768px) {
      grid-gap: 3rem;
    }
  }

  &__OrganizationUrl {
    display: block;
    text-align: center;
  }
}
</style>
