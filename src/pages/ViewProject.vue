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
          {{createdAt}}
        </div>
        <div :class="$style.ViewProject__Region">
          <AppGlyph>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"></path></svg>
          </AppGlyph>
          {{countryName}}
        </div>
      </div>
      <AppHeading :class="$style.ViewProject__Title">{{project.title}}</AppHeading>
    </header>

    <div :class="$style.ViewProject__Body">
      <div :class="$style.ViewProject__Description">
        <AppSubheading>About the project</AppSubheading>
        <div v-html="description" :class="$style.ViewProject__Description"></div>
      </div>

      <aside :class="$style.ViewProject__Sidebar">

        <AppCard v-if="isProjectOwner">
          <h3>Manage your project</h3>
          <AppNavList :class="$style.ViewProject__OwnerActions">
            <AppNavListItem :to="{ name: 'EditProject', params: { projectId: $route.params.projectId } }">
              <svg slot="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M13 7L9 3"/><path d="M5.5 14.5l-5 1 1-5 10-10 4 4-10 10z"/></g></svg>
              Edit project
            </AppNavListItem>
            <AppNavListItem :to="{ name: 'DeleteProject', params: { projectId: $route.params.projectId } }">
              <svg slot="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"><circle cx="8.5" cy="8.5" r="7"/><path d="M11.5 5.5l-6 6m0-6l6 6"/></g></svg>
              Delete project
            </AppNavListItem>
          </AppNavList>
        </AppCard>

        <AppCard v-if="isProjectVolunteer">
          <p>You've volunteered for this project</p>
        </AppCard>

        <AppCard
          v-if="!isProjectVolunteer && !isProjectOwner"
          :class="$style.ViewProject__Volunteer"
        >
          <h3>Interested in helping out?</h3>
          <p>This project is seeking volunteers</p>
          <AppBtn
            :to="{ path: 'volunteer', append: true }"
            color="primary"
            :block=true
          >Volunteer for project</AppBtn>
        </AppCard>

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

      </aside>
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

  @Action('loadProjectById') private actionLoadProjectById: (projectId: string) => Promise<void>

  @Getter('getProjectById') private getProject: (projectId: string) => Project | null
  @Getter private getCountryName: (countryCode: string) => string
  @Getter private getOrganizationType: (orgType: string) => string
  @Getter private getCurrentUserId: string
  @Getter private getIsUserVolunteerProject: (projectId: string) => boolean

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
    if (!this.project) {
      return null
    }

    const days = moment().diff(this.project.createdAt, 'days')

    if (days === 0) {
      return 'Today'
    }
    return `${days}d ago`
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

  get isProjectVolunteer() {
    return this.getIsUserVolunteerProject(this.projectId)
  }

  get isProjectOwner() {
    if (this.project && this.project.ownerId) {
      return this.getCurrentUserId === this.project.ownerId
    }
    return false
  }

  private async created() {
    try {
      await this.actionLoadProjectById(this.projectId)
      this.project = this.getProject(this.projectId)

      if (this.project && this.project.deleted) {
        throw Error('Project has been deleted')
      }
    } catch (err) {
      this.$router.replace({ path: '/404' })
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
    border-bottom: $colorGray solid 1px;
  }

  &__Meta {
    display: flex;
    align-items: center;
    margin-bottom: $spacingBase;
    white-space: nowrap;
    opacity: 0.6;
    font-size: $fontSizeSmall;
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

  &__OwnerActions {
    margin-left: -1 * $spacingBase;
    margin-right: -1 * $spacingBase;
  }
}
</style>
