<template>
  <AppLoading v-if="loading" />
  <div v-else-if="project" :class="$style.ViewProject">
    <header :class="$style.ViewProject__Header">
      <AppContainer>
        <div :class="$style.ViewProject__Meta">
          <div :class="$style.ViewProject__Created">
            <span :class="$style.ViewProject__New">
              <AppTag v-if="isNew">New</AppTag>
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
        </div>
        <h1 :class="$style.ViewProject__Title">{{project.title}}</h1>
      </AppContainer>
    </header>

    <AppContainer>
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
    </AppContainer>
    <router-view />
  </div>
</template>

<script lang="ts">
import marked from 'marked'
import moment from 'moment'
import { Component, Vue } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'

import Project from '../models/Project'

@Component
export default class ViewProjectPage extends Vue {
  private loading: boolean = true
  private project: Project | null = null

  @Action private loadProjectByID: (projectID: string) => Promise<void>

  @Getter('getProjectByID') private getProject: (projectID: string) => Project | null
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

  get projectID() {
    return this.$route.params.projectID
  }

  get isNew() {
    return true
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

  private close() {
    this.$router.push('/')
  }

  private async created() {
    try {
      await this.loadProjectByID(this.projectID)
      this.project = this.getProject(this.projectID)
    } catch (err) {
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
    padding: $spacingLarge 0;
    margin-bottom: $spacingBase;
  }

  &__Meta {
    display: flex;
    align-items: center;
    color: rgba($fontColorBase, 0.5);
    margin-bottom: 1rem;
    white-space: nowrap;
    font-weight: 500;
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
    textMarkdown();
  }

  &__Logo {
    width: 100%;
    height: auto;

    &Wrap {
      margin: 0 auto 1rem;
      width: 5rem;
    }
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
    grid-template-columns: 1fr 20rem;
    grid-gap: 3rem;
  }

  &__OrganizationUrl {
    display: block;
    text-align: center;
  }
}
</style>
